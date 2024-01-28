// src/index.ts

import * as express from 'express';
import mongoose from "mongoose";
import {KafkaClient, Producer} from "kafka-node";
import * as dotenv from 'dotenv'
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any).then(resp => {
    console.log("Connected to mongodb", resp)
}).catch((error) => {
    console.error("Error connected to mongodb", error)
})


// setup kafka
const kafkaClient = new KafkaClient({kafkaHost: process.env.KAFKA_HOST})
const producer = new Producer(kafkaClient)

producer.on("ready", () => {
    console.log("Kafka is ready!")
})

// setup routes
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Start backend server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})