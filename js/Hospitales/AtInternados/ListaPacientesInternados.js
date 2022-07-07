var objBusquedaLista = "0";
var IntID = 0;
var NHCActual = 0;
var GET = {};
var servicio = ""; /// manuel
var sala = ""; /// manuel
var cama = ""; /// manuel
var EsUTI = 0;

$("#btnCerrar").click(function () {
    $(".hsuper_menu").removeClass("hsuper_menu_Accion");
    $(".hsuper_menu").css("margin-left", "900px");
});


function AltaComplejidad() {
    $("#myModalSeleccion").modal('show');
//    var Pagina = "../AtConsultorio/EstudiosAltaComplejidad.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + " ";
//    Pagina = Pagina.slice(0, -1);
//    $.fancybox(
//		{
//		    'autoDimensions': false,
//		    'href': Pagina,
//		    'width': '100%',
//		    'height': '100%',
//		    'autoScale': false,
//		    'transitionIn': 'none',
//		    'transitionOut': 'none',
//		    'type': 'iframe',
//		    'hideOnOverlayClick': false,
//		    'enableEscapeButton': false,
//		    'showCloseButton': true
//		}
//	        );
}

function Receta() {
    $("#ProtocoloImpresion").val("0"); //Valor para retornar de la impresion a la ventana de la receta... (0 no retorna)
    var Pagina = "../AtConsultorio/Receta.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspId=0" + " ";
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
		    'onClosed': function () {
		        if (parseInt($("#ProtocoloImpresion").val()) > 0) {
		            setTimeout(function () { LoadReceta($("#ProtocoloImpresion").val()); $("#ProtocoloImpresion").val("0"); }
                    , 500);
		        }
		    },
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': false
		});
}

function LoadReceta(Id) {
    CargarFancyRecetas("../AtConsultorio/Receta.aspx?Protocolo=" + $("#ProtocoloImpresion").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ");
}

function CargarFancyRecetas(Pagina) {
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
		});
}

function CertificadoMedico() {
    var Pagina = "../AtConsultorio/CertificadoMedico.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
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
    var Pagina = "../AtConsultorio/CargadeEstudios.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + " ";
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











var str = "";

$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }



    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["V"] != "" && GET["V"] != null && GET["V"] != undefined) {
        //objBusquedaLista = GET["V"];
        Buscar();
    }

    if (GET["B"] != "" && GET["B"] != null && GET["B"] != undefined) {
        objBusquedaLista = GET["B"];
        str = objBusquedaLista;
    }


   // alert(GET["Int"]);
    if (GET["Int"] != undefined) {
        $("#div1").css('margin-top', '0px');
        $("#div2").css('margin-top', '10px');
        $("#div3").css('margin-top', '0px');
        $(".pie_gris").css("top", "440px");
    } else {
        $("#div1").css('margin-top', '0px');
        $("#div2").css('margin-top', '10px');
        $("#div3").css('margin-top', '0px');
        $(".pie_gris").css("top", "440px");
    }

    CargarMedicos();
    CargarServicios();

});


function CargarServicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Servicio_Lista_A_At_Internados",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarServicios_Cargados,
        complete: function () {
            Buscar();
        },
        error: errores
    });
}

