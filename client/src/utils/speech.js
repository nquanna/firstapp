function speech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.75;
  utterance.lang = "en-GB";
  speechSynthesis.speak(utterance);
}

export default speech;
