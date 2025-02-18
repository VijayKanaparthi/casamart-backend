import mongoose from "mongoose"

const home_appliences_schema = mongoose.Schema({
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

const homeAppliencesData = mongoose.model(
  "homeAppliencesData",
  home_appliences_schema
)

export default homeAppliencesData
