var EP = -1;
var objLocalidades = Array();

$(document).ready(function () {
    List_Localidades(1);

});

function List_Localidades(Estado) {
    var json = JSON.stringify({ "Estado": Estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Localidades.asmx/Localidades_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListLocalidades_Cargados,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function ListLocalidades_Cargados(Resultado) {
    var Lista = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;

    $("#TablaEspecialidades").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Localidad</th><th>Estado</th></tr></thead><tbody>";
    $.each(Lista, function (index, localidad) {
        Tabla_Datos = Tabla_Datos + "<tr";
        var R = "";
        var Clase = "";
        var Clased = "";
        var RT = "";
        var ClaseT = "";
        var ClasedT = "";

        objLocalidades[i] = localidad;
        i++;
        if (localidad.estado) { R = "Activo"; Clase = "btn-success"; Clased = "Activo"; } else { R = "N"; Clase = "btn-danger"; Clased = "No Activo"; };
        Tabla_Datos = Tabla_Datos + "><td><a title='Editar Localidad' class='btn' id='Box' " + localidad.estado + " onclick=EdLoc(" + localidad.id + ")><i class='icon-edit'></i></a></td><td id='LocNom" + localidad.id + "'>" + localidad.localidad + "</td><td id='LocActiva" + localidad.id + "' style='display:none;'>" + localidad.estado + "</td><td><a onclick=LocActivo(" + localidad.id + ",'" + R + "') class='btn " + Clase + "'>" + Clased + "</a></td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaEspecialidades").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function EdLoc(Id) {
    EP = Id;
    $("#txtLocalidad").val($("#LocNom" + Id).html());
}

function EspEliminar_Cargados() {
    EP = 0;
    $("#txtLocalidad").val('');
    alert('Localidad dada de baja');
    List_Localidades(1);
}

function LocActivo(Id, Estado) {
    if (Estado == "Activo") Estado = false;
    else Estado = true;

    var l = {};
    l.id = Id;
    l.localidad = $("#LocNom" + Id).html();
    l.estado = Estado;

    var json = JSON.stringify({ "l": l });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Localidades.asmx/Localidades_Guardar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LocGuardar_Cargados,
        error: errores
    });
}

function ExisteLoc(Algo) {
    for (var i = 0; i <= objLocalidades.length - 1; i++) {
        if (objLocalidades[i].localidad.toUpperCase().trim() == Algo.toUpperCase().trim() && EP == -1) {
            alert("Ya ha cargado la Localidad: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGuardarLoc").click(function () {
    if ($("#txtLocalidad").val().trim().length > 0) {
        if (ExisteLoc($("#txtLocalidad").val())) return;
        var l = {};
        l.id = EP;
        l.localidad = $("#txtLocalidad").val().trim().toUpperCase();
        l.estado = true;
        var json = JSON.stringify({ "l": l });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Localidades.asmx/Localidades_Guardar",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: LocGuardar_Cargados,
            error: errores
        });
    }
    else alert("Ingrese Localidad");
});

$("#btnCancelarLoc").click(function () {
    EP = 0;
    $("#txtLocalidad").val('');
});

function LocGuardar_Cargados(Resultado) {
    if (Resultado.d > 0) {
        alert("La localidad se ha guardado correctamente.");
        EP = -1;
        $("#txtLocalidad").val('');
        List_Localidades(1);
    }
}


