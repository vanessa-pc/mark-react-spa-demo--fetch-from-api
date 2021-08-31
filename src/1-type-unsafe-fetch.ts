import fetch from "node-fetch";

const jokeResponse = [
  {
    id: 117,
    type: "general",
    setup: "How come the stadium got hot after the game?",
    punchline: "Because all of the fans left.",
  },
];

function printExampleJoke() {
  /** TS correctly warns us that jokeResponse is an array */
  // console.log(jokeResponse.setup, jokeResponse.punchline);
  /** TS lets us read from an element in the array though! */
  console.log(jokeResponse[0].setup, jokeResponse[0].punchline);
}

function printGeneralJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/general/random")
    .then((response) => response.json())
    .then((jsonBody) => {
      console.log(jsonBody) /* de-comment to troubleshoot */
      /** TS doesn't know that jsonBody is an array */
      console.log(jsonBody.setup, jsonBody.punchline);
    });
}

async function printProgrammingJoke() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  const jsonBody = await response.json();
  console.log(jsonBody) /* de-comment to troubleshoot */
  /** TS doesn't know that jsonBody is an array */
  console.log(jsonBody.setup, jsonBody.punchline);
}

// printExampleJoke();
printGeneralJoke();
// printProgrammingJoke();
