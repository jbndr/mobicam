export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy ,vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec3 rgb = texture2D(texture, texCoords).rgb;
    float noiseValue = rand(texCoords) * 0.1;
    vec3 green = vec3(0.0, 1.0, 0.0);
    gl_FragColor = vec4((noiseValue + rgb) * green, 1.0);
}
`