const express = require('express');
const {scrap} = require('./scrap')

const app = express();


app.set('view engine','ejs');

app.get('/', (req,res)=>{
  res.render('index')
})

app.get('/form', (req,res)=>{
  res.send(req.query)
 let job = req.query.job_name;
 let loc = req.query.location;
  scrap(job, loc)
})

app.listen(5555)