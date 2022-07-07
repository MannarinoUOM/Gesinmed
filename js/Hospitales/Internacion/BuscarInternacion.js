var Desde=0;

function CargarPagina(Id) {
    var url = "";
    switch(Desde)
{
case '1':
    url = "../Internacion/Internaciones.aspx?ID_Int=" + Id + "&B=1";
  break;
case '2':
    url = "../Internacion/Egreso.aspx?ID_Int=" + Id + "&B=1";
  break;
default:
  url = "../Login.aspx";
}
document.location = url;    
}

function CargarServicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Servicios_A",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarServicios_Cargados,
        error: errores
    });
}

function CargarServicios_Cargados(Resultado) {
    
    var Servicios = Resultado.d;
    $('#cbo_Servicio').empty();
    $('#cbo_Servicio').append('<option value="0">Todos</option>');
    $.each(Servicios, function (index, servicio) {
        $('#cbo_Servicio').append(
              $('<option></option>').val(servicio.id).html(servicio.descripcion)
            );
    });

}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



$("#cbo_Servicio").change(function () {
    $('#cbo_Cama').empty();
    $('#cbo_Cama').append('<option value="0">Todos</option>');
    CargarSalas($('#cbo_Servicio option:selected').val());
});

function CargarSalas(ServicioId) {
    $.ajax({
        type: "POST",
        data: '{Servicio: "' + ServicioId + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas_A",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarSalas_Cargados,
        error: errores
    });
}

function CargarSalas_Cargados(Resultado) {
    var Salas = Resultado.d;

    $('#cbo_Sala').empty();
    $('#cbo_Sala').append('<option value="0">Todos</option>');
    $.each(Salas, function (index, sala) {
        $('#cbo_Sala').append(
              $('<option></option>').val(sala.id).html(sala.descripcion)
            );
    });

}

$("#cbo_Sala").change(function () {
    CargarCamas($('#cbo_Sala option:selected').val());
});

function CargarCamas(SalaId) {
    $.ajax({
        type: "POST",
        data: '{Sala: "' + SalaId + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas_A",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarCamas_Cargados,
        error: errores
    });
}

function CargarCamas_Cargados(Resultado) {
    var Camas = Resultado.d;

    $('#cbo_Cama').empty();
    $('#cbo_Cama').append('<option value="0">Todos</option>');
    $.each(Camas, function (index, cama) {
        $('#cbo_Cama').append(
              $('<option></option>').val(cama.id).html(cama.descripcion)
            );
    });

}


$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    CargarServicios();
    $('#cbo_Cama').append('<option value="0">Todos</option>');
    $('#cbo_Sala').append('<option value="0">Todos</option>');

    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    //$("#txtFechaInicio").val(p);
    $("#txtFechaInicio").val('01/01/1900');
//    $("#txtFechaFin").val(d);

            var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });


    if (GET["Desde"] != "") {
        Desde = GET["Desde"];
    }


});


$('#btn_Buscar').click(function () {

    var json = JSON.stringify({
        "Fecha": $("#txtFechaInicio").val(),
        "FechaHasta": $("#txtFechaFin").val(),
        "ServicioId": $('#cbo_Servicio option:selected').val(),
        "SalaId": $('#cbo_Sala option:selected').val(),
        "CamaId": $('#cbo_Cama option:selected').val(),
        "NroDoc": $("#TxtNroDoc").val(),
        "NroHC": $("#txtNroHC").val(),
        "NombreYApllido": $('#txtAfiliado').val().trim().toUpperCase(),
        "Todas": "0"
    });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/BuscarInternaciones",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Buscar_Completada,
        error: errores,
          beforeSend: function () {
                $("#cargando").show();
                $("#TablaInternaciones").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaInternaciones").show();
            }
    });

});

function Buscar_Completada(Resultado) { 
    var Internaciones = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var encontrado = 0;

    $("#TablaInternaciones").empty();

    Tabla_Titulo = "<table id='TablaInternacionesContenido' class='table table-hover table-condensed'><thead><tr><th>Nro. Int</th><th>Fecha</th><th>N. HC</th><th>Paciente</th><th>Servicio</th><th>Sala</th><th>Cama</th></tr></thead><tbody>";
    $.each(Internaciones, function (index, inter) {
        encontrado++;
        Tabla_Datos = Tabla_Datos + "<tr ";
        //if (bonos.apellido != "") {
        Tabla_Datos = Tabla_Datos + " onclick=CargarPagina('" + inter.Id + "');";
        //}
        Tabla_Datos = Tabla_Datos + "><td>" + inter.Id + "</td><td>" + inter.Fecha + "</td><td>" + inter.NHC + "</td><td>" + inter.Paciente + "</td><td>" + inter.Servicio + "</td><td>" + inter.Sala + "</td><td>" + inter.Cama + "</td></tr>";
    });    

    Tabla_Fin = "</tbody></table>";
    $("#TablaInternaciones").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

    if (encontrado == 0) {
        $("#TablaInternaciones").html("<div style='text-align:center;padding-top:20px;'><b>No se han encontrado pacientes internados con esos datos de busqueda.</b></div>");
    }
}


$("#btnVolver").click(function(){
    if (Desde == 1)
    {
        self.location="../Internacion/Internaciones.aspx";
    }
    if (Desde == 2)
    {
        self.location="../Internacion/Egreso.aspx";
    }
});