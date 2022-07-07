var Edicion = 0;
var Id = 0;

function Cargar_Localidades(Estado) {
    var json = JSON.stringify({ "Estado": Estado });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Localidades.asmx/Localidades_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Localidades_Cargadas,
        error: errores
    });
}

function Localidades_Cargadas(Resultado) {
    var Localidades = Resultado.d;
    $('#cbo_Localidad').empty();
    $.each(Localidades, function (index, localidades) {
        $('#cbo_Localidad').append(
              $('<option></option>').val(localidades.id).html(localidades.localidad)
            );
    });
}

Cargar_Localidades(0);

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Cargar_Centro_Unico() {
    var Todos = 0;
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Centro.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Centro_Unico_Cargado,
        error: errores
    });

}

$("#btnGuardar").click(function () {
    Guardar_Centro();
});

$("#elMapa").click(function () {
    $('#eMapa').attr('src', $('#eMapa').attr('src'));
});


function Cargar_Centro_Unico_Cargado(Resultado) {
    var Centro = Resultado.d;
    $("#txtRazonSocial").val(Centro.RazonSocial);
    $("#txtCalle").val(Centro.Calle);
    $("#txtNumero").val(Centro.Nro);
    $("#txtPiso").val(Centro.Piso);
    $("#txtDpto").val(Centro.Depto);
    $("#cbo_Localidad option[value=" + Centro.LocalidadId + "]").attr("selected", true);
    $("#txtProvincia").val(Centro.Provincia);
    $("#txtCP").val(Centro.CodigoPostal);
    $("#txtTelefono").val(Centro.Telefono);
    $("#txtFax").val(Centro.Fax);
    $("#txtObservaciones").val(Centro.Observaciones);
    $("#txtDirector").val(Centro.Director);
    $("#txtCUIT").val(Centro.NroCuit);
    $("#txtNINSCRIPCION").val(Centro.NroInscripcion);
    $("#txtObservacionesProp").val(Centro.Observacioens2);
       
    $('#Mapa').html("<iframe id='eMapa' width='99%' height='300' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com.ar/maps?q="+Centro.Calle+"+"+Centro.Nro+"+"+Centro.LOCNOMBRE+"&amp;ie=UTF8&amp;hq=&amp;hnear="+Centro.Calle+"+"+Centro.Nro+",+"+Centro.LOCNOMBRE+",+"+Centro.Provincia+"&amp;t=m&amp;z=14&amp;iwloc=A&amp;output=embed'></iframe>");
    
    
    
}


function Guardar_Centro() {
var RZ = /[a-zA-Z0-9]{6,50}/;    
$("#ControlRS").removeClass("error");
$("#ControlCalle").removeClass("error");
if ($("#txtRazonSocial").val()!='' && $("#txtCalle").val()!='' && RZ.test($("#txtRazonSocial").val()) && RZ.test($("#txtCalle").val()))
{

    var json = JSON.stringify({
        "RazonSocial": $("#txtRazonSocial").val(),
        "Calle": $("#txtCalle").val(),
        "Nro": $("#txtNumero").val(),
        "Piso": $("#txtPiso").val(), 
        "Depto": $("#txtDpto").val(),
        "CodigoPostal": $("#txtCP").val(),
        "LocalidadId": $("#cbo_Localidad :selected").val(),
        "Provincia": $("#txtProvincia").val(), 
        "Observaciones": $("#txtObservaciones").val(),
        "Director":  $("#txtDirector").val(),
        "NroCuit": $("#txtCUIT").val(),
        "Observacioens2": $("#txtObservacionesProp").val(),
        "Telefono": $("#txtTelefono").val(),
        "Fax": $("#txtFax").val(),
        "NroInscripcion": $("#txtNINSCRIPCION").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Centro.asmx/Guardar_Centro",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardar_Centro_Guardado,
        error: errores
    });
}
else {
    if (!RZ.test($("#txtRazonSocial").val())) { $("#ControlRS").addClass("error"); }
    if (!RZ.test($("#txtCalle").val())) { $("#ControlCalle").addClass("error"); }
        
        if (!RZ.test( $("#txtRazonSocial").val() ))
        {
            $("#tbRS").click();                 
            $("#txtRazonSocial").focus();
        }
        else
        {
            $("#tbD").click();                 
            $("#txtCalle").focus();
        }       

        
}
}

$("#txtRazonSocial").change(function () {
    $("#ControlRS").removeClass("error");
});

$("#txtCalle").change(function () {
    $("#ControlCalle").removeClass("error");
});

