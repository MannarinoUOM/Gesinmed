var Id = 0;
var Cirujano;
var Cama;
var Efectuada;
var diagnostico_post = 0;
var obj = {};
var imprimir_comprobate = true;
var MostrarDibujo2 = false;

$(document).ready(function () {
    var Query = {};
    Query = GetQueryString();
    ListTipoDoc();
    Id = Query['Id'];
    if (Id > 0) {
        CargarResultados();
        LoadCirugia();
        Cargar_Sala_y_Cama();
    }
    else {
        InitControls();
        //Cargar_Diagnosticos(0);
    }
});


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}



function CargarResultados() {
    $('#cbo_resultado1').append($('<option>', { value: "0", text: " " }));
    $('#cbo_resultado2').append($('<option>', { value: "0", text: " " }));
    $('#cbo_resultado3').append($('<option>', { value: "0", text: " " }));
    $('#cbo_resultado4').append($('<option>', { value: "0", text: " " }));
}

$("#btn_cancelear_todo").click(function () {
    window.location = "Planificar-Endoscopia.aspx?Cirugia_Id=" + Id;
});


$("#btnVolver").click(function () {
    imprimir_comprobate = false;
    GuardarProtocolo();
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

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

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
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: '{Documento: "' + Documento + '"}',
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

function List_Diagnostico(Id, estado) {
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

function List_Diagnostico_Post(Id, estado) {
    var json = JSON.stringify({ "Id": Id, "estado": estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico_Post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Diagnostico_Cargado_Post,
        complete: function () {
            if (diagnostico_post != 0) {
                $("#Postoperatorio").val(diagnostico_post);
            }
        },
        error: errores
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function List_Diagnostico_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Diagnostico) {        
        $("#cbo_Diagnostico").append($("<option></option>").val(Diagnostico.id).html(Diagnostico.diagnostico));
        if (Diagnostico.id == obj.diagnostico_id) $("#cbo_Diagnostico").val(Diagnostico.id);
    });

}

function List_Diagnostico_Cargado_Post(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Diagnostico) {
        $("#Postoperatorio").append($("<option></option>").val(Diagnostico.id).html(Diagnostico.diagnostico));    
    });        
}

function List_Medicos() {
    var json = JSON.stringify({ "Apellido": null, "MN": null, "MP": null, "objBusquedaLista": null });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar",
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

function ListMotivo() {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListMotivo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListMotivo_Cargado,
        error: errores
    });
}

function ListMotivo_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Motivo) {
        $("#Motivo").append($("<option></option>").val(Motivo.id).html(Motivo.motivo));
    });

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
        if (Cama.id == Cama)
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
            ListaCirujano_Load(Especialidad.Id);
        }
    });
}



//Guardar Protocolo....
$("#btnGuardar").click(function () {    
    GuardarProtocolo();
});



//function Protocolo_Borrado(Resultado) {
function GuardarProtocolo() {    
    var q = {};

    if ($("#ck_biopsia").is(':checked') == true)
        q.Biopsia = true;
    else q.Biopsia = false;

    if ($("#ck_cepillado").is(':checked') == true)
        q.Cepillado = true;
    else q.Cepillado = false;

    q.Insepeccion = $("#txt_Insepeccion").val();
    q.Fibrocolonoscopia = $("#txt_fibrocolonoscopia").val();
    q.Impresion_Diagnostica = $("#txt_impresion_diagnostica").val();
    q.Cirugia_Id = Id;


    q.Notas = $("#txt_notas").val();
    q.Resultado1 = $("#cbo_resultado1 :selected").val();
    q.Resultado2 = $("#cbo_resultado2 :selected").val();
    q.Resultado3 = $("#cbo_resultado3 :selected").val();
    q.Resultado4 = $("#cbo_resultado4 :selected").val();

    q.Video = $("#txt_video").val();          


    var json = JSON.stringify({ "endo": q });
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/Endoscopia_ProEndoscoFCC_Guardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Protocolo_Guardado,
        error: errores
    });
}


