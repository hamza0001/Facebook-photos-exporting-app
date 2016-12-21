var request=require('request')
var express = require('express')
var bodyParser = require('body-parser');
var fs=require('fs');
var app = express();



app.use(bodyParser.json());
app.use('/static',express.static('assets'));
app.use('/static',express.static('node_modules'));
app.use(express.static('views'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/login.html');
})

app.post('/photos',(req,res)=>{
    var rstreams={};
    var i=0;
    var j=0;
    for(var key in req.body){
         rstreams[i]= request(req.body[key]);
         rstreams[i].pipe(fs.createWriteStream(__dirname+'/photos/'+key+'.jpg'));     
         rstreams[i].on('end',function(){
                j++;
                if(j>=i)
                   res.send('done!');
             })
         i++;
        }
    } 
)

app.listen(8000);