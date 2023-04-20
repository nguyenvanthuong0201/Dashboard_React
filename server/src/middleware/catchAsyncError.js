// Ứng dụng vào required, thiếu parameter nhưng server vẫn run
export const catchAsyncErrors = theFunc =>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next)
}
