import { Model } from "mongoose";

export abstract class GenericService{

    protected abstract getSchema<T extends Model<any>>(): T;

    public save(obj: Record<string, any>): void {
        this.getSchema().create(obj)
    }

    public delete(id: string): void {

    }

    public update(id: string, obj: any): void {
        
    }

}