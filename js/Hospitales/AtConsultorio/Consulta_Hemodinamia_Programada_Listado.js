var avisoCirugia = 0;

function Listar() {

    //FDesde = "01/01/2019";
    //FHasta = "01/01/2022";

    //----------- Se arma logica para poder visualizar un listado que va de 1 año y medio hacia atras y
    //----------- 1 año y medio hacia adelante de la fecha en la que se hace la consulta
    //para saber la fecha actual
    myFecha = new Date();
    //para saber el año nada mas (se usa base 10 para la conversion)
    anio = parseInt(myFecha.getFullYear(), 10);
    //armamos la fecha para poder ver un listado que puede variar de 6 meses a un año y 6 meses ANTERIOR a partir de la fecha actual
    anioAnterior = anio - 1;
    //armamos la fecha para poder ver un listado que puede variar de 6 meses a un año y 6 meses POSTERIOR a partir de la fecha actual
    anioPosterior = anio + 1;

    FDesde = "01/06/" + anioAnterior.toString();
    FHasta = "01/06/" + anioPosterior.toString();

//----------------


    Paciente = "";
    NHC = "0";
    Documento = "0";
    Anulado = false;
    Finalizado = $("#ck_finalizado").is(':checked');

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorio_Cirugia_Programada_UltimaEtapa_x_Paciente_Listar",
        data: '{PacienteId: 0, FDesde: "' + FDesde + '", FHasta: "' + FHasta + '", Paciente: "' + Paciente + '", NHC: "' + NHC + '", Documento: "' + Documento + '", Anulado: "' + Anulado + '", Finalizado: "' + Finalizado + '", Etapa: "' + $("input[name='etapa']:checked").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Listado_Listado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Listado_Listado(Resultado) {
    $("#tabla_cirugia").empty();    
    var Datos = "";
    var Cirugias = Resultado.d;
    var Etapa = "";
    var color = "";
    $.each(Cirugias, function (index, Cirugia) {
        //alert(Cirugia.Etapa + "//" + Cirugia.EtapaId);

        if (Cirugia.EtapaId > 1) { color = "#82e0aa"; } else { color = ""; }
        if (Cirugia.ResultadoEtapa == 0) { Etapa = Cirugia.Etapa + " (No Aprobada)"; } else { Etapa = Cirugia.Etapa; }
        //&& Cirugia.EtapaId == 3
        Datos = Datos + "<tr style='background-color:"+ color +"'>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.FechaInicio + "</td>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.Fecha_Limite + "</td>";
        Datos = Datos + "<td id='apellido" + Cirugia.CirugiaProgramadaID + "' onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.apellido + "</td>";
        Datos = Datos + "<td id='documento" + Cirugia.CirugiaProgramadaID + "'onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.documento_real + "</td>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.Seccional + "</td>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.Telefono + "</td>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Etapa + "</td>";
        Datos = Datos + "<td id='Etapa" + Cirugia.CirugiaProgramadaID + "' style='display:none'>" + Cirugia.EtapaId + "</td>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.Fecha + "</td>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.Usuario + "</td>";
        Datos = Datos + "<td onclick='CargarEstadoActual(" + Cirugia.CirugiaProgramadaID + ");'>" + Cirugia.Observacion + "</td>";
        Datos = Datos + "<td id='Fechaaviso1" + Cirugia.CirugiaProgramadaID + "' style='display:none'>" + Cirugia.FechaAviso1 + "</td>";
        Datos = Datos + "<td id='Fechaaviso2" + Cirugia.CirugiaProgramadaID + "' style='display:none'>" + Cirugia.Fechaaviso2 + "</td>";
        //Datos = Datos + "<td><a class='btn btn-danger' onclick='Anular(" + Cirugia.CirugiaProgramadaID + ")' >X</a></td>";
        Datos = Datos + "<td></td>";
        Datos = Datos + "</tr>";
    });
    $("#tabla_cirugia").html(Datos);
    if (avisoCirugia > 0)
    $.each($(".filtro"), function (index, item) { if ($(this).val() == avisoCirugia) { $(this).click(); } });
}

Listar();



var CirugiaActual = 0;

function CargarEstadoActual(CirugiaProgramadaID) {
    if ($("#Etapa" + CirugiaProgramadaID).html() == 7) { $("#fechasAviso").show(); $("#opc").css('height', '180px'); } else { $("#fechasAviso").hide(); $("#opc").css('height', '160px'); }
    $("#txt1fecha").val($("#Fechaaviso1" + CirugiaProgramadaID).html());
    $("#txt2fecha").val($("#Fechaaviso2" + CirugiaProgramadaID).html());

    CirugiaActual = CirugiaProgramadaID;
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorio_Cirugia_Programada_ProximaEtapa",
        data: '{CirugiaProgramadaID: "' + CirugiaProgramadaID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Etapa = Resultado.d;
            $("#span_etapa").html(Etapa.Descripcion);
            $("#txt_comentario").val(Etapa.Observacion);

            if (Etapa.EtapadId == "99") {
                $("#div_opciones_final").show();
                $("#div_opciones_seleccion").hide();                
            }
            else {
                $("#div_opciones_seleccion").show();
                $("#div_opciones_final").hide();

                if (Etapa.Descripcion.indexOf("Voucher") != -1) {
                    $("#div_voucher").show();
                }
                else{
                    $("#div_voucher").hide();
                }
            }


            $("#div_opcion").show();
        },
        error: errores
    });
}


