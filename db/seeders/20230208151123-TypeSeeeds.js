"use strict";
const axios = require("axios");
const { Type, Pokemon } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const allTypes = await axios.get("https://pokeapi.co/api/v2/type");
    // console.log(allTypes);
    // console.log(allTypes.data.results);
    for (let type of allTypes.data.results) {
      await Type.create({
        type: type.name,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
