var timer;
var Documento = 0;
var NHC = 0;
var Cargado = 0;
var CUIT_ERROR;
var CUIL_TITULAR_ERROR = 0;
var Local = 0;
var IgnorarT = false;
$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }


    var GET = {};


    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["Documento"] != "" && GET["Documento"] != null) {
        Documento = GET["Documento"];
        if (GET["Padron"] == 1) {
            $("#txtFechaNacimiento").datepicker();
            Cargado = 1;
            Local = 0;
            MensajesCarga();
            Cargar_Persona(Documento);
            $("#ck_UOM").attr("disabled", true);
        }
        else {
            $("#txtFechaNacimiento").datepicker();
            Cargado = 1;
            Local = 1;
            MensajesCarga();
            Cargar_Persona_Local(Documento);
        }
    }

    if (GET["Padron"] == null || GET["Padron"] == '') {
        Cargar_ObraSociales_Cargar(0);
    }

    if (GET["NHCDocumento"] != "" && GET["NHCDocumento"] != null) {
        NHC = GET["NHCDocumento"];
        $("#txtFechaNacimiento").datepicker();
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



    if (GET["ApellidoyNombre"] != "" && GET["ApellidoyNombre"] != null) {
        if (GET["Padron"] == 2) {
            $("#txtPacienteBuscar").val(GET["ApellidoyNombre"]);
            Cargar_Persona_Apellido();
        }
    }


    if (Cargado == 0 && GET["ApellidoyNombre"] == null && GET["NHCDocumento"] == null && GET["Documento"] == null) {
        $("#txtFechaNacimiento").datepicker();
        Cargar_CodPariente(0);
        Cargar_Seccionales_Lista(0);
        Cargar_CodProvincias(0);
        $("#salta").html(FechaActual());
        $("#sactualizado").html(FechaActual());
    }



});


