class error extends Error{
    constructor(message,statusCode,errors=[]){
        super(message);
        this.statusCode=statusCode;
        this.errors=errors;
    }
}

export default error;

//being use to throw error in a standard format like ek error object banake jisme message,statuscode and errors array hoga
//taki har jag same format me error bheja ja sake