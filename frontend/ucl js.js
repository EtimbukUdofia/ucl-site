// const jerseys = [
//     { src: 'images/clubs/jersey PNGs/AC_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/atletico_madrid-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/barcelona-removebg.png' },
//     { src: 'images/clubs/jersey PNGs/chelsea-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/dortmund-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/inter_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/liverpool-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/machester_united-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/manchester_City-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/real madrid jersey.webp' }
// ];

// let index = 1;
// const jerseyImage = document.getElementById("jerseyImage");
// const background = document.getElementById("background");
// // Initialize the background and jersey immediately
// document.addEventListener("DOMContentLoaded", function () {
//     const jerseyImage = document.getElementById("jerseyImage");
//     const background = document.getElementById("background");

//     // Ensure the first jersey and background are set properly
//     jerseyImage.src = jerseys[index].src;
//     background.innerHTML = `<img src="${jerseys[index].src}" alt="">`;
//     background.style.filter = "blur(20px)"; // Ensure the blur effect applies
// });


// // window.onload = function () {
// //     jerseyImage.src = jerseys[index].src;
// //     background.style.backgroundImage = `<img src="${jerseys[index].src}" alt="">`;
// // };



// function updateJersey() {
//     jerseyImage.style.opacity = "0";
//     setTimeout(() => {
//         jerseyImage.src = jerseys[index].src;
//         background.innerHTML = `<img src="${jerseys[index].src}" alt="">`;
//         jerseyImage.style.opacity = "1";
//     }, 300);
// }

// function nextJersey() {
//     index = (index + 1) % jerseys.length;
//     updateJersey();
// }

// function prevJersey() {
//     index = (index - 1 + jerseys.length) % jerseys.length;
//     updateJersey();
// }

// function buyJersey() {
//     alert(`You selected the jersey from Club ${index + 1}!`);
// }

// // Initialize the background
// background.style.backgroundImage = `url(${jerseys[index].src})`;













// const jerseys = [
//     { src: 'images/clubs/jersey PNGs/AC_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/atletico_madrid-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/barcelona-removebg.png' },
//     { src: 'images/clubs/jersey PNGs/chelsea-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/dortmund-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/inter_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/liverpool-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/machester_united-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/manchester_City-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/real madrid jersey.webp' }
// ];

// let index = 0; // Start at the first jersey

// const jerseyImage = document.getElementById("jerseyImage");
// const leftJersey = document.getElementById("leftJersey");
// const rightJersey = document.getElementById("rightJersey");
// const background = document.getElementById("background");
// const carousel = document.querySelector(".carousel");

// //  Initialize the background and jersey immediately
// document.addEventListener("DOMContentLoaded", function () {
//     jerseyImage.src = jerseys[index].src;
//     background.innerHTML = `<img src="${jerseys[index].src}" alt="">`;
//     background.style.filter = "blur(20px)";
//     addBuyButton();
// });

// // Function to update jerseys
// function updateJersey() {
//     jerseyImage.src = jerseys[index].src;
//     background.innerHTML = `<img src="${jerseys[index].src}" alt="">`;

//     // Update left and right jerseys
//     let leftIndex = (index - 1 + jerseys.length) % jerseys.length;
//     let rightIndex = (index + 1) % jerseys.length;

//     leftJersey.src = jerseys[leftIndex].src;
//     rightJersey.src = jerseys[rightIndex].src;
    

//     addBuyButton();
// }

// // Function to add Buy Now button
// function addBuyButton() {
//     let existingButton = document.querySelector(".buy-button");
//     if (existingButton) {
//         existingButton.remove();
//     }

//     let buyButton = document.createElement("button");
//     buyButton.innerText = "Buy Now";
//     buyButton.classList.add("buy-button");
//     buyButton.addEventListener("click", function() {
//         alert("You selected the jersey: " + jerseys[index].src);
//     });
    
//     carousel.appendChild(buyButton);
// }

// // Event listeners for next and previous buttons
// document.getElementById("prevBtn").addEventListener("click", () => {
//     index = (index - 1 + jerseys.length) % jerseys.length;
//     updateJersey();
// });

