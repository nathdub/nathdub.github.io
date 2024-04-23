const numMarksInput = document.getElementById('num-marks');
const generateInputsBtn = document.getElementById('generate-inputs');
const marksInputsContainer = document.getElementById('marks-inputs');
const meanDisplay = document.getElementById('mean-display');

generateInputsBtn.addEventListener('click', generateInputBoxes);

function generateInputBoxes() {
    const numMarks = parseInt(numMarksInput.value);
    if (isNaN(numMarks) || numMarks < 1) {
        alert('Please enter a valid number greater than 0.');
        return;
    }

    marksInputsContainer.innerHTML = '';
    const inputBoxes = [];

    for (let i = 0; i < numMarks; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Mark ${i + 1}`;
        marksInputsContainer.appendChild(input);
        inputBoxes.push(input);
    }

    const calculateMeanBtn = document.createElement('button');
    calculateMeanBtn.textContent = 'Calculate Mean';
    calculateMeanBtn.addEventListener('click', calculateMean.bind(null, inputBoxes));
    marksInputsContainer.appendChild(calculateMeanBtn);
}

function calculateMean(inputBoxes) {
    const marks = inputBoxes.map(input => parseFloat(input.value));
    const validMarks = marks.filter(mark => !isNaN(mark));
    const sum = validMarks.reduce((total, mark) => total + mark, 0);
    const mean = sum / validMarks.length;
    meanDisplay.textContent = `Mean: ${mean.toFixed(2)}`;
}