const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const speakBtn = document.getElementById('speak-btn');
const stopBtn = document.getElementById('stop-btn');

let voices = [];

// Load voices
function loadVoices() {
  voices = speechSynthesis.getVoices();
  
  // Clear existing options
  voiceSelect.innerHTML = '';

  // Filter and add voices to the dropdown
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang}) - ${voice.gender || 'Unknown'}`;
    voiceSelect.appendChild(option);
  });

  // Optional: Set a default voice (e.g., first female or male voice)
  const defaultVoice = voices.find(voice => voice.gender === 'female') || voices[0];
  if (defaultVoice) {
    voiceSelect.selectedIndex = voices.indexOf(defaultVoice);
  }
}

// Speak function
function speak() {
  if (speechSynthesis.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;
    speechSynthesis.speak(utterance);
  }
}

// Stop function
function stop() {
  speechSynthesis.cancel();
}

// Event Listeners
speechSynthesis.addEventListener('voiceschanged', loadVoices);
speakBtn.addEventListener('click', speak);
stopBtn.addEventListener('click', stop);
rate.addEventListener('input', () => rateValue.textContent = rate.value);
pitch.addEventListener('input', () => pitchValue.textContent = pitch.value);

// Load voices on page load
loadVoices();