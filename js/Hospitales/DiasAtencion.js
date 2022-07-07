var MedicoId;

function Cargar_Dias_Atencion(MedicoId) {
    $.ajax({
        type: "POST",
        url: "../Json/DiasAtencion.asmx/Dias_Atencion_Lista_Medicos_Vista",
        data: '{MedicoId: "' + MedicoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Dias_Atencion_Vista_Cargadas,
        error: errores
    });
}

function Sobreturnos(MedicoId) {
    $.ajax({
        type: "POST",
        url: "../Json/DiasAtencion.asmx/CantSobreturnos",
        data: '{MedicoId: "' + MedicoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Sobreturnos_Cargadas,
        error: errores
    });
}

function Sobreturnos_Cargadas(Resultado) {
    var cant = Resultado.d;
    $("#txtCantidad").val('');
    if (cant != -1) {
        if (cant > 0)
            $("#txtCantidad").val(cant);
        else {
            $("#txtCantidad").val('0');
            alert("El Médico admite la cantidad de sobreturnos que desee.");
        }
    }
    else {
        alert("El Médico no acepta sobreturnos.");
    }
}

function Dias_Atencion_Vista_Cargadas(Resultado) {

    var DiasAtencion = Resultado.d;
    var ActualEspecialidad = "";
    var Encabezado = "";
    var Resultado = "";
    var Cuerpo = "";
    var Cab = "";
    var Inicio = "1";



    $.each(DiasAtencion, function (index, dias) {
        if (ActualEspecialidad != dias.Especialidad) {
            $("#NombreMedico").html(dias.Medico);
            ActualEspecialidad = dias.Especialidad;
            if (Inicio == "1") {
                Inicio = "0";
                Encabezado = "<h5>" + ActualEspecialidad + "</h5>";
                Resultado = Resultado + Encabezado;
                Cab = "<table id='TablaTurnos' class='table table-condensed table-bordered table-striped' style='width: 100;'><thead><tr><th>Día</th><th>Inicio</th><th>Fin</th><th>Duración</th><th>Consultorio</th></tr></thead><tbody>";
                Resultado = Resultado + Cab;
            }
            else {
                Resultado = Resultado + Cuerpo;
                Resultado = Resultado + "</tbody></table></br>";
                Inicio = "1";
                Cuerpo = "";

                Encabezado = "<h5>" + ActualEspecialidad + "</h5>";
                Resultado = Resultado + Encabezado;
                Cab = "<table id='TablaTurnos' class='table table-condensed table-bordered table-striped' style='width: 100;'><thead><tr><th>Día</th><th>Inicio</th><th>Fin</th><th>Duración</th><th>Consultorio</th></tr></thead><tbody>";
                Resultado = Resultado + Cab;
            }
        }

        Cuerpo = Cuerpo + "<tr><td>" + dias.Dia + "</td><td>" + dias.Inicio + "</td><td>" + dias.Fin + "</td><td>" + dias.Duracion + "</td><td>" + dias.Consultorio + "</td></tr>"

    });
    Resultado = Resultado + Cuerpo;
    Resultado = Resultado + "</tbody></table></br>";
    $("#Dias").html(Resultado);
    if (DiasAtencion.length > 0) {
        $("#Sobreturnos").show();
        Sobreturnos(MedicoId);
    }
    else {
        $("#Sobreturnos").hide();
    }
}


$(document).ready(function () {


    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["MedicoId"] != "") {
        MedicoId = GET["MedicoId"];
        Cargar_Dias_Atencion(MedicoId);
        Cargar_Dias_NoAt(MedicoId);
    }
});

function Cargar_Dias_NoAt(MedicoId) {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasNoAtencionEdicion.asmx/Dias_No_Atencion_Lista",
        data: '{MedicoId: "' + MedicoId + '", Especialidad: "' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Dias_NoAt_Cargadas,
        error: errores
    });
}


function Cargar_Dias_NoAt_Cargadas(Resultado) {
    var Encabezado = "<table class='table table-hover table-bordered table-condensed' style='width: 100%; cursor: pointer;'><thead><tr><th>Motivo</th><th>Desde</th><th>Hasta</th></tr></thead><tbody>";
    var Contenido = "";
    var Dias = Resultado.d;
    $.each(Dias, function (index, dias) {
        Contenido = Contenido + "<tr><td> " + dias.MotivoAusencia + " </td><td> " + dias.FechaDesde + " </td><td> " + dias.FechaHasta + " </td></tr>";
    });

    var Pie = "</tbody></table>";
    $("#TablaNoAt").html(Encabezado + Contenido + Pie);

}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

