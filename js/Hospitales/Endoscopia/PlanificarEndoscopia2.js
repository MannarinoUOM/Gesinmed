var Id = 0;
var Cirujano = 0;
var CamaId;
var QueryFecha = '';
var AyudanteId;
var AnestesistaId;
var AnestesisId;
var CirugiaId;
var EspecialidadId;
var SalaId;
var DiagnosticoId;
var MedSolicitante;
var Ultimo_OK = 0;
var buscado = 0;
var Quirofano_servicio_id = 120000033;
var motivo_cancelada = 0;

var ayudante1_id = 0;
var ayudante2_id = 0;
var ayudante3_id = 0;
var Monitoreo_id = 0;
var Instrumentalista_Id = 0;
var Circulante_id = 0;

var IM_Guardo = 0;

Cargar_Seccionales_Lista();

$(document).ready(function () {

    var Query = {};
    ListTipoDoc();
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
    }

    if (Query["ID"] != "" && Query["ID"] != null) {
        $("#afiliadoId").val(Query["ID"]);
        CargarPacienteID(Query["ID"]);
    }

    Id = Query['Cirugia_Id'];
    if (Id > 0) {
        LoadCirugia();
        Cargar_Sala_y_Cama();
    }
    else {
        InitControls();
        $("#btnVolver").hide();
    }
});

function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

function InitControls() {    
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#fecha_cirugia").mask("99/99/9999", { placeholder: "-" });
    $("#Hora").mask("99:99", { placeholder: "__:__" });
    $("#Hora_Fin").mask("99:99", { placeholder: "__:__" });
    $("#fecha_cirugia").val(FechaActual());
    $("#fecha_cirugia").datepicker();
    List_Diagnostico(0, true, Id);
    GetCama(0);
    GetSala();   
    Especialidades_Lista();
    List_Medicos();
    List_Medicos_Quirofano();
    ListaAnestesia();
    ListaCirugia(0, true, Id);    
    $("#Imprimir_IQ").hide();        
}

function InitControlsCirugia() {
    $("#txtNHC").mask("9999999999?9", { placeholder: "" });
    $("#txt_dni").mask("9999999?9", { placeholder: "" });
    $("#Hora").mask("99:99");
    $("#Hora_Fin").mask("99:99");
    $("#fecha_cirugia").mask("99/99/9999", { placeholder: "-" });
    $("#fecha_cirugia").val(Fecha_cirugia);
    $("#fecha_cirugia").datepicker();
    List_Diagnostico(0, true, Id);
    GetSala();
    Especialidades_Lista();
    List_Medicos();    
    $("#Imprimir_IQ").show();
}

$("#txtNHC").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNHC').attr('readonly') == undefined) {
            if ($('#txtNHC').val().length > 0) {
                Cargar_Paciente_NHC($("#txtNHC").val());
            }
        }
    }
});

$("#txt_dni").change(function () {
    if ($('#txt_dni').val().length > 0) {
        Cargar_Paciente_Documento($("#txt_dni").val());
    }
});

$("#txtNHC").change(function () {
    if ($('#txtNHC').val().length > 0) {        
        Cargar_Paciente_NHC($("#txtNHC").val());
    }
});


$("#btnBuscarPaciente").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});

$("a#inline").fancybox({
    'hideOnContentClick': true
});

function RecargarPagina(url) {
    document.location = "../Endoscopia/Planificar-Endoscopia.aspx" + url;
}


function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    // declare object
    var queryObj = {};
    // loop through each name-value pair and populate object
    for (var i = 0; i < querystring.length; i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
    }
    return queryObj;
}

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
        }

    }
});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function CargarPacienteID(ID) {
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
        if (paciente.Vencido) {
            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
        }

        VerificarPMI(paciente.documento);

        $("#btnCancelarPedidoTurno").show();

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

//        if (paciente.NHC_UOM == "200") {
//            $("#opciones_quiro").hide();
//            $(".ver_mas_datos").hide();
//            $("#IconoVencido2").hide();
//            $("#cambiar_paciente").show();
//            $("#btn_eliminar_cirugia_provisoria").show();
//            $("#btn_otro_paciente2").hide();
//        }

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        //var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        //if (AnioNacimiento.getFullYear() == 0) {
        //    edad = S / FN;
        //}

        $("#txt_dni").val(paciente.documento_real);

        //Verifico si esta en el padron 10.0.0.1
        $("#SpanCargando").show();
        $("#btnVencimiento").hide();
        //EstaVendico($("#txt_dni").val());

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);

        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#CargadoTelefono").html(paciente.Telefono);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);


        //        if (Ultimo_OK != 1) {
        //            alert(Ultimo_OK);
        UltimoAporte_OK(); //Verifica aportes en Padron UOM.
        //        }

        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}




