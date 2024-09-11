const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) + 10;
        const camp = new Campground({
            author: '66cecebad3cf4838e75a4bfa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aperiam delectus ab veniam fugit sit! Id aut sequi tempora placeat quos iusto natus explicabo alias, enim molestiae ducimus nisi modi.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dgshyfwh2/image/upload/v1725680019/YelpCamp/qu8eloayu3tfhwo3bhiz.jpg',
                  filename: 'YelpCamp/qu8eloayu3tfhwo3bhiz'
                },
                {
                  url: 'https://res.cloudinary.com/dgshyfwh2/image/upload/v1725680019/YelpCamp/faddyetmyv0cp62qoab8.jpg',
                  filename: 'YelpCamp/faddyetmyv0cp62qoab8'
                }
              ]
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});





