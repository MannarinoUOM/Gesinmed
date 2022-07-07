var timer;
var Documento = 0;
var NHC = 0;
var Cargado = 0;
var CUIT_ERROR;
var CUIL_TITULAR_ERROR = 0;
var Local = 0;
var IgnorarT = false;

var Medico = 0;
var Especialidad;
var Fecha;
var Hora;
var Primera;
var TurnoTelefonico;
var SobreTurno;

$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }


    var GET = {};
    //    ValidarEntrada();

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    $("#txtPacienteBuscar").val((parent.$("#txtPaciente").val()));
    if ($("#txtPacienteBuscar").val().trim().length > 0) {
        Cargar_Persona_Apellido(parent.$("#txtPaciente").val().trim());
    }
   

});

$("#txtdocumento").blur(function () {
    var str = $("#txtdocumento").val();
    var ceros = "";

    if (str.length <= 7) {
        var cant = 8 - str.length;
        for (i = 0; i < cant; i++)
            ceros = ceros + "0";
        $("#txtdocumento").val(ceros + $("#txtdocumento").val());
    }
});

function ValidarEntrada() {
    //$("#txtdocumento").mask("9999999?9", { placeholder: "-" });
    $("#txtcuil").mask("9999999999?9", { placeholder: "-" });
    $("#txtFechaNacimiento").mask("99/99/9999", { placeholder: "-" });
    $("#txtFVDiscapacidad").mask("99/99/9999", { placeholder: "-" });
    $("#txtcuiltitu").mask("9999999999?9", { placeholder: "-" });
    $("#txtcuit").mask("9999999999?9", { placeholder: "-" });
    $("#txttelefono").mask("99999999?99999", { placeholder: "-" });
}

function Cargar_Titular(cuil) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Titular",
        data: '{cuil: "' + cuil + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Titular_Cargado,
        error: errores
    });
}

function Cargar_Titular_Local(cuil) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Titular_Local",
        data: '{cuil: "' + cuil + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Titular_Cargado,
        error: errores
    });
}



function Cargar_Titular_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (!IgnorarT) {
        if (Paciente.cuit == 0) {
            $('#myModalTitular').modal('show');
            if (Paciente.seccional != 998) {
                Cargar_Seccionales_Lista(0);
            }
            else Cargar_ObraSociales_Cargar(0);
            return;
        }
    }

    $("#NombreTitular").html(Paciente.apellido);
    $("#txtcuit").val(Paciente.cuit);
    $("#RazonSocial").html(Paciente.RazonSocial);
    if (Paciente.seccional != 998) {
        if (Paciente.seccional != 0) {
            Cargar_Seccionales_Lista(Paciente.seccional);
        }
    }
    else {
        if (Paciente.seccional != 0) {
            Cargar_ObraSociales_Cargar(Paciente.cod_os);
            $("#cboSeccional").hide();
            $("#cbo_ObraSocial").show();
            $("#ControlCUILTITULAR").hide();
            $("#ControlCUIT").hide();
            $("#ControlCUIT").hide();
            $("#ck_UOM").prop('checked', false);
            Cargar_Seccionales_Lista(0);
        }
    }

}


function Cargar_Titular_Cambio(cuil) {

    if ($("#txtcuiltitu").val().length == 11) {
        var R = "";
        if (Local == 1)
        { R = "../Json/Gente/ActualizarGente.asmx/Titular_Local" }
        else
        { R = "../Json/Gente/ActualizarGente.asmx/Titular"; }
        $.ajax({
            type: "POST",
            url: R,
            data: '{cuil: "' + cuil + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Titular_Cargado,
            error: errores
        });
    }
    else {
        $("#txtcuiltitu").val('');
        $("#NombreTitular").html('');
    }
}


function Cargar_Titular_Cambio_Cargado(Resultado) {

    var Paciente = Resultado.d;
    if (Paciente.apellido != null) {
        $("#NombreTitular").html(Paciente.apellido);
        $("#ControlCUILTITULAR").removeClass("error");
        CUIL_TITULAR_ERROR = 0;
    }
    else {
        $("#NombreTitular").html('');
        $("#ControlCUILTITULAR").addClass("error");
        CUIL_TITULAR_ERROR = 1;
    }


}


