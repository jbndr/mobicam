import vertShaderSourceDefault from './shader/vertDefault.glsl.js';
import fragShaderSourceBlackWhite from './shader/fragBlackWhite.glsl.js';
import fragShaderSourceVertFlip from './shader/fragVertFlip.glsl.js';

class Shader{
  constructor(vertShader, fragShader, name){
    this.vertShader = vertShader;
    this.fragShader = fragShader;
    this.name = name;
  }
}

const effects = [new Shader(vertShaderSourceDefault, fragShaderSourceVertFlip,  "Vertically flipped"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceBlackWhite, "Black and White"),
                ];

const constraints = {
  video: { width: 884, height: 480}
};

const video = document.querySelector('video');
video.playbackRate = 1;

navigator.mediaDevices.getUserMedia(constraints).
  then((stream) => {
    video.srcObject = stream;
    video.play();
  });

video.addEventListener('loadeddata', function() {
    draw();
}, false);

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

function initShader() {

gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
gl.clearColor(1.0, 0.8, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertShader = gl.createShader(gl.VERTEX_SHADER);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertShader, vertShaderSource);
gl.shaderSource(fragShader, fragShaderSource);

gl.compileShader(vertShader);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);

gl.linkProgram(program);

gl.useProgram(program);

const vertices = new Float32Array([
  -1, -1,
  -1, 1,
  1, 1,

  -1, -1,
  1, 1,
  1, -1,
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, 'position');

gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

const texture = gl.createTexture();
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

gl.drawArrays(gl.TRIANGLES, 0, 6);
gl.bindTexture(gl.TEXTURE_2D, null);

requestAnimationFrame(function loop() {

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.bindTexture(gl.TEXTURE_2D, null);

  window.requestAnimationFrame(loop);
});
}
