const { program } = require("commander");
const makeGif = require("./make-gif");

module.exports = program
    .name("mkgif")
    .command('mkgif <source> [destination]')
    .description("convert a <source> video file into a gif")
    .option("--fps <fps>", "the frames per second the gif will run at (uses the video's fps by default)")
    .option("--scale <scale>", "what size to scale the video down to (no scaling by default)")
    .action(function (source, destination, options) {
        console.log(`${source} to ${destination} with the following options: ${options}`)
    });