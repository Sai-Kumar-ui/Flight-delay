// Flight delay prediction model
// This is a simplified model based on statistical probabilities
// In a real application, this would be replaced with a trained machine learning model

// Sample dataset statistics (simplified from Kaggle flight delay dataset)
const airlineDelayRates = {
  'UA': 0.22, // United Airlines
  'AA': 0.20, // American Airlines
  'DL': 0.15, // Delta Airlines
  'WN': 0.18, // Southwest Airlines
  'B6': 0.25, // JetBlue Airways
  'AS': 0.14, // Alaska Airlines
  'NK': 0.30, // Spirit Airlines
  'F9': 0.28  // Frontier Airlines
};

const airportDelayRates = {
  'ATL': 0.20, // Atlanta
  'LAX': 0.25, // Los Angeles
  'ORD': 0.30, // Chicago O'Hare
  'DFW': 0.18, // Dallas/Fort Worth
  'JFK': 0.28, // New York JFK
  'SFO': 0.27, // San Francisco
  'EWR': 0.32, // Newark
  'LAS': 0.15, // Las Vegas
  'MCO': 0.17, // Orlando
  'DEN': 0.22  // Denver
};

const monthDelayRates = {
  1: 0.30, // January (winter weather)
  2: 0.28, // February
  3: 0.25, // March
  4: 0.18, // April
  5: 0.20, // May
  6: 0.22, // June (summer thunderstorms)
  7: 0.24, // July
  8: 0.23, // August
  9: 0.15, // September
  10: 0.17, // October
  11: 0.20, // November
  12: 0.32  // December (holiday travel + winter weather)
};

// DOM elements
const yearInput = document.getElementById('year');
const monthInput = document.getElementById('month');
const dateInput = document.getElementById('date');
const airlineSelect = document.getElementById('airline');
const originSelect = document.getElementById('origin');
const destinationSelect = document.getElementById('destination');
const predictButton = document.getElementById('predict-button');
const predictionResult = document.getElementById('prediction-result');

// Prediction function
function predictFlightDelay() {
  // Get input values
  const year = yearInput.value;
  const month = parseInt(monthInput.value);
  const date = parseInt(dateInput.value);
  const airline = airlineSelect.value;
  const origin = originSelect.value;
  const destination = destinationSelect.value;
  
  // Validate inputs
  if (!year || !month || !date || !airline || !origin || !destination) {
    predictionResult.innerHTML = '<p class="error">Please fill in all fields</p>';
    return;
  }
  
  if (origin === destination) {
    predictionResult.innerHTML = '<p class="error">Origin and destination cannot be the same</p>';
    return;
  }
  
  // Calculate delay probability
  let delayProbability = 0;
  
  // Factor in airline delay rate
  delayProbability += airlineDelayRates[airline] || 0.2;
  
  // Factor in origin and destination airports
  delayProbability += (airportDelayRates[origin] || 0.2) * 0.5;
  delayProbability += (airportDelayRates[destination] || 0.2) * 0.5;
  
  // Factor in month (seasonal effects)
  delayProbability += monthDelayRates[month] || 0.2;
  
  // Average the factors
  delayProbability = delayProbability / 3;
  
  // Add some randomness (to simulate other factors)
  delayProbability += (Math.random() * 0.1) - 0.05;
  
  // Clamp between 0 and 1
  delayProbability = Math.max(0, Math.min(1, delayProbability));
  
  // Determine result
  let resultText = '';
  let resultClass = '';
  
  if (delayProbability > 0.5) {
    resultText = 'The flight is likely to be delayed';
    resultClass = 'delayed';
  } else {
    resultText = 'The flight is not delayed';
    resultClass = 'on-time';
  }
  
  // Update UI
  predictionResult.innerHTML = `<p class="${resultClass}">${resultText}</p>`;
  
  // Add delay probability percentage for more detail
  const percentage = Math.round(delayProbability * 100);
  predictionResult.innerHTML += `<p>Delay probability: ${percentage}%</p>`;
}

// Event listeners
predictButton.addEventListener('click', predictFlightDelay);

// Add some basic form validation
monthInput.addEventListener('change', function() {
  const value = parseInt(this.value);
  if (value < 1) this.value = 1;
  if (value > 12) this.value = 12;
});

dateInput.addEventListener('change', function() {
  const value = parseInt(this.value);
  if (value < 1) this.value = 1;
  if (value > 31) this.value = 31;
});

// Initialize with current year
yearInput.value = new Date().getFullYear();

console.log('Flight Delay Prediction App initialized');