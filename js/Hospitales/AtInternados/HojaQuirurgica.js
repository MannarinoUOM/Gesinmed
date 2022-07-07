var MedicoId = 0;
var DiagnosticoId = 0;
var EspecialidadId = 0;
var PracticaId = 0;
var fecha_traida = "";
var AfiliadoId = 0;
var Ultimo_OK = 0;

var objBusquedaLista = "";

var PRQ_ID = 0;
var PRQ_SOC_ID = 0;
var PRQ_SESION = 0;
var PRQ_CAMA_ID = 0;
var PRQ_GUA_ID = 0;
var Cama = "";
var Sala = "";

var MedicoUsuario = 0;
var idPermiso = 0;
var guardar = 1;

CargarMedicos();

$(document).ready(function () {

    var Query = {};
    Query = GetQueryString();


    if (Query['HojaId'] != null) {
        PRQ_ID = Query['HojaId'];
    }
    else {
        $("#Imprimir_IQ").hide();
    }

    if (Query['IntId'] != null) {
        PRQ_SESION = Query['IntId'];
    }

    if (Query["B"] != "" && Query["B"] != null) {
        objBusquedaLista = Query["B"];
    }


    if (fecha_traida == "") {
        fecha_traida = FechaActual();
    }
    $("#txt_fecha").val(fecha_traida);

    CargarInternacion();
    TraerPracticaEpecialista();

});



function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    // declare object
    var queryObj = {};
    // loop through each name-value pair and populate object
    for (var i = 0; i < querystring.length; i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
    }
    return queryObj;
}



function List_Diagnostico(Id, estado, Cirugia_id) {    
    if (Cirugia_id == null) { Cirugia_id = 0; }
    var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico_Planificar_Cirugia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Diagnostico_Cargado,
        error: errores
    });
}

function List_Diagnostico_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_diagnostico").append($("<option></option>").val("0").html(""));
    $.each(Lista, function (index, Diagnostico) {
        $("#cbo_diagnostico").append($("<option></option>").val(Diagnostico.id).html(Diagnostico.diagnostico));
        if (DiagnosticoId == Diagnostico.id) $("#cbo_diagnostico").val(DiagnosticoId);
    });

}


//function Especialidades_Lista() {
//    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
//    $.ajax({
//        type: "POST",
//        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: Especialidades_Lista_Cargado,
//        error: errores
//    });
//}

//function Especialidades_Lista_Cargado(Resultado) {    
//    var Lista = Resultado.d;
//    $.each(Lista, function (index, Especialidad) {
//        $("#cbo_especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
//        if (EspecialidadId == Especialidad.Id) $("#cbo_especialidad").val(Especialidad.Id);
//    });
//}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}






function Cargar_Medicos_por_EspecialidadporTipo(Especialidad, Tipo) {
    var json = JSON.stringify({ "EspId": Especialidad });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Medicos = Resultado.d;
            $('#cbo_medico').empty();
            $("#cbo_medico").append($("<option></option>").val("0").html(""));
            $.each(Medicos, function (index, medicos) {
                $('#cbo_medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );

                if (MedicoUsuario == medicos.Id) $("#cbo_medico").val(medicos.Id);

            });


        },
        complete: function () {
            $("#cbo_medico").val(MedicoUsuario);
        },
        error: errores
    });
}


function Cargar_Medicos_por_EspecialidadporTipo2(Especialidad, Tipo) {
    var json = JSON.stringify({ "Especialidad": Especialidad, "Tipo": Tipo });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Medicos = Resultado.d;
            $('#cbo_medico').empty();
            $("#cbo_medico").append($("<option></option>").val("0").html(""));
            $.each(Medicos, function (index, medicos) {
                $('#cbo_medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );

                if (MedicoUsuario == medicos.Id) $("#cbo_medico").val(medicos.Id);

            });


        },
        complete: function () {
            $("#cbo_medico").val(MedicoUsuario);
        },
        error: errores
    });

}



//$('#cbo_especialidad').change(function () {    
//    Cargar_Medicos_por_EspecialidadporTipo($(this).val(), 'A');
//});




function ListaCirugia(Id, estado, Cirugia_id) {
    if (Cirugia_id == null) { Cirugia_id = 0; }
    var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado,
        error: errores
    });
}



function ListaCirugia_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_practica").append($("<option></option>").val("0").html(""));
    $.each(Lista, function (index, Practica) {
        $("#cbo_practica").append($("<option></option>").val(Practica.id).html(Practica.tipo));
        if (PracticaId == Practica.id) $("#cbo_practica").val(Practica.id);
    });

}






function CargarPacienteID() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + PRQ_SOC_ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}



