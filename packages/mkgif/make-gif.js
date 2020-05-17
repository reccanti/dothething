const FfmpegCommand = require("fluent-ffmpeg");
const path = require("path");

/**
 * Given a series of options, convert an input video file
 * into a gif. Things we'd like to be able to control:
 *  - fps (default to video fps)
 *  - scale (default to video dimensions)
 *  - input file
 *  - output file (default to input file name + .gif)
 */
function makeGif({ 
    input, 
    output=null, 
    scale=null, 
    fps=null, 
    dryrun=false
}) {
    const inputFilename = path.resolve(process.cwd(), input);
    const outputFilename = output 
        ? output 
        : path.resolve(process.cwd(), path.basename(inputFilename) + '.gif');

    console.log(`converting ${inputFilename} to ${outputFilename}`);
}

module.exports = makeGif;