function Guardar_Centro_Guardado(Resultado)
{
    Cargar_Centro_Unico();
}

function CargarConsultorios() {
        $.ajax({
            type: "POST",
            url: "../Json/Turnos/Consultorios.asmx/Consultorio_Lista_E",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CargarConsultorios_Cargados,
            error: errores
        });
    }

    function EditarConsultorios(eId)
    {
    Id=eId;
    $("#txtDescripcion").val($("#tdc" + Id).html());
//    if ($("#tde" + Id).html().replace(/^\s+|\s+$/g,"").replace(/^\s+/,"").replace(/\s+$/,"") == "Activo"  || $("#tde" + Id).html().replace(/^\s+|\s+$/g,"").replace(/^\s+/,"").replace(/\s+$/,"") == "Cerrado")
//    {
    Edicion = 1;
    
    $("#btn_GuardarConsultorio").html("Modificar");
    if ($("#tde" + Id).html().replace(/^\s+|\s+$/g,"").replace(/^\s+/,"").replace(/\s+$/,"") == "Activo")
    {
    $("#btn_CerrarConsultorio").html("Cerrar Consultorio");
    }
    else
    {
    $("#btn_CerrarConsultorio").html("Abrir Consultorio");
    }

    $("#btn_CerrarConsultorio").show();

    $("#btn_EliminarConsultorio").show();
//    }
//    else
//    {
//    Edicion = 0;
//    Id = 0;
//    $("#btn_CerrarConsultorio").hide();
//    $("#btn_EliminarConsultorio").hide();
//    $("#btn_GuardarConsultorio").html("Agregar");
//    }
    }
       

    function CargarConsultorios_Cargados(Resultado) {
        

    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Consultorio</th><th>Estado</th></tr></thead><tbody>";
    var Contenido = "";
    var Consultorio = Resultado.d;
    $.each(Consultorio, function (index, consultorio) {
        Contenido = Contenido + "<tr onclick='EditarConsultorios(" + consultorio.ConsultorioID + ");'><td id='tdc"+consultorio.ConsultorioID+"'> " + consultorio.Consultorio + " </td><td id='tde"+consultorio.ConsultorioID+"'> " + consultorio.Estado + " </td></tr>";
    });

    var Pie = "</tbody></table>";
    $("#TablaConsultorios").html(Encabezado + Contenido + Pie);
     }


     $("#btnConsultorios").click(function () {
    CargarConsultorios();
});

$("#btn_CancelarConsultorio").click(function () {
    Edicion = 0;
    Id = 0;
    $("#btn_CerrarConsultorio").hide();
    $("#btn_EliminarConsultorio").hide();
    $("#btn_GuardarConsultorio").html("Agregar");
    $("#txtDescripcion").val('');
    $("#ControlDescripcion").removeClass("error");

});




$("#btn_GuardarConsultorio").click(function () {

    var Con = /[a-zA-Z0-9]{1,50}/;

    if ($("#txtDescripcion").val() != '' && Con.test($("#txtDescripcion").val())) {

        var json = JSON.stringify({ "id": Id, "Descripcion": $("#txtDescripcion").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Turnos/Consultorios.asmx/GuardarConsultorio",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: GuardarConsultorio_Guardado,
            error: errores
        });
    }
    else {
        $("#ControlDescripcion").addClass("error");
    }

});

function GuardarConsultorio_Guardado(Resultado)
{
CargarConsultorios();
$("#btn_CancelarConsultorio").click();
}

$("#txtDescripcion").change(function () {
    $("#ControlDescripcion").removeClass("error")
});


$("#btn_CerrarConsultorio").click(function () {

 var json = JSON.stringify({ "id": Id, "activo":  $("#btn_CerrarConsultorio").html() });
            $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Turnos/Consultorios.asmx/CerrarConsultorio",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CerrarConsultorio_Guardado,
            error: errores
        });
});

function CerrarConsultorio_Guardado(Resultado)
{
CargarConsultorios();
$("#btn_CancelarConsultorio").click();
}

$("#btn_EliminarConsultorio").click(function () {

 var json = JSON.stringify({ "id": Id });
            $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Turnos/Consultorios.asmx/EliminarConsultorio",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: EliminarConsultorio_Guardado,
            error: errores
        });
});

function EliminarConsultorio_Guardado(Resultado)
{
CargarConsultorios();
$("#btn_CancelarConsultorio").click();
}

    $("#btnImprimir").fancybox({
        'width': '75%',
        'height': '75%',
        'href': '../Impresiones/ImpresionCentro.aspx',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    Cargar_Centro_Unico();
});