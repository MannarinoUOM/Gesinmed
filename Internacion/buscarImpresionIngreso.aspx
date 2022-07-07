<%@ Page Language="C#" AutoEventWireup="true" CodeFile="buscarImpresionIngreso.aspx.cs" Inherits="Internacion_buscarImpresionIngreso" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Buscar Impresión Ingreso</strong>";</script>
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style="margin-top:3%">
    <div class="titulo_seccion" style="text-align:center">Impresión Ingresos/Egresos</div>
    <div style=" background-color:#33C6FF; padding:5px; width:96%">
    &nbsp;<b>Desde:</b> <input id="txtDesde" type="text" class="desde1 input-medium fecha" style="text-align:center"/>
    &nbsp;<b>Hasta:</b> <input id="txtHasta" type="text" class="hasta1 input-medium fecha" style="text-align:center"/>
    &nbsp;<b>Afiliado:</b> <input id="txtApellido" type="text" style="width:380px"/>
    &nbsp;<b>Documento:</b> <input id="txtDoc" type="text" class="numeroEntero input-medium "style="text-align:center; margin-bottom:0px" />
    &nbsp;<b>Cama:</b> <select id="cboCama" class=" input-small" style="margin-bottom:0px"></select>
    &nbsp;<b>Sala:</b> <select id="cboSala" class=" input-medium" style="margin-bottom:0px"></select>
    &nbsp;<b>NHC:</b> <input id="txtHc" type="text" class=" input-medium numeroEntero" style="text-align:center; margin-bottom:0px" />
    <a class="btn btn-info" id="btnBuscar" style="width:60px">Buscar</a>
    </div>
    <div class="contenedor_a" style="height:400px; overflow:auto; padding-top:0px">


      <div>
      <ul class="nav nav-tabs tabslist" style="background-color:#D8D8D8;" data-tabs="tabs">
      <li class="active datos" id="1" ><a data-toggle="tab" href="#tab1" >Ingresos</a></li>          
      <li class="datos" id="2" ><a data-toggle="tab" href="#tab2" >Egresos</a></li>
      </ul>
      </div>

    <div id="my-tab-content" class="tab-content tabslist">
    <div class="tab-pane active fade in DP" id="tab1">
    <div id="tabla"> 
    </div>
    
    <div id="guardando" style="text-align:center; display:none ; margin-top:100px" >
    <br />
    <img src="../img/esperar.gif" /><br />
    <label>Buscando...</label>
    </div> 

    </div>


    <div class="tab-pane active fade in DP" id="tab2">
    <div id="tabla2"> 
    </div>
    
    <div id="guardando2" style="text-align:center; display:none ; margin-top:100px" >
    <br />
    <img src="../img/esperar.gif" /><br />
    <label>Buscando...</label>
    </div> 
    </div>
    
    </div>

    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>

<script type="text/javascript">
var urlBusqueda = "BuscarImpresionIngreso";
var urlImpresion = "Impresion_Ingreso.aspx";
var tabla = "tabla";

    $(document).ready(function () {
        var json = JSON.stringify({ "Sala": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                 $("#cboCama").append(new Option("Seleccione", 0)); 

                $.each(lista, function (index, item) {
                    $("#cboCama").append(new Option(item.descripcion, item.id));
                });
            }
        });

        var json = JSON.stringify({ "Servicio": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas_S",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#cboSala").append(new Option("Seleccione", 0));

                $.each(lista, function (index, item) {
                    $("#cboSala").append(new Option(item.descripcion, item.id));
                });
            }
        });
    });


    function errores(msg) {
        alert('Error: ' + msg.responseText);
    }

    $(".seleccionar").live("click", function () {
       // alert(urlImpresion);
        $.fancybox(
        {
            'autoDimensions': false,
            'href': "../Impresiones/" + urlImpresion + "?Id=" + $(this).attr('id'),
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });

    });

    $("#btnBuscar").click(function () {
        //alert(urlBusqueda + "//" + urlImpresion + "//" + tabla);


        if ($("#txtDesde").val().trim().length <= 0 || $("#txtHasta").val().trim().length <= 0) { alert("Ingrese un rango de fechas"); return false; }
        var doc = 0;
        if ($("#txtDoc").val().trim().length > 0) { doc = $("#txtDoc").val(); }

        var json = JSON.stringify({
            "desde": $("#txtDesde").val()
            , "hasta": $("#txtHasta").val()
            , "apellido": $("#txtApellido").val()
            , "doc": doc
            , "cama": $("#cboCama").val()
            , "sala": $("#cboSala").val()
            , "hc": $("#txtHc").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/" + urlBusqueda,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: function (Respuesta) {
                var r = Respuesta.d;
                var encabezado = "<table class=' table ; table-hover'><tr style='background-color:#F7F4F3' ><td><b>Fecha</b></td><td><b>Afiliado</b></td><td><b>Documento</b></td><td><b>Cama</b></td><td><b>Sala</b></td><td><b>Hc</b></td></tr>";
                var fila = "";
                var pie = "</table>";

                $.each(r, function (index, item) {
                    fila = fila + "<tr style='cursor:pointer' class='seleccionar' id='" + item.id + "'>" +
                     "<td>" + item.fecha + "</td>" +
                     "<td>" + item.apellido + "</td>" +
                     "<td>" + item.documento + "</td>" +
                     "<td>" + item.cama + "</td>" +
                     "<td>" + item.sala + "</td>" +
                     "<td>" + item.hc + "</td>" +
                     "</tr>";
                });
                $("#" + tabla).html(encabezado + fila + pie);
            },
            error: errores,
            beforeSend: function () { $("#" + tabla).empty(); $("#guardando").show(); },
            complete: function () { $("#guardando").hide(); }
        });
    });

    $(".datos").live("click", function () {
        if ($(this).attr('id') == 1)
        { urlBusqueda = "BuscarImpresionIngreso"; urlImpresion = "Impresion_Ingreso.aspx"; tabla = "tabla"; } else { urlBusqueda = "BuscarImpresionEgreso"; urlImpresion = "Impresion_Egreso.aspx"; tabla = "tabla2"; }
    });

    $(".fecha").on('keydown', function (e) { { e.preventDefault(); } });

</script>