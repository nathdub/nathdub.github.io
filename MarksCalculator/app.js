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
        markInput.placeholder = `note ${i + 1} : (50/100)`;
        group.appendChild(markInput);

        const weightInput = document.createElement('input');
        weightInput.type = 'text';
        weightInput.placeholder = `importance note ${i + 1} : (50%)`;
        group.appendChild(weightInput);

        testsInputsContainer.appendChild(group);
        inputGroups.push([markInput, weightInput]);
    }

    const calculateBtn = document.createElement('button');
    calculateBtn.textContent = 'Calculer';
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

        let minimalMarksMessage = '';
        if (minimalMarks < 0) {
            minimalMarksMessage = 'GG mon reuf, tu peux signer que tu réussirais 🥳 (ps: je décline toute responsabilité néanmoins) ';
        } else if (minimalMarks > 100) {
            minimalMarksMessage = "Mon reuf, euh comment dire, j'ai bien peur que tu sois foutu 😅";
        }

        resultDisplay.innerHTML = `
            <p>${minimalMarksMessage}</p>
            <p><strong>Note minimale à obtenir pour réussir: ${minimalMarks.toFixed(2)}% = ${minimalMarksNormalized.toFixed(2)}/20</strong></p>
            <p>Cotation restante: ${remainingWeight.toFixed(2)}%</p>
            <p>Moyenne actuelle: ${actualMean.toFixed(2)}% = ${actualMeanNormalized.toFixed(2)}/20</p>
            <p>Pire moyenne possible (tu signes tt en gros): ${worstPossibleMean.toFixed(2)}% = ${worstPossibleMeanNormalized.toFixed(2)}/20</p>
            <p>Meilleure moyenne possible: ${bestPossibleMean.toFixed(2)}% = ${bestPossibleMeanNormalized.toFixed(2)}/20</p>
        `;
    }
}