function ValidarEntrada()
{
    $("#txtdocumento").mask("9999999?9");
    $("#txtcuil").mask("9999999999?9");
    $("#txtFechaNacimiento").mask("99/99/9999",{ placeholder: "-" });
    $("#txtcuiltitu").mask("9999999999?9");
    $("#txtcuit").mask("9999999999?9");
    $("#txtcuil").mask("99:99", { placeholder: "-" });
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
    if(!IgnorarT)
    {
    if (Paciente.cuit == 0)
    {
        $('#myModalTitular').modal('show');
        Cargar_Seccionales_Lista('');
        return;
    }
    }

    $("#NombreTitular").html(Paciente.apellido);
    $("#txtcuit").val(Paciente.cuit);
    $("#RazonSocial").html(Paciente.RazonSocial);
    Cargar_Seccionales_Lista(Paciente.seccional);

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

    Cargar_CodPariente(Paciente.cod_pariente);
    Cargar_CodProvincias(Paciente.provincia);
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


function Cargar_Persona_Apellido() {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/PersonaXApellido",
        data: '{Apellido: "' + $("#txtPacienteBuscar").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Apellido_Cargado,
        error: errores
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
            $.each(Seccionales, function (index, seccionales) {
                $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
            });
            if (Cod != null && Cod != '')
            {
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

        var OSCbo = $('#cbo_ObraSocial option:selected').val();
        if (OSCbo == null || OSCbo == '') {
            OSCbo = 112103;
        }

        Provisorio = 1;

        var json = JSON.stringify({
            "cuil": $('#txtcuil').val(),
            "documento": $('#txtdocumento').val(),
            "apellido": $('#txtapellido').val(),
            "sexo": sexo,
            "telefono": $('#txttelefono').val(),
            "Seccional": $('#cboSeccional option:selected').val(),
            "cuit": $('#txtcuit').val(),
            "calle": $('#txtcalle').val(),
            "numero": $('#txtnumero').val(),
            "piso": $('#txtpiso').val(),
            "depto": $('#txtdpto').val(),
            "localidad": $('#txtlocalidad').val(),
            "provincia": $('#cboProvincia option:selected').val(),
            "fecha_nacimiento": $('#txtFechaNacimiento').val(),
            "Provisorio": Provisorio,
            "Cod_Pariente": $('#cboCodPariente option:selected').val(),
            "email": $('#txtemail').val(),
            "celular": $('#txtcelular').val(),
            "CodPostal": $('#txtcodpos').val(),
            "cuil_titu": $('#txtcuiltitu').val(),
            "OS": OSCbo,
            "ES_UOM": $("#ck_UOM").is(':checked')
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
if (Resultado!=null && Resultado != "")
 {
   clearTimeout(timer);    
   $("#Espereaqueguarde").hide();
   window.close();
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
        $("#RazonSocial").html(Empresas.razonsocial);
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
if ($("#txtdocumento").val().length >= 7)
{
    Cargar_Persona_Local_Encabezado($("#txtdocumento").val());
}
});

$("#txtcuil").change(function () {
if ($("#txtcuil").val().length >= 10)
{
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
    if (Paciente.cuil != 0)
    {
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
    if (Paciente.documento != 0)
    {
        $('#ModalExistePaciente').modal('show');        
    }
}


function ValidarTodo()
{
    if($('#txtapellido').val().length < 7) { $("#ControlApellidoyNombre").addClass("error"); } else {$("#ControlApellidoyNombre").removeClass("error");}
    if (!$("#Sm").attr('checked') && !$("#Sf").attr('checked')) { $("#ControlSexo").addClass("error"); } else {$("#ControlSexo").removeClass("error");}
    if($('#txtdocumento').val().length < 7) { $("#ControlDNI").addClass("error"); } else {$("#ControlDNI").removeClass("error");}
    if($('#txtcuil').val().length != 11) { $("#ControlCUIL").addClass("error"); } else {$("#ControlCUIL").removeClass("error");}
    if($('#txttelefono').val().length < 7) { $("#ControlTelefono").addClass("error"); } else {$("#ControlTelefono").removeClass("error");}
    
    VerificarFecha("txtFechaNacimiento","ControlFechaNacimiento");    
    
    
    if($('#txtcuiltitu').val().length != 11) { $("#ControlCUILTITULAR").addClass("error"); } else {$("#ControlCUILTITULAR").removeClass("error");}
    if($('#txtcuit').val().length != 11) { $("#ControlCUIT").addClass("error"); } else {$("#ControlCUIT").removeClass("error");}
    
    
    if(IgnorarT==false) {
    if ($("#ControlCUIT").hasClass("error")) { $("#ControlCUIT").removeClass("error"); } 
    if(CUIL_TITULAR_ERROR == 1) { $("#ControlCUILTITULAR").addClass("error"); } else {$("#ControlCUILTITULAR").removeClass("error");}
    }
    
    if(CUIT_ERROR == 1) { $("#ControlCUIT").addClass("error"); } else {$("#ControlCUIT").removeClass("error");}
    if($("#RazonSocial").html()== null || $("#RazonSocial").html()== '') { $("#ControlCUIT").addClass("error"); } else {$("#ControlCUIT").removeClass("error");}
    
    if(IgnorarT==false)
    {
    if($("#NombreTitular").html()== null || $("#NombreTitular").html()== '' ) { $("#ControlCUILTITULAR").addClass("error"); } else {$("#ControlCUILTITULAR").removeClass("error");}
    }

    ////MODIFIQUE FEDE...

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

    /////////////////////////////////////////////////////////////////////////////////////////

    if(IgnorarT==false)
    {
    if ($("#ControlSexo").hasClass("error") || $("#ControlDNI").hasClass("error") || $("#ControlCUIL").hasClass("error") || $("#ControlTelefono").hasClass("error") || $("#ControlFechaNacimiento").hasClass("error") ||
    $("#ControlCUILTITULAR").hasClass("error") || $("#ControlCUIT").hasClass("error") || CUIL_TITULAR_ERROR == 1 || CUIT_ERROR == 1 || $("#RazonSocial").html()== null || $("#NombreTitular").html()== null || $("#RazonSocial").html()== '' || $("#NombreTitular").html()== '')
    {
        return false;
    }
    else
    {
        return true;
    }
    }
    else
    {
    if ($("#ControlSexo").hasClass("error") || $("#ControlDNI").hasClass("error") || $("#ControlCUIL").hasClass("error") || $("#ControlTelefono").hasClass("error") || $("#ControlFechaNacimiento").hasClass("error") ||
    $("#ControlCUILTITULAR").hasClass("error") || $("#ControlCUIT").hasClass("error") || CUIL_TITULAR_ERROR == 1 || CUIT_ERROR == 1 || $("#RazonSocial").html()== null || $("#RazonSocial").html()== '')
    {
        return false;
    }
    else
    {
        return true;
    }
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

 function IgnorarTitular()
 {
 IgnorarT = true;
 }

