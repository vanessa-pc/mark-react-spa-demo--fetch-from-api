# Fetching from an API

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

> This is part of Academy's [technical curriculum for **The Mark**](https://github.com/WeAreAcademy/curriculum-mark). All parts of that curriculum, including this project, are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

We'll now look at how both Promise callbacks and `async`/`await` can be used to fetch data from an API.

## Learning Outcomes

- Use `fetch` to get JSON data from an existing API
- Process a `fetch` response using `await` and a `.then` callback
- Explain the dangers of the `any` type in TypeScript
- Narrow down the `any` type in TypeScript

## Demo 0: fetching a joke

> 🎯 **Success criterion:** You can see the results of `fetch`ing data from an API in your terminal

`fetch` is a function which is commonly used to get data from an existing API into a front-end app. (It is available by default in modern browsers. Outside the browser environment, in Node, we're using the [`node-fetch` library](https://github.com/node-fetch/node-fetch) to simulate it.)

In this demo, we'll be using it to get data from [this joke API](https://github.com/15Dkatz/official_joke_api). If you open the documented links in your browser (e.g. ["Grab a random joke!"](https://official-joke-api.appspot.com/random_joke)), you'll see a JSON response such as:

```json
{
  "id": 195,
  "type": "general",
  "setup": "What did the shy pebble wish for?",
  "punchline": "That she was a little boulder."
}
```

By drawing on APIs, we can load data (like jokes, [dog pictures](https://dog.ceo/dog-api/) or [Kanye West quotes](https://kanye.rest/)) into our front-end apps.

### Using `fetch`

`fetch` returns a Promise, which means we can either use a `.then` callback on it, or `await` it.

Demo 0 shows the recipe for extracting the core response data from an API, in both the `.then` style and the `async`/`await` style. Try running the demo with `ts-node` and see what prints in your terminal (for both styles).

Then, try substituting the joke API url with:

- `https://dog.ceo/api/breeds/image/random`
- `https://api.kanye.rest/`

and see what comes back again.

## Demo 1: type unsafety of `fetch`

> 🎯 **Success criterion:** You can explain the lack of type safety in `any` and in `fetch`

We've been using TypeScript and enjoying the benefits of static type safety which it gives to us.

For example, in demo 1, TypeScript stops us from trying to read the `setup` and `punchline` properties of our `jokeResponse` variable - it can see that it's an array. However, it will let us read `jokeResponse[0].setup` and `jokeResponse[1].punchline` - so, comment out the line with type errors, run the demo, and you'll see our joke output in the terminal.
