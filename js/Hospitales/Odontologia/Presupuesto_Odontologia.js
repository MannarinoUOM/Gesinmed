var lista = new Array();
var total = 0;
var id = 0;
var completando = 0;
var configuradoPago = 0;
var cantidadCuotas = 0;
var idPracticaConfigurada = 0;
var cuotaDelDia = 0;
var dejarIngresar = true;

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

    if (GET["cmp"] != "" && GET["cmp"] != null) {
        if (GET["cmp"] == 1) {
            $("#primero").hide();
            $("#segundo").hide();
            $("#intermedio").show();
        }
        if (GET["Np"] != "" && GET["Np"] != null) {
            id = GET["Np"]; mostrarDetalles(); completando = 1;
            $("#CargadoMedico").val(GET["medicoId"]);
            $("#afiliadoId").val(GET["afiliadoId"]);
        
         }
    }


    if (GET["saldo"] != "" && GET["saldo"] != null) { $("#txtSaldo").val(GET["saldo"]); }

    cargarCombo2();
    cargarCombo("CargadoMedico", "../Json/Odontologia.asmx/TraerOdontologos", 1, "");

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    hoy = dd + '/' + mm + '/' + yyyy;
    $("#CargadoFecha").html(hoy);


    $(".moneda").on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 188]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }

        $(".moneda").mask('0.000,00', { reverse: true });

        if ($(this).val().trim().length > 0 && (e.keyCode == 190 || e.keyCode == 110) && ($(this).val().trim().indexOf('.') === -1) && ($(this).val().trim().indexOf(',') === -1)) return;

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});


$("#btnAgregar").click(function () {
    if (configuradoPago == 1) {
        $(this).hide(); idPracticaConfigurada = $("#txtCodigo").val();
    } 

    if ($("#cboCodigo").val() == 0) { alert("Seleccione un Procedimiento."); return false; }
    if ($("#txtCantidad").val().trim().length == 0) { alert("Ingrese cantidad"); return false; }
    if ($("#txtCantidad").val() == 0) { alert("Ingrese cantidad"); return false; }
    if ($("#txtValor").val().trim().length == 0) { alert("Ingrese un valor"); return false; }



    var obj = {};
    obj.codigo = $("#txtCodigo").val();
    obj.descripcion = $("#cboCodigo option:selected").html();
    obj.cantidad = $("#txtCantidad").val();
    obj.valor = $("#txtValor").val();
    obj.valor = reemplazar(obj.valor);
    obj.valorMostrar = $("#txtValor").val();
    obj.cuotas = $("#cboCodigo option:selected").data("ncuotas");
    lista.push(obj);
    cargarTabla(lista);
    $("#txtCodigo").val("");
    $("#cboCodigo").val(0);
    $("#txtCantidad").val("");
    $("#txtValor").val("");
});

