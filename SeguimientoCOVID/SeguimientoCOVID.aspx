<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SeguimientoCOVID.aspx.cs" Inherits="SeguimientoCOVID_SeguimientoCOVID" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>

        <div class="titulo_seccion">Carga Seguimiento COVID</div>
          <div>
        <ul class="nav nav-tabs tabslist" style="background-color:#D8D8D8;" data-tabs="tabs">
         <li class="active datos"><a data-toggle="tab" href="#tab0" id="t0"> Datos 0</a></li>  
          <li class="datos"><a data-toggle="tab" href="#tab1" id="t1"> Datos 1</a></li>          
          <li class="datos"><a data-toggle="tab" href="#tab2" id="t2">Datos 2</a></li>
          <li class="datos"><a data-toggle="tab" href="#tab3" id="t3">Datos 3</a></li>
          <li class="datos"><a data-toggle="tab" href="#tab4" id="t4">Datos 4</a></li>
        </ul>


        <div id="my-tab-content" class="tab-content datos tabslist">
              <%--  DATOS 0--%>
        <div class="tab-pane active fade in DP" id="tab0">
          <div class="pull-left">
            <form class="form-horizontal">
             <div class="control-group">
               <label class="control-label">Dni</label>
                <div class="controls">
                    <input id="txtDniBusqueda" class="span2 numeroEntero" type="text" maxlength="11"/>
                    <a class="btn btn-info" id="btnBuscar">Buscar</a>
                </div>
              </div>
              </form>
              </div>
              </div>
             
      <%--  DATOS 0--%>


      <%--  DATOS 1--%>

        <div class="tab-pane  fade in DP" id="tab1">
          <div class="pull-left">
            <form class="form-horizontal">
             <div class="control-group">
               <label class="control-label">Apellido y nombre</label>
                <div class="controls">
                    <input id="txtNombre" class="span2" type="text" style="width:300px" maxlength="40"/>
                </div>
              </div>

                <div class="control-group">
                <label class="control-label">Dni</label>
                <div class="controls">
                  <input id="txtDni" maxlength="11" class="span2 defautl" type="text" /></div>
              </div>

              <div class="control-group">
                <label class="control-label">Pediátrico</label>
                <div class="controls">
                  <select id="cboPediatrico" class="span2"  >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                  </select></div>
              </div>

              <div class="control-group">
                <label class="control-label">Dirección</label>
                <div class="controls">
                  <input id="txtDireccion" maxlength="40" class="span2 defautl" type="text" style="width:300px"/></div>
              </div>

              <div class="control-group">
                <label class="control-label">Localidad</label>
                <div class="controls">
                  <input id="txtLocalidad" maxlength="40" class="span2 defautl" type="text" style="width:300px"/></div>
              </div>

              <div class="control-group">
                <label class="control-label">Salud UOM</label>
                <div class="controls">
                  <select id="cboUom" class="span2">
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  </select>
                  </div>
              </div>

              <div class="control-group">
                <label class="control-label">Teléfono</label>
                <div class="controls">
                  <input id="txtTelefono" maxlength="20" class="span2 defautl numeroEntero" type="text" /></div>
              </div>

              <div class="control-group">
                <label class="control-label">Fecha Hisopado</label>
                <div class="controls">
                  <input id="txtHisopado" maxlength="10" class="span2 fecha fechaMask" type="text" /></div>
              </div>

            </form>
          </div>
          <div class="pull-left">
          </div>
            </div>
     
             
    
      <%--  DATOS 1--%>

      <%--  DATOS 2--%>
<%--        <div id="Div1" class="tab-content datos tabslist">--%>
        <div class="tab-pane fade in DP" id="tab2">
          <div class="pull-left">
            <form class="form-horizontal">
             <div class="control-group">
               <label class="control-label">Resultado</label>
                <div class="controls">
                    <select id="cboResultado" class="span2" >
                    <option value="Negativo">Negativo</option>
                    <option value="Positivo">Positivo</option>
                    </select>
                </div>
              </div>
              </form>
              </div>
              </div>
             
      <%--  DATOS 2--%>

      <%--  DATOS 3--%>
      <div class="tab-pane fade in DP" id="tab3">
                <div class="pull-left">
            <form class="form-horizontal">
             <div class="control-group">
               <label class="control-label">Destino</label>
                <div class="controls">
                    <select id="cboDestino" class="span2" >
                    <option value="Domicilio">Domicilio</option>
                    <option value="Internación">Internación</option>
                    <option value="Hotel">Hotel</option>
                    </select>
                </div>
              </div>
              <div class="control-group">
               <label class="control-label">Internación</label>
                <div class="controls">
                    <input id="txtInternacion" class="span2 fecha fechaMask" type="text"/>
                </div>
              </div>
           <div class="control-group">
               <label class="control-label">Alta Internación</label>
                <div class="controls">
                    <input id="TxtAltaInternacion" class="span2 fecha fechaMask" type="text"/>
                </div>
              </div>
              </form>
              </div>
      </div>
      <%--  DATOS 3--%>

      <%--  DATOS 4--%>
      <div class="tab-pane fade in DP" id="tab4">
                      <div class="pull-left">
            <form class="form-horizontal">
             <div class="control-group">
               <label class="control-label">Médico Seguimiento</label>
                <div class="controls">
                    <select id="cboMedSeguimiento" class="span2" ></select>
                </div>
              </div>
              <div class="control-group">
               <label class="control-label">Hisopado Control</label>
                <div class="controls">
                    <input id="txtHisopadoControl" class="span2 fecha fechaMask" type="text"/>
                </div>
              </div>
           <div class="control-group">
               <label class="control-label">Fecha Alta Epidemiológica</label>
                <div class="controls">
                    <input id="txtFechaAltaEpidemiolo" class="span2 fecha fechaMask" type="text"/>
                </div>
              </div>
                         <div class="control-group">
               <label class="control-label">Donante Plasma</label>
                <div class="controls">
                    <select id="cboDoantePlasma" class="span2">
                    <option value="NO">NO</option>
                    <option value="SI">SI</option>
                    </select>
                </div>
              </div>
                         <div class="control-group">
               <label class="control-label">Óbito</label>
                <div class="controls">
                    <select id="cboObito" class="span2">
                    <option value="0" >FALSO</option>
                    <option value="1" >VERDADERO</option>
                    </select>
                </div>
              </div>
              </form>
              </div>
      </div>
      <%--  DATOS 4--%>

        </div>
       
      </div>
  <div class="pie_gris" style="margin-bottom:50px"><a class="btn btn-danger" id="btnGuardar">Guardar</a><a class="btn btn-danger" href="SeguimientoCOVID_Busqueda.aspx" style="display:none" id="btnVolver">Volver</a></div>
  
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>   
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
    <script src="../js/Hospitales/SeguimientoCOVID/SeguimientoCOVID.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>


    <script>  parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Carga Seguimiento COVID</strong>"; </script>