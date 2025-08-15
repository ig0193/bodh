/**
 * BytesManager - Manages the Bytes view with full-screen cultural wisdom cards
 */
class BytesManager {
    constructor() {
        this.bytes = [];
        this.currentByteIndex = 0;
        this.isLoading = false;
        
        this.initializeElements();
        this.bindEvents();
        this.loadBytes();
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

    async loadBytes() {
        try {
            this.showLoadingState();
            
            // Get sample bytes data
            this.bytes = this.getSampleBytes();
            
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

    getSampleBytes() {
        return window.BYTES_DATA || [];
    }

    renderBytes() {
        if (!this.bytesCards) return;

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
                
                this.handleByteAction(action, byteId, button);
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

    handleByteAction(action, byteId, button) {
        const byte = this.bytes.find(b => b.id === byteId);
        if (!byte) return;

        switch (action) {
            case 'like':
                this.toggleLike(byte, button);
                break;
            case 'share':
                this.shareByte(byte);
                break;
            case 'save':
                this.saveByte(byte, button);
                break;
        }
    }

    toggleLike(byte, button) {
        // Toggle like status
        byte.liked = !byte.liked;
        byte.likes = (byte.likes || 0) + (byte.liked ? 1 : -1);

        // Update button appearance
        const icon = button.querySelector('i');
        const count = button.querySelector('span');
        
        if (byte.liked) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#ef4444';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '';
        }
        
        count.textContent = byte.likes;

        // Add animation
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    async shareByte(byte) {
        const shareData = {
            title: byte.title,
            text: byte.text,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(`${byte.title}\n\n${byte.text}\n\n${window.location.href}`);
                this.showToast('Copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing byte:', error);
            this.showToast('Unable to share');
        }
    }

    saveByte(byte, button) {
        // Toggle save status
        byte.saved = !byte.saved;

        // Update button appearance
        const icon = button.querySelector('i');
        
        if (byte.saved) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#3b82f6';
            this.showToast('Byte saved!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '';
            this.showToast('Byte unsaved');
        }

        // Save to localStorage
        this.updateSavedBytes(byte);
    }

    updateSavedBytes(byte) {
        let savedBytes = JSON.parse(localStorage.getItem('savedBytes') || '[]');
        
        if (byte.saved) {
            if (!savedBytes.find(b => b.id === byte.id)) {
                savedBytes.push(byte);
            }
        } else {
            savedBytes = savedBytes.filter(b => b.id !== byte.id);
        }
        
        localStorage.setItem('savedBytes', JSON.stringify(savedBytes));
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