// document.getElementById("nextBtn").addEventListener("click", () => {
//     index = (index + 1) % jerseys.length;
//     updateJersey();
// });

// // Set initial jerseys on load
// document.addEventListener("DOMContentLoaded", updateJersey);



// const jerseys = [
//     { src: 'images/clubs/jersey PNGs/AC_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/atletico_madrid-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/barcelona-removebg.png' },
//     { src: 'images/clubs/jersey PNGs/chelsea-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/dortmund-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/inter_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/liverpool-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/machester_united-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/manchester_City-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/real madrid jersey.webp' }
// ];

// let index = 0;

// const jerseyImage = document.getElementById("jerseyImage");
// const leftJersey = document.getElementById("leftJersey");
// const rightJersey = document.getElementById("rightJersey");
// const background = document.getElementById("background");
// const carousel = document.querySelector(".carousel");

// // Initialize the carousel
// document.addEventListener("DOMContentLoaded", function () {
//     updateJersey();
// });

// // Function to update jerseys with smooth gliding effect
// function updateJersey(direction) {
//     // Determine the direction of the transition
//     if (direction === "next") {
//         // Move the left jersey to the center
//         leftJersey.style.transform = "translateX(0) scale(1)";
//         leftJersey.style.opacity = "1";
//         leftJersey.style.zIndex = "2";

//         // Move the center jersey to the right
//         jerseyImage.style.transform = "translateX(180px) scale(0.7)";
//         jerseyImage.style.opacity = "0.7";
//         jerseyImage.style.zIndex = "1";

//         // Move the right jersey out of view
//         rightJersey.style.transform = "translateX(360px) scale(0.7)";
//         rightJersey.style.opacity = "0";
//         rightJersey.style.zIndex = "0";
//     } else if (direction === "prev") {
//         // Move the right jersey to the center
//         rightJersey.style.transform = "translateX(0) scale(1)";
//         rightJersey.style.opacity = "1";
//         rightJersey.style.zIndex = "2";

//         // Move the center jersey to the left
//         jerseyImage.style.transform = "translateX(-180px) scale(0.7)";
//         jerseyImage.style.opacity = "0.7";
//         jerseyImage.style.zIndex = "1";

//         // Move the left jersey out of view
//         leftJersey.style.transform = "translateX(-360px) scale(0.7)";
//         leftJersey.style.opacity = "0";
//         leftJersey.style.zIndex = "0";
//     }

//     // Wait for the transition to complete
//     setTimeout(() => {
//         // Update jersey sources
//         jerseyImage.src = jerseys[index].src;
//         background.innerHTML = `<img src="${jerseys[index].src}" alt="">`;

//         // Update left and right jerseys
//         let leftIndex = (index - 1 + jerseys.length) % jerseys.length;
//         let rightIndex = (index + 1) % jerseys.length;

//         leftJersey.src = jerseys[leftIndex].src;
//         rightJersey.src = jerseys[rightIndex].src;

//         // Reset positions after the transition
//         jerseyImage.style.transform = "translateX(0) scale(1)";
//         jerseyImage.style.opacity = "1";
//         jerseyImage.style.zIndex = "2";

//         leftJersey.style.transform = "translateX(-180px) scale(0.7)";
//         leftJersey.style.opacity = "0.7";
//         leftJersey.style.zIndex = "1";

//         rightJersey.style.transform = "translateX(180px) scale(0.7)";
//         rightJersey.style.opacity = "0.7";
//         rightJersey.style.zIndex = "1";

//         addBuyButton();
//     }, 500); // Match this duration with the CSS transition duration
// }

// // Function to add Buy Now button
// function addBuyButton() {
//     let existingButton = document.querySelector(".buy-button");
//     if (existingButton) {
//         existingButton.remove();
//     }

//     let buyButton = document.createElement("button");
//     buyButton.innerText = "Buy Now";
//     buyButton.classList.add("buy-button");
//     buyButton.addEventListener("click", function() {
//         alert("You selected the jersey: " + jerseys[index].src);
//     });
    
