var ErrorHora = false;
var CUIL = 6;
var Cod_OS = 6;

Cargar_Seccionales_Lista();

function RecargarPagina(url) {
    document.location = "DarTurnos.aspx" + url;
}

function CambiarPagina(url) {
    document.location = url + "&TurnoTelefonico=" + $("#cb_ttel").is(':checked');
}

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}

function CargarLosTurnos(valor) {
    var reservados = false;
    var libres = false;

    if (valor == 0) {
        reservados = $("#btn_Todos").hasClass('active') || $("#btn_Reservados").hasClass('active');
        libres = $("#btn_Libres").hasClass('active') || $("#btn_Todos").hasClass('active');
    }
    if (valor == 1) {
        reservados = true;
        libres = true;
    }

    if (valor == 2) {
        reservados = false;
        libres = true;
    }

    if (valor == 3) {
        reservados = true;
        libres = false;
    }
    var _sobreturnos = false;
    if (valor == 4) var _sobreturnos = true;
    var _cancelados = false;
    if (valor == 5) var _cancelados = true;

    Cargar_Turnos($("#cbo_Medico").val(), $("#cbo_Especialidad").val(), $('#txtFecha').val(), $("#txtHora").val(), reservados, libres, $("#cbo_Dias").val(),_sobreturnos,_cancelados);
}


function Cargar_Turnos(MedicoId, EspecialidadId, FechaDesde, HoraDesde, Reservados, Libres, Dias,Sobreturnos,Cancelados) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Turno_List_2",
        data: '{MedicoId: "' + MedicoId + '", EspecialidadId: "' + EspecialidadId + '", sFechaDesde: "' + FechaDesde + '", HoraDesde: "' + HoraDesde + '", Reservados: "' + Reservados + '", Libres: "' + Libres + '", Dias: "' + Dias + '", Sobreturnos: "' + Sobreturnos + '", Cancelados: "' + Cancelados + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Turnos_Cargados,
        error: errores,
        beforeSend: antes,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#TablaTurnos_div").show();
}

function antes() {
    $("#cargando").show();
    $("#TablaTurnos_div").hide();
}

$("#txtFecha").datepicker();

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
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
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}



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

$('#cbo_TipoDOC').change(function () {
    if ($("#txt_dni").val() != "") Cargar_Paciente_Documento($("#txt_dni").val());
});

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".ingreso").val('');
        },
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}



function Actualizar_Telefono_Seccional(Telefono, Seccional, Documento) {
    Cod_OS = $("#cbo_ObraSocial :selected").val();
    if (Cod_OS == undefined) { Cod_OS = 112103 }
    Documento = $("#afiliadoId").val();
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/Actualizar_Telefono_Seccional",
        data: '{Telefono: "' + Telefono + '", Seccional: "' + Seccional + '", Documento: "' + Documento + '", CodOs: "' + Cod_OS + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Actualizado_Telefono_Documento,
        error: errores
    });
}


function Actualizado_Telefono_Documento(Resultado) {
    if (Resultado.d == '1') {
        $("#desdeaqui").show();
        $("#controlTelefono").removeClass("error");
        $("#controlSeccional").removeClass("error");
        $("#CargadoTelefono").html($("#txtTelefono").val());


        if ($("#Cod_OS").val() == "112103") {
            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        }
        else {
            $("#CargadoSeccional").html($("#cbo_ObraSocial :selected").text());
        }

    }
    else {


        if ($("#txtTelefono").val().length < 6) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
        }
        else {
            $("#controlTelefono").removeClass("error");
        }

        if ($("#cboSeccional :selected").val() == "999") {
            $("#controlSeccional").addClass("error");
        }
        else {
            $("#controlSeccional").removeClass("error");
        }

    }

}


