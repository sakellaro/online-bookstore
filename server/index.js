import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bookRoute from './routes/bookRoute.js'

const app = express()

app.use(bodyParser.json({limit: "30mb", extended:true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}))
app.use(cors())

app.use('/books', bookRoute)

const CONNECTION_URL = 'mongodb+srv://sakellaro:XOq1MsA0HszKOIav@cluster0.kqc0ag2.mongodb.net/booksDB'

const PORT = process.env.PORT || 3001

mongoose.set('strictQuery', true)
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
        .catch((err)=>console.log(err))