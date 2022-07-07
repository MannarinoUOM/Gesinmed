var Id = 0;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var Total2 = -1;
var Editando_Plantilla = 0;
var ver_grilla = 1;

var sourceArr = [];
var mapped = {};


$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

$("#btnVolver").click(function () {
    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function List_Rubros() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamentos_Rubro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rubros_Cargado,
        error: errores
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function List_Rubros_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Rubro) {
        $("#cbo_Rubros").append($("<option></option>").val(Rubro.Id).html(Rubro.Rubro));
    });

}

function Cargar_Medicamentos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        error: errores
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamento = Resultado.d;
    $.each(Medicamento, function (index, Medicamento) {
        if (Medicamento.Medida != null) {
            var Medida = Medicamento.Medida;
        }
        else {
            var Medida = '';
        }
        $('#cbo_Medicamento').append(
              $('<option></option>').val(Medicamento.REM_ID).html(Medicamento.REM_NOMBRE + ' - ' + Medicamento.REM_GRAMAJE + Medida + ' - ' + Medicamento.Presentacion)
            );
    });

}



$(document).ready(function () {
    $("#frm_Cantidad").validate({
        rules: {
            'cantidad': { required: true, number: true, range: [0, 99] }
        },
        messages: {
            'cantidad': { required: '', number: '', range: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            //RemoveClass();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    ListaMonoDrogras();
    ListTipoDoc();

    var Query = {};
    Query = GetQueryString();
    Id = Query['Id'];
    if (Id > 0) {
        LoadDatos();
        LoadPlantilla_cargada();
        Cargar_Sala_y_Cama();
    }
    else {
        LoadPlantilla();
    }
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

function LoadDatos() {    
    var json = JSON.stringify({ "Id": Id, "Fecha": null, "Baja": false });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Cargada,
        error: errores
    });
}

function Cirugia_Cargada(Resultado) {
    var Cirugias = Resultado.d;
    $.each(Cirugias, function (index, Cirugia) {
        $("#txt_otros").val(Cirugia.OtrosInsumos);
        CargarPacienteID(Cirugia.nhc);
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
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



$("#btnAgregarMedicamento").click(function () { Agregar_en_Grilla(); });

function Agregar_en_Grilla() {
    var valid = $("#frm_Cantidad").valid();
    if (valid) {
        //alert("Hola");

        Codigo = $("#Medicamento_val").html();

        if (Existe(Codigo)) return;
        Nombre = $("#txt_Medicamento").val();
        Cantidad = parseInt($("#cantidad").val());
        Monodroga = $("#cbo_Monodroga :selected").val();
        Observacion = $("#Observacion").val();
        var Estado = 1;
        var Cual = Total;

        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }

        objMedicamento = {};

        objMedicamento.Cantidad = Cantidad;
        objMedicamento.Plantilla = Editando_Plantilla;
        objMedicamento.Observacion = Observacion;
               

        if (Editando == 0) {
            objMedicamento.Insumo_Id = Codigo;
            objMedicamento.Nombre = Nombre;
            objMedicamento.Monodroga = Monodroga;
        }
        else {
            if (Editando_Plantilla == 0) {
                objMedicamento.Insumo_Id = Codigo;
                objMedicamento.Nombre = Nombre;
                objMedicamento.Monodroga = Monodroga;
            }
            else {
                objMedicamento.Insumo_Id = objMedicamentos[Cual].Insumo_Id;
                objMedicamento.Nombre = objMedicamentos[Cual].Nombre;
                objMedicamento.Monodroga = objMedicamentos[Cual].Monodroga;
            }
        }


        objMedicamento.Estado = Estado;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;
        Total2 = Total2 + 1;
        objMedicamentos2[Total2] = objMedicamento;
        //alert(Total);
        $("#cbo_Monodroga").removeAttr('disabled');
        $("#cbo_Medicamento").removeAttr('disabled');
        $("#cbo_Medicamento").val('');
        $("#Observacion").val('');
        $("#cantidad").val('0');
        List_by_Monodroga($("#cbo_Monodroga :selected").val());
    }
}

$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    Editando_Plantilla = 0;
    EditandoPos = -1;
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#cbo_Medicamento").removeAttr('disabled');
    $("#cbo_Medicamento").val('');
    $("#cantidad").val('0');
    $("#cbo_Monodroga").removeAttr('disabled');
    $("#btnAgregarMedicamento").val("Agregar en Grilla");
    $("#btnAgregarMedicamentoPlantilla").val("Agregar en Plantilla");
    LimpiarCampos();
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripción</th><th>Cantidad</th><th>Observación</th></tr></thead><tbody>";
    var Contenido = "";
   // alert('paso');
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td>";
            if (objMedicamentos[i].Plantilla == 0) {
                Contenido = Contenido + "<a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a>";
            }
            else {
                Contenido = Contenido + "<a id='Editar" + i + "' onclick='Editar_Plantilla(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a>";
            }
            Contenido = Contenido + "</td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td>" + objMedicamentos[i].Observacion + "</td></tr>";
        }

    }

    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function Editar(Nro) {
    Editando = 1;
    Editando_Plantilla = 0;
    EditandoPos = Nro;
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $('#cbo_Monodroga').val(objMedicamentos[Nro].Monodroga);
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    $("#Observacion").val(objMedicamentos[Nro].Observacion);    
}

function Editar_Plantilla(Nro) {
    Editando = 1;
    Editando_Plantilla = 1;
    EditandoPos = Nro;
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $('#cbo_Monodroga').val(objMedicamentos[Nro].Monodroga);    
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#cbo_Monodroga").attr("disabled", true);
    $("#cbo_Medicamento").attr("disabled", true);
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    $("#Observacion").val(objMedicamentos[Nro].Observacion);    
}

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    RenderizarTabla();
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
}

function Existe(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objMedicamentos[i].Insumo_Id == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado el Medicamento Nro: " + Algo);
            LimpiarCampos();
            $("#cbo_Medicamento").removeAttr('disabled');
            $("#cbo_Medicamento").val('0');
            $("#cantidad").val('0');
            $("#cbo_Medicamento").focus();
            return true;
        }
    }
    return false;
}

$("#btnImprimir").click(function () {
    Delete_Insumos();
});

function Delete_Insumos() {
        var json = JSON.stringify({ "Id": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/DeleteInsumosQuirurgicosPOS",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Delete_Insumos_Cargado,
            error: errores
        });
}

function Delete_Insumos_Cargado(Resultado){      
     //for (var j = 0; j <= Total2; j++) {
       //for (var j = 0; j <= Total; j++) {
        //if (objMedicamentos2[j].Cantidad > 0) {
        //if (objMedicamentos[j].Cantidad >= 0) {
            //var json = JSON.stringify({ "Id": Id, "IdInsumo": objMedicamentos2[j].Insumo_Id, "Cantidad": objMedicamentos2[j].Cantidad, "Observacion": " ", "Monodroga": objMedicamentos2[j].Monodroga });
            //var json = JSON.stringify({ "Id": Id, "IdInsumo": objMedicamentos[j].Insumo_Id, "Cantidad": objMedicamentos[j].Cantidad, "Observacion": objMedicamentos[j].Observacion, "Monodroga": objMedicamentos[j].Monodroga });            
            var json = JSON.stringify({ "Id": Id, "Insumos": objMedicamentos });            
            $.ajax({
                type: "POST",
                url: "../Json/Quirofano/Quirofano_.asmx/InsertInsumosPosQuirurgicos",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: AgregarOtros,
                error: errores
            });
        //}
       
        //Print();
        //alert("Insumos Cargados Correctamente");
    //}
    
}

function AgregarOtros() {
    var json = JSON.stringify({ "Id": Id, "Otros": $("#txt_otros").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/UpdateCargaInsumosOtros",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Print,
        error: errores
    });
}

function Print() {    
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Insumos_Quirofano_POS.aspx?Id=' + Id,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "Planificar-Cirugia.aspx?Id=" + Id;
            }
        });
}

