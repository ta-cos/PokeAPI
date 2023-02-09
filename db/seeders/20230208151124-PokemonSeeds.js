"use strict";
const axios = require("axios");
const { Pokemon, Type, Pokemon_Type } = require("../models");
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const result = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1008"
    );

    const allPokemon = result.data.results;
    // console.log(allPokemon);
    let count = 1;

    for (let poke of allPokemon) {
      const pokeInfo = await axios.get(poke.url);
      let pokemonId;
      if (count < 999) pokemonId = ("000" + count).slice(-3);
      else pokemonId = ("000" + count).slice(-4);

      const iChooseYou = await Pokemon.create({
        number: count,
        name: poke.name,
        url: poke.url,
        base_exp: pokeInfo.data.base_experience,
        height: pokeInfo.data.height,
        weight: pokeInfo.data.weight,
        image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`,
      });

      let type1 = pokeInfo.data.types[0].type.name;
      let type2 = null;
      if (pokeInfo.data.types.length > 1)
        type2 = pokeInfo.data.types[1].type.name || null;

      const myTypes = await Type.findAll({
        where: {
          [Op.or]: [{ type: type1 }, { type: type2 }],
        },
        attributes: ["id"],
      });

      await iChooseYou.addType(myTypes);
      await iChooseYou.save();

      count++;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Pokemons", null, {});
  },
};
