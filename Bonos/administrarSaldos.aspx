<%@ Page Language="C#" AutoEventWireup="true" CodeFile="administrarSaldos.aspx.cs" Inherits="Bonos_administrarSaldos" %>

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
    <form id="form1" runat="server" style=" overflow:hidden">
    <div class="container" style="padding-top:2%; margin-left:15%">
    <div class="contenedor_4" style="width:990px; height:470px ;padding:10px; margin-left:0px">
    <div class="contenedor_3" style="padding:0px; height:100%; width:98%">

    <%--DATOS AFILIADO--%>
    <input id="afiliadoId" type="hidden"/>
                <div class="resumen_datos" style="height: 80px;">
                    <!--Datos del paciente-->
                    <div class="datos_paciente" style="width:80%">
                        <div><img id="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img></div>
                        <div class="datos_resumen_paciente" style="font-size:12px;">
                            <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos" tabindex="-1">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>CELULAR PPAL: <strong><span id="CargadoTelefono"></span></strong></span>
                            <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>&nbsp;&nbsp;&nbsp;<%--<span>Celular: <strong><span id="CargadoCelular"></span></strong></span>--%></div>
                             </div>
                            <div class=" pull-right" style="margin-top:7%">
                                <span id="span_Discapacidad" style="color:red; font-weight:bold; font-size:14px;"></span>
                                <span id="span_Estudiante"></span>
                            </div>
                       
                    </div>
                    <div class="clearfix">
                    </div>
                </div>

<%--DATOS AFILIADO--%>

    <div style="height:300px">

    <table class='table' style=" margin-bottom:0px ">
    <tr style='background-color:black; color:white'>
    <td style='width:1%' >Entr.</td>
    <td style='width:8%' >Fecha Movimiento</td>
    <td style='width:5%' >Hora</td>
    <td style='width:10%' >Sector</td>
    <td style='width:13%' >Número Bono<br />Comprobante</td>
    <td style='width:9%' >Importe</td>
    <td style='width:25%' >Especialidad</td>
    <td style='width:30%' >Observaciones</td>
    <td style='width:4%'>Cancelar</td>
    </tr></table>
    <div style="height:85%; overflow:auto">
    <div id="resumen">
    </div>
    </div>

    </div>
    <div class="pie_gris">
    <label style="display:inline; margin-left:1%">Total Deuda </label><input id="txtTotal" type="text" style="text-align:center; width: 70px" disabled="disabled"/>
    <label style="display:inline; margin-left:1%">Importe Paga </label><input id="txtPago" type="text" class="input-mini verificarMoney" maxlength="12" style="text-align:center"/>
    <label style="display:inline; margin-left:1%">Observaciones </label><input id="txtObservacion" type="text" style="text-align:center; width:110px"/>
    <a id="btnNoPaga" class="btn btn-danger pull-right">No Paga</a>
    <a id="btnVolver" href="../Bonos/BusquedaAfiliadoCC.aspx?CC=1&sector=CUENTA%20CORRIENTE%20AFILIADOS" class="btn btn-info pull-right">Volver</a>
    <a id="btnConfirmar" class="btn btn-info pull-right">Confirmar Pago</a>
    <a id="btnImprimir" class="btn btn-info pull-right">Imprimir</a>
    </div>
    </div>
    </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>


<div id="Modalimpresion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="width:300px; left:63%">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
<h3 id="myModalLabel">Tipo Impresión</h3>
</div>
<div class="modal-body">
<p>
<a class="btn ocultar imprimirResumen" data-tipo="1" style="margin: 5px 5px 5px 5px;">PDF</a>
<a class="btn ocultar imprimirResumen" data-tipo="0" style="margin: 5px 5px 5px 5px;">EXCEL</a>
</p>
</div>
<div class="modal-footer">
<button class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
</div>
</div>


