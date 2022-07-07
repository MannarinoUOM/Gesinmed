var objEspecialidad = new Array();
var objEspecialidades = new Array();
var objBusquedaLista = "";
var Total = -1;
var i = 0;
var Editando = 0;
var EditandoPos = 0;
var MedicoId = 0;
var total_esp = 0;
var Usuario_Generado = "";
var Baja;
var TLC = 0;


function Cargar_Localidades(Estado) {
    var json = JSON.stringify({ "Estado": Estado });
    $.ajax({
        type: "POST",
        data:json,
        url: "../Json/Localidades.asmx/Localidades_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Localidades_Cargadas,
        error: errores
    });
}

function Existe(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objEspecialidades[i].EspecialidadId == Algo && objEspecialidades[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado la Especialidad " + $("#cbo_Especialidad :selected").text());
            LimpiarBotones();
            return true;
        }
    }
    return false;
}

$("#cbo_Todos_Especialidades").click(function () {
    if ($(this).is(":checked")) {
        $(".checks").attr("checked", true);
        //$(".checks").attr("disabled", true);
        $("#chk_Ninguno").removeAttr("checked");
    }
    else {
        $(".checks").removeAttr("checked");
        $(".checks").removeAttr("disabled");
    }
});



$("#chk_Ninguno").click(function () {
    if ($(this).is(":checked")) {
        $(".checks").removeAttr("checked");
        $(".checks").removeAttr("disabled");
        $("#cbo_Todos_Especialidades").removeAttr("checked");
    }
});

function Set() {
    $("#cbo_Todos_Especialidades").removeAttr("checked");
    $("#chk_Ninguno").removeAttr("checked");
}

function Verificar_Baja_by_Esp(Id, Esp) {
    var json = JSON.stringify({ "MedicoId": Id, "Especialidad": Esp });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Verificar_si_existen_turnos_byEsp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d) alert("La Especialidad no puede ser dada de baja, ya que el médico posee turnos otorgados para la misma.");
            else Eliminar(EditandoPos); //Se puede dar de baja
        },
        error: errores
    });
}

$("#btnQuitar").click(function () {
    Verificar_Baja_by_Esp(MedicoId, $("#cbo_Especialidad :selected").val());
});


