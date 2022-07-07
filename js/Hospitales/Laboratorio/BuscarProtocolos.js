var Todos = 0;
var objBusquedaLista = "";


$('#btn_Buscar_Protocolos').click(function () {

   Buscar();  
});

function Buscar() {
    
    
    if (fecha1esmayora2()) { alert("La Fecha de inicio tiene que ser menor a la fecha final"); $("#ControlFechas").addClass("error");$("#txtFechaInicio").focus();  return false; }

    

    var json = JSON.stringify({
        "Protocolo": $("#TxtProtocolo").val(),
        "TipoOrden": "C",
        "CodPaciente": $('#txtNroHC').val(),        
        "Desde": $('#txtFechaInicio').val(),
        "Hasta": $('#txtFechaFin').val(),
        "Apellido": $("#txtAfiliado").val()
    });
        
        $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Laboratorio/Laboratorio.asmx/ProtocoloBuscar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Buscar_Bonos_Cargados,
        error: errores
    });
}



function Buscar_Bonos_Cargados(Resultado) {
    var Bonos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";

    $("#TablaBonos").empty();

    Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed'><thead><tr><th>Nro. Protocolo</th><th>Fecha</th><th>Nro HC</th><th>Paciente</th><th>Documento</th></tr></thead><tbody>";
    $.each(Bonos, function (index, bonos) {
        Tabla_Datos = Tabla_Datos + "<tr ";
        if (bonos.apellido != "") {
            //Tabla_Datos = Tabla_Datos + " onclick=MostrarBono('../MostrarProtocolo.aspx?id=" + bonos.NroProtocolo + "');";

            //var str1 = "Hello ";
            //var str2 = "world!";
            //var n = str1.concat(str2); 

            var n = Number(bonos.NroProtocolo);

            Tabla_Datos = Tabla_Datos + " onclick=MostrarProtocolo('" + n + "');";
        }
        Tabla_Datos = Tabla_Datos + "><td>" + bonos.NroProtocolo + "</td><td>" + bonos.Fecha + "</td><td>" + bonos.cuil + "</td><td>" + bonos.apellido + "</td><td>" + bonos.documento + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaBonos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function MostrarProtocolo(Protocolo) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../Laboratorio/MostrarProtocolo.aspx?Protocolo=' + Protocolo,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



function Ft(Id) {
    if (Id == 0) {


        $("#FiltroPracticas input").each(function () {

            if (Todos == 1) {
                $(this).attr('disabled', 'disabled');
            }
            else {
                $(this).removeAttr('disabled');
            }

        })

        if (Todos == 1) { Todos = 0; } else { Todos = 1; }

        $("#cbo_Todos").removeAttr('disabled');        
        
    }
}

$("#txtFechaFin").datepicker();
$("#txtFechaInicio").datepicker();
$("#txtFechaFin").val(FechaActual());
$("#txtFechaInicio").val(FechaActual());


$(document).ready(function () {

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });

    $("#TxtCpbt").mask("9?9999999");
    $("#txtNroHC").mask("9999999999?9");

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


