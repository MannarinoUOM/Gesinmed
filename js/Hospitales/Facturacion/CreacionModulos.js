var Estado = 1;
var Editando = 0;
var objPracticas = new Array();
var Cual = 0;
var Total = -1;

$(document).ready(function () {
    ListarModulos();
    Cargar_Modulos();
    $("#frm_Valores").validate({
        ignore: [],
        rules: {
            'txtPracticas': { required: true },
            'txtCodigo': { required: true }
        },
        messages: {
            'txtPracticas': { required: '' },
            'txtCodigo': { required: '' }

        },
        showErrors: function (errorMap, errorList) {
            // Nada
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            var msj = '';
            for (var i = 0; i < list.length; i++) {
                msj = msj + $(list[i]).attr("rel") + "\n";
            }
            alert(msj);
        }

    });
});


function ListarModulos() {
    var json = JSON.stringify({ "Descripcion": $('#txtPracticas').val(), "Codigo": $("#txtCodigo").val() });
    $("#tablamodulos").hide();
    $("#cargando").show();
    $.ajax({
        type: "POST",
        url: "../Json/Modulos/Modulos.asmx/ListarModulos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Modulos_Listadas,
        error: errores
    });
}

function Cargar_Modulos() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/ListadodeModulosTotal",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cboPracticas').empty();
     $('#cboPracticas').append(
              $('<option></option>').val("0").html("")
            );
    $.each(Practicas, function (index, practicas) {
        $('#cboPracticas').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
    });
}


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

$("#cboPracticas").change(function () {
    $("#TablaPracticas").empty();
    $("#txtCodigo").val($("#cboPracticas :selected").val());
    $("#txtPracticas").val($("#cboPracticas :selected").text());
    ListarModulos();
});

$("#txtCodigo").change(function () {
        var exists = 0 != $('#cboPracticas option[value=' + $("#txtCodigo").val() + ']').length;
        if (exists == 0) {
            //$("#txtCodigo").val("");
            $("#cboPracticas").val("");
            //$("#txtCodigo").focus();
        }
        else {
            LimpiarCampos();
            $("#cboPracticas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
            $("#TablaPracticas").empty();
            ListarModulos();
        }
});



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}




function Modulos_Listadas(Resultado) {
    var Practicas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var SobreTurno = false;
    $("#TablaEspecialidades").empty();
    if (Practicas.length > 0){
    var Cant = Practicas.length;
    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr"; Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + practicas.Codigo + ");>" + practicas.Codigo + "</td><td class='mano' onclick=Editar(" + practicas.Codigo + "); id='Descripcion" + practicas.Codigo + "'>" + practicas.Descripcion + "</td><td style='display:none;'><input id='VNN" + practicas.Codigo + "' type='hidden' value='" + practicas.ValorNN + "'/><input id='I_Prac_VGastos" + practicas.Codigo + "' value='" + practicas.ValorGastos + "' /><input id='I_Prac_VHono" + practicas.Codigo + "' value='" + practicas.ValorHonorario + "' />   <input id='I_Prac_COBRAHONO" + practicas.Codigo + "' value='" + practicas.CobraHonorario + "' /><input id='I_Prac_SFOS" + practicas.Codigo + "' value='" + practicas.SeFacturoOS + "' /></td><td>&nbsp;&nbsp;<a class='btn btn-danger btn-mini' onclick='javascipt:QuitarMod(" + practicas.Codigo + ")' >Quitar</a></td></tr>";
        if (index == Cant - 1) {
                $("#tablamodulos").show();
                $("#cargando").hide();
        }
    });
        $("#TablaEspecialidades").html(Tabla_Datos);
    }
    else {
                $("#tablamodulos").show();
                $("#cargando").hide();
    }
}

function RemoveClass() {
    $(".control-group").removeClass();
}

function Editar(PracticaId) {
    
    Editando = 1;

    $("#txtCodigo").val(PracticaId);
    $("#cboPracticas").val(PracticaId);
    $("#txtPracticas").val($("#Descripcion" + PracticaId).html());
    $("#txt_VNN").val($("#VNN" + PracticaId).val());
    $("#txt_VG").val($("#I_Prac_VGastos" + PracticaId).val());
    $("#txt_Honorario").val($("#I_Prac_VHono" + PracticaId).val());
    $("#ck_noafectavglobal").attr("checked", $("#I_Prac_NoAfectaVGlobal" + PracticaId).html());

    if ($("#I_Prac_COBRAHONO" + PracticaId).val() == "true")
        $("#cbo_CH").attr("checked", true);
    else $("#cbo_CH").removeAttr("checked");

    //alert($("#I_Prac_SFOS" + PracticaId).val());

    if ($("#I_Prac_SFOS" + PracticaId).val() == "true")
        $("#cbo_SFOS").attr("checked", true);
    else $("#cbo_SFOS").removeAttr("checked");
}

function LimpiarCampos() {
    Editando = 0;
    $("#txt_VNN").val('0');
    $("#txt_VG").val('0');
    $("#txt_Honorario").val('0');
    $("#cboPracticas").val("0");
    $("#cbo_SFOS").attr("checked", false);
    $("#cbo_CH").attr("checked", false);
    $("#txtPracticas").val("");  
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



     function Guardar() {
     if (confirm("¿Desea guardar el módulo?")){
         if ($("#frm_Valores").valid()) {
             if ($("#txtCodigo").val().trim().length > 0 && $("#txtPracticas").val().trim().length > 0) {
                 var SFOS = false;
                 var CHono = false;

                 if ($("#cbo_SFOS").is(':checked')) { SFOS = true; }
                 if ($("#cbo_CH").is(':checked')) { CHono = true; }

                 var json = JSON.stringify({
                     "Codigo": $("#txtCodigo").val(),
                     "Descripcion": $("#txtPracticas").val().trim().toUpperCase(),
                     "ValorImporte": $("#txt_VNN").val(),
                     "ValorGastos": $("#txt_VG").val(),
                     "ValorHonorarios": $("#txt_Honorario").val(),
                     "SeFactura": SFOS,
                     "CobraHonorarios": CHono
                 });

                 $.ajax({
                     type: "POST",
                     url: "../Json/Modulos/Modulos.asmx/GuardarModulos",
                     data: json,
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     success: function () {
                         LimpiarCampos();
                         $("#txtCodigo").val('');
                         $("#txtPracticas").val('');
                         ListarModulos();
                         Cargar_Modulos();
                         alert("El módulo se ha guardado.");
                     },
                     error: errores
                 });
             }
             else alert("Ingrese Código y Descripción del Módulo.");
         }
        }
     }


     function QuitarMod(Codigo) {
         if (confirm("¿Desea quitar el módulo?")) {
             var json = JSON.stringify({
                 "Codigo": Codigo
             });

             $.ajax({
                 type: "POST",
                 url: "../Json/Modulos/Modulos.asmx/EliminarModulos",
                 data: json,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function () {
                     LimpiarCampos();
                     $("#txtCodigo").val('');
                     $("#txtPracticas").val('');
                     ListarModulos();
                     Cargar_Modulos();
                     alert("El módulo se ha borrado.");
                 },
                 error: errores
             });
         }
     }