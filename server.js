import express, { request, response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import cors from "cors"
import crypto from "crypto"

import { newUser } from "./models/user.js"
import {
  sendingWelcomeEmail,
  sendResetPasswordEmail,
  sendResetSuccessfullMail,
  sendVerificationEmail,
} from "./mailtrap/email.js"
import { generatingJwtToken } from "./utils/generatingJwtToken.js"

import homeAppliencesData from "./models/homeAppliencesSchema.js"

import livingroom from "./models/livingroom.js"
import furnitureItemsSchema from "./models/furnitureitems.js"
import kitchenData from "./models/kitchen.js"
import cleaningItem from "./models/cleaning-items.js"

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())

app.post("/signup", async (request, response) => {
  const { name, email, password } = request.body

  try {
    if (!name || !email || !password) {
      return response
        .status(400)
        .json({ message: "All Feilds Required", success: false })
    }

    const user = await newUser.findOne({ email })
    if (user) {
      return response
        .status(409)
        .json({ message: "User Already Exists", success: false })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    const new_user = new newUser({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    })

    await new_user.save()

    //verifyEmail
    await sendVerificationEmail(email, verificationToken)
    //jwt

    response.status(201).json({
      message: "Check Your Email",
      success: true,
      user: {
        ...new_user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    response.status(500).json({ message: error.message, success: false })
  }
})

app.post("/verify-email", async (request, response) => {
  const { code } = request.body
  const customer = await newUser.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  })

  if (!customer) {
    return response
      .status(404)
      .send({ message: "Verification Token Expired", success: false })
  }

  customer.isVerified = true
  customer.verificationToken = undefined
  customer.verificationTokenExpiresAt = undefined
  customer.jwt_token = await generatingJwtToken(response, customer._id)

  await customer.save()

  await sendingWelcomeEmail(customer.name, customer.email)

  response.status(200).json({
    success: true,
    message: "User Created Successfully",
    customer: {
      ...customer._doc,
      password: undefined,
    },
  })
})

app.post("/login", async (request, response) => {
  const { email, password } = request.body
  try {
    const user = await newUser.findOne({ email })
    if (!user) {
      return response
        .status(404)
        .json({ message: "Invalid email", success: false })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return response
        .status(400)
        .json({ message: "Invalid password", success: false })
    }

    const jwtToken = await generatingJwtToken(response, user._id)

    user.jwt_token = jwtToken
    user.lastLogin = new Date()
    await user.save()

    response.status(200).json({
      message: "Log In Successfully",
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    return response.status(500).json({ message: error.message, success: false })
  }
})

app.post("/forgot-password", async (request, response) => {
  const { email } = request.body
  try {
    const user = await newUser.findOne({ email })
    if (!user) {
      return response
        .status(404)
        .json({ message: "User Not Found", success: false })
    }

    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

    user.resetPasswordToken = resetToken
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt
    await user.save()

    //send mail for reset token
    await sendResetPasswordEmail(
      user.email,
      `http://localhost:3000/reset-password/${resetToken}`
    )

    response.status(200).json({
      message: "Password Reset link Sent to Your Mail",
      success: true,
    })
  } catch (error) {
    console.log("Error in Forgot Password", error.message)
    response.status(500).json({ message: error.message, success: false })
  }
})

app.post("/reset-password/:token", async (request, response) => {
  const { token } = request.params
  const { password } = request.body
  try {
    const user = await newUser.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      return response
        .status(400)
        .json({ message: "Your OTP was Expired", success: false })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiresAt = undefined
    await user.save()

    sendResetSuccessfullMail(user.email)

    response.status(200).json({
      message: "Password Reset Successfully",
      success: true,
    })
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})
{
  /* Home Appliences */
}
app.post("/HomeAppliances", async (request, response) => {
  try {
    const data = request.body
    const createdData = await homeAppliencesData.create(data)
    response.status(200).json({
      success: true,
      message: "Successfully Inserted",
      home_appliences_data: createdData,
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error Inserting Data",
      error: error.message,
    })
  }
})

app.get("/GetHomeAppliances", async (request, response) => {
  try {
    const data = await homeAppliencesData.find({ category: { $eq: "AC" } })
    response.status(200).json({ data: data })
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error Getting data", error: error.message })
  }
})

app.get("/GetHomeAppliances/:id", async (request, response) => {
  const { id } = request.params
  try {
    const data = await homeAppliencesData.find({ _id: id })
    response.status(200).json({ data: data })
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error Getting data", error: error.message })
  }
})

{
  /* Living Room Decor */
}

app.post("/livingroom", async (request, response) => {
  try {
    const data = request.body
    const livingRoomData = await livingroom.create(data)
    response.status(200).json({
      success: true,
      message: "Successfully Saved!",
      living_room_data: { livingRoomData },
    })
  } catch (error) {
    response.status(500).json({
      message: "Error in living room posting data",
      success: false,
      error: error.message,
    })
  }
})

app.get("/livingroomitems", async (request, response) => {
  try {
    const data = await livingroom.find({ category: { $eq: "Sofa" } })
    response.status(200).json({ data: data })
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error Getting data", error: error.message })
  }
})

app.get("/livingroomitems/:id", async (request, response) => {
  const { id } = request.params
  try {
    const data = await livingroom.find({ _id: id })
    response.status(200).json({ data: data })
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error Getting data", error: error.message })
  }
})

{
  /* Furniture */
}

app.post("/postfurnitureitems", async (request, response) => {
  try {
    const data = request.body
    const furnituredata = await furnitureItemsSchema.create(data)
    response.status(200).json({
      success: true,
      message: "Successfully Posted Furniture Items!",
      data: furnituredata,
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error in Furniture Posted in Backend",
      error: error.message,
    })
  }
})

app.get("/getfurnitureitems", async (request, response) => {
  try {
    const data = await furnitureItemsSchema.find({
      category: { $eq: "Furniture" },
    })
    response.status(200).json({ success: true, data: data })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error in backend Furniture Get Method",
    })
  }
})

app.get("/getfurnitureitems/:id", async (request, response) => {
  try {
    const { id } = request.params
    const data = await furnitureItemsSchema.find({ _id: id })
    response
      .status(200)
      .json({ message: "Successfully Got it", success: true, data: data })
  } catch (error) {
    response.status(500).json({
      message: "Error in Backend Furniture API",
      success: false,
      error: error.message,
    })
  }
})
{
  /* Kitchen Items */
}

app.post("/kitchen-items-post", async (request, response) => {
  try {
    const kitchendata = request.body
    const data = await kitchenData.create(kitchendata)
    response
      .status(200)
      .json({ message: "Posted Kitchen Items", success: true, data: data })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error in Backend Kitchen Items Posting",
      error: error.message,
    })
  }
})

app.get("/kitchen-items", async (request, response) => {
  try {
    const data = await kitchenData.find({ category: { $eq: "Kitchen" } })
    response.status(200).json({
      message: "Successfully Get Kitchen Items",
      success: true,
      data: data,
    })
  } catch (error) {
    response.status(500).json({
      message: "Error in Backend Kitchen Get Method",
      success: false,
      error: error.message,
    })
  }
})

app.get("/kitchen-items/:id", async (request, response) => {
  try {
    const { id } = request.params
    const data = await kitchenData.find({ _id: id })
    response.status(200).json({
      success: true,
      message: "Successfully Get Single Kitchen Item Details",
      data: data,
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error in Getting Single Kitchen Item in Backend",
      error: error.message,
    })
  }
})

app.post("/cleaning-items-post", async (request, response) => {
  try {
    const cleaningdata = request.body
    const data = await cleaningItem.create(cleaningdata)
    response.status(200).json({
      success: false,
      message: "Successfully Got Cleaning Items",
      data: data,
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error in Posting Cleaning Items in Backend",
      error: error.message,
    })
  }
})

app.get("/cleaning-items", async (request, response) => {
  try {
    const data = await cleaningItem.find({ category: { $eq: "Cleaning" } })
    response.status(200).json({
      message: "Successfully Got Cleaning Items",
      success: true,
      data: data,
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error in Getting Cleaning Supplies Backend",
      error: error.message,
    })
  }
})

app.get("/cleaning-items/:id", async (request, response) => {
  try {
    const { id } = request.params
    const data = await cleaningItem.find({ _id: id })
    response.status(200).json({
      success: true,
      message: "Successfully Got Cleaning Item in Backend",
      data: data,
    })
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Error in Cleaning Supplies API",
      error: error.message,
    })
  }
})

try {
  mongoose.connect(process.env.MONGO_URI)
  app.listen(process.env.PORT, () => {
    console.log(`Database Connected and Server Running at ${process.env.PORT}`)
  })
} catch (error) {
  console.log("Error Connection to MongoDB: ", error.message)
  process.exit(1)
}
