import {Request, Response} from "express";
import {publishToKafka} from "../kafka/kafkaProducer";

export const createOrder = async (req: Request, res: Response) => {
    try {
        // Process order creation logic...

        // Publish a Kafka message for the new order
        const message = JSON.stringify({ eventType: 'orderCreated', orderId: '12345' });
        await publishToKafka('order-events', message);

        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};