module.exports = function(app, data){
    var mysql = app.drivers.mysql;
    
    this.table = 'candidate';
    
    this.id = data.id || null;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    
    
    this.get = function(cb){
        var q = "SELECT * FROM " + this.table;
        
        mysql.query(q,function(rows){
            cb(rows);
            console.log(q);
        });
        
    }
    
    
    this.register = function(cb){
        var me = this;
        var q = "INSERT INTO "+this.table+" (firstname,lastname) VALUES ('"+this.firstname+"' , '"+this.lastname+"'  )";
        
        mysql.query(q,function(rows){
            me.id = rows.insertId;
            cb(me);
        });    
    }
    return this;
    
    
    this.select = function(cb){
        var candi = $('input:checked + input').val(),
            me = this,
            q = " SELECT '"+this.firstname+"','"+this.lastname+"' FROM candidate WHERE id="+ candi;
        console.log(candi);
       
         mysql.query(q,function(rows){
            cb(rows);
              console.log(candi);
             console.log(q);
        });
        
    }
    
}