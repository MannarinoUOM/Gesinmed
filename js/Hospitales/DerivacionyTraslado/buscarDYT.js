var idDYT = 0;
var Documento = 0;
var ID = 0;
var listaBusqueda = new Array();
//$(".fechas").datepicker({
//    dateFormat: 'dd/mm/yy',
//    changeMonth: true,
//    changeYear: true
//});

parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > Derivaciones y Traslados > <strong>Buscar</strong>";

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
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        ID = GET["ID"];
    }
});

$("#TxtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});

$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
   // maxDate: '0m',
    onClose: function (selectedDate) {
        $("#TxtDesde").datepicker("option", "maxDate", selectedDate);
    }
});

$(".fechas").keydown(function () { return false; });
cargarCentros();

$(".numero").keydown(function (event) {
    if (event.shiftKey) {
        event.preventDefault();
    }

    if (event.keyCode == 46 || event.keyCode == 8) {
    }
    else {
        if (event.keyCode < 95) {
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        }
        else {
            if (event.keyCode < 96 || event.keyCode > 105) {
                event.preventDefault();
            }
        }
    }
});

function cargarCentros() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 21 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboCentroOrigenDYT").append(new Option("Seleccione", 0));
            $("#cboCentroDestinoDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboCentroOrigenDYT").append(new Option(item.descripcion, item.id));
                $("#cboCentroDestinoDYT").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargarEspecialidadBUS(); }
    });
}

function cargarEspecialidadBUS() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesComboDT",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + 0 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboEspecialidadOrigenDYT").append(new Option("Seleccione", 0));
            $("#cboEspecialidadDestinoDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboEspecialidadOrigenDYT").append(new Option(item.Especialidad, item.Id));
                $("#cboEspecialidadDestinoDYT").append(new Option(item.Especialidad, item.Id));
            });
        },
        complete: function () { cargarMedicoBUS(); }
    });
}

function cargarMedicoBUS() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerMedicosComboDT",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + 0 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboMedicoDestinoDYT").append(new Option("Seleccione", 0));
            //            $("#cboMedicoDestino").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboMedicoDestinoDYT").append(new Option(item.Medico, item.Id));
                //                $("#cboMedicoDestino").append(new Option(item.Medico, item.Id));
            });
        },
        complete: function () { cargarSolicitado(); }
    });
}

function cargarSolicitado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 24 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboSolicitadoDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboSolicitadoDYT").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargaTraslado(); }
    });
}

function cargaTraslado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 23 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboTrasladadoDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboTrasladadoDYT").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargaPrestacion(); }
    });
}

function cargaPrestacion() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 22 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboPrestacionDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboPrestacionDYT").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargaSeguimiento(); }
    });
}

function cargaSeguimiento() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 27 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboSeguimientoDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboSeguimientoDYT").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargarEstado(); }
    });
}

function cargarEstado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 25 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboEstadoDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboEstadoDYT").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargarRechazos(); }
    });
}

function cargarRechazos() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 26 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboRechazosDYT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboRechazosDYT").append(new Option(item.descripcion, item.id));
            });
        }
    });
}

