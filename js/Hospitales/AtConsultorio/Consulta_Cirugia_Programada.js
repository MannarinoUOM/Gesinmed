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

var Protocolo = 0;
var MedicoId = 0;
var NHC = 0;
var EspecialidadId = 0;
var Diagnostico = 0;
var FechaTurno = "";
var HoraTurno = "";
var HC_Cargada = 0;
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
                

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        //$("#CargadoTelefono").html(paciente.Telefono);

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

//    $("#txtHoraCIrugia").mask('##:##');

//    $("#txtFechaCirugia").datepicker({});
//    $("#txtFechaCirugia").on('keydown', function (e) {

//        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//            e.preventDefault();
//        } else { e.preventDefault(); }
//    });

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

    //CargarDiagnostico();
    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        $("#divmotivo").show();
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
            CargarConsulta();
            $("#btnImprimir").show();
        }
        else {
            Protocolo = GET["Protocolo"];
            CargarConsulta();
            $("#btnImprimir").show();
        }

    }
    else {
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
        $("#btnImprimir").show();
        $("#divmotivo").show();
    }

    $("#txt_FechaAnalisis").datepicker();

    //TODO LISTO    
    ListarMedicosExternos();
    CargarCirugia();
    //TODO LISTO


});

function CerrarMedico() {
    $("#txt_medico_nombre").val("");
    $("#txt_medico_MN").val("");
    $("#txt_medico_MP").val("");
    $("#div_MedicoNuevo").hide();
}


function MedicoGuardar() {

    var Medico = {};
    Medico.MedicoId = $("#cbo_cirujano").val();
    Medico.MN = $("#txt_medico_MN").val();
    Medico.MP = $("#txt_medico_MP").val();
    Medico.MedicoNombre = $("#txt_medico_nombre").val();

    var json = JSON.stringify({
        "Medico": Medico
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Guardar_Atencion_Cirugia_MedicoExterno_Guardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            ListarMedicosExternos();
        },
        error: errores
    });    
}


function ListarMedicosExternos() {
    $("#txt_medico_nombre").val("");
    $("#txt_medico_MN").val("");
    $("#txt_medico_MP").val("");
    $("#div_MedicoNuevo").hide();

    var json = JSON.stringify({
        "MedicoId": 0 });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Guardar_Atencion_Cirugia_MedicoExterno_Listar",        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListarMedicosExternos_Cargados,
        error: errores
    });
}


function ListarMedicosExternos_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $("#cbo_cirujano").empty();
    $("#cbo_cirujano").append($("<option></option>").val("0").html("Seleccione uno."));
    $.each(Medicos, function (index, Medico) {
        $("#cbo_cirujano").append($("<option></option>").val(Medico.MedicoId).html(Medico.MedicoNombre));
    });         
}


function CargarMedico() {
    $("#txt_medico_nombre").val("");
    $("#txt_medico_MN").val("");
    $("#txt_medico_MP").val("");
    $("#div_MedicoNuevo").hide();

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Guardar_Atencion_Cirugia_MedicoExterno_Listar",
        data: '{MedicoId: "' + $("#cbo_cirujano").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Medicos = Resultado.d;
            $.each(Medicos, function (index, Medico) {                
                $("#txt_medico_nombre").val(Medico.MedicoNombre);
                $("#txt_medico_MN").val(Medico.MN);
                $("#txt_medico_MP").val(Medico.MP);
            });
            $("#div_MedicoNuevo").show();
        },
        error: errores
    });
}

function ListarAnestesia(Cual) {
    $("#cbo_anestesia").empty();

    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaAnestesia",
        data: '{Id: 0}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Anestesias = Resultado.d;
            $("#cbo_anestesia").append($("<option></option>").val("0").html("Seleccione una Anestesia."));
            $.each(Anestesias, function (index, Anestesia) {
                $("#cbo_anestesia").append($("<option></option>").val(Anestesia.id).html(Anestesia.tipo));
            });
            if (Cual != 0) {
                $("#cbo_anestesia").val(Cual);
            }
        },
        error: errores
    });

}



function CargarCirugia() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorioCirugiaCargar",
        data: '{PacienteId: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarCirugia_Cargado,
        error: errores
    });
}

