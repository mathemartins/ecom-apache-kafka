import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface
interface IUser extends Document {
    username: string;
    password: string;
}

// Define the User schema
const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;