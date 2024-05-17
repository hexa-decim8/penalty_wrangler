function changeColor(selectElement) {
    var color = selectElement.value;
    var result = selectElement.nextElementSibling.nextElementSibling.nextElementSibling;
    result.style.color = color;
    result.textContent = "You selected " + color;
}

function addNewField() {
    var container = document.getElementById("container");
    var fieldSet = document.createElement("div");
    fieldSet.innerHTML = `
        <select class="colorSelector" onchange="changeColor(this)">
            <option value="" disabled selected>Select a color</option>
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
            <option value="#ffff00">Yellow</option>
            <option value="#ffa500">Orange</option>
        </select>
        <input type="number" class="teamNumber" placeholder="Enter team number">
        <select class="penaltySelector">
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
        </select>
        <div class="result"></div>
    `;
    container.insertBefore(fieldSet, container.lastChild.previousSibling);
}
