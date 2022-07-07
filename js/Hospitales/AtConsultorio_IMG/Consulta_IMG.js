function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}

var guardando = 0;
var Protocolo = 0;
var MedicoId = 0;
var NHC = 0;
var EspecialidadId = 0;
var Diagnostico = 0;
var FechaTurno = "";
var HoraTurno = "";
var HC_Cargada = 0;
var T_Act = 0;
///Autocomplete
var sourceArr = [];
var mapped = {};

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
        $("#afiliadoId").val(paciente.documento);
        $("#txt_dni").attr('value', paciente.documento_real);
        NHC = paciente.documento;
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        //alert("123");
        CargarHC(paciente.documento);

        //$("#CargadoApellido").html(paciente.Paciente);
        if (paciente.Paciente.length >= 20) {
            $("#CargadoApellido").html(paciente.Paciente.substring(0, 20));
        }
        else {
            $("#CargadoApellido").html(paciente.Paciente);
        }
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));


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

    });
}

$("#btnCancelar").click(function () {
    parent.$.fancybox.close();
});

$(document).ready(function () {

    $('input.typeahead').typeahead({
        updater: function (item) {
            $("#diag_nombre").val(item); //nom
            $("#id_val").val(mapped[item]); //id
            return item;
        },
        minLength: 4,
        items: 50,
        hint: true,
        highlight: true,
        source: function (query, process) {
            var json = JSON.stringify({ "str": query });
            $.ajax({
                url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles_Autocomplete",
                type: 'POST',
                dataType: "json",
                data: json,
                contentType: "application/json; charset=utf-8",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    $.each(lista, function (i, icd) {
                        if (i == 0) {
                            sourceArr.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped[str] = icd.Codigo;
                        sourceArr.push(str);
                    });
                    return process(sourceArr);
                }
            });
        }
    });

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    T_Act = GET["T_Act"];

    //CargarDiagnostico();
    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        //$("#divmotivo").show();
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
            CargarConsulta();
            CargarConsulta_Item();
            $("#btnImprimir").show();
        }
        else {
            Protocolo = GET["Protocolo"];
            CargarConsulta();
            CargarConsulta_Item();
            $("#btnImprimir").show();
        }

    }
    else {

        $("#cbo_diagnostico").val("Sin Diagnostico");
        $("#diag_nombre").val("Sin Diagnostico");
        $("#id_val").val("ZA10");

        $("#btnImprimir").hide();
        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            CargarPacienteID(NHC);
            //CargarDiagnostico();
        }

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            if (GET["EspecialidadId"] != "" && GET["EspecialidadId"] != null) {
                EspecialidadId = GET["EspecialidadId"];
            }
            MedicoId = GET["MedicoId"];
            FechaTurno = GET["F"];
        }
    }



    if (GET["m"] == "1") { //Modifica Atencion
        UltimoProtocolo();
        $("#btnImprimir").show();
        //$("#divmotivo").show();
    }

    $("#txt_FechaAnalisis").datepicker();

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

function UltimoProtocolo() {
    var json = JSON.stringify({
        "NHC": NHC,
        "EspecialidadId": EspecialidadId,
        "MedicoId": MedicoId
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/Ultimo_Protocolo_by_NHC_Medico",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Protocolo = Resultado.d;
            T_Act = Protocolo;
            CargarConsulta();
            CargarConsulta_Item();
        },
        error: errores
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarHC(nHC) {
    if (HC_Cargada == 1) return false;
    HC_Cargada = 1;
    $.ajax({
        type: "POST",
        data: '{nhc: "' + nHC + '"}',
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/Historia_Clinica_Compacta",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var HIST = Resultado.d;
            if (HIST == null) {
                $('#CargoHC').html("Comienzo Historia Clínica");
            }
            $.each(HIST, function (index, hhhc) {
                $('#CargoHC').html($('#CargoHC').html() + hhhc.HC);
            });
        },
        beforeSend: function () {
            $(".opc").hide();
            $("#cargando").show();
            $("#divmotivo").hide();
        },
        complete: function () {
            $(".opc").show();
            $("#cargando").hide();
            //if (Protocolo > 0) $("#divmotivo").show(); //Modificacion
        },
        error: errores
    });
}



$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


$("#btnCargarPlantilla").click(function () {
    if (EspecialidadId == "209") {
        var Pagina = "Consulta_Neonatologia.aspx?NHC=" + $("#CargadoNHC").html() + "&MedicoId=" + MedicoId + " ";
    }
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
});

function ConfirmarAtencion() {
    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "EspecialidadId": EspecialidadId,
        "NHC": NHC,
        "FechaTurno": FechaTurno
    });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/ConfirmaAtencionCentral",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}

