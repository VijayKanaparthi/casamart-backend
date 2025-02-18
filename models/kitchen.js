import mongoose from "mongoose"

const kitchenSchema = mongoose.Schema({
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
const kitchenData = mongoose.model("kitchen-Items", kitchenSchema)
export default kitchenData