$("#BtnBuscarDYT").click(function () {
    var donde = "";
    if ($("#TxtDesde").val() == "" || $("#txtHasta").val() == "") { alert("Ingrese un Rango de Fecha"); return false; }
    if ($("#rdoAmbos").is(':checked')) { donde = "ambos"; }
    if ($("#rdoDesde").is(':checked')) { donde = "D"; }
    if ($("#rdoHasta").is(':checked')) { donde = "H"; }

    var json = JSON.stringify({
        "donde": donde
        , "FechaDesde": $("#TxtDesde").val()
        , "FechaHasta": $("#txtHasta").val()
        , "HC": $("#txtHC").val()
        , "centroOrigen": $('#cboCentroOrigenDYT option:selected').val()
        , "especialidadOrigen": $('#cboEspecialidadOrigenDYT option:selected').val()
        , "solicitadoPor": $('#cboSolicitadoDYT option:selected').val()
        , "centroDestino": $('#cboCentroDestinoDYT option:selected').val()
        , "especialidadDestino": $('#cboEspecialidadDestinoDYT option:selected').val()
        , "medicoDestino": $('#cboMedicoDestinoDYT option:selected').val()
        , "trasladadoPor": $('#cboTrasladadoDYT option:selected').val()
        , "prestacion": $('#cboPrestacionDYT option:selected').val()
        , "seguimiento": $('#cboSeguimientoDYT option:selected').val()
        , "rechazos": $('#cboRechazosDYT option:selected').val()
        , "estado": $('#cboEstadoDYT option:selected').val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/BuscarDYT",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
             listaBusqueda = Resultado.d;
             cargarTablaDYT(listaBusqueda);
        }
    });

});
//"'onclick='Eliminar(" + index + ")
function cargarTablaDYT(lista) {
    $("#TablaBusqueda").empty();
    var Contenido = "";
    var Pie = "";
    var Encabezado = "";
    Encabezado = "<table class='tabla table-hover table-condensed' style='width: 100%;'><thead style='height:0px'><tr><th style='padding:0px; text-align:center; width:2%'></th><th  style='width:12%'></th><th style='padding:0px; text-align:center; width:8%'></th><th style='padding:0px; text-align:center; width:30%;color:Black'></th><th style='padding:0px; text-align:center; width:20%;color:Black' ></th><th style='padding:0px; text-align:center; width:20%;color:Black'></th><th style='padding:0px; text-align:center; width:8%;color:Black'></th></tr></thead><tbody>";
    $.each(lista, function (index, item) {
        Contenido = Contenido + "<tr  class='filas' id='" + item.id + "'><td onclick='Edit(" + item.id + ") style='cursor:pointer'>" + (index + 1) + "</td><td style='cursor:pointer; font-size:x-small' onclick='Edit(" + item.id + ")'> " + item.fechaPedido + " </td><td style='cursor:pointer; font-size:x-small' onclick='Edit(" + item.id + ")'>" + item.horaPedido + "</td><td style='cursor:pointer; font-size:x-small' onclick='Edit(" + item.id + ")'>" + item.apellidoNombre + "</td><td style='cursor:pointer; font-size:x-small' onclick='Edit(" + item.id + ")'>" + item.origenNombre + "</td><td style='cursor:pointer; font-size:x-small' onclick='Edit(" + item.id + ")'>" + item.destinoNombre + "</td><td style='cursor:pointer; font-size:x-small' onclick='Edit(" + item.id + ")'>" + item.estadoNombre + "</td>";
    });
    Pie = "</tbody></table>";
    $("#TablaBusqueda").html(Encabezado + Contenido + Pie);
}
//
function Edit(indice) {
    idDYT = indice;
    $(".filas").css('background-color', '#dddddd');
    $("#" + indice).css('background-color', 'aqua');
}

$("#btnPlantillaDYT").click(function () {
    if (idDYT == 0) { alert("Seleccione un Elemento para Continuar."); return false; }
    document.location = "../DerivacionyTraslado/DerivacionyTraslado.aspx?Documento=" + Documento + "&opcion=1" + "&ID=" + ID + "&Generar=" + idDYT;
});

$("#btnVolverDYT").click(function () {
    document.location = "../DerivacionyTraslado/DerivacionyTraslado.aspx?Documento=" + Documento + "&opcion=1" + "&ID=" + ID;
});


$("#BtnImprimirDYT").click(function () {
    if (listaBusqueda.length <= 0) { alert("Realice una Busqueda Primero."); return false; }
    //if ($("#cboAgrupadoDYT").val() == 0) { alert("Seleccione un Criterio de Impresión."); }
    var ids = "";
    $.each(listaBusqueda, function (index, item) {
        ids = ids + item.id + ",";
    });

    if ($("#cboAgrupadoDYT").val() == 0) {

        $.fancybox({
            'autoDimensions': false,
            'href': "../Impresiones/Informe_DYT_Todos.aspx?TIPO_INFORME=" + $("#cboAgrupadoDYT").val() + "&IDS=" + ids + "&DESDE=" + $("#TxtDesde").val() + "&HASTA=" + $("#txtHasta").val() + "&PDF=1",
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'elastic',
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
    
    }
    else {
        $.fancybox({
            'autoDimensions': false,
            'href': "../Impresiones/Informe_DYT.aspx?TIPO_INFROME=" + $("#cboAgrupadoDYT").val() + "&IDS=" + ids + "&DESDE=" + $("#TxtDesde").val() + "&HASTA=" + $("#txtHasta").val() + "&PDF=1",
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'elastic',
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
    }
});

$("#btnVer").click(function () {
    if (idDYT == 0) { alert("Seleccione una Derivción para ver."); return false; }
    $.fancybox({
        'autoDimensions': false,
        'href': "../DerivacionyTraslado/DetalleDYT.aspx?ID=" + idDYT,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'elastic',
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

