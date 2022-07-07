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
var cambio = false;

var ProtocoloNuevo = true;

var fecha_traida = "";

var IM_Guardo = 0;

var cirugias_listas_cargadas = [];
var diagnosticos_listas_cargadas = [];

var diag_ant_guardar = "";
var cir_ant_guardar = "";
var urg = 0;


$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});


Cargar_Seccionales_Lista();

$(document).ready(function () {

    var Query = {};
    ListTipoDoc();
    Query = GetQueryString();


    if (Query['FECHA_TRAIDA'] != null) {
        fecha_traida = Query['FECHA_TRAIDA'];
    }
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
    }

    if (Query["ID"] != "" && Query["ID"] != null) {
        $("#afiliadoId").val(Query["ID"]);
        CargarPacienteID(Query["ID"]);
    }

    Id = Query['Cirugia_Id'];
    if (Id > 0) {
        ProtocoloNuevo = false;
        LoadCirugia();
        Quirofano_Estados();
        Cargar_Sala_y_Cama();
    }
    else {
        InitControls();
        $("#btnVolver").hide();
        Listar_Instrumentadores(0, 240, 0);
        Listar_Circulante(0, 240, 0);
        Listar_Anestesista(0, 149, 0);
    }

    if (Id > 0) {
        PermisoEdicion(Id);
    }

    VerificarUsuarioCirujano();
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
    $("#Hora_Inicio").mask("99:99", { placeholder: "__:__" });


    if (fecha_traida == "") {
        fecha_traida = FechaActual();
    }   
    $("#fecha_cirugia").val(fecha_traida);
    $("#fecha_cirugia").datepicker();
    List_Diagnostico(0, true, Id);
    GetCama(0);
    GetSala();   
    Especialidades_Lista();
    List_Medicos();
    List_Medicos_Quirofano();
    ListaAnestesia();
    ListaCirugia(0, true, Id);
    ListaDiagnostico(0, true, Id);
    $("#Imprimir_IQ").hide();        
}

function InitControlsCirugia() {
    $("#txtNHC").mask("9999999999?9", { placeholder: "" });
    $("#txt_dni").mask("9999999?9", { placeholder: "" });
    $("#Hora").mask("99:99");
    $("#Hora_Fin").mask("99:99");
    $("#Hora_Inicio").mask("99:99");    
    $("#fecha_cirugia").mask("99/99/9999", { placeholder: "-" });
    $("#fecha_cirugia").val(Fecha_cirugia);
    fecha_traida = Fecha_cirugia;
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


//
//$("#btnBuscarPaciente").fancybox({
//    'href': '../Turnos/BuscarPacientes.aspx?Express=0&FECHA_TRAIDA=' + fecha_traida,
//    'hideOnContentClick': true,
//    'width': '75%',
//    'height': '75%',
//    'autoScale': false,
//    'transitionIn': 'none',
//    'transitionOut': 'none',
//    'type': 'iframe'
//});

$("a#inline").fancybox({
    'hideOnContentClick': true
});

function RecargarPagina(url) {
    document.location = "../Quirofano/Planificar-Cirugia.aspx" + url + "&FECHA_TRAIDA=" + fecha_traida;
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

        $("#btnCancelarPedidoTurno2").show();

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        if (paciente.NHC_UOM == "200") {
            $("#opciones_quiro").hide();
            $(".ver_mas_datos").hide();
            $("#IconoVencido2").hide();
            if (Id > 0) {
                $("#cambiar_paciente").show();
            }
            $("#btn_eliminar_cirugia_provisoria").show();
            $("#btn_otro_paciente2").hide();
        }

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
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

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

            $("#btnCancelarPedidoTurno2").show();

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
            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

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

//btnCancelarPedidoTurno
$("#btnCancelarPedidoTurno2").click(function () {
    document.location = "../Quirofano/Planificar-Cirugia.aspx?FECHA_TRAIDA=" + fecha_traida;
});

$("#btn_otro_paciente2").click(function () {
    document.location = "../Quirofano/Planificar-Cirugia.aspx?FECHA_TRAIDA=" + fecha_traida;
});



$("#btnBuscarPaciente").click(function () {
    BuscarPacientes_fancy();
});

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

//function List_Medicos() {
//    var json = JSON.stringify({ "Id": 0 });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Medicos.asmx/MedicoBuscar_Info_Todos",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: List_Medicos_Cargado,
//        error: errores
//    });
//}

//function List_Medicos_Cargado(Resultado) {
//    var Lista = Resultado.d;
//    $.each(Lista, function (index, Medico) {
//        $("#MedSolicitante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
//        if (MedSolicitante == Medico.Id) $("#MedSolicitante").val(MedSolicitante);
//    });

//}


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
        url: "../Json/Quirofano/Quirofano_.asmx/ListMotivo",
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
        if (Sala.id != "1560000018") {
            $("#Sala").append($("<option></option>").val(Sala.id).html(Sala.descripcion));
            if (SalaId == Sala.id) $("#Sala").val(SalaId);
        }
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
        
        
        
        //$("#Anestesista").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == AnestesistaId) $("#Anestesista").val(AnestesistaId);
        
        //$("#Circulante").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == Circulante_id) $("#Circulante").val(Medico.Id);



        //if (Medico.Id == AyudanteId) $("#Ayudante").val(AyudanteId);        

        //$("#Ayte2").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == ayudante2_id) $("#Ayte2").val(Medico.Id);

        //$("#Ayte3").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == ayudante3_id) $("#Ayte3").val(Medico.Id);

        //$("#Monitorista").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == Monitoreo_id) $("#Monitorista").val(Medico.Id);

        //$("#Instrumentadora").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == Instrumentalista_Id) $("#Instrumentadora").val(Medico.Id);

        
        
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
    $("#Cirujano").html('');
    //$("#Ayte1").html('');
    
    $("#Cirujano").append($("<option></option>").val("0").html("NINGUNO"));
    //$("#Ayte1").append($("<option></option>").val("0").html("NINGUNO"));

    $.each(Lista, function (index, Medico) {
        if (Cirujano == Medico.Id) {
            $("#Cirujano").append($("<option selected='selected'></option>").val(Medico.Id).html(Medico.Medico));
        }
        else {
            $("#Cirujano").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        }

        //$("#Ayte1").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == ayudante1_id) $("#Ayte1").val(Medico.Id);

    });
}

function ListaCirujano_Cargado(Resultado) {
    $("#Cirujano").html('');
    //$("#Ayte1").html('');

    $("#Cirujano").append($("<option></option>").val("0").html("NINGUNO"));
    //$("#Ayte1").append($("<option></option>").val("0").html("NINGUNO"));

    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#Cirujano").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //$("#Ayte1").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        //if (Medico.Id == ayudante1_id) $("#Ayte1").val(Medico.Id);
    });

    
    
}

