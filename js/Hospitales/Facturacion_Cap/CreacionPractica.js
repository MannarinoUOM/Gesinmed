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

function ListarPracticas() {
    var json = JSON.stringify({ "Practica": $('#txtPracticas').val().trim().toUpperCase(), "Codigo": $("#txtCodigo").val().trim() });
    $.ajax({
        type: "POST",
        url: "../Json/Practicas/Practicas.asmx/Practicas_Listar_Facturacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Listadas,
        error: errores
    });
}

function ListarPracticasTodas() {
    var json = JSON.stringify({ "Practica": null, "Codigo": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Practicas/Practicas.asmx/Practicas_Listar_Facturacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Listadas,
        beforeSend: function () {
            $("#cargando").show();
            $("#tablapracticas").hide(); 
        },
        complete: function () {
            $("#cargando").hide();
            $("#tablapracticas").show();
        },
        error: errores
    });
}

$("#txtCodigo").change(function () {
    if (Editando != 1) {
        $("#TablaPracticas").empty();
        ListarPracticas();
    }
});

$("#txtPracticas").change(function () {
    if (Editando != 1) {
        $("#TablaPracticas").empty();
        ListarPracticas();
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

function InitControls() {
    Sugerencia_Listar();
    Carencia_Listar();
    Complejidad_Listar();
    Cargar_Especialidades(true, 0, false);
    ListarPracticasTodas();
}


$(document).ready(function () {
    InitControls();
});

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var SobreTurno = false;
    $("#TablaEspecialidades").empty();
    $.each(Practicas, function (index, practicas) {
        var str_quitar = "<a onclick=Quitar('" + practicas.Codigo + "') class='btn btn-danger btn-mini'>Quitar</a>";
        if (practicas.IsActive == "0") str_quitar = "<a onclick=Activar('" + practicas.Codigo + "') class='btn btn-mini btn-success'>Activar</a>";
        Tabla_Datos = Tabla_Datos + "<tr"; Tabla_Datos = Tabla_Datos + "><td class='mano' onclick=Editar(" + practicas.Codigo + ");>" + practicas.Codigo + "</td><td class='mano' onclick=Editar(" + practicas.Codigo + "); id='Descripcion" + practicas.Codigo + "'>" + practicas.descripcion + "</td><td style='display:none;'><input id='VNN" + practicas.Codigo + "' type='hidden' value='" + practicas.valornomenclador + "'/><input id='I_txt_VGuardia" + practicas.Codigo + "' value='" + practicas.valorguardia + "' /><input id='I_Prac_VGastos" + practicas.Codigo + "' value='" + practicas.valorgastos + "' /><input id='I_Prac_VHono" + practicas.Codigo + "' value='" + practicas.valorhonorarios + "' />   <input id='I_Prac_COBRAHONO" + practicas.Codigo + "' value='" + practicas.cobraHono + "' /><input id='I_Prac_SFOS" + practicas.Codigo + "' value='" + practicas.SFOS + "' /><input id='I_Cod_Complejidad" + practicas.Codigo + "' value='" + practicas.complejidadId + "' /><input id='I_Cod_Carencia" + practicas.Codigo + "' value='" + practicas.carenciaId + "' /><input id='I_Prac_TopeMensual" + practicas.Codigo + "' value='" + practicas.topeMensual + "' /><input id='I_Prac_TopeAnual" + practicas.Codigo + "' value='" + practicas.topeAnual + "' /><input id='I_Prac_NoAfectaVGlobal" + practicas.Codigo + "' value='" + practicas.noafectavaloracionglobal + "' /><input id='I_Prac_Sugerencias" + practicas.Codigo + "' value='" + practicas.sugerenciasId + "' /></td><td>" + str_quitar + "</td></tr>";
        if (Practicas.length == 1) Editar(practicas.Codigo);
    });
    $("#TablaEspecialidades").html(Tabla_Datos);
}

function Activar(PracticaId) {
    var json = JSON.stringify({ "Practica": PracticaId, "IsActive": 'A' });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Practica_Eliminar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#btn_Cancelar").click();
            ListarPracticas();
        },
        error: errores
    });
}

function Quitar(PracticaId) {
    var json = JSON.stringify({ "Practica": PracticaId, "IsActive": '0' });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Practica_Eliminar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            $("#btn_Cancelar").click();
            ListarPracticas();
        },
        error: errores
    });
}

