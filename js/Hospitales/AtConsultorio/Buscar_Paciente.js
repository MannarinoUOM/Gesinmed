var Express = 0;

$(document).ready(function () {
    ListTipoDoc();
    $('#txt_dni').focus();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }


    var GET = {};
    var NHC = "";

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

});



function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnBuscarPaciente").click(function () {
    //    if ($("#txtPaciente").val() == "") {
    //        alert("Debe ingresar un nombre");
    //        return;
    //    }
    //    else if ($("#txt_dni").val() == "") {
    //        alert("Debe ingresar un Documento");
    //        return;
    //    }


    //    if (e.id == "txtPaciente") {
    //        alert("debeingresar  un nombre");
    //    }
    if ($("#txt_dni").val().trim().length == 0 && $("#txtPaciente").val().trim().length == 0 && $("#txtNHC").val().trim().length == 0) {
//        $("#txt_dni").val().trim().length = 0;
//        $("#txtPaciente").val() = "";
        alert("Ingrese DNI, NHC, o un nombre a buscar!");
        return;
    }


    document.location = "../AtConsultorio/Listar_Pacientes_Existentes.aspx?Tdni=" + $("#cbo_TipoDOC :selected").val() + "&dni=" + $("#txt_dni").val() + "&paciente=" + $("#txtPaciente").val() + "&NHC=" + $("#txtNHC").val() + "&sinConsultas=" + 1;
});


$("#txt_dni").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
    // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#txtNHC").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
    // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


function validarEnter(e, f) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        var id = f.getAttribute("id");
        var contenido = $("#" + id + "").val();
        if (contenido.length <= 0) {

            switch (id) {
                case "txt_dni":
                    alert("Ingrese DNI a buscar");
                    break;

                case "txtPaciente":
                    alert("Ingrese Apellido y Nombre a buscar");
                    break;

                    case "txtNHC":
                    alert("Ingrese NHC a Buscar")
                    break;
            }
        }
        else {

            $("#btnBuscarPaciente").click()
        }
    }
}