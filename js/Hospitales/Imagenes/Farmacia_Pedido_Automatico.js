var Array_Insumos = new Array();


function Validar() {
    if (Editando == -1) {
        if ($('#cbo_Medicamento').val() == 0 || $('#cbo_Medicamento').val() == null) { alert("Seleccione el insumo."); return false; }
    }    
    if ($('#txt_cantidad').val().trim().length == 0) { alert("Ingrese una cantidad."); return false; }
    return true;
}


$("#txt_filtro").keypress(function (event) {
    if (event.which == 13) {        
        List_Insumos($("#txt_filtro").val(), 0,0);        
    }
});


function List_Insumos(Nombre, Rubro, Presentacion) {
    $.ajax({
        type: "POST",
        data: '{Nombre: "' + Nombre + '", Rubro: "0", Presentacion: "0", Medida: "0"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Insumos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Insumos_Cargado,
        error: errores  
    });
}


function List_Insumos_Cargado(Resultado) {
    var Insumos = Resultado.d;
    $("#cbo_Medicamento").empty();
    $.each(Insumos, function (index, Insumo) {
        if (Insumo.REM_BAJA != "S")
        {
            $('#cbo_Medicamento').append($('<option>', { value: Insumo.REM_ID, text: Insumo.REM_NOMBRE + " " + Insumo.REM_GRAMAJE + " " + Insumo.REM_GRAMAJE_DESC + " " + Insumo.REM_UNIDADES }));            
        }
    });        
}





function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function fecha1esmayora2() {
    var fechaInicio = document.getElementById("txtFechaInicio");
    var fechaFin = document.getElementById("txtFechaFin");
    var anio = parseInt(fechaInicio.value.substring(6, 10));
    var mes = fechaInicio.value.substring(3, 5);
    var dia = fechaInicio.value.substring(0, 2);
    var c_anio = parseInt(fechaFin.value.substring(6, 10));
    var c_mes = fechaFin.value.substring(3, 5);
    var c_dia = fechaFin.value.substring(0, 2);

    if (c_anio * 10000 + c_mes * 1000 + c_dia >= anio * 10000 + mes * 1000 + dia)
        return (false);
    else {
        return (true);
    }
}




$(document).ready(function () {

    $("#txt_fecha1").mask("99/99/9999", { placeholder: "-" });
    $("#txt_fecha2").mask("99/99/9999", { placeholder: "-" });
    $("#txt_fecha1").datepicker();
    $("#txt_fecha2").datepicker();
    $("#txt_fecha2").val(FechaActual());
    

//    var currentDt = new Date();
//    var mm = currentDt.getMonth() + 1;
//    mm = (mm < 10) ? '0' + mm : mm;
//    var yyyy = currentDt.getFullYear();
//    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
//    var p = '01' + '/' + mm + '/' + yyyy;
//    $("#txtFechaInicio").val(p);
//    $("#txtFechaFin").val(d);

//    $("#TxtCpbt").mask("9?9999999");
//    $("#txtNroHC").mask("9?9999999999");      

});


$("#btn_agregar").click(function () {
    if (Validar()) {
        $("#div_fechas").hide();
        if (Editando != -1) {
            Array_Insumos[Editando].CANTIDAD = $("#txt_cantidad").val();
            Editando = -1;            
            RenderizarInsumos();
            $("#btn_cancelar").click();
        }
        else {
            if (!ExisteInsumo($("#cbo_Medicamento").val())) {
                var Objeto_Insumos = {};
                $("#txt_practica_id").val("");
                $("#cbo_practica_nombre").val("0");
                Objeto_Insumos.REM_ID = $("#cbo_Medicamento").val();
                Objeto_Insumos.InsumoNombre = $("#cbo_Medicamento :selected").html();
                Objeto_Insumos.CANTIDAD = $("#txt_cantidad").val();
                Objeto_Insumos.ELIMINADO = false;
                Array_Insumos.push(Objeto_Insumos);
                RenderizarInsumos();
                $("#btn_cancelar").click();
            }
            else {
                alert("Ya se ha cargado ese insumo.");
            }
        }
    }
});

$("#btn_cancelar").click(function () {
    $("#div_insumo").show();    
    $("#txt_cantidad").val("");
    Editando = -1;
    $("tr").removeClass("Amarillo");
});

