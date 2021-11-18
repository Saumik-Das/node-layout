const config  = require("../config/config");
const app = require("./express");
const connectToMongo = require("./db")

connectToMongo();

app.listen(config.port, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`App is listening on port number : ${config.port}`);
});