export default `
precision highp float;
varying vec2 texCoords;
uniform sampler2D texture;

void main() {
    vec2 u_resolution = vec2(884.0, 480.0);
    float angle = 0.0;
    vec2 red_offset = vec2(cos(angle), sin(angle));
    angle += radians(120.0);
    vec2 green_offset = vec2(cos(angle), sin(angle));
    angle += radians(120.0);
    vec2 blue_offset = vec2(cos(angle), sin(angle));

    float offset_size = 9.0;

    float red = texture2D(texture, texCoords - offset_size * red_offset / u_resolution).r;
    float green = texture2D(texture, texCoords - offset_size * green_offset / u_resolution).g;
    float blue = texture2D(texture, texCoords - offset_size * blue_offset / u_resolution).b;

    // Fragment shader output
    gl_FragColor = vec4(red, green, blue, 1.0);
}
`