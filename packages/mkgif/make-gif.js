const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

/**
 * Given a series of options, convert an input video file
 * into a gif. Things we'd like to be able to control:
 *  - fps (default to video fps)
 *  - scale (default to video dimensions)
 *  - input file
 *  - output file
 */
function makeGif({ 
    input, 
    output, 
    scaleWidth  = null, 
    scaleHeight = null,
    fps         = null,
    dryrun      = false
}) {

    /**
     * Calculate the scale for the video
     */
    let scale;
    if (scaleWidth || scaleHeight) {
        if (scaleWidth && !scaleHeight) {
            scale = `${scaleWidth}:-1`;
        } else if (scaleHeight && !scaleWidth) {
            scale = `-1:${scaleHeight}`;
        } else {
            scale = `${scaleWidth}:${scaleHeight}`
        }
    }

    /**
     * Construct the complex filter arguments, which 
     */
    const filterArgs = [];
    if (fps) {
        filterArgs.push(`fps=${fps}`);
    }
    if (scale) {
        filterArgs.push(`scale=${scale}`);
    }
    filterArgs.push("split [a][b]");
    const complexFilters = [`[0:v] ${filterArgs.join(",")}`]
    complexFilters.push("[a] palettegen [p]");
    complexFilters.push("[b][p] paletteuse");

    const command = ffmpeg()
        .input(input)
        .complexFilter(complexFilters);

    /** 
     * handle output if we're performing a dry-run
     */
    if (dryrun) {
        command.outputFormat("null");
        command.output("-");
    } else {
        command.output(output);
    }
        
    return command;

}

module.exports = makeGif;