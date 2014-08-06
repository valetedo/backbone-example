var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
var XtensUser = require('./XtensUser.js');
var XtensUserDao = require('./XtensUserDao.js');
 var userDao = new XtensUserDao();
 
var server = http.createServer(function (req,res){
                            
    var url_parts = url.parse(req.url,true);
    
    
    var body = '';
    if(req.method === 'POST'){
     
       console.log('Request found with POST method');     
        req.on('data', function (data) {
            body += data;
            console.log('got data:'+data);
        });
        req.on('end', function () {
 
           var POST = qs.parse(body);
           var user = new XtensUser(POST.id,POST.name,POST.surname,POST.date,POST.sex,POST.login,POST.password);
           userDao.create(user);
            res.end("You created a new User!");
 
        });
        
    } else {    
    req.on('data',function(data){ res.end(' data event: '+data);});
    if(url_parts.pathname == '/')
        
    fs.readFile('./index.html',function(error,data){ 
    res.end(data);    
    });
 
    else if(url_parts.pathname == '/getData'){
         console.log('Serving the Got Data.');
    
    }
        }
 
});
server.listen(8080);
console.log('Server listenning at localhost:8080');
 
 
 

