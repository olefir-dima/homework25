export function calcStatistics(text) {
  const words = split(text);
  const uniqueWords = new Set(words);

  const statistics = new Map();
  uniqueWords.forEach((word) => {
    const occurrences = words.filter((w) => w === word).length;
    statistics.set(word, occurrences);
  });

  return {
    uniqueWords: uniqueWords.size,
    occurrences: Object.fromEntries(statistics),
  };
}

function split(text) {
  const words = [];
  let currentWord = "";
  for (let char of text) {
    if (char === " " || char === "\t" || char === "\n" || char === "\r") {
      if (currentWord !== "") {
        words.push(currentWord.toLowerCase());
        currentWord = "";
      }
    } else {
      currentWord += char;
    }
  }

  if (currentWord !== "") {
    words.push(currentWord.toLowerCase());
  }

  return words;
}
