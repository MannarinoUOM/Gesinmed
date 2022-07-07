var idSeleccion = 0;
var dniPaciente = 0;

parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > Autorización Express > <strong>Buscar</strong>";

$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});

$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        $("#txtDesde").datepicker("option", "maxDate", selectedDate);
    }
});

$(".fechas").keydown(function () { return false; });
$('.fechas').datepicker('setDate', 'today');

$("#BtnBuscar").click(function () {
    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") { alert("Ingrese un rango de fecha para buscar."); return false; }
    var json = JSON.stringify({ "idEncabezado": 0, "tipo": 2, "desde": $("#txtDesde").val(), "hasta": $("#txtHasta").val(), "documento": $("#txtDocumento").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/BuscarExpress",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: cargarTablaEncabezado
    });
});

function cargarTablaEncabezado(resultado) {
     var lista = resultado.d;

        $("#TablaBusqueda").empty();
        var Contenido = "";
        var Pie = "";
        var Encabezado = "";
        $.each(lista, function (index, item) {
            Contenido = Contenido + "<tr class='filas' id='" + item.id + "' style='width:97%' onclick='Selecciona(" + item.id + ")'>" +
            "<td style='cursor:pointer;width:8%'>" + item.fecha + " </td><td style='cursor:pointer; width:29%'>" + item.paciente + " </td><td style='cursor:pointer; width:8%'>" + item.dni +
            "<td style='cursor:pointer; width:35%'>" + item.observacion + "</td><td id='" + item.id + "1' style='display:none'>" + item.dni + "</td></tr>";
        });
        Pie = "</tbody></table>";
        $("#TablaBusqueda").html(Encabezado + Contenido + Pie);
    }

    function Selecciona(id) {
        
        idSeleccion = id;
        dniPaciente = $("#" + id + "1").html();
        $(".filas").css('background-color', '#dddddd');
        $("#" + id).css('background-color', 'aqua');
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerDetalleExpress",
            contentType: "application/json; charset=utf-8",
            data: '{idEncabezado: "' + id + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
               cargarTablaDetalle(lista);
            }
        });
    }

    function cargarTablaDetalle(lista) {
        $("#TablaDetalle").empty();
        var Contenido = "";
        var Pie = "";
        var Encabezado = "";
        $.each(lista, function (index, item) {
            Contenido = Contenido + "<tr class='filas' id='" + item.id + "' style='width:97%'><td style='cursor:auto;width:3%; text-align:right'></td>" +
            "<td style='cursor:auto;width:9%; text-align:left'>" + item.codigoPrac + " </td><td style='cursor:auto; width:48%'>" + item.descripcionPrac + "</td><td style='cursor:auto; width:20%'>" + item.medico + "</td></tr>";
        });
        Pie = "</tbody></table>";
        $("#TablaDetalle").html(Encabezado + Contenido + Pie);
    }

    $("#BtnBorrar").click(function () {
        if (idSeleccion == 0) { alert("Seleccione una Autorización para borrar."); return false; }
        $("#" + idSeleccion).css('background-color', 'aqua');
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/BorrarAutorizacionExpress",
            contentType: "application/json; charset=utf-8",
            data: '{idEncabezado: "' + idSeleccion + '"}',
            dataType: "json",
            success: function () {
                idSeleccion = 0;
                alert("Borrado.");
                $("#TablaDetalle").empty();
                $("#BtnBuscar").click();
            }
        });
    });

    $("#btnVolver").click(function () {
        document.location = "../DerivacionyTraslado/AutorizacionExpress.aspx";
    });

    $("#btnActualizar").click(function () {
        if (idSeleccion == 0) { alert("Selecccione una autorización para editar."); return false; }
        document.location = "../DerivacionyTraslado/AutorizacionExpress.aspx?Documento=" + dniPaciente + "&idAutorizacion=" + idSeleccion + "&edita=1";
    });

    $("#txtDocumento").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ($(this).val().trim().length > 0 && e.keyCode == 190 && ($(this).val().trim().indexOf('.') === -1)) return;
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
