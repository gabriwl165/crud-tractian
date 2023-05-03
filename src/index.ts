import express from 'express'
import router from './router';

const app = express()
const port = 8080;

app.listen(port, () => {
    console.log(`Listening on: localhost:${port}`)
})

app.use('/', router(app))
