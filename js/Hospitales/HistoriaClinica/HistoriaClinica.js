var Anio_Actual = 0;
var Mes_Actual = 0;
var Seccion_Actual = 0;
var NHC = 0;
var IntId = 0;
var Consultorio = 0;
var Guardia = 0;
var Lista = 0;
var InterCons = 0;
var Med = 0;
var Esp = 0;
var Ind = 0;
var IdGuardia = 0;
var IDInter = -1;
var PacienteId = 0;
var objBusquedaLista = "";
var Compras = 0;
var QuirofanoTurnoId = 0;
var afiliadoCuil = 0;
var medicoId = 0;
var agrupadoEscaneos = null;
var tipoEscaneo = null;

$("#btnOpciones").click(function () {
    $("#myModalOpciones").modal('show');
});

////OPCIONES////

function AltaComplejidad() {
    //var Pagina = "../Impresiones/EstudioAltaComplejidad.aspx ";
    $("#myModalSeleccion").modal('show');
}

function pedidoMateriales() {
    $.fancybox({
        'autoDimensions': false,
        'href': "PedidodeMateriales.aspx?afiliadoId=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + "&M=1",
        'width': '100%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'showCloseButton': true
    });
 }

$(".opcion").click(function () {
    var Pagina;
    switch ($(this).attr('name')) {
        case "1":
            var Pagina = "../AtConsultorio/EstudiosAltaComplejidad.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + " ";
            break;
        case "2":
            var Pagina = "PedidodeMateriales.aspx?afiliadoId=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + "&M=1" + " ";
            break;
    }

    Pagina = Pagina.slice(0, -1);
    $.fancybox({
        'autoDimensions': false,
        'href': Pagina,
        'width': '100%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'showCloseButton': true
    });
});

function CertificadoMedico() {
    //var Pagina = "../Impresiones/CertificadoMedicoN.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + " ";
    //alert($("#afiliadoId").val());
    //alert($("#medicoId").val());
    var Pagina = "../AtConsultorio/CertificadoMedico.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': true
		}
	        );
}


function CargadeEstudios(Id) {
    var Pagina = "../AtConsultorio/CargadeEstudios.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': false
		}
	        );
}


function SolicitudCirugia() {
    var Pagina = "../AtConsultorio/Solicitud_Cirugia_Programada.aspx?NHC=" + $("#afiliadoId").val() +  " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': false
		}
	        );
}


function SolicitudHemodinamia() {
    var Pagina = "../AtConsultorio/Solicitud_Hemodinamia_Programada.aspx?NHC=" + $("#afiliadoId").val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': false
		}
	        );
}


////para ver diabetes en hc

function Diabetologia() { CargarAfiliadoIdVPN(); }



function CargarAfiliadoIdVPN() {
    //alert("DBT: " + afiliadoCuil);
    var json = JSON.stringify({ "afiliadoCuil": afiliadoCuil });
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerIdXCuilDBT",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            //alert("resultado: " +Resultado.d);
            $("#afiliadoIdVPN").val(Resultado.d);
            if ($("#afiliadoIdVPN").val() != "0") {
                comprobarDBT();

            } else { alert("ATENCIÓN! OCURRIÓ UN INCOVENIENTE CON LOS DATOS DEL AFILIADO COMUNÍQUESE CON AFILICIONES") }
        },
        error: errores
    });
}

function comprobarDBT() {

    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerUsuarioExterno",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) { Pagina = "//10.10.8.71:8095?NHC=" + $("#afiliadoIdVPN").val() + "&VolverListado=1&MostrarBtnCancelar=1" + "&medico=" + Resultado.d; },
        complete: function () {
            $.fancybox(
		                    {
		                        'autoDimensions': false,
		                        'href': Pagina,
		                        'width': '100%',
		                        'height': '105%',
		                        'autoScale': false,
		                        'transitionIn': 'none',
		                        'transitionOut': 'none',
		                        'type': 'iframe',
		                        'hideOnOverlayClick': false,
		                        'enableEscapeButton': false,
		                        'showCloseButton': true
		                    });
        },
        error: errores
    });
}


////para ver diabetes en hc



//Estudios Otras Instituciones

function EstudiosOtras() {
    //var Pagina
    //window.open(, 'Nombre Ventana');

    var ancho = 900;
    var alto = 600;
    var posicion_x = (screen.width / 2) - (ancho / 2);
    var posicion_y = (screen.height / 2) - (alto / 2);
    var pagina = "../historiaClinica/OtrasInstituciones.aspx?numero=" + $("#CargadoNHC").html() + " ";
    var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
    window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");



//    Pagina = Pagina.slice(0, -1);
//    $.fancybox({
//		    'autoDimensions': false,
//		    'href': Pagina,
//		    'width': '100%',
//		    'height': '100%',
//		    'autoScale': false,
//		    'transitionIn': 'none',
//		    'transitionOut': 'none',
//		    'type': 'iframe',
//		    'hideOnOverlayClick': true,
//		    'enableEscapeButton': false,
//		    'showCloseButton': true
//		});
}

//Estudios Otras Instituciones

///Escaneos Internos
function EscaneosInternos() {
    var ancho = 900;
    var alto = 600;
    var posicion_x = (screen.width / 2) - (ancho / 2);
    var posicion_y = (screen.height / 2) - (alto / 2);
    var pagina = "../historiaClinica/OtrasInstituciones.aspx?numero=" + $("#CargadoNHC").html() + "&Int=1" + " ";
    var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
    window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
}
///Escaneos Internos


//obitos

function obitos() {
    var ancho = 900;
    var alto = 600;
    var posicion_x = (screen.width / 2) - (ancho / 2);
    var posicion_y = (screen.height / 2) - (alto / 2);
    var pagina = "../Legales/Obitos.aspx?AfiliadoId=" + $("#afiliadoId").val() + " ";
    var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
    window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
}

//obitos

//vacunas

