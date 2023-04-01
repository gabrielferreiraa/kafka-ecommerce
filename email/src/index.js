import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "ecommerce",
  brokers: ["localhost:29092"],
});

const consumer = kafka.consumer({ groupId: 'ecommerce-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "send-order-email" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
    },
  });

//   await consumer.disconnect();
};

run().catch(console.error);
