var EP = 0;
var objEspecialidades = Array();

$(document).ready(function () {
    List_Especialidades();

});

function List_Especialidades() {
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/_Especialidades.asmx/ListEspecialidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListEspecialidades_Cargados,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function ListEspecialidades_Cargados(Resultado) {
    var Lista = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;

    $("#TablaEspecialidades").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Especialidad</th><th>Estado</th><th>Mostrar en Turnos</th></tr></thead><tbody>";
    $.each(Lista, function (index, especialidad) {
        Tabla_Datos = Tabla_Datos + "<tr";
        var R = "";
        var Clase = "";
        var Clased = "";
        var RT = "";
        var ClaseT = "";
        var ClasedT = "";

        objEspecialidades[i] = especialidad;
        i++;
        if (especialidad.Activa) { R = "Activo"; Clase = "btn-success"; Clased = "Activo"; } else { R = "N"; Clase = "btn-danger"; Clased = "No Activo"; };
        if (especialidad.Turnos) { RT = "Activo"; ClaseT = "btn-success"; ClasedT = "Activo"; } else { RT = "N"; ClaseT = "btn-danger"; ClasedT = "No Activo"; };
        Tabla_Datos = Tabla_Datos + "><td><a title='Editar Especialidad' class='btn' id='Box' " + especialidad.Activa + " onclick=EdEsp(" + especialidad.Id + ")><i class='icon-edit'></i></a></td><td id='EspNom" + especialidad.Id + "'>" + especialidad.Especialidad_Nombre + "</td><td id='EspTurnos" + especialidad.Id + "' style='display:none;'>" + especialidad.Turnos + "</td><td id='EspActiva" + especialidad.Id + "' style='display:none;'>" + especialidad.Activa + "</td><td><a onclick=EspActivo(" + especialidad.Id + ",'" + R + "') class='btn " + Clase + "'>" + Clased + "</a></td><td><a onclick=EspTurnos(" + especialidad.Id + ",'" + RT + "') class='btn " + ClaseT + "'>" + ClasedT + "</a></td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaEspecialidades").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function EdEsp(Id) {
    EP = Id;
    $("#txtEspecialidad").val($("#EspNom" + Id).html());
}


function EspTurnos(Id,Estado) {
    if (Estado == "Activo") Estado = false;
    else Estado = true;
    
    var e = {};
    e.Id = Id;
    e.Especialidad_Nombre = $("#EspNom" + Id).html();
    e.Activa = $("#EspActiva" + Id).html();
    e.Turnos = Estado;

    var json = JSON.stringify({ "e": e });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/_Especialidades.asmx/GuardarEspecialidad",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            alert(Resultado.d);
            List_Especialidades();
        },
        error: errores
    });
}

function EspEliminar_Cargados() {
    EP = 0;
    $("#txtEspecialidad").val('');
    alert('Especialidad dada de baja');
    List_Especialidades();
}

function EspActivo(Id, Estado) {
    if (Estado == "Activo") Estado = false;
    else Estado = true;

    var e = {};
    e.Id = Id;
    e.Especialidad_Nombre = $("#EspNom" + Id).html();
    e.Activa = Estado;
    e.Turnos = $("#EspTurnos" + Id).html();   

    var json = JSON.stringify({ "e": e });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/_Especialidades.asmx/GuardarEspecialidad",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EspGuardar_Cargados,
        error: errores
    });
}

function ExisteEsp(Algo) {
    for (var i = 0; i <= objEspecialidades.length - 1; i++) {
        if (objEspecialidades[i].Especialidad_Nombre.toUpperCase().trim() == Algo.toUpperCase().trim() && EP == 0) {
            alert("Ya ha cargado la Especialidad: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGuardarEsp").click(function () {
    if ($("#txtEspecialidad").val().trim().length > 0) {
        if (ExisteEsp($("#txtEspecialidad").val())) return;
        var e = {};
        e.Id = EP;
        e.Especialidad_Nombre = $("#txtEspecialidad").val().trim().toUpperCase();
        e.Activa = true;
        e.Turnos = true;
        var json = JSON.stringify({ "e": e });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Administracion/_Especialidades.asmx/GuardarEspecialidad",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: EspGuardar_Cargados,
            error: errores
        });
    }
    else alert("Ingrese Especialidad");
});

$("#btnCancelarEsp").click(function () {
    EP = 0;
    $("#txtEspecialidad").val('');
});

function EspGuardar_Cargados(Resultado) {
    alert(Resultado.d);
    EP = 0;
    $("#txtEspecialidad").val('');
    List_Especialidades();
}


