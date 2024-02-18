export function updateView(statistics) {
  const statisticsDiv = document.getElementById("statistics");
  statisticsDiv.innerHTML = `
    <p>Unique words: ${statistics.uniqueWords}</p>
    <p>Occurrences:</p>
    <ul>
      ${Object.entries(statistics.occurrences)
        .map(([word, occurrences]) => `<li>${word}: ${occurrences}</li>`)
        .join("")}
    </ul>
  `;
}
