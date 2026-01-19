class responseHandler
{
    constructor(statusCode=200,message,data)
    {
       // this.res=res;
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
    }
}
export default responseHandler;

//being use to send response in a standard forma k-t like ek response object banake jisme statuscode,message and data hoga
//taki har jag same format me response bheja ja sake