function cargarTabla(lista) {
    var mostrar = "inline";
    if (completando == 1) { mostrar = "none"; }

    var cabeza = "<table class='table' style='height:10px'>" +
                 "<tr style='background-color:Black; color:White'>" +
                 "<th style='width:10%'><b>&nbspCódigo</b></th><th style='width:48%'><b>Descripción</b></th><th style='width:10%'><b>Cantidad</b></th><th style='width:13%'><b>Valor Unitario</b></th><th style='width:10%'><b>Valor Total</b></th><th style='width:10%; display:"+ mostrar +"' ><b>Eliminar</b></th>" +
                 "</tr>";
    var fila = "";
    var pie = "</table>";

    $.each(lista, function (index, item) {

        var s = (item.valor * item.cantidad);
        s = parseFloat(s, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
        s = formatear(s);

        if (completando == 1) {
            item.valorMostrar = parseFloat(item.valorMostrar, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
            item.valorMostrar = formatear(item.valorMostrar);
        }

        fila += "<tr><td class='celdaChica'>" + item.codigo + "</td>" +
        "<td class='celdaChica'>" + item.descripcion + "</td>" +
        "<td class='celdaChica'>" + item.cantidad + "</td>" +
        "<td class='celdaChica'>" + item.valorMostrar + "</td>" +
        "<td class='celdaChica valor'>" + s + "</td>" +
        "<td class='celdaChica' style='display:" + mostrar + "'><a onclick='eliminar(" + index + ")' class='btn btn-mini btn-danger'><i class='icon-remove-circle'></i>&nbsp;&nbsp;Eliminar</a></td></tr>";
    });

    if (completando == 1) { $("#mostrar").html(cabeza + fila + pie); } else { $("#listaPresupuesto").html(cabeza + fila + pie); }
    if ($("#cboCodigo option:selected").data("ncuotas") == undefined) { $("#cantidadCuotas").html("<b>Cantidad de Cuotas: </b>"); } 
    else { $("#cantidadCuotas").html("<b>Cantidad de Cuotas: " + $("#cboCodigo option:selected").data("ncuotas") + "</b>"); }
    total = 0;
    calcularTotal();
}

$("#txtCodigo").keyup(function () { $("#cboCodigo").val($(this).val()); });


function verficarSeleccion(comparar) {
    var r = true;
    $.each(lista, function (index, item) { if (item.cuotas != comparar || item.codigo == $("#cboCodigo option:selected").val()) { r = false; } });
    return r;
}

//$("#cboCodigo").click(function () { console.log($(this).attr('disabled')); });

$("#cboCodigo").change(function () {
    //verficarSeleccion($("#cboCodigo option:selected").data("ncuotas"));
    //alert(configuradoPago);
    //if (configuradoPago == 1) { alert("No es posible agregar un item con distinto plan de pago. Para hacerlo, debe ingresar un nuevo presupuesto."); $("#cboCodigo").val(0); return false; }
    if (!verficarSeleccion($("#cboCodigo option:selected").data("ncuotas"))) { alert("No es posible agregar un item con distinto plan de pago. Para hacerlo, debe ingresar un nuevo presupuesto."); $("#cboCodigo").val(0); return false; }

    if ($("#cboCodigo option:selected").data("valor") > 0) {
        var valor = $("#cboCodigo option:selected").data("valor");
        valor = parseFloat(valor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
        valor = formatear(valor);

        $("#txtValor").val(valor);
        $("#txtValor").attr('disabled', true);
        $("#txtCantidad").val(1);
        $("#txtCantidad").attr('disabled', true);
        $("#txtCodigo").attr('disabled', true);
        //    $("#cboCodigo").attr('disabled', true);
        configuradoPago = 1;

        // $(".btn-mini").each(function (index, item) { $(this).click(); });
    } else {
        configuradoPago = 0;
        $("#txtValor").val("");
        $("#txtValor").attr('disabled', false);
        $("#txtCantidad").val("");
        $("#txtCantidad").attr('disabled', false);
        $("#txtCodigo").attr('disabled', false);
        $("#btnAgregar").show();

    }
    if ($(this).val() > 0) { $("#txtCodigo").val($(this).val()); } else { $("#txtCodigo").val(""); }
});

function calcularTotal() {
    $(".valor").each(function (index, item) {
        var f = $(this).html();
        f = reemplazar(f);
        total = parseFloat(total) + parseFloat(f);
    });

    total = parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
     total = formatear(total);
    $("#txtTotal").val(total);
 }

 function eliminar(index) {
     if (configuradoPago == 1) {
         $("#txtValor").val("");
         $("#txtValor").attr('disabled', false);
         $("#txtCantidad").val("");
         $("#txtCantidad").attr('disabled', false);
         $("#txtCodigo").attr('disabled', false);
         $("#cboCodigo").attr('disabled', false);
         $("#btnAgregar").show();
         configuradoPago = 0;
      }
     lista.splice(index, 1); cargarTabla(lista);
     if (lista.length <= 0) {dejarIngresar = true;}
}

$("#btnVolverPrimero").click(function () {
    $("#primero").fadeIn(1500);
    $("#segundo").hide();
});

$("#btnSiguiente").click(function () {
    if (lista.length == 0) { alert("Cargue algun codigo para continuar."); return false; }
    if ($("#CargadoMedico").val() == 0) { alert("Seleccione algun Medico para continuar."); return false; }
    $("#txtSaldo").val($("#txtTotal").val());

    if (configuradoPago == 1) { traerPagosConfig(); } else { pagoComun(); }

    $("#tercero").fadeIn(1500);
    $("#segundo").hide();
});

$("#btnVolverSegundo").click(function () {
    if (completando == 1) {
        $("#intermedio").show();
        $("#tercero").hide();
     } else {
        $("#segundo").fadeIn(1500);
        $("#tercero").hide();
    }

});

$("#btnImprimir").click(function () {
    if ($("#cboPagosConf option:selected").val() == 0) { alert("Seleccione una Cuota a pagar"); return false; }

    if (completando == 1) { guardarPago(); } else { guardar(); }
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function guardar() {
    var obj = {};
    obj.id = id;
    obj.medico = $("#CargadoMedico").val();
    obj.afiliadoId = $("#afiliadoId").val();
    obj.fecha = $("#CargadoFecha").html();

    var json = JSON.stringify({ "item": obj });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/PresupuestoOdontologiaGuardarCAB",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            id = Resultado.d;
            guardarDet(id);
        },
        error: errores
    });
}

function guardarDet(id) {
    var json = JSON.stringify({ "lista": lista, "idCab": id });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/PresupuestoOdontologiaGuardarDET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) { guardarPago(); },
        error: errores
    });
}