function Validar() {

    if ($("#txt_Alias").val().trim().length == 0) { alert("Ingrese el Alias"); return false; }
    if (Protocolo > 0) return true;
    if ($("#id_val").val() == "") { alert("Ingrese Diagnóstico."); return false; }
    //if ($("#txt_Observaciones").val().trim().length == 0) { alert("Ingrese Observaciones."); return false; }
    if (MedicoId <= 0 || MedicoId == null || MedicoId == undefined) { alert("Médico no válido."); return false; }
    if (EspecialidadId <= 0 || EspecialidadId == null || EspecialidadId == undefined) { alert("EspecialidadId no válida."); return false; }
    if (NHC <= 0 || NHC == null || NHC == undefined) { alert("Paciente no válido."); return false; }




    return true;
}

$("#btnGuardar").click(function () {
    if (guardando == 1) {
        alert("Se está guardando, sea paciente!!!!");
        return;
    }

    guardando = 1;

    $("#txt_Motivo").val("Modificacion");

    if ($("#cbo_realizalopedido :selected").val() == 0) { alert("¿Realiza lo solicitado en la Autorización o Pedido Médico?"); $("#cbo_realizalopedido").focus(); guardando = 0; return false; }

    if (!Validar()) {
        guardando = 0;
        return false;
    }

    if (Protocolo == 0) ConfirmarAtencion();

    var json = JSON.stringify({
        "Protocolo": Protocolo,
        "Especialidad_Id": EspecialidadId,
        "NHC": NHC,
        "MedicoId": MedicoId,
        "Alias": $("#txt_Alias").val(),
        "txt_1_cant": $("#txt_1_cant").val(),
        "txt_2_cant": $("#txt_2_cant").val(),
        "txt_3_cant": $("#txt_3_cant").val(),
        "txt_4_cant": $("#txt_4_cant").val(),
        "txt_5_cant": $("#txt_5_cant").val(),
        "txt_6_cant": $("#txt_6_cant").val(),
        "txt_7_cant": $("#txt_7_cant").val(),
        "txt_8_cant": $("#txt_8_cant").val(),
        "txt_9_cant": $("#txt_9_cant").val(),
        "txt_10_cant": $("#txt_10_cant").val(),
        "txt_otros_desc_1": $("#txt_otros_desc_1").val(),
        "txt_otros_desc_2": $("#txt_otros_desc_2").val(),
        "txt_otros_1": $("#txt_otros_1").val(),
        "txt_otros_2": $("#txt_otros_2").val(),
        "txt_cant_placas": $("#txt_cant_placas").val(),
        "cbo_realizalopedido": $("#cbo_realizalopedido :selected").val(),
        "txt_fundamentar": $("#txt_fundamentar").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/Guardar_AtencionGeneral_IMG",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarConsultaGeneral_Guardado,
        error: errores
    });

});

function GuardarConsultaGeneral_Guardado(Resultado) {
    guardando = 0;
    Protocolo = Resultado.d;

    parent.$("#opcion1").hide();
    parent.$("#opcion12").hide();
    parent.$("#opcion2").hide();

    parent.$("#opcionFA").show();
    parent.$("#opcion11").show();

    parent.FinalizarAtPaciente();

    self.location = "../Impresiones/Impresiones_IMG/Estudios_Previos.aspx?Protocolo=" + Protocolo + "&Turno_id=" + T_Act;
    parent.$("#fancybox-close").show();
}

function CargarConsulta() {
    if (Protocolo <= 0) { alert("Nro. Protocolo no válido."); return false; }
    var json = JSON.stringify({
        "Protocolo": Protocolo
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/CargarAtencion_IMG_CAB",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsulta_Cargada,
        error: errores
    });
}

function CargarConsulta_Cargada(Resultado) {
    Consulta = Resultado.d;
    NHC = Consulta.NHC;
    Cargar_Paciente_NHC(NHC);
    Protocolo = Consulta.protocolo;
    Diagnostico = Consulta.diagnostico_cod;
    $("#id_val").val(Diagnostico);
    $("#diag_nombre").val(Consulta.diagnostico_desc);
    $("#cbo_diagnostico").val(Consulta.diagnostico_desc);
    $("#TEspecialidad").html(": " + Consulta.especialidad);
    $("#txt_Observaciones").val(Consulta.observaciones);
    $("#txt_Motivo").val(Consulta.modificacion);
    $("#txt_Alias").val(Consulta.alias);
}

function Especialidad(Id) {
    var json = JSON.stringify({
        "Id": Id
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/EspecialidadID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargada,
        error: errores
    });
}