function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            if (paciente.Vencido) {
                alert("Paciente dado de baja el día: " + paciente.FechaVencido);
            }

            VerificarPMI(paciente.documento);

            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            $("#btnCancelarPedidoTurno").show();

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);

            $("#CargadoApellido").html(paciente.Paciente);

            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


            var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
            if (AnioNacimiento.getFullYear() == 0) {
                edad = S / FN;
            }
            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoSeccional").html(paciente.Seccional);
            $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

            $("#afiliadoId").val(paciente.documento);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);


            UltimoAporte_OK(); //Verifica aportes en Padron UOM.


            $("#CargadoSeccional").html(paciente.Seccional);
            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
                $("#desdeaqui").focus();
            }

        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}

function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}

function List_Diagnostico(Id, estado, Cirugia_id) {
    if (Cirugia_id == null) {Cirugia_id = 0; }
    var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Endoscopia/Endoscopia.asmx/Diagnostico_Planificar_Endoscopia_Todas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Diagnostico_Cargado,
        error: errores
    });
}

function List_Diagnostico_Cargado(Resultado) {
    var Lista = Resultado.d;

    $.each(Lista, function (index, Diagnostico) {
        $("#cbo_Diagnostico").append($("<option></option>").val(Diagnostico.id).html(Diagnostico.diagnostico));
        if (DiagnosticoId == Diagnostico.id) $("#cbo_Diagnostico").val(DiagnosticoId);
    });

}



function List_Medicos() {
    var json = JSON.stringify({ "EspId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#MedSolicitante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == MedSolicitante) $("#MedSolicitante").val(Medico.Id);
    });
}




function ListMotivo(Motivo_id) {
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/ListMotivo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $.each(Lista, function (index, Motivo) {
                $("#Motivo").append($("<option></option>").val(Motivo.id).html(Motivo.motivo));
                if (Motivo_id == Motivo.id) $("#Motivo").val(Motivo_id);
            });
        },
        error: errores
    });
}


function GetCama(Sala) {
    var json = JSON.stringify({ "IdCama": 0, "Sala": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCama_Cargado,
        error: errores
    });
}

function GetCama_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#Cama").empty();
    $("#Cama").append($("<option></option>").val(0).html(""));
    $.each(Lista, function (index, Cama) {
        $("#Cama").append($("<option></option>").val(Cama.id).html(Cama.descripcion));
        if (CamaId == Cama.id) $("#Cama").val(CamaId);
    });
}

function GetCama_Load(Sala) {
    var json = JSON.stringify({ "IdCama": 0, "Sala": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCama_Cargado_Load,
        error: errores
    });
}

function GetCama_Cargado_Load(Resultado) {
    var Lista = Resultado.d;
    $("#Cama").append($("<option></option>").val(0).html(""));
    $.each(Lista, function (index, Cama) {
        $("#Cama").append($("<option></option>").val(Cama.id).html(Cama.descripcion));
        if (CamaId == Cama.id) $("#Cama").val(CamaId);
    });
}


function GetSala() {
    var json = JSON.stringify({"Servicio": Quirofano_servicio_id});
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas_S",
        data:json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetSala_Cargado,
        error: errores
    });
}

function GetSala_Cargado(Resultado) {
    var Lista = Resultado.d;    
    $.each(Lista, function (index, Sala) {
        $("#Sala").append($("<option></option>").val(Sala.id).html(Sala.descripcion));
        if (SalaId == Sala.id) $("#Sala").val(SalaId);
    });

}

$("#Sala").change(function () {
    //var Sala = $("#Sala :selected").val();
    //var Sala = 
    //GetCama(Sala);
});

function Especialidades_Lista() {
    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidades_Lista_Cargado,
        error: errores
    });
}

function Especialidades_Lista_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Especialidad) {
        $("#Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
        if (EspecialidadId == Especialidad.Id) $("#Especialidad").val(Especialidad.Id);
    });
}

function List_Medicos_Quirofano() {
    var json = JSON.stringify({ "Activo": 'A' });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/List_Medicos_Quirofano",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Quirofano_Cargado,
        error: errores
    });
}

