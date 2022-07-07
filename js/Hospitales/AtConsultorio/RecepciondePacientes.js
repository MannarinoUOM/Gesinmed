var Especialidad = 0;
var TurnoId = 0;

$(document).ready(function () {

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }

    $('#txtNroBono').focus();

    $("#txtFechaTuro").mask("99/99/9999", { placeholder: "-" });
    $("#txtNroBono").mask("9?9999999");
    $("#txt_dni").mask("999999?99");
    $("#txtNHC").mask("9?9999999999");
    $("#txtFechaTuro").val(FechaActual());
    $("#txtFechaTuro").datepicker();
    ListTipoDoc();

});

function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });
        },
        error: errores
    });
}

$("#txtNHC").change(function () {
    if ($("#txtNHC").val().length > 0)
        Cargar_Paciente_NHC($("#txtNHC").val());
});

$("#txtNroBono").keydown(function (e) {
    if (e.which == 9) { e.preventDefault(); return; }
    if ($("#txtNroBono").val().length > 0) {
        if (e.which == 13) {
            e.preventDefault();
            Cargar_Paciente_PorBonoId();
            Animar();
        }
    }
});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
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
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}


function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function Cargar_Paciente_Documento_Cargado(Resultado) {

    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            // if (paciente.Seccional != "Particulares") { CargarAfiliadoIdVPN(paciente.cuil); }            
            $("#btnCancelarPedidoTurno").show();
            $("#txtNroBono").prop("readonly", true);
            $("#txtFechaTuro").prop("readonly", true);
            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);
            $("#CargadoApellido").html(paciente.Paciente);
            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);
            if ($("#txtNroBono").val() != '') {
                $("#txt_dni").val(paciente.documento_real);
            }

            $("#txtNHC").val(paciente.NHC_UOM);
            $("#afiliadoId").val(paciente.documento);
            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoSeccional").html(paciente.Seccional);
            //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
            //alert(paciente.Foto);
            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

            if (PError) {
                $("#desdeaqui").hide();
            }
        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}


function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}

function RecargarPagina(url) {
    document.location = "../AtConsultorio/RecepciondePacientes.aspx" + url;
}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#txtFechaTuro").change(function () {
    $("#TablaTurnos").empty();
    $("#txtNroBono").val('');
    $("#txt_dni").val('');
    $("#txtNHC").val('');
});



function Cargar_Paciente_PorDocumento() {

    var json = JSON.stringify({
        "Documento": $("#txt_dni").val(),
        "Fecha": $("#txtFechaTuro").val()
    });

    if ($("#txt_dni").val() != '' && $("#txtFechaTuro").val() != '') {

        $("#TablaTurnos").empty();

        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_PorDocumento",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Paciente_PorDocumento_Cargado,
            error: errores
        });
    }
    else {
        return false;
    }
}

function Cargar_Paciente_PorDocumento_Cargado(Resultado) {
    var Turnos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";


    $("#TablaTurnos").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed'><thead><tr><th>Fecha</th><th>Hora</th><th>Médico</th><th>Especialidad</th><th>Consultorio</th></tr></thead><tbody>";
    $.each(Turnos, function (index, turno) {
        //Tabla_Datos = Tabla_Datos + "<tr onclick=Confirmar(" + turno.TurnoId + "," +turno.EspecialidadId+")";
        Tabla_Datos = Tabla_Datos + "<tr data-id='" + turno.TurnoId + "'";
        Tabla_Datos = Tabla_Datos + "><td>" + turno.Fecha + "</td><td>" + turno.Hora + "</td><td>" + turno.Medico + "</td><td>" + turno.Especialidad + "</td><td>" + turno.Consultorio + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    Cargar_Bonos_Libres();
}


$('#desdeaqui').click(function () {
    if ($("#txtNroBono").val().length == 0) { alert("Ingrese Nro. de Bono."); return; }
    else {
        Cargar_Paciente_PorBonoId();
        Animar();
    }
});

function Animar() {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 30 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}


function Confirmar(Id, EspecialidadId) {
    Especialidad = EspecialidadId;
    TurnoId = Id;
    if ($("#txt_dni").val() != '') {
        $("#BonoModal").modal('show');
    }
}

function ConfirmarBB(Id, EspecialidadId) {
    Especialidad = EspecialidadId;
    TurnoId = Id;
    ConfirmarB($("#txtNroBono").val());
}

$("#txt_dni").change(function () {
    if ($("#txtNroBono").val() == '') {
        Cargar_Paciente_PorDocumento();
        Cargar_Paciente_Documento($("#txt_dni").val());
    }
});

function Cargar_Paciente_PorBonoId() {

    var json = JSON.stringify({
        "BonoId": $("#txtNroBono").val(),
        "Fecha": $("#txtFechaTuro").val()
    });

    if ($("#txtNroBono").val() != '' && $("#txtFechaTuro").val() != '') {
        $("#TablaTurnos").empty();
        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_BonoId",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Paciente_PorBonoId_Cargado,
            error: errores
        });
    }
    else {
        return false;
    }
}

