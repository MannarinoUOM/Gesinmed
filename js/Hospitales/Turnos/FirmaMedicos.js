var bloquear = 0;
$(document).ready(function () {
    // Cargar_Especialidades_Firma(true, 0, false); 
    //Traer_Firma($("#medicoId").val());
});


$(".pestaña").click(function () {
    if ($(this).attr('id') == 'tbF') {
        if ($("#txtNombreFirma").attr('disabled')) { $("#btnImprimirComprobante").show(); } else { $("#btnImprimirComprobante").hide(); }
    } else { $("#btnImprimirComprobante").hide(); }
});

function Cargar_Especialidades_Firma(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas_Firma,
        error: errores
    });
}

function Especialidad_Cargadas_Firma(Resultado) {
    var EspecialidadFirma = Resultado.d;
    $('#cboEspeciaidadParaFirma').append( $('<option></option>').val("0").html("Especialidad para Firma") );

    $.each(EspecialidadFirma, function (index, item) {
        $('#cboEspeciaidadParaFirma').append($('<option></option>').val(item.Id).html(item.Especialidad));
     });  
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


/////NUMERO ENTEROS
$(".enteros").on('keydown', function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#btnBorrar").click(function () {
    var r = confirm("Desea Quitar la imagen de la firma?");
    if (r) { $("#btnSubirFirma").val(""); $("#sinArchivo").attr("src", "../img/icono-archivo-png-3.png"); $("#btnBorrar").hide(); }
});

$("#sinArchivo").click(function () { if (bloquear == 0) { $("#btnSubirFirma").click(); } });

$("#btnSubir").click(function () {
    //if ($("#btnSubirFirma").val() == "") { alert("Seleccione una imagen"); return false; }
    //if ($("#cboEspeciaidadParaFirma").val() == 0) { alert("Seleccione una especialidad"); return false; }
    var errorText = "";

    if ($("#sinArchivo").attr("src") == "../img/icono-archivo-png-3.png") { errorText = errorText + "Seleccione una imagen para la Firma.\n"; }
    if ($("#txtMatriculaFirmaNacional").val().trim().length <= 0 && $("#txtMatriculaFirmaProvincial").val().trim().length <= 0) { errorText = errorText + "Ingrese Matrícula Médica Nacional para la Firma.\n"; }
    if ($("#txtMatriculaFirmaProvincial").val().trim().length <= 0 && $("#txtMatriculaFirmaNacional").val().trim().length <= 0) { errorText = errorText + "Ingrese Matrícula Médica Provincial para la Firma.\n"; }
    if ($("#txtNombreFirma").val().trim().length <= 0) { errorText = errorText + "Ingrese nombre del Médico para la Firma.\n"; }
    if ($("#txtEspecialidad").val().trim().length <= 0) { errorText = errorText + "Ingrese nombre de Especialidad para la Firma.\n"; }
    if ($('#confirmarFirma').is(':checked') && $("#txtNombreFirma").val().trim().length <= 0) { errorText = errorText + "Ingrese nombre del Médico para la Firma."; }
    if (!$('#confirmarFirma').is(':checked') && $("#txtNombreFirma").val().trim().length > 0) { errorText = errorText + "Confirme la firma del Médico."; }

    if (errorText.trim().length > 0) {
        $("#tbF").click();
        alert(errorText);
        return false;
    }
    var archivo = document.getElementById('btnSubirFirma');
    $("#btnUploadFimra").click();
    //alert(archivo.files[0]);
});

