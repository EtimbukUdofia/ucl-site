// Global variable to store team and player data
let footballData = {
    teams: [],
    players: []
};

// DOM elements
const menuItems = document.querySelectorAll('.menu-item');
const sections = {
    'add-player': document.getElementById('add-player-section'),
    'manage-players': document.getElementById('manage-players-section'),
    'manage-teams': document.getElementById('manage-teams-section'),
    'live-updates': document.getElementById('live-updates-section')
};
const teamSearch = document.getElementById('team-search');
const teamsGrid = document.getElementById('teams-grid');
const editTeamModal = document.getElementById('edit-team-modal');
const closeEditTeamModalBtn = document.getElementById('close-edit-team-modal');
const editTeamForm = document.getElementById('edit-team-form');
const addPlayerToTeamBtn = document.getElementById('add-player-to-team-btn');
const playerImageUpload = document.getElementById('player-image-upload');
const imagePreview = document.getElementById('image-preview');
const imagePreviewContainer = document.getElementById('image-preview-container');
const editPlayerImageUpload = document.getElementById('edit-player-image-upload');
const editImagePreview = document.getElementById('edit-image-preview');
const editImagePreviewContainer = document.getElementById('edit-image-preview-container');
const playerTeamSelect = document.getElementById('player-team');
const playerPositionSelect = document.getElementById('player-position');
const editPlayerTeamSelect = document.getElementById('edit-player-team');
const editPlayerPositionSelect = document.getElementById('edit-player-position');
const playersTableBody = document.getElementById('players-table-body');
const playerSearch = document.getElementById('player-search');
const addLiveMatchBtn = document.getElementById('add-live-match-btn');
const newLiveMatchForm = document.getElementById('new-live-match-form');
const saveLiveMatchBtn = document.getElementById('save-live-match-btn');
const cancelLiveMatchBtn = document.getElementById('cancel-live-match-btn');
const liveMatchTeam1Select = document.getElementById('live-match-team1');
const liveMatchTeam2Select = document.getElementById('live-match-team2');
const liveMatchesContainer = document.getElementById('live-matches-container');
const addNewsUpdateBtn = document.getElementById('add-news-update-btn');
const newNewsUpdateForm = document.getElementById('new-news-update-form');
const saveNewsUpdateBtn = document.getElementById('save-news-update-btn');
const cancelNewsUpdateBtn = document.getElementById('cancel-news-update-btn');
const newsUpdatesContainer = document.getElementById('news-updates-container');
const newsImageUpload = document.getElementById('news-image-upload');
const newsImagePreview = document.getElementById('news-image-preview');
const newsImagePreviewContainer = document.getElementById('news-image-preview-container');
const editPlayerModal = document.getElementById('edit-player-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeEditModalBtn = document.getElementById('close-edit-modal');
const deletePlayerBtn = document.getElementById('delete-player-btn');
const loadingSpinner = document.getElementById('loading-spinner');


// Helper functions
function showSpinner() {
    loadingSpinner.classList.remove('hidden');
}

function hideSpinner() {
    loadingSpinner.classList.add('hidden');
}

function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto-hide after duration
    if (duration) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Data loading and initialization
async function loadData() {
    showSpinner();
    try {
        const response = await fetch('TeamData.json');
        if (!response.ok) throw new Error('Failed to load data');
        
        footballData = await response.json();
        
        // Populate all data from the single JSON file
        populateTeamSelects();
        populatePlayersTable();
        populateTeamsGrid();
        setupPositionDependentFields();
        setupImageUploads();
        setupTeamImageUploads();
        setupEditPositionDependentFields();
        
        // Load live matches and news from the same JSON file
        populateLiveMatches(footballData.matches || []);
        populateNewsUpdates(footballData.news || []);
        populateLiveMatchTeamSelects();
        
        showToast('Data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
        showToast(`Failed to load data: ${error.message}`, 5000);
    } finally {
        hideSpinner();
    }
}

async function loadNewsUpdates() {
    try {
        const response = await fetch('newsUpdates.json');
        if (!response.ok) throw new Error('Failed to load news updates');
        const data = await response.json();
        populateNewsUpdates(data.news);
    } catch (error) {
        console.error('Error loading news updates:', error);
        // Create empty array if file doesn't exist
        populateNewsUpdates([]);
    }
}

function populateLiveMatchTeamSelects() {
    liveMatchTeam1Select.innerHTML = '<option value="">Select Team</option>';
    liveMatchTeam2Select.innerHTML = '<option value="">Select Team</option>';
    
    footballData.teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        option.setAttribute('data-logo', team.squad_logo);
        liveMatchTeam1Select.appendChild(option.cloneNode(true));
        liveMatchTeam2Select.appendChild(option);
    });
}


