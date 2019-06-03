export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){
    vec2 pixel = texCoords;
    if(pixel.y > 0.5){
        pixel.y = 1.0 - pixel.y;
    }

    gl_FragColor = texture2D(texture, pixel);
}
`;