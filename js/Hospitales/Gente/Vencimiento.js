function EstaVendico(cuil) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/Vencido",
        data: '{CUIL: "' + cuil + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EstaVendico_Cargado,
        error: erroresVencimiento
    });
}

function EstaVendico_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null && Paciente != '') {
        if (Paciente == '01/01/1902' || Paciente == '1/1/1902') {

            $('.IconoVencido').attr('src', '../img/Icono_ERROR.gif');
            $('.IconoVencido').attr('data-original-title', 'Verifique el Padron UOM');
            $('#IconoVencido').attr('src', '../img/Icono_ERROR.gif');
            $('#IconoVencido').attr('data-original-title', 'Verifique el Padron UOM');
            $("[rel='tooltip']").tooltip();
            $("#btnVencimiento").hide();
            $('#IconoVencido').show();
            $("#SpanCargando").show();
            alert("Verifique por favor el paciente utilizando el PADRON UOM.");
        }
        else {
            $('.IconoVencido').attr('src', '../img/Icono_ERROR.gif');
            $('.IconoVencido').attr('data-original-title', 'De Baja ' + Paciente);
            $('#IconoVencido').attr('src', '../img/Icono_ERROR.gif');
            $('#IconoVencido').attr('data-original-title', 'De Baja ' + Paciente);
            $("[rel='tooltip']").tooltip();
            $("#btnVencimiento").hide();
            $('#IconoVencido').show();
            $("#SpanCargando").show();
            alert("¡¡ATENCION!! Fecha de Baja del Padrón: " + Paciente);
        }

    }
    else {
        $('.IconoVencido').attr('src', '../img/Icono_OK.gif');
        $('.IconoVencido').attr('data-original-title', 'Activo');
        $('#IconoVencido').attr('src', '../img/Icono_OK.gif');
        $('#IconoVencido').attr('data-original-title', 'Activo');
        $("[rel='tooltip']").tooltip();
        $("#btnVencimiento").hide();
    }

}

//function EstaVendico_Cargado(Resultado) {
//    var Paciente = Resultado.d;
//    if (Paciente != null && Paciente != '') {
//        if (Paciente == '01/01/1902') {
//            alert("Verifique por favor el paciente utilizando el PADRON UOM.");
//        }
//        else {
//            alert("¡¡ATENCION!! Fecha de Baja del Padrón: " + Paciente);
//        }
//        $('#IconoVencido').attr('src', '../img/Icono_ERROR.gif');
//        $('#IconoVencido').attr('data-original-title', 'De Baja ' + Paciente);
//        $("[rel='tooltip']").tooltip();
//        $("#btnVencimiento").hide();
//    }
//    else
//    {
//        $('#IconoVencido').attr('src', '../img/Icono_OK.gif');
//        $('#IconoVencido').attr('data-original-title', 'Activo');
//        $("[rel='tooltip']").tooltip();
//        $("#btnVencimiento").hide();
//    }

//}

function UltimoAporte_OK(cuil, Parentesco) {
    var json = JSON.stringify({ "Cuil": cuil, "Cod_Parentesco": Parentesco})
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/Vencido",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ok = Resultado.d;
            if (!ok) {
                alert("No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.");
                $("#desdeaqui").remove();
            }
            else alert("ok");
        }
    });
}



$("#btnVencimiento").click(function () {
    $("#SpanCargando").show();
    $("#btnVencimiento").hide();
    //EstaVendico($("#txt_dni").val());
});

function LimpiarBotonVencido()
{
    $("#SpanCargando").hide();
    $('#IconoVencido').attr('src', '../img/Espere.gif');
    $("#btnVencimiento").show();
}

function erroresVencimiento(msg) {
    LimpiarBotonVencido();
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
    
}