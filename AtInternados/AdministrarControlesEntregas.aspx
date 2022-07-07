<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AdministrarControlesEntregas.aspx.cs" Inherits="AtInternados_AdministrarControlesEntregas" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>

    <%--<script type="text/javascript"> parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Entregas Controles</strong>"; </script>--%>

    <form id="form1" runat="server">
    <div class="container" style="padding-top:2%; margin-left:15%; margin-top:4%">
    <span class=" TituloLasNovedades" style=" width:100%; text-align:center; margin-left:40%; top:200px">ENTREGAS CONTROLES</span>
    <div class="contenedor_4" style="width:1100px; height:470px ;padding:10px; margin-left:0px">
    <div class="contenedor_3" style="padding:0px; height:100%; width:98%">

    <input id="afiliadoId" type="hidden"/>


    <div style="height:450px">

    
    <div style="height:100%; overflow:auto">
    <div id="resumen">
    <table class='table' style=" margin-bottom:0px" id="internaciones">
    <tr style='background-color:black; color:white'>
    <td style='width:10%'>Servicio</td>
    <td style='width:5%'>Sala</td>
    <td style='width:10%'>Cama</td>
    <td style='width:15%'>Afiliado</td>
    <td style='width:10%'>Fecha Entrega</td>
    <td style='width:10%'>Control</td>
    <td style='width:30%'>Entregar</td></tr>
    </table>
    </div>
    </div>

    </div>
    <div class="pie_gris">

