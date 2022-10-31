const express = require('express')
import {Request,Response } from "express";
import Book from "./book" ; 
import bodyParser from "body-parser" ; 
import serveStatic from "serve-static" ; 
import cors from "cors" ; 
import mongoose from "mongoose";

const app =express();  

app.use(bodyParser.json()) ; 

app.use(serveStatic("public")) ; 

app.use(cors()) ;

const uri:string="mongodb://localhost:27017/biblio" ; 
mongoose.connect(uri,(err)=>{
    if(err){
        console.log(err); 
    }
    else{
        console.log("Mongo db connection success") ; 
    }
})


//requete get
app.get("/",(req:Request,resp:Response)=>{
    resp.send("hello world") ; 
});

app.get("/books",(req:Request,resp:Response)=>{
    Book.find((err,books)=>{
        if(err){
            resp.status(500).send(err);
        }
        else{
            resp.send(books) ; 
        }
    }) ; 
}) ; 






//requete post
app.post("/books",(req:Request,resp:Response)=>{
    let book = new Book(req.body);
    book.save(err=>{
        if(err) resp.status(500).send(err); 
        else resp.send(book) ; 
    });
});
app.post("/books/:id",(req:Request,resp:Response)=>{
    Book.findByIdAndUpdate(req.params.id,req.body,(err: any,book: any)=>{
        if(err) resp.status(500).send(err) ; 
        else {
            resp.send("successfully updated book")
        }
    })
})


//requete delete

app.delete("/books/:id",(req:Request,resp:Response)=>{
    Book.deleteOne({_id:req.params.id},err=>{
        if(err) resp.status(500).send(err) ; 
        else resp.send("Successfully deleted Book");
    });
});







app.listen(8011,()=>{
    console.log("Server Started on port 8011")
})