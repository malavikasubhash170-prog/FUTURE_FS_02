require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SESSION_SECRET ||
    !process.env.ADMIN_USERNAME ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.MONGODB_URI) {
    throw new Error("Missing required environment variables.");
}

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 14400000
    }
}));
