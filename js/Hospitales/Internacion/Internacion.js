
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
var Movimiento = 0;
var Ultimo_OK = 0;
var guardando = 0;

Cargar_Hosp_Por();
Cargar_MotivoIngreso();
Cargar_Especialidades(false, 0, false);
Cargar_Medicos_por_Especialidad(0);
Cargar_Seccionales_Lista();

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function UltimoAporte_OK() {
    return false;
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
                $("#desdeaqui").remove();
            }
        }
    });
}

function CargarServicios() {
    $.ajax({
        type: "POST",
        //url: "../Json/Internaciones/IntSSC.asmx/Lista_Servicios_A",
        url: "../Json/Internaciones/IntSSC.asmx/Servicio_Lista_A_At_Internados",        
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
        if ($("#Serv" + nServicioId).html() != undefined)
            var n = $("#Serv" + nServicioId).html().substring(0,15) + "...";
        $("#lblServicio_c").html(n);
        $("#enc_serv").html("Servicio: " + n);
        $("#enc_serv").attr("title",$("#Serv" + nServicioId).html());
    }
}

function Servicio(Id) {
    Vl('pSala');
    $("#TablaCama").empty();
    nServicio = $("#Serv"+Id).html();
    $("#lblServicio_c").html(nServicio);
    nServicioId = Id;
    CargarSalas(Id);
}

CargarServicios();

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function EstaInternado() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Internacion_Pac_byDoc",
        data: '{Documento: "' +  $("#afiliadoId").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_PacienteInt_byDocumento_Cargado,
        error: errores
    });
}

function Cargar_PacienteInt_byDocumento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null) {
        $("#desdeaqui").hide();
        alert('Paciente Internado');
        $("#btnOtroPaciente").show();
    }
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
     var n = $("#Sal" + nSalaId).html().substring(0,15) + "...";
     $("#enc_sala").html("Sala: " + n);
     $("#enc_sala").attr("title",$("#Sal" + nSalaId).html());
       //$("#lblSala_c").html($("#Sal" + nSalaId).html());
    }
}

function Sala(SalaId) {
    Vl('pCama');
    nSala = $("#Sal" + SalaId).html();
    $("#lblSala_c").html(" - " + nSala);
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
        var n = $("#Cama" + nCamaId).html().substring(0,15) + "...";
        $("#enc_cama").html("Cama: " + n);
        $("#enc_cama").attr("title",$("#Cama" + nCamaId).html());
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
    $("#lblCama_c").html(" - " + nCama);
    
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
    Cargar_Paciente_NHC_Cambiar($("#txtNHC").val());
});

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".ingreso").val('');
        },
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function Ocupado()
{
    alert("Cama Ocupada");
}

function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

$('#cbo_TipoDOC').change(function () {
    if ($("#txt_dni").val() != "") Cargar_Paciente_Documento($("#txt_dni").val());
});

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
    $.each(Paciente, function (index, paciente) {
        //$("#btnactualizar").show();
        $("#btnCancelarPedidoTurno").show();


        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
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

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoNHC").html($("#txtNHC").val());
        $("#lblNHC").html(paciente.documento);

            $("#txt_dni").val(paciente.documento_real);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#afiliadoId").val(paciente.documento);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);



        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());

        //alert(paciente.Foto);
        if(paciente.Foto == "0"){
        $('#fotopaciente').attr('src', "../img/silueta.jpg");
        $('#ImgPacienteMini').attr('src', "../img/silueta.jpg"); 
        }else{
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $('#ImgPacienteMini').attr('src', '../fotoPerfil/' + paciente.Foto);        
        }     

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

        $("#lblFecha").val($("#txtFechaInternacion").val());
        $("#lblHora").val($("#txtHoraInternacion").val());

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }
        EstaInternado();
         UltimoAporte_OK(); //Verifica aportes en Padron UOM.
    });
    }
      else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}

