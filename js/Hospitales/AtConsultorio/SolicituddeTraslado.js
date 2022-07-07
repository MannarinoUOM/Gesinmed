var NHC = "";
var MedicoId = "";
var Protocolo;


$('#desdeaqui').click(function () {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
});

$('#txt_horario_destino, #RegresoSi, #RegresoNo, #DeAmbulaSi, #DeAmbulaNo, #txt_empresasservcio, #txt_operadorsol, #txtFecha, #txtHora, #txt_OperadorReceptor, #txt_FechaRecp, #txt_HoraRecp').blur(function () {
    $('html, body').animate({ scrollTop: $("#PosDesde").offset().top - 10 }, 500);
    $('.container').height(2000);
});


var GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
    $("#cargaID").val(GET["Protocolo"]);
    //   $("#MedicoCarga").val(GET["MedicoCarga"]);

  //  alert(GET["cargaID"] + "//" + GET["MedicoCarga"] + "//" + MedicoId);
}




$("#btnGuardar").click(function () {
    GuardarOrdenTraslado();
});




function Validar() {
   // if (MedicoId <= 0 || MedicoId == null || MedicoId == undefined) { alert("Médico no válido."); return false; }
    if (NHC <= 0 || NHC == null || NHC == undefined) { alert("Paciente no válido."); return false; }
    if ($('#txtFechaAtencion').val().trim().length == 0) { alert("Ingrese fecha de atención."); return false; }
    if ($('#txtDiagnosticos').val().trim().length == 0) { alert("Ingrese diagnóstico."); return false; }
    return true;
}


function GuardarOrdenTraslado() {

    if (parent.$("#cbo_Medicos").val() == 0) { 
    ("No se pudo obtener el médico. Comuniquese con sistemas."); return false; }

    if (!Validar()) return false;
    //alert(parent.$("#cbo_Medicos").val());  return false;
   // alert(parent.$("#cbo_Medicos").val()+"//"+MedicoId + "//" + $("#cargaID").val());
   // return false;

    var conRegreso = 'No'; if ($("#RegresoSi").is(':checked')) { conRegreso = 'Si'; }
    var De_Ambula = 'No'; if ($("#DeAmbulaSi").is(':checked')) { De_Ambula = 'Si'; }

    var comun = "NO";
    if ($("#txtComun").is(":checked")) comun = "SI";
    var UTIM = "NO";
    if ($("#txtUTIM").is(":checked")) UTIM = "SI";
    var Neonatal = "NO";
    if ($("#txtNeonatal").is(":checked")) Neonatal = "SI";

    var m = 0;
                                                     //por consultorio                           por guardia                                               
    if (parent.$("#cbo_Medicos").val() == undefined) {m = parent.$("#cbo_Medico").val(); } else { m = parent.$("#cbo_Medicos").val(); }
    if (parent.$("#cbo_Medicos").val() == undefined && parent.$("#cbo_Medico").val() == undefined && GET["MedicoId"] != "" && GET["MedicoId"] != null) { m = GET["MedicoId"]; }// por hc

    var json = JSON.stringify({
        "cargaID": $("#cargaID").val(),
        "NHC": NHC,
        "Fecha_Atencion": $('#txtFechaAtencion').val(),
        //"MedicoId": MedicoId,
        //"MedicoId": parent.$("#cbo_Medicos").val(),
        "MedicoId": m,
        "Comun": comun,
        "Utim": UTIM,
        "Neonatal": Neonatal,
        "Diagnostico": $("#txtDiagnosticos").val().trim().toUpperCase(),
        "Observaciones": $("#txtObservaciones").val().trim().toUpperCase(),
        "Desde_Traslado": $("#txt_desde_desde").val().trim().toUpperCase(),
        "Localidad_Traslado": $("#txt_desde_localidad").val().trim().toUpperCase(),
        "Calles_Traslado": $("#txt_desde_entrecalles").val().trim().toUpperCase(),
        "Hasta_Traslado": $("#txt_hasta_hasta").val().trim().toUpperCase(),
        "Localidad_Traslado_Hasta": $("#txt_hasta_localidad").val().trim().toUpperCase(),
        "Horario_Destino": $('#txt_horario_destino').val().trim().toUpperCase(),
        "Con_Regreso": conRegreso,
        "De_Ambula": De_Ambula,
        "Empresa": $('#txt_empresasservicio').val().trim().toUpperCase(),
        "Operador_Sol": $('#txt_operadorsol').val().trim().toUpperCase(),
        "Fecha_Sol": $('#txtFecha').val(),
        "Hora_Sol": $('#txtHora').val().trim().toUpperCase(),
        "Operador_Recep": $('#txt_OperadorReceptor').val().trim().toUpperCase(),
        "Fecha_Recep": $('#txt_FechaRecp').val(),
        "Hora_Recep": $('#txt_HoraRecp').val().trim().toUpperCase(),
        "Calles_Destino": $("#txt_hasta_entrecalles").val().trim().toUpperCase()
    });


    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/AtConsultorio.asmx/GuardarOrdenTraslado",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OrdenTrasladoGuardado,
        error: errores
    });
}

