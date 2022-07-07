$(document).ready(function () {
    var json = JSON.stringify({ "afiliadoId": parent.$("#afiliadoId").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/ComprasInternacion.asmx/COMPRASCIRUGIAS",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var Tabla_Titulo = "";
            var Tabla_Datos = "";
            var Tabla_Fin = "";
            $("#tablaCirugias").empty();
            Tabla_Titulo = "<thead><tr><th style='text-align:left'>Fecha</th><th style='text-align:left'>Cirugías</th><th style='text-align:left'>Motivo Supensión</th><th style='text-align:left'>Médico</th><th style='text-align:left'>Especialidad</th></tr></thead><tbody>";
            $.each(lista, function (index, item) {
                Tabla_Datos += "<tr  onclick=seleccion('" + item.id + "') style='text-align:left; cursor:pointer'>" +
                "<td id='fecha" + item.id + "'>" + item.fecha + "</td>" +
                "<td id='cirugias" + item.id + "' style='text-align:left'>" + item.cirugias + "</td>" +
                "<td id='motivo" + item.id + "' style='text-align:left'>" + item.motivo + "</td>" +
                "<td id='cirujano" + item.id + "' style='text-align:left' data-id='" + item.cirujanoId + "'>" + item.cirujanoName + "</td>" +
                "<td id='especialidad" + item.id + "' style='text-align:left' data-id='" + item.EspecialidadId + "'>" + item.cirujanoEspecialidad + "</td></tr>";
            });


            Tabla_Datos += "<tr><td><input  id='1' type='text' style='widt:100%; margin-bottom:0px' placeholder='Nueva fecha' value='" + parent.fechaCirugiaNew + "'/></td>" +
            "<td contenteditable id='2'  class='ancho dato' placeholder='Nueva cirugía'>" + parent.cirugiaNew + "</td>" +
            "<td contenteditable id='3'  class='ancho dato' placeholder='Nuevo motivo (opcional)'>" + parent.motivoNew + "</td>" +
            "<td contenteditable id='4'  class='ancho' placeholder='Médico (opcional)'><select class='datoCbo' id='cboMedico'></select></td>" +
            "<td contenteditable id='5'  class='ancho' placeholder='Especialidad (opcional)'><select class='datoCbo' id='cboEspecialidad'></select></td><tr>";
            Tabla_Fin = "</tbody></table>";
            $("#tablaCirugias").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
            $("#1").datepicker({
                onClose: function () { parent.fechaCirugiaNew = $(this).val(); }
            });

            $(".ancho").css('max-width', '100px');
        },
        error: errores,
        complete: function () {
            cargarCombo("cboMedico", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 2, "");
            cargarCombo("cboEspecialidad", "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesComboAnatomia", 1, { "id": 0 });
            $("#cboMedico").val(parent.cirujanoNew);
            $("#cboEspecialidad").val(parent.especialidadNew);
        }
    });
});

function reSeleccionar() { $("#cboMedico").val(parent.cirujanoNew); $("#cboEspecialidad").val(parent.especialidadNew); }

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function seleccion(id) {
parent.fechaCirugiaNew = "";
parent.cirugiaNew = "";
parent.motivoNew = "";
parent.cirujanoNew = 0;
parent.especialidadNew = 0;

parent.idCirugia = id;
//alert(parent.idCirugia);
parent.$("#cboMedico").attr('disabled', true);
    parent.$("#btnFechaCirugia").text($("#fecha" + id).html());
    //parent.$("#cboArea").val($("#especialidad" + id).data("id"));
    parent.$("#cboMedico").val($("#cirujano" + id).data("id"));
    parent.$.fancybox.close();
    
}

$(".dato").live('keyup', function (e) {
    //if ($(this).html().toString().trim().length >= 0) {
        switch ($(this).attr('id')) {
            case "2":
                parent.cirugiaNew = $(this).html();
                break;
            case "3":
                parent.motivoNew = $(this).html();
                break;

        }
    //}
    });

    $(".datoCbo").live('change', function (e) {
        switch ($(this).attr('id')) {
            case "cboMedico":
                parent.cirujanoNew = $(this).val();
                break;
            case "cboEspecialidad":
                parent.especialidadNew = $(this).val();
                break;
        }
    });