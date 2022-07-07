<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Internacion_GastosExtra_Buscar.aspx.cs" Inherits="Compras_Internacion_GastosExtra_Buscar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Gestión Hospitalaria</title>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
    <style>
        .dropdown-menu { max-height: 250px; max-width: 100%; overflow-y: auto; overflow-x: hidden; }
        .dropdown-menu > li a { color: #333333 !important; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important; background-color: #f8f9fa;}
    </style>
</head>
<body class="bg-light">
    <div id="header" class="container">
        <h1>Compras - Buscar - Gastos Extraordinarios</h1>
    </div>
    
    <!-- Encabezado con datos del paciente -->
    <div class="container">

      <!-- Comienza carga de detalles -->

      <div class="row my-4">
          <div class="col-md-xs-12 col-md-3 col-md-lg-3 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">N° Pedido</span>
                </div>
                <input id="txtNroPed" type="text" class="form-control numero" maxlength="8" placeholder="Ingrese N° Pedido"/>
          </div>
          <div class="col-md-xs-12 col-md-3 col-md-lg-3 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">NHC</span>
            </div>
            <input id="txtNHC" type="text" class="form-control numero" maxlength="12" placeholder="Ej. 999988998"/>
        </div>
        <div class="col-md-xs-12 col-md-6 col-md-lg-6 input-group">
            <div class="input-group-prepend">
                <label class="input-group-text" for="cboSeccional">Seccional</label>
            </div>
            <select id="cboSeccional" class="custom-select">
            </select>
        </div>
      </div>
      <div class="row my-4">
            <div class="col-md-xs-12 col-md-6 col-md-lg-6 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Paciente</span>
                </div>
                <input id="txtNombre" type="text" class="form-control" maxlength="30" placeholder="Ingrese Nombre"/>
            </div> 
            <div class="col-md-xs-12 col-md-3 col-md-lg-3 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Desde</span>
                </div>
                <input id="desde" type="text" class="form-control date"/>
            </div>
            <div class="col-md-xs-12 col-md-3 col-md-lg-3 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Hasta</span>
                </div>
                <input id="hasta" type="text" class="form-control date"/>
            </div>
      </div>
      <div class="row my-4">
        <div class="col-md-xs-12 col-md-12 col-md-lg-12 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Insumo</span>
                </div>
                <input id="cbo_Medicamento" type="text" class="form-control" maxlength="60" data-provide="typeahead" autocomplete="off"/>
                <div id="Medicamento_val" style="display:none;">0</div>
                <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
        </div>
      </div>
        <!--Tabla de insumos-->
        <div class="table-responsive" style="overflow: auto; max-height: 310px;">
            
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">N° Pedido</th>
                        <th scope="col">Fecha Factura</th>
                        <th scope="col">NHC</th>
                        <th scope="col">Seccional</th>
                        <th scope="col">Paciente</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Insumo</th>
                        <th scope="col">Observaciones</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Presupuestado($)</th>
                        <th scope="col">Facturado($)</th>
                    </tr>
                </thead>
                <tfoot class="thead-dark">
                        <th scope="col" class="font-weight-bold">Total General</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" id="total_gral_cantidad" class="text-right">0</th>
                        <th id="total_gral_presupuestado" scope="col" class="text-right font-weight-bold">$0.00</th>
                        <th id="total_gral_facturado" scope="col" class="text-right font-weight-bold">$0.00</th>
                </tfoot>
                <tbody id="contenido_table" class="bg-light">
                </tbody>
            </table>
        </div>
    <div class="row my-auto">
        <div class="col-md-xs-4 col-md-2 offset-md-6">
            <button id="btnBuscar" class="btn btn-info">Buscar</button>
        </div>
        <div class="col-md-xs-4 col-md-2">
            <button type="button" id="btnExcel" class="btn btn-secondary">Excel</button>
        </div>
        <div class="col-md-xs-4 col-md-2">
            <button id="btnCargar" class="btn btn-success">Cargar Gasto</button>
        </div>
    </div>
</div>
<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        InitControls();
    });

    function InitControls() {
        Cargar_Seccionales();
        List_Insumos(false);
        $("#desde").mask("99/99/9999", { placeholder: "-" });
        $("#hasta").mask("99/99/9999", { placeholder: "-" });
        var currentDt = new Date();
        var mm = currentDt.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;
        var yyyy = currentDt.getFullYear();
        var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
        var d = dia + '/' + mm + '/' + yyyy;
        var p = '01' + '/' + mm + '/' + yyyy;
        $("#desde").val(p);
        $("#hasta").val(d);
    }

    $(".numero").on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(function () {
        $("#desde").datepicker({
            onClose: function (selectedDate) {
                $("#hasta").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#hasta").datepicker({
            onClose: function (selectedDate) {
                $("#desde").datepicker("option", "maxDate", selectedDate);
            }
        });
    });

    $("#txtNroPed").keypress(function (event) {
        if (event.which == 13) {
            if ($('#txtNroPed').attr('readonly') == undefined) {
                $("#btnBuscar").click();
            }
        }
    });

    $("#btnCargar").click(function () {
        window.location = "Internacion_GastosExtra.aspx";
    });

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    //Buscar los detalles de los gastos cargados

    $("#btnBuscar").click(function () {
        Buscar_Pedidos();
    });


    //Buscar pedidos, misma busqueda para generar el Excel...

    function Buscar_Pedidos() {
        CAB_ID = ($('#txtNroPed').val().trim().length == 0) ? 0 : $('#txtNroPed').val();
        Desde = ($('#desde').val().trim().length == 0) ? '01/01/1900' : $('#desde').val();
        Hasta = ($('#hasta').val().trim().length == 0) ? '01/01/1900' : $('#hasta').val();


        var json = JSON.stringify({ "COM_GASTOS_EXT_CAB_ID": CAB_ID, "Paciente": $('#txtNombre').val(), "NHC": $('#txtNHC').val(),
            "Desde": Desde, "Hasta": Hasta, "Seccional": $('#cboSeccional :selected').val(), "Insumo": $('#cbo_Medicamento').val().trim()
        });
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/COM_GASTOS_EXT_CAB_BUSCAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Pedidos_Cargados,
            error: errores
        });
    }

    function Pedidos_Cargados(Resultado) {
        $("#contenido_table").empty();
        var Pedidos = Resultado.d;
        var Tabla_Datos = "";
        tp = 0;
        tf = 0;
        cantidad = 0;
        $.each(Pedidos, function (index, Pedido) {
            $("#contenido_table").append("<tr style='cursor:pointer' onclick=Ventana('Internacion_GastosExtra.aspx?PedidoId=" + Pedido.COM_GASTOS_EXT_CAB_ID + "');><td>" + Pedido.COM_GASTOS_EXT_CAB_ID + "</td><td>" + Pedido.COM_GASTOS_EXT_DET_FECHA_FACT + "</td><td>" + Pedido.NHC + "</td><td>" + Pedido.Seccional + "</td><td>" + Pedido.Paciente + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.COM_INS_GASTOS_EXT_DESC + "</td><td class='text-right'>" + Pedido.COM_GASTOS_OBSERVACIONES + "</td><td class='text-right'>" + Pedido.COM_GASTOS_EXT_DET_CANTIDAD + "</td><td class='text-right'>$" + Pedido.COM_GASTOS_EXT_DET_PRECIO_PRESU + "</td><td class='text-right'>$" + Pedido.COM_GASTOS_EXT_DET_PRECIO_FACT + "</td></tr>");
            tp += Pedido.COM_GASTOS_EXT_DET_PRECIO_PRESU;
            tf += Pedido.COM_GASTOS_EXT_DET_PRECIO_FACT;
            cantidad += Pedido.COM_GASTOS_EXT_DET_CANTIDAD;
        });


        //Sumo totales y muestro al pie de la tabla
        $("#total_gral_cantidad").html(cantidad);
        $("#total_gral_presupuestado").html("$"+ tp);
        $("#total_gral_facturado").html("$" + tf);

    }

    function Ventana(url) {
        document.location = url;
    }


    function Cargar_Seccionales() {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/Seccionales_Listas",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Seccionales = Resultado.d;
                $('#cboSeccional').empty();
                $('#cboSeccional').append($('<option></option>').val("").html("TODAS"));
                $.each(Seccionales, function (index, seccionales) {
                    $('#cboSeccional').append($('<option></option>').val(seccionales.Nro).html(seccionales.Seccional));
                });
            },
            error: errores
        });
    }

    //VARIABLES GLOBALES//
    var sourceArr = [];
    var mapped = {};

    $("#cbo_Medicamento").typeahead({
        source: sourceArr,
        updater: function (selection) {
            $("#txt_Medicamento").val(selection); //nom
            $("#Medicamento_val").html(mapped[selection]); //id
            return selection;
        },
        minLength: 0,
        items: 10
    });

    function List_Insumos(Todos) {
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/COMPRAS_INSUMOS_INTERNACION_EXTRAORD",
            data: '{Todos: "' + Todos + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Medicamentos = Resultado.d;
                $.each(Medicamentos, function (i, item) {
                    if (i == 0) {
                        sourceArr.length = 0;
                    }
                    str = Medicamentos[i].COM_INS_GATOS_EXT_DESC;
                    mapped[str] = item.COM_INS_GASTOS_EXT_ID;
                    sourceArr.push(str);
                });
            },
            error: errores
        });
    }


    //Muestro report sin renderizar a pdf para bajar a Excel...
    $("#btnExcel").click(function () {
        NroPedido = $("#txtNroPed").val().trim().length == 0 ? 0 : $("#txtNroPed").val().trim();
        Seccional = ($("#cboSeccional :selected").val() == "") ? 0 : $("#cboSeccional :selected").val();

        //alert("../Impresiones/Compras/Internacion_GastosExtraBuscarExcel.aspx?Id=" + NroPedido + "&Paciente=" + $("#txtNombre").val().trim() + "&NHC=" + $("#txtNHC").val() + "&Desde=" + $("#desde").val() + "&Hasta=" + $("#hasta").val() + "&Seccional=" + Seccional + "&Insumo=" + $("#cbo_Medicamento").val().trim());

        $.fancybox(
        {
            'autoDimensions': false,
            'href': "../Impresiones/Compras/Internacion_GastosExtraBuscarExcel.aspx?Id=" + NroPedido + "&Paciente=" + $("#txtNombre").val().trim() + "&NHC=" + $("#txtNHC").val() + "&Desde=" + $("#desde").val() + "&Hasta=" + $("#hasta").val() + "&Seccional=" + Seccional + "&Insumo=" + $("#cbo_Medicamento").val().trim(),
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    });


</script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > <strong>Buscar - Gastos Extraordinarios</strong>";
</script> 
</body>
</html>

