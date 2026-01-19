class error_structurer extends Error{
    constructor(statusCode,message,errors=[]){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
        this.errors=errors;
    }
}

export default error_structurer;

//being use to throw error in a standard format like ek error object banake jisme message,statuscode and errors array hoga
//taki har jag same format me error bheja ja sake