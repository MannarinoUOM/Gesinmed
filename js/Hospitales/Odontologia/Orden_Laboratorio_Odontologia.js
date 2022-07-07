var estudios = new Array();
var idOrden = 0;
var mostrar = "inline";
var fechaConsulta = "";

$(document).ready(function () {

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
    }

    if (GET["F"] != "" && GET["F"] != null) {
        fechaConsulta = GET["F"];
        //alert(fechaConsulta);
    }

    /////FECHAS 
    $("#txtEnvio").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        //maxDate: '0m',
        onClose: function (selectedDate) {
            $("#txtEntrega").datepicker("option", "minDate", selectedDate);
        }
    });

    $("#txtEntrega").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        // maxDate: '0m',
        onClose: function (selectedDate) {
            $("#txtEnvio").datepicker("option", "maxDate", selectedDate);
        }
    });

    $("#txtEnvio").keydown(function () { return false; });
    $("#txtEnvio").keydown(function () { return false; });
    cargarCombo("cboLaboratorios", "../Json/Odontologia.asmx/TraerLaboratoriosOdontologia", 1, "");
});

$("#btnAgregar").click(function () {

    if (mostrar == "inline") {
        if ($("#txtEstudio").val().trim().length <= 0) { alert("Ingrese algún estudio."); } else {
            var obj = {};
            obj.estudio = $("#txtEstudio").val();
            estudios.push(obj);
            llenarTabla(estudios);
            $("#txtEstudio").val("");
        } 
    }
});

function llenarTabla(lista) {
    var cabeza = "<table class='table table-condensed' style='table-layout:fixed;width:100%'><thead><tr style='background-color:#CCCCCC'>" +
    "<th class='celdaGrande' style='width:89%; font-size:large'><b>&nbsp;&nbsp;Estudio</b></th>" +
    "<th class='celdaChica'  style='width:11%; font-size:large'><b>Eliminar</b></th></tr></thead><tbody>";
    var fila = "";
    var pie = "</tbody></table>";

    $.each(lista, function (index, item) {
       // alert("llenar " + item.estudio);
        fila += "<tr><td class='celdaGrande'>" + item.estudio + "</td><td class='celdaChica'><a onclick='eliminar(" + index + ")' class='btn btn-mini btn-danger' style='display:" + mostrar + "'><i class='icon-remove-circle'></i>&nbsp;&nbsp;Eliminar</a></td></tr>";
    });

    $("#estudios").html(cabeza + fila + pie);

}

$("#btnImprimir").click(function () {
    if ($("#cboLaboratorios").val() == 0) { alert("Seleccione un laboratorio."); return false; }
    if ($("#txtEnvio").val() == "") { alert("Ingrese una fecha de envio."); return false; }
    if ($("#txtEntrega").val() == "") { alert("Ingrese una fecha de entrega."); return false; }
    if (estudios.length <= 0) { alert("Cargue al menos un estudio."); return false; }

    var obj = {};
    obj.id = idOrden;
    obj.AfiliadoId = $("#AfiliadoId").val();
    obj.TurnoId = $("#TurnoId").val();
    obj.laboratorio = $("#cboLaboratorios").val();
    obj.fechaEnvio = $("#txtEnvio").val();
    obj.fechaEntrega = $("#txtEntrega").val();

    var json = JSON.stringify({ "obj": obj, "estudios": estudios });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/GuardarOrdenLaboratorioCAB",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) { idOrden = Resultado.d; imprimirOrden(); },
        error: errores
    });
});

function eliminar(index) { estudios.splice(index, 1); llenarTabla(estudios); }

$("#btnSiguiente").click(function () {
    idOrden = 0;
    estudios.length = 0;
    $(".controlar ").attr('disabled', false);
    $("#cboLaboratorios").val(0);
    $("#txtEnvio").val("");
    $("#txtEntrega").val("");
    $("#txtEstudio").val("");
    llenarTabla(estudios);

    $("#segundo").fadeIn(1500);
    $("#primero").hide();
});