function VerificarPMI(PacienteID) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/VerificarPMI",
        data: '{PacienteId: "' + PacienteID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#verificarPMI").val(Resultado.d);
        },
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

        VerificarPMI(paciente.documento);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        //Verifico si esta en el padron 10.0.0.1
        $("#SpanCargando").show();
        $("#btnVencimiento").hide();
        //EstaVendico($("#txt_dni").val());

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);

        AfiliadoId = paciente.documento;

        //alert(paciente.Foto);
        $("#CargadoTelefono").html(paciente.Telefono);

        if (paciente.Foto == "0") { $('#fotopaciente').attr('src', '../img/silueta.jpg'); } else { $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto); }
        


        //        if (Ultimo_OK != 1) {
        //            alert(Ultimo_OK);
        UltimoAporte_OK(); //Verifica aportes en Padron UOM.
        //        }

        $("#CargadoSeccional").html(paciente.Seccional);
        PatologiabyId(paciente.Discapacidad);
    });
}



function UltimoAporte_OK() {
    if (Ultimo_OK == 1) { return false; }
    var json = JSON.stringify({ "Documento": $("#CargadoDNI").html() });
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/UltimoAporte_OK",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Ultimo_OK = 1;
            var ok = Resultado.d;
            if (!ok) {
                alert("No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.");                
                $("#IconoVencido2").attr("src", "../img/Icono_ERROR.gif")                
                $("#IconoVencido2").attr("data-original-title", "Problemas Aportes 3 meses");

                if ($("[rel=tooltip]").length) {
                    $("[rel=tooltip]").tooltip();
                }
                //$("#desdeaqui").remove();
            }
            else {                
                $("#IconoVencido2").attr("src", "../img/Icono_OK.gif")
            }
            $("#SpanCargando").show();
        }
    });
}


$("#btnGuardar").click(function () {
    GuardarHoja();
});

function GuardarHoja() {

//EVOLUCION ESPECIALISTA
    if ($("#cbo_practica_especialista").val() > 0) {

        if (PRQ_SESION == 0 || PRQ_SESION == null) { alert("No se pudo obtener la internación. Cierre y vuelva a intentarlo."); return false; }
        if (PRQ_SOC_ID == "") { alert("No se pudo obtener el afiliado. Cieere y vuelva a intentarlo."); return false; }
        if ($("#cbo_practica_especialista").val() == 0) { alert("Seleccione alguna Práctica Especial!."); return false; }
        //if ($("#txtEvolucion").val().trim().length <= 0) { alert("Cargue alguna evolución!."); return false; }
        if (guardar == 0) { alert("Solo se puede cargar una practica especiakl por día y editarla dentro de las siguientes 4 horas!."); return false; }
        // alert(idPermiso);
        var evo = "PRACTICA EN CAMA ";
        var json = JSON.stringify({ "id": idPermiso, "internacionId": PRQ_SESION, "afiliadoId": PRQ_SOC_ID, "practicaId": $("#cbo_practica_especialista").val(), "evolucion": evo });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/GuardarEvolucionEspecialista",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: function (Resultado) {
                if (Resultado.d == -1) { alert("la Práctica Especial solo puede ser editado por quien lo creo!."); }
                else {
                    if (idPermiso > 0) { alert("Practica en cama modificada!."); } else {
                        alert("Practica en cama guardada!.");
                    }
                    idPermiso = Resultado.d;
                    $("#btnVolver").click();
                }
            },
            complete: function () {// guardar = 0; 
            },
            error: errores
        });
    }
    //HOJA QUIRURGICA
    else {
        if ($("#cbo_diagnostico").val() == "0") { alert("Falta Seleccionar el Diagnóstico"); $("#cbo_diagnostico").focus(); return; }
        if ($("#cbo_medico").val() == "0") { alert("Falta Seleccionar el Médico"); $("#cbo_medico").focus(); return; }
        if ($("#cbo_practica").val() == "0") { alert("Falta Seleccionar la Práctica"); $("#cbo_practica").focus(); return; }


        HojaGuardar = {};
        HojaGuardar.PRQ_ID = PRQ_ID;
        HojaGuardar.PRQ_FECHA = $("#txt_fecha").val();
        HojaGuardar.PRQ_SOC_ID = PRQ_SOC_ID;
        HojaGuardar.PRQ_DIAG_ID = $("#cbo_diagnostico").val();
        HojaGuardar.PRQ_ESP_ID = 0;
        HojaGuardar.PRQ_MEDICO_ID = $("#cbo_medico").val();
        HojaGuardar.PRQ_CIRU_ID = $("#cbo_practica").val();
        HojaGuardar.PRQ_ESQUEMA_OPE = $("#txt_descripcion").val();
        HojaGuardar.PRQ_SESION = PRQ_SESION;
        HojaGuardar.PRQ_USUARIO = 0;
        HojaGuardar.PRQ_CAMA_ID = PRQ_CAMA_ID;
        HojaGuardar.PRQ_GUA_ID = PRQ_GUA_ID;

        var json = JSON.stringify({ "Hoja": HojaGuardar });

        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/ListaPacientesInternados.asmx/AtInternados_Hoja_Quirurgica_Guardar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                PRQ_ID = Resultado.d;
                Imprimir();
            },
            error: errores
        });
    }
}


