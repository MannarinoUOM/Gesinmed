<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GastosAdministraciónInternacion.aspx.cs" Inherits="Compras_GastosAdministraciónInternacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
<link href="../css/fixedHeader.dataTables.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
<div class="container" style="padding-top:10px;padding-left:0%; width:100%; margin-left:2%; margin-top:2%">
<span class="titulo_seccion" style=" margin-left:33%; width:100%">Gastos de Administración e Internación</span>
  <div class="contenedor_1" style="width:95%; height:460px; margin-left:1%; margin-top:10px; padding-top:10px">

   <div class="contenedor_3" style="height:420px;width:98%">
        <div style="width:96%; height:80px;background-color:#EBEBEB; position:relative; margin-left:15px; padding:10px">
           
                                    <table style="width:100%"> 
                                    <tr>
                                    <td style="width:17%">
                                    <label for="txtFechaDesde" class="control-label" style="display:inline; font-size: x-small">&nbsp;&nbsp;Desde</label>
                                    <input id="txtFechaDesde" type="text" class="input-small date desde1 fechaHoy buscar" style="margin-left:5px" maxlength="10" />
                                    </td>
                                    <td style="width:17%"> 
                                    <label for="txtFechaHasta" class="control-label" style="display:inline; font-size: x-small">&nbsp;&nbsp;Hasta</label>                                                                    
                                    <input id="txtFechaHasta" type="text" class="input-small date hasta1 fechaHoy buscar" style="margin-left: 5px;" maxlength="10" />
                                    </td>
                                    <td>
                                    <label for="cboProveedor"  style="display:inline; font-size: x-small">Proveedor</label>
                                    <select id="cboProveedor" class="input-large buscar" style="margin-left: 5px;" ></select>
                                    </td>
                                    <td>
                                    <label for="txtFacturaL" style="display:inline; font-size: x-small">Nro Factura</label>
                                    <input id="txtFacturaL" type="text" class=" buscar" style="margin-left: 5px; width:10px;text-transform: uppercase" maxlength="1" />
                                    <input id="txtFactura1" type="text" class="date numeroEntero buscar" style="margin-left: 5px; width:35px" maxlength="4" />
                                    <input id="txtFactura2" type="text" class="date numeroEntero buscar" style="margin-left: 5px; width:65px" maxlength="8" />
                                    </td>
                                    <td>
                                    <label style="display:inline; font-size: x-small">Total C. Recibida</label>
                                    <input id="totalRecibida" type="text" class="input-small date" style="margin-left: 5px;" disabled="disabled"/>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <label for="cboTipo" style="display:inline; font-size: x-small">&nbsp;&nbsp;Tipo O. Compra</label>
                                    <select id="cboTipo" class="input-medium date buscar" style="margin-left: 5px; width:80px">
                                    <option value="0">Todos</option>
                                    <option value="1">A</option>
                                    <option value="2">I</option>
                                    </select>
                                    </td>
                                    <td>
                                    <label for="txtOrden" style="display:inline; font-size: x-small">&nbsp;&nbsp;Nº O. Compra</label>
                                    <input id="txtOrden" type="text" class="input-small date numeroEntero buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td>
                                    <label for="txtInsumo" style="display:inline; font-size: x-small">Insumo</label>
                                    <input id="txtInsumo" type="text" class="input-large date buscar" style="margin-left: 5px;" maxlength="20" />
                                    </td>
                                    <td>
                                    <label for="txtRemito1" style="display:inline; font-size: x-small">Nro Remito</label>
                                    <input id="txtRemitoL" type="text" class=" buscar" style="margin-left: 5px; width:10px;text-transform: uppercase" maxlength="1" />
                                    <input id="txtRemito1" type="text" class="date numeroEntero buscar" style="margin-left: 5px; width:35px" maxlength="4" />
                                    <input id="txtRemito2" type="text" class="date numeroEntero buscar" style="margin-left: 5px; width:65px" maxlength="8" />
                                    </td>
                                    <td>
                                    <label style="display:inline; font-size: x-small">Totales</label>
                                    <input id="txtTotales" type="text" class="input-medium" style="margin-left: 5px;" disabled="disabled"/>
                                    </td>
                                    </tr>
                                    </table>
                     <div class="contenedor_3" style="width:100%; height:255px; overflow:hidden; margin-left:0px; margin-top:20px; padding-top:0px">

                <table class='table' style="margin-bottom:0px"><tr style='background-color:Black; color:white'>
                <td style='width:6%'><b>Fecha</b></td>
                <td style='width:14%'><b>Insumo</b></td>
                <td style='width:8%'><b>Precio Compra<br/>(x Unidad)</b></td>
                <td style='width:6%'><b>Total</b></td>
                <td style='width:10%'><b>Proveedor</b></td>
                <td style='width:8%'><b>Cantidad<br/>Pedida</b></td>
                <td style='width:8%'><b>Cantidad<br/>Recibida</b></td>
