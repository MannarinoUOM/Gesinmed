var idPaciente = 0;
var nombrePacienteExt = "";
var extInt = 0;
var oTabla;
LoadDataTable();
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

    if (GET["idPaciente"] != "" && GET["idPaciente"] != null) {
        idPaciente = GET["idPaciente"];
    }

    if (GET["nombrePacienteExt"] != "" && GET["nombrePacienteExt"] != null) {
        nombrePacienteExt = GET["nombrePacienteExt"];
    }

    if (GET["extInt"] != "" && GET["extInt"] != null) {
        extInt = GET["extInt"];
       // alert(extInt);
    }

    traerEstudios();
});

function traerEstudios() {
 var json = JSON.stringify({ "idPaciente": idPaciente, "nombrePacienteExt": nombrePacienteExt, "extInt": extInt });
 $.ajax({
     type: "POST",
     url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerEstudioViejo",
     data: json,
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: cargarLista,
     complete: function () {
         $("#resultados").DataTable();
         $('.sorting').click();
         $(".sorting_asc").click();
         $(".sorting_desc").click();
         $('.dataTables_scrollBody').show();

//         var table = $('#resultados').DataTable();
//         $('#resultados').css('display', 'block');
//         table.columns.adjust().draw();
     },

     error: errores
 });
}

function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function cargarLista(resultado) {
    var lista = resultado.d;

    $("#resultados").empty();
    var Encabezado = "";
    var Contenido = "";
    $.each(lista, function (index, item) {
        Contenido = Contenido + "<tr style='height:20px; cursor:pointer' id='" + item.id + ";overflow:scroll; width:auto'>" +
           "<td style='width:1%;cursor:pointer'>" +
           "<td id='seccional" + item.id + "' style='text-aling:center' onclick='seleccionar(" + item.id + ")'>" + item.seccional + "</div></td>" +
           "<td id='protocolo" + item.id + "' style='text-aling:center' class='txtDesdeSalidaS' onclick='seleccionar(" + item.id + ")'>" + item.protocolo + "</div></td>" +
           "<td id='apellido" + item.id + "' style='text-aling:center' onclick='seleccionar(" + item.id + ")'>" + item.apellido + "</div></td>" +
           "<td id='tipo_doc" + item.id + "' style='text-aling:center' onclick='seleccionar(" + item.id + ")'>" + item.tipo_doc + "</div></td>" +
           "<td id='documento_real" + item.id + "' style='text-aling:center' onclick='seleccionar(" + item.id + ")'>" + item.documento_real + "</div></td>" +
           "<td id='hc" + item.id + "' style='text-aling:center' onclick='seleccionar(" + item.id + ")'>" + item.hc + "</div></td>" +
           "<td id='medico" + item.id + "' style='text-aling:center' class='txtFechaNotificacionDesdeS' onclick='seleccionar(" + item.id + ")'>" + item.medico + "</div></td>" +
           "<td id='fechaCarga" + item.id + "' style='text-aling:center' class='txtFechaDiagnosticoDesdeS' onclick='seleccionar(" + item.id + ")'>" + item.fechaCarga + "</div></td>" +
           "<td id='fecha_entrega" + item.id + "' style='text-aling:center' class='txtFechaDiagnosticoDesdeS' onclick='seleccionar(" + item.id + ")'>" + item.fecha_entrega + "</div></td>" +
           "<td id='condicionMuestra" + item.id + "' style='text-aling:center' class='cboMuestraAdecuacionS' onclick='seleccionar(" + item.id + ")'>" + item.condicionMuestra + "</div></td>" +
           "<td id='evaluacion" + item.id + "' style='text-aling:center' class='txtDniS' onclick='seleccionar(" + item.id + ")'>" + item.evaluacion + "</div></td>" +
           "<td id='vinculable" + item.id + "' style='text-aling:center' class='txtDniS' onclick='seleccionar(" + item.id + ")'>" + item.vinculable + "</div></td>" +
           "<td id='diagnostico" + item.id + "' style='text-aling:center' class='txtNhc' onclick='seleccionar(" + item.id + ")'>" + item.diagnostico + "</div></td>" +
           "<td id='glandulares" + item.id + "' style='text-aling:center' class='cboCelulasGlandularesS' onclick='seleccionar(" + item.id + ")'>" + item.glandulares + "</div></td>" +
           "<td id='escamosas" + item.id + "' style='text-aling:center' class='cboValoracionHormonalS' onclick='seleccionar(" + item.id + ")'>" + item.escamosas + "</div></td>" +
           "<td id='comentarioDiagnostico" + item.id + "' style='text-aling:center' class='txtSeccionalS' onclick='seleccionar(" + item.id + ")'>" + item.comentarioDiagnostico + "</div></td>" +
           "<td id='otros_comentario" + item.id + "' style='text-aling:center' class='txtSeccionalS' onclick='seleccionar(" + item.id + ")'>" + item.otros_comentario + "</div></td>" +
           "<td id='otrosElementos" + item.id + "' style='text-aling:center' class='cboMicroorganismosS' onclick='seleccionar(" + item.id + ")'>" + item.otrosElementos + "</div></td>" +
           "<td id='superficiales" + item.id + "' style='text-aling:center' class='cboCategoriaGeneralS' onclick='seleccionar(" + item.id + ")'>" + item.superficiales + "</div></td>" +
           "<td id='intermedias" + item.id + "' style='text-aling:center' class='cboSalaPerifericaS' onclick='seleccionar(" + item.id + ")'>" + item.intermedias + "</div></td>" +
           "<td id='parabasales" + item.id + "' style='text-aling:center' class='cboHallazgosS' onclick='seleccionar(" + item.id + ")'>" + item.parabasales + "</div></td>" +
           "<td id='aspecto" + item.id + "' style='text-aling:center' class='cboCategoriaGeneralS' onclick='seleccionar(" + item.id + ")'>" + item.aspecto + "</div></td>" +
           "<td id='presencia" + item.id + "' style='text-aling:center' class='cboSalaPerifericaS' onclick='seleccionar(" + item.id + ")'>" + item.presencia + "</div></td>" +
           "<td id='elementos" + item.id + "' style='text-aling:center' class='cboHallazgosS' onclick='seleccionar(" + item.id + ")'>" + item.elementos + "</div></td>";



    });

    var Pie = "</tbody></table>";
    $("#resultados").html(Contenido + Pie);

    //if (lista.lenght > 0) { $("#mensaje").show(); } else { $("#mensaje").hide(); }

}

