

/////NUMERO DECIMALES
$(".numeroDecimal").on('keydown', function (e) {
    //alert(e.keyCode);
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ($(this).val().trim().length > 0 && (e.keyCode == 190 || e.keyCode == 110) && ($(this).val().trim().indexOf('.') === -1)) return;

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

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


////CANTIDAD DE CARACTERES
$(".cantidad").on('keydown', function (e) {
$(".cantidad").attr('maxlength', $(this).attr('name'));
});


/////FECHAS 
$(".desde1").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //maxDate: '0m',
    onClose: function (selectedDate) {
        $(".hasta1").datepicker("option", "minDate", selectedDate);
    }
});

$(".hasta1").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    // maxDate: '0m',
    onClose: function (selectedDate) {
        $(".desde1").datepicker("option", "maxDate", selectedDate);
    }
});

$(".desde2").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //maxDate: '0m',
    onClose: function (selectedDate) {
        $(".hasta2").datepicker("option", "minDate", selectedDate);
    }
});

$(".hasta2").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    // maxDate: '0m',
    onClose: function (selectedDate) {
        $(".desde2").datepicker("option", "maxDate", selectedDate);
    }
});

////MASCARA Y FECHA DEL DIA
$(".fechaMask").mask("99/99/9999", { placeholder: "-" });
$(".fechaHoy").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true
});
$(".fechaHoy").datepicker('setDate', 'today');

$(".fechaHoy").keydown(function () {
    return false;
});
/////FECHA
$(".fecha").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true
});

//primerUltimoDia("desde", 1);
//primerUltimoDia("hasta", 2);
////PRIMER/ULTIMO DIA DEL MES
// contol es el id del control
//dia 1 = primer dia, 2 = ultimo dia
function primerUltimoDia(control,dia) {
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var PDia = "0" + primerDia.getDate();
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var mes = (date.getMonth() + 1);
    var ano = date.getFullYear();

    if (mes.toString().length < 2) { mes = "0" + mes; }

    if (dia == 1) { $("#" +  control).val(PDia + "/" + mes + "/" + ano); }
    else { $("#" + control).val(ultimoDia.getDate() + "/" + mes + "/" + ano); }

}

///cargarCombo("control", "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesCombo", 1,'{id: "' + 0 + '"}');
////CARGAR COMBO
//control es el control a cargar
//sleccione 1 o 2 para mostrar o no esta opcion
// la data del ajax
function cargarCombo(control, url, seleccione, datos) {
    $("#" + control).empty();
    if (datos != '') {
        var json = JSON.stringify(datos);
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                if (seleccione == 1) { $("#" + control).append(new Option("Seleccione", 0)); }

                $.each(lista, function (index, item) {
                    $("#" + control).append(new Option(item.descripcion, item.id));
                });
            },
            complete: reSeleccionar
        });
    } else {

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            if (seleccione == 1) { $("#" + control).append(new Option("Seleccione", 0)); }
            if (seleccione == 2) { $("#" + control).append(new Option("TODAS", 0)); }

            $.each(lista, function (index, item) {
                $("#" + control).append(new Option(item.descripcion, item.id));
            });
        }
    });
}
}


/////IMPRIMIR
function imprimir(ruta, alCerrar) {
    if (alCerrar == 1) {
        $.fancybox({
            'href': ruta,
            'width': '80%',
            'height': '80%',
            'autoScale': false,
            'transitionIn': 'elastic',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onClosed': retorno,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }

        });
    } else {
        $.fancybox({
            'href': ruta,
            'width': '100%',
            'height': '80%',
            'autoScale': false,
            'transitionIn': 'elastic',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            //'onClosed': retorno,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }

        });   
    }
}


////DISPARADOR  IDAR
//la clase validar va en los controles a validar
// la calse disparador en los controles que inician la validacion
// el ref es el mensaje a motrar
// los combos se validan con id = 0
function validar() {
    var mensaje = "Falta Ingresar o seleccionar ";
    var inputs = "";
    var combos = "";
    var salir = 0;

    $(".validar").each(function (index, item) {
        switch ($(this).prop("tagName")) {
            case "INPUT":
                if ($(this).val().trim().length <= 0) {
                    inputs = inputs + "," + $(this).attr('ref');
                    salir = 1;
                    //$(this).addClass("error");
                }
                break;

            case "SELECT":
                if ($(this).val() == 0) {
                    combos = combos + "," + $(this).attr('ref');
                    salir = 1;
                }
                break;
        }
    });

    if (salir == 1) {
        alert(mensaje + inputs + combos);
        return false;
    } else {return true;}

}

function reestablecer(lista) {
    $(".restablecer").each(function (index, item) {
        switch ($(this).prop("tagName")) {
            case "INPUT":
                $(this).val("");
                if ($(this).attr('type') == 'checkbox') { $(this).attr('checked', false); }
                break;

            case "SELECT":
                $(this).val(0);
                break;

            case "TEXTAREA":
                $(this).val("");
                break;
        }
    });
    //alert(lista.length);
    $.each(lista, function (index, item) { item.length = 0; });
    $(".deshabilitar").attr('disabled', true);
}

//VALIDAR FORMATO FECHA, FECHA VALIDA
function validaFechaDDMMAAAA(fecha) {
    var dtCh = "/";
    var minYear = 1900;
    var maxYear = 2100;
    function isInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        return true;
    }
    function stripCharsInBag(s, bag) {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }
    function daysInFebruary(year) {
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    }
    function DaysArray(n) {
        for (var i = 1; i <= n; i++) {
            this[i] = 31
            if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
            if (i == 2) { this[i] = 29 }
        }
        return this
    }
    function isDate(dtStr) {
        var daysInMonth = DaysArray(12)
        var pos1 = dtStr.indexOf(dtCh)
        var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
        var strDay = dtStr.substring(0, pos1)
        var strMonth = dtStr.substring(pos1 + 1, pos2)
        var strYear = dtStr.substring(pos2 + 1)
        strYr = strYear
        if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
        if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
        for (var i = 1; i <= 3; i++) {
            if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
        }
        month = parseInt(strMonth)
        day = parseInt(strDay)
        year = parseInt(strYr)
        if (pos1 == -1 || pos2 == -1) {
            return false
        }
        if (strMonth.length < 1 || month < 1 || month > 12) {
            return false
        }
        if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
            return false
        }
        if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
            return false
        }
        if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
            return false
        }
        return true
    }
    if (isDate(fecha)) {
        return true;
    } else {
        return false;
    }
}