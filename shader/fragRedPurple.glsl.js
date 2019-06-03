export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

const vec3 g1=vec3(0.5,0.5,1.0);
const vec3 g2=vec3(0.9,0.3,0.3);
void main(){
    vec3 c=(texture2D(texture,texCoords).rgb-0.5)*1.8+0.5;
    c=vec3(c.r*0.3+c.g*0.59+c.b*0.11);
    vec3 g=mix(g1,g2,(texCoords.x+texCoords.y)/2.0);
    gl_FragColor=vec4(1.0-(1.0-c)*(1.0-g),1.0);
}
`