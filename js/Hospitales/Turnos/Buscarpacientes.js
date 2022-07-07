var Express = 0;
var Express_img = 0;
var Documento = 0;
var SobreTurno = "false";
var objTurnos = "";
var S;

$(document).ready(function () {



    $("#form1").validate({
        rules: {
            txtPacienteBuscar: "required"
        },
        messages: {
            txtPacienteBuscar: "*"
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            $("#BusquedatxtPacienteBuscar").removeClass("error");
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#Busqueda" + name_element).addClass("error");
            }
        }
    });

    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    document.getElementById("txtPacienteBuscar").value = parent.document.getElementById("txtPaciente").value;
    Documento = parent.document.getElementById("txtdocumento").value;


    if (Documento != "") {
        Buscar();
    }


    if (GET["Express"] != "0" && GET["Express"] != undefined) {
        if (!(GET["Bono"] != "" && GET["Bono"] != undefined)) {
            if (parent.document.getElementById("Medico").value != "") {
                Express = 1;
                Medico = parent.document.getElementById("Medico").value;
                Hora = parent.document.getElementById("Hora").value;
                Fecha = parent.document.getElementById("Fecha").value;
                Especialidad = parent.document.getElementById("Especialidad").value;
                Primera = parent.document.getElementById("Primera").value;
                TurnoTelefonico = parent.document.getElementById("TurnoTelefonico").value;
                if (GET["SobreTurno"] != "" && GET["SobreTurno"] != undefined)
                    SobreTurno = "true";
                if (GET["Ids"] != "" && GET["Ids"] != undefined)
                    objTurnos = GET["Ids"];
            }
        }
    }

    if (GET["S"] != "" && GET["S"] != undefined) {
        S = GET["S"];
    }

    //    alert(GET["Express_img"]);
    //    if (GET["Express_img"] == 0 && GET["Express_img"] != undefined) {
    //       // if (!(GET["Bono"] != "" && GET["Bono"] != undefined)) {
    //            if (parent.document.getElementById("Medico").value != "") {
    //                Express_img = 1;
    //                Medico = parent.document.getElementById("Medico").value;
    //                Hora = parent.document.getElementById("Hora").value;
    //                Fecha = parent.document.getElementById("Fecha").value;
    //                Especialidad = parent.document.getElementById("Especialidad").value;
    //                Primera = parent.document.getElementById("Primera").value;
    //                TurnoTelefonico = parent.document.getElementById("TurnoTelefonico").value;
    //                if (GET["SobreTurno"] != "" && GET["SobreTurno"] != undefined)
    //                    SobreTurno = "true";
    //                if (GET["Ids"] != "" && GET["Ids"] != undefined)
    //                    objTurnos = GET["Ids"];
    //            }
    //        //}
    //    }

    //Esto es para los turnos de IMG
    //inicio
    //alert(GET["Express_img"]);
    //    if (GET["Express_img"] != 0 && GET["Express_img"] != undefined) {
    //        if (!(GET["Bono"] != "" && GET["Bono"] != undefined)) {
    //            if (parent.document.getElementById("Medico").value != "") {
    //                Express_img = 1;
    //                Medico = parent.document.getElementById("Medico").value;
    //                Hora = parent.document.getElementById("Hora").value;
    //                Fecha = parent.document.getElementById("Fecha").value;
    //                Especialidad = parent.document.getElementById("Especialidad").value;
    //                Primera = parent.document.getElementById("Primera").value;
    //                TurnoTelefonico = parent.document.getElementById("TurnoTelefonico").value;
    //                if (GET["SobreTurno"] != "" && GET["SobreTurno"] != undefined)
    //                    SobreTurno = "true";
    //                if (GET["Ids"] != "" && GET["Ids"] != undefined)
    //                    objTurnos = GET["Ids"];
    //            }
    //        }
    //    }
    //fin


    $("#BusquedatxtPacienteBuscar").change(function () {
        $("#BusquedatxtPacienteBuscar").removeClass("error");
    });



    if (parent.document.getElementById("txtPaciente").value != '')
        Buscar();

    $('#Buscar').click(function () {
        if ($("#form1").valid()) {
            Buscar();
        }
    });


});

function Buscar() {
    var Paciente = $('#txtPacienteBuscar').val().trim().toUpperCase();
    var json = JSON.stringify({ "Paciente": Paciente, "Documento": Documento });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/BuscarApellido_Hospitales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: antes,
        success: resultado,
        error: errores,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#Resultado").show();
}

function antes() {
    $("#cargando").show();
    $("#Resultado").hide();
}


function CargarPaciente(Id) {
    if (Express_img == 1) {  parent.RecargarPagina("../Turnos_IMG/CargaExpress.aspx?ID=" + Id); return false; }


    if (Express == 1)
        parent.RecargarPagina("?ID=" + Id + "&MedicoID=" + Medico + "&EspecialidadId=" + Especialidad + "&Fecha=" + Fecha + "&Hora=" + Hora + "&Primera=" + Primera + "&TurnoTelefonico=" + TurnoTelefonico + "&SobreTurno=" + SobreTurno + "&Ids=" + objTurnos + "&S=" + S);
    else
        parent.RecargarPagina("?ID=" + Id + "&S=" + S);
}

function resultado(Resultado) {
    var Pacientes = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    $("#Resultado").empty();
    Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>#</th><th>Paciente</th><th>Documento</th><th>Seccional/Obra Social</th></tr></thead><tbody>";
    $.each(Pacientes, function (index, pacientes) {
        
        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + pacientes.documento + ");' style='cursor:pointer;'><td>" + pacientes.Nro_Busqueda + "</td><td>" + pacientes.Paciente + "</td><td>" + pacientes.documento_real + "</td><td>" + pacientes.ObraSocial + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