function vacunas() {
    var ancho = 900;
    var alto = 600;
    var posicion_x = (screen.width / 2) - (ancho / 2);
    var posicion_y = (screen.height / 2) - (alto / 2);
    var pagina = "../Vacunacion/vacunacion.aspx?afiliadoId="+ $("#afiliadoId").val() +"&InternacionId=H";
    var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
    window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
}

//vacunas


//COVID

function SospechaCOVID() {

//    alert($("#afiliadoId").val());
    var pagina = "../Guardia/ListarCOVID_PDF.aspx?afiliadoId=" + $("#afiliadoId").val();
    $.fancybox(
		{
		    'autoDimensions': true,
		    'href': pagina,
		    'width': '70%',
		    'height': '70%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe'
		}
	        );
}

//COVID

function SolicituddeTraslado() {
    var Pagina = "../AtConsultorio/SolicituddeTraslado.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': false
		}
	        );
}


function Receta() {
    var Pagina = "../AtConsultorio/Receta.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + "&EspId=" + 0 + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '80%',
		    'height': '90%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': false
		}
	        );
}



function OrdenesInternacion() {
    var Pagina = "../AtConsultorio/OrdenInternacion.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'showCloseButton': false,
		    'width': '100%',
		    'height': '110%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}


//NHC=337572&MedicoId=80000437&EspecialidadId=191&F=06/05/2015%2018:00
function ConsultaG() {

    json1 = JSON.stringify({ "MedicoId":  $("#medicoId").val() });
    $.ajax({
        type: "POST",
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/TraerEspecialidadxMedico",
        contentType: "application/json; charset=utf-8",
        data: json1,
        dataType: "json",
        success: function (Resultado2) {

            json = JSON.stringify({ "afiliadoId": $("#afiliadoId").val() });
            $.ajax({
                type: "POST",
                url: "../Json/HistoriaClinica/HistoriaClinica.asmx/VerificarTurnoExistente",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    //alert(Resultado.d);
                    if (Resultado.d == 1) {
                        var Pagina = "../AtConsultorio/Consulta_General.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId").val() + "&EspecialidadId="+ Resultado2.d +"&F=" + $("#Fecha_Hora").val() + " ";
                        Pagina = Pagina.slice(0, -1);
                        $.fancybox({
                            'autoDimensions': false,
                            'href': Pagina,
                            'showCloseButton': false,
                            'width': '100%',
                            'height': '110%',
                            'autoScale': false,
                            'transitionIn': 'none',
                            'transitionOut': 'none',
                            'type': 'iframe',
                            'hideOnOverlayClick': false,
                            'enableEscapeButton': false
                        });
                    } else { alert("El afiliado tiene turno para el día de la fecha"); }
                },
                error: errores
            });

        },
        error: errores
    });
}

////OPCIONES////

function InicioSesion() {
    alert("Error: Inicie Sesión Nuevamente.");
    parent.document.location = "../Login.aspx";
}

function ObtenerMedico() {
    $.ajax({
        type: "POST",
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/MedicoporUsuario",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            //            if (Resultado.d > 0) { $("#btnOpciones").show(); $("#medicoId").val(Resultado.d); return; }
            //            if (Resultado.d == 0) { $("#btnOpciones").hide(); return; } //No tiene relacion con ningun medico.
            //            if (Resultado.d == -1) { $("#btnOpciones").hide(); InicioSesion(); return; } //Perdio Sesion.
            //alert(Resultado.d);
            if (Resultado.d > 0) { $(".ocultar").show(); $("#medicoId").val(Resultado.d); return; }
            if (Resultado.d == 0) { $(".ocultar").hide(); return; } //No tiene relacion con ningun medico.
            if (Resultado.d == -1) { $(".ocultar").hide(); InicioSesion(); return; } //Perdio Sesion.

        },
        error: errores
    });
}

$(document).ready(function () {

    $('.tree li').each(function () {
        if ($(this).children('ul').length > 0) {
            $(this).addClass('parent');
        }
    });

    $('.tree li.parent > a').click(function () {
        $(this).parent().toggleClass('active');
        $(this).parent().children('ul').slideToggle('fast');
    });


    var GET = {};


    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    ObtenerMedico();

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
    }
    if (GET["IntId"] != "" && GET["IntId"] != null) {
        IntId = GET["IntId"];
        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Historia Clínica Detallada</strong>";
    }
    if (GET["Cons"] != "" && GET["Cons"] != null) { //Viene de consultorio
        Consultorio = 1;
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Historia Clínica > Detallada</strong>";
    }
    if (GET["Guardia"] != "" && GET["Guardia"] != null) { //Viene de Guardia
        Guardia = 1;
        IdGuardia = GET["Id"];
        parent.document.getElementById("DondeEstoy").innerHTML = "Guardia > <strong>Historia Clínica > Detallada</strong>";
    }

    if (GET["Lista"] != "" && GET["Lista"] != null) { //Viene de Paciente del Dia
        Lista = GET["Lista"];
        Med = GET["Med"];
        Esp = GET["Esp"];
        Ind = GET["Ind"]; //Index del pac selec
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > Pacientes del Día > <strong>Historia Clínica Detallada</strong>";
    }

    if (GET["InterID"] != "" && GET["InterID"] != null) { //Viene de Interconsultas
        InterCons = 1;
        Med = GET["Med"];
        Esp = GET["Esp"];
        IDInter = GET["InterID"];
        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Interconsultas solicitadas</strong>";
    }

    if (GET["B"] != "" && GET["B"] != null) { //At Internados, lista Servicios
        objBusquedaLista = GET["B"];
    }


    if (GET["C"] != "" && GET["C"] != null) {
        Compras = GET["C"];
    }

    //para dbt
    if (GET["afiliadoCuil"] != "" && GET["afiliadoCuil"] != null) { afiliadoCuil = GET["afiliadoCuil"]; }
    //alert(afiliadoCuil);
    //para dbt
});


function CargarAnio(Anio, Seccion) {
    agrupadoEscaneos = 1; 
    Seccion_Actual = Seccion;
    Anio_Actual = Anio;
    tipoEscaneo = null;
    CargarConsultaResumen();
    
}


