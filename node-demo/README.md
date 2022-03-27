<!--
 * @Author: your name
 * @Date: 2022-02-13 17:11:39
 * @Description: file content
-->
<!-- https://juejin.cn/post/6844903764202094606 -->
<!-- https://www.bilibili.com/video/BV11q4y1f7jv?p=7 -->
***<h2>nodejs 研究</h2>***
***<h3><B> 事件循环 目录 01-event-loop</B></h3>***
<h4><B>一、强制缓存</B></h4>


```
expires (设置资源过期时间，bug点：当客户端和服务器端时间不一致时候会有问题)
```
![expires](./imgs/expires.png)
```
catch-control (expires 的完全替代方案)
```
![cache](./imgs/cache-control.png)
🌰 &nbsp; 01-http-cache/01-index.html

<br/>
<h4><B>二、协商缓存</B></h4>
<B>1、last-modified</B>

```
{
    'last-modified': mtime.toUTCString()
    'Cache-control': 'no-cache'
}
```
![cache](./imgs/last-modified.png)
***last-modified 不足点***
```
last-modified 所实现的协商缓存能满足大部分的使用场景，但也存在两个比较明显的缺陷
1、首先它是根据文件最后修改的时间戳进行判断的，如果文件修改了文件名，没有改动文件内容，缓存无效，也会重新读取文件；
2、修改文件时间戳单位是s，如果文件修改的频率较快则会造成故障；
```
🌰 &nbsp; 01-http-cache/02-index.html
<B>2、ETag</B>
```
为了弥补时间戳不足，从http1.1开始新增一个ETag的头信息，及实体标签；
原理就是：服务器端为不同的资源进行哈希运算所生成的一个字符串，类似于文件指纹；
```
![cache](./imgs/etag.png)

***ETag 不足点***

```
服务器对文件生成文件指纹需要一定的开销，文件越大开销越大，会有一点影响服务器性能；
```
🌰 &nbsp; 01-http-cache/03-index.html

<h4><B>三、http缓存策略图</B></h4>

![cache](./imgs/all.png)