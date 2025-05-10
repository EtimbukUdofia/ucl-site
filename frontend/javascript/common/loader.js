// // Football Loader - Standalone Component
// class FootballLoader {
//     constructor() {
//         this.loader = null;
//         this.spinInterval = null;
//         this.init();
//     }

//     init() {
//         // Create style element
//         const loaderStyles = document.createElement('style');
//         loaderStyles.textContent = `
//             .football-loader {
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 background: rgba(0, 0, 0, 0.8);
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 z-index: 9999;
//                 font-family: 'Saira Condensed', sans-serif;
//                 transition: opacity 0.5s ease;
//             }
            
//             .loader-container {
//                 position: relative;
//                 width: 300px;
//                 height: 200px;
//             }
            
//             .pitch {
//                 position: absolute;
//                 width: 100%;
//                 height: 100%;
//                 background: #0a5c36;
//                 border-radius: 10px;
//                 overflow: hidden;
//                 border: 4px solid #fff;
//             }
            
//             .pitch::before {
//                 content: '';
//                 position: absolute;
//                 top: 0;
//                 left: 50%;
//                 transform: translateX(-50%);
//                 width: 2px;
//                 height: 100%;
//                 background: #fff;
//             }
            
//             .pitch::after {
//                 content: '';
//                 position: absolute;
//                 top: 50%;
//                 left: 50%;
//                 transform: translate(-50%, -50%);
//                 width: 60px;
//                 height: 60px;
//                 border: 2px solid #fff;
//                 border-radius: 50%;
//             }
            
//             .goall, .goalr {
//                 position: absolute;
//                 top: 50%;
//                 transform: translateY(-50%);
//                 width: 10px;
//                 height: 40px;
//                 background: #fff;
//             }
            
//             .goall { left: 0; }
//             .goalr { right: 0; }
            
//             .ball {
//                 position: absolute;
//                 width: 20px;
//                 height: 20px;
//                 background: #fff;
//                 border-radius: 50%;
//                 top: 50%;
//                 left: 50%;
//                 transform: translate(-50%, -50%);
//                 animation: shoot 2.5s infinite ease-in-out;
//                 z-index: 10;
//             }
            
//             .ball::before {
//                 content: '';
//                 position: absolute;
//                 width: 100%;
//                 height: 100%;
//                 background: transparent;
//                 border-radius: 50%;
//                 border: 2px solid #1a1a1a;
//             }
            
//             .loading-text {
//                 position: absolute;
//                 bottom: -40px;
//                 left: 50%;
//                 transform: translateX(-50%);
//                 color: #fff;
//                 font-size: 1.2rem;
//                 text-transform: uppercase;
//                 letter-spacing: 2px;
//                 animation: pulse 1.5s infinite alternate;
//             }
            
//             @keyframes shoot {
//                 0%, 100% { transform: translate(-50%, -50%); }
//                 25% { transform: translate(-150%, -50%); }
//                 50% { transform: translate(50%, -50%); }
//                 75% { transform: translate(-50%, -50%); }
//             }
            
//             @keyframes pulse {
//                 from { opacity: 0.6; text-shadow: 0 0 5px rgba(255,255,255,0.3); }
//                 to { opacity: 1; text-shadow: 0 0 15px rgba(255,255,255,0.7); }
//             }
//         `;
//         document.head.appendChild(loaderStyles);

//         // Create loader HTML
//         this.loader = document.createElement('div');
//         this.loader.className = 'football-loader';
//         this.loader.style.display = 'none'; // Start hidden
        
//         const loaderContainer = document.createElement('div');
//         loaderContainer.className = 'loader-container';
        
//         const pitch = document.createElement('div');
//         pitch.className = 'pitch';
        
//         this.ball = document.createElement('div');
//         this.ball.className = 'ball';
        
//         const goalLeft = document.createElement('div');
//         goalLeft.className = 'goall';
        
//         const goalRight = document.createElement('div');
//         goalRight.className = 'goalr';
        
//         this.loadingText = document.createElement('div');
//         this.loadingText.className = 'loading-text';
//         this.loadingText.textContent = 'Loading...';
        
//         // Assemble loader
//         pitch.appendChild(this.ball);
//         loaderContainer.appendChild(pitch);
//         loaderContainer.appendChild(goalLeft);
//         loaderContainer.appendChild(goalRight);
//         loaderContainer.appendChild(this.loadingText);
//         this.loader.appendChild(loaderContainer);
        
//         document.body.appendChild(this.loader);
//     }

//     show(text = 'Loading...') {
//         this.loadingText.textContent = text;
//         this.loader.style.display = 'flex';
//         this.loader.style.opacity = '1';
        
//         // Start ball spinning animation
//         let rotation = 0;
//         this.spinInterval = setInterval(() => {
//             rotation += 30;
//             this.ball.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
//         }, 100);
//     }

//     hide() {
//         if (this.spinInterval) {
//             clearInterval(this.spinInterval);
//             this.spinInterval = null;
//         }
        
//         this.loader.style.opacity = '0';
//         setTimeout(() => {
//             this.loader.style.display = 'none';
//         }, 500);
//     }
// }

// // Create global instance
// const footballLoader = new FootballLoader();

// // Make it available globally (optional)
// window.footballLoader = footballLoader;


// Modern Football Loader - Minimalist Version
class FootballLoader {
  constructor() {
    this.loader = null;
    this.animationFrame = null;
    this.init();
  }

  init() {
    // Create style element
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
      .football-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: 'Saira Condensed', sans-serif;
      }
      
      .ball-container {
        position: relative;
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
      }
      
      .ball {
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
      }
      
      .ball::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: transparent;
        border: 2px solid black;
      }
      
      .ball::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #fff, #ddd);
      }
      
      .trail {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px dashed rgba(255, 255, 255, 0.3);
      }
      
      .loading-text {
        color: white;
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        animation: pulse 1.5s infinite alternate;
      }
      
      @keyframes pulse {
        from { opacity: 0.6; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(loaderStyles);

    // Create loader HTML
    this.loader = document.createElement('div');
    this.loader.className = 'football-loader';
    this.loader.style.display = 'none';
    
    const ballContainer = document.createElement('div');
    ballContainer.className = 'ball-container';
    
    this.ball = document.createElement('div');
    this.ball.className = 'ball';
    
    this.trail = document.createElement('div');
    this.trail.className = 'trail';
    
    this.loadingText = document.createElement('div');
    this.loadingText.className = 'loading-text';
    this.loadingText.textContent = 'Loading...';
    
    // Assemble loader
    ballContainer.appendChild(this.trail);
    ballContainer.appendChild(this.ball);
    this.loader.appendChild(ballContainer);
    this.loader.appendChild(this.loadingText);
    
    document.body.appendChild(this.loader);
  }

  show(text = 'Loading...') {
    this.loadingText.textContent = text;
    this.loader.style.display = 'flex';
    
    let angle = 0;
    const radius = 30;
    const centerX = 50;
    const centerY = 50;
    
    const animate = () => {
      angle += 0.05;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      this.ball.style.left = `${x}%`;
      this.ball.style.top = `${y}%`;
      
      // Create a fading trail effect
      this.trail.style.borderColor = `rgba(255, 255, 255, ${Math.abs(Math.sin(angle * 2))})`;
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
  }

  hide() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.loader.style.display = 'none';
  }
}

// Create global instance
const footballLoader = new FootballLoader();