function List_Medicos_Quirofano_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#Ayudante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        $("#Anestesista").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == AyudanteId) $("#Ayudante").val(AyudanteId);
        if (Medico.Id == AnestesistaId) $("#Anestesista").val(AnestesistaId);

        $("#Ayte1").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == ayudante1_id) $("#Ayte1").val(Medico.Id);

        $("#Ayte2").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == ayudante2_id) $("#Ayte2").val(Medico.Id);

        $("#Ayte3").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == ayudante3_id) $("#Ayte3").val(Medico.Id);

        $("#Monitorista").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == Monitoreo_id) $("#Monitorista").val(Medico.Id);

        $("#Instrumentadora").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == Instrumentalista_Id) $("#Instrumentadora").val(Medico.Id);

        $("#Circulante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == Circulante_id) $("#Circulante").val(Medico.Id);
        
    });
}



function ListaAnestesia() {
    var json = JSON.stringify({ "Id": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaAnestesia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaAnestesia_Cargado,
        error: errores
    });
}

function ListaAnestesia_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#Anestesia").empty();
    $("#Anestesia").append($("<option></option>").val(0).html(""));
    $.each(Lista, function (index, Anestesia) {
        $("#Anestesia").append($("<option></option>").val(Anestesia.id).html(Anestesia.tipo));
        if (Anestesia.id == AnestesisId) $("#Anestesia").val(AnestesisId);
    });
}

function ListaCirujano() {
    var Especialidad = $("#Especialidad :selected").val();
    var json = JSON.stringify({ "Activo": "A", "Especialidad": Especialidad });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/List_Medicos_QuirofanobyEsp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirujano_Cargado,
        error: errores
    });
}

function ListaCirujano_Load(Especialidad) {
    var json = JSON.stringify({ "Activo": "A", "Especialidad": Especialidad });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/List_Medicos_QuirofanobyEsp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirujano_Cargado_Load,
        error: errores
    });
}

function ListaCirujano_Cargado_Load(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        if (Cirujano == Medico.Id)
            $("#Cirujano").append($("<option selected='selected'></option>").val(Medico.Id).html(Medico.Medico));
        else
            $("#Cirujano").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function ListaCirujano_Cargado(Resultado) {
    $("#Cirujano").empty();
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#Cirujano").append($("<option></option>").val(Medico.Id).html(Medico.Medico));        
    });
}

$("#Especialidad").change(function () {
    ListaCirujano();
});



function ListaCirugia(Id, estado, Cirugia_id) {
    if (Cirugia_id == null) { Cirugia_id = 0; }    
    var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Endoscopia/Endoscopia.asmx/Lista_Estudios_Endoscopia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado,
        error: errores
    });
}


function ListaCirugia_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#Cirugia").empty();
    $("#Cirugia").append($("<option></option>").val("0").html(""));
    $.each(Lista, function (index, Cirugia) {
        $("#Cirugia").append($("<option></option>").val(Cirugia.id).html(Cirugia.tipo));
        if (Cirugia.id == CirugiaId) $("#Cirugia").val(CirugiaId);
    });
} 


$("#btnOpciones").click(function () {
    $("#myModal").modal('show');
});

$("#btn_edicion_diagnostico").click(function () {
    $("#Aguarde_Momento").show();
    $("#txt_diagnosticos_edicion").val("");
    $("#editando_id_diagnostico").val("0");
    var json = JSON.stringify({ "Id": 0, "estado": true, "Cirugia_id": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Endoscopia/Endoscopia.asmx/Diagnostico_Planificar_Endoscopia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado_todos,
        error: errores
    });

});

function ListaCirugia_Cargado_todos(Resultado) {
    var Lista = Resultado.d;
    $("#select_diagnosticos").empty();
    $("#select_diagnosticos").append($("<option></option>").val("0").html("Nuevo diagnóstico"));
    $.each(Lista, function (index, Cirugia) {
        $("#select_diagnosticos").append($("<option></option>").val(Cirugia.id).html(Cirugia.diagnostico));
    });
    
    $("#Aguarde_Momento").hide();
    $("#Modal_Edicion_Diagnostico").modal('show');
    
}



$("#btn_edicion_cirugia").click(function () {
    $("#Aguarde_Momento").show();
    $("#txt_cirugias_edicion").val("");
    $("#editando_id_cirugia").val("0");
    var json = JSON.stringify({ "Id": 0, "estado": true, "Cirugia_id": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Endoscopia/Endoscopia.asmx/Endoscopia_Planificar_Endoscopia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado_todos_Cirugias_List,
        error: errores
    });

});