function ExisteInsumo(Insumo) {
    var Existe = false;
    $.each(Array_Insumos, function (i) {
        if (Array_Insumos[i].ELIMINADO == false && Array_Insumos[i].REM_ID == Insumo) {
            Existe = true;
            return;
        }
    });
    return Existe;
}

function RenderizarInsumos() {
    $("#tabla_contenido").html("");    
    $.each(Array_Insumos, function (i) {
        if (Array_Insumos[i].ELIMINADO == false) {
            $('#tabla_contenido').append('<tr id="pos_' + i + '"><td><a class="Links" onclick="EditardeLista(' + Array_Insumos[i].REM_ID + ', ' + i + ');">Editar<a/><a class="Links" onclick="QuitardeLista(' + Array_Insumos[i].REM_ID + ');">Quitar<a/></td><td>' + Array_Insumos[i].InsumoNombre + '</td><td>' + Array_Insumos[i].CANTIDAD + '</td></tr>');            
        }
    });
}

var Editando = -1;
function QuitardeLista(Cual) {
    $.each(Array_Insumos, function (i) {
        if (Array_Insumos[i].REM_ID == Cual) {            
            Array_Insumos[i].ELIMINADO = true;
        }
    });
    RenderizarInsumos();
}

function EditardeLista(Cual, pos) {
    $("tr").removeClass("Amarillo");
    Editando = pos;    
    $("#txt_cantidad").val(Array_Insumos[pos].CANTIDAD);
    $("#div_insumo").hide();    
    $("#pos_" + pos).addClass("Amarillo");    
}


var Cargado = 0;
$("#btn_cargar").click(function () {
    Cargado = 1;
    TraerDatos();
});

var PedidoAutomatico = 0;

function TraerDatos() {

    if ($("#txt_fecha1").val() == "" || $("#txt_fecha2").val() == "") {
        alert("Revise las fechas desde y hasta");
        return;
    }

    $.ajax({
        type: "POST",
        data: '{Desde: "' + $("#txt_fecha1").val() + '", Hasta: "' + $("#txt_fecha2").val() + '", Especialidad: "0"}',
        url: "../Json/Imagenes/Imagenes.asmx/IMG_FAR_PEDIDO_CREAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Insumos = Resultado.d;
            $("#cbo_Medicamento").empty();
            $.each(Insumos, function (index, Insumo) {
                var Objeto_Insumos = {};
                PedidoAutomatico = Insumo.CAB_ID;
                Objeto_Insumos.REM_ID = Insumo.REM_ID;
                Objeto_Insumos.InsumoNombre = Insumo.REM_NOMBRE + " " + Insumo.GRAMAJE + " " + Insumo.MEDIDA + " " + Insumo.PRESENTACION;
                Objeto_Insumos.CANTIDAD = Insumo.CANTIDAD;
                Objeto_Insumos.ELIMINADO = false;
                Array_Insumos.push(Objeto_Insumos);
            });
            RenderizarInsumos();
            $("#div_fechas").hide();
        },
        error: errores
    });
}


$("#btnConfirmarPedido").click(function () {

    //ver que esta enviando la fecha vacia, debe ser porque borro el div, REVISAR ESO!!!!
    //TAMBIEN PONER LA FECHA DE HOY EN HASTA!!!

    var Desde = $("#txt_fecha1").val();
    var Hasta = $("#txt_fecha2").val();
    if (Desde == null) { Desde = ""; }
    if (Hasta == null) { Hasta = ""; }
    var json = JSON.stringify({ "Insumos": Array_Insumos, "PedidoID": PedidoAutomatico, "FechaDesde": Desde, "FechaHasta": Hasta, "Cargado": Cargado });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Imagenes/Imagenes.asmx/IMG_FAR_PEDIDO_GUARDAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Numero = Resultado.d;
            Imprimir(Numero);
        },
        error: errores
    });
});


function Imprimir(Numero) {
    var url = '../Impresiones/PPS_Print.aspx?Id=' + Numero;    
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
		    'onClosed': function () {
		        window.location.href = "Farmacia_Pedido_Automatico.aspx";
		    }
		});
}