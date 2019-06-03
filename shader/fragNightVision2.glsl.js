export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy ,vec2(12.9898, 78.233))) * 43758.5453);
}

void main(){
    vec3 rgb = texture2D(texture, texCoords).rgb;
    float r = rgb.r * 0.9;
    if(r>0.5) r=1.0-r;
    r=((r-0.5)*1.25+0.55);
    float noise = rand(texCoords) * 0.05;

    vec4 color = vec4(r*0.1 + noise,r*1.75 + noise,r*0.75 + noise,1.0);
    gl_FragColor = color;
}
`