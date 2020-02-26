import vertShaderSourceDefault from 'shader/vertDefault.glsl.js';
import fragShaderSourceDefault from 'shader/fragDefault.glsl.js';
import fragShaderSourceBlackWhite from 'shader/fragBlackWhite.glsl.js';
import fragShaderSourceVertFlip from 'shader/fragVertFlip.glsl.js';
import fragShaderSourceVertFlipUpside from 'shader/fragVertFlipUpside.glsl.js';
import fragShaderSourcePixelated from 'shader/fragPixelated.glsl.js';
import fragShaderSourceNightVision from 'shader/fragNightVision2.glsl.js';
import fragShaderSourceFishEye from 'shader/fragFishEye.glsl.js';
import fragShaderSourceGrayscale from 'shader/fragGrayscale.glsl.js';
import fragShaderSourceSepia from 'shader/fragSepia.glsl.js';
import fragShaderSourceSpycam from 'shader/fragSpycam.glsl.js';
import fragShaderSourceSketch from 'shader/fragSketch.glsl.js';
import fragShaderSourceInvert from 'shader/fragInvert.glsl.js';
import fragShaderSourceVertLines from 'shader/fragVertLines.glsl.js';
import fragShaderSourceUpsideDown from 'shader/fragUpsideDown.glsl.js';
import fragShaderSourceHorFlip from 'shader/fragHorFlip.glsl.js';
import fragShaderSourceHorFlip2 from 'shader/fragHorFlip2.glsl.js';
import fragShaderSourceRedPurple from 'shader/fragRedPurple.glsl.js';
import fragShaderSourceRGB from 'shader/fragRGB.glsl.js';

class Shader{
  constructor(vertShader, fragShader, name){
    this.vertShader = vertShader;
    this.fragShader = fragShader;
    this.name = name;
  }
}

const effects = [new Shader(vertShaderSourceDefault, fragShaderSourceDefault,  "Default"), 
                 new Shader(vertShaderSourceDefault, fragShaderSourceGrayscale, "Grayscale"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceSepia, "Sepia"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceRedPurple, "Red & Purple"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceRGB, "RGB"), 
                 new Shader(vertShaderSourceDefault, fragShaderSourceInvert, "Invert"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceNightVision, "Night Vision"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceBlackWhite, "Black and White"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceVertLines, "Vertical Lines"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceSketch, "Sketch"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceSpycam, "Spycam"),
                 new Shader(vertShaderSourceDefault, fragShaderSourcePixelated,  "Pixelated"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceUpsideDown, "Upside Down"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceVertFlip,  "Vertically flipped"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceVertFlipUpside,  "Vertically flipped upside"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceHorFlip, "Horizontally flipped"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceHorFlip2, "Horizontally flipped 2"),
                 new Shader(vertShaderSourceDefault, fragShaderSourceFishEye, "Fish Eye"),
                ];
var currentIndex = 0;
var stream = true;
var btnClicked = false;
var snapButtonClicked = false;

const constraints = {
  video: { width: 884, height: 480}
};

const video = document.querySelector('video');
video.playbackRate = 1;

function getCameraPermissions(){
  if (btnClicked){
    return;
  }
  console.log("clicked button");
  btnClicked = true;
  navigator.mediaDevices.getUserMedia(constraints).
  then((stream) => {
    let divPermission = document.getElementById("div-before");
    let divPermissionAfter = document.getElementById("div-after");
  
    divPermission.style.display = "none";
    divPermissionAfter.style.display = "inline";
  
    buttonCurrent.textContent = effects[currentIndex].name;
    video.srcObject = stream;
    video.play();
  }).catch(function(err0r) {
    btnClicked = false;
  });
}

video.addEventListener('loadeddata', function() {
    initShader();
}, false);

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});

function initShader() {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(1.0, 0.8, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  const vertShaderSource = effects[currentIndex].vertShader;
  const fragShaderSource = effects[currentIndex].fragShader;

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

  animateCanvas(texture);
}

function animateCanvas(texture){
  if (!stream){
    return;
  }

  window.requestAnimationFrame(function(){
    animateCanvas(texture);
  });

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.bindTexture(gl.TEXTURE_2D, null);
}


// Buttons
let buttonPrev = document.querySelector('#button-prev');
let buttonCurrent = document.querySelector('#button-current');
let buttonNext = document.querySelector('#button-next');
let buttonPermission = document.querySelector('#btn-camera-access');
let buttonPicture = document.querySelector('#take-photo');
let buttonCancel = document.querySelector('#btn-cancel');
let buttonDownload = document.querySelector('#btn-download');

buttonPrev.addEventListener('click', selectPrevEffect);
buttonNext.addEventListener('click', selectNextEffect);
buttonPermission.addEventListener('click', getCameraPermissions);
buttonPicture.addEventListener('click', takeSnapshot);
buttonCancel.addEventListener('click', resetSettings);
buttonDownload.addEventListener('click', download);


function takeSnapshot(){
  if (!stream || snapButtonClicked){
    return;
  }

  snapButtonClicked = true;

  var timeleft = 4;
  var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("camera-icon").style.display = "none";
    document.getElementById("countdowntimer").textContent = timeleft;
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      console.log("take picture");
      stream = false;
      document.getElementById("countdowntimer").textContent = "";

      buttonCancel.style.display = "inline";
      buttonDownload.style.display = "inline";
      buttonNext.disabled = true;
      buttonPrev.disabled = true;
      buttonCurrent.disabled = true;
      canvas.style.outlineColor = "white";
      buttonPicture.disabled = true;
    }
    },1000);
}

function resetSettings(){
  stream = true;
  initShader();
  document.getElementById("camera-icon").style.display = "inline";
  buttonCancel.style.display = "none";
  buttonDownload.style.display = "none";
  buttonNext.disabled = false;
  buttonCurrent.disabled = false;
  buttonPrev.disabled = false;
  snapButtonClicked = false;
  buttonPicture.disabled = false;
  canvas.style.outlineColor = "transparent";
}

function download() {

  var lnk = document.createElement('a'), e;
  lnk.download = "" + Number(new Date()) + ".png";
  lnk.href = canvas.toDataURL();

  if (document.createEvent) {

      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);

      lnk.dispatchEvent(e);

  } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
  }
}

function selectNextEffect(){
  currentIndex = (currentIndex + 1) % effects.length;
  console.log("Effect: selecting " + effects[currentIndex].name);
  buttonCurrent.textContent = effects[currentIndex].name;
  initShader();
}

function selectPrevEffect(){
  currentIndex = (currentIndex - 1);
  if (currentIndex < 0){
    currentIndex = effects.length - 1;
  }

  console.log("Effect: selecting " + effects[currentIndex].name);
  buttonCurrent.textContent = effects[currentIndex].name;
  initShader();
}
