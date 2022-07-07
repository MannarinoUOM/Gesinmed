
$(document).ready(function () {
    $("#frm").validate({
        rules: {
            'txtFechaInicio': { required: true, dateES: true },
            'txtFechaFin': { required: true, dateES: true }
        },
        messages: {
            'txtFechaInicio': { required: '', dateES: '' },
            'txtFechaFin': { required: '', dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            //RemoveClass();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    List_ObraSociales(false);
    var Fecha = FechaActual();
    var parts = Fecha.split('/');
    $("#txtAnio").val(parts[2]);
    $("#txtMes").val(parts[1]);
});

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": false });
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
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
    });
}


function FechaActual_2(e) {
    var currentDt = new Date();
    var yyyy = currentDt.getFullYear();
    var mm = currentDt.getMonth() + 1 + e;
    if (parseInt(mm) <= 0) {
        yyyy = parseInt(yyyy) - 1;
        mm = 12 + parseInt(mm);
    }
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var date = '01' + '/' + mm + '/' + yyyy;
    return (date);
}

$("#btnBuscar").click(function () {
    if ($("#frm").valid()) {
        var Fecha = "01" + "/" + $("#txtMes").val() + "/" + $("#txtAnio").val();
        if ($("#rdInt").is(":checked"))
        var url = "../Impresiones/ImpresionFactInternacionCab.aspx?OS=" + $("#cbo_Institucion :selected").val() + "&Periodo=" + Fecha;
        else
        var url = "../Impresiones/ImpresionRendicionAmbuOS.aspx?OS=" + $("#cbo_Institucion :selected").val() + "&Periodo=" + Fecha;
        Ventana(url);
    }
    else alert("Ingrese Correctamente la Fecha");
});

function Ventana(url) {

    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}
