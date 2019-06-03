export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;
const float PI = 3.1415926535;

void main(){
    float aperture = 178.0;
    float apertureHalf = 0.5 * aperture * (PI / 180.0);
    float maxFactor = sin(apertureHalf);

    vec2 uv;
    vec2 xy = 2.0 * texCoords.xy - 1.0;
    float d = length(xy);
    if (d < (2.0-maxFactor)){
        d = length(xy * maxFactor);
        float z = sqrt(1.0 - d * d);
        float r = atan(d, z) / PI;
        float phi = atan(xy.y, xy.x);

        uv.x = r * cos(phi) + 0.5;
        uv.y = r * sin(phi) + 0.5;
    }
    else {
        uv = texCoords;
    }

    vec4 c = texture2D(texture, uv);
    gl_FragColor = c;
}
`;