const express = require('express');
const fetch = require('node-fetch');
const app = express();

const port = 3000;
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));



app.post('/api', (req,res) => {
	switch (req.body.value) {
		case 1:
			fetch("https://api.sampleapis.com/futurama/questions")
				.then(response => response.json())
				.then(data => res.json(data))
			break;
		case 2:
		fetch('https://api.sampleapis.com/avatar/questions')
			.then(response => response.json())
			.then(data => res.json(data))
			break;
		case 3:
		default:
			break;
		}
});



app.get('/api', (req,res) => {
	fetch("https://api.sampleapis.com/futurama/questions")
		.then(response => response.json())
		.then(data => {
			res.json(data)
		})
});
    
    
app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
})