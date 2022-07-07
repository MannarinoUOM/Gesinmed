Cargar_Seccionales_Lista();
var nServicio = "";
var nSala = "";
var nCama = "";
var nServicioId = 0;
var nSalaId = 0;
var nCamaId = 0;
var EditantoId = 0;
var me = 0;
var PCargado = 0;
var Desde = 0;

Cargar_Hosp_Por();
Cargar_MotivoIngreso();
Cargar_Especialidades(true, 0, true);
Cargar_Medicos_por_Especialidad(0);

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}


function CargarServicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Servicios_A",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarServicios_Cargados,
        error: errores
    });
}

function CargarServicios_Cargados(Resultado) {
    
    var Servicios = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";


    $("#TablaServicio").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Servicio</th></tr></thead><tbody>";
    $.each(Servicios, function (index, servicio) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + "><td id='Serv"+servicio.id+"' onclick=Servicio(" + servicio.id + ")>"+ servicio.descripcion +"</td>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaServicio").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    if(EditantoId!=0)
    {
        var n = $("#Serv" + nServicioId).html().substr(0,15) + "...";
       //$("#lblServicio_c").html($("#Serv" + nServicioId).html());
        $("#lblServicio_c").html("Servicio: " + n);
    }
}

function Servicio(Id) {
    Vl('pSala');
    $("#TablaCama").empty();
    nServicio = $("#Serv"+Id).html();
    nServicioId = Id;
    CargarSalas(Id);
}

CargarServicios();

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



function CargarSalas(ServicioId) {
    $.ajax({
        type: "POST",
        data: '{Servicio: "' + ServicioId + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas_A",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarSalas_Cargados,
        error: errores
    });
}

function CargarSalas_Cargados(Resultado) {
    var Salas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";


    $("#TablaSalas").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Sala</th><th>Libre</th><th>Ocupada</th><th>Total</th></tr></thead><tbody>";
    $.each(Salas, function (index, sala) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + "><td></td><td id='Sal" + sala.id + "' onclick=Sala(" + sala.id + ")>" + sala.descripcion + "</td><td>" + sala.Libres + "</td><td>" + sala.Ocupadas + "</td><td>" + sala.Totales + "</td><td></td>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaSalas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    if(EditantoId!=0)
    {
       //$("#lblSala_c").html($("#Sal" + nSalaId).html());
    }
}

function Sala(SalaId) {
    Vl('pCama');
    nSala = $("#Sal" + SalaId).html();
    nSalaId = SalaId;
    CargarCamas(SalaId);
}

function CargarCamas(SalaId) {
    $.ajax({
        type: "POST",
        data: '{Sala: "' + SalaId + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas_A",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarCamas_Cargados,
        error: errores
    });
}

function CargarCamas_Cargados(Resultado) {
    var Camas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";


    $("#TablaCama").empty();

    Tabla_Titulo = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Cama</th><th>Paciente</th></tr></thead><tbody>";
    $.each(Camas, function (index, cama) {
        Tabla_Datos = Tabla_Datos + "<tr";
        if (cama.Paciente == null || cama.Paciente == '')
        {
        Tabla_Datos = Tabla_Datos + "><td id='Cama" + cama.id + "' onclick=Cama(" + cama.id + ")>" + cama.descripcion + "</td><td onclick=Cama(" + cama.id + ")>" + cama.Paciente + "</td>";
        }
        else
        {
        Tabla_Datos = Tabla_Datos + "><td id='Cama" + cama.id + "' onclick=Ocupado()>" + cama.descripcion + "</td><td onclick=Ocupado()>" + cama.Paciente + "</td>";
        }
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaCama").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    if(EditantoId!=0)
    {
       $("#lblCama_c").html($("#Cama" + nCamaId).html());
    }
}

function Cama(CamaId) {
    nCama = $("#Cama" + CamaId).html();
    nCamaId = CamaId;
    $("#lblNombre").html($("#CargadoApellido").html()); 
    $("#lblNHC").html($("#CargadoNHC").html());
    $("#lblFecha").val($("#txtFechaInternacion").val());
    $("#lblHora").val($("#txtHoraInternacion").val());
    var nServicio_ = nServicio.substr(0,10); 
    $("#lblCama_c").html(nCama);
    
    Estado_Aislado();
    $('#InternacionModal').modal('show');
}

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {


        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
        }
    }
});