function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        if (paciente.Vencido) {
            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
            return false;
        }
        $("#btnactualizar").show();
        $("#btnCancelarPedidoTurno").show();
        $("#txtPaciente").focus();
        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.documento);
        $("#txtTelefono").attr('value', paciente.Telefono);
        $("#afiliadoId").val(paciente.documento);


        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



        if ($("#txtTelefono").val().length < 5) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
            PError = true;
        }


        if (paciente.Nro_Seccional == "999") {
            $("#controlSeccional").addClass("error");
            PError = true;
        }



        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#CargadoEdad").html(AnioActual.getFullYear() - AnioNacimiento.getFullYear());
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#CargadoNHC").html(paciente.documento);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        else {
            $("#btnVencimiento").show();
        }

        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }

    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            if (paciente.Vencido) {
                alert("Paciente dado de baja el día: " + paciente.Fecha_Baja);
                return false;
            }

            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();
            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.cuil);
            $("#txtTelefono").attr('value', paciente.Telefono);
            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



            $("#btnOtorgados").css('display', 'inline');

            if ($("#txtTelefono").val().length < 5) {
                $("#controlTelefono").addClass("error");
                $("#txtTelefono").focus();
                PError = true;
            }
            if (paciente.Nro_Seccional == 999) {
                $("#controlSeccional").addClass("error");
                PError = true;
            }


            $("#CargadoApellido").html(paciente.Paciente);

            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


            var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
            if (AnioNacimiento.getFullYear() == 0) {
                edad = S / FN;
            }
            $("#CargadoEdad").html(edad);
            $("#txt_dni").val(paciente.documento_real);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#afiliadoId").val(paciente.documento);
            $("#CargadoNHC").html(paciente.documento);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#Titulo_Seccional_o_OS").html("Ob. Social");
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                Cargar_ObraSociales_Cargar(paciente.OSId);
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }
            else {
                $("#btnVencimiento").show();
            }

            $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
                $("#desdeaqui").focus();
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


function Turnos_Cargados(Resultado) {

    var textosemana = new Array(7);
    textosemana[0] = "Dom";
    textosemana[1] = "Lun";
    textosemana[2] = "Mar";
    textosemana[3] = "Mié";
    textosemana[4] = "Jue";
    textosemana[5] = "Vie";
    textosemana[6] = "Sáb";


    var Turnos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var SobreTurno = false;

    if ($("#btn_SobreTurno").hasClass('active')) {
        SobreTurno = true;
    }
    else {
        SobreTurno = false;
    }

    Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fecha</th><th>Hora</th><th>Especialidad</th><th>Médico</th><th>Paciente</th><th>Seccional/OS</th></tr></thead><tbody>";
    $.each(Turnos, function (index, turnos) {
        Tabla_Datos = Tabla_Datos + "<tr class='" + turnos.Clase + "'";
        if (turnos.NombrePaciente == "") {
            Tabla_Datos = Tabla_Datos + " onclick=CambiarPagina('ConfirmarTurnos.aspx?MedicoID=" + turnos.MedicoId + "&EspecialidadId=" + turnos.EspecialidadId + "&Fecha=" + turnos.Fecha + "&Hora=" + turnos.Hora + "&Primera=" + $("#cb_pv").is(':checked') + "&Actual=" + $("#afiliadoId").val() + "');";
        }
        var OS = "";
        if (turnos.OS.length > 13) {
            OS = turnos.OS.substring(0, 14) + "...";
        }
        else OS = turnos.OS;
        Tabla_Datos = Tabla_Datos + "><td>" + turnos.DiaSemana + " " + turnos.Fecha + "</td><td>" + turnos.Hora + "</td><td>" + turnos.EspecialidadDescripcion + "</td><td>" + turnos.NombreMedico + "</td><td>" + turnos.NombrePaciente + "</td><td rel='tooltip' title='" + turnos.OS + "'>" + OS + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaTurnos").empty();
    $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}



function Cargar_Centro_Unico() {
    var Todos = 0;
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Centro_Unico_Select,
        error: errores
    });

}


