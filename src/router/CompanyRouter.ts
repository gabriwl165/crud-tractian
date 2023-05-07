import express from 'express'

import { saveCompany, findCompanyById, findAllCompanys, deleteCompanyById, updateCompany } from '../controller/CompanyController'
import { hasPermissionToCreate, hasPermissionToDelete, hasPermissionToRead, hasPermissionToWrite, isAuthenticated } from '../security/Authentication';

export default(router: express.Router) => {
    router.post("/company/", isAuthenticated, hasPermissionToCreate, saveCompany);
    router.get("/company/", isAuthenticated, hasPermissionToRead, findAllCompanys);
    router.get("/company/:id", isAuthenticated, hasPermissionToRead, findCompanyById);
    router.delete("/company/:id", isAuthenticated, hasPermissionToDelete, deleteCompanyById);
    router.patch("/company/:id", isAuthenticated, hasPermissionToWrite, updateCompany);
}