$("#Especialidad").change(function () {
    //ListaCirujano();
    Listar_Cirujano(-1, $("#Especialidad").val(), 0);
});



function ListaCirugia(Id, estado, Cirugia_id) {
    if (Cirugia_id == null) { Cirugia_id = 0; }    
    var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado,
        error: errores
    });
}


var Cirugias_Check = [];

function Leer_Listas_Cirugias() {
    Cirugias_Check = [];
    $('#span_cirugias_cargadas input[type="checkbox"]:checked').each(function (i, el) {
        Cirugias_Check.push($("#label_" + el.id).html());        
    });

    var lista_cargada = "";
    $.each(Cirugias_Check, function (key, value) {        
        lista_cargada = lista_cargada + " + " + value;
    });
    $("#txt_cirugias").val(lista_cargada.replace(" + ", ""));    

}


function ListaCirugia_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#Cirugia").empty();
    $("#span_cirugias_cargadas").empty();
    var lista_cirugias = "";
    //$("#span_cirugias_cargadas").html("<label for='ck_cir_" + Cirugia.id + "'>" + Cirugia.tipo + "</label> <input type='checkbox' id='ck_cir_" + Cirugia.id + "' />");
    $("#Cirugia").append($("<option></option>").val("0").html(""));
    $.each(Lista, function (index, Cirugia) {
        $("#Cirugia").append($("<option></option>").val(Cirugia.id).html(Cirugia.tipo));
        if (Cirugia.id == CirugiaId) $("#Cirugia").val(CirugiaId);
        lista_cirugias = lista_cirugias + "<div id='div_ck_cir_" + Cirugia.id + "'><input class='ck_class_cirugias' type='checkbox' onclick='Leer_Listas_Cirugias();' id='ck_cir_" + Cirugia.id + "' /> <label id='label_ck_cir_" + Cirugia.id + "' for='ck_cir_" + Cirugia.id + "'>" + Cirugia.tipo + "</label></div>";
    });
    $("#span_cirugias_cargadas").html(lista_cirugias);

    cir_ant_guardar = cirugias_listas_cargadas;

    var separated = cirugias_listas_cargadas.split(",");
    $.each(separated, function (index, los_ids) {
        $("#ck_cir_" + los_ids).prop('checked', true);
        //Cirugias_Check.push(los_ids);
    }); 

    Leer_Listas_Cirugias();
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
        url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico_Planificar_Cirugia",
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
        url: "../Json/Quirofano/Quirofano_.asmx/Cirugia_Planificar_Cirugia",
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
    $("#txt_filtro_diagnostico").val("");

    $("#span_guardar").html("Agregar");
    $("#btn_diagnostico_guardar").removeClass("color_amarillo");
    $("#btn_diagnostico_guardar").addClass("color_verde");
});


