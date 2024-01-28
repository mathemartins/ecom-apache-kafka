// src/models/Order.ts

import mongoose, { Schema, Document } from 'mongoose';

interface Order {
    userId: string;
    products: string[]; // Array of product IDs
    totalAmount: number;
}

interface OrderDocument extends Order, Document {}

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalAmount: { type: Number, required: true },
});

const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema);

export default OrderModel;
