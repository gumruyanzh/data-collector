const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'eddata'
	})
const app = express()

connection.connect((err)=>{
	if(!err)
		console.log('Database is connected')
	else
		console.log('Error connecting DB...')
})

app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000,()=> console.log('listening on 3000') )

app.get("/user", (req,res) =>{

	connection.query('SELECT * from user LIMIT 2', (err, rows, fields) => {
	connection.end();
	console.log(fields);

  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });
});

app.get('/', (req, res)=> res.sendFile(__dirname + '/index.html'))

// var post = {
//   id: 123,
//   fbid: 123123123,
// 	edid: "aksjdhkashd1243",
//   article_title: "Some title",
//   articlecategory: "some category",
// }

app.post('/data', (req, res)=> {
	var post = req.body;
	console.log(post);
	connection.query('INSERT INTO thedata SET ?', post, (err, result) => {
	connection.end();
	if (!err)
    console.log('The solution is: ', result);
  else
		console.log(err);
    console.log('Error while performing Query.');
  });
})