function populateLiveMatches(matches) {
    liveMatchesContainer.innerHTML = '';
    
    if (matches.length === 0) {
        liveMatchesContainer.innerHTML = '<p>No live matches currently</p>';
        return;
    }
    
    matches.forEach((match, index) => {
        const matchCard = document.createElement('div');
        matchCard.className = 'live-match-card';
        matchCard.innerHTML = `
            <div class="live-match-teams">
                <div class="live-match-team">
                    <img src="${match.team1Logo}" alt="${match.team1}">
                    <span>${match.team1}</span>
                </div>
                <div class="live-match-score">
                    <span>${match.score1}</span>
                    <span>:</span>
                    <span>${match.score2}</span>
                </div>
                <div class="live-match-team">
                    <span>${match.team2}</span>
                    <img src="${match.team2Logo}" alt="${match.team2}">
                </div>
            </div>
            <div class="live-match-info">
                <span class="match-status ${match.status.toLowerCase()}">${match.status}</span>
                <span class="match-minute">${match.minute || ''}</span>
            </div>
            <div class="live-match-actions">
                <button class="btn btn-sm btn-primary edit-live-match-btn" data-index="${index}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger delete-live-match-btn" data-index="${index}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        liveMatchesContainer.appendChild(matchCard);
    });
    
    document.querySelectorAll('.edit-live-match-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editLiveMatch(index);
        });
    });
    document.querySelectorAll('.delete-live-match-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteLiveMatch(index);
        });
    });
}


function populateNewsUpdates(news) {
    newsUpdatesContainer.innerHTML = '';
    
    if (news.length === 0) {
        newsUpdatesContainer.innerHTML = '<p>No news updates currently</p>';
        return;
    }
    
    news.forEach((item, index) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-card-image">
                <img src="${item.image || 'images/default-news.jpg'}" alt="${item.title}">
            </div>
            <div class="news-card-content">
                <h4>${item.title}</h4>
                <p class="news-date">${item.date} • ${item.author}</p>
                <p class="news-preview">${item.content.substring(0, 100)}...</p>
                <div class="news-actions">
                    <button class="btn btn-sm btn-primary edit-news-btn" data-index="${index}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger delete-news-btn" data-index="${index}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        newsUpdatesContainer.appendChild(newsCard);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-news-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editNewsUpdate(index);
        });
    });
    
    document.querySelectorAll('.delete-news-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteNewsUpdate(index);
        });
    });
}

// Add event listeners for live matches
addLiveMatchBtn.addEventListener('click', function() {
    newLiveMatchForm.style.display = 'block';
    this.style.display = 'none';
});

cancelLiveMatchBtn.addEventListener('click', function() {
    newLiveMatchForm.style.display = 'none';
    addLiveMatchBtn.style.display = 'block';
    resetLiveMatchForm();
});

saveLiveMatchBtn.addEventListener('click', async function() {
    const team1 = liveMatchTeam1Select.value;
    const team2 = liveMatchTeam2Select.value;
    const score1 = document.getElementById('live-match-score1').value;
    const score2 = document.getElementById('live-match-score2').value;
    const status = document.getElementById('live-match-status').value;
    const minute = document.getElementById('live-match-minute').value;
    
    if (!team1 || !team2) {
        showToast('Please select both teams', 3000);
        return;
    }
    
    if (team1 === team2) {
        showToast('Teams must be different', 3000);
        return;
    }
    
    const team1Logo = liveMatchTeam1Select.options[liveMatchTeam1Select.selectedIndex].getAttribute('data-logo');
    const team2Logo = liveMatchTeam2Select.options[liveMatchTeam2Select.selectedIndex].getAttribute('data-logo');
    
    const newMatch = {
        team1,
        team1Logo,
        team2,
        team2Logo,
        score1: parseInt(score1),
        score2: parseInt(score2),
        status,
        minute
    };
    
    try {
        // Load existing matches
        let matches = [];
        try {
            const response = await fetch('liveMatches.json');
            if (response.ok) {
                const data = await response.json();
                matches = data.matches || [];
            }
        } catch (e) {
            console.log('No existing matches file, creating new one');
        }
        
        // Add new match
        matches.push(newMatch);
        
        // Save back to file (in a real app, this would be a server request)
        const dataToSave = { matches };
        console.log('Saving live matches:', dataToSave);
        // In a real implementation, you would send this to your server
        // await saveToServer('liveMatches.json', dataToSave);
        
        // For demo purposes, we'll just update the UI
        populateLiveMatches(matches);
        newLiveMatchForm.style.display = 'none';
        addLiveMatchBtn.style.display = 'block';
        resetLiveMatchForm();
        showToast('Live match added successfully!');
    } catch (error) {
        console.error('Error saving live match:', error);
        showToast('Failed to save live match', 3000);
    }
});

// Add event listeners for news updates
addNewsUpdateBtn.addEventListener('click', function() {
    newNewsUpdateForm.style.display = 'block';
    this.style.display = 'none';
});

cancelNewsUpdateBtn.addEventListener('click', function() {
    newNewsUpdateForm.style.display = 'none';
    addNewsUpdateBtn.style.display = 'block';
    resetNewsForm();
});

saveNewsUpdateBtn.addEventListener('click', async function() {
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const author = document.getElementById('news-author').value;
    const image = newsImagePreview.src || '';
    
    if (!title || !content) {
        showToast('Title and content are required', 3000);
        return;
    }
    
    const newNewsItem = {
        title,
        content,
        author,
        image,
        date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
    
    try {
        // Load existing news
        let news = [];
        try {
            const response = await fetch('newsUpdates.json');
            if (response.ok) {
                const data = await response.json();
                news = data.news || [];
            }
        } catch (e) {
            console.log('No existing news file, creating new one');
        }
        
        // Add new news item
        news.push(newNewsItem);
        
        // Save back to file (in a real app, this would be a server request)
        const dataToSave = { news };
        console.log('Saving news updates:', dataToSave);
        // In a real implementation, you would send this to your server
        // await saveToServer('newsUpdates.json', dataToSave);
        
        // For demo purposes, we'll just update the UI
        populateNewsUpdates(news);
        newNewsUpdateForm.style.display = 'none';
        addNewsUpdateBtn.style.display = 'block';
        resetNewsForm();
        showToast('News update added successfully!');
    } catch (error) {
        console.error('Error saving news update:', error);
        showToast('Failed to save news update', 3000);
    }
});

// Setup news image upload
newsImageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newsImagePreview.src = event.target.result;
            newsImagePreviewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Helper functions
function resetLiveMatchForm() {
    liveMatchTeam1Select.value = '';
    liveMatchTeam2Select.value = '';
    document.getElementById('live-match-score1').value = '0';
    document.getElementById('live-match-score2').value = '0';
    document.getElementById('live-match-status').value = 'LIVE';
    document.getElementById('live-match-minute').value = '';
}

function resetNewsForm() {
    document.getElementById('news-title').value = '';
    document.getElementById('news-content').value = '';
    document.getElementById('news-author').value = 'Admin';
    newsImagePreview.src = '#';
    newsImagePreviewContainer.style.display = 'none';
    newsImageUpload.value = '';
}

async function editLiveMatch(index) {
    try {
        const response = await fetch('liveMatches.json');
        if (!response.ok) throw new Error('Failed to load live matches');
        const data = await response.json();
        const match = data.matches[index];
        
        // Find team indices
        let team1Index = 0;
        let team2Index = 0;
        footballData.teams.forEach((team, i) => {
            if (team.name === match.team1) team1Index = i;
            if (team.name === match.team2) team2Index = i;
        });
        
        // Populate form
        liveMatchTeam1Select.selectedIndex = team1Index + 1; // +1 for the "Select Team" option
        liveMatchTeam2Select.selectedIndex = team2Index + 1;
        document.getElementById('live-match-score1').value = match.score1;
        document.getElementById('live-match-score2').value = match.score2;
        document.getElementById('live-match-status').value = match.status;
        document.getElementById('live-match-minute').value = match.minute || '';
        
        // Show form
        newLiveMatchForm.style.display = 'block';
        addLiveMatchBtn.style.display = 'none';
        
        // Change save button to update
        saveLiveMatchBtn.textContent = 'Update Match';
        saveLiveMatchBtn.setAttribute('data-index', index);
        
    } catch (error) {
        console.error('Error editing live match:', error);
        showToast('Failed to edit live match', 3000);
    }
}

async function deleteLiveMatch(index) {
    if (!confirm('Are you sure you want to delete this live match?')) return;
    
    try {
        const response = await fetch('liveMatches.json');
        if (!response.ok) throw new Error('Failed to load live matches');
        const data = await response.json();
        data.matches.splice(index, 1);
        
        // Save back to file (in a real app, this would be a server request)
        console.log('Deleting live match:', index);
        // In a real implementation, you would send this to your server
        // await saveToServer('liveMatches.json', data);
        
        // For demo purposes, we'll just update the UI
        populateLiveMatches(data.matches);
        showToast('Live match deleted successfully!');
    } catch (error) {
        console.error('Error deleting live match:', error);
        showToast('Failed to delete live match', 3000);
    }
}

async function editNewsUpdate(index) {
    try {
        const response = await fetch('newsUpdates.json');
        if (!response.ok) throw new Error('Failed to load news updates');
        const data = await response.json();
        const newsItem = data.news[index];
        
        // Populate form
        document.getElementById('news-title').value = newsItem.title;
        document.getElementById('news-content').value = newsItem.content;
        document.getElementById('news-author').value = newsItem.author;
        if (newsItem.image) {
            newsImagePreview.src = newsItem.image;
            newsImagePreviewContainer.style.display = 'block';
        } else {
            newsImagePreviewContainer.style.display = 'none';
        }
        
        // Show form
        newNewsUpdateForm.style.display = 'block';
        addNewsUpdateBtn.style.display = 'none';
        
        // Change save button to update
        saveNewsUpdateBtn.textContent = 'Update News';
        saveNewsUpdateBtn.setAttribute('data-index', index);
        
    } catch (error) {
        console.error('Error editing news update:', error);
        showToast('Failed to edit news update', 3000);
    }
}

async function deleteNewsUpdate(index) {
    if (!confirm('Are you sure you want to delete this news update?')) return;
    
    try {
        const response = await fetch('newsUpdates.json');
        if (!response.ok) throw new Error('Failed to load news updates');
        const data = await response.json();
        data.news.splice(index, 1);
        
        // Save back to file (in a real app, this would be a server request)
        console.log('Deleting news update:', index);
        // In a real implementation, you would send this to your server
        // await saveToServer('newsUpdates.json', data);
        
        // For demo purposes, we'll just update the UI
        populateNewsUpdates(data.news);
        showToast('News update deleted successfully!');
    } catch (error) {
        console.error('Error deleting news update:', error);
        showToast('Failed to delete news update', 3000);
    }
}

// Team management functions
function populateTeamsGrid(filter = '') {
    teamsGrid.innerHTML = '';
    
    const filteredTeams = footballData.teams.filter(team => 
        team.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredTeams.length === 0) {
        teamsGrid.innerHTML = '<div class="no-teams">No teams found</div>';
        return;
    }
    
    filteredTeams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <div class="team-card-header">
                <img src="${team.squad_logo}" alt="${team.name}" class="team-logo">
                <h3>${team.name}</h3>
            </div>
            <div class="team-card-body">
                <div class="team-stats">
                    <div><strong>Stadium:</strong> ${team.stadium.name}</div>
                    <div><strong>Matches:</strong> ${team.matches_played}</div>
                    <div><strong>Record:</strong> ${team.victories}W - ${team.defeats}L - ${team.draws}D</div>
                    <div><strong>Goals:</strong> ${team.Goal_scored} - ${team.Goals_conceded}</div>
                </div>
                <button class="btn btn-primary edit-team-btn" data-id="${team.id}">
                    <i class="fas fa-edit"></i> Edit Team
                </button>
            </div>
        `;
        teamsGrid.appendChild(teamCard);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-team-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const teamId = parseInt(this.getAttribute('data-id'));
            openEditTeamModal(teamId);
        });
    });
}

