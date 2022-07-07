$("#boton").click(function () {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../Impresiones/IndicadoresDeSeguridadSocial/Prueba.aspx?valor=' + $("#valor").val(),
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
            });
 });