function guardarPago() {
    if ($("#cboPagosConf option:selected").val() == 0) { alert("Seleccione una Cuota a pagar"); return false; }
    var lista = new Array();
    cuotaDelDia = $("#cboPagosConf option:selected").val();
    //alert("completando: " + completando);
        if (completando == 1) {// cuando se van pagando las cuotas
                    var cuota = {};
                    cuota.idCab = id;
                    cuota.Cuota = $("#cboPagosConf option:selected").val();
                    cuota.Valor = reemplazar($("#cboPagosConf option:selected").data('valor'));
                    cuota.saldada = 1;
                    lista.push(cuota);

                    var json = JSON.stringify({ "lista": lista, "guardar": 0 });
                    $.ajax({
                        type: "POST",
                        data: json,
                        url: "../Json/Odontologia.asmx/PresupuestoOdontologiaGuardarPlanPago",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (Resultado) {
                            alert("Guardado");
                            imprimirCupon("../Impresiones/Odontologia/Cupon_Pago_Odontologia.aspx?Npresupuesto=" + id + "&cuota=" + cuotaDelDia);
                        },
                        error: errores
                    });
                }

                if (completando == 0) {//para generar el plan de pagos
            $("#cboPagosConf option").each(function () {
                if ($(this).attr('value') > 0) {
                    var cuota = {};
                    cuota.idCab = id;
                    cuota.Cuota = $(this).attr('value');
                    cuota.Valor = reemplazar($(this).data('valor'));

                    if ($(this).val() == $("#cboPagosConf option:selected").val()) { cuota.saldada = 1; } else { cuota.saldada = 0; }

                    lista.push(cuota);
                   // alert(cuota.idCab + "//" + cuota.Cuota + "//" + cuota.Valor);
                }
            });
            var json = JSON.stringify({ "lista": lista, "guardar": 1 });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Odontologia.asmx/PresupuestoOdontologiaGuardarPlanPago",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    alert("Guardado");
                    imprimirCupon("../Impresiones/Odontologia/Cupon_Pago_Odontologia.aspx?Npresupuesto=" + id + "&cuota=" + cuotaDelDia);
                },
                error: errores
            });
         }
         //console.log(lista.length);
}

