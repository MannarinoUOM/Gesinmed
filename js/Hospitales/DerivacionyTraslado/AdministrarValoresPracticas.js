parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > <strong>Nomenclador de Prestadores</strong>";

$("#txtValor").keydown(function (event) {
    //alert(event.keyCode);
    if (event.shiftKey) {
        event.preventDefault();
    }

    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 190) {
    }
    else {
        if (event.keyCode < 95) {
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        }
        else {
            if (event.keyCode < 96 || event.keyCode > 105) {
                event.preventDefault();
            }

        } 
    }
    //alert(event.keyCode);
});

    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPracticasCombo",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 2 + '"}',
        dataType: "json",
        success: function (Resultado) {
            listaPracticas = Resultado.d;
            $("#cboPracticas").append(new Option("Seleccione", 0));
            $.each(listaPracticas, function (index, item) {
                $("#cboPracticas").append(new Option(item.Practica, item.Codigo));
            });
        }
    });

$.ajax({
    type: "POST",
    url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPrestadoresCombo",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (Resultado) {
        listaPrestadores = Resultado.d;
        $("#cboPrestadores").append(new Option("Seleccione", 0));
        $.each(listaPrestadores, function (index, item) {
            $("#cboPrestadores").append(new Option(item.nombre, item.id));
        });
    }
});

$("#BtnAceptar").click(function () {
    if ($('#cboPracticas option:selected').val() == 0) { alert("Seleccione una Práctica"); return false; }
    if ($('#cboPrestadores option:selected').val() == 0) { alert("Seleccione un Prestador"); return false; }
    if ($("#txtValor").val() == 0 || $("#txtValor").val().trim().length < 0) { alert("Ingrese un Valor"); return false; }

    //alert($("#txtValor").val());
    var json = JSON.stringify({ "idpractica": $('#cboPracticas option:selected').val(), "idprestador": $("#cboPrestadores").val(), "valor": $("#txtValor").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarValorPractica",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function () {
            alert("Datos Guardados");
        }
    });

});


$(".actualizar").change(function () {

    if ($('#cboPrestadores option:selected').val() != 0 && $('#cboPracticas option:selected').val() != 0) {
        var json = JSON.stringify({ "prestador": $('#cboPrestadores option:selected').val(), "practica": $("#cboPracticas").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPreciosPrestadoresLista",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                valor = Resultado.d;
                $("#txtValor").val(valor.valor);
            }
        });
    }
});
