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

function FechaActual() {
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var yyyy = currentDt.getFullYear();
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