var ErrorHora = false;
var CUIL = 0;
var Cod_OS = 0;
var Medico;
var Especialidad;
var Fecha;
var Hora;
var Primera;
var TurnoTelefonico;
var SobreTurno;
var TurnoForzado;
var Internado = 0;
var objTurnos = new Array();
var Ultimo_OK = 0;


Cargar_Seccionales_Lista();

function RecargarPagina(url) {
    document.location = "CargaExpressDatos.aspx" + url;
}

function CambiarPagina(url) {
    document.location = url + "&TurnoTelefonico=" + $("#cb_ttel").is(':checked');
}

function UltimoAporte_OK() {
    if (Ultimo_OK == 1) { return false; }
    var json = JSON.stringify({ "Documento": $("#txt_dni").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/UltimoAporte_OK",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Ultimo_OK == 1) { return false; }
            Ultimo_OK = 1;
            var ok = Resultado.d;
            if (!ok) alert("No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.\nVerificar con SSS.");
            else $("#btnVencimiento").click();
        }
    });
}

$("#txt_dni").blur(function () {
    var str = $("#txt_dni").val();
    var ceros = "";
    var index = str.indexOf("-");
    if (index != -1 && index != 0) {
        var cant = 8 - index;
        for (i = 0; i < cant; i++)
            ceros = ceros + "0";
        $("#txt_dni").val(ceros + $("#txt_dni").val());
    }
});

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
        }
    }
});

function EstaInternado() {
    if (Internado == 0) {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/List_Internacion_Pac_byDoc",
            data: '{Documento: "' + $("#afiliadoId").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_PacienteInt_byDocumento_Cargado,
            error: errores
        });
    }
}

function Cargar_PacienteInt_byDocumento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null) {
        $("#desdeaqui").remove();
        alert('No puede otorgar un turno para el paciente, ya que el mismo se encuentra internado.');
        Internado = 1;
        $("#btnOtroPaciente").show();
    }
}


function Cargar_Paciente_NHC(NHC) {
    if (Internado == 1) {return false;}
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}


function CargarPacienteID(ID) {
    if (Internado == 1) { return false; }
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



function Cargar_Paciente_Documento(Documento) {
    if (Internado == 1) { return false; }
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
    //alert(Resultado.d);
    if (Resultado.d == '1') {
        $("#desdeaqui").show();
        $("#controlTelefono").removeClass("error");
        $("#controlSeccional").removeClass("error");


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
    if (Paciente.length > 0) {
        $.each(Paciente, function (index, paciente) {
            if (paciente.Vencido) {
                alert("Paciente dado de baja el día: " + paciente.FechaVencido);
                return false;
            }
            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();
            $("#btnAlta").hide();
            $("#btnOtro").show();
            $("#txtPaciente").focus();

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txt_dni").attr('value', paciente.documento_real);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);

            $("#afiliadoId").val(paciente.documento);


            //EstaInternado(); //Verifica si el paciente se encuentra internado en la clinica.
            UltimoAporte_OK(); //Verifica aportes en Padron UOM.

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

            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/AusentesTelefonicos",
                data: '{DNI: "' + paciente.documento + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: CantidadTurnosTelefonicosSinUsar,
                error: errores
            });

            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#Titulo_Seccional_o_OS").html("Ob. Social");
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                Cargar_ObraSociales_Cargar(paciente.OSId);
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }

            //MostrarObs(paciente.Observaciones);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
            }

        });
    }
    else {
        $("#btnAlta").show();
        $("#btnOtro").hide();
    }
}

function MostrarObs(Obs) {
    if (Obs.length > 0) alert(Obs);
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

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            if (paciente.Vencido) {
                alert("Paciente dado de baja el día: " + paciente.FechaVencido);
                return false;
            }
            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();
            $("#btnAlta").hide();
            $("#btnOtro").show();
            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            $("#afiliadoId").val(paciente.documento);

            //EstaInternado(); //Verifica si el paciente se encuentra internado en la clinica.
            UltimoAporte_OK(); //Verifica aportes en Padron UOM.

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

            if ($("#txtTelefono").val().length < 5) {
                $("#controlTelefono").addClass("error");
                $("#txtTelefono").focus();
                PError = true;
            }
            if (paciente.Nro_Seccional == 999) {
                $("#controlSeccional").addClass("error");
                PError = true;
            }

            //MostrarObs(paciente.Observaciones);



            $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/AusentesTelefonicos",
            data: '{DNI: "' + paciente.documento + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CantidadTurnosTelefonicosSinUsar,
            error: errores
            });
            


            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#Titulo_Seccional_o_OS").html("Ob. Social");
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                Cargar_ObraSociales_Cargar(paciente.OSId);
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }

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
    else {
        $("#btnAlta").show();
        $("#btnOtro").hide();
    }
}