function Eliminar(Nro) {
    objEspecialidades[Nro].Estado = 0;
    objEspecialidad.IsActive = false;
    RenderizarTabla();
    objEspecialidades = $.grep(objEspecialidades, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    Editando = 0;
    EditandoPos = -1;
    LimpiarBotones();
    $("#btnAgregar").html("<i class='icon-ok'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-arrow-left'></i> Cancelar");
    LimpiarBotones();
}

$("#btnGrabarMedico").click(function () {
    Medicos_Guardar();
});

function Mensajes() {
    var msj = "";
    if ($("#txtMedico").val().trim().length == 0) msj = msj + "Ingrese nombre del médico\n";
    if ($("#txtDNI").val().trim().length < 6) msj = msj + "Ingrese DNI del médico\n";
    if ($("#txtCUIT").val().trim().length < 11) msj = msj + "Ingrese CUIT del médico\n";
    if ($("#txtCalle").val().trim().length == 0) msj = msj + "Ingrese domicilio del médico\n";
    if ($("#txtNumero").val().trim().length == 0) msj = msj + "Ingrese número de domicilio del médico\n";
    if (objEspecialidades.length == 0) msj = msj + "Ingrese al menos una especialidad al médico\n";
    if (msj.trim().length > 0) alert(msj);
}


$("#Cerrar").click(function () {
    LimpiarCampos();
});


$("#btnAgregar").click(function () {


    if (!Existe($("#cbo_Especialidad :selected").val()) && $("#cbo_Especialidad :selected").val() != "") {


        var Codigo = $("#cbo_Especialidad :selected").val();
        var Especialidad = $("#cbo_Especialidad :selected").text();
        var EsGuardia = $('#btnG').hasClass('active');
        var EsAmbulatorio = $('#btnA').hasClass('active');
        var EsQuirofano = $('#btnQ').hasClass('active');
        var EsInternacion = $('#btnI').hasClass('active');

        if (EsGuardia || EsAmbulatorio || EsQuirofano || EsInternacion) {
            var MN = $('#txt_MN').val();
            var MP = $('#txt_MP').val();
            var Estado = 1;
            var Tipo = "";

            if (EsGuardia) { Tipo = "Guardia, "; }
            if (EsAmbulatorio) { Tipo = Tipo + "Consultorio, "; }
            if (EsQuirofano) { Tipo = Tipo + "Quirofano, "; }
            if (EsInternacion) { Tipo = Tipo + "Internacion"; }

            var Cual = Total;
            if (Editando == 1) {
                Cual = EditandoPos;
            }
            else {
                Total = Total + 1;
                Cual = Total;
            }

            var objEspecialidad = {};
            objEspecialidad.EspecialidadId = Codigo;
            objEspecialidad.Especialidad = Especialidad;
            objEspecialidad.Tipo_Guardia = EsGuardia;
            objEspecialidad.Tipo_Ambulatorio = EsAmbulatorio;
            objEspecialidad.Tipo_Quirofano = EsQuirofano;
            objEspecialidad.Tipo_Internacion = EsInternacion;
            objEspecialidad.MN = MN;
            objEspecialidad.MP = MP;
            objEspecialidad.Estado = Estado;
            objEspecialidad.IsActive = true;
            objEspecialidad.Tipo = Tipo;



            if (Editando == 1) {
                objEspecialidad.CHK_ESP_SHOW = objEspecialidades[Cual].CHK_ESP_SHOW;
                objEspecialidad.ESP_CHK = objEspecialidades[Cual].ESP_CHK;
                //editando
                //alert(objEspecialidad.CHK_ESP_SHOW + "//" + objEspecialidad.ESP_CHK);
            } else {

                if ($("#cbo_Especialidad :selected").data('teleconsulta') == "1") {
                    //alert($("#cbo_Especialidad :selected").data('teleconsulta'));
                    objEspecialidad.CHK_ESP_SHOW = 1;
                    objEspecialidad.ESP_CHK = 0;
                } else {
                    //alert("else");
                    objEspecialidad.CHK_ESP_SHOW = 0;
                    objEspecialidad.ESP_CHK = 0;
                }
            }

            objEspecialidades[Cual] = objEspecialidad;

            $("#btnAgregar").html("<i class='icon-ok'></i> Agregar");
            $("#btnCancelar").html("<i class='icon-arrow-left'></i> Cancelar");

            RenderizarTabla();
            Editando = 0;
            EditandoPos = -1;
            LimpiarBotones();
        }
        else { alert("Seleccione Consultorio, Internacion, Guardia o Quirófano."); return false; }
    }
});







function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed'><thead><tr><th>Mat. Nac.</th><th>Mat. Prov.</th><th>Especialidad</th><th>Tipo</th><th>Teleconsulta</th></tr></thead><tbody>";
    var Contenido = "";
    var chk = "";
    for (var i = 0; i <= Total; i++) {
        if (objEspecialidades[i].Estado == 1) {
            if (objEspecialidades[i].CHK_ESP_SHOW == 1) { chk = "<input class='chkTeleConsulta' type='checkbox' id='chk" + i + "' data-indice='" + i + "' />"; } 
            if (objEspecialidades[i].ESP_CHK == 1) { chk = "<input class='chkTeleConsulta' type='checkbox' checked='checked' id='chk" + i + "'  data-indice='" + i + "' />"; }

          
            Contenido = Contenido + "<tr id='Editar" + i + "' rel='tooltip' title='Editar Especialidad'><td onclick='Editar(" + i + ");'> " + objEspecialidades[i].MN + " </td>" +
            "<td onclick='Editar(" + i + ");'> " + objEspecialidades[i].MP + " </td>" +
            "<td onclick='Editar(" + i + ");'> " + objEspecialidades[i].Especialidad + " </td>" +
            "<td onclick='Editar(" + i + ");'> " + objEspecialidades[i].Tipo + " </td>" +
            "<td > " + chk + " </td>" +
            "<td style='display:none' id='CHK_ESP_SHOW" + i + "'> " + objEspecialidades[i].CHK_ESP_SHOW + " </td>" +
            "<td style='display:none' id='ESP_CHK" + i + "'> " + objEspecialidades[i].ESP_CHK + " </td>" +
            "</tr>";
            chk = "";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaEspecialidades").html(Encabezado + Contenido + Pie);
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}





function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;

    $('#btnG').removeClass('active');
    $('#btnA').removeClass('active');
    $('#btnQ').removeClass('active');
    $('#btnI').removeClass('active');

    if (objEspecialidades[Nro].Tipo_Guardia) { $('#btnG').addClass('active'); }
    if (objEspecialidades[Nro].Tipo_Ambulatorio) { $('#btnA').addClass('active'); }
    if (objEspecialidades[Nro].Tipo_Quirofano) { $('#btnQ').addClass('active'); }
    if (objEspecialidades[Nro].Tipo_Internacion) { $('#btnI').addClass('active'); }

    $('#cbo_Especialidad').attr("disabled", true);
    $('#cbo_Especialidad option').attr('selected', false);

    $("#cbo_Especialidad option[value=" + objEspecialidades[Nro].EspecialidadId + "]").attr("selected", true);
    $("#txt_MN").val(objEspecialidades[Nro].MN);
    $("#txt_MP").val(objEspecialidades[Nro].MP);

    $("#btnQuitar").css('display', 'inline-block');
    $("#btnAgregar").html("<i class='icon-edit'></i> Modificar");
    $("#btnCancelar").html("<i class='icon-arrow-left'></i> Cancelar");

}





function Localidades_Cargadas(Resultado) {
    var Localidades = Resultado.d;
    $('#cbo_Localidad').empty();
    $.each(Localidades, function (index, localidades) {
        if (localidades.id != "0") $('#cbo_Localidad').append($('<option></option>').val(localidades.id).html(localidades.localidad));
        else $('#cbo_Localidad').append($('<option></option>').val("0").html("Localidad..."));
    });
}

Cargar_Localidades(0);

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

Cargar_Especialidades(false, 0, false);

function Especialidad_Cargadas(Resultado) {

    var Especialidad = Resultado.d;
    $('#Especialidad1').empty();
    $('#Especialidad2').empty();

    total_esp = Especialidad.length;
    var mitad1 = Math.ceil(total_esp / 2);
    var i = 0;

    $('#cbo_Especialidad').append(
              $('<option></option>').val("").html("Especialidad...")
            );

    for (i = 0; i < mitad1; i++) {
        $('#Especialidad1').append('<label class="checkbox"><input class="checks" checked disabled onclick=Set() id="CBE' + i + '" type="checkbox" value="' + Especialidad[i].Id + '">' + Especialidad[i].Especialidad + '</label>');

        $('#cbo_Especialidad').append(
              $('<option data-teleconsulta=' + Especialidad[i].teleconsulta + '></option>').val(Especialidad[i].Id).html(Especialidad[i].Especialidad)
            );
    }

    for (i = mitad1; i <= (total_esp - 1); i++) {
        $('#Especialidad2').append('<label class="checkbox"><input class="checks" checked disabled onclick=Set() id="CBE' + i + '" type="checkbox" value="' + Especialidad[i].Id + '">' + Especialidad[i].Especialidad + '</label>');
        $('#cbo_Especialidad').append(
              $('<option></option>').val(Especialidad[i].Id).html(Especialidad[i].Especialidad)
            );
    }

}


$(document).ready(function () {


    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $("#txtMedico").mask("a?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", { placeholder: "" });
    $("#txtCalle").mask("a?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", { placeholder: "" });
    $("#txtProvincia").mask("a?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", { placeholder: "" });
    $("#txtCP").mask("*?*******", { placeholder: "" });
    $("#txtNumero").mask("9?9999999", { placeholder: "" });

    $("#txtDNI").mask("999999?99", { placeholder: "" });
    $("#txtSobreturnos").mask("9?9", { placeholder: "" });
    $("#txtUrgenciaCant").mask("9?9", { placeholder: "" });
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaNacimiento").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaBaja").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaNacimiento").datepicker();
    $("#txtFechaBaja").datepicker();
    $("#txt_fechacoordinar").datepicker({ minDate: 0 });


    $("#btnTLC").toggle(
	    function () {
	        $(this).addClass("btn-danger");
	        TLC = 1;
	    },
	    function () {
	        $(this).removeClass("btn-danger");
	        TLC = 0;
	    }
        );

});



