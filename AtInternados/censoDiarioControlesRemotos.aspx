<%@ Page Language="C#" AutoEventWireup="true" CodeFile="censoDiarioControlesRemotos.aspx.cs" Inherits="AtInternados_censoDiarioControlesRemotos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head runat="server">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="../css/barra.css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="clearfix"> </div>
<script type="text/javascript">    parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Censo Diario de Controles Remotos</strong>";</script>

<div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);"> </div>
<div class="container" style="padding-top: 30px;">
  <div class="contenedor_1">
    <div class="clearfix"> </div>
    <div id="hastaaqui" style="display: inline;">

      <div class="contenedor_3" style=" height:500px;">
        <div class="titulo_seccion"> <img src="../img/1.jpg" />&nbsp;&nbsp;<span>Censo Diario de Controles Remotos</span></div>
            <div style="font-size:15px;font-weight:bold;margin-left:15px;margin-bottom:10px;color:#666666" for="txtFechaInicio">Fecha <input id="txtFecha" type="text" class="input-medium" style="text-align:center"/></div>

        <div class="">
          <div class="minicontenedor100" style="height:350px;">
          <div class="check_todos">
            <label class="checkbox">
                <input onclick="Ft(0)" id="cbo_Todos" type="checkbox" value="0" CHECKED />Marcar todos
            </label>
            <label class="checkbox">
                <input onclick="Fdes(0)" id="cbo_DesTodos" type="checkbox" value="0"/>Desmarcar todos
            </label>
          </div>
            <div class="filtro_datos check_todos_barra" style="width:98%;height:250px">
        
              

              <div id="FiltroServicios" style="float: left;"> </div>
            </div>
          </div>
                 <div id="cargando" style="text-align:center; display:none">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
                                <div class="pie_gris">
                    <a id="btn_Buscar_Censo" style="margin-right:10px;" class="btn btn-info pull-right"><i class="icon-search icon-white"></i>&nbsp;Buscar</a>
                </div>
            </div>

        </div>


        </div>

      </div>
    </div>


<!-- Modal -->
<div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
  <div class="modal-header">
    <h3 id="myModalLabel"> Error en Turno</h3>
  </div>
  <div class="modal-body">
    <p> <span id="DialogoError"></span> </p>
  </div>
  <div class="modal-footer">
    <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true"> Cerrar</button>
  </div>
</div>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script> 
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script> 
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
</body>
</html>

<script type="text/javascript">

    $("#txtFecha").datepicker();

    $("#txtFecha").on("keydown", function () { return false; });

    var Todos = 0;
    var objBusquedaLista = "";

    function CargarServicios() {
    var json = JSON.stringify({ "activo": 1}); 
        $.ajax({
            type: "POST",
            //url: "../Json/Internaciones/IntSSC.asmx/Lista_Servicios_A",
            url: "../Json/Internaciones/IntSSC.asmx/TraerControles",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: CargarControles_Cargados,
            error: errores
        });
    }

    function CargarControles_Cargados(Resultado) {
        var Servicios = Resultado.d;
        $('#FiltroServicios').empty();
        $.each(Servicios, function (index, s) {
            $('#FiltroServicios').append('<label style="text-align:left;" class="checkbox"><input onclick="F_uno(' + s.id + ')" id="Pr' + s.id + '" type="checkbox" value="' + s.id + '" checked>' + s.marca + " - " + s.modelo + '</label>');
        });
    }

    function Fdes(Id) {
        $("#FiltroServicios input").each(function () {
            $(this).removeAttr('disabled');
            $(this).removeAttr('checked', 'checked');
            $("#cbo_Todos").removeAttr('checked');
        });
    }

    function F_uno(Id) {
        $("#cbo_DesTodos").removeAttr('checked');
        $("#cbo_Todos").removeAttr('checked');
    }

    function Ft(Id) {
        $("#FiltroServicios input").each(function () {
            if ($("#cbo_Todos").is(":checked")) {
                $(this).attr('checked', 'checked');
                $("#cbo_DesTodos").removeAttr('checked');
            }
            else {
                $(this).removeAttr('checked', 'checked');
            }
        });
    }

    CargarServicios();
    $("#txtFecha").html(FechaActual());

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }


    $('#btn_Buscar_Censo').click(function () {
        VerificarTodo();
    });

    function VerificarTodo() {
        var Lista = "";
        objBusquedaLista = "";

        if ($("#cbo_Todos").is(':checked')) {
            objBusquedaLista = "0";
        }
        else {
            $("#FiltroServicios input").each(function () {

                if ($(this).is(':checked')) {
                    objBusquedaLista = objBusquedaLista + $(this).val() + ",";
                }
            });
        }
        Imprimir();
    }

    function Imprimir() {
        if (objBusquedaLista == "") { alert("Seleccione algún control!."); return false; }
        if ($("#txtFecha").val() == "") { alert("Ingrese una fecha."); return false; }
        var Pagina = "../Impresiones/impresionCensoControles.aspx?fecha=" + $("#txtFecha").val() + "&controles=" + objBusquedaLista;
        //Pagina = Pagina.slice(0, -1);
        $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'preload': true,
		    //		    'beforeShow': function () { $('#spinner').start(true, true).show(); }
		    'onComplete': function () {
		        jQuery.fancybox.showActivity();
		        jQuery('#fancybox-frame').load(function () {
		            jQuery.fancybox.hideActivity();
		        });

		    }

		}
	        );
    }


</script>