function Editar(PracticaId) {
    LimpiarCampos();
    Editando = 1;
    $("#txtCodigo").val(PracticaId);
    $("#txtPracticas").val($("#Descripcion" + PracticaId).html());
    $("#txt_VNN").val($("#VNN" + PracticaId).val());
    $("#txt_VGuardia").val($("#I_txt_VGuardia" + PracticaId).val());
    $("#txt_VG").val($("#I_Prac_VGastos" + PracticaId).val());
    $("#txt_Honorario").val($("#I_Prac_VHono" + PracticaId).val());
    $("#txt_topeanual").val($("#I_Prac_TopeAnual" + PracticaId).val());
    $("#txt_topemensual").val($("#I_Prac_TopeMensual" + PracticaId).val());
    PredefinirComplejidad($("#I_Cod_Complejidad" + PracticaId).val());
    PredefinirCarencia($("#I_Cod_Carencia" + PracticaId).val());
    PredefinirSugerencias($("#I_Prac_Sugerencias" + PracticaId).val());
    CargarListaEspecialidadesporPractica();
    $("#ck_noafectavglobal").attr("checked", $("#I_Prac_NoAfectaVGlobal" + PracticaId).html());
    CargarListaEspecialidadesporPractica();
    if ($("#I_Prac_SFOS" + PracticaId).val() == "true")
        $("#cbo_SFOS").attr("checked", true);
    else $("#cbo_SFOS").removeAttr("checked");

    if ($("#I_Prac_COBRAHONO" + PracticaId).val() == "true")
        $("#cbo_CH").attr("checked", true);
    else $("#cbo_CH").removeAttr("checked");
    
}

function LimpiarTablaEsp() {
    objPracticas.length = 0;
    $("#TablaEspecialidadesCargar").empty();
}

function LimpiarCampos() {
    Editando = 0;
    Estado = 0;
    LimpiarTablaEsp();
    $("#txtCodigo").val('');
    $("#txtPracticas").val('');
    $("#txt_VNN").val('0');
    $("#txt_VGuardia").val('0');
    $("#txt_VG").val('0');
    $("#txt_Honorario").val('0');
    $("#txt_topeanual").val('0');
    $("#txt_topemensual").val('0');
    $("#btnSugerenciasEstado").removeClass("active");
    $("#ck_noafectavglobal").removeAttr("checked", false);
    $("#cbo_sugerencias").val("0");
    $("#cbo_complejidad").val("0");
    $("#cbo_carencia").val("0"); 
    $("#txtPracticaEdicion").val('');
    $("#txtPrecioFEdicion").val('');
    $("#txtPrecioGEdicion").val('');
}


function Nueva_Practica() {
            var json = JSON.stringify({
                "Practica": $('#txtPracticaEdicion').val().trim().toUpperCase(),
                "Codigo": $("#txtCodigoEdicion").val().trim(),
                "FE": 0,
                "FG": 0
            });

            $.ajax({
                type: "POST",
                url: "../Json/Practicas/Practicas.asmx/Practica_Nueva",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Nueva_Practica_Guardadas,
                error: errores
            });
}

function Nueva_Practica_Guardadas() {
    LimpiarCampos();
    ListarPracticas();
    alert("Practica Creada");
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

$("#btnSugerencias").click(function () {

    var Pagina = "Sugerencias.aspx" + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '60%',
		    'height': '80%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );


});

$("#Cancelar").click(function () {
    LimpiarCampos();
    Editando = 0;
});

function Sugerencia_Listar() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/Sugerencia_Listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Practicas = Resultado.d;
            $("#cbo_sugerencias").empty();
            $('#cbo_sugerencias').append($('<option></option>').val("0").html(""));
            $.each(Practicas, function (index, practicas) {
                $('#cbo_sugerencias').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
            });
        },
        error: errores
    });
}

function Carencia_Listar() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/Carencias_Listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Practicas = Resultado.d;
            $("#cbo_carencia").empty();
            $('#cbo_carencia').append($('<option></option>').val("0").html(""));
            $.each(Practicas, function (index, practicas) {
                $('#cbo_carencia').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
            });


        },
        error: errores
    });
}

