<%@ Page Language="C#" AutoEventWireup="true" CodeFile="reporteCC.aspx.cs" Inherits="Informes_reporteCC" %>

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
<span class="titulo_seccion" style=" margin-left:40%; width:100%">Cuenta Corriente Afiliados</span>
  <div class="contenedor_1" style="width:95%; height:460px; margin-left:1%; margin-top:10px; padding-top:10px">

   <div class="contenedor_3" style="height:420px;width:98%">
        <div style="width:96%; height:80px;background-color:#EBEBEB; position:relative; margin-left:15px; padding:10px">
           
                                    <table style="width:100%"> 
                                    <tr>
                                    <td style="width:20%">
                                    <label for="txtAfiliado" style="display:inline; font-size: x-small">&nbsp;&nbsp;Afiliado</label>
                                    <input id="txtAfiliado" class="input-medium buscar" style="margin-left: 5px" type="text" />
                                    </td>
                                    <td style="width:20%"> 
                                    <label for="txtDoc" style="display:inline; font-size: x-small">&nbsp;&nbsp;Documento</label>
                                    <input id="txtDoc" type="text" class="input-small date numeroEntero buscar" style="margin-left: 5px; text-align:center" maxlength="8" />
                                    </td>
                                    <td>
                                    <label for="txtNhc" style="display:inline; font-size: x-small">NHC</label>
                                    <input id="txtNhc" type="text" class="input-small date buscar numeroEntero" style="margin-left:5px; text-align: center" maxlength="10" />
                                    </td>
                                    <td>
                                    <label for="cboSeccional"  style="display:inline; font-size: x-small">Seccional</label>
                                    <select id="cboSeccional" class="input-large buscar" style="margin-left: 5px;" ></select>
                                    </td>
                                    <td>
                                    <label for="cboUsuario"  style="display:inline; font-size: x-small">Usuario</label>
                                    <select id="cboUsuario" class="input-large buscar" style="margin-left: 5px;" ></select>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <label for="txtFechaHasta" class="control-label" style="display:inline; font-size: x-small">&nbsp;&nbsp;Deudas al</label>                                                                    
                                    <input id="txtFechaHasta" type="text" class="input-small date hasta1 fechaHoy buscar" style="margin-left: 5px;" maxlength="10" />
                                    </td>
                                    <td>
                                    <label style="display:inline; font-size: x-small">Deuda del día</label>
                                    <input id="txtDia" type="text" class="input-small date hasta1 buscar" style="margin-left: 5px;" maxlength="10" />
                                    </td>
                                    <td>
                                    <label for="txtMayores" class="control-label" style="display:inline; font-size: x-small">&nbsp;&nbsp;Deudas mayores a</label>
                                    <input id="txtMayores" type="text" class="input-small buscar numeroEntero " style="margin-left:5px" maxlength="10" />
                                    </td>
                                    <td>                                    
                                    <label style="display:inline; font-size: x-small">Deuda Total</label>
                                    <input id="txtTotales" type="text" class="input-medium" style="margin-left: 5px;" disabled="disabled"/>