function openEditTeamModal(teamId) {
    const team = footballData.teams.find(t => t.id === teamId);
    if (!team) {
        showToast('Team not found', 3000);
        return;
    }
    
    // Fill form with team data
    document.getElementById('edit-team-id').value = team.id;
    document.getElementById('edit-team-name').value = team.name;
    document.getElementById('edit-team-stadium').value = team.stadium.name;
    document.getElementById('edit-team-capacity').value = team.stadium.capacity;
    document.getElementById('edit-team-matches').value = team.matches_played;
    document.getElementById('edit-team-goals-scored').value = team.Goal_scored;
    document.getElementById('edit-team-goals-conceded').value = team.Goals_conceded;
    document.getElementById('edit-team-victories').value = team.victories;
    document.getElementById('edit-team-defeats').value = team.defeats;
    document.getElementById('edit-team-draws').value = team.draws;
    document.getElementById('edit-team-eliminated').value = team.eliminated;
    document.getElementById('edit-team-about').value = team.about;
    
    // Set image previews
    document.getElementById('edit-team-image-preview').src = team.squad_logo;
    document.getElementById('edit-team-image').value = team.squad_logo;
    document.getElementById('edit-team-squad-img-preview').src = team.Squad_img;
    document.getElementById('edit-team-squad-img').value = team.Squad_img;
    document.getElementById('edit-team-stadium-img-preview').src = team.stadium.image;
    document.getElementById('edit-team-stadium-img').value = team.stadium.image;
    
    // Show image preview containers
    document.getElementById('edit-team-image-preview-container').style.display = 'block';
    document.getElementById('edit-team-squad-img-preview-container').style.display = 'block';
    document.getElementById('edit-team-stadium-img-preview-container').style.display = 'block';
    
    // Populate team players table
    populateTeamPlayersTable(team.id);
    
    // Show modal
    editTeamModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
}

