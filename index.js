const express = require('express');
const scraper = require('./scraper'); 
var app = express();
const path = require('path')
var port = process.env.PORT || 3000; 

app.use(express.json());

app.use(function(req, res, next){
     res.header("Access-Control-Allow-Origin", "*")
     res.header('Access-Control-Allow-Headers', 'Content-Type'); 
     next(); 
}); 

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
//     console.log("testing")
//     res.end(); 
// }) 

app.get('/reviews', function (req, res) {
    console.log("got reviews route")
}); 

app.post('/reviews', async function (req, res) {
    await req.body
    console.log(req.body)
    
    if (req.body.key1 === null) {
        console.log("url is null")
        return
    }
    else {
        const url = await req.body.key1.toString()
        scraper.scrape(url).then(function(response){
        return res.json(response);
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
}); 
