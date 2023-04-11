import {ApolloServer} from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import connectDb  from "./db/db.js"
import typeDefs from "./schemaQql.js"
import resolvers from "./resolvers.js"

dotenv.config()

connectDb()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const {authorization}  = req.headers
        if(authorization){   // avoid logic gives a error becouse we are handle error in resolver 
             const {userId} = jwt.verify(authorization,process.env.SECRETE_KEY)
             return {userId}
        }
    },
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]

})

server.listen().then(({url})=>{
    console.log(`🚀  Server ready at ${url}`)
})