$("#btnBuscarMedico").click(function () {
    objBusquedaLista = "";
    for (var j = 0; j < total_esp; j++) {

        if ($('input[id=CBE' + j + ']').is(':checked')) {
            objBusquedaLista = objBusquedaLista + $('input[id=CBE' + j + ']:checked').val() + ",";
        }

    }
    if (objBusquedaLista.length > 0) Buscar_Medicos();
    else alert("Seleccione Especialidad");
});


$("#btnCancelar").click(function () {
    Editando = 0;
    EditandoPos = -1;
    LimpiarBotones();
    $("#btnAgregar").html("<i class='icon-ok'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-arrow-left'></i> Cancelar");
});

$("#btnNuevo").click(function () {
    LimpiarBotones();

});

$("#btnNuevo1").click(function () {
    LimpiarBotones();
    $("#btnDiadeAtencion").hide();
    $("#btnDiadeNoAtencion").hide();
});


$("#btnA").click(function () {
    if (($(this).hasClass("active")) && MedicoId > 0 && $("#cbo_Especialidad :selected").val() != "") Verificar_Baja_by_Esp1(MedicoId, $("#cbo_Especialidad :selected").val());
});

function Verificar_Baja_by_Esp1(Id, Esp) {
    var json = JSON.stringify({ "MedicoId": Id, "Especialidad": Esp });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Verificar_si_existen_turnos_byEsp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d) { $("#btnA").addClass("active"); alert("La Especialidad no puede ser modificada, ya que el médico posee turnos otorgados para la misma."); }
        },
        error: errores
    });
}


