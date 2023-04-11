import userModel from "./models/user.js"
import quoteModel from "./models/quotes.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const resolvers = {
  Query: {
    users: async () =>  await userModel.find(),
    user:async (_, { _id }) => await userModel.findById(_id),
    quotes:async () => await quoteModel.find().populate("by","_id name"),
    quote:async (_, { by }) =>await quoteModel.find({by}),
    myProfile: async (_, args, {userId})=> {
      if(!userId) throw new Error("You must be logged in ") 
     return await userModel.findById(userId)
    }
  },
  User: {
    quotes:async (user) =>await quoteModel.find({by: user._id})
  },
  Mutation: {
    signupUser: async (_, { newUser }) => {
      const user = await userModel.findOne({ email: newUser.email })
      if (user) {
        throw new Error("user is already exists with that email ")
      }
      const hashedPassword = await bcrypt.hash(newUser.password, 10)

      const userNew = {
        ...newUser,
        password: hashedPassword
      }
      return await userModel.create(userNew)
    },
    signInUser: async (_, { user }) => {
      const signInUser = await userModel.findOne({ email: user.email })
      if (!signInUser) {
        throw new Error("user dose not exists with that email")
      }
      const checkPassword = await bcrypt.compare(user.password, signInUser.password)
      if (!checkPassword) {
        throw new Error("Password is Wrong")
      }
      const token = jwt.sign({userId:signInUser._id},process.env.SECRETE_KEY)
      return {token}
    },
    createQuote: async(_,{name}, {userId})=>{
      if(!userId) throw new Error("You must be logged in ") 
        const newQuote = {
           name,
            by:userId
        }
        await quoteModel.create(newQuote)
        return "Quote create successfully"
    },
  
  }
}
export default resolvers