function CargarServicios_Cargados(Resultado) {
    var Servicios = Resultado.d;
    var Tabla_Datos = "";
    $("#TServicios").empty();
    var arrServ = str.split(',');
    $.each(Servicios, function (index, servicio) {
        var checked = "";
        if ($.inArray(servicio.id.toString(), arrServ) != -1) { checked = "checked"; $("#cbo_Todos").removeAttr("checked"); $("#cbo_Ninguno").removeAttr("checked"); }

        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + "><td><input type='checkbox' onclick='check()' name='Serv' value='" + servicio.id + "' " + checked + "></td>";
        Tabla_Datos = Tabla_Datos + "<td>" + servicio.descripcion + "</td>";
    });
    Tabla_Fin = "</tbody></table>";
    $("#TServicios").html(Tabla_Datos );
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function Buscar() {
    //if ($("#cbo_Todos").is(':checked')) { objBusquedaLista = ""; }
    var json = JSON.stringify({ "ServiciosId": objBusquedaLista, "Paciente": $("#txtNombre").val().trim(), "Documento": $("#txtDNI").val().trim(), "NHC": $("#txtNHC").val().trim() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/BuscarInternados",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Buscar_Cargar,
        complete: function () {
            if (GET["V"] != "" && GET["V"] != null && GET["V"] != undefined) {
                if (GET["Int"] != "" && GET["Int"] != null && GET["Int"] != undefined) {
                    IntID = GET["Int"];

                    CargarAtInternacion(IntID);
                    $("#Tabla").click();
                    GET["Int"] = "";
                    $("#" + IntID).get(0).scrollIntoView();
                }
            }
        },
        error: errores
    });
}

function Buscar_Cargar(Resultado) {
    var Internados = Resultado.d;
    var Tabla_Datos = "";
    $("#TInternados").empty();
    $.each(Internados, function (index, internado) {
        Tabla_Datos = Tabla_Datos + "<tr id='" + internado.internacion + "' onclick='CargarAtInternacion(" + internado.internacion + ");'>";
        Tabla_Datos = Tabla_Datos + "<td id='servicio" + internado.internacion + "'>" + internado.Servicio + "</td>"; /// manuel
        Tabla_Datos = Tabla_Datos + "<td style='display:none;' id='servicioId" + internado.internacion + "'>" + internado.ServicioId + "</td>"; /// fede
        Tabla_Datos = Tabla_Datos + "<td id='sala" + internado.internacion + "'>" + internado.Sala + "</td>"; /// manuel
        Tabla_Datos = Tabla_Datos + "<td id ='cama" + internado.internacion + "'>" + internado.Cama + "</td>"; /// manuel
        Tabla_Datos = Tabla_Datos + "<td id='int" + internado.internacion + "' style='display:none;'>" + internado.NHC + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + internado.NHC_UOM + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + internado.Afiliado + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + internado.Seccional + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + internado.FIngreso + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + internado.Diagnostico + "</td>";
        Tabla_Datos = Tabla_Datos + "</tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TInternados").html(Tabla_Datos);
}

$("#btnBuscar").click(function () {
    VerificarTodo();
});

function CargarAtInternacion(Id) {
    IntID = Id;
    servicio = $("#servicio" + Id).html(); /// manuel
    var ServicioId = $("#servicioId" + Id).html();

    if (ServicioId == 120000001 || ServicioId == 120000016 || ServicioId == 120000017) EsUTI = 1;
    else EsUTI = 0;

    if (EsUTI == 1) $("#opcionUTIaPiso").show();
    else $("#opcionUTIaPiso").hide();

    sala = $("#sala" + Id).html(); /// manuel
    cama = $("#cama" + Id).html(); /// manuel
    CargarPacienteID($("#int" + Id).html(), Id);
    $(".hsuper_menu").toggleClass("hsuper_menu_Accion");
    $(".hsuper_menu").css("margin-left", "-10px");
}

function VerificarTodo() {
    var Lista = "";
    objBusquedaLista = "";
    if ($("#cbo_Todos").is(':checked')) {
        objBusquedaLista = "0";
    }
    else
    {

        $("#TServicios input").each(function () {
            if ($(this).is(':checked')) {
                objBusquedaLista = objBusquedaLista + $(this).val() + ",";
            }
        });

    }
    if (objBusquedaLista == "") { alert("Seleccione Servicio..."); return; }
    Buscar();
}

$("#btnImprimir").click(function () {
    var Lista = "";
    objBusquedaLista = "";

    if ($("#cbo_Todos").is(':checked')) {
        objBusquedaLista = "0";
    }
    else {

        $("#TServicios input").each(function () {
            if ($(this).is(':checked')) {
                objBusquedaLista = objBusquedaLista + $(this).val() + ",";
            }
        });

    }
    if (objBusquedaLista == "") { alert("Seleccione Servicio..."); return; }
    var doc;
    if ($("#txtDNI").val().trim().length == 0) doc = 0;
    else doc = $("#txtDNI").val().trim();
    var pac;
    if ($("#txtNombre").val().trim().length == 0) pac = 0;
    else pac = $("#txtNombre").val().trim();
    var nhc;
    if ($("#txtNHC").val().trim().length == 0) nhc = 0;
    else nhc = $("#txtNHC").val().trim();
    Impresion("../Impresiones/ListaInternados.aspx?ServiciosId=" + objBusquedaLista + "&Paciente=" + pac + "&Documento=" + doc + "&NHC=" + nhc);
});

function Impresion(Pagina) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
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

		}
	        );
}