function CargarCirugia_Cargado(Resultado) {
    Cirugia = Resultado.d;

    TurnoId = Cirugia.TurnoId;
    InternacionId = Cirugia.InternacionId;
    $("#id_val").val(Cirugia.ICD10_Det_Id);
    $("#cbo_diagnostico").val(Cirugia.ICD10_Det_Descripcion);
    $("#txt_procedimiento").val(Cirugia.Procedimiento);
    $("#CirujanoUsuario").html(Cirugia.CirujanoNombre);
    $("#cbo_cirujano").val(Cirugia.CirujanoExternoId);
    $("#txt_telefono").val(Cirugia.Telefono);
    ListarAnestesia(Cirugia.Anestesia);
    $("#txt_hemoterapia").val(Cirugia.Hemoterapia_Valor);
    
    $("#CargadoFecha").html(Cirugia.Fecha);

    if (Cirugia.Etapa > 1) {
        $(".btn-success").remove();
        $("#btn_reprogramar").show();
    } else { $("#btn_reprogramar").hide(); }

    if (Cirugia.Fecha != null) {
        $("input[name=rb_Internacion][value=" + Cirugia.Internacion + "]").prop('checked', true);
        $("input[name=rb_hemoterapia][value=" + Cirugia.Hemoterapia + "]").prop('checked', true);
        $("input[name=rb_ANP][value=" + Cirugia.AP + "]").prop('checked', true);
        $("input[name=rb_Monitoreo][value=" + Cirugia.Monitoreo + "]").prop('checked', true);
        $("input[name=rb_Radiologia][value=" + Cirugia.Radiologia + "]").prop('checked', true);
        $("input[name=rb_MatCirugia][value=" + Cirugia.MatCirugia + "]").prop('checked', true);
        $("#txt_MatCirugia").val(Cirugia.txt_MatCirugia);
        $("input[name=rb_TorreLap][value=" + Cirugia.TorreLap + "]").prop('checked', true);
        $("input[name=rb_Antitetanica][value=" + Cirugia.Antitetanica + "]").prop('checked', true);
        $("input[name=rb_Ortopedia][value=" + Cirugia.Ortopedia + "]").prop('checked', true);
        $("#txt_Ortopedia").val(Cirugia.txt_Ortopedia);
        $("input[name=rb_Estudios_Pre][value=" + Cirugia.Estudios_Pre + "]").prop('checked', true);
        $("input[name=rb_Externo][value=" + Cirugia.Externo + "]").prop('checked', true);
        $("input[name=rb_Ortopedia][value=" + Cirugia.Ortopedia + "]").prop('checked', true);
        $("input[name=rb_FechaOptativa][value=" + Cirugia.FechaOptativa + "]").prop('checked', true);
        $("input[name=rb_Microscopio][value=" + Cirugia.Microscopio + "]").prop('checked', true);
        $("#txtPrestadorExterno").val(Cirugia.PrestadorExternoName);
    }
    else {
        $("#CargadoFecha").html("Hoy");
        $("#CirujanoUsuario").html(UsuarioLogin);
    }
    $("#txt_observaciones").val(Cirugia.txt_observaciones);
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



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



$("#btn_cancelar").click(function () {
    parent.$.fancybox.close();
}); 


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



function Validar() {
    if (Protocolo > 0) return true;
    if ($("#id_val").val() == "") { alert("Ingrese Diagnóstico."); return false; }
    if ($("#txt_procedimiento").val().trim().length <= 0) { alert("Ingrese Procedimiento."); return false; }
    if ($("#cbo_anestesia").val() == "0") { alert("Seleccione Anestesia."); return false; }
    if ($("#CirujanoUsuario").html().trim() == "") {
        if (("#cbo_cirujano").val() == "") {
            alert("Seleccione Cirujano Externo."); return false;     
        }        
    }
    if ($("#txt_telefono").val().trim().length <= 0) { alert("Ingrese Teléfono."); return false; }

    if ($("input[name='rb_Internacion']:checked").length <= 0) { alert("Seleccione Tipo Internación (Internación, U.T.I., I.Q.B. o Cirugía Ambulatoria.)."); return false; }
    if ($("input[name='rb_hemoterapia']:checked").length <= 0) { alert("Seleccione Hemoterapia (Si o No)."); return false; }
    if ($("input[name='rb_ANP']:checked").length <= 0) { alert("Seleccione Anatomía Patológica (Si o No)."); return false; }
    if ($("input[name='rb_Monitoreo']:checked").length <= 0) { alert("Seleccione Monitoreo (Si o No)."); return false; }
    if ($("input[name='rb_Radiologia']:checked").length <= 0) { alert("Seleccione Radiología (Si o No)."); return false; }
    if ($("input[name='rb_MatCirugia']:checked").length <= 0) { alert("Seleccione Material Ciguría (Si o No)."); return false; }
    if ($("#rb_MatCirugia_1").is(":checked")) { 
        if ($("#txt_MatCirugia").length <= 0) { alert("Ingrese el Material de Ciguría ha utilizar."); return false; }
     }
    if ($("input[name='rb_MatCirugia']:checked").length <= 0) { alert("Seleccione Material Ciguría (Si o No)."); return false; }


    if ($("input[name='rb_TorreLap']:checked").length <= 0) { alert("Seleccione Torre Lap (Si o No)."); return false; }
    if ($("input[name='rb_Antitetanica']:checked").length <= 0) { alert("Seleccione Profilaxis Antitetánica (Si o No)."); return false; }
    if ($("input[name='rb_Ortopedia']:checked").length <= 0) { alert("Seleccione Ortopedia (Si o No)."); return false; }
    if ($("input[name='rb_Ortopedia']:checked").length <= 0) { alert("Seleccione Ortopedia (Si o No)."); return false; }
    if ($("#rb_Ortopedia_1").is(":checked")) {
        if ($("#txt_Ortopedia").length <= 0) { alert("Ingrese el Material de Ortopedia ha utilizar."); return false; }
    }

    if ($("input[name='rb_Estudios_Pre']:checked").length <= 0) { alert("Seleccione Estudios Pre Quirúrgico (Si o No)."); return false; }
    if ($("input[name='rb_Externo']:checked").length <= 0) { alert("Seleccione Prestador Externo (Si o No)."); return false; }
    if ($("input[name='rb_FechaOptativa']:checked").length <= 0) { alert("Seleccione Fecha Optativa Cirugía (0 a 15 días ó 15 a 45 días)."); return false; }
    if ($("input[name='rb_Microscopio']:checked").length <= 0) { alert("Seleccione Microscopio (Si o No)."); return false; }

    return true;
}

$("#btn_guardar").click(function () {

    if (!Validar()) return false;

    TurnoId = 0;
    InternacionId = 0;

    var Cirugia = {};
    Cirugia.PacienteId = NHC;
    Cirugia.TurnoId = TurnoId;
    Cirugia.InternacionId = InternacionId;
    Cirugia.ICD10_Det_Id = $("#id_val").val();
    Cirugia.Procedimiento = $("#txt_procedimiento").val();
    Cirugia.CirujanoId = MedicoId;
    Cirugia.CirujanoExternoId = $("#cbo_cirujano").val();
    Cirugia.Telefono = $("#txt_telefono").val();
    Cirugia.Internacion = $("input[name='rb_Internacion']:checked").val();
    Cirugia.Hemoterapia = $("input[name='rb_hemoterapia']:checked").val();
    Cirugia.AP = $("input[name='rb_ANP']:checked").val();
    Cirugia.Monitoreo = $("input[name='rb_Monitoreo']:checked").val();
    Cirugia.Radiologia = $("input[name='rb_Radiologia']:checked").val();
    Cirugia.MatCirugia = $("input[name='rb_MatCirugia']:checked").val();
    Cirugia.txt_MatCirugia = $("#txt_MatCirugia").val();
    Cirugia.TorreLap = $("input[name='rb_TorreLap']:checked").val();
    Cirugia.Antitetanica = $("input[name='rb_Antitetanica']:checked").val();
    Cirugia.Ortopedia = $("input[name='rb_Ortopedia']:checked").val();
    Cirugia.txt_Ortopedia = $("#txt_Ortopedia").val();
    Cirugia.Estudios_Pre = $("input[name='rb_Estudios_Pre']:checked").val();
    Cirugia.Externo = $("input[name='rb_Externo']:checked").val();
    Cirugia.PrestadorExternoName = $("#txtPrestadorExterno").val();
    Cirugia.Microscopio = $("input[name='rb_Microscopio']:checked").val();

    Cirugia.FechaOptativa = $("input[name='rb_FechaOptativa']:checked").val();
    Cirugia.txt_observaciones = $("#txt_observaciones").val();

    Cirugia.Anestesia = $("#cbo_anestesia").val();
    Cirugia.Hemoterapia_Valor = $("#txt_hemoterapia").val();


    var json = JSON.stringify({
        "Objeto": Cirugia
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Guardar_Atencion_Cirugia_Guardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardar_Atencion_Cirugia_Guardar_Guardado,
        error: errores
    });

});

function Guardar_Atencion_Cirugia_Guardar_Guardado(Resultado) {
    //Protocolo = Resultado.d;
    //parent.$("#opcionFA").show();
    //self.location = "../Impresiones/CDGeneral.aspx?Protocolo=" + Protocolo;
    //parent.$("#fancybox-close").show();
    alert("Guardado");
}


function Imprimir() {
    self.location = "../Impresiones/CDGeneral.aspx?Protocolo=" + Protocolo;
}




$("#btn_reprogramar").click(function () {

    var r = confirm("Desea reprogramar el turno?");

    if (r == true) {
        var json = JSON.stringify({ "AfiliadoId": NHC, "observacion": $("#txt_observaciones").val() });
        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorioCirugiaProgramadaReestablecerTurno",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) { if (Resultado.d == 1) alert("Reprogramada"); else alert("Ha ocurrido un error al intentar reprogramar."); },
            error: errores
        });
    }
});