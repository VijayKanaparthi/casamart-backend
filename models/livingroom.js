import mongoose from "mongoose"

const living = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  discount_price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
})

const livingroom = await mongoose.model("livingroom", living)

export default livingroom
