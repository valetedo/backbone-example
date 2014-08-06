var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
var XtensGroup = require('./XtensGroup.js');
var XtensGroupDao = require('./XtensGroupDao.js');
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
           var group = new XtensGroup(POST.id,POST.name);
           groupDao.create(group);
            res.end("You created a new Group!");
 
        });
        
    } else {    
    req.on('data',function(data){ res.end(' data event: '+data);});
    if(url_parts.pathname == '/')
        
    fs.readFile('./Group.html',function(error,data){ 
    res.end(data);    
    });
 
    else if(url_parts.pathname == '/getGroup'){
         console.log('Serving the Got Data.');
    
    }
        }
 
});
server.listen(8080);
console.log('Server listenning at localhost:8080');
 