export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){ 
    vec3 color = texture2D(texture, texCoords).rgb;
    float c = (color.r + color.g + color.b) / 3.0;

    gl_FragColor = vec4(c, c, c, 1.0);
}
`