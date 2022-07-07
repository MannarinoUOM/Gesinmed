<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listado_por_apellido.aspx.cs" Inherits="Internacion_Listado_por_apellido" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Historial por Apellido</strong>";
     
    </script>
<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px;height:500px">
      <h3>Historial por Apellido</h3>
      <div style="padding:15px;">

      <div>
      Fecha Desde: <input type="text" id="txt_Desde" class="span2" />
      Fecha Hasta: <input type="text" id="txt_Hasta" class="span2" />
      <input id="btn_Buscar" type="button" value="Buscar"; style="margin-bottom:10px" />
      </div>

<div class="pull-left TablaBuscar50">
               
        <div class="tabla pull-left" style="margin-top:0;height:380px" >
          <table class="table table-hover AUcentrar">
            <thead>
            <th width="20px"> </th>
            <th width="350px">Seccional</th>
                </thead>                
                <tr><td><input id='cb_Seccional' type='checkbox' checked /></td><td class='AUusuario'>Todas</td>
                <td><input id='cb_ninguna_sec' type='checkbox'/></td><td class='AUusuario'>Ninguna</td>
                </tr>
            <tbody id="TablaSeccionales">
              
              
            </tbody>
          </table>
</div>          
        </div>

<div class="pull-left TablaBuscar50">
        <div class="tabla pull-left" style="margin-top:0;height:380px" >          
          <table class="table table-hover AUcentrar">
            <thead>
            <th width="20px"> </th>
            <th width="350px">Obra Social</th>
                </thead>
                <tr><td><input id='cb_OS' type='checkbox' checked /></td><td class='AUusuario'>Todas</td>
                <td><input id='cb_ninguna_OS' type='checkbox'/></td><td class='AUusuario'>Ninguna</td>
                </tr>
            <tbody id="TablaOSociales">
              
              
            </tbody>
          </table>
</div>          
        </div>

<div class="clearfix"></div>        

      </div>
    </div>
  </div>
</div>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/Hospitales/Internacion/ListarporApellidos.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>



<!--Barra sup--> 
</body>
</html>