function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
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
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
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
        //$("#btnactualizar").show();
        $("#btnCancelarPedidoTurno").show();

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        $("#lblNombre").html(paciente.Paciente);
        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#txtTelefono").attr('value', paciente.Telefono);



        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



        if ($("#txtTelefono").val().length < 5) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
            PError = true;
        }
        if (paciente.Nro_Seccional == "999") {
            $("#controlSeccional").addClass("error");
            PError = true;
        }

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        if(paciente.Foto == "0"){
        $('#fotopaciente').attr('src', "../img/silueta.jpg");
        $('#ImgPacienteMini').attr('src', "../img/silueta.jpg"); 
        }else{
                $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.documento + '.jpg');
        $('#ImgPacienteMini').attr('src', '../fotoPerfil/' + paciente.documento + '.jpg');        
        }

        $("#txtPaciente").focus();

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }

        if (EditantoId == 0) {
            EstaInternado();
             UltimoAporte_OK(); //Verifica aportes en Padron UOM.
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
        $("#btnDatosAcom").show();
        $("#btnVerMov").show();
        
        $("#btnNutricion").show();//////////////////////////////////////////////////MANUEL
    }
}

$("#btnVerMov").click(function () {
    var Pagina = "../Impresiones/Impresion_Internacion_Movimientos.aspx?Id=" + EditantoId + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox({
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '78%',
		    'height': '78%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
    });
});

$("#btnModificar").click(function () {
    $('#InternacionModal').modal('show');
    $(".hora").attr("disabled",true);
});

function Cargar_Especialidades(Todos, Id, SoloTurnos) { //SoloTurnos, si es falso, muestro solo las esp. de turnos.
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

function Validar()
{
    if ($("#lblFecha").val().trim().length == 0 || $("#lblHora").val().trim().length == 0) {alert("Ingrese Fecha y Hora."); $('#InternacionModal').modal('show'); return false;}
    if ($("#txtDiagnostico").val().trim().length == 0) {alert("Ingrese Diagnóstico."); return false;}
    if ($('#cbo_Especialidad :selected').val() == 0) { alert("Ingrese Especialidad"); return false; }
    if ($('#cbo_Medico :selected').val() == 0) { alert("Ingrese Médico.");  return false; }
    if ($("#txtDireccionAcompa").val().trim().length == 0) {alert("Ingrese Dirección del acompañante."); return false;}
    if ($("#txtFelefono").val().trim().length < 6) {alert("Ingrese Teléfono del acompañante (mínimo 6 digitos)."); return false;}
    return true;
}

$('#btnGuardarInternacion').click(function () {
    if(!Validar()) return false;


        if(guardando == 0){
    if (confirm("¿Desea confirmar la internación?")){
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
                "Medico": $('#cbo_Medico option:selected').val(),
                "AfiliadoId": $("#afiliadoId").val(),
                "Movimiento": Movimiento,
                "Direccion_Acompa": $("#txtDireccionAcompa").val().trim().toUpperCase() 
            });

            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/Internacion_Guardar",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Internacion_Guardada,
                complete: function(){ guardando = 0; },
                error: errores
            });
            
           }
        }else{alert("NO SEA IMPACIENTE Y ESPERE A QUE SE COMPLETE EL PROCESO DE INTERNACIÓN!.");}
   
});

function Internacion_Guardada(Resultado) {
    $("#InternacionModal").modal('hide');
    ImpresionIngreso(Resultado.d);
}


$("#btnDatosAcom").click(function () {
    var Pagina = "DatosAcompa.aspx?Id=" + EditantoId;
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
		    'onComplete': function f() {
		        jQuery.fancybox.showActivity();
		        jQuery('#fancybox-frame').load(function () {
		            jQuery.fancybox.hideActivity();
		        });
		    }
		});
});


