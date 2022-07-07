<%@ Page Language="C#" AutoEventWireup="true" CodeFile="BuscarInsumos.aspx.cs" Inherits="Guardia_BuscarInsumos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Buscar Insumos</title>

   <%-- <link rel="stylesheet" type="text/css" href="../css/filtergrid.css" media="screen" />--%>
	 <%-- <script type="text/javascript" src="../js/Filtro De Tabla/tablefilter.js"></script>--%>
     <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.Fbubox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
   <%-- <form id="form1" runat="server">--%>
    <div>
    <div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1" style="height:30; width:470px; margin-left:13px; margin-bottom:30px; padding-bottom:0px">
<%--   <div class="contenedor_3" style="height:530px;">--%>
    <div class="titulo_seccion">
    <span style="font-size:xx-large; margin-left:70px">Seleccionar Insumo</span></div>

        
        <!--Tabla de estudios-->
        <div class="table" style="margin-left:10px; width:460px" >
            <ul class="nav nav-tabs">
       
            </ul>
          <div class="tab-content" style="width:461px; height:445px">
            <div class="tab-pane active" id="tabla" style="background-position:center; t ">
        <%--<div style="padding:15px 15px 0px 15px; margin-right:12px">
            --%>
            <div class="clearfix"></div>
            <div id="tabla2" class="table success" style="height:360px;width: 178.594; margin-top:-10px;width: 178.594;">
              <table class="table" style="background-position:center" id="tablaDeBusqueda">

              

                <thead>					
                  <tr>
                    <%--<th></th>--%>
                     <th></th>
                 <%--   <th>Precio UOM</th>
                    <th>Precio OS</th>--%>
                    <th></th>
                   <%-- <th>Codigo Kike</th>--%>
                  </tr>

      
                </thead>

              </table>     
       <div id="cargando" style="text-align:center; display:none">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
                 
            </div> 

    <%--    </div>--%>
        <form id="frm_Medicamentos">
    
        <%--<div class="contenedor_1" style=" background-position:center; width:404px">
          <%--  <label for="InsumoId" style="display:inline; margin-left:33px">Insumo ID:</label>
    <%--        <a id="btnBuscar" class="btn btn-info pull-left" style="margin-top:6px ; margin-left:14px"><i class=" icon-search" ></i>&nbsp;Buscar</a>
            <input id="InsumoId" class="numero input-mini" style="margin-left:10px" disabled="disabled"/>
      
            <label for="PecrioUOM" style="display:inline;">Precio UOM:</label><input type="text" id="PecrioUOM" name="PecrioUOM" class="numero input-mini" maxlength="8"/>
        
            <label for="PrecioOS" style="display:inline;">Precio OS:</label><input type="text" id="PrecioOS" name="PrecioOS" class="numero input-mini" maxlength="8"/>
            <label for="Nombre" style="display:inline">Nombre:</label><input type="text" id="Nombre" name="Nombre" class="input-mini" style="width:150px" maxlength="40"/>
            <label for="CodigoKike" style="display:inline;">Código Kike:</label><input type="text" id="CodigoKike" name="CodigoKike" class="numero input-mini"  style="width:80px"maxlength="12"/>
       
        </div>
        </form>--%>
        <div class="clearfix"></div>


<%--<div class="pie_gris" style="left: 0px; bottom: 0px;">
<%--<button id = "btnGuardarMedicamentos" class="btn btn-info pull-right" style="margin-right:14px"><i class=" icon-ok icon-white"></i>&nbsp;Guardar Medicamentos</button>--%>
<%--</div>
</div>--%>

            <form id="Practicas_frm">
 <%--        
 <div class="pie_gris">
          <%--  <a id = "btnGuardar" class="btn btn-info pull-right" onclick="Actualizar()" style="margin-right:27px"><i class=" icon-ok icon-white"></i>&nbsp;Actualizar Medicamentos</a>
              <a id="BtnCancelar"  class="btn btn-info pull-left" onclick="LimpiarCampos()">Cancelar</a>--%>
        </div>
        </form>
       
      </div>
    </div>
  </div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script type="text/javascript" src="../js/jquery-1.7.2.min.js"></script>  
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<%--<script src="../js/Hospitales/Guardia/CargarListaInsumos.js" type="text/javascript"></script>--%>
<script src="../js/Hospitales/Guardia/BusquedaInsumosGuardia.js" type="text/javascript"></script>
 <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    

<!--Barra sup--> 
<%--<script type="text/javascript">

    parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Editar Plantilla de Insumos y Prácticas de Guardia</strong>";

</script> --%>

 
    <%--</div>--%>
    </form>
</body>
</html>
