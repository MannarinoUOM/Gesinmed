var objBusquedaLista;
var total_esp;
var BonoId = "";
var MedicoId = "";
var FechaBono = "";
var Id = "";
var Especialidad = "";
var NHC;
var Estado = "";
var objPractica = Array();
var objMedicamento = Array();
var Total = -1;
var Total_m = -1;
var Editando = 0;
var EditandoPos = 0;
var objPracticas = new Array();
var objMedicamentos = new Array();
var IdPedido;

var Cantidad_Estado = [0, 0]; //Atendidos,Pendientes

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(".Volver").click(function () {
    $('#myModal').modal('hide');
});

$(document).ready(function () {
    $("#frm_Main").validate({
        rules: {
            'desde': { dateES: true }
        },
        messages: {
            'desde': { dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
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
    $("#frm_Cantidad_m").validate({
        rules: {
            'cantidadm': { required: true, number: true, range: [0, 99] }
        },
        messages: {
            'cantidadm': { required: '', number: '', range: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }
    });
    $("#desde").datepicker();
    $("#txtHoraIni").mask("99:99", { placeholder: "-" });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#txtHoraIni").val("00:00");
    $("#btnPrint_").hide();
    $("#btnPrint").hide();
    $("#btnAgregarPractica").hide();
    $("#btnAgregarMedicamento").hide();
    Buscar_Pedidos();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var a = dd + '/' + mm + '/' + yyyy;
    $("#desde").val(a);
});

//function imgErrorPaciente(image) {
//    image.onerror = "";
//    image.src = "../img/silueta.jpg";
//    return true;
//}

function LoadPlantillaMedbyId() {
    var json = JSON.stringify({ "GuardiaId": Id });
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/List_Medicamentos_byId",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicamentos_byId,
        error: errores
    });
}

function List_Medicamentos_byId(Resultado) {
    var Lista = Resultado.d;
    if (Lista.length > 0) {
        var Detalles = Resultado.d;
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
        var Contenido = "";
        var i = 0;
        $.each(Detalles, function (index, Detalle) {
            Contenido = Contenido + "<tr><td><a id='Editarm" + i + "' onclick='Editarm(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminarm" + i + "'onclick='Elminarm(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Medicamento + " </td><td style='text-align:right;'> " + Detalle.Cantidad + " </td></tr>";
            objMedicamentos[i] = Detalle;
            objMedicamentos[i].Estado = 1;
            Total_m = Total_m + 1;
            i = i + 1;
        });
        var Pie = "</tbody></table>";
        $("#Tabla_Medicamentos").html(Encabezado + Contenido + Pie);
    }
    else {
        LoadPlantilla();
    }
}

function LoadPlantilla() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/List_Plantilla_Med",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPlantilla_Cargado,
        error: errores
    });
}

function LoadPlantilla_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        Contenido = Contenido + "<tr><td><a id='Editarm" + i + "' onclick='Editarm(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminarm" + i + "'onclick='Elminarm(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Medicamento + " </td><td style='text-align:right;'> " + Detalle.Cantidad + " </td></tr>";
        objMedicamentos[i] = Detalle;
        objMedicamentos[i].Estado = 1;
        Total_m = Total_m + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos").html(Encabezado + Contenido + Pie);
}
//////////////////////////////////////////////////

function LoadPlantillaPrac() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/List_Plantilla_Prac",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPlantillaPrac_Cargado,
        error: errores
    });
}

function LoadPlantillaPrac_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Codigo</th><th>Practica</th><th>Cantidad</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Detalles, function (index, Detalle) {
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Codigo + " </td><td> " + Detalle.Descripcion + " </td><td style='text-align:right;'> " + Detalle.Cantidad + " </td></tr>";
        objPracticas[i] = Detalle;
        objPracticas[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#Tabla_Practicas").html(Encabezado + Contenido + Pie);
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnActualizar").click(function () {
    var valid = $("#frm_Main").valid();
    if (valid) {
        Buscar_Pedidos();
    }
});

