var CM = 0;
var HA = "";
var Ind = -1;
var Med = 0;
var Esp = 0;
var N_HC = 0;
var medico = "";
var odontos = new Array(201, 246);
var turnosHora = [];// para guardar las horas de los turnos del medico y especialidad del dia para asignar ausentes masivamente

$(document).ready(function () {

 

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    $("#txtFecha").datepicker();
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFecha").val(FechaActual());

    window.setInterval(function () { CargarTurnosAutomatico(); }, 30000);

    var GET = {};


    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["Med"] != "" && GET["Med"] != null) { //Viene de HC
        Med = GET["Med"];
        Esp = GET["Esp"];
        Ind = GET["Ind"];
        N_HC = GET["NHC"];
    }

    CargarMedicos();

});



$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


$(function () {
    $("#LosTurnos").click(function () {
        //$(".hsuper_menu").toggleClass("hsuper_menu_Accion");
        $(".hsuper_menu").removeClass("hsuper_menu_Accion");
        $(".hsuper_menu").addClass("hsuper_menu_Accion");
        $(".hsuper_menu").css("margin-left", "0%");
    });

    $("#OcultarMenu").click(function () {
        $(".hsuper_menu").css("margin-left", "100%");
        $(".hsuper_menu").removeClass("hsuper_menu_Accion");
    });

});