function CargarAnioyMes(Anio, Mes, Seccion) {
    agrupadoEscaneos = null;
    tipoEscaneo = Mes;
    Seccion_Actual = Seccion;
    Anio_Actual = Anio;
    Mes_Actual = Mes;
    CargarConsultaResumen();    
}



function CargarConsultaResumen() {

    var json = "";
    var laUrl = "";

    if (Seccion_Actual == 1) {
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Internacion_Datos";
        $("#TablaAmbulatorio").hide();
        $("#TablaCirugia").hide();
        $("#TablaInternacion").show();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Registro de Internaciones - " + Anio_Actual);
    }


    if (Seccion_Actual == 2) {
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Cirugia_Datos";
        $("#TablaAmbulatorio").hide();
        $("#TablaInternacion").hide();
        $("#TablaCirugia").show();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Cirugias - " + Anio_Actual);
    }

    if (Seccion_Actual == 3) {
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual, "mes": Mes_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Ambulatorio_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").show();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Antecedentes Ambulatorios - " + ObtenerMes(Mes_Actual) + " de " + Anio_Actual);
    }

    if (Seccion_Actual == 4) { //Recetas
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Recetas_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").show();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Recetas de Medicamentos - " + Anio_Actual);
    }

    if (Seccion_Actual == 5) { //Guardia
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Guardia_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").show();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Atención en Guardia - " + Anio_Actual);
    }

    if (Seccion_Actual == 6) { //Labo
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual }); //Mando el afiliadoID para buscar los protocolos de ese pac y de ese año
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Labo_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").show();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Protocolos de Laborotorio - " + Anio_Actual);
    }

    if (Seccion_Actual == 7) { //Interconsultas
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Interconsultas_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").show();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Interconsultas - " + Anio_Actual);
    }


    if (Seccion_Actual == 8) { //IMAGENES
        //PacienteId
        //json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        json = JSON.stringify({ "nhc": PacienteId, "anio": Anio_Actual, "PacienteId": $("#afiliadoId").val(), "AxionNumeroHC": axionnumerohc });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Imagenes_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").show();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Diagnóstico por Imágenes - " + Anio_Actual);
    }

    if (Seccion_Actual == 9) { //ANATOMIA PATOLOGICA
        //PacienteId
        //json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });

        json = JSON.stringify({ "nhc": PacienteId, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/AnatomiaPatologica_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").show();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Anatomía Patológica - " + Anio_Actual);
    }

    //ENDOSCOPIA
    if (Seccion_Actual == 10) {
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Endoscopia_Datos";
        $("#TablaAmbulatorio").hide();
        $("#TablaCirugia").hide();
        $("#TablaInternacion").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").show();
        $(".DatoHistoriaClinica").html("Registro de Endoscopias - " + Anio_Actual);
    }

    //BACTERIO
    if (Seccion_Actual == 11) { //Labo
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual }); //Mando el afiliadoID para buscar los protocolos de ese pac y de ese año
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Labo_Datos_Bacterio";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").show();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Protocolos de Laborotorio - " + Anio_Actual);
    }
    //BACTERIO


    //ODONTO
    if (Seccion_Actual == 12) { //Labo
        //            json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual }); //Mando el afiliadoID para buscar los protocolos de ese pac y de ese año
        //            Pagina = "../Json/HistoriaClinica/HistoriaClinica.asmx/Labo_Datos_Bacterio";
        //            $("#TablaInternacion").hide();
        //            $("#TablaCirugia").hide();
        //            $("#TablaAmbulatorio").hide();
        //            $("#TablaRecetas").hide();
        //            $("#TablaLaboratorio").show();
        //            $("#TablaInterconsultas").hide();
        //            $("#TablaImagenes").hide();
        //            $("#TablaAnatomiaPatologica").hide();
        //            $("#TablaEndoscopia").hide();
        //            $(".DatoHistoriaClinica").html("Protocolos de Laborotorio - " + Anio_Actual);

        $("#cargando").hide();
        $.fancybox({
            'autoDimensions': false,
            'href': '../AtConsultorio/CargaAtencion_Odontologia.aspx?NHC=' + NHC + '&MedicoId=0&EspecialidadId=0&F=&XHC=1',
            'width': '100%',
            'height': '100%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    }

    $("#fancybox-close").click(function () { $("#cargando").hide(); });
    //ODONTO


    //OTRAS
    if (Seccion_Actual == 13) {
        //alert(NHC, Anio_Actual);
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual }); //Mando el afiliadoID para buscar los protocolos de ese pac y de ese año
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Otras_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaOtras").show();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Estudios Otras Instituciones - " + Anio_Actual);
    }
    //OTRAS


    //INTERNOS
    if (Seccion_Actual == 14) {
         //alert(NHC, Anio_Actual);
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual, "tipo": tipoEscaneo, "agrupado": agrupadoEscaneos });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Internos_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaOtras").show();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $(".DatoHistoriaClinica").html("Estudios Otras Instituciones - " + Anio_Actual);
    }
    //INTERNOS

    //PRACTICA ESPECIALISTA
    if (Seccion_Actual == 15) {
   // alert("nhc" + NHC + " anio " + Anio_Actual + " mes " + Mes_Actual );
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual, "mes": Mes_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Especialista_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $("#TablaEspecialista").show();
        $(".DatoHistoriaClinica").html("Prácticas Especialista - " + ObtenerMes(Mes_Actual) + " de " + Anio_Actual);
    }
    //PRACTICA ESPECIALISTA


    //HEMODINAMIA INTERNACION
    if (Seccion_Actual == 16) {
        // alert("nhc" + NHC + " anio " + Anio_Actual + " mes " + Mes_Actual );
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual, "mes": Mes_Actual, "tipo": 1 });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Hemodinamia_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $("#TablaEspecialista").hide();
        $("#TablaHemodinamiaAmb").hide();
        $("#TablaHemodinamiaInt").show();
        $(".DatoHistoriaClinica").html("Hemodinamia - " + ObtenerMes(Mes_Actual) + " de " + Anio_Actual);
    }
    //HEMODINAMIA INTERNACION

    //HEMODINAMIA AMBULATORIO
    if (Seccion_Actual == 17) {
        // alert("nhc" + NHC + " anio " + Anio_Actual + " mes " + Mes_Actual );
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual, "mes": Mes_Actual, "tipo": 2 });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Hemodinamia_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaLaboratorio").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $("#TablaEspecialista").hide();
        $("#TablaHemodinamiaInt").hide();
        $("#TablaHemodinamiaAmb").show();
        $(".DatoHistoriaClinica").html("Hemodinamia - " + ObtenerMes(Mes_Actual) + " de " + Anio_Actual);
    }
    //HEMODINAMIA AMBULATORIO


    //ESTUDIOS COMPLEMENTARIOS
    if (Seccion_Actual == 18) {
        json = JSON.stringify({ "nhc": NHC, "anio": Anio_Actual });
        laUrl = "../Json/HistoriaClinica/HistoriaClinica.asmx/Complementarios_Datos";
        $("#TablaInternacion").hide();
        $("#TablaCirugia").hide();
        $("#TablaAmbulatorio").hide();
        $("#TablaRecetas").hide();
        $("#TablaOtras").hide();
        $("#TablaInterconsultas").hide();
        $("#TablaImagenes").hide();
        $("#TablaAnatomiaPatologica").hide();
        $("#TablaEndoscopia").hide();
        $("#TablasComplementarios").show();
        $(".DatoHistoriaClinica").html("Estudios Complementarios - " + Anio_Actual);
    }
    //ESTUDIOS COMPLEMENTARIOS

    $.ajax({
        type: "POST",
        data: json,
        url: laUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#cargando").show();
            $(".contenido").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $(".contenido").show();
        },
        success: CargarConsultaResumen_Cargadas,
        error: errores
    });

}

