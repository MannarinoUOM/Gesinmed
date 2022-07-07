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
            'txtDesdeParte': { dateES: true },
            'txtHastaParte': { dateES: true }
        },
        messages: {
            'txtParte': { number: '' },
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
    List_ObraSociales(false);
    InicializarCampos();
});

function InicializarCampos() {
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txtParte").mask("9?999999", { placeholder: "-" });
    $("#txtDesdeParte").datepicker();
    $("#txtHastaParte").datepicker();
    $("#txtDesdeParte").mask("99/99/9999", { placeholder: "-" });
    $("#txtHastaParte").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtDesdeParte").val(p);
    $("#txtHastaParte").val(d);
}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Institucion").append($("<option></option>").val('0').html('Todas'));
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
        var json = JSON.stringify({ "NHC": $("#txtNHC").val(), "InstitucionId": $("#cbo_Institucion :selected").val(), "Afiliado": $("#txtNombre").val().trim().toUpperCase(), "NroParte": $("#txtParte").val(), "DesdeParte": $("#txtDesdeParte").val(), "HastaParte": $("#txtHastaParte").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/ListPartesSN",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListPartes_Cargado,
            error: errores,
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaPartes_div").hide();
            }
        });
    }
}

function ListPartes_Cargado(Resultado) {
    $("#cargando").hide();
    $("#TablaPartes_div").show();
    Partes = Resultado.d;
    var Tabla_Datos = "";
    Tabla_Titulo = "<table id='TablaPartes_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Rendicion</th><th>Fecha Rendicion</th><th>Paciente</th><th>Obra Social</th></tr></thead><tbody>";
    $.each(Partes, function (index, Parte) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargaPracticasMedicasHC.aspx?Id=" + Parte.NroParte + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + Parte.NroParte + "</td><td>" + Parte.Fecha + "</td><td>" + Parte.Paciente + "</td><td>" + Parte.Seccional + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPartes_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function Ventana(url) {
    document.location = url;
}
