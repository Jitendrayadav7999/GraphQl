import {gql} from "apollo-server"

//create Schema
const typeDefs = gql`
type Query{
    users:[User]
    user(_id:ID!):User
    quotes:[QuoteWithName]
    quote(by:ID!):Quote
    myProfile:User
}
type QuoteWithName{
    name:String
    by:withName
}
type withName{
    _id:ID
    name:String
}
type User{
    _id:ID
    name:String
    email:String
    quotes:[Quote]
}

type Quote{
    name:String,
    by:ID
}
type Token{
    token:String
}
type Mutation{
    signupUser(newUser:UserInput!):User
    signInUser(user:signInInput!):Token
    createQuote(name:String):String
}
input UserInput{
    name:String!
    email:String!
    password:String!
}
input signInInput{
    email:String!
    password:String!
}


`
export default typeDefs