var CertificadoMostrado = false;
var idBorrar = 0;
var pacienteId = 0;
var resolucionesPendientes = 0;

parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > Autorizaciones > <strong>Buscar</strong>";

$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    var GET = {};
    //var pacienteId = "";
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

        if (GET["resolucionesPendientes"] != "" && GET["resolucionesPendientes"] != null) {
            resolucionesPendientes = GET["resolucionesPendientes"];
            //alert(resolucionesPendientes + "  load");
        }


    });
    if (GET["pacienteId"] != "" && GET["pacienteId"] != null) {
        pacienteId = GET["pacienteId"];
        CargarPacienteID(pacienteId);
        CargarAutorizacion(pacienteId);
    }
});


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

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        if (paciente.Vencido) {
            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
            $("#desdeaqui").hide();
            return false;
        }

        $("#txtnroturno").prop("readonly", true);

        $("#afiliadoId").val(paciente.documento);

        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);


        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#txtTelefono").attr('value', paciente.Telefono);

        $("#discapacidad_val").val(paciente.Discapacidad);

        //        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        //lo traer
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);

//                if (!CertificadoMostrado) {
//                    CertificadoVencido(paciente.documento);
//                    CertificadoMostrado = true;
//                }

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            if (paciente.ObraSocial.length > 40) {
                $("#CargadoSeccional").html(paciente.ObraSocial.substring(0, 37) + "...");
            } else {
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }
        }
        else {
            $("#btnVencimiento").show();
        }

        //        PMIPI = "";
        //        if (paciente.PMI && paciente.PI == false) {
        //            PMIPI = "PMI"
        //        }

        //        if (paciente.PMI == false && paciente.PI) {
        //            PMIPI = "PI"
        //        }

        //        if (PMIPI != "") {
        //            $("#CargadoSeccional").html($("#CargadoSeccional").html() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + PMIPI + "]");
        //        }

        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

        //        if (PError) {
        //            $("#desdeaqui").hide();
        //        }
        //        else {
        //            $("#desdeaqui").show();
        //        }
        //        $("#txtPaciente").focus();
        //        EstaInternado(); //Verifica si el paciente se encuentra internado en la clinica.
        //        UltimoAporte_OK(paciente.cuil, paciente.cod_pariente); //Verifica aportes en Padron UOM.
        //        VerificarPMI(paciente.documento);
//        alert(paciente.Discapacidad);
        PatologiabyId(paciente.Discapacidad);
        patologia = paciente.Discapacidad;
    });

}