<script type="text/javascript">
    var GET = {};
    var NHC;
    var S;
    var P;
    var total = 0;
    var guarda = 1;

    $(document).ready(function () {

        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });

        if (GET["NHC"] != "" && GET["NHC"] != null) {

            NHC = GET["NHC"];
            cargarSaldos(NHC);
            CargarPacienteID(NHC);
        }

        if (GET["S"] != "" && GET["S"] != null) { S = GET["S"]; }
        if (GET["P"] != "" && GET["P"] != null) { P = GET["P"]; if (P == 1) { $("#btnNoPaga").hide(); } }

    });

    function cargarSaldos(NHC) {
        var json = JSON.stringify({ "NHC": NHC });
        $.ajax({
            type: "POST",
            url: "../Json/Bonos/NuevoBonos.asmx/cargarSaldos",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: saldosCargados,
            error: errores
        });
    }

    function saldosCargados(Resultado) {
        var encabezado = "<table class='table'><tr>" +
        "<td style='width:5%' ></td>" +
        "<td style='width:10%' ></td>" +
        "<td style='width:5%' ></td>" +
        "<td style='width:10%' ></td>" +
        "<td style='width:15%' ></td>" +
        "<td style='width:9%' ></td>" +
        "<td style='width:14%'></td>" +
        "<td style='width:28%'></td>" +
        "<td style='width:4%'></td></tr>";
        var fila = "";
        var pie = "</table>";
        var sector;
        var estado = "";
        total = 0;
        var importe = 0;
        var observacion2 = "";
        var cursorBonos;
        var btnCancelar = "";
        var check;
        var color;
        var activo;

        $.each(Resultado.d, function (index, item) {
            switch (item.sector) {
                case 1:
                    sector = "Bonos";
                    break;
                case 2:
                    sector = "Laboratorio";
                    break;
                case 3:
                    sector = "Cuenta Corriente Afiliados";
                    break;

                case 4:
                    sector = "Teleconsulta";
                    break;
                case 5:
                    sector = "Telefonico";
                    break;
            }
            importe = item.importe;

            if (importe < 0) { importe = importe * -1; }
            // alert(item.numeroBono);
            // if (item.numeroBono == "0") {
            if (item.numeroRecibo != null) {
                estado = "Recibo";

                if (item.numeroRecibo == "CANCELADO") { estado = "CANCELADO"; }
                color = "green"
                if (item.baja) { color = "blue"; activo = "disabled"; } else { activo = ""; }
                if (item.numeroBono != null) { observacion2 = " (Bono nro. " + item.numeroBono + ")"; } else { observacion2 = " (Pago por CC)"; }

                if (item.Entregado == 1) { check = "<input id='" + item.movId + "' class='ent' type='checkbox' checked='checked' " + activo + "/>"; } else { check = "<input id='" + item.movId + "' class='ent' type='checkbox' " + activo + " />"; }
                fila = fila + "<tr style='cursor:pointer; color:" + color + "' onclick='imprimir(" + item.movId + ")' >" +
            "<td style='text-align:center' " + activo + ">" + check + "</td>" +
            "<td>" + item.fechaMovimiento + "</td>" +
            "<td>" + item.hora + "</td>" +
            "<td>" + sector + "</td>" +
            "<td>" + estado + " " + item.numeroRecibo + "</td>" +
            "<td> $ " + importe.toFixed(2) + "</td>" +
            "<td>" + item.Especialidad + "</td>" +
            "<td>" + item.observacion + observacion2 + "</td>" +
            "<td></td></tr>";
            } else {
                //alert(item.baja);
                color = "red"
                if (item.numeroRecibo == "CANCELADO") { estado = "CANCELADO"; }
                if (item.baja) { color = "blue"; activo = "disabled"; } else { activo = ""; }
                estado = "Bono";
                if (parseInt(item.bonoId) > 0) { cursorBonos = "cursor:pointer"; } else { cursorBonos = "cursor:default"; }
                if (item.baja == 1) { btnCancelar = ""; } else
                { btnCancelar = "<a title='Cancelar' class='btn btn-danger cancelar' data-bono='" + item.numeroBono + "' data-fecha='" + item.fechaMovimiento + "'>X</a>"; }
                //alert(item.observacion);

                if (item.Entregado == 1) { check = "<input id='" + item.movId + "' class='ent' type='checkbox' checked='checked' " + activo + " />"; } else { check = "<input id='" + item.movId + "' class='ent' type='checkbox' " + activo + " />"; }
                fila = fila + "<tr style='" + cursorBonos + "; color:" + color + "' title='Turnos: " + item.fechasTurnos + "'>" +
            "<td style='text-align:center' "+ activo +">" + check + "</td>" +
            "<td>" + item.fechaMovimiento + "</td>" +
            "<td onclick='imprimirBono(" + item.movId + ")'>" + item.hora + "</td>" +
            "<td onclick='imprimirBono(" + item.movId + ")'>" + sector + "</td>" +
            "<td onclick='imprimirBono(" + item.movId + ")'>" + estado + " " + item.numeroBono + "</td>" +
            "<td onclick='imprimirBono(" + item.movId + ")'> $ " + importe.toFixed(2) + "</td>" +
            "<td onclick='imprimirBono(" + item.movId + ")'>" + item.Especialidad + "</td>" +
            "<td onclick='imprimirBono(" + item.movId + ")'>" + item.observacion + "</td>" +
            "<td>" + btnCancelar + "</td>" +
            "<td style='display:none' id='bonoId" + item.movId + "' >" + item.bonoId + "</td>" +
            "<td style='display:none' id='fechaBono" + item.movId + "' >" + item.fechaBono + "</td></tr>";
            }
            total += item.importe;
        });
        total = total.toFixed(2);
        $("#txtTotal").val("$ " + total);
        $("#resumen").html(encabezado + fila + pie);
    }

    $(".ent").live('change', function () {
        var estado;
        if ($(this).prop('checked')) { estado = 1; } else { estado = 0; }
        //alert($(this).prop('checked'));
        //alert($(this).attr('id'));

        var json = JSON.stringify({ "Estado": estado, "Id": $(this).attr('id') });
        $.ajax({
            type: "POST",
            url: "../Json/Bonos/NuevoBonos.asmx/RegistrarEntregaComprobante",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d == 1) { alert("Estado Modificado"); } else { alert("No se pudo modificar el estado"); }
            },
            error: errores
        });
    });


    function errores(msg) {
        Impreso = 0;
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    $(document).on("keydown", ".verificarMoney", function (e) {

        if ($(this).html().toString().indexOf(".", 0) > -1 && (e.keyCode == 190 || e.keyCode == 110)) { e.preventDefault(); }

        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 ||
                        (e.keyCode == 65 && e.ctrlKey === true) ||
                        (e.keyCode >= 35 && e.keyCode <= 40)) {
            modifico = 1;
            return;
        }
        modifico = 1;
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
        if ($(this).html().toString().indexOf(".") > -1) {
            if ($(this).html().length >= ($(this).html().toString().indexOf(".", 0) + 3)) { e.preventDefault(); }
        }

    });


    $("#btnConfirmar").click(function () {
        if (guarda == 1) {
            guarda = 0;
            //alert(parseFloat($("#txtPago").val()) +"//"+ parseFloat(total));
            if ($("#txtObservacion").val().trim().length <= 0) { alert("Ingrese una observación"); return false; }
            if ($("#txtPago").val().trim().length <= 0 || $("#txtPago").val().trim() <= 0) { alert("Ingrese un pago"); return false; }
            if (parseFloat($("#txtPago").val()) > parseFloat(total)) { alert("El pago es mayor a la deuda"); return false; }
            if (NHC.trim().length <= 0) { alert("No se pudo determinar el afiliado"); return false; }
            if (S.trim().length <= 0) { alert("No se pudo determinar el sector"); return false; }
            // return false;
            var json = JSON.stringify({ "NHC": NHC, "Sector": S, "Importe": $("#txtPago").val(), "Observacion": $("#txtObservacion").val(), "bono": 0 });
           // console.log(json);
            $.ajax({
                type: "POST",
                url: "../Json/Bonos/NuevoBonos.asmx/acentarPago",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: administrarRecibo,
                error: errores
            });
        }
    });


    function administrarRecibo(Resultado) {
        $("#btnConfirmar").hide();
        $("#txtPago").val("");
        $("#txtPago").attr("disabled", true);
        var url = '../Impresiones/ReciboMovimientoBono.aspx?id=' + Resultado.d;
        $.fancybox(
		{
		    'autoDimensions': false,
		    'href': url,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {
		        //window.location.href = "NuevoBono.aspx";
		        //mostrar saldos
		        guarda = 1;
		        if (P == 1) {
		            // parent.window.location.href = "BusquedaAfiliadoCC.aspx" 
		            location.reload();
		        } else {
		            $("#ModalSaldos").modal('hide'); parent.window.location.href = "NuevoBono.aspx";
		        }
		    }
		});
}

