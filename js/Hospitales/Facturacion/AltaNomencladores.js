var EditandoId = 0;

$(document).ready(function () {
    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").datepicker();
    $("#txtFechaInicio").datepicker();
    $("#txtFechaInicio").val(FechaActual());
    $("#txtFechaFin").val(FechaActual());
    CargarConvenios();
    $("#btnInstituciones").hide();
    $("#btnSeccionales").hide();
    $("#frm_Main").validate({
        rules: {
            'txtConvenios': { required: true },
            'txtContacto': { required: true },
            'txtFechaInicio': { required: true, dateES: true },
            'txtFechaFin': { required: true, dateES: true }
        },
        messages: {
            'txtConvenios': { required: '' },
            'txtContacto': { required: '' },
            'txtFechaInicio': { required: '', dateES: '' },
            'txtFechaFin': { required: '', dateES: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

});

function CargarConvenios() {
    var json = JSON.stringify({ "Convenio": $("#txtConvenios").val().trim().toUpperCase() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerlosConvenios",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConvenios_Cargado,
        error: errores
    });

}

function CargarConvenios_Cargado(Resultado) {
    var Convenios = Resultado.d;
    var Tabla_Datos = "";
    $("#TConvenios").empty();

    $.each(Convenios, function (index, conv) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + conv.id + ");";
        Tabla_Datos = Tabla_Datos + "><td style='font-size:16px;' id='Con" + conv.id + "'>" + conv.convenios + "</td><td id='Cont" + conv.id + "'>" + conv.contacto + "</td><td id='FeI" + conv.id + "'>" + conv.fechainicial + "</td><td id='FeF" + conv.id + "'>" + conv.fechafinal + "</td><td id='Det" + conv.id + "'>" + conv.detalles + "</td><td id='Razon" + conv.id + "' style='display:none;'>" + conv.razonsocial + "</td><td id='Direc" + conv.id + "' style='display:none;'>" + conv.direccion_fact + "</td><td id='Cuit" + conv.id + "' style='display:none;'>" + conv.cuit_fact + "</td></tr>";
    });

    $("#TConvenios").html(Tabla_Datos);
}

function Editar(Id) {
    $("#txtConvenios").val($("#Con" + Id).html());
    $("#txtContacto").val($("#Cont" + Id).html());
    $("#txtFechaInicio").val($("#FeI" + Id).html());
    $("#txtFechaFin").val($("#FeF" + Id).html());
    $("#txtDetalles").val($("#Det" + Id).html());

    $("#txtRazonSocial").val($("#Razon" + Id).html());
    $("#txtDireccion_Fact").val($("#Direc" + Id).html());
    $("#txtCUIT_Fact").val($("#Cuit" + Id).html());

    EditandoId = Id;
    $("#btnQuitar").show();
    $("#btnInstituciones").show();
    $("#btnSeccionales").show();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnQuitar").click(function () {
    if (confirm("¿Desea quitar el convenio?")) {
        var json = JSON.stringify({ "ConvenioNro": EditandoId });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/QuitarConvenios",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Quitados,
            error: errores
        });
    }
});

function Quitados(Resultado) {
    var d = Resultado.d;
    if (d > 0) {
        alert("Convenio Quitado");
        CargarConvenios();
        Limpiar();
    }
    else alert("No se puede eliminar Convenio");
}

function Limpiar() {
    $("#txtConvenios").val('');
    $("#txtContacto").val('');
    $("#txtFechaInicio").val('');
    $("#txtFechaFin").val('');
    $("#txtDetalles").val('');

    $("#txtRazonSocial").val('');
    $("#txtDireccion_Fact").val('');
    $("#txtCUIT_Fact").val('');

    EditandoId = 0;
    $("#btnQuitar").hide();
    $("#btnInstituciones").hide();
    $("#btnSeccionales").hide();

    $("#tab1_").click();
    $("#txtConvenios").focus();

}

$("#btnCancelar").click(function () {
    Limpiar();
});

function RemoveClass() {
    $(".control-group").removeClass();
}

