<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DiasdeAtencion.aspx.cs" Inherits="Turnos_DiasdeAtencion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

    <title></title>
</head>
<body>
        <form id="form1" runat="server" class="form-horizontal">
    
    <div>
  <legend>Dias de Atención</legend>
 <asp:HiddenField ID="txtMedicoId" runat="server" />
  
  <h4>
      <asp:Label ID="NombreMedico" runat="server" Text="Label"></asp:Label></h4>
  <div id="TablaDiasAtencion" style="overflow:scroll; overflow-x:hidden; height:220px;">
    <table class="table table-hover table-condensed" style="width: 100%; cursor: pointer; ">
      <thead>
        <tr>
          <th>Consultorio</th>
          <th>Día</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Duración</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
  <div class="minicontenedor50">

      <div class="control-group">
        <label class="control-label" for="cboEspecialidadDA">Especialidad</label>
        <div class="controls">
          <select id="cboEspecialidadDA">
          </select>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="cbo_DiaAtencion">Dia de atención</label>
        <div class="controls">
          <select id="cbo_DiaAtencion">
            <option value="-1">Seleccione Día de Atención</option>
            <option value="0">Domingo</option>
            <option value="1">Lunes</option>
            <option value="2">Martes</option>
            <option value="3">Miércoles</option>
            <option value="4">Jueves</option>
            <option value="5">Viernes</option>
            <option value="6">Sábado</option>
          </select>
        </div>
      </div>
      <div class="control-group">
       <label class="control-label" for="txtHoraInicio">De </label>
        <div class="controls">
          <div class="input-append">
              <input id="txtHoraInicio" type="text" class="input-mini"/>
              <span class="add-on">Hs.</span>
          </div>
                        <label for="txtHoraFin" style="display:inline;">a </label>
          <div class="input-append"> 
              <input id="txtHoraFin" type="text" class="input-mini"/>
              <span class="add-on">Hs.</span>
          </div>
        </div>
      </div>

  </div>
  
  
<div class="minicontenedor50">
       <div class="control-group">
        <label class="control-label" for="cbo_Consultorio">Consultorio</label>
        <div class="controls">
          <select id="cbo_Consultorio">
          </select>
        </div>
      </div>  


      <div class="control-group">
        <label class="control-label" for="txtDuracionTurno">Duración del turno</label>
        
        <div class="controls">
        <div class="input-append">
            <input class="span2" id="txtDuracionTurno" style="width:35px;" type="text">
            <span class="add-on">Min.</span>
        </div>

        
        </div>
      </div>

          <div class="control-group">
            <div class="controls"> <a id="btn_Agregar" class="btn btn-info">Agregar</a> 
            <a id="btn_Cancelar" class="btn">Cancelar</a> <a id="btn_Eliminar" class="btn" style="display:inline-block;">Eliminar</a> 
            </div>
         </div>

</div>
</div>


   </form>


    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Turnos/DiasdeAtencion.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

</body>
</html>