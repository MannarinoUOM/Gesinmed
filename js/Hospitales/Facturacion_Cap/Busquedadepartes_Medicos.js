if (jQuery.validator != undefined) {
    jQuery.validator.addMethod(
	"dateES",
	function (value, element) {
	    var check = false;
	    var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
	    if (re.test(value)) {
	        var adata = value.split('/');
	        var gg = parseInt(adata[0], 10);
	        var mm = parseInt(adata[1], 10);
	        var aaaa = parseInt(adata[2], 10);
	        var xdata = new Date(aaaa, mm - 1, gg);
	        if ((xdata.getFullYear() == aaaa) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == gg))
	            check = true;
	        else
	            check = false;
	    } else
	        check = false;
	    return this.optional(element) || check;
	},
	"fecha invalida"
);
}

$(document).ready(function () {
    $("#frm_Main").validate({
        rules: {
            'txtParte': { number: true },
            'txtDesdePrac': { dateES: true },
            'txtHastaPrac': { dateES: true },
            'txtDesdeRend': { dateES: true },
            'txtHastaRend': { dateES: true },
            'txtDesdeParte': { dateES: true },
            'txtHastaParte': { dateES: true }
        },
        messages: {
            'txtParte': { number: '' },
            'txtDesdePrac': { dateES: '' },
            'txtHastaPrac': { dateES: '' },
            'txtDesdeRend': { dateES: '' },
            'txtHastaRend': { dateES: '' },
            'txtDesdeParte': { dateES: '' },
            'txtHastaParte': { dateES: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    List_Medicos();
    Especialidades_Lista();
    InicializarCampos();
});

function InicializarCampos() {
    $("#txtDesdePrac").datepicker();
    $("#txtHastaPrac").datepicker();
    $("#txtDesdeRend").datepicker();
    $("#txtHastaRend").datepicker();
    $("#txtDesdeParte").datepicker();
    $("#txtHastaParte").datepicker();
    $("#txtDesdePrac").mask("99/99/9999", { placeholder: "-" });
    $("#txtHastaPrac").mask("99/99/9999", { placeholder: "-" });
    $("#txtDesdeRend").mask("99/99/9999", { placeholder: "-" });
    $("#txtHastaRend").mask("99/99/9999", { placeholder: "-" });
    $("#txtDesdeParte").mask("99/99/9999", { placeholder: "-" });
    $("#txtHastaParte").mask("99/99/9999", { placeholder: "-" });
}

function List_Medicos() {
    var json = JSON.stringify({ "Apellido": null, "MN": null, "MP": null, "objBusquedaLista": null });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

function Especialidades_Lista() {
    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidades_Lista_Cargado,
        error: errores
    });
}

function Especialidades_Lista_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Especialidad) {
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
    });
}


function errores(msg) {
    alert('Error: ' + msg.responseText);
}

$("#btnBuscar").click(function () {
    Busqueda();
});

function RemoveClass() {
    $(".form").removeClass("error");
}

function Busqueda() {
    if ($("#frm_Main").valid()) {
        RemoveClass();
        var json = JSON.stringify({"NroParte": $("#txtParte").val(), "DesdeParte": $("#txtDesdeParte").val(), "HastaParte": $("#txtHastaParte").val(), "DesdePrac": $("#txtDesdePrac").val(), "HastaPrac": $("#txtHastaPrac").val(), "DesdeRend": $("#txtDesdeRend").val(), "HastaRend": $("#txtHastaRend").val(), "EspecialidadId": $("#cbo_Especialidad :selected").val(), "MedicoId": $("#cbo_Medico :selected").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/ListPartesMedicos",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListPartes_Cargado,
            error: errores
        });
    }
}

function ListPartes_Cargado(Resultado) {
    Partes = Resultado.d;
    var Tabla_Datos = "";
    Tabla_Titulo = "<table id='TablaPartes_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Parte</th><th>Fecha Parte</th><th>Servicio</th></tr></thead><tbody>";
    $.each(Partes, function (index, Parte) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargaPracticasMedicasHC_Medicos.aspx?Id=" + Parte.NroParte + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + Parte.NroParte + "</td><td>" + Parte.Fecha + "</td><td>" + Parte.Seccional + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPartes_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function Ventana(url) {
    document.location = url;
}
