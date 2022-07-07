var timer;
var Documento = 0;
var ID = 0;
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
var Seccional;

///Manuel/////////////////////////////////////////////////////////////////////////////////////////////
var diabetes = "";
///Manuel/////////////////////////////////////////////////////////////////////////////////////////////
var celCache;

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


function ListDocumentacionTipo() {
    $.ajax({
        type: "POST",
        url: "../Json/Documentacion.asmx/ListDocumentacionTipo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, item) {
                $('#cbo_Tipos').append($('<option></option>').val(item.id).html(item.descripcion));
            });
        },
        error: errores
    });
}


function ListPatologias(Id) {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_Discapacidad').append($('<option></option>').val("0").html("NO"));
            $.each(lista, function (index, item) {
                $('#cbo_Discapacidad').append($('<option></option>').val(item.id).html(item.patologias));
            });
        },
        error: errores
    });
}

$("#cbo_Discapacidad").change(function () {
    if ($("#cbo_Discapacidad :selected").val() != "0")
        $("#txtFVDiscapacidad").show();
    else {
        $("#txtFVDiscapacidad").hide();
        $("#txtFVDiscapacidad").val('');
    }
});

function Entradas(val) {
    if (val == false) {
        $(".datos").attr("disabled", true);
        $(".tabslist").hide();
        $("#btnModificarPaciente").hide();
        $("#btnCaratula").hide();
    }
    else {
        $(".datos").removeAttr("disabled");
        $(".tabslist").show();
        $("#btnModificarPaciente").show();
        $("#btnCaratula").show();
        if (ID > 0 || Documento > 0) $("#tabDocu").show(); //Habilitar solapa para escanear.
    }
}

$("#txt_NHC_UOM").change(function () {
    if ($(this).val().trim().length > 0) Cargar_Paciente_NHC($(this).val());
    else alert("Ingrese Nro. HC");
});

function Cargar_Paciente_NHC(NHC) {
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

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente.length > 0) document.location = "NuevoAfiliado.aspx?ID=" + Paciente[0].documento;
    else alert("Paciente no encontrado.");
}

$(document).ready(function () {
    var GET = {};


    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }


    if (GET["ApellidoyNombre"] != "" && GET["ApellidoyNombre"] != null) {
        Entradas(true);
        if (GET["Padron"] == 2) {
            $("#txtPacienteBuscar").val(GET["ApellidoyNombre"]);
            Cargar_Persona_Apellido();
            return false;
        }
    }

    ListPatologias(0);
    ValidarEntrada();
    ListTipoDoc();
    ListDocumentacionTipo();


    if (GET["MedicoID"] != "" && GET["MedicoID"] != null) {
        Medico = GET["MedicoID"];
        Hora = GET["Hora"];
        Fecha = GET["Fecha"];
        Especialidad = GET["EspecialidadId"];
        Primera = GET["Primera"];
        TurnoTelefonico = GET["TurnoTelefonico"];
        SobreTurno = GET["SobreTurno"];
    }

    if (GET["Documento"] != "" && GET["Documento"] != null) {
        Documento = GET["Documento"];
        if (GET["Padron"] == 1) {
            $("#txtFechaNacimiento").datepicker();
            $("#txtFVDiscapacidad").datepicker();
            Cargado = 1;
            Local = 0;
            MensajesCarga();
            Cargar_Persona(Documento);
            Entradas(true);
            $("#ck_UOM").attr("disabled", true);
            return false;
        }
        else {
            $("#txtFechaNacimiento").datepicker();
            $("#txtFVDiscapacidad").datepicker();
            $("#txtFechaParto").datepicker();
            $("#btnModificarPaciente").html("&nbsp;&nbsp;Actualizar");
            Cargado = 1;
            Local = 1;
            MensajesCarga();
            Entradas(true);
            Cargar_Persona_Local(Documento);
            return false;
        }
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        ID = GET["ID"];
        if (GET["Padron"] == 1) {
            $("#txtFechaNacimiento").datepicker();
            $("#txtFVDiscapacidad").datepicker();
            Cargado = 1;
            Local = 0;
            Entradas(true);
            $("#ck_UOM").attr("disabled", true);
            return false;
        }
        else {
            $("#txtFechaNacimiento").datepicker();
            $("#txtFVDiscapacidad").datepicker();
            $("#txtFechaParto").datepicker();
            $("#btnModificarPaciente").html("&nbsp;&nbsp;Actualizar");
            Cargado = 1;
            Local = 1;
            MensajesCarga();
            Entradas(true);
            Cargar_Persona_Local_ID(ID);
            ListaDocumentacion_Paciente(ID);
            cargarPatologiasCronicas(ID);
            return false;
        }
    }


    if (GET["Padron"] == null || GET["Padron"] == '') {
        Cargar_ObraSociales_Cargar(0);
    }

    if (GET["NHCDocumento"] != "" && GET["NHCDocumento"] != null) {
        NHC = GET["NHCDocumento"];
        $("#txtFechaNacimiento").datepicker();
        $("#txtFVDiscapacidad").datepicker();
        $("#txtFechaParto").datepicker();
        Entradas(true);
        if (GET["Padron"] == 1) {
            Cargado = 1;
            MensajesCarga();
            Cargar_Persona_NHC(NHC);
            Local = 0;
        }
        else {
            Local = 1;
            Cargado = 1;
            Cargar_Persona_NHC_Local(NHC);
        }
    }





    if (Cargado == 0 && GET["ApellidoyNombre"] == null && GET["NHCDocumento"] == null && GET["Documento"] == null) {
        $("#txtFechaNacimiento").datepicker();
        $("#txtFVDiscapacidad").datepicker();
        Cargar_CodPariente(0);
        Cargar_Seccionales_Lista(0);
        Cargar_CodProvincias(0);
        $("#salta").html(FechaActual());
        $("#sactualizado").html(FechaActual());
    }

    ///////////////////////////////////////////////////////////////Manuel
    if (GET["volverDiabetes"] != "" && GET["volverDiabetes"] != null) {
        diabetes = GET["volverDiabetes"];
        $("#txtemail").val("Paciente Ingresado por Diabetología");
        $("#txtemail").attr('disabled', true);
    }
    ///////////////////////////////////////////////////////////////Manuel


    Entradas(false);

});