function Cargar_Persona_NHC(CUIL) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/PersonasNHC",
        data: '{cuil: "' + CUIL + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Cargado,
        error: errores
    });
}

function Cargar_Persona_NHC_Local(CUIL) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/PersonasNHC_Local",
        data: '{cuil: "' + CUIL + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Cargado,
        error: errores
    });
}

function Cargar_Persona(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Personas",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Cargado,
        error: errores
    });
}

function Cargar_Persona_Local(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Personas_Local",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Cargado,
        error: errores
    });
}


function Cargar_Persona_Cargado(Resultado) {

    clearTimeout(timer);
    $("#Espereaqueguarde").hide();
    var Paciente = Resultado.d;
    if (Paciente.documento == 0) {
        Cargar_CodPariente('');
        Cargar_CodProvincias('');
        Cargar_Seccionales_Lista('');
        $('#myModal').modal('show');
        return;
    }
    $("#txtapellido").val(Paciente.apellido);
    $("#txtFechaNacimiento").val(Paciente.fecha_nacimiento);
    $("#txtcalle").val(Paciente.calle);
    $("#txtnumero").val(Paciente.numero);
    $("#txtpiso").val(Paciente.piso);
    $("#txtdpto").val(Paciente.depto);
    $("#txtlocalidad").val(Paciente.localidad);
    $("#txtcodpos").val(Paciente.cod_pos);
    $("#txttelefono").val(Paciente.telefono);

    if (Paciente.fechabaja != null) {
        $("#infoBaja").show();
        $("#infoBaja").html("DADO DE BAJA " + Paciente.fechabaja);
    }



    $("#salta").html(Paciente.fechaalta);
    $("#sactualizado").html(Paciente.fechaactualizacion);
    $("#txtemail").val(Paciente.email);

    $('#FotoFinal').attr('src', '../img/Pacientes/' + Paciente.cuil + '.jpg');

    $("#txtdocumento").val(Paciente.documento);
    if (Paciente.sexo == 2) { $('#Sf').attr('checked', true); $('#Sm').attr('checked', false); } else { $('#Sm').attr('checked', true); $('#Sf').attr('checked', false); }
    $("#txtcuil").val(Paciente.cuil);
    $("#txtcuiltitu").val(Paciente.cuil_titu);
    $("#txtFVDiscapacidad").val(Paciente.FVDiscapacidad);

    if (Paciente.C1) { $('#cbo_Certificado1').attr('checked', true); } else { $('#cbo_Certificado1').attr('checked', false); }
    if (Paciente.C2) { $('#cbo_Certificado2').attr('checked', true); } else { $('#cbo_Certificado2').attr('checked', false); }

    if (Paciente.PMI) { $('#cbo_PMI').attr('checked', true); } else { $('#cbo_PMI').attr('checked', false); }
    if (Paciente.PI) { $('#cbo_PI').attr('checked', true); } else { $('#cbo_PI').attr('checked', false); }

    if (Paciente.EsEstudiante) { $('#cbo_EsEstudiante').attr('checked', true); } else { $('#cbo_EsEstudiante').attr('checked', false); }
    $("#txt_AnioCertificado").val(Paciente.AnioCertificado);


    var $myDiv = $('#cbo_Discapacidad');
    if ($myDiv.length) {
        $myDiv.val(Paciente.discapacidad);
    }


    Cargar_CodPariente(Paciente.cod_pariente);
    Cargar_CodProvincias(Paciente.provincia);
    if (Local == 1) {
        Cargar_Titular_Local(Paciente.cuil_titu);
    }
    else {
        Cargar_Titular(Paciente.cuil_titu);
    }




}

$('#FotoFinal').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


$("#btnBuscarPersonas").click(function () {
    Cargar_Persona_Apellido();
});

