/**
 * Hindu Calendar - Temples Manager
 * Handles temple view functionality, filtering, search, and modal gallery
 */

class TemplesManager {
    constructor() {
        this.temples = [];
        this.filteredTemples = [];
        this.currentDeityFilter = 'all';
        this.currentSearchQuery = '';
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
        this.searchInput = document.getElementById('templesSearchInput');
        this.clearSearchBtn = document.getElementById('clearTemplesSearchBtn');
        
        // Modal elements
        this.templeModal = document.getElementById('templeModal');
        this.templeModalBackdrop = document.getElementById('templeModalBackdrop');
        this.templeModalClose = document.getElementById('templeModalClose');
        this.templeModalTitle = document.getElementById('templeModalTitle');
        this.templeModalCounter = document.getElementById('templeModalCounter');
        this.templeCurrentImage = document.getElementById('templeCurrentImage');
        this.templeImageDots = document.getElementById('templeImageDots');
        this.templePrevBtn = document.getElementById('templePrevBtn');
        this.templeNextBtn = document.getElementById('templeNextBtn');
        
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

        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        if (this.clearSearchBtn) {
            this.clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
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

        // Modal navigation
        if (this.templePrevBtn) {
            this.templePrevBtn.addEventListener('click', () => {
                this.navigateImage('prev');
            });
        }

        if (this.templeNextBtn) {
            this.templeNextBtn.addEventListener('click', () => {
                this.navigateImage('next');
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
            
            // TODO: Replace with actual API call or data loading
            // For now, using sample data structure
            this.temples = this.getSampleTemples();
            
            // Apply current filters
            this.applyFilters();
            
            // Render temples
            this.renderTemples();
            
        } catch (error) {
            console.error('Error loading temples:', error);
            this.showErrorState();
        }
    }

    getSampleTemples() {
        // Use actual temples data if available, otherwise return sample data
        if (window.TEMPLES_DATA) {
            return window.TEMPLES_DATA;
        }
        
        // Fallback sample data
        return [
            {
                id: 'kedarnath-temple',
                name: 'Kedarnath Temple',
                deity: 'shiva',
                deityName: 'Lord Shiva',
                location: 'Kedarnath, Uttarakhand',
                significance: 'One of 12 Jyotirlingas',
                description: 'Ancient temple dedicated to Lord Shiva, located in the Garhwal Himalayas. It is one of the most sacred pilgrimage sites for Hindus.',
                images: [
                    {
                        url: 'https://via.placeholder.com/600x400/4A90E2/FFFFFF?text=Kedarnath+Temple',
                        alt: 'Kedarnath Temple exterior',
                        caption: 'Main temple entrance'
                    }
                ],
                primaryImage: 'https://via.placeholder.com/600x400/4A90E2/FFFFFF?text=Kedarnath+Temple'
            },
            {
                id: 'vaishno-devi',
                name: 'Vaishno Devi',
                deity: 'devi',
                deityName: 'Goddess Vaishno Devi',
                location: 'Jammu & Kashmir',
                significance: 'Sacred cave shrine of Goddess Vaishno Devi',
                description: 'One of the most revered shrines of Goddess Vaishno Devi, located in the Trikuta Mountains.',
                images: [
                    {
                        url: 'https://via.placeholder.com/600x400/E74C3C/FFFFFF?text=Vaishno+Devi',
                        alt: 'Vaishno Devi shrine',
                        caption: 'Sacred cave entrance'
                    }
                ],
                primaryImage: 'https://via.placeholder.com/600x400/E74C3C/FFFFFF?text=Vaishno+Devi'
            }
        ];
    }

    handleDeityFilter(deity) {
        // Update active tab
        const tabs = this.deityTabs.querySelectorAll('.deity-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        const activeTab = this.deityTabs.querySelector(`[data-deity="${deity}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        this.currentDeityFilter = deity;
        this.applyFilters();
        this.renderTemples();
    }

    handleSearch(query) {
        this.currentSearchQuery = query.toLowerCase().trim();
        
        // Show/hide clear button
        if (this.clearSearchBtn) {
            this.clearSearchBtn.style.display = this.currentSearchQuery ? 'block' : 'none';
        }
        
        this.applyFilters();
        this.renderTemples();
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        this.currentSearchQuery = '';
        
        if (this.clearSearchBtn) {
            this.clearSearchBtn.style.display = 'none';
        }
        
        this.applyFilters();
        this.renderTemples();
    }

    applyFilters() {
        this.filteredTemples = this.temples.filter(temple => {
            // Deity filter
            if (this.currentDeityFilter !== 'all' && temple.deity !== this.currentDeityFilter) {
                return false;
            }
            
            // Search filter
            if (this.currentSearchQuery) {
                const searchableText = [
                    temple.name,
                    temple.deityName,
                    temple.location,
                    temple.significance
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(this.currentSearchQuery)) {
                    return false;
                }
            }
            
            return true;
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
        });
    }

    createTempleCard(temple) {
        const imageCount = temple.images ? temple.images.length : 1;
        const dotsHTML = this.createImageDots(imageCount, 0);
        
        return `
            <div class="temple-card" data-temple-id="${temple.id}">
                <div class="temple-image-container">
                    <img src="${temple.primaryImage}" alt="${temple.name}" class="temple-image" />
                    <div class="temple-image-indicator">
                        ${dotsHTML}
                        <span>+${imageCount - 1} more</span>
                    </div>
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
        
        // Update navigation buttons
        this.templePrevBtn.style.display = this.currentImageIndex === 0 ? 'none' : 'flex';
        this.templeNextBtn.style.display = this.currentImageIndex === temple.images.length - 1 ? 'none' : 'flex';
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
