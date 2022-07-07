var CirugiaActual = "";
var mensaje = "";

$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) { return decodeURIComponent(s.split("+").join(" ")); }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["TurnoId"] != null && GET["TurnoId"] != "") {
        CirugiaActual = GET["TurnoId"];
        $("#paciente").text(parent.$("#apellido" + CirugiaActual).html());
        //traerDatos(CirugiaActual);
    }
    //cargarCombo("cboServicio", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica", 1, '');
    llenarCombo();
});


$("#txtFecha").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true
});

$("#txtFecha").keydown(function () {
    return false;
});

$("#txtHora").mask("99:99", { placeholder: "-" });


$("#btnImprimir").click(function () {
    var hora = $("#txtHora").val();
    var patron = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;

    if ($("#cboServicio").val() == 0) { alert("Seleccione un Servicio."); return false; }
    if ($("#txtFecha").val() == "") { alert("Ingrese un fecha."); return false; }
    if (!patron.test(hora)) { alert("Ingrese un Hora Válida."); return false; }
    guardar(); 

});


function guardar() {
    var obj = {};
    obj.CirugiaProgramadaID = CirugiaActual;
    obj.servicio = $("#cboServicio").val();
    obj.fechaInternacion = $("#txtFecha").val();
    obj.horaIntenracion = $("#txtHora").val();
    obj.indicaciones = $("#txtIndicaciones").val();

    var json = JSON.stringify({ "Objeto": obj });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorioCirugiaProgramadaGuardarVaucher",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            imprimir("../Impresiones/ReportesQuirofano/QuirofanoTurnoVaucher.aspx?CirugiaProgramadaID=" + CirugiaActual + "&PDF=1", 0);
        },
        error: errores
    });
}

function traerDatos(id) {
    var json = JSON.stringify({ "CirugiaProgramadaID": id });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorioCirugiaProgramadaImprimirVaucher",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var obj = Resultado.d;

            //$.each($("#cboServicio").val(), function (index, item) { alert("combo: " + $(this).val()); });
            

            $("#txtFecha").val(obj.fechaInternacion);
            $("#txtHora").val(obj.horaIntenracion);
            $("#txtIndicaciones").val(obj.indicaciones);
            $("#cboServicio").val(obj.servicioId);

            setTimeout(function () { $("#cboServicio").val(obj.servicioId); }, 100);
           // alert(obj.servicioId);
        },
        error: errores
    });
 }

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function llenarCombo() {
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica",
        contentType: "application/json; charset=utf-8",
        //data: json,
        dataType: "json",
        success: function (Resultado) {
            $("#cboServicio").empty();
            var lista = Resultado.d;
            $("#cboServicio").append(new Option("Seleccione", 0)); 

            $.each(lista, function (index, item) {
                $("#cboServicio").append(new Option(item.descripcion, item.id));
            });
        },
        complete: traerDatos(CirugiaActual)
    });
}