/**
 * Hindu Calendar - Temples Manager
 * Handles temple view functionality, filtering, search, and modal gallery
 */

class TemplesManager {
    constructor() {
        this.temples = [];
        this.filteredTemples = [];
        this.currentDeityFilter = 'all';
        this.currentAdvancedFilters = {
            deity: '',
            location: ''
        };
        this.currentTempleIndex = 0;
        this.currentImageIndex = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.loadTemples();
    }

    initializeElements() {
        // Main containers
        this.templesGrid = document.getElementById('templesGrid');
        this.deityTabs = document.getElementById('deityTabs');
        
        // Filter elements
        this.deityFilter = document.getElementById('deityFilter');
        this.locationFilter = document.getElementById('locationFilter');
        this.resetFiltersBtn = document.getElementById('templesResetFiltersBtn');
        
        // Modal elements
        this.templeModal = document.getElementById('templeModal');
        this.templeModalBackdrop = document.getElementById('templeModalBackdrop');
        this.templeModalClose = document.getElementById('templeModalClose');
        this.templeModalTitle = document.getElementById('templeModalTitle');
        this.templeModalCounter = document.getElementById('templeModalCounter');
        this.templeCurrentImage = document.getElementById('templeCurrentImage');
        this.templeImageDots = document.getElementById('templeImageDots');

        
        // Modal info elements
        this.templeModalLocation = document.getElementById('templeModalLocation');
        this.templeModalSignificance = document.getElementById('templeModalSignificance');
        this.templeModalDeity = document.getElementById('templeModalDeity');
        this.templeModalDescription = document.getElementById('templeModalDescription');
    }

    bindEvents() {
        // Deity tab filtering
        if (this.deityTabs) {
            this.deityTabs.addEventListener('click', (e) => {
                const deityTab = e.target.closest('.deity-tab');
                if (deityTab) {
                    this.handleDeityFilter(deityTab.dataset.deity);
                }
            });
        }

        // Filter functionality
        if (this.deityFilter) {
            this.deityFilter.addEventListener('change', (e) => {
                console.log('Deity filter changed:', e.target.value);
                this.handleAdvancedFilter('deity', e.target.value);
            });
        }

        if (this.locationFilter) {
            this.locationFilter.addEventListener('change', (e) => {
                console.log('Location filter changed:', e.target.value);
                this.handleAdvancedFilter('location', e.target.value);
            });
        }



        if (this.resetFiltersBtn) {
            this.resetFiltersBtn.addEventListener('click', () => {
                console.log('Reset button clicked');
                this.resetAllFilters();
            });
        } else {
            console.error('Reset button not found');
        }

        // Modal events
        if (this.templeModalClose) {
            this.templeModalClose.addEventListener('click', () => {
                this.closeTempleModal();
            });
        }

        if (this.templeModalBackdrop) {
            this.templeModalBackdrop.addEventListener('click', () => {
                this.closeTempleModal();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.templeModal.classList.contains('show')) {
                this.handleKeyboardNavigation(e);
            }
        });

        // Touch/swipe events for mobile
        this.initializeTouchEvents();
    }

    initializeTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        };

        if (this.templeModal) {
            this.templeModal.addEventListener('touchstart', handleTouchStart, { passive: true });
            this.templeModal.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
    }

    initializeCardSwipe(card) {
        const imageSlider = card.querySelector('.temple-image-slider');
        const dotsIndicator = card.querySelector('.temple-image-dots-indicator');
        
        if (!imageSlider || !dotsIndicator) return;
        
        const images = imageSlider.querySelectorAll('.temple-image');
        if (images.length <= 1) return;
        
        let startX = 0;
        let currentImageIndex = 0;
        
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
        };
        
        const handleTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;
            const minSwipeDistance = 50;
            
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0 && currentImageIndex > 0) {
                    // Swipe right - previous image
                    currentImageIndex--;
                } else if (deltaX < 0 && currentImageIndex < images.length - 1) {
                    // Swipe left - next image
                    currentImageIndex++;
                }
                
                this.updateCardImageSlider(imageSlider, dotsIndicator, currentImageIndex, images.length);
            }
        };
        
        imageSlider.addEventListener('touchstart', handleTouchStart, { passive: true });
        imageSlider.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Prevent card click when swiping
        imageSlider.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }
    
    updateCardImageSlider(slider, dotsIndicator, currentIndex, totalImages) {
        // Update slider position
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        slider.dataset.currentImage = currentIndex;
        
        // Update dots
        const dots = dotsIndicator.querySelectorAll('.temple-image-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                this.navigateImage('prev');
            } else {
                this.navigateImage('next');
            }
        } else if (Math.abs(deltaY) > minSwipeDistance && deltaY > 0) {
            this.closeTempleModal();
        }
    }

    handleKeyboardNavigation(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.navigateImage('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.navigateImage('next');
                break;
            case 'Escape':
                e.preventDefault();
                this.closeTempleModal();
                break;
        }
    }

    async loadTemples() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Load temple data
            this.temples = this.getSampleTemples();
            
            // Populate filter dropdowns with available values
            this.populateFilterDropdowns();
            
            // Apply current filters
            this.applyFilters();
            
            // Render temples
            this.renderTemples();
            
        } catch (error) {
            console.error('Error loading temples:', error);
            this.showErrorState();
        }
    }

    populateFilterDropdowns(selectedDeity = '', selectedLocation = '') {
        // Get filtered temples based on current selections
        let availableTemples = this.temples;
        
        // If location is selected, filter temples by location first
        if (selectedLocation) {
            availableTemples = availableTemples.filter(t => t.location === selectedLocation);
        }
        
        // If deity is selected (from quick filter or dropdown), filter temples by deity
        if (selectedDeity) {
            availableTemples = availableTemples.filter(t => t.deity === selectedDeity);
        }

        // Get unique values from available temples
        const availableDeities = [...new Set(availableTemples.map(t => t.deity))].sort();
        const availableLocations = [...new Set(availableTemples.map(t => t.location))].sort();
        
        // Get all deities and locations for comparison
        const allDeities = [...new Set(this.temples.map(t => t.deity))].sort();
        const allLocations = [...new Set(this.temples.map(t => t.location))].sort();

        // Populate deity filter
        if (this.deityFilter) {
            this.deityFilter.innerHTML = '<option value="">All Deities</option>';
            allDeities.forEach(deity => {
                const temple = this.temples.find(t => t.deity === deity);
                const option = document.createElement('option');
                option.value = deity;
                option.textContent = temple ? temple.deityName : deity;
                
                // Set selected if this matches current advanced filter
                if (this.currentAdvancedFilters.deity === deity) {
                    option.selected = true;
                }
                
                // Disable if not available with current location filter
                if (selectedLocation && !availableDeities.includes(deity)) {
                    option.disabled = true;
                    option.style.color = '#ccc';
                }
                
                this.deityFilter.appendChild(option);
            });
        }

        // Populate location filter
        if (this.locationFilter) {
            this.locationFilter.innerHTML = '<option value="">All Locations</option>';
            allLocations.forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                
                // Set selected if this matches current advanced filter
                if (this.currentAdvancedFilters.location === location) {
                    option.selected = true;
                }
                
                // Disable if not available with current deity filter
                if (selectedDeity && !availableLocations.includes(location)) {
                    option.disabled = true;
                    option.style.color = '#ccc';
                }
                
                this.locationFilter.appendChild(option);
            });
        }

        // Update quick filter tabs
        this.updateQuickFilterTabs(availableDeities, selectedLocation);
    }

    updateQuickFilterTabs(availableDeities, selectedLocation) {
        if (!this.deityTabs) return;
        
        const tabs = this.deityTabs.querySelectorAll('.deity-tab');
        tabs.forEach(tab => {
            const deity = tab.dataset.deity;
            
            if (deity === 'all') {
                // Always keep "All Temples" enabled
                tab.disabled = false;
                tab.classList.remove('disabled');
                return;
            }
            
            // Check if this deity has temples in the selected location
            if (selectedLocation && !availableDeities.includes(deity)) {
                tab.disabled = true;
                tab.classList.add('disabled');
                tab.style.opacity = '0.5';
                tab.style.cursor = 'not-allowed';
            } else {
                tab.disabled = false;
                tab.classList.remove('disabled');
                tab.style.opacity = '1';
                tab.style.cursor = 'pointer';
            }
        });
    }

    getSampleTemples() {
        return window.TEMPLES_DATA;
    }

    handleDeityFilter(deity) {
        // Skip if the tab is disabled
        const activeTab = this.deityTabs.querySelector(`[data-deity="${deity}"]`);
        if (activeTab && activeTab.disabled) {
            return;
        }

        // Update active tab
        const tabs = this.deityTabs.querySelectorAll('.deity-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        if (activeTab) {
            activeTab.classList.add('active');
        }

        this.currentDeityFilter = deity;
        
        // Get current deity for filtering (use quick filter if not "all", otherwise use dropdown)
        const currentDeity = deity !== 'all' ? deity : this.currentAdvancedFilters.deity;
        
        // Update dropdowns based on current selections
        this.populateFilterDropdowns(currentDeity, this.currentAdvancedFilters.location);
        
        this.applyFilters();
        this.renderTemples();
    }

    handleAdvancedFilter(filterType, value) {
        this.currentAdvancedFilters[filterType] = value;
        
        // Get current deity for filtering (use quick filter if not "all", otherwise use dropdown)
        const currentDeity = this.currentDeityFilter !== 'all' ? this.currentDeityFilter : this.currentAdvancedFilters.deity;
        
        // Update dropdowns based on current selections
        this.populateFilterDropdowns(currentDeity, this.currentAdvancedFilters.location);
        
        this.applyFilters();
        this.renderTemples();
    }

    resetAllFilters() {
        // Reset deity tabs
        const tabs = this.deityTabs.querySelectorAll('.deity-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.disabled = false;
            tab.classList.remove('disabled');
            tab.style.opacity = '1';
            tab.style.cursor = 'pointer';
        });
        
        const allTab = this.deityTabs.querySelector('[data-deity="all"]');
        if (allTab) {
            allTab.classList.add('active');
        }

        // Reset advanced filters
        this.currentDeityFilter = 'all';
        this.currentAdvancedFilters = {
            deity: '',
            location: ''
        };

        // Reset select elements
        if (this.deityFilter) this.deityFilter.value = '';
        if (this.locationFilter) this.locationFilter.value = '';

        // Repopulate dropdowns with all options enabled
        this.populateFilterDropdowns('', '');

        this.applyFilters();
        this.renderTemples();
        
        console.log('All filters reset');
    }

    applyFilters() {
        this.filteredTemples = this.temples.filter(temple => {
            // Deity tab filter
            if (this.currentDeityFilter !== 'all' && temple.deity !== this.currentDeityFilter) {
                return false;
            }
            
            // Advanced deity filter
            if (this.currentAdvancedFilters.deity && temple.deity !== this.currentAdvancedFilters.deity) {
                return false;
            }
            
            // Location filter - exact match
            if (this.currentAdvancedFilters.location && temple.location !== this.currentAdvancedFilters.location) {
                return false;
            }
            

            
            return true;
        });
        
        console.log('Filters applied:', {
            deityTab: this.currentDeityFilter,
            advancedFilters: this.currentAdvancedFilters,
            filteredCount: this.filteredTemples.length
        });
    }

    renderTemples() {
        if (!this.templesGrid) return;

        if (this.filteredTemples.length === 0) {
            this.showEmptyState();
            return;
        }

        const templesHTML = this.filteredTemples.map(temple => this.createTempleCard(temple)).join('');
        this.templesGrid.innerHTML = templesHTML;

        // Add click events to temple cards
        this.templesGrid.querySelectorAll('.temple-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openTempleModal(index);
            });
            
            // Add swipe functionality for image slider
            this.initializeCardSwipe(card);
        });
    }

    createTempleCard(temple) {
        const imageCount = temple.images ? temple.images.length : 1;
        const dotsHTML = this.createImageDots(imageCount, 0);
        
        // Create image slider HTML
        let imageSliderHTML = '';
        if (temple.images && temple.images.length > 0) {
            imageSliderHTML = temple.images.map(image => 
                `<img src="${image.url}" alt="${image.alt}" class="temple-image" />`
            ).join('');
        }
        
        return `
            <div class="temple-card" data-temple-id="${temple.id}">
                <div class="temple-image-container">
                    <div class="temple-image-slider" data-current-image="0">
                        ${imageSliderHTML}
                    </div>
                    ${imageCount > 1 ? `<div class="temple-image-dots-indicator">${dotsHTML}</div>` : ''}
                </div>
                <div class="temple-content">
                    <h3 class="temple-name">${temple.name}</h3>
                    <div class="temple-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${temple.location}</span>
                    </div>
                    <p class="temple-significance">${temple.significance}</p>
                </div>
            </div>
        `;
    }

    createImageDots(totalImages, activeIndex) {
        let dotsHTML = '';
        for (let i = 0; i < totalImages; i++) {
            const isActive = i === activeIndex ? 'active' : '';
            dotsHTML += `<div class="temple-image-dot ${isActive}"></div>`;
        }
        return dotsHTML;
    }

    openTempleModal(templeIndex) {
        this.currentTempleIndex = templeIndex;
        this.currentImageIndex = 0;
        
        const temple = this.filteredTemples[templeIndex];
        if (!temple) return;

        // Update modal content
        this.updateModalContent(temple);
        
        // Show modal
        this.templeModalBackdrop.classList.add('show');
        this.templeModal.classList.add('show');
        
        // Focus management
        this.templeModal.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    updateModalContent(temple) {
        if (!temple.images || temple.images.length === 0) return;

        const currentImage = temple.images[this.currentImageIndex];
        
        // Update header
        this.templeModalTitle.textContent = temple.name;
        this.templeModalCounter.textContent = `${this.currentImageIndex + 1} of ${temple.images.length}`;
        
        // Update image
        this.templeCurrentImage.src = currentImage.url;
        this.templeCurrentImage.alt = currentImage.alt;
        
        // Update dots
        this.templeImageDots.innerHTML = this.createImageDots(temple.images.length, this.currentImageIndex);
        
        // Update info
        this.templeModalLocation.textContent = temple.location;
        this.templeModalSignificance.textContent = temple.significance;
        this.templeModalDeity.textContent = temple.deityName;
        this.templeModalDescription.innerHTML = temple.description;
    }

    navigateImage(direction) {
        const temple = this.filteredTemples[this.currentTempleIndex];
        if (!temple || !temple.images) return;

        const totalImages = temple.images.length;
        
        if (direction === 'prev') {
            this.currentImageIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : totalImages - 1;
        } else {
            this.currentImageIndex = this.currentImageIndex < totalImages - 1 ? this.currentImageIndex + 1 : 0;
        }
        
        this.updateModalContent(temple);
    }

    closeTempleModal() {
        this.templeModalBackdrop.classList.remove('show');
        this.templeModal.classList.remove('show');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    showLoadingState() {
        if (this.templesGrid) {
            this.templesGrid.innerHTML = `
                <div class="temples-loading">
                    <div class="loading-spinner"></div>
                    <p>Loading temples...</p>
                </div>
            `;
        }
    }

    showEmptyState() {
        if (this.templesGrid) {
            this.templesGrid.innerHTML = `
                <div class="temples-loading">
                    <i class="fas fa-temple-hindu" style="font-size: 3rem; color: var(--gray-400); margin-bottom: var(--spacing-md);"></i>
                    <p>No temples found</p>
                    <p style="font-size: var(--font-size-sm); color: var(--gray-500);">Try adjusting your search or filters</p>
                </div>
            `;
        }
    }

    showErrorState() {
        if (this.templesGrid) {
            this.templesGrid.innerHTML = `
                <div class="temples-loading">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--sacred-red); margin-bottom: var(--spacing-md);"></i>
                    <p>Error loading temples</p>
                    <p style="font-size: var(--font-size-sm); color: var(--gray-500);">Please try again later</p>
                </div>
            `;
        }
    }
}

// Initialize Temples Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.templesManager = new TemplesManager();
});
