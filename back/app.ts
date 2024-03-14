/* eslint-disable @typescript-eslint/no-var-requires */
import { Backend } from "kuzzle";
import { Kuzzle, WebSocket } from "kuzzle-sdk";

const kuzzle = new Kuzzle(new WebSocket("localhost"));

const app = new Backend("Message-chat");

// Fonction pour détecter les mots impolis

app
  .start()
  .then(() => {
    kuzzle
      .connect()
      .then(async () => {
        // Now we can interact with Kuzzle API
        // eslint-disable-next-line no-console
        console.log("Serveur on");
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
