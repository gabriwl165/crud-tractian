import commpany from './CompanyRouter'
import express from 'express'

const router = express.Router()

export default (app: express.Application): express.Router => {
    commpany(router)
    return router
}