const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const { Pokemon, Type } = require("./db/models");

app.get("/", async (req, res, next) => {
  const pokemon = await Pokemon.findAll({
    include: [{ model: Type, through: { attributes: [] } }],
  });
  return res.json(pokemon);
});

app.listen(8080);
