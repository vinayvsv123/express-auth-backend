const express=require('express');
const app=express();
const authRoutes=require('./src/routes/authRoutes');
 
app.use(express.json());

console.log('App initialized');
app.use('/api/auth',authRoutes);

app.get('/test', (req, res) => {
  res.send('API working');
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports=app;
