var EB = 0;
var objBoxes = Array();

$(document).ready(function () {
    List_Boxes(true);

});

function List_Boxes(Estado) {
    var json = JSON.stringify({ "Estado": Estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/GuardiaBoxesList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Boxes_Cargados,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Boxes_Cargados(Resultado) {
    var Lista = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;

    $("#TablaBoxes").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Box</th><th>Estado</th></tr></thead><tbody>";
    $.each(Lista, function (index, Box) {
        Tabla_Datos = Tabla_Datos + "<tr";
        var R = "";
        var Clase = "";
        var Clased = "";
        objBoxes[i] = Box;
        i++;
        if (Box.Estado) { R = "Activo"; Clase = "btn-success"; Clased = "Activo"; } else { R = "N"; Clase = "btn-danger"; Clased = "No Activo"; };
        Tabla_Datos = Tabla_Datos + "><td><a class='btn' id='Box' " + Box.Estado + " onclick=EdBox(" + Box.Id + ")><i class='icon-edit'></i></a></td><td id='BoxNom" + Box.Id + "'>" + Box.Box + "</td><td> <a onclick=BoxActivo(" + Box.Id + ",'" + R + "') class='btn " + Clase + "'>" + Clased + "</a> <a onclick=BoxEliminar(" + Box.Id + ") class='btn btn-danger'><i class='icon-white icon-remove'></i> Eliminar</a></td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaBoxes").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function EdBox(Id) {
    EB = Id;
    $("#txtBox").val($("#BoxNom" + Id).html());
}


function BoxEliminar(Id) {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/BoxDelete",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BoxEliminar_Cargados,
        error: errores
    });
}

function BoxEliminar_Cargados() {
    EB = 0;
    $("#txtBox").val('');
    alert('Box Eliminado');
    List_Boxes(true);
}

function BoxActivo(Id, Estado) {
    if (Estado == "Activo") Estado = false;
    else Estado = true;
    var json = JSON.stringify({ "Id": Id, "Estado": Estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/CambiarEstado",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CambiarEstado_Cargados,
        error: errores
    });
}

function CambiarEstado_Cargados() {
    List_Boxes(true);
}

function ExisteBox(Algo) {
    for (var i = 0; i <= objBoxes.length - 1; i++) {
        if (objBoxes[i].Box.toUpperCase().trim() == Algo.toUpperCase().trim() && EB == 0) {
            alert("Ya ha cargado el Box: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGuardarBox").click(function () {
    if ($("#txtBox").val().trim().length > 0) {
        if (ExisteBox($("#txtBox").val())) return;
        var json = JSON.stringify({ "Id": EB, "Box": $("#txtBox").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Guardia/Guardia.asmx/BoxGuardar",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: BoxGuardar_Cargados,
            error: errores
        });
    }
    else alert("Ingrese Box");
});

$("#btnCancelarBox").click(function () {
    EB = 0;
    $("#txtBox").val('');
});

function BoxGuardar_Cargados() {
    alert('Box Guardado');
    EB = 0;
    $("#txtBox").val('');
    List_Boxes(true);
}


