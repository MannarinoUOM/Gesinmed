var CM = 0;
var HA = "";
var Ind = -1;
var Med = 0;
var Esp = 0;
var N_HC = 0;
var Turno_Actual = 0;

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

    var json = JSON.stringify({"MedicoId": Medico, "EspecialidadId": Especialidad, "NHC": NHC});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/At_Consultorio_Existe_Atencion_by_NHC",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) {
                if (!$("#IDTr" + Ind).hasClass("Turnos_Sobreturno")) { $("#opcionFA").show(); $("#opcion11").show(); } //Existe At cargada, por lo tanto puedo finalizar...
                else { $("#opcionFA").hide(); $("#opcion11").show(); }
            }
            else { $("#opcionFA").hide(); $("#opcion11").hide(); }
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
        $.ajax({
            type: "POST",
            url: "../Json/Turnos/DiasAtencionEdicion.asmx/Especialidad_Atencion_Medico",
            data: '{MedicoId: "' + MedicoId + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
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
                url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/At_Consultorio_CargarTurnos_IMG",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: CargarTurnos_Cargados,
                error: errores
            });
        }

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
//                $("#opcion4").hide();
//                $("#opcion5").hide();
//                $("#opcion55").hide();
//                $("#opcion6").hide();
//                $("#opcion7").hide();
//                $("#opcion8").hide();
                $("#opcion11").hide();
