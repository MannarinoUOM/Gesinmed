var Todos = 0;
var objBusquedaLista = "";


function Validar() {
    if ($('#txtFechaInicio').val().trim().length == 0) { alert("Ingrese fecha de inicio."); return false; }
    if ($('#txtFechaFin').val().trim().length == 0) { alert("Ingrese fecha de fin."); return false; }
    return true;
}

$("#btn_Buscar").click(function(){
Buscar();
});

function Buscar() {
    if (!Validar()) return false;
    if (fecha1esmayora2()) { alert("La Fecha de inicio tiene que ser menor a la fecha final."); $("#ControlFechas").addClass("error"); $("#txtFechaInicio").focus(); return false; }
    var json = JSON.stringify({
        "Afiliado": $('#txtAfiliado').val().trim(),
        "Desde": $('#txtFechaInicio').val(),
        "Hasta": $('#txtFechaFin').val(),
        "NroComprobante": $("#TxtCpbt").val(),
        "nroHC": $("#txtNroHC").val(),
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Imagenes/Imagenes.asmx/Buscar_Protocolo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Buscar_Bonos_Cargados,
        error: errores,
        beforeSend: antes,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#table_b").show();
}

function antes() {
    $("#cargando").show();
    $("#table_b").hide();
}


function Buscar_Bonos_Cargados(Resultado) {
    var Datos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";

    
    if (Datos != null) {
        Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed'><thead><tr><th>Nro. Protocolo</th><th>Fecha</th><th>Nro HC</th><th>Paciente</th><th>Tipo Estudio</th></tr></thead><tbody>";
        $.each(Datos, function (index, Protocolo) {            
            Tabla_Datos = Tabla_Datos + "<tr onclick='Cargar("+Protocolo.IMG_ID+");'><td>" + Protocolo.IMG_NUMERO + "</td><td>" + Protocolo.IMG_FECHA_ACTUAL + "</td><td>" + Protocolo.HC_UOM_CENTRAL + "</td><td>" + Protocolo.apellido + "</td><td>" + Protocolo.TIMG_DESCRIPCION + "</td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#table_b").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
    else $("#table_b").empty();
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function fecha1esmayora2() {
    var fechaInicio = document.getElementById("txtFechaInicio");
    var fechaFin = document.getElementById("txtFechaFin");
    var anio = parseInt(fechaInicio.value.substring(6, 10));
    var mes = fechaInicio.value.substring(3, 5);
    var dia = fechaInicio.value.substring(0, 2);
    var c_anio = parseInt(fechaFin.value.substring(6, 10));
    var c_mes = fechaFin.value.substring(3, 5);
    var c_dia = fechaFin.value.substring(0, 2);

    if (c_anio * 10000 + c_mes * 1000 + c_dia >= anio * 10000 + mes * 1000 + dia)
        return (false);
    else {
        return (true);
    }
}


function Cargar(Id)
{    
    window.open("http://localhost:5454/Hospitales_UOM_Central_10_06_2015/Imagenes/IMG_LlamaPrograma.aspx?AfiliadoID=0&Tipo=2&Protocolo=" + Id, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=500, width=800, height=300");
}


$(document).ready(function () {

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").datepicker();
    $("#txtFechaInicio").datepicker();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFin").val(d);

    $("#TxtCpbt").mask("9?9999999");
    $("#txtNroHC").mask("9?9999999999");      

});
