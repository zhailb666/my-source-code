/*
 * @Author: your name
 * @Date: 2021-11-17 22:41:05
 * @Description: file content
 */

function listen(ctx){
  let str = '';
  return new Promise((resolve,reject) => {
    ctx.req.addListener('data',(data)=>{
      str += data;
    });
    ctx.req.addListener('end',()=>{
      const res = jsonBodyparser(str);
      resolve(res);
    });
  }); 
}

function jsonBodyparser(str){
  let parseBody = {};
  let strArr = str.split('&');
  for(let [index,item] of strArr.entries()){
    const itemArr = item.split("=");
    parseBody[itemArr[0]] = itemArr[1];    
  }
  return parseBody; 
}

module.exports = () => {
  return async (ctx, next) => {
    bodyParser = await listen(ctx);
    ctx.request.body = bodyParser;
    await next();
  }
}