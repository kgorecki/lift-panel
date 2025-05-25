const translations = {
  en: {
    legend: [
      'Press "Call" to confirm your floor selection.',
      'Use the "Clear" button to reset the input.',
      'Audio files are available for floors 1-13. 13th floor contains wrong audio.'
    ],
    arrivedText: 'Floor',
  },
  fi: {
    legend: [
      'Paina "Call" vahvistaaksesi kerroksen valinnan.',
      'Käytä "Clear"-painiketta syötteen nollaamiseen.',
      'Äänitiedostot ovat saatavilla kerroksille 1-13. 13. kerroksen ääni on väärä.'
    ],
    arrivedText: 'Kerros',
  },
  pl: {
    legend: [
      'Naciśnij "Call", aby potwierdzić wybór piętra.',
      'Użyj przycisku "Clear", aby zresetować wybór.',
      'Pliki audio są dostępne dla pięter 1-13. Dla 13. piętra jest błędny dźwięk.'
    ],
    arrivedText: 'Piętro',
  }
};

let selectedFloor = '';
let currentLanguage = 'en';

function pressDigit(digit) {
  if (selectedFloor.length < 2) {
    selectedFloor += digit;
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("floorDisplay").textContent = selectedFloor || "_";
}

function clearInput() {
  selectedFloor = '';
  updateDisplay();
}

function callElevator() {
  if (!selectedFloor) return;

  const floor = parseInt(selectedFloor);
  document.getElementById("screen1").classList.add("hidden");
  document.getElementById("screen2").classList.remove("hidden");
  document.getElementById("arrivedText").textContent = `Floor ${floor}`;

  const audio = new Audio(`sounds/${currentLanguage}/floor_${floor}.mp3`);
  audio.play();

  setTimeout(() => {
    selectedFloor = '';
    updateDisplay();
    document.getElementById("screen2").classList.add("hidden");
    document.getElementById("screen1").classList.remove("hidden");
  }, 4000);
}

function switchLanguage(lang) {
  currentLanguage = lang;

  generateLanguageSwitcher();
  
  const legendTexts = document.querySelectorAll('.legend p');
  const arrivedText = document.getElementById('arrivedText');

  // Update legend text
  translations[lang].legend.forEach((text, index) => {
    if (legendTexts[index]) {
      legendTexts[index].textContent = text;
    }
  });

  // Update arrived text
  arrivedText.textContent = translations[lang].arrivedText;

  // Update audio file paths (example for floor 1)
  const audioElement = document.getElementById('floorAudio'); // Assuming you have an <audio> element
  if (audioElement) {
    audioElement.src = translations[lang].audioFiles[1]; // Update based on the selected floor
  }
}

function generateLanguageSwitcher() {
  const languageSwitcher = document.getElementById('languageSwitcher');
  languageSwitcher.innerHTML = '';

  Object.keys(translations).forEach((lang) => {
    const button = document.createElement('button');
    button.textContent = lang.toUpperCase();
    button.onclick = () => switchLanguage(lang);
    button.classList.add('language-button');
    if (lang === currentLanguage) {
      button.classList.add('active-language'); // Highlight the current language
    }
    languageSwitcher.appendChild(button);
  });
}

// Call the function to generate the language switcher on page load
document.addEventListener('DOMContentLoaded', generateLanguageSwitcher);