function ObtenerMes(Mes) {
    if (Mes != 0) {
        var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return meses[Mes - 1];
    }
    else {
        return "";
    }
}

function CargarConsultaResumen_Cargadas(Resultado) {

    var Practicas = Resultado.d;
    $('#TInternacion').empty();
    $('#TCirugia').empty();
    $('#TAmbulatorio').empty();
    $('#TRecetas').empty();
    $('#TLabo').empty();

    $('#TOtras').empty();
    $("#TEspecialista").empty();
    $("#THemodinamiaInt").empty();
    $("#THemodinamiaAmb").empty();
    $("#TComplementarios").empty();
    
    var Datos = "";
    if (Seccion_Actual == 1) {
        $.each(Practicas, function (index, p) {
            var ioe = 2;
            if (p.egreso == null || p.egreso == '')
            {
                ioe = 1;
            }
            Datos = Datos + "<tr onclick='javascript:Imprimir(1," + p.id + "," + ioe + ");' class='mano'><td>" + p.ingreso + "</td><td>" + p.egreso + "</td><td>" + p.servicio + "</td><td>" + p.motivoingreso + "</td><td>" + p.motivoegreso + "</td><td>" + p.especialidad + "</td><td>" + p.medico + "</td></tr>";
        });
        $('#TInternacion').html(Datos);
    }

    if (Seccion_Actual == 2) {
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(2," + p.id + ",0);' class='mano'><td>" + p.fecha + "</td><td>" + p.cirugia + "</td><td>" + p.medico + "</td><td>" + p.diagnostico + "</td><td>" + p.especialidad + "</td></tr>";
        });
        $('#TCirugia').html(Datos);
    }

    if (Seccion_Actual == 3) {
        $.each(Practicas, function (index, p) {
            var T = 1;
            if (p.tipo == "D") { T = 2; }
            if (p.tipo == "GU") { T = 4; }
            if (p.tipo == "NEO") { T = 5; }
            Datos = Datos + "<tr onclick='javascript:ImprimirAmb(" + p.id + "," + T + ");' class='mano'><td>" + p.fecha + "</td><td>" + p.especialidad + "</td><td>" + p.medico + "</td><td>" + p.diagnostico + "</td></tr>";
        });
        $('#TAmbulatorio').html(Datos);
    }

    if (Seccion_Actual == 4) {
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(4," + p.id + ",0);' class='mano'><td>" + p.fecha + "</td><td>" + p.especialidad + "</td><td>" + p.medico + "</td><td>" + p.diagnostico + "</td></tr>";
        });
        $('#TRecetas').html(Datos);
    }

    if (Seccion_Actual == 5) {
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(5," + p.id + ",0);' class='mano'><td>" + p.fecha + "</td><td>" + p.especialidad + "</td><td>" + p.medico + "</td><td>" + p.diagnostico + "</td></tr>";
        });
        $('#TRecetas').html(Datos);
    }

    if (Seccion_Actual == 6) {
        $.each(Practicas, function (index, p) {
            
            //alert(p.ruta);
            var res = p.ruta;
            var rut = "";
            //rut = res.replace("http://10.10.8.71", "http://gesinmed.policlinicocentral.org.ar");
            rut = res.replace("http://10.10.8.71", "http://" + window.location.hostname);
            //if (window.location.hostname == "gesinmed.policlinicocentral.org.ar") { }

            //rut = res.replace("http://10.10.8.71", window.location.hostname);
            //alert(rut);

            Datos = Datos + "<tr onclick='javascript:Imprimir(6," + index + ",0);' class='mano'><td>" + p.protocolo + "</td><td>" + p.tipoorden + "</td><td>" + p.complejidad + "</td><td>" + p.fecha + "</td><td style='display:none;' id='proto" + index + "'>" + rut + "</td></tr>";
        });
        $('#TLabo').html(Datos);
    }

    if (Seccion_Actual == 7) { //Interconsultas
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(7," + p.id + ",0);' class='mano'><td>" + p.fecha + "</td><td>" + p.medsol + "</td><td>" + p.espinter + "</td><td>" + p.medinter + "</td><td>" + p.motivo + "</td></tr>";
        });
        $('#TInter').html(Datos);
    }


    if (Seccion_Actual == 8) { //Imagenes
        var cursorAnestesia = "";
        var titulo = "";
        $.each(Practicas, function (index, p) {
            if (p.IMG_PATH.indexOf(".DOC") > -1) {
                Datos = Datos + "<tr onclick='javascript:Word(this)'; data-word='" + p.IMG_PATH + "'; class='mano'><td>" + p.IMG_FECHA_INICIO + "</td><td>" + p.TIMG_DESCRIPCION + "</td></tr>";
            }
            else {
                //Datos = Datos + "<tr onclick='javascript:Imprimir(8, " + p.IMG_PATH + ", " + p.IMG_NUMERO + ")'; class='mano'><td>" + p.IMG_FECHA_INICIO + "</td><td>" + p.TIMG_DESCRIPCION + "</td></tr>";
                //com.pixeon.launch://10.84.3.7:80/arya?login=prueba&password=prueba&PatientId=40492519&AccessionNumber=
                //Datos = Datos + "<tr onclick='javascript:Imprimir(8, " + p.IMG_PATH + ", " + p.IMG_NUMERO + ")'; class='mano'><td>" + p.IMG_FECHA_INICIO + "</td><td>" + p.TIMG_DESCRIPCION + "</td></tr>";

                var IMAGEN_LINK = "";
                if (p.WORK_LIST_NUMERO != "") {
                    IMAGEN_LINK = "<a href='com.pixeon.launch://10.10.8.169:80/arya?login=rayos&password=rayos&PatientId=&AccessionNumber=" + p.WORK_LIST_NUMERO + "' class='mano'>Imagen</a>";
                }
                if (p.TIENE_ANESTESIA == 1) { cursorAnestesia = "mano"; titulo = "VER PARTE ANESTESIA"; } else { cursorAnestesia = ""; titulo = ""; }
                Datos = Datos + "<tr><td><a onclick='javascript:Imprimir(8, " + p.IMG_PATH + ", " + p.IMG_NUMERO + ")'; class='mano'>Informe</a> " + IMAGEN_LINK + "</td>" +
                "<td class='" + cursorAnestesia + "' title='" + titulo + "' onclick='javascript:verAnestesia(" + p.IMG_TURNO_ID_CAB + ")'; >" + p.IMG_FECHA_INICIO + "</td>" +
                "<td class='" + cursorAnestesia + "' title='" + titulo + "' onclick='javascript:verAnestesia(" + p.IMG_TURNO_ID_CAB + ")'; >" + p.TIMG_DESCRIPCION + "</td></tr>";
            }
        });
        $('#TImg').html(Datos);
    }

    if (Seccion_Actual == 9) { //Anatomia Patologica
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(9," + p.PAT_NUMERO + ",0);' class='mano'><td>" + p.PAT_FECHA_INICIO + "</td><td>" + p.PMAT_DESCRIPCION + "</td><td>" + p.MED_APELLIDO_NOMBRE + "</td></tr>";
        });
        $('#TAnaPato').html(Datos);
    }

    if (Seccion_Actual == 10) {
        var susp;
        $.each(Practicas, function (index, p) {
            if (p.susp > 0) { susp = "style='background-color:red'"; } else { susp = ""; }
            Datos = Datos + "<tr onclick='javascript:Imprimir(10," + p.id + ",0);' class='mano' " + susp + " ><td>" + p.fecha + "</td><td>" + p.cirugia + "</td><td>" + p.medico + "</td><td>" + p.diagnostico + "</td><td>" + p.especialidad + "</td></tr>";
        });
        $('#TEndo').html(Datos);
    }

    //Labo Bacterio
    if (Seccion_Actual == 11) {
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(6," + index + ",0);' class='mano'><td style='width:10px'>" + p.protocolo + "</td><td style='width:10px'>" + p.tipoorden + "</td><td style='width:10px'>" + p.complejidad + "</td><td style='width:10px'>" + p.fecha + "</td><td style='display:none;' id='proto" + index + "'>" + p.ruta + "</td></tr>";
        });
        $('#TLabo').html(Datos);

    }
    //Labo Bacterio


    //Otras
    if (Seccion_Actual == 13) {
        $.each(Practicas, function (index, p) {
            //alert(p.id);                                         //p.documentacion_autorizacion_id
            Datos = Datos + "<tr onclick='javascript:Imprimir(13," + p.id + ",1);' class='mano'><td style='width:10px'>" + p.documentacion_fecha + "</td><td style='width:10px'>" + p.nombre + "</td></tr>";
        });
        $('#TOtras').html(Datos);
    }
    //Otras

    //Escaneos internos
    if (Seccion_Actual == 14) {

        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(14," + p.id + ",0);' class='mano'><td style='width:10px'>" + p.documentacion_fecha + "</td><td style='width:10px'>" + p.nombre + "</td></tr>";
        });

        $('#TOtras').html(Datos);
    }
    //Escaneos internos

    //practica especialista
    if (Seccion_Actual == 15) {
        //alert();
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(15," + p.id + ",0);' class='mano'><td style='width:10px'>" + p.fecha + "</td><td style='width:10px'>" + p.especialidad + "</td><td style='width:10px'>" + p.medico + "</td><td style='width:10px'>" + p.diagnostico + "</td></tr>";
        });

        $('#TEspecialista').html(Datos);
    }
    //    //practica especialista

    //hemodinamia internacion
    if (Seccion_Actual == 16) {
        //alert();
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(16," + p.id + ",0);' class='mano'><td style='width:10px'>" + p.fecha + "</td><td style='width:10px'>" + p.especialidad + "</td><td style='width:10px'>" + p.medico + "</td><td style='width:10px'>" + p.diagnostico + "</td></tr>";
        });

        $('#THemodinamiaInt').html(Datos);
    }
    //hemodinamia internacion

    //hemodinamia ambulatorio
    if (Seccion_Actual == 17) {
        //alert();
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(16," + p.id + ",0);' class='mano'><td style='width:10px'>" + p.fecha + "</td><td style='width:10px'>" + p.especialidad + "</td><td style='width:10px'>" + p.medico + "</td><td style='width:10px'>" + p.diagnostico + "</td></tr>";
        });

        $('#THemodinamiaAmb').html(Datos);
    }
    //hemodinamia ambulatorio


    //estudios complementarios
    if (Seccion_Actual == 18) {
        //alert();
        $.each(Practicas, function (index, p) {
            Datos = Datos + "<tr onclick='javascript:Imprimir(18," + p.Id + "," + p.id_practica + ");' class='mano'><td style='width:10px'>" + p.fecha + "</td><td style='width:40%'>" + p.Medico + "</td><td style='width:20%'>" + p.tipo + "</td><td style='display:none' id='medicoId" + p.Id + "'>" + p.id_medico + "</td></tr>";
        });

        $('#TComplementarios').html(Datos);
    }
    //estudios complementarios

}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Word(cual) {

    var Pagina = "http://" + $(cual).data("word");
    //Imagenes                
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );

}

