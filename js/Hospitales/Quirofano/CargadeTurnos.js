var Fecha;
var c_cuales = 0;
var Permiso_Edicion = true;

$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});



$(document).ready(function () {    
    $("#frm_Main").validate({
        rules: {
            'fecha': { required: true, dateES: true }
        },
        messages: {
            'fecha': { required: '', dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            $("#fecha").removeClass("error");
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    $("#fecha").datepicker();
    $("#fecha").val(FechaActual());
    var Query = {};
    Query = GetQueryString();
    Fecha = Query['QueryFecha'];
    $("#fecha").mask("99/99/9999", { placeholder: "-" });
    if (Query['QueryFecha'] != undefined || Query['QueryFecha'] != null) {
        $("#fecha").val(Fecha);
    }
    else
        $("#fecha").val(FechaActual());
    Buscar_Cirugias(0);
    TengoPermiso();    
});

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    // declare object
    var queryObj = {};
    // loop through each name-value pair and populate object
    for (var i = 0; i < querystring.length; i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
    }
    return queryObj;
}

function Buscar_Cirugias(cuales) {
    var json = JSON.stringify({ "Id": 0, "Fecha": $("#fecha").val(), "Baja": false, "Turno": 0, "cuales": cuales});
    //alert(json);
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados,
        error: errores
    });

    $.ajax({
        type: "POST", url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Totales",
        data: json, 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados_totales,
        error: errores
    });

}

function TengoPermiso() {    
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/TengoPermisoPlanificarCirugia",        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Respuesta) {
            var r = Respuesta.d;
            if (!r) {
                $("#btnPlanificar").remove();
                Permiso_Edicion = false;
            }
        },
        error: errores
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function Pedidos_Cargados_totales(Resultado) {
    $("#btn_todos").html("Todas (" + Resultado.d.todos + ")");
    $("#btn_pedidos").html("Reservado (" + Resultado.d.ocupados + ")");
    $("#btn_urgencias").html("Urgencia (" + Resultado.d.urgencias + ")");
    $("#btn_cancelados").html("Suspendida (" + Resultado.d.cancelados + ")");
    $("#btn_realizadas").html("Realizado (" + Resultado.d.realizadas + ")");
    
}

function Pedidos_Cargados(Resultado) {
    var Turnos = Resultado.d;
    var Tabla_Datos = "";

    var Tabla_Titulo = "<table id='TablaCirugias' class='table table-condensed' style='width: 100%;'><thead><tr><th></th><th>Hora</th><th>Quirófano</th><th>Cama</th><th>Paciente</th><th>NHC</th><th>Diagnóstico</th><th>Cirugía</th><th>Cirujano</th><th>Ayudante</th><th>Anestesia</th><th>Anestesista</th><th>Hemo</th><th>Rx</th><th>AN/P</th><th>Mon</th><th>Seccional/OS</th><th>Especialidad</th><th>Observaciones</th><th>Fecha</th><th>Suspendida&nbsp;por</th></tr></thead><tbody>";
    $.each(Turnos, function (index, Pedido) {
        var color = 'Turnos_Ocupados';        
        if (Pedido.MotivoSusp) color = 'Turnos_Cancelado';
        if (Pedido.Hora_Fin != "" && Pedido.Hora_Fin != null) color = 'Turnos_Realizadas';
        if (Pedido.Urgencia) color = 'Turnos_Urgencias';

        var urg = "";
        if (Pedido.Urgencia == true) urg = 'Si';
        var Mo = "";
        if (Pedido.Monitoreo == true) Mo = 'Si';
        var ap = "";
        if (Pedido.AP == true) ap = 'Si';
        var rayos = "";
        if (Pedido.Rayos == true) rayos = 'Si';
        var Hemo = "";
        if (Pedido.Hemo == true) Hemo = 'Si';


        var Observaciones = Pedido.Observaciones;
        if (Pedido.Observaciones.length > 20) {
            Observaciones = Pedido.Observaciones.substring(0,16) + "...";
        }

        Tabla_Datos = Tabla_Datos + "<tr id='row" + index + "'";
        Tabla_Datos = Tabla_Datos + " style='cursor:pointer;' class='" + color + "' onclick=Ventana('Planificar-Cirugia.aspx?Cirugia_Id=" + Pedido.Id + "');";
        Tabla_Datos = Tabla_Datos + "><td>" + (index+1) + "</td><td>" + Pedido.Hora + "</td><td style='text-align:center;'>" + Pedido.Sala + "</td><td>" + Pedido.Cama + "</td><td>" + Pedido.Paciente + "</td><td>" + Pedido.HC + "</td><td>" + Pedido.Diagnostico + "</td><td>" + Pedido.Cirugia + "</td><td>" + Pedido.Cirujano + "</td><td>" + Pedido.Ayudante + "</td><td>" + Pedido.Anestesia + "</td><td>" + Pedido.Anestesista + "</td><td>" + Pedido.Hemo + "</td><td>" + rayos + "</td><td>" + ap + "</td><td>" + Mo + "</td><td>" + Pedido.Seccional + "</td><td>" + Pedido.Especialidad + "</td><td>" + Observaciones + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.Motivo_Descripcion + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";

    if (Tabla_Datos == "") {
        texto_tipo_cirugia = "";
        if (c_cuales == 1) { texto_tipo_cirugia = "planificadas" }
        if (c_cuales == 2) { texto_tipo_cirugia = "suspendidas"; }
        Tabla_Datos = "</tbody></table> <div style='text-align:center;'>No hay cirugías <b>" + texto_tipo_cirugia + "</b> para este día</div>";
        Tabla_Fin = "";
    }

    
    $("#TablaCirugias").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

function Ventana(url) {
    if (Permiso_Edicion == true) {
        document.location = url;
    }
}

//Boton buscar quitado
//$("#btnBuscar").click(function () {
//    var valid = $("#frm_Main").valid();
//    if (valid == true)
//    Buscar_Cirugias();
//});

$("#btnPlanificar").click(function () {
    document.location = "Planificar-Cirugia.aspx?FECHA_TRAIDA=" + $("#fecha").val();
});



$("#btnImprimir").click(function () {
    var Fecha = $("#fecha").val();

   
    //verificar existencia y generacion de historial
    var json = JSON.stringify({ "id": 0, "fecha": $("#fecha").val(), "dadodebaja": false, "turno": 0, "cuales": c_cuales, "ruta": "../Impresiones/Quirofano_Turnos.aspx?Fecha=" + Fecha + "&cuales=" + c_cuales });
    //alert(json);
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/GenerarRegistroTurnoParteQuirurgico",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) {
                //verificar existencia y generacion de historial
                $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Quirofano_Turnos.aspx?Fecha=' + Fecha + "&cuales=" + c_cuales,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
            } else { alert("No se encontraron resultados."); }
        },
        error: errores
    });
});

    $("#fecha").change(function () {
        var valid = $("#frm_Main").valid();
        if (valid == true)
            Buscar_Cirugias(c_cuales);
    });


    

    $("#btn_todos").click(function () {
        $("#btn_todos").removeClass("reff_activo");
        $("#btn_todos").addClass("reff_activo");
        $("#btn_pedidos").removeClass("reff_activo");
        $("#btn_cancelados").removeClass("reff_activo");
        $("#btn_urgencias").removeClass("reff_activo");
        $("#btn_realizadas").removeClass("reff_activo");        
        c_cuales = 0;
        Buscar_Cirugias(0);
    });

    $("#btn_pedidos").click(function(){
        $("#btn_todos").removeClass("reff_activo");        
        $("#btn_pedidos").removeClass("reff_activo");
        $("#btn_cancelados").removeClass("reff_activo");
        $("#btn_pedidos").addClass("reff_activo");
        $("#btn_urgencias").removeClass("reff_activo");
        $("#btn_realizadas").removeClass("reff_activo");        
        c_cuales = 1;
        Buscar_Cirugias(1);
    });
    
    $("#btn_cancelados").click(function(){
        $("#btn_todos").removeClass("reff_activo");        
        $("#btn_pedidos").removeClass("reff_activo");
        $("#btn_cancelados").removeClass("reff_activo");
        $("#btn_cancelados").addClass("reff_activo");
        $("#btn_urgencias").removeClass("reff_activo");
        $("#btn_realizadas").removeClass("reff_activo");        
        c_cuales = 2;
        Buscar_Cirugias(2);
    });

    $("#btn_urgencias").click(function () {
        $("#btn_todos").removeClass("reff_activo");
        $("#btn_pedidos").removeClass("reff_activo");
        $("#btn_cancelados").removeClass("reff_activo");
        $("#btn_cancelados").removeClass("reff_activo");
        $("#btn_urgencias").addClass("reff_activo");
        $("#btn_realizadas").removeClass("reff_activo");        
        c_cuales = 3;
        Buscar_Cirugias(3);
    });


    $("#btn_realizadas").click(function () {
        $("#btn_todos").removeClass("reff_activo");
        $("#btn_pedidos").removeClass("reff_activo");
        $("#btn_cancelados").removeClass("reff_activo");
        $("#btn_cancelados").removeClass("reff_activo");
        $("#btn_urgencias").removeClass("reff_activo");
        $("#btn_realizadas").addClass("reff_activo");        
        c_cuales = 4;
        Buscar_Cirugias(4);
    });

    
    