function check() {
    $("#cbo_Todos").removeAttr("checked");
    $("#cbo_Ninguno").removeAttr("checked");
}



$("#cbo_Todos").click(function () {
    $("#TServicios input").each(function () {
        if ($("#cbo_Todos").is(':checked')) {
            $(this).attr('checked', true);
        }
        else {
            $(this).removeAttr('checked');
        }
    });
    $("#cbo_Ninguno").removeAttr('checked');
});

$("#cbo_Ninguno").click(function () {
    objBusquedaLista = "";
    $("#TServicios input").each(function () {
        if ($("#cbo_Ninguno").is(':checked')) {
            $(this).removeAttr('checked');
        }
        else {
            $(this).removeAttr('checked');
        }
    });
    $("#cbo_Todos").removeAttr('checked');
});


//$(function () {
//    $("#Tabla").click(function () {
//        if (IntID != 0) {
//            $(".hsuper_menu").toggleClass("hsuper_menu_Accion");
//            $(".hsuper_menu").css("margin-left", "-10px");
//        }
//    });
//});

function Cargar_Paciente_NHC(NHC, Index) {
    NHCActual = Cargar_Paciente_NHC;
    Ind = Index;
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function CargarPacienteID(ID,Index) {
    NHCActual = ID;
    Ind = Index;
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

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));
        $("#CargadoEdad").html(AnioActual.getFullYear() - AnioNacimiento.getFullYear());
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);

        if (servicio.length > 30) { servicio = servicio.substr(0,30) + "..."; }

        $("#CargadoServicio").html(servicio);
        $("#CargadoCama").html(cama);

        if (sala.length > 30) { sala = sala.substr(0, 30) + "..."; }
        $("#CargadoSala").html(sala);

        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

    });

}

function CargarMedicos() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Medicos_Por_Usuarios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarMedicos_Cargados,
        complete: function () {
            Buscar();
        },
        error: errores
    });
}

function CargarMedicos_Cargados(Resultado) {

    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $.each(Medicos, function (index, medico) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medico.Id).html(medico.Medico)
            );
    });
    //CargarEspecialidad($('#cbo_Medico option:selected').val());
}

function Evolucion() {
    self.location = "Evolucion.aspx?IntID=" + IntID + "&B=" + objBusquedaLista + "&MedicoId=" + $("#cbo_Medico option:selected").val();
}

function HC() {
    self.location = "../HistoriaClinica/HistoriaClinica.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&B=" + objBusquedaLista;
}

function IM() {
    self.location = "../Farmacia/CargarIM.aspx?ID=" + $("#afiliadoId").val() + "&Int=1" + "&B=" + objBusquedaLista + "&IntId=" + IntID;
}

function Epicrisis() {
    self.location = "../AtInternados/Epicrisis.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function Interconsulta() {
    self.location = "../AtInternados/Interconsulta.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function HojaEnfermeria() {
    self.location = "../AtInternados/HojaEnfermeria.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function Nutricion() {

    self.location = "../Nutricion/Nutricion.aspx?ID_Int=" + IntID + "&como=" + "deAuno" + "&B=" + objBusquedaLista; //////////////////////////////////MANUEL
}

function altaMedica() {
    self.location = "../AtInternados/AltaMedica.aspx?ID_Int=" + IntID + "&B=" + objBusquedaLista; //////////////////////////////////MANUEL
}

function PaseUTIaPiso() {
    self.location = "../AtInternados/PaseUTIaPiso.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function PaseGuardiaaUTI() {
    self.location = "../AtInternados/Pase_Guardia_UTI.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function PaseCama() {
    self.location = "../AtInternados/PaseCama.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function IQB_Epicrisis() {
    self.location = "../AtInternados/IQB_Epicrisis.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function Vacunas() {
    var Pagina = "../Vacunacion/Vacunacion.aspx?afiliadoId=" + $("#afiliadoId").val() + "&InternacionId=" + IntID;
    $.fancybox(
		{
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
		    },
		    'onClosed': function () {
		        $("#Tabla").click();
		        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Pacientes Internados</strong>";
		    }
		});
}

