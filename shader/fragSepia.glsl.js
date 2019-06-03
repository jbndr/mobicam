export default `
precision highp float;

varying vec2 texCoords;
uniform sampler2D texture;

void main(){ 

    vec3 inputColor = texture2D(texture, texCoords).rgb;

    float oRed = dot(inputColor, vec3(0.393, 0.769, 0.189));
    float oGreen = dot(inputColor, vec3(0.349, 0.686, 0.168));
    float oBlue = dot(inputColor, vec3(0.272, 0.534, 0.131));

    oRed = oRed > 1.0 ? 1.0 : oRed;
    oGreen= oGreen > 1.0 ? 1.0 : oGreen;
    oBlue = oBlue > 1.0 ? 1.0 : oBlue;

    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(vec3(oRed, oGreen, oBlue), W));
    vec3 color = mix(intensity, vec3(oRed, oGreen, oBlue), 2.0);

    gl_FragColor = vec4(color, 1.0) ;
}
`