//                $("#opcion_diabetologia").hide();
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
            url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/At_Consultorio_CargarTurnos_IMG",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
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

    function CargarPacienteID(ID, Index, Turno_Id) {
        Turno_Actual = Turno_Id;
        $("#afiliadoId").val(ID);
        ExisteAtencionenDia($('#cbo_Medico option:selected').val(), $('#cboEspecialidadDA option:selected').val(), $("#afiliadoId").val());
        //HA = $("#TFch" + Index).html();
        HA = $("#TFch" + Index).html().replace("hs.", "");
        Ind = Index;

        $("#opcion_estado1").hide();

        if ($("#IDTr" + Index).hasClass("Turnos_Ocupados")) {
            $("#opcionFA").show();
            $("#opcion1").show();
            $("#opcion2").show();
            $("#opcion3").show();
//            $("#opcion4").show();
//            $("#opcion5").show();
//            $("#opcion55").show();
//            $("#opcion6").show();
//            $("#opcion7").show();
//            $("#opcion8").show();
//            $("#opcion_diabetologia").show();
            $("#opcion12").show();
        }
        else {
            $("#opcionFA").hide();
            $("#opcion1").hide();
            $("#opcion2").hide();
            $("#opcion3").hide();
//            $("#opcion4").hide();
//            $("#opcion5").hide();
//            $("#opcion55").hide();
//            $("#opcion6").hide();
//            $("#opcion7").hide();
//            $("#opcion8").hide();
            $("#opcion11").hide();
            $("#opcion12").hide();            
//            $("#opcion_diabetologia").hide();
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
            $("#opcion12").hide();
            $("#opcionFA").hide();
            $("#opcion3").show();

            //Activo El proximo estado...
            $("#opcion_estado1").show();
//            $("#opcion4").show();
//            $("#opcion5").show();
//            $("#opcion55").show();
//            $("#opcion6").show();
//            $("#opcion7").show();
//            $("#opcion8").show();
//            $("#opcion_diabetologia").show();
        }
        if ($("#IDTr" + Index).hasClass("Solo_Turno")) {
            $("#opcionFA").show();
            $("#opcion1").show();
            $("#opcion12").show();
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Entregado") || $("#IDTr" + Index).hasClass("Turnos_Informe")) {            
            $("#opcionFA").hide();
            $("#opcion11").show();
            $("#opcion3").show();
            $("#opcion_estado1").show();
            $("#opcion12").hide();
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
        var Turnos = Resultado.d;
        var Datos = "";
        $('#LosTurnos').html(Datos);
        var Es = 0;
        var Ll = 0;
        var At = 0;
        var SoloTurno = 0;
        var Ausente = 0;
        var Informe = 0;
        var Entregado = 0;
        $.each(Turnos, function (index, turno) {
            if (turno.Estado == "-1") { SoloTurno++; Datos = Datos + "<tr id='IDTr" + index + "' class='Solo_Turno'"; }
            if (turno.Estado == "0") { Es++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Libres'"; }
            if (turno.Estado == "1") { Ll++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Ocupados'"; }
            if (turno.Estado == "2" && turno.Estado_IMG == "0") { At++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Sobreturno'"; }
            if (turno.Estado == "7") { Ausente++; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Ausente'"; }
            if (turno.Estado_IMG == "1") { Informe++; At--;  Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Informe'"; }
            if (turno.Estado_IMG == "2") { Entregado++; At--; Datos = Datos + "<tr id='IDTr" + index + "' class='Turnos_Entregado'"; }
            Datos = Datos + " onclick='javascript:CargarPacienteID(" + turno.documento + "," + index + "," + turno.Turno_Id + ");' onmouseenter='javascript:MostrarFlotante(" + turno.Turno_Id + "," + index + ");'>";
            Datos = Datos + "<td id='TFch" + index + "'>" + turno.Fecha + "hs." + "</td>";
            Datos = Datos + "<td>" + turno.Paciente + "</td>";
            Datos = Datos + "<td>" + turno.NHC + "</td>";
            Datos = Datos + "<td>" + turno.Seccional + "</td>";
            if (turno.Estado == "-1") { Datos = Datos + "<td id='Est" + index + "'>Solo Turno</td>"; }
            if (turno.Estado == "0") { Datos = Datos + "<td id='Est" + index + "'>Espera " + turno.HoraRecep + "</td>"; }
            if (turno.Estado == "1") { Datos = Datos + "<td id='Est" + index + "'>Llamado</td>"; }
            if (turno.Estado == "2" && turno.Estado_IMG == "0") { Datos = Datos + "<td id='Est" + index + "'>Atendido</td>"; }
            if (turno.Estado == "7") { Datos = Datos + "<td id='Est" + index + "'>Ausente</td>"; }
            if (turno.Estado_IMG == "1") { Datos = Datos + "<td id='Est" + index + "'>Informe</td>"; }
            if (turno.Estado_IMG == "2") { Datos = Datos + "<td id='Est" + index + "'>Entregado</td>"; }
            Datos = Datos + "</tr>";
        });
        $('#LosTurnos').html(Datos);
        $('#SEspera').html(Es);
        $('#SLlamado').html(Ll);
        $('#SFinalizado').html(At);
        $('#SSoloTurno').html(SoloTurno);
        $('#SAusente').html(Ausente);

        $('#SInforme').html(Informe);
        $('#SEntregado').html(Entregado);

    }

    function Cargar_Paciente_NHC(NHC, Index) {
        HA = $("#TFch" + Index).html().replace("hs.", "");
        Ind = Index;
        ExisteAtencionenDia($('#cbo_Medico option:selected').val(), $('#cboEspecialidadDA option:selected').val(), $("#afiliadoId").val());
        $("#opcion_estado1").hide();
        if ($("#IDTr" + Index).hasClass("Turnos_Ocupados")) {
            $("#opcionFA").show();
            $("#opcion1").show();
            $("#opcion2").show();
            $("#opcion3").show();
//            $("#opcion4").show();
//            $("#opcion5").show();
//            $("#opcion55").show();
//            $("#opcion6").show();
//            $("#opcion7").show();
//            $("#opcion8").show();
            $("#opcion12").show();
//            $("#opcion_diabetologia").show();      
        }
        else {
            $("#opcionFA").hide();
            $("#opcion1").hide();
            $("#opcion2").hide();
            $("#opcion3").hide();
//            $("#opcion4").hide();
//            $("#opcion5").hide();
//            $("#opcion55").hide();
//            $("#opcion6").hide();
//            $("#opcion7").hide();
//            $("#opcion8").hide();
            $("#opcion11").hide();
            $("#opcion12").hide();
//            $("#opcion_diabetologia").hide();
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
            $("#opcion_estado1").hide();
            

//            $("#opcion4").show();
//            $("#opcion5").show();
//            $("#opcion55").show();
//            $("#opcion6").show();
//            $("#opcion7").show();
//            $("#opcion8").show();
            $("#opcion12").hide();
//            $("#opcion_diabetologia").hide();
        }

        if ($("#IDTr" + Index).hasClass("Turnos_Entregado") || $("#IDTr" + Index).hasClass("Turnos_Informe")) 
        {            
            $("#opcionFA").hide();
            $("#opcion11").show();
            $("#opcion3").show();
            $("#opcion_estado1").hide();            
            $("#opcion12").hide();
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
        url: "../Json/AtConsultorio/AtConsultorio.asmx/LlamarPaciente",
        data: '{MedicoId: "' + $('#cbo_Medico option:selected').val() + '", NHC: "' + $("#afiliadoId").val() + '", fecha: "' + HA + '", Estado: "' + '", Especialidad: "' + $('#cboEspecialidadDA option:selected').val() + '", Estado: "' + $("#Est" + Ind).html() + '", Paciente: "' + $("#CargadoApellido").html() + '", ConsultorioId: "0"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LlamarPaciente_Cargadas,
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
//    $("#opcion4").hide();
//    $("#opcion5").hide();
//    $("#opcion55").hide();
//    $("#opcion6").hide();
//    $("#opcion7").hide();
//    $("#opcion8").hide();
    $("#opcionFA").hide();
    //$("#opcion11").show();
//    $("#opcion_diabetologia").hide();
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
//    $("#opcion4").show();
//    $("#opcion5").show();
//    $("#opcion55").show();
//    $("#opcion6").show();
//    $("#opcion7").show();
//    $("#opcion8").show();
    $("#opcion11").hide();
    $("#opcion12").show();
//    $("#opcion_diabetologia").show();
    ExisteAtencionenDia($('#cbo_Medico option:selected').val(), $('#cboEspecialidadDA option:selected').val(), $("#afiliadoId").val());
    CargarTurnos();
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
            $("#afiliadoId").val(paciente.documento);
            if (paciente.Nro_Seccional != 998)
                $("#CargadoSeccional").html(paciente.Seccional);
            else $("#CargadoSeccional").html(paciente.ObraSocial);
            //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
            $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
            }

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



function CargadeEstudios(Id) {
    var Pagina = "CargadeEstudios.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
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


function Estado(Cual) {
    var Pagina = "";
    Pagina = "Consulta_Estado.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA + "&T_Act=" + Turno_Actual + "&Estado=" + Cual +" ";

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


function CargarAtencion() {
    var Pagina = "";
    Pagina = "Consulta_IMG.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val() + "&F=" + HA + "&T_Act=" + Turno_Actual + " ";
    
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
    if ($('#cboEspecialidadDA option:selected').html() == 'DIABETOLOGIA') {
        Pagina = "Consulta_Diabetologia.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
    }
    else {
        Pagina = "Consulta_IMG.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cboEspecialidadDA option:selected').val();
        Pagina = Pagina + "&m=1";
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




function OcultarPracticas() {
    $("#Flotante_Practicas").hide();
}

var buscando = 0;
var buscando_anterior = 0;

function MostrarFlotante(Turno_Id, Indice) {
    $("#contenedor_practicas").html("");
    $("#cargando").show();
    $("#Flotante_Practicas").show();
    $("#prac_b").html($('#IDTr' + Indice + ' td:nth-child(1)').html() + " " + $('#IDTr' + Indice + ' td:nth-child(2)').html());

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Atencion_Consultorio_IMG.asmx/Cargar_gral_carga_practicas",
        data: '{TurnoId: ' + Turno_Id + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultados) {
            $("#cargando").hide();
            Datos = "";
            $.each(Resultados.d, function (index, res) {
                Datos = Datos + res.Practica_Id + " " + res.Detalle + "<br/>";
            });
            $("#contenedor_practicas").html(Datos);
            buscando = 0;
        },
        error: errores
    });

}