function ListaCirugia_Cargado_todos_Cirugias_List(Resultado) {
    var Lista = Resultado.d;
    $("#select_cirugias").empty();
    $("#select_cirugias").append($("<option></option>").val("0").html("Nueva Cirugía"));
    $.each(Lista, function (index, Cirugia) {
        $("#select_cirugias").append($("<option></option>").val(Cirugia.id).html(Cirugia.cirugia));
    });

    $("#Aguarde_Momento").hide();
    $("#Modal_Edicion_Cirugia").modal('show');
}





$("#select_diagnosticos").change(function () {
    if ($("#select_diagnosticos :selected").val() == "0") {
        $("#editando_id_diagnostico").val("0");
        $("#txt_diagnosticos_edicion").val("");
        $("#span_guardar").html("Agregar");
        $("#btn_diagnostico_guardar").removeClass("color_amarillo");
        $("#btn_diagnostico_guardar").addClass("color_verde");
    }
    else {
        $("#editando_id_diagnostico").val($("#select_diagnosticos :selected").val());
        $("#txt_diagnosticos_edicion").val($("#select_diagnosticos :selected").html());

        $("#span_guardar").html("Modificar");
        $("#btn_diagnostico_guardar").removeClass("color_verde");
        $("#btn_diagnostico_guardar").addClass("color_amarillo");
    }
});

$("#btn_diagnostico_cancelar").click(function () {
    $("#editando_id_diagnostico").val("0");
    $("#txt_diagnosticos_edicion").val("");
    $("#select_diagnosticos").prop("selectedIndex", 0);
    $('#Modal_Edicion_Diagnostico').modal('hide');

    $("#span_guardar").html("Agregar");
    $("#btn_diagnostico_guardar").removeClass("color_amarillo");
    $("#btn_diagnostico_guardar").addClass("color_verde");
});


$("#btn_cirugia_cancelar").click(function () {
    $("#editando_id_cirugia").val("0");
    $("#txt_cirugias_edicion").val("");
    $("#select_cirugias").prop("selectedIndex", 0);
    $('#Modal_Edicion_Cirugia').modal('hide');
});




//Suspender Cirugia...
$("#btnSuspender").click(function () {
    var Motivo = $("#Motivo :selected").val();
    if (Motivo > 0) {
        var json = JSON.stringify({ "Id": Id, "Motivo": Motivo });
        $.ajax({
            type: "POST",
            url: "../Json/Endoscopia/Endoscopia.asmx/SuspenderCirugia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cirugia_Suspendida,
            error: errores
        });
    }
    else alert('Seleccione Motivo de Suspensión');
});

//Reanudar Cirugia...
$("#btnReanudar").click(function () {
    var Motivo = $("#Motivo :selected").val();
    if (Motivo > 0) {
        var json = JSON.stringify({ "Id": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Reanudar/Reanudar.asmx/Reanudar_Endoscopia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cirugia_Reanudada,
            error: errores
        });
    }
    else alert('Seleccione Motivo de Suspensión');
});

function Cirugia_Suspendida(Resultado) {
    var r = Resultado.d;
    if (r > 0) {

        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Quirofano_Cir_Suspendidas.aspx?Cirugia_Id=' + Id + '&Fecha=' + $("#fecha_cirugia").val(),
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
            }
        });

    }
    else {
        alert("Error al Suspender Cirugia!!!");
    }
    //window.location = "CargadeTurnos.aspx";
}

function Cirugia_Reanudada(Resultado) {
    var r = Resultado.d;
    if (r > 0) alert("Cirugia Reanudada!!!");
    else alert("Error al Reanudar Cirugia!!!");
    //window.location = "CargadeTurnos.aspx";
    window.location = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
}



$("#btn_diagnostico_guardar").click(function () {

    var id = $("#editando_id_diagnostico").val();
    var Diagnostico = $("#txt_diagnosticos_edicion").val();

    if (Diagnostico.trim() == "") {
        alert("Falta Cargar el diagnóstico");
        return;
    }

    var json = JSON.stringify({ "Id": id, "Diagnostico": Diagnostico });
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/Guardar_Diagnostico_PlanificarEndoscopia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#cbo_Diagnostico").empty();
            $("#cbo_Diagnostico").append($("<option></option>").val("0").html(""));
            List_Diagnostico(0, true, Id);
            $("#Modal_Edicion_Diagnostico").modal('hide');
        },
        error: errores
    });
});





