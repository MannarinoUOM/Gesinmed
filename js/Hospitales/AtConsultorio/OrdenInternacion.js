var NHC = "";
var MedicoId = "";
var Uo = 0;
var Um = 0;
var ordenCargada = 0;

$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        if (GET["U"] != "" && GET["U"] != null) {
            if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
                Um = GET["MedicoId"];
            }
        }
        Protocolo = GET["Protocolo"];
        Cargar_Orden(Protocolo);
    }
    else {
        Cargar_Servicios('');
        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            UOI();
            CargarPacienteID(NHC);
        }
    }
    $("#txt_fecha_Internacion").datepicker();
    $("#txt_fecha_Internacion").mask("99/99/9999", { placeholder: "-" });

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
    }

});

$("#btnCerrar").click(function () {
    parent.$.fancybox.close(); 
}); 


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

        if (paciente.Paciente.length > 20) $("#CargadoApellido").html(paciente.Paciente.substring(0, 19) + "...");
        else $("#CargadoApellido").html(paciente.Paciente);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Cargar_Servicios(SId) {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarServicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Servicios = Resultado.d;
            $('#cbo_Servicios').empty();
            $.each(Servicios, function (index, servicio) {
                $('#cbo_Servicios').append(
              $('<option></option>').val(servicio.id).html(servicio.servicio)
            );
            });
            if (SId != '' && SId != null) {
                $("#cbo_Servicios option[value=" + SId + "]").attr("selected", true);
            }
        },
        error: errores
    });
}

function UOI() {
    var json = JSON.stringify({
        "NHC": NHC
    });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/UOI",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d != 0) {
                Uo = Resultado.d;
                $("#UO").show();
            }
        },
        error: errores
    });
}

function RecargarUo() {
    self.location = "OrdenInternacion.aspx?Protocolo="+Uo+"&U=1&MedicoId="+MedicoId+" ";
}


function Cargar_Orden(Protocolo) {
    var json = JSON.stringify({
        "Protocolo": Protocolo
    });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarOrdenInternacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Orden = Resultado.d;
            if (Resultado.d != null) {
                Cargar_Servicios(Orden.servicioid);
                $("#txt_Diagnostico").val(Orden.diagnostico);
                $("#cbo_area option[value=" + Orden.ordenindicada + "]").attr("selected", true);
                $("#txt_fecha_Internacion").val(Orden.fechainternacion);
                $("#txt_piso").val(Orden.piso);
                $("#txt_cama").val(Orden.cama);
                $("#txt_indicaciones").val(Orden.indicaciones);
                NHC = Orden.NHC;
                if (Um == 0) {
                    MedicoId = Orden.medicoid;
                }
                else {
                    MedicoId = Um;
                }
                CargarPacienteID(Orden.NHC);
                $("#btnImprimir").show();
            }

            ordenCargada = Orden.id;
        },
        error: errores
    });
}

function Validar() {
    if (NHC <= 0 || NHC == null || NHC == undefined) { alert("Paciente no válido."); return false; }
    if (MedicoId <= 0 || MedicoId == null || MedicoId == undefined) { alert("Médico no válido."); return false; }
    if ($("#txt_Diagnostico").val().trim().length == 0) { alert("Ingrese Diagnóstico."); return false; }
    if ($("#txt_fecha_Internacion").val().trim().length == 0) { alert("Ingrese Fecha de Internación."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    if (!Validar()) return false;

    var json = JSON.stringify({
        "NHC": NHC,
        "ID_SERV": $('#cbo_Servicios option:selected').val(),
        "DIAGNOSTICO": $("#txt_Diagnostico").val().trim().toUpperCase(),
        "AREA": $('#cbo_area option:selected').val(),
        "fechainternacion": $("#txt_fecha_Internacion").val(),
        "PISO": "",
        "CAMA": "",
        //"PISO": $("#txt_piso").val(),
        //"CAMA": $("#txt_cama").val(),
        "INDICACIONES": $("#txt_indicaciones").val().trim().toUpperCase(),
        "MEDICOID": MedicoId,
        "ordenId": ordenCargada
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/GuardarOrdenInternacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Orden = Resultado.d;
            if (Resultado.d != null) {
                self.location = "../Impresiones/ImpresionOrdenInternacion.aspx?Protocolo=" + Orden + " " + "&MedicoId=" + MedicoId;
                parent.$("#fancybox-close").show();
            }
        },
        error: errores
    });
});


$("#btnImprimir").click(function () {
   // alert(ordenCargada);

    self.location = "../Impresiones/ImpresionOrdenInternacion.aspx?Protocolo=" + ordenCargada + " " + "&MedicoId=" + MedicoId;
    parent.$("#fancybox-close").show();
 });