const express=require('express');
const app=express();
const authRoutes=require('./src/routes/authRoutes');
 
app.use(express.json());

console.log('App initialized');
//app.use((req, res, next) => {
   // console.log("Incoming request:", req.method, req.url);
   // next();
//});

app.use('/api/auth',authRoutes);



module.exports=app;
