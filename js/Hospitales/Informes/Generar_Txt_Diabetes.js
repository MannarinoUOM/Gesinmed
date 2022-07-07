
$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});

$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {
        $("#txtDesde").datepicker("option", "maxDate", selectedDate);
    }

});


$("#txtHasta").keydown(function () {
    return false;
});
$("#txtDesde").keydown(function () {
    return false;
});


//$("#btnGenerarTxt").click(function () {

//    //    var json = JSON.stringify({
//    //        "desde": $("#txtDesde").val(),
//    //        "hasta": $("#txtHasta").val()
//    //    });

//    //    $.ajax({
//    //        type: "POST",
//    //        url: "../Json/Administracion/Administracion.asmx/DiabetesGenerarTxt",
//    //        contentType: "application/json; charset=utf-8",
//    //        dataType: "json",
//    //        data: json,
//    //        success: function (resultado) {
//    //            alert(resultado.d);
//    //            document.location = "c:\Diabetes\Diabetes_01062015_al_30062015.txt";
//    //        },
//    //        error: errores
//    //    });
//    //});

//    //function errores(msg) {
//    //    var jsonObj = JSON.parse(msg.responseText);
//    //    alert('Error: ' + jsonObj.Message);
//    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
//        alert("Ingrese un Rango de fecha");
//        return false;
//    }
//});