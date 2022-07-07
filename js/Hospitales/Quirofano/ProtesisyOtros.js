var Id = 0;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var OperacionId = 0;

var imprimir_comprobate = false;
var volver_pantalla = false;

var sourceArr = [];
var mapped = {};


$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

$(document).ready(function () {
    var Query = {};
    Query = GetQueryString();
    ListTipoDoc();
    //ListaMonoDrogras();
    Id = Query['Id'];
    if (Id > 0) {
        OperacionId = Id;
        ListaCirugia();
        Cargar_Sala_y_Cama();
        PermisoEdicion(Id);
    }
});

$("#btn_cancelear_todo").click(function () {
    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
});

$("#btnVolver").click(function () {
    imprimir_comprobate = false;
    volver_pantalla = true;
    DeleteDetalles();
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

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

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
        }

    }
});

function Cargar_Paciente_NHC(NHC) {
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

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#afiliadoId").val(paciente.documento);
        $("#txt_dni").val(paciente.documento_real);
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

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}




function Cargar_Paciente_Documento(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


//        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
//        if (AnioNacimiento.getFullYear() == 0) {
//            edad = S / FN;
        //        }
        $("#txt_dni").val(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);
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

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}


function ListaCirugia() {
    var json = JSON.stringify({ "Id": Id, "Fecha": null, "Baja":false});
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado,
        error: errores
    });
}

function ListaCirugia_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Cirugia) {
        CargarPacienteID(Cirugia.nhc);
        $("#CargadoFecha").html(Cirugia.fecha);
        GetAnestesista(Cirugia.anestesista_id);
        GetAnestesia(Cirugia.anestesia_tipo_id);
        GetCama(Cirugia.cama_id);
        Medico_Buscar(Cirugia.cirujano_id);
        //GetDiagnostico(Cirugia.diagnostico_id);
        CargarProtesis();
        //CargarServicios(0);
        $("#CargadoUrgencia").html(" No");
        if (Cirugia.urgencia != false) { $("#CargadoUrgencia").html(" Si"); }
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 20 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

function GetAnestesista(Id) {
    if (Id == 0) { return; }
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar_Info_Con_Baja",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetAnestesista_Cargado,
        error: errores
    });
}

function GetAnestesista_Cargado(Resultado) {
    var Medico = Resultado.d;
        $("#CargadoAnestesista").html(Medico.Medico);
}


//function CargarServicios(ServicioId) {
//    $.ajax({
//        type: "POST",
//        url: "../Json/Internaciones/IntSSC.asmx/Lista_Servicios",        
//        contentType: "application/json; charset=utf-8",
//        success: function (Resultado) {
//            Datos = "";
//            Actual = "";
//            $.each(Resultado.d, function (index, Serv) {
//                if (ServicioId == Serv.id) { Actual = " Selected "; } else { Actual = ""; }
//                Datos = Datos + "<option value='" + Serv.id + "' " + Actual + " >" + Serv.descripcion + "</option>";
//            });
//            $("#cbo_servicio").html(Datos);
//        }
//    })
//}


function GetAnestesia(Id) {
    var json = JSON.stringify({ "Id": Id, "estado": true });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaAnestesia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetAnestesia_Cargado,
        error: errores
    });
}

function GetAnestesia_Cargado(Resultado) {
    var Anes = Resultado.d;
    $.each(Anes, function (index, Ane) {
        $("#CargadoAnestesia").html(Ane.tipo);
    });
}


function GetCama(Id) {
    var json = JSON.stringify({ "IdCama": Id, "Sala": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCama_Cargado,
        error: errores
    });
}

function GetCama_Cargado(Resultado) {
    var Camas = Resultado.d;
    $.each(Camas, function (index, Cama) {
        $("#CargadoCama").html(Cama.descripcion);
    }); 
}

//function GetDiagnostico(Diagnostico_Id) {
//    var json = JSON.stringify({ "Id": Diagnostico_Id, "estado": true, "Cirugia_id": Id });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Quirofano/Quirofano_.asmx/Diagnostico_Planificar_Cirugia",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: GetDiagnostico_Cargado,
//        error: errores
//    });
//}

//function GetDiagnostico_Cargado(Resultado) {
//    var Diags = Resultado.d;
//    $.each(Diags, function (index, Diag) {
//        $("#CargadoDiagnostico").html(Diag.diagnostico);
//    });
//}

