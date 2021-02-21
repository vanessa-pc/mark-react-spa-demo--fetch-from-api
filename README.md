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

For example, in demo 1's `printExampleJoke`, TypeScript stops us from trying to read the `setup` and `punchline` properties of our `jokeResponse` variable - it can see that it's an array. However, it will let us read `jokeResponse[0].setup` and `jokeResponse[1].punchline` - so, comment out the line with type errors, run the demo, and you'll see our joke output in the terminal.

Unfortunately... we get no such help from TypeScript in `printGeneralJoke` and `printProgrammingJoke`, when we `fetch` data from the Joke API. If you try running either, you'll see `undefined` get spit out into the terminal.

Why is it printing `undefined`? If you de-comment the debugging `console.log`s in the functions and try the functions running again, you'll see that it prints out a structure which looks very similar to `jokeResponse` - an array with one element, an object, which has the `setup` and `punchline` properties. So, just like with `printExampleJoke`, we should be reading and printing `res[0].setup` and `jsonBody[0].setup`.

But why didn't TypeScript warn us that we were doing something wrong like it did with `printExampleJoke`?

### The (dangerous!) `any` type: anything goes

To understand this behaviour, we'll need to look at `any` - a type that you might have come across, but which we've tried to avoid using, because [using the `any` type usually represents bad practice](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any).

Replace the start of our `jokeResponse` variable definition as follows:

```diff
+ const jokeResponse: any = [
- const jokeResponse = [
  {
    id: 117,
    type: "general",
    setup: "How come the stadium got hot after the game?",
    punchline: "Because all of the fans left.",
  },
];
```

Now, TypeScript will no longer catch the mistake in `console.log(jokeResponse.setup, jokeResponse.punchline)`. In fact, it'll let you do all sorts of weird things, like `jokeResponse + 1` or `jokeResponse("hello world!")`.

In other words, the `any` type is a reckless _"anything goes!"_ type. We can see that `jokeResponse` is an array, which means it's enormously silly to try to read a `.setup` property, add `1` to it or execute it with an argument of `"hello world!"` - but, by asking TypeScript to treat it as `any`, it's letting us do all manner of silly things.

### Avoiding the temptation of `any`

It can be very tempting to reach for `any` to make a TypeScript error go away - but you're not really fixing the problem if you do this. TypeScript errors are warning us about things which are likely to cause bugs or break in production. The `any` type is a bit like closing your eyes, sticking your hands over your ears and going "LA LA LA I CAN'T HEAR OR SEE ANY PROBLEMS LALALA ALL IS FINE" - it doesn't actually treat the underlying issue.

For more on avoiding the use of `any`, read ["TypeScript: stop using `any`, there's a type for that"](https://thoughtbot.com/blog/typescript-stop-using-any-there-s-a-type-for-that).