function Guardar(Resultado) {

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorio_Cirugia_Programada_GuardarProximaEtapa",
        data: '{CirugiaProgramadaID: "' + CirugiaActual + '", Resultado: "' + Resultado + '", Comentario: "' + $("#txt_comentario").val() + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Etapa = Resultado.d;
            if (Etapa) {
                alert("Guardado");
                btn_Ocultar();
                Listar();
            }
        },
        error: errores
    });

}

function btn_Ocultar() {
    $("#div_opcion").hide();
}


function Anular(CirugiaProgramadaID) {

    if(!confirm("¿Desea anular de manera permanente la cirugía programada?"))
    {
        return;
    }

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorio_Cirugia_Programada_Anular",
        data: '{CirugiaProgramadaID: "' + CirugiaProgramadaID + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Etapa = Resultado.d;
            if (Etapa) {
                alert("Anulado");                            
            }
            Listar();
        },
        error: errores
    });
}




function ImprimirVaucher(Id) {
    $.fancybox(
        {
            'autoDimensions': false,
            //'href': '../Impresiones/Impresiones_IMG/img_Impresion_Informe.aspx?TurnoId=' + CirugiaActual,
            'href': '../AtConsultorio/Solicitud_Cirugia_Programada_Vaucher.aspx?TurnoId=' + CirugiaActual,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    }


    $(document).ready(function () {
        $(":radio").click(function () { Listar(); })

        var GET = {};

        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) { return decodeURIComponent(s.split("+").join(" ")); }
            GET[decode(arguments[1])] = decode(arguments[2]);
        });

        if (GET["avisoCirugia"] != null && GET["avisoCirugia"] != "") {
            avisoCirugia = GET["avisoCirugia"];
        }

        $('#ck_finalizado').change(function () {
            Listar();
        });


        $(".fAviso").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            maxDate: '0m'
        });

        $(".fAviso").change(function () {
            var tipo = 0;
            if ($(this).attr('id') == "txt1fecha") { tipo = 1; }
            if ($(this).attr('id') == "txt2fecha") { tipo = 2; }
            //            alert(CirugiaActual);
            //            alert($(this).val());
            //            alert(tipo);
            //            return false;
            $.ajax({
                type: "POST",
                url: "../Json/AtConsultorio/AtConsultorio.asmx/AtConsultorioCirugiaProgramadaGuardarFechaAviso",
                data: '{CirugiaProgramadaID: "' + CirugiaActual + '", fecha: "' + $(this).val() + '", tipo: "' + tipo + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    Listar();
                    //alert(CirugiaActual);
                },
                error: errores
            });
        });
    });