function Imprimir(seccion, Id, ioe) {
    var Pagina = "";
    if (seccion == '1') {
        //Internacion
        Pagina = "../HistoriaClinica/VerInternacionVarios.aspx?IntId=" + Id + "&NHC=" + $("#afiliadoId").val() + " "; //Para ver IM, Epicrisis, Evolucion.

    }

    if (seccion == '2') {
        //Ciru        
        QuirofanoTurnoId = Id;
        IMPRESION_ESTADO(QuirofanoTurnoId);
        return;
        //Pagina = "../Impresiones/Quirofano_Protocolo.aspx?Cirugia_Id=" + Id + "&Id=" + Id + " ";
    }

    //Recetas
    if (seccion == '4') Pagina = "../Impresiones/Recetario.aspx?Protocolo=" + Id + " ";

    if (seccion == '5') Pagina = "../Impresiones/GuardiaAtencionPrint.aspx?Id=" + Id + " ";

    if (seccion == '6') {

        Pagina = $("#proto" + Id).html();
    }

    if (seccion == '7') {

        Pagina = "../Impresiones/ImpresionInterconsulta.aspx?Id=" + Id + " ";
    }

    if (seccion == '8') {
        if (ioe >= 6 && ioe < 90) {
            //Pagina = "../Impresiones/Impresiones_IMG/IMG_Informe.aspx?TurnoId=" + Id + " ";
            Pagina = "../Impresiones/Impresiones_IMG/IMG_Informe_html.aspx?TurnoId=" + Id + " ";            
        }
        else if (ioe > 90) {
            //Pagina = "../Impresiones/Impresiones_IMG/IMG_Informe_Rapido.aspx?TurnoId=" + Id + " ";
            Pagina = "../Impresiones/Impresiones_IMG/IMG_Informe_html_rapido.aspx?TurnoId=" + Id + " ";
        }
        else{
            alert("El estudio no ha sido informado.");
            return;
        }
    }


    if (seccion == '9') {

        // Pagina = "../Impresiones/Anatomia_Patologica/AP_HC.aspx?Protocolo=" + Id + " "; ;
        Pagina = "../Impresiones/Patologia/Patologia_Estudio.aspx?id=-"+ Id + "&PDF=1";
    }

    if (seccion == '10') {
        //Endoscopia
        Pagina = "../HistoriaClinica/VerEndoscopiaVarios.aspx?IntId=" + Id + "&NHC=" + $("#afiliadoId").val() + " "; //Para ver IM, Epicrisis, Evolucion.

    }

    if (seccion == '13') {
        Pagina = "../HistoriaClinica/verEscaneos.aspx?id=" + Id + "&int=1" + " "; //Para ver otras instituciones.
    }

    if (seccion == '14') {
        Pagina = "../HistoriaClinica/verEscaneos.aspx?id=" + Id + "&int=1"; //Para ver otras instituciones.
    }

    if (seccion == '15') {
        Pagina = "../Impresiones/At_Int_Impresion_PracticaEspecialista.aspx?ID=" + Id + " "; //Para ver evolucion especialista.
    }

    if (seccion == '16') {
        QuirofanoTurnoId = Id;
        IMPRESION_ESTADO_HEMO(QuirofanoTurnoId);
        return;

         //   Pagina = "../Impresiones/Hemodinamia/Hemodinamia_Datos_Internacion.aspx?Cirugia_id=" + Id + " "; //Para ver hemodinamia.
    }


    if (seccion == '18') {
        //Pagina = "../Impresiones/At_Int_Impresion_PracticaEspecialista.aspx?ID=" + Id + " "; //Para ver estudios complementarios
        // Pagina = "../EstudiosComplementarios/EstudiosComplementarios.aspx?NHC=" + $("#afiliadoId").val() + "&Internado=" + 1 + "&MedicoId=" + $("#medicoId").val() + " ";

        switch (ioe) { 
    case 1:
        Pagina = "../Impresiones/ImpresionEstudiosComplementarios/ImpresionElectromiografia.aspx?Id_Afiliado=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId" + Id).html();
        break;
    case 2:
        Pagina = "../Impresiones/ImpresionEstudiosComplementarios/ImpresionPolisomnografia.aspx?Id_Afiliado=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId" + Id).html();
        break;
    case 3:
        Pagina = "../Impresiones/ImpresionEstudiosComplementarios/ImpresionElectroencefalograma.aspx?Id_Afiliado=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId" + Id).html();
        break;
    case 4:
        Pagina = "../Impresiones/ImpresionEstudiosComplementarios/ImpresionMAPA.aspx?Id_Afiliado=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId" + Id).html();
        break;
    case 5:
        Pagina = "../Impresiones/ImpresionEstudiosComplementarios/ImpresionHolter.aspx?Id_Afiliado=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId" + Id).html();
        break;
    case 6:
        Pagina = "../Impresiones/ImpresionEstudiosComplementarios/ImpresionRiesgoQuirurgico.aspx?Id_Afiliado=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId" + Id).html();
        break;
    case 7:
        Pagina = "../Impresiones/ImpresionEstudiosComplementarios/ImpresionReflujo.aspx?Id_Afiliado=" + $("#afiliadoId").val() + "&MedicoId=" + $("#medicoId" + Id).html();
        break;
        }

    }

    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}




