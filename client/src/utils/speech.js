/* function speech(text) {
  console.log("speech");
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;
  utterance.lang = "en-GB";

  utterance.onstart = () => console.log("Speech started");
  utterance.onend = () => console.log("Speech ended");
  utterance.onerror = (e) => console.log("Speech error: ", e);

  // if (speechSynthesis.speaking) speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

export default speech; */
