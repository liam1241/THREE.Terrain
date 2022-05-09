/**
 * Generate random terrain using the Fault method.
 *
 * Based on http://www.lighthouse3d.com/opengl/terrain/index.php3?fault
 * Repeatedly draw random lines that cross the terrain. Raise the terrain on
 * one side of the line and lower it on the other.
 *
 * Parameters are the same as those for {@link THREE.Terrain.DiamondSquare}.
 */
THREE.Terrain.Fault = function(g, options) {
    var d = Math.sqrt(options.xSegments*options.xSegments + options.ySegments*options.ySegments),
        iterations = d * options.frequency,
        range = (options.maxHeight - options.minHeight) * 0.5,
        ranSeed = options.suppliedSeed,
        displacement = range / iterations,
        smoothDistance = Math.min(options.xSize / options.xSegments, options.ySize / options.ySegments) * options.frequency;
    var prng = new Alea(ranSeed);
    for (var k = 0; k < iterations; k++) {
        var v = prng(),
            a = Math.sin(v * Math.PI * 2),
            b = Math.cos(v * Math.PI * 2),
            c = prng() * d - d*0.5;
        for (var i = 0, xl = options.xSegments + 1; i < xl; i++) {
            for (var j = 0, yl = options.ySegments + 1; j < yl; j++) {
                var distance = a*i + b*j - c;
                if (distance > smoothDistance) {
                    g[j * xl + i] += displacement;
                }
                else if (distance < -smoothDistance) {
                    g[j * xl + i] -= displacement;
                }
                else {
                    g[j * xl + i] += Math.cos(distance / smoothDistance * Math.PI * 2) * displacement;
                }
            }
        }
    }
};