$("#btnAgregarMedicamentoPlantilla").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid) {
        var InsumoId = $("#Medicamento_val").html();
        var Cantidad = parseInt($("#cantidad").val());
        var Monodroga = $("#cbo_Monodroga :selected").val();
        var json = JSON.stringify({ "Id": Id, "IdInsumo": InsumoId, "Cantidad": Cantidad, "Tipo": Monodroga });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/InsertPreQuirurgicos_Plantilla",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Plantilla_Cargado,
            error: errores
        });        
    }
});

function Plantilla_Cargado(Resultado) {
    Editando_Plantilla = 1;
    Agregar_en_Grilla();
    alert("Insumo Cargado en Plantilla");
}

function LoadPlantilla_cargada() {
    //Aca tengo que hacer que haga un join de la tabla PLANTILLA, entonces muestro todo, si esta en la plantilla y esta en la tabla local de pre-quirurgico
    //muestro con el join, sino no esta solo muestro la plantilla.

    var json = JSON.stringify({ "Planilla": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListInsumosPlantilla_cargada_POS",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPlantilla_Cargado,
        error: errores
    });
}


function LoadPlantilla() {

    //Aca tengo que hacer que haga un join de la tabla PLANTILLA, entonces muestro todo, si esta en la plantilla y esta en la tabla local de pre-quirurgico
    //muestro con el join, sino no esta solo muestro la plantilla.

    var json = JSON.stringify({ "IdRubro": 0, "Plantilla": 1 });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListInsumosPlantilla",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPlantilla_Cargado,
        error: errores
    });
}