$("#btnBuscar").click(function () {

    if ($("#txtapellidoynombre").val() != "" && $("#txtapellidoynombre").val() != null) {
        self.location = "BuscarPacienteSN.aspx?ApellidoyNombre=" + $("#txtapellidoynombre").val() + "&Padron=2";
    }

    if ($("#txt_dni").val() != "" && $("#txt_dni").val() != null) {
        self.location = "NuevoAfiliado.aspx?Documento=" + $("#txt_dni").val() + "&Padron=1";
    }

    if ($("#txtNHC").val() != "" && $("#txtNHC").val() != null) {
        self.location = "NuevoAfiliado.aspx?NHCDocumento=" + $("#txtNHC").val() + "&Padron=1";
    }
});


function Cargar_Persona_Apellido() {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/PersonaXApellidoSN",
        data: '{Apellido: "' + $("#txtPacienteBuscar").val().trim() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#cargando").show();
            $("#tablaPaciente").hide();
        },
        complete: function() {
            $("#cargando").hide();
            $("#tablaPaciente").show();
        },
        success: Cargar_Persona_Apellido_Cargado,
        error: errores
    });
}



$("#txtdocumento").blur(function () {
    var str = $("#txtdocumento").val();
    var ceros = "";

    if (str.length <= 7) {
        var cant = 8 - str.length;
        for (i = 0; i < cant; i++)
            ceros = ceros + "0";
        $("#txtdocumento").val(ceros + $("#txtdocumento").val());
    }
});




function Cargar_Persona_Apellido_Cargado(Resultado) {
    var Pacientes = Resultado.d;

    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    $("#Resultado").empty();
    Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>#</th><th>Titular</th><th>Paciente</th><th>Documento</th><th>Teléfono</th><th>Obra Social</th></tr></thead><tbody>";
    $.each(Pacientes, function (index, pacientes) {
        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + pacientes.documento + ");' style='cursor:pointer;'><td>" + (index + 1) + "</td><td>" + pacientes.titular + "</td><td>" + pacientes.apellido + "</td><td>" + pacientes.documento + "</td><td>" + pacientes.telefono + "</td><td>" + pacientes.ObraSocial + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

    if (Resultado.d.length == 0) {
        $("#myModal").modal('show');
    }

}

function CargarPaciente(documento) {
    parent.$("#txtDNI").val(documento);
    parent.Cargar_Paciente_Documento(documento);
    parent.$.fancybox.close();
}

function Cargar_CodPariente(Cod) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "0"}',
        url: "../Json/Gente/ActualizarGente.asmx/CodPariente",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var CodParientes = Resultado.d;
            $('#cboCodPariente').empty();
            $.each(CodParientes, function (index, cp) {
                $('#cboCodPariente').append(
              $('<option></option>').val(cp.codigo).html(cp.descripcion)
            );
            });
            if (Cod != null && Cod != '') {
                $("#cboCodPariente option[value=" + Cod + "]").attr("selected", true);
            }

        },
        error: errores
    });

}






function Cargar_CodProvincias(Cod) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "0"}',
        url: "../Json/Gente/ActualizarGente.asmx/Provincias",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (Resultado) {


            var CodParientes = Resultado.d;
            $('#cboProvincia').empty();
            $.each(CodParientes, function (index, cp) {
                $('#cboProvincia').append(
              $('<option></option>').val(cp.codigo).html(cp.descripcion)
            );
            });
            if (Cod != null && Cod != '') {
                $("#cboProvincia option[value=" + Cod + "]").attr("selected", true);
            }

        },

        error: errores
    });

}





function Cargar_Seccionales_Lista(Cod) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Seccionales = Resultado.d;
            $('#cboSeccional').empty();
            $.each(Seccionales, function (index, seccionales) {
                $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
            });
            if (Cod != null && Cod != '') {
                $("#cboSeccional option[value=" + Cod + "]").attr("selected", true);
            }

        },
        error: errores
    });

}