<%--    <a id="btnCerrar" class="btn btn-info pull-right">Cerrar</a>
    <a id="btnGuardar" class="btn btn-info pull-right">Guardar</a>--%>
    <span style=" margin-left:10%">
    <label for="cboAfiliado" style="display:inline">Afiliado </label><select id="cboAfiliado" class="search" ><option value="0"></option></select>
    <label for="cboServicio" style="display:inline">Servicio </label><select id="cboServicio" class="search" ><option value="0"></option></select>
    <label for="cboControl" style="display:inline">Control </label><select id="cboControl" class="search" ><option value="0"></option></select>
    <a id="btnEstado" class="btn btn-warning pull-right" style="display:none" data-estado="0">Estado</a>
    </span>
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
        var comboAfiliado = new Array(); //"<option value='0' >Seleccione</option>", "<option value='0'>TODOS</option>"); //"<select id='cboAfiliado' class='search' ><option value='0'>Seleccione</option>";
        var comboServicio = new Array("<option value='0' >Seleccione</option>", "<option value='0'>TODOS</option>"); //"<select id='cboServicio' class='search' ><option value='0'>Seleccione</option>";
        var comboControl = new Array("<option value='0' >Seleccione</option>", "<option value='0'>TODOS</option>");  //"<select id='cboControl' class='search' ><option value='0'>Seleccione</option>";
        var comboAfiliadoSort = new Array();

        $(document).ready(function () {
            cargarintenraciones(1);
        });


        function cargarintenraciones(vez) {
            var json = JSON.stringify({ "tienen": true, "afiliadoId": $("#cboAfiliado").val(), "servicioId": $("#cboServicio").val(), "controlId": $("#cboControl").val() });
            //console.log(json);
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/ListarInternacionesControles",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                success: function (Resultado) {
                    var encabezado = "<table class='table' style='margin-bottom:0px'>" +
    "<tr style='background-color:black; color:white'>" +
    "<td style='width:10%'>Servicio</td>" +
    "<td style='width:5%'>Sala</td>" +
    "<td style='width:10%'>Cama</td>" +
    "<td style='width:15%'>Afiliado</td>" +
    "<td style='width:10%'>Fecha Entrega</td>" +
    "<td style='width:10%'>Control</td>" +
    "<td style='width:5%'>Entregar</td>" +
    "<td style='width:30%'>Observaciones</td></tr>";
                    var fila = "";
                    var pie = "</table>";
                    var FechaEntrega;
                    var combo;
                    var boton;
                    var deshabilitar;
                    var selected;
                    var controlCargado = 0;
                    var servicioCargado;
                    var existe = new Array();
                    //                    $("#cboPracticas").empty();
                    //                    $("#cboPracticas").append("<option value='0'>Seleccione</option>");
                    //                    $.each(Resultado.d, function (index, item) {
                    //                        $("#cboPracticas").append("<option value='" + item.id + "'>" + item.practica + "</option>");
                    //                    });

                    //                    TraerEvolucionEpecialista(id);

                    $.each(Resultado.d, function (index, item) {
                        if (item.FechaEntrega == null) { FechaEntrega = ""; } else { FechaEntrega = item.FechaEntrega; }


                        if (item.id > 0) { deshabilitar = "disabled='disabled'"; } else { deshabilitar = ""; }

                        combo = "<select class='controles' " + deshabilitar + " id='cbo" + item.camaId + "'><option value='0'>Seleccione</option>";

                        if (item.id > 0) {
                            boton = "<a id='btn" + item.camaId + "' class='btn btn-danger entregar'>Devolver</a>";
                        } else { boton = "<a id='btn" + item.camaId + "' class='btn entregar'>Entregar</a>"; }

                        $.each(item.controles, function (index2, item2) {
                            if (item.idControl == item2.id) {
                                selected = "selected";

                                //combo control
                                if (vez == 1) {
                                    if ($.inArray(item.idControl, existe) < 0) {
                                        // alert(controlCargado + "//" + item.idControl);
                                        comboControl.push("<option value='" + item.idControl + "'>" + item2.marca + " " + item2.modelo + "</option>");

                                        existe.push(item.idControl);

                                    }
                                }
                            } else {
                                selected = "";
                            }

                            if (selected == "selected") {
                                combo = combo + "<option value='" + item2.id + "'  " + selected + ">" + item2.marca + " " + item2.modelo + "<b> STOCK: </b>" + item2.disponibles + "</option>";
                            } else if (item2.activo) {
                                combo = combo + "<option value='" + item2.id + "'  " + selected + ">" + item2.marca + " " + item2.modelo + "<b> STOCK: </b>" + item2.disponibles + "</option>";
                            }
                        });
                        combo = combo + "</select>";

                        //combo afiliado
                        if (vez == 1) {
                            var obj = new Object();
                            obj.text = "<option value='" + item.afiliadoId + "'>" + item.Afiliado + "</option>";
                            obj.name = item.Afiliado;
                            comboAfiliado.push(obj);
                        }
                        //combo servicios
                        if (vez == 1) {
                            if (servicioCargado != item.servicioId) {
                                comboServicio.push("<option value='" + item.servicioId + "'>" + item.Servicio + "</option>");
                                servicioCargado = item.servicioId;
                            }
                        }


                        fila = fila + "<tr><td id='servicio" + item.camaId + "'>" + item.Servicio + "</td>" +
                        "<td>" + item.Sala + "</td>" +
                        "<td>" + item.Cama + "</td>" +
                        "<td>" + item.Afiliado + "</td>" +
                        "<td>" + FechaEntrega + "</td>" +
                        "<td>" + combo + "</td>" +
                        "<td>" + boton + "</td>" +
                        "<td id='obs" + item.camaId + "' contenteditable class='editable' style='max-width:10px; max-height:10px' maxlength='10'>" + item.observacion + "</td>" +
                        "<td style='display:none'>" + item.camaId + "</td>" +
                        "<td style='display:none' id='idCarga" + item.camaId + "'>" + item.id + "</td>" +
                        "<td style='display:none' id='idAfiliado" + item.camaId + "'>" + item.afiliadoId + "</td></tr>";

                    });
                    //                    comboAfiliado = comboAfiliado + "</select>";
                    //                    comboServicio = comboServicio + "</select>";
                    //                    comboControl = comboControl + "</select>";

                    $("#cboAfiliado").empty();
                    $("#cboServicio").empty();
                    $("#cboControl").empty();

                    // recorrer array combos
                    //                    console.log(comboAfiliado);
                    //                    console.log(comboServicio);
                    //                    console.log(comboControl);
                    //  comboAfiliado.sort();

                    if (vez == 1) {
                        comboAfiliado.sort(function (a, b) {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (a.name < b.name) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                        });
                    }

                    if (vez == 1) {
                        var sel = { text: "<option value='0' >Seleccione</option>", name: "Seleccione" };
                        var tod = { text: "<option value='0'>TODOS</option>", name: "TODOS" };
                        //                    alert($.inArray(tod, comboAfiliado));
                        //console.log(comboAfiliado);
                        comboAfiliado.unshift(tod);
                        comboAfiliado.unshift(sel);
                    }

                    $.each(comboAfiliado, function (index, item) { $("#cboAfiliado").append(item.text); });


                    $("#cboServicio").html(comboServicio);
                    $("#cboControl").html(comboControl);
                    $("#internaciones").html(encabezado + fila + pie);
                },
                error: errores
                // complete: function () { alert(); comboAfiliado.length = 0; }
            });
        }




        $(".editable").live("keypress", function (e) {

            //alert($(this).css("width"));
            //if (parseInt($(this).css("width")) >= 100) {  e.preventDefault(); }
            if (parseInt($(this).html().length) >= 100) { e.preventDefault(); }
            //            if ($(this).css("height") >= '100px') {
            //                $(this).css("max-height", '100px');
            //            }
        });

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }


        $(".entregar").live("click", function () {

            var idCama = $(this).attr("id").slice(3);
           // nuevo new STOCK: 100
            var idEntrega = parseInt($("#idCarga" + idCama).html());
            //var stockControl = parseInt($("#cbo" + idCama + " option:selected").html().substr($("#cbo" + idCama + " option:selected").html().length - 2), 2);
            var stockControl = $("#cbo" + idCama + " option:selected").html().substr($("#cbo" + idCama + " option:selected").html().indexOf("STOCK") + 7);
            //alert($("#cbo" + idCama + " option:selected").html().substr($("#cbo" + idCama + " option:selected").html().indexOf("STOCK") + 7));

            if (idEntrega == 0 && stockControl == 0) { alert("No hay stock de este control!"); return false; }

            if ($("#cbo" + idCama).val() == 0) { alert("seleccione un control!"); } else {
                //                alert($("#idCarga" + idCama).html());
                //alert(idCama);
                //                alert($("#cbo" + idCama).val());
                //                alert($("#obs" + idCama).html());

                var json = JSON.stringify({ "id": parseInt($("#idCarga" + idCama).html()), "camaId": parseInt(idCama), "controlId": parseInt($("#cbo" + idCama).val()),
                    "observacion": $("#obs" + idCama).html(), "afiliadoId": parseInt($("#idAfiliado" + idCama).html()), "servicio": $("#servicio" + idCama).html()
                });
                //console.log(json);
                $.ajax({
                    type: "POST",
                    url: "../Json/Internaciones/IntSSC.asmx/AdminitrarEntregasControles",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: json,
                    success: function (Resultado) {

                        if (Resultado.d == 0) {
                            $("#idCarga" + idCama).html(Resultado.d);
                            $("#cbo" + idCama).attr('disabled', false);
                            $("#btn" + idCama).html('Entregar');
                            $("#btn" + idCama).removeClass('btn-danger');
                            alert("Control Devuelto!.");

                            //  $.each($('#form1 :input'), function (index, item) { alert($(this).attr("disabled")); return false; });
                            //                            $("#form1").find(':input:disabled').each(function () {
                            //                                var elemento = this;
                            //                                alert(elemento.html());
                            //                                // if (elemento.type == "select-one" && elemento.is(':disabled')) { alert(); }
                            //                                //alert("elemento.id=" + elemento.id + ", elemento.value=" + elemento.value);
                            //                            });
                            //                            comboControl.length = 0;
                            //                            comboControl.push("<option value='0' >Seleccione</option>");
                            //                            comboControl.push("<option value='0'>TODOS</option>")
                            //                            $.each($(".controles"), function (index, item) {
                            //                                if (!$(this).attr("disabled")) {
                            //                                    //                                    var opcion = ($("option:selected", $(this)).html())

                            //                                    //                                    opcion = opcion.substr(0, opcion.indexOf("STOCK") - 1);
                            //                                    //                                    alert(opcion);
                            //                                    comboControl.push($(this));

                            //                                }
                            //                            });

                            //   $("#cboControl").html(comboControl);

                        } else if (Resultado.d > 0) {
                            $("#idCarga" + idCama).html(Resultado.d);
                            $("#cbo" + idCama).attr('disabled', true);
                            $("#btn" + idCama).html('Devolver');
                            $("#btn" + idCama).addClass('btn-danger');
                            alert("Control Entregado!.");

                            // agrego al combo de la busqueda el control que se esta entregando
                            var comboInsertar = $("#cbo" + idCama + " option:selected").html();
                            comboInsertar = comboInsertar.substr(0, comboInsertar.indexOf("STOCK") - 1);

                            console.log(($.inArray("<option value='" + $("#cbo" + idCama + " option:selected").val() + "'>" + comboInsertar.trim() + "</option>", comboControl)));
                            console.log(comboInsertar.trim());
                            if ($.inArray("<option value='" + $("#cbo" + idCama + " option:selected").val() + "'>" + comboInsertar + "</option>", comboControl) < 0) {
                                // alert();
                                comboControl.push("<option value='" + $("#cbo" + idCama + " option:selected").val() + "'>" + comboInsertar + "</option>");
                                $("#cboControl").empty();
                                $("#cboControl").html(comboControl);
                            }
                            // agrego al combo de la busqueda el control que se esta entregando

                        } else if (Resultado.d < 0) {
                            alert("El afliado ya no esta en esta cama y no se ha podido registrar la entrega \n Si fue dado de alta o cambiado de cama, la devolución del control se registró automáticamente \n No hay stock del control seleccionado \n Intenlo nuevamente si fue cambiado de cama.");
                        }

                        cargarintenraciones(0);
                    },
                    complete: function () {
                        // guardar = 0;

                    },
                    error: errores
                });
            }
        });


//        $('#form1 :input').live("change", function () {
//            cargarintenraciones(0);
        //        });

        $('.search').live("change", function () {
            cargarintenraciones(0);
        });

    </script>