module.exports = function(app, data){
    var mysql = app.drivers.mysql;
    
    this.table = 'users';
    
    this.id = data.id || null;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.age = data.age;
    this.mail = data.mail;
    
    this.get = function(cb){
        var q = "SELECT * FROM " + this.table +" WHERE id ="+ this.id ;
        
        mysql.query(q,function(rows){
            cb(rows);
        });
        
    }
    
    
    this.register = function(cb){
        var me = this;
        var q = "INSERT INTO "+ this.table +" (firstname,lastname,age,mail) VALUES ('"+this.firstname+"' , '"+this.lastname+"' , "+this.age+",'" + this.mail + "' )";
        console.log(q);
        mysql.query(q,function(rows){
            me.id = rows.insertId;
            cb(me);
        });    
    }
    

    
    return this;
}