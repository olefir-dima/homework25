import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();

server.register(fastifyStatic, {
  root: path.join(__dirname, "../client"),
});

server.post("/stat", async (request, response) => {
  const data = request.body;
  response.send(calcStatistics(data));
});

server.listen({ port: 5333 }).then(() => {
  console.log("Server started");
});

function calcStatistics(text) {
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
