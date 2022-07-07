var Todos = 0;
var objBusquedaLista = "";

function CargarServicios() {
    $.ajax({
        type: "POST",
        //url: "../Json/Internaciones/IntSSC.asmx/Lista_Servicios_A",
        url: "../Json/Internaciones/IntSSC.asmx/Servicio_Lista_A_At_Internados",        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarServicios_Cargados,
        error: errores
    });
}

function CargarServicios_Cargados(Resultado) {
    var Servicios = Resultado.d;
    $('#FiltroServicios').empty();
    $.each(Servicios, function (index, s) {
        $('#FiltroServicios').append('<label style="text-align:left;" class="checkbox"><input onclick="F_uno(' + s.id + ')" id="Pr' + s.id + '" type="checkbox" value="' + s.id + '" checked>' + s.descripcion + '</label>');
    });
}

function Fdes(Id) {
    $("#FiltroServicios input").each(function () {
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
        $("#FiltroServicios input").each(function () {
            if ($("#cbo_Todos").is(":checked")) {
                $(this).attr('checked', 'checked');
                $("#cbo_DesTodos").removeAttr('checked');
            }
            else {
                $(this).removeAttr('checked', 'checked');
            }
        });
}

CargarServicios();
$("#txtFechaInicio").html(FechaActual());

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$('#btn_Buscar_Censo').click(function () {
    VerificarTodo();
});

function VerificarTodo() {
    var Lista = "";
    objBusquedaLista = "";

    if ($("#cbo_Todos").is(':checked')) {
        objBusquedaLista = "0";
    }
    else {
        $("#FiltroServicios input").each(function () {

            if ($(this).is(':checked')) {
                objBusquedaLista = objBusquedaLista + $(this).val() + ",";
            }
        });
    }
    Imprimir();
}

function Imprimir() {
    
    //var Pagina = "../Impresiones/Internacion_Censo.aspx?fecha=" + $("#txtFechaInicio").html() + "&servIds=" + objBusquedaLista;
    var Pagina = "../Impresiones/ImpresionCensoCentral.aspx?fecha=" + $("#txtFechaInicio").html() + "&servIds=" + objBusquedaLista;
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
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'preload': true,
//		    'beforeShow': function () { $('#spinner').start(true, true).show(); }
            'onComplete' : function(){
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function(){
                jQuery.fancybox.hideActivity();
            });

        }
           
		}
	        );
}

