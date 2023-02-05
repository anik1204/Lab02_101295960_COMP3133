const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
	{
		address: { type: Object, required: true },
		name: { type: String, required: true, maxLength: 100 },
		cuisine: { type: String, required: true, maxLength: 50 },
		city: { type: String, required: true, maxLength: 50 },
		restaurant_id: { type: Number, required: true, maxLength: 50 },
	},
	{ collection: "Restaurant" }
);

const model = mongoose.model("restaurantSchema", restaurantSchema);
module.exports = model;
