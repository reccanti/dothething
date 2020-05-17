const path = require("path");
const { program } = require("commander");
const makeGif = require("./make-gif");

module.exports = program
    .name("mkgif")
    .command('mkgif <source> [destination]')
    .description("convert a <source> video file into a gif (NOTE: This only works if you've installed `ffmpeg` on your computer!!!)")
    .option("--fps <fps>", "the frames per second the gif will run at (uses the video's fps by default)")
    .option("--scaleWidth <scale>", "what size to scale the width of the video to?\n\tno scaling by default \n\tif scaleHeight is not specified, it will scale according to the video's aspect ratio")
    .option("--scaleHeight <scale>", "what size to scale the height of the video to?\n\tno scaling by default \n\tif scaleWidth is not specified, it will scale according to the video's aspect ratio")
    .option("--dry", "perform a dry-run of the conversion. Doesn't produce any files")
    .action(function (source, destination, options) {
        /**
         * construct the input and output filenames. If no output file
         * is given, use the input file name with a ".gif" extension
         */
        const input = path.resolve(process.cwd(), source);
        const output = destination 
            ? destination 
            : path.resolve(process.cwd(), path.parse(input).name + '.gif');

        console.log(`Converting ${input} to ${output}...`)
        makeGif({
            input,
            output,
            fps: options.fps,
            scaleWidth: options.scaleWidth,
            scaleHeight: options.scaleHeight,
            dryrun: options.dry
        })
        .on("end", function(err, res) {
            if (err) {
                console.log("an error occurred, please see stack trace")
            } else {
                console.log(res)
            }
        })
        .run();
    });