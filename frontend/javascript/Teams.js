const container = document.getElementById("container");
const teamLinks = document.getElementById("teamLinks");
// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    teamLinks.classList.toggle('active');
});

// Show loader when page is loading
footballLoader.show("Loading Teams...");
// Close menu when a team is selected (for mobile)
document.querySelectorAll('.team-links li').forEach(link => {
    link.addEventListener('click', () => {
        footballLoader.show("Loading Team Data...");
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('open');
            teamLinks.classList.remove('active');
        }
    });
});

function showToast(message, duration = 5000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        hideToast(toast);
    });
    
    // Auto-hide after duration
    if (duration) {
        setTimeout(() => {
            hideToast(toast);
        }, duration);
    }
    
    return toast;
}

function hideToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        toast.remove();
    }, 300);
}


// Add scroll arrows for medium screens (980px-1270px)
function setupNavScroll() {
    if (window.innerWidth > 980 && window.innerWidth < 1270) {
        // Create arrows if they don't exist
        if (!document.querySelector('.nav-scroll-arrows')) {
            const arrows = document.createElement('div');
            arrows.className = 'nav-scroll-arrows';
            arrows.innerHTML = `
                <button class="nav-scroll-arrow left">&lt;</button>
                <button class="nav-scroll-arrow right">&gt;</button>
            `;
            document.querySelector('.nav-container').appendChild(arrows);
            
            // Add click handlers
            document.querySelector('.nav-scroll-arrow.left').addEventListener('click', () => {
                teamLinks.scrollBy({ left: -100, behavior: 'smooth' });
            });
            
            document.querySelector('.nav-scroll-arrow.right').addEventListener('click', () => {
                teamLinks.scrollBy({ left: 100, behavior: 'smooth' });
            });
            
            // Update arrow visibility based on scroll position
            function updateNavArrows() {
                const leftArrow = document.querySelector('.nav-scroll-arrow.left');
                const rightArrow = document.querySelector('.nav-scroll-arrow.right');
                
                leftArrow.classList.toggle('hidden', teamLinks.scrollLeft <= 0);
                rightArrow.classList.toggle('hidden', 
                    teamLinks.scrollLeft >= teamLinks.scrollWidth - teamLinks.clientWidth - 1);
            }
            
            teamLinks.addEventListener('scroll', updateNavArrows);
            updateNavArrows();
        }
    } else {
        // Remove arrows if they exist and we're outside the medium screen range
        const arrows = document.querySelector('.nav-scroll-arrows');
        if (arrows) arrows.remove();
    }
}

// Call on load and resize
window.addEventListener('load', setupNavScroll);
window.addEventListener('resize', setupNavScroll);


