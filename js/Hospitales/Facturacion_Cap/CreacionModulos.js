var Estado = 1;
var Editando = 0;
var objPracticas = new Array();
var Cual = 0;
var Total = -1;

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(".numeroDecimal").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        if (e.keyCode == 190) {
            if ($(this).val().indexOf('.') == -1 && $(this).val().trim().length > 0) return;
            else e.preventDefault();
        }
        else return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(".numeroDecimal").blur(function () {
    var e = $(this).val();
    if (!isNaN(Number(e)) && e != "")
        $(this).val(parseFloat(e).toFixed(2));
});

$("#txtCodigo").change(function () {
    if (Editando != 1) {
        $("#TablaPracticas").empty();
        ListarModulos();
    }
});

$("#txtPracticas").change(function () {
    if (Editando != 1) {
        $("#TablaPracticas").empty();
        ListarModulos();
    }
});

$("#btn_Cancelar").click(function () {
    $("#TablaPracticas").empty();
    LimpiarCampos();
});


$("#btn_Nuevo").click(function () {
    Nueva_Practica();
});



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {
    ListarModulos();
});

function ListarModulos() {
    var json = JSON.stringify({ "Descripcion": $('#txtPracticas').val().trim(), "Codigo": $("#txtCodigo").val().trim() });
    $.ajax({
        type: "POST",
        url: "../Json/Modulos/Modulos.asmx/ListarModulos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Modulos_Listadas,
        error: errores,
        beforeSend: function () {
            $("#tablamodulos").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#tablamodulos").show();
            $("#cargando").hide();
        }
    });
}


function Modulos_Listadas(Resultado) {
    var Practicas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    $("#TablaEspecialidades").empty();
    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr"; Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + practicas.Codigo + ");>" + practicas.Codigo + "</td><td class='mano' onclick=Editar(" + practicas.Codigo + "); id='Descripcion" + practicas.Codigo + "'>" + practicas.Descripcion + "</td><td style='display:none;'><input id='VNN" + practicas.Codigo + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + practicas.Codigo + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + practicas.Codigo + "' value='" + practicas.ValorHonorario + "' />   <input id='I_Prac_COBRAHONO" + practicas.Codigo + "' value='" + practicas.CobraHonorario + "' /><input id='I_Prac_SFOS" + practicas.Codigo + "' value='" + practicas.SeFacturoOS + "' /></td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick='javascipt:QuitarMod(" + practicas.Codigo + ")' >Quitar</a></td></tr>";
    });
    $("#TablaEspecialidades").html(Tabla_Datos);
}

function Editar(PracticaId) {
    
    Editando = 1;

    $("#txtCodigo").val(PracticaId);
    $("#txtPracticas").val($("#Descripcion" + PracticaId).html());
    $("#txt_VNN").val($("#VNN" + PracticaId).val());
    $("#txt_VG").val($("#I_Prac_VGastos" + PracticaId).val());
    $("#txt_Honorario").val($("#I_Prac_VHono" + PracticaId).val());
    $("#ck_noafectavglobal").attr("checked", $("#I_Prac_NoAfectaVGlobal" + PracticaId).html());

    if ($("#I_Prac_COBRAHONO" + PracticaId).val() == "true")
        $("#cbo_CH").attr("checked", true);
    else $("#cbo_CH").removeAttr("checked");

    if ($("#I_Prac_SFOS" + PracticaId).val() == "true")
        $("#cbo_SFOS").attr("checked", true);
    else $("#cbo_SFOS").removeAttr("checked");
}

function LimpiarCampos() {
    Editando = 0;
    $("#txt_VNN").val('0');
    $("#txt_VG").val('0');
    $("#txt_Honorario").val('0');
    $("#cbo_SFOS").attr("checked", false);
    $("#cbo_CH").attr("checked", false);  
    Estado = 0;
}



function Nueva_Practica_Guardadas() {
    LimpiarCampos();
    ListarPracticas();
    alert("Módulo Creado");
}


$("#btnOcularPractica").click(function () {

    if ($("#btnOcularPractica").hasClass("btn-danger")) {
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-success");
        $("#btnOcularPractica").html("Práctica Activa");
        Estado = 1;
    }
    else {
        $("#btnOcularPractica").html("Práctica <b>NO</b> Activa");
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-danger");
        Estado = 0;

    }

});


$("#Cancelar").click(function () {
    $("#txtCodigo").val('');
    $("#txtPracticas").val('');
    LimpiarCampos();
    Editando = 0;
});

function CargarDatos(){
    var obj = {};
    obj.Codigo = $("#txtCodigo").val().trim();
    obj.Descripcion = $("#txtPracticas").val().trim().toUpperCase();
    obj.ValorNN = $("#txt_VNN").val();
    obj.ValorGastos = $("#txt_VG").val();
    obj.ValorGuardia = 0;
    obj.ValorHonorario = $("#txt_Honorario").val();
    obj.SeFacturoOS = $("#cbo_SFOS").is(':checked');
    obj.CobraHonorario = $("#cbo_CH").is(':checked');
    return obj;
}

function Validar() {
    if ($("#txtCodigo").val().trim().length == 0) { alert("Ingrese Código."); return false; }
    if ($("#txtPracticas").val().trim().length == 0) { alert("Ingrese Descripción."); return false; }
    if ($("#txt_VNN").val().trim().length == 0) $("#txt_VNN").val('0');
    if ($("#txt_VG").val().trim().length == 0) $("#txt_VG").val('0');
    if ($("#txt_Honorario").val().trim().length == 0) $("#txt_Honorario").val('0');
    return true;
}

function Guardar() {
   if (!Validar()) return false;
   
   var json = JSON.stringify({"modulo": CargarDatos() });
             $.ajax({
                 type: "POST",
                 url: "../Json/Modulos/Modulos.asmx/GuardarModulos",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function () {
                     $("#Cancelar").click();
                     ListarModulos();
                     alert("Guardado");
                 },
                 error: errores
             });
}


function QuitarMod(Codigo) {
    if (confirm("¿Desea eliminar el módulo?")) {
        var json = JSON.stringify({ "Codigo": Codigo });
        $.ajax({
            type: "POST",
            url: "../Json/Modulos/Modulos.asmx/EliminarModulos",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                ListarModulos();
            },
            error: errores
        });
    }
}