export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){
	vec3 c=(texture2D(texture,texCoords).rgb-0.5)*1.5+0.75;
	c=clamp(1.0-vec3(c.r*0.3+c.g*0.59+c.b*0.11),0.0,1.0)+vec3(0.0,0.156862745,0.196078431);
	gl_FragColor=vec4(clamp(c,0.0,1.0),1.0);
}

`

