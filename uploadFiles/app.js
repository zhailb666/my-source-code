/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-router使用
 */

const Koa = require('koa');
var fs = require('fs');
var path = require('path');

var koaStatic = require('koa-static');
var koaBody = require('koa-body');
const router = require('koa-router')();  //注意：引入的方式
const app = new Koa();

app.use(koaBody({
    formidable: {
        //设置文件的默认保存目录，不设置则保存在系统临时目录下  
        uploadDir: path.resolve(__dirname, './static/uploads')
    },
    multipart: true // 支持文件上传
}));

app.use(koaStatic(
    path.resolve(__dirname, './static')
));


// app.use(koaBody({
//     formidable: {
//         //设置文件的默认保存目录，不设置则保存在系统临时目录下  
//         uploadDir: path.resolve(__dirname, '../static/uploads')
//     },
//     multipart: true // 支持文件上传
// }));

//允许跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
  ctx.set("Access-Control-Max-Age", 864000);
  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  await next();
})

router.get('/',  (ctx, next) => {
  ctx.body="Hello koa file-upload";
})

var uploadHost= `http://localhost:3030/uploads/`;

router.post('/abortUpload',(ctx) => {
    console.log(ctx.request.files);
    
    var files = ctx.request.files ? ctx.request.files.f1:[];//得到上传文件的数组
    var result=[];
    console.log(files);

    if(!Array.isArray(files)){//单文件上传容错
        files=[files];
    }

    files && files.forEach(item=>{
        var path = item.path.replace(/\\/g, '/');
        var fname = item.name;//原文件名称
        var nextPath = path + fname;
        if (item.size > 0 && path) {
            //得到扩展名
            var extArr = fname.split('.');
            var ext = extArr[extArr.length - 1];
            var nextPath = path + '.' + ext;
            //重命名文件
            fs.renameSync(path, nextPath);

            result.push(uploadHost+ nextPath.slice(nextPath.lastIndexOf('/') + 1));
        }
    });

  
    ctx.body = `{
        "fileUrl":${JSON.stringify(result)}
    }`;
})

router.post('/bigFileUpload', (ctx) => {
 
    var body = ctx.request.body;
    var files = ctx.request.files ? ctx.request.files.f1:[];//得到上传文件的数组
       console.log(body,'body');
    var result=[];
    var fileToken = ctx.request.header.token;// 文件标识
    var fileIndex=ctx.request.body.index;//文件顺序

    console.log('files');
    console.log(files);

    if(files &&  !Array.isArray(files)){//单文件上传容错
        files=[files];
    }

    files && files.forEach(item=>{
        var path = item.path.replace(/\\/g, '/');
        console.log(path, 'path')
        var fname = item.name;//原文件名称
        var nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken;
        if (item.size > 0 && path) {
            //得到扩展名
            var extArr = fname.split('.');
            var ext = extArr[extArr.length - 1];
            //var   = path + '.' + ext;
            //重命名文件
            fs.renameSync(path, nextPath);

            result.push(uploadHost+ nextPath.slice(nextPath.lastIndexOf('/') + 1));
        }
    });

    ctx.body = `{
        "fileUrl":${JSON.stringify(result)}
    }`;

    if(body.type==='merge'){
        //合并文件
        var filename = body.filename,
        chunkCount = body.chunkCount,
            folder = path.resolve(__dirname, './static/uploads')+'/';
        
        var writeStream = fs.createWriteStream(`${folder}${filename}`);

        var cindex=0;
        //合并文件
        function fnMergeFile(){
            var fname = `${folder}${cindex}-${fileToken}`;
            var readStream = fs.createReadStream(fname);

            readStream.pipe(writeStream, { end: false });
            readStream.on("end", function () {
                fs.unlink(fname, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                if (cindex+1 < chunkCount){
                    cindex += 1;
                    fnMergeFile();
                }
            });
        }

        try {
            fnMergeFile();
        } catch (error) {
            
        }
        ctx.body='merge ok 200';
  }
  
});

router.get('/news/:aid',async (ctx)=>{
   console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
   ctx.body='这是商品页面_' + ctx.params.aid;
})

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000,()=>{
  console.log('starting at port 3000');
});