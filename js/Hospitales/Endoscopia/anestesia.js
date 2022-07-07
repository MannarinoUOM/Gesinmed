var oprimio = 0;
var color = "";
var valor = "";
var carga = [];
var minutos = [15, 30, 45];
var presion = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240];
var nombresFila = ["Posición del Paciente", "ANESTESIA", "TAS", "TAD", "TAM", "PVS", "FC", "Sat O2%", "ET CO2% mmHg", "O2", "SEV", "REMI"];
var idsFila = ["txtPosixion", "textAnestesia", "txtTas", "txtTad", "txtTam", "txtPvs", "txtFc"];
var NHC = "";
var cirugiaId = "";
var idCarga = 0;
var GET = {};

$(document).ready(function () {

    $("#txtDiagnostico").attr('disabled', true);

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["cirugiaId"] != "" && GET["cirugiaId"] != null) {
        cirugiaId = GET["cirugiaId"];
    }

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
    }

    //VALORES POR DEFAULT
    if (GET["diag"] != "" && GET["diag"] != null) {
        $("#txtDiagnostico").val(GET["diag"]);
        $("#txtDiagnostico").attr("disabled", true);
    }
    if (GET["cirugi"] != "" && GET["cirugi"] != null) {
        $("#txtRealizada").val(GET["cirugi"]);
        $("#txtRealizada").attr("disabled", true);
    }
    if (GET["ane"] != "" && GET["ane"] != null) {
        switch (GET["ane"]) {
            case 'GENERAL':
                $("#CheckGral").attr("checked", true);
                break;
            case 'NLA':
                $("#CheckNla").attr("checked", true);
                break;
            case 'LOCAL':
                $("#CheckRegional").attr("checked", true);
                break;
            case 'GENERAL ENDOVENOSA':
                $("#CheckIntub").attr("checked", true);
                break;
            case 'GENERAL INHALATORIA':
                $("#CheckMasc").attr("checked", true);
                break;
        }
    }
    //VALORES POR DEFAULT

    CargarMedicos();
    generarMarcoGrilla();
    // generarGrilla();
    CargarDiagnostico();
    $(function () {
        $("#slider").slider({
            //             values: [ 1, 2, 3, 4, 5 ],
            max: 5
        });
    });
    $("#slider").on("slidechange", function (event, ui) {
        $("#valorAsa").html("<b>" + $("#slider").slider("value") + "</b>");
    });

    $("#txtInicio").mask("##:##");
    $("#txtFin").mask("##:##");
    $("#txtAlas").mask("##:##");


    traerIdParte(cirugiaId);
});