function Especialidad_Cargada(Resultado) {
    Esp = Resultado.d;
    $("#TEspecialidad").html(": " + Esp.Especialidad);
}

function Imprimir() {
    self.location = "../Impresiones/Impresiones_IMG/Estudios_Previos.aspx?Protocolo=" + Protocolo + "&Turno_id=" + T_Act;
}


function OcultarEscaneado() {
    $("#Contenedor_Escaneadas").hide();
}


function MostrarEscaneadas() {

    var json = JSON.stringify({ "IdPaciente": NHC });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Documentacion.asmx/Documentacion_Archivos_Ordenes_Medica",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var fila = "";
            var Contenido = "";
            var finfila = "";

            var fila = "<div class='row' style='margin-left:10px; margin-top: 10px;border: solid 1px #ccc;min-height: 458px;border-radius: 10px 10px 0 0;padding-top: 10px;width: 578px; padding-left: 50px;'>";
            $.each(lista, function (index, item) {
                Contenido = Contenido + "<div class='span2'><div style='width:100px; height:100px; margin:5px 5px 5px 20px;'><a href='../img/escaneadas/" + item.archivo + "' class='thumbnail' download><img src='../img/escaneadas/" + item.archivo + "' alt='...'></a></div><div align='center' style='margin: 0 0 20px 0'>" + item.fecha + "<br/>" + item.tipodocu + "-" + item.cantidad + "<br/></div></div>";
            });

            var finfila = "</div>";
            $("#fotos").html(fila + Contenido + finfila);
            $("#Contenedor_Escaneadas").show();
            var finfila = "</div>";
            $("#fotos").html(fila + Contenido + finfila);
        },
        error: errores
    });

}





function CargarConsulta_Item() {
    if (Protocolo <= 0) { alert("Nro. Protocolo no válido."); return false; }
    var json = JSON.stringify({
        "Protocolo": Protocolo
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/Cargar_IMG_items",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsulta_items_Cargada,
        error: errores
    });
}

function CargarConsulta_items_Cargada(Resultado) {
    Consulta = Resultado.d;
    $("#txt_1_cant").val(Consulta.txt_1_cant);
    $("#txt_2_cant").val(Consulta.txt_2_cant);
    $("#txt_3_cant").val(Consulta.txt_3_cant);
    $("#txt_4_cant").val(Consulta.txt_4_cant);
    $("#txt_5_cant").val(Consulta.txt_5_cant);
    $("#txt_6_cant").val(Consulta.txt_6_cant);
    $("#txt_7_cant").val(Consulta.txt_7_cant);
    $("#txt_8_cant").val(Consulta.txt_8_cant);
    $("#txt_9_cant").val(Consulta.txt_9_cant);
    $("#txt_10_cant").val(Consulta.txt_10_cant);
    $("#cbo_realizalopedido").val(Consulta.cbo_realizalopedido);
    $("#txt_fundamentar").html(Consulta.txt_fundamentar);

    $("#txt_otros_desc_1").val(Consulta.txt_otros_desc_1);
    $("#txt_otros_desc_2").val(Consulta.txt_otros_desc_2);

    $("#txt_otros_1").val(Consulta.txt_otros_1);
    $("#txt_otros_2").val(Consulta.txt_otros_2);

    $("#txt_cant_placas").val(Consulta.txt_cant_placas);




}


function OcultarEscaneado() {
    $("#Contenedor_Escaneadas").hide();
}


function MostrarEscaneadas() {

    var json = JSON.stringify({ "IdPaciente": NHC });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Documentacion/Documentacion_IMG.asmx/Documentacion_Archivos_Ordenes_Medica",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var fila = "";
            var Contenido = "";
            var finfila = "";

            var fila = "<div class='row' style='margin-left:10px; margin-top: 10px;border: solid 1px #ccc;min-height: 458px;border-radius: 10px 10px 0 0;padding-top: 10px;width: 578px; padding-left: 50px;'>";
            $.each(lista, function (index, item) {
                Contenido = Contenido + "<div class='span2'><div style='width:100px; height:100px; margin:5px 5px 5px 20px;'><a href='../img/escaneadas/" + item.archivo + "' class='thumbnail' download><img src='../img/escaneadas/" + item.archivo + "' alt='...'></a></div><div align='center' style='margin: 0 0 20px 0'>" + item.fecha + "<br/>" + item.tipodocu + "-" + item.cantidad + "<br/></div></div>";
            });

            var finfila = "</div>";
            $("#fotos").html(fila + Contenido + finfila);
            $("#Contenedor_Escaneadas").show();
            var finfila = "</div>";
            $("#fotos").html(fila + Contenido + finfila);
        },
        error: errores
    });

}