function ValidarEntrada()
{
    $("#txtcuil").mask("9999999999?9", { placeholder: "-" });
    $("#txtFechaNacimiento").mask("99/99/9999", { placeholder: "-" });
    $("#txtFVDiscapacidad").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaBaja").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaBaja").datepicker();
    $("#txtFechaParto").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaParto").datepicker();
    $("#txtFVDiscapacidad").val();
    $("#txtcuiltitu").mask("9999999999?9", { placeholder: "-" });
    $("#txtcuit").mask("9999999999?9", { placeholder: "-" });
    $("#txttelefono").mask("99999999?99999", { placeholder: "-" });
    $("#txtNHC").mask("9?999999999999", { placeholder: "-" }); 
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
    if (Local == 0) { $("#txtcuit").val(Paciente.cuit);$("#txtSeccionalId").val(Paciente.seccional); }
    if ($("#txtSeccionalId").val().length == 0) $("#txtSeccionalId").val(Paciente.SeccionalId);
    if ($("#txtSeccionalId").val() != 998) {
        Cargar_Seccionales_Lista($("#txtSeccionalId").val());
        //alert($("#txtSeccionalId").val());
    }
    else {
        if ($("#txtSeccionalId").val() == 998) {
            Cargar_ObraSociales_Cargar($("#txtCodOS").val());
            $("#cboSeccional").hide();
            $("#cbo_ObraSocial").show();
            $("#ControlCUILTITULAR").hide();
            $("#ControlCUIT").hide();
            $("#ControlCUIT").hide();
            $("#ck_UOM").prop('checked', false);
            Cargar_Seccionales_Lista(0);
        }
    }
    $("#NombreTitular").attr("title", Paciente.apellido);
    if (Paciente.apellido != null) {
        $("#NombreTitular").html(Paciente.apellido.substring(0, 10) + "...");
    }

    if (Paciente.RazonSocial != null) {
        $("#RazonSocial").html(Paciente.RazonSocial.substring(0, 10) + "...");
    }
    $("#RazonSocial").attr("title",Paciente.RazonSocial);
}


