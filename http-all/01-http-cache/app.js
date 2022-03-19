/*
 * @Author: your name
 * @Date: 2022-03-19 17:35:59
 * @Description: file content
 */
const http = require("http");
const fs = require('fs')
const url = require('url')
const etag = require('etag')

http.createServer((req,res) => {
    console.log(req.method, req.url)
    const { pathname } = url.parse(req.url)
    if(pathname.includes('index.html')) {
        const data = fs.readFileSync(`.${pathname}`)
        res.end(data)
    } else if(pathname === '/img/01.jpeg') {
        const data = fs.readFileSync('./img/01.jpeg')
        res.writeHead(200, {
            Expires: new Date(new Date().getTime() + 6000).toUTCString()
        })
        res.end(data)
    } else if(pathname === '/img/02.jpeg') {
        const data = fs.readFileSync('./img/02.jpeg')
        res.writeHead(200, {
            'Cache-control': 'max-age=6'
        })
        res.end(data)
    } else if(pathname === '/img/03.jpg') {
       
        const { mtime } = fs.statSync('./img/03.jpg')

        const ifModifiedSince = req.headers['if-modified-since']
        if(ifModifiedSince === mtime.toUTCString()) {
            res.statusCode = 304
            res.end()
            return
        }

        const data = fs.readFileSync('./img/03.jpg')
        res.writeHead(200, {
            'last-modified': mtime.toUTCString(),
            'Cache-control': 'no-cache'
        })
        res.end(data)
    }else if(pathname === '/img/04.jpg') {
       
        const data = fs.readFileSync('./img/04.jpg')
        const eTagFlag = etag(data)
        const ifNoneMatch = req.headers['if-none-match']
        if(ifNoneMatch === eTagFlag) {
            res.statusCode = 304
            res.end()
            return
        }

        res.setHeader('etag', eTagFlag)
        res.setHeader('Cache-control', 'no-cache')
        res.end(data)
    } else {
        res.statusCode = 404
        res.end()
    }
}).listen(3000, () => {
    console.log('http://localhost:3000')
})
