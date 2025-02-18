import jwt from "jsonwebtoken"

export const generatingJwtToken = async (response, userID) => {
  const jwtToken = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  })

  response.cookie("jwt_token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  return jwtToken
}
