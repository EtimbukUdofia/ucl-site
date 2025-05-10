  
        // Global variable to store team and player data
        let footballData = {
            teams: [],
            players: []
        };

        // DOM elements
        const menuItems = document.querySelectorAll('.menu-item');
        const sections = {
            'add-player': document.getElementById('add-player-section'),
            'manage-players': document.getElementById('manage-players-section')
        };
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
        const editPlayerModal = document.getElementById('edit-player-modal');
        const modalOverlay = document.getElementById('modal-overlay');
        const closeEditModalBtn = document.getElementById('close-edit-modal');
        const deletePlayerBtn = document.getElementById('delete-player-btn');


        const loadingSpinner = document.getElementById('loading-spinner');

        // Add these helper functions
        function showSpinner() {
        loadingSpinner.classList.remove('hidden');
        }

        function hideSpinner() {
        loadingSpinner.classList.add('hidden');
        }

        // Load data from JSON file
        async function loadData() {
            showSpinner();
            try {
                const response = await fetch('TeamData.json');
                if (!response.ok) throw new Error('Failed to load data');
                
                footballData = await response.json();
                populateTeamSelects();
                populatePlayersTable();
                setupPositionDependentFields();
                setupImageUploads();
                setupEditPositionDependentFields();
                
                showToast('Data loaded successfully');
            } catch (error) {
                console.error('Error loading data:', error);
                showToast('Failed to load data. Please try again.', 5000);
            }finally {
                hideSpinner(); // Hide spinner when loading is done (success or error)
              }
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
                        document.getElementById('player-image').value = event.target.result; // Store as data URL
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
                        document.getElementById('edit-player-image').value = event.target.result; // Store as data URL
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Populate team selects in forms
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

        // Setup position-dependent field visibility for add player form
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

        // Setup position-dependent field visibility for edit player form
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

        // Populate players table
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

        // Open edit player modal
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

        // Close edit player modal
        function closeEditPlayerModal() {
            editPlayerModal.classList.add('hidden');
            modalOverlay.classList.add('hidden');
        }

        // Show toast notification
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

        // Add player form submission
        document.getElementById('add-player-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showSpinner();
            
            try{
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
            
            
            populatePlayersTable();
            
            showToast('Player added successfully!');
            }catch (error) {
                console.error('Error adding player:', error);
                showToast('Error adding player', 3000);
              } finally {
                hideSpinner();
              }

        });

        // Edit player form submission
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
            player.name = document.getElementById('edit-player-name').value;
            player.age = parseInt(document.getElementById('edit-player-age').value);
            player.height = document.getElementById('edit-player-height').value;
            player.weight = document.getElementById('edit-player-weight').value;
            player.team = document.getElementById('edit-player-team').value;
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
            
            showToast('Player updated successfully!');
        });

        // Delete player
        deletePlayerBtn.addEventListener('click', function() {
            const playerId = parseInt(document.getElementById('edit-player-id').value);
            const playerIndex = footballData.players.findIndex(p => p.id === playerId);
            
            if (playerIndex === -1) {
                showToast('Player not found', 3000);
                return;
            }
            
            if (confirm('Are you sure you want to delete this player?')) {
                footballData.players.splice(playerIndex, 1);
                closeEditPlayerModal();
                populatePlayersTable(playerSearch.value);
                showToast('Player deleted successfully!');
            }
        });

        // Player search
        playerSearch.addEventListener('input', function() {
            populatePlayersTable(this.value);
        });

        
        closeEditModalBtn.addEventListener('click', closeEditPlayerModal);
        modalOverlay.addEventListener('click', closeEditPlayerModal);

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
    