$("#btn_Libres").click(function () {
    $(".reff").removeClass("reff_activo");
    $(this).addClass("reff_activo");
    Buscar_Pedidos();
});

$("#btn_SobreT").click(function () {
    $(".reff").removeClass("reff_activo");
    $(this).addClass("reff_activo");
    Buscar_Pedidos();
});

$("#btn_Todos").click(function () {
    $(".reff").removeClass("reff_activo");
    $(this).addClass("reff_activo");
    Buscar_Pedidos();
});

function Buscar_Pedidos() {
    var Estado = 0;
    if ($("#btn_Libres").hasClass("reff_activo")) Estado = 2;
    if ($("#btn_SobreT").hasClass("reff_activo")) Estado = 1;
    var FechaIni = $('#desde').val() + " " + $("#txtHoraIni").val();
    var json = JSON.stringify({ "FechaIni": FechaIni, "Estado": Estado});
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/EnfermeriaList",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPedidos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos_div").show();
            Contadores();
        },
        error: errores
    });

}

function Contadores() {
    $("#btn_Libres").html("Atendidos (" + Cantidad_Estado[0] + ")");
    $("#btn_SobreT").html("Pendientes (" + Cantidad_Estado[1] + ")");
    var Totales = Cantidad_Estado[0] + Cantidad_Estado[1];
    $("#btn_Todos").html("Todos (" + Totales + ")");
}

function Pedidos_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Tabla_Datos = "";
    var Color;
    var Ped = "";
    Cantidad_Estado = [0, 0]; //Atendidos,Pendientes
    Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fecha Pedido</th><th>NHC</th><th>Afiliado</th><th>Box</th><th>Medico</th><th>Pedido</th><th>Fecha Entrega</th></tr></thead><tbody>";
    $.each(Pedidos, function (index, Pedido) {
        if (Pedido.Estado == "ATENDIDO") { Color = "Turnos_Ocupados"; Cantidad_Estado[0]++; }
        else { Color = "Turnos_Libres"; Cantidad_Estado[1]++; }
        Tabla_Datos = Tabla_Datos + "<tr id='" + index + "'";
        Tabla_Datos = Tabla_Datos + "class='" + Color + "' style='cursor:pointer;' onclick=Ventana(" + index + ");";
        if (Pedido.Indicaciones != null) Ped = Pedido.Indicaciones;
        else Ped = Pedido.Practica;
        Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Fecha + "</td><td id='NHC" + index + "'>" + Pedido.NHC + "</td><td>" + Pedido.Afiliado + "</td><td>" + Pedido.Box + "</td><td id='Apellido'>" + Pedido.Medico + "</td><td>" + Ped + "</td><td>"+ Pedido.FechaEntrega +"</td><td id='Id" + index + "' style='display:none;'>" + Pedido.IdGuardia + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

}

function Ventana(index) {
    NHC = $("#NHC" + index).html();
    Cargar_Paciente_NHC(NHC);
        Id = $("#Id" + index).html();
        objPractica = Array();
        objMedicamento = Array();
        Total = -1;
        Total_m = -1;
        Editando = 0;
        EditandoPos = 0;
        objPracticas = new Array();
        objMedicamentos = new Array();
        LoadPlantillaMedbyId();
        LoadPlantillaPracbyId();
        $("#myModal").modal({ keyboard: false, backdrop: 'static' });
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


function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
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
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
    });
}


$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

$("#btnAgregarPractica").click(function () {
    var valid = $("#frm_Cantidad").valid();
    if (valid) {
        Codigo = $("#CargadoCodigo").html();
        Nombre = $("#CargadoPractica").html();
        Cantidad = parseInt($("#cantidad").val());
        var Estado = 1;
        var Cual = Total;
        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }
        objPractica = {};
        objPractica.Codigo = Codigo;
        objPractica.Cantidad = Cantidad;
        objPractica.Estado = Estado;
        objPractica.Descripcion = Nombre;
        objPracticas[Cual] = objPractica;
        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;
        LimpiarCampos();
    }
});

