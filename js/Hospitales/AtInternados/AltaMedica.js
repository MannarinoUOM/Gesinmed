var idAlta = 0;
var idPaciente = 0;
var hoy = "";
var ID_Int = 0;
var objBusquedaLista = "";
var MedicoUsuario = 0;

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

if (GET["ID_Int"] != "" && GET["ID_Int"] != null) {

    ID_Int = GET["ID_Int"];
    Cargar_Encabezado_idInternacion(ID_Int);
}

if (GET["B"] != undefined && GET["B"] != null) {
   objBusquedaLista = GET["B"];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Alta Médica</strong>";

$("#txtFecha").keydown(function () { return false; });
$("#txtFecha").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //maxDate: '0m'
});

$("#txtDiasPeoperatorio").keydown(function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||

                        (e.keyCode == 65 && e.ctrlKey === true) ||

                        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$("#btnVolverAlPaciente").click(function () {
    self.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + ID_Int + "&B=" + objBusquedaLista;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Cargar_Encabezado_idInternacion(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/cargarEncabezado",
        data: '{idInternacion: "' + ID_Int + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Encabezado_Cargado,
        complete: CargarMotivoegreso,
        error: errores
    });
}

function Cargar_Encabezado_Cargado(Resultado) {

    var E = Resultado.d;
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var ano = fecha.getFullYear();

    hoy = dia + "/" + mes + "/" + ano;

    $("#CargadoApellido").html(E.apellido);
    $("#CargadoEdad").html(E.edad);
    $("#CargadoDNI").html(E.documento_real);
    $("#CargadoNHC").html(E.NHC_UOM);
    $("#CargadoTelefono").html(E.telefono);
    $("#CargadoSeccional").html(E.seccional)
    $("#CargadoLocalidad").html(E.localidad);
    $("#CargadoFecha").html(hoy);
    $("#CargadoPatologia").html(E.patologia);
    $("#CargadoServicio").html(E.servicio);
    $("#CargadoSala").html(E.sala);
    $("#CargadoCama").html(E.cama);

//   alert(E.apellido + "/" + E.edad + "/" + E.documento_real + "/" + E.NHC_UOM + "/" + E.telefono + "/" +
//    E.seccional + "/" +
//    E.localidad + "/" +
//    hoy + "/" +
//    E.patologia + "/" + E.servicio + "/" + E.sala + "/" + E.cama);

alert(E.Foto);

alert(E.foto);
    idPaciente = E.documento;
    var ruta = "silueta";
    $('#fotopaciente').attr('src', '../fotoPerfil/' + ruta + '.jpg');
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function CargarMotivoegreso(Cargar) {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/MotivoEgresoLista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Motivos = Resultado.d;
            $('#cboMotivoEgreso').empty();
            $('#cboMotivoEgreso').append('<option value="0">Seleccione Motivo</option>');
            $.each(Motivos, function (index, motivo) {
                $('#cboMotivoEgreso').append($('<option></option>').val(motivo.id).html(motivo.motivo));
            });
        },
        //COMPLETE: List_Medicos(),
        error: errores
    });
}

function List_Medicos() {
    var json = JSON.stringify({ "EspId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        complete: function () {
            $("#cbo_Medico").val(MedicoUsuario);
            traerResultados();
        }, 
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Seleccione Medico...</option>');
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function CargarMedicos() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Medicos_Por_Usuarios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Medicos = Resultado.d;
            if (Medicos.length > 0) {
                MedicoUsuario = Medicos[0].Id;
            }
        },
        complete: function () {
            List_Medicos();
        },
        error: errores
    });
}

$(document).ready(function () {
    CargarMotivoegreso();
    //traerResultados();
    //List_Medicos();
    CargarMedicos(); //Carga en el combo el medico de la sesion...
});
$('#cboMotivoEgreso').change(function () {

    if ($('#cboMotivoEgreso').val() == 4 || $('#cboMotivoEgreso').val() == 5) { $("#cboAutopsia").attr('disabled', false); }
    else {
        $("#cboAutopsia").attr('disabled', true);
        $("#cboAutopsia").val(0);
    }
});

