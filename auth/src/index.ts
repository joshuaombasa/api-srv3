import express from 'express'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'


import { signupRouter } from './routes/signup'

import { errorHandler } from './middleware/error-handler'

const PORT =3000
const app = express()

app.set('trust proxy', true)

app.use(express.json())

app.use(cookieSession({
  signed: false,
  secure: false
}))

app.use(signupRouter)
app.use(errorHandler)



const start = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/tiketi3-auth?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1')
  .then(() => console.log('connected to mongodb'))
  .catch(error => console.log(error))

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  })
}

start()