var totalOS = 0;
var totalPR = 0;
var practicas = "";
var obrasSociales = "";
var todasOS = "";
var todasPR = "";

$(document).ready(function () {
    primerUltimoDia("txtDesde", 1);
    primerUltimoDia("txtHasta", 2);
    cargarObrasSociales();
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function cargarObrasSociales() {
    var aux = "";
    $.ajax({
        type: "POST",
        url: "../Json/ranking_SN.asmx/ObraSocial_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var cabeza = "<table class=' table-hover lista1' style='display:none'><th><tr><td style='width:600px'></td><td style='width:10px'></td></th></tr>";
            var fila = "";
            var pie = "</table>";

            fila = "<tr style='height:30px'><td><input type='text' id='txtBuscarOS' style='width:100%;background-color:Gray;margin:0px' placeholder='Acotar Obras Sociales'/></td><td></td></tr>";

            $.each(resultado.d, function (index, item) {
                fila += "<tr style='cursor:pointer'  onclick='seleccionaOS(" + item.obraSocialId + ")' ><td  class='OS'>" + item.obraSocial + "</td><td><input type='checkbox'  checked='checked' id='OS" + item.obraSocialId + "' class='chkOs'/></td></tr>";
                todasOS += item.obraSocialId + ",";
            });
            totalOS = resultado.d.length;
            $("#obrasSociales").html(cabeza + fila + pie);
        },
        error: errores,
        complete: function () {
            $("#idsObrasSociales").val(todasOS);
            $(".lista1").show(); $("#img1").hide(); cargarPracticas(); }
    });

}

function cargarPracticas() {
    var aux = "";
    $.ajax({
        type: "POST",
        url: "../Json/ranking_SN.asmx/Practica_List_Codigo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var cabeza = "<table class=' table-hover lista2' style='display:none'><th><tr><td style='width:600px'></td><td style='width:10px'></td></th></tr>";
            var fila = "";
            var pie = "</table>";

            fila = "<tr style='height:30px'><td><input type='text' id='txtBuscarPR' style='width:100%;background-color:Gray;margin:0px' placeholder='Acotar prácticas'/></td><td></td></tr>";

            $.each(resultado.d, function (index, item) {
                fila += "<tr style='cursor:pointer' onclick='seleccionaPR(" + item.practicaId + ")' ><td class='PR'>" + item.practica + "</td><td><input type='checkbox'  checked='checked' id='PR" + item.practicaId + "' class='chkPractica'/></td></tr>";
                $("#idsPracticas").val += $("#idsPracticas").val + item.practicaId + ",";
                todasPR += item.practicaId + ","
            });
            totalPR = resultado.d.length;
            $("#practicas").html(cabeza + fila + pie);
        },
        complete: function () {
            $("#idsPracticas").val(todasPR);
         $(".lista2").show(); $("#img2").hide(); },
        error: errores
    });
}

/////FECHAS 
$(".desde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //maxDate: '0m',
    onClose: function (selectedDate) {
        $(".hasta").datepicker("option", "minDate", selectedDate);
    }
});

$(".hasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    // maxDate: '0m',
    onClose: function (selectedDate) {
        $(".desde").datepicker("option", "maxDate", selectedDate);
    }
});

$(".desde").on('keydown', function (e) { e.preventDefault(); });
$(".hasta").on('keydown', function (e) { e.preventDefault(); });