function Cargar_Titular_Cambio(cuil) {
    
if ($("#txtcuiltitu").val().length == 11)
{
var R = "";
if (Local == 1)
{R="../Json/Gente/ActualizarGente.asmx/Titular_Local"}
else
{R="../Json/Gente/ActualizarGente.asmx/Titular";}
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
    else
{
    $("#txtcuiltitu").val('');
    $("#NombreTitular").html('');
    }
}

$("#cbo_PMI").change(function () {
    if ($("#cbo_PMI").is(":checked")) {
        $("#controlVencPMI").show();
    }
    else {
        $("#controlVencPMI").hide();
        //$("#txtFechaParto").val('');
    }
});

$("#cbo_PI, #cbo_NTP").click(function () {
        $("#controlVencPMI").hide();
        //$("#txtFechaParto").val('');
});

function Cargar_Titular_Cambio_Cargado(Resultado) {

    var Paciente = Resultado.d;       
        if (Paciente.apellido != null)
    {
        $("#NombreTitular").html(Paciente.apellido);    
        $("#ControlCUILTITULAR").removeClass("error");
        CUIL_TITULAR_ERROR = 0;
    }
    else
    {
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

function Cargar_Persona_Cargado(Resultado) {
    clearTimeout(timer);
    //$("#cboSeccional").attr("disabled", true);
    $("#Espereaqueguarde").hide();
    var Paciente = Resultado.d;
    if (Paciente.documento == 0) {
        Cargar_CodPariente('');
        Cargar_CodProvincias('');
        Cargar_Seccionales_Lista(Seccional);
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
    celCache = Paciente.telefono;

    if (Paciente.fechabaja != null) {
        $("#infoBaja").show();
        $("#infoBaja").html("DADO DE BAJA " + Paciente.fechabaja);
    }

    $("#salta").html(Paciente.fechaalta);
    $("#sactualizado").html(Paciente.fechaactualizacion);
    


    $("#txtemail").val(Paciente.email);

    $('#FotoFinal').attr('src', '../img/pacientes' + Paciente.Foto);

    $("#txtdocumento").val(Paciente.documento);
    if (Paciente.sexo == 2) { $('#Sf').attr('checked', true); $('#Sm').attr('checked', false); } else { $('#Sm').attr('checked', true); $('#Sf').attr('checked', false); }
    $("#txtcuil").val(Paciente.cuil);
    $("#txtcuiltitu").val(Paciente.cuil_titu);

    Cargar_CodPariente(Paciente.cod_pariente);
    Cargar_CodProvincias(Paciente.provincia);
    if (Local == 1) {
        Cargar_Titular_Local(Paciente.cuil_titu);
    }
    else {
        Cargar_Titular(Paciente.cuil_titu);
    }



}


function Cargar_Persona_Local(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Personas_Local",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Local_Cargado,
        error: errores
    });
}

function Cargar_Persona_Local_Cargado(Resultado) {
    var pacientes = Resultado.d;
    if (pacientes.length == 1) {
        $.each(pacientes, function (index, Paciente) {
            clearTimeout(timer);
            $("#Espereaqueguarde").hide();
            if (Paciente.documento == 0) {
                Cargar_CodPariente('');
                Cargar_CodProvincias('');
                Cargar_Seccionales_Lista('');
                $('#myModal').modal('show');
                return;
            }
            $("#txtapellido").val(Paciente.apellido);
            $("#txtFechaNacimiento").val(Paciente.fecha_nacimiento);
            $("#Edad").html(Paciente.Edad_Format);
            $("#txtcalle").val(Paciente.calle);
            $("#txtnumero").val(Paciente.numero);
            $("#txtpiso").val(Paciente.piso);
            $("#txtdpto").val(Paciente.depto);
            $("#txtlocalidad").val(Paciente.localidad);
            $("#txtcodpos").val(Paciente.cod_pos);
            $("#txttelefono").val(Paciente.telefono);
            celCache = Paciente.telefono;
            $("#txtNHC").val(Paciente.documento);
            $("#txt_NHC_UOM").val(Paciente.NHC_UOM);
            if (Paciente.NHC_UOM >= 200000000)
                $("#cbo_Provi").attr("checked", true);
            else $("#cbo_Provi").attr("checked", false);
            if (Paciente.fechabaja != null) {
                $("#txtFechaBaja").val(Paciente.fechabaja);
            }



            //$("#salta").html(Paciente.fechaalta);
            //$("#sactualizado").html(Paciente.fechaactualizacion);

            var alta_u = Paciente.UsuAlta;
            if (alta_u.length > 18) alta_u = Paciente.UsuAlta.substring(0, 17);

            var mod_u = Paciente.UsuModi;
            if (mod_u.length > 18) mod_u = Paciente.UsuModi.substring(0, 17);

            $("#salta").html(Paciente.fechaalta + " por " + alta_u + " // ");
            $("#sactualizado").html(Paciente.fechaactualizacion + " por " + mod_u);
            BuscarUltima_HC(Paciente.documento);

            $("#txtemail").val(Paciente.email);
            //alert(Paciente.Foto);
            //$('#FotoFinal').attr('src', '../img/Pacientes/' + ID + '.jpg');
            $('#FotoFinal').attr('src', '../fotoPerfil/' + Paciente.Foto);

            $("#txtdocumento").val(Paciente.documento_real);
            $("#afiliadoID").val(Paciente.documento);
            //ListaDocumentacion_Paciente(Paciente.documento);

            setInterval(function () {
                ListaDocumentacion_Paciente(Paciente.documento);
            }, 10000);

            $("#cbo_tipo_doc").val(Paciente.tipo_docu);

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

            $("#txtcelular").val(Paciente.Celular);
            $("#EstadoCivil").val(Paciente.EstadoCivil);
            $("#Nacionalidad").val(Paciente.Nacionalidad);
            $("#txtNroCarnet").val(Paciente.NroCarnet);
            Seccional = Paciente.SeccionalId;
            $("#txtSeccionalId").val(Paciente.SeccionalId);
            Cargar_CodPariente(Paciente.cod_pariente);
            Cargar_CodProvincias(Paciente.provincia);
            if (Local == 1) {
                Cargar_Titular_Local(Paciente.cuil_titu);
            }
            else {
                Cargar_Titular(Paciente.cuil_titu);
            }
        });
    }
    else {
        clearTimeout(timer);
        $("#Espereaqueguarde").hide();
        $("#txtdocumento").val(Documento);
        BuscarPacientes_fancy();
    }


}

function BuscarUltima_HC(PacienteId) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/BuscarUltima_HC",
        data: '{PacienteId: "' + PacienteId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#sactualizado").append("<br><b>Anterior NHC: </b>" + Resultado.d);
        },
        error: errores
    });
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
    document.location = "../Pacientes/NuevoAfiliado.aspx" + url;
}