$("#btnGuardar").click(function () {
    if (confirm("¿Desea guardar el convenio?")) {
        if ($("#frm_Main").valid()) {
            RemoveClass();
            var json = JSON.stringify({
                "ConvenioNro": EditandoId,
                "Convenios": $("#txtConvenios").val().trim().toUpperCase(),
                "Contacto": $("#txtContacto").val().trim().toUpperCase(),
                "FechaInicio": $("#txtFechaInicio").val(),
                "FechaFin": $("#txtFechaFin").val(),
                "Detalles": $("#txtDetalles").val().trim().toUpperCase(),
                "RazonSocial": $("#txtRazonSocial").val().trim().toUpperCase(),
                "Direccion_Fact": $("#txtDireccion_Fact").val().trim().toUpperCase(),
                "CUIT_Fact": $("#txtCUIT_Fact").val().trim().toUpperCase()
            });

            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarConveniosSN",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: GuardarConvenios_Guardado,
                error: errores
            });
        }
    }
});



function GuardarConvenios_Guardado(Resultado) {
    alert("Convenio Guardado");
    Limpiar();
    CargarConvenios();
}

$("#btnSeccionales").click(function () {
    CargarSeccionalesR();
});

function CargarSeccionalesR()
{
    $("#PConvenioSec").html($("#txtConvenios").val());

    var json = JSON.stringify({
        "ConvenioId": EditandoId
    });

    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/CargarSeccionalesconConvenios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {

            var Seccionales = Resultado.d;
            $('#PSeccionalesSec').empty();
            var Datos = "";
            $.each(Seccionales, function (index, seccionales) {
                if (index == 0) {
                    Datos = "<a rel=" + 0 + " class='btn span6 " + seccionales.claseTodas + "' onclick='javascript:ModificarSeccional(this);'>Todas las Seccionales</a></br>";
                }
                Datos = Datos + "<a rel="+seccionales.SeccionalId +" class='btn span6 " + seccionales.clase + "' onclick='javascript:ModificarSeccional(this);'>" + seccionales.Seccional + "</a></br>";
            });
            $('#PSeccionalesSec').html(Datos);

        },
        error: errores
    });
}

function ModificarSeccional(Obj) {
    var Sec = $(Obj).attr("rel");
    var Activo = false;
    if ($(Obj).hasClass("btn-success")) Activo = true;
    var json = JSON.stringify({
        "ConvenioNro": EditandoId,
        "Seccional": Sec,
        "Activo": Activo
    });

    
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarRelacionSeccional",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ModificarSeccional_Guardado,
        error: errores
    });
}

function ModificarSeccional_Guardado() {
    CargarSeccionalesR();
}


$("#btnInstituciones").click(function () {
    CargarInstitucionesR();
});

function CargarInstitucionesR() {
    $("#PConvenioInst").html($("#txtConvenios").val());

    var json = JSON.stringify({
        "ConvenioId": EditandoId
    });

    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/CargarInstitucionesconConvenios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {

            var Seccionales = Resultado.d;
            $('#PInstitucionesInst').empty();
            var Datos = "";
            $.each(Seccionales, function (index, seccionales) {
                if (index == 0) {
                    Datos = "<a rel=" + 0 + " class='btn span6 " + seccionales.claseTodas + "' onclick='javascript:ModificarInstituciones(this);'>Todas las Instituciones</a></br>";
                }
                Datos = Datos + "<a rel=" + seccionales.InstitucionId + " class='btn span6 " + seccionales.clase + "' onclick='javascript:ModificarInstituciones(this);'>" + seccionales.Institucion + "</a></br>";
            });
            $('#PInstitucionesInst').html(Datos);

        },
        error: errores
    });
}

function ModificarInstituciones(Obj) {
    var Sec = $(Obj).attr("rel");
    var Activo = false;
    if ($(Obj).hasClass("btn-success")) Activo = true;
    var json = JSON.stringify({
        "ConvenioNro": EditandoId,
        "Seccional": Sec,
        "Activo": Activo
    });


    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarRelacionInstituciones",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ModificarInstitucion_Guardado,
        error: errores
    });
}

function ModificarInstitucion_Guardado() {
    CargarInstitucionesR();
}

$("#txtConvenios").blur(function () {
    CargarConvenios();
});