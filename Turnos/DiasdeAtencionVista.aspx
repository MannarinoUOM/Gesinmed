<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DiasdeAtencionVista.aspx.cs" Inherits="Turnos_DiasdeAtencionVista" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Dias de Atención</title>

    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />


</head>
<body>
    <form id="form1" runat="server">
    <div>
    <legend>Dias de Atención</legend>
    <h4 id="NombreMedico">Nombre Médico</h4>
    <div id="Dias">    
    <h5>Especialidad</h5>
    <table id="TablaTurnos" class="table table-condensed table-bordered table-striped" style="width: 100%;">
        <thead>
                <tr>
                  <th>Día</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Consultorio</th>
                </tr>
              </thead>
              <tbody>
                
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>                
                
             </tbody>          
        </table>
    </div>
    <div id="Sobreturnos" style="display:none;">
        <span class="span3"><h5>Sobreturnos máximos por día</h5></span><input id="txtCantidad" name="txtCantidad" type="text" style="width:30px; display:inline;" disabled>
    </div>
    </div>

        <div>
    <legend>Dias de No Atención</legend>
    <div id="TablaNoAt">    
    <table id="TablaNoAt_" class="table table-condensed table-bordered table-striped" style="width: 100%;">
        <thead>
                <tr>
                  <th>Día</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Consultorio</th>
                </tr>
              </thead>
              <tbody>
                
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>                
                
             </tbody>          
        </table>
    </div>
    </div>


    </form>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>

    <script src="../js/Hospitales/DiasAtencion.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    

</body>
</html>

