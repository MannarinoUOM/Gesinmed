var Id = 0;
var Cirugia = 0;
var Cirujano;
var Cama;
var obj = {};
var Efectuada;
var DiagnosticoId;


$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

$(document).ready(function () {
    var Query = {};
    Query = GetQueryString();
    Id = Query['Id'];
    Cirugia = Id;
    ListTipoDoc();
    if (Id > 0) {
        LoadCirugia();
        Cargar_Sala_y_Cama();
    }
    else InitControls();
});

function InitControls() {
    $("#fecha_cirugia").datepicker();
    $("#HoraFin").mask("99:99", { placeholder: "-" });
    List_Diagnostico(0, true, Id);
    GetSala();
    Especialidades_Lista();
    List_Medicos();
    List_Medicos_Quirofano();
    ListaAnestesia();
    ListaCirugia();    
}

$('#HoraFin').change(function () {

    ErrorHora = false;
    var hora = $('#HoraFin').val();
    if ($('#HoraFin').val().length == 5) {

        var h1 = hora.charAt(0);
        var h2 = hora.charAt(1);
        var dp = hora.charAt(2);
        var m1 = hora.charAt(3);

        if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
        if (m1 > 5) { ErrorHora = true; }
        if (dp != ":") { ErrorHora = true; }
        if (ErrorHora) {
            $('#HoraFin').val("");
        }
    }
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$("#btnVolver").click(function () {
    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
});

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
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
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

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


//        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
//        if (AnioNacimiento.getFullYear() == 0) {
//            edad = S / FN;
        //        }

        $("#txt_dni").val(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

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
    alert('Error: ' + msg.responseText);
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function List_Diagnostico(Id, estado, Cirugia_id) {
    if (Cirugia_id == null) { Cirugia_id = 0; }
    var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico_Planificar_Cirugia",
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


function List_Diagnostico_viejo(Id, estado) {
    var json = JSON.stringify({ "Id": Id, "estado": estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Diagnostico_Cargado,
        error: errores
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function List_Diagnostico_Cargado_viejo(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Diagnostico) {
        $("#cbo_Diagnostico").append($("<option></option>").val(Diagnostico.id).html(Diagnostico.diagnostico));
        if (Diagnostico.id == obj.diagnostico_id) $("#cbo_Diagnostico").val(Diagnostico.id);
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
        if (Medico.Id == obj.medico_solicitante) $("#MedSolicitante").val(Medico.Id);
    });

}

function ListMotivo(Motivo_id) {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListMotivo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListMotivo_Cargado,
        error: errores,
        complete: function () {
            $("#Motivo").val(Motivo_id);
        }
    });
}

function ListMotivo_Cargado(Resultado) {
    var Lista = Resultado.d;
    var texto = "<option value='0'>Seleccione el motivo</option>";
    $.each(Lista, function (index, Motivo) {
        //$("#Motivo").append($("<option></option>").val(Motivo.id).html(Motivo.motivo));
        texto = texto + "<option value='" + Motivo.id + "'>" + Motivo.motivo + "</option>";
    });
    $("#Motivo").html(texto);
}

function GetCama(Sala) {
    var json = JSON.stringify({ "IdCama": 0, "Sala": parseInt(Sala) });
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
    $.each(Lista, function (index, Cama) {
        $("#Cama").append($("<option></option>").val(Cama.id).html(Cama.descripcion));
        if (Cama.id == obj.cama_id) $("#Cama").val(Cama.id);
    });
}

function GetCama_Load(Sala) {
    var json = JSON.stringify({ "IdCama": 0, "Sala": parseInt(Sala) });
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
    $.each(Lista, function (index, Cama) {
        if (Cama.id == obj.cama_id)
            $("#Cama").append($("<option selected='selected'></option>").val(Cama.id).html(Cama.descripcion));
        else
            $("#Cama").append($("<option></option>").val(Cama.id).html(Cama.descripcion));
    });
}


function GetSala() {
    var json = JSON.stringify({ "Servicio": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas_S",
        data: json,
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
        if (Sala.id == obj.sala_id) {
            $("#Sala").val(Sala.id);
            GetCama(Sala.id);
        }
    });
}

$("#Sala").change(function () {
    var Sala = $("#Sala :selected").val();
    GetCama(Sala);
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
        if (Especialidad.Id == obj.cirujano_especialidad_id) {
            $("#Especialidad").val(Especialidad.Id);
            ListaCirujano_Load(obj.cirujano_especialidad_id);
        }
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
        if (Medico.Id == obj.ayudante_id) $("#Ayudante").val(Medico.Id);

        $("#1Ayudante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == obj.ayudante_id) $("#1Ayudante").val(Medico.Id);

        $("#2Ayudante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == obj.ayudante2_id) $("#2Ayudante").val(Medico.Id);

        $("#3Ayudante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == obj.ayudante3_id) $("#3Ayudante").val(Medico.Id);

        $("#Circulante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == obj.Circulante_id) $("#Circulante").val(Medico.Id);

        $("#cboMonitoreo").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == obj.Monitoreo_id) $("#cboMonitoreo").val(Medico.Id);

        $("#Instrumentadora").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == obj.Instrumentalista_Id) $("#Instrumentadora").val(Medico.Id);

        $("#Anestesista").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        if (Medico.Id == obj.anestesista_id) $("#Anestesista").val(Medico.Id);
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
    $.each(Lista, function (index, Anestesia) {
        $("#Anestesia").append($("<option></option>").val(Anestesia.id).html(Anestesia.tipo));
        if (Anestesia.id == obj.anestesia_tipo_id) $("#Anestesia").val(Anestesia.id);
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
        if (obj.cirujano_id == Medico.Id)
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

function ListaCirugia() {
    var json = JSON.stringify({ "Id": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado,
        error: errores
    });
}

function ListaCirugia_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Cirugia) {
        $("#Cirugia").append($("<option></option>").val(Cirugia.id).html(Cirugia.tipo));
        if (Cirugia.id == obj.cirugia_tipo_id) $("#Cirugia").val(Cirugia.id);
    });
}


//Guardar Cirugia....
$("#btnGuardar").click(function () {
    var q = {};
    q.id = Id;
    q.nhc = $("#CargadoNHC").html();
    q.fecha = $("#fecha_cirugia").val();
    q.hora = $("#Hora").val();
    q.diagnostico_id = $("#cbo_Diagnostico :selected").val();
    if ($("#chkUrgencia").is(':checked'))
        q.urgencia = true;
    else q.urgencia = false;
    q.sala_id = $("#Sala :selected").val();
    q.cama_id = $("#Cama :selected").val();
    q.cirugia_tipo_id = $("#Cirugia :selected").val();
    q.cirujano_especialidad_id = $("#Especialidad :selected").val();
    q.cirujano_id = $("#Cirujano :selected").val();
    q.ayudante_id = $("#1Ayudante :selected").val();
    q.ayudante2_id = $("#2Ayudante :selected").val();
    q.ayudante3_id = $("#3Ayudante :selected").val();
    q.Instrumentalista_Id = $("#Instrumentadora :selected").val();
    q.Circulante_id = $("#Circulante :selected").val();
    q.Monitoreo_id = $("#cboMonitoreo :selected").val();
    q.hora_fin = $("#HoraFin").val();
    q.efectuada = true;
    q.anestesista_id = $("#Anestesista :selected").val();
    q.anestesia_tipo_id = $("#Anestesia :selected").val();
    q.hemo = $("#Hemo").val();
    if (Efectuada == false) {
        q.usuario_id_modificacion = 0;
        q.motivo_modificacion = null;
    }
    else {
        q.usuario_id_modificacion = 0;
        if ($("#Motivo :selected").val() == 0) {
            $("#pedido_id_tab").click();
            alert("Falta seleccionar el motivo de la modificación");
            return false;
        }
        q.motivo_modificacion = $("#Motivo").val();

    }
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

    q.externo_medico = $("#externo_medico").val();
    q.externo_medico_matricula = $("#externo_medico_matricula").val();

    var json = JSON.stringify({ "qobj": q });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/UpdateTurnoCirugia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Guardada,
        error: errores
    });
});

function Cirugia_Guardada(Resultado) {
    var IdInt = Resultado.d;
    if (IdInt > 0) {
        alert("La intervención ha sido guardada Correctamente!");
        window.location = "Planificar-Cirugia.aspx?Id=" + Cirugia;
    }
    else alert("Error al Guardar Intervención!!");
}

function LoadCirugia() {
    var json = JSON.stringify({ "Id": Id, "Fecha": null, "Baja": false });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Cargada,
        error: errores
    });
}

function Cirugia_Cargada(Resultado) {
    var Cirugias = Resultado.d;
    $.each(Cirugias, function (index, Cirugia) {
        CargarPacienteID(Cirugia.nhc);
        DiagnosticoId = Cirugia.diagnostico_id;
        obj = Cirugia;
        Efectuada = Cirugia.efectuada;
        if (Efectuada == true) {
            $("#motivorow").show();
            $("#MotivoUsu").val(Cirugia.usuario_modificacion);
            ListMotivo(Cirugia.motivo_modificacion);
        }
        $("#fecha_cirugia").val(Cirugia.fecha);
        $("#Hora").val(Cirugia.hora);
        if (Cirugia.urgencia == true)
            $("#chkUrgencia").attr('checked', true);

        $("#HoraFin").val(Cirugia.hora_fin);
        $("#Hemo").val(Cirugia.hemo);
        if (Cirugia.cbo_hemo == true)
            $("#chkHemo").attr('checked', true);
        if (Cirugia.cbo_anpa == true)
            $("#chkAnpa").attr('checked', true);
        if (Cirugia.cbo_rayos == true)
            $("#chkRayos").attr('checked', true);
        if (Cirugia.cbo_monitoreo == true)
            $("#chkMonitoreo").attr('checked', true);
        $("#MedSolicitante").val(Cirugia.medico_solicitante);
        $("#Observaciones").val(Cirugia.observaciones);

        $("#externo_medico").val(Cirugia.externo_medico);
        $("#externo_medico_matricula").val(Cirugia.externo_medico_matricula);

        $("#controlMotivo").show();
        InitControls();
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    
}




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




$("#btn_Imprimir").click(function () {

    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Quirofano_Datos_Internacion.aspx?Cirugia_id=' + Id,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false            
        });
    });


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