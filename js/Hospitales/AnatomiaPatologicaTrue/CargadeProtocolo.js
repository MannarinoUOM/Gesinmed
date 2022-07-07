var Seccional_Id;
var Id = 0;
var OS;

$(document).ready(function () {
    InitControls();
    var Query = {};
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
    }
});

function InitControls() {
    $("#txtFechaCarga").val(FechaActual());
    List_Seccionales();
    List_ObraSociales(true);
    $("#txtNroProtocolo").val("Provisorio");
    $("#txtNroProtocolo").attr("disabled", "disabled");
    $("#txtFechaCarga").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txtDNI").mask("9999999?9", { placeholder: "-" });
    $("#txtFechaCarga").datepicker();
    $("#txtFechaSalida").val(FechaActual());
    $("#txtFechaSalida").datepicker();
    List_Materiales();
    List_Procedimientos();
    List_Metodos();
    List_Medicos();
    Especialidades_Lista();
    List_Servicios();
    List_Nomenclador();
    List_Diagnosticos();
}

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

$("#txtDNI").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtDNI').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txtDNI").val());
        }

    }
});


$("#txtDNI").blur(function () {
    Cargar_Paciente_Documento($("#txtDNI").val());
});

$("#txtNHC").blur(function () {
    Cargar_Paciente_NHC($("#txtNHC").val());
});

$("#txtNHC").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNHC').attr('readonly') == undefined) {
            Cargar_Paciente_NHC($("#txtNHC").val());
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

        $("#txtDNI").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtDNI").attr('value', paciente.documento);
        $("#txtNHC").attr('value', paciente.NHC);
        Seccional_Id = paciente.Nro_Seccional;
        $("#cbo_Seccional").val(Seccional_Id);
        $("#cbo_Seccional").attr('disabled', 'disabled');
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        //p.ObraSocial = row.OS;
        OS = paciente.OSId;
        List_ObraSociales(true);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $('.avatar2').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
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

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {

        $("#txtDNI").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        Seccional_Id = paciente.Nro_Seccional;
        $("#cbo_Seccional").val(Seccional_Id);
        $("#cbo_Seccional").attr('disabled', 'disabled');
        $('.avatar2').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');
        OS = paciente.OSId;
        List_ObraSociales(true);
        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function RecargarPagina(url) {
    document.location = "../AnatomiaPatologica/CargadeProtocolo.aspx" + url;
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

$("#desdeaqui").click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 400);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $("#CargadoInstitucion").html($("#cbo_Institucion :selected").text().substr(0, 53));
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
        if (Obra.id == OS) $("#cbo_Institucion").val(OS);
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

function List_Materiales() {
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologica.asmx/ListMaterial",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Materiales_Cargado,
        error: errores
    });
}

function List_Materiales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Material) {
        $("#cbo_Material").append($("<option></option>").val(Material.Codigo).html(Material.Descripcion));
    });
}

function List_Metodos() {
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologica.asmx/ListMetodos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Metodos_Cargado,
        error: errores
    });
}

function List_Metodos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Metodo) {
        $("#cbo_Metodos").append($("<option></option>").val(Metodo.Id).html(Metodo.Descripcion));
    });
}

function List_Procedimientos() {
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologica.asmx/ListProcedimientos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Procedimientos_Cargado,
        error: errores
    });
}

function List_Procedimientos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Procedimiento) {
        $("#cbo_Procedimiento").append($("<option></option>").val(Procedimiento.Codigo).html(Procedimiento.Descripcion));
    });
}

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
    $("#cbo_Especialidad").append("<option value='0'></option>");
    $.each(Lista, function (index, Especialidad) {
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
    });
}


$("#cbo_Especialidad").change(function () {
    var json = JSON.stringify({ "Especialidad": $("#cbo_Especialidad :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MedicosporEsp_Cargado,
        error: errores
    });
});

function MedicosporEsp_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").empty();
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
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
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Servicios = Resultado.d;
    $.each(Servicios, function (index, Servicio) {
        $('#cbo_Servicio').append(
              $('<option></option>').val(Servicio.id).html(Servicio.descripcion)
            );
    });
}

