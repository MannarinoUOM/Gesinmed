
var sourceArr = [];
var mapped = {};

var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};



$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

function errores(msg) {
    alert('Error: ' + msg.responseText);
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
    //Cargar_Medicamentos(false);      
    ListaMonoDrogras();
    LoadPlantilla();
});


$('#cbo_Monodroga').change(function () {
    List_by_Monodroga($("#cbo_Monodroga :selected").val());
});


$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {        
        Get_StockbyId(mapped[selection]);
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
    },
    minLength: 4,
    items: 10
});


function List_Medicos() {
    var json = JSON.stringify({ "EspId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}



$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid) {
        Codigo = $("#Medicamento_val").html();        
        if (Existe(Codigo)) return;
        Nombre = $("#txt_Medicamento").val();
        Cantidad = parseInt($("#cantidad").val());
        Monodroga = $("#cbo_Monodroga :selected").val();
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
        objMedicamento.Cantidad = Cantidad;
        objMedicamento.Nombre = Nombre;
        objMedicamento.Estado = Estado;
        objMedicamento.Monodroga = Monodroga;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;
        $("#btnAgregarMedicamento").val("Agregar");
        LimpiarCampos();
        //alert(Total);
    }
});

function LimpiarCampos() {
    $("#txt_Medicamento").val('');
    $("#cbo_Medicamento").val('');
    $("#Medicamento_val").html('0');
    $("#txt_Medicamento").removeAttr("disabled");
    $("#cantidad").val("");
}

$("#cantidad").blur(function () {
    $("#controlcantidad").removeClass("error");
});

$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#btnAgregarMedicamento").val("Agregar");
    LimpiarCampos();
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripción</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    // alert('paso');
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td></tr>";
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
    $("#cantidad").val(objMedicamentos[Nro].Cantidad);
    $('#cbo_Monodroga').val(objMedicamentos[Nro].Monodroga);
    //$("#cbo_Medicamento option[value=" + objMedicamentos[Nro].Insumo_Id + "]").attr("selected", true);
    //$("#btnAgregarMedicamento").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    //$("#btnCancelarMedicamento").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
    $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
    $("#btnAgregarMedicamento").val("Modificar");
    $("#Medicamento_val").html(objMedicamentos[Nro].Insumo_Id);
    List_by_Monodroga($("#cbo_Monodroga :selected").val());    
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
            $("#cbo_Medicamento").focus();
            return true;
        }
    }
    return false;
}

$("#btnGuardar").click(function () {
    DeletePlantilla();
}); 


function DeletePlantilla() {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/DeletePreQuirurgicos_Plantilla",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: InsertPlantilla,
        error: errores
    });
}

function InsertPlantilla () {
    for (var j = 0; j <= Total; j++) {
        var json = JSON.stringify({ "Id": 1, "IdInsumo": objMedicamentos[j].Insumo_Id, "Cantidad": objMedicamentos[j].Cantidad, "Tipo": objMedicamentos[j].Monodroga });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/InsertPreQuirurgicos_Plantilla",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: errores
        });
    }
    alert("Plantilla Actualizada");
}


function LoadPlantilla() {
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripción</th><th>Cantidad</th></tr></thead><tbody>";
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
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Descripcion + " </td><td> " + Detalle.Cantidad + " </td></tr>";
        objMedicamento = {};
        objMedicamento.Nombre = Descripcion;
        objMedicamento.Cantidad = Detalle.Cantidad;
        objMedicamento.Insumo_Id = Detalle.Id;
        objMedicamento.Monodroga = Detalle.Monodroga;        
        objMedicamentos[i] = objMedicamento;
        objMedicamentos2[i] = objMedicamento;
        objMedicamentos[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

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



