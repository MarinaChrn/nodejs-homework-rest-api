require("dotenv").config();

const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

async function run() {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connection successful")
        
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

run().catch(console.error);