function ExisteAtencionenDia(Medico, Especialidad, NHC) {
    var json = JSON.stringify({ "MedicoId": Medico, "EspecialidadId": Especialidad, "NHC": NHC });

    //alert("MedicoId" + Medico + " EspecialidadId " + Especialidad + " NHC " + NHC );
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_Existe_Atencion_by_NHC",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
         //   alert(Resultado.d);
            if (Resultado.d == 1) {
                if ($("#IDTr" + Ind).hasClass("Solo_Turno")) return false;
                if (!$("#IDTr" + Ind).hasClass("Turnos_Sobreturno")) { $("#opcionFA").show(); $("#opcion11").show(); } //Existe At cargada, por lo tanto puedo finalizar...
                else { $("#opcionFA").hide(); $("#opcion11").show(); }
            }
            else { $("#opcionFA").hide(); $("#opcion11").hide(); }
        },
        error: errores
    });
}

    function CargarMedicos() {
        var json = JSON.stringify({"Especialidad": 0, "Tipo": 'A'});
        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/Medicos_Por_Usuarios_Filtrado",
            //url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
            contentType: "application/json; charset=utf-8",
            //data: json,
            dataType: "json",
            success: CargarMedicos_Cargados,
            error: errores,
            complete: function () {
                if (Med != 0) {
                    $('#cbo_Medico').val(Med);
                    CargarEspecialidad(Med);
                }
            }
        });
    }


    function CargarEspecialidad(MedicoId) {
        //alert(MedicoId);
        $.ajax({
            type: "POST",
            url: "../Json/Turnos/DiasAtencionEdicion.asmx/Especialidad_Atencion_Medico",
            data: '{MedicoId: "' + MedicoId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#LosTurnos').empty();
            },
            success: CargarEspecialidad_Cargadas,
            error: errores,
            complete: function () {
                if (Esp != 0) {
                    $('#cboEspecialidadDA').val(Esp);
                    CargarTurnos();
                }
            }
        });
    }


    function CargarEspecialidad_Cargadas(Resultado) {

        var Especialidad = Resultado.d;
        $('#cboEspecialidadDA').empty();
        //$('#cboEspecialidadDA').append('<option value="0">Seleccione una Especialidad</option>');
        $.each(Especialidad, function (index, especialidades) {
            $('#cboEspecialidadDA').append(
              $('<option></option>').val(especialidades.EspecialidadId).html(especialidades.Especialidad)
            );
        });
        if(Esp == 0)
        CargarTurnos();
    }



    function CargarMedicos_Cargados(Resultado) {

        var Medicos = Resultado.d;
        $('#cbo_Medico').empty();
        $.each(Medicos, function (index, medico) {
            $('#cbo_Medico').append(
              $('<option></option>').val(medico.Id).html(medico.Medico)
            );
        });
        if (Med == 0)
        CargarEspecialidad($('#cbo_Medico option:selected').val());
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    $("#cbo_Medico").change(function () {
        CargarEspecialidad($('#cbo_Medico option:selected').val());
        $(".hsuper_menu").removeClass("hsuper_menu_Accion");
    });


    $("#cboEspecialidadDA").change(function () {
        CargarTurnos()
        $(".hsuper_menu").removeClass("hsuper_menu_Accion");
    });

    $("#txtFecha").change(function () {
        CargarTurnos()
        $(".hsuper_menu").removeClass("hsuper_menu_Accion");
    });


    function CargarTurnosAutomatico() {
        if ($('#cboEspecialidadDA option:selected').val() == undefined) { return false; }
            var json = JSON.stringify({
                "MedicoId": $('#cbo_Medico option:selected').val(),
                "Especialidad": $('#cboEspecialidadDA option:selected').val(),
                "fecha": $("#txtFecha").val()
            });

            $.ajax({
                type: "POST",
                url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_CargarTurnos",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: CargarTurnos_Cargados,
                error: errores
            });
        }

        // PARA MARCAR AUSENTISMO MASIVO
        $("#btnInformAus").click(function () {

            var r = confirm("ESTA SEGURO QUE DESA CONFIRMAR TODOS LOS PACIENTES AUSENTES DE  LA FECHA " + $("#txtFecha").val() + "?");

            if (r) {
                //                for (var i = 0; i <= turnosHora.length - 1; i++) {
                //                    //alert(turnosHora[i]);
                //                    var json = JSON.stringify({
                //                        "TurnoFecha": turnosHora[i],
                //                        "Especialidad": $('#cboEspecialidadDA option:selected').val(),
                //                        "MedicoId": $('#cbo_Medico option:selected').val()
                //                    });
                //                    $.ajax({
                //                        type: "POST",
                //                        url: "../Json/AtConsultorio/AtConsultorio.asmx/ATCONSULTORIOAUSENTEPACIENTEMASIVO",
                //                        data: json,
                //                        contentType: "application/json; charset=utf-8",
                //                        dataType: "json",
                //                        error: errores
                //                    });
                //                }
                //            }

                var fecha = new Date();

                //alert(fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());

                //return false;

                var json = JSON.stringify({
                    "TurnoFecha": $("#txtFecha").val(), //fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
                    "Especialidad": $('#cboEspecialidadDA option:selected').val(),
                    "MedicoId": $('#cbo_Medico option:selected').val()
                });
                $.ajax({
                    type: "POST",
                    url: "../Json/AtConsultorio/AtConsultorio.asmx/ATCONSULTORIOAUSENTEPACIENTEMASIVO",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: errores
                });


                $("#opcion1").show();
                $("#opcion12").hide();
                $("#opcion2").hide();
                $("#opcion4").hide();
                $("#opcion5").hide();
                $("#opcion55").hide();
                $("#opcion6").hide();
                $("#opcion7").hide();
                $("#opcion8").hide();
                $("#opcion11").hide();
                $("#opcion_diabetologia").hide();
                $("#opcionFA").hide();

                CargarTurnos();
            }
        });
        // PARA MARCAR AUSENTISMO MASIVO


    function DeLlamado_a_Espera() {
        var json = JSON.stringify({
            "TurnoFecha": HA,
            "Especialidad": $('#cboEspecialidadDA option:selected').val(),
            "MedicoId": $('#cbo_Medico option:selected').val()
        });
        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_Pasar_AEspera",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                $("#opcion1").show();
                $("#opcion12").hide();
                $("#opcion2").hide();
                $("#opcion4").hide();
                $("#opcion5").hide();
                $("#opcion55").hide();
                $("#opcion6").hide();
                $("#opcion7").hide();
                $("#opcion8").hide();
                $("#opcion11").hide();
                $("#opcion_diabetologia").hide();
                $("#opcionFA").hide();

                CargarTurnos();
            },
            error: errores
        });
    }


    function CargarTurnos() {
        if ($('#cboEspecialidadDA option:selected').val() == undefined) {return false;}
        var json = JSON.stringify({
            "MedicoId": $('#cbo_Medico option:selected').val(),
            "Especialidad": $('#cboEspecialidadDA option:selected').val(),
            "fecha": $("#txtFecha").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_CargarTurnos",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('#LosTurnos').empty();
            },
            success: CargarTurnos_Cargados,
            error: errores,
            complete: function () {
                if (Med != 0 && Ind != -1) {
                    //CargarPacienteID(N_HC, Ind);
                    $("#IDTr"+Ind).click();
                }
            }
        });
    }

    function CargarPacienteID(ID, Index) {
      
        $("#afiliadoId").val(ID);
        ExisteAtencionenDia($('#cbo_Medico option:selected').val(), $('#cboEspecialidadDA option:selected').val(), $("#afiliadoId").val());
        //HA = $("#TFch" + Index).html();
        HA = $("#TFch" + Index).html().replace("hs.", "");
        Ind = Index;

        //ESTO ES PARA CIRUGIA
        var EspecialidadSeleccionadaText = $("#cboEspecialidadDA").text();
        if (EspecialidadSeleccionadaText.toLowerCase().indexOf("cirug") >= 0)
        {        
            $("#opcion_Cirugia").show();
        }
        else {
            $("#opcion_Cirugia").hide();
        }
        //ESTO ES PARA CIRUGIA
        
        if ($("#IDTr" + Index).hasClass("Turnos_Ocupados")) {
            $("#opcionFA").show();
            $("#opcion1").show();
            $("#opcion2").show();
            $("#opcion3").show();
            $("#opcion4").show();
            $("#opcion5").show();
            $("#opcion55").show();
            $("#opcion6").show();
            $("#opcion7").show();
            $("#opcion8").show();
            $("#opcion_diabetologia").show();
            $("#opcion12").show();
        }
        else {
            $("#opcionFA").hide();
            $("#opcion1").hide();
            $("#opcion2").hide();
            $("#opcion3").hide();
            $("#opcion4").hide();
            $("#opcion5").hide();
            $("#opcion55").hide();
            $("#opcion6").hide();
            $("#opcion7").hide();
            $("#opcion8").hide();
            $("#opcion11").hide();
            $("#opcion12").hide();
            $("#opcion_diabetologia").hide();
            //aca
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Libres")) {
            $("#opcion1").show();
            $("#opcion12").hide();
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Ausente")) {
            $("#opcion1").show();
            $("#opcion12").hide();
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Sobreturno")) {
            $("#opcion11").show();
            $("#opcion12").show();
            $("#opcionFA").hide();
            $("#opcion3").show();
            $("#opcion4").show();
            $("#opcion5").show();
            $("#opcion55").show();
            $("#opcion6").show();
            $("#opcion7").show();
            $("#opcion8").show();
            $("#opcion_diabetologia").show();
        }

        if ($("#IDTr" + Index).hasClass("Solo_Turno")) {
            $("#opcionFA").hide(); //Finalizar At ocultar...
            $("#opcion11").hide(); //Modificar At ocultar...
            $("#opcion1").hide(); //Ocultar Llamar Paciente, no esta recepcionado
            $("#opcion12").hide(); //Opcion Paciente Ausente...
        }
        

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


    function CargarTurnos_Cargados(Resultado) {
        turnosHora.length = 0;

        var Turnos = Resultado.d;
        var Datos = "";
        $('#LosTurnos').html(Datos);
        var Es = 0;
        var Ll = 0;
        var At = 0;
        var SoloTurno = 0;
        var Ausente = 0;
        if (Turnos.length > 0) { $(".confirm").show(); } else { $(".confirm").hide(); }
        var TeleConsulta = "";

        $.each(Turnos, function (index, turno) {
            turnosHora.push(turno.Fecha);
            if (turno.TeleConsulta == 1) { TeleConsulta = "inline"; } else { TeleConsulta = "none"; }
            
            if (turno.Estado == "-1") { SoloTurno++; Datos = Datos + "<tr id='IDTr" + index + "' class='Solo_Turno'"; }
            if (turno.Estado == "0") { Es++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Libres'"; }
            if (turno.Estado == "1") { Ll++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Ocupados'"; }
            if (turno.Estado == "2") { At++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Sobreturno'"; }
            if (turno.Estado == "7") { Ausente++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Ausente'"; }
            Datos = Datos + " onclick='javascript:CargarPacienteID(" + turno.documento + "," + index + ");'>";
            Datos = Datos + "<td id='TFch" + index + "'>" + turno.Fecha + "hs." + "</td>";
            Datos = Datos + "<td>" + turno.Paciente + "</td>";
            Datos = Datos + "<td>" + turno.NHC + "</td>";
            Datos = Datos + "<td>" + turno.Seccional + "</td>";
            if (turno.Estado == "-1") { Datos = Datos + "<td id='Est" + index + "'>Solo Turno</td>"; }
            if (turno.Estado == "0") { Datos = Datos + "<td id='Est" + index + "'>Espera " + turno.HoraRecep + "</td>"; }
            if (turno.Estado == "1") { Datos = Datos + "<td id='Est" + index + "'>Llamado</td>"; }
            if (turno.Estado == "2") { Datos = Datos + "<td id='Est" + index + "'>Atendido</td>"; }
            if (turno.Estado == "7") { Datos = Datos + "<td id='Est" + index + "'>Ausente</td>"; }
            Datos = Datos + "<td id='TAltoRiesgo" + index + "' data-est=" + turno.Alto_Riesgo + ">" + Mostrar_AltoR(turno.Alto_Riesgo) + "</td>";
            Datos = Datos + "<td><img style='display:" + TeleConsulta + "' src='../img/Icono_OK.gif' /></td>";
           // Datos = Datos + "<td>" + turno.Estado + "</td>";
            Datos = Datos + "</tr>";
        });
        $('#LosTurnos').html(Datos);
        $('#SEspera').html(Es);
        $('#SLlamado').html(Ll);
        $('#SFinalizado').html(At);
        $('#SSoloTurno').html(SoloTurno);
        $('#SAusente').html(Ausente);
    }

    function Mostrar_AltoR(Estado) {
        if (Estado) return "Si";
        else return "No";
    }

    function Cargar_Paciente_NHC(NHC, Index) {
        HA = $("#TFch" + Index).html().replace("hs.", "");
        Ind = Index;
        ExisteAtencionenDia($('#cbo_Medico option:selected').val(), $('#cboEspecialidadDA option:selected').val(), $("#afiliadoId").val());
        if ($("#IDTr" + Index).hasClass("Turnos_Ocupados")) {
            $("#opcionFA").show();
            $("#opcion1").show();
            $("#opcion2").show();
            $("#opcion3").show();
            $("#opcion4").show();
            $("#opcion5").show();
            $("#opcion55").show();
            $("#opcion6").show();
            $("#opcion7").show();
            $("#opcion8").show();
            $("#opcion12").show();
            $("#opcion_diabetologia").show();      
        }
        else {
            $("#opcionFA").hide();
            $("#opcion1").hide();
            $("#opcion2").hide();
            $("#opcion3").hide();
            $("#opcion4").hide();
            $("#opcion5").hide();
            $("#opcion55").hide();
            $("#opcion6").hide();
            $("#opcion7").hide();
            $("#opcion8").hide();
            $("#opcion11").hide();
            $("#opcion12").hide();
            $("#opcion_diabetologia").hide();
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Libres")) {
            $("#opcion1").show();
            $("#opcion12").hide();
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Ausente")) {
            $("#opcion1").show();
            $("#opcion12").hide();
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Sobreturno")) {
            $("#opcionFA").hide();
            $("#opcion11").show();
            $("#opcion3").show();
            $("#opcion4").show();
            $("#opcion5").show();
            $("#opcion55").show();
            $("#opcion6").show();
            $("#opcion7").show();
            $("#opcion8").show();
            $("#opcion12").hide();
            $("#opcion_diabetologia").hide();
        }

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

    function LlamarPaciente() {


        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/VerificarAusentesConsultorio",
            data: '{MedicoId: "' + $('#cbo_Medico option:selected').val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d == "0") {
                    $.ajax({
                        type: "POST",
                        url: "../Json/AtConsultorio/AtConsultorio.asmx/LlamarPaciente",
                        data: '{MedicoId: "' + $('#cbo_Medico option:selected').val() + '", NHC: "' + $("#afiliadoId").val() + '", fecha: "' + HA + '", Estado: "' + '", Especialidad: "' + $('#cboEspecialidadDA option:selected').val() + '", Estado: "' + $("#Est" + Ind).html() + '", Paciente: "' + $("#CargadoApellido").html() + '", ConsultorioId: "0"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: LlamarPaciente_Cargadas,
                        error: errores
                    });
                } else {
                    alert(Resultado.d);
                    return false;
                }
            },
            error: errores
        });




}

function FinalizarAtPaciente() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/FinalizarAtPaciente",
        data: '{MedicoId: "' + $('#cbo_Medico option:selected').val() + '", NHC: "' + $("#afiliadoId").val() + '", fecha: "' + HA + '", Estado: "' + '", Especialidad: "' + $('#cboEspecialidadDA option:selected').val() + '", Estado: "' + $("#Est" + Ind).html() + '", Paciente: "' + $("#CargadoApellido").html() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: FLlamarPaciente_Cargadas,
        error: errores
    });
}