function LimpiarCampos() {
    $("#CargadoCodigo").empty();
    $("#CargadoPractica").empty();
    $("#cantidad").val('0');
    $("#btnPracticas").show();
    $("#btnAgregarPractica").hide();
    $("#btnCancelarPractica").hide();
}

$("#btnCancelarPractica").click(function () {
    Editando = 0;
    EditandoPos = -1;
    LimpiarCampos();
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Codigo</th><th>Practica</th><th>Cantidad</th><tr></thead><tbody>";
    var Contenido = "";
    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].Codigo + " </td><td> " + objPracticas[i].Descripcion + " </td><td style='text-align:right;'> " + objPracticas[i].Cantidad + " </td></tr>";
        }

    }
    var Pie = "</tbody></table>";
    $("#Tabla_Practicas").html(Encabezado + Contenido + Pie);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#cantidad").val(objPracticas[Nro].Cantidad);
    $("#CargadoPractica").html(objPracticas[Nro].Descripcion);
    $("#CargadoCodigo").html(objPracticas[Nro].Codigo);
    $("#btnPracticas").hide();
    $("#btnAgregarPractica").show();
    $("#btnCancelarPractica").show();
    $("#cantidad").focus();
}

function Eliminar(Nro) {
    objPracticas[Nro].Estado = 0;
    RenderizarTabla();
    objPracticas = $.grep(objPracticas, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
}

function Existe(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].Codigo == Algo && objPracticas[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado la Practica Nro: " + Algo);
            LimpiarCampos();
            $("#cantidad").focus();
            return true;
        }
    }
    return false;
}

////////////////////////////

$("#btnAgregarMedicamento").click(function () {
    var valid = $("#frm_Cantidad_m").valid();
    if (valid) {
        Codigo = $("#CargadoCodigom").html();
        Monodroga = $("#CargadoMonodroga").html();
        Medicamento = $("#CargadoMedicamento").html();
        Cantidad = parseInt($("#cantidadm").val());
        var Estado = 1;
        var Cual = Total_m;
        if (Editando == 1) {
            Cual = EditandoPos;
        }
        else {
            Total_m = Total_m + 1;
            Cual = Total_m;
        }
        objMedicamento = {};
        objMedicamento.Id = Codigo;
        objMedicamento.Cantidad = Cantidad;
        objMedicamento.Monodroga = Monodroga;
        objMedicamento.Estado = Estado;
        objMedicamento.Medicamento = Medicamento;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla_m();
        Editando = 0;
        EditandoPos = -1;
        LimpiarCampos_m();
    }
});

function LimpiarCampos_m() {
    $("#CargadoCodigom").empty();
    $("#CargadoMedicamento").empty();
    $("#CargadoMonodroga").empty();
    $("#cantidadm").val('0');
    $("#btnAgregarMedicamento").hide();
    $("#btnCancelarMedicamento").hide();
    $("#btnMedicamentos").show();
}

$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;
    LimpiarCampos_m();
});

function RenderizarTabla_m() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Cantidad</th><tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total_m; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editarm" + i + "' onclick='Editarm(" + i + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a><a id='Elminarm" + i + "'onclick='Elminarm(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Insumo'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Medicamento + " </td><td style='text-align:right;'> " + objMedicamentos[i].Cantidad + " </td></tr>";
        }

    }

    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos").html(Encabezado + Contenido + Pie);

}

function Editarm(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#cantidadm").val(objMedicamentos[Nro].Cantidad);
    $("#CargadoMonodroga").html(objMedicamentos[Nro].Monodroga);
    $("#CargadoMedicamento").html(objMedicamentos[Nro].Medicamento);
    $("#CargadoCodigom").html(objMedicamentos[Nro].Id);
    $("#btnAgregarMedicamento").show();
    $("#btnCancelarMedicamento").show();
    $("#btnMedicamentos").hide();
}

function Elminarm(Nro) {
    objMedicamentos[Nro].Estado = 0;
    RenderizarTabla_m();
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total_m = Total_m - 1;
}

