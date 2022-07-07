var objBusquedaLista = "0";
var IntID = 0;
var NHCActual = 0;
var GET = {};
var servicio = ""; /// manuel
var sala = ""; /// manuel
var cama = ""; /// manuel
var EsUTI = 0;



var str = "";

$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $(".date").datepicker();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var yyyy = currentDt.getFullYear();
    
    var desde = '01' + '/' + mm + '/' + yyyy;

    $("#txtDesde").val(desde);
    $("#txtHasta").val(FechaActual());
    $(".date").mask("99/99/9999", { placeholder: "-" });

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
            //Buscar();
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
    $("#TServicios").html(Tabla_Datos);
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
    var json = JSON.stringify({ "ServiciosId": objBusquedaLista, "Paciente": $("#txtNombre").val().trim(), "Documento": $("#txtDNI").val().trim(),
        "NHC": $("#txtNHC").val().trim(), "Desde": $("#txtDesde").val(), "Hasta": $("#txtHasta").val()
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/BuscarInternados_IntraHosp",
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

var cultivo_act = "";
var germen_act = "";
var isq_act = "";
var _check = "";

function Buscar_Cargar(Resultado) {
    var Internados = Resultado.d;
    var Tabla_Datos = "";
    $("#TInternados").empty();
    $.each(Internados, function (index, internado) {
        SelectCultivo(internado.internacion, internado.Cultivo);
        SelectGermen(internado.internacion, internado.Germen);
        SelectISQ(internado.internacion, internado.ISQ);
        if (internado.Infeccion) _check = "checked";
        else _check = "";
        if (internado.FEgreso == undefined) FEgreso = "Sin Egreso";
        else FEgreso = internado.FEgreso;

        Datos = "<b><u>Datos Internación</b></u><br>Seccional: " + internado.Seccional + "<br>Fecha Ingreso: " + internado.FIngreso + "<br>Fecha Egreso: " + FEgreso + "<br>Diagnóstico: " + internado.Diagnostico
        + "<br>" + internado.Antibiotico;

        Tabla_Datos = Tabla_Datos + "<tr data-placement='top' title='" + Datos + "' class='tr_CAB' id='" + internado.internacion + "' onclick='CargarAtInternacion(" + internado.internacion + ");'>";
        Tabla_Datos = Tabla_Datos + "<td id='servicio" + internado.internacion + "'>" + internado.Servicio + "</td>"; /// manuel
        Tabla_Datos = Tabla_Datos + "<td style='display:none;' id='servicioId" + internado.internacion + "'>" + internado.ServicioId + "</td>"; /// fede
        Tabla_Datos = Tabla_Datos + "<td id='sala" + internado.internacion + "'>" + internado.Sala + "</td>"; /// manuel
        Tabla_Datos = Tabla_Datos + "<td id ='cama" + internado.internacion + "'>" + internado.Cama + "</td>"; /// manuel
        Tabla_Datos = Tabla_Datos + "<td id='int" + internado.internacion + "' style='display:none;'>" + internado.NHC + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + internado.NHC_UOM + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + internado.Afiliado + "</td>";
        Tabla_Datos = Tabla_Datos + "<td><div id='div_infeccion" + internado.internacion + "'><input id='chk_infeccion" + internado.internacion + "' type='checkbox' class='chk_infeccion' data-idinter='" + internado.internacion + "'" + _check + "/></div></td>";
        Tabla_Datos = Tabla_Datos + "<td><div id='div_cultivo" + internado.internacion + "'></div></td>";
        Tabla_Datos = Tabla_Datos + "<td><div id='div_Germen" + internado.internacion + "'></div></td>";
        Tabla_Datos = Tabla_Datos + "<td><div id='div_ISQ" + internado.internacion + "'></div></td>";
        Tabla_Datos = Tabla_Datos + "</tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TInternados").html(Tabla_Datos);
}

$('body').tooltip({
    selector: '.tr_CAB',
    html: true
});

function SelectCultivo(internacion_actual,cultivo_act) {
    var select = "";
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/AT_INTERNADOS_CULTIVO_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Cultivos = Resultado.d;
            select += "<select id='cbo_Cultivo" + internacion_actual + "' data-idinter='" + internacion_actual + "' class='input-medium Cultivo_Select' style='width:120px;font-size:11px;'>";
            select += "<option value=''>NO</option>";
            $.each(Cultivos, function (index, cultivo) {
                select += "<option value='" + cultivo.Cultivo_Codigo + "'>" + cultivo.Cultivo_Descripcion + "</option>";
            });
            select += "</select>";
            $("#div_cultivo" + internacion_actual).append(select);
        },
        complete: function () {
            $("#cbo_Cultivo" + internacion_actual).val(cultivo_act);
        },
        error: errores
    });
}

