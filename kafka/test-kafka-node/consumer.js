//const Kafka = require("kafkajs").Kafka
const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "test" });
    console.log("Connecting.....");
    await consumer.connect();
    console.log("Connected!");

    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `RVD Msg ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
  }
}

async function run2() {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    console.log("Consumer connected");

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    console.log("Subscribing to topic: test-topic");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  } catch (err) {
    console.error(`Something bad happened ${err}`);
  } finally {
    process.exit(0);
  }
}
