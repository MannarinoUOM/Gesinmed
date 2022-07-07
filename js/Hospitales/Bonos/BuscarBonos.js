var Todos = 0;
var objBusquedaLista = "";

$("#btnPrint").click(function () {
    var pac = " ";
    if ($('#txtAfiliado').val().trim().length > 0) pac = $('#txtAfiliado').val().trim();
    var nhc = 0;
    if ($('#txtNroHC').val().trim().length > 0) nhc = $('#txtNroHC').val().trim();
    Ventana("../Impresiones/BonosCancelados.aspx?Afiliado=" + pac + "&Desde=" + $('#txtFechaInicio').val() + "&Hasta=" + $('#txtFechaFin').val() + "&NHC=" + nhc);
});

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
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }
        });
}

function Cargar_Practicas() {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Listas_Total",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Practicas_Cargadas,
        error: errores
    });
}

function Cargar_Practicas_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#FiltroPracticas').empty();
    $.each(Practicas, function (index, p) {
        $('#FiltroPracticas').append('<label style="text-align:left;" class="checkbox"><input onclick="F_uno(' + p.id + ')"  id="Pr' + p.Id + '" type="checkbox" value="' + p.Id + '" checked>' + p.Practica + '</label>');
    });
}

function Fdes(Id) {
    $("#FiltroPracticas input").each(function () {
        $(this).removeAttr('disabled');
        $(this).removeAttr('checked', 'checked');
        $("#cbo_Todos").removeAttr('checked');
    });
}

function F_uno(Id) {
    $("#cbo_DesTodos").removeAttr('checked');
    $("#cbo_Todos").removeAttr('checked');
}

function Ft(Id) {
    $("#FiltroPracticas input").each(function () {
        if ($("#cbo_Todos").is(":checked")) {
            $(this).attr('checked', 'checked');
            $("#cbo_DesTodos").removeAttr('checked');
        }
        else {
            $(this).removeAttr('checked', 'checked');
        }
    });
}

function VerificarTodo() {
    objBusquedaLista = "";
    $(".checks").each(function () {
        if ($(this).is(":checked"))
            objBusquedaLista = objBusquedaLista + $(this).val() + ",";
    });
    Buscar();  
}

function Validar() {
    if ($('#txtFechaInicio').val().trim().length == 0) { alert("Ingrese fecha de inicio."); return false; }
    if ($('#txtFechaFin').val().trim().length == 0) { alert("Ingrese fecha de fin."); return false; }
    return true;
}

function Buscar() {
    if (!Validar()) return false;
    if (fecha1esmayora2()) { alert("La Fecha de inicio tiene que ser menor a la fecha final."); $("#ControlFechas").addClass("error"); $("#txtFechaInicio").focus(); return false; }
    var json = JSON.stringify({
        "Afiliado": $('#txtAfiliado').val().trim(),
        "Desde": $('#txtFechaInicio').val(),
        "Hasta": $('#txtFechaFin').val(),
        "NroComprobante": $("#TxtCpbt").val(),
        "nroHC": $("#txtNroHC").val(),
        "PracticaIds": objBusquedaLista,
        "Todos": $("#cbo_Todos").is(":checked")
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Bonos/BuscarBono.asmx/BonoBuscar_Con_Cancelados",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Buscar_Bonos_Cargados,
        error: errores,
        beforeSend: antes,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#table_b").show();
}

function antes() {
    $("#cargando").show();
    $("#table_b").hide();
}


function Buscar_Bonos_Cargados(Resultado) {
    var Bonos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    if (Bonos != null) {
        Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed'><thead><tr><th>Nro. Bono</th><th>Fecha</th><th>Nro HC</th><th>Paciente</th><th>Especialidad</th><th>Valor del Bono</th></tr></thead><tbody>";
        $.each(Bonos, function (index, bonos) {
            if (bonos.Cancelado)
                Tabla_Datos = Tabla_Datos + "<tr style='color:red;'";
            else Tabla_Datos = Tabla_Datos + "<tr ";
            if (bonos.apellido != "") {
                var str = bonos.Fecha.toString().split(" ");
                Tabla_Datos = Tabla_Datos + " onclick=MostrarBono('../Impresiones/ImpresionBono.aspx?id=" + bonos.Nro + "&Fecha=" + str[0] + "');";
            }
            Tabla_Datos = Tabla_Datos + "><td>" + bonos.Bono_Id + "</td><td>" + bonos.Fecha + "</td><td>" + bonos.cuil + "</td><td>" + bonos.apellido + "</td><td>" + bonos.Especialidad + "</td><td> $" + formatoMoneda(bonos.Valor) + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#table_b").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
    else $("#table_b").empty();
}

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

function MostrarBono(Pagina) {
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

		}
	        );
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$('#btn_Buscar_Bono').click(function () {
    VerificarTodo();
});

 
Cargar_Practicas();


$(document).ready(function () {

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").datepicker();
    $("#txtFechaInicio").datepicker();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFin").val(d);
    $("#check_todos").prop("checked", true);

});

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


$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
