



$(document).ready(function () {

    $("#desde").datepicker();
    $("#hasta").datepicker({
        defaultDate: '+1m'
    });




    $("#frm_Main").validate({
        rules: {
            'desde': { required: true, dateES: true },
            'hasta': { required: true, dateES: true },
            'nroBono': { number: true, range:[1,99999] }
        },
        messages: {
            'desde': { required: '', dateES: '' },
            'hasta': { required: '', dateES: '' },
            'nroBono': { number: '', range: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            $("#controldesde").removeClass("error");
            $("#controlhasta").removeClass("error");
            $("#controlnroBono").removeClass("error");
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);

    List_BonoContribucion(0, $("#desde").val(), $("#hasta").val());
});


function List_BonoContribucion(NroBono, Desde, Hasta) {
    var f_desde = Desde;
    var f_hasta =   Hasta;
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_BonoContribucion",
        data: '{NroBono: "' + NroBono + '", Desde: "' + f_desde + '", Hasta: "' + f_hasta + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_BonoContribucion_Cargada,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaBonos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaBonos_div").show();
        }
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_BonoContribucion_Cargada(Resultado) {
    Bonos = Resultado.d;
    var Tabla_Datos = "";
    Tabla_Titulo = "<table id='TablaBonos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Afiliado</th><th>NHC</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
    $.each(Bonos, function (index, bono) {
        var fecha = Fecha(parseJsonDate(bono.Pedido_Fecha));
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('../Impresiones/VentaalPublico_Impresion.aspx?Id=" + bono.Pedido_Id + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + bono.Nombre_Cliente + "</td><td>" + bono.NHC + "</td><td>" + fecha + "</td><td>" + bono.Usuario + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaBonos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

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
            'enableEscapeButton': false,
        });
}

function Fecha(d) {
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var output = (day < 10 ? '0' : '') + day + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    year;
    return output;
}

function formatJSONDate(jsonDate) {
    var newDate = dateFormat(jsonDate, "mm/dd/yyyy");
    return newDate;
}

$("#btnBuscar").click(function () {
    var valid = $("#frm_Main").valid();
    if (valid) {
        $("#controldesde").removeClass("error");
        $("#controlhasta").removeClass("error");
        $("#controlnroBono").removeClass("error");
        if (($("#nroBono").val()) == "")
            List_BonoContribucion(0, $("#desde").val(), $("#hasta").val());
        else
            List_BonoContribucion($("#nroBono").val(), null, null);
    }
});

//$("#btnCargarBono").click(function () {
//window.location = "BonoContribucion.aspx";
//});













