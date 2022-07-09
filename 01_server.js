// - 服务器 : 处理浏览器请求的工具
// - 浏览器给我们发了请求 我们根据请求内容返回响应的数据; 
//   - 1. 请求 内容是在 request 对象之中的 , 主要的判断依据是 request.url 里面的字符串; 
//   - 2. 我们现在需要处理的情况有三种 : 
//      - html结构 : 我们要处理html结构的乱码问题 : 所以我们要设置特殊的响应头;  
//          - response.setHeader("content-type" , "text/html;charset=utf8")
//      - css结构  : 要设置特殊的响应头; 
//          - response.setHeader("content-type" , "text/css")
//      - 图片结构 : 要设置特殊的响应头; 
//          - response.setHeader("content-type" , "text/image")


// - 1. 创建服务器 : 
let http = require("http");
let fs = require("fs");
// request  : 浏览器给服务器的请求信息; 
// response : 服务器给浏览器的信息; 
let server = http.createServer( ( request , response )=>{

    console.log("接收到来自浏览器的请求");

    // 删除掉一个无效请求 ; 
    let url = request.url;
    // - 处理中文路径
    url = decodeURIComponent(url);
    if( url === "/favicon.ico"){
        // 直接给一个空的响应即可; 
        return response.end();
    }
    // - 根据不同的url后缀设置不同的响应头; 
    // 默认路径展示欢迎页面; 
    if( url === "/"){
        response.write("hello node server");
        response.end();

        return false;
    // 判断当前路径的后缀; 
    // - url 是 字符串 ; 
    // - 谁能判定字符串的规则 ？ 正则 ; 
    // - 正则表达式用什么工具判定字符串规则 ? test 
    // - test 语法是什么 ? 正则.test( 字符串 )
    //   - 如果判断的字符串结果为符合规则，那么test返回值为true，反之为false;
    }else if (/\.(html)$/.test( url )){
        response.setHeader("content-type" , "text/html;charset=utf8")
    }else if(/\.(css)$/.test( url )){
        response.setHeader("content-type" , "text/css")
    }else if(/\.(jpg|jpeg|png|gif)$/.test( url )){
        response.setHeader("content-type" , "image/jpeg")
    }

    // 使用fs模块加载服务器上的代码数据,然后进行返回; 
    fs.readFile("." + url , ( err , data )=>{
        if( err ){ 
            response.setHeader("content-type" , "text/html;charset=utf8");
            return  response.end("请求路径错误，请添加正确路径");
        }   
        response.write( data );
        response.end();
    })
});


server.listen(80 , ()=> console.log("成功监听80端口") );