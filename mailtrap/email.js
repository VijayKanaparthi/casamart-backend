import {
  PASSWORD_RESET_SUCCESS_MAIL,
  sendResetPasswordLink,
  sendVerificationToEmail,
} from "./emailTemplate.js"
import { client, sender } from "./mailtrap.js"

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }]

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify Your Email",
      html: sendVerificationToEmail.replace(
        "verificationToken",
        verificationToken
      ),
      category: "Email Verification",
    })
    console.log("Email Sent Successfully", response)
  } catch (error) {
    console.log("Error, Sending on Email Verification", error.message)
  }
}

export const sendingWelcomeEmail = async (name, email) => {
  const recipients = [{ email }]

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      template_uuid: "b736d45f-200c-4306-8a03-a96747a4d26a",
      template_variables: {
        company_info_name: "VJ_COMPANY",
        name: name,
      },
    })
    console.log("Welcome Email Sent Successfully", response)
  } catch (error) {
    console.error("Error Sending Welcome email", error)
  }
}

export const sendResetPasswordEmail = async (email, resetUrl) => {
  const recipients = [{ email }]

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Passowrd",
      html: sendResetPasswordLink.replace("resetUrl", resetUrl),
      category: "Reset Passowrd",
    })
  } catch (error) {
    console.log("Error while sending Email to  Reset passsword")
  }
}

export const sendResetSuccessfullMail = async (email) => {
  const recipients = [{ email }]

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Successfuly",
      html: PASSWORD_RESET_SUCCESS_MAIL,
      category: "Password reset",
    })
  } catch (error) {
    console.log("Error Success Mail Sending", error.message)
  }
}
