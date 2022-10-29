const express=require('express')
const mysql=require('mysql')
const app=express()

//Creating connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodemysql'
})

//Connecting to mySql
db.connect(err=>{
    if(err){
        throw err
    }
    console.log('MySql successfully connected');
})

//Creating database
app.get('/createdb',(req,res)=>{
    let sql='CREATE DATABASE nodemysql'
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Databse successfully created');
    })
})

//Creating table
app.get('/createstudent',(req,res)=>{
    let sql='CREATE TABLE student(id int AUTO_INCREMENT, name VARCHAR(255), branch VARCHAR(255),PRIMARY KEY(id))'
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Student table created')
    })
})

//Inserting students
app.get('/student1',(req,res)=>{
    let post={name:'Mohan',branch:'CS&E'}
    let sql='INSERT INTO student SET ?'
    db.query(sql,post,err=>{
        if(err){
            throw err
        }
        res.send('Student 1 inserted')
    })
})

//Selecting students
app.get('/getstudent',(req,res)=>{
    let sql='SELECT * FROM student'
    db.query(sql,(err,result)=>{
        if(err){
            throw err
        }
        console.log(result);
        res.send(`Student details fetched`)
    })
})

//Updating student
app.get('/updatestudent/:id',(req,res)=>{
    let newName='H N Mohan'
    let sql=`UPDATE student SET name='${newName}' WHERE id=${req.params.id}`
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Student updated')
    })
})

//Deleting student
app.get('/deletestudent/:id',(req,res)=>{
    let sql=`DELETE FROM student WHERE id=${req.params.id}`
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Student deleted')
    })
})

app.listen(5000,()=>{
    console.log('Server is listening on localhost 5000....');
})