////////Para crear la grilla
function generarGrilla() {
    var cabeza = "<table style='margin-left:0%'><thead style='border: 1px solid #CED5D8'><tr><td></td>"; 
    var fila = "<tr>";
    var pie = "</table>";
    var num = 5;
    var contMin = 0;
    var contId = 1;
    var clase = "celda";
    var cursor = "pointer";
    var editable = "";
    var data = "";
    //iteracion para saltos de linea
    for (var j = 1; j <= 21; j++) {
        if (j == 17 || j == 18) { clase = "celda ; numeroEntero"; cursor = ""; if (idCarga > 0) { editable = ""; } else { editable = "contenteditable"; } }
        if (j >= 19) { clase = "celda"; cursor = "pointer"; editable = ""; data="guion"; } 

        //iteracion para generacion de celdas en horizontal
        for (var i = 1; i <= 48; i++) {
            if (i == 48) {
                //genera ultima celda de cada fila
                fila = fila + "<td id='" + contId + "' style='cursor:" + cursor + "; border: 1px solid #CED5D8;width:180px; height:30px;' class='" + clase + "' data='" + data + "'  " + editable + " ></td></tr>"; num++; contId++;
            }
            else {
                var primeraFila = "";                              //genera primer celda de cada fila de la grilla con valores de presion                                                     // clase = "celda";             //genera primer celda de cada fila de la grilla con campo editable
                if (i == 1) { if (presion[(16 - j)] != undefined) { primeraFila = "<td style='border: 1px solid #CED5D8;width:180px; height:30px;'>" + presion[(16 - j)] + "</td>"; } else {  primeraFila = "<td id='" + contId + "' style='border: 1px solid #CED5D8;width:180px; height:30px;cursor:" + cursor + "' class='" + clase + "' data='" + data + "'  " + editable + " ></td>"; num++; contId++; } }
                //genera celdas en horizontal
               // if (j == 17 || j == 18) {alert(clase);}
                fila = fila + primeraFila + "<td id='" + contId + "' style='border: 1px solid #CED5D8;width:600px; height:30px;cursor:" + cursor + "' class='" + clase + "'  data='" + data + "'  " + editable + " ></td>"; num++; contId++;
            }
            console.log(contMin);
            //para generacion de encabezado de grilla
//            if (contMin <= 59 && $.inArray(i, minutos) > -1) {
//                if (i == 45) {
//                    cabeza = cabeza + "<th style='text-align: right;width:180px; height:30px; ' colspan='3' >" + i + "</th><th colspan='3' ></th>";
//                } else {
//                    cabeza = cabeza + "<th style='text-align: right;width:180px; height:30px;' colspan='3'>" + i + "</th>";
//                }
//                contMin = contMin + 5;
            //            }

            
        }
    }

    for (var x = 1; x <= 48; x++) {
        contMin = contMin + 5;

        if (contMin <= 59 && $.inArray(contMin, minutos) > -1) {
            cabeza = cabeza + "<td style='text-align:border: 1px solid #CED5D8;right; width:180px; height:30px;color:black'>&nbsp;&nbsp;&nbsp;" + minutos[$.inArray(contMin, minutos)] + "</td>";
        } else {
            cabeza = cabeza + "<td style='text-align:border: 1px solid #CED5D8;right; width:180px; height:30px;color:transparent'>&nbsp;123</td>";
        }
        if (contMin > 59) {contMin = 0;}
      }
    cabeza = cabeza + "</tr></thead>";

    $("#grilla").html(cabeza + fila + pie);
}
////////Para crear la grilla


////Para marcar las celdas elegidas
$(".celda").live("mouseout", function () {
    $(this).css("background-color", "yellow")
}, function () {

    if ($(this).hasClass("numeroEntero")) { return false; }

    if ($(this).attr('data') == "guion" && valor.length == "0" || $(this).attr('data') == "guion" && valor == "-") {
        if (oprimio == 1) {
            $(this).css("background-color", color);
            $(this).css("text-align", "center");
            $(this).html(valor);
            $(this).css("padding-left", "0");
            $(this).css("padding-right", "0");
            //  $(this).css("border", "0");
            $(this).css('font-weight', 'bold');
            $(this).css("font-size", "10px");
            $(this).css("width", "30px");
            $(this).css("height", "30px");
        }
    }
    if ($(this).attr('data') != "guion") {
        if (oprimio == 1) {
            $(this).css("background-color", color);
            $(this).css("text-align", "center");
            $(this).html(valor);
            $(this).css("padding-left", "0");
            $(this).css("padding-right", "0");
            //  $(this).css("border", "0");
            $(this).css('font-weight', 'bold');
            $(this).css("font-size", "10px");
            $(this).css("width", "30px");
            $(this).css("height", "30px");
        }
    }
});


$(".celda").live("click", function () {
    if ($(this).hasClass("numeroEntero")) { return false; }
    if ($(this).attr('data') == "guion" && valor.length == "0" || $(this).attr('data') == "guion" && valor == "-") {
        $(this).css("background-color", color);
        $(this).css("text-align", "center");
        $(this).html(valor);
        $(this).css("padding-left", "0");
        $(this).css("padding-right", "0");
        //  $(this).css("border", "0");
        $(this).css('font-weight', 'bold');
        $(this).css("font-size", "10px");
        $(this).css("width", "30px");
        $(this).css("height", "30px");
    } 
    if ($(this).attr('data') != "guion") {
        $(this).css("background-color", color);
        $(this).css("text-align", "center");
        $(this).html(valor);
        $(this).css("padding-left", "0");
        $(this).css("padding-right", "0");
        //  $(this).css("border", "0");
        $(this).css('font-weight', 'bold');
        $(this).css("font-size", "10px");
        $(this).css("width", "30px");
        $(this).css("height", "30px");
    }
});
////Para marcar las celdas elegidas


////Para obtener estado del mouse
$(".celda").live("mousedown", function (e) {
    //1: izquierda, 2: medio/ruleta, 3: derecho
    if (e.which == 1) {
        oprimio = 1;
    }
});

