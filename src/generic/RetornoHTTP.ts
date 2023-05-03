export default class RetornoHTTP {
    
    private readonly message: string;
    private readonly success: boolean;

    constructor(message: string, success: boolean){
        this.message = message;
        this.success = success;
    }

}