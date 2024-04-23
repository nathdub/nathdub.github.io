const numTestsInput = document.getElementById('num-tests');
const generateInputsBtn = document.getElementById('generate-inputs');
const testsInputsContainer = document.getElementById('tests-inputs');
const resultDisplay = document.getElementById('result-display');

generateInputsBtn.addEventListener('click', generateInputBoxes);

function generateInputBoxes() {
    const numTests = parseInt(numTestsInput.value);
    if (isNaN(numTests) || numTests < 1) {
        alert('Please enter a valid number greater than 0.');
        return;
    }

    testsInputsContainer.innerHTML = '';
    const inputGroups = [];

    for (let i = 0; i < numTests; i++) {
        const group = document.createElement('div');
        group.classList.add('input-group');

        const markInput = document.createElement('input');
        markInput.type = 'number';
        markInput.placeholder = `Mark ${i + 1}`;
        group.appendChild(markInput);

        const maxMarkInput = document.createElement('input');
        maxMarkInput.type = 'number';
        maxMarkInput.placeholder = `Max Mark ${i + 1}`;
        group.appendChild(maxMarkInput);

        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.placeholder = `Weight ${i + 1}`;
        group.appendChild(weightInput);

        testsInputsContainer.appendChild(group);
        inputGroups.push([markInput, maxMarkInput, weightInput]);
    }

    const calculateBtn = document.createElement('button');
    calculateBtn.textContent = 'Calculate Result';
    calculateBtn.addEventListener('click', calculateResult.bind(null, inputGroups));
    testsInputsContainer.appendChild(calculateBtn);
}

function calculateResult(inputGroups) {
    let result = 0;
    let totalWeight = 0;

    for (const [markInput, maxMarkInput, weightInput] of inputGroups) {
        const mark = parseFloat(markInput.value);
        const maxMark = parseFloat(maxMarkInput.value);
        const weight = parseFloat(weightInput.value);

        if (!isNaN(mark) && !isNaN(maxMark) && !isNaN(weight) && maxMark > 0) {
            const weightedMark = (mark / maxMark) * weight;
            result += weightedMark;
            totalWeight += weight;
        }
    }

    if (totalWeight === 0) {
        resultDisplay.textContent = 'Invalid input data.';
    } else {
        resultDisplay.textContent = `Result: ${(result / totalWeight * 100).toFixed(2)}%`;
    }
}