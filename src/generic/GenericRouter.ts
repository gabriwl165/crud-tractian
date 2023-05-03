import { GenericController } from "./GenericController";
import express from 'express'

export abstract class GenericRouter<CONTROLLER extends GenericController<any>> {

    protected abstract getController(): CONTROLLER;

    public getRoutes(router: express.Router){
        router.post("/", this.getController().save)
        router.patch("/:id", this.getController().update)
        router.delete("/:id", this.getController().delete)
    }
}