//     carousel.appendChild(buyButton);
// }

// // Event listeners for next and previous buttons
// document.getElementById("prevBtn").addEventListener("click", () => {
//     index = (index - 1 + jerseys.length) % jerseys.length;
//     updateJersey("prev");
// });

// document.getElementById("nextBtn").addEventListener("click", () => {
//     index = (index + 1) % jerseys.length;
//     updateJersey("next");
// });



const jerseys = [
    { src: 'images/clubs/jersey PNGs/AC_milan-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/atletico_madrid-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/barcelona-removebg.png' },
    { src: 'images/clubs/jersey PNGs/chelsea-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/dortmund-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/inter_milan-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/liverpool-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/machester_united-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/manchester_City-removebg-preview.png' },
    { src: 'images/clubs/jersey PNGs/real madrid jersey.webp' }
];

let index = 0;

const jerseyImage = document.getElementById("jerseyImage");
const leftJersey = document.getElementById("leftJersey");
const rightJersey = document.getElementById("rightJersey");
const background = document.getElementById("background");
const carousel = document.querySelector(".carousel");

// Initialize the carousel
document.addEventListener("DOMContentLoaded", function () {
    updateJersey();
});

// Function to update jerseys with smooth transitions
function updateJersey(direction) {
    if (direction === "prev") {
        // Move the left jersey to the center
        leftJersey.style.transform = "translateX(0) scale(1)";
        leftJersey.style.opacity = "1";
        leftJersey.style.zIndex = "2";

        // Move the center jersey to the right
        jerseyImage.style.transform = "translateX(180px) scale(0.7)";
        jerseyImage.style.opacity = "0.7";
        jerseyImage.style.zIndex = "1";

        // Move the right jersey out of view
        rightJersey.style.transform = "translateX(360px) scale(0.7)";
        rightJersey.style.opacity = "0";
        rightJersey.style.zIndex = "0";
    } else if (direction === "next") {
        // Move the right jersey to the center
        rightJersey.style.transform = "translateX(0) scale(1)";
        rightJersey.style.opacity = "1";
        rightJersey.style.zIndex = "2";

        // Move the center jersey to the left
        jerseyImage.style.transform = "translateX(-180px) scale(0.7)";
        jerseyImage.style.opacity = "0.7";
        jerseyImage.style.zIndex = "1";

        // Move the left jersey out of view
        leftJersey.style.transform = "translateX(-360px) scale(0.7)";
        leftJersey.style.opacity = "0";
        leftJersey.style.zIndex = "0";
    }

    // Wait for the transition to complete
    setTimeout(() => {
        // Update jersey sources
        jerseyImage.src = jerseys[index].src;
        background.innerHTML = `<img src="${jerseys[index].src}" alt="">`;

        // Update left and right jerseys
        let leftIndex = (index - 1 + jerseys.length) % jerseys.length;
        let rightIndex = (index + 1) % jerseys.length;

        leftJersey.src = jerseys[leftIndex].src;
        rightJersey.src = jerseys[rightIndex].src;

        // Reset positions after the transition
        jerseyImage.style.transform = "translateX(0) scale(1.03)";
        jerseyImage.style.opacity = "1";
        jerseyImage.style.zIndex = "2";
        jerseyImage.style.transition = ".6s";

        leftJersey.style.transform = "translateX(-180px) scale(0.7)";
        leftJersey.style.opacity = "0.7";
        leftJersey.style.zIndex = "1";

        rightJersey.style.transform = "translateX(180px) scale(0.7)";
        rightJersey.style.opacity = "0.7";
        rightJersey.style.zIndex = "1";

        addBuyButton();
    }, 300); // Match this duration with the CSS transition duration
}