function BuscarPacientes_fancy() {
    if (SobreTurno == "true") {
        ST = "&SobreTurno=true";
    }
    else {
        ST = "";
    }
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express_img=1" + ST + "&Ids=" + objTurnos,
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
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

function CantidadTurnosTelefonicosSinUsar(Respuesta) {
    //alert(Respuesta.d);
    return false;
    if (Respuesta.d == 1) {
        alert("Existe turno telefónico anterior y no fue usado");
    }

    if (Respuesta.d > 1) {
        alert("Existen " + Respuesta + " turnos telefónicos anteriores sin usar");
    }
    
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

$("#btnOtro").click(function () {
    var url = "CargaExpressDatos.aspx?MedicoID=" + Medico + "&EspecialidadId=" + Especialidad + "&Fecha=" + Fecha + "&Hora=" + Hora + "&Primera=" + Primera + "&TurnoTelefonico=" + TurnoTelefonico + "&SobreTurno=" + SobreTurno + "&Ids=" + objTurnos;
    //alert(document.location); //fede
    document.location = url;
});

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
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

    Medico = GET["MedicoID"];
    Hora = GET["Hora"];
    Fecha = GET["Fecha"];
    Especialidad = GET["EspecialidadId"];
    Primera = GET["Primera"];
    TurnoTelefonico = GET["TurnoTelefonico"];
    SobreTurno = GET["SobreTurno"];
    TurnoForzado = GET["TurnoForzado"];

    if (GET["Ids"] != "") {
        objTurnos = GET["Ids"];
    }


    $("#Medico").val(Medico);
    $("#Hora").val(Hora);
    $("#Fecha").val(Fecha);
    $("#Especialidad").val(Especialidad);
    $("#TurnoTelefonico").val(TurnoTelefonico);
    $("#Primera").val(Primera);

    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }


    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });

    $('#btnactualizar').click(function () {
        if ($('#txtTelefono').val().length >= 8)
            Actualizar_Telefono_Seccional($('#txtTelefono').val(), $('#cboSeccional option:selected').val(), $('#afiliadoId').val());
        else alert("Ingrese un Teléfono Válido");
    });


    function $_GET(q, s) {
        s = (s) ? s : window.location.search;
        var re = new RegExp('&' + q + '=([^&]*)', 'i');
        return (s = s.replace(/^\?/, '&').match(re)) ? s = s[1] : s = '';
    }

    $("a#inline").fancybox({
        'hideOnContentClick': true
    });

    $("#btnOtroAfiliado").click(function () {
        document.location = document.location;
    });

    $("#txt_dni").keypress(function (event) {
        if (event.which == 13) {


            if ($('#txt_dni').attr('readonly') == undefined) {
                Cargar_Paciente_Documento($("#txt_dni").val());
            }
        }
    });

    $("#txt_dni").change(function () {
        Cargar_Paciente_Documento($("#txt_dni").val());
    });

    $("#txtNHC").change(function () {
        Cargar_Paciente_NHC($("#txtNHC").val());
    });

});


function AbrirFancy(pagina) {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '75%',
        'href': pagina,
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}

$("#btnBuscarPaciente").click(function () {
    var pagina = "BuscarPacientes.aspx?Ids=" + objTurnos;
    if (SobreTurno == "true") {
        var pagina = "BuscarPacientes.aspx?SobreTurno=" + SobreTurno + "&Ids=" + objTurnos;
    }

    if (TurnoForzado == "true") {
        var pagina = "BuscarPacientes.aspx?TurnoForzado=" + SobreTurno + "&Ids=" + objTurnos;
    }    

    AbrirFancy(pagina);
});


$('#desdeaqui').click(function () {
    if (Internado == 1) { alert('El paciente se encuentra internado.'); return false; }
    if ($("#txt_dni").val().length > 0)
        if (SobreTurno == "true") {
            ST = "&SobreTurno=true";
        }
        else {
            ST = "";
        }

    var TF;

    
    if (TurnoForzado == true) {
        TF = "&TurnoForzado=true";
    }
    else {
        TF = "";
    }

    document.location = "ConfirmarTurnos.aspx?MedicoID=" + Medico + "&EspecialidadId=" + Especialidad + "&Fecha=" + Fecha + "&Hora=" + Hora + "&Primera=" + Primera + ST + TF + "&TurnoTelefonico=" + TurnoTelefonico + "&Actual=" + $("#afiliadoId").val() + "&Express_img=1&Ids=" + objTurnos;
});


$("#btnAlta").click(function () {
    if (SobreTurno == "true") {
        ST = "&SobreTurno=true";
    }
    else {
        ST = "";
    }
    document.location = "../Pacientes/NuevoAfiliado.aspx?MedicoID=" + Medico + "&EspecialidadId=" + Especialidad + "&Fecha=" + Fecha + "&Hora=" + Hora + "&Primera=" + Primera + ST + "&TurnoTelefonico=" + TurnoTelefonico + "&Actual=" + $("#afiliadoId").val();
});