$("#txt_dni").change(function () {
    Cargar_Paciente_Documento($("#txt_dni").val());
});

$("#txtNHC").change(function () {
    Cargar_Paciente_NHC($("#txtNHC").val());
});

function Cargar_Paciente_Documento(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento_internacion",
        data: '{Documento: "' + Documento + '", Id: "'+EditantoId+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function Ocupado()
{
    alert("Cama Ocupada");
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);
        $("#txtTelefono").attr('value', paciente.Telefono);
        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

        $("#btnOtorgados").css('display', 'inline');

        if ($("#txtTelefono").val().length < 5) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
            PError = true;
        }
        if (paciente.Nro_Seccional == 999) {
            $("#controlSeccional").addClass("error");
            PError = true;
        }

        $("#CargadoApellido").html(paciente.Paciente);
        $("#lblNombre").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#lblNHC").html(paciente.cuil);

        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');
        $('#ImgPacienteMini').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');        

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            if (paciente.ObraSocial.length > 40) {
                $("#CargadoSeccional").html(paciente.ObraSocial.substring(0, 37)+"...");
            } else {
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }
        }
        else {
            $("#btnVencimiento").show();
        }

        $("#lblFecha").val($("#txtFechaInternacion").val());
        $("#lblHora").val($("#txtHoraInternacion").val());

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            //$("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}


function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}


function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_Internacion",
        data: '{NHC: "' + NHC + '", Id: "'+EditantoId+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cambiar(NHC) {
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

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;



    $.each(Paciente, function (index, paciente) {
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        $("#lblNombre").html(paciente.Paciente);
        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento);
        $("#txtNHC").attr('value', paciente.NHC);
        $("#txtTelefono").attr('value', paciente.Telefono);



        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



        if ($("#txtTelefono").val().length < 5) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
            PError = true;
        }


//        if (PCargado == 1)
//        {
//        $("#hastaaqui").fadeIn(1500);
//        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
//        }


        if (paciente.Nro_Seccional == "999") {
            $("#controlSeccional").addClass("error");
            PError = true;
        }

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#CargadoEdad").html(AnioActual.getFullYear() - AnioNacimiento.getFullYear());
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');
        $('#ImgPacienteMini').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');        

        //FechaYHora();

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        else {
            $("#btnVencimiento").show();
        }

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            //$("#desdeaqui").show();
        }

    });
}

function FechaYHora() {
    var d = $.now();

    $("#txtFechaInternacion").val(FechaActual());
    $("#txtHoraInternacion").val(HoraActual());
}

function Cargar_Hosp_Por() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/HospPorLista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Hosp_Por_Cargadas,
        error: errores
    });

}

function Cargar_Hosp_Por_Cargadas(Resultado) {
    var Hosppor = Resultado.d;
    $('#cbo_Hospor').empty();
    $.each(Hosppor, function (index, hosppor) {
        $('#cbo_Hospor').append(
              $('<option></option>').val(hosppor.id).html(hosppor.descripcion)
            );
    });
}


function Cargar_MotivoIngreso() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/MotivoIngresoLista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_MotivoIngreso_Cargadas,
        error: errores
    });

}

function Cargar_MotivoIngreso_Cargadas(Resultado) {
    var Hosppor = Resultado.d;
    $('#cbo_Motivo').empty();
    $.each(Hosppor, function (index, hosppor) {
        $('#cbo_Motivo').append(
              $('<option></option>').val(hosppor.id).html(hosppor.motivo)
            );
    });
}


function Cargar_Medicos_por_Especialidad(Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Medicos</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });

    if (EditantoId!=0)
    {
        $("#cbo_Medico option[value=" + me + "]").attr("selected", true);       
        Estado_Aislado();
        $("#desdeaqui_nombre").html("Cambiar Sala/Cama");
        $("#btnModificar").show();
       // $("#btnDatosAcom").show();
    }
}

$("#btnModificar").click(function () {
    $('#InternacionModal').modal('show');
});

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}


function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}


$('#cbo_Especialidad').change(function () {
    Cargar_Medicos_por_Especialidad($(this).val());
});

