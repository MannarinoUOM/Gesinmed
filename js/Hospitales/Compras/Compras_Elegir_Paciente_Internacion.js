$(document).ready(function () {

    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";

    $("#listaPacientes").empty();
    Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>Paciente</th><th>Documento</th><th>NHC</th></tr></thead><tbody>";
    $.each(parent.Paciente, function (index, pacientes) {
        //alert(parent.Paciente[index]);
        Tabla_Datos = Tabla_Datos + "<tr onclick='PacienteElegido(" + index + ")' style='cursor:pointer;'><td>" + pacientes.Paciente + "</td><td>" + pacientes.documento_real + "</td><td>" + pacientes.NHC_UOM + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#listaPacientes").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
});

function PacienteElegido(index) {
    var elegido = parent.Paciente[index];
    parent.Paciente.length = 0;
    parent.Paciente.push(elegido);
    parent.Cargar_Paciente_NHC_Cargado(parent.Paciente);
    
}