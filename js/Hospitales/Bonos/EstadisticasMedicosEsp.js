function ChequearTodo() {
    
    var objBusquedaListaEspecialidad = "";
    if ($("#cbo_Todos_Especialidades").is(':checked')) {
        objBusquedaListaEspecialidad = "0";
    }
    else {
        $("#FiltroEspecialidad input").each(function () {
            if ($(this).is(':checked')) {
                objBusquedaListaEspecialidad = objBusquedaListaEspecialidad + $(this).val() + ",";
            }
        });
    }


    if (objBusquedaListaEspecialidad.length > 0) {
        var Pagina = "../Impresiones/ImpresionEstadisticasMedicosEsp.aspx?Quilmes=" + false + "&Desde=" + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&Especialidades=" + objBusquedaListaEspecialidad + " ";
        Pagina = Pagina.slice(0, -1);
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
		    'enableEscapeButton': false
		});
    }
    else alert('Seleccione Especialidad');
  }


  $("#chk_desEsp").click(function () {
      if ($(this).is(":checked")) {
          $("#FiltroEspecialidad input").each(function () {
              $(this).removeAttr('checked');
              $(this).removeAttr('disabled');
          });
          $("#cbo_Todos_Especialidades").removeAttr('checked');
      }
      else {
          $("#FiltroEspecialidad input").each(function () {
              $(this).removeAttr('disabled');
          });
      }
  });

  $(document).ready(function () {
      $("#txtFechaFin").datepicker();
      $("#txtFechaInicio").datepicker();
      $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
      $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });

      var currentDt = new Date();
      var mm = currentDt.getMonth() + 1;
      mm = (mm < 10) ? '0' + mm : mm;
      var yyyy = currentDt.getFullYear();
      var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
      var p = '01' + '/' + mm + '/' + yyyy;
      $("#txtFechaInicio").val(p);
      $("#txtFechaFin").val(d);

  });


$("#cbo_Todos_Especialidades").click(function () {
    if ($(this).is(":checked")) {
        $(".checks").attr("checked", true);
        $("#chk_desEsp").removeAttr("checked");
        //$(".checks").attr("disabled", true);
    }
    else {
        $(".checks").removeAttr("checked");
        $(".checks").removeAttr("disabled");
    }

});


$("#FiltroEspecialidad input").click(function () {
    $("#cbo_Todos_Especialidades").removeAttr("checked");
    $("#chk_desEsp").removeAttr("checked");
});