function LimpiarBotones() {
    $("#txt_MN").val('');
    $("#txt_MP").val('');
    $("#btnQuitar").css('display', 'none');
    $('#btnG').removeClass('active');
    $('#btnA').removeClass('active');
    $('#btnQ').removeClass('active');
    $('#btnI').removeClass('active');
    $("#cbo_Especialidad").removeAttr("disabled");
}

function LimpiarCampos() {
    MedicoId = 0;
    objEspecialidad.length = 0;
    objEspecialidades.length = 0;
    $("#txt_MN").val('');
    $("#txt_MP").val('');
    $("#btnQuitar").css('display', 'none');
    $('#btnG').removeClass('active');
    $('#btnA').removeClass('active');
    $('#btnQ').removeClass('active');
    $('#btnI').removeClass('active');
    $("#txtUrgenciaCant").val('0');
    $("#txtMedico").val('');
    $("#lblNombre").html('');
    $('#cbo_Sexo option').attr('selected', false);
    $("#cbo_Sexo option[value=0]").attr("selected", true);
    $("#txtDNI").val('');
    $("#lblDni").html('');
    $("#txtCUIT").val('');
    $("#btnRendicion").removeClass('active');
    $("#btnHonorario").removeClass('active');
    $("#txtSobreturnos").val('99');
    $("#txtCalle").val('');
    $("#txtNumero").val('');
    $("#txtPiso").val('');
    $("#txtDpto").val('');
    $("#txtProvincia").val('');
    $('#cbo_Localidad option').attr('selected', false);
    $("#cbo_Localidad option[value=0]").attr("selected", true);
    $("#txtCP").val('');
    $("#txtTelefono").val('');
    $("#txtEmail").val('');
    $("#txtObservaciones").val('');
    $("#txtFechaBaja").val('');
    $("#txtMotivo").val('');
    $("#txtFechaNacimiento").val('');

    $("#btnAgregar").html("<i class='icon-ok'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-arrow-left'></i> Cancelar");

    $("#txt_MN").val('');
    $("#txt_MP").val('');
    $("#btnQuitar").css('display', 'none');
    $('#btnG').removeClass('active');
    $('#btnA').removeClass('active');
    $('#btnQ').removeClass('active');
    $('#btnI').removeClass('active');
    $("#btnEnTurnos").attr("checked", true);
    $("#txtFechaBaja").removeAttr("disabled"); $("#lgn_bloqueado").hide();
    $('#cbo_Especialidad').removeAttr("disabled");
    Total = -1;

    var Encabezado = "<table class='table table-hover table-condensed'><thead><tr><th>Mat. Nac.</th><th>Mat. Prov.</th><th>Especialidad</th><th>Tipo</th></tr></thead><tbody>";
    var Contenido = "";
    var Pie = "</tbody></table>";
    $("#TablaEspecialidades").html(Encabezado + Contenido + Pie);




}


function Buscar_Medicos() {

    var json = JSON.stringify({ "Apellido": $('#txtNombre').val(), "MN": $('#txtMN').val(), "MP": $('#txtMP').val(), "objBusquedaLista": objBusquedaLista });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_Encontrados,
        error: errores,
        beforeSend: antes,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#TablaMedicos").show();
}

function antes() {
    $("#cargando").show();
    $("#TablaMedicos").hide();
}


function Medicos_Detalles(Id) {

    Total = -1;

    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar_Info_Con_Baja",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_Detalles_Cargar,
        error: errores
    });

    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicosEspecialidades",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_Especialidades_Cargar,
        error: errores
    });

    Verificar_Baja(Id); //Veo si puedo dar de baja al medico.
}

