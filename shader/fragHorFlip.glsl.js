export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){
    vec2 pixel = texCoords;
    if(pixel.x > 0.5){
        pixel.x = 1.0 - pixel.x;
    }

    gl_FragColor = texture2D(texture, pixel);
}
`;