export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){
    gl_FragColor = texture2D(texture, texCoords);
}
`