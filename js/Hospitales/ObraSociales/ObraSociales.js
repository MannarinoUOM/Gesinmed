$("#ck_UOM").click(function () {
    if ($("#ck_UOM").is(':checked')) {
        $("#cboSeccional").show();
        $("#cbo_ObraSocial").hide();
        $("#ControlCUILTITULAR").show();
        $("#ControlCUIT").show();
    }
    else {
        $("#cboSeccional").hide();
        $("#cbo_ObraSocial").show();
        $("#ControlCUILTITULAR").hide();
        $("#ControlCUIT").hide();
    }
});

    


    function Cargar_ObraSociales_Cargar(Cargar) {
        var json = JSON.stringify({
            "Id": "0"
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/ObraSocial/ObraSocial.asmx/CargarObraSocial",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var ObrasSociales = Resultado.d;
                $('#cbo_ObraSocial').empty();
                $.each(ObrasSociales, function (index, os) {
                    $('#cbo_ObraSocial').append(
              $('<option></option>').val(os.id).html(os.OS)
            );
                });

                if (Cargar != null && Cargar != '') {
                    $("#cbo_ObraSocial option[value=" + Cargar + "]").attr("selected", true);
                }

            },
            error: errores
        });

    }

    function Cargar_ObraSociales() {
        var json = JSON.stringify({
            "Id": "0"
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/ObraSocial/ObraSocial.asmx/CargarObraSocial",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_ObraSociales_Cargadas,
            error: errores
        });

    }

    function Cargar_ObraSociales_Cargadas(Resultado) {
        var ObrasSociales = Resultado.d;
        $('#cbo_ObraSocial').empty();
        $.each(ObrasSociales, function (index, os) {
            $('#cbo_ObraSocial').append(
              $('<option></option>').val(os.id).html(os.OS)
            );
        });
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    //Cargar_ObraSociales();