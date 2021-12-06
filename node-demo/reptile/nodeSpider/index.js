/*
 * @Author: your name
 * @Date: 2021-11-28 17:53:50
 * @Description: file content
 */
var request = require("request");
var cheerio = require("cheerio");
var schedule = require("node-schedule")
// var async = require('async');
// var moment = require("moment");
// var fs = require('fs');

var startUrl = 'https://www.zhangxinxu.com/wordpress/category/js/';

var options = {
    url: startUrl,
    method: 'GET',
    charset: "utf-8",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36",
        // "cookie": cookies
    }
};

/*并发访问所有url并限制并发数，返回body*/
function fetchHtml(body,callback){
    var $ = cheerio.load(body);
    var lists = $("div[class^=post]");
    lists.map((ele,item) => {
        var text = $(item).find("h3 a").text().replace(/,/g,"，")
        var href = $(item).find("h3 a").attr('href')
        var desc = $(item).find(".entry p").eq(1).text().replace(/,/g,"，")
        console.log(`${ele + 1}.`)
        console.log(`标题:`, text)
        console.log('描述:', desc,)
        console.log('链接:', href, '\n')
    })
    console.log(`\n数据爬取成功，数据爬取条数为--${lists.length}`)
}

function fetchServerData() {
    request(options,function(err, response, body){
        if(err){
            console.log(err)
            return;
        }
        fetchHtml(body)
    })
}

 
// var job = schedule.scheduleJob('30 * * * * *', () => {
//     fetchServerData()
// })

var count = 0 

// 每 10秒执行一次 https://www.jianshu.com/p/8d303ff8fdeb
// var job = schedule.scheduleJob('*/10 * * * * *', () => {
//     count++
//     console.log('\n', `执行次数：${count}`)
//     fetchServerData()
// })


// 定义一个未来的时间 2021年 11月 30号 22点 6分 30 秒
let date = new Date(2021, 10, 30, 22, 06, 30);

// 定义一个任务
let job = schedule.scheduleJob(date, () => {
    count++
    console.log('\n', `执行次数：${count}`)
    fetchServerData()
});