$("#btnNoPaga").click(function () { $("#ModalSaldos").modal('hide'); parent.location.href = "NuevoBono.aspx"; });

$("#btnImprimir").click(function () {
    $("#Modalimpresion").modal('show');
});

function imprimir(PDF) {
    var url = '../Impresiones/ReportesBonos/Cuenta_Corriente_Afiliados_Resumen.aspx?id=' + NHC + "&PDF=" + PDF;
    
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': url,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {
		        if (P == 1) { parent.window.location.href = "BusquedaAfiliadoCC.aspx" 
                } else {
		            $("#ModalSaldos").modal('hide'); parent.window.location.href = "NuevoBono.aspx";
		        }
		    }
		});
}


$(".imprimirResumen").click(function () {
    var url = '../Impresiones/ReportesBonos/Cuenta_Corriente_Afiliados_Resumen.aspx?id=' + NHC + "&PDF=" + $(this).data('tipo');

    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': url,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {
		        if (P == 1) { parent.window.location.href = "BusquedaAfiliadoCC.aspx" } else {
		            $("#ModalSaldos").modal('hide'); parent.window.location.href = "NuevoBono.aspx";
		        }
		    }
		});
 });


function imprimir(id) {
    var url = '../Impresiones/ReciboMovimientoBono.aspx?id=' + id;
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': url,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {}
		});
}
function imprimirBono(id) {
    if (parseInt($("#bonoId" + id).html()) > 0) {
        var url = "../Impresiones/ImpresionBono.aspx?id=" + $("#bonoId" + id).html() + "&Fecha=" + $("#fechaBono" + id).html();
        $.fancybox(
		{
		    'autoDimensions': false,
		    'href': url,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () { }
		});
    } else {alert("No se encontro el bono. Comuniquese con sistemas.");}
}