function Vl(Adonde) {
    $("#" + Adonde).fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#" + Adonde).offset().top - 60 }, 500);
}



$('#btnGuardarInternacion').click(function () {
if ($("#lblFecha").val().trim().length == 0 || $("#lblHora").val().trim().length == 0) {alert("Ingrese Fecha y Hora"); return;}
if (confirm("¿Desea confirmar la internación?")){
    if ($('#cbo_Especialidad :selected').val() != 0 && $('#cbo_Medico :selected').val() != 0)
    {
         if ($("#rdInt").is(":checked")){
            var json = JSON.stringify({
                "Id": EditantoId,
                "NHC": $("#txtNHC").val(),
                "Fecha": $("#lblFecha").val() + " " + $("#lblHora").val(),
                "Servicio": nServicioId,
                "Sala": nSalaId,
                "Cama": nCamaId,
                "Telefono": $("#txtFelefono").val(),
                "Diagnostico": $("#txtDiagnostico").val().trim().toUpperCase(),
                "Hospitalizadopor": $('#cbo_Hospor option:selected').val(),
                "Motivo": $('#cbo_Motivo option:selected').val(),
                "Observacion": $("#txtObservaciones").val().trim().toUpperCase(),
                "Especialidad": $('#cbo_Especialidad option:selected').val(),
                "Medico": $('#cbo_Medico option:selected').val()
            });

            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/Internacion_Guardar",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Internacion_Guardada,
                error: errores
            });
         }
            if ($("#rdAmbu").is(":checked")){
                var json = JSON.stringify({
                    "Id": EditantoId,
                    "NHC": $("#txtNHC").val(),
                    "Fecha": $("#lblFecha").val() + " " + $("#lblHora").val(),
                    "Servicio": nServicioId,
                    "Sala": nSalaId,
                    "Cama": nCamaId,
                    "Telefono": $("#txtFelefono").val(),
                    "Diagnostico": $("#txtDiagnostico").val().trim().toUpperCase(),
                    "Hospitalizadopor": $('#cbo_Hospor option:selected').val(),
                    "Motivo": $('#cbo_Motivo option:selected').val(),
                    "Observacion": $("#txtObservaciones").val().trim().toUpperCase(),
                    "Especialidad": $('#cbo_Especialidad option:selected').val(),
                    "Medico": $('#cbo_Medico option:selected').val()
                });

                $.ajax({
                    type: "POST",
                    url: "../Json/Internaciones/IntSSC.asmx/Internacion_Guardar_Ambulatorio_SN",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: Internacion_Guardada,
                    error: errores
                });
            }

    }
    else alert("Complete la Especialidad y el Médico.");
    }
});

function Internacion_Guardada(Resultado) {
    ImpresionIngreso(Resultado.d);
}


//$("#btnDatosAcom").click(function () {
//    var Pagina = "DatosAcompa.aspx?Id=" + EditantoId;
//     $.fancybox(
//		{
//		    'autoDimensions': false,
//		    'href': Pagina,
//		    'width': '78%',
//		    'height': '78%',
//		    'autoScale': false,
//		    'transitionIn': 'none',
//		    'transitionOut': 'none',
//		    'type': 'iframe',
//		    'hideOnOverlayClick': false,
//		    'enableEscapeButton': false
//		});
//});


function ImpresionIngreso(Id) {
    if ($("#rdInt").is(":checked")) var Pagina = "../Impresiones/Impresion_Ingreso.aspx?Id=" + Id + " ";
    if ($("#rdAmbu").is(":checked")) var Pagina = "../Impresiones/Impresion_Ingreso_Ambulatorio.aspx?Id=" + Id + " "; 
    Pagina = Pagina.slice(0, -1);
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
		    'onClosed': function () {
		        self.location = 'Internaciones.aspx';
		    }
		}
	        );
}

function Aislar_Sala()
{
var json = JSON.stringify({
        "SalaId": nSalaId,
        "Motivo": $("#txt_Motivo").val(),
        "Estado": $("#btnAislar").html()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Aislar_Sala",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Aislar_Sala_Guardada,
        error: errores
    });
}

function Aislar_Sala_Guardada(Resultado) {
    alert("Aislada");
}



