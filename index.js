const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Restaurant = require("./model/restaurant");
const bodyParser = require("body-parser");
const cors = require("cors");
const Restaurants = mongoose.model("restaurantSchema");
const SERVER_PORT = 8088;
const app = express();
app.use(cors());

mongoose.connect(
	`mongodb+srv://dbuser:test123@restaurants.q8uwtvi.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/restaurants", function (req, res) {
	if ("sortBy" in req.query) {
		if (req.query.sortBy == "ASC") {
			Restaurants.find({})
				.sort({ restaurant_id: 1 })
				.then(function (restaurants) {
					res.send(restaurants);
				});
		} else {
			Restaurants.find({})
				.sort({ restaurant_id: -1 })
				.then(function (restaurants) {
					res.send(restaurants);
				});
		}
	} else {
		Restaurants.find({}).then(function (restaurants) {
			res.send(restaurants);
		});
	}
});
app.get("/restaurants/cuisine/:cuisine", function (req, res) {
	const cuisine = req.params.cuisine;
	console.log(cuisine);
	Restaurants.find({ cuisine }).then(function (restaurants) {
		res.send(restaurants);
	});
});

app.get("/restaurants/Delicatessen", function (req, res) {
	Restaurants.find(
		{ cuisine: "Delicatessen", city: { $ne: "Brooklyn" } },
		{ _id: 0 }
	)
		.sort({ name: 1 })
		.then(function (restaurants) {
			res.send(restaurants);
		});
});

app.listen(SERVER_PORT || process.env.PORT, () => {
	console.log("Server Running at http://localhost:%s", SERVER_PORT);
});
