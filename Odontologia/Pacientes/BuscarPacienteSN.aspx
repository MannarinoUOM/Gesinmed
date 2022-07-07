<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarPacienteSN.aspx.cs" Inherits="Pacientes_BuscarPacienteSN" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
   
    <title>Buscar Pacientes</title>
            
</head>
<body>
    <form id="form1">
    <div id="formulario" class="form-inline"  style="margin:20px;">
    <div id="BusquedatxtPacienteBuscar" class="control-group">

    <label for="txtPacienteBuscar">Apellido y Nombre</label>
        <input name="txtPacienteBuscar" id="txtPacienteBuscar" type="text" maxlength="60"/>
    
    <button id="btnBuscarPersonas" type="button" class="btn btn-primary">
  <i class="icon-search icon-white"></i> Buscar
</button>

    </div>
    <div id="Resultado">
          <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
            </div>
        <table class="table table-hover" style="width: 100%;" id="tablaPaciente">
        <thead>
                <tr>
                  <th>#</th>
                  <th>Titular</th>
                  <th>Paciente</th>
                  <th>Documento</th>
                  <th>Teléfono</th>
                  <th>Obra Social</th>
                </tr>
              </thead>
              <tbody>
            
             </tbody>          
        </table>
    </div>

    
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>        
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/GenteSN.js" type="text/javascript"></script>
    
      
      
    </div>
    </form>

    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Paciente NO encontrado</h3>
  </div>
  <div class="modal-body">
    <p>El paciente no se encuentra en el sistema.</p>
    <p>Verifique...</p>
    <ul>
    <li>Que haya ingreso de forma correcta los datos de busqueda, como el DNI, CUIL o APELLIDO Y NOMBRE.</li>
    <li>Que de haber dado de alta el afiliado y le está mostrando este mensaje, por favor comuniquese con SITEMAS</li>    
    <li>De haber verificado el punto anterior, ¿Desea darlo de alta?</li>    
    </ul>
    <p></p>
    <p></p>
    <p></p>

  </div>
  <div class="modal-footer">
    <button onclick="javascript:window.close();" class="btn" data-dismiss="modal" aria-hidden="true">No</button>
    <button onclick="javascript:self.location='NuevoAfiliado.aspx';" class="btn" data-dismiss="modal" aria-hidden="true">Si</button>    
  </div>
   </div>



</body>
</html>

   