function Cargar_Centro_Unico_Select(Resultado) {
    var Centros = Resultado.d;
    $('#cbo_Centro').empty();
    $.each(Centros, function (index, centro) {
        $('#cbo_Centro').append(
              $('<option></option>').val(centro.Id).html(centro.RazonSocial)
            );
    });
}

function Cargar_Tipo_Documentos_Lista_Cargados(Resultado) {
    var Documentos = Resultado.d;
    $('#cboTipoDoc').empty();
    $.each(Documentos, function (index, tdoc) {
        $('#cboTipoDoc').append(
              $('<option></option>').val(tdoc.Id).html(tdoc.Descripcion)
            );
    });
}


function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}





function MostrarBotonEditarEliminar(id) {
    $("#Editar" + id).css("display", "inline");
    $("#Elminar" + id).css("display", "inline");
}

function OcultarBotonEditarEliminar(id) {
    $("#Editar" + id).css("display", "none");
    $("#Elminar" + id).css("display", "none");
}


function Cargar_Medicos_por_Especialidad(Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}


function Cargar_Tipo_Documentos_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Documentos_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Tipo_Documentos_Lista_Cargados,
        error: errores
    });

}


function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Medicos</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}





function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {
    ListTipoDoc();

    $('#txt_dni').focus();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }


    var GET = {};
    var NHC = "";

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["ID"] != "" && GET["ID"] != null) {
        ID = GET["ID"];
        $("#afiliadoId").val(ID);
        CargarPacienteID(ID);
    }

    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtHora").mask("99:99", { placeholder: "-" });

    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });

    $("#btn_Dias_de_Atencion").css("display", "none");
    $("#btn_SobreTurno").css("display", "none");
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });


    $("#cbo_Medico").change(function () {

        if ($('#cbo_Medico option:selected').val() == '0') {
            $("#btn_Dias_de_Atencion").css("display", "none");
            $("#btn_SobreTurno").css("display", "none");
        }
        else {
            $("#btn_Dias_de_Atencion").css("display", "inline");
            $("#btn_SobreTurno").css("display", "inline");
            $("#btn_Dias_de_Atencion").attr('href', 'DiasdeAtencionVista.aspx?MedicoId=' + $('#cbo_Medico :selected').val());
        }

        SobreTurnoActivo();
        CargarLosTurnos(0);
    });

    $("#btn_SobreT").click(function () { //Sobreturnos
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").addClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(4);
    });

    $("#btn_CancelT").click(function () { //Cancelados
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").addClass("reff_activo");
        CargarLosTurnos(5);
    });

    //Todos
    $('#btn_Todos').click(function () {
        $("#btn_Todos").addClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(1);
    });

    //Libres
    $('#btn_Libres').click(function () {
        $("#btn_Libres").addClass("reff_activo");
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(2);
    });

    //Reservados
    $('#btn_Reservados').click(function () {
        $("#btn_Reservados").addClass("reff_activo");
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(3);
    });

    $('#cbo_Dias').change(function () {
        CargarLosTurnos(0);
    });

    $('#txtFecha').change(function () {
        var Date = $('#txtFecha').val();
        var elem = Date.split('/');
        dia = elem[0];
        mes = elem[1];
        anio = elem[2];

        if (!isDate(anio, mes, dia)) {
            $("#ControltxtFecha").addClass("error");
            $('#txtFecha').focus();
        }
        else {
            $("#ControltxtFecha").removeClass("error");
            CargarLosTurnos(0);
            SobreTurnoActivo();
        }
    });



    $("#txtFecha").keypress(function (event) {

        if ((event.keyCode == 9) || (event.which == 13)) {
            event.preventDefault();

            var Date = $('#txtFecha').val();
            var elem = Date.split('/');
            dia = elem[0];
            mes = elem[1];
            anio = elem[2];

            if (!isDate(anio, mes, dia)) {
                $("#ControltxtFecha").addClass("error");
                $('#txtFecha').focus();
            }
            else {
                $("#ControltxtFecha").removeClass("error");
                $('#txtHora').focus();
                CargarLosTurnos(0);
                SobreTurnoActivo();
            }

        }



    });




    $('#txtHora').change(function () {

        ErrorHora = false;
        var hora = $('#txtHora').val();
        if ($('#txtHora').val().length == 5) {

            var h1 = hora.charAt(0);
            var h2 = hora.charAt(1);
            var dp = hora.charAt(2);
            var m1 = hora.charAt(3);

            if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
            if (m1 > 5) { ErrorHora = true; }
            if (dp != ":") { ErrorHora = true; }
            if (!ErrorHora) {
                CargarLosTurnos(0);
                SobreTurnoActivo();
            }
            else {
                $('#txtHora').val("");
                $("#btn_SobreTurno").hide();
            }
        }
    });




    $('#cbo_Especialidad').change(function () {
        $("#TablaTurnos").empty();
        Cargar_Medicos_por_Especialidad($(this).val());
        CargarLosTurnos(0);
        SobreTurnoActivo();
    });


    $('#btnactualizar').click(function () {
        if ($('#txtTelefono').val().length >= 8)
            Actualizar_Telefono_Seccional($('#txtTelefono').val(), $('#cboSeccional option:selected').val(), $('#txt_dni').val());
        else alert("Ingrese un Teléfono Válido");
    });


    Cargar_Especialidades(true, 0, true);
    Cargar_Medicos_por_Especialidad(0);
    function SobreTurnoActivo() {
        if (($("#txtFecha").val() != "") && ($("#txtHora").val() != "") && ($('#cbo_Medico option:selected').val() != "0") && ($('#cbo_Especialidad option:selected').val() != "0") && ErrorHora == false) {
            $("#btn_SobreTurno").show();
        }
        else {
            $("#btn_SobreTurno").hide();
        }

    }

    function resultado(Resultado) {
        if (Resultado.d == '54') {
            $('#Informacion').html("<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>×</button>El Paciente " + $('#txtPaciente').val() + " ha sido actualizado Correctamente</div>");
            $('#Informacion').css("visibility", "block");
        }
        else {
            $('#Informacion').html("<div class='alert-error'><button type='button' class='close' data-dismiss='alert'>×</button>Error al intentar Actualizar los Datos</div>");
            $("#Informacion").css("visibility", "block");
        }
    }


    function $_GET(q, s) {
        s = (s) ? s : window.location.search;
        var re = new RegExp('&' + q + '=([^&]*)', 'i');
        return (s = s.replace(/^\?/, '&').match(re)) ? s = s[1] : s = '';
    }



    if ($_GET("NHC") != '') {
        $("#btnActualizar").css('display', 'inline');
        $("#btnOtorgados").css('display', 'inline');
        $("#btnCancelarPedidoTurno").css('display', 'inline');
        $("#btn_VerMas").css('display', 'inline');
        $("#btnOtroAfiliado").css('display', 'inline');
        $("#btnBuscarPaciente").css('display', 'none');
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

    }
    else {
        $("#btnCancelarPedidoTurno").css('display', 'none');
        $("#btnOtroAfiliado").css('display', 'none');
        $("#btnOtorgados").css('display', 'none');
        $("#btn_VerMas").css('display', 'none');
        $("#btnActualizar").css('display', 'none');
        $("#btnBuscarPaciente").css('display', 'inline');
        $("#txt_dni").prop("readonly", false);
        $("#txtNHC").prop("readonly", false);
    }


    $("#other").click(function () {
        $("#target").click();
    });

    $("#btn_VolveraTurno").click(function () {
        parent.document.location = "DarTurnos.aspx";
    });

    $("a#inline").fancybox({
        'hideOnContentClick': true
    });

    $("#btnOtroAfiliado").click(function () {
        document.location = "../Turnos/DarTurnos.aspx";
    });

    $("#btn_SobreTurno").click(function () {
        SobreturnosLibres($("#txtFecha").val(), $("#txtHora").val(), $('#cbo_Medico option:selected').val(), $('#cbo_Especialidad option:selected').val());
    });

    $("#txt_dni").change(function () {
        Cargar_Paciente_Documento($("#txt_dni").val());
    });

    $("#txtNHC").change(function () {
        CargarPacienteID($("#txtNHC").val());
    });


    $("#btnBuscarPaciente").fancybox({
        'hideOnContentClick': true,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });



    $("#Buscar").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });


    $("#btnOtorgados").fancybox({
        'width': '75%',
        'height': '75%',
        'href': 'TurnosOtorgados.aspx?Documento=' + $("#CargadoNHC").html(),
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $("#btn_VerMas").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $("#btn_Dias_de_Atencion").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $("#btn_Guardar_Turno").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'hideOnOverlayClick': false,
        'showCloseButton': false,
        'enableEscapeButton': false,
        'type': 'iframe',
        'onClosed': function () {
            document.location = "DarTurnos.aspx";
        }
    });

});