function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function PatologiabyId(Id) {
    opcion = 1;
    if (opcion == 1) {
        if (Id <= 1) { $('#span_Discapacidad').html("PATOLOGÍA: NO"); $("#discapacidad_paga").val('S'); return; }
    } else {
        if (Id <= 1) { $('#span_Discapacidad2').html("PATOLOGÍA: NO"); $("#discapacidad_paga2").val('S'); return; }
    }
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, item) {
                $('#span_Discapacidad').html("PATOLOGÍA: " + item.patologias);
                $('#span_Discapacidad2').html("PATOLOGÍA: " + item.patologias);
                $("#discapacidad_paga").val(item.pagobono);
                $("#discapacidad_paga2").val(item.pagobono);
            });
        },
        error: errores
    });
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$("#btnVolver").click(function () {
    document.location = "../DerivacionyTraslado/DerivacionyTraslado.aspx?volver=" + $("#CargadoDNI").html() + "&opcion=2";
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CargarAutorizacion(id) {

    if (resolucionesPendientes == 1) {
        //alert(resolucionesPendientes + "  pendientes");
        var json = JSON.stringify({ "id": id });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/ChekearPendientes",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                cargarTablaEncabezado(lista);
            }
        });
    } 
    if (resolucionesPendientes == 0) {
        //alert(resolucionesPendientes + "  todas");
        var json = JSON.stringify({ "id": id, "cuantos": 1 });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEncabezado",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                cargarTablaEncabezado(lista);
            }
        });
    }
}     


    function cargarTablaEncabezado(lista) {
    
        $("#TablaBusqueda").empty();
        var Contenido = "";
        var Pie = "";
        var Encabezado = "";
        Encabezado = "<table class='tabla  table-condensed table-hover' style='width: 100%; overflow:auto'>" +
        "<thead style='height:0px'><tr><th  style='width:3%'></th>" +
        "<th style='padding:0px; text-align:center; width:6%'></th>" +
        "<th style='padding:0px; text-align:center; width:6%;color:Black'></th>" +
        "<th style='padding:0px; text-align:center; width:40%;color:Black' ></th>" +
        "<th style='padding:0px; text-align:center; width:35%;color:Black' ></th>" +
        "<th style='padding:0px; text-align:center; width:10%;color:Black'></th></tr></thead><tbody>";
        $.each(lista, function (index, item) {
            var numero = (parseInt(index) + 1);
            Contenido = Contenido + "<tr class='filas' id='" + item.numero + "'>" +
            "<td onclick='Selecciona(" + item.numero + ")' style='cursor:pointer; width:3%'>" + numero + "</td>" +
            "<td onclick='Selecciona(" + item.numero + ")' style='cursor:pointer; width:6%'>" + item.numero + "</td>" +
            "<td onclick='Selecciona(" + item.numero + ")' style='cursor:pointer; width:6%; padding:auto'>" + item.fecha + "</td>" +
            "<td onclick='Selecciona(" + item.numero + ")' style='cursor:pointer; width:40%'>" + item.comentarios + "</td>" +
            "<td onclick='Selecciona(" + item.numero + ")' style='cursor:pointer; width:35%'>" + item.especialidad + "</td>" +
            "<td onclick='adjuntar(" + item.numero + ")' style='cursor:pointer; width:10%'><a id='btnVerDoc' class='btn btn-info'><i class='icon-file'></i>&nbsp;&nbsp;Adjuntos</a></td>";
        });
        Pie = "</tbody></table>";
        $("#TablaBusqueda").html(Encabezado + Contenido + Pie);
    }


    function adjuntar(id) {
//        $.fancybox({
//            'href': "../DerivacionyTraslado/Escanear.aspx?numero=" + id,
//            'width': '100%',
//            'height': '75%',
//            'autoScale': false,
//            'transitionIn': 'elastic',
//            'transitionOut': 'none',
//            'type': 'iframe',
//            'hideOnOverlayClick': false,
//            'enableEscapeButton': false,
//            'preload': true,
//            'onComplete': function f() {
//                jQuery.fancybox.showActivity();
//                jQuery('#fancybox-frame').load(function () {
//                    jQuery.fancybox.hideActivity();
//                });
//            }
        //        });
        var ancho = 1000;
        var alto = 500;
        var posicion_x = 50;
        var posicion_y = 100;
        var win = window.open("../DerivacionyTraslado/Escanear.aspx?numero=" + id, "child", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
    }



    function Selecciona(indice){
    idBorrar = indice;
    $(".filas").css('background-color','#dddddd');
   $("#" + indice).css('background-color','aqua');
               $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerDetalle",
            contentType: "application/json; charset=utf-8",
            data: '{id: "' + indice + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
             cargarTablaDetalle(lista);
            }
        });

    }
    
        function cargarTablaDetalle(lista) {
    
        $("#TablaDetalle").empty();
        var Contenido = "";
        var Pie = "";
        var Encabezado = "";
        Encabezado = "<table class='tabla  table-condensed table-hover' style='width: 100%; overflow:auto'><thead style='height:0px'><tr>" +
        "<th  style='width:2%'></th>" +
        "<th style='padding:0px; text-align:center; width:6%'></th>" +
        "<th style='padding:0px; text-align:center; width:26%;color:Black'></th>" +
        "<th style='padding:0px; text-align:center; width:26%;color:Black' ></th>" +
        "<th style='padding:0px; text-align:center; width:26%;color:Black'></th>" +
        "<th style='padding:0px; text-align:center; width:8%;color:Black'></th>" +
        "<th style='padding:0px; text-align:center; width:7%;color:Black'></th>" +
        "</tr></thead><tbody>";
        $.each(lista, function (index, item) {
            var numero = (parseInt(index) + 1);
            Contenido = Contenido + "<tr><td style='text-aling:center'>" + numero + "</td>" +
            "<td style='text-aling:center'> " + item.codigo + " </td>" +
            "<td style='text-aling:center'>" + item.descripcion + "</td>" +
            "<td>" + item.subRubro + "</td>" +
            "<td>" + item.proveedor + "</td>" +
            "<td style='text-aling:center'>" + item.cantidad + "</td>" +
            "<td style='text-aling:center'>" + "$ " + item.importe + "</td>";
        });
        Pie = "</tbody></table>";
        $("#TablaDetalle").html(Encabezado + Contenido + Pie);
    }
    
    $("#BtnEditar").click(function (){
    document.location="";
    });

    $("#BtnBorrar").click(function () {
        //alert(idBorrar);
        if (idBorrar == 0) { alert("Seleccione un Registro Para Borrarlo"); return false; }
        var respuesta = confirm("Desea borrar este registo?");
        if (respuesta == true) {
            $.ajax({
                type: "POST",
                url: "../Json/Autorizaciones/Autorizaciones.asmx/ActualizarEstadoEncabezado",
                contentType: "application/json; charset=utf-8",
                data: '{id: "' + idBorrar + '"}',
                dataType: "json",
                success: function () {
                    CargarAutorizacion(pacienteId);
                    //$("#TablaBusqueda").empty();
                    $("#TablaDetalle").empty();
                }
            });
        } else { return false; }
    });

    $("#btnPlantilla").click(function () {
        if (idBorrar == 0) { alert("Seleccione una Autorizacion para Actualizar."); return false; }
        document.location = "../DerivacionyTraslado/DerivacionyTraslado.aspx?volver=" + $("#CargadoDNI").html() + "&idAutorizacion=" + idBorrar + "&copiar=1";
    });

    $("#BtnVerAutorizacionDetalle").click(function () {
        if (idBorrar == 0) { alert("Seleccione una Autorizacion para Visualizar su Contenido."); return false; }
        $.fancybox({
            'autoDimensions': false,
            'href': "../DerivacionyTraslado/AutorizacionDetalle.aspx?ID=" + idBorrar,
            'width': '90%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'elastic',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'preload': true,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            }
        });
    });

    $("#BtnBuscar").click(function () {
        if ($("#txtNumeroCarga").val().trim().length <= 0) { alert("Ingrese un número de carga para la busqueda."); return false; }

        var json = JSON.stringify({ "NumeroCarga": $("#txtNumeroCarga").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPacientePorNCarga",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                CargarPacienteID(Resultado.d);
            }
        });


        var json = JSON.stringify({ "id": $("#txtNumeroCarga").val(), "cuantos": 2 });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEncabezado",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#TablaDetalle").empty();
                if (lista.length == 0) {
                    alert("No se ha encotrado la carga.");
                    $("#TablaBusqueda").empty();
                    $("#TablaDetalle").empty();
                    return false;
                }
                cargarTablaEncabezado(lista);
            }
        });

    });

   