function Cargar_Paciente_PorBonoId_Cargado(Resultado) {
    var Turnos_Lista = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";

    Tabla_Fin = "</tbody></table>";
    Tabla_Titulo = "<table class='table table-condensed'><thead><tr><th>Fecha</th><th>Hora</th><th>Médico</th><th>Especialidad</th><th>Cons.</th><th>Min. tarde</th></tr></thead><tbody>";
    $("#TablaTurnos").empty();
    $.each(Turnos_Lista, function (index, Turnos) {
        if (index == 0) {
            CargarPacienteID(Turnos.Documento);
        }

        var Hora_Actual = new Date();
        var Auxi = Turnos.Fecha.substring(3, 6) + Turnos.Fecha.substring(0, 2) + Turnos.Fecha.substring(5, Turnos.Fecha.Lenght) + ' ' + Turnos.Hora;
        //var Hora_Turno = new Date('07/02/2015 12:26');
        var Hora_Turno = new Date(Auxi);
        //82261367
        var dif = Math.floor((Hora_Actual - Hora_Turno) / (1000 * 60));
        //var dif = Math.floor((Hora_Turno - Hora_Actual) / (1000 * 60));
        if (dif > 15) {
            alert("ATENCION!!!, El turno de la hora: " + Turnos.Hora + "\r a sobrepasado " + dif + " minutos de los 15 tolerables.");
        }

        var mostrar_dif = "";

        if (dif > 15) { mostrar_dif = dif; }

        if (Turnos.Estado == "Cancelado") {
            Tabla_Datos = Tabla_Datos + "<tr style='background-color:red;'";
        }
        else {
            Tabla_Datos = Tabla_Datos + "<tr class='row_libre' data-id='" + Turnos.TurnoId + "'";
            //Tabla_Datos = Tabla_Datos + "<tr onclick=ConfirmarBB(" + Turnos.TurnoId + ",0)";
        }
        Tabla_Datos = Tabla_Datos + "><td>" + Turnos.Fecha + "</td><td>" + Turnos.Hora + "</td><td>" + Turnos.Medico + "</td><td>" + Turnos.Especialidad + "</td><td>" + Turnos.Consultorio + "</td><td>" + mostrar_dif + "</td></tr>";
    });
    $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    return;

    //borrar





    if (Turnos.Medico != "") {
    
        //$("#desdeaqui").click();
        CargarPacienteID(Turnos.Documento);




        $("#TablaTurnos").empty();

        Tabla_Titulo = "<table class='table table-hover table-condensed'><thead><tr><th>Fecha</th><th>Hora</th><th>Médico</th><th>Especialidad</th><th>Consultorio</th></tr></thead><tbody>";

        
        if (Turnos.Estado == "Cancelado") {
            Tabla_Datos = Tabla_Datos + "<tr style='background-color:red;'";
        }
        else {
            Tabla_Datos = Tabla_Datos + "<tr class='row_libre' data-id='" + turno.TurnoId + "'";
            //Tabla_Datos = Tabla_Datos + "<tr onclick=ConfirmarBB(" + Turnos.TurnoId + ",0)";
        }
        Tabla_Datos = Tabla_Datos + "><td>" + Turnos.Fecha + "</td><td>" + Turnos.Hora + "</td><td>" + Turnos.Medico + "</td><td>" + Turnos.Especialidad + "</td><td>" + Turnos.Consultorio + "</td></tr>";


        Tabla_Fin = "</tbody></table>";
        $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

        var Hora_Actual = new Date();
        var Auxi = Turnos.Fecha.substring(3, 6) + Turnos.Fecha.substring(0, 2) + Turnos.Fecha.substring(5, Turnos.Fecha.Lenght) + ' ' + Turnos.Hora;
        //var Hora_Turno = new Date('07/02/2015 12:26');
        var Hora_Turno = new Date(Auxi);
        //82261367
        var dif = Math.floor((Hora_Actual - Hora_Turno) / (1000 * 60));
        //var dif = Math.floor((Hora_Turno - Hora_Actual) / (1000 * 60));
        if (dif > 15) {
            alert("ATENCION!!!, La hora del turno es: " + Turnos.Hora + "\rHan pasado " + dif + " minutos de la hora del turno.");
        }        

    }
    
}




