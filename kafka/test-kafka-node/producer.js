const { Kafka } = require("kafkajs");
const { Partitioners } = require('kafkajs');
const msg = process.argv[2];

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    console.log("Connecting.....");
    await producer.connect();
    console.log("Connected!");
    //A-M 0 , N-Z 1
    console.log(`msg[0] = ${msg[0]}`);
    const partition = msg[0] < "N" ? 0 : 1;
    console.log(`partition = ${partition}`);

    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log(`Send Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    process.exit(0);
  }
}

async function run2() {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();

    await producer.connect();
    console.log("Producer connected");

    await producer.send({
      topic: "test-topic",
      messages: [{ value: "Hello KafkaJS user!" }],
    });
    console.log('Message to Kafka sent');

    await producer.disconnect();
  } catch (err) {
    console.error(`Something bad happened ${err}`);
  } finally {
    process.exit(0);
  }
}