function Validar() {
    if ($("#cboMotivoEgreso :selected").val() == 0) { alert("Seleccione Motivo de Egreso."); return false; }
    if ($("#cbo_Medico :selected").val() == 0) { alert("Seleccione Medico."); return false; }
    return true;
}

/////////////////////////////////////////////////////////////////////////////botones

$("#btnGuardar").click(function () {
    if (!Validar()) return false;

    var json = JSON.stringify({
        "idAlta": idAlta,
        "idInternacion": ID_Int,
        "idPaciente": idPaciente,
        "motivoEgreso": $("#cboMotivoEgreso").val(),
        "autopsia": $("#cboAutopsia").val(),
        "operado": $("#cboOperado").val(),
        "fecha": $("#txtFecha").val(),
        "diasOperatorio": $("#txtDiasPeoperatorio").val(),
        "cirugiaRealizda": $("#txtCirugia").val().trim().toUpperCase(),
        "princiapl": $("#txtPrincipal").val().trim().toUpperCase(),
        "conmitentes": $("#txtConmitentes").val().trim().toUpperCase(),
        "complicaciones": $("#txtComplicaciones").val().trim().toUpperCase(),
        "observaciones": $("#txtObservacioness").val().trim().toUpperCase(),
        "idMedico": $("#cbo_Medico :selected").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/InternacionAlta.asmx/GuardarAlta",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: exito,
        error: errores
    });

});

$("#btnBorrar").click(function () {
    if (confirm("¿Desea anular el alta?")) {
        var json = JSON.stringify({ "idAlta": idAlta });
        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/InternacionAlta.asmx/InternacionAltaBorrar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                traerResultados();
                alert("El alta ha sido anulada.");
            },
            error: errores
        });
    }
});


/////////////////////////////////////////////////////////////////////////////botones
function traerResultados() {
    var json = JSON.stringify({ "idIntenacion": ID_Int });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/InternacionAlta.asmx/TraerAlta",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var result = resultado.d;
            if (result.idAlta > 0) { //Si existe alta cargo datos...
                idAlta = result.idAlta;
                var m = "";
                m = String(result.motivoEgreso);
                //alert(m);
                $("#cboMotivoEgreso").val(m);
                // $("#cboMotivoEgreso option[value=" + result.motivoEgreso + "]").attr("selected", true);
                //if (result.autopsia) { $("#cboAutopsia").attr('disabled', false); }
                if(result.autopsia == 0){$("#cboAutopsia").attr('disabled',true);} else{$("#cboAutopsia").attr('disabled',false);}
                $("#cboAutopsia").val(result.autopsia);
                $("#cboOperado").val(result.operado);
                $("#txtFecha").val(result.fecha);
                $("#txtDiasPeoperatorio").val(result.diasOperatorio);
                $("#txtCirugia").val(result.cirugiaRealizada);
                $("#txtPrincipal").val(result.princpal);
                $("#txtConmitentes").val(result.conmitentes);
                $("#txtComplicaciones").val(result.complicaciones);
                $("#txtObservacioness").val(result.observaciones);
                $("#cbo_Medico").val(result.medicoId);
                //$("#cboMotivoEgreso option[value=" + result.motivoEgreso + "]").attr("selected", true);
            }
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function exito(resultado) {
    var result = resultado.d;
    idAlta = result;
     //alert("Guardó");
  
     imprimir();

  }

  function imprimir() {
      //alert(idAlta);
      $.fancybox({
    		    'autoDimensions': false,
    		    //    		    'href': "../Impresiones/Impresion_Alta_Medica.aspx?Id_Internacion=" + ID_Int,
    		    'href': "../Impresiones/Impresion_Alta_Medica.aspx?Id_Internacion=" + ID_Int + "&MedicoId=" + $("#cbo_Medico :selected").val(),
    		    'width': '75%',
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
  }

  