// $("#sinArchivo").attr("src", $('#fileinput').prop("files")[0].toString()) 
function readURL(input) {

    var fileInput = document.getElementById('btnSubirFirma');
    

    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Por favor solo seleccione un archivo con las siguientes extensiones .jpeg/.jpg/.png/  ');
        fileInput.value = '';
        return false;
    } else {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#sinArchivo').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}

$("#btnImprimirComprobante").click(function () {
    //alert($("#sinArchivo").attr('src'));
    window.open("../Impresiones/Firma/ComprobanteFirmaConfirmada.aspx?nombreFirma=" + $("#txtNombreFirma").val() + "&imagenFirma=" + $("#sinArchivo").attr("src").replace("..", "") + "&mNacional=" + $("#txtMatriculaFirmaNacional").val() + "&mProvincial=" + $("#txtMatriculaFirmaProvincial").val() + "&fechaEscaneo=" + $("#txtFechaEscaneo").val() + "&id=" + idFirma , "_blank");
});


$("#btnSubirFirma").change(function (e) {
    var ok = 0;
    var width = 0;
    var height = 0;
    var _URL = window.URL || window.webkitURL;

    var image, file;

    if ((file = this.files[0])) {

        var sizeByte = this.files[0].size;
        var sizekiloBytes = parseInt(sizeByte / 1024);

        image = new Image();

        image.onload = function () {
            width = this.width; height = this.height;
            //alert(width + "//" + height);
            if (width > 500 || height > 500) {
                alert("La imagen no puedo superar los 500 x 500 pixeles.Seleccione otra.");
                ok = 0;
                $("#sinArchivo").attr("src", "../img/icono-archivo-png-3.png");
                var imagen = "";
                $("#btnBorrar").hide();
                } else { ok = 1; }
        };

        image.src = _URL.createObjectURL(file);

       var imagen = $("#sinArchivo");
       readURL(this);
       $("#btnBorrar").show();
       $("#btnBorrar").css("display", "inline");



        //        if (ok == 0) { $("#sinArchivo").attr("src", "../img/icono-archivo-png-3.png"); }
        //        else {
        //            alert("else");
        //            //////////////////////////////////////////////////////////////////////
        //            var imagen = $("#sinArchivo");
        //            readURL(this);
        //            $("#btnBorrar").show();
        //            $("#btnBorrar").css("display", "inline");
        //        }


        //       image.src = _URL.createObjectURL(file);
    }
});


function Traer_Firma(medico) {
    //alert(medico);
    var json = JSON.stringify({ "idMedico": medico });
    $.ajax({
        type: "POST",
        url: "../Json/firmaDigital.asmx/TraerFirmaMedico",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargadas_Firma,
        error: errores
    });
}
var idFirma = 0;
function Cargadas_Firma(Resultado) {
    Resultado.d;
    idFirma = Resultado.d.id;
    //alert(Resultado.d.fecha);
    $("#txtFechaEscaneo").val(Resultado.d.fecha.substr(0, Resultado.d.fecha.length - 3));
    //alert($("#txtFechaEscaneo").val());

    if (Resultado.d.matriculaNacional > 0) { $("#txtMatriculaFirmaNacional").val(Resultado.d.matriculaNacional); }
    if (Resultado.d.matriculaProvincial > 0) { $("#txtMatriculaFirmaProvincial").val(Resultado.d.matriculaProvincial); }
    $("#firmaId").val(Resultado.d.id);
    $("#txtNombreFirma").val(Resultado.d.nombreFirma);
    if (Resultado.d.nombreArchivo != null) { $("#sinArchivo").attr("src", "../firmaImagen/" + Resultado.d.nombreArchivo); $("#rutaFirma").val("/firmaImagen/" + Resultado.d.nombreArchivo); } // produccion

    //if (Resultado.d.nombreArchivo != null) { $("#sinArchivo").attr("src", "10.10.8.66\\documentacion_new\\firmas\\" + Resultado.d.nombreArchivo); } //desarrollo
    if (Resultado.d.confirmada == 1) { 
        $("#txtEspecialidad").val(Resultado.d.especialidadNombre);
        $("#confirmarFirma").attr('checked',true);
        $(".bloquear").attr('disabled', true);
        $("#sinArchivo").removeClass("seleccion");
        bloquear = 1;
    } else { $(".bloquear").attr('disabled', false); bloquear = 0; }
 }

//$("#cboEspeciaidadParaFirma").on('change', function () {
//    $("#especialidadId").val($(this).val());
//    $("#especialidadNombre").val($("#cboEspeciaidadParaFirma option:selected").text());
 //});

 function LimpiarFirma() {
     $("#txtMatriculaFirmaNacional").val("");
     $("#txtMatriculaFirmaProvincial").val("");
     $("#txtNombreFirma").val("");
     $("#sinArchivo").attr("src", "../img/icono-archivo-png-3.png");
     $("#sinArchivo").removeClass('bloquear')
     $("#sinArchivo").addClass('seleccion');
     $("#sinArchivo").addClass('firma');
     $("#txtNombreConfirma").val("");
     $("#txtEspecialidad").val("");
     $("#confirmarFirma").attr('checked', false);
     $(".bloquear").attr('disabled', false);
 }

