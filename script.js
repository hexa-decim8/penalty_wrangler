function changeColor(selectElement) {
    const selectedColor = selectElement.value;
    const resultElement = selectElement.closest('.form-group').querySelector('.result');
    resultElement.style.color = selectedColor;
    resultElement.textContent = `You selected ${selectedColor}`;
}

function addNewField() {
    const formRow = document.querySelector('.form-row');
    const newFormGroup = createFormGroup();
    formRow.appendChild(newFormGroup);
}

function createFormGroup() {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Select Team Color';
    const colorSelect = document.createElement('select');
    colorSelect.classList.add('color-selector');
    colorSelect.setAttribute('onchange', 'changeColor(this)');
    colorSelect.innerHTML = `
        <option value="" disabled selected>Select team Color</option>
        <option value="#ff0000" data-color="#ff0000"></option>
        <option value="#00ff00" data-color="#00ff00"></option>
        <option value="#0000ff" data-color="#0000ff"></option>
        <option value="#ffff00" data-color="#ffff00"></option>
        <option value="#ffa500" data-color="#ffa500"></option>
    `;
    const teamNumberLabel = document.createElement('label');
    teamNumberLabel.textContent = 'Enter Team Number';
    const teamNumberInput = document.createElement('input');
    teamNumberInput.setAttribute('type', 'number');
    teamNumberInput.classList.add('team-number');
    teamNumberInput.setAttribute('placeholder', 'Enter team number');
    const penaltyLabel = document.createElement('label');
    penaltyLabel.textContent = 'Select a Penalty';
    const penaltySelect = document.createElement('select');
    penaltySelect.classList.add('penalty-selector');
    penaltySelect.innerHTML = `
        <option value="" disabled selected>Select a penalty</option>
        <option value="cutting the track">Cutting the track</option>
        <option value="back block">Back block</option>
        <option value="forearm">Forearm</option>
        <option value="high block">High block</option>
        <option value="low block">Low block</option>
        <option value="multiplayer block">Multiplayer block</option>
        <option value="direction of gameplay">Direction of gameplay</option>
        <option value="out of play">Out of play</option>
        <option value="failure to reform">Failure to reform</option>
    `;
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    formGroup.appendChild(colorLabel);
    formGroup.appendChild(colorSelect);
    formGroup.appendChild(teamNumberLabel);
    formGroup.appendChild(teamNumberInput);
    formGroup.appendChild(penaltyLabel);
    formGroup.appendChild(penaltySelect);
    formGroup.appendChild(resultDiv);

    return formGroup;
}