function Complejidad_Listar() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/Complejidad_Listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Practicas = Resultado.d;
            $("#cbo_complejidad").empty();
            $('#cbo_complejidad').append($('<option></option>').val("0").html(""));
            $.each(Practicas, function (index, practicas) {
                $('#cbo_complejidad').append($('<option></option>').val(practicas.Codigo).html(practicas.Descripcion));
            });
        },
        error: errores
    });
}


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
        $.each(Especialidad, function (index, especialidades) {
            $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
        });
    }



    function RenderizarTabla() {
        var Contenido = "";
        $("#TablaEspecialidadesCargar").empty();
        for (var i = 0; i <= Total; i++) {
            if (objPracticas[i].Estado == 1) {
                Contenido = Contenido + "<tr><td>" + objPracticas[i].Descripcion + " </td><td>&nbsp;&nbsp;<a onclick=javascript:Eliminar(" + i + "); class='btn btn-danger btn-mini'>Quitar</a></td></tr>";
            }
        }
        $("#TablaEspecialidadesCargar").html(Contenido);
        if ($("[rel=tooltip]").length) {
            $("[rel=tooltip]").tooltip();
        }
    }





    function Existe(Algo) {

        for (var i = 0; i <= Total; i++) {
            if (objPracticas[i].Codigo == Algo && objPracticas[i].Estado == 1) {
                alert("Ya ha cargado la especialidad Nro: " + Algo);
                return true;
            }
        }
        return false;
    }




    function AgregarEsp()
    {
        if (!Existe($('#cbo_Especialidad option:selected').val())) 
                {
                    Cual++;
                    var objPractica = {};
                    objPractica.Codigo = $('#cbo_Especialidad option:selected').val();
                    objPractica.Descripcion = $('#cbo_Especialidad option:selected').html();
                    objPractica.Estado = 1;
                    var Cual = Total;
                    Total = Total + 1;
                    Cual = Total;
                    objPracticas[Cual] = objPractica;
                    RenderizarTabla();
                }
     }

     function Eliminar(Nro) {
         objPracticas[Nro].Estado = 0;
         RenderizarTabla();
     }

     function Guardar() {
                 var vargl = false;
                 var SFOS = false;
                 var CHono = false;

                 if ($("#ck_noafectavglobal").is(':checked')) { vargl = true; }
                 if ($("#cbo_SFOS").is(':checked')) { SFOS = true; }
                 if ($("#cbo_CH").is(':checked')) { CHono = true; }

                 var json = JSON.stringify({
                     "objPracticas": objPracticas,
                     "codigo": $("#txtCodigo").val().trim(),
                     "descripcion": $("#txtPracticas").val().trim().toUpperCase(),
                     "sugerenciasId": $('#cbo_sugerencias option:selected').val(),
                     "sugerenciasEstado": $("#btnSugerenciasEstado").hasClass("active"),
                     "complejidadId": $('#cbo_complejidad option:selected').val(),
                     "carenciaid": $('#cbo_carencia option:selected').val(),
                     "topemensual": $('#txt_topemensual').val(),
                     "topeanual": $('#txt_topeanual').val(),
                     "valorglobal": vargl,
                     "vnn": 0,
                     "vguar": 0,
                     "vg": 0,
                     "vhono": 0,
                     "ck_sefacturo": SFOS,
                     "ck_cobrahono": CHono
                 });

                 $.ajax({
                     type: "POST",
                     url: "../Json/Facturacion/AltasNomencladores.asmx/GuardarFacturacionPracticas",
                     data: json,
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     success: function () {
                         alert("Guardado");
                         ListarPracticas();
                         LimpiarCampos();
                     },
                     error: errores
                 });
     }

     function PredefinirComplejidad(Codigo) {
         $("#cbo_complejidad option[value=" + Codigo + "]").attr("selected", true);
     }

     function PredefinirCarencia(Codigo) {
         $("#cbo_carencia option[value=" + Codigo + "]").attr("selected", true);
     }

     function PredefinirSugerencias(Codigo) {

         $("#btnSugerenciasEstado").removeClass("active");
         
         
         if (Codigo != "0") {
             $("#btnSugerenciasEstado").addClass("active");
             $("#cbo_sugerencias option[value=" + Codigo + "]").attr("selected", true);
         }
         else {
             $("#btnSugerenciasEstado").removeClass("active");
         }
     }     

     function CargarListaEspecialidadesporPractica() {
         var json = JSON.stringify({
             "PracticaId": $("#txtCodigo").val()
         });

         $.ajax({
             type: "POST",
             url: "../Json/Practicas/Practicas.asmx/Practicas_Listar_Facturacion_PracticaEspecialidad",
             contentType: "application/json; charset=utf-8",
             data: json,
             dataType: "json",
             success: function (Resultado) {


                 var Practicas = Resultado.d;


                 Cual = 0;
                 Total = -1;
                 objPracticas = new Array();

                 $.each(Practicas, function (index, practicas) {
                 
                     Cual++;
                     var objPractica = {};
                     objPractica.Codigo = practicas.especialidad;
                     objPractica.Descripcion = practicas.especialidadNombre;
                     objPractica.Estado = 1;
                     var Cual = Total;
                     Total = Total + 1;
                     Cual = Total;
                     objPracticas[Cual] = objPractica;
                     RenderizarTabla();
            
                 });
             },
             error: errores
         });
     }