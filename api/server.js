import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "ecommerce",
  brokers: ["localhost:29092"],
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();

router.post("/order", async (ctx) => {
  await producer.connect();
  await producer.send({
    topic: "send-order-email",
    messages: [
      {
        value: JSON.stringify({
          productName: "iPhone 12",
          value: 4000,
          user: {
            email: "hi.gabrielferreira@gmail.com",
            name: "Gabriel Ferreira",
          },
        }),
      },
    ],
  });

  ctx.body = { ok: true };

  // await producer.disconnect();
});

app.use(router.routes());

app.listen(3000);
