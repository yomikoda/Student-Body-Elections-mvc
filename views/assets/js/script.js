$(function(){ 
        // CREATE A VOTER
        $('#voterregister').submit(function(e) {
            e.preventDefault();
            
            var _firstname = $('#firstname').val(),
                _lastname = $('#lastname').val(),
                _age = $('#age').val(),
                _mail = $("#mail").val();
            
            $.post('/api/user', {
                firstname: _firstname,
                lastname: _lastname,
                age: _age,
                mail: _mail
            }).done(function(data){
                alert("data loaded: " + data );
                $("body").append('<input type="hidden" id="userId" value="'+data.id+'">');
                var votername = data.firstname+' ' + data.lastname;
                $("#yourname").append(votername);
            });
            
             $('#vote').toggleClass('hidden');
        });
        
       
        
        // CREATE A CANDIDATE
        $('#candidatecreate').submit(function(e) {
            e.preventDefault(); 
            
            var _firstname = $('#firstname').val(),
                _lastname = $('#lastname').val();
            
            $.post('/api/candidates', {
                firstname: _firstname,
                lastname: _lastname,
            }).done(function(data){
                alert("data loaded: " + data );
                
            });   
            
        });
        
    
        // LOAD CANDIDATE LIST
        $.get('/api/candidates', function(data){
                 $('#candidatelist').empty();
                
                for(var i=0; i<data.length; i++){
                    var _candidate= "<div class='candidate'><div id='candidatedata'><img src='../img/"+ data[i].firstname +".JPG' id='candidateimg'></img><h3 id='candidatename'>"+ data[i].firstname +" "+ data[i].lastname +"</h3></div> <label for='"+ data[i].firstname +"'></label><input type='radio' name='candidate' id='"+ data[i].firstname +"' value='"+ data[i].firstname +"'><input type='hidden' id='candidateid' value='"+data[i].id +"'> </div>";
                    $("#candidatelist").append(_candidate);
                    console.log(_candidate);
                }  
        });
    
    
       
    
    // VOTING
        $('#votecasting').submit(function(e) {
            e.preventDefault(); 
            
               // REGISTER THE VOTE
            var voterid = $('#userId').val(),
                candidateid = $('input:checked + input').val(); 
            var selected = $('input:checked,#candidatename').val();
            console.log(candidateid);
            $.post('/api/vote', {
                voter: voterid,
                candidate: candidateid,
            }).done(function(data){
                alert("data loaded: " + data );
                       
            });
            
//            $.get('/api/candidates', function(data){
//                
//                var candidatename = data.firstname+' ' + data.lastname;
//                $("#thepersonyouvotedfor").append(candidatename);
//                console.log(candidatename);
//            });
            
//            $.get('/api/candidates', function(data){
//                var selected = $('input:checked,#candidatename').val();;
//                console.log(selected);            
//            });

            $.get('/api/vote',function(data){
                var a = data.q;
                console.log(a);
                console.log(q);
                
            });
            
            console.log('hi');
            $('#voted').toggleClass('hidden');
//            $('#yourvotehere').empty();
            
        });
    
    
    // DISPLAY THE VOTE
            
           $.get('/api/vote', function(data){
                 $('#results').empty();
                
                for(var i=0; i<data.length; i++){
                    var results= "<div class='candidate'><div id='candidatedata'><img src='../img/"+ data[i].firstname +".JPG' id='candidateimg'></img><h3 id='candidatename'>"+ data[i].firstname +" "+ data[i].lastname +"</h3></div> <label for='"+ data[i].firstname +"'></label><input type='radio' name='candidate' id='"+ data[i].firstname +"' value='"+ data[i].firstname +"'><input type='hidden' id='candidateid' value='"+data[i].id +"'> </div>";
                    $("#candidatelist").append(_candidate);
                    console.log(_candidate);
                }  
        }); 
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })