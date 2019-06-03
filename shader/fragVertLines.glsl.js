export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){
    vec3 c=(texture2D(texture,texCoords).rgb-0.5)*1.5+0.7;
    float lu=c.r*0.3+c.g*0.59+c.b*0.11,p0=gl_FragCoord.x+gl_FragCoord.y,p1=gl_FragCoord.x-gl_FragCoord.y,h=1.0;
    if(lu<0.75&&mod(p0,8.0)==0.0||lu<0.5&&mod(p1,8.0)==0.0||lu<0.4&&mod(p0-4.0,8.0)==0.0||lu<0.3&&mod(p1-4.0,8.0)==0.0||lu<0.2&&mod(p0-2.0,4.0)==0.0||lu<0.1&&mod(p1-2.0,4.0)==0.0) h=0.0;
    gl_FragColor=vec4(h,h,h,1.0);
}
`;

