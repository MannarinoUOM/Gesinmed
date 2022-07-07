function parseJsonDate(jsonDateString) {
    return new Date(parseInt(jsonDateString.replace('/Date(', '')));
}

$(function () {
    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 116) {
            e.preventDefault();


            return false;

        }
    });

});

function formatoMoneda(num) {
    var p = num.toFixed(2).split(".");
    var chars = p[0].split("").reverse();
    var newstr = '';
    var count = 0;
    for (x in chars) {
        count++;
        if (count % 3 == 1 && count != 1) {
            newstr = chars[x] + ',' + newstr;
        } else {
            newstr = chars[x] + newstr;
        }
    }
    return newstr + "." + p[1];
}

function FechaActual() {
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var yyyy = currentDt.getFullYear();
    var date = dd + '/' + mm + '/' + yyyy;
    return(date);
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
    var date = dd + '/' + mm + '/' + yyyy;
    return (date);
}

function HoraActual(Expresion) {
    var currentHora = new Date();
    var HH = currentHora.getHours();
    HH = (HH < 10) ? '0' + HH : HH;
    var MM = currentHora.getMinutes();
    MM = (MM < 10) ? '0' + MM : MM;
    var SS = currentHora.getSeconds();
    SS = (SS < 10) ? '0' + SS : SS;
    if (Expresion == 'HHMMSS') {
        var Hora = HH + ':' + MM + ':' + SS;
    }
    else {
        var Hora = HH + ':' + MM;
    }
    return (Hora);
}


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


$.validator.addMethod("money", 
    function (value, element) {
        return this.optional(element) || /^(\d{1,3})(\.\d{2})$/.test(value);
    }, "Valor no válido");


function isDate(y, m, d) {
    var date = new Date(y, m - 1, d);

    var dd = date.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    var yyyy = date.getFullYear();

    var mm = date.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var convertedDate = yyyy + '' + mm + '' + dd;
    var givenDate = "" + y + '' + m + '' + d;
    return (givenDate == convertedDate);
}

function VerMas() {
    var ancho = 900;
    var alto = 600;
    var posicion_x = (screen.width / 2) - (ancho / 2);
    var posicion_y = (screen.height / 2) - (alto / 2);
    //var pagina = "../Pacientes/NuevoAfiliado.aspx?Documento=" + $("#CargadoDNI").html();
    var pagina = "../Pacientes/NuevoAfiliado.aspx?ID=" + $("#afiliadoId").val();
    var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
    window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
}



jQuery(function ($) {
    $.datepicker.regional['es'] =
      {
          clearText: 'Borra',
          clearStatus: 'Borra fecha actual',
          closeText: 'Cerrar',
          closeStatus: 'Cerrar sin guardar',
          prevStatus: 'Mostrar mes anterior',
          prevBigStatus: 'Mostrar año anterior',
          nextStatus: 'Mostrar mes siguiente',
          nextBigStatus: 'Mostrar año siguiente',
          currentText: 'Hoy',
          currentStatus: 'Mostrar mes actual',
          monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          monthStatus: 'Seleccionar otro mes',
          yearStatus: 'Seleccionar otro año',
          weekHeader: 'Sm',
          weekStatus: 'Semana del año',
          dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
          dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
          dayStatus: 'Set DD as first week day',
          dateStatus: 'Select D, M d',
          dateFormat: 'dd/mm/yy',
          firstDay: 0,
          initStatus: 'Seleccionar fecha',
          isRTL: false
      };

    $.datepicker.setDefaults($.datepicker.regional['es']);
});

jQuery('.SoloEnteros').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

function Fecha(d) { //Convierte a Fecha.... se usa junto con parseJsonDate
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var output = (day < 10 ? '0' : '') + day + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    year;
    return output;
}

function FechaMasMes(cant_meses) { //Fecha de Hoy mas x meses...
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var month = month + cant_meses;
    if (month > 12) {
        month = cant_meses;
        year = year + 1;
    }
    var output = (day < 10 ? '0' : '') + day + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    year;
    return output;
}

function dias(mes, anno) {
    //if (mes.charAt(0) == '0')
    //  mes = mes.charAt(1);
    mes = parseInt(mes);
    anno = parseInt(anno);
    switch (mes) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
        case 2: return (anno % 4 == 0) ? 29 : 28;
    }
    return 30;
}

function fecha_ultimo_dia_mes(mes, anno) {
    d = dias(mes, anno);
    f = d + "/" + mes + "/" + anno;
    return f;
}

function primer_dia_mes() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = '01';
    var year = d.getFullYear();
    var s = day + '/' + month + '/' + year;
    return s;
}