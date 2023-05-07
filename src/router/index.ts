import commpany from './CompanyRouter'
import asset from './AssetRouter'
import unit from './UnitRouter';
import express from 'express'
import login from './LoginRouter'
import user from './UserRouter'
import aws from './AwsRouter';

const router = express.Router();

export const jsonRoutes = (): express.Router => {
    aws(router)
    login(router)
    asset(router)
    user(router)
    commpany(router)
    unit(router)
    return router
}