function Medicos_Detalles_Cargar(Resultado) {
    Encontrados = Resultado.d;

    if (Encontrados.Teleconsulta == 1) { TLC = 1; $("#btnTLC").addClass("btn-danger"); } else { TLC = 0; $("#btnTLC").removeClass("btn-danger"); }

    $("#txtMedico").val(Encontrados.Medico.toUpperCase().trim());
    $("#lblNombre").html(Encontrados.Medico);
    $('#cbo_Sexo option').attr('selected', false);
    $("#cbo_Sexo option[value=" + Encontrados.Sexo + "]").attr("selected", true);
    $("#txtDNI").val(Encontrados.Documento);
    $("#lblDni").html(Encontrados.Documento);
    $("#txtCUIT").val(Encontrados.CUIT);
    $("#btnRendicion").addClass(Encontrados.AplicaRetenciones);
    $("#btnHonorario").addClass(Encontrados.RindeHonorario);
    $("#txtSobreturnos").val(Encontrados.Max_Sobreturno);
    $("#txtCalle").val(Encontrados.Calle);
    $("#txtNumero").val(Encontrados.Nro);
    $("#txtPiso").val(Encontrados.Piso);
    $("#txtDpto").val(Encontrados.Dpto);
    $("#txtProvincia").val(Encontrados.Provincia);
    $('#cbo_Localidad option').attr('selected', false);
    $("#cbo_Localidad option[value=" + Encontrados.Localidad + "]").attr("selected", true);
    $("#txtCP").val(Encontrados.CodPos);
    $("#txtTelefono").val(Encontrados.Telefono);
    $("#txtEmail").val(Encontrados.EMail);
    $("#txtObservaciones").val(Encontrados.Observaciones);
    $("#txtUrgenciaCant").val(Encontrados.CantUrgencia);
    if (Encontrados.FechaBaja != null) $("#lgn_baja").show();
    else $("#lgn_baja").hide();
    $("#txtFechaBaja").val(Encontrados.FechaBaja);
    
    $("#txtMotivo").val(Encontrados.MotivoBaja);
    if (Encontrados.MostrarenTurnos == "active")
        $("#btnEnTurnos").attr("checked", true);
    else
     $("#btnEnTurnos").removeAttr("checked");
    //$("#btnEnTurnos").addClass(Encontrados.MostrarenTurnos);
    $('#FotoMedico').attr('src', '../img/medicos/' + MedicoId + '.jpg');
    $("#txtFechaNacimiento").val(Encontrados.Fecha_Nacimiento);
}


$('#FotoMedico').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function Medicos_Especialidades_Cargar(Resultado) {
    Encontrados = Resultado.d;
    Total = -1;


    $.each(Encontrados, function (index, especialidad) {
        Total = Total + 1;

        var objEspecialidad = {};
        objEspecialidad.EspecialidadId = especialidad.EspecialidadId;
        objEspecialidad.Especialidad = especialidad.Especialidad;
        objEspecialidad.Tipo_Guardia = especialidad.Tipo_Guardia;
        objEspecialidad.Tipo_Ambulatorio = especialidad.Tipo_Ambulatorio;
        objEspecialidad.Tipo_Quirofano = especialidad.Tipo_Quirofano;
        objEspecialidad.Tipo_Internacion = especialidad.Tipo_Internacion;
        objEspecialidad.MN = especialidad.MN;
        objEspecialidad.MP = especialidad.MP;
        objEspecialidad.Estado = 1;
        objEspecialidad.IsActive = true;
        objEspecialidad.CHK_ESP_SHOW = especialidad.CHK_ESP_SHOW;
        objEspecialidad.ESP_CHK = especialidad.ESP_CHK;
        //alert(especialidad.EspecialidadId);

        var EsGuardia = "";
        var EsAmbulatorio = "";
        var EsQuirofano = "";
        var EsInternacion = "";
        var Tipo = "";

        if (especialidad.Tipo_Guardia) { Tipo = "Guardia, "; }
        if (especialidad.Tipo_Ambulatorio) { Tipo = Tipo + "Consultorio, "; }
        if (especialidad.Tipo_Quirofano) { Tipo = Tipo + "Quirófano, "; }
        if (especialidad.Tipo_Internacion) { Tipo = Tipo + "Internación"; }

        objEspecialidad.Tipo = Tipo;
        objEspecialidades[Total] = objEspecialidad;

        //alert(Total);

    });

    Editando = 0;
    EditandoPos = -1;
    RenderizarTabla();

}

