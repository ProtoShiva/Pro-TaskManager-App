import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js"
const bcryptSalt = bcrypt.genSaltSync(10)
export const test = (req, res) => {
  res.json({ message: "Hello World" })
}

export const updateUser = async (req, res, next) => {
  const { firstName, password } = req.body
  const { id } = req.params
  const users = await User.findById(id)
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"))
  try {
    if (firstName) {
      users.firstName = firstName
    }
    if (password) {
      users.password = bcrypt.hashSync(password, bcryptSalt)
    }
    await users.save()
    res.json({ msg: "User updated successfully" })
  } catch (error) {
    next(error)
  }
}