function Cargar_Persona_Local_ID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Personas_Local_ID",
        data: '{Id: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Local_ID_Cargado,
        error: errores
    });
}




function Cargar_Persona_Local_ID_Cargado(Resultado) {
       
    clearTimeout(timer);    
    $("#Espereaqueguarde").hide();
    var Paciente = Resultado.d;
    if (Paciente.documento == 0)
    {   
        Cargar_CodPariente('');
        Cargar_CodProvincias('');
        Cargar_Seccionales_Lista('');
        $('#myModal').modal('show');
        return;
    }
    $("#txtapellido").val(Paciente.apellido);
    $("#txtFechaNacimiento").val(Paciente.fecha_nacimiento);
    $("#Edad").html(Paciente.Edad_Format);
    $("#txtcalle").val(Paciente.calle);
    $("#txtnumero").val(Paciente.numero);
    $("#txtpiso").val(Paciente.piso);
    $("#txtdpto").val(Paciente.depto);
    $("#txtlocalidad").val(Paciente.localidad);
    $("#txtcodpos").val(Paciente.cod_pos);
    $("#txttelefono").val(Paciente.telefono);
    celCache = Paciente.telefono;
    $("#txtNHC").val(Paciente.documento);
    $("#txt_NHC_UOM").val(Paciente.NHC_UOM);
    if (Paciente.NHC_UOM >= 200000000)
        $("#cbo_Provi").attr("checked", true);
    else $("#cbo_Provi").attr("checked", false);
    if (Paciente.fechabaja != null) {
        $("#txtFechaBaja").val(Paciente.fechabaja);
    }

    var alta_u = Paciente.UsuAlta;
    if (alta_u.length > 18) alta_u = Paciente.UsuAlta.substring(0, 17);

    var mod_u = Paciente.UsuModi;
    if (mod_u.length > 18) mod_u = Paciente.UsuModi.substring(0, 17);

    $("#salta").html(Paciente.fechaalta + " por " + alta_u + " // ");
    $("#sactualizado").html(Paciente.fechaactualizacion + " por " + mod_u);
    $("#chk_alto_riesgo").attr("checked", Paciente.Alto_Riesgo);
    BuscarUltima_HC(Paciente.documento);
    
    $("#txtemail").val(Paciente.email);

    //$('#FotoFinal').attr('src', '../img/Pacientes/' + ID + '.jpg');
    
    $('#FotoFinal').attr('src', '../fotoPerfil/' + Paciente.Foto);
    $('#FotoFinal').width(100);
    $("#txtdocumento").val(Paciente.documento_real);
    $("#afiliadoID").val(Paciente.documento);

    setInterval(function () {
        ListaDocumentacion_Paciente(Paciente.documento);
    }, 10000);

    $("#cbo_tipo_doc").val(Paciente.tipo_docu);

    if (Paciente.sexo == 2) { $('#Sf').attr('checked', true); $('#Sm').attr('checked', false); } else { $('#Sm').attr('checked', true); $('#Sf').attr('checked', false); }
    $("#txtcuil").val(Paciente.cuil);
    $("#txtcuiltitu").val(Paciente.cuil_titu);
    $("#txtcuit").val(Paciente.cuit);

    if (Paciente.C1) { $('#cbo_Certificado1').attr('checked', true); } else { $('#cbo_Certificado1').attr('checked', false); }
    if (Paciente.C2) { $('#cbo_Certificado2').attr('checked', true); } else { $('#cbo_Certificado2').attr('checked', false); }

    if (Paciente.PMI) { $('#cbo_PMI').attr('checked', true); $("#txtFechaParto").val(Paciente.FechaPMI); $("#controlVencPMI").show(); } 
    else { $('#cbo_PMI').attr('checked', false); }
    //alert(Paciente.FechaPMI);
   
    if (Paciente.PI) { $('#cbo_PI').attr('checked', true);}
    else { $('#cbo_PI').attr('checked', false);}

    if (Paciente.EsEstudiante) { $('#cbo_EsEstudiante').attr('checked', true); } else { $('#cbo_EsEstudiante').attr('checked', false); }    
    $("#txt_AnioCertificado").val(Paciente.AnioCertificado);
    
    
    var $myDiv = $('#cbo_Discapacidad');
    if ($myDiv.length) {
        $myDiv.val(Paciente.discapacidad);
    }

    $("#txtFVDiscapacidad").val(Paciente.FVDiscapacidad);

    if (Paciente.discapacidad > 1)
        $("#txtFVDiscapacidad").show();
    else $("#txtFVDiscapacidad").hide();

    Cargar_CodPariente(Paciente.cod_pariente);
    Cargar_CodProvincias(Paciente.provincia);

    $("#txtSeccionalId").val(Paciente.SeccionalId);

    //Cargar_Seccionales_Lista(Paciente.SeccionalId);
    $("#txtCodOS").val(Paciente.ObraSocialId);


     $("#EstadoCivil").val(Paciente.EstadoCivil);
     $("#Nacionalidad").val(Paciente.Nacionalidad);
     $("#txtNroCarnet").val(Paciente.NroCarnet);

     $("#txtcelular").val(Paciente.Celular);
    if (Local == 1)
    {
    Cargar_Titular_Local(Paciente.cuil_titu);
    }
    else
    {
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

     if ($("#txtapellidoynombre").val() != "" &&  $("#txtapellidoynombre").val() != null )
     {    
        self.location="BuscarPacientes.aspx?ApellidoyNombre="+$("#txtapellidoynombre").val()+"&Padron=2";
     }
     
     if ($("#txt_dni").val() != "" &&  $("#txt_dni").val() != null )
     {    
        self.location="NuevoAfiliado.aspx?Documento="+$("#txt_dni").val()+"&Padron=1";
     }

     if ($("#txtNHC").val() != "" &&  $("#txtNHC").val() != null )
     {    
        self.location="NuevoAfiliado.aspx?NHCDocumento="+$("#txtNHC").val()+"&Padron=1";
     }
});


