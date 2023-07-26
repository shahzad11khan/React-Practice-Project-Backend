const express=require("express"); //library of the node js 
const mysql=require("mysql"); //use for storing the data
const cors=require("cors"); //connectivity with fron-end
const port=8001;
const app=express();
app.use(cors());
app.use(express.json());

// Create a connection 
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs"
});
// checking the connection
con.connect(function(err){
    if(err){
        console.log("Error in connection...");
    }else{
        console.log("connect connection...")

    }
});
// Create SignUp API

app.post('/signup',(req,res)=>{
    const sql="INSERT INTO signup (`username`, `email`, `password`,`phone`) VALUES (?)";
    const values=[
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.phone
    ]
    con.query(sql,[values],(err,result)=>{
        if(err){
            return res.json({Status:"Error"});
            // console.log("data not go...")
        }else{
            return res.json({Status:"Success"});
            // console.log("Data Transfor...")
        }
    })
})

// Create login API

app.post('/login',(req,res)=>{
    const sql="SELECT * FROM signup Where email = ? AND password = ?";
    con.query(sql,[req.body.email ,req.body.password],(err,result)=>{
        // console.log(result.length);
        if(result.length > 0){
            return res.json({Status:"Success"});
            // console.log("data come...")
        }else{
            return res.json({Status:"Error No Record Found..."});
            // console.log("Error...")
        }
    })
})

//Start Curd Operation
// get all students API
// app.get('/',(req,res)=>{
// const sql="SELECT * FROM student";
// con.query(sql,(err,result)=>{
//     if(err){
//         return res.json("Error");
//     }
//     return res.json(result);
// })
// });


// listening the port
app.listen(port,()=>{
    console.log(`Server is Listening.. ${port}`);
})