function ImpresionIngreso(Id) {
    var Pagina = "../Impresiones/Impresion_Ingreso.aspx?Id=" + Id + "&Movimiento=" + Movimiento + " ";
    Pagina = Pagina.slice(0, -1);
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
            //'showCloseButton': false,
            'onComplete': function f() {
                jQuery.fancybox.showActivity();
                jQuery('#fancybox-frame').load(function () {
                    jQuery.fancybox.hideActivity();
                });
            },
            'onClosed': function () {
		        self.location = 'Internaciones.aspx';
		    }
		});
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
        url: "../Json/Internaciones/IntSSC.asmx/Cargar_Internacion_Id",
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
    CargarPacienteID(i.AfiliadoId);
    $("#lblFecha").val(i.dia);
    $("#lblHora").val(i.hora);
    $("#txtFechaInternacion").val(i.dia);
    $("#txtHoraInternacion").val(i.hora);
    $("#txtDireccionAcompa").val(i.direccion_acompa);
    $("#NroInternacion").html(EditantoId);
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

function InitControls(){
    ListTipoDoc();
    $('#tabs').tab();
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#lblHora").mask("99:99", { placeholder: "-" });
    $("#lblFecha").val(FechaActual());
    $("#lblHora").val(HoraActual());
    $("#lblFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaInternacion").mask("99/99/9999", { placeholder: "-" });
    $("#txtHoraInternacion").mask("99:99", { placeholder: "-" });
    $("#li_preImpresos").hide();
}


$(document).ready(function () {
    InitControls();
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        PCargado = 1;
        Cargar_Paciente_NHC(GET["NHC"]);        
    }

    if (GET["ID_Int"] != "" && GET["ID_Int"] != null) {
        EditantoId = GET["ID_Int"];
        Cargar_Internacion(GET["ID_Int"]);
        $("#div_radios").hide();
        //$("#li_preImpresos").show();
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        ID = GET["ID"];
        $("#afiliadoId").val(ID);
        CargarPacienteID(ID);
        $("#CargadoFecha").html(FechaActual());
    }

    if (GET["B"] != "" && GET["B"] != null) {
        parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > Buscar Internados > <strong>Ingresos</strong>";
    }
    else parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > <strong>Ingresos</strong>";
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

$('#btnactualizar').click(function () {
        Actualizar_Telefono_Seccional($('#txtTelefono').val(), $('#cboSeccional option:selected').val(), $('#afiliadoId').val());
});

function Actualizar_Telefono_Seccional(Telefono, Seccional, Documento) {
    Cod_OS = $("#cbo_ObraSocial :selected").val();
    if (Cod_OS == undefined) { Cod_OS = 112103 }

    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/Actualizar_Telefono_Seccional",
        data: '{Telefono: "' + Telefono + '", Seccional: "' + Seccional + '", Documento: "' + Documento + '", CodOs: "' + Cod_OS + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Actualizado_Telefono_Documento,
        error: errores
    });
}


function Actualizado_Telefono_Documento(Resultado) {
    if (Resultado.d == '1') {
        $("#desdeaqui").show();
        $("#controlTelefono").removeClass("error");
        $("#controlSeccional").removeClass("error");
        $("#CargadoTelefono").html($("#txtTelefono").val());
        if ($("#Cod_OS").val() == "112103")
        {
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        }
        else
        {
        $("#CargadoSeccional").html($("#cbo_ObraSocial :selected").text());
        }
    }
    else {


        if ($("#txtTelefono").val().length < 6) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
        }
        else {
            $("#controlTelefono").removeClass("error");
        }

        if ($("#cboSeccional :selected").val() == "999") {
            $("#controlSeccional").addClass("error");
        }
        else {
            $("#controlSeccional").removeClass("error");
        }

    }

}

        $('#desdeaqui').click(function () {
      
        var json = JSON.stringify({"afiliadoId": $("#afiliadoId").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Gente.asmx/VerificarVencimientoReciboSueldo",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(Resultado){
            alert(Resultado.d);
            if(Resultado.d <= 0){ alert("Revise fecha de vencimiento del último recibo de sueldo");  } else{avanzar();}           
            },
            error: errores
        });

        });


        function avanzar(){
        
                    if($("#desdeaqui_nombre").html() == "Cambiar Sala/Cama") {
            Movimiento = 1; 
            $(".hora").attr("disabled",true);
            parent.document.getElementById("DondeEstoy").innerHTML = "Admisión > Buscar Internados > <strong>Cambiar Sala/Cama</strong>";
            } //Movimiento
            else Movimiento = 0;
            if (EditantoId == 0) {FechaYHora();}
                $("#hastaaqui").fadeIn(1500);
                $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
                $('#Cerrar').show();
        }