//Guardar Cirugia
$("#btn_cirugia_guardar").click(function () {

    var id = $("#editando_id_cirugia").val();
    var Cirugia = $("#txt_cirugias_edicion").val();

    if (Cirugia.trim() == "") {
        alert("Falta Cargar la cirugía");
        return;
    }


    var json = JSON.stringify({ "Id": id, "Cirugia": Cirugia });
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/Guardar_Endoscopia_PlanificarEndoscopia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#cbo_Cirugia").empty();
            $("#cbo_Cirugia").append($("<option></option>").val("0").html(""));
            ListaCirugia(0, true, Id);
            $("#Modal_Edicion_Cirugia").modal('hide');            
        },
        error: errores
    });
});


$("#btn_eliminar_cirugia_provisoria").click(function () {
    EliminarCirugia();
});



$("#btn_cirugia_eliminar").click(function () {
    EliminarCirugia();
});


function EliminarCirugia() {
    var r = confirm("¿Realmente desea eliminar ese tipo de cirugía");
    if (r == true) {
        var json = JSON.stringify({ "Id": $("#editando_id_cirugia").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Eliminar_Cirugia_PlanificarCirugia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                ListaCirugia(0, true, Id);
                $("#Modal_Edicion_Cirugia").modal('hide');
            },
            error: errores
        });
    }
}

$("#btn_diagnostico_eliminar").click(function () {

    var r = confirm("¿Realmente desea eliminar ese diagnóstico");
    if (r == true) {
        var json = JSON.stringify({ "Id": $("#editando_id_diagnostico").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Eliminar_Diagnostico_PlanificarCirugia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                List_Diagnostico(0, true, Id);
                $("#Modal_Edicion_Diagnostico").modal('hide');
            },
            error: errores
        });
    }
});

//Borrar Cirugia
$("#btnBorrar").click(function () {

    var r = confirm("¿Está seguro que desea eliminar la endoscopía?");
    if (r == true) {
        var json = JSON.stringify({ "Id": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Endoscopia/Endoscopia.asmx/BorrarEndoscopia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cirugia_Borrada,
            error: errores
        });
    }
});

function Cirugia_Borrada(Resultado) {
    var r = Resultado.d;
    if (r > 0) alert("Cirugia Borrada!!!");
    else alert("Error al Borrar Cirugia!!!");
    window.location = "CargadeTurnos.aspx";
}


function formatTime(time) {
    var result = false, m;
    var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    if ((m = time.match(re))) {
        result = (m[1].length == 2 ? "" : "0") + m[1] + ":" + m[2];
    }
    return result;
}

