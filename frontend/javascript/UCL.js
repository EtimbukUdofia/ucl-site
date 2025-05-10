
const qaulVid = document.querySelector(".qualify-vid");
const cancelQualVid = document.querySelector(".qualify-vid i");
const openQualVid = document.querySelector(".qualification-exp-text-vid i");




openQualVid.addEventListener('click', ()=>{
    qaulVid.classList.add("active");
   
})
cancelQualVid.addEventListener('click', ()=>{
    qaulVid.classList.remove("active");
    function hideVideoLayer() {
        // Select the video element
        var landVideo = document.getElementById('landPage_video');
        
        // Pause the video
        landVideo.pause();
        
        // Optionally, reset the video's playback time to the start
        landVideo.currentTime = 0;
     
      }
      hideVideoLayer()
    
})




const LatestUpdate = [
    {
        id:1,
        news_image:"images/landing-images/main-home-blog-list-2.jpg",
        info_Provider: "FanBase",
        Date: "February 15 2025",
        news_header:"Real Madrid vs AC Milan: Toughest Match this Week",
        highlight:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste maiores minus magni non soluta sequi, doloremque consectetur, esse aperiam odit, voluptatem praesentium saepe assumenda recusandae nobis porro!"

    }, 
    {
        id:2,
        news_image:"images/landing-images/soccer-football-sports-player-woman-600nw-2191542517.webp",
        info_Provider: "Board",
        Date: "February 15 2025",
        news_header:"The Bowen Fans League Final Will Consist of a Women's Match",
        highlight:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste maiores minus magni non soluta sequi, doloremque consectetur, esse aperiam odit, voluptatem praesentium saepe assumenda recusandae nobis porro!"

    },
     {
        id:3,
        news_image:"images/landing-images/africanamerican-soccer-player-on-training-600nw-1861974427.webp",
        info_Provider: "FanBase",
        Date: "February 17 2025",
        news_header:"Bowen Fans League Predictions: Will The Chester Kings Finish First",
        highlight:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste maiores minus magni non soluta sequi, doloremque consectetur, esse aperiam odit, voluptatem praesentium saepe assumenda recusandae nobis porro!"

    }, 
    {
        id:4,
        news_image:"images/landing-images/skysports-patrick-vieira-crystal-palace_6080716.jpg",
        info_Provider: "Manager",
        Date: "February 17 2025",
        news_header:"I'm Glad Antony Joined the Blues. He'll make an excellent 5 - Veirra",
        highlight:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste maiores minus magni non soluta sequi, doloremque consectetur, esse aperiam odit, voluptatem praesentium saepe assumenda recusandae nobis porro!"

    },
    {
        id:5,
        news_image:"images/landing-images/soccer-player-dribbles-ball-game_36682-334681.jpg",
        info_Provider: "Manager",
        Date: "February 17 2025",
        news_header:"Real Madrid vs AC Milan: Toughest Match this Week",
        highlight:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste maiores minus magni non soluta sequi, doloremque consectetur, esse aperiam odit, voluptatem praesentium saepe assumenda recusandae nobis porro!"

    }
]

function NewsUpdate(){
    const carousel = document.querySelector("#carousel1");
    let Updates = LatestUpdate.map(news =>{
        return `
        <li class="card2">
        <div class="news-img-section">
            <img src="${news.news_image}" alt="">
            <div class="news-card-cover"></div>
        </div>
        <div class="actual-update">
        <p>${news.info_Provider} | ${news.Date}</p>
        <h2>${news.news_header}</h2>
            <p class="highlight">
                 ${news.highlight}
            </p>

        </div>
                               
        </li>`
    });

    carousel.innerHTML = Updates.join("")
}
NewsUpdate();
// UCL.js
document.addEventListener('DOMContentLoaded', function() {
    // Load team data from JSON
    fetch('TeamData.json')
        .then(response => response.json())
        .then(data => {
            const teams = data.teams;
            
            // Calculate additional stats for each team
            const processedTeams = teams.map(team => {
                // Calculate points (assuming 3 points per victory)
                const points = team.victories * 3 + (team.draws || 0);
                
                // Calculate goal difference
                const goalDifference = team.Goal_scored - team.Goals_conceded;
                
                return {
                    ...team,
                    points: points,
                    goalDifference: goalDifference,
                    defeats: team.defeats || (team.matches_played - team.victories - (team.draws || 0))
                };
            });
            
            // Sort teams by points (descending), then goal difference (descending)
            processedTeams.sort((a, b) => {
                if (b.points !== a.points) {
                    return b.points - a.points;
                }
                return b.goalDifference - a.goalDifference;
            });
            
            // Generate league table
            generateLeagueTable(processedTeams);
            
          
        })
        .catch(error => console.error('Error loading team data:', error));
});

function generateLeagueTable(teams) {
    const tableArea = document.querySelector('.table-area');
    
    // Create table element
    const table = document.createElement('table');
    table.className = 'league-table-content';
    
    // Create table header
    const headerRow = document.createElement('tr');
    const headers = ['Pos', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'];
    
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);
    
    // Create table rows for each team
    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        
        // Position
        const posCell = document.createElement('td');
        posCell.textContent = index + 1;
        row.appendChild(posCell);
        
        // Team name with logo
        const teamCell = document.createElement('td');
        teamCell.className = 'team-cell';
        
        const logo = document.createElement('img');
        logo.src = team.squad_logo;
        logo.alt = team.name + ' logo';
        logo.className = 'team-logo';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = team.name;
        
        teamCell.appendChild(logo);
        teamCell.appendChild(nameSpan);
        row.appendChild(teamCell);
        
        // Matches played
        const mpCell = document.createElement('td');
        mpCell.textContent = team.matches_played;
        row.appendChild(mpCell);
        
        // Victories
        const wCell = document.createElement('td');
        wCell.textContent = team.victories;
        row.appendChild(wCell);
        
        // Draws
        const dCell = document.createElement('td');
        dCell.textContent = team.draws || 0;
        row.appendChild(dCell);
        
        // defeats
        const lCell = document.createElement('td');
        lCell.textContent = team.defeats;
        row.appendChild(lCell);
        
        // Goals for
        const gfCell = document.createElement('td');
        gfCell.textContent = team.Goal_scored;
        row.appendChild(gfCell);
        
        // Goals against
        const gaCell = document.createElement('td');
        gaCell.textContent = team.Goals_conceded;
        row.appendChild(gaCell);
        
        // Goal difference
        const gdCell = document.createElement('td');
        gdCell.textContent = team.goalDifference > 0 ? '+' + team.goalDifference : team.goalDifference;
        row.appendChild(gdCell);
        
        // Points
        const ptsCell = document.createElement('td');
        ptsCell.textContent = team.points;
        row.appendChild(ptsCell);
        
        table.appendChild(row);
    });
    
    // Add table to the DOM
    tableArea.appendChild(table);
}