function SobreturnosLibres(Fecha, Hora, Medico, Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/SobreTurnosLibre",
        data: '{F: "' + Fecha + '", H: "' + Hora + '", Mid: "' + Medico + '", Esp: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: sobreTurnosLibresRespuesta,
        error: errores
    });
}

function sobreTurnosLibresRespuesta(Respuesta) {
    //alert(Respuesta.d);
    if (Respuesta.d) {
        AtiendeDiadelaSemana();
    }
    else
        alert("Se Han Alcanzado el Límite de Sobreturnos para el dia de la fecha.");
}


function AtiendeDiadelaSemana() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/AtiendeDiaDeLaSemana",
        data: '{F: "' + $("#txtFecha").val() + '", H: "' + $("#txtHora").val() + '", Mid: "' + $('#cbo_Medico option:selected').val() + '", Esp: "' + $('#cbo_Especialidad option:selected').val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AtiendeDiadelaSemanaRespuesta,
        error: errores
    });

}

function AtiendeDiadelaSemanaRespuesta(Respuesta) {
    var r = Respuesta.d;
    //alert(r);
    if (r) {
        document.location = "ConfirmarTurnos.aspx?MedicoID=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cbo_Especialidad option:selected').val() + "&Fecha=" + $("#txtFecha").val() + "&Hora=" + $("#txtHora").val() + "&Primera=" + $("#cb_pv").is(':checked') + "&Actual=" + $("#txt_dni").val() + "&SobreTurno=true&TurnoTelefonico=" + $("#cb_ttel").is(':checked');
    }
    else {
        alert("Atención el médico no atiende en la fecha ingresada");
    }
}

function isDate(y,m,d)
{
        var date = new Date(y, m - 1, d);
        //var convertedDate = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();

        var dd = date.getDate();
        dd = (dd < 10) ? '0' + dd : dd;

        var yyyy = date.getFullYear();
        
        var mm = date.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;

        var convertedDate = yyyy + '' + mm + '' + dd;
        var givenDate = "" + y + '' + m + '' + d;
        return (givenDate == convertedDate);
}


$('#desdeaqui').click(function () {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    $('#cbo_Especialidad').focus();

});


$('#cb_ttel').click(function () {
    if ($("#cb_ttel").is(':checked') == false) {
        //
    }
    else {
        
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/AusentesTelefonicos",
            data: '{DNI: "' + $("#txt_dni").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CantidadTurnosTelefonicosSinUsar,
            error: errores
        });

    }
});


function CantidadTurnosTelefonicosSinUsar(Respuesta) {
    //alert(Respuesta.d);

    if (Respuesta.d == 1) {
        alert("Existe turno telefónico anterior y no fue usado");
    }

    if (Respuesta.d > 1) {
        alert("Existen " + Respuesta + " turnos telefónicos anteriores sin usar");
    }
    
}