<%--                <td style='width:8%'><b>Cantidad<br/>Pendiente</b></td>--%>
                <td style='width:8%'><b>Tipo O. <br/>Compra</b></td>
                <td style='width:8%'><b>Nº O. <br/>Compra</b></td>
                <td style='width:10%'><b>N° Remito</b></td>
                <td style='width:10%'><b>N° Factura</b></td>
                <td style='width:1%'></td>
                </tr></table>
                         <div  style="width:100%; height:200px; overflow:auto; margin-left:0px; margin-top:0px">
                         <div id="resultado">
                         </div>
        <div id="buscando" style="padding-left:48%; padding-top:2%; display:none">
        <img src="../img/esperar.gif" /><br />        Buscando...
        </div>
        <h4 id="sinResultado" style="text-align:center; margin-top:5%; display:none">NO SE ENCONTRARON RESULTADOS CON LOS PARAMETROS INGRESADOS</h4>
                         </div>
                     </div>         
           
          </div>
<div class="pie_gris">
    <div class="pull-right" style="height:80px; padding-top:1px">
        <a id="btnVolver" class="btn" onclick="javascript:window.history.back();" ><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
        <a id="btnPdf" class="btn btn-info imprimir" onclick="javascript:buscar(1,1);"  style="display:none" data-tipo="1" ><i class=" icon-print"></i>&nbsp;Pdf</a>
        <a id="btnExcel" class="btn btn-info imprimir" onclick="javascript:buscar(1,0);"  style="display:none" data-tipo="0" ><i class=" icon-print"></i>&nbsp;Excel</a>
        <a id="btnBuscar" class="btn btn-info" onclick="javascript:buscar(0,0);" ><i class=" icon-search"></i>&nbsp;Buscar</a>
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
    </form>