$("#btnModificarPaciente").click(function () {

    if (ValidarTodo()) {
        $("#Espereaqueguarde").show();
        Mensajes();
        var sexo = 2;
        if ($("#Sm").attr('checked')) {
            sexo = 1;
        }

        Cert1 = false;
        Cert2 = false;
        EsEstudiante = false;
        OPMI = $("#cbo_PMI").is(':checked');
        OPI = $("#cbo_PI").is(':checked');

        if ($("#cbo_NTP").is(':checked')) {
            OPMI = false;
            OPI = false;
        }


        if ($("#cbo_Certificado1").attr('checked')) {
            Cert1 = true;
        }

        if ($("#cbo_Certificado2").attr('checked')) {
            Cert2 = true;
        }

        if ($("#cbo_EsEstudiante").attr('checked')) {
            EsEstudiante = true;
        }

        var OSCbo = $('#cbo_ObraSocial option:selected').val();
        if (OSCbo == null || OSCbo == '') {
            OSCbo = 112103;
        }

        Provisorio = 1;
        cccuil_titu = "";
        cccuit = "";
        if ($("#ck_UOM").is(':checked') == false) {
            cccuil_titu = $('#txtcuil').val();
            cccuit = "99999999999";
        }
        else {
            cccuil_titu = $('#txtcuiltitu').val();
            cccuit = $('#txtcuit').val();
        }


        var json = JSON.stringify({
            "cuil": $('#txtcuil').val(),
            "documento": $('#txtdocumento').val(),
            "apellido": $('#txtapellido').val().trim().toUpperCase(),
            "sexo": sexo,
            "telefono": $('#txttelefono').val(),
            "Seccional": $('#cboSeccional option:selected').val(),
            "cuit": cccuit,
            "calle": $('#txtcalle').val().trim().toUpperCase(),
            "numero": $('#txtnumero').val(),
            "piso": $('#txtpiso').val().trim().toUpperCase(),
            "depto": $('#txtdpto').val().trim().toUpperCase(),
            "localidad": $('#txtlocalidad').val().trim().toUpperCase(),
            "provincia": $('#cboProvincia option:selected').val(),
            "fecha_nacimiento": $('#txtFechaNacimiento').val(),
            "Provisorio": Provisorio,
            "Cod_Pariente": $('#cboCodPariente option:selected').val(),
            "email": $('#txtemail').val(),
            "celular": $('#txtcelular').val(),
            "CodPostal": $('#txtcodpos').val(),
            "cuil_titu": cccuil_titu,
            "OS": OSCbo,
            "ES_UOM": $("#ck_UOM").is(':checked'),
            "Discapacidades": $('#cbo_Discapacidad option:selected').val(),
            "FDVencimiento": $('#txtFVDiscapacidad').val(),
            "AnioEstudiante2": $('#txt_AnioCertificado').val(),
            "Certificado1": Cert1,
            "Certificado2": Cert2,
            "EsEstudiante": EsEstudiante,
            "PMI": OPMI,
            "PI": OPI
        });

        $.ajax({
            type: "POST",
            url: "../Json/Gente/ActualizarGente.asmx/ActualizarGente",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Datos_Actualizados,
            error: errores
        });
    }
    else {
        alert("Verifique los campos");
    }
});

function Datos_Actualizados(Resultado) {
    if (Resultado != null && Resultado != "") {
        clearTimeout(timer);
        $("#Espereaqueguarde").hide();
        if (Medico != 0) {
            if (SobreTurno == "") {
                SobreTurno = "false";
            }
            document.location = "../Turnos/ConfirmarTurnos.aspx?MedicoID=" + Medico + "&EspecialidadId=" + Especialidad + "&Fecha=" + Fecha + "&Hora=" + Hora + "&Primera=" + Primera + "&SobreTurno=" + SobreTurno + "&TurnoTelefonico=" + TurnoTelefonico + "&Actual=" + $("#txtdocumento").val() + "&Express=1";
        }
        else {
            alert('Paciente Cargado Correctamente');
            window.close();
        }
    }
}

