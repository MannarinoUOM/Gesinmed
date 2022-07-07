function ChequearTodo() {
    objBusquedaListaMedico = " ";
    objBusquedaListaEspecialidad = " ";

    if ($("#cbo_Todos_Especialidades").is(':checked')) {
        objBusquedaListaEspecialidad = "0";
    }
    else {
        $(".cbE").each(function () {
            if ($(this).is(':checked')) {
                objBusquedaListaEspecialidad = objBusquedaListaEspecialidad + $(this).val() + ",";
            }
        });
    }


    if ($("#cbo_Todos_Medicos").is(':checked')) {
        objBusquedaListaMedico = "0";
    }
    else {
        $(".cbM").each(function () {
            if ($(this).is(':checked')) {
                objBusquedaListaMedico = objBusquedaListaMedico + $(this).val() + ",";
            }
        });
    }

    var Todos = false;
    if ($("#chkTodo").is(":checked")) Todos = true;

    var Pagina = "../Impresiones/ImpresionTodoslosTurnos.aspx?MedicosId=" + objBusquedaListaMedico + "&EspecialidadesId=" + objBusquedaListaEspecialidad + "&FechaInicio=" + $("#txtFechaInicio").val() + "&FechaFin=" + $("#txtFechaFin").val() + "&Todos=" + Todos;

    //Pagina = Pagina.slice(0, -1);
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
		    'preload': true,
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onComplete': function f() {
		        jQuery.fancybox.showActivity();
		        jQuery('#fancybox-frame').load(function () {
		            jQuery.fancybox.hideActivity();
		        });
		    }
		}
	        );



}



$(document).ready(function () {

    $("#txtFechaFin").datepicker();
    $("#txtFechaInicio").datepicker();

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = dd + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFin").val(p);


});



function Fe() {
    $("#FiltroEspecialidad input").each(function () {
        if ($("#cbo_Todos_Especialidades").is(':checked')) {
            $(this).attr('checked', true);
            $("#chk_DesE").removeAttr("checked");
            //$(this).attr('disabled', 'disabled');
        }
        else {
            $(this).removeAttr('checked');
            $(this).removeAttr('disabled');
        }
    });
}

function Fm() {
    $("#FiltroMedico input").each(function () {
        if ($("#cbo_Todos_Medicos").is(':checked')) {
            $(this).attr('checked', true);
            $("#chk_DesM").removeAttr("checked");
            //$(this).attr('disabled', 'disabled');
        }
        else {
            $(this).removeAttr('checked');
            $(this).removeAttr('disabled');
        }
    });
}

$("#chk_DesM").click(function () {
    if ($("#chk_DesM").is(":checked")) {
        $("#cbo_Todos_Medicos").removeAttr('checked');
        $(".cbM").removeAttr("checked");
    }
});

$(".cbM").click(function () {
    $("#cbo_Todos_Medicos").removeAttr('checked');
    $("#chk_DesM").removeAttr("checked");
});

$("#chk_DesE").click(function () {
    if ($("#chk_DesE").is(":checked")) {
        $("#cbo_Todos_Especialidades").removeAttr('checked');
        $(".cbE").removeAttr("checked");
    }
});

$(".cbE").click(function () {
    $("#cbo_Todos_Especialidades").removeAttr('checked');
    $("#chk_DesE").removeAttr("checked");
});