$(".celda").live("mouseup", function (e) {
    oprimio = 0;
});
////Para obtener estado del mouse


////Para obtener el valor y color elegido
$(".tipo").click(function () {
    valor = $(this).data('tipo');
    color = $(this).css('background-color');
    console.log(carga);
});
////Para obtener el valor y color elegido


$("#btnGuardar").click(function () {
    //    alert($("#CheckProtesis").is(":checked"));
    //    return false;

    if ($("#txtInicio").val().trim().length <= 4) { alert("Cargue la hora de inicio"); return false; }
    if ($("#txtFin").val().trim().length <= 4) { alert("Cargue la hora de fin"); return false; }
    if ($("#txtAlas").val().trim().length <= 4) { alert("Cargue la hora"); return false; }

    var datos = {};

    datos.cirugiaId = cirugiaId

    datos.anestesiologo = $("#txtAnestesiologo").val();
    datos.cirujano = $("#txtCirujano").val();
    datos.cardiologo = $("#txtCardiologo").val();
    datos.obstetra = $("#txtObstetra").val();
    datos.ayudante = $("#txtAyudante").val();

    datos.inicio = $("#txtInicio").val();
    datos.fin = $("#txtFin").val();
    datos.profilaxis = $("#txtProfilaxis").val();
    datos.diagnostico = $("#txtDiagnostico").val();
    datos.programada = $("#txtProgramada").val();
    datos.realizada = $("#txtRealizada").val();

    datos.asa = $("#valorAsa").text();

    if ($("#CheckProtesis").is(":checked")) { datos.protesis = 1; } else { datos.protesis = 0; }
    if ($("#CheckLentes").is(":checked")) { datos.lentes = 1; } else { datos.lentes = 0; }
    if ($("#CheckProteccion").is(":checked")) { datos.proteccion = 1; } else { datos.proteccion = 0; }
    if ($("#CheckGral").is(":checked")) { datos.general = 1; } else { datos.general = 0; }
    if ($("#CheckNla").is(":checked")) { datos.nla = 1; } else { datos.nla = 0; }
    if ($("#CheckRegional").is(":checked")) { datos.regional = 1; } else { datos.regional = 0; }
    if ($("#CheckIntub").is(":checked")) { datos.intub = 1; } else { datos.intub = 0; }
    if ($("#CheckMasc").is(":checked")) { datos.mask = 1; } else { datos.mask = 0; }
    if ($("#CheckEspontanea").is(":checked")) { datos.espontanea = 1; } else { datos.espontanea = 0; }
    if ($("#CheckAsistida").is(":checked")) { datos.asistida = 1; } else { datos.asistida = 0; }
    if ($("#CheckControlada").is(":checked")) { datos.controlada = 1; } else { datos.controlada = 0; }
    if ($("#CheckManual").is(":checked")) { datos.manual = 1; } else { datos.manual = 0; }
    if ($("#CheckMecanica").is(":checked")) { datos.mecanica = 1; } else { datos.mecanica = 0; }

    datos.venopuntura = $("#txtVenopuntura").val();
    datos.circuito = $("#txtCircuito").val();
    datos.premedic = $("#txtPremedic").val();
    datos.induc = $("#txtInduc").val();
    datos.mantenim = $("#txtMantenim").val();
    datos.tecnica = $("#txtTecnica").val();
    datos.posicion = $("#txtPosixion").val();
    datos.anestesia = $("#textAnestesia").val();
    datos.tas = $("#txtTas").val();
    datos.tad = $("#txtTad").val();
    datos.tam = $("#txtTam").val();
    datos.pvs = $("#txtPvs").val();
    datos.fc = $("#txtFc").val();

    carga.length = 0;
    $(".celda").each(function () {
        if ($(this).html().toString().length > 0) {
            carga.push($(this).attr('id') + "," + $(this).html());
        }
    });
    console.log(carga);

    datos.DescAnestesia = $("#txtDescAnestesia").val();
    datos.aldrete = $("#txtAcrcs").val();
    datos.pts = $("#txtPts").val();

    if ($("#chkAst").is(":checked")) { datos.ast = 1; } else { datos.ast = 0; }
    if ($("#chkDepresionR").is(":checked")) { datos.depresionR = 1; } else { datos.depresionR = 0; }
    if ($("#chkObedece").is(":checked")) { datos.obedece = 1; } else { datos.obedece = 0; }
    if ($("#chkAsf").is(":checked")) { datos.asf = 1; } else { datos.asf = 0; }
    if ($("#chkDepresionO").is(":checked")) { datos.depresionO = 1; } else { datos.depresionO = 0; }
    if ($("#CheckIntub").is(":checked")) { datos.intub = 1; } else { datos.intub = 0; }
    if ($("#chkConversa").is(":checked")) { datos.conversa = 1; } else { datos.conversa = 0; }
    if ($("#chkNvpo").is(":checked")) { datos.nvpo = 1; } else { datos.nvpo = 0; }
    if ($("#chkRecup").is(":checked")) { datos.recup = 1; } else { datos.recup = 0; }
    if ($("#chkHabit").is(":checked")) { datos.habit = 1; } else { datos.habit = 0; }
    if ($("#CheckManual").is(":checked")) { datos.manual = 1; } else { datos.manual = 0; }
    if ($("#chkNro").is(":checked")) { datos.nro = 1; } else { datos.nro = 0; }
    if ($("#chkUti").is(":checked")) { datos.uti = 1; } else { datos.uti = 0; }

    datos.alas = $("#txtAlas").val();
    datos.motivo = $("#txtMotivo").val();
    datos.observaciones = $("#txtObservaciones").val();
    datos.pasa = $("#txtPasa").val();

    console.log(datos);
    // return false;

    var json = JSON.stringify({ "id": idCarga, "celdas": carga, "datos": datos });
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/ParteAnestesiaGuardarEndoscopia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            // alert("Guardado");
            idCarga = Resultado.d;
            $("#btnImprimir").click();
            $("#btnImprimir").show();
            $("#btnGuardar").hide();


            $("form :input").attr("disabled", true);
            $(".celda").css("cursor", "default");
            $(".celda").removeClass("celda");
            $("#slider").slider("disable");
            $("#btnGuardar").hide();
            $("#btnImprimir").show();


        },
        error: errores
    });
});


