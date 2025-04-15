import pool from "./utils/db";
// import { createUser } from "./models/userModel";
// import {Request, Response } from "express";
const express = require('express')
const cors = require('cors')
import bcrypt  = require("bcrypt");
import bodyParser = require("body-parser");

const app = express();
const PORT = 5501;

app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.post('/api/signup', handleSignup);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("DB connected at:", res.rows[0].now); //res.rows[0].now
  }
});



/*************************************Api for login **************************************/
app.post('/api/login', async (req: any, res: any) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "All fields are required" });

  try {
    const usernameResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if(usernameResult.rows.length === 0)return res.status(401).json({message:"Invalid Username"})


      const user = usernameResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Password" });
      }

    // const passwordResult = await pool.query(
    //   "SELECT * FROM users WHERE username = $1 AND password = $2",
    //   [username, password]
    // );
    // if(passwordResult.rows.length === 0)return res.status(401).json({message:"Invalid Password"})

    res.status(200).json({message:"Login successfully"})                                                                                                                                                                                                                                                                                                        
  }catch(error){
    console.error("Login error in",error);
    res.status(500).json({message:"Server error"});
  }
});


/***************************** Api for Signup***************************************/

app.post('/api/signup', async (req: any, res: any) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  else if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/*************************************getting all students from DB(add student form)********************************************/
app.get('/api/students', async(req:any, res:any)=>{
  try{
    const result = await pool.query('SELECT * FROM students ORDER BY id ASC');
    res.status(200).json(result.rows);
  }catch(error){
    console.error("Fetching students error:",error)
    res.status(500).json({message:"Internal server error"});
  }
});


/*****************************Add student form API ***************************************/
app.post('/api/student', async (req:any, res:any) =>{
  const{studentName, registerNumber, email, phoneNumber} = req.body;
  if(!studentName || !registerNumber || !email || !phoneNumber){
    return res.status(500).json({message:"Please fill all fields to add students"})
  }
  try{
    const result = await pool.query(
      'INSERT INTO students (student_name, register_number, email, phone_number) VALUES ($1, $2, $3, $4)',
      [studentName, registerNumber, email, phoneNumber]
    );
    await pool.query(
      'INSERT INTO attendance(register_number, student_name) VALUES ($1, $2)',
      [registerNumber, studentName]
    );
    await pool.query(
      'INSERT INTO marksheet(register_number, student_name) VALUES ($1, $2)',
      [registerNumber, studentName]
    );
    // const newStudent = result.rows[0];
    res.status(200).json({message:"Student added successfully"});
  }catch(error){
    console.error("Adding student problem :", error)
    res.status(500).json({mesage:"Internal server error"});
  }
});

/*************************************edit student form API**************************************/

app.put('/api/student/:registerNumber', async(req:any, res:any) =>{
  const{registerNumber} = req.params;
  const{studentName, email, phoneNumber} = req.body;
  try{
    await pool.query(
      'UPDATE students SET student_name = $1, email = $2, phone_Number = $3 WHERE register_Number = $4',
      [studentName, email, phoneNumber, registerNumber]
    );
    await pool.query(
      'UPDATE attendance SET student_name = $1 WHERE register_number = $2',
      [studentName, registerNumber]
    );
    await pool.query(
      'UPDATE marksheet SET student_name = $1 WHERE register_number = $2',
      [studentName, registerNumber]
    );
    res.status(200).json({message:"Student updated successfully"});
  }catch(error){
    res.status(500).json({message:"Student update Failed"});
  }
});

/******************************** delete Api for delete student in table****************** */

app.delete('/api/student/:registerNumber', async (req:any, res:any)=>{
  const{registerNumber} = req.params;
  try{
    await pool.query('DELETE FROM students WHERE register_Number = $1', [registerNumber]);
    await pool.query('DELETE FROM attendance WHERE register_Number = $1', [registerNumber]);
    await pool.query('DELETE FROM marksheet WHERE register_Number = $1', [registerNumber]);

    res.status(200).json({mesage:"Student deleted successfully"});
  }catch(error){
    console.error("Error deleting Students", error);
    res.status(500).json({message:"Internal server error"});
  }
});

/*************************************getting students attendance **************************************/

app.get('/api/students/attendance', async(req:any, res:any)=>{
  try{
    const result = await pool.query('SELECT * FROM attendance ORDER BY id ASC');
    res.status(200).json(result.rows);
  }catch(error){
    console.error("Getting students attendance",error)
    res.status(500).json({message:"Internal server error"})
  }
});


/*************************************updating student attendanceI**************************************/

app.put('/api/students/attendance/:registerNumber', async(req:any, res:any) =>{
  const{registerNumber} = req.params;
  const{action} = req.body;
  try{
    await pool.query(
      'UPDATE attendance SET action = $1 WHERE register_Number = $2',
      [action, registerNumber]
    );
    res.status(200).json({message:"Attendance updated"})
  }catch(error){
    res.status(500).json({message:"Failed to update student attendance"});
  }
});

/*****************************Add student name in dropdown***************************************/

app.get('/api/dropdown', async(req:any, res:any)=>{
  try{
    const result = await pool.query('SELECT student_name FROM attendance');
    res.status(200).json(result.rows);
  }catch(error){
    console.error("Error getting Students name", error);
    res.status(500).json({message:"Internal server error"});
  }
});

/*****************************update mark api***************************************/

app.put('/api/marksheet/:studentName', async(req:any, res:any)=>{
  const{studentName} = req.params;
  const{tamil, english, maths, science, social, total, grade} = req.body;
  try{
    await pool.query(
      'UPDATE marksheet SET tamil = $1, english = $2, maths = $3, science = $4, social = $5, total = $6, grade = $7 WHERE student_name = $8',
      [tamil, english, maths, science, social, total, grade, studentName]
    );
    res.status(200).json({message:"Marks updated successfully"});
  }catch(error){
    console.error("Error updating student name", error);
    res.status(400).json({message:"Marks updates failed internal server error"})
  }
});

/*****************************get marks***************************************/

app.get('/api/marksheet/:newStudentName', async(req:any, res:any)=>{
  const{newStudentName} = req.params;
  try{
    const result = await pool.query(
      'SELECT * FROM marksheet WHERE student_name = $1',
      [newStudentName]
    );
    if(result.rows.length === 0){
      return res.status(404).json({ message: "No marks found" });
    }
    res.json(result.rows[0]);
  }catch (error) {
    console.error("Error fetching marksheet:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