</body>
</html>
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
<script src="../js/simple.money.format.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {


        $("#txtFacturaL").mask("a", { placeholder: "-" });
        $("#txtFactura1").mask("9999", { placeholder: "-" });
        $("#txtFactura2").mask("99999999", { placeholder: "-" });

        $("#txtRemitoL").mask("a", { placeholder: "-" });
        $("#txtRemito1").mask("9999", { placeholder: "-" });
        $("#txtRemito2").mask("99999999", { placeholder: "-" });

        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
            contentType: "application/json; charset=utf-8",
            data: '{Todos: "' + false + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#cboProveedor").append(new Option("Todos", 0));

                $.each(lista, function (index, item) {
                    $("#cboProveedor").append(new Option(item.Nombre, item.Id));
                });
            }
        });
    });
    var PDF;

    function buscar(T,I) {
        var nroOrden;
        if ($('#txtOrden').val().trim().length <= 0) { nroOrden = 0; } else { nroOrden = $('#txtOrden').val(); }


        //alert($("#txtRemitoL").val() + $("#txtRemito1").val() + $("#txtRemito2").val());
        if (T == 0) {
            var json = JSON.stringify({ "desde": $('#txtFechaDesde').val(),
                "hasta": $('#txtFechaHasta').val(), "proveedor": $('#cboProveedor').val(),
                "tipoOrden": $('#cboTipo').val(), "nroOrden": nroOrden, "insumo": $("#txtInsumo").val(),
                "remito": $("#txtRemitoL").val() + $("#txtRemito1").val() + $("#txtRemito2").val(), 
              "factura": $("#txtFacturaL").val() + $("#txtFactura1").val() + $("#txtFactura2").val() });
            //console.log(json);
            var lista
            var totales = 0;
            var Trecibida = 0;
            $.ajax({
                type: "POST",
                url: "../Json/reportesCompras.asmx/GastosAdministraciónInternacion",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    lista = Resultado.d;
                    var encabezado = "<table class='table'><tr style='height:1px'>" +
                "<td style='width:6%'></td>" +
                "<td style='width:14%'></td>" +
                "<td style='width:8%'></td>" +
                "<td style='width:6%'></td>" +
                "<td style='width:10%'></td>" +
                "<td style='width:8%'></td>" +
                "<td style='width:8%'></td>" +
                    //"<td style='width:8%'></td>" +
                "<td style='width:8%'></td>" +
                "<td style='width:8%'></td>" +
                "<td style='width:10%'></td>" +
                "<td style='width:10%'></tr>";
                    var fila = "";
                    var pie = "</table>";
                    $.each(lista, function (index, item) {
                        fila = fila + "<tr><td style='width:6%; font-size:x-small'>" + item.FECHA + "</td>" +
                    "<td style='width:14%; font-size:x-small'>" + item.INSUMO + "</td>" +
                    "<td style='width:8%; font-size:x-small'>$ " + item.PRECIO + "</td>" +
                    "<td style='width:6%; font-size:x-small'>$ " + (item.PRECIO * item.RECIBIDA).toFixed(2) + "</td>" +
                    "<td style='width:10%; font-size:x-small'>" + item.PROVEEDOR + "</td>" +
                    "<td style='width:8%; font-size:x-small'>" + item.PEDIDA + "</td>" +
                    "<td style='width:8%; font-size:x-small'>" + item.RECIBIDA + "</td>" +
                        //                    "<td>" + item.PENDIENTE + "</td>" +
                    "<td style='width:8%; font-size:x-small'>" + item.TIPO_ORDEN + "</td>" +
                    "<td style='width:8%; font-size:x-small'>" + item.NUMERO_ORDEN_COMPRA + "</td>" +
                    "<td style='width:10%; font-size:x-small'>" + item.REMITO + "</td>" +
                    "<td style='width:10%; font-size:x-small'>" + item.FACTURA + "</td>" +
                    "</tr>";

                        Trecibida += item.RECIBIDA;
                        totales += item.PRECIO * item.RECIBIDA;
                    });

                    $("#totalRecibida").val(Trecibida).simpleMoneyFormat(); ;
                    $("#txtTotales").val(totales.toFixed(2)).simpleMoneyFormat();
                    $("#txtTotales").val("$ " + $("#txtTotales").val().replace(".",""));
                    $("#resultado").html(encabezado + fila + pie);
                },
                beforeSend: function () { $("#sinResultado").hide(); $("#buscando").show(); $("#resultado").hide(); },
                complete: function () { if (lista.length > 0) { $("#sinResultado").hide(); $("#buscando").hide(); $("#resultado").show(); $("#btnPdf").show(); $("#btnExcel").show(); } else { $("#sinResultado").show(); $("#buscando").hide(); $("#btnPdf").hide(); $("#btnExcel").hide(); } },
                error: errores
            });
        } else {
            $.fancybox(
		{
		    'autoDimensions': false,
		    'href': "../Impresiones/ReportesCompras/GastosAdministraciónInternacion.aspx?desde=" + $("#txtFechaDesde").val()
             + "&hasta=" + $("#txtFechaHasta").val() + "&prv=" + $("#cboProveedor").val() + "&tipo=" + $("#cboTipo").val()
             + "&orden=" + nroOrden + "&insumo=" + $("#txtInsumo").val() 
             + "&remito=" + $("#txtRemitoL").val() + $("#txtRemito1").val() + $("#txtRemito2").val() 
             + "&factura=" + $("#txtFacturaL").val() + $("#txtFactura1").val() + $("#txtFactura2").val() + "&PDF=" + I,
		    'width': '90%',
		    'height': '90%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {

		    }
		});
        }
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    $(".buscar").keypress(function (e) { if (e.keyCode == 13) { $("#btnBuscar").click(); } });

    $(".imprimir").click(function () {

        PDF = $(this).data('tipo');

    });

    parent.document.getElementById("DondeEstoy").innerHTML = "Informes > Informes Administrativos > Reportes de Compras > <strong>Gastos de Administración e Internación</strong>";

</script>