import express from 'express'

import { deleteUnitById, findAllUnits, findAllUnitsByCompany, findUnitById, saveUnit } from '../controller/UnitController';
import { isAuthenticated, hasPermissionToCreate, hasPermissionToRead, hasPermissionToDelete } from '../security/Authentication';
 
export default(router: express.Router) => {
    router.post("/unit/", isAuthenticated, hasPermissionToCreate, saveUnit);    
    router.get("/unit/", isAuthenticated, hasPermissionToRead, findAllUnits);
    router.get("/unit/:id", isAuthenticated, hasPermissionToRead, findUnitById);
    router.delete("/unit/:id", isAuthenticated, hasPermissionToDelete, deleteUnitById)
    router.get("/unit/company/:id", isAuthenticated, hasPermissionToRead, findAllUnitsByCompany);
}