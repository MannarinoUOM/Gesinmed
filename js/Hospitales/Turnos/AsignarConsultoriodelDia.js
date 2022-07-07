var ConsultorioId = 0;
var MedicoId = 0;

$(document).ready(function () {
    Init();
});

function Init() {
    Cargar_Especialidades(true, 0, true);
    CargarConsultorios();
    SetearFecha();
    ListarDias($("#txtDia").val(), 0, 0, 0);
}

function SetearFecha() {
    $("#txtDia").datepicker();
    $("#txtDia").mask("99/99/9999", { placeholder: "-" });

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
    var d = dia + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtDia").val(d);
}

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Seleccione Especialidad...</option>');
    $.each(Especialidad, function (index, especialidades) {
        //con esto no se muestra IMAGENES
        if (especialidades.Id != 339 && especialidades.Id != 340 && especialidades.Id != 341 && especialidades.Id != 342 && especialidades.Id != 343) {
            //con esto no se muestra IMAGENES
            $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
            //con esto no se muestra IMAGENES
        }
        //con esto no se muestra IMAGENES
    });
}

$('#cbo_Especialidad').change(function () {
    Cargar_Medicos_por_Especialidad($(this).val(), 'A');
});

function Cargar_Medicos_por_Especialidad(Especialidad, Tipo) {
    var json = JSON.stringify({ "Especialidad": Especialidad, "Tipo": Tipo , "TLC": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        complete: function () {
            $('#cbo_Medico').val(MedicoId);
        },
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Seleccione Médico...</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}

function CargarConsultorios() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Consultorios.asmx/Consultorio_Lista_DA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsultorios_Cargados,
        error: errores
    });
}