function SelectGermen(internacion_actual, germen_act) {
    var select = "";
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/AT_INTERNADOS_GERMEN_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Germens = Resultado.d;
            select += "<select id='cbo_Germen" + internacion_actual + "' data-idinter='" + internacion_actual + "' class='input-medium Germen_Select' style='width:120px;font-size:11px;'>";
            select += "<option value=''>NO</option>";
            $.each(Germens, function (index, germen) {
                select += "<option value='" + germen.Germen_Codigo + "'>" + germen.Germen_Descripcion + "</option>";
            });
            select += "</select>";
            $("#div_Germen" + internacion_actual).append(select);
        },
        complete: function () {
            $("#cbo_Germen" + internacion_actual).val(germen_act);
        },
        error: errores
    });
}

function SelectISQ(internacion_actual, isq_act) {
    var select = "";
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/AT_INTERNADOS_ISQ_LIST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ISQS = Resultado.d;
            select += "<select id='cbo_ISQ" + internacion_actual + "' data-idinter='" + internacion_actual + "' class='input-medium ISQ_Select' style='width:120px;font-size:11px;'>";
            select += "<option value=''>NO</option>";
            $.each(ISQS, function (index, ISQ) {
                select += "<option value='" + ISQ.ISQ_Codigo + "'>" + ISQ.ISQ_Descripcion + "</option>";
            });
            select += "</select>";
            $("#div_ISQ" + internacion_actual).append(select);
        },
        complete: function () {
            $("#cbo_ISQ" + internacion_actual).val(isq_act);
        },
        error: errores
    });
}

$(document).on('change', '.Cultivo_Select', function () {
    UpdateInfeccion($(this).data("idinter"), $(this).val(), 1);
});

$(document).on('change', '.Germen_Select', function () {
    UpdateInfeccion($(this).data("idinter"), $(this).val(), 2);
});

$(document).on('change', '.ISQ_Select', function () {
    UpdateInfeccion($(this).data("idinter"), $(this).val(), 3);
});

$(document).on('click', '.chk_infeccion', function () {
    var checked = 'N';
    if ($(this).is(":checked")) checked = 'S';
    UpdateInfeccion($(this).data("idinter"), checked, 4);
});

function UpdateInfeccion(NroInternacion,Value,Campo) {
    var json = JSON.stringify({"NroInternacion": NroInternacion, "Valor_Campo": Value, "Campo_Update": Campo });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/At_Internados_IntraHosp_UPDATE_INFECCION",
        data:json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
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
    return false;
    $(".hsuper_menu").toggleClass("hsuper_menu_Accion");
    $(".hsuper_menu").css("margin-left", "-10px");
}

function VerificarTodo() {
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
    Impresion("../Impresiones/At_Internados_IntraHosp.aspx?Desde=" + $("#txtDesde").val() + "&Hasta=" + $("#txtHasta").val() + "&ServIds=" + objBusquedaLista + "&Paciente=" + pac + "&Documento=" + doc + "&NHC=" + nhc);
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

function CargarPacienteID(ID, Index) {
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
        $("#CargadoServicio").html(servicio);
        $("#CargadoCama").html(cama);
        $("#CargadoSala").html(sala);


        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

    });

}