function acIMG() {
    var Pagina = "../AtConsultorio_IMG/EstudiosAltaComplejidad_IMG.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + "&intGuar=1";
    $.fancybox(
		{
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
		    },
		    'onClosed': function () {
		        $("#Tabla").click();
		        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Pacientes Internados</strong>";
		    }
		});
}


function hcUTI() {
    var Pagina = "../AtInternados/Historia_Clinica_Ingreso_UTI.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + "&intGuar=1";
    $.fancybox(
		{
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
		    },
		    'onClosed': function () {
		        $("#Tabla").click();
		        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Pacientes Internados</strong>";
		    }
		});
}


function IQB_HC() {
    self.location = "../AtInternados/IQB_Ingreso.aspx?NHC=" + $("#afiliadoId").val() + "&IntId=" + IntID + "&MedicoId=" + $("#cbo_Medico :selected").val() + "&B=" + objBusquedaLista;
}

function InfHCPaciente() {
    var Pagina = "../Impresiones/InternacionHC.aspx?IntId=" + IntID;
    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Pacientes Internados > <strong>Antecedentes de Ingreso</strong>";
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '78%',
		    'height': '78%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'preload': true,
            'onComplete' : function (){
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function(){
                jQuery.fancybox.hideActivity();
            });},
		    'onClosed': function () {
		        $("#Tabla").click();
		        parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Pacientes Internados</strong>";
		    }
		});
}




function HojaQuirurgica() {    
    var Pagina = "../AtInternados/HojaQuirurgica_Buscar.aspx?IntId=" + IntID;    
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


function patologiasCronicas() {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../AtConsultorio/AltoRiesgo.aspx?AfiliadoId=' + $("#afiliadoId").val(),
		    'width': '50%',
		    'height': '50%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': true
		});
}


function MedicacionAlcaloides() {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../AtInternados/MedicaciónAlcaloides.aspx?int=' + IntID + "&medicoId=" + $('#cbo_Medico option:selected').val(),
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

function sospechaCovid(Id) {
    Pagina = "../Guardia/SospechaCovid.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox({
        'autoDimensions': false,
        'href': Pagina,
        'width': '50%',
        'height': '50%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'showCloseButton': true
    });
}

    function EscaneosInternos(Id) {
       // alert($("#CargadoNHC").html());
        Pagina = "../HistoriaClinica/OtrasInstituciones.aspx?numero=" + $("#CargadoNHC").html() + "&Int=" + 1 + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox({
        'autoDimensions': false,
        'href': Pagina,
        'width': '50%',
        'height': '50%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'showCloseButton': true
    });
}

function PermisoVisita() {

    // alert($("#CargadoNHC").html());
    Pagina = "../Internacion/GenerarPermisoVisita.aspx?NHC=" + $("#afiliadoId").val() + "&INT=" + IntID + " ";
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


function evolucionEspecialista() {

    // alert($("#CargadoNHC").html());
    Pagina = "../AtInternados/evoluciónEspecialista.aspx?NHC=" + $("#afiliadoId").val() + "&INT=" + IntID + " ";
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

/*function EstudiosComplementarios() {
//self.location = "../EstudiosComplementarios/EstudiosComplementarios.aspx?IntID=" + IntID + "&B=" + objBusquedaLista + "&MedicoId=" + $("#cbo_Medico option:selected").val();
self.location = "../EstudiosComplementarios/EstudiosComplementarios.aspx?NHC=" + $("#afiliadoId").val() + "&Internado=1";
}*/

function EstudiosComplementarios() {
    //ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + " ";
    var Pagina = "../EstudiosComplementarios/EstudiosComplementarios.aspx?NHC=" + $("#afiliadoId").val() + "&Internado=" + 1 + "&MedicoId=" + $("#cbo_Medico option:selected").val() + " ";
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