// src/models/Product.ts

import mongoose, { Schema, Document } from 'mongoose';

interface Product {
    name: string;
    price: number;
}

interface ProductDocument extends Product, Document {}

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