// Fetch JSON file and display data
fetch('TeamData.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        
        // Create navigation links
        data.teams.forEach(team => {
            const teamLink = document.createElement("li");
            teamLink.textContent = team.name;
            teamLink.dataset.teamId = team.class;
            teamLinks.appendChild(teamLink);
            
            // Create team container
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("Team-container");
            teamDiv.setAttribute('id', team.class);
            
            const PlayerList = data.players.filter(player => 
                player.team === team.name
            );
            
            teamDiv.innerHTML = `
                <div class="team-banner">
                    <img src="${team.stadium.image}" alt="">
                    <div class="team-banner-cover">
                        <div class="club-identity hidden3">
                            <p>HOME | ${team.name}</p>
                            <h1 class="club-name">${team.name}</h1>
                            ${team.eliminated ? " <button class='club-status absent'>Eliminated</button>":"<button class='club-status present'>Progress</button>"}    
                        </div>
                    </div>
                </div>
                <div class="team-info">
                    <div class="squad-photo">
                        <img src="${team.Squad_img}" alt="">
                    </div>
                    <div class="team-stats">
                        <img src="images/wallpapersden.com_grass-close-up-green_2048x1365.jpg" alt="">
                        <div class="team-stats-cover">
                            <h2>${team.name.toUpperCase()} SQUAD FOR THE SEASON 2024-25</h2>
                            <div class="team-stats-container-values">
                                <div class="team-stats-values">
                                    <h3 id="Matches-Played">${team.matches_played}</h3>
                                    <p class="stats-desc">Matches Played</p>
                                    <div class="team-wins-loss">
                                        <p>Victories: <span id="victories">${team.victories}</span></p> / 
                                        <p>Defeats: <span id="defeats">${team.defeats}</span></p> / 
                                        <p>Draws: <span id="Draws">${team.draws}</span></p>
                                    </div>
                                    <i class="fas fa-plus-circle"></i>
                                </div>
                                <div class="team-stats-values">
                                    <h3 id="Goals-Scored">${team.Goal_scored}</h3>
                                    <p class="stats-desc">Goals Scored</p>
                                    <div class="team-wins-loss">
                                        <p id="Goals-Conceded">${team.Goals_conceded}</p> <p>Goals Conceded</p>
                                    </div>
                                    <i class="fas fa-plus-circle"></i>
                                </div>
                                <div class="team-stats-values">
                                    <h3 id="Goals-Scored">0</h3>
                                    <p class="stats-desc">Titles</p>
                                    <i class="fas fa-plus-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="players">
                    <h1>${team.name.toUpperCase()} SQUAD FOR 24/25 SEASON</h1>
                    <div class="positions">
                        <!-- Goalkeepers -->
                        <div class="player-list-wrapper">
                            <div class="scroll-arrows">
                                <button class="scroll-arrow left">&lt;</button>
                                <button class="scroll-arrow right">&gt;</button>
                            </div>
                            <h2 class="players-positions">Goalkeepers</h2>
                            <div class="player-list" id="Goalkeepers">
                                ${PlayerList.filter(player => player.position ==='Goalkeeper').map(player => { 
                                    return `
                                        <div class="player hidden" id="${player.id}">
                                            <img src="${player.profile_pic}" alt="">
                                            <div class="player-cover">
                                                <div class="player-cover-content">
                                                    <div class="player-name-position">
                                                        <h3 id="position">${player.position}</h3>
                                                        <h2 id="player_name">${player.name}</h2>
                                                    </div>
                                                    <button class="player_profile_btn">
                                                        Player Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>

                        <!-- Defenders -->
                        <div class="player-list-wrapper">
                            <div class="scroll-arrows">
                                <button class="scroll-arrow left">&lt;</button>
                                <button class="scroll-arrow right">&gt;</button>
                            </div>
                            <h2 class="players-positions">Defenders</h2>
                            <div class="player-list" id="Defenders">
                                ${PlayerList.filter(player => player.position ==='Defender').map(player => { 
                                    return `
                                        <div class="player hidden" id="${player.id}">
                                            <img src="${player.profile_pic}" alt="">
                                            <div class="player-cover">
                                                <div class="player-cover-content">
                                                    <div class="player-name-position">
                                                        <h3 id="position">${player.position}</h3>
                                                        <h2 id="player_name">${player.name}</h2>
                                                    </div>
                                                    <button class="player_profile_btn">
                                                        Player Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>

                        <!-- Midfielders -->
                        <div class="player-list-wrapper">
                            <div class="scroll-arrows">
                                <button class="scroll-arrow left">&lt;</button>
                                <button class="scroll-arrow right">&gt;</button>
                            </div>
                            <h2 class="players-positions">Midfielders</h2>
                            <div class="player-list" id="Midfielders">
                                ${PlayerList.filter(player => player.position ==='Midfielder').map(player => { 
                                    return `
                                        <div class="player hidden" id="${player.id}">
                                            <img src="${player.profile_pic}" alt="">
                                            <div class="player-cover">
                                                <div class="player-cover-content">
                                                    <div class="player-name-position">
                                                        <h3 id="position">${player.position}</h3>
                                                        <h2 id="player_name">${player.name}</h2>
                                                    </div>
                                                    <button class="player_profile_btn">
                                                        Player Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>

                        <!-- Forwards -->
                        <div class="player-list-wrapper">
                            <div class="scroll-arrows">
                                <button class="scroll-arrow left">&lt;</button>
                                <button class="scroll-arrow right">&gt;</button>
                            </div>
                            <h2 class="players-positions">Forwards</h2>
                            <div class="player-list" id="Forwards">
                                ${PlayerList.filter(player => player.position ==='Forward').map(player => { 
                                    return `
                                        <div class="player hidden" id="${player.id}">
                                            <img src="${player.profile_pic}" alt="">
                                            <div class="player-cover">
                                                <div class="player-cover-content">
                                                    <div class="player-name-position">
                                                        <h3 id="position">${player.position}</h3>
                                                        <h2 id="player_name">${player.name}</h2>
                                                    </div>
                                                    <button class="player_profile_btn">
                                                        Player Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>

                        <!-- Manager -->
                        <div class="player-list-wrapper">
                            <div class="scroll-arrows">
                                <button class="scroll-arrow left">&lt;</button>
                                <button class="scroll-arrow right">&gt;</button>
                            </div>
                            <h2 class="players-positions">Manager</h2>
                            <div class="player-list" id="Manager">
                                ${PlayerList.filter(player => player.position ==='Manager').map(player => { 
                                    return `
                                        <div class="player hidden" id="${player.id}">
                                            <img src="${player.profile_pic}" alt="">
                                            <div class="player-cover">
                                                <div class="player-cover-content">
                                                    <div class="player-name-position">
                                                        <h3 id="position">${player.position}</h3>
                                                        <h2 id="player_name">${player.name}</h2>
                                                    </div>
                                                    <button class="player_profile_btn">
                                                        Player Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(teamDiv);
            
            // Add click event to team link
            teamLink.addEventListener("click", () => {
                // Remove active class from all links
                document.querySelectorAll(".team-links li").forEach(link => {
                    link.classList.remove("active");
                });
                
                // Add active class to clicked link
                teamLink.classList.add("active");
                
                // Hide all teams
                document.querySelectorAll(".Team-container").forEach(team => {
                    team.classList.remove("active");
                });
                
                // Show selected team
                document.getElementById(team.class).classList.add("active");
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        });
        
        // Show the first team by default
        if (data.teams.length > 0) {
            document.getElementById(data.teams[0].class).classList.add("active");
            teamLinks.children[0].classList.add("active");
        }
        
        // Player profile button functionality
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('player_profile_btn')) {
                const player_ssection = document.querySelector(".player_info");
                const playerId = e.target.closest('.player').id;
                const playerData = data.players.find(p => p.id == playerId);
                
                const player_infromation = `
                    <i id="player_cancel_btn" class="fa-solid fa-xmark"></i>
                    <div class="player_info_content">
                        <div class="player_img ${playerData.team.replace(/\s+/g, '-').toLowerCase()}-specified">
                            <img class="player_profile_club_logo" src="${
                                data.teams.find(team => playerData.team === team.name).squad_logo
                            }" alt="">
                            <div class="player_info_pic">
                                <img src="${playerData.profile_pic}" alt="">
                            </div>
                        </div>
                        <div class="player_individual_info ${playerData.team.replace(/\s+/g, '-').toLowerCase()}-specified">
                            <h2 id="player_name">${playerData.name}</h2>
                            <h2>${playerData.position}</h2>
                            <div class="player_information">
                                <div><h3>Goals:</h3><p>${playerData.goals || '0'}</p></div>
                                <div><h3>Assists:</h3><p>${playerData.assists || '0'}</p></div>
                                <div><h3>Saves:</h3><p>${playerData.saves || '0'}</p></div>
                                <div><h3>Tackles:</h3><p>${playerData.tackles || '0'}</p></div>
                                <div><h3>Height:</h3><p>${playerData.height}</p></div>
                                <div><h3>Weight:</h3><p>${playerData.weight}</p></div>
                                <div><h3>Age:</h3><p>${playerData.age}</p></div>
                            </div>
                        </div>
                    </div>
                `;

                player_ssection.classList.add("active");
                player_ssection.innerHTML = player_infromation;
            }
            
            if (e.target && e.target.id === 'player_cancel_btn') {
                document.querySelector(".player_info").classList.remove("active");
            }
        });

        // Scroll arrow functionality for mobile
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('scroll-arrow')) {
                const arrow = e.target;
                const playerList = arrow.closest('.player-list-wrapper').querySelector('.player-list');
                const scrollAmount = window.innerWidth * 0.8; // Scroll 80% of viewport width
                
                if (arrow.classList.contains('left')) {
                    playerList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    playerList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        });

        // Function to update arrow visibility based on scroll position
        function updateArrowVisibility() {
            document.querySelectorAll('.player-list').forEach(list => {
                const wrapper = list.closest('.player-list-wrapper');
                if (!wrapper) return;
                
                const leftArrow = wrapper.querySelector('.scroll-arrow.left');
                const rightArrow = wrapper.querySelector('.scroll-arrow.right');
                
                if (leftArrow && rightArrow) {
                    leftArrow.style.display = list.scrollLeft > 0 ? 'flex' : 'none';
                    rightArrow.style.display = list.scrollLeft < list.scrollWidth - list.clientWidth ? 'flex' : 'none';
                }
            });
        }

        // Initialize arrows on load
        window.addEventListener('load', function() {
            // Wait for elements to be fully rendered
            setTimeout(updateArrowVisibility, 500);
        });

        // Update on resize
        window.addEventListener('resize', updateArrowVisibility);

        // Update on scroll
        document.querySelectorAll('.player-list').forEach(list => {
            list.addEventListener('scroll', updateArrowVisibility);
        });
        funErrorNotifier.hide();
        footballLoader.hide();
    })
    .catch(error => {
        footballLoader.hide();
        footballLoader.hide();
    funErrorNotifier.showError(
        "Couldn't load team data!",
        () => window.location.reload() // Simple page refresh
    );
    console.error('Error:', error);
        showToast('Failed to load team data. Please check your connection and try again.');
    });