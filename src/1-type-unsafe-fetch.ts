import fetch from "node-fetch";

const exampleOutput = [
  {
    id: 117,
    type: "general",
    setup: "How come the stadium got hot after the game?",
    punchline: "Because all of the fans left.",
  },
];

function printExampleJoke() {
  /** TS correctly warns us that exampleOutput is an array */
  console.log(exampleOutput.setup, exampleOutput.punchline);
  // console.log(exampleOutput[0].setup, exampleOutput[0].punchline)
}

function printGeneralJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/general/random")
    .then((res) => res.json())
    /** TS doesn't know that res is an array */
    .then((res) => console.log(res.setup, res.punchline));
}

async function printProgrammingJoke() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  const jsonBody = await response.json();
  /** TS doesn't know that jsonBody is an array */
  console.log(jsonBody.setup, jsonBody.punchline);
}

printExampleJoke();
// printGeneralJoke();
// printProgrammingJoke();
