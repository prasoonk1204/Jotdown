import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import validator from "validator"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 40,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid : " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.isNew ? validator.isStrongPassword(value) : true;
      },
      message: (props) => `Password is not strong: ${props.value}`,
    },
  },
});

userSchema.methods.getJWT = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

userSchema.methods.verifyPassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
