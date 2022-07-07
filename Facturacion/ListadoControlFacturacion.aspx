<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadoControlFacturacion.aspx.cs" Inherits="Facturacion_ListadoControlFacturacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style="margin-top:3%; margin-left:10px">
    <div class="titulo_seccion" style="text-align:center; width:1680px">Cirugías ambulatorias</div>
    <div style=" background-color:#33C6FF; padding:5px; width:1670px; border-radius:10px">
    &nbsp;<b>Desde:</b> <input id="txtDesde" type="text" class="desde1 input-medium fecha" style="text-align:center"/>   
    &nbsp;<label style="display:inline" for="rdoInternados"><b>Internados:</b></label> <input id="rdoInternados" type="checkbox" style="margin-bottom:0px" name="tipo" data-valor="1"/>
    &nbsp;<label style="display:inline" for="rdoAmbulatorio"><b>Ambulatorio:</b></label> <input id="rdoAmbulatorio" type="checkbox" name="tipo" data-valor="2" />
    &nbsp;<label style="display:inline" for="rdoQuirofano"><b>Quirófano:</b></label> <input id="rdoQuirofano" type="radio" style="margin-bottom:0px" name="tipo2" data-valor="1" checked="checked"/>
    &nbsp;<label style="display:inline" for="rdoVeda"><b>Veda:</b></label> <input id="rdoVeda" type="radio" name="tipo2" data-valor="2" />
    &nbsp;<label style="display:inline" for="rdoVvc"><b>Vvc:</b></label> <input id="rdoVvc" type="radio" name="tipo2" data-valor="3" /><br />
    

    &nbsp;&nbsp;<b>Hasta:</b> <input id="txtHasta" type="text" class="hasta1 input-medium fecha" style="text-align:center"/>    
    &nbsp;<label style="display:inline" for="rdoProgramada"><b>Programada:</b></label> <input id="rdoProgramada" type="radio" style="margin-bottom:0px" name="prioridad" data-valor="1" checked="checked"/>
    &nbsp;<label style="display:inline" for="rdoUrgencia"><b>Urgerncia:</b></label> <input id="rdoUrgencia" type="radio"  style="text-align:center; margin-bottom:0px" name="prioridad" data-valor="2"/>
    <a class="btn btn-info" id="btnBuscar" style="width:70px"><i class=" icon-search icon-white "></i>&nbsp;Buscar</a>
    <a class="btn btn-info imprimir" id="btnImprimir" style="width:70px; display:none" data-tipo="1"><i class=" icon-print icon-white "></i>&nbsp;Pdf</a>
    <a class="btn btn-info imprimir" id="btnExcel" style="width:70px; display:none" data-tipo="2"><i class=" icon-print icon-white "></i>&nbsp;Excel</a>
    </div>
    <div class="contenedor_a" style="height:450px; width:1680px; overflow:auto; padding-top:0px">


    <div id="tabla"> 
    </div>
    
    <div id="buscando" style="text-align:center; display:none ; margin-top:100px" >
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
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Facturación > <strong>Cirugías ambulatorias</strong>";
        var tipo = 0;
        var prioridad;
        var T;

        $(".fecha").on('keydown', function (e) { { e.preventDefault(); } });


        $("input[name=tipo]").click(function () {
            switch ($(this).attr('id')) {
                case "rdoInternados":
                    $("#rdoAmbulatorio").attr("checked", false);
                    break;
                case "rdoAmbulatorio":
                    $("#rdoInternados").attr("checked", false);
                    break;
            }
        });

        $("#btnBuscar").click(function () {
            tipo = 0;
            // $("#btnImprimir").hide();
            $(".imprimir").hide();
            $("input[name=tipo]").each(function () {
                if (this.checked) {
                    tipo = $(this).data('valor');
                }
            });

            $("input[name=prioridad]").each(function () {
                if (this.checked) {
                    prioridad = $(this).data('valor');
                }
            });

            $("input[name=tipo2]").each(function () {
                if (this.checked) {
                    T = $(this).data('valor');
                }
            });


            if ($("#txtDesde").val().trim().length <= 0 || $("#txtHasta").val().trim().length <= 0) { alert("ingrese un rango de fechas"); return false; }

            var json = JSON.stringify({ "desde": $("#txtDesde").val(), "hasta": $("#txtHasta").val(), "tipo": tipo, "prioridad": prioridad, "T": T });
            //alert(json);
            $.ajax({
                type: "POST",
                url: "../Json/Quirofano/Quirofano_.asmx/ListadoControlFacturacion",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () { $("#buscando").show(); $("#tabla").hide(); },
                success: Pedidos_Cargados,
                complete: function () { $("#buscando").hide(); $("#tabla").show(); },
                error: errores
            });
        });

        function Pedidos_Cargados(Resultado) {
            var Turnos = Resultado.d;
            var Tabla_Datos = "";

            if (Turnos.length > 0) { $(".imprimir").show(); } else {$ (".imprimir").hide(); } //$("#btnImprimir").hide(); }

            var Tabla_Titulo = "<table  class='table table-condensed' style='width: 100%;'><thead><tr style='background-color:#C3C1C6'><th></th><th>Hora</th><th>Quirófano</th><th>Cama</th><th>Paciente</th><th>NHC</th><th>Diagnóstico</th><th>Cirugía</th><th>Cirujano</th><th>Ayudante</th><th>Anestesia</th><th>Anestesista</th><th>Seccional/OS</th><th>Especialidad</th><th>Observaciones</th><th>Fecha</th><th>Suspendida&nbsp;por</th></tr></thead><tbody>";
            $.each(Turnos, function (index, Pedido) {
                var color = 'Turnos_Ocupados';
                if (Pedido.MotivoSusp) color = 'Turnos_Cancelado';
                if (Pedido.Hora_Fin != "" && Pedido.Hora_Fin != null) color = 'Turnos_Realizadas';
                if (Pedido.Urgencia) color = 'Turnos_Urgencias';

                var urg = "";
                if (Pedido.Urgencia == true) urg = 'Si';
                var Mo = "";
                if (Pedido.Monitoreo == true) Mo = 'Si';
                var ap = "";
                if (Pedido.AP == true) ap = 'Si';
                var rayos = "";
                if (Pedido.Rayos == true) rayos = 'Si';
                var Hemo = "";
                if (Pedido.Hemo == true) Hemo = 'Si';


                var Observaciones = Pedido.Observaciones;
                if (Pedido.Observaciones.length > 20) {
                    Observaciones = Pedido.Observaciones.substring(0, 16) + "...";
                }

                Tabla_Datos = Tabla_Datos + "<tr id='row" + index + "'";
                Tabla_Datos = Tabla_Datos + " style='cursor:default;' class='" + color + "' onclick=Impresion(" + Pedido.Id + ");";
                Tabla_Datos = Tabla_Datos + "><td>" + (index + 1) + "</td><td>" + Pedido.Hora + "</td><td style='text-align:center;'>" + Pedido.Sala + "</td><td>" + Pedido.Cama + "</td><td>" + Pedido.Paciente + "</td><td>" + Pedido.HC + "</td><td>" + Pedido.Diagnostico + "</td><td>" + Pedido.Cirugia + "</td><td>" + Pedido.Cirujano + "</td><td>" + Pedido.Ayudante + "</td><td>" + Pedido.Anestesia + "</td><td>" + Pedido.Anestesista + "</td><td>" + Pedido.Seccional + "</td><td>" + Pedido.Especialidad + "</td><td>" + Observaciones + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.Motivo_Descripcion + "</td></tr>";
            });

            Tabla_Fin = "</tbody></table>";

            if (Tabla_Datos == "") {
                texto_tipo_cirugia = "";
//                if (c_cuales == 1) { texto_tipo_cirugia = "planificadas" }
//                if (c_cuales == 2) { texto_tipo_cirugia = "suspendidas"; }
                Tabla_Datos = "</tbody></table> <div style='text-align:center;'>No hay cirugías <b>" + texto_tipo_cirugia + "</b> para este día</div>";
                Tabla_Fin = "";
            }


            $("#tabla").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

        }

        function errores(msg) {
            alert('Error: ' + msg.responseText);
        }

//        function Impresion(id) {
//            alert(id);
//        }

        $(".imprimir").click(function () {
//            alert($(this).data("tipo"));
//            return false;
            $.fancybox({
                'autoDimensions': false,
                'href': '../Impresiones/Quirofano/Listado_Control_Facturacion.aspx?desde=' + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&tipo=" + tipo + "&prioridad=" + prioridad + "&PDF=" + $(this).data("tipo") + "&T=" + T,
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

    </script>
