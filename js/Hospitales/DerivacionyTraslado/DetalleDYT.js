$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["ID"] != "" && GET["ID"] != null) {
        var ID = GET["ID"];
       cargarDetalle(ID);
    }
});


function cargarDetalle(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerUnaDYTDetalle",
        contentType: "application/json; charset=utf-8",
        data: '{idDYT: "' + ID + '"}',
        dataType: "json",
        success: function (Resultado) {
            var item = Resultado.d;

            $("#TablaDetalle").empty();
            var Contenido = "";
            var Pie = "";
            var Encabezado = "";
            Encabezado = ""; // "<table class='tabla table-hover table-condensed' style='width: 100%;'><thead style='height:20%'><tr><th style='padding:0px; text-align:center; width:2%'></th><th  style='width:12%'></th><th style='padding:0px; text-align:center; width:8%'></th><th style='padding:0px; text-align:center; width:30%;color:Black'></th><th style='padding:0px; text-align:center; width:20%;color:Black' ></th><th style='padding:0px; text-align:center; width:20%;color:Black'></th><th style='padding:0px; text-align:center; width:8%;color:Black'></th></tr></thead><tbody>";
            //$.each(lista, function (index, item) {

            Contenido = Contenido + "<tr><td style='width:25%'><label><b>Lugar: </b></label>" + item.lugar + "</label></td><td style='font-size:x-small; width:25%'><label><b>Fehca del Pedido: </b><br>" + item.fechaPedido + "</label></td><td style='font-size:x-small; width:25%'><label><b>Hora pedido: </b><br>" + item.horaPedido + "</label></td><td style='font-size:x-small; width:30%'><label><b>Solicitado por: </b><br>" + item.solicitanteNombre + "</label></td></tr>" +
             "<tr><td style='font-size:xx-small'><label><b>Centro Origen: </b><br>" + item.origenNombre + "</label></td><td style='cursor:font-size:x-small'><label><b>Especialidad Origen: </b><br>" + item.especialidadOrigenNombre + "</label></td><td style='font-size:x-small'><label><b>Medico Origen: </b><br>" + item.medicoOrigenNombre + "</label></td><td><label><b>Rechazos: </b><br>" + item.rechazosNombre + "</label></td></tr>" +
             "<tr><td><label><b>Centro Destino: </b><br>" + item.DestinoNombre + "</label></td><td><label><b>Especialidad Destino: </b><br>" + item.especialidadDestinoNombre + "</label></td><td><label><b>Medico Destino: </b><label><br>" + item.medicoDestinoNombre + "</label></td><td><label><b>Observaciones: </b><br>" + item.observaciones + "</label></td></tr>" +
             "<tr><td><label><b>Motivo: </b><br>" + item.motivo + "</label></td><td><label><b>Diagnostico: </b><br>" + item.DestinoNombre + "</label></td><td><label><b>Trasladado: </b><br>" + item.trasladoNombre + "</label></td><td><label><b>Prestacion: </b><br>" + item.prestacionNombre + "</label></td></tr>" +
             "<tr><td><label><b>Seguimiento: </b><br>" + item.seguimientoNombre + "</label></td><td><label><b>Fecha Internacion: </b><br>" + item.fechaInternacion + "</label></td><td><label><b>Fecha Alta: </b><br>" + item.fechaAlta + "</label></td><td><label><b>Estado: </b><br>" + item.estadoNombre + "</label></td></tr>";
            // });
            Pie = "</tbody></table>";
            $("#TablaDetalle").html(Contenido + Pie);

            //            $("#Lugar").text(item.lugar);
            //            $("#fechaPedido").text(item.fechaPedido);
        }
    });
}