<%@ Page Language="C#" AutoEventWireup="true" CodeFile="abmControles.aspx.cs" Inherits="AtInternados_abmControles" %>

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

    <script type="text/javascript"> parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Administrar Controles</strong>"; </script>

    <form id="form1" runat="server">
    <div class="container" style="padding-top:2%; margin-left:15%; margin-top:4%">
    <span class=" TituloLasNovedades" style=" width:100%; text-align:center; margin-left:40%; top:200px">ADMINISTRAR CONTROLES</span>
    <div class="contenedor_4" style="width:1100px; height:470px ;padding:10px; margin-left:0px">
    <div class="contenedor_3" style="padding:0px; height:100%; width:98%">

    <input id="afiliadoId" type="hidden"/>


    <div style="height:420px">

    
    <div style="height:100%; overflow:auto">
         
    <div id="resumen">
    <table class='table' style=" margin-bottom:0px" id="internaciones">
    <tr style='background-color:black; color:white'>
    <td style='width:10%'>Marca</td>
    <td style='width:5%'>Modelo</td>
    <td style='width:5%'>Stock</td>
    <td style='width:10%'>Disponibles</td>
    <td style='width:15%'>Observacion</td>
    <td style='width:5%'>Historial</td>
    <td style='width:10%'>Estado</td></tr>
    </table>



    </div>
        <div id="SpanCargando" style=" margin-left:50%; margin-top:20%"><img src="../img/Espere.gif" /> <br /> Cargando...</div>
    </div>

    </div>
    <div class="pie_gris">
    
    <input id="txtMarca"   type="text"  class="pull-righ limpiar" placeholder="Marca"/>
    <input id="txtModelo" type="text" class="pull-righ limpiar" placeholder="Modelo"/>
    <input id="txtCantidad"   type="number"  class="pull-righ input-mini limpiar" placeholder="Stock"/>
    <input id="txtObs" type="text" class="pull-righ limpiar" placeholder="Observacion"/>
    <a id="btncancelar" class="btn btn-danger pull-right" >Cancelar</a>
    <a id="btnGuardar" class="btn btn-info pull-right" >Guardar</a>
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
    <script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>

    <script type="text/javascript">
    var idControl = 0;
    $(document).ready(function () {
        $("#SpanCargando").show();
        $("#internaciones").hide();
        cargarControles();
    });


        function cargarControles() {
            var json = JSON.stringify({ "activo": 1 });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/TraerControles",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                beforesend: function () {
                    $("#SpanCargando").show();
                    $("#internaciones").hide();
                },
                success: function (Resultado) {
                    var encabezado = "<table class='table' style='margin-bottom:0px'>" +
    "<tr style='background-color:black; color:white'>" +
    "<td style='width:10%'>Marca</td>" +
    "<td style='width:10%'>Modelo</td>" +
    "<td style='width:5%'>Stock</td>" +
    "<td style='width:5%'>Disponibles</td>" +
    "<td style='width:20%'>Observaciones</td>" +
    "<td style='width:5%'>Historial</td>" +
    "<td style='width:5%'>Estado</td></tr>";
                    var fila = "";
                    var pie = "</table>";
                    var FechaEntrega;
                    var combo;
                    var boton;
                    var deshabilitar;
                    var selected;

                    $.each(Resultado.d, function (index, item) {
                       // alert(item.activo);

                        if (item.activo) {
                            boton = "<a id='btn" + item.id + "' class='btn btn-danger btn-success estado' data-id='"+ item.id +"' data-estado='"+ item.activo +"'>Activo</a>";
                        } else { boton = "<a id='btn" + item.id + "' class='btn btn-danger estado' data-id='" + item.id + "' data-estado='" + item.activo + "'>baja</a>"; }



                        fila = fila + "<tr style='cursor:pointer'>" +
                        "<td class='seleccionar' id='marca" + item.id + "' data-id='" + item.id + "' >" + item.marca + "</td>" +
                        "<td class='seleccionar' id='modelo" + item.id + "' data-id='" + item.id + "' >" + item.modelo + "</td>" +
                        "<td class='seleccionar' id='stock" + item.id + "' data-id='" + item.id + "' >" + item.stock + "</td>" +// inicial
                        "<td class='seleccionar' id='disponible" + item.id + "' data-id='" + item.id + "' >" + item.disponibles + "</td>" +
                        "<td class='seleccionar' id='obs" + item.id + "' data-id='" + item.id + "' >" + item.observacion + "</td>" +
                        "<td class='' id='historial" + item.id + "' data-id='" + item.id + "' ><a data-id='" + item.id + "' id='btn" + item.id + "' class='btn historial' >Ver</a></td>" + // historial
                        "<td >"+ boton +"</td></tr>";

                    });

                    $("#internaciones").html(encabezado + fila + pie);
                    $("#SpanCargando").hide();
                    $("#internaciones").show();
                },
                error: errores
            });
        }

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }

        $(".seleccionar").live("click", function () {
              idControl = $(this).data('id');
          //  alert(id);
            $("#txtMarca").val($("#marca" + idControl).html());
            $("#txtModelo").val($("#modelo" + idControl).html());
            $("#txtCantidad").val($("#stock" + idControl).html());
            $("#txtObs").val($("#obs" + idControl).html());

        });

          $("#btncancelar").click( function () {
              idControl = 0;
            $("#txtMarca").val("");
            $("#txtModelo").val("");
            $("#txtCantidad").val("");
            $("#txtObs").val("");
        });

        $("#btnGuardar").click(function () {

            if ($("#txtCantidad").val() < 0 && idControl == 0) {
                alert("No puede dar de alta un control con stock negativo!");
                limpiar();
                return false;
            }

            if ($("#txtCantidad").val() == 0) { alert("Ingrese una cantidad"); limpiar(); return false; }

            if ($("#txtMarca").val().trim().length <= 0 || $("#txtModelo").val().trim().length <= 0 || $("#txtCantidad").val().trim().length <= 0) {
                alert("Cargue: Marca, Modelo y Cantidad!"); limpiar(); return false;
            }


            if ($("#txtCantidad").val() < 0 && idControl > 0) {
                var respuesta = prompt("Motivo de reducción de stock?");

                if (parseInt($("#stock" + idControl).html()) + parseInt($("#txtCantidad").val()) <= 0) {
                    if (respuesta.length > 0) { alert("No se puede ingrear stock menor o igual a 0"); limpiar(); }
                    else { alert("Ingrese un Motivo de reducción de stock?"); limpiar(); return false; }
                    return false;
                }

                if (respuesta.length > 0) {
                    var json = JSON.stringify({ "idControl": idControl, "cantidad": $("#txtCantidad").val(), "observacion": respuesta });
                    $.ajax({
                        type: "POST",
                        url: "../Json/Internaciones/IntSSC.asmx/InsertarLogDescontarStock",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: json,
                        success: function (Resultado) { guardar(); },
                        error: errores
                    });
                }
                return false;
            }

            guardar();

        });


        function guardar() {
            var json = JSON.stringify({ "id": idControl, "marca": $("#txtMarca").val(), "modelo": $("#txtModelo").val(), "cantidad": $("#txtCantidad").val(), "observacion": $("#txtObs").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/InsertarControl",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                success: function (Resultado) {
                    //alert(Resultado.d);
                    if (Resultado.d < 0) { alert("No se puede descontar esa cantidad ya que la resultante seria menor a la cantidad de controles distribuidos."); }
                    if (Resultado.d == 0) { alert("Controles Actualizados"); }

                    idControl = 0;
                    $("#btncancelar").click();
                    limpiar();
                    cargarControles();
                },
                error: errores
            });
        }


        $(".historial").live("click", function () {

            var ruta = "../Impresiones/ImpresionHistorialEntregas.aspx?id=" + $(this).data('id');
            imprimir(ruta, 0);
        });

        $(".estado").live("click", function () {

            var estado = $(this).data('estado');
            //            alert(estado);
            //            return false;

            var idEditar = $(this).data('id');
            // alert(idControl);
            var json = JSON.stringify({ "id": idEditar });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/ActualizarEstadoControl",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: json,
                success: function (Resultado) {
                    if (estado == true) {
                        $(this).removeClass('btn-success');
                        $(this).addClass('btn-danger');
                    } else {
                        $(this).removeClass('btn-danger');
                        $(this).addClass('btn-success');
                    }
                    cargarControles();
                },
                error: errores
            });
        });

        function limpiar() {
            $(".limpiar").val("");
            idControl = 0;
        }

    </script>

    