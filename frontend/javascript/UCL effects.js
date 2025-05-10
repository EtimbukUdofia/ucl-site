


// document.addEventListener("DOMContentLoaded", () => {
//   const observerOptions = {
//       root: null, // viewport
//       rootMargin: "0px",
//       threshold: 0.2 // Trigger when 10% of the element is visible
//   };

//   // Function to create and apply an observer
//   function createObserver(className, animationClass) {
//       const observer = new IntersectionObserver((entries) => {
//           entries.forEach((entry) => {
//               // console.log(`Observed Element: ${entry.target.className}`);
//               // console.log("Is Intersecting:", entry.isIntersecting);

//               if (entry.isIntersecting) {
//                   entry.target.classList.add(animationClass);
//               } else {
//                   entry.target.classList.remove(animationClass);
//               }
//           });
//       }, observerOptions);

//       // Function to observe new elements
//       function observeNewElements() {
//           document.querySelectorAll(`.${className}`).forEach((el) => observer.observe(el));
//       }

//       // Initial observation for elements already present
//       observeNewElements();

//       // MutationObserver to detect dynamically added elements
//       const mutationObserver = new MutationObserver(() => {
//           observeNewElements();
//       });

//       mutationObserver.observe(document.body, { childList: true, subtree: true });
//   }

//   // Apply observers for different directions
//   createObserver("hidden", "show");    // For down-up animation
//   createObserver("hidden2", "show2");  // For left-side animation
//   createObserver("hidden3", "show3");  // For right-side animation
// });
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.2 // Increased to 20% visibility
    };

    function createObserver(className, animationClass) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    obs.unobserve(entry.target); // Stops observing after animation
                }
            });
        }, observerOptions);

        function observeNewElements() {
            document.querySelectorAll(`.${className}`).forEach((el) => observer.observe(el));
        }

        observeNewElements();

        const mutationObserver = new MutationObserver(() => {
            observeNewElements();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    createObserver("hidden", "show");
    createObserver("hidden2", "show2");
    createObserver("hidden3", "show3");
});


