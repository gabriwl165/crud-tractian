import express from 'express'

import { saveAsset, findAssetById, getAllAssets, deleteAssetById, findAllAssetByUnit, updateAsset } from '../controller/AssetController';
import { hasPermissionToCreate, hasPermissionToDelete, hasPermissionToRead, hasPermissionToWrite, isAuthenticated } from '../security/Authentication';

export default(router: express.Router) => {
    router.post("/asset/", isAuthenticated, hasPermissionToCreate, saveAsset);
    router.get("/asset/", isAuthenticated, hasPermissionToRead, getAllAssets);
    router.get("/asset/:id", isAuthenticated, hasPermissionToRead, findAssetById);
    router.get("/asset/unit/:id", isAuthenticated, hasPermissionToRead, findAllAssetByUnit);
    router.delete("/asset/:id", isAuthenticated, hasPermissionToDelete, deleteAssetById);
    router.patch("/asset/:id", isAuthenticated, hasPermissionToWrite, updateAsset);
}