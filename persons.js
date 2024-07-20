// 2. Create a person with the following prototype

const mongoose = require('mongoose');

// Define the Person schema

const personSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String],
    likes: [String]
},
{
    timestamps: true
})
module.exports = mongoose.model ('person', personSchema);