function Protocolo_Guardado(Resultado) {
    var num = Resultado.d;
    if (num > 0) {
        if (imprimir_comprobate) {
            $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Endoscopia_ProEndoscoFCC.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "Planificar-Endoscopia.aspx?Cirugia_Id=" + Id;
            }
        });
        }
        else {
            window.location.href = "Planificar-Endoscopia.aspx?Cirugia_Id=" + Id;
        }
    }
    else alert("Error al Guardar Intervención!!");
}

function LoadCirugia() {
    var json = JSON.stringify({ "CirugiaId": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/Protocolos_Cirugia_Info",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Cargada,
        error: errores
    });
}

//function Cargar_Diagnosticos(Defecto) {
//    var json = JSON.stringify({ "Id": 0, "estado": true, "Cirugia_id": Id });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Endoscopia/Endoscopia.asmx/Diagnostico_Planificar_Endoscopia",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (Resultado) {
//            var Lista = Resultado.d;
//            $.each(Lista, function (index, Diag) {
//                $("#cbo_Postoperatorio").append($("<option></option>").val(Diag.id).html(Diag.diagnostico));
//            });
//            if (Defecto != 0) { $("#cbo_Postoperatorio").val(Defecto); }
//        },
//        error: errores
//    });
//}



function Cirugia_Cargada(Resultado) {
    var Cirugia = Resultado.d;
    //$.each(Cirugias, function (index, Cirugia) {
        CargarPacienteID(Cirugia.nhc);
        //$("#fecha_cirugia").val(Cirugia.fecha);

        $("#span_hora_inicio").html(Cirugia.Hora_Inicio);
        $("#span_hora_fin").html(Cirugia.Hora_Fin);
        $("#span_diagnostico_preoperatorio").html(Cirugia.Diagnostico);
        $("#Span_Especialidad").html(Cirugia.Especialidad);
        $("#Span_Cirujano").html(Cirugia.Cirujano);
//        $("#Span_1_ayudante").html(Cirugia.Ayudante1);
//        $("#Span_2_ayudante").html(Cirugia.Ayudante2);
//        $("#Span_3_ayudante").html(Cirugia.Ayudante3);
//        $("#Span_monitoreo").html(Cirugia.Monitoreo);
        $("#Span_Anestesista").html(Cirugia.Anestesista);
        $("#Span_Instrument").html(Cirugia.Instrument);
        $("#span_fecha").html(Cirugia.Fecha);
        $("#span_monitoreo").html(Cirugia.ck_Monitoreo);



        //obj = Cirugia;
        //InitControls();
     //});

    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 20 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    LoadProtocolo();
}

function LoadProtocolo() {
    var json = JSON.stringify({ "Id": Id});
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/CargarProEndoscoFCC_ByCirugiaId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadProtocolo_Cargada,
        error: errores
    });

}

function LoadProtocolo_Cargada(Resultado) {
    var qui = Resultado.d;
    $("#txt_Insepeccion").val(qui.Insepeccion);
    $("#txt_fibrocolonoscopia").val(qui.Fibrocolonoscopia);
    $("#txt_impresion_diagnostica").val(qui.Impresion_Diagnostica);

    if (qui.Biopsia == true) $("#ck_biopsia").attr('checked', true);
    if (qui.Cepillado == true) $("#ck_cepillado").attr('checked', true);

    $("#txt_notas").val(qui.Notas);

    $("#cbo_resultado1").val(qui.Resultado1);
    $("#cbo_resultado2").val(qui.Resultado2);
    $("#cbo_resultado3").val(qui.Resultado3);
    $("#cbo_resultado4").val(qui.Resultado4);

    $("#txt_video").val(qui.Video);


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


function Cargar_Sala_y_Cama() {
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/Cargar_Sala_y_Cama",
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


$("#btn_dibujo2").click(function () {
    if (MostrarDibujo2) {
        MostrarDibujo2 = false;
        $("#div_dibujo2").hide();
    }
    else {
        MostrarDibujo2 = true;
        $("#div_dibujo2").show();
    }
});



$("#btn_dibujo1").click(function () {
$.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Endoscopia_ProEndoscoDibujo1.aspx?Id=' + Id,
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