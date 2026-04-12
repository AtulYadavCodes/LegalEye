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