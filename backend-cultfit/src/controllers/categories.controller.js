const express = require("express");

const Category = require("../models/categories.model");

const CRUD = require("./crud.controller");

const router = express.Router();

router.post("/", CRUD(Category).post);