function Existem(Algo) {
    for (var i = 0; i <= Total_m; i++) {
        if (objMedicamentos[i].Id == Algo && objMedicamentos[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado el Medicamento Nro: " + Algo);
            LimpiarCampos_m();
            $("#cantidadm").focus();
            return true;
        }
    }
    return false;
}

$("#btnMedicamentos").click(function () {
    if (objMedicamentos.length > 0) {
        DeleteMedicamentos();
    }
    else {
        alert('Ingrese Medicamentos');
    }

});

function DeleteMedicamentos() {
    var json = JSON.stringify({ "Id": Id});
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/DeleteMedicamentos",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Pedido,
        error: errores
    });
}

function Insert_Pedido() {
    var f = {};
    f.Servicio_Id = "100";
    f.NHC = $("#afiliadoId").val();
    f.GuardiaId = Id;
    var json = JSON.stringify({ "f": f });
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/Insert_Pedido_Cab",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Pedido_Cab_Cargado,
        error: errores
    });

}

function Insert_Pedido_Cab_Cargado(Resultado) {
    IdPedido = Resultado.d;
    var json = JSON.stringify({ "PedidoId": IdPedido, "GuardiaId": Id, "objMedicamentos": objMedicamentos });
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/Insert_Pedido_Det",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: PedidoCargado,
        error: errores
    });
}

function PedidoCargado(Resultado) {
    var json = JSON.stringify({ "PedidoId": IdPedido, "GuardiaId": Id, "objMedicamentos": objMedicamentos });
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/Insert_Guardia_Medicamentos",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardiaMedicamentosCargado,
        error: errores
    });
}

function GuardiaMedicamentosCargado() {
    alert('Medicamentos Cargados Correctamente');
    $("#btnPrint_").show();
    $("#btnPrint").show();
}

$("#btnPracticas").click(function () {
    if (objPracticas.length > 0) {
        Delete_Guardia_Practicas();
    }
    else {
        alert('Ingrese Practicas');
    }

});

function Insert_Guardia_Practicas() {
    var json = JSON.stringify({ "GuardiaId": Id, "objPracticas": objPracticas });
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/Insert_Guardia_Practicas",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardiaPracticasCargado,
        error: errores
    });
}

function GuardiaPracticasCargado() {
    alert('Practicas Cargadas Correctamente');
    $("#btnPrint_").show();
    $("#btnPrint").show();
} 

function Delete_Guardia_Practicas() {
    var json = JSON.stringify({ "GuardiaId": Id});
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/Delete_Guardia_Practicas",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_Guardia_Practicas,
        error: errores
    });
}

function LoadPlantillaPracbyId() {
    var json = JSON.stringify({ "GuardiaId": Id });
    $.ajax({
        data: json,
        url: "../Json/Guardia/Guardia.asmx/List_Practicas_byId",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Practicas_byId,
        error: errores
    });
}

function List_Practicas_byId(Resultado) {
    var Lista = Resultado.d;
    if (Lista.length > 0) {
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Codigo</th><th>Practica</th><th>Cantidad</th></tr></thead><tbody>";
        var Contenido = "";
        var i = 0;
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Codigo + " </td><td> " + Detalle.Descripcion + " </td><td style='text-align:right;'> " + Detalle.Cantidad + " </td></tr>";
            objPracticas[i] = Detalle;
            objPracticas[i].Estado = 1;
            Total = Total + 1;
            i = i + 1;
        });
        var Pie = "</tbody></table>";
        $("#Tabla_Practicas").html(Encabezado + Contenido + Pie);
    }
    else {
        LoadPlantillaPrac(); //Si no existen practicas cargadas para ese IDGUardia, cargo la plantilla.
    }
}

$("#btnPrint_").click(function () {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/ImpresionGuardiaPracMed.aspx?Id=' + Id, 
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    });

    $("#btnPrint").click(function () {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/ImpresionGuardiaPracMed.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    });

    $("#myModal").on('hidden', function () {
        Buscar_Pedidos();
    });