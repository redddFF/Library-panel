"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const book_1 = __importDefault(require("./book"));
const body_parser_1 = __importDefault(require("body-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express();
app.use(body_parser_1.default.json());
app.use((0, serve_static_1.default)("public"));
app.use((0, cors_1.default)());
const uri = "mongodb://localhost:27017/biblio";
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mongo db connection success");
    }
});
//requete get
app.get("/", (req, resp) => {
    resp.send("hello world");
});
app.get("/books", (req, resp) => {
    book_1.default.find((err, books) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(books);
        }
    });
});
//requete post
app.post("/books", (req, resp) => {
    let book = new book_1.default(req.body);
    book.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(book);
    });
});
app.post("/books/:id", (req, resp) => {
    book_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err)
            resp.status(500).send(err);
        else {
            resp.send("successfully updated book");
        }
    });
});
//requete delete
app.delete("/books/:id", (req, resp) => {
    book_1.default.deleteOne({ _id: req.params.id }, err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Successfully deleted Book");
    });
});
app.listen(8011, () => {
    console.log("Server Started on port 8011");
});