function reemplazar(valor) {
    var retorno = "";
    $.each(valor, function (index, item) {
        switch (item) {
            case ",":
                retorno += ".";
                break;
            case ".":
                retorno += "";
                break;
            default:
                retorno += item;
                break;
        }
    });

    return retorno;
}

function formatear(valor) {
    var retorno = "";

    $.each(valor, function (index, item) {
        switch (item) {
            case ",":
                retorno += ".";
                break;
            case ".":
                retorno += ",";
                break;
            default:
                retorno += item;
                break;
        }
    });
    return retorno;
}

function retorno2() { document.location = "../Odontologia/Presupuesto_Odontologia.aspx"; }

function mostrarDetalles() {
    var json = JSON.stringify({ "Npresupuesto": id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/TraerDetallePresupuestosOdontologia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) { cargarTabla(Resultado.d); },
        error: errores
    });
}

$("#btnFinal").click(function () {
    $("#intermedio").hide();
    $("#tercero").show();
    var json = JSON.stringify({ "Npresupuesto": id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/TraerCuotasActualizarPresupuestosOdontologia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#cboPagosConf").empty();
            $("#cboPagosConf").append("<option value='0'>Seleccione Cuota</option>");
            var lista = Resultado.d;
            $.each(lista, function (index, item) {
                item.valor = parseFloat(item.valor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                item.valor = formatear(item.valor);
                var color = "";
                if (item.saldada == 1) { color = "#BDBDBD"; }
                $("#cboPagosConf").append("<option value='" + item.cuota + "' data-valor='" + item.valor + "' data-saldada='" + item.saldada + "' style='background-color:" + color + "' >Cuota " + item.cuota + " $ " + item.valor + "</option>");
            });
        },
        error: errores
    });
});

$("#btnVolver").click(function () { document.location = "../Odontologia/Buscar_Presupuesto_Odontologia.aspx"; });

$("#btnConfigurar").click(function () { imprimir("../Odontologia/ConfigurarPracticasPresupuestoOdontologia.aspx", 1); });

function retorno() { cargarCombo2(); }

function cargarCombo2() {
    $("#cboCodigo").empty();
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/traerProcedimientosPresupuestoOdontologia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;

            $("#cboCodigo").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboCodigo").append("<option value='" + item.codigoText.toString() + "' data-valor='" + item.valorConfigurado + "' data-Ncuotas='" + item.cuotas + "'>" + item.descripcion + "</option>");
            });
        }
    });
}

function traerPagosConfig() {
    $("#cboPagosConf").empty();
    var json = JSON.stringify({ "practicaId": idPracticaConfigurada });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/OdontologiaTraerPlanPago",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboPagosConf").append("<option value='0'>Seleccione Cuota</option>");
            $.each(lista, function (index, item) {
                item.valor = parseFloat(item.valor, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
                item.valor = formatear(item.valor);
                $("#cboPagosConf").append("<option value='" + item.Ncuota + "' data-valor='" + item.valor + "' >Cuota " + item.Ncuota + " $ " + item.valor + "</option>");
            });
        },
        error: errores
    });
}

$("#cboPagosConf").on('change', function () {
    if ($("#cboPagosConf option:selected").data("saldada") == 1) { $("#cboPagosConf").val(0); }
});

function pagoComun() {
    $("#cboPagosConf").empty();
    total = reemplazar(total);
    var mitad = total / 2;
    mitad = parseFloat(mitad, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
    mitad = formatear(mitad);
    $("#cboPagosConf").append("<option value='" + 0 + "' data-valor='" + 0 + "' >Selecione Cuota</option>");
    $("#cboPagosConf").append("<option value='" + 1 + "' data-valor='" + mitad + "' >Cuota " + 1 + " $ " + mitad + "</option>");
    $("#cboPagosConf").append("<option value='" + 2 + "' data-valor='" + mitad + "' >Cuota " + 2 + " $ " + mitad + "</option>");
}

function imprimirCupon(ruta) {
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
        'onClosed': retorno2,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }

    });
}