function Mensajes() {
    window.setTimeout(function () {
        $("#Mensajedeespera").html("El proceso está demorando más de lo habitual, aguarde un momento.");
        window.setTimeout(function () {
            $("#Mensajedeespera").html("Al parecer existe un problema con la conexión hacia el PADRÓN UOM, aguarde por favor");
            window.setTimeout(function () {
                $("#Mensajedeespera").html("Definitivamente hay un problema, sin embargo el afiliado se guardará, aguarde por favor");
                window.setTimeout(function () {
                    $("#Mensajedeespera").html("Ya van 40 segundos..., sea paciente :)");
                    window.setTimeout(function () {
                        $("#Mensajedeespera").html("Van más de 50 segundos... </br> por favor comuniquese con SISTEMAS. </br> El proceso NO se Guardará.");
                    }, 10000);
                }, 10000);
            }, 10000);
        }, 10000);
    }, 10000);
}

function MensajesCarga() {
    timer = window.setTimeout(function () {
        $("#Espereaqueguarde").show();
        $("#Mensajedeespera").html("El proceso está demorando más de lo habitual, aguarde un momento.");
        window.setTimeout(function () {
            $("#Mensajedeespera").html("Al parecer existe un problema con la conexión hacia el PADRÓN UOM, aguarde por favor");
            window.setTimeout(function () {
                $("#Mensajedeespera").html("Definitivamente hay un problema con la conexión hacia el PADRÓN UOM, aguarde por favor");
                window.setTimeout(function () {
                    $("#Mensajedeespera").html("No se podrá consultar el PADRÓN UOM </br> Intente usar el Sitio UOM haciendo clic <a href='http://10.0.0.1'>aquí</a>");
                }, 15000);
            }, 10000);
        }, 10000);
    }, 10000);
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    clearTimeout(timer);
    alert('Error: ' + jsonObj.Message);
    window.close();
}

$("#txtcuiltitu").change(function () {
    Cargar_Titular_Cambio($("#txtcuiltitu").val());
});

$("#txtcuit").change(function () {
    if (($("#txtcuit").val() != $("#txtcuiltitu").val()) && ($("#txtcuit").val() != $("#txtcuil").val())) {
        Cargar_CUIT($("#txtcuit").val());
    }
    else {
        $("#ControlCUIT").removeClass("error");
    }
});


function Cargar_CUIT() {
    if ($("#txtcuit").val().length == 11) {
        $.ajax({
            type: "POST",
            url: "../Json/Gente/ActualizarGente.asmx/Empresa",
            data: '{CUIT: "' + $("#txtcuit").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_CUIT_Cargado,
            error: errores
        });
    }
    else {
        $("#txtcuit").val('');
        $("#RazonSocial").html('');
    }
}


function Cargar_CUIT_Cargado(Resultado) {
    var Empresas = Resultado.d;

    if (Empresas.razonsocial != null) {
        $("#RazonSocial").html(Empresas.razonsocial);
        $("#ControlCUIT").removeClass("error");
        CUIT_ERROR = 0;
    }
    else {
        $("#RazonSocial").html('');
        $("#ControlCUIT").addClass("error");
        CUIT_ERROR = 1;
    }


}

$("#txtdocumento").change(function () {
    if ($("#txtdocumento").val().length >= 7) {
        Cargar_Persona_Local_Encabezado($("#txtdocumento").val());
    }
});

$("#txtcuil").change(function () {
    if ($("#txtcuil").val().length >= 10) {
        Cargar_Persona_Local_NHC_Encabezado($("#txtcuil").val());
    }
});

function Cargar_Persona_Local_NHC_Encabezado(CUIL) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/PersonasNHC_Local",
        data: '{cuil: "' + CUIL + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Local_Encabezado_NHC_Cargado,
        error: errores
    });
}

function Cargar_Persona_Local_Encabezado_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente.cuil != 0) {
        $('#ModalExistePaciente').modal('show');
    }
}

function Cargar_Persona_Local_Encabezado(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Personas_Local",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Local_Encabezado_Cargado,
        error: errores
    });
}


function Cargar_Persona_Local_Encabezado_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente.documento != 0) {
        $('#ModalExistePaciente').modal('show');
    }
}


