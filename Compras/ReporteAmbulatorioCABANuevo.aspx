<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ReporteAmbulatorioCABANuevo.aspx.cs" Inherits="Compras_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>

<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<style type="text/css">
    div.dataTables_sort_wrapper{white-space:nowrap !important;}
    th{white-space:nowrap !important;}
    
    .radio-inline {
        position: relative;
        display: inline-block;
        padding-left: 20px;
        margin-bottom: 0;
        font-weight: 400;
        vertical-align: middle;
        cursor: pointer;
    }
</style>
</head>
<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:10px;padding-left:0%; width:100%; margin-left:2%; margin-top:2%">
<span class="titulo_seccion" style=" margin-left:40%; width:100%">Ambulatorio CABA</span>
  <div class="contenedor_1" style="width:95%; height:580px; margin-left:1%; margin-top:10px; padding-top:30px">

   <div class="contenedor_3" style="height:520px;width:98%">
        <div style="width:98%; height:155px;background-color:#EBEBEB; position:relative; margin-left:15px;">
           
                                    <table style="width:100%"> 
                                    <tr>
                                    <td>
                                    <label for="txtFechaDesde" class="control-label" style="display:inline">Desde</label>
                                    <input id="txtFechaDesde" type="text" class="input-small date desde1 fechaHoy buscar" style="margin-left:5px" maxlength="10" />
                                    </td>
                                    <td> 
                                    <label for="txtFechaHasta" class="control-label" style="display:inline">Hasta</label>                                                                    
                                    <input id="txtFechaHasta" type="text" class="input-small date hasta1 fechaHoy buscar" style="margin-left: 5px;" maxlength="10" />
                                    </td>
                                    <td>
                                    <label for="txtFechaHasta" style="display:inline">Paciente</label>
                                    <input id="txtAfiliado" type="text" class="input-large date buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <label for="txtFechaHasta" style="display:inline">Documento</label>
                                    <input id="txtDocumento" type="text" class="input-small date numeroEntero buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td>
                                    <label for="txtFechaHasta"  style="display:inline">NHC</label>
                                    <input id="txtNhc" type="text" class="input-small date numeroEntero buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td>
                                    <label for="txtFechaHasta"  style="display:inline">Seccional</label>
                                    <select id="txtSeccional" class="input-large buscar" style="margin-left: 5px;" ></select>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <label for="txtFechaHasta" style="display:inline">Nro. Pedido</label>
                                    <input id="txtPedido" type="text" class="input-small date numeroEntero buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td>
                                    <label for="txtFechaHasta" style="display:inline">Insumo</label>
                                    <input id="txtInsumo" type="text" class="input-large date buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td>
                                    <label for="txtFechaHasta" style="display:inline">Porcentaje Audit</label>
                                    <input id="txtPorcentaje" type="text" class="input-small date numeroEntero buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <label for="txtFechaHasta" style="display:inline">Gasto UOM</label>
                                    <input id="txtUom" type="text" class="Money buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td>
                                    <label for="txtFechaHasta" style="display:inline">Nro Remito</label>
                                    <input id="txtRemito" type="text" class="input-small date numeroEntero buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td><label style="display:inline">GastoUOM </label><input id="txtTotalUOM" type="text" class="input-medium" disabled="disabled"/>
                                    <label style="display:inline">Cantidad entregada </label><input id="txtTotalEntregada" type="text" class="input-medium" disabled="disabled"/></td>
                                    </tr>
                                    </table>
                     <div class="contenedor_3" style="width:100%; height:290px; overflow:auto; margin-left:0px">
                         <div id="resultado"></div>
        <div id="buscando" style="padding-left:48%; padding-top:5%; display:none">
        <img src="../img/esperar.gif" /><br />        Buscando...
        </div>
                     </div>         
           
          </div>
<div class="pie_gris">
    <div class="pull-right" style="height:90px;">
        <a id="btnVolver" class="btn" onclick="javascript:window.history.back();" ><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
        <a id="btnPdf" class="btn btn-info imprimir" onclick="javascript:buscar(1);"  style="display:none"><i class=" icon-print"></i>&nbsp;Imprimir</a>
        <a id="btnBuscar" class="btn btn-info" onclick="javascript:buscar(0);" ><i class=" icon-search"></i>&nbsp;Buscar</a>
<%--    <a id="btnExcel" class="btn btn-info imprimir"><i class=" icon-print"></i>&nbsp;Excel</a>--%>
    </div>
</div>
          </div>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>


        </div>
        <div class="clearfix"></div>


      </div>
    </div>
  

<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../js/dataTables.fixedHeader.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Informes Administrativos > Reportes de Compras > <strong> Ambulatorio CABA </strong>";

    $(document).ready(function () {

        //$(".Money").mask("", { placeholder: "0" });

        var json = JSON.stringify({ "tipo": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Informes.asmx/Traer_Seccionales_Especialidades",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {

                var list = resultado.d;

                $("#txtSeccional").append(new Option("Todas", 0));
                $.each(list, function (index, item) {
                    $("#txtSeccional").append(new Option(item.descripcion, item.id));
                });
            },
            error: errores
        });

        $(document).on("keydown", ".Money", function (e) {

            if ($(this).val().toString().indexOf(".", 0) > -1 && (e.keyCode == 190 || e.keyCode == 110)) { e.preventDefault(); }

            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 ||
                        (e.keyCode == 65 && e.ctrlKey === true) ||
                        (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }

            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
            if ($(this).val().toString().indexOf(".") > -1) {
                if ($(this).val().length >= ($(this).val().toString().indexOf(".", 0) + 3)) { e.preventDefault(); }
            }

        });

    });

