var objPractica = Array();
var objPracticas2 = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objDetails = new Array();
var Id = 0;

$.validator.setDefaults({
    ignore: ""
});

$(document).ready(function () {
    InitControls();
    Especialidades_Lista();
});

function InitControls() {
    $(".date").datepicker();
    $(".date").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txtNroParte").mask("9?9999999999", { placeholder: "-" });
    $("#txtFechaRendicion").val(FechaActual());
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtDesdeParte").val(p);
    $("#txtHastaParte").val(d);
}

$("#ambos").change(function () {
    if ($("#ambos").is(":checked")) {
        $("#Internacion").removeAttr("checked");
        $("#Ambulatorio").removeAttr("checked");
        $("#Internacion").attr("disabled", true);
        $("#Ambulatorio").attr("disabled", true);
    }
    else {
        $("#Ambulatorio").attr("checked", "checked");
        $("#Internacion").removeAttr("disabled");
        $("#Ambulatorio").removeAttr("disabled");
    }
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
    $("#cbo_Medico").empty();
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
    $("#cbo_Medico").empty();
    $("#cbo_Medico").append("<option value='0'></option>");
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}


function List_Partes() {
    var DatosRevalorizar = false;
    var Ambos = false;
    var Internacion = false;
    var Ambulatorio = false;
    if ($("#valorizarauto").is(":checked")) DatosRevalorizar = true;
    if ($("#ambos").is(":checked")) Ambos = true;
    if ($("#Ambulatorio").is(":checked")) Ambulatorio = true;
    if ($("#Internacion").is(":checked")) Internacion = true;
    var json = JSON.stringify({ "NroParte": $("#txtNroParte").val(), "MedicoId": $("#cbo_Medico :selected").val(),
        "EspecialidadId": $("#cbo_Especialidad :selected").val(), "Estado": $("#cbo_Estado :selected").val(),
        "DatosRevalorizar": DatosRevalorizar, "Ambos": Ambos, "Internacion": Internacion, "Ambulatorio": Ambulatorio, "DesdeParte": $("#txtDesdeParte").val(),
        "HastaParte": $("#txtHastaParte").val(), "DesdePractica": $("#txtDesdePrac").val(), "HastaPractica": $("#txtHastaPrac").val(),
        "DesdeRendicion": $("#txtDesdeRend").val(), "HastaRendicion": $("#txtHastaRend").val()
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Partes_SeleccionDatosMedicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Partes_Cargado,
        error: errores
    });
}

function List_Partes_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th><input type='checkbox' id='chkgral' onchange='toggle_checks(this)' rel='gral'></th><th>Nro.Parte</th><th>Fec.Practica</th><th>Fec.Parte</th><th>Fecha</th><th>Médico</th><th>Cantidad</th><th>Codigo</th><th>Practica</th><th>RV</th></tr></thead><tbody>";
        var Contenido = "";
        var i = 0;
        $("#trx").empty();
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><td><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Detalle.NroParte + "," + Detalle.Codigo + "'></td><td> " + Detalle.NroParte + " </td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaParte + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + Detalle.Afiliado + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Codigo + " </td><td> " + Detalle.Practica + " </td><td> " + Detalle.RV + " </td></tr>";
            Total = Total + 1;
            i = i + 1;
            if (Lista.length == i) {
                $("#tabla").show();
                $("#cargando").hide();
            }
        });
        var Pie = "</tbody></table>";
        $("#trx").html(Contenido);
    }
    else {
        $("#trx").html('');
        $("#tabla").show();
        $("#cargando").hide();
    }
    //$("#TablaPartes_div").html(Encabezado + Contenido + Pie);
}


$("#btnBuscar").click(function () {
    $("#tabla").hide();
    $("#cargando").show();
    List_Partes();
});

function toggle_checks(chk) {
    if ($(chk).is(":checked")) {
        $(".checkstable").attr("checked", "checked");
        $(".checkstable").addClass("active");
    }
    else {
        $(".checkstable").removeAttr("checked");
        $(".checkstable").removeClass("active");
    }
}

function toggle_check(chk) {
    if ($(chk).is(":checked")) {
        $(chk).attr("checked", "checked");
        $(chk).addClass("active");
    }
    else {
        $(chk).removeAttr("checked");
        $(chk).removeClass("active");
    }
}

$("#btnProcesar").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0;
    $("#tabla").hide();
    $("#cargando").show();
    objDetails = new Array();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                Obj.Procesado = 1;
                objDetails[o] = Obj;
                o = o + 1;
            }
            if (k == size && o != 0) {
                SaveDetail();
                alert("Partes Procesados de Forma Correcta");
                $("#chkgral").removeAttr("checked");
                $("#tabla").show();
                $("#cargando").hide();
                List_Partes();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {

        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún parte");
    }
});

function SaveDetail() {
    var json = JSON.stringify({ "Obj": objDetails });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/InsertSeleccionDatosMedicos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}

$("#btnNoRevalorizado").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0;
    $("#tabla").hide();
    $("#cargando").show();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                Obj.Revalorizado = false;
                objDetails[o] = Obj;
                o = o + 1;
            }
            if (k == size && o != 0) {
                SaveRevalorizado();
                //                alert("Partes Procesados de Forma Correcta");
                //                $("#chkgral").removeAttr("checked");
                //                $("#tabla").show();
                //                $("#cargando").hide();
                //                List_Partes();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {

        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún parte");
    }
});

$("#btnRevalorizado").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0;
    $("#tabla").hide();
    $("#cargando").show();
    objDetails = new Array();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                Obj.Revalorizado = true;
                objDetails[o] = Obj;
                o = o + 1;
            }
            if (k == size && o != 0) {
                SaveRevalorizado();
                //                alert("Partes Procesados de Forma Correcta");
                //                $("#chkgral").removeAttr("checked");
                //                $("#tabla").show();
                //                $("#cargando").hide();
                //                List_Partes();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {
        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún parte");
    }

});

function alerta() {
    alert("Partes Procesados de Forma Correcta");
}

function SaveRevalorizado() {
    var json = JSON.stringify({ "Obj": objDetails });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/RevalorizarParte",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores,
        success: SaveRevalorizado_ok
    });
}

function SaveRevalorizado_ok() {
    alert("Partes Procesados de Forma Correcta");
    $("#chkgral").removeAttr("checked");
    $("#tabla").show();
    $("#cargando").hide();
    List_Partes();
}

$("#btnCambiarFecha").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0;
    $("#tabla").hide();
    $("#cargando").show();
    objDetails = new Array();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                objDetails[o] = Obj;
                o = o + 1;
            }
            if (k == size && o != 0) {
                UpdateFechaRendicion();
                //                alert("Fecha de Rendicion Modificada");
                //                $("#chkgral").removeAttr("checked");
                //                $("#tabla").show();
                //                $("#cargando").hide();
                //                List_Partes();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {
        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún Parte");
    }

});

function UpdateFechaRendicion() { //Actualizo la fecha de rendicion de los detalles seleccionados...
    var json = JSON.stringify({ "Obj": objDetails, "Fecha": $("#txtFechaRendicion").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/UpdateFechaRendicion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores,
        success: UpdateFechaRendicion_ok
    });
}

function UpdateFechaRendicion_ok() {
    alert("Fecha de Rendicion Modificada");
    $("#chkgral").removeAttr("checked");
    $("#tabla").show();
    $("#cargando").hide();
    List_Partes();
}