$("#btn_cirugia_cancelar").click(function () {
    $("#editando_id_cirugia").val("0");
    $("#txt_cirugias_edicion").val("");
    $("#txt_filtro_cirugia").val("");
    $("#select_cirugias").prop("selectedIndex", 0);
    $('#Modal_Edicion_Cirugia').modal('hide');
});




$("#btn_suspender_cirugia_provisoria").click(function () {
    $("#btnSuspender").click();
});


//Suspender Cirugia...
$("#btnSuspender").click(function () {
    var Motivo = $("#Motivo :selected").val();
    if (Motivo > 0) {
        var json = JSON.stringify({ "Id": Id, "Motivo": Motivo });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/SuspenderCirugia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cirugia_Suspendida,
            error: errores
        });
    }
    else alert('Seleccione Motivo de Suspensión');
});

$("#btn_reanudar_cirugia_provisoria").click(function () {
    $("#btnReanudar").click();
});

//Reanudar Cirugia...
$("#btnReanudar").click(function () {
    var Motivo = $("#Motivo :selected").val();
    if (Motivo > 0) {
        var json = JSON.stringify({ "Id": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/ReanudarCirugia",
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

        ImprimirSuspension(Id);

    }
    else {
        alert("Error al Suspender Cirugia!!!");
    }
    //window.location = "CargadeTurnos.aspx";
}

function ImprimirSuspension(Id) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Quirofano_Cir_Suspendidas.aspx?Cirugia_Id=' + Id + '&Fecha=' + $("#fecha_cirugia").val(),
            'width': '95%',
            'height': '95%',
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
        url: "../Json/Quirofano/Quirofano_.asmx/Guardar_Diagnostico_PlanificarCirugia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#cbo_Diagnostico").empty();
            $("#cbo_Diagnostico").append($("<option></option>").val("0").html(""));
            //List_Diagnostico(0, true, Id);
            ListaDiagnostico(0, true, Id);
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
        url: "../Json/Quirofano/Quirofano_.asmx/Guardar_Cirugia_PlanificarCirugia",
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
    $("#btnBorrar").click();
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

    var r = confirm("¿Está seguro que desea eliminar la cirugía?");
    if (r == true) {
        var json = JSON.stringify({ "Id": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/BorrarCirugia",
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
    window.location = "CargadeTurnos.aspx?QueryFecha=" + fecha_traida;
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

function GuardarLaCirugia() {


    if (!PermisoEdicion_PuedoGuardar) {
        Linkear(Id);
        return false;
    }



    var cirugias_ck = "";
    $('#span_cirugias_cargadas input[type="checkbox"]:checked').each(function (i, el) {
        cirugias_ck = cirugias_ck + "," + el.id;
    });
    cirugias_ck = cirugias_ck.replace(",", "").replace(/ck_cir_/gi, "");

    if (cirugias_ck == "") {
        alert("Falta Seleccionar el tipo de Cirugía");
        return;
    }




    var diagnosticos_ck = "";
    $('#span_diagnosticos_cargados input[type="checkbox"]:checked').each(function (i, el) {
        diagnosticos_ck = diagnosticos_ck + "," + el.id;
    });
    diagnosticos_ck = diagnosticos_ck.replace(",", "").replace(/ck_diag_/gi, "");

    if (diagnosticos_ck == "") {
        alert("Falta Seleccionar el/los Diagnostico/s");
        return;
    }







    var q = {};
    q.cirugias_ck = cirugias_ck;
    q.diagnosticos_ck = diagnosticos_ck;

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


    //    q.diagnostico_id = $("#cbo_Diagnostico :selected").val();
    //    if (q.diagnostico_id < 1 || q.diagnostico_id == "") {
    //        alert("Falta Cargar el diagnóstico");
    //        return;
    //    }






    q.hora = $("#Hora").val();
    if ($("#Hora").val().trim() == "") {
        alert("Falta Cargar la hora");
        return;
    }




    if (!formatTime($("#Hora").val().trim())) {
        alert("La hora ingresada no es válida");
        return;
    }

    if ($("#Sala :selected").val().trim() == "0") {
        alert("Falta Seleccionar la sala");
        return;
    }

    //if ($("#Cama :selected").val().trim() == "0") {
    //    alert("Falta Cargar al cama");
    //    return;
    //}


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
    if (q.sala_id < 1 || q.sala_id == "") {
        alert("Falta Seleccionar la sala");
        return;
    }

    q.cama_id = $("#Cama :selected").val();
    if (q.cama_id < 1 || q.cama_id == "") {
        alert("Falta Seleccionar la cama");
        return;
    }

    //q.cirugia_tipo_id = $("#Cirugia :selected").val();
    //if (q.cirugia_tipo_id < 1 || q.cirugia_tipo_id == "") {
    //    alert("Falta Seleccionar el tipo de Cirugía");
    //    return;
    //}



    q.cirujano_especialidad_id = $("#Especialidad :selected").val();
    if (q.cirujano_especialidad_id < 1 || q.cirujano_especialidad_id == "") {
        alert("Falta Seleccionar la Especialidad");
        return;
    }

    q.cirujano_id = $("#Cirujano :selected").val();
    if (q.cirujano_id < 1 || q.cirujano_id == "") {
        alert("Falta Seleccionar el Cirujano");
        return;
    }


    q.ayudante_id = $("#Ayudante :selected").val();
    q.anestesista_id = $("#Anestesista :selected").val();
    q.anestesia_tipo_id = $("#Anestesia :selected").val();
    if (q.anestesia_tipo_id < 1 || q.anestesia_tipo_id == "") {
        alert("Falta Seleccionar el tipo de anestesia");
        return;
    }



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
    q.peso = $("#Peso").val();


    q.hora_inicio = $("#Hora_Inicio").val();
    if ($("#Hora_Inicio").val().trim() != "") {
        if (!formatTime($("#Hora_Inicio").val().trim())) {
            alert("La hora de Inicio ingresada no es válida");
            return;
        }
    }


    q.hora_fin = $("#Hora_Fin").val();
    if ($("#Hora_Fin").val().trim() != "") {
        if (!formatTime($("#Hora_Fin").val().trim())) {
            alert("La hora Fin ingresada no es válida");
            return;
        }
    }

    //28/03/2016 - Pedido por Roxana
    //Esto es para bloquear el botón una vez pulsado y evitamos más de un click.
    //$("#btnGuardar").attr('disabled', 'disabled');

    var json = JSON.stringify({ "qobj": q });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/GuardarCirugia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Guardada,
        error: errores
    });

}

//Guardar Cirugia....
$("#btnGuardar").click(function () {
    IM_Guardo = 0;
    GuardarLaCirugia();
});

function Linkear(Id) {
    if (IM_Guardo == 0) {
        alert("¡Cirugía Guardada Correctamente!");
        cambio = false;
        if (ProtocoloNuevo) {
            window.location = "CargadeTurnos.aspx?QueryFecha=" + fecha_traida;
        }
        else {
            return;
        }
        //window.location = "CargadeTurnos.aspx?QueryFecha=" + fecha_traida;
    }
    else {
        if (cambio) {
            var r = confirm("¿Desea continuar sin guardar los datos?");
            if (r == false) {
                return;
            }
        }


        //TODO ES TO ES PARA REVISAR EL DIAGNOSTICO Y CIRUGIA....
        var cirugias_ck_final = "";
        $('#span_cirugias_cargadas input[type="checkbox"]:checked').each(function (i, el) {
            cirugias_ck_final = cirugias_ck_final + "," + el.id;
        });
        cirugias_ck_final = cirugias_ck_final.replace(",", "").replace(/ck_cir_/gi, "");


        var diagnosticos_ck_final = "";
        $('#span_diagnosticos_cargados input[type="checkbox"]:checked').each(function (i, el) {
            diagnosticos_ck_final = diagnosticos_ck_final + "," + el.id;
        });
        diagnosticos_ck_final = diagnosticos_ck_final.replace(",", "").replace(/ck_diag_/gi, "");


        if (diag_ant_guardar != diagnosticos_ck_final || cir_ant_guardar != cirugias_ck_final) {
            var r = confirm("¿Desea continuar sin guardar los datos?");
            if (r == false) {
                return;
            }
        }
        //TODO ES TO ES PARA REVISAR EL DIAGNOSTICO Y CIRUGIA....




        if (IM_Guardo == 1) {
            window.location = "../Farmacia/CargarIM.aspx?ID=" + $("#afiliadoId").val() + "&Q=" + Id;
        }

        if (IM_Guardo == 3) {
            window.location = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
        }

        if (IM_Guardo == 4) {
            CargarNuevoExtra(Id);            
        }

        if (IM_Guardo == 5) {
            window.location = "Protocolosq.aspx?Id=" + Id;
        }

        //6 INSUMO
        if (IM_Guardo == 6) {
            window.location = "Insumo.aspx?Id=" + Id + "&Tipo=2";
        }

        //7 ParteAnestesia
        if (IM_Guardo == 7) {
            //window.location = "ParteAnestesia.aspx?Id=" + Id + "&Tipo=2"; // planilla vieja
            window.location = "PlanillaAnestesia.aspx?NHC=" + $("#afiliadoId").val() + "&cirugiaId=" + Id + 
            "&anes=" + $("#Anestesista").val() + "&cir=" + $("#Cirujano").val() +
            "&diag=" + $("#txt_cbo_Diagnostico").val() + "&cirugi=" + $("#txt_cirugias").val() + "&ayt=" + $("#Ayte1").val() + "&ane=" + $("#Anestesia option:selected").text() + "&tipo=1" + "&urg=" + urg; // planilla nueva
        }

        //8 Resolución 28
        if (IM_Guardo == 8) {
            window.location = "Resolucion28.aspx?Id=" + Id;
        }

        //9 Post
        if (IM_Guardo == 9) {
            window.location = "Post.aspx?Id=" + Id;
        }

        //10 Datos de PreAnes
        if (IM_Guardo == 10) {
            window.location = "Preanestesico.aspx?Id=" + Id;
        }

        if (IM_Guardo == 2) {
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
        }

        IM_Guardo = 0;
    }
}

function Cirugia_Guardada(Resultado) {
    var Id = Resultado.d;
    if (Id > 0) {
        cambio = false;
        Linkear(Id);
    }
    else alert("Error al Guardar Cirugia!!");
}

function LoadCirugia() {
    var json = JSON.stringify({"Id": Id, "Fecha": null ,"Baja":false});
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


        $("#Peso").val(Cirugia.peso);

        $("#Hora_Inicio").val(Cirugia.hora_inicio);
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
        //ListaCirujano_Load(Cirugia.cirujano_especialidad_id);
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

        cirugias_listas_cargadas = Cirugia.cirugias_ck;
        diagnosticos_listas_cargadas = Cirugia.diagnosticos_ck;
        ListMotivo(Cirugia.motivo_susp_id);

        $("#Cirujano_Externo").val(Cirugia.externo_medico);
        $("#Matricula_Cirujano_Externo").val(Cirugia.externo_medico_matricula);


        if (Cirugia.motivo_susp_id != 0) {
            $("#btnSuspender").hide();
            $("#btnReanudar").show();
            $("#Motivo").prop("disabled", true);
            $("#btn_ImprimirSuspension").show();

            if (Cirugia.nhc == 12007801) {                
                $("#btn_reanudar_cirugia_provisoria").show();
            }

        }
        else {
            $("#btnReanudar").hide();
            $("#btnSuspender").show();
            $("#btn_ImprimirSuspension").hide();

            if (Cirugia.nhc == 12007801) {                
                $("#btn_suspender_cirugia_provisoria").show();
            }
        }


        Listar_Cirujano(Cirujano, Cirugia.cirujano_especialidad_id, 0);

        motivo_cancelada = Cirugia.motivo_susp_id;
        ListaAnestesia();
        //List_Medicos_Quirofano();

        Listar_Instrumentadores(Instrumentalista_Id, 240, 0);
        Listar_Circulante(Circulante_id, 240, 0);
        Listar_Anestesista(AnestesistaId, 149, 0);

        //alert(ayudante1_id);

        Listar_Ayte1(ayudante1_id, EspecialidadId, 0);
        Listar_Ayte2(ayudante2_id, EspecialidadId, 0);
        Listar_Ayte3(ayudante3_id, EspecialidadId, 0);
        Listar_Moni(Monitoreo_id, EspecialidadId, 0);


        ListaCirugia(0, true, Cirugia.id);
        ListaDiagnostico(0, true, Cirugia.id);
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
    $(".contenedor_2").hide();
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

//Insumos Pre-Quirurgicos
$("#btnPreQuirurgicos").click(function () {
    if ($(this).attr('disabled')) { return; }    
    window.location = "Carga-PreQuirurgicos.aspx?Id=" + Id;
});

//Carga de Insumos
$("#btnCargaInsumos").click(function () {
    if ($(this).attr('disabled')) { return; }
    IM_Guardo = 6;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});

//Datos de la intervencion
$("#btnIntervencion").click(function () {
    if ($(this).attr('disabled')) { return; }    
    window.location = "DatosIntervencion.aspx?Id=" + Id;
});

//Datos de PreAnes
$("#btnPreAnestesia").click(function () {
    if ($(this).attr('disabled')) { return; }    
    IM_Guardo = 10;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});

//Datos de Protocolo
$("#btnProtocolos").click(function () {
    if ($(this).attr('disabled')) { return; }    
    IM_Guardo = 5;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});

//Datos de PosAnes
$("#btnPosAnestesia").click(function () {
    if ($(this).attr('disabled')) { return; }    
    IM_Guardo = 9;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});

//Indicaciones Medicas
$("#btnIndicaciones").click(function () {
    if ($(this).attr('disabled')) { return; }    
    if ($("#Cama :selected").val() == "120000132" || $("#Cama :selected").val() == "120000133") {
        alert("Verifique que el paciente esté internado");
    } else {
        //Guardo antes de enviar...
        IM_Guardo = 1;
        Linkear(Id);
        //07/04/2016
        //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
        //$("#btnGuardar").click();
        //window.location = "../Farmacia/CargarIM.aspx?Id=" + $("#afiliadoId").val() + "&Q=" + Id;
    }

});


//Datos de Res 28
$("#btnRes28").click(function () {
    if ($(this).attr('disabled')) { return; }    
    IM_Guardo = 8;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});

//Datos de Protesis y Otros
$("#btnCargaExtras").click(function () {
    if ($(this).attr('disabled')) { return; }    
    IM_Guardo = 4;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});

$("#btnVolver").click(function () {
    //volver
    IM_Guardo = 3;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});

//Parte Anestesia
$("#btnParteAnestesia").click(function () {

    if ($('#urg_si').is(':checked')) { urg = 1; }
    if ($('#urg_no').is(':checked')) { urg = 0; }
 
    if ($(this).attr('disabled')) { return; }
    IM_Guardo = 7;
    Linkear(Id);
    //07/04/2016
    //Se quita el guardado automatico porque se guardaba en pantallas diferentes cosas
    //$("#btnGuardar").click();
});


$("#btn_cancelar").click(function () {
    if (QueryFecha != '')
        window.location = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
    else
        //window.location = "CargadeTurnos.aspx";
        window.location = "CargadeTurnos.aspx?QueryFecha=" + $("#fecha_cirugia").val();
});



$("#btn_volver_1").click(function () {
    if (QueryFecha != '')
        window.location = "CargadeTurnos.aspx?QueryFecha=" + QueryFecha;
    else
        window.location = "CargadeTurnos.aspx?QueryFecha=" + $("#fecha_cirugia").val();
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
        if ($("#Hora").val().length > 0 && $("#Hora_Inicio").val().length > 0 && $("#Hora_Fin").val().length > 0) {
            IM_Guardo = 2;
            //Linkear(Id);
            GuardarLaCirugia();
        }
        else {

            var dia_fecha_turno = $("#fecha_cirugia").val();
            var arr_dia = dia_fecha_turno.split("/");

            var d1 = new Date(arr_dia[1] + "/" + arr_dia[0] + "/" + arr_dia[2]);
            var d2 = new Date("2016/01/18");
            if (d1 >= d2) {
                alert("Para imprimir es necesario tener cargada la Hora de Turno, Hora Inicio y Hora Fin.");
            }
            else {
                IM_Guardo = 2;
                Linkear(Id);
                //$("#btnGuardar").click();
            }
        }
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
            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);


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
                document.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
            },
            error: errores
        });
    }




    function Quirofano_Estados() {
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/H2_QUIROFANO_ESTADOS",
            contentType: "application/json; charset=utf-8",
            data: '{CirugiaId: "' + Id + '"}',
            dataType: "json",
            success: function (Resultado) {
                var estado = Resultado.d;
                if (estado.PRE == 0 && estado.QX == 0 && estado.R28_ALGO == 0 && estado.R28_COMPLETO == 0) {
                    $("#btnIndicaciones").attr('disabled', 'disabled');                    
                    $("#btnProtocolos").attr('disabled', 'disabled');
                    $("#btnPosAnestesia").attr('disabled', 'disabled');
                    $("#btnCargaInsumos").attr('disabled', 'disabled');
                    $("#btnParteAnestesia").attr('disabled', 'disabled');
                    $("#btnCargaExtras").attr('disabled', 'disabled');
                }

                if (estado.R28_ALGO != 0) {
                    $("#fecha_cirugia").attr('disabled', 'disabled');
                }

                if (estado.R28_COMPLETO == 0) {
                    $("#btnPosAnestesia").attr('disabled', 'disabled');                    
                }
            },
            error: errores
        });
    }



    var mostrar_div_cirugias = false;
    $("#txt_cirugias").click(function () {
        if (mostrar_div_cirugias) {
            mostrar_div_cirugias = false;
            $("#div_cirugias").hide();
        }
        else {
            mostrar_div_cirugias = true;
            $("#div_cirugias").show();
        }

    });




    function Listar_Medico_x_Especialidad(Especialidad, Controlador, Medico_Predeterminado, Seleccionar, SoloQuirofano) {
        
        var json = JSON.stringify({ "Especialidad": Especialidad, "Medico_Predeterminado": Medico_Predeterminado });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Listar_Medico_x_Especialidad",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Lista = Resultado.d;
                $("#" + Controlador).html('');
                $("#" + Controlador).append($("<option></option>").val("0").html("NINGUNO"));
                $.each(Lista, function (index, Medico) {

                    if (Medico.Id == 0) { Medico.Medico = "NINGUNO"; }

                    if (SoloQuirofano) {
                        if (Medico.Clase == "Quirofano" || Medico.Id == Seleccionar) {
                            if (Seleccionar == Medico.Id)
                                $("#" + Controlador).append($("<option selected='selected' class='" + Medico.Clase + "_q" + "'></option>").val(Medico.Id).html(Medico.Medico));
                            else
                                $("#" + Controlador).append($("<option class='" + Medico.Clase + "_q" + "'></option>").val(Medico.Id).html(Medico.Medico));
                        }

                    }
                    else {
                        if (Seleccionar == Medico.Id)
                            $("#" + Controlador).append($("<option selected='selected' class='" + Medico.Clase + "_q" + "'></option>").val(Medico.Id).html(Medico.Medico));
                        else
                            $("#" + Controlador).append($("<option class='" + Medico.Clase + "_q" + "'></option>").val(Medico.Id).html(Medico.Medico));
                    }
                });
            },
            error: errores
        });
    }



    function Listar_Instrumentadores(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Instrumentadora", -1, Seleccionar, false);
    }

    function Listar_Cirujano(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Cirujano", -1, Seleccionar, false);
    }

    function Listar_Circulante(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Circulante", -1, Seleccionar, false);
    }

    function Listar_Anestesista(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Anestesista", -1, Seleccionar, false);
    }

    function Listar_Ayte1(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Ayte1", Seleccionar, Seleccionar, false);
    }

    function Listar_Ayte2(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Ayte2", Seleccionar, Seleccionar, false);
    }

    function Listar_Ayte3(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Ayte3", Seleccionar, Seleccionar, false);
    }

    function Listar_Moni(Seleccionar, especialidad, todos) {
        Listar_Medico_x_Especialidad(especialidad, "Monitorista", Seleccionar, Seleccionar, false);
    }


    function Listar_Todos_Los_Medicos(Control) {
        var elemento = $(Control).data('elemento');
        var estado = $(Control).data('estado');
        var especialidad = -1;
        var Seleccionar = $("#" + elemento).val();
        var soloquiro = false;
        if (estado == "0") {
            estado = "1";
            especialidad = $("#Especialidad").val();
        }
        else if (estado == "1") {
            estado = "0";            
        }
        //else {
        //    estado = "0";
        //    especialidad = $("#Especialidad").val();
        //    soloquiro = true;           
        //} 

        $(Control).data('estado', estado);
        Listar_Medico_x_Especialidad(especialidad, elemento, Seleccionar, Seleccionar, soloquiro);      
        
    }


    function FiltrarDiagnostico() {
        var filtro = prompt("Ingrese el filtro de diagnóstico", "");

        if (filtro != null) {
            filtro = filtro.toLowerCase();

            $('#span_diagnosticos_cargados > div').each(function () {
                var el_check = $(this).attr("id").replace("div_", "");
                var text = $(this).find("label").text().toLowerCase();                
                if (text.indexOf(filtro) == 0) {                    
                    $("#div_" + el_check).show(); $("#div_" + el_check).prop('selected', true);
                }
                else {                    
                    $("#div_" + el_check).hide();
                }

            });

        }
    }


    function FiltrarCirugia() {        
        var filtro = prompt("Ingrese el filtro de Cirugía", "");


        if (filtro != null) {

            //$('#span_cirugias_cargadas > div').each(function () {
            //    $("#div_" + el_check).show(); $("#div_" + el_check).prop('selected', true);
            //});

            filtro = filtro.toLowerCase();

            $('#span_cirugias_cargadas > div').each(function () {
                var el_check = $(this).attr("id").replace("div_", "");
                var text = $(this).find("label").text().toLowerCase();
                //console.log(el_check);
                //if (text.indexOf(filtro) !== -1) {
                if (text.indexOf(filtro) == 0) {
                    //$(this).show(); $(this).prop('selected', true);                    
                    $("#div_" + el_check).show(); $("#div_" + el_check).prop('selected', true);
                }
                else {
                    //  $(this).hide(); 
                    $("#div_" + el_check).hide();
                }

            });

        }
    }


    $("#txt_filtro_diagnostico").change(function () {
        var filtro = $("#txt_filtro_diagnostico").val().toLowerCase();        
        $('#select_diagnosticos>option').each(function () {
            var text = $(this).text().toLowerCase();            
            if (text.indexOf(filtro) !== -1) {                
                $(this).show(); $(this).prop('selected', true);
            }
            else {
                $(this).hide();
            }

        });
    });

    $("#txt_filtro_cirugia").change(function () {
        var filtro = $("#txt_filtro_cirugia").val().toLowerCase();
        $('#select_cirugias>option').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(filtro) !== -1) {                
                $(this).show(); $(this).prop('selected', true);
            }
            else {
                $(this).hide();
            }

        });
    });


    $("#btn_ImprimirSuspension").click(function () {
        ImprimirSuspension(Id);
    });








    //DIAGNOSTICOS!!!!!!!!!!

    function ListaDiagnostico(Id, estado, Cirugia_id) {
        if (Cirugia_id == null) { Cirugia_id = 0; }
        var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico_Planificar_Cirugia",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListaDiagnostico_Cargado,
            error: errores
        });
    }


    function ListaDiagnostico_Cargado(Resultado) {
        var Lista = Resultado.d;
        $("#cbo_Diagnostico").empty();
        $("#span_diagnosticos_cargados").empty();
        var lista_cirugias = "";
        //$("#span_cirugias_cargadas").html("<label for='ck_cir_" + Cirugia.id + "'>" + Cirugia.tipo + "</label> <input type='checkbox' id='ck_cir_" + Cirugia.id + "' />");
        $("#cbo_Diagnostico").append($("<option></option>").val("0").html(""));
        $.each(Lista, function (index, Cirugia) {
            $("#cbo_Diagnostico").append($("<option></option>").val(Cirugia.id).html(Cirugia.diagnostico));
            if (Cirugia.id == CirugiaId) $("#cbo_Diagnostico").val(CirugiaId);
            lista_cirugias = lista_cirugias + "<div id='div_ck_diag_" + Cirugia.id + "'><input class='ck_class_diagnosticos' type='checkbox' onclick='Leer_Listas_Diagnosticos();' id='ck_diag_" + Cirugia.id + "' /> <label id='label_ck_diag_" + Cirugia.id + "' for='ck_diag_" + Cirugia.id + "'>" + Cirugia.diagnostico + "</label></div>";
        });
        $("#span_diagnosticos_cargados").html(lista_cirugias);
                
        diag_ant_guardar = diagnosticos_listas_cargadas;

        var separated = diagnosticos_listas_cargadas.split(",");
        $.each(separated, function (index, los_ids) {
            $("#ck_diag_" + los_ids).prop('checked', true);
            //Cirugias_Check.push(los_ids);
        });

        Leer_Listas_Diagnosticos();
    }


    function Leer_Listas_Diagnosticos() {
        Diagnosticos_Check = [];
        $('#span_diagnosticos_cargados input[type="checkbox"]:checked').each(function (i, el) {
            Diagnosticos_Check.push($("#label_" + el.id).html());
        });

        var lista_cargada = "";
        $.each(Diagnosticos_Check, function (key, value) {
            lista_cargada = lista_cargada + " + " + value;
        });
        $("#txt_cbo_Diagnostico").val(lista_cargada.replace(" + ", ""));
        

    }


    var mostrar_div_diagnostico = false;
    $("#txt_cbo_Diagnostico").click(function () {
        if (mostrar_div_diagnostico) {
            mostrar_div_diagnostico = false;
            $("#div_diagnostico").hide();
        }
        else {
            mostrar_div_diagnostico = true;
            $("#div_diagnostico").show();
        }

    });



    //Permiso Guardado
    PermisoEdicion_PuedoGuardar = true;
    PermisoEdicion_dias = "";

    function PermisoEdicion(Cirugia_id) {
        var json = JSON.stringify({ "CirugiaId": Cirugia_id });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Quirofano/Quirofano_.asmx/TengoPermisoEdicion",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Respuesta) {
                var dato = Respuesta.d;
                PermisoEdicion_PuedoGuardar = dato.Puedo;
                PermisoEdicion_dias = dato.Dias;
                if (!PermisoEdicion_PuedoGuardar) {
                    $("#btnBorrar").remove();
                    $("#btnSuspender").remove();
                    $("#btnGuardar").hide();
                    $("#btnVolver").remove();
                }
            },
            error: errores
        });
    }

    $("#fecha_cirugia").change(function () {
        var r = confirm("¿Realmente desea cambiar la fecha de la cirugía del paciente " + $("#CargadoApellido").html() + "?.");
        if (r == true) {
            return;
        } else {            
            window.location = "CargadeTurnos.aspx?QueryFecha=" + $("#fecha_cirugia").val();
        }
    });



    $("#Hora, #Hora_Inicio, #Hora_Fin, #urg_si, #urg_no, #txt_cbo_Diagnostico, #txt_cirugias, #Peso, #Sala, #Cama, #Especialidad, #Cirujano, #Ayte1, #Ayte2, #Ayte3, #Monitorista, #Anestesista, #Anestesia, #Instrumentadora, #Circulante, #Cirujano_Externo, #Matricula_Cirujano_Externo, #Hemo, #chkHemo, #chkRayos, #chkAnpa, #chkMonitoreo, #MedSolicitante, #Observaciones").change(function () { cambio = true; });




    function CargarNuevoExtra(Id) {
        var json = JSON.stringify({ "CirugiaID": Id });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Quirofano/Quirofano_.asmx/Quirofano_Extra_EsViejo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Respuesta) {
                var dato = Respuesta.d;
                if (dato) {
                    window.location = "ProtesisyOtros.aspx?Id=" + Id;                    
                }
                else {                    
                    window.location = "ProtesisyOtros_CB.aspx?Id=" + Id;
                    //window.location = "ProtesisyOtros.aspx?Id=" + Id;
                }
            },
            error: errores
        });

    }



    function VerificarUsuarioCirujano() {
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/VerificarUsuarioCirujano",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d == 0) {
                    $("#btnIndicaciones").hide();
                    $("#btnProtocolos").hide();
                    $("#btnRes28").css("margin-left", "10px");
                  }
            },
            error: errores
        });
    }

    $('#fotopaciente').error(function () {
        $(this).attr('src', '../img/silueta.jpg');
    });