function LoadDataTable() {
    oTabla = $('#resultados').DataTable({
        "bAutoWidth": true,
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "350px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
//                fixedHeader: {
//                    header: true,
//                    footer: false
//                },
        //"columnDefs": [{ "visible": false, "targets": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}],
        "aaSorting": [],
        "language": {
            "zeroRecords": "Sin Resultados"
        }
    });
}


function seleccionar(id) {
extInt
imprimir("../Impresiones/Patologia/PAP_Estudio_Viejo.aspx?" +
    "&seccional=" + $("#seccional" + id).html() +
    "&protocolo=" + $("#protocolo" + id).html() +
    "&apellido=" + $("#apellido" + id).html() +
    "&tipo_doc=" + $("#tipo_doc" + id).html() +
    "&documento_real=" + $("#documento_real" + id).html() +
    "&hc=" + $("#hc" + id).html() +
    "&medico=" + $("#medico" + id).html() +
    "&fechaCarga=" + $("#fechaCarga" + id).html() +
    "&fecha_entrega=" + $("#fecha_entrega" + id).html() +
    "&condicionMuestra=" + $("#condicionMuestra" + id).html() +
    "&evaluacion=" + $("#evaluacion" + id).html() +
    "&vinculable=" + $("#vinculable" + id).html() +
    "&diagnostico=" + $("#diagnostico" + id).html() +
    "&glandulares=" + $("#glandulares" + id).html() +
    "&escamosas=" + $("#escamosas" + id).html() +
    "&comentarioDiagnostico=" + $("#comentarioDiagnostico" + id).html() +
    "&otros_comentario=" + $("#otros_comentario" + id).html() +
    "&otrosElementos=" + $("#otrosElementos" + id).html() +
    "&superficiales=" + $("#superficiales" + id).html() +
    "&intermedias=" + $("#intermedias" + id).html() +
    "&parabasales=" + $("#parabasales" + id).html() +
    "&aspecto=" + $("#aspecto" + id).html() +
    "&presencia=" + $("#presencia" + id).html() +
    "&elementos=" + $("#elementos" + id).html() +
    "&extInt=" + extInt, 0);
}