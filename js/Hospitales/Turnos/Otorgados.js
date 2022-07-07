var Documento = parent.document.getElementById("txtNHC").value; ;
    var Fecha = "";

    function Cargar_Turnos_Otorgados() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Turnos_Otorgados",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Turnos_Otorgados_Cagados,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Ventana(url) {
    document.location = url;
}

function Turnos_Otorgados_Cagados(Resultados) {
    Turnos = Resultados.d;
    var Resultado = "";
    var Tabla_Datos = "";
    Tabla_Titulo = "<table id='TablaTurnos' class='table table-condensed table-bordered table-striped' style='width: 100%;'><thead><tr><th>Fecha</th><th>Hora</th><th>Médico</th><th>Especialidad</th></tr></thead><tbody>";

    $.each(Turnos, function (index, turnos) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('../Impresiones/ImpresionTurno.aspx?MedicoID=" + turnos.MedicoId + "&EspecialidadId=" + turnos.EspecialidadId + "&Fecha=" + turnos.Fecha + "&Hora=" + turnos.Hora + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + turnos.Fecha + "</td><td>" + turnos.Hora + "</td><td>" + turnos.Medico + "</td><td>" + turnos.Especialidad + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#dTablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

$(document).ready(function () {

    
    var GET = {};
    //alert("Hola");
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["Documento"] != "") {
        Documento = GET["Documento"];
    }

   
    Cargar_Turnos_Otorgados();

});