/////NUMERO ENTEROS
$(".numeroEntero").on('keydown', function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

//primerUltimoDia("desde", 1);
//primerUltimoDia("hasta", 2);
////PRIMER/ULTIMO DIA DEL MES
// contol es el id del control
//dia 1 = primer dia, 2 = ultimo dia
function primerUltimoDia(control, dia) {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var PDia = "0" + primerDia.getDate();
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var mes = (date.getMonth() + 1);
    var ano = date.getFullYear();

    if (mes.toString().length < 2) { mes = "0" + mes; }

    if (dia == 1) { $("#" + control).val(PDia + "/" + mes + "/" + ano); }
    else { $("#" + control).val(ultimoDia.getDate() + "/" + mes + "/" + ano); }

}

$("#chkTodOs").click(function () {
    if ($(this).is(':checked')) { $(".chkOs").attr('checked', true); $("#idsObrasSociales").val(todasOS); } else { $(".chkOs").attr('checked', false); obrasSociales = ""; $("#idsObrasSociales").val(""); }
});

$("#chkTdcpr").click(function () {
    if ($(this).is(':checked')) { $(".chkPractica").attr('checked', true); $("#idsPracticas").val(todasPR);  } else { $(".chkPractica").attr('checked', false); practicas = ""; $("#idsPracticas").val(""); }
});

function seleccionaOS(id) {
    var cuantos = 0;
    $("#OS" + id).attr('checked', !$("#OS" + id).is(':checked'));
    $(".chkOs").each(function (index, item) { if ($(this).is(':checked')) { cuantos += 1; } });
    if (cuantos < totalOS) { $("#chkTodOs").attr('checked', false); }

    var aux = $("#idsObrasSociales").val().toString();
    if ($("#OS" + id).is(':checked')) { $("#idsObrasSociales").val(aux += (id + ",").toString()); } else { $("#idsObrasSociales").val($("#idsObrasSociales").val().toString().replace("," + id, "")); } 
}
function seleccionaPR(id) {
    var cuantos = 0;
    $("#PR" + id).attr('checked', !$("#PR" + id).is(':checked'));
    $(".chkPractica").each(function (index, item) { if ($(this).is(':checked')) { cuantos += 1; } });
    if (cuantos < totalPR) { $("#chkTdcpr").attr('checked', false); }

    var aux = $("#idsPracticas").val().toString();
    if ($("#PR" + id).is(':checked')) { $("#idsPracticas").val(aux += (id + ",").toString()); } else { $("#idsPracticas").val($("#idsPracticas").val().toString().replace("," + id, "")); }
}

$(".imprimir").click(function () {
    var PDF = 1;
    var ordena = 0;
    var orden = 0;
    var incluirOs = 0;
    var incluirPr = 0;
    var cantidad = 0;
    if ($(this).attr('id') == "btnPDF") { PDF = 1; } else { PDF = 0; }
    if ($("#rdoOs").is(':checked')) { ordena = 2; } else { ordena = 1; }
    if ($("#rdoAsc").is(':checked')) { orden = 2; } else { orden = 1; }
    if ($("#chkIncOs").is(':checked')) { incluirOs = 1; } else { incluirOs = 0; }
    if ($("#chkIncPr").is(':checked')) { incluirPr = 1; } else { incluirPr = 0; }
    if ($("#txtCantidad").val() == 0 || $("#txtCantidad").val().trim().length <= 0) { cantidad = 0; } else { cantidad = $("#txtCantidad").val(); }

    // alert("ordena: " + ordena + " orden: " + orden)

    if (!validarOs()) { alert("Seleccione por lo menos una obra social"); return false; }
    if (!validarPractica()) { alert("Seleccione por lo menos una práctica"); return false; }

    $.fancybox({
        'href': "../Impresiones/ranking_SN.aspx?desde=" + $("#txtDesde").val() + "&hasta=" + $("#txtHasta").val() + "&os=0&cantidad=" + cantidad + "&ordena=" + ordena + "&orden=" + orden + "&incluiros=" + incluirOs + "&obrassociales=" + obrasSociales + "&incluirPractica=" + incluirPr + "&practicas=" + practicas + "&PDF=" + PDF,
        'width': '80%',
        'height': '80%',
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

function validarOs() {//PR OS
    var cuantosOS = 0;
    obrasSociales = "";
    $(".chkOs").each(function (index, item) { if ($(this).is(':checked')) { obrasSociales += $(this).attr('id').toString().replace("OS", "") + ","; cuantosOS += 1; } });
    if (cuantosOS < 0) { return false; } else { return true; }
}
function validarPractica() {
    var cuantosPR = 0;
    practicas = "";
    $(".chkPractica").each(function (index, item) { if ($(this).is(':checked')) { practicas += $(this).attr('id').toString().replace("PR", "") + ","; cuantosPR += 1; } });
    if (cuantosPR < 0) { return false; } else { return true; }
}

$("#txtBuscarOS").live('keyup', function () {
//$("#txtBuscarOS").on("keyup", function (e) {
    $(this).val(function () {
        return $(this).val().toUpperCase();
    })

    var busqueda = $("#txtBuscarOS").val().toString().toUpperCase();

    $("#obrasSociales td").each(function (index) {
        if ($(this).attr("class") == "OS" && busqueda == $(this).html().toString().substr(0, $("#txtBuscarOS").val().trim().length)) { $(this).parent().fadeIn(100); }

        if ($(this).attr("class") == "OS" && busqueda != $(this).html().toString().substr(0, $("#txtBuscarOS").val().trim().length)) { $(this).parent().fadeOut(100); }
    });
});

$("#txtBuscarPR").live('keyup', function(){
//$("#txtBuscarPR").on("keyup", function (e) {

    $(this).val(function () {
        return $(this).val().toUpperCase();
    })

    var busqueda = $("#txtBuscarPR").val().toString().toUpperCase();

    $("#practicas td").each(function (index) {
        if ($(this).attr("class") == "PR" && busqueda == $(this).html().toString().substr(0, $("#txtBuscarPR").val().trim().length)) { $(this).parent().fadeIn(100); }

        if ($(this).attr("class") == "PR" && busqueda != $(this).html().toString().substr(0, $("#txtBuscarPR").val().trim().length)) { $(this).parent().fadeOut(100); }
    });
});


//$("#btnExcel").click(function () {

//    $("#idsObrasSociales").text(obrasSociales);
//    $("#idsPracticas").text(practicas);
//});