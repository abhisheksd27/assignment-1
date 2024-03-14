export const errorhandler = (statusCode,Message)=>{
    const error = new Error();
    error.statusCode=statusCode;
    error.Message=Message;
    return error;
}