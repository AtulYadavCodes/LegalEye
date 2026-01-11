export const asyncHandler=(fn)=> async(req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        next(error)
    }
}

//being use to wrap async functions and handle errors in a standard way using express middleware
//taki har jag try catch na lagana pade and error ko next middleware me bheja ja sake
// eg - router.get('/route',responseHandler(async(req,res,next)=>{
//          //async code
// })) ye controller me use hoga