function ValidarTodo() {
    if ($('#txtapellido').val().length < 7) { $("#ControlApellidoyNombre").addClass("error"); } else { $("#ControlApellidoyNombre").removeClass("error"); }
    if (!$("#Sm").attr('checked') && !$("#Sf").attr('checked')) { $("#ControlSexo").addClass("error"); } else { $("#ControlSexo").removeClass("error"); }
    if ($('#txtdocumento').val().length < 7) { $("#ControlDNI").addClass("error"); } else { $("#ControlDNI").removeClass("error"); }
    if ($('#txtcuil').val().length != 11) { $("#ControlCUIL").addClass("error"); } else { $("#ControlCUIL").removeClass("error"); }
    if ($('#txttelefono').val().length < 7) { $("#ControlTelefono").addClass("error"); } else { $("#ControlTelefono").removeClass("error"); }
    if ($('#cbo_Discapacidad').val() == "") { $("#ControlDiscapacidad").addClass("error"); } else { $("#ControlDiscapacidad").removeClass("error"); }

    VerificarFecha("txtFechaNacimiento", "ControlFechaNacimiento");

    if ($("#cbo_Discapacidad").val() != "1") {
        VerificarFecha('txtFVDiscapacidad', 'ControlDiscapacidad');
    }

    if ($("#ControlDiscapacidad").hasClass("error")) {
        alert("Es necesiario la fecha de vencimiento del certificado de discapacidad");
        $("#txtFVDiscapacidad").focus();
        return false;
    }


    if ($("#ck_UOM").is(':checked') == false) {
        if ($("#ControlCUIL").hasClass("error")) {
            return false;
        }
    }

    if ($("#ck_UOM").is(':checked') == false) {
        if ($("#ControlDiscapacidad").hasClass("error")) {
            return false;
        }
    }



    if ($("#ck_UOM").is(':checked') == false) {
        if ($("#ControlFechaNacimiento").hasClass("error")) {
            return false;
        }
    }

    if ($("#ck_UOM").is(':checked')) {
        if ($('#txtcuiltitu').val().length != 11) { $("#ControlCUILTITULAR").addClass("error"); } else { $("#ControlCUILTITULAR").removeClass("error"); }
    }

    if ($("#ck_UOM").is(':checked')) {
        if ($('#txtcuit').val().length != 11) { $("#ControlCUIT").addClass("error"); } else { $("#ControlCUIT").removeClass("error"); }
    }

    if ($("#ck_UOM").is(':checked')) {
        if (IgnorarT == false) {
            if ($("#ControlCUIT").hasClass("error")) { $("#ControlCUIT").removeClass("error"); }
            if (CUIL_TITULAR_ERROR == 1) { $("#ControlCUILTITULAR").addClass("error"); } else { $("#ControlCUILTITULAR").removeClass("error"); }
        }
    }


    if ($("#ck_UOM").is(':checked')) {
        if (CUIT_ERROR == 1) { $("#ControlCUIT").addClass("error"); } else { $("#ControlCUIT").removeClass("error"); }
        if ($("#txtcuit").val() != $("#txtcuil").val()) {
            if ($("#RazonSocial").html() == null || $("#RazonSocial").html() == '') { $("#ControlCUIT").addClass("error"); } else { $("#ControlCUIT").removeClass("error"); }
        }
    }

    if ($("#ck_UOM").is(':checked')) {
        if (IgnorarT == false) {
            if ($("#NombreTitular").html() == null || $("#NombreTitular").html() == '') { $("#ControlCUILTITULAR").addClass("error"); } else { $("#ControlCUILTITULAR").removeClass("error"); }
        }
    }
    ////MODIFIQUE FEDE...

    if ($("#ck_UOM").is(':checked')) {
        if ($("#RazonSocial").html().length == 0) {
            if ($("#txtcuit").val() == $("#txtcuiltitu").val()) {
                if (IgnorarT == true) {
                    if (CUIT_ERROR == 1) { $("#ControlCUIT").removeClass("error"); CUIT_ERROR = 0; }
                    if (CUIL_TITULAR_ERROR == 1) { $("#ControlCUILTITULAR").removeClass("error"); CUIL_TITULAR_ERROR = 0; }
                    return true;
                }
            }
            else return false;
        }

        if ($("#RazonSocial").html().length == 0) {
            if ($("#txtcuit").val() == $("#txtcuiltitu").val()) {
                if (Local == 1) {
                    if (CUIT_ERROR == 1) { $("#ControlCUIT").removeClass("error"); CUIT_ERROR = 0; }
                    if (CUIL_TITULAR_ERROR == 1) { $("#ControlCUILTITULAR").removeClass("error"); CUIL_TITULAR_ERROR = 0; }
                    return true;
                }
            }
            else return false;
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////



    if ($("#ck_UOM").is(':checked')) {
        if (IgnorarT == false) {
            if ($("#ControlSexo").hasClass("error") || $("#ControlDNI").hasClass("error") || $("#ControlCUIL").hasClass("error") || $("#ControlTelefono").hasClass("error") || $("#ControlFechaNacimiento").hasClass("error") ||
        $("#ControlCUILTITULAR").hasClass("error") || $("#ControlCUIT").hasClass("error") || CUIL_TITULAR_ERROR == 1 || CUIT_ERROR == 1 || $("#RazonSocial").html() == null || $("#NombreTitular").html() == null || $("#RazonSocial").html() == '' || $("#NombreTitular").html() == '') {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if ($("#ControlSexo").hasClass("error") || $("#ControlDNI").hasClass("error") || $("#ControlCUIL").hasClass("error") || $("#ControlTelefono").hasClass("error") || $("#ControlFechaNacimiento").hasClass("error") ||
        $("#ControlCUILTITULAR").hasClass("error") || $("#ControlCUIT").hasClass("error") || CUIL_TITULAR_ERROR == 1 || CUIT_ERROR == 1 || $("#RazonSocial").html() == null || $("#RazonSocial").html() == '') {
                return false;
            }
            else {
                return true;
            }
        }
    }

    if ($("#ck_UOM").is(':checked') == false) {
        if ($('#txtapellido').val().length < 7) { $("#ControlApellidoyNombre").addClass("error"); alert("Revise el Nombre"); return false; } else { $("#ControlApellidoyNombre").removeClass("error"); }
        if (!$("#Sm").attr('checked') && !$("#Sf").attr('checked')) { $("#ControlSexo").addClass("error"); alert("Revise el Genero"); return false; } else { $("#ControlSexo").removeClass("error"); }
        if ($('#txtdocumento').val().length < 7) { $("#ControlDNI").addClass("error"); alert("Revise el DNI"); return false; } else { $("#ControlDNI").removeClass("error"); }
        if ($('#txtcuil').val().length != 11) { $("#ControlCUIL").addClass("error"); alert("Revise el CUIL"); return false; } else { $("#ControlCUIL").removeClass("error"); }
        if ($('#txttelefono').val().length < 7) { $("#ControlTelefono").addClass("error"); alert("Revise el Teléfono"); return false; } else { $("#ControlTelefono").removeClass("error"); }
        return true;
    }



}


$("#Sm").click(function () {
    $("#Sm").attr('checked', true);
    $("#Sf").attr('checked', false);
    $('#txtcuil').val(cuil_cuit(1, $('#txtdocumento').val()));
});

$("#Sf").click(function () {
    $("#Sm").attr('checked', false);
    $("#Sf").attr('checked', true);
    $('#txtcuil').val(cuil_cuit(2, $('#txtdocumento').val()));
});



function VerificarFecha(ControlFecha, ControlError) {

    var Date = $("#" + ControlFecha).val();
    var elem = Date.split('/');
    dia = elem[0];
    mes = elem[1];
    anio = elem[2];

    if (!isDate(anio, mes, dia)) {
        $("#" + ControlError).addClass("error");
        $("#" + ControlFecha).focus();
    }
    else {
        $("#" + ControlError).removeClass("error");
    }
}

$('#txtFechaNacimiento').change(function () {
    VerificarFecha('txtFechaNacimiento', 'ControlFechaNacimiento');
});

$('#txtFVDiscapacidad').change(function () {
    if ($("#cbo_Discapacidad").val() != "1") {
        VerificarFecha('txtFVDiscapacidad', 'ControlDiscapacidad');
    }
});

function IgnorarTitular() {
    IgnorarT = true;
}