$("#btnVolver").click(function () {
    $("#primero").fadeIn(1500);
    $("#segundo").hide();
    mostrar = "inline";
});

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        //complete: Cargar_Ordenes_Historial(1),
        error: errores
    });
}

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        if (paciente.NHC != null && paciente.NHC != '') {
            //$("#desdeaqui").show();
            //TieneUltimo(paciente.NHC);
        }

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        $("#AfiliadoId").val(paciente.documento);
        $("#txt_dni").attr('value', paciente.documento_real);
        NHC = paciente.documento;
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        //CargarHC(paciente.documento);

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoFechaNac").html(paciente.fecha_nacimiento);
        $("#CargadoPatologia").html(paciente.fecha_nacimiento);

        if (paciente.localidad != null) { $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15)); }
        
        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        if (paciente.Nro_Seccional != 998) {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else $("#CargadoSeccional").html(paciente.ObraSocial);

        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);
        Cargar_Ordenes_Historial(1);
        traerTunoId();
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(".btnCerrar").click(function (index, item) { parent.$.fancybox.close(); });

function imprimirOrden() {
    //alert(parent.$("#cbo_Medico option:selected").html());
    $("#btnCerrar").click();
    $.fancybox({
        'href': "../Impresiones/Odontologia/Orden_Laboratorio_Odontologia.aspx?id=" + idOrden + "&Medico=" + parent.$("#cbo_Medico option:selected").html(),
        'width': '90%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }
    });
}

function Cargar_Ordenes_Historial(tipo) {
    //alert("dfgsdfg " + $("#AfiliadoId").val());
    var json = JSON.stringify({ "AfiliadoId": $("#AfiliadoId").val(), "tipo": tipo, "id": idOrden });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerOrdenLaboratorioCAB",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            if (tipo == 1) {
                var lista = Resultado.d;
                var cabeza = "<table class='table table-condensed' style='table-layout:fixed;width:100%'><thead><tr style='background-color:#CCCCCC'>" +
                "<th class='celdaGrande' style='width:89%; font-size:large'><b>&nbsp;&nbsp;Estudios</b></th></tr></thead><tbody>"; ;
                var fila = "";
                var pie = "</tbody></table>";

                $.each(lista, function (index, item) {
                    fila += "<tr onclick='seleccionar(" + item.id + ")' style='cursor:pointer'><td class='celdaGrande'>" + item.fechaGuardado + "</td></tr>";
                });

                $("#historial").html(cabeza + fila + pie);
            }

            if (tipo == 2) {
                estudios.length = 0;
                var lista = Resultado.d;
                var obj = {};
                $.each(lista, function (index, item) {
                    obj.laboratorio = item.laboratorio;
                    obj.fechaEnvio = item.fechaEnvio;
                    obj.fechaEntrega = item.fechaEntrega;
                    obj.TurnoId = item.TurnoId;
                    estudios.push(item);
                   //alert("test2 " + item.estudio);
                });

                if (obj.TurnoId != $("#TurnoId").val()) {
                    mostrar = "none";
                    $(".controlar").attr('disabled', true);
                }
                if (obj.TurnoId == $("#TurnoId").val()) {
                    mostrar = "inline";
                    $(".controlar").attr('disabled', false);
                }
                //alert(obj.laboratorio + "//" + obj.fechaEnvio + "//" + obj.fechaEntrega);
                $("#cboLaboratorios").val(obj.laboratorio);
                $("#txtEnvio").val(obj.fechaEnvio);
                $("#txtEntrega").val(obj.fechaEntrega);

               // $.each(estudios, function (index, item) { alert("test " + item.estudio); });
                llenarTabla(estudios);
            }
        },
        error: errores
    });
}

function seleccionar(id) {
    idOrden = id;
    Cargar_Ordenes_Historial(2);
    $("#segundo").fadeIn(1500);
    $("#primero").hide();
}

function traerTunoId() {

    //var json = JSON.stringify({ "Fecha": parent.$("#txtFecha").val(), "Medico": parent.$("#cbo_Medico").val(), "Especialidad": parent.$("#cboEspecialidadDA").val(), "Afiliado": parent.$("#afiliadoId").val() });
    var json = JSON.stringify({ "Fecha": fechaConsulta, "Medico": parent.$("#cbo_Medico").val(), "Especialidad": parent.$("#cboEspecialidadDA").val(), "Afiliado": $("#AfiliadoId").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/TraerTurnoIdOdontologia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) { $("#TurnoId").val(Resultado.d); },
        error: errores
    });
}