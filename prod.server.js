/**
 * Created by heshan on 2017/7/14.
 */
/*利用express启动一个服务器生产上线后的服务器*/

var express = require('express')
var app = express()

var axios=require('axios')


var apiRoutes=express.Router()
apiRoutes.get('/getDiscList',function(req,res){
    var  url="https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
    axios.get(url,{
        headers:{
            referer:'https://c.y.qq.com/',
            host:'c.y.qq.com'
        },
        params:req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

apiRoutes.get('/lyric',function(req,res){
    var  url="https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
    axios.get(url,{
        headers:{
            referer:'https://c.y.qq.com/',
            host:'c.y.qq.com'
        },
        params:req.query
    }).then((response) => {
        /*由于获取的数据是JSONP的形式，需要转换为JSON*/
        var ret = response.data;
        if(typeof ret === 'string')
        {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if(matches)
            {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })
})

app.use('/api',apiRoutes)
/*静态资源目录*/
app.use( express.static('./dist'))

var port = 9001

module.exports = app.listen(port,function(err){
    if(err)
    {
        console.log(err)
        return
    }
    console.log("listening at http://localhost:" + port + "\n")
})