function CargarPacienteID(ID) {
    //if (Internado == 1) { return false; }
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        //        if (paciente.Vencido) {
        //            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
        //            $("#desdeaqui").hide();
        //            return false;
        //        }
        //        $("#btnactualizar").show();
        //        $("#btnCancelarPedidoTurno").show();

        //        $("#txtnroturno").prop("readonly", true);

        //        $("#afiliadoCuil").val(paciente.cuil)
        //        .trigger('change');

        $("#afiliadoId").val(paciente.documento);

        //        $("#btnOtorgados").css('display', 'inline');
        //        $("#txtPaciente").attr('value', paciente.Paciente);
        //        $("#txt_dni").attr('value', paciente.documento_real);

        //        VerificarSiEsEstudiante(paciente.documento_real);

        //        $("#txtNHC").attr('value', paciente.NHC_UOM);
        //        $("#txtTelefono").attr('value', paciente.Telefono);

        celCache = paciente.Telefono;

        //        $("#msgCel").text("Datos en Base de Datos: " + paciente.Celular);
        //        $("#msgCel").show();

        //$("#span_Discapacidad").html(paciente.Discapacidad);

        //        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

        //        if (!PhoneValidate("desdeaqui", "txtTelefono")) {
        //            return false;
        //        } else {
        //            ExisteTurno(paciente.documento);
        //        }

        //        VerificarPMI(paciente.documento);
                PatologiabyId(paciente.Discapacidad);

        if (paciente.CUIT == 88888888888) EsMonotributo = true; //CUIT = 99999999999, Monotrib
        else EsMonotributo = false;


        //        if ($("#txtTelefono").val().length < 10) { // digitos pedido por sansoni el 16/11/21
        //            $("#controlTelefono").addClass("error");
        //            PError = true;
        //        }

        //        if (paciente.Nro_Seccional == "999") {
        //            $("#controlSeccional").addClass("error");
        //            PError = true;
        //        }


        if (paciente.Paciente.length > 20) $("#CargadoApellido").html(paciente.Paciente.substring(0, 19) + "...");
        else $("#CargadoApellido").html(paciente.Paciente);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoCelular").html(paciente.Celular);
        // $("#CargadoSeccional").html($("#cboSeccional :selected").text());

        //        if (!CertificadoMostrado) {
        //            CertificadoVencido(paciente.documento);
        //            CertificadoMostrado = true;
        //        }
        
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            // Cargar_ObraSociales_Cargar(paciente.OSId);
            if (paciente.ObraSocial.length > 40) {
                $("#CargadoSeccional").html(paciente.Seccional.substring(0, 37) + "...");
            } else {
                $("#CargadoSeccional").html(paciente.Seccional);
            }
        }
        else {
            //$("#btnVencimiento").show();
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        //alert(paciente.deuda);
        //        if (parseInt(paciente.deuda) > 0) { MostrarObs(paciente.Observaciones + "\n DEUDA DEL AFILIADO: $" + parseFloat(paciente.deuda).toFixed(2).toString()); } else {
        //            MostrarObs(paciente.Observaciones);
        //        }

        //EstaInternado(); //Verifica si el paciente se encuentra internado en la clinica.
        //        UltimoAporte_OK(); //Verifica aportes en Padron UOM.
        //        Bloquear();
        PMIPI = "";

        nopaga = !paciente.PagaBono;

        if (paciente.PMI && paciente.PI == false) {
            PMIPI = "PMI"
        }

        if (paciente.PMI == false && paciente.PI) {
            PMIPI = "PI"
        }

        if (PMIPI != "") {
            $("#CargadoSeccional").html($("#CargadoSeccional").html() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + PMIPI + "]");
        }
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }
    });
}

$(".cancelar").live('click', function () {
//        alert($(this).data('fecha'));
//        return false;
    //    if (!Validar()) return false;
    if (confirm("¿Desea cancelar el bono?")) {
        var json = JSON.stringify({
            "fecha": $(this).data('fecha'),
            "Usuario": 0,
            "NroBono": $(this).data('bono'),
            "Observacion": 'Cancelado por CC'
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Administracion/Administracion.asmx/CancelarBono",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CancelarBono_Cancelado,
            error: errores
        });
    }
});

function CancelarBono_Cancelado(Resultado) {
    var usuarios = Resultado.d;
    alert("El bono ha sido cancelado.");
    //self.location = "CancelarBono.aspx";
    location.reload();
}


function PatologiabyId(Id) {
    if (Id <= 1) {
       // $('#span_Discapacidad').html("PATOLOGÍA: NO"); $("#span_Discapacidad").css("color", "white"); 
    return; }
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, item) {
                $('#span_Discapacidad').html("PATOLOGÍA: " + item.patologias);
                $("#span_Discapacidad").blink();
            });
        },
        error: errores
    });
}

</script>
