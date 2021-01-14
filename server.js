const express= require("express");
const bodyParser=require("body-parser");
const request = require("request");
const https = require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT ||3000, function(){
  console.log("Server listening on Port 3000. Let's roll dude");
})

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){

const first_name= req.body.firstName;
const last_name=req.body.lastName;
const email=req.body.emailId;



var data={
members:[
  {
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME:first_name,
      LNAME:last_name
    }
  }
]


};
var jsondata= JSON.stringify(data);
console.log(jsondata);

const options = {
method:"post",
auth:"jeremiah:28b25bb6bea5c242be4adc9793f2a1e9-us7"

};
const url="https://us7.api.mailchimp.com/3.0/lists/472fced778";

app.post("/failure",function(req,res){
  res.redirect("/");
})

const request=https.request(url, options, function(response){

  if(response.statusCode===200)
  {
    res.sendFile(__dirname +"/success.html");
  }
  else{

    res.sendFile(__dirname +"/failure.html");
  }



response.on("data", function(data){
  console.log(data);
});



})
request.write(jsondata);
request.end();


})