function ImprimirAmb(Id, Tipo) {

    //obtiene el id del medico que genero la impresion genero la impresion de ambulatorio para traer la firma
    $.ajax({
        type: "POST",
        url: "../Json/firmaDigital.asmx/AtConsultorioCargadePGeneralImpresion",
        data: '{protocolo: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            medicoId = Resultado.d;


            var Pagina = "";

            if (Tipo == 2) {
                Pagina = "../Impresiones/CDDiabetes.aspx?Protocolo=" + Id + " ";
            }

            if (Tipo == 1) {
                Pagina = "../Impresiones/CDGeneral.aspx?Protocolo=" + Id + "&medicoId=" + medicoId + " ";
            }

            if (Tipo == 3) {
                Pagina = "../Impresiones/Guardia.aspx?Protocolo=" + Id + " ";
            }

            if (Tipo == 4) {
                Pagina = "../Impresiones/GuardiaAtencionPrint.aspx?Id=" + Id + " ";
            }

            if (Tipo == 5) {
                Pagina = "../Impresiones/Impresion_Neo.aspx?Protocolo=" + Id + " ";
            }

            Pagina = Pagina.slice(0, -1);
            $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );

        }
            ,
        error: errores
    });

}


function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function IMPRESION_ESTADO(CirugiaId) {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/IMPRESION_ESTADO",
        data: '{CirugiaID: "' + CirugiaId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            $("#btnR28").hide();
            $("#btnProtocolo").hide();
            $("#btnPost").hide();
            $("#btnInsumoQX").hide();
            $("#btnParte").hide();
            $("#btnExtrasn").hide();
            $("#btnExtrasv").hide();
            $("#btnPre").hide();

            var est = Resultado.d;
            console.log(est);
            if (est.R28) { $("#btnR28").show(); }
            if (est.Protocolo) { $("#btnProtocolo").show(); }
            if (est.Post) { $("#btnPost").show(); }
            if (est.InsumoQX) { $("#btnInsumoQX").show(); }
            if (est.Parte) { $("#btnParte").show(); }
            if (est.Extra_v) { $("#btnExtrasv").show(); }
            if (est.Extra_n) { $("#btnExtrasn").show(); }
            if (est.Pre) { $("#btnPre").show(); }

            $(".selector_quirofano").show();

        },
        error: errores
    });
}

