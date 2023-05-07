export default class RetornoHTTP {
    
    private readonly message: string;
    private readonly success: boolean;
    private readonly object: any;

    constructor(message: string, success: boolean, object: any = {}){
        this.message = message;
        this.success = success;
        this.object = object;
    }

}