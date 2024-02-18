import { updateView } from "./updateView.js";

document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("userInput");
  const calcBtn = document.getElementById("calcBtn");

  calcBtn.addEventListener("click", () => {
    calcStat(userInput);
  });
});
async function calcStat(userInput) {
  const text = userInput.value.trim();
  if (text === "") {
    alert("Enter some text");
    return;
  }

  try {
    const response = await fetch("/stat", {
      headers: { "Content-Type": "text/plain" },
      method: "POST",
      body: text,
    });
    if (!response.ok) {
      throw new Error(`code: ${response.status}.`);
    }

    const result = await response.json();
    updateView(result);
  } catch (error) {
    console.error(error);
  }
}