function isValidDate(s) {
    // format D(D)/M(M)/(YY)YY
    var dateFormat = /^\d{1,4}[\.|\/|-]\d{1,2}[\.|\/|-]\d{1,4}$/;

    if (dateFormat.test(s)) {
        // remove any leading zeros from date values
        s = s.replace(/0*(\d*)/gi, "$1");
        var dateArray = s.split(/[\.|\/|-]/);

        // correct month value
        dateArray[1] = dateArray[1] - 1;

        // correct year value
        if (dateArray[2].length < 4) {
            // correct year value
            dateArray[2] = (parseInt(dateArray[2]) < 50) ? 2000 + parseInt(dateArray[2]) : 1900 + parseInt(dateArray[2]);
        }

        var testDate = new Date(dateArray[2], dateArray[1], dateArray[0]);
        if (testDate.getDate() != dateArray[0] || testDate.getMonth() != dateArray[1] || testDate.getFullYear() != dateArray[2]) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

//Guardar Cirugia....
$("#btnGuardar").click(function () {

    var q = {};
    q.id = Id;
    q.nhc = $("#afiliadoId").val();
    if ($("#afiliadoId").val().trim() == "") {
        alert("Falta Cargar el paciente");
        return;
    }



    q.fecha = $("#fecha_cirugia").val();
    if ($("#fecha_cirugia").val().trim() == "") {
        alert("Falta Cargar la Fecha");
        return;
    }

    if (!isValidDate($("#fecha_cirugia").val().trim())) {
        alert("Ingrese una Fecha válida");
        return;
    }


    q.hora = $("#Hora").val();
    if ($("#Hora").val().trim() == "") {
        alert("Falta Cargar la hora");
        return;
    }

    q.hora_fin = $("#Hora_Fin").val();
    if ($("#Hora_Fin").val().trim() != "") {
        if (!formatTime($("#Hora_Fin").val().trim())) {
            alert("La hora ingresada no es válida");
            return;
        }   
    }

       

    if (!formatTime($("#Hora").val().trim())) {
        alert("La hora ingresada no es válida");
        return;
    }

    if ($("#Sala :selected").val().trim() == "0") {
        alert("Falta Cargar la sala");
        return;
    }

    //if ($("#Cama :selected").val().trim() == "0") {
    //    alert("Falta Cargar al cama");
    //    return;
    //}

    q.diagnostico_id = $("#cbo_Diagnostico :selected").val();
    //if ($("#chkUrgencia").is(':checked'))
    //    q.urgencia = true;
    //else q.urgencia = false;

    if ($('#urg_si:checked').val() == 'True') {
        q.urgencia = true;
    }
    else {
        q.urgencia = false;
    }

    q.sala_id = $("#Sala :selected").val();
    q.cama_id = $("#Cama :selected").val();
    q.cirugia_tipo_id = $("#Cirugia :selected").val();
    q.cirujano_especialidad_id = $("#Especialidad :selected").val();
    q.cirujano_id = $("#Cirujano :selected").val();
    q.ayudante_id = $("#Ayudante :selected").val();
    q.anestesista_id = $("#Anestesista :selected").val();
    q.anestesia_tipo_id = $("#Anestesia :selected").val();
    q.hemo = $("#Hemo").val();
    if ($("#chkHemo").is(':checked'))
        q.cbo_hemo = true;
    else
        q.cbo_hemo = false;
    if ($("#chkAnpa").is(':checked'))
        q.cbo_anpa = true;
    else
        q.cbo_anpa = false;
    if ($("#chkRayos").is(':checked'))
        q.cbo_rayos = true;
    else
        q.cbo_rayos = false;
    if ($("#chkMonitoreo").is(':checked'))
        q.cbo_monitoreo = true;
    else
        q.cbo_monitoreo = false;
    q.medico_solicitante = $("#MedSolicitante :selected").val();
    q.observaciones = $("#Observaciones").val();

    q.ayudante_id = $("#Ayte1 :selected").val();
    q.ayudante2_id = $("#Ayte2 :selected").val();
    q.ayudante3_id = $("#Ayte3 :selected").val();
    q.Monitoreo_id = $("#Monitorista :selected").val();
    q.Instrumentalista_Id = $("#Instrumentadora :selected").val();
    q.Circulante_id = $("#Circulante :selected").val();
    q.externo_medico = $("#Cirujano_Externo").val();
    q.externo_medico_matricula = $("#Matricula_Cirujano_Externo").val();

    var json = JSON.stringify({ "qobj": q });
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/GuardarEndoscopia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Guardada,
        error: errores
    });

});

function Cirugia_Guardada(Resultado) {
    var Id = Resultado.d;
    if (Id > 0) {
        if (IM_Guardo == 0) {
            alert("¡Endoscopía Guardada Correctamente!");
            window.location = "CargadeTurnos.aspx";
        }
        
        if (IM_Guardo == 1)
        {
            window.location = "ProEndoscoDibujo.aspx?Id=" + Id;
        }

        if (IM_Guardo == 2) {
            window.location = "ProEndoscoFCC.aspx?Id=" + Id;
        }

        if (IM_Guardo == 3) {
            window.location = "ProEndoscoFeda.aspx?Id=" + Id;
        }
        

        if (IM_Guardo == 4) {
            $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Endoscopia_Resumen_Endoscopia.aspx?Cirugia_id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
        }


        IM_Guardo = 0;
    }
    else alert("Error al Guardar Cirugia!!");
}

function LoadCirugia() {
    var json = JSON.stringify({"Id": Id, "Fecha": null ,"Baja":false});
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/ListaEndoscopia_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Endoscopia_Cargada,
        error: errores
    });
}

