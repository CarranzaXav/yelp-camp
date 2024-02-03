require("dotenv").config();

const mongoose = require("mongoose");

//import our array
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
//add a second period to back out of
const Campground = require("../models/campground");

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp";
mongoose.connect(dbUrl, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  // await Review.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 50) + 15;
    const camp = new Campground({
      author: "65babecf135850f7d2377016",
      location: `${cities[random1000].city} , ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem neque sed delectus alias repellat voluptate inventore quam, enim consectetur eum. Nisi beatae dolore alias non doloremque exercitationem qui! Ipsa, cupiditate?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dlbssbvdt/image/upload/v1706113505/YelpCamp/v1lgkfefzngqv9qvftzu.jpg",
          filename: "YelpCamp/v1lgkfefzngqv9qvftzu",
        },
        {
          url: "https://res.cloudinary.com/dlbssbvdt/image/upload/v1706113522/YelpCamp/ybj2rw60nwnroy5wflgr.jpg",
          filename: "YelpCamp/ybj2rw60nwnroy5wflgr",
        },
      ],
    });
    await camp.save();
  }
};

//execute seedDB; .then to close our connection afterwards
seedDB().then(() => {
  mongoose.connection.close();
});

("https://loremflickr.com/320/240/camping?random{i}");
