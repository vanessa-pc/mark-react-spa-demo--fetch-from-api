import fetch from "node-fetch";

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

function printGeneralJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/general/random")
    .then((response) => response.json())
    .then((jsonBody: Joke[]) => {
      /** TS now treats jsonBody like an array */
      console.log(jsonBody[0].setup, jsonBody[0].punchline);
    });
}

async function printProgrammingJoke() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  const jsonBody: Joke[] = await response.json();
  /** TS now treats jsonBody like an array */
  console.log(jsonBody[0].setup, jsonBody[0].punchline);
}

printGeneralJoke();
// printProgrammingJoke();
