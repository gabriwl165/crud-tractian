import { Request, Response } from "express";
import { GenericService } from "./GenericService.js";
import RetornoHTTP from "./RetornoHTTP.js";

export abstract class GenericController<SERVICE extends GenericService>{

    protected abstract getService(): SERVICE;

    save = (req: Request, res: Response): void => {
        try {
            this.getService().save(req.body)
            res.status(200).send(new RetornoHTTP("Company created", true))
        } catch (err){
            res.status(500).send(new RetornoHTTP("Internal server error", false))
        }
    }

    delete = (req: Request, res: Response): void => {
        try {
            this.getService().delete(req.params.id)
            res.status(200).send(new RetornoHTTP("Company deleted", true))
        } catch (err){
            res.status(500).send(new RetornoHTTP("Internal server error", false))
        }
    }

    update = (req: Request, res: Response): void => {
        try {
            this.getService().update(req.params.id, req.body)
            res.status(200).send(new RetornoHTTP("Company updated", true))
        } catch (err){
            res.status(500).send(new RetornoHTTP("Internal server error", false))
        }
    }

}