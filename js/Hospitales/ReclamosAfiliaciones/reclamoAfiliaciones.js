var id = 0;

$(document).ready(function () {
    List_Servicios_Afiliaciones(); 
 });
$("#impresion").attr('href', '../Impresiones/reclamos/reclamoImpresion.aspx?id=' + id + '&estado=' + 0);
function List_Servicios_Afiliaciones() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado_Afiliaciones,
        error: errores
    });
}

function List_Servicios_Cargado_Afiliaciones(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cboServicioAfiliaciones").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

$("#txtTelefonoReclamoAfiliaciones").on('keydown', function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {

        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }

    $("#txtTelefonoReclamoAfiliaciones").css("border-color", "rgb(204, 204, 204)");
    $("#txtTelefonoReclamoAfiliaciones").removeClass("blink_text");
});

$("#cboServicioAfiliaciones").change(function () {
    $("#cboServicioAfiliaciones").css("border-color", "rgb(204, 204, 204)");
    $("#cboServicioAfiliaciones").removeClass("blink_text");
});

$("#txtTituloAfiliaciones").on('keydown', function (e) {
    $("#txtTituloAfiliaciones").css("border-color", "rgb(204, 204, 204)");
    $("#txtTituloAfiliaciones").removeClass("blink_text");
});

$("#txtReclamoAfiliaciones").on('keydown', function (e) {
    $("#txtReclamoAfiliaciones").css("border-color", "rgb(204, 204, 204)");
    $("#txtReclamoAfiliaciones").removeClass("blink_text");
});

$("#btnGuardarReclamoAfiliaciones").click(function () {

    //    if ($("#txtTelefonoReclamoAfiliaciones").val().trim().length <= 7) {
    //        $("#txtTelefonoReclamoAfiliaciones").css("border-color", "Red");
    //        $("#txtTelefonoReclamoAfiliaciones").addClass("blink_text");

    //        return false;
    //    }

    if ($("#cboServicioAfiliaciones").val() == 120000088) {
        $("#cboServicioAfiliaciones").css("border-color", "Red");
        $("#cboServicioAfiliaciones").addClass("blink_text");

        return false;
    }

    if ($("#txtTituloAfiliaciones").val().trim().length <= 0) {
        $("#txtTituloAfiliaciones").css("border-color", "Red");
        $("#txtTituloAfiliaciones").addClass("blink_text");

        return false;
    }

    if ($("#txtReclamoAfiliaciones").val().trim().length <= 0) {
        $("#txtReclamoAfiliaciones").css("border-color", "Red");
        $("#txtReclamoAfiliaciones").addClass("blink_text");

        return false;
    }
    guardarReclamoAfiliaciones();


});

function guardarReclamoAfiliaciones() {
    var url = "../Json/reclamoAfiliacion.asmx/InsertarErrorAfiliacion";
    var json = JSON.stringify({ "IdReclamo": 0, "titulo": $("#txtTituloAfiliaciones").val(), "servicio": $("#cboServicioAfiliaciones").val(), "telefono": $("#txtTelefonoReclamoAfiliaciones").val(), "reclamo": $("#txtReclamoAfiliaciones").val(), "afiliadoID": $("#afiliadoID").val(), "estado": 0 });

    $.ajax({
        type: "POST",
        data: json,
        url: url,
        //url: "../Json/Odontologia.asmx/InsertarReclamo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == -1) { alert("Ocurrio un error al guardar el reclamo."); } else {
                id = Resultado.d;
                $("#reclamorIdAfiliaciones").val(Resultado.d);
                //alert($("#ReclamoId").val());
                //                $("#impresion").attr('href', '../Impresiones/reclamos/reclamoImpresion.aspx?id=' + id + '&estado=' + 0);
                //                $("#impresion").click();

            }
        },
        complete: function () { $("#subirReclamoAfiliaciones").click(); },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

//$("#btnGuardarReclamo").click(function () { $("#btnSubir").click(); });