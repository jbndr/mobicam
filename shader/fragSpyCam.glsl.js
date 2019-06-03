export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

const vec3 tint=vec3(0.85,1.1,1.35);
float rand(vec2 r){
    return clamp(fract(sin(dot(r,vec2(12.9898,78.233)))*437.5),0.0,1.0);
}

void main(){
    float PI = 3.14159265;

    vec2 p=texCoords;
    vec3 c=texture2D(texture,p).rgb;
    float b = mix(sin(p.x*PI),sin(p.y*PI),0.5);
    float noise = rand(vec2(c.g,atan(p.x,p.y))) * 1.1;
    float y = (p.y*480.0)/2.0;
    float tv=mix(b,mix(b/2.0,abs(sin(y))/1.5,0.5),0.5)+noise/16.0;
    c=vec3(c.r*0.3+c.g*0.59+c.b*0.11)*tint;
    gl_FragColor=vec4(((c-0.5)*4.0+1.0)*vec3(tv),1.0);
}
`;