function Estado_Aislado() {
var json = JSON.stringify({"Salaid": nSalaId});
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Estado_Aislado_Sala",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Estado_Aislado_Cargados,
        error: errores
    });
}

function Estado_Aislado_Cargados(Resultado) {
    var Aislados = Resultado.d;
    $("#btnAislar").removeClass();
    $("#btnAislar").addClass(Aislados.Clase);
    $("#btnAislar").html(Aislados.Estado);
    $("#txt_Motivo").val(Aislados.Motivo);
}




$('#btnAislar').click(function () {

if ($('#btnAislar').html() == "Disponible")
{
$('#btnAislar').html("Aislada");
$('#btnAislar').removeClass();
$('#btnAislar').addClass("btn btn-warning");

}
else
{
$('#btnAislar').html("Disponible");
$('#btnAislar').removeClass();
$('#btnAislar').addClass("btn btn-success");
}

    Aislar_Sala();
});


function Cargar_Internacion(Id) {
    var json = JSON.stringify({
        "Id": EditantoId,
    });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Cargar_Internacion_Id_Ambulatorio_SN",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Internacion_ID_Cargada,
        error: errores
    });
}

function Internacion_ID_Cargada(Resultado)
{
    var i = Resultado.d;
    Cargar_Medicos_por_Especialidad(i.especialidad);
    me = i.medico;
    nServicioId = i.servicioId;
    nSalaId = i.salaId;
    nCamaId = i.CamaId;
    $("#lblNHC").html(i.NHC);
    Cargar_Paciente_NHC(i.NHC);
    $("#lblFecha").val(i.dia);
    $("#lblHora").val(i.hora);
    //$("#lblRendicion").html(i.NroRendicion);
    $("#txtFechaInternacion").val(i.dia);
    $("#txtHoraInternacion").val(i.hora);
    CargarServicios();
    CargarSalas(i.servicioId);
    CargarCamas(i.salaId);
    $("#txtFelefono").val(i.telefono);
    $("#txtDiagnostico").val(i.diagnostico);
    $("#cbo_Hospor option[value=" + i.hospitalizadopor + "]").attr("selected", true);
    $("#cbo_Motivo option[value=" + i.motivoingreso + "]").attr("selected", true);
    $("#cbo_Especialidad option[value=" + i.especialidad + "]").attr("selected", true);       
    $("#txtObservaciones").val(i.observaciones);
}

$(document).ready(function () {


    $('#tabs').tab();
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txt_dni").mask("9999999?9", { placeholder: "-" });
    $("#lblHora").mask("99:99", { placeholder: "-" });
        $("#lblFecha").val(FechaActual());
    $("#lblHora").val(HoraActual());
    $("#lblFecha").mask("99/99/9999", { placeholder: "-" });
    var GET = {};
    $("#txtFechaInternacion").mask("99/99/9999", { placeholder: "-" });
    $("#txtHoraInternacion").mask("99:99", { placeholder: "-" });

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    $("#li_preImpresos").hide();
    if (GET["NHC"] != "" && GET["NHC"] != null) {
        PCargado = 1;
        Cargar_Paciente_NHC(GET["NHC"]);        
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        EditantoId = GET["ID"];
        Cargar_Internacion(GET["ID"]);
        $("#li_preImpresos").show();
    }

});

$("#btnBuscarPaciente").fancybox({
        'hideOnContentClick': true,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });


function RecargarPagina(url) {
    document.location = "../Internacion/Internaciones.aspx" + url;
}

$("#btnAceptarPre").click(function () {
var url = "";
    switch ($("#cbo_PreImp :selected").val()){
        case "3": url= "../Impresiones/ImpresionInternacionInfHospitalizacion.aspx?Id=" + EditantoId+"&Ambulatorio="+true;
        Ventana(url);
        break;
    }
});

function Ventana(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
}

$("#btnEliminarInternacion").click(function () {
if (confirm("¿Desea dar de baja la internación?")){
        var json = JSON.stringify({"Id": EditantoId });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Internacion_Baja_Ambulatoria_SN",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Internacion_Baja_Confirmada,
            error: errores
        });
    }
});

function Internacion_Baja_Confirmada(){
    alert("Baja confirmada");
    window.location = "../Internacion/Internaciones.aspx";
}