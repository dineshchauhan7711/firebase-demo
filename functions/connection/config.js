require('dotenv').config();


module.exports = {
     firebase:{
          DATABASE_URL: process.env.DATABASE_URL || "database url",
     }
};

