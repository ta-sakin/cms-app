require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zuiaw0q.mongodb.net/?retryWrites=true&w=majority`;

module.exports = uri;
