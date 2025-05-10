class FunErrorNotifier {
    constructor() {
      this.createStyles();
      this.container = this.createContainer();
      document.body.appendChild(this.container);
    }
  
    createStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .fun-error-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0,0,0,0.7);
          z-index: 9999;
          pointer-events: none;
        }
        
        .fun-error-content {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 80%;
          text-align: center;
          pointer-events: auto;
          animation: bounceIn 0.6s;
        }
        
        .error-illustration {
          width: 150px;
          height: 150px;
          margin: 0 auto 1.5rem;
          position: relative;
        }
        
        .error-face {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #FF5252;
          position: relative;
          overflow: hidden;
        }
        
        .error-eyes {
          display: flex;
          justify-content: space-around;
          width: 60%;
          margin: 30% auto 0;
        }
        
        .error-eye {
          width: 25px;
          height: 25px;
          background: white;
          border-radius: 50%;
          position: relative;
        }
        
        .error-eye:after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background: #333;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .error-mouth {
          width: 40px;
          height: 20px;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          background: white;
          margin: 15px auto 0;
          position: relative;
          overflow: hidden;
        }
        
        .error-mouth:after {
          content: 'Oops!';
          position: absolute;
          width: 100%;
          text-align: center;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          font-weight: bold;
          color: #333;
          font-size: 14px;
          top: 30px;
          left: 0;
        }
        
        .error-sweat {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #64B5F6;
          border-radius: 50%;
          top: 20%;
          right: 20%;
          animation: sweatDrop 2s infinite;
        }
        
        .error-message {
          font-family: 'Saira Condensed', sans-serif;
          font-size: 1.2rem;
          margin: 1rem 0;
          color: #333;
        }
        
        .error-retry-btn {
          background: #FF5252;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-family: 'Saira Condensed', sans-serif;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 1rem;
        }
        
        .error-retry-btn:hover {
          background: #FF1744;
          transform: scale(1.05);
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        
        @keyframes sweatDrop {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(30px) scale(0.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  
    createContainer() {
      const container = document.createElement('div');
      container.className = 'fun-error-container';
      container.style.display = 'none';
      return container;
    }
  
    showError(message, retryCallback = null) {
      this.container.innerHTML = `
        <div class="fun-error-content">
          <div class="error-illustration">
            <div class="error-face">
              <div class="error-eyes">
                <div class="error-eye"></div>
                <div class="error-eye"></div>
              </div>
              <div class="error-mouth"></div>
              <div class="error-sweat"></div>
            </div>
          </div>
          <div class="error-message">${message}</div>
          ${retryCallback ? '<button class="error-retry-btn">Try Again</button>' : ''}
        </div>
      `;
      
      this.container.style.display = 'flex';
      
      if (retryCallback) {
        this.container.querySelector('.error-retry-btn').addEventListener('click', () => {
          this.hide();
          retryCallback();
        });
      }
    }
  
    hide() {
      this.container.style.display = 'none';
    }
  }
  
  // Initialize globally
  window.funErrorNotifier = new FunErrorNotifier();
  
  // Optional: Auto-attach to fetch errors
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    try {
      return await originalFetch.apply(this, args);
    } catch (error) {
      funErrorNotifier.showError(
        'Failed to connect to the server. Please check your internet connection.',
        () => window.location.reload()
      );
      throw error;
    }
  };