function isDate(y, m, d) {
    var date = new Date(y, m - 1, d);

    var dd = date.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    var yyyy = date.getFullYear();

    var mm = date.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var convertedDate = yyyy + '' + mm + '' + dd;
    var givenDate = "" + y + '' + m + '' + d;
    return (givenDate == convertedDate);
}

$("#txtNombre").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNombre').attr('readonly') == undefined) {
            Buscar_Medicos();
      }
    }
});

function Verificar_Baja(Id) {
    var json = JSON.stringify({ "MedicoId": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Verificar_si_existen_turnos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d) { $("#txtFechaBaja").attr("disabled", true); $("#lgn_bloqueado").show(); }
            else { $("#txtFechaBaja").removeAttr("disabled"); $("#lgn_bloqueado").hide(); }
        },
        error: errores
    });
}


function Medicos_Guardar() {
    var Con = /[a-zA-Z0-9]{1,50}/;
    var Numero = /^\d*$/;
    var Date = $('#txtFechaNacimiento').val();
    var elem = Date.split('/');
    FNdia = elem[0];
    FNmes = elem[1];
    FNanio = elem[2];
    Date = $('#txtFechaBaja').val();
    elem = Date.split('/');
    FBdia = elem[0];
    FBmes = elem[1];
    FBanio = elem[2];
    if ($("#txtSobreturnos").val().trim().length == 0) { alert("Verifique cantidad de sobreturnos.");return;}
    if ($("#txtMedico").val() != '' && Con.test($("#txtMedico").val()) && $("#txtCalle").val() != '' && Con.test($("#txtCalle").val()) && $("#txtSobreturnos").val() >= 0 != '' && Con.test($("#txtSobreturnos").val())
    && ($("#txtFechaNacimiento").val() == '' || isDate(FNanio, FNmes, FNdia))
    && ($("#txtFechaBaja").val() == '' || isDate(FBanio, FBmes, FBdia))
    && ($("#txtCUIT").val() == '' || Numero.test($("#txtCUIT").val()))
    && ($("#txtDNI").val() == '' || Numero.test($("#txtDNI").val()))
    && objEspecialidades.length > 0
    && $("#txtNumero").val().trim().length > 0) {

    var Id = MedicoId;
    var Apellido = $("#txtMedico").val().trim().toUpperCase();
    var FechaBaja = $("#txtFechaBaja").val();
    var MotivoBaja = $("#txtMotivo").val();
    var Calle = $("#txtCalle").val().trim().toUpperCase();
    var Nro = $("#txtNumero").val();
    var Piso = $("#txtPiso").val().trim().toUpperCase();
    var Depto = $("#txtDpto").val().trim().toUpperCase();
    var CP = $("#txtCP").val();
    var LocalidadId = $("#cbo_Localidad :selected").val();
    var Provincia = $("#txtProvincia").val().trim().toUpperCase();
    var TipoDoc = "";
    var NroDoc = $("#txtDNI").val();
    var FechaNacimiento = $("#txtFechaNacimiento").val();
    var Sexo = $("#cbo_Sexo :selected").val();
    var Telefono = $("#txtTelefono").val();
    var Mail = $("#txtEmail").val();
    var CantMinSobreturno = $("#txtSobreturnos").val();
    var Observaciones = $("#txtObservaciones").val().trim().toUpperCase();
    var IsActive = "A";
    var Cuit = $("#txtCUIT").val();
    var Retencion = $("#btnRendicion").hasClass('active');
    var Honorarios = $("#btnHonorario").hasClass('active');
    var MostrarenTurnos = $("#btnEnTurnos").is(":checked");
    var CantUrgencia = $("#txtUrgenciaCant").val();

    var json = JSON.stringify({ "objEspecialidades": objEspecialidades, "Id": Id, "Apellido": Apellido, "FechaBaja": FechaBaja, "MotivoBaja": MotivoBaja, "Calle": Calle, "Nro": Nro, "Piso": Piso, "Depto": Depto, "CP": CP, "LocalidadId": LocalidadId, "Provincia": Provincia, "TipoDoc": TipoDoc, "NroDoc": NroDoc, "FechaNacimiento": FechaNacimiento, "Sexo": Sexo, "Telefono": Telefono, "Mail": Mail, "CantMinSobreturno": CantMinSobreturno, "Observaciones": Observaciones, "IsActive": IsActive, "Cuit": Cuit, "Retencion": Retencion, "Honorarios": Honorarios, "MostrarenTurnos": MostrarenTurnos, "CantUrgencia": CantUrgencia, "TLC": TLC });


    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Guardar_Medicos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_Guardados,
        error: errores
    });
}
else {

    $("#ControltxtMedico").removeClass("error");
    $("#ControltxtCalle").removeClass("error");
    $("#ControltxtSobreturnos").removeClass("error");
    $("#ControltxtCUIT").removeClass("error");
    $("#ControltxtDNI").removeClass("error");
    $("#ControltxtNumero").removeClass("error");

    if ($("#txtMedico").val() == '' || !Con.test($("#txtMedico").val())) {
        $("#tbDP").click();
        $("#txtMedico").focus();
        $("#ControltxtMedico").addClass("error");
    }

    if ($("#txtCalle").val() == '' || !Con.test($("#txtCalle").val())) {
        $("#txtCalle").focus();
        $("#ControltxtCalle").addClass("error");
        $("#tbDP").click();
    }

    if ($("#txtNumero").val().trim() == '' || $("#txtNumero").val().trim().length == 0) {
        $("#txtNumero").focus();
        $("#ControltxtNumero").addClass("error");
        $("#tbD").click();
    }

    if ($("#txtSobreturnos").val() == '' || !Con.test($("#txtSobreturnos").val())) {
        $("#txtSobreturnos").focus();
        $("#ControltxtSobreturnos").addClass("error");
        $("#tbDP").click();
        alert("Ingrese Numero de Sobreturnos");
    }
    
    if ($("#txtDNI").val() == '' || !Numero.test($("#txtDNI").val())) {
        $("#txtDNI").focus();
        $("#ControltxtDNI").addClass("error");
        $("#tbDP").click();
    }

    if ($("#txtCUIT").val() == '' || !Numero.test($("#txtCUIT").val())) {
        $("#txtCUIT").focus();
        $("#ControltxtCUIT").addClass("error");
        $("#tbDP").click();
    }

    if ($("#txtFechaNacimiento").val() != '' && !isDate(FNanio, FNmes, FNdia)) {
        $("#txtFechaNacimiento").focus();
        $("#ControltxtFechaNacimiento").addClass("error");
        $("#tbDP").click();
    }

    if ($("#txtFechaBaja").val() != '' && !isDate(FNanio, FNmes, FNdia)) {
        $("#txtFechaBaja").focus();
        $("#ControltxtFechaBaja").addClass("error");
        $("#tbB").click();
    }
    //alert("else");
    Mensajes();
}


}

