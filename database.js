
const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const {parse} = require("querystring");
const port = 9000;

const mysql = require("mysql");
const exp = require("constants");
const { copyFileSync } = require("fs");

//parse
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//setting ejs
app.set("view engine","ejs");


var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1234",
    database : "worldcup"
});

connection.connect(function(error){
    if (error)
    {
        console.log("error");
    }
    else{
        console.log("connected");
    }
});



app.get('/',function(req,res){

    res.sendFile(path.join(__dirname,"getData.html"));
    
});

app.post("/fetch",function(req,res){
    var team_name = req.body.runs;

    
    var sql = `select player_id,p_name,type_of_player,age from player where team_id = (select team_id from team where team_name="${team_name}";`;
   

    connection.query(sql,function(err,rows,fields){
        if (err)
        {
            console.log(err);
        }
        else{
            
            let a = [...rows];
          
            if (a.length > 0)
            {
                res.render("final",{obj : a});
            }
            else
            {
                res.render("final",{obj : a});
            }
            
        }
    });

});


app.listen(8081);