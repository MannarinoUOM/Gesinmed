var Pase_Guardia_UTI_Id = 0;
var NHC = 0;
var Totales = 0;
var Imprimir = 0;
var Medico = 0;
var MedicoId = 0;
var objBusquedaLista = "";
var Motivo = 0;
var EspId = 0;
var IntId = 0;

function Setear_FechadelDia(id_elemento) 
{
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#" + id_elemento).val(d);
    $("#" + id_elemento).datepicker();
}

$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    Setear_FechadelDia("txtFecha");

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
    }

    if (GET["Id"] != "" && GET["Id"] != null) {
        Pase_Guardia_UTI_Id = GET["Id"];
        Pase_Guardia_UTI_Listar();
    }

    if (GET["IntId"] != "" && GET["IntId"] != null) {
        IntId = GET["IntId"];
        CargarDatosInternacion(IntId);
    }

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
        GUARDIA_UTI_Cargar_Ultimo_Pase_NHC(NHC);
    }

    if (GET["B"] != "" && GET["B"] != null) {
        objBusquedaLista = GET["B"];
    }

});


function GUARDIA_UTI_Cargar_Ultimo_Pase_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/Epicrisis.asmx/Pase_Guardia_UTI_Cargar_Ultimo_Pase_NHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            CargarDatosenPantalla(Resultado.d);
        },
        complete: function () {
            CargarPacienteID(NHC);
        },
        error: errores
    });
}

function CargarDatosInternacion(ID) {
    $.ajax({
        type: "POST",
        data: '{IntId: "' + ID + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/InternacionResumen",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var inter = Resultado.d;
            $("#CargadoCama").html(inter.cama);
            $("#CargadoSala").html(inter.sala);
            $("#CargadoServicio").html(inter.servicio);
            $("#CargadoFechaIngreso").html(inter.fechaingreso);
            $("#CargadoFechaEgreso").html(inter.fechaegreso);
            $("#txt_Cama").val(inter.cama);
        },
        error: errores
    });
}

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function TipoAlimentacion_Setear(Alimentacion_Tipo) {
    if (Alimentacion_Tipo == 0) $("#chk_AlimentacionNO").attr("checked",true);
    if (Alimentacion_Tipo == 1) $("#chk_AlimentacionEnteral").attr("checked",true);
    if (Alimentacion_Tipo == 2) $("#chk_AlimentacionParental").attr("checked", true);
    if (Alimentacion_Tipo == 3) $("#chk_AlimentacionOral").attr("checked", true);
    if (Alimentacion_Tipo == 4) $("#chk_Suspendida").attr("checked", true);
}

function CargarDatosenPantalla(obj_plantilla) {
    if (obj_plantilla.PacienteId > 0) {
        NHC = obj_plantilla.PacienteId;
        Pase_Guardia_UTI_Id = obj_plantilla.Pase_Guardia_UTI_Id;
        $("#afiliadoId").val(obj_plantilla.PacienteId);
        $("#txtFecha").val(obj_plantilla.Fecha);
        $("#txt_Cama").val(obj_plantilla.Cama);
        $("#txt_DiagnosticoPresuntivo").val(obj_plantilla.DiagnosticoPresuntivo);
        $("#txt_Antecedentes").val(obj_plantilla.Antecedentes);
        $("#txt_DiasUTI").val(obj_plantilla.DiasUTI);
        $("#txt_DatosQuirurgicos").val(obj_plantilla.DatosQuirurgicos);
        $("#txt_DatosAP").val(obj_plantilla.DatosAP);
        if (obj_plantilla.VentilacionMecanica) $("#chk_VentilacionSI").attr("checked", true);
        else $("#chk_VentilacionNO").attr("checked", true);
        if (obj_plantilla.Traqueostomia) $("#chk_TraqueostomiaSI").attr("checked", true);
        else $("#chk_TraqueostomiaNO").attr("checked", true);
        $("#txt_ModoVentilatorio").val(obj_plantilla.ModoVentilatorio);

        $("#txt_DiasVentilacion").val(obj_plantilla.DiasVentilacion);

        $("#txt_RX").val(obj_plantilla.RX);
        $("#txt_ECG").val(obj_plantilla.ECG);
        TipoAlimentacion_Setear(obj_plantilla.Alimentacion);
        $("#txt_OtrasImagenes").val(obj_plantilla.OtrasImagenes);
        $("#txt_Gases").val(obj_plantilla.Gases);
        $("#txt_Laboratorio").val(obj_plantilla.Laboratorio_DatosPositivos);
        if (obj_plantilla.Infectologia) $("#chk_Positivo").attr("checked", true);
        else $("#chk_Negativo").attr("checked", true);
        $("#txt_CultivoGermen").val(obj_plantilla.Cultivos_Germen);
        $("#txt_DiasATB").val(obj_plantilla.DiasATB);
        $("#txt_Interconsultas").val(obj_plantilla.Pendientes_Interconsultas);
        $("#txt_Estudios").val(obj_plantilla.Pendientes_Estudios);
        $("#txt_Novedades_del_dia").val(obj_plantilla.Novedades_del_dia);
        $("#txtObservaciones").val(obj_plantilla.Observaciones);
        $("#txt_DiasAlimentacion").val(obj_plantilla.DiasAlimentacion);

        var str_ultimo_usuario = obj_plantilla.UsuarioNombre_Visto + " - " + obj_plantilla.FechaSistema_Visto;
        if (str_ultimo_usuario.length > 40) str_ultimo_usuario = str_ultimo_usuario.substring(0, 40) + "...";
        $("#lbl_UsuarioVisto").html(str_ultimo_usuario);
        $("#lbl_UsuarioVisto").attr("title", "Visto ultima vez: " + obj_plantilla.UsuarioNombre_Visto + " - " + obj_plantilla.FechaSistema_Visto);

        //$(".datos").attr("disabled", "disabled");
        GUARDIA_UTI_Grabar_UltimoUsuario_Visto();
        $("#btn_Imprimir").show();
    }
}