$("#btnImprimir").click(function () {

    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': '../Impresiones/Endoscopia/ParteAnestesiaImpresion.aspx?id=' + idCarga,
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'onClose': function () { $("#btnVolver").click(); }

    });
});



//$("#btnCargar").click(function () {

function cargar(id) {
    $("form :input").attr("disabled", true);
    $(".celda").css("cursor", "default");
    $(".celda").removeClass("celda");
    $("#slider").slider("disable");
    $("#btnGuardar").hide();
    $("#btnImprimir").show();
    var json = JSON.stringify({ "id": id });
    $.ajax({
        type: "POST",
        url: "../Json/Endoscopia/Endoscopia.asmx/TraerParteAnestesiaEndoscopia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var a = Resultado.d;
            var lista = a[0].celdas.split("|");
            var lista2 = Resultado.d;

            $.each(lista, function (index, item) {
                //console.log(item.substr(0, item.indexOf(","))); // id de la celda
                //console.log(item.substr(item.indexOf(",") + 1, 1)); // valor a asignar a celda
                $("#" + item.substr(0, item.indexOf(","))).html(item.substr(item.indexOf(",") + 1, 1));
                $("#" + item.substr(0, item.indexOf(","))).css("font-size", "15px");
                $("#" + item.substr(0, item.indexOf(","))).css('font-weight', 'bold');

                switch (item.substr(item.indexOf(",") + 1, 1)) {
                    case ".":
                        $("#" + item.substr(0, item.indexOf(","))).css("background-color", "#FF5733"); //. Punto
                        break;
                    case "-":
                        $("#" + item.substr(0, item.indexOf(","))).css("background-color", "#FFFB33"); //- Guion
                        break;
                    case "v":
                        $("#" + item.substr(0, item.indexOf(","))).css("background-color", "#33FF76"); //v Tilde
                        break;
                    case "x":
                        $("#" + item.substr(0, item.indexOf(","))).css("background-color", "#33CCFF"); //x Equis
                        break;
                    case "^":
                        $("#" + item.substr(0, item.indexOf(","))).css("background-color", "#F3A9F1"); //^ Triangulo
                        break;
                    case "":
                        break;
                    default:
                        $("#" + item.substr(0, item.indexOf(","))).html(item.substr(item.indexOf(",") + 1, item.length));
                        $("#" + item.substr(0, item.indexOf(","))).prop('contenteditable', false)
                        break;
                }

            });

            $(".celda").css("text-align", "center");
            $(".celda").css('font-weight', 'bold');
            $(".celda").css("font-size", "40px");

            $.each(lista2, function (index, item2) {

                $("#txtAnestesiologo").val(item2.anestesiologo);
                $("#txtCirujano").val(item2.cirujano);
                $("#txtCardiologo").val(item2.cardiologo);
                $("#txtObstetra").val(item2.obstetra);
                $("#txtAyudante").val(item2.ayudante);
                //  alert(item2.inicio);
                $("#txtInicio").val(item2.inicio);
                $("#txtFin").val(item2.fin);
                $("#txtProfilaxis").val(item2.profilaxis);
                $("#txtDiagnostico").val(item2.diagnostico);
                $("#txtProgramada").val(item2.programada);
                $("#txtRealizada").val(item2.realizada);

                $("#valorAsa").html(item2.asa);

                $("#slider").slider("value", item2.asa);

                if (item2.protesis == 1) { $("#CheckProtesis").attr("checked", true); }
                if (item2.lentes == 1) { $("#CheckLentes").attr("checked", true); }
                if (item2.proteccion == 1) { $("#CheckProteccion").attr("checked", true); }

                if (item2.general == 1) { $("#CheckGral").attr("checked", true); }
                if (item2.nla == 1) { $("#CheckNla").attr("checked", true); }
                if (item2.regional == 1) { $("#CheckRegional").attr("checked", true); }
                if (item2.intub == 1) { $("#CheckIntub").attr("checked", true); }
                if (item2.mask == 1) { $("#CheckMasc").attr("checked", true); }
                if (item2.espontanea == 1) { $("#CheckEspontanea").attr("checked", true); }
                if (item2.asistida == 1) { $("#CheckAsistida").attr("checked", true); }
                if (item2.controlada == 1) { $("#CheckControlada").attr("checked", true); }
                if (item2.manual == 1) { $("#CheckManual").attr("checked", true); }
                if (item2.mecanica == 1) { $("#CheckMecanica").attr("checked", true); }
                $("#txtVenopuntura").val(item2.venopuntura);
                $("#txtCircuito").val(item2.circuito);
                $("#txtPremedic").val(item2.premedic);
                $("#txtInduc").val(item2.induc);
                $("#txtMantenim").val(item2.mantenim);
                $("#txtTecnica").val(item2.tecnica);
                $("#txtPosixion").val(item2.posicion);
                $("#textAnestesia").val(item2.anestesia);
                $("#txtTas").val(item2.tas);
                $("#txtTad").val(item2.tad);
                $("#txtTam").val(item2.tam);
                $("#txtPvs").val(item2.pvs);
                $("#txtFc").val(item2.fc);
                $("#txtDescAnestesia").val(item2.DescAnestesia);

                $("#txtAcrcs").val(item2.aldrete);
                $("#txtPts").val(item2.pts);

                if (item2.ast == 1) { $("#chkAst").attr("checked", true); }
                if (item2.depresionR == 1) { $("#chkDepresionR").attr("checked", true); }
                if (item2.obedece == 1) { $("#chkObedece").attr("checked", true); }
                if (item2.asf == 1) { $("#chkAsf").attr("checked", true); }
                if (item2.depresionO == 1) { $("#chkDepresionO").attr("checked", true); }
                if (item2.intub2 == 1) { $("#CheckIntub").attr("checked", true); }
                if (item2.conversa == 1) { $("#chkConversa").attr("checked", true); }
                if (item2.nvpo == 1) { $("#chkNvpo").attr("checked", true); }
                if (item2.recup == 1) { $("#chkRecup").attr("checked", true); }
                if (item2.habit == 1) { $("#chkHabit").attr("checked", true); }
                if (item2.manual2 == 1) { $("#CheckManual").attr("checked", true); }
                if (item2.nro == 1) { $("#chkNro").attr("checked", true); }
                if (item2.uti == 1) { $("#chkUti").attr("checked", true); }

                $("#txtAlas").val(item2.alas);
                $("#txtMotivo").val(item2.motivo);
                $("#txtObservaciones").val(item2.observaciones);
                $("#txtPasa").val(item2.pasa);


                cirugiaId = item2.cirugiaId;
                // c.usuario = row.usuario;
                idCarga = item2.id;
            });

        },
        error: errores
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}


function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {
        if (paciente.Vencido) {
            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
        }

        //VerificarPMI(paciente.documento);

        $("#btnCancelarPedidoTurno2").show();

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        if (paciente.NHC_UOM == "200") {
            $("#opciones_quiro").hide();
            $(".ver_mas_datos").hide();
            $("#IconoVencido2").hide();
            if (Id > 0) {
                $("#cambiar_paciente").show();
            }
            $("#btn_eliminar_cirugia_provisoria").show();
            $("#btn_otro_paciente2").hide();
        }

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        //var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        //if (AnioNacimiento.getFullYear() == 0) {
        //    edad = S / FN;
        //}

        $("#txt_dni").val(paciente.documento_real);

        $("#SpanCargando").show();
        $("#btnVencimiento").hide();

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);

        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#CargadoTelefono").html(paciente.Telefono);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function CargarMedicos() {
    var json = JSON.stringify({ "Especialidad": -1, "Medico_Predeterminado": -1 });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Listar_Medico_x_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $(".medico").append("<option value='" + 0 + "'>Seleccione</option>");
            $.each(Resultado.d, function (index, item) {
                $(".medico").append("<option value='" + item.Id + "'>" + item.Medico + "</option>");
            });
        },
        complete: function () {
            if (GET["anes"] != "" && GET["anes"] != null) {
                $("#txtAnestesiologo").val(GET["anes"]);
                $("#txtAnestesiologo").attr("disabled", true);
            }
            if (GET["cir"] != "" && GET["cir"] != null) {
                $("#txtCirujano").val(GET["cir"]);
                $("#txtCirujano").attr("disabled", true);
            }
            if (GET["ayt"] != "" && GET["ayt"] != null) {
                $("#txtAyudante").val(GET["ayt"]);
                $("#txtAyudante").attr("disabled", true);
            }
        },
        error: errores
    });
}