$("#txtCUIT").focus(function () {
    if ($("#cbo_Sexo :selected").val() != '0' && $("#txtDNI").val())
        $("#txtCUIT").val(cuil_cuit($("#cbo_Sexo :selected").val(), $("#txtDNI").val()));
    else $("#txtCUIT").val('');
});

function LimpiarErrores() {
    $("#ControltxtFechaBaja").removeClass("error");
    $("#ControltxtFechaNacimiento").removeClass("error")
    $("#ControltxtCUIT").removeClass("error");
    $("#ControltxtDNI").removeClass("error");
    $("#ControltxtSobreturnos").removeClass("error");
    $("#ControltxtCalle").removeClass("error");
    $("#ControltxtNumero").removeClass("error"); 
    $("#ControltxtMedico").removeClass("error");
}

function Medicos_Guardados(Respuesta) {
    if (Respuesta.d > 0) {
        $("#txtNombre").val($("#txtMedico").val());
        //$("#myModal").modal('hide');
        alert("Médico guardado."); 
        $("#myModal").modal('hide');
        if (MedicoId == 0) {
            MedicoId = Respuesta.d;
            ExisteUsuario();
            //if (!ExisteUsuario(Respuesta.d)) GenerarUsuario(Respuesta.d);
        }
        else {
            if ($("#txtMatriculaFirmaNacional").val().trim().length > 0 ||
            $("#txtMatriculaFirmaProvincial").val().trim().length > 0 ||
            $("#txtNombreFirma").val().trim().length > 0 ||
            $("#sinArchivo").attr("src") != "../img/icono-archivo-png-3.png") {  $("#btnSubir").click(); } else { alert("Médico guardado."); $("#myModal").modal('hide'); }
            
            //alert("Médico guardado.");

//            $("#span_usuario_generado").html("Usuario");
//            $("#span_medicoingresado").html($('#txtNombre').val());

//            document.getElementById('light').style.display = 'block';
//            document.getElementById('light_mensaje').style.display = 'block';
//            document.getElementById('div_coordenar').style.display = 'none';
//            document.getElementById('fade').style.display = 'block';
        }
    }
    if (Respuesta.d == -1) {
        alert("Ya existe un Médico con ese DNI");
    }
}