function GUARDIA_UTI_Cargar_DiasVent(InternacionId) {
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/Epicrisis.asmx/Pase_Guardia_UTI_Cargar_DiasVent",
        data: '{InternacionId: "' + InternacionId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#txt_DiasVentilacion").val(Resultado.d + 1);
            $("#txt_DiasVentilacion").attr("disabled", true);
        },
        error: errores
    });
}

$("#chk_VentilacionSI").click(function () {
    if ($("#chk_VentilacionSI").is(":checked")) GUARDIA_UTI_Cargar_DiasVent(IntId);
});

$("#chk_VentilacionNO").click(function () {
    if ($("#chk_VentilacionNO").is(":checked")) $("#txt_DiasVentilacion").val("0");
});

function Pase_Guardia_UTI_Listar() {
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/Epicrisis.asmx/Pase_Guardia_UTI_Listar",
        data: '{Pase_Guardia_UTI_Id: "' + Pase_Guardia_UTI_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            CargarDatosenPantalla(Resultado.d);          
        },
        complete: function () {
            CargarPacienteID(NHC);
        },
        error: errores
    });
}

function GUARDIA_UTI_Grabar_UltimoUsuario_Visto() { 
     $.ajax({
        type: "POST",
        url: "../Json/AtInternados/Epicrisis.asmx/Pase_Guardia_UTI_Grabar_Visto",
        data: '{Pase_Guardia_UTI_Id: "' + Pase_Guardia_UTI_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
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
    $.each(Paciente, function (index, paciente) {

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btn_Guardar").click(function () {
    Guardar();
});

function TipoAlimentacion_Elegido() {
    if ($("#chk_AlimentacionNO").is(":checked")) return 0;
    if ($("#chk_AlimentacionEnteral").is(":checked")) return 1;
    if ($("#chk_AlimentacionParental").is(":checked")) return 2;
    if ($("#chk_AlimentacionOral").is(":checked")) return 3;
    if ($("#chk_Suspendida").is(":checked")) return 4;
    return -1; //no deberia pasar
}

function CargarDatos() 
{
    var datos = {};
    datos.PacienteId = $("#afiliadoId").val();
    datos.Fecha = $("#txtFecha").val().trim();
    datos.Cama = $("#txt_Cama").val().trim().toUpperCase();
    datos.DiagnosticoPresuntivo = $("#txt_DiagnosticoPresuntivo").val().trim().toUpperCase();
    datos.Antecedentes = $("#txt_Antecedentes").val().trim().toUpperCase();
    datos.DiasUTI = $("#txt_DiasUTI").val().trim().toUpperCase();
    datos.DatosQuirurgicos = $("#txt_DatosQuirurgicos").val().trim().toUpperCase();
    datos.DatosAP = $("#txt_DatosAP").val().trim().toUpperCase();
    datos.VentilacionMecanica = $("#chk_VentilacionSI").is(":checked");
    datos.Traqueostomia = $("#chk_TraqueostomiaSI").is(":checked");
    datos.ModoVentilatorio = $("#txt_ModoVentilatorio").val().trim().toUpperCase();
    datos.DiasVentilacion = $("#txt_DiasVentilacion").val().trim().toUpperCase();
    datos.RX = $("#txt_RX").val().trim().toUpperCase();
    datos.ECG = $("#txt_ECG").val().trim().toUpperCase();
    datos.Alimentacion = TipoAlimentacion_Elegido();
    datos.OtrasImagenes = $("#txt_OtrasImagenes").val().trim().toUpperCase();
    datos.Gases = $("#txt_Gases").val().trim().toUpperCase();
    datos.Laboratorio_DatosPositivos = $("#txt_Laboratorio").val().trim().toUpperCase();
    datos.Infectologia = $("#chk_Positivo").is(":checked");
    datos.Cultivos_Germen = $("#txt_CultivoGermen").val().trim().toUpperCase();
    datos.DiasATB = $("#txt_DiasATB").val().trim().toUpperCase();
    datos.Pendientes_Interconsultas = $("#txt_Interconsultas").val().trim().toUpperCase();
    datos.Pendientes_Estudios = $("#txt_Estudios").val().trim().toUpperCase();
    datos.Novedades_del_dia = $("#txt_Novedades_del_dia").val().trim().toUpperCase();
    datos.Estado = true;
    datos.InternacionId = IntId;
    datos.DiasAlimentacion = $("#txt_DiasAlimentacion").val().trim();
    datos.Observaciones = $("#txtObservaciones").val().trim().toUpperCase();
    return datos;
}

function Plantilla_ValidarDatos() {
    //No se admiten nulos en los campos a validar...
    if ($("#afiliadoId").val().trim() == "" || $("#afiliadoId").val().trim() == "0") { alert("Paciente no válido."); return false; }
    if ($("#txtFecha").val().trim().length == 0) { alert("Fecha no válida."); return false; }
    if ($("#txt_Cama").val().trim().length == 0) { alert("Ingrese Cama."); return false; }
    if (!$("#chk_VentilacionSI").is(":checked") && !$("#chk_VentilacionNO").is(":checked")) { alert("Seleccione Ventilacion."); return false; }
    if (!$("#chk_TraqueostomiaSI").is(":checked") && !$("#chk_TraqueostomiaNO").is(":checked")) { alert("Seleccione Traqueostomia."); return false; }
    if (!$("#chk_AlimentacionNO").is(":checked") && !$("#chk_AlimentacionEnteral").is(":checked") &&
    !$("#chk_AlimentacionParental").is(":checked") && !$("#chk_AlimentacionOral").is(":checked") &&
    !$("#chk_Suspendida").is(":checked")) { alert("Seleccione Alimentacion."); return false; }
    if (!$("#chk_Positivo").is(":checked") && !$("#chk_Negativo").is(":checked")) { alert("Seleccione Infectologico Positivo o Negativo."); return false; }
    if ($("#txt_DiasUTI").val().trim().length == 0) $("#txt_DiasUTI").val("0");
    if ($("#txt_DiasVentilacion").val().trim().length == 0) $("#txt_DiasVentilacion").val("0");
    if ($("#txt_DiasAlimentacion").val().trim().length == 0) $("#txt_DiasAlimentacion").val("0");
    return true; //Valido datos
}

function Guardar() {
    if (confirm("¿Desea confirmar el pase de Guardia a UTI?")) {
        if (!Plantilla_ValidarDatos()) return false;
        var json = JSON.stringify({ "datos": CargarDatos() });
        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/Epicrisis.asmx/Pase_Guardia_UTI_Guardar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                Pase_Guardia_UTI_Id = Resultado.d;
                $("#btn_Imprimir").show();
                alert("Pase de Guardia a UTI realizado.");
            },
            error: errores
        });
    }

}

$("#btn_Imprimir").click(function () {
    Impresion();
});

function Impresion() {
    var Pagina = "../Impresiones/Impresion_Pase_Guardia_UTI.aspx?Id=" + Pase_Guardia_UTI_Id + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox({
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
		});
}

$("#btnVolver").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + IntId + "&B=" + objBusquedaLista;
});


$("#btn_NuevoPase").click(function () {
    $(".datos").removeAttr("disabled"); //Desbloqueo todos los controles
    Pase_Guardia_UTI_Id = 0; //Nuevo Pase...
    $("#btn_Imprimir").hide();
    GUARDIA_UTI_Cargar_DiasVent(IntId);
});
