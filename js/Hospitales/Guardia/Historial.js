$(document).ready(function () {
    LoadMedicosGuardiabyEsp(0);
    $("#desde").datepicker();
    $("#hasta").datepicker();
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var a = dd + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(a);
});

    function LoadMedicosGuardiabyEsp(Especialidad) {
    var json = JSON.stringify({ "Especialidad": Especialidad });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/MedicosGuardiabyEsp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadMedicosGuardiabyEsp_Cargados,
        error: errores
    });
}

function LoadMedicosGuardiabyEsp_Cargados(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").append($("<option></option>").val("0").html("Todos"));
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btn_Listar").click(function () {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/ImpresionGuardiaHistorial.aspx?Desde=' + $("#desde").val() + "&Hasta=" + $("#hasta").val() + "&Medico=" + $("#cbo_Medicos :selected").val() + "&NHC=" + $("#txtNHC").val(),
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
});
