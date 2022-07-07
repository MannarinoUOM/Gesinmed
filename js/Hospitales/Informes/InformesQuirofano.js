$(document).ready(function () {
    List_Seccionales();
    List_ObraSociales(true);
    Especialidades_Lista();
    ListaCirugia();
    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();
});


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
    var i = 0;
    var Contenido = "";
    $.each(Lista, function (index, Seccional) {
        Contenido = Contenido + "<label style='text-align:left;font-size:x-small;' class='checkbox'><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Seccional.Nro + "'>" + Seccional.Seccional + "</label>";
        i = i + 1;
    });
    //var Pie = "</tbody></table>";
    $("#FiltroSec").html(Contenido);
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
    var i = 0;
    var Contenido = "";
    //var Contenido = "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chkNI' rel ='' >---NINGUNA---</label>";
    $.each(Lista, function (index, Institucion) {
        Contenido = Contenido + "<label style='text-align:left;font-size:x-small;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chk" + Institucion.id + "' rel='" + Institucion.id + "'>" + Institucion.OS + "</label>";
        i = i + 1;
    });
    $("#FiltroIns").html(Contenido);
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
    var i = 0;
    var Contenido = "";
    //var Contenido = "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chkNI' rel ='' >---NINGUNA---</label>";
    $.each(Lista, function (index, Especialidad) {
        Contenido = Contenido + "<label style='text-align:left;font-size:x-small;' class='checkbox'><input type='checkbox' class='checkstableEsp' onclick='toggle_check(this)' id='chk" + Especialidad.Id + "' rel='" + Especialidad.Id + "'>" + Especialidad.Especialidad + "</label>";
        i = i + 1;
    });
    $("#FiltroEsp").html(Contenido);
}

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
    var i = 0;
    var Contenido = "";
    $.each(Lista, function (index, Cirugia) {
        Contenido = Contenido + "<label style='text-align:left;font-size:x-small;' class='checkbox'><input type='checkbox' class='checkstableCir' onclick='toggle_check(this)' id='chk" + Cirugia.id + "' rel='" + Cirugia.id + "'>" + Cirugia.tipo + "</label>";
        i = i + 1;
    });
    $("#FiltroCir").html(Contenido);
} 



function errores(msg) {
    alert('Error: ' + msg.responseText);
}


$("#cbo_Todos_Seccional").change(function () {
    if ($("#cbo_Todos_Seccional").is(":checked"))
        $(".checkstable").attr("checked", "checked");
    else $(".checkstable").removeAttr("checked");
});

$("#cbo_Todos_Institucion").change(function () {
    if ($("#cbo_Todos_Institucion").is(":checked"))
        $(".checkstableIns").attr("checked", "checked");
    else $(".checkstableIns").removeAttr("checked");
});

$("#cbo_Todas_Especialidad").change(function () {
    if ($("#cbo_Todas_Especialidad").is(":checked"))
        $(".checkstableEsp").attr("checked", "checked");
    else $(".checkstableEsp").removeAttr("checked");
});

$("#cbo_Todas_Cirugias").change(function () {
    if ($("#cbo_Todas_Cirugias").is(":checked"))
        $(".checkstableCir").attr("checked", "checked");
    else $(".checkstableCir").removeAttr("checked");
});