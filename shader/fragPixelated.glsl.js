export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

const float pixel_w = 8.0;
const float pixel_h = 8.0;

void main(){ 
    vec3 color = vec3(1.0, 0.0, 0.0);
    vec2 uv = texCoords;

    float dx = pixel_w*(1./884.0);
    float dy = pixel_h*(1./480.0);

    vec2 coord = vec2(dx*floor(uv.x/dx),dy*floor(uv.y/dy));

    color = texture2D(texture, coord).rgb;

    gl_FragColor = vec4(color, 1.0);
}
`

