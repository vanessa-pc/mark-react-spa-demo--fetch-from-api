import fetch from "node-fetch";

function demoFetchWithThen() {
  fetch("https://official-joke-api.appspot.com/jokes/general/random")
    .then((res) => res.json())
    .then((res) => console.log(res));
}

async function demoFetchWithAwait() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/programming/random"
  );
  const jsonBody = await response.json();
  console.log(jsonBody);
}

demoFetchWithThen();
// demoFetchWithAwait();