$("#txtdocumento").blur(function () {
    var str = $("#txtdocumento").val();
    var ceros = "";

    if (str.length <= 7)    {
        var cant = 8 - str.length;
        for (i = 0; i < cant; i++)
            ceros = ceros + "0";
        $("#txtdocumento").val(ceros + $("#txtdocumento").val());
    }
});

function Cargar_Persona_Apellido() {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/PersonaXApellido",
        data: '{Apellido: "' + $("#txtPacienteBuscar").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Apellido_Cargado,
        error: errores,
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#cargando").hide();
            $("#tabla").show();
        }
    });
}

function Cargar_Persona_Apellido_Cargado(Resultado) {
    var Pacientes = Resultado.d;
    
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    $("#Resultado").empty();
    Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>#</th><th>Titular</th><th>Paciente</th><th>Documento</th><th>Teléfono</th></tr></thead><tbody>";
    $.each(Pacientes, function (index, pacientes) {
        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + pacientes.documento + ");' style='cursor:pointer;'><td>" + (index+1) + "</td><td>" + pacientes.titular + "</td><td>" + pacientes.apellido + "</td><td>" + pacientes.documento + "</td><td>" + pacientes.telefono + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

    if (Resultado.d.length == 0)
    {   
     $("#myModal").modal('show');     
    }

}

function CargarPaciente(documento) {
    self.location = "NuevoAfiliado.aspx?Documento=" + documento + "&Padron=1";
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
            if (Cod != null && Cod != '')
            {
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
        if(Cod != null && Cod != '')
            {
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
            $('#cboSeccional').append($('<option></option>').val("").html("Seleccione Seccional..."));
            $.each(Seccionales, function (index, seccionales) {
                $('#cboSeccional').append($('<option></option>').val(seccionales.Nro).html(seccionales.Seccional));
            });
        },
        error: errores,
        complete: function () {
            if (Cod != null && Cod != '') {
                $('#cboSeccional').val(Cod);
                //$("#cboSeccional option[value=" + Cod + "]").attr("selected", true);
            }
        }
    });
}









$("#btnModificarPaciente").click(function () {

    if (!PhoneValidate("", "txttelefono")) { return false } else {

        if (ValidarTodo()) {

            Mensajes();
            var sexo = 0;
            if ($("#Sm").attr('checked')) {
                sexo = 1;
            }
            if ($("#Sf").attr('checked')) sexo = 2;

            if (sexo == 0) { alert("Ingrese Sexo."); return; }

            Cert1 = false;
            Cert2 = false;
            EsEstudiante = false;
            OPMI = $("#cbo_PMI").is(':checked');
            OPI = $("#cbo_PI").is(':checked');

            if (OPMI) {
                if ($("#txtFechaParto").val().length == 0) { alert("Ingrese Fecha de Vencimiento de PMI."); return; }
            }

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

            if ($("#cbo_Provi").is(":checked")) {
                if ($('#txtcuiltitu').val().trim().length != 11)
                    $('#txtcuiltitu').val($('#txtcuit').val());
            }

            var json = JSON.stringify({
                "Id": $("#afiliadoID").val(),
                "tipo_doc": $("#cbo_tipo_doc :selected").val(),
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
                "PI": OPI,
                "NHC_UOM": $('#txt_NHC_UOM').val().trim(),
                "FechaBaja": $('#txtFechaBaja').val(),
                "FechaVenc_PMI": $('#txtFechaParto').val(),
                "EstadoCivil": $('#EstadoCivil option:selected').val(),
                "Nacionalidad": $('#Nacionalidad option:selected').val(),
                "NroCarnet": $('#txtNroCarnet').val().trim()
            });

            $.ajax({
                type: "POST",
                url: "../Json/Gente/ActualizarGente.asmx/ActualizarGente",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    $("#Espereaqueguarde").show();
                },
                success: Datos_Actualizados,
                complete: function () {
                    if ($("#txttelefono").val() != celCache) { generarLog($("#afiliadoID").val(), $("#txttelefono").val(), "FICHA PACIENTE"); celCache = $("#txttelefono").val(); }

                    $("#Espereaqueguarde").hide();
                },
                error: errores
            });
        }
        else {
            alert("Verifique los campos");
        }
    }
});