function OrdenTrasladoGuardado(Resultado) {
    var Pedidos = Resultado.d;
    if (Resultado.d == -1) { alert("Ya pasaron 24hs desde la creacion y no puede editarse."); } else {
        self.location = "../Impresiones/ImpresionOrdenTraslado.aspx?ID=" + Resultado.d + "&MedicoId=" + MedicoId;
        parent.$("#fancybox-close").show();
    }
}

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {


        $("#btnCargar").show();
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txt_dni").attr('value', paciente.documento);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));


        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

    });
}


$(document).ready(function () {
    $('#btnImprimir').hide();

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        Protocolo = GET["Protocolo"];
        Cargar_SolicitudTraslado(Protocolo);
        $('#btnImprimir').show();
    }
    else {

        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            CargarPacienteID(NHC);
        }
    }

    $("#txtFechaAtencion").datepicker();
    $("#txtFechaAtencion").datepicker();
    $("#txtFechaAtencion").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dd = currentDt.getDate()
    dd = (dd < 10) ? '0' + dd : dd;

    var d = dd + '/' + mm + '/' + yyyy;
    $("#txtFechaAtencion").val(d);

    $("#txtFecha").datepicker();
    $("#txt_FechaRecp").datepicker();

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
    }
});

$("#btnCancelar").click(function () {
    parent.$.fancybox.close();
}); 

$("#btnBuscarSolicitud").click(function () {
    self.location = "BuscarSolicituddeTraslado.aspx?NHC="+NHC+"&MedicoId="+MedicoId+"&UOMID="+$("#CargadoNHC").html();
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Cargar_SolicitudTraslado(Protocolo) {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarOrdenTraslado",
        data: '{OT: "' + Protocolo + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_SolicitudTrasladoe_Cargado,
        error: errores
    });
}

function Cargar_SolicitudTrasladoe_Cargado(Resultado) { 
var OT = Resultado.d;

    NHC = OT.NHC;
    CargarPacienteID(NHC);
    $('#txtFechaAtencion').val(OT.Fecha_Atencion);
   // MedicoId = OT.Medico_Id;
    $("#txtComun").val(OT.Comun);
    $("#txtUTIM").val(OT.Utim);
    $("#txtNeonatal").val(OT.Neonatal);
    $("#txtDiagnosticos").val(OT.Diagnostico);
    $("#txtObservaciones").val(OT.Observaciones);
    $("#txt_desde_desde").val(OT.Desde_Traslado);
    $("#txt_desde_localidad").val(OT.Localidad_Traslado);
    $("#txt_desde_entrecalles").val(OT.Calles_Traslado);
    $("#txt_hasta_hasta").val(OT.Hasta_Traslado);
    $("#txt_hasta_localidad").val(OT.Localidad_Traslado_Hasta);
    $('#txt_horario_destino').val(OT.Horario_Destino);

    $('#txt_horario_destino').val(OT.Horario_Destino);
    $('#txt_empresasservicio').val(OT.Empresa);
    $('#txt_operadorsol').val(OT.Operador_Sol);
    $('#txtFecha').val(OT.Fecha_Sol);
    $('#txtHora').val(OT.Hora_Sol);
    $('#txt_OperadorReceptor').val(OT.Operador_Recep);
    $('#txt_FechaRecp').val(OT.Fecha_Recep);
    $('#txt_HoraRecp').val(OT.Hora_Recep);
    $('#txt_hasta_entrecalles').val(OT.Calles_Destino);


    if (OT.Con_Regreso) { jQuery("#RegresoSi").attr('checked', 'checked'); } else { jQuery("#RegresoNo").attr('checked', 'checked'); }
    if (OT.De_Ambula) { jQuery("#DeAmbulaSi").attr('checked', 'checked'); } else { jQuery("#DeAmbulaNo").attr('checked', 'checked'); }
}

$('#btnVolver').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
});


$('#btnVolver').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
});

$('#btnImprimir').click(function () {
    //alert($("#cargaID").val() + "//" + parent.$("#cbo_Medicos").val());
    if ($("#cargaID").val() == "0") { alert("Guarde la orden antes de imprimirla."); } else {
        self.location = "../Impresiones/ImpresionOrdenTraslado.aspx?ID=" + $("#cargaID").val() + "&medicoId=" + parent.$("#cbo_Medicos").val();
        parent.$("#fancybox-close").show();
    }
});