function CargarConsultorios_Cargados(Resultado) {

    var Consultorios = Resultado.d;
    $('#cbo_Consultorio').empty();
    $('#cbo_Consultorio').append('<option value="0">Seleccione un Consultorio</option>');
    $.each(Consultorios, function (index, consultorios) {
        $('#cbo_Consultorio').append(
              $('<option></option>').val(consultorios.ConsultorioID).html(consultorios.Consultorio)
            );
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function ListarDias(Fecha, ConsultorioId, EspecialidadId, MedicoId) {
    if (Fecha.trim().length == 0) Fecha = '01/01/1900';

    var json = JSON.stringify({ "Fecha": Fecha, "ConsultorioId": ConsultorioId, "EspecialidadId": EspecialidadId, "MedicoId": MedicoId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Turnos/AsignarConsultoriodelDia_ws.asmx/ListarConsultoriodelDia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            var Tabla_Datos = "";
            Tabla_Titulo = "<table id='TablaDias' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fecha</th><th>Especialidad</th><th>Médico</th><th>Consultorio</th></tr></thead><tbody>";
            $.each(Lista, function (index, Pedido) {
                Tabla_Datos = Tabla_Datos + "<tr class='rows' id='row" + Pedido.ConsultorioDia_Id + "' onclick=Editar(" + Pedido.ConsultorioDia_Id + ");"
                Tabla_Datos = Tabla_Datos + " style='cursor:pointer; font-size:11px;'";
                Tabla_Datos = Tabla_Datos + "><td id='tdConsFecha" + Pedido.ConsultorioDia_Id + "'>" + Pedido.ConsultorioDia_Fecha + "</td><td>" + Pedido.ConsultorioDia_EspecialidadNombre + "</td><td>" + Pedido.ConsultorioDia_MedicoNombre + "</td><td>" + Pedido.ConsultorioDia_ConsultorioNombre + "</td><td id='tdConsEspId" + Pedido.ConsultorioDia_Id + "' style='display:none;'>" + Pedido.ConsultorioDia_EspecialidadId + "</td><td id='tdConsId" + Pedido.ConsultorioDia_Id + "' style='display:none;'>" + Pedido.ConsultorioDia_ConsultorioId + "</td><td id='tdConsMedId" + Pedido.ConsultorioDia_Id + "' style='display:none;'>" + Pedido.ConsultorioDia_MedicoId + "</td></tr>";
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaDias").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        },
        error: errores
    });
}

function Editar(ConsultorioDia_Id) {
    $(".rows").css("background-color", "white");
    $("#txtDia").val($("#tdConsFecha" + ConsultorioDia_Id).html());
    $('#cbo_Especialidad').val($("#tdConsEspId" + ConsultorioDia_Id).html());
    Cargar_Medicos_por_Especialidad($("#tdConsEspId" + ConsultorioDia_Id).html(), 'A');
    MedicoId = $("#tdConsMedId" + ConsultorioDia_Id).html();
    ConsultorioId = ConsultorioDia_Id;
    $('#cbo_Consultorio').val($("#tdConsId" + ConsultorioDia_Id).html());
    $("#row" + ConsultorioDia_Id).css("background-color", "#EAEAEA");
    $("#btnCancelar").show();
    $("#btnEliminar").show(); 
}

/*
    Carga el objeto que se guarda en la base.
    @param ConsultorioId, si es 0 se inserta, caso contrario se actualiza el Id.
    @param Baja, si es true se da de baja el reg.
*/
function CargarDatos(ConsultorioId,Baja) {
    var datos = {};
    datos.ConsultorioDia_Id = ConsultorioId;
    datos.ConsultorioDia_MedicoId = $('#cbo_Medico :selected').val();
    datos.ConsultorioDia_EspecialidadId = $('#cbo_Especialidad :selected').val();
    datos.ConsultorioDia_ConsultorioId = $('#cbo_Consultorio :selected').val();
    datos.ConsultorioDia_Fecha = $("#txtDia").val();
    datos.ConsultorioDia_Baja = Baja;
    return datos;
}

function GuardarDia(ConsultorioId, Baja) {
    var json = JSON.stringify({"datos": CargarDatos(ConsultorioId, Baja) });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Turnos/AsignarConsultoriodelDia_ws.asmx/AsignarConsultoriodelDia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            ConsultorioId = Resultado.d;
            if (ConsultorioId > 0) {
                Mensaje(Baja);
                LimpiarCampos();
                ListarDias($("#txtDia").val(), 0, 0, 0);
            }
            else alert("Ha ocurrido un error.");
        },
        error: errores
    });
}

function Mensaje(Baja) { 
    if (!Baja) alert("Dia guardado correctamente.");
    else alert("Dia dado de baja correctamente.");
}

function LimpiarCampos() {
    ConsultorioId = 0;
    MedicoId = 0;
    $('#cbo_Especialidad').val("0");
    $('#cbo_Medico').val("0");
    $('#cbo_Consultorio').val("0");
    $("#btnCancelar").hide();
    $("#btnEliminar").hide();
    $(".rows").css("background-color", "white"); 
    SetearFecha();
}

function Validar() {
    if ($('#cbo_Especialidad :selected').val() == "0") { alert("Seleccione Especialidad."); return false; }
    if ($('#cbo_Medico :selected').val() == "0") { alert("Seleccione Médico."); return false; }  
    if ($('#cbo_Consultorio :selected').val() == "0") { alert("Seleccione Consultorio."); return false; }
    if ($("#txtDia").val().trim().length == 0) { alert("Ingrese Fecha."); return false; }
    return true;
}

$("#btnConfirmar").click(function () {
    if (confirm("¿Desea confirmar el dia?")) {
        if (!Validar()) return false;
        GuardarDia(ConsultorioId, false);
    }
});

$("#btnBuscar").click(function () {
    ListarDias($("#txtDia").val(), $('#cbo_Consultorio :selected').val(), $('#cbo_Especialidad :selected').val(), $('#cbo_Medico :selected').val());
});

$("#btnCancelar").click(function () {
    LimpiarCampos();
});

$("#btnEliminar").click(function () {
    if (confirm("¿Desea eliminar el dia de consultorio?")) GuardarDia(ConsultorioId, true);
});