function ExisteUsuario() { //Verifica si existe el usuario, en caso de existir, cambia el nombre del mismo.
    var str = $("#txtMedico").val().trim().toUpperCase().split(' ');
    var Nombre = "";
    for (j = 0; j < str.length; j++) {
        if (j == 0) Nombre += str[0];
        else Nombre = str[j].substring(0, 1) + Nombre;
    }
    
    var json = JSON.stringify({
        "Nombre": Nombre
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/ExisteUsuario",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Usuario_Generado = Resultado.d;
            GenerarUsuario(MedicoId);
        },
        error: errores
    });
}


function GenerarUsuario(Medico_Id) {
    var usuario = "DR. ";
    if ($("#cbo_Sexo :selected").val() == "2") usuario = "DRA. ";

    var json = JSON.stringify({
        "nombre": usuario + $('#txtMedico').val().trim().toUpperCase() 
        , "Id": 0
        , "tipo": "Usuario"
        , "activo": true
        , "interno": ""
        , "fvencimiento": "31/12/2099"
        , "Clave1": "1234"
        , "Clave2": "1234"
        , "NroPerfil": 57
        , "usuario": Usuario_Generado
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Usuario_Guardar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Relacionar_Usuario_Medico(Medico_Id, Resultado.d);
        },
        error: errores
    });
}

function Relacionar_Usuario_Medico(Medico_Id, UsuarioId) {
    var json = JSON.stringify({
        "Usuario": UsuarioId
        , "Medico": Medico_Id
        , "Estado": false
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Relacion_Usuaro_Medico_Cambiar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            Buscar_Medicos();
            LimpiarCampos();
            //alert("Médico guardado.");
            //alert("Usuario Generado: " + Usuario_Generado + "\n" + "Clave: " + "1234");
            $("#span_usuario_generado").html(Usuario_Generado);
            $("#span_medicoingresado").html($('#txtNombre').val());

            document.getElementById('light').style.display = 'block';
            document.getElementById('light_mensaje').style.display = 'block';
            document.getElementById('div_coordenar').style.display = 'none';
            document.getElementById('fade').style.display = 'block';
        },
        error: errores
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarMedicos(id) {
    $("#medicoId").val(id);
    Traer_Firma($("#medicoId").val());
    MedicoId = id;
    $("#btnDiadeAtencion").show();
    $("#btnDiadeNoAtencion").show();
    Medicos_Detalles(id);
    LimpiarErrores();
    //alert($("#medicoId").val());
    LimpiarFirma();
    $("#myModal").modal({ keyboard: false, backdrop: 'static' });
}



function Medicos_Encontrados(Resultado) {
    Encontrados = Resultado.d;

    $("#Resultado").empty();
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>Apellido y Nombre</th><th>Especialidad</th><th>Estado</th></tr></thead><tbody>";


    $.each(Encontrados, function (index, medico) {
        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarMedicos(" + medico.Id + ");' style='cursor:pointer;'><td>" + medico.Medico + "</td><td>" + medico.Especialidad + "</td><td>" + medico.Estado + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";

    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    //$("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

$('#txtMedico').change(function () {
    $("#lblNombre").html($("#txtMedico").val());
});

$('#txtDNI').change(function () {
    $("#lblDni").html($("#txtDNI").val());
});


$("#btnDiadeAtencion").click(function () {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../Turnos/DiasdeAtencion.aspx?MedicoId=' + MedicoId + '&NombreMedico=' + $("#txtMedico").val(),
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
});



$("#btnDiadeNoAtencion").click(function () {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../Turnos/DiasdeNoAtencion.aspx?MedicoId=' + MedicoId + '&NombreMedico=' + $("#txtMedico").val(),
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
});


$(".chkTeleConsulta").live("click", function () {
    //  objEspecialidades[$(this).data("indice")].CHK_ESP_SHOW = 

    if ($(this).prop('checked')) {
        objEspecialidades[$(this).data("indice")].ESP_CHK = 1;
    } else {
        objEspecialidades[$(this).data("indice")].ESP_CHK = 0;
    }

});