function List_Diagnosticos() {
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologica.asmx/List_Diagnosticos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Diagnosticos_Cargado,
        error: errores
    });
}

function List_Diagnosticos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Diagnostico").append("<option value='0'></option>");
    $.each(Lista, function (index, Diagnostico) {
        $("#cbo_Diagnostico").append($("<option></option>").val(Diagnostico.Id).html(Diagnostico.Descripcion));
    });
}

function List_Nomenclador() {
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologica.asmx/List_Nomenclador",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Nomenclador_Cargado,
        error: errores
    });
}

function List_Nomenclador_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Nomenclador").append("<option value='0'></option>");
    $.each(Lista, function (index, Nomenclador) {
        $("#cbo_Nomenclador").append($("<option></option>").val(Nomenclador.Id).html(Nomenclador.Descripcion));
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnCargarMuestras").click(function () {
    $("#myModal").modal({ backdrop: false, keyboard: false });
    $("#myModal").show();
});

$("#btnConfirmarMuestras").click(function () {
    $("#myModal").hide();

});

$("#btnConfirmarMuestras").click(function () {
    $("#myModal").hide();

});

$("#btnConfirmar").click(function () {
    var c = {};
    c.NroProtocolo = Id;
    c.Baja = false;
    c.Fecha = $("#txtFechaCarga").val();
    if ($("#cbo_Diagnostico :selected").val() != "0")
        c.Pendiente = false;
    else c.Pendiente = true;
    c.NHC = $("#CargadoNHC").html();
    var json = JSON.stringify({ "Cab": c });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AnatomiaPatologica/AnatomiaPatologica.asmx/InsertProtocoloCab",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: InsertProtocoloCab_Cargado,
        error: errores
    });
});

function InsertProtocoloCab_Cargado(Resultado) {
    var r = Resultado.d;
    if (r > 0) {
        Id = r;
        var Det = {};
        Det.NroProtocolo = Id;
        Det.MaterialId = $("#cbo_Material :selected").val();
        Det.ProcedimientoId = $("#cbo_Procedimiento :selected").val();
        Det.MetodosId = $("#cbo_Metodos :selected").val();
        Det.EspecialidadId = $("#cbo_Especialidad :selected").val();
        Det.ServicioId = $("#cbo_Servicio :selected").val();
        Det.MedicoCentralId = $("#cbo_Medicos :selected").val();   
        Det.ServicioExt = $("#txtServExt").val();   
        Det.Estadistica = $("#txtEstadistica").val();
        Det.NroEstudio = $("#txtNroEstudio").val();
        Det.MedicoExt = $("#txtMedicoExt").val();
        Det.Macroscopia = $("#txtMacroscopica").val();
        
        Det.Microscopia = $("#txtMicroscopica").val();
        Det.Diagnostico = $("#txtDiagnostico").val();
        Det.Especiales = $("#txtEspeciales").val();

        Det.CodDiagnostico = $("#cbo_Diagnostico :selected").val();
        Det.NomencladorId = $("#cbo_Nomenclador :selected").val();
        Det.Tacos = $("#txtNroTacos").val();

        Det.Preparados = $("#txtPreparados").val();
        Det.FechaSalida = $("#txtFechaSalida").val();
        Det.EspecialesCant = $("#txtTecnicas").val();

        Det.IHQCant = $("#txtIHQ").val();

        if ($("#chkReceptores").is(":checked"))
            Det.RecepHormonales = true;
        else Det.RecepHormonales = false;

        if ($("#chkPlaca").is(":checked"))
            Det.Placa = true;
        else Det.Placa = false;

        var json = JSON.stringify({ "Det": Det });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/AnatomiaPatologica/AnatomiaPatologica.asmx/InsertProtocoloDet",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertProtocoloDet_Cargado,
            error: errores
        });
    }
    else alert("Error");
}

function InsertProtocoloDet_Cargado(Resultado) {
    var r = Resultado.d;
    if (r > 0) {
        alert("Protocolo Cargado");
    }
    else alert("Error al Cargar Detalle");
}



