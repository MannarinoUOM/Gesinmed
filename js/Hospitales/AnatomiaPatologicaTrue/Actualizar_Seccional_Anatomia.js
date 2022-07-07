var idCarga = 0;
$(document).ready(function () {


    traerPacientes();


    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Seccionales = Resultado.d;
            $('#cboSeccionalChange').empty();
            $.each(Seccionales, function (index, seccionales) {

                $('#cboSeccionales').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
            });
        },
        error: errores
    });

});


function traerPacientes() {
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerEstudiosPatologiaExternos",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () { $("#pacientes").hide(); },
        complete: function () { $("#pacientes").show(); },
        success: function (Resultado) {
            var encabezado = "<table class='table table-hover'><tr><td><b>Protocolo</b></td><td><b>Afiliado</b></td><td><b>NHC</b></td></tr>";
            var fila = "";
            var pie = "</table>";

            $.each(Resultado.d, function (index, item) { fila += "<tr id='fila" + item.PAT_ID + "' class='fila' style='cursor:pointer' onclick='seleccionar(" + item.PAT_ID + ")'><td>" + item.protocolo + "</td><td>" + item.pacienteExterno + "</td><td>" + item.hc + "</td></tr>"; });

            $("#pacientes").html(encabezado + fila + pie);
        },
        error: errores
    });
}


 function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function seleccionar(PAT_ID) { idCarga = PAT_ID; $(".fila").css('background-color', 'White'); $("#fila" + PAT_ID).css('background-color', 'Red'); }

$("#btnActualizar").click(function () {


    if (idCarga == 0) { alert("SELECCIONA UN AFILIADO VANESA!"); return false; }
    else {
        var json = JSON.stringify({ "PAT_ID": idCarga, "pat_seccional_ext": $('#cboSeccionales option:selected').text() });
        $.ajax({
            type: "POST",
            url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/ActualizarSeccionalExternaPatologia",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                alert("Seccional actualizada!");
                idCarga = 0;
                traerPacientes();
            },
            error: errores 
        });
    }
});