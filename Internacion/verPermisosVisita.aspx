<%@ Page Language="C#" AutoEventWireup="true" CodeFile="verPermisosVisita.aspx.cs" Inherits="Internacion_verPermisosVisita" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>

    <script type="text/javascript">parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Visitas</strong>";</script>

<body>
    <form id="form1" runat="server">
    <div class="container" style="padding-top:1%; margin-left:17%; margin-top:1%">
    <span class=" TituloLasNovedades" style=" width:100%; text-align:center; margin-left:37%; top:200px">Permisos de visita</span>
    <div class="contenedor_4" style="width:940px; height:470px ;padding:10px; margin-left:0px">
    <div class="contenedor_3" style="padding:0px; height:100%">


    <div style="height:550px">
    <%--<table class='table' style=" margin-bottom:0px "><tr style='background-color:black; color:white'><td style='width:10%' >Fecha Movimiento</td><td style='width:5%' >Hora</td><td style='width:10%' >Sector</td><td style='width:15%' >Número Bono<br />Comprobante</td><td style='width:10%' >Importe</td><td style='width:10%' >Especialidad</td><td style='width:30%' >Observaciones</td></tr></table>--%>
    <div style="height:85%; overflow:auto">
    <div id="resumen">
                            <div id="cargando" style="text-align:center; display:none">
                            <br /><br />
                            <img src="../img/Espere.gif" style="height:40px; width:40px"/><br />
                            Buscando...
                        </div>   
    </div>
                            <h2 id="nada" style="display:none; text-align:center">NO SE ENCONTRARON RESULTADOS</h2> 
    </div>

    </div>

    <div class="pie_gris">
   <a id="btnBuscar" class="btn btn-info pull-right"><i class="icon-search icon-white "></i>&nbsp;&nbsp;Buscar</a>
   <input id="txtBuscar" type="text" class="pull-right" maxlength="20"/>
<%--     <a id="btnGuardar" class="btn btn-info pull-right">Guardar</a>
    <a id="btnEstado" class="btn btn-warning pull-right" style="display:none" data-estado="0">Estado</a>--%>
    </div>
    </div>
    </div>
    </div>

    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () { TraerPermisosVisita(0); });

        function TraerPermisosVisita(intId) {
            var json = JSON.stringify({ "internacionId": intId, "nombre": $("#txtBuscar").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/TraerPermisosVisita",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                beforeSend: function () { $("#cargando").show(); },
                success: function (Resultado) {
                    var encabezado = "<table class='table'><tr style='color:black'><th>Afiliado</th><th>Nhc</th><th>Sala</th><th>Cama</th><th>Médico</th><th>AUTORIZA EL DIA</th><th>Visitas</th></tr>";
                    var fila = "";
                    var pie = "</table>";
                    var visitas;

                    $.each(Resultado.d, function (index, item) {
                        if (item.visitas == "0") { visitas = ""; } else { visitas = item.visitas; }

                        fila += "<tr><td>" + item.afiliado + "</td><td>" + item.hc + "</td><td>" + item.sala + "</td><td>" + item.cama + "</td><td>" + item.usuarioName + "</td><td>" + item.fecha + "</td>" +
                        "<td><input id='" + item.id + "' class='input-mini visita numeroEntero ' type='number' min='0' maxlength='2' style='text-align:center' value='" + visitas + "'/></td><td style='display:none' id='cache" + item.id + "'>" + item.visitas + "</td></tr>";
                    });

                    $("#resumen").html(encabezado + fila + pie);

                    if (Resultado.d.length <= 0) { $("#nada").show(); $("#resumen").hide(); } else { $("#nada").hide(); $("#resumen").show(); }
                },
                complete: function () { $("#cargando").hide(); },
                error: errores
            });
        }

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }

//        $(".visita").live(change, function () { alert($(this).attr('id')); });

        $(".visita").live("change", function () {

            var cantidad = 0;
            var id = $(this).attr('id');
            var cache = $("#cache" + $(this).attr('id')).html();

            if ($(this).val() == "") { cantidad = 0; } else { cantidad = $(this).val(); }
            // if ($(this).val() == "0") { alert("Ingrese una cantidad mayor a cero."); $(this).val(cache); return false; }
            if ($(this).val() == "0") { cantidad = 0; $(this).val() == "" }

            var json = JSON.stringify({ "id": $(this).attr('id'), "cantidad": cantidad });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/ActualizarVisitas",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                success: function (Resultado) {
                    if (Resultado.d == 1) {
                        $("#cache" + id).html(cantidad);
                        alert("Visitas guardadas!.");
                    }
                    else { alert("ATENCION!!! No se pudieron actualizar las visitas!"); }
                },
                //                complete: function () {
                //                    alert("Visitas guardadas!.");
                //                },
                error: errores
            });
        });

        $(".visita").live('keydown', function (e) {

            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }

            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        $("#btnBuscar").click(function () {
//            if ($("#txtBuscar").val().trim().length <= 0) { return false; }
//            else {
                TraerPermisosVisita(0);
    //        }
        });


        $("#txtBuscar").keydown(function (e) { if (e.key == "Enter") { $("#btnBuscar").click(); } });
        $("#txtBuscar").keyup(function (e) { if ($(this).val().trim().length <= 0) { $("#btnBuscar").click(); } });
    </script>