function Cargar_Bonos_Libres() {

    var json = JSON.stringify({
        "Documento": $("#txt_dni").val(),
        "Especialidad": Especialidad
    });

    if ($("#txt_dni").val() != '') {

        $("#BonosLibres").empty();

        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_Bonos_Libres",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Bonos_Libres_Cargado,
            error: errores
        });
    }
    else {
        return false;
    }
}

function Cargar_Bonos_Libres_Cargado(Resultado) {
    var Bonos = Resultado.d;
    var Tabla_Datos = "";

    $("#BonosLibres").empty();


    $.each(Bonos, function (index, bono) {                
            Tabla_Datos = Tabla_Datos + "<tr style='cursor:pointer;' onclick=ConfirmarB(" + bono.Bono_id + ")";
            Tabla_Datos = Tabla_Datos + "><td>" + bono.Bono_id + "</td><td>" + bono.Fecha + "</td><td>" + bono.Medico + "</td><td>" + bono.Especialidad + "</td></tr>";        
    });


    $("#BonosLibres").html(Tabla_Datos);

}








$("#btnOtorgados").fancybox({
    'width': '75%',
    'height': '75%',
    'href': '../Turnos/TurnosOtorgados.aspx?Documento=' + $('#afiliadoId').val(),
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});


function ConfirmarB(BonoId)
{
    
    var json = JSON.stringify({
        "TurnoId": TurnoId,
        "BonoId": BonoId
    });

    if (TurnoId != '' && BonoId != 0) {

        $("#BonosLibres").empty();
        $('#BonoModal').modal('hide')

        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_Confirmar_Turnos",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ConfirmarB_Cargado,
            error: errores
        });
    }
    else {
        return false;
    }
}

function InicioSesion() {
    alert("Error: Inicie Sesión Nuevamente.");
    parent.document.location = "../Login.aspx";
}

function ConfirmarB_Cargado(Respuesta) {
    if (Respuesta.d == -1) InicioSesion(); //A inicio de sesion
    else {
        alert("Recepcionado.");
        self.location = "RecepciondePacientes.aspx";
    }
}

//////Nuevas Funciones para Turnos Dobles - 06/06/2017 (Fede)//////

/////////Eventos en tabla de turnos/////////
////////////////////////////////////////////
$(document).on("click", ".row_libre", function () {
    $(this).addClass("row_select");
    $(this).removeClass("row_libre");
});

$(document).on("click", ".row_select", function () {
    $(this).removeClass("row_select");
    $(this).addClass("row_libre");
});
/////////Fin - Eventos en tabla de turnos/////////
////////////////////////////////////////////


function SelectList_IsEmpty() {
    if ($(".row_select").length == 0) { alert("No hay turnos seleccionados."); return true; }
    return false;
}

$("#btnRecepcionar").click(function () {
    if (confirm("¿Desea confirmar los turnos seleccionados?")) {
        if (SelectList_IsEmpty()) return false;
        RecorrerTabla();
    }
});

function RecorrerTabla() {
    var arr_Turnos = [];
    $(".row_select").each(function (index, row) {
        arr_Turnos.push($(row).data("id"));
        if (index == $(".row_select").length - 1) RecepcionarTurnos(arr_Turnos);
    });
}

function ValidarRecepcion(arr_Turnos) {
    if ($("#txtNroBono").val().trim().length == 0) { alert("Ingrese Nro. de Bono."); return false; }
    if (arr_Turnos.length == 0) { alert("No hay turnos seleccionados."); return false; }
    return true;
}

function RecepcionarTurnos(arr_Turnos) {
    if (!ValidarRecepcion(arr_Turnos)) return false;
    
    var json = JSON.stringify({
        "TurnosId": arr_Turnos,
        "BonoId": $("#txtNroBono").val().trim()
    });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_Confirmar_Turnos_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Los turnos han sido recepcionados.");
            window.location = "RecepciondePacientes.aspx";
        },
        error: errores
    });
}


///////Fin Nuevas Funciones para Turnos Dobles - 06/06/2017 (Fede)//////


function CargarAfiliadoIdVPN(afiliadoCuil) {
    var json = JSON.stringify({ "afiliadoCuil": afiliadoCuil });
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerIdXCuilDBT",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 0) {
                alert("ATENCIÓN! DEBE ACTUALIZAR EL CUIL DE LA FICHA DEL PACIENTE PARA PODER CONTINUAR");
                 document.location = "../AtConsultorio/RecepciondePacientes.aspx"; 
             }
        },
        error: errores
    });
}