function CargarInternacion() {
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Buscar_Internacion_Id",
        data: '{Id: "' + PRQ_SESION + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Internacion = Resultado.d;

            PRQ_SOC_ID = Internacion.NHC;

            PRQ_CAMA_ID = Internacion.CamaId;
            Cama = Internacion.Cama;
            Sala = Internacion.Sala;

            $("#Cargado_Cama").html(Cama);
            $("#Cargado_Sala").html(Sala);

            if (PRQ_ID != 0) {
                CargarHojaQuirurgica();
            }
            else {
                List_Diagnostico(0, true, 0);
                CargarMedicos();
                ListaCirugia(0, true, 0);

            }
            CargarPacienteID();

        },
        complete: TraerEvolucionEpecialista (),
        error: errores
    });
}


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function TraerEvolucionEpecialista() {
                var json = JSON.stringify({ "internacionId": PRQ_SESION });
                $.ajax({
                    type: "POST",
                    url: "../Json/Internaciones/IntSSC.asmx/TraerEvolucionEspecialista",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: json,
                    success: function (Resultado) {
                        
                        if (Resultado.d.length > 0) {
                            $.each(Resultado.d, function (index, item) {
                               // alert(item.practicaId);
                                idPermiso = item.id;
                                if (item.edita == 1) { guardar = 1; }
                                if (item.edita == 0) { guardar = 0; }
                                $("#cbo_practica_especialista").val(item.practicaId);
                                //                                $("#txtEvolucion").val(item.evolucion);
                            });
                        }
                    },
                    error: errores
                });
            }

function CargarHojaQuirurgica() {
    //int Id, int PacienteId, int InternacionId

    var json = JSON.stringify({ "Id": PRQ_ID, "PacienteId": PRQ_SOC_ID, "InternacionId": PRQ_SESION });

    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/AtInternados_Hoja_Quirurgica_Listar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var HojaCargada = Resultado.d;
            //$("#cbo_practica").val(HojaCargada[0].PRQ_CIRU_ID); 
            PracticaId = HojaCargada[0].PRQ_CIRU_ID;
            $("#txt_fecha").val(HojaCargada[0].PRQ_FECHA);
            //$("#cbo_diagnostico").val(HojaCargada[0].PRQ_DIAG_ID); 
            DiagnosticoId = HojaCargada[0].PRQ_DIAG_ID;
            //$("#cbo_medico").val(HojaCargada[0].PRQ_MEDICO_ID); 
            MedicoId = HojaCargada[0].PRQ_MEDICO_ID; MedicoUsuario = HojaCargada[0].PRQ_MEDICO_ID;

            $("#txt_descripcion").val(HojaCargada[0].PRQ_ESQUEMA_OPE);

            $("#Cargado_Cama").html(HojaCargada[0].CAMA_DESCRIPCION);
            $("#Cargado_Sala").html(HojaCargada[0].SALA_DESCRIPCION);

            List_Diagnostico(0, true, 0);
            Cargar_Medicos_por_EspecialidadporTipo(0, 'A');
            ListaCirugia(0, true, 0);

        },
        error: errores
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
            Cargar_Medicos_por_EspecialidadporTipo(0, 'A');
        },
        error: errores
    });
}

$("#Imprimir_IQ").click(function () {
    Imprimir();
});

function Imprimir() {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/At_Int_Impresion_HojaQuirurgica.aspx?PRQ_ID=' + PRQ_ID + "&MedicoId=" + $("#cbo_medico").val(),//+ MedicoId,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {                
                parent.jQuery.fancybox.close();
            }
        });
    }



    $("#btnVolver").click(function () {
        //document.location = "../AtInternados/HojaQuirurgica_Buscar.aspx?V=1&IntId=" + PRQ_SESION;    
        parent.jQuery.fancybox.close();
    });


    function TraerPracticaEpecialista() {
        // var json = JSON.stringify({ "internacionId": intId });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/TraerPracticaEpecialista",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // data: json,
            success: function (Resultado) {
                $("#cbo_practica_especialista").empty();
                $("#cbo_practica_especialista").append("<option value='0'>Seleccione</option>");
                $.each(Resultado.d, function (index, item) {
                    $("#cbo_practica_especialista").append("<option value='" + item.id + "'>" + item.practica + "</option>");
                });
                //alert("sdfs " +id);
                //TraerEvolucionEpecialista(id);
            },
            error: errores
        });
    }

    $("#cbo_practica_especialista").live('change', function () {
        if ($("#cbo_practica_especialista").val() > 0) {
            $(".bloq").attr('disabled', true);
        } else { $(".bloq").attr('disabled', false); }
    });

    function PatologiabyId(Id) {
        if (Id <= 1) {
            // $('#span_Discapacidad').html("PATOLOGÍA: NO"); $("#span_Discapacidad").css("color", "white"); 
            return;
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
                    $("#span_Discapacidad").blink();
                });
            },
            error: errores
        });
    }