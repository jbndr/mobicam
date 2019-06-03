export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){
    vec2 pixel = texCoords;
    pixel.y = 1.0 - pixel.y;

    gl_FragColor = texture2D(texture, pixel);
}
`;