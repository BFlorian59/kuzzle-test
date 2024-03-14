import { Backend, KuzzleRequest } from "kuzzle";
import { Kuzzle, WebSocket, Http } from "kuzzle-sdk";

// const customRoutes = {
//   "nyc-open-data-plugin/chat-message": {
//     // eslint-disable-next-line sort-keys
//     enroll: { verb: "GET", url: "/_plugin/nyc-open-data-plugin/chat-message" },
//   },
// };

// const headers = {
//   "Accept-Encoding": "gzip, deflate",
// };

// const options = {
//   autoReconnect: false,
// };

const kuzzle = new Kuzzle(new WebSocket("localhost"));

//const kuzzle = new Kuzzle(httpProtocol);
// Instantiate an application
const app = new Backend("playground");

app
  .start()
  .then(() => {
    kuzzle
      .connect()
      .then(async () => {
        // Now we can interact with Kuzzle API
        // eslint-disable-next-line no-console
        console.log("rer");
        // Interact with Kuzzle API to creates a new index if it does not exists
        if (!(await kuzzle.index.exists("nyc-open-data"))) {
          await kuzzle.index.create("nyc-open-data");
        }

        try {
          await kuzzle.collection.create("nyc-open-data", "chat-message", {});

          await kuzzle.realtime.subscribe(
            "nyc-open-data",
            "chat-message",
            {},
            (notification) => {
              // process notification
              // eslint-disable-next-line no-console
              console.log(`Le message a été ${notification.action}`);
            },
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.message);
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
// Now we can register features

// Start the application
