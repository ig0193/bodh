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
        this.currentLanguage = 'en'; // Global language preference: 'en' or 'hi'
        
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
            this.sortBytesByTimestamp();
            this.dataReady = true;
            console.log('Bytes prefetched from CDN:', this.bytes.length, 'bytes');
            
        } catch (error) {
            console.warn('GitHub prefetch failed, using local bytes.json fallback:', error.message);
            
            // Fallback to local bytes.json
            this.bytes = await this.loadLocalBytes();
            this.sortBytesByTimestamp();
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

    /**
     * Sort bytes by timestamp (newest first)
     */
    sortBytesByTimestamp() {
        if (!this.bytes || this.bytes.length === 0) return;
        
        this.bytes.sort((a, b) => {
            // Parse timestamps and sort in descending order (newest first)
            const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
            const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
            return timeB - timeA;
        });
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
        const hasHindi = byte.textHindi && byte.textHindi.trim().length > 0;
        
        // Determine which text to show based on current global language
        const showHindi = this.currentLanguage === 'hi' && hasHindi;
        const enDisplay = showHindi ? 'none' : 'block';
        const hiDisplay = showHindi ? 'block' : 'none';
        const iconText = showHindi ? 'A' : 'अ';
        const iconTitle = showHindi ? 'Read in English' : 'हिंदी में पढ़ें';
        const displayTitle = showHindi && byte.titleHindi ? byte.titleHindi : byte.title;
        
        return `
            <div class="byte-card" data-byte-index="${index}" data-byte-id="${byte.id}">
                <div class="byte-visual" style="background: ${byte.visual.background}">
                    ${visualContent}
                    ${hasHindi ? `
                    <button class="byte-lang-icon-toggle" data-byte-id="${byte.id}" aria-label="Switch language" title="${iconTitle}">
                        <span class="lang-toggle-icon">${iconText}</span>
                    </button>
                    ` : ''}
                </div>
                <div class="byte-content">
                    <h3 class="byte-title" data-title-en="${byte.title}" data-title-hi="${byte.titleHindi || byte.title}">${displayTitle}</h3>
                    <p class="byte-text byte-text-en" data-lang="en" style="display: ${enDisplay};">${byte.text}</p>
                    ${hasHindi ? `<p class="byte-text byte-text-hi" data-lang="hi" style="display: ${hiDisplay};">${byte.textHindi}</p>` : ''}
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
        // Language toggle button events
        this.bytesCards.addEventListener('click', (e) => {
            if (e.target.closest('.byte-lang-icon-toggle')) {
                const button = e.target.closest('.byte-lang-icon-toggle');
                const card = button.closest('.byte-card');
                this.toggleLanguage(card, button);
                return;
            }
            
            if (e.target.closest('.byte-action')) {
                const button = e.target.closest('.byte-action');
                const action = button.dataset.action;
                const byteId = parseInt(button.dataset.byteId);
            }
        });

        // Add touch/swipe events for better mobile experience
        this.addSwipeEvents();
    }
    
    toggleLanguage(card, button) {
        const enText = card.querySelector('.byte-text-en');
        const hiText = card.querySelector('.byte-text-hi');
        
        if (!hiText) return;
        
        // Toggle global language preference
        this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';
        
        // Apply to ALL bytes
        this.applyLanguageToAllBytes();
    }
    
    applyLanguageToAllBytes() {
        const allCards = this.bytesCards.querySelectorAll('.byte-card');
        const isHindi = this.currentLanguage === 'hi';
        
        allCards.forEach(card => {
            const enText = card.querySelector('.byte-text-en');
            const hiText = card.querySelector('.byte-text-hi');
            const titleElement = card.querySelector('.byte-title');
            const toggleButton = card.querySelector('.byte-lang-icon-toggle');
            const toggleIcon = toggleButton?.querySelector('.lang-toggle-icon');
            
            if (!hiText) return; // Skip if no Hindi translation
            
            if (isHindi) {
                // Switch to Hindi
                enText.style.display = 'none';
                hiText.style.display = 'block';
                
                // Update title to Hindi if available
                if (titleElement) {
                    const hindiTitle = titleElement.getAttribute('data-title-hi');
                    if (hindiTitle) {
                        titleElement.textContent = hindiTitle;
                    }
                }
                
                if (toggleIcon) {
                    toggleIcon.textContent = 'A';
                    toggleButton.setAttribute('title', 'Read in English');
                    toggleButton.setAttribute('aria-label', 'Switch to English');
                }
            } else {
                // Switch to English
                enText.style.display = 'block';
                hiText.style.display = 'none';
                
                // Update title to English
                if (titleElement) {
                    const englishTitle = titleElement.getAttribute('data-title-en');
                    if (englishTitle) {
                        titleElement.textContent = englishTitle;
                    }
                }
                
                if (toggleIcon) {
                    toggleIcon.textContent = 'अ';
                    toggleButton.setAttribute('title', 'हिंदी में पढ़ें');
                    toggleButton.setAttribute('aria-label', 'Switch to Hindi');
                }
            }
        });
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