function Endoscopia_Cargada(Resultado) {
    var Cirugias = Resultado.d;
    $.each(Cirugias, function (index, Cirugia) {
        $(".opciones").removeAttr('disabled');
        CargarPacienteID(Cirugia.nhc);
        QueryFecha = Cirugia.fecha;
        Fecha_cirugia = Cirugia.fecha;
        //$("#fecha_cirugia").val(Cirugia.fecha);
        if (Cirugia.hora == "A/C") {
            $("#Hora").val();
        }
        else {
            $("#Hora").val(Cirugia.hora);
        }


        $("#Hora_Fin").val(Cirugia.hora_fin);
        

        if (Cirugia.urgencia == true) {
            $('input:radio[name="chkUrgencia"]').filter('[value="True"]').attr('checked', true);
        }
        else {
            $('input:radio[name="chkUrgencia"]').filter('[value="False"]').attr('checked', true);
        }
        CamaId = Cirugia.cama_id; //GetCama_Load(Cirugia.sala_id);
        SalaId = Cirugia.sala_id;
        CirugiaId = Cirugia.cirugia_tipo_id;
        EspecialidadId = Cirugia.cirujano_especialidad_id;
        DiagnosticoId = Cirugia.diagnostico_id;
        Cirujano = Cirugia.cirujano_id;
        ListaCirujano_Load(Cirugia.cirujano_especialidad_id);
        AyudanteId = Cirugia.ayudante_id;
        AnestesistaId = Cirugia.anestesista_id;
        AnestesisId = Cirugia.anestesia_tipo_id;
        MedSolicitante = Cirugia.medico_solicitante;
        GetCama(Quirofano_servicio_id);

        ayudante1_id = Cirugia.ayudante_id;
        ayudante2_id = Cirugia.ayudante2_id;
        ayudante3_id = Cirugia.ayudante3_id;
        Monitoreo_id = Cirugia.Monitoreo_id;
        Instrumentalista_Id = Cirugia.Instrumentalista_Id;
        Circulante_id = Cirugia.Circulante_id;

        ListMotivo(Cirugia.motivo_susp_id);

        $("#Cirujano_Externo").val(Cirugia.externo_medico);
        $("#Matricula_Cirujano_Externo").val(Cirugia.externo_medico_matricula);


        if (Cirugia.motivo_susp_id != 0) {
            $("#btnSuspender").hide();
            $("#btnReanudar").show();
        }
        else {
            $("#btnReanudar").hide();
            $("#btnSuspender").show();
        }

        motivo_cancelada = Cirugia.motivo_susp_id;
        ListaAnestesia();
        List_Medicos_Quirofano();
        ListaCirugia(0, true, Cirugia.id);
        $("#Hemo").val(Cirugia.hemo);
        if (Cirugia.cbo_hemo == true)
            $("#chkHemo").attr('checked', true);
        if (Cirugia.cbo_anpa == true)
            $("#chkAnpa").attr('checked', true);
        if (Cirugia.cbo_rayos == true)
            $("#chkRayos").attr('checked', true);
        if (Cirugia.cbo_monitoreo == true)
            $("#chkMonitoreo").attr('checked', true);
        $("#Observaciones").val(Cirugia.observaciones);
        $("#controlMotivo").show();

        InitControlsCirugia();
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}


//Datos de la intervencion
$("#btnIntervencion").click(function () {
    window.location = "DatosIntervencion.aspx?Id=" + Id;
});



//ProEndoscoDibujo
$("#btnOpcion1").click(function () {
        //Guardo antes de enviar...
        IM_Guardo = 1;
        $("#btnGuardar").click();
    });

    //ProEndoscoDibujoFCC
    $("#btnOpcion2").click(function () {
        //Guardo antes de enviar...
        IM_Guardo = 2;
        $("#btnGuardar").click();
    });

    //ProEndoscoDibujoFCC
    $("#btnOpcion3").click(function () {
        //Guardo antes de enviar...
        IM_Guardo = 3;
        $("#btnGuardar").click();
    });

    



$("#btnVolver").click(function () {
    //volver
    IM_Guardo = 3;
    $("#btnGuardar").click();
});



$("#btn_cancelar").click(function () {
    if (QueryFecha != '')
        window.location = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
    else
        window.location = "CargadeTurnos.aspx";
});


$("#btn_volver_1").click(function () {
    if (QueryFecha != '')
        window.location = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
    else
        window.location = "CargadeTurnos.aspx";
});


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}



function Cargar_Sala_y_Cama() {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Cargar_Sala_y_Cama",
        contentType: "application/json; charset=utf-8",
        data: '{Quirofano_ID: "' + Id + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#Cargado_Sala").html(lista.Sala);
            $("#Cargado_Cama").html(lista.Cama);
        },
        error: errores
    });
}



function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}