function IMPRESION_ESTADO_HEMO(CirugiaId) {
    $.ajax({
        type: "POST",
        url: "../Json/Hemodinamia.asmx/IMPRESION_ESTADO",
        data: '{CirugiaID: "' + CirugiaId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            $("#btnR28H").hide();
            $("#btnProtocoloH").hide();
            $("#btnPostH").hide();
            $("#btnInsumoQXH").hide();
            $("#btnParteH").hide();
            $("#btnExtrasnH").hide();
            $("#btnExtrasvH").hide();
            $("#btnPreH").hide();

            var est = Resultado.d;
            console.log(est);
            if (est.R28) { $("#btnR28H").show(); }
            if (est.Protocolo) { $("#btnProtocoloH").show(); }
            if (est.Post) { $("#btnPostH").show(); }
            if (est.InsumoQX) { $("#btnInsumoQXH").show(); }
            if (est.Parte) { $("#btnParteH").show(); }
            if (est.Extra_v) { $("#btnExtrasvH").show(); }
            if (est.Extra_n) { $("#btnExtrasnH").show(); }
            if (est.Pre) { $("#btnPreH").show(); }

            $(".selector_hemodinamia").show();

        },
        error: errores
    });
}

function varificarDBT(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/VerificarDBT",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            switch (Resultado.d) {
                case 0:
                    $("#btnDBT").removeClass('btn-success');
                    $("#btnDBT").addClass('btn-danger');
                    $("#btnDBT").text('Diabetes mas de 6 meses');
                    $("#DBT").show();
                    break;
                case 1:
                    $("#btnDBT").removeClass('btn-danger');
                    $("#btnDBT").addClass('btn-success');
                    $("#btnDBT").text('Diabetes OK');
                    $("#DBT").show();
                    break;
            }
        },
        error: errores
    });
}
//control de diabetes ok
function CargarPacienteID(ID) {
    varificarDBT(ID);
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        complete: function () {
            $("#mostrarantecedentes").click();
        },
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        else {
            $("#btnVencimiento").show();
        }

        //$('#fotopaciente').attr('src', '../img/Pacientes/' + NHC + '.jpg');
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        //PacienteId = paciente.Soc_Id;
        PacienteId = paciente.documento;
    });
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}


$('#mostrarantecedentes').click(function () {
    $('.MenuHistoriaClinica').fadeIn(1000);
    $('.MenuHistoriaClinica').animate({ 'margin-left': '0' });
});


$('#cerrarantecedentes').click(function () {
    $('.MenuHistoriaClinica').fadeOut(1000);
    $('.MenuHistoriaClinica').animate({ 'margin-left': '-250' });
});


$("#btnVolver").click(function () {
    if (Lista == 1) { document.location = "../AtConsultorio/PacientesDelDia.aspx?Esp=" + Esp + "&Med=" + Med + "&Ind=" + Ind + "&NHC=" + NHC; return; }
    if (Guardia == 1) { document.location = "../Guardia/Listado.aspx?Id=" + IdGuardia; return; }
    if (InterCons == 1) { document.location = "../AtInternados/InterconsultaMedico.aspx?IDInter=" + IDInter + "&Esp=" + Esp + "&Med=" + Med; return; }
    if (Consultorio == 0 && Compras == 0) { document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + IntId + "&B=" + objBusquedaLista; return; }
    if (Compras == 1) document.location = "../Compras/Compras_Auditar_Pedidos.aspx";
    if (Compras == 2) document.location = "../Compras/Compras_Auditar_Pedidos_Internacion.aspx"; // manuel
    else document.location = "../HistoriaClinica/BuscarPacienteHC.aspx";
});


