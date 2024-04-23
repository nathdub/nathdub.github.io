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
        markInput.type = 'text';
        markInput.placeholder = `Mark ${i + 1} (Ai/Bi)`;
        group.appendChild(markInput);

        const weightInput = document.createElement('input');
        weightInput.type = 'text';
        weightInput.placeholder = `Weight ${i + 1} (Ci%)`;
        group.appendChild(weightInput);

        testsInputsContainer.appendChild(group);
        inputGroups.push([markInput, weightInput]);
    }

    const calculateBtn = document.createElement('button');
    calculateBtn.textContent = 'Calculate Result';
    calculateBtn.addEventListener('click', calculateResult.bind(null, inputGroups));
    testsInputsContainer.appendChild(calculateBtn);
}

function calculateResult(inputGroups) {
    let sumWeightedMarks = 0;
    let sumWeights = 0;

    for (const [markInput, weightInput] of inputGroups) {
        const [markValue, maxMarkValue] = markInput.value.split('/').map(parseFloat);
        const weightValue = parseFloat(weightInput.value.replace('%', '')) / 100;

        if (!isNaN(markValue) && !isNaN(maxMarkValue) && !isNaN(weightValue) && maxMarkValue > 0) {
            const weightedMark = (markValue / maxMarkValue) * weightValue;
            sumWeightedMarks += weightedMark;
            sumWeights += weightValue;
        }
    }

    if (sumWeights === 0) {
        resultDisplay.textContent = 'Invalid input data.';
    } else {
        const minimalMarks = (0.5 - sumWeightedMarks) / (1 - sumWeights) * 100;
        const minimalMarksNormalized = (0.5 - sumWeightedMarks) / (1 - sumWeights) * 20;
        const remainingWeight = (1 - sumWeights) * 100;
        const actualMean = (sumWeightedMarks / sumWeights) * 100;
        const actualMeanNormalized = (sumWeightedMarks / sumWeights) * 20;
        const worstPossibleMean = sumWeightedMarks * 100;
        const worstPossibleMeanNormalized = sumWeightedMarks * 20;
        const bestPossibleMean = (sumWeightedMarks + (1 - sumWeights)) * 100;
        const bestPossibleMeanNormalized = (sumWeightedMarks + (1 - sumWeights)) * 20;

        resultDisplay.innerHTML = `
            <p><strong>Minimal Marks: ${minimalMarks.toFixed(2)}% = ${minimalMarksNormalized.toFixed(2)}/20</strong></p>
            <p>Remaining Weight: ${remainingWeight.toFixed(2)}%</p>
            <p>Actual Mean: ${actualMean.toFixed(2)}% = ${actualMeanNormalized.toFixed(2)}/20</p>
            <p>Worst Possible Mean: ${worstPossibleMean.toFixed(2)}% = ${worstPossibleMeanNormalized.toFixed(2)}/20</p>
            <p>Best Possible Mean: ${bestPossibleMean.toFixed(2)}% = ${bestPossibleMeanNormalized.toFixed(2)}/20</p>
        `;
    }
}