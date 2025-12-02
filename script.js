// Penalty tracking data
let penalties = [];
let entryIdCounter = 0;

// Color options with proper roller derby team colors
const teamColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#DC143C' },
    { name: 'Blue', value: '#1E90FF' },
    { name: 'Green', value: '#32CD32' },
    { name: 'Yellow', value: '#FFD700' },
    { name: 'Orange', value: '#FF8C00' },
    { name: 'Purple', value: '#9370DB' },
    { name: 'Pink', value: '#FF69B4' },
    { name: 'Teal', value: '#20B2AA' }
];

// Penalty types
const penaltyTypes = [
    { code: 'C', name: 'Cutting the Track', category: 'Out of Bounds' },
    { code: 'B', name: 'Back Block', category: 'Illegal Contact' },
    { code: 'F', name: 'Forearm', category: 'Illegal Contact' },
    { code: 'H', name: 'High Block', category: 'Illegal Contact' },
    { code: 'L', name: 'Low Block', category: 'Illegal Contact' },
    { code: 'M', name: 'Multi-Player Block', category: 'Illegal Contact' },
    { code: 'D', name: 'Direction of Gameplay', category: 'Gameplay' },
    { code: 'O', name: 'Out of Play', category: 'Gameplay' },
    { code: 'X', name: 'Failure to Reform', category: 'Positioning' },
    { code: 'G', name: 'Illegal Procedure', category: 'Gameplay' },
    { code: 'S', name: 'Skating Out of Bounds', category: 'Out of Bounds' },
    { code: 'E', name: 'Elbows', category: 'Illegal Contact' },
    { code: 'N', name: 'Insubordination', category: 'Misconduct' },
    { code: 'I', name: 'Illegal Target Zone', category: 'Illegal Contact' }
];

// Initialize the tracker on load
document.addEventListener('DOMContentLoaded', function() {
    addPenaltyEntry();
    updateSummary();
});

// Add a new penalty entry
function addPenaltyEntry() {
    const trackerId = entryIdCounter++;
    const tracker = document.getElementById('penaltyTracker');
    
    const entryDiv = document.createElement('div');
    entryDiv.className = 'penalty-entry';
    entryDiv.id = `entry-${trackerId}`;
    
    entryDiv.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">#${penalties.length + 1}</span>
            <button class="delete-btn" onclick="deletePenalty(${trackerId})" title="Delete this penalty">×</button>
        </div>
        <div class="entry-content">
            <div class="form-field">
                <label>Team Color</label>
                <select class="color-selector" onchange="updatePenalty(${trackerId})" data-field="color">
                    <option value="" disabled selected>Select color</option>
                    ${teamColors.map(color => 
                        `<option value="${color.value}" style="background-color: ${color.value}; color: ${color.value === '#FFFFFF' ? '#000' : '#FFF'};">${color.name}</option>`
                    ).join('')}
                </select>
                <div class="color-preview" id="preview-${trackerId}"></div>
            </div>
            <div class="form-field">
                <label>Skater #</label>
                <input type="text" class="team-number" placeholder="##" maxlength="4" 
                       onchange="updatePenalty(${trackerId})" data-field="number">
            </div>
            <div class="form-field">
                <label>Penalty</label>
                <select class="penalty-selector" onchange="updatePenalty(${trackerId})" data-field="penalty">
                    <option value="" disabled selected>Select penalty</option>
                    ${penaltyTypes.map(penalty => 
                        `<option value="${penalty.name}" data-code="${penalty.code}">${penalty.code} - ${penalty.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-field">
                <label>Jam #</label>
                <input type="number" class="jam-number" placeholder="#" min="1" 
                       onchange="updatePenalty(${trackerId})" data-field="jam">
            </div>
        </div>
    `;
    
    tracker.appendChild(entryDiv);
    
    // Initialize penalty object
    penalties.push({
        id: trackerId,
        color: '',
        number: '',
        penalty: '',
        jam: '',
        timestamp: new Date()
    });
}

// Update penalty data
function updatePenalty(trackerId) {
    const entry = document.getElementById(`entry-${trackerId}`);
    const penalty = penalties.find(p => p.id === trackerId);
    
    if (!penalty) return;
    
    const colorSelect = entry.querySelector('[data-field="color"]');
    const numberInput = entry.querySelector('[data-field="number"]');
    const penaltySelect = entry.querySelector('[data-field="penalty"]');
    const jamInput = entry.querySelector('[data-field="jam"]');
    const preview = entry.querySelector(`#preview-${trackerId}`);
    
    penalty.color = colorSelect.value;
    penalty.number = numberInput.value;
    penalty.penalty = penaltySelect.value;
    penalty.jam = jamInput.value;
    
    // Update color preview
    if (penalty.color) {
        preview.style.backgroundColor = penalty.color;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
    
    updateSummary();
}

// Delete a penalty entry
function deletePenalty(trackerId) {
    const entry = document.getElementById(`entry-${trackerId}`);
    if (entry) {
        entry.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            entry.remove();
            penalties = penalties.filter(p => p.id !== trackerId);
            renumberEntries();
            updateSummary();
        }, 300);
    }
}

// Renumber entries after deletion
function renumberEntries() {
    const entries = document.querySelectorAll('.penalty-entry');
    entries.forEach((entry, index) => {
        const numberSpan = entry.querySelector('.entry-number');
        if (numberSpan) {
            numberSpan.textContent = `#${index + 1}`;
        }
    });
}

// Clear all penalties
function clearAll() {
    if (penalties.length === 0) return;
    
    if (confirm('Are you sure you want to clear all penalties?')) {
        const tracker = document.getElementById('penaltyTracker');
        tracker.innerHTML = '';
        penalties = [];
        entryIdCounter = 0;
        addPenaltyEntry();
        updateSummary();
    }
}

// Update summary statistics
function updateSummary() {
    const summaryContent = document.getElementById('summaryContent');
    const completePenalties = penalties.filter(p => p.color && p.number && p.penalty);
    
    if (completePenalties.length === 0) {
        summaryContent.innerHTML = '<p class="empty-message">No penalties recorded yet</p>';
        return;
    }
    
    // Count by color
    const colorCounts = {};
    const penaltyCounts = {};
    
    completePenalties.forEach(p => {
        const colorName = teamColors.find(c => c.value === p.color)?.name || 'Unknown';
        colorCounts[colorName] = (colorCounts[colorName] || 0) + 1;
        penaltyCounts[p.penalty] = (penaltyCounts[p.penalty] || 0) + 1;
    });
    
    let summaryHTML = '<div class="summary-grid">';
    
    // Color breakdown
    summaryHTML += '<div class="summary-section"><h4>By Team</h4><ul>';
    Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([color, count]) => {
            const colorValue = teamColors.find(c => c.name === color)?.value;
            summaryHTML += `<li>
                <span class="summary-color" style="background-color: ${colorValue}"></span>
                ${color}: <strong>${count}</strong>
            </li>`;
        });
    summaryHTML += '</ul></div>';
    
    // Penalty breakdown
    summaryHTML += '<div class="summary-section"><h4>By Type</h4><ul>';
    Object.entries(penaltyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .forEach(([penalty, count]) => {
            const penaltyCode = penaltyTypes.find(p => p.name === penalty)?.code || '?';
            summaryHTML += `<li>${penaltyCode} - ${penalty}: <strong>${count}</strong></li>`;
        });
    summaryHTML += '</ul></div>';
    
    summaryHTML += '</div>';
    summaryHTML += `<p class="total-count">Total Penalties: <strong>${completePenalties.length}</strong></p>`;
    
    summaryContent.innerHTML = summaryHTML;
}