function CargarDiagnostico() {
    //var json = JSON.stringify({ "Especialidad": -1, "Medico_Predeterminado": -1 });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/QuirofanoDiagnosticoPlanificarCirugia",
        //data: json,
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        success: function (Resultado) {
            $("#txtDiagnostico").append("<option value='" + 0 + "'>Seleccione</option>");
            $.each(Resultado.d, function (index, item) {
                $("#txtDiagnostico").append("<option value='" + item.id + "'>" + item.descripcion + "</option>");
            });
        },
        error: errores
    });
}


function traerIdParte(idcirugia) {
            var json = JSON.stringify({ "id": idcirugia, "tipo": 1 });
            $.ajax({
                type: "POST",
                url: "../Json/Endoscopia/Endoscopia.asmx/TraerIdParteAnestesiaEndoscopia",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) { idCarga = Resultado.d; if (idCarga > 0) { cargar(idCarga); } },
                error: errores
            });
        }

        $("#btnVolver").click(function () { window.history.back(); });

        function generarMarcoGrilla() {
            var encabezado = "<table style='border: 1px solid #CED5D8'>";
            var fila = "";
            var pie = "</table>";

            for (var i = 0; i <= 11; i++) {
                if (i >= 7) {
                    fila = fila + "<tr><td style='border: 1px solid #CED5D8;width:300px; height:30px;' >" + nombresFila[i] + "</td><td colspan='48' rowspan='12' ></td></tr>";
                }
                else {
                    fila = fila + "<tr><td>" + nombresFila[i] + "<textarea style='height:30px; width:300px; border:none; list-style:true' id='" + idsFila[i] + "'></textarea></td><td rowspan='12' colspan='48' ><div id='grilla' ></div></td></tr>";
                }            
            }

        $("#marcoGrilla").html(encabezado + fila + pie);
        generarGrilla();
    }

    /////NUMERO ENTEROS
    $(".numeroEntero").live('keydown', function (e) {

        $(this).css("fontSize", "13px");
        $(this).css("text-align", "center");
        $(this).css("font-weight", "normal");

        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }

        if ($(this).html().toString().length >= 3) { return false; }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

    });

    $("#txtProgramada").on('keydown', function (e) {
        //alert(e.keyCode);

            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                return;
            }

            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }

    });