function Medico_Buscar(Id) {
    if (Id == 0) {return;}
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar_Info_Con_Baja",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medico_Buscar_Cargado,
        error: errores
    });
}

function Medico_Buscar_Cargado(Resultado){
    var Medico = Resultado.d;
    $("#CargadoMedico").html(Medico.Medico);
}


$("#btn_imprimir").click(function () {
    imprimir_comprobate = true;

    if (!PermisoEdicion_PuedoGuardar) {
        f_Imprimir();
        return;
    }

    DeleteDetalles();
});

//Guardar PreAnestesico
$("#btnConfirmar").click(function () {
    DeleteDetalles();
});

function f_Imprimir() {
    $.fancybox({
            'autoDimensions': false,
            'href': '../Impresiones/ProtesisyOtros.aspx?Id=' + Id,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                if (volver_pantalla) {
                    window.location.href = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
                }
            }
        });
}

function Impresion(Resultado) {
    var r = Resultado.d;
    if (r > 0) {

        if (imprimir_comprobate) {
            f_Imprimir();           
        }
        else {
            if (volver_pantalla) {
                window.location.href = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
            }
            else {
                alert("Se ha guardo correctamente");
            }
        }

    }
    else { alert("Error al Guardar Protesis!!"); }
    imprimir_comprobate = false;
}

function DeleteDetalles() {
    var json = JSON.stringify({ "Id": Id});
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Borrar_ProtesisyOtros",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarCab,
        error: errores
    });
}

function GuardarCab(Resultado) {
    var r = Resultado.d;
    if (r > 0) {
        var p = {};
        p.id = OperacionId;
        p.servicio = $("#txt_servicio").val();
        p.ortopedia = $("#txt_ortopedia").val();
        p.observaciones = $("#txt_observaciones").val();                             

        if ($("#MaterialUOM").is(':checked') == true)
            p.material = true;
        else
            p.material = false;
        var json = JSON.stringify({ "p": p });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Guardar_Protesis_Cab",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: GuardarDetalles,
            error: errores
        });
    }
}

function GuardarDetalles(Resultado) {
    //for (var j = 0; j <= Total; j++) {
    //var json = JSON.stringify({ "p": objMedicamentos[j] });
        var json = JSON.stringify({ "p": objMedicamentos });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Guardar_Protesis_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Impresion,
            error: errores
        });
    //}
}

$("#btnAgregarMedicamento").click(function () {
    //Nombre = $("#cbo_insumos :selected").text();
    Nombre = $("#txt_insumo").val();
    Cantidad = parseInt($("#txt_cantidad").val());
    Codigo = $("#cbo_insumos").val();
    Codigo = 0;

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

    objMedicamento.Insumo_Id = Codigo;
    objMedicamento.Nombre = Nombre;
    objMedicamento.Cantidad = Cantidad;
    objMedicamento.Estado = Estado;
    objMedicamento.operacion_Id = OperacionId;
    objMedicamentos[Cual] = objMedicamento;
    RenderizarTabla();
    Editando = 0;
    EditandoPos = -1;
    $("#cbo_insumos").prop('disabled', false);
    //$("#btnEditarMedicamento").show();
    LimpiarCampos();

    //alert(Total);
});

$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#cbo_insumos").prop('disabled', false);
    //$("#btnEditarMedicamento").show();
    LimpiarCampos();
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo/Protesis</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    // alert('paso');
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado       
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td></tr>";
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
    EditandoPos = Nro;

    $("#txt_cantidad").val(objMedicamentos[Nro].Cantidad);
    $("#txt_insumo").val(objMedicamentos[Nro].Nombre);
    //$("#cbo_insumos").val(objMedicamentos[Nro].Insumo_Id);    
    //$("#cbo_insumos").prop('disabled', true);

    //$("#btnEditarMedicamento").hide();

    //$("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    //$("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
    //$("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
        
}

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    RenderizarTabla();
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
}

function LimpiarCampos() {
    $("#txt_cantidad").val("");
    $("#txt_insumo").val("");
    //$("#cbo_insumos").val("");
}

function CargarProtesis() {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Protesis_CAB",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarProtesisDetalle,
        error: errores
    });
}

