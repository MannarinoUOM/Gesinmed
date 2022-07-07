var OSTTT = "";
var SeccionalTTT = "";

$(document).ready(function () {
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txt_Desde").datepicker();
    $("#txt_Hasta").datepicker();
    $("#txt_Desde").val(p);
    $("#txt_Hasta").val(d);
});


function Cargar_Seccionales_Lista(Cod) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Seccionales = Resultado.d;
            $('#TablaSeccionales').empty();
            var Datos = "";
            $.each(Seccionales, function (index, seccional) {
                Datos = Datos + "<tr><td><input onclick='sec();' id='S" + seccional.Nro + "' rel='" + seccional.Nro + "' type='checkbox' checked/></td><td class='AUusuario'>" + seccional.Seccional + "</td><td class='AUusuario'>&nbsp;</td><td class='AUusuario'>&nbsp;</td></tr>";
            });
            $('#TablaSeccionales').html(Datos);
        },
        error: errores
    });
}

Cargar_Seccionales_Lista(0);

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    clearTimeout(timer);
    alert('Error: ' + jsonObj.Message);
    window.close();
}


//$("#cb_Seccional").click(function () {
//    if (!$('#cb_Seccional').prop('checked')) {
//        $('#TablaSeccionales input[type=checkbox]').each(function () {
//            $(this).removeAttr("disabled");
//        });
//    }
//    else {
//        $('#TablaSeccionales input[type=checkbox]').each(function () {
//            $(this).attr("disabled", true);
//        });
//    }
//});

function sec() {
    $("#cb_Seccional").removeAttr("checked");
    $("#cb_ninguna_sec").removeAttr("checked");
}

$("#cb_Seccional").click(function () {
    if (!$('#cb_Seccional').prop('checked')) {
        $('#TablaSeccionales input[type=checkbox]').each(function () {
            $(this).removeAttr("checked");
        });
    }
    else {
        $("#cb_ninguna_sec").removeAttr("checked");
        $('#TablaSeccionales input[type=checkbox]').each(function () {
            $(this).attr("checked", true);
        });
    }
});

$("#cb_ninguna_sec").click(function () {
    if (!$('#cb_ninguna_sec').prop('checked')) {
        $('#TablaSeccionales input[type=checkbox]').each(function () {
            $(this).attr("checked", true);
        });
    }
    else {
        $("#cb_Seccional").removeAttr("checked");
        $('#TablaSeccionales input[type=checkbox]').each(function () {
            $(this).removeAttr("checked");
        });
    }
});




function Cargar_ObraSociales_Cargar(Cargar) {
    var json = JSON.stringify({
        "Id": "0"
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/ObraSocial/ObraSocial.asmx/CargarObraSocial",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var OSocial = Resultado.d;
            $('#TablaOSociales').empty();
            var Datos = "";
            $.each(OSocial, function (index, os) {
                Datos = Datos + "<tr><td><input onclick='os();' id='S" + os.id + "' rel='" + os.id + "' type='checkbox' checked/></td><td class='AUusuario'>" + os.OS + "</td><td class='AUusuario'>&nbsp;</td><td class='AUusuario'>&nbsp;</td></tr>";
            });
            $('#TablaOSociales').html(Datos);
        },
        error: errores
    });

}

Cargar_ObraSociales_Cargar(0);

function os() {
    $("#cb_OS").removeAttr("checked");
    $("#cb_ninguna_OS").removeAttr("checked");
}

$("#cb_OS").click(function () {
    if (!$('#cb_OS').prop('checked')) {
        $('#TablaOSociales input[type=checkbox]').each(function () {
            $(this).removeAttr("checked");
        });
    }
    else {
        $("#cb_ninguna_OS").removeAttr("checked");
        $('#TablaOSociales input[type=checkbox]').each(function () {
            $(this).attr("checked", true);
        });
    }
});

$("#cb_ninguna_OS").click(function () {
    if (!$('#cb_ninguna_OS').prop('checked')) {
        $('#TablaOSociales input[type=checkbox]').each(function () {
            $(this).attr("checked", true);
        });
    }
    else {
        $("#cb_OS").removeAttr("checked");
        $('#TablaOSociales input[type=checkbox]').each(function () {
            $(this).removeAttr("checked");
        });
    }
});


//var d = new Date();
//var month = d.getMonth() + 1;
//var day = d.getDate();
//var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();

//$("#txt_Desde").val(output);
//$("#txt_Hasta").val(output);

$("#btn_Buscar").click(function () {
    OSTTT = "";
    $('#TablaOSociales input[type=checkbox]').each(function () {
        if ($(this).prop('checked')) {
            OSTTT = OSTTT + $(this).attr('rel') + ",";
        }
    });

    SeccionalTTT = "";
    $('#TablaSeccionales input[type=checkbox]').each(function () {
        if ($(this).prop('checked')) {
            SeccionalTTT = SeccionalTTT + $(this).attr('rel') + ",";
        }
    });


    FInicio = $("#txt_Desde").val();
    FFin = $("#txt_Hasta").val();
    Seccionales = SeccionalTTT + "0";
    OS = OSTTT + "0";
    TodasSeccionales = $('#cb_Seccional').prop('checked');
    TodasOS = $('#cb_OS').prop('checked');

    Pagina = "../Impresiones/ImpresionListar_por_Fechas_Egresos.aspx?FInicio=" + FInicio + "&FFin=" + FFin + "&Seccionales=" + Seccionales + "&OS=" + OS + "&TodasSeccionales=" + TodasSeccionales + "&TodasOS=" + TodasOS;

    $.fancybox(
		{
		    'autoDimensions': false,
            'href': Pagina,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }
		});

});

