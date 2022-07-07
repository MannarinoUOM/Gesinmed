var P = 0;
var E = 0;
var objEstudios = new Array();
var objPlantillas = new Array();

$(document).ready(function () {
    ListarPlantillas(true);
});

function ListarPlantillas(Todos) {
    var json = JSON.stringify({"Todos": Todos});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/ListarPlantillas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListarPlantillas_Cargados,
        error: errores
    });
}


function ListarPlantillasDetalle(IdPlantilla, Todos) {
    var json = JSON.stringify({ "IdPlantilla": IdPlantilla, "Todos": Todos });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/ListarPlantillasDetalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListarPlantillasDetalle_Cargados,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function ListarPlantillas_Cargados(Resultado) {
    var Lista = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;

    $("#TablaPlantillas").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Servicio</th><th>Estado</th></tr></thead><tbody>";
    $.each(Lista, function (index, plantilla) {
        Tabla_Datos = Tabla_Datos + "<tr id='tr" + plantilla.IdPlantilla + "'";
        var R = "";
        var Clase = "";
        var Clased = "";
        objPlantillas[i] = plantilla;

        i++;
        if (plantilla.Estado) { R = "Activo"; Clase = "btn-success"; Clased = "Activo"; } else { R = "N"; Clase = "btn-danger"; Clased = "No Activo"; };
        Tabla_Datos = Tabla_Datos + "><td><a title='Editar Plantilla' class='btn' id='Box' " + plantilla.Estado + " onclick=EdPlantilla(" + plantilla.IdPlantilla + ")><i class='icon-edit'></i></a></td><td onclick='CargarEstudios(" + plantilla.IdPlantilla + ");' id='ServNom" + plantilla.IdPlantilla + "'>" + plantilla.Servicio + "</td></td><td id='PlanActiva" + plantilla.IdPlantilla + "' style='display:none;'>" + plantilla.Estado + "</td><td><a onclick=PlanActivo(" + plantilla.IdPlantilla + ",'" + R + "') class='btn " + Clase + "'>" + Clased + "</a></td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPlantillas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}


function EdPlantilla(Id) {
    P = Id;
    $("tr").css("background-color", "white");
    $("#tr" + Id).css("background-color", "grey");
    $("#txtServicio").val($("#ServNom" + Id).html());
    $("#Estudios").show();
    ListarPlantillasDetalle(P, true);
}

function CargarEstudios(IdPlantilla) {
    P = IdPlantilla;
    $("tr").css("background-color", "white");
    $("#tr" + IdPlantilla).css("background-color", "grey");
    $("#txtServicio").val($("#ServNom" + IdPlantilla).html());
    $("#Estudios").show();
    ListarPlantillasDetalle(IdPlantilla, true);
}


function PlanActivo(Id, Estado) {
    if (Estado == "Activo") Estado = false;
    else Estado = true;

    var obj = {};
    obj.IdPlantilla = Id;
    obj.Servicio = $("#ServNom" + Id).html();
    obj.Estado = Estado;

    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/Insert_Servicio_Plantilla",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            ListarPlantillas(true);
            $("#btnCancelar").click();
        },
        error: errores
    });
}

function ExisteServ(Algo) {
    for (var i = 0; i <= objPlantillas.length - 1; i++) {
        if (objPlantillas[i].Servicio.toUpperCase().trim() == Algo.toUpperCase().trim() && P == 0) {
            alert("Ya ha cargado la plantilla: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGuardar").click(function () {
    if ($("#txtServicio").val().trim().length > 0) {
        if (ExisteServ($("#txtServicio").val())) return;
        var obj = {};
        obj.IdPlantilla = P;
        obj.Servicio = $("#txtServicio").val().trim().toUpperCase();
        obj.Estado = true;
        var json = JSON.stringify({ "obj": obj });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/Insert_Servicio_Plantilla",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                ListarPlantillas(true);
                $("#btnCancelar").click();
            },
            error: errores
        });
    }
    else alert("Ingrese Servicio.");
});

$("#btnCancelar").click(function () {
    P = 0;
    $("#txtServicio").val('');
});



////////////////////////////////////////////////////
///////////////////////////Detalles//////////////////////////
////////////////////////////////////////////////////

function ListarPlantillasDetalle_Cargados(Resultado) {
    var Lista = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;

    $("#TablaEstudios").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Estudio</th><th>Estado</th></tr></thead><tbody>";
    $.each(Lista, function (index, estudio) {
        Tabla_Datos = Tabla_Datos + "<tr id='tr" + i + "'";
        var R = "";
        var Clase = "";
        var Clased = "";
        

        objEstudios[i] = estudio;

        if (estudio.Estado) { R = "Activo"; Clase = "btn-success"; Clased = "Activo"; } else { R = "N"; Clase = "btn-danger"; Clased = "No Activo"; };

        Tabla_Datos = Tabla_Datos + "><td><a title='Editar Estudio' class='btn' id='Box' " + estudio.Estado + " onclick=EdEstudio(" + i + ")><i class='icon-edit'></i></a></td><td>" + estudio.Estudio + "</td></td><td><a onclick=EstudioActivo(" + i + ",'" + R + "') class='btn " + Clase + "'>" + Clased + "</a></td></tr>";
        i++;
    });
    Tabla_Fin = "</tbody></table>";
    $("#TablaEstudios").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function EdEstudio(i) {
    E = objEstudios[i].IdDetalle;
    P = objEstudios[i].IdPlantilla;
    $("#txtEstudio").val(objEstudios[i].Estudio);
}

function EstudioActivo(i, Estado) {
    if (Estado == "Activo") Estado = false;
    else Estado = true;

    var obj = {};
    obj.IdPlantilla = objEstudios[i].IdPlantilla;
    obj.IdDetalle = objEstudios[i].IdDetalle;
    obj.Estudio = objEstudios[i].Estudio;
    obj.Estado = Estado;

    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/Insert_Servicio_PlantillaDetalle",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            ListarPlantillasDetalle(P,true);
            $("#btnCancelarEstudio").click();
        },
        error: errores
    });
}

function ExisteEstudio(Algo) {
    for (var i = 0; i <= objEstudios.length - 1; i++) {
        if (objEstudios[i].Estudio.toUpperCase().trim() == Algo.toUpperCase().trim() && E == 0) {
            alert("Ya ha cargado el estudio: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGuardarEstudio").click(function () {
    if ($("#txtEstudio").val().trim().length > 0) {
        if (ExisteEstudio($("#txtEstudio").val())) return;
        var obj = {};
        obj.IdPlantilla = P;
        obj.IdDetalle = E;
        obj.Estudio = $("#txtEstudio").val().trim().toUpperCase();
        obj.Estado = true;
        var json = JSON.stringify({ "obj": obj });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/Insert_Servicio_PlantillaDetalle",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                ListarPlantillasDetalle(P, true);
                $("#btnCancelarEstudio").click();
            },
            error: errores
        });
    }
    else alert("Ingrese Estudio.");
});

$("#btnCancelarEstudio").click(function () {
    E = 0;
    $("#txtEstudio").val('');
});