function CargarProtesisDetalle(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, p) {
        $("#txt_servicio").val(p.servicio);
        $("#txt_ortopedia").val(p.ortopedia);
        $("#txt_observaciones").val(p.observaciones);
        $("#CargadoDiagnostico").html(p.diagnostico);
        if (p.material == true)
            $("#MaterialUOM").attr('checked', true);
        else
            $("#MaterialUOM").attr('checked', false);
        var json = JSON.stringify({ "Id": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Protesis_Lista_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CargarTabla,
            error: errores
        });
    });

}

function CargarTabla(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Protesis/Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, p) {
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + p.nombre + " </td><td> " + p.cantidad + " </td></tr>";
        objMedicamento = {};
        objMedicamento.Nombre = p.nombre;
        objMedicamento.Cantidad = p.cantidad;
        objMedicamento.Monodroga = p.monodroga;
        objMedicamento.Insumo_Id = p.insumo_id;
        objMedicamento.Operacion_Id = Id;

        objMedicamentos[i] = objMedicamento;
        objMedicamentos2[i] = objMedicamento;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
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
//          $('#cbo_Monodroga').append('<option value="0">Seleccione Monodroga...</option>');
            $('#cbo_Monodroga').append('<option value="99999">DESCARTABLE</option>');
//            $.each(MonoDrogas, function (index, mono) {
//                $('#cbo_Monodroga').append(            
//              $('<option></option>').val(mono.numero).html(mono.nombre)
//            );
            //});
            List_by_Monodroga($("#cbo_Monodroga :selected").val());
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


$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        Get_StockbyId(mapped[selection]);
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
    },
    minLength: 4,
    items: 30
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

$("#btn_edicion_cancelar").click(function () {
    $("#Frm_Edicion").hide();
});

$("#btnEditarMedicamento").click(function () {    
    $("#txt_insumo_edicion").val($("#cbo_insumos :selected").text());
    $("#Frm_Edicion").show();
});



$("#btn_edicion_aceptar").click(function () {

    if ($("#cbo_insumos").val() == "") {
        alert("ERROR!! Seleccione un insumo");
        $("#Frm_Edicion").hide();
        return;
    }



    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/InsumoProtesis_AM_Insumos_Guardar",
        contentType: "application/json; charset=utf-8",
        data: '{Insumo_ID: "' + $("#cbo_insumos").val() + '", Descripcion:"' + $("#txt_insumo_edicion").val() + '"}',
        dataType: "json",
        success: function (Resultado) {
            //var lista = Resultado.d;
            // $("#Cargado_Sala").html(lista.Sala);
            //$("#Cargado_Cama").html(lista.Cama);
            CargarInsumos();
            $("#Frm_Edicion").hide();
        },
        error: errores
    });
});



function CargarInsumos() {

    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/InsumoProtesis_Insumos_Listar",
        contentType: "application/json; charset=utf-8",
        data: '{Insumo_ID: 0}',
        dataType: "json",
        success: function (Resultado) {

            var Datos = "<option value=''>Seleccione Insumo...</option>";
            Datos = Datos + "<option value='0'>Nuevo Insumo</option>";

            $.each(Resultado.d, function (i, item) {                
                Datos = Datos + "<option value='" + item.id + "'>" + item.descripcion + "</option>";
            });
            
            $("#cbo_insumos").html(Datos);
        },
        error: errores
    });


}

$("#cbo_insumos").change(function () {
    if ($("#cbo_insumos").val() == "0") { $("#Frm_Edicion").show(); $("#txt_insumo_edicion").val(""); $("#txt_insumo_edicion").focus(); }
});

CargarInsumos();




//Permiso Guardado
PermisoEdicion_PuedoGuardar = true;
PermisoEdicion_dias = "";

function PermisoEdicion(Cirugia_id) {
    var json = JSON.stringify({ "CirugiaId": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Quirofano/Quirofano_.asmx/TengoPermisoEdicion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Respuesta) {
            var dato = Respuesta.d;
            PermisoEdicion_PuedoGuardar = dato.Puedo;
            PermisoEdicion_dias = dato.Dias;
            if (!PermisoEdicion_PuedoGuardar) {
                $("#btnConfirmar").hide();
                $("#btnVolver").remove();
            }
        },
        error: errores
    });
}