$(document).ready(function () {
    cargarTabla();

    $(".moneda").live('keydown', function (e) {
        //alert(e.keyCode);
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 188]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
             return;
        }

        $(".moneda").mask('00.000,00', { reverse: true });

        if ($(this).val().trim().length > 0 && (e.keyCode == 190 || e.keyCode == 110) && ($(this).val().trim().indexOf('.') === -1) && ($(this).val().trim().indexOf(',') === -1)) return;

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

//    $.fancybox({
//        'onStart': function () {
//            $("#fancybox").css({ "overflow": "no" });

//        }
//    });

});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(".config").live("click", function () {


    var estado = 0;
    //alert($(this).attr('data'));
    switch ($(this).attr('data')) {
        case "1":
            estado = 0;
            break;

        case "0":
            estado = 1;
            break;
    }

    //alert($(this).attr('id'));

    var json = JSON.stringify({ "codigo": $(this).attr('id').replace("btn", ""), "estado": estado });
    //alert($(this).attr('id').replace("btn", ""));
    //alert(estado);
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/configurarProcedimientosPresupuestoOdontologia",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        complete: cargarTabla,
        error: errores
    });
});

function cargarTabla() {
    $.ajax({
        type: "POST",
        //url: "../Json/Odontologia.asmx/traerProcedimientosPresupuestoOdontologia",
        url: "../Json/Odontologia.asmx/TraerNomencladorOdontologico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var cabeza = "<table class='table' style='overflow:no'>";
            var fila = "";
            var pie = "</table>";
            var clase = "";
            var texto = "";
            $.each(Resultado.d, function (index, item) {
                //if (item.codigo == "0807") { alert(item.codigo); }
                
                if (item.MostrarEnPresupuesto == 1) { clase = "btn-warning"; texto = "Ocultar"; } else { clase = "btn-success"; texto = "Mostrar"; }
                fila += "<tr id='fila" + item.codigo + "' style='cursor:default'><td style='width:60%' id='descripcion" + item.codigo + "'>" + item.descripcion + "</td><td style='width:10%; text-aling:right'><a id='btn" + item.codigo + "' class='btn " + clase + " config' data='" + item.MostrarEnPresupuesto + "'>" + texto + "</a></td>" +
                "<td style='width:20%; text-aling:right'><a class='btn ' onclick=seleccionar('" + item.codigo.toString() + "')>Configurar Pagos</a></td></tr>";
                //<input type='text' class='moneda cantidad' maxlength='9' placeholder='Valor' style='width:70px'/>
            });
            $("#lista").html(cabeza + fila + pie);
        },
        error: errores
    });
}


function seleccionar(id) {
    //alert(id);
    //alert(id.toString() +"//"+ $("#descripcion" + id).html());
    //imprimir("../Odontologia/configurarPlanDePagoOdontologia.aspx?id=" + id + "&nombre=" + $("#descripcion" + id).html(), 0);
    $.fancybox({
        'href': "../Odontologia/configurarPlanDePagoOdontologia.aspx?id=" + id + "&nombre=" + $("#descripcion" + id).html(),
        'width': '100%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'autoSize' : false,
        'scrolling': 'none',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'overflow':'no',
        //'onClosed': retorno,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }

    });
}


//$(".moneda").live('focusout', function (e) {
//    $(".moneda").mask('0.000,00', { reverse: true });
//});