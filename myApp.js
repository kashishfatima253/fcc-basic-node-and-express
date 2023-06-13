let express = require('express');
let app = express();
let absolutePath = __dirname + '/views/index.html';
let cssPath = __dirname + "/public";
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(cssPath));
app.use(function middleware(req, res, next){
  let middlestring = req.method + " " + req.path + " - " + req.ip
  console.log(middlestring)
  next()
  
})

app.get("/", function(req, res) {
  res.sendFile(absolutePath);
});

app.get("/json", (req,res) => {
  if(process.env.MESSAGE_STYLE == 'uppercase'){
  res.json({
    message: "Hello json".toUpperCase()
  })
  }
  else{
    res.json({
    message: "Hello json"
  })
  }
})
app.get("/now", function(req,res,next){
  req.time = new Date().toString()
  next()
}, function(req,res){
  res.json({
    time: req.time
  })
})

app.get("/:word/echo", (req,res)=>{
  let word = req.params.word
  res.json({
    echo: word
  })
})

app.post("/name", function(req, res) {
  // Handle the data in the request
  let string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});
// app.get("/name", (req,res)=>{
//   let firstname = req.query.first
//   let lastname = req.query.last
//   let fullname = firstname + " " + lastname;

//   res.json({
//     name:fullname
//   })
// })









































 module.exports = app;