function UltimoAporte_OK() {
    if (Ultimo_OK == 1) { return false; }
    var json = JSON.stringify({ "Documento": $("#CargadoDNI").html() });
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/UltimoAporte_OK",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Ultimo_OK = 1;
            var ok = Resultado.d;
            if (!ok) {
                alert("No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.");
                $("#IconoVencido").attr("src", "../img/Icono_ERROR.gif")
                $("#IconoVencido2").attr("src", "../img/Icono_ERROR.gif")

                $("#IconoVencido").attr("data-original-title", "Problemas Aportes 3 meses");
                $("#IconoVencido2").attr("data-original-title", "Problemas Aportes 3 meses");

                if ($("[rel=tooltip]").length) {
                    $("[rel=tooltip]").tooltip();
                }
                //$("#desdeaqui").remove();
            }
            else {
                $("#IconoVencido").attr("src", "../img/Icono_OK.gif")
                $("#IconoVencido2").attr("src", "../img/Icono_OK.gif")
            }
            $("#SpanCargando").show();
        }
    });
}


    function VerificarPMI(PacienteID) {
        $.ajax({
            type: "POST",
            url: "../Json/Gente/ActualizarGente.asmx/VerificarPMI",
            data: '{PacienteId: "' + PacienteID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",            
            error: errores
        });
    }

    function CertificadoVencido(DNI) {
        $.ajax({
            type: "POST",
            url: "../Json/Discapacidad/Discapacidad.asmx/VerificarFechaCertificado",
            data: '{DNI: "' + DNI + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: errores
        });
    }



    function VerificarPMI(PacienteID) {
        $.ajax({
            type: "POST",
            url: "../Json/Gente/ActualizarGente.asmx/VerificarPMI",
            data: '{PacienteId: "' + PacienteID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $("#verificarPMI").val(Resultado.d);
            },
            error: errores
        });
    }

    $("[rel='tooltip']").tooltip();




    //Parte de AMB de Cirugias
    $("#select_cirugias").change(function () {
        if ($("#select_cirugias :selected").val() == "0") {
            $("#editando_id_cirugia").val("0");
            $("#txt_cirugias_edicion").val("");
            $("#span_guardar").html("Agregar");
            $("#btn_cirugia_guardar").removeClass("color_amarillo");
            $("#btn_cirugia_guardar").addClass("color_verde");
        }
        else {
            $("#editando_id_cirugia").val($("#select_cirugias :selected").val());
            $("#txt_cirugias_edicion").val($("#select_cirugias :selected").html());

            $("#span_cirugia_guardar").html("Modificar");
            $("#btn_cirugia_guardar").removeClass("color_verde");
            $("#btn_cirugia_guardar").addClass("color_amarillo");
        }
    });


    //Cancelar cirugia
    $("#btn_cirugia_cancelar").click(function () {
        $("#editando_id_cirugia").val("0");
        $("#txt_cirugias_edicion").val("");
        $("#select_cirugias").prop("selectedIndex", 0);
        $('#Modal_Edicion_Cirugia').modal('hide');

        $("#span_cirugia_guardar").html("Agregar");
        $("#btn_cirugia_guardar").removeClass("color_amarillo");
        $("#btn_cirugia_guardar").addClass("color_verde");

    });


    $("#Imprimir_IQ").click(function () {
        IM_Guardo = 4;
        $("#btnGuardar").click();
    });



    function CambiarPacientePopUp() {
        $("#div_cambiar_paciente").show();
        $("#fecha_cirugia").attr('disabled', 'disabled');
    }


    $("#txt_cambiar_nhc").change(function () {
        buscar_pacientes_para_cambiar();
    });

    function buscar_pacientes_para_cambiar() {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
            data: '{NHC: "' + $("#txt_cambiar_nhc").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: MostrarDatos_Para_Cambiar,
            error: errores
        });
    }

    var Paciente_a_Cambiar = 0;

    function MostrarDatos_Para_Cambiar(Resultado) {
        var Paciente = Resultado.d;
        var PError = false;
        $.each(Paciente, function (index, paciente) {
            if (paciente.Vencido) {
                alert("Paciente dado de baja el día: " + paciente.FechaVencido);
            }

            VerificarPMI(paciente.documento);

            
            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

            $("#paciente_cambiar_nombre").html(paciente.Paciente + " (" + paciente.Edad_Format + ")");
                        
            $("#paciente_cambiar_documento").html(paciente.documento_real);

            Paciente_a_Cambiar = paciente.documento;
            $("#span_titulo_documento").html(paciente.TipoDoc);

            $("#paciente_cambiar_telefono").html(paciente.Telefono);
            //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');


            $("#paciente_cambiar_seccional").html(paciente.Seccional);
            if (paciente.Nro_Seccional == 998) {
                $("#span_titulo_seccional").html("Ob. Social: ");
                $("#paciente_cambiar_seccional").html(paciente.ObraSocial);
            }

        });
    }

    $("#btn_cambiar_paciente_final").click(function () {
        RealizarCambioPaciente();
    });

    function RealizarCambioPaciente() {
        var json = JSON.stringify({ "CirugiaId": Id, "PacienteId": Paciente_a_Cambiar });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/CambiarPaciente",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                document.location = "Planificar-Endoscopia.aspx?Cirugia_Id=" + Id;
            },
            error: errores
        });
    }