function closeEditTeamModal() {
    editTeamModal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
}

function populateTeamPlayersTable(teamId) {
    const teamPlayersTableBody = document.getElementById('team-players-table-body');
    teamPlayersTableBody.innerHTML = '';
    
    const teamName = footballData.teams.find(t => t.id === teamId).name;
    const teamPlayers = footballData.players.filter(player => player.team === teamName);
    
    if (teamPlayers.length === 0) {
        teamPlayersTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No players found</td></tr>';
        return;
    }
    
    teamPlayers.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.position}</td>
            <td>${player.age}</td>
            <td class="action-btns">
                <button class="btn btn-primary edit-team-player-btn" data-id="${player.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger remove-player-btn" data-id="${player.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </td>
        `;
        teamPlayersTableBody.appendChild(row);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-team-player-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const playerId = parseInt(this.getAttribute('data-id'));
            openEditPlayerModal(playerId);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-player-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const playerId = parseInt(this.getAttribute('data-id'));
            if (confirm('Are you sure you want to remove this player from the team?')) {
                const playerIndex = footballData.players.findIndex(p => p.id === playerId);
                if (playerIndex !== -1) {
                    footballData.players.splice(playerIndex, 1);
                    populateTeamPlayersTable(teamId);
                    populatePlayersTable();
                    showToast('Player removed from team successfully!');
                }
            }
        });
    });
}

function setupTeamImageUploads() {
    // Team logo upload
    document.getElementById('edit-team-image-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('edit-team-image-preview').src = event.target.result;
                document.getElementById('edit-team-image').value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Squad image upload
    document.getElementById('edit-team-squad-img-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('edit-team-squad-img-preview').src = event.target.result;
                document.getElementById('edit-team-squad-img').value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Stadium image upload
    document.getElementById('edit-team-stadium-img-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('edit-team-stadium-img-preview').src = event.target.result;
                document.getElementById('edit-team-stadium-img').value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Player management functions
function populateTeamSelects() {
    // Clear existing options
    playerTeamSelect.innerHTML = '<option value="">Select Team</option>';
    editPlayerTeamSelect.innerHTML = '<option value="">Select Team</option>';
    
    // Add teams from data
    footballData.teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        playerTeamSelect.appendChild(option.cloneNode(true));
        editPlayerTeamSelect.appendChild(option);
    });
}

function setupImageUploads() {
    // For add player form
    playerImageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imagePreviewContainer.style.display = 'block';
                document.getElementById('player-image').value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // For edit player form
    editPlayerImageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                editImagePreview.src = event.target.result;
                editImagePreviewContainer.style.display = 'block';
                document.getElementById('edit-player-image').value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

function setupPositionDependentFields() {
    playerPositionSelect.addEventListener('change', function() {
        const position = this.value;
        const goalsGroup = document.getElementById('goals-group');
        const assistsGroup = document.getElementById('assists-group');
        const savesGroup = document.getElementById('saves-group');
        
        // Default to showing all fields
        goalsGroup.style.display = 'block';
        assistsGroup.style.display = 'block';
        savesGroup.style.display = 'flex';
        
        if (position === 'Goalkeeper') {
            goalsGroup.style.display = 'none';
            assistsGroup.style.display = 'none';
        } else if (position === 'Manager') {
            goalsGroup.style.display = 'none';
            assistsGroup.style.display = 'none';
            savesGroup.style.display = 'none';
        }
    });
}

function setupEditPositionDependentFields() {
    editPlayerPositionSelect.addEventListener('change', function() {
        const position = this.value;
        const goalsGroup = document.getElementById('edit-goals-group');
        const assistsGroup = document.getElementById('edit-assists-group');
        const savesGroup = document.getElementById('edit-saves-group');
        
        // Default to showing all fields
        goalsGroup.style.display = 'block';
        assistsGroup.style.display = 'block';
        savesGroup.style.display = 'flex';
        
        if (position === 'Goalkeeper') {
            goalsGroup.style.display = 'none';
            assistsGroup.style.display = 'none';
        } else if (position === 'Manager') {
            goalsGroup.style.display = 'none';
            assistsGroup.style.display = 'none';
            savesGroup.style.display = 'none';
        }
    });
}

function populatePlayersTable(filter = '') {
    playersTableBody.innerHTML = '';
    
    const filteredPlayers = footballData.players.filter(player => 
        player.name.toLowerCase().includes(filter.toLowerCase()) ||
        player.team.toLowerCase().includes(filter.toLowerCase()) ||
        player.position.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredPlayers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" style="text-align: center;">No players found</td>`;
        playersTableBody.appendChild(row);
        return;
    }
    
    filteredPlayers.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.team}</td>
            <td>${player.position}</td>
            <td>${player.age}</td>
            <td class="action-btns">
                <button class="btn btn-primary edit-player-btn" data-id="${player.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </td>
        `;
        playersTableBody.appendChild(row);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-player-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const playerId = parseInt(this.getAttribute('data-id'));
            openEditPlayerModal(playerId);
        });
    });
}

function openEditPlayerModal(playerId) {
    const player = footballData.players.find(p => p.id === playerId);
    if (!player) {
        showToast('Player not found', 3000);
        return;
    }
    
    if (player.profile_pic) {
        editImagePreview.src = player.profile_pic;
        editImagePreviewContainer.style.display = 'block';
    } else {
        editImagePreviewContainer.style.display = 'none';
    }
    
    // Fill form with player data
    document.getElementById('edit-player-id').value = player.id;
    document.getElementById('edit-player-name').value = player.name;
    document.getElementById('edit-player-age').value = player.age;
    document.getElementById('edit-player-height').value = player.height;
    document.getElementById('edit-player-weight').value = player.weight;
    document.getElementById('edit-player-team').value = player.team;
    document.getElementById('edit-player-position').value = player.position;
    document.getElementById('edit-player-image').value = player.profile_pic || '';
    document.getElementById('edit-player-appearances').value = player.appearances || 0;
    
    // Set position-specific stats
    if (player.position === 'Goalkeeper') {
        document.getElementById('edit-player-saves').value = player.saves || 0;
        document.getElementById('edit-player-tackles').value = player.tackles || 0;
        document.getElementById('edit-player-goals').value = 0;
        document.getElementById('edit-player-assists').value = 0;
    } else if (player.position === 'Manager') {
        // No stats for manager
    } else {
        document.getElementById('edit-player-goals').value = player.goals || 0;
        document.getElementById('edit-player-assists').value = player.assists || 0;
        document.getElementById('edit-player-tackles').value = player.tackles || 0;
        document.getElementById('edit-player-saves').value = 0;
    }
    
    // Trigger position change to update field visibility
    editPlayerPositionSelect.dispatchEvent(new Event('change'));
    
    // Show modal
    editPlayerModal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
}

function closeEditPlayerModal() {
    editPlayerModal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
}

// Event listeners
// Team-related event listeners
teamSearch.addEventListener('input', function() {
    populateTeamsGrid(this.value);
});

editTeamForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamId = parseInt(document.getElementById('edit-team-id').value);
    const teamIndex = footballData.teams.findIndex(t => t.id === teamId);
    
    if (teamIndex === -1) {
        showToast('Team not found', 3000);
        return;
    }
    
    // Update team data
    const team = footballData.teams[teamIndex];
    team.name = document.getElementById('edit-team-name').value;
    team.stadium.name = document.getElementById('edit-team-stadium').value;
    team.stadium.capacity = parseInt(document.getElementById('edit-team-capacity').value);
    team.matches_played = parseInt(document.getElementById('edit-team-matches').value);
    team.Goal_scored = parseInt(document.getElementById('edit-team-goals-scored').value);
    team.Goals_conceded = parseInt(document.getElementById('edit-team-goals-conceded').value);
    team.victories = parseInt(document.getElementById('edit-team-victories').value);
    team.defeats = parseInt(document.getElementById('edit-team-defeats').value);
    team.draws = parseInt(document.getElementById('edit-team-draws').value);
    team.eliminated = document.getElementById('edit-team-eliminated').value === 'true';
    team.about = document.getElementById('edit-team-about').value;
    team.squad_logo = document.getElementById('edit-team-image').value || team.squad_logo;
    team.Squad_img = document.getElementById('edit-team-squad-img').value || team.Squad_img;
    team.stadium.image = document.getElementById('edit-team-stadium-img').value || team.stadium.image;
    
    // Close modal
    closeEditTeamModal();
    
    // Update UI
    populateTeamsGrid(teamSearch.value);
    
    showToast('Team updated successfully!');
});

closeEditTeamModalBtn.addEventListener('click', closeEditTeamModal);
modalOverlay.addEventListener('click', closeEditTeamModal);

addPlayerToTeamBtn.addEventListener('click', function() {
    const teamId = parseInt(document.getElementById('edit-team-id').value);
    const team = footballData.teams.find(t => t.id === teamId);
    
    if (!team) {
        showToast('Team not found', 3000);
        return;
    }
    
    // Open the add player form with the team pre-selected
    document.getElementById('player-team').value = team.name;
    document.querySelector('.menu-item[data-section="add-player"]').click();
    
    // Close the team modal
    closeEditTeamModal();
});

// Player-related event listeners
document.getElementById('add-player-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showSpinner();
    
    try {
        // Get form values
        const name = document.getElementById('player-name').value;
        const age = parseInt(document.getElementById('player-age').value);
        const height = document.getElementById('player-height').value;
        const weight = document.getElementById('player-weight').value;
        const team = document.getElementById('player-team').value;
        const position = document.getElementById('player-position').value;
        const profilePic = document.getElementById('player-image').value || 'images/players/default.png';
        const appearances = parseInt(document.getElementById('player-appearances').value) || 0;
        
        // Create player object
        const newPlayer = {
            id: footballData.players.length > 0 ? 
                Math.max(...footballData.players.map(p => p.id)) + 1 : 1,
            name,
            age,
            height,
            weight,
            position,
            team,
            profile_pic: profilePic,
            appearances
        };
        
        // Add position-specific stats
        if (position === 'Goalkeeper') {
            newPlayer.saves = parseInt(document.getElementById('player-saves').value) || 0;
            newPlayer.tackles = parseInt(document.getElementById('player-tackles').value) || 0;
        } else if (position === 'Manager') {
            // No stats for manager
        } else {
            newPlayer.goals = parseInt(document.getElementById('player-goals').value) || 0;
            newPlayer.assists = parseInt(document.getElementById('player-assists').value) || 0;
            newPlayer.tackles = parseInt(document.getElementById('player-tackles').value) || 0;
        }
        
        // Add player to data
        footballData.players.push(newPlayer);
        
        // Reset form
        this.reset();
        
        // Update UI
        populatePlayersTable();
        const teamId = footballData.teams.find(t => t.name === team)?.id;
        if (teamId) populateTeamPlayersTable(teamId);
        
        showToast('Player added successfully!');
    } catch (error) {
        console.error('Error adding player:', error);
        showToast('Error adding player', 3000);
    } finally {
        hideSpinner();
    }
});

document.getElementById('edit-player-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const playerId = parseInt(document.getElementById('edit-player-id').value);
    const playerIndex = footballData.players.findIndex(p => p.id === playerId);
    
    if (playerIndex === -1) {
        showToast('Player not found', 3000);
        return;
    }
    
    // Update player data
    const player = footballData.players[playerIndex];
    const oldTeam = player.team;
    const newTeam = document.getElementById('edit-player-team').value;
    
    player.name = document.getElementById('edit-player-name').value;
    player.age = parseInt(document.getElementById('edit-player-age').value);
    player.height = document.getElementById('edit-player-height').value;
    player.weight = document.getElementById('edit-player-weight').value;
    player.team = newTeam;
    player.position = document.getElementById('edit-player-position').value;
    player.profile_pic = document.getElementById('edit-player-image').value || 'images/players/default.png';
    player.appearances = parseInt(document.getElementById('edit-player-appearances').value) || 0;
    
    // Update position-specific stats
    if (player.position === 'Goalkeeper') {
        player.saves = parseInt(document.getElementById('edit-player-saves').value) || 0;
        player.tackles = parseInt(document.getElementById('edit-player-tackles').value) || 0;
        delete player.goals;
        delete player.assists;
    } else if (player.position === 'Manager') {
        delete player.goals;
        delete player.assists;
        delete player.saves;
        delete player.tackles;
    } else {
        player.goals = parseInt(document.getElementById('edit-player-goals').value) || 0;
        player.assists = parseInt(document.getElementById('edit-player-assists').value) || 0;
        player.tackles = parseInt(document.getElementById('edit-player-tackles').value) || 0;
        delete player.saves;
    }
    
    // Close modal
    closeEditPlayerModal();
    
    // Update UI
    populatePlayersTable(playerSearch.value);
    
    // Update team players table if team changed
    if (oldTeam !== newTeam) {
        const oldTeamId = footballData.teams.find(t => t.name === oldTeam)?.id;
        const newTeamId = footballData.teams.find(t => t.name === newTeam)?.id;
        if (oldTeamId) populateTeamPlayersTable(oldTeamId);
        if (newTeamId) populateTeamPlayersTable(newTeamId);
    }
    
    showToast('Player updated successfully!');
});

deletePlayerBtn.addEventListener('click', function() {
    const playerId = parseInt(document.getElementById('edit-player-id').value);
    const playerIndex = footballData.players.findIndex(p => p.id === playerId);
    
    if (playerIndex === -1) {
        showToast('Player not found', 3000);
        return;
    }
    
    if (confirm('Are you sure you want to delete this player?')) {
        const teamName = footballData.players[playerIndex].team;
        footballData.players.splice(playerIndex, 1);
        closeEditPlayerModal();
        populatePlayersTable(playerSearch.value);
        
        // Update team players table
        const teamId = footballData.teams.find(t => t.name === teamName)?.id;
        if (teamId) populateTeamPlayersTable(teamId);
        
        showToast('Player deleted successfully!');
    }
});

playerSearch.addEventListener('input', function() {
    populatePlayersTable(this.value);
});

closeEditModalBtn.addEventListener('click', closeEditPlayerModal);
modalOverlay.addEventListener('click', closeEditPlayerModal);

// Menu navigation
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all menu items
        menuItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        
        // Hide all sections
        Object.values(sections).forEach(section => section.classList.add('hidden'));
        // Show selected section
        const sectionId = this.getAttribute('data-section');
        sections[sectionId].classList.remove('hidden');
    });
});

// Logout button
document.getElementById('logout-btn').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real app, this would redirect to logout endpoint
        showToast('Logged out successfully');
        setTimeout(() => {
            window.location.href = 'UCL.html'; // Redirect to main page
        }, 1000);
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});