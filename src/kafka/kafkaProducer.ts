import {Consumer, KafkaClient, Producer} from "kafka-node";

const kafkaClient = new KafkaClient({kafkaHost: process.env.KAFKA_HOST})

const producer = new Producer(kafkaClient)

producer.on("ready", () => {
    console.log("Kafka is ready!")
})

export const publishToKafka = (topic: string, message: string) => {
    return new Promise((resolve, reject) => {
        producer.send([{ topic, messages: message }], (err, data) => {
            if (err) {
                console.error('Error producing Kafka message:', err);
                reject(err);
            } else {
                console.log('Message sent to Kafka');
                resolve(data);
            }
        });
    });
};


// const consumer = new Consumer(kafkaClient, [{ topic: 'order-events' }]);
//
// consumer.on('message', (message) => {
//     const event = JSON.parse(message.value);
//     // Handle the event based on its type
//     if (event.eventType === 'orderCreated') {
//         // Process order creation logic
//         console.log('Received orderCreated event:', event);
//     }
// });