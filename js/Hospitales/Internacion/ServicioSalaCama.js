var ES = 0;
var EsL = 0;
var EC = 0;
var SeAc = 0;
var SaAc = 0;
var objServicio = Array();
var objSala = Array();
var objCama = Array();


function CargarServicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarServicios_Cargados,
        error: errores
    });
}

function CargarServicios_Cargados(Resultado) {
    var Servicios = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;
    $("#TablaServicios").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Servicios</th><th>Estado</th></tr></thead><tbody>";
    $.each(Servicios, function (index, servicio) {
        Tabla_Datos = Tabla_Datos + "<tr title='Mostrar Salas' rel='tooltip'";
        var R = "";
        objServicio[i] = servicio;
        i++;
        if (servicio.claseD == 'Activo') { R = "Activo"; } else { R = "N" };
        Tabla_Datos = Tabla_Datos + "><td><a title='Editar Servicio' rel='tooltip' class='btn' id='SD' " + servicio.id + " onclick=EdServicio(" + servicio.id + ")><i class='icon-edit'></i></a></td><td onclick=CargarSalas(" + servicio.id + "); id='SvD" + servicio.id + "'>" + servicio.descripcion + "</td><td> <a onclick=ServicioActivo(" + servicio.id + ",'" + R + "') class='btn " + servicio.clase + "'>" + servicio.claseD + "</a> <a onclick=ServicioEliminar(" + servicio.id + ") class='btn btn-danger'><i class='icon-white icon-remove'></i> Eliminar</a></td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaServicios").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function ServicioActivo(ServicioID, Estado) {
    var json = JSON.stringify({ "Id": ServicioID, "Estado": Estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Internaciones/IntSSC.asmx/ServicioActivo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ServicioActivo_Cargados,
        error: errores
    });
}

function ServicioActivo_Cargados() {
    CargarServicios();
}

function EdServicio(ServicioID) {
    ES = ServicioID;
    $("#txtServicio").val($("#SvD" + ServicioID).html());
}


function CargarSalas(ServicioId) {
    SeAc = ServicioId;
    $("#titulo_sala").html("Servicio: " + $("#SvD" + SeAc).html());
    $.ajax({
        type: "POST",
        data: '{Servicio: "' + ServicioId + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarSalas_Cargados,
        error: errores
    });
}

function CargarSalas_Cargados(Resultado) {

    $("#PosSalas").css("margin-bottom", 400);
        
        $("#PosSalas").fadeIn('slow', function () {
            $('html, body').animate({ scrollTop: $("#PosSalas").offset().top - 60 }, 500);
        });
    var Salas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;

    $("#TablaSalas").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Salas</th><th>Estado</th></tr></thead><tbody>";
    $.each(Salas, function (index, sala) {
        Tabla_Datos = Tabla_Datos + "<tr title='Mostrar Camas' rel='tooltip'";
        var R = "";
        objSala[i] = sala;
        i++;
        if (sala.claseD == 'Activo') { R = "Activo"; } else { R = "N" };
        Tabla_Datos = Tabla_Datos + "><td><a title='Editar Sala' rel='tooltip' class='btn' onclick=EdSala(" + sala.id + "); ><i class='icon-edit'></i></a></td><td id='SlD" + sala.id + "' onclick=CargarCamas(" + sala.id + ");>" + sala.descripcion + "</td><td> <a onclick=SalaActiva(" + sala.id + ",'" + R + "') class='btn " + sala.clase + "'> " + sala.claseD + "</a> <a onclick=SalaEliminar(" + sala.id + ") class='btn btn-danger'><i class='icon-white icon-remove'></i> Eliminar</a></td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaSalas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}


function EdSala(SalaID) {
    EsL = SalaID;
    $("#txtSala").val($("#SlD" + SalaID).html());
}



function CargarCamas(SalaId) {
    $("#PosCamas").fadeIn();
    $("#titulo_cama").html("Servicio: " + $("#SvD" + SeAc).html() + " - Sala: " + $("#SlD" + SalaId).html());
    $("#PosSalas").css("margin-bottom", 0);
    //$("#PosSalas").css("margin-bottom", 400);

    $("#PosCamas").fadeIn('slow', function () {
        $('html, body').animate({ scrollTop: $("#PosCamas").offset().top - 60 }, 500);
    });


    SaAc = SalaId;
    $.ajax({
        type: "POST",
        data: '{Sala: "' + SalaId + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarCama_Cargados,
        error: errores
    });
}

function CargarCama_Cargados(Resultado) {
    var Camas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var i = 0;

    $("#TablaCamas").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 30px;'></th><th>Camas</th><th>Estado</th></tr></thead><tbody>";
    $.each(Camas, function (index, cama) {
        Tabla_Datos = Tabla_Datos + "<tr";
        var R = "";
        objCama[i] = cama;
        i++;
        if (cama.claseD == 'Activo') { R = "Activo"; } else { R = "N" };
        Tabla_Datos = Tabla_Datos + "><td><a title='Editar Cama' rel='tooltip' class='btn' onclick=EdCama(" + cama.id + ");><i class='icon-edit'></i></a></td><td id='CD" + cama.id + "'>" + cama.descripcion + "</td><td> <a onclick=CamaActivo(" + cama.id + ",'" + R + "') class='btn " + cama.clase + "'> " + cama.claseD + "</a> <a onclick=CamaEliminar(" + cama.id + ") class='btn btn-danger'><i class='icon-white icon-remove'></i> Eliminar</a></td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaCamas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}



function EdCama(CamaID) {
    EC = CamaID;
    $("#txtCama").val($("#CD" + CamaID).html());
}


function ServicioEliminar(ServicioId) {
    if (confirm("¿Desea eliminar el Servicio?")) {
        $.ajax({
            type: "POST",
            data: '{Id: "' + ServicioId + '"}',
            url: "../Json/Internaciones/IntSSC.asmx/EliminarServicio",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ServicioEliminar_Eliminado,
            error: errores
        });
    }
}

function ServicioEliminar_Eliminado()
{
    CargarServicios();
    ES = 0;
    $("#txtServicio").val('');
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

CargarServicios();


$("#btnCancelarServicio").click(function () {
    ES = 0;
    $("#txtServicio").val('');
});

$("#btnCancelarSala").click(function () {
    EsL = 0;
    $("#txtSala").val('');
});

$("#btnCancelarCama").click(function () {
    EC = 0;
    $("#txtCama").val('');
});

function ExisteServicio(Algo) {
    for (var i = 0; i <= objServicio.length - 1; i++) {
        if (objServicio[i].descripcion.toUpperCase().trim() == Algo.toUpperCase().trim() && ES == 0) {
            alert("Ya ha cargado el Servicio: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGurdarServicio").click(function () {
    if ($("#txtServicio").val() != "") {
        if (ExisteServicio($("#txtServicio").val())) return;
            var json = JSON.stringify({ "Id": ES, "Servicio": $("#txtServicio").val() });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Internaciones/IntSSC.asmx/ServicioGuardar",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Servicio_Guardado,
                error: errores
            });
    }
    else alert("Ingrese Servicio");
});

function Servicio_Guardado()
{
    CargarServicios();
    ES = 0;
    $("#txtServicio").val('');
}


function SalaActiva(SalaID, Estado) {
    var json = JSON.stringify({ "Id": SalaID, "Estado": Estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Internaciones/IntSSC.asmx/SalaActiva",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: SalaActiva_Cargados,
        error: errores
    });
}

function SalaActiva_Cargados() {
    CargarSalas(SeAc);
}

function CamaActivo(SalaID, Estado) {
    var json = JSON.stringify({ "Id": SalaID, "Estado": Estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Internaciones/IntSSC.asmx/CamaActiva",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CamaActivo_Cargados,
        error: errores
    });
}

function CamaActivo_Cargados() {
    CargarCamas(SaAc);
}

function ExisteSala(Algo) {
    for (var i = 0; i <= objSala.length - 1; i++) {
        if (objSala[i].descripcion.toUpperCase().trim() == Algo.toUpperCase().trim() && EsL == 0) {
            alert("Ya ha cargado la Sala: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGuardarSala").click(function () {
    if ($("#txtSala").val() != "") {
        if (ExisteSala($("#txtSala").val())) return;
        var json = JSON.stringify({ "Id": EsL, "Sala": $("#txtSala").val(), "Servicio": SeAc });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Internaciones/IntSSC.asmx/SalaGuardar",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Sala_Guardado,
            error: errores
        });
    }
    else alert("Ingrese Sala");
});

function Sala_Guardado() {
    CargarSalas(SeAc);
    EsL = 0;
    $("#txtSala").val('');
}

function SalaEliminar(ServicioId) {
    if (confirm("¿Desea eliminar la Sala?")) {
        $.ajax({
            type: "POST",
            data: '{Id: "' + ServicioId + '"}',
            url: "../Json/Internaciones/IntSSC.asmx/EliminarSala",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: SalaEliminar_Eliminado,
            error: errores
        });
    }
}

function SalaEliminar_Eliminado() {
    CargarSalas(SeAc);
    EsL = 0;
    $("#txtSala").val('');
}


function ExisteCama(Algo) {
    for (var i = 0; i <= objCama.length - 1; i++) {
        if (objCama[i].descripcion.toUpperCase().trim() == Algo.toUpperCase().trim() && EC == 0) {
            alert("Ya ha cargado la Cama: " + Algo);
            return true;
        }
    }
    return false;
}

$("#btnGuardarCama").click(function () {
    if ($("#txtCama").val() != "") {
        if (ExisteCama($("#txtCama").val())) return;
        var json = JSON.stringify({ "Id": EC, "Cama": $("#txtCama").val(), "SalaId": SaAc });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Internaciones/IntSSC.asmx/CamaGuardar",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cama_Guardado,
            error: errores
        });
    }
    else alert("Ingrese Cama");
});

function Cama_Guardado() {
    CargarCamas(SaAc);
    EC = 0;
    $("#txtCama").val('');
}

function CamaEliminar(ServicioId) {
    if (confirm("¿Desea eliminar la Cama?")) {
        $.ajax({
            type: "POST",
            data: '{Id: "' + ServicioId + '"}',
            url: "../Json/Internaciones/IntSSC.asmx/EliminarCama",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CamaEliminar_Eliminado,
            error: errores
        });
    }
}

function CamaEliminar_Eliminado() {
    CargarCamas(SaAc);
    EC = 0;
    $("#txtCama").val('');
}

function VolverSalas() {
    $("#PosSalas").css("margin-bottom", 400);
    $('html, body').animate({ scrollTop: $("#PosSalas").offset().top - 60 }, 500);
    EsL = 0;
    $("#txtSala").val('');
    $("#TablaCamas").empty();
    $("#PosCamas").fadeOut();
}

function VolverServicios() {
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    EC = 0;
    $("#txtCama").val('');
    $("#TablaSalas").empty();
    $("#PosSalas").fadeOut();
    

}


