/**
 * Hindu Calendar - Main Application
 * Production-ready initialization and coordination
 */

class HinduCalendarApp {
  constructor() {
    this.engine = null;
    this.ui = null;
    this.isInitialized = false;
    this.dataLoaded = false;
    
    // Bind methods to preserve context
    this.init = this.init.bind(this);
    this.handleDataLoad = this.handleDataLoad.bind(this);
    this.handleError = this.handleError.bind(this);
    
    // Start initialization
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('Hindu Calendar: Starting initialization...');
      
      // Show loading indicator
      // this.showLoading('Initializing calendar system...');
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this.handleDataLoad);
      } else {
        await this.handleDataLoad();
      }
      
    } catch (error) {
      this.handleError('Initialization failed', error);
    }
  }

  /**
   * Handle when DOM and data are ready
   */
  async handleDataLoad() {
    try {
      console.log('Hindu Calendar: DOM ready, checking data availability...');
      
      // Check if required data is loaded
      const maxAttempts = 10; // 1 second timeout (since scripts load synchronously now)
      let attempts = 0;
      
      while (!this.dataLoaded && attempts < maxAttempts) {
        this.dataLoaded = this.checkDataAvailability();
        if (!this.dataLoaded) {
          await this.delay(100); // Wait 100ms
          attempts++;
        }
      }
      
      if (!this.dataLoaded) {
        throw new Error('Required data modules failed to load');
      }
      
      console.log('Hindu Calendar: Data loaded successfully');
      
      // Initialize core components
      await this.initializeComponents();
      
      // Setup global error handling
      this.setupErrorHandling();
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring();
      
      // Mark as initialized
      this.isInitialized = true;
      
      console.log('Hindu Calendar: Application initialized successfully');
      
      // Hide loading indicator
      this.hideLoading();
      
    } catch (error) {
      this.handleError('Data loading failed', error);
    }
  }

  /**
   * Check if all required data modules are available
   */
  checkDataAvailability() {
    const requiredGlobals = [
      'HINDU_MONTHS_2024_2025',
      'FESTIVALS_2024',
      'FESTIVALS_2025',
      'EKADASHI_2024',
      'EKADASHI_2025',
      'getEkadashiData',
      'getNextEkadashi',
      'HinduCalendarEngine',
      'HinduCalendarUI'
    ];
    
    const missingModules = requiredGlobals.filter(name => typeof window[name] === 'undefined');
    const availableModules = requiredGlobals.filter(name => typeof window[name] !== 'undefined');
    
    if (missingModules.length > 0) {
      console.log(`Hindu Calendar: Available modules: ${availableModules.join(', ')}`);
      console.log(`Hindu Calendar: Missing modules: ${missingModules.join(', ')}`);
      return false;
    }
    
    return true;
  }

  /**
   * Initialize core application components
   */
  async initializeComponents() {
    console.log('Hindu Calendar: Initializing core components...');
    
    // Initialize calendar engine
    // this.showLoading('...');
    this.engine = new HinduCalendarEngine();
    
    // Small delay to show loading progression
    // await this.delay(100);
    
    // Initialize UI manager
    // this.showLoading('...');
    this.ui = new HinduCalendarUI(this.engine);
    
    // Setup responsive handling
    this.ui.initResponsive();
    
    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    await this.delay(300);
    console.log('Hindu Calendar: Core components ready');
  }

  /**
   * Setup keyboard shortcuts for better accessibility
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (e.key) {
        case 'h':
        case 'Home':
          e.preventDefault();
          this.ui.showView('home');
          break;
          
        case 'u':
          e.preventDefault();
          this.ui.showView('upcoming');
          break;
          
        case 'm':
          e.preventDefault();
          this.ui.showView('months');
          break;
          
        case 'i':
          e.preventDefault();
          this.ui.showView('about');
          break;
          
        case 't':
          e.preventDefault();
          this.goToToday();
          break;
          
        case '?':
          e.preventDefault();
          this.showKeyboardHelp();
          break;
      }
    });
  }

  /**
   * Navigate to current month
   */
  goToToday() {
    if (this.engine) {
      const today = new Date();
      this.engine.navigateToMonth(today.getMonth(), today.getFullYear());
      this.ui.renderCalendar();
      this.ui.showView('home');
    }
  }

  /**
   * Show keyboard shortcuts help
   */
  showKeyboardHelp() {
    const helpContent = `
      <div class="keyboard-help">
        <h3>Keyboard Shortcuts</h3>
        <div class="shortcuts-grid">
          <div class="shortcut-item">
            <kbd>H</kbd> <span>Home</span>
          </div>
          <div class="shortcut-item">
            <kbd>U</kbd> <span>Upcoming Events</span>
          </div>
          <div class="shortcut-item">
            <kbd>M</kbd> <span>Hindu Months</span>
          </div>
          <div class="shortcut-item">
            <kbd>I</kbd> <span>About/Info</span>
          </div>
          <div class="shortcut-item">
            <kbd>T</kbd> <span>Go to Today</span>
          </div>
          <div class="shortcut-item">
            <kbd>←/→</kbd> <span>Previous/Next Month</span>
          </div>
          <div class="shortcut-item">
            <kbd>Esc</kbd> <span>Close Modal</span>
          </div>
          <div class="shortcut-item">
            <kbd>?</kbd> <span>Show this help</span>
          </div>
        </div>
      </div>
    `;
    
    if (this.ui) {
      this.ui.showModal('Keyboard Shortcuts', helpContent);
    }
  }

  /**
   * Setup global error handling
   */
  setupErrorHandling() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Hindu Calendar: Unhandled promise rejection:', event.reason);
      this.handleError('An unexpected error occurred', event.reason);
      event.preventDefault();
    });
    
    // Handle general JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('Hindu Calendar: JavaScript error:', event.error);
      this.handleError('A script error occurred', event.error);
    });
  }

  /**
   * Setup basic performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`Hindu Calendar: Page loaded in ${Math.round(loadTime)}ms`);
        
        // Check if it's too slow
        if (loadTime > 3000) {
          console.warn('Hindu Calendar: Slow page load detected');
        }
      }
    });
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
        
        if (usedMB > limitMB * 0.8) {
          console.warn(`Hindu Calendar: High memory usage: ${usedMB}MB / ${limitMB}MB`);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Show loading indicator
   */
  showLoading(message = 'Loading...') {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) {
      const messageEl = indicator.querySelector('p');
      if (messageEl) messageEl.textContent = message;
      indicator.style.display = 'flex';
    }
  }

  /**
   * Hide loading indicator
   */
  hideLoading() {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }

  /**
   * Handle application errors
   */
  handleError(message, error) {
    console.error(`Hindu Calendar Error: ${message}`, error);
    
    // Hide loading indicator
    this.hideLoading();
    
    // Show user-friendly error message
    this.showErrorMessage(message, error);
    
    // Report error for debugging (in production, you might send to logging service)
    this.reportError(message, error);
  }

  /**
   * Show error message to user
   */
  showErrorMessage(message, error) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerHTML = `
      <div class="error-modal">
        <div class="error-content">
          <div class="error-header">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Something went wrong</h3>
          </div>
          <div class="error-body">
            <p>${message}</p>
            <details class="error-details">
              <summary>Technical Details</summary>
              <pre>${error ? error.toString() : 'Unknown error'}</pre>
            </details>
          </div>
          <div class="error-actions">
            <button onclick="location.reload()" class="btn-primary">
              <i class="fas fa-redo"></i> Reload Page
            </button>
            <button onclick="this.closest('.error-container').remove()" class="btn-secondary">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add styles for error modal
    const style = document.createElement('style');
    style.textContent = `
      .error-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      .error-modal {
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }
      .error-header {
        background: #dc3545;
        color: white;
        padding: 20px;
        border-radius: 12px 12px 0 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .error-body {
        padding: 20px;
      }
      .error-details {
        margin-top: 15px;
      }
      .error-details pre {
        background: #f8f9fa;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 12px;
      }
      .error-actions {
        padding: 20px;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      }
      .btn-primary, .btn-secondary {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .btn-primary {
        background: #ff9933;
        color: white;
      }
      .btn-secondary {
        background: #6c757d;
        color: white;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(errorContainer);
  }

  /**
   * Report error for debugging
   */
  reportError(message, error) {
    // In production, you might send this to a logging service
    const errorReport = {
      timestamp: new Date().toISOString(),
      message: message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : null,
      userAgent: navigator.userAgent,
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    
    // Store locally for debugging
    try {
      const errors = JSON.parse(localStorage.getItem('hindu_calendar_errors') || '[]');
      errors.push(errorReport);
      // Keep only last 10 errors
      if (errors.length > 10) errors.splice(0, errors.length - 10);
      localStorage.setItem('hindu_calendar_errors', JSON.stringify(errors));
    } catch (e) {
      console.warn('Could not store error report:', e);
    }
  }

  /**
   * Utility function for delays
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Public API for external access
   */
  getEngine() {
    return this.engine;
  }

  getUI() {
    return this.ui;
  }

  isReady() {
    return this.isInitialized;
  }

  /**
   * Cleanup and reset (useful for testing)
   */
  destroy() {
    if (this.ui) {
      // Remove event listeners if UI has cleanup method
      if (typeof this.ui.destroy === 'function') {
        this.ui.destroy();
      }
    }
    
    this.engine = null;
    this.ui = null;
    this.isInitialized = false;
    this.dataLoaded = false;
  }
}

// Application instance
let hinduCalendarApp = null;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    hinduCalendarApp = new HinduCalendarApp();
  });
} else {
  hinduCalendarApp = new HinduCalendarApp();
}

