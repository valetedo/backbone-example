var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
var XtensGroup = require('./XtensGroup.js');
var XtensGroupDao = require('./XtensGroupDao.js');
var XtensUser = require('./XtensUser.js');
var XtensUserDao = require('./XtensUserDao.js');
var userDao = new XtensUserDao();
var groupDao = new XtensGroupDao();
 
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
             console.log(POST);        
        	var user = new XtensUser('',POST['user_name'],POST['user_surname'],'1111-11-11','','','');
        	userDao.create(user);
     
          
          
 
        });
       
      
    } else {    
    req.on('data',function(data){ res.end(' data event: '+data);});
    if(url_parts.pathname == '/')
        
    fs.readFile('./provaBack.html',function(error,data){ 
    res.end(data);    
    });
 
    
        }
});
server.listen(8080);
console.log('Server listenning at localhost:8080');
/**
 * 
 */