/**
 * BytesManager - Manages the Bytes view with full-screen cultural wisdom cards
 */
class BytesManager {
    constructor() {
        this.bytes = [];
        this.currentByteIndex = 0;
        this.isLoading = false;
        this.dataReady = false;
        this.prefetchPromise = null;
        
        this.initializeElements();
        this.bindEvents();
        
        // Start prefetching bytes data immediately (non-blocking)
        console.log('BytesManager: Starting background data prefetch...');
        this.prefetchPromise = this.prefetchBytes();
    }

    initializeElements() {
        // Main containers
        this.bytesContainer = document.querySelector('.bytes-container');
        this.bytesCards = document.getElementById('bytesCards');
        

    }

    bindEvents() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('bytesView').classList.contains('active')) {
                this.handleKeyboardNavigation(e);
            }
        });

        // Touch/swipe events will be added to individual cards
    }

    /**
     * Prefetch bytes data in background (called from constructor)
     */
    async prefetchBytes() {
        try {
            console.log('Prefetching bytes data from CDN...');
            
            // Try to fetch from GitHub CDN (primary source)
            const response = await fetch('https://raw.githubusercontent.com/ig0193/bodh-data/main/bytes.json?t=' + Date.now());
            
            if (!response.ok) {
                throw new Error(`GitHub fetch failed: ${response.status}`);
            }
            
            this.bytes = await response.json();
            this.dataReady = true;
            console.log('Bytes prefetched from CDN:', this.bytes.length, 'bytes');
            
        } catch (error) {
            console.warn('GitHub prefetch failed, using local bytes.json fallback:', error.message);
            
            // Fallback to local bytes.json
            this.bytes = await this.loadLocalBytes();
            this.dataReady = true;
            console.log('Using local bytes (offline mode):', this.bytes.length, 'bytes');
        }
    }

    /**
     * Load bytes view (called when user clicks "Bytes" menu)
     */
    async loadBytes() {
        try {
            // Check if data is already ready from prefetch
            if (this.dataReady && this.bytes && this.bytes.length > 0) {
                this.renderBytes();
                return;
            }
            
            // If not ready yet, show loading and wait for prefetch
            this.showLoadingState();
            
            // Wait for prefetch to complete
            if (this.prefetchPromise) {
                await this.prefetchPromise;
            }
            
            if (this.bytes && this.bytes.length > 0) {
                this.renderBytes();
            } else {
                this.showEmptyState();
            }
        } catch (error) {
            console.error('Error loading bytes:', error);
            this.showErrorState();
        }
    }

    /**
     * Load local bytes.json (bundled fallback for offline mode)
     */
    async loadLocalBytes() {
        try {
            const response = await fetch('data/bytes.json');
            
            if (response.ok) {
                const bytes = await response.json();
                return bytes;
            }
            
            return [];
            
        } catch (error) {
            console.error('Error loading local bytes:', error);
            return [];
        }
    }

    renderBytes() {
        if (!this.bytesCards) {
            this.bytesCards = document.getElementById('bytesCards');
            if (!this.bytesCards) {
                console.error('bytesCards element not found');
                return;
            }
        }

        const bytesHTML = this.bytes.map((byte, index) => this.createByteCard(byte, index)).join('');
        this.bytesCards.innerHTML = bytesHTML;

        // Add event listeners to action buttons
        this.bindCardEvents();
        
        // Set up intersection observer for new cards
        this.observeCards();
    }

    createByteCard(byte, index) {
        const visualContent = this.createVisualContent(byte.visual);
        
        return `
            <div class="byte-card" data-byte-index="${index}" data-byte-id="${byte.id}">
                <div class="byte-visual" style="background: ${byte.visual.background}">
                    ${visualContent}
                </div>
                <div class="byte-content">
                    <h3 class="byte-title">${byte.title}</h3>
                    <p class="byte-text">${byte.text}</p>

                </div>
            </div>
        `;
    }

    createVisualContent(visual) {
        switch (visual.type) {
            case 'icon':
                return `<div class="byte-visual-icon">${visual.content}</div>`;
            case 'image':
                return `<img src="${visual.content}" alt="Byte visual" />`;
            default:
                return `<div class="byte-visual-icon">🕉️</div>`;
        }
    }



    scrollToByte(index) {
        if (!this.bytesCards || index < 0 || index >= this.bytes.length) return;

        const targetScroll = index * window.innerHeight;
        this.bytesCards.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    bindCardEvents() {
        // Action button events
        this.bytesCards.addEventListener('click', (e) => {
            if (e.target.closest('.byte-action')) {
                const button = e.target.closest('.byte-action');
                const action = button.dataset.action;
                const byteId = parseInt(button.dataset.byteId);
            }
        });

        // Add touch/swipe events for better mobile experience
        this.addSwipeEvents();
    }

    addSwipeEvents() {
        // Use intersection observer for better scroll tracking
        this.setupScrollObserver();
        
        // Simple scroll end detection
        let scrollTimeout;
        this.bytesCards.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateCurrentIndex();
            }, 100);
        }, { passive: true });
    }

    setupScrollObserver() {
        if (!('IntersectionObserver' in window)) {
            return; // Fallback for older browsers
        }

        const options = {
            root: this.bytesCards,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of card is visible
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cardIndex = parseInt(entry.target.dataset.byteIndex);
                    if (!isNaN(cardIndex)) {
                        this.currentByteIndex = cardIndex;
                    }
                }
            });
        }, options);

        // Observe all cards when they're rendered
        this.observeCards();
    }

    observeCards() {
        if (!this.scrollObserver) return;
        
        const cards = this.bytesCards.querySelectorAll('.byte-card');
        cards.forEach(card => {
            this.scrollObserver.observe(card);
        });
    }

    updateCurrentIndex() {
        const scrollTop = this.bytesCards.scrollTop;
        const cardHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / cardHeight);
        
        // Ensure we're within bounds
        if (newIndex >= 0 && newIndex < this.bytes.length) {
            this.currentByteIndex = newIndex;
        }
    }

    navigateToByte(direction) {
        const newIndex = direction === 'next' 
            ? Math.min(this.currentByteIndex + 1, this.bytes.length - 1)
            : Math.max(this.currentByteIndex - 1, 0);
        
        if (newIndex !== this.currentByteIndex) {
            this.scrollToByte(newIndex);
        }
    }

    handleKeyboardNavigation(e) {
        switch (e.key) {
            case 'ArrowUp':
            case 'k':
                e.preventDefault();
                this.navigateToByte('prev');
                break;
            case 'ArrowDown':
            case 'j':
                e.preventDefault();
                this.navigateToByte('next');
                break;
            case ' ':
                e.preventDefault();
                this.navigateToByte('next');
                break;
        }
    }

    showToast(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            z-index: 1000;
            font-size: 14px;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }

    showLoadingState() {
        if (this.bytesCards) {
            this.bytesCards.innerHTML = `
                <div class="bytes-loading">
                    <div class="loading-spinner"></div>
                    <p>Loading bytes...</p>
                </div>
            `;
        }
    }

    showEmptyState() {
        if (this.bytesCards) {
            this.bytesCards.innerHTML = `
                <div class="bytes-loading">
                    <i class="fas fa-book-open" style="font-size: 3rem; color: var(--gray-400); margin-bottom: var(--spacing-md);"></i>
                    <p>No bytes available</p>
                    <p style="font-size: var(--font-size-sm); color: var(--gray-500);">Check back soon for new content</p>
                </div>
            `;
        }
    }

    showErrorState() {
        if (this.bytesCards) {
            this.bytesCards.innerHTML = `
                <div class="bytes-loading">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--sacred-red); margin-bottom: var(--spacing-md);"></i>
                    <p>Error loading bytes</p>
                    <p style="font-size: var(--font-size-sm); color: var(--gray-500);">Please try again later</p>
                </div>
            `;
        }
    }

    destroy() {
        // Clean up intersection observer
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
            this.scrollObserver = null;
        }
    }
}

// Initialize Bytes Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bytesManager = new BytesManager();
});