function FLlamarPaciente_Cargadas(Resultado) {
    var Paciente = Resultado.d;
    $("#opcion1").hide();
    $("#opcion2").hide();
    $("#opcion3").hide();
    $("#opcion4").hide();
    $("#opcion5").hide();
    $("#opcion55").hide();
    $("#opcion6").hide();
    $("#opcion7").hide();
    $("#opcion8").hide();
    $("#opcionFA").hide();
    $("#opcion11").hide();
    $("#opcion_diabetologia").hide();
    CargarTurnos();
}

function InicioSesion(){
    alert("Error: Inicie Sesión Nuevamente.");
    parent.document.location = "../Login.aspx";
}

function LlamarPaciente_Cargadas(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente == -1) { InicioSesion();return false;} //A inicio de sesion...
    $("#opcionFA").show();
    $("#opcion1").show();
    $("#opcion2").show();
    $("#opcion3").show();
    $("#opcion4").show();
    $("#opcion5").show();
    $("#opcion55").show();
    $("#opcion6").show();
    $("#opcion7").show();
    $("#opcion8").show();
    $("#opcion11").hide();
    $("#opcion12").show();
    $("#opcion_diabetologia").show();
    ExisteAtencionenDia($('#cbo_Medico option:selected').val(), $('#cboEspecialidadDA option:selected').val(), $("#afiliadoId").val());
    CargarTurnos();
}

    function Cargar_Paciente_NHC_Cargado(Resultado) {
        var Paciente = Resultado.d;
        var PError = false;



        $.each(Paciente, function (index, paciente) {
            //alert(paciente.cuil)
            $("#afiliadoCuil").val(paciente.cuil);
            //alert($("#afiliadoCuil").val());

            $("#CargadoApellido").html(paciente.Paciente);
            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#afiliadoId").val(paciente.documento);
            if (paciente.Nro_Seccional != 998)
                $("#CargadoSeccional").html(paciente.Seccional);
            else $("#CargadoSeccional").html(paciente.ObraSocial);
            //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');


           // alert(paciente.Foto);
            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
            }
            //CargarAfiliadoIdVPN();
        });

    }

    function PedidoEnfermeria() {
        var Pagina = "PedidoEnfermeria.aspx?MEDICOID=" + $('#cbo_Medico option:selected').val() + " ";
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

function AltaComplejidad() {
    $("#myModalSeleccion").modal('show');

//    var Pagina = "EstudiosAltaComplejidad.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
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





function CertificadoMedico() {
    //var Pagina = "../Impresiones/CertificadoMedicoN.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
    var Pagina = "CertificadoMedico.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
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
   // var Pagina = "CargadeEstudios.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";

    //if ($('#cboEspecialidadDA option:selected').val() == 201) 
    if ($.inArray(parseInt($('#cboEspecialidadDA').val()), odontos) >= 0)
    { Pagina = "Orden_Laboratorio_Odontologia.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA + " "; } else
    { Pagina = "CargadeEstudios.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " "; }

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

function SolicituddeTraslado() {
    var Pagina = "SolicituddeTraslado.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
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
    $("#ProtocoloImpresion").val("0"); //Valor para retornar de la impresion a la ventana de la receta... (0 no retorna)
    var Pagina = "Receta.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspId=" + $("#cboEspecialidadDA :selected").val() + " ";
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
    CargarFancyRecetas("Receta.aspx?Protocolo=" + $("#ProtocoloImpresion").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ");
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


function OrdenesInternacion() {
    var Pagina = "OrdenInternacion.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
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

function CargarAtencion() {
    
//    var Pagina = ""; //201
//    if ($('#cboEspecialidadDA option:selected').val() == 201) { Pagina = "CargaAtencion_Odontologia.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA + " "; } else
//    { Pagina = "Consulta_General.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA + " "; }

    var Pagina = ""; //201
    // == 201
    //alert($.inArray(parseInt($('#cboEspecialidadDA').val()), odontos));
    if ($.inArray(parseInt($('#cboEspecialidadDA').val()), odontos) >= 0) { Pagina = "CargaAtencion_Odontologia.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA + "&XHC=0 "; } else
    { Pagina = "Consulta_General.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA + " "; }


    Pagina = Pagina.slice(0, -1);
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
		    'showCloseButton': false
		}
	        );
}

function ModificarAtencion() {
    switch ($('#cboEspecialidadDA option:selected').html()) {
//        case "DIABETOLOGIA":
//            Pagina = "Consulta_Diabetologia.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
//            //Pagina = "Consulta_General.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val();
//            Pagina = Pagina + "&m=1";
//            break;

case "ODONTOLOGIA":
    Pagina = "CargaAtencion_Odontologia.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA;
    Pagina = Pagina + "&m=1&XHC=0";
    break;

case "ENDODONCIA (T. DE CONDUCTO)":
    Pagina = "CargaAtencion_Odontologia.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA;
    Pagina = Pagina + "&m=1&XHC=0";
    break;

default:
    Pagina = "Consulta_General.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val();
    Pagina = Pagina + "&m=1";
    break;
    }
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
		    'enableEscapeButton': false
		}
	        );
}

function CargarHCTotal() {
    document.location = "../HistoriaClinica/HistoriaClinica.aspx?NHC=" + $("#afiliadoId").val() + "&Esp=" + $('#cboEspecialidadDA option:selected').val() + "&Med=" + $('#cbo_Medico option:selected').val() + "&Lista=1" + "&Ind=" + Ind;
}

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







function Diabtelogia() {
    var Pagina = "";
    //Pagina = "Listar_Consultas_Diabeticos.aspx?NHC=" + $("#afiliadoId").val() + "&VolverListado=1&MostrarBtnCancelar=1";
    //Pagina = "Listar_Consultas_Diabeticos.aspx?NHC=" + $("#afiliadoIdVPN").val() +"&VolverListado=1&MostrarBtnCancelar=1";
    //alert($("#afiliadoIdVPN").val());

    CargarAfiliadoIdVPN();


}

function CargarAfiliadoIdVPN() {
    var json = JSON.stringify({ "afiliadoCuil": $("#afiliadoCuil").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerIdXCuilDBT",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#afiliadoIdVPN").val(Resultado.d);
            if ($("#afiliadoIdVPN").val() != "0") {
                comprobarDBT();

            //} else { alert("ATENCIÓN! OCURRIÓ UN INCOVENIENTE CON LOS DATOS DEL AFILIADO COMUNÍQUESE CON AFILICIONES") }
            } else { alert("ATENCIÓN! VERIFIQUE QUE EL CUIL DEL AFILIADO SEA EL MISMO AL DEL PADRÓN. PARA CONTINUAR, COMUNÍQUESE CON AFILICIONES.") }
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
        success: function (Resultado) { Pagina = "http://gesinmed.policlinicocentral.org.ar:8095?NHC=" + $("#afiliadoIdVPN").val() + "&VolverListado=1&MostrarBtnCancelar=1" + "&medico=" + Resultado.d; },
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


function Validar_AltoRiesgo() {
    if ($("#afiliadoId").val() == "") return false;
    if ($("#afiliadoId").val() <= 0) return false;
    if (Ind < 0) return false;
    return true;
}

function Estado_AltoRiesgo() {
    if ($("#TAltoRiesgo" + Ind).data("est") == true) return false; //Invierto estado actual
    else return true;
}

function Click_Update_AltoRiesgo() {
    if (!Validar_AltoRiesgo()) return false;
    //    Update_AltoRiesgo($("#afiliadoId").val(), Estado_AltoRiesgo());
    
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': 'AltoRiesgo.aspx?AfiliadoId=' + $("#afiliadoId").val(),
		    'width': '50%',
		    'height': '50%',
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

function Update_AltoRiesgo(PacienteId, Alto_Riesgo) {
    var json = JSON.stringify({"PacienteId": PacienteId, "Alto_Riesgo": Alto_Riesgo});
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/Update_Alto_Riesgo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Estado Actualizado.");
            CargarTurnos();
        },
        error: errores
    });
}





function Cirugia() {
    var Pagina = "";
    Pagina = "Solicitud_Cirugia_Programada.aspx?NHC=" + $("#afiliadoId").val();
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
		    'showCloseButton': false
		}
	        );
}



function Vacunas() {
    var Pagina = "../Vacunacion/Vacunacion.aspx?afiliadoId=" + $("#afiliadoId").val() + "&InternacionId=" + 0;
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
		    'showCloseButton': true
		}
	        );
}


$("#altaComp_IMG").click(function () {
    //ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + " ";
    $.fancybox({
        'autoDimensions': false,
        'href': "../AtConsultorio_IMG/EstudiosAltaComplejidad_IMG.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + "&intGuar=3",
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
});

function evolucionEspecialista() {

    // alert($("#CargadoNHC").html());
    Pagina = "../AtInternados/evoluciónEspecialista.aspx?NHC=" + $("#afiliadoId").val() + "&INT=" + -1 + "&tipo=2" + " ";
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

//function CargarAfiliadoIdVPN() {
//    alert();
//    var json = JSON.stringify({ "afiliadoCuil": $("#afiliadoCuil").val() });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Diabetes.asmx/TraerIdXCuilDBT",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (Resultado) {
//            if (Resultado.d == 0) {
//                if ($('#cboEspecialidadDA option:selected').val() == 164 || $('#cboEspecialidadDA option:selected').val() == 242) {
//                    alert("ATENCIÓN! OCURRIÓ UN INCOVENIENTE CON LOS DATOS DEL AFILIADO COMUNÍQUESE CON AFILIACIONES ")
//                }
//            } else { $("#afiliadoIdVPN").val(Resultado.d); }
//        },
//        error: errores
//    });
//}

$("#DivEstudiosComplementarios").click(function () {
    //ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + " ";
    var Pagina = "../EstudiosComplementarios/EstudiosComplementarios.aspx?NHC=" + $("#afiliadoId").val() + "&Internado=" + 0 + " ";
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
});