function Datos_Actualizados(Resultado) {
    $("#afiliadoID").val(Resultado.d);
if (Resultado!=null && Resultado != "")
 {
   clearTimeout(timer);    
   $("#Espereaqueguarde").hide();
   if (Medico != 0) {
       if (SobreTurno == "") {
           SobreTurno = "false";
       }
       document.location = "../Turnos/ConfirmarTurnos.aspx?MedicoID=" + Medico + "&EspecialidadId=" + Especialidad + "&Fecha=" + Fecha + "&Hora=" + Hora + "&Primera=" + Primera + "&SobreTurno=" + SobreTurno + "&TurnoTelefonico=" + TurnoTelefonico + "&Actual=" + $("#afiliadoID").val() + "&Express=1";
   }
   else {
       alert('Paciente Cargado Correctamente');
       ///Manuel/////////////////////////////////////////////////////////////////////////////////////////////
       if (diabetes == 1) {
           parent.document.location = "../AtConsultorio/Listar_Pacientes_Existentes.aspx";
       }
       ///Manuel/////////////////////////////////////////////////////////////////////////////////////////////

       if (Capturar == 1) {

           Actualizar_Imagen();

       }
       else {
           document.location = 'NuevoAfiliado.aspx?ID='+ $("#afiliadoID").val();
       }
   }
   }
}

function Mensajes()
{
    window.setTimeout(function() { 
    $("#Mensajedeespera").html("El proceso está demorando más de lo habitual, aguarde un momento.");
    window.setTimeout(function() { 
    $("#Mensajedeespera").html("Al parecer existe un problema con la conexión hacia el PADRÓN UOM, aguarde por favor");
    window.setTimeout(function() { 
    $("#Mensajedeespera").html("Definitivamente hay un problema, sin embargo el afiliado se guardará, aguarde por favor");
    window.setTimeout(function() { 
    $("#Mensajedeespera").html("Ya van 40 segundos..., sea paciente :)");
    window.setTimeout(function() { 
    $("#Mensajedeespera").html("Van más de 50 segundos... </br> por favor comuniquese con SISTEMAS. </br> El proceso NO se Guardará.");
     }, 10000); 
     }, 10000); 
     }, 10000); 
     }, 10000); 
     }, 10000);     
}

