const express = require('express');
const app = express();
const cors = require ('cors');
const mysql2 = require('mysql2')

const db = require('./models')

app.use(express.json());
// app.use(cors({
//     origin:["https://deploy-mern-1whq.vercel.app"],
//     methods:[ 'GET', 'POST', 'PUT', 'DELETE'], 
//     credentials: true
// })); // to parse the incoming requests with JSON payloads

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true'); // Add this line
    next();
});

//ROUTERS
const postRouter = require('./routes/Posts')
const commentsRouter = require('./routes/Comments')
const usersRouter = require('./routes/Users')
const likesRouter = require('./routes/Likes')

app.use("/posts",postRouter)
app.use("/comments",commentsRouter)
app.use("/auth",usersRouter)
app.use("/likes",likesRouter)



//MIDDLEWARES
db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server running on port 3001");
    });
});

