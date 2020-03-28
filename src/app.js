const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup views for hbs
app.set("view engine", "hbs")
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
	res.render('index', {
		title: 'weather app',
		name: 'susruth'
	})
})


app.get('/about',(req,res) => {
	res.render('about', {
		title: 'about page',
		name: 'susruth'
	})
})


app.get('/help',(req,res) => {
	res.render('help', {
		helpText: "this is helpful text",
		title: 'help page',
		name: 'susruth'
	})
})


// app.get('',(req, res) => {
// 	res.send("<h1>hello express</h1>")
// })

// app.get('/help',(req, res) => {
// 	res.send([{
// 		name: 'susruth',
// 		age: 24
// 	},
// 	{
// 		name: 'reddy'
// 	}
// 	])
// })

// app.get('/about',(req, res) => {
// 	res.send("<h1>about page</h1>")
// })

app.get('/weather',(req, res) => {

	if(!req.query.address){
		return res.send({
			error: "you must provide address"
		})
	}
	geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
		if(error){
			return res.send({
				error: error
			})
		}
		

		forecast(latitude,longitude,(error, forecastData) => {
			if(error){
				return res.send({error})
			}
			 return res.send({
			 	forecast: forecastData,
			 	location,
			 	address: req.query.address
			 })
		})
	})
})

app.get('/products',(req, res) => {
	if(!req.query.search){
		return res.send({
			error: "you must provide search term"
		})
	}
	res.send({
		products: [],
		
	})
})



app.listen(3000,() => {
	console.log("server is up on port 3000")
})