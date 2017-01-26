module.exports = function(app, data){
    var mysql = app.drivers.mysql;
    
    this.table = 'votes';
    this.voter = data.voter || null;
    this.candidate = data.candidate;
    this.count = data.count;
    this.get = function(cb){
//        var q = "SELECT * FROM " + this.table ;
//          var q = "SELECT * FROM candidate LEFT JOIN users ON users.id = candidate.id";
        var q ="select candidate.firstname,candidate.lastname,count(*) from candidate left join votes on candidate.id = votes.candidate group by votes.candidate";
                                                
//        var q = "SELECT candidate.firstname,candidate.lastname,count(*) From candidate left join '"+this.table+"' on candidate.id="+this.candidate+" group by "+this.candidate;
//        console.log(q);
        
        mysql.query(q,function(rows){
            cb(rows);
            console.log(q);
        });
        
    }
    
    this.register = function(cb){
        var me = this;
        var q = "INSERT INTO "+ this.table +" (voter,candidate) VALUES ('"+this.voter+"','"+ this.candidate+"' )";
        console.log(q);
        mysql.query(q,function(rows){
            me.id = rows.insertId;
            cb(me);
        });    
    }
    return this;
    
   
    
}