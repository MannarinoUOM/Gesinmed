var id = 0;

$(document).ready(function () { List_Servicios_Reclamos(); });
//$("#impresion").attr('href', '../Impresiones/reclamos/reclamoImpresion.aspx?id=' + id + '&estado=' + 0);
function List_Servicios_Reclamos() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Reclamos_Cargado,
        error: errores
    });
}

function List_Servicios_Reclamos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cboServicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

$("#txtTelefonoReclamo").on('keydown', function (e) {

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

$("#cboServicio").change(function () {
    $("#cboServicio").css("border-color", "rgb(204, 204, 204)");
    $("#cboServicio").removeClass("blink_text");
 });

$("#txtTitulo").on('keydown', function (e) {
    $("#txtTitulo").css("border-color", "rgb(204, 204, 204)");
    $("#txtTitulo").removeClass("blink_text");
});

$("#txtReclamo").on('keydown', function (e) {
    $("#txtReclamo").css("border-color", "rgb(204, 204, 204)");
    $("#txtReclamo").removeClass("blink_text");
});

$("#btnGuardarReclamo").click(function () {
    if ($("#txtTelefonoReclamo").val().trim().length <= 7) {
        $("#txtTelefonoReclamo").css("border-color", "Red");
        $("#txtTelefonoReclamo").addClass("blink_text");

        return false;
    }

    if ($("#cboServicio").val() == 120000088) {
        $("#cboServicio").css("border-color", "Red");
        $("#cboServicio").addClass("blink_text");

        return false;
    }

    if ($("#txtTitulo").val().trim().length <= 0) {
        $("#txtTitulo").css("border-color", "Red");
        $("#txtTitulo").addClass("blink_text");

        return false;
    }

    if ($("#txtReclamo").val().trim().length <= 0) {
        $("#txtReclamo").css("border-color", "Red");
        $("#txtReclamo").addClass("blink_text");

        return false;
    }
    guardarReclamo();


});
function guardarReclamo() {
    var json = JSON.stringify({ "IdReclamo": 0 ,"titulo": $("#txtTitulo").val(), "servicio": $("#cboServicio").val(), "telefono": $("#txtTelefonoReclamo").val(), "reclamo": $("#txtReclamo").val(), "afiliadoID": $("#afiliadoID").val(), "estado": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Odontologia.asmx/InsertarReclamo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == -1) { alert("Ocurrio un error al guardar el reclamo."); } else {
                id = Resultado.d;
                $("#ReclamoId").val(Resultado.d);
                //alert($("#ReclamoId").val());
//                $("#impresion").attr('href', '../Impresiones/reclamos/reclamoImpresion.aspx?id=' + id + '&estado=' + 0);
//                $("#impresion").click();

            }
        },
        complete: function () { $("#btnSubir").click(); },
        error: errores
    });
}


//$("#btnGuardarReclamo").click(function () { $("#btnSubir").click(); });