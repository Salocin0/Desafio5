import { Schema, model } from "mongoose";

const productCart = new Schema({
    quantity: { type: Number, required: true },
    id: { type: String, required: true }
  });

export const CartsModel = model(
  "carts",
  new Schema({
    products: { type: [productCart], required: true },
  })
);