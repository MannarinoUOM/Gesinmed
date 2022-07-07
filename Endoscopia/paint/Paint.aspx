<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Paint.aspx.cs" Inherits="Endoscopia_Paint" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Dibujo Endoscopia</title>  
  <link rel="stylesheet" href="rocanvas.css?v=1.0">
  <style>
  body {font-family: verdana, sans-serif;}    
  </style>
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>
	
	<div id="rodiv1"><canvas id="sampleBoard" width="780" height="419" style="border:1pt solid black"></canvas></div>	
	<div style="margin-top: 10px; width:886px;position: fixed;top: 406px;left: 400px;">
    <br />
    <br />
	<a onclick="javascript:Guardar()" style="text-decoration:none;cursor:pointer;"><img src="../../img/save.png" style="vertical-align: middle;"/></a>
    <a onclick="javascript:Borrar()" style="text-decoration:none;cursor:pointer;"><img src="../../img/borrar.png" style="vertical-align: middle;width:60px;margin-left:61px;"/></a>
	</div>

  <script src="rocanvas.js"></script>
  <script src="../../js/jquery-1.8.3.js"></script>
 
  <script>
      var r = new RoCanvas;
      r.RO("sampleBoard");


      function testSave(instance) {
          var data = instance.serialize();

          // send ajax request to some URL using the data
          // to do...
      }

      var canvas = document.getElementById('sampleBoard');
      var context = canvas.getContext('2d');
      var imageObj = new Image();

      imageObj.onload = function () {
          context.drawImage(imageObj, 0, 0);
      };

</script>
      
    
    <asp:Literal ID="literal_script" runat="server"></asp:Literal>

<script>
      function Guardar() {
          var canvas_guardar = document.getElementById("sampleBoard");
          var dataURL = canvas_guardar.toDataURL("image/png");
          var image = dataURL.replace('data:image/png;base64,', '');

          $.ajax({
              type: "POST",
              url: "../../Json/Endoscopia/Endoscopia.asmx/SubirImagen",
              contentType: "application/json; charset=utf-8",
              data: '{imageData: "' + image + '", Endoscopia_id: "' + Endoscopia_id + '"}',
              dataType: "json",
              success: function (Resultado) {                  
                      alert("Imagen Guardada");                  
              }
          });
      }


      function Borrar() {
          
          var r = confirm("¿Realmente desea eliminar el dibujo?");
          if (r == true) {
              document.location = "Paint.aspx?Endoscopia_id=" + Endoscopia_id + "&B=1"; 
          } else {
            return;
          }
    }



    $(document).ready(function () {
        //if (Limpiar) {
        //    Guardar();
        //}
    });

  </script>
</body>
</html>
