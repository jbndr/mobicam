export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){
    vec4 color = texture2D(texture, texCoords) * 255.0;

    float calc = (0.2126 * color.r) + (0.7152 * color.g) + (0.0722 * color.b);

    if (calc >= 120.0){
        color = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        color = vec4(0, 0, 0, 1.0);
    }

    gl_FragColor = color;
}
`;