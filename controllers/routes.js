
var path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express');


module.exports = function(app){ 
    var server = app.drivers.express.server;
        server.use( bodyParser.json() );       
        server.use(bodyParser.urlencoded({    
            extended: true
        }));
       
    
        server.get('/' , function(req,res){           
            res.sendFile(path.resolve('views/index.html'));
        });
            
        server.get('/admin', function(req, res){
            res.sendFile(path.resolve('views/admin.html')); 
        });


        server.use('/js', express.static('views/assets/js'));
        server.use('/css', express.static('views/assets/css'));
        server.use('/img', express.static('views/assets/img'));
    
    
    server.post('/api/user' , function(req, res){
        var user = new app.models.user(app,{
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                age : req.body.age,
                mail : req.body.mail
        });
                
        user.register(function(rows){
            res.send(rows);
        });
    });
    
    server.get('/api/user', function(req,res){
        var id = req.query.id;
        
        var user = new app.models.user(app,{ id : id});
        user.get(function(rows){
            res.send(rows);
        });
    });
    
    
    
    
    server.post('/api/candidates' , function(req, res){
        var wanna = new app.models.candidates(app,{
                firstname : req.body.firstname,
                lastname : req.body.lastname
        });
        
        wanna.register(function(rows){
            res.send(rows);
        });
    });
    
    server.get('/api/candidates', function(req,res){
        var id = req.query.id;
        
        var wanna = new app.models.candidates(app,{ id : id});
        wanna.get(function(rows){
            res.send(rows);
        });
        
    });
    
    
    
    // REGISTER THE VOTE
  
    server.post('/api/vote', function(req,res){  
        var vote = new app.models.vote(app,{
            voter : req.body.voter,
            candidate : req.body.candidate
        });  
  
        vote.register(function(vote){
            res.send(vote);
        });
    });

    
    server.get('/api/vote', function(req,res){ 
//   
        var id = req.query.id;
        
        var wanna = new app.models.vote(app,{ id : id});
        wanna.get(function(rows){
            res.send(rows);
        });
        
    });
    
    
}