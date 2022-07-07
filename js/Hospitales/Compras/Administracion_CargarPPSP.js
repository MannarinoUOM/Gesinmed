var sourceArr = [];
var mapped = {};
var servicioId = 0;
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();

function Print() {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/PPS_Print.aspx?Id=' + Pedido_Id,
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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function InitControls() {
    List_Servicios();
    Cargar_Medicamentos();
    $("#btnImprimir").hide();
    $("#CargadoNumero").html("Provisorio");
    $("#CargadoFecha").html(FechaActual());
}

$(document).ready(function () {
    InitControls();
});

function Cargar_Medicamentos() {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_INS_LIST_COMBO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        complete: function () { 
            $("#cbo_Medicamento").removeAttr("disabled");
        },
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamentos = Resultado.d;
    $.each(Medicamentos, function (i, item) {
        if (i == 0) {
            sourceArr.length = 0;
        }
        str = item.COM_ADM_INS_INS_DESC;
        mapped[str] = item.COM_ADM_INS_INS_ID;
        sourceArr.push(str);
    });
}

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        $("#txt_Medicamento").val(selection); //nom
        $("#Medicamento_val").html(mapped[selection]); //id
        $("#txt_Cantidad").focus();
        return selection;
    },
    minLength: 4,
    items: 10
});

function CargarPlantilla() {
    var json = JSON.stringify({"SRV_ID": $("#cbo_Servicio :selected").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_FAR_INSUMOS_SERV_LIST_BY_SRVID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            objMedicamentos = Resultado.d;
            RenderizarTabla();
        },
        error: errores
    });
}

$("#btnImprimir").click(function () {
    Print();
});

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    var queryObj = {};
    for (var i = 0; i < querystring.length; i++) {
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        queryObj[name] = value;
    }
    return queryObj;
}

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Lista = Resultado.d;
     $("#cbo_Servicio").append($("<option></option>").val("").html("Seleccione Servicio..."));
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

function LimpiarCampos() {
    Editando = 0;
    EditandoPos = -1;
    $("#cbo_Medicamento").val("");
    $("#cbo_Medicamento").removeAttr('disabled');
    $("#txt_Medicamento").val("");
    $("#Medicamento_val").html("");
    $("#txt_Cantidad").val("0");
    $("#cbo_Medicamento").focus();
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(objMedicamentos,function (i, item) {
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + item.COM_ISE_INS_DESC + " </td><td> " + item.COM_ISE_CANT + " </td></tr>";
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#txt_Cantidad").val(objMedicamentos[Nro].COM_ISE_CANT);
    $("#cbo_Medicamento").val(objMedicamentos[Nro].COM_ISE_INS_DESC);
    $("#cbo_Medicamento").attr('disabled', 'disabled');
    $("#Medicamento_val").html(objMedicamentos[Nro].COM_ISE_INS_ID);
}

$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#cbo_Medicamento").val("");
    $("#cbo_Medicamento").removeAttr('disabled');
    $("#txt_Medicamento").val("");
    $("#Medicamento_val").html("");
    $("#txt_Cantidad").val("0");
    $("#cbo_Medicamento").focus();
});

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    RenderizarTabla();
}

$("#btnConfirmarPedido").click(function () {
    if (confirm("¿Desea confirmar la plantilla?"))
    {
       if (objMedicamentos.length > 0) Delete_Plantilla_Anterior();
       else alert("No se ingresaron insumos.");
    }
});

function Delete_Plantilla_Anterior()
{
    var json = JSON.stringify({"SRV_ID": servicioId});
     $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_FAR_INSUMOS_SERV_DELETE_BY_SRV",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var res = Resultado.d;
            if (res > 0) Insert_Plantilla();
            else alert("Error al guardar plantilla.");
        },
        error: errores
    });
}

function Insert_Plantilla(){
     var json = JSON.stringify({"objMedicamentos": objMedicamentos});
     $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras_Administracion.asmx/COM_FAR_INSUMOS_SERV_INSERT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var res = Resultado.d;
            if (res > 0) {alert("Plantilla guardada."); $("#btnVolver").click(); }
            else alert("Error al guardar plantilla.");
        },
        error: errores
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#cbo_Servicio").change(function () {
    servicioId = $(this).val();
});

///Botones Funciones///
$("#btnAgregarMedicamento").click(function () {
    if (!Validar()) return false;
    else
    {
        if (Existe($("#Medicamento_val").html())) return false;
        else 
        {
            if (Editando == 1) objMedicamentos[EditandoPos] = CargarObj();
            else objMedicamentos.push(CargarObj());

            RenderizarTabla();
            LimpiarCampos();
        }
    }
});

function Validar(){
    if ($("#txt_Cantidad").val().trim().length == 0) $("#txt_Cantidad").val("0");
    if ($("#Medicamento_val").html() <= 0) { alert("Ingrese Insumo."); $("#cbo_Medicamento").focus(); return false; }
    if ($("#txt_Cantidad").val().trim() <= 0) { alert("Ingrese cantidad correcta."); $("#txt_Cantidad").focus(); return false; }
    return true;
}

function CargarObj()
{
    var Codigo = $("#Medicamento_val").html();  
    var Nombre = $("#cbo_Medicamento").val();
    var Cantidad = parseInt($("#txt_Cantidad").val());
    var objMedicamento = {};
    objMedicamento.COM_ISE_ID = 0;
    objMedicamento.COM_ISE_INS_ID = Codigo;
    objMedicamento.COM_ISE_CANT = Cantidad;
    objMedicamento.COM_ISE_SERV_ID = servicioId;
    objMedicamento.COM_ISE_INS_DESC = Nombre;
    objMedicamento.Estado = 1;
    return objMedicamento;
}

function Existe(Codigo) {
    var existe = false;
    $.each(objMedicamentos,function (i,item) {
            if (item.COM_ISE_INS_ID == Codigo && Editando != 1) {
                alert("Ya ha cargado el Medicamento Nro: " + Codigo);
                LimpiarCampos();
                $("#cbo_Medicamento").focus();
                existe = true;
                return existe;
            }
    });
    return existe;
}

    $('#desdeaqui').click(function () {
        if($("#cbo_Servicio :selected").val() == "") {alert("Seleccione Servicio."); return false;}

        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() - $('.pie').height() - $('#hastaaqui').height()));
        $("#CargadoServicio").html($("#cbo_Servicio :selected").html());
        CargarPlantilla();
    });

    $("#btnVolver").click(function () {
        window.location = "Administracion_CargarPPSP.aspx";
    });

    $("#txt_Cantidad").on("keydown",function (e) {
        if (e.keyCode == 13)
        {
            e.preventDefault();
            $("#btnAgregarMedicamento").click();
        }
    });