import express from 'express'
import {jsonRoutes} from './router';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express()
const port = 8080;
const MONGO_URL = process.env.MONGO_URL

app.use(bodyParser.json())

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
    .then(() => {
        app.use('/', jsonRoutes())
        app.listen(port, () => {
            console.log(`Listening on: localhost:${port}`)
        })
    })
    .catch(erro => {
        console.log(erro)
    })
