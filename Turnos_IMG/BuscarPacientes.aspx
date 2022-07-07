<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarPacientes.aspx.cs" Inherits="Turnos_BuscarPacientes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
   
    <title>Buscar Pacientes</title>
            
</head>
<body>
    <form id="form1">
    <div id="formulario" class="form-inline">
    <div id="BusquedatxtPacienteBuscar" class="control-group">

    <label for="txtPacienteBuscar">Apellido y Nombre</label>
        <input name="txtPacienteBuscar" id="txtPacienteBuscar" type="text" maxlength="60"/>
    
    <button id="Buscar" type="button" class="btn btn-primary">
  <i class="icon-search icon-white"></i> Buscar
</button>

    </div>
     <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando Pacientes...
     </div>    
    <div id="Resultado">
        <table class="table table-hover" style="width: 100%;">
        <thead>
                <tr>
                  <th>#</th>
                  <th>Paciente</th>
                  <th>Documento</th>
                  <th>Seccional/Obra Social</th>
                </tr>
              </thead>
              <tbody>
            
             </tbody>          
        </table>
    </div>

    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap-alert.js" type="text/javascript"></script>    
    <script src="../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos_IMG/Buscarpacientes.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
      

    </div>
    </form>
</body>
</html>