function ImprimirQX(QuePantalla , H) {
    var Pagina = "";
switch(QuePantalla) {
    case 1:
        //R28
        if (H == 1) { Pagina = "../Impresiones/Hemodinamia/Resolucion28.aspx?Id=" + QuirofanoTurnoId; } else { Pagina = "../Impresiones/Resolucion28.aspx?Id=" + QuirofanoTurnoId; }
        break;
    case 2:
        //Protocolo
        if (H == 1) { Pagina = "../Impresiones/Hemodinamia/Hemodinamia_Protocolo.aspx?Id=" + QuirofanoTurnoId; } else { Pagina = "../Impresiones/Quirofano_Protocolo.aspx?Id=" + QuirofanoTurnoId; }
        break;
    case 3:
        //Post
        if (H == 1) { Pagina = "../Impresiones/Hemodinamia/Hemodinamia_Impresion_Post.aspx?Cirugia_Id=" + QuirofanoTurnoId; } else { Pagina = "../Impresiones/Quirofano_Impresion_Post.aspx?Cirugia_Id=" + QuirofanoTurnoId; }
        break;
    case 4:
        //Insumos QX
        if (H == 1) { Pagina = "../Impresiones/Hemodinamia/Hemodinamia_Insumos.aspx?CirugiaId=" + QuirofanoTurnoId + "&Tipo=2"; } else { Pagina = "../Impresiones/Quirofano_Insumos.aspx?CirugiaId=" + QuirofanoTurnoId + "&Tipo=2"; }
        break;
    case 5:
        //Parte Anestesia
        //        var date = new Date();
        //        var limite = "01/01/2021";
        //        var time = date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();
        //        if (Date.parse(time) >= Date.parse(limite)) {

        var tipo;
        if (H == 1) { tipo = 4 } else { tipo = 1}
        var json = JSON.stringify({ "id": QuirofanoTurnoId, "tipo": tipo });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/TraerIdParteAnestesia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d > 0) { Pagina = "../Impresiones/Quirofano/ParteAnestesiaImpresion.aspx?id=" + Resultado.d + "&tipo=1"; }
                else { Pagina = "../Impresiones/Quirofano_ParteAnestesia.aspx?Cirugia_id=" + QuirofanoTurnoId; }
            },
            error: errores
        });



        break;
    case 6:
        //Extras
        if (H == 1) { Pagina = "../Impresiones/Hemodinamia/ProtesisyOtros.aspx?Id=" + QuirofanoTurnoId; } else { Pagina = "../Impresiones/ProtesisyOtros.aspx?Id=" + QuirofanoTurnoId; }
        break;
    case 7:
        //Extras nuevo
        if (H == 1) { Pagina = "../Impresiones/Hemodinamia/ProtesisyOtros2.aspx?Id=" + QuirofanoTurnoId; } else { Pagina = "../Impresiones/Quirofano/ProtesisyOtros2.aspx?Id=" + QuirofanoTurnoId; }
        break;
    case 8:
        //Pre
        if (H == 1) { Pagina = "../Impresiones/Hemodinamia/Pre_Anestesico.aspx?Id=" + QuirofanoTurnoId; } else { Pagina = "../Impresiones/Pre_Anestesico.aspx?Id=" + QuirofanoTurnoId; }
        break;    
}

if (QuePantalla == 5) {
    window.setTimeout(function () {
        $.fancybox({ 'autoDimensions': false,
            'href': Pagina,
            'width': '100%',
            'height': '100%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    }, 1000);
} else {
    $.fancybox({ 'autoDimensions': false,
        'href': Pagina,
        'width': '100%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false
    });
}


}

function recargarArbol() {
    document.location = "../HistoriaClinica/HistoriaClinica.aspx?NHC=" + $("#afiliadoId").val() + "&Cons=1&C=0&afiliadoCuil=" + afiliadoCuil;
}

function verAnestesia(IMG_TURNO_ID_CAB) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': "../Quirofano/PlanillaAnestesia.aspx?NHC=" + $("#CargadoNHC").html() + "&cirugiaId=" + IMG_TURNO_ID_CAB + "&tipo=3",
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}


function ocultarModal() {
    $("#myModalSeleccion").modal('hide');
}

function evolucionEspecialista() {

    // alert($("#CargadoNHC").html());


    var json = JSON.stringify({ "afiliadoId": $("#afiliadoId").val() });
    $.ajax({
        type: "POST",
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/VerificarInternado",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
//            alert(Resultado.d.internado);
//            alert(Resultado.d.internacion);
            if (Resultado.d.internado == 0) { alert("Paciente no internado!"); }
            else {
                Pagina = "../AtInternados/evoluciónEspecialista.aspx?NHC=" + $("#afiliadoId").val() + "&INT=" + Resultado.d.internacion + "&tipo=2" + " ";
                Pagina = Pagina.slice(0, -1);
                $.fancybox({
                    'autoDimensions': false,
                    'href': Pagina,
                    'width': '100%',
                    'height': '100%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'showCloseButton': true
                });
            }
        },
        error: errores
    });
}


function EstudiosComplementarios() {
    var json = JSON.stringify({ "afiliadoId": $("#afiliadoId").val() });
    $.ajax({
        type: "POST",
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/VerificarInternado",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            //ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + " ";
            var Pagina = "../EstudiosComplementarios/EstudiosComplementarios.aspx?NHC=" + $("#afiliadoId").val() + "&Internado=" + Resultado.d.internacion + "&MedicoId=" + $("#medicoId").val() + " ";
            Pagina = Pagina.slice(0, -1);
            $.fancybox({
                'autoDimensions': false,
                'href': Pagina,
                'width': '70%',
                'height': '80%',
                'autoScale': false,
                'transitionIn': 'none',
                'transitionOut': 'none',
                'type': 'iframe',
                'hideOnOverlayClick': false,
                'enableEscapeButton': false,
                'preload': true,
                'onComplete': function () {
                    jQuery.fancybox.showActivity();
                    jQuery('#fancybox-frame').load(function () {
                        jQuery.fancybox.hideActivity();
                    });
                }
            });
        }
    });
}

