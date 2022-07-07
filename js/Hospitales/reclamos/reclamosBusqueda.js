$(document).ready(function () {
    cargarSeccionales();
    cargarServicios();
});


$("#txtDNI").on('keydown', function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {

        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }

    $("#txtTelefonoReclamo").css("border-color", "rgb(204, 204, 204)");
    $("#txtTelefonoReclamo").removeClass("blink_text");
});

$("#txtNHC").on('keydown', function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {

        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }

    $("#txtTelefonoReclamo").css("border-color", "rgb(204, 204, 204)");
    $("#txtTelefonoReclamo").removeClass("blink_text");
});

$("#txtFechaReclamo").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        $("#txtFechaResolucion").datepicker("option", "minDate", selectedDate);
    }
});

$("#txtFechaResolucion").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        $("#txtFechaReclamo").datepicker("option", "maxDate", selectedDate);
    }
});

$("#btnBuscar").click(function () {
    var obj = {};
    if ($("#txtNombre").val().trim().length > 0) { obj.afiliado = $("#txtNombre").val(); } else { obj.afiliado = ""; }
    if ($("#txtNHC").val().trim().length > 0) { obj.nhc = $("#txtNHC").val(); } else { obj.nhc = ""; }
    if ($("#txtDNI").val().trim().length > 0) { obj.dni = $("#txtDNI").val(); } else { obj.dni = ""; }
    if ($("#txtFechaReclamo").val().trim().length > 0) { obj.fechaReclamo = $("#txtFechaReclamo").val(); } else { obj.fechaReclamo = ""; }
    if ($("#txtFechaResolucion").val().trim().length > 0) { obj.fechaResolucion = $("#txtFechaResolucion").val(); } else { obj.fechaResolucion = ""; }
    if (!$("#chkResueltos").is(':checked')) { obj.estado = 1; } else { obj.estado = 0; }

    obj.seccId = $("#cboSeccional").val();
    obj.servId = $("#cboServicio").val();
    if ($("#chk72").is(':checked')) { obj.retraso = 1; } else { obj.retraso = 0; }
    obj.reclamoId = 0;

    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/ReclamoBuscar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        beforeSend: function () {
            $("#cargando").show();
            $("#tReclamos").empty();
            $("#tReclamos").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#tReclamos").show();
        },
        success: function (resultado) {
            var lista = resultado.d;
            if (lista.length == 0) { alert("No se encontraron resultados"); } else { cargarLista(lista); }
        },
        error: errores
    });
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function cargarLista(lista) {
    var encabezado = "<table>";
    var fila = "";
    var pie = "</table>";

    $.each(lista, function (index, item) {
        //alert(item.servDescripcion); 
        fila += "<tr onclick='seleccionar(" + item.reclamoId + ")'><td>" + item.afiliado + "</td><td>" + item.fechaReclamo + "</td><td>" + item.titulo + "</td><td>" + item.servDescripcion + "</td></tr>";
    })

    $("#tReclamos").html(encabezado + fila + pie);
}

function seleccionar(id) {
    document.location = "../Reclamos/cerrarReclamo.aspx?id=" + id;
}

function cargarSeccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        //data: json,
        dataType: "json",
        success: function (Resultado) {
             var lista = Resultado.d;
             $("#cboSeccional").append(new Option("Seleccione", 0)); 

            $.each(lista, function (index, item) {
                $("#cboSeccional").append(new Option(item.Seccional, item.Nro));
            });
        }
    });
}

function cargarServicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        //data: json,
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboServicio").append(new Option("Seleccione", 0)); 

            $.each(lista, function (index, item) {
                $("#cboServicio").append(new Option(item.descripcion, item.id));
            });
        }
    });
}