//    $("#btnPdf").click(function () { alert(); buscar(); });

    function buscar(print) {
        var dni = 0;
        var nhc = 0;
        var pedido = 0;
        var insumo = 0;
        var pocentaje = 0;
        var uom = "0";
        var remito = 0;

                                                                                                               //$("#txtFechaDesde").val(""); $("#txtFechaHasta").val(""); $("#txtUom").val("");
        if ($("#txtDocumento").val().trim().length <= 0) { dni = 0; } else { dni = $("#txtDocumento").val().trim();   }
        if ($("#txtNhc").val().trim().length <= 0) { nhc = 0; } else { nhc = $("#txtNhc").val().trim();   }
        if ($("#txtPedido").val().trim().length <= 0) { pedido = 0; } else { pedido = $("#txtPedido").val().trim();  }
        if ($("#txtInsumo").val().trim().length <= 0) { insumo =" "; } else { insumo = $("#txtInsumo").val().trim(); }
        if ($("#txtPorcentaje").val().trim().length <= 0) { pocentaje = 0; } else { pocentaje = $("#txtPorcentaje").val().trim();   }
        if ($("#txtUom").val().trim().length <= 0) { uom = 0; }
        else {

            if ($("#txtUom").val().toString().indexOf(".", 0) + 1 == +$("#txtUom").val().toString().length - 1) { $("#txtUom").val($("#txtUom").val() + "0"); }
            if ($("#txtUom").val().toString().indexOf(".", 0) + 1 == +$("#txtUom").val().toString().length) { $("#txtUom").val($("#txtUom").val() + "00"); } //completa cuando el ultimo caracter es un punto
            if ($("#txtUom").val().toString().indexOf(".", 0) <= -1) { $("#txtUom").val($("#txtUom").val() + ".00"); } //completa cuando no ponen punto

            uom = $("#txtUom").val().trim(); uom = uom.replace(".", "");
        }
        if ($("#txtRemito").val().trim().length <= 0) { remito = 0; } else { remito = $("#txtRemito").val().trim();  } // reemplaza el punto para formatear el envio al sp

        if (print == 1) {
            imprimir("../Impresiones/Compras/ReporteAmbulatorioCABANuevo.aspx?desde=" + $("#txtFechaDesde").val() + "&hasta=" + $("#txtFechaHasta").val() + "&afiliado=" + $("#txtAfiliado").val() + " " + "&dni=" + dni + "&nhc=" + nhc + "&seccional=" + $("#txtSeccional").val() + "&pedido=" + pedido + "&insumo=" + insumo + "&porcentajeAudita=" + pocentaje + "&gastoUOM=" + uom + "&remito=" + remito, 0);
        } else {
            $("#resultado").hide();
            $("#buscando").show();
            var json = JSON.stringify({ "desde": $("#txtFechaDesde").val(), "hasta": $("#txtFechaHasta").val(), "afiliado": $("#txtAfiliado").val(), "dni": dni, "nhc": nhc, "seccional": $("#txtSeccional").val(), "pedido": pedido, "insumo": insumo, "pocentaje": pocentaje, "gastoUOM": uom, "remito": remito });
            var lista;
            var txtTotalUOM = 0;
            var txtTotalEntregada = 0;
            $.ajax({
                type: "POST",
                url: "../Json/reportesCompras.asmx/ReporteAmbulatorioCABANuevo",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    lista = Resultado.d;
                    var encabezado = "<table class='table table-hover'><tr style='background-color:#CCCCCC'>" +
                "<td><b>Fecha Pedido</b></td>" +
                "<td><b>Paciente</b></td>" +
                "<td><b>Documento</b></td>" +
                "<td><b>NHC</b></td>" +
                "<td><b>Seccional</b></td>" +
                "<td><b>Nro Pedido</b></td>" +
                "<td><b>Insumo</b></td>" +
                "<td><b>Porcentaje Audit</b></td>" +
                "<td><b>Cantidad Pedida</b></td>" +
                "<td><b>Cantidad Entregada</b></td>" +
                "<td><b>Gasto UOM</b></td>" +
                "<td><b>Nro Remito</b></td>" +
                "<td><b>Depósito</b></td></tr>";

                    var fila = "";
                    var pie = "</table>";
                    $.each(lista, function (index, item) {
                        fila = fila + "<tr><td>" + item.fechaPedido + "</td>" +
                    "<td>" + item.afiliado + "</td>" +
                    "<td>" + item.dni + "</td>" +
                    "<td>" + item.nhc + "</td>" +
                    "<td>" + item.seccional + "</td>" +
                    "<td>" + item.pedido + "</td>" +
                    "<td>" + item.insumo + "</td>" +
                    "<td>" + item.pocentaje + "</td>" +
                    "<td>" + item.cantidadPedida + "</td>" +
                    "<td>" + item.cantidadEntregada + "</td>" +
                    "<td>" + item.gatoUOM + "</td>" +
                    "<td>" + item.remito + "</td>" +
                    "<td>" + item.deposito + "</td></tr>";
                        txtTotalEntregada += item.cantidadEntregada;
                        txtTotalUOM += item.gatoUOM;

                    });

                    $("#resultado").html(encabezado + fila + pie);
                },
                complete: function () {
                    if (lista.length > 0) { $("#btnPdf").show(); }
                    $("#buscando").hide();
                    $("#resultado").show();

                    $("#txtTotalEntregada").val(txtTotalEntregada);
                    $("#txtTotalUOM").val(txtTotalUOM.toFixed(2));
                },
                error: errores
            });
            
        }
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    $(".buscar").on('keydown', function (e) { if (e.keyCode == 13) { buscar(); } });

    

</script> 
</body>
</html>