function LoadPlantilla_Cargado(Resultado) {
    var Detalles = Resultado.d;
    //var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripción</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {

        if (Detalle.Medida != null) {
            var Medida = Detalle.Medida;
        }
        else {
            var Medida = '';
        }
        if (Detalle.Presentacion != null) {
            var Presentacion = Detalle.Presentacion;
        }
        else {
            var Presentacion = '';
        }

        if (Detalle.REM_GRAMAJE != null) {
            var Gramaje = Detalle.REM_GRAMAJE;
        }
        else {
            var Gramaje = '0';
        }

        Descripcion = Detalle.Descripcion + ' - ' + Gramaje + Medida + ' - ' + Presentacion;

        //Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar_Plantilla(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a></td><td> " + Descripcion + " </td><td> " + Detalle.Cantidad + " </td></tr>";
        objMedicamento = {};
        objMedicamento.Nombre = Descripcion;
        objMedicamento.Cantidad = Detalle.Cantidad;
        objMedicamento.Insumo_Id = Detalle.Id;
        objMedicamento.Monodroga = Detalle.Monodroga;
        objMedicamento.Plantilla = Detalle.Plantilla;
        objMedicamento.Observacion = Detalle.Observacion;
        objMedicamentos[i] = objMedicamento;
        //objMedicamentos2[i] = objMedicamento;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
        //alert(i);
    });
    //var Pie = "</tbody></table>";
    //$("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
    RenderizarTabla();
}

$("#cbo_Rubros").change(function () {
    $("#cbo_Medicamento").empty();
    var json = JSON.stringify({ "Nombre": '', "Rubro": $("#cbo_Rubros").val(), "Presentacion": '' });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Insumos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        error: errores
    });

});


function ListaMonoDrogras() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/MonoDrogas",
        data: '{Numero: "' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var MonoDrogas = Resultado.d;
            $('#cbo_Monodroga').empty();
            $('#cbo_Monodroga').append('<option value="0">Seleccione Monodroga...</option>');
            $.each(MonoDrogas, function (index, mono) {
                $('#cbo_Monodroga').append(
              $('<option></option>').val(mono.numero).html(mono.nombre)
            );
            });
        },
        error: errores
    });
}

$('#cbo_Monodroga').change(function () {
    List_by_Monodroga($("#cbo_Monodroga :selected").val());
});

function List_by_Monodroga(MonoId) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
        data: '{MonoId: "' + MonoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        beforeSend: function () {
            $("#cbo_Medicamento").attr("disabled", true);
        },
        complete: function () {
            $("#cbo_Medicamento").removeAttr("disabled");
        },
        error: errores
    });
}


function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamentos = Resultado.d;
    $.each(Medicamentos, function (i, item) {
        if (Medicamentos[i].Medida != null) {
            var Medida = Medicamentos[i].Medida;
        }
        else {
            var Medida = '';
        }
        if (Medicamentos[i].Presentacion != null) {
            var Presentacion = Medicamentos[i].Presentacion;
        }
        else {
            var Presentacion = '';
        }
        if (i == 0) {
            sourceArr.length = 0;
        }
        str = Medicamentos[i].REM_NOMBRE + ' - ' + Medicamentos[i].REM_GRAMAJE + Medida + ' - ' + Presentacion;
        mapped[str] = item.REM_ID;
        sourceArr.push(str);
        if (i == Medicamentos.length - 1) $("#cbo_Medicamento").removeAttr("disabled");
    });
}


function Get_StockbyId(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_StockbyId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_StockbyId_Cargado,
        error: errores
    });
}

function Get_StockbyId_Cargado(Resultado) {
    var Insumo = Resultado.d;
    $("#cbo_Medicamento").val($("#txt_Medicamento").val());
}

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {

            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);

            $("#CargadoApellido").html(paciente.Paciente);

            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoSeccional").html(paciente.Seccional);
            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }

            $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

            $("#afiliadoId").val(paciente.documento);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
                $("#desdeaqui").focus();
            }

        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        //BuscarPacientes_fancy();
    }
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


$("#txt_dni").change(function () {
    if ($('#txt_dni').val().length > 0) {
        Cargar_Paciente_Documento($("#txt_dni").val());
    }
});

$("#txtNHC").change(function () {
    if ($('#txtNHC').val().length > 0) {
        Cargar_Paciente_NHC($("#txtNHC").val());
    }
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

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#txt_dni").val(paciente.documento_real);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);

        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        Get_StockbyId(mapped[selection]);
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
    },
    minLength: 4,
    items: 5
});


function LimpiarCampos() {
    $("#txt_Medicamento").val('');
    $("#cbo_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#Observacion").val('');
    $("#txt_Medicamento").removeAttr("disabled");
    $("#cantidad").val("");
}


$("#btnOtros").click(function () {
    if (ver_grilla == 1) {
        ver_grilla = 0;
        $("#TablaMedicamentos").hide();
        $("#btnOtros").html('<i class=" icon-book"></i>&nbsp;Grilla');
    }
    else {
        ver_grilla = 1;
        $("#TablaMedicamentos").show();
        $("#btnOtros").html('<i class=" icon-book"></i>&nbsp;Otros');
    }
});


function Cargar_Sala_y_Cama() {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Cargar_Sala_y_Cama",
        contentType: "application/json; charset=utf-8",
        data: '{Quirofano_ID: "' + Id + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#Cargado_Sala").html(lista.Sala);
            $("#Cargado_Cama").html(lista.Cama);
        },
        error: errores
    });
}