// Expose to global scope for debugging
window.hinduCalendarApp = hinduCalendarApp;

// PWA Install Prompt Enhancement
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom install promotion after app loads
  if (hinduCalendarApp && hinduCalendarApp.isReady()) {
    showInstallPromotion();
  } else {
    // Wait for app to be ready
    setTimeout(() => {
      if (deferredPrompt) showInstallPromotion();
    }, 2000);
  }
});

function showInstallPromotion() {
  const installBanner = document.createElement('div');
  installBanner.className = 'install-banner';
  installBanner.innerHTML = `
    <div class="install-content">
      <div class="install-info">
        <i class="fas fa-mobile-alt"></i>
        <div>
          <div class="install-title">Install Hindu Calendar</div>
          <div class="install-subtitle">Access offline, get daily notifications</div>
        </div>
      </div>
      <div class="install-actions">
        <button id="installBtn" class="install-btn-primary">
          <i class="fas fa-download"></i> Install
        </button>
        <button id="dismissBtn" class="install-btn-secondary">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .install-banner {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ff9933, #ffb84d);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      animation: slideUp 0.3s ease;
    }
    .install-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
    }
    .install-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .install-info i {
      font-size: 24px;
    }
    .install-title {
      font-weight: 600;
      font-size: 16px;
    }
    .install-subtitle {
      font-size: 14px;
      opacity: 0.9;
    }
    .install-actions {
      display: flex;
      gap: 10px;
    }
    .install-btn-primary, .install-btn-secondary {
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }
    .install-btn-primary {
      background: white;
      color: #ff9933;
      padding: 10px 16px;
    }
    .install-btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      padding: 10px 12px;
    }
    .install-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .install-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    @keyframes slideUp {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @media (max-width: 480px) {
      .install-banner {
        left: 10px;
        right: 10px;
        bottom: 10px;
      }
      .install-content {
        flex-direction: column;
        gap: 12px;
      }
      .install-actions {
        width: 100%;
        justify-content: center;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(installBanner);
  
  // Handle install
  document.getElementById('installBtn').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      console.log('Install prompt result:', result);
      deferredPrompt = null;
      installBanner.remove();
    }
  });
  
  // Handle dismiss
  document.getElementById('dismissBtn').addEventListener('click', () => {
    installBanner.remove();
  });
  
  // Auto-dismiss after 15 seconds
  setTimeout(() => {
    if (installBanner.parentNode) {
      installBanner.remove();
    }
  }, 15000);
}

// Handle successful app install
window.addEventListener('appinstalled', (evt) => {
  console.log('Hindu Calendar: App successfully installed');
  deferredPrompt = null;
  
  // Show success message
  if (hinduCalendarApp && hinduCalendarApp.ui) {
    hinduCalendarApp.ui.showModal('App Installed!', `
      <div class="install-success">
        <i class="fas fa-check-circle" style="color: #28a745; font-size: 48px; margin-bottom: 16px;"></i>
        <h3>Hindu Calendar installed successfully!</h3>
        <p>You can now access the calendar from your home screen and use it offline.</p>
      </div>
    `);
  }
}); 