<%--                                <label for="txtRemito1" style="display:inline; font-size: x-small">Nro Remito</label>
                                    <input id="txtRemitoL" type="text" class=" buscar" style="margin-left: 5px; width:10px;text-transform: uppercase" maxlength="1" />
                                    <input id="txtRemito1" type="text" class="date numeroEntero buscar" style="margin-left: 5px; width:35px" maxlength="4" />
                                    <input id="txtRemito2" type="text" class="date numeroEntero buscar" style="margin-left: 5px; width:65px" maxlength="8" />--%>
                                    </td>
                                    <td>
                                    </td>
                                    </tr>
                                    </table>
                     <div class="contenedor_3" style="width:100%; height:240px; overflow:hidden; margin-left:0px; margin-top:20px; padding-top:0px">

                <table class='table' style="margin-bottom:0px"><tr style='background-color:Black; color:white'>
                <td style='width:20%'><b>Afiliado</b></td>
                <td style='width:20%'><b>Documento</b></td>
                <td style='width:20%'><b>NHC</b></td>
                <td style='width:20%'><b>Seccional</b></td>
                <td style='width:20%'><b>Deuda</b></td>
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
        <a id="btnPdf" class="btn btn-info imprimir" onclick="javascript:buscar(0,1);"  style="display:none" data-tipo="1" ><i class=" icon-print"></i>&nbsp;Pdf</a>
        <a id="btnExcel" class="btn btn-info imprimir" onclick="javascript:buscar(0,0);"  style="display:none" data-tipo="0" ><i class=" icon-print"></i>&nbsp;Excel</a>
        <a id="btnBuscar" class="btn btn-info" onclick="javascript:buscar(1,0);" ><i class=" icon-search"></i>&nbsp;Buscar</a>
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
        $("#txtFechaHasta").change(function () { $("#txtDia").val(""); });
        $("#txtDia").change(function () { $("#txtFechaHasta").val(""); });

        $("#txtFacturaL").mask("a", { placeholder: "-" });
        $("#txtFactura1").mask("9999", { placeholder: "-" });
        $("#txtFactura2").mask("99999999", { placeholder: "-" });

        $("#txtRemitoL").mask("a", { placeholder: "-" });
        $("#txtRemito1").mask("9999", { placeholder: "-" });
        $("#txtRemito2").mask("99999999", { placeholder: "-" });

        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/Seccionales_Listas",
            contentType: "application/json; charset=utf-8",
            data: '{Todos: "' + false + '"}',
            dataType: "json",
            success: function (Resultado) {
                var Seccionales = Resultado.d;
                $('#cboSeccional').empty();
                $('#cboSeccional').append($('<option></option>').val("0").html("Todas"));
                $.each(Seccionales, function (index, seccionales) {
                    $('#cboSeccional').append($('<option></option>').val(seccionales.Nro).html(seccionales.Seccional));
                });
            }
        });

        $.ajax({
            type: "POST",
            url: "../Json/Usuarios/Usuarios.asmx/UsuariobyId",
            contentType: "application/json; charset=utf-8",
            data: '{Todos: "' + false + '"}',
            dataType: "json",
            success: function (Resultado) {
                var Seccionales = Resultado.d;
                $('#cboUsuario').empty();
                $('#cboUsuario').append($('<option></option>').val("0").html("Todos"));
                $.each(Seccionales, function (index, usuarios) {
                    $('#cboUsuario').append($('<option></option>').val(usuarios.id).html(usuarios.nombre));
                });
            },
            complete: function () { $("#btnBuscar").click(); }
        });

    });
    //var PDF;

    function buscar(T,PDF) {
//        var nroOrden;
//        if ($('#txtOrden').val().trim().length <= 0) { nroOrden = 0; } else { nroOrden = $('#txtOrden').val(); }


        //alert($("#txtRemitoL").val() + $("#txtRemito1").val() + $("#txtRemito2").val());
        var mayores;
        if ($('#txtMayores').val().trim().length <= 0) { mayores = 0; } else { mayores = $('#txtMayores').val(); }

        if (T == 1) {
            var json = JSON.stringify({ "mayores": mayores,
                "deudasAl": $('#txtFechaHasta').val(), "seccional": $('#cboSeccional').val(),
                "afiliado": $('#txtAfiliado').val(), "doc": $("#txtDoc").val(), "nhc": $("#txtNhc").val(), "dia": $("#txtDia").val(), "usuario": $("#cboUsuario").val()
            });
            //console.log(json);
            var lista
            var totales = 0;
            var Trecibida = 0;
            $.ajax({
                type: "POST",
                url: "../Json/Bonos/Bonos.asmx/CuentaCorrienteAfiliadosINFORME",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    lista = Resultado.d;
                    var encabezado = "<table class='table'><tr style='height:1px'>" +
                "<td style='width:20%'></td>" +
                "<td style='width:20%'></td>" +
                "<td style='width:20%'></td>" +
                "<td style='width:20%'></td>" +
                "<td style='width:20%'></td>";
                    var fila = "";
                    var pie = "</table>";
                    $.each(lista, function (index, item) {
                        fila = fila + "<tr><td style='width:6%; font-size:x-small'>" + item.afiliado + "</td>" +
                    "<td style='width:14%; font-size:x-small'>" + item.doc + "</td>" +
                    "<td style='width:8%; font-size:x-small'>" + item.nhc + "</td>" +
                    "<td style='width:10%; font-size:x-small'>" + item.seccNombre + "</td>" +
                    "<td style='width:6%; font-size:x-small'>$ " + (item.deuda).toFixed(2) + "</td>" +
                    "</tr>";

                        totales += item.deuda;
                    });

                    //                    $("#totalRecibida").val(Trecibida).simpleMoneyFormat(); ;
                    $("#txtTotales").val(totales.toFixed(2)).simpleMoneyFormat();
                    $("#txtTotales").val("$ " + $("#txtTotales").val().replace(".", ""));
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
		    'href': "../Impresiones/ReportesBonos/Cuenta_Corriente_Afiliados_INFORME.aspx?mayores=" + mayores  
             + "&hasta=" + $('#txtFechaHasta').val() + "&seccional=" + $('#cboSeccional').val() + "&afiliado=" + $('#txtAfiliado').val()
             + "&doc=" + $("#txtDoc").val()  + "&nhc=" + $("#txtNhc").val() + "&PDF=" + PDF + "&dia=" + $("#txtDia").val() + "&usuario=" + $("#cboUsuario").val(),
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

     //   PDF = $(this).data('tipo');

    });

    $("#txtDia").change(function () {
       if($(this).val().length < 10)
        { $("#txtDia").val(""); }
     });

     $("#txtDia").on('keydown', function (e) {

         if (e.keyCode != 8) { return false; }
     });

 //   parent.document.getElementById("DondeEstoy").innerHTML = "Informes > Informes Administrativos > Reportes de Bonos > <strong>Cuenta Corriente Afiliados</strong>";

</script>