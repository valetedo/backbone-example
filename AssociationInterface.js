var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
var XtensGroup = require('./XtensGroup.js');
var XtensGroupDao = require('./XtensGroupDao.js');
var UserGroup = require('./UserGroup.js');
var UserGroupDao = require('./UserGroupDao.js');
var groupDao = new XtensGroupDao();
var userGroupDao = new UserGroupDao();
 
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
           var association = new UserGroup(POST.user,POST.group);
           userGroupDao.create(association);
            res.end("You created a new Association!");
        });
        
    } else {   
    req.on('data',function(data){ res.end(' data event: '+data);});
    if(url_parts.pathname == '/')
        
    fs.readFile('./Association.html',function(error,data){ 
    res.end(data);    
   });
 
    
    
        }
 
});
server.listen(8080);
console.log('Server listenning at localhost:8080');