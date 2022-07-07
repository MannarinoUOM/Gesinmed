<%@ Page Language="C#" AutoEventWireup="true" CodeFile="testCam.aspx.cs" Inherits="testCam" %>

<!DOCTYPE HTML>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="css/barra.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">


<!-- Stream video via webcam -->
<div class="video-wrap" style="float:left">
    <video id="video" playsinline autoplay></video>
</div>

<!-- Webcam video snapshot -->
<canvas id="canvas" width="640" height="480" style="float:right; display:none"></canvas>


<!-- Trigger canvas web API -->
<div class="controller" style="position:absolute">
    <a id="snap" class="btn"><i class="icon-camera"></i>&nbsp;&nbsp;Sacar Foto</a>
    <a class="btn" id="btnSubir" onclick="uploadFile()"><i class="icon-hdd"></i>&nbsp;&nbsp;Guardar Foto </a>
</div>

<div>
<img id ="imgtest" runat="server"/>
</div>

    </form>
</body>
</html>
    <script src="js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="js/bootstrap.js" type="text/javascript"></script>
    <script src="js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="js/GeneralG.js" type="text/javascript"></script>    
    <script src="js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="js/jQueryBlink.js" type="text/javascript"></script>

<script type="text/javascript">

'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
  audio: true,
  video: {
    width: 1280, height: 720
  }
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
      $("#imgtest").attr('src',canvas.toDataURL());

          var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'sonido/camara_5.mp3');
    
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);

    audioElement.play();
    setTimeout(
  function() 
  {
    audioElement.pause();
  }, 1000);
});


function uploadFile() {
        var json = JSON.stringify({"strEncoded": $("#imgtest").attr('src'), "idAfiliado": 1234 });
    $.ajax({
        type: "POST",
        url: "Json/Gente.asmx/subirFotoTest",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Estado Actualizado.");
        },
        error: errores
    });

}

        function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

</script>