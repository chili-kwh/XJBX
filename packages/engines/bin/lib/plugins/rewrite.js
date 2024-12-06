module.exports = function ({app}){
    console.log(111)
    app.use(async (ctx, next)=>{
        console.log('ctx')
        // console.log(ctx)
        await next()
        console.log('next')
        // console.log('ctx')
        // console.log(ctx)

    })
}