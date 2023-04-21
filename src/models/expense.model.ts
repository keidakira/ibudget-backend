import { Schema, model } from "mongoose";

interface Expense extends Document {
    name: string;
    amount: number;
    date: Date;
    user: string;
}

const ExpenseSchema: Schema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

export default model<Expense>("Expense", ExpenseSchema);