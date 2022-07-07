var ID = 0;
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
         ID = GET["ID"];
        cargarEncabezado(ID);
    }
});

function cargarEncabezado(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/AutorizacionesMostrarUnEncabezado",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + ID + '"}',
        dataType: "json",
        success: function (Resultado) {
            var item = Resultado.d;
            var Contenido = "";
            var Pie = "";
            var Encabezado = "";
           $("#TablaEncabezado").empty();

           Contenido = Contenido + "<tr><td style='width:25%'><label><b>Fecha: </b><br>" + item.fecha + "</label></td>" +
//            "<td style='font-size:x-small; width:25%'><label><b>Tipo: </b><br>" + item.tipo + "</label></td>" +
            "<td style='font-size:x-small; width:30%'><label><b>Especialidad: </b><br>" + item.especialidad + "</label></td></tr>" +
            "<tr><td style='font-size:xx-small'><label><b>Proveedor: </b><br>" + item.proveedor + "</label></td>" +
            "<td style='cursor:font-size:x-small'><label><b>Médico Interno: </b><br>" + item.medico + "</label></td>" +
            "<td style='font-size:x-small'><label><b>Médico Externo: </b><br>" + item.medicoExterno + "</label></td>" +
            "<td><label><b>Comentarios: </b><br>" + item.comentarios + "</label></td></tr>" +
            "<tr><td style='font-size:xx-small; padding-bottom:0px;padding-to:0px'><label><b>Estado: </b><br>" + item.estado + "</label></td>" +
            "<td><label><b>Fecha Auditado: </b><br>" + item.fechaAuditado + "</label></td>" +
            "<td><label><b>Fecha Retirado: </b><br>" + item.fechaRetirado + "</label></td>" +
            "<td><label><b>Fecha Turno: </b><br>" + item.fechaTurno + "</label></td></tr>"; //<td><label><b>Trasladado: </b><br>" + item.trasladoNombre + "</label></td><td><label><b>Prestacion: </b><br>" + item.prestacionNombre + "</label></tr><tr><td><label><b>Seguimiento: </b><br>" + item.seguimientoNombre + "</label></td><td><label><b>Fecha Internacion: </b><br>" + item.fechaInternacion + "</label></td><td><label><b>Fecha Alta: </b><br>" + item.fechaAlta + "</label></td><td><label><b>Estado: </b><br>" + item.estadoNombre + "</label></td></tr> <tr><td><label><b>Rechazos: </b><br>" + item.rechazosNombre + "</label></td><td><label><b>Observaciones: </b><br>" + item.observaciones + "</label></td></tr>";
            //             });
            Pie = "</tbody></table>";
            $("#TablaEncabezado").html(Contenido + Pie);
        },
        complete: cargarDetalle()
    });
}

function cargarDetalle() {

        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerDetalle",
            contentType: "application/json; charset=utf-8",
            data: '{id: "' + ID + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                cargarTablaDetalle(lista);
            }
        });

    

    function cargarTablaDetalle(lista) {

        $("#TablaDetalle").empty();
        var Contenido = "";
        var Pie = "";
        var Encabezado = "";
        Encabezado = "<table class='tabla  table-condensed table-hover' style='width: 100%; overflow:auto'><thead style='height:0px; background-color:Black'>" +
        "<label class='check inline' style='width:4%'></label><tr><th  style='width:2%'></th>" +
        "<th style='padding:0px; text-align:center; width:5%'><label class='check inline' style='width:5%'><strong style='color:White'>Código</strong></label>" +
        "<th style='padding:0px; text-align:center; width:40%;color:Black'> <label class='check inline' style='width40%'><strong style='color:White; text-align:center'>Descripción</strong></label></th>" +
                "<th style='padding:0px; text-align:center; width:20%;color:Black'><label class='check inline' style='width:40%'><strong style='color:White'>Prestador</strong></label></th>" +
                "<th style='padding:0px; text-align:center; width:20%;color:Black'><label class='check inline' style='width:40%'><strong style='color:White'>Sub Rubro</strong></label></th>" +
        "<th style='padding:0px; text-align:center; width:8%;color:Black' ><label class='check inline' style='width:8%'><strong style='color:White'>Cantidad</strong></label></th>" +
        "<th style='padding:0px; text-align:center; width:5%;color:Black'><label class='check inline' style='width:10%'><strong style='color:White;margin-botton:0px'>Importe</strong></label></th>" +
        "</tr></thead><tbody>";
        $.each(lista, function (index, item) {
            var numero = (parseInt(index) + 1);
            Contenido = Contenido + "<tr><td style='text-aling:center'>" + numero + "</td>" +
            "<td style='text-aling:center'> " + item.codigo + " </td>" +
            "<td style='text-aling:center'>" + item.descripcion + "</td>" +
            "<td style='text-aling:center'>" + item.proveedor + "</td>" +
            "<td style='text-aling:center'>" + item.subRubro + "</td>" +
            "<td style='text-aling:center'>" + item.cantidad + "</td>" +
            "<td style='text-aling:right'>" + "$ " + item.importe + "</td>";
        });
        Pie = "</tbody></table>";
        $("#TablaDetalle").html(Encabezado + Contenido + Pie);
    }

}