function MensajesCarga()
{
    timer = window.setTimeout(function() { 
    $("#Espereaqueguarde").show();
    $("#Mensajedeespera").html("El proceso está demorando más de lo habitual, aguarde un momento.");
    window.setTimeout(function() { 
    $("#Mensajedeespera").html("Al parecer existe un problema con la conexión hacia el PADRÓN UOM, aguarde por favor");
    window.setTimeout(function() { 
    $("#Mensajedeespera").html("Definitivamente hay un problema con la conexión hacia el PADRÓN UOM, aguarde por favor");
    window.setTimeout(function() { 
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

$("#txtcuiltitu").change(function(){
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
if ($("#txtcuit").val().length == 11)
{
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
else
{
    $("#txtcuit").val('');
    $("#RazonSocial").html('');
}
}


function Cargar_CUIT_Cargado(Resultado) {
    var Empresas = Resultado.d;

    if (Empresas.razonsocial != null)
    {
        $("#RazonSocial").html(Empresas.razonsocial.substring(0,12));
        $("#ControlCUIT").removeClass("error");
        CUIT_ERROR = 0;
    }
    else
    {
        $("#RazonSocial").html('');
        $("#ControlCUIT").addClass("error");
        CUIT_ERROR = 1;
    }


}



$("#txtdocumento").change(function () {
    if ($("#txtdocumento").val().length >= 7) {
        Cargar_Persona_Local_Encabezado($("#txtdocumento").val());
        var sexo;
        if ($("#Sm").is(":checked")) sexo = 1;
        if ($("#Sf").is(":checked")) sexo = 2;
        if (sexo > 0) {
            $('#txtcuil').val(cuil_cuit(sexo, $('#txtdocumento').val()));
            $("#txtcuiltitu").val($('#txtcuil').val());
        }
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
    $.each(Paciente, function (index, paciente) {
        if (paciente.cuil != 0) {
            $("#txtNHC").val(Paciente.documento);
            $('#ModalExistePaciente').modal('show');
        }
    });
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

    if (Paciente.length > 0) {
        if (Paciente.documento != 0) {
            $('#ModalExistePaciente').modal('show');
        }
    }
    else {
        $("#modal_small").modal('show');
    }
}

function Bla() {
    $("#modal_small").modal('hide');
    Entradas(true);
}

function ValidarTodo() {
    if ($("#cboSeccional :selected").val() == "") {alert("Seleccione Seccional.");return false;}

    if($('#txtapellido').val().length < 7) { $("#ControlApellidoyNombre").addClass("error"); } else {$("#ControlApellidoyNombre").removeClass("error");}
    if (!$("#Sm").attr('checked') && !$("#Sf").attr('checked')) { $("#ControlSexo").addClass("error"); } else {$("#ControlSexo").removeClass("error");}
    if($('#txtdocumento').val().length < 7) { $("#ControlDNI").addClass("error"); } else {$("#ControlDNI").removeClass("error");}
    //if($('#txtcuil').val().length != 11) { $("#ControlCUIL").addClass("error"); } else {$("#ControlCUIL").removeClass("error");}
    //if ($('#txttelefono').val().length < 7) { $("#ControlTelefono").addClass("error"); } else { $("#ControlTelefono").removeClass("error"); }
    if ($('#cbo_Discapacidad').val() == "") { $("#ControlDiscapacidad").addClass("error"); } else { $("#ControlDiscapacidad").removeClass("error"); }

    //VerificarFecha("txtFechaNacimiento", "ControlFechaNacimiento");

    if ($("#cbo_Discapacidad").val() != "0") {
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
        if ($('#txtcuiltitu').val().length != 11 && (!$("#cbo_Provi").is(":checked")) ) {
            $("#ControlCUILTITULAR").addClass("error");
        }
        else {
            $("#ControlCUILTITULAR").removeClass("error"); 
        }
    }

    if ($("#ck_UOM").is(':checked')) {
      //  if ($('#txtcuit').val().length != 11) { $("#ControlCUIT").addClass("error"); } else { $("#ControlCUIT").removeClass("error"); }
    }

    return true;
//    if ($("#ck_UOM").is(':checked')) {
//        if (IgnorarT == false) {
//            if ($("#ControlCUIT").hasClass("error")) { $("#ControlCUIT").removeClass("error"); }
//            if (CUIL_TITULAR_ERROR == 1) { $("#ControlCUILTITULAR").addClass("error"); } else { $("#ControlCUILTITULAR").removeClass("error"); }
//        }
//    }

    
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
        if ($('#txtapellido').val().length < 7) { $("#ControlApellidoyNombre").addClass("error");alert("Revise el Nombre");return false; } else { $("#ControlApellidoyNombre").removeClass("error"); }
        if (!$("#Sm").attr('checked') && !$("#Sf").attr('checked')) { $("#ControlSexo").addClass("error"); alert("Revise el Genero"); return false; } else { $("#ControlSexo").removeClass("error"); }
        if ($('#txtdocumento').val().length < 7) { $("#ControlDNI").addClass("error"); alert("Revise el DNI"); return false; } else { $("#ControlDNI").removeClass("error"); }
        if ($('#txtcuil').val().length != 11) { $("#ControlCUIL").addClass("error"); alert("Revise el CUIL"); return false; } else { $("#ControlCUIL").removeClass("error"); }
        //if ($('#txttelefono').val().length < 7) { $("#ControlTelefono").addClass("error"); alert("Revise el Teléfono"); return false; } else { $("#ControlTelefono").removeClass("error"); }
        return true;        
    }



}


$("#Sm").click(function(){
$("#Sm").attr('checked', true);
$("#Sf").attr('checked', false);
$('#txtcuil').val(cuil_cuit(1,$('#txtdocumento').val()));
});

$("#Sf").click(function(){
$("#Sm").attr('checked', false);
$("#Sf").attr('checked', true);
$('#txtcuil').val(cuil_cuit(2,$('#txtdocumento').val()));
});



function VerificarFecha(ControlFecha, ControlError)
{

var Date = $("#"+ControlFecha).val();
        var elem = Date.split('/');
        dia = elem[0];
        mes = elem[1];
        anio = elem[2];        

        if (!isDate(anio, mes, dia)) {
            $("#"+ControlError).addClass("error");
            $("#"+ControlFecha).focus();            
        }
        else {
            $("#"+ControlError).removeClass("error");
        }
}

 $('#txtFechaNacimiento').change(function () {
        VerificarFecha('txtFechaNacimiento','ControlFechaNacimiento');
    });

    $('#txtFVDiscapacidad').change(function () {
        if ($("#cbo_Discapacidad").val() != "1") {
            VerificarFecha('txtFVDiscapacidad', 'ControlDiscapacidad');
        }
    });

 function IgnorarTitular()
 {
 IgnorarT = true;
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
                 $('#cbo_tipo_doc').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
             });

         },
         error: errores
     });
 }

 $("#cbo_Provi").click(function () {
     if ($("#cbo_Provi").is(":checked")) {
         BuscarNroHCProvi();
     }
     else $("#txt_NHC_UOM").val('');
 });

 function BuscarNroHCProvi() {
     $.ajax({
         type: "POST",
         url: "../Json/Gente.asmx/HC_UOM_Provisoria",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (Resultado) {
             $("#txt_NHC_UOM").val('');
             $("#txt_NHC_UOM").val(Resultado.d);
         },
         error: errores
     });
 }

 //Scaneo...

 $("#btnScanear").click(function () {     
     if ($("#afiliadoID").val() != "0") {
         var ancho = 900;
         var alto = 600;
         var posicion_x = (screen.width / 2) - (ancho / 2);
         var posicion_y = (screen.height / 2) - (alto / 2);
         //var win = window.open("http://10.10.8.71/Pacientes/Escanear.aspx?Id=" + $("#afiliadoID").val(), "child", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
         var win = window.open("../Pacientes/Escanear.aspx?Id=" + $("#afiliadoID").val(), "child", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
         //var win = window.open("Escanear.aspx", "child", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
     }
 });


 $("#btnAdjuntar").click(function () {
     if ($("#afiliadoID").val() != "0") {
         var ancho = 900;
         var alto = 600;
         var posicion_x = (screen.width / 2) - (ancho / 2);
         var posicion_y = (screen.height / 2) - (alto / 2);
         //var win = window.open("http://10.10.8.71/Pacientes/Adjuntar.aspx?Id=" + $("#afiliadoID").val(), "child", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
         var win = window.open("../Pacientes/Adjuntar.aspx?Id=" + $("#afiliadoID").val(), "child", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
         //var win = window.open("Adjuntar.aspx", "child", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
     }
 });


 function ListaDocumentacion_Paciente(IdPaciente) {
    // alert("paso");
     var json = JSON.stringify({"IdPaciente": IdPaciente});
     $.ajax({
         type: "POST",
         data: json,
         url: "../Json/Documentacion.asmx/Documentacion_Archivos",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (Resultado) {
             var lista = Resultado.d;
             var fila = "";
             var Contenido = "";
             var finfila = "";
             var tipoDoc;

             var fila = "<div class='row' style='margin-left:10px; margin-top:10px;max-height:180px; height:180px: overflow:hidden'>";
             $.each(lista, function (index, item) {
                 var nombre_recortado = item.archivo.split("\\");
                 var nombre_corto = nombre_recortado[nombre_recortado.length - 1];
                 var src = "../img/escaneadas/";
                 if (item.tipo == 1) { src = "../adjuntos/"; }

                 if (item.archivo.substr(item.archivo.length - 3, 3).toLowerCase() == "pdf")
                 { tipoDoc = "<div style='overflow:hidden'><embed src='" + src + item.archivo + "' alt='...' style='width:100px; height:140px'/></div>"; }
                 else { tipoDoc = "<img src='" + src + item.archivo + "' alt='...'>"; }

                 Contenido = Contenido + "<div class='span2'><div style='width:100px; height:150px;'><a href='" + src + item.archivo + "' class='thumbnail' download>" + tipoDoc + "</a></div><p align='left' style='font-size:13px;'>" + item.tipodocu + "-" + item.cantidad + "<a class='btn_borrar_img' data-nombre='" + nombre_corto + "'><img src='../img/Icono_ERROR.gif'/></a></p></div>";
             });

             var finfila = "</div>";
             $("#fotos").html(fila + Contenido + finfila);
         },
         error: errores
     });
 }


 $(".btn_borrar_img").live("click", function () {
     var afiliado_id = $("#afiliadoID").val();
     var archivo = $(this).data("nombre");

     var json = JSON.stringify({ "Archivo": archivo, "PacienteId": afiliado_id });

     $.ajax({
         type: "POST",
         data: json,
         url: "../Json/Documentacion.asmx/Documentacion_Eliminar",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (Resultado) {
             ListaDocumentacion_Paciente(afiliado_id);
         },
         error: errores
     });

 });

 $("#chk_alto_riesgo").click(function () {
     Update_AltoRiesgo($("#afiliadoID").val(), $("#chk_alto_riesgo").is(":checked"));
 });


 function Update_AltoRiesgo(PacienteId, Alto_Riesgo) {
     var json = JSON.stringify({ "PacienteId": PacienteId, "Alto_Riesgo": Alto_Riesgo });
     $.ajax({
         type: "POST",
         url: "../Json/Gente.asmx/Update_Alto_Riesgo",
         data: json,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function () {
             alert("Estado Actualizado.");
         },
         error: errores
     });
 }

 function cargarPatologiasCronicas(AfiliadoId) {
     //alert(AfiliadoId);

     var json = JSON.stringify({ "AfiliadoId": AfiliadoId, "accion": 0 });
     $.ajax({
         type: "POST",
         url: "../Json/Gente.asmx/AltoRiesgoMOSTRAR",
         data: json,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: cargarTabla,
         error: errores
     });

     
 }

 function cargarTabla(Resultado) {
     var lista = Resultado.d;
     var encabezado = "<table class='table table-hover' style='width:90%'><tr><td><b>Código</b></td><td><b>Descripción</b></td></tr>";
     var fila = "";
     var pie = "</table>";
     var color = "";
     $.each(lista, function (index, item) {
         if (item.tiene == 1) { color = "background-color:Red"; 
         fila = fila + "<tr style='" + color + "' id='" + item.codigo + "_TR'><td class='fila' id='" + item.codigo + "'>" + item.codigo + "</td><td class='fila' id='" + item.codigo + "'>" + item.descripcion + "</td></tr>";
     } else { color = ""; }
     });

     $("#patologiasCronicas").html(encabezado + fila + pie);
 }