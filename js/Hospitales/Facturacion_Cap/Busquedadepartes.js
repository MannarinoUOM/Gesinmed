

$(document).ready(function () {
    List_Medicos();
    Especialidades_Lista();
    List_Seccionales();
    List_ObraSociales(false);
    InicializarCampos();
    var Query = {};
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        //Cargar_Paciente_NHC(Query['NHC']);
    }
});

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function InicializarCampos() {
    $(".fecha").mask("99/99/9999", { placeholder: "-" });
        $("#txtDesdeParte").datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: '-14Y',
            maxDate: '0m',
            onClose: function (selectedDate) {
                $("#txtHastaParte").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#txtHastaParte").datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: '0m',
            maxDate: '+14Y',
            onClose: function (selectedDate) {
                $("#txtDesdeParte").datepicker("option", "maxDate", selectedDate);
            }
        });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtDesdeParte").val(p);
    $("#txtHastaParte").val(d);
}



function List_Medicos() {
    var json = JSON.stringify({ "Apellido": null, "MN": null, "MP": null, "objBusquedaLista": null });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

function Especialidades_Lista() {
    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidades_Lista_Cargado,
        error: errores
    });
}

function Especialidades_Lista_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Especialidad) {
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
    });
}

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
        if (Lista.length - 1 == index) $("#cbo_Institucion").val("0");
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnBuscar").click(function () {
    Busqueda();
});

function Busqueda() {
    var json = JSON.stringify({ "NHC": $("#txtNHC").val().trim(), "InstitucionId": 0, "Afiliado": $("#txtNombre").val().trim(), "SeccionalId": $("#cbo_Seccional :selected").val(),
        "NroParte": $("#txtParte").val().trim(), "DesdeParte": $("#txtDesdeParte").val(), "HastaParte": $("#txtHastaParte").val(), "DesdePrac": "",
        "HastaPrac": "", "DesdeRend": "", "HastaRend": "", "EspecialidadId": $("#cbo_Especialidad :selected").val(), "MedicoId": $("#cbo_Medico :selected").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/ListPartes",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListPartes_Cargado,
            error: errores,
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaPartes_div").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaPartes_div").show();
            }
        });
}

function ListPartes_Cargado(Resultado) {
    Partes = Resultado.d;
    var Tabla_Datos = "";
    Tabla_Titulo = "<table id='TablaPartes_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro Parte</th><th>Fecha Parte</th><th>NHC</th><th>Paciente</th><th>Seccional</th></tr></thead><tbody>";
    $.each(Partes, function (index, Parte) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargaPracticasMedicasHC.aspx?Id=" + Parte.NroParte + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + Parte.NroParte + "</td><td>" + Parte.Fecha + "</td><td>" + Parte.NHC + "</td><td>" + Parte.Paciente + "</td><td>" + Parte.Seccional + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPartes_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function Ventana(url) {
    document.location = url;
}
