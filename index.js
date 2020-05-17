#!/usr/bin/env node

const {program} = require("commander");
const mkGif = require("./packages/mkgif");

module.exports = program
    .version("1.0.0")
    .command("dothething")
    .description("A collection of tools and scripts that I find helpful and use often")
    .addCommand(mkGif)
    .parse(process.argv);