// Function to add Buy Now button
function addBuyButton() {
    let existingButton = document.querySelector(".buy-button");
    if (existingButton) {
        existingButton.remove();
    }

    let buyButton = document.createElement("button");
    buyButton.innerText = "Buy Now";
    buyButton.classList.add("buy-button");
    buyButton.addEventListener("click", function() {
        alert("You selected the jersey: " + jerseys[index].src);
    });
    
    carousel.appendChild(buyButton);
}

// Event listeners for next and previous buttons
document.getElementById("prevBtn").addEventListener("click", () => {
    index = (index - 1 + jerseys.length) % jerseys.length;
    updateJersey("prev");
});

document.getElementById("nextBtn").addEventListener("click", () => {
    index = (index + 1) % jerseys.length;
    updateJersey("next");
});



// const jerseys = [
//     { src: 'images/clubs/jersey PNGs/AC_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/atletico_madrid-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/barcelona-removebg.png' },
//     { src: 'images/clubs/jersey PNGs/chelsea-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/dortmund-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/inter_milan-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/liverpool-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/machester_united-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/manchester_City-removebg-preview.png' },
//     { src: 'images/clubs/jersey PNGs/real madrid jersey.webp' }
// ];

// let index = 0;
// let pause = false;
// const jerseyImage = document.getElementById("jerseyImage");
// const leftJersey = document.getElementById("leftJersey");
// const rightJersey = document.getElementById("rightJersey");
// const background = document.getElementById("background");
// const carousel = document.querySelector(".carousel");

// // Initialize the carousel
// document.addEventListener("DOMContentLoaded", function () {
//     updateJersey();
// });

// // Function to update jerseys with smooth 3D carousel effect
// function updateJersey(direction) {
//     leftJersey.style.transition = "transform 0.5s ease, opacity 0.5s ease";
//     rightJersey.style.transition = "transform 0.5s ease, opacity 0.5s ease";
//     jerseyImage.style.transition = "transform 0.5s ease, opacity 0.5s ease";

//     if (direction === "prev") {
//         index = (index - 1 + jerseys.length) % jerseys.length;
        
//     } else {
//         index = (index + 1) % jerseys.length;
        
//     }

//     jerseyImage.src = jerseys[index].src;
//     background.innerHTML = `<img src="${jerseys[index].src}" alt="">`;

//     let leftIndex = (index - 1 + jerseys.length) % jerseys.length;
//     let rightIndex = (index + 1) % jerseys.length;

//     leftJersey.src = jerseys[leftIndex].src;
//     rightJersey.src = jerseys[rightIndex].src;

//     jerseyImage.style.transform = "translateX(0) scale(1)";
//     leftJersey.style.transform = "translateX(-180px) scale(0.8)";
//     rightJersey.style.transform = "translateX(180px) scale(0.8)";

//     leftJersey.style.opacity = "0.8";
//     rightJersey.style.opacity = "0.8";
//     jerseyImage.style.opacity = "1";

//     addBuyButton();
// }

// // Auto-rotate jerseys every 2 seconds
// // let autoRotate = setInterval(() => {
// //     if (!pause) {
// //         updateJersey("next");
// //     }
// // }, 2000);

// // Function to play/pause auto rotation
// function playPause() {
//     let state = document.querySelector(".icon");
//     if (state.innerHTML == "pause") {
//         state.innerHTML = "play_arrow";
//         pause = true;
//     } else {
//         state.innerHTML = "pause";
//         pause = false;
//     }
// }

// // Function to add Buy Now button
// function addBuyButton() {
//     let existingButton = document.querySelector(".buy-button");
//     if (existingButton) {
//         existingButton.remove();
//     }

//     let buyButton = document.createElement("button");
//     buyButton.innerText = "Buy Now";
//     buyButton.classList.add("buy-button");
//     buyButton.addEventListener("click", function() {
//         alert("You selected the jersey: " + jerseys[index].src);
//     });
    
//     carousel.appendChild(buyButton);
// }

// // Event listeners for next and previous buttons
// document.getElementById("prevBtn").addEventListener("click", () => {
//     updateJersey("prev");
// });

// document.getElementById("nextBtn").addEventListener("click", () => {
//     updateJersey("next");
// });