$("#btnAceptarPre").click(function () {
var url = "";
    switch ($("#cbo_PreImp :selected").val()){
        case "0": ImprimirTodos(); //Se imprimen todos los pre-impresos... 
        break;
        case "1": url= "../Impresiones/Internacion_FichaAdmision.aspx?Id=" +  EditantoId;
        Ventana(url);
        break;
        case "2": url= "../Impresiones/Internacion_ConsentimientoGral.aspx";
        Ventana(url);
        break;
        case "3": url= "../Impresiones/ImpresionInternacionInfHospitalizacion.aspx?Id=" + EditantoId;
        Ventana(url);
        break;
    }
});

function ImprimirTodos() {
    ImprimirFichaAdmision();
}

function ImprimirFichaAdmision(){
         $.fancybox(
            {
                'autoDimensions': false,
                'href': "../Impresiones/Internacion_FichaAdmision.aspx?Id=" +  EditantoId,
                'width': '75%',
                'height': '75%',
                'autoScale': false,
                'transitionIn': 'none',
                'transitionOut': 'none',
                'type': 'iframe',
                'onClosed': function () {
                    setTimeout(function(){
                        ImprimirConsentimiento();
                    },1000);
                },
                'hideOnOverlayClick': false,
                'enableEscapeButton': false
            });
}

function ImprimirConsentimiento(){
    $.fancybox(
            {
                'autoDimensions': false,
                'href': "../Impresiones/Internacion_ConsentimientoGral.aspx",
                'width': '75%',
                'height': '75%',
                'autoScale': false,
                'transitionIn': 'none',
                'transitionOut': 'none',
                'type': 'iframe',
                'onClosed': function () {
                      setTimeout(function(){
                       ImprimirInformeHospitalizacion();
                    },1000);
                },
                'hideOnOverlayClick': false,
                'enableEscapeButton': false
            });
}

function ImprimirInformeHospitalizacion() {
     $.fancybox(
            {
                'autoDimensions': false,
                'href': "../Impresiones/ImpresionInternacionInfHospitalizacion.aspx?Id=" + EditantoId,
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

$("#btnEliminarInternacion").click(function () {
if (confirm("¿Desea dar de baja la internación?")){
        var json = JSON.stringify({"Id": EditantoId });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Internacion_Baja",
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

////////////////////MANUEL////////////////////////////////

$("#btnNutricion").click( function () {
 document.location = "Nutricion.aspx?ID_Int=" + EditantoId;
});


   $(".firmar").click(function () { 
   var tipo = $(this).attr('id');
           $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/traerUsuario",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llamar,
            error: errores
        });

        function llamar(Resultado){
        window.open("consentimientoFirma.aspx?afiliadoId=" + $("#afiliadoId").val() + "&tipo=" + tipo + "&UsuarioId=" + Resultado.d + "&nombreArchivo= " + "&cual= ", "_blank"); 
        }
   });


   //PARA LLAMAR CON F4 EN LA TURNERA
   $(function () {
    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 115) {
            //if (parent.Nro_Box == -1) {
            //    alert("Usted no tiene box asignado ingrese el número de Box");
            //    parent.AsignarBox();
            //    return;
            //}

            $.ajax({
                type: "POST",
                url: "../Json/Turnera/TurneraBonos.asmx/Turnera_Turno_Llamar_Bonos_Internacion",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: PacienteLlamado,
                error: errores
            });

        }
    });
});


 function PacienteLlamado(Respuesta) {
    Datos = Respuesta.d;
    if (Respuesta.d && Datos.paciente != null) {
        alert(Datos.paciente);
    }
    else
        alert("No hay pacientes para llamar");
}