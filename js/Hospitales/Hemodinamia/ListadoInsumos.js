function ListarInsumos() {
 
    var json = JSON.stringify({ "EspecialidadID": $("#cbo_servicio").val(), "NoStock": false });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_insumo').empty();            
            $('#cbo_insumo').append($('<option></option>').val(0).html("Seleccione un insumo."));            
            $.each(lista, function (index, insu) {
                $('#cbo_insumo').append($('<option></option>').val(insu.id).html(insu.nombre));                
            });

        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}







$("#btn_cancelar_insumo").click(function () {
    EditandoNombre = 0;
    $("#INSUMOALTA_Div").hide();
});

var EditandoNombre = 0;

$("#btn_guardar_insumo").click(function () {
    var EnStock = false;
    if ($('#ck_enstock').prop('checked')) {
        EnStock = true;
    }

    var json = JSON.stringify({ "InsumoId": EditandoNombre, "Nombre": $("#txt_insumoalta_insumo").val(), "StockMinimo": 0, "EnStock": EnStock });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_CREAR_NOMBRE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#INSUMOALTA_Div").hide();
            EditandoNombre = 0;
            $("#txt_insumoalta_insumo").val("");
            $("#txt_insumoalta_stockminimo").val("");
            $("#cbo_insumo").val(0);
            ListarInsumos();
        },
        error: errores
    });
});


$("#btn_cancelarinsumo").click(function () {
    $("#tb_insumo").empty();
    $("#cbo_insumo").val(0);
    $("#txt_fecha_desde").val("");
    $("#txt_fecha_hasta").val("");
    $("#span_stock").html("0");
        
    EditandoNombre = 0;
    $("#INSUMOALTA_Titulo").html("Nuevo insumo");
    $("#btn_editarnombredeinsumo").hide();
    $("#btn_bajadeinsumo").hide();
    $("#btnImprimir").hide();    
    $("#btnImprimirListado").hide();
    $("#btn_agregarinsumo").hide();
    $("#btn_cancelarinsumo").click();

});

function EdicionControles() {
    EditandoCodigoBarra = 0;
    $("#btn_agregarinsumo").html("Carga de stock");
    if ($("#cbo_insumo").val() != 0) {
        EditandoNombre = $("#cbo_insumo").val();
        $("#btn_editarnombredeinsumo").show();
        //$("#btn_bajadeinsumo").show();
        $("#btnImprimir").show();
        $("#btnImprimirListado").show();
        $("#btn_agregarinsumo").show();
        $("#INSUMOALTA_Titulo").html("Edición de insumo");
        CargarTipo(0, $("#cbo_insumo").val(), "cbo_alta_tipo", "-1");
    }
    else {
        $("#cbo_alta_rubro").val("-1");
        $("#cbo_alta_tipo").val("-1");
        $("#cbo_alta_medida").val("-1");
        $("#cbo_alta_marca").val("0");

        $("#span_stock").html("0");
        $("#btn_cancelarinsumo").click();
        EditandoNombre = 0;
        $("#INSUMOALTA_Titulo").html("Nuevo insumo");
        $("#btn_editarnombredeinsumo").hide();
        $("#btn_bajadeinsumo").hide();
        $("#btnImprimir").hide();
        $("#btnImprimirListado").hide();
        $("#btn_agregarinsumo").hide();
    }
}

$("#cbo_insumo").change(function () {
    EdicionControles();
    CargarTipo2(0, $("#cbo_insumo").val(), "cbo_filtro_tipo",0);    
});

$("#cbo_filtro_tipo").change(function () {
    $("#cbo_filtro_medida").empty();
    CargarMedida2(0, $("#cbo_insumo").val(), $("#cbo_filtro_tipo").val(), "cbo_filtro_medida", 0);
});

function CargarInsumo() {
    var json = JSON.stringify({ "ID": EditandoNombre });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_CARGARINSUMO_X_ID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var insu = Resultado.d;            
                $('#txt_insumoalta_insumo').val(insu.nombre);
                $('#txt_insumoalta_stockminimo').val(insu.stock_minimo);
                if (insu.enstock) {
                    $("#ck_enstock").prop('checked', true);
                }
                else {
                    $("#ck_enstock").prop('checked', false);
                 }
                $("#INSUMOALTA_Div").show();
        },
        error: errores
    });
}


function ListarOrtopedias() {
    var json = JSON.stringify({ "ID": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_ORTOPEDIAS_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_ortopedia').empty();
            $('#cbo_ortopedia').append($('<option></option>').val(0).html("Seleccione una ortopedia."));
            $.each(lista, function (index, ortopedia) {
                $('#cbo_ortopedia').append($('<option></option>').val(ortopedia.id).html(ortopedia.descripcion));                
            });
        },
        error: errores
    });
}



function CargarOrtopedias(ID) {
    var json = JSON.stringify({ "ID": ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_ORTOPEDIAS_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#txt_ortopediaalta_nombre').empty();            
            $.each(lista, function (index, ortopedia) {
                $('#txt_ortopediaalta_nombre').val(ortopedia.descripcion);
            });
        },
        error: errores
    });
}



function ListarServicios() {
    var json = JSON.stringify({ "ID": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_SERVICIOS_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_alta_servicio').empty();
            $('#cbo_servicio').empty();


            $('#cbo_insumo').append($('<option></option>').val(0).html("Seleccione un insumo."));
            $('#cbo_alta_servicio').append($('<option></option>').val(0).html("Seleccione un Servicio."));
            $('#cbo_servicio').append($('<option></option>').val(-1).html("Seleccione un Servicio."));
            $('#cbo_servicio').append($('<option></option>').val(0).html("Todos los servicios."));
            $.each(lista, function (index, serv) {
                $('#cbo_alta_servicio').append($('<option></option>').val(serv.id).html(serv.descripcion));
                $('#cbo_servicio').append($('<option></option>').val(serv.id).html(serv.descripcion));
            });            
        },
        error: errores
    });
}





function ListarMarcas() {    
    $.ajax({
        type: "POST",
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_MARCAS_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_alta_marca').empty();
            $('#cbo_alta_marca').append($('<option></option>').val(0).html("Seleccione una marca."));            
            $.each(lista, function (index, marc) {
                $('#cbo_alta_marca').append($('<option></option>').val(marc.id).html(marc.descripcion));                
            });
        },
        error: errores
    });
}





ListarMarcas();

function ListarMovimientos() {
    //Tipo 0 todos
    //Tipo 1 altas
    //Tipo 2 bajas
    var json = JSON.stringify({ "Tipo": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_MOTIVO_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_movimiento').empty();
            $('#cbo_movimiento').append($('<option></option>').val(0).html("Seleccione un movimiento."));
            $.each(lista, function (index, serv) {
                $('#cbo_movimiento').append($('<option></option>').val(serv.id).html(serv.descripcion));
            });
        },
        error: errores
    });
}


function CargarServicio(ID) {
    var json = JSON.stringify({ "ID": ID });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_SERVICIOS_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, serv) {
                $("#txt_servicioalta_nombre").val(serv.descripcion);
                $("#txt_servicioalta_abreviatura").val(serv.abreviatura);
            });
        },
        error: errores
    });
}

ListarServicios();
ListarOrtopedias();
ListarMovimientos();
$("#txt_alta_fvencimiento").datepicker({ minDate: 0 });

$("#txt_fecha_desde").datepicker({ });
$("#txt_fecha_hasta").datepicker({ });

$("#btn_alta_cancelar").click(function () {    
    $("#ALTA_Div").hide();
});

$("#btn_agregarinsumo").click(function () {

    if ($("#cbo_insumo").val() == "0") {
        alert("Seleccione el insumo");
        return;
    }

    if (EditandoCodigoBarra == 0) {
        $("#txt_alta_cantidad").val("").prop("disabled", false);
        $("#esuom").prop('checked', false);
        $("#esortopedia").prop('checked', false);
        $("#txt_alta_fvencimiento").val("");
        $("#span_codigo").html("");
        $("#cbo_movimiento").val("0");
        $("#cbo_ortopedia").val("0");
        $("#cbo_alta_marca").val("0");
        $("#cbo_movimiento").val("0");
        $("#cbo_alta_servicio").val($("#cbo_servicio").val());
        $("#txt_alta_observacion").val("");
        $("#txt_deposito").val("");        
        $("#label_codigo").hide();
        $("#span_codigo").hide();

        $("#cbo_alta_tipo").val("-1");
        $("#cbo_alta_medida").empty();
        $('#cbo_alta_medida').append($('<option></option>').val(-1).html("Seleccione una medida..."));

        if ($("#cbo_insumo").val() != "0") {
            $("#span_alta_insumo").html($("#cbo_insumo option:selected").text());
            $("#span_tipo_insumo").html($("#cbo_insumo option:selected").text());
            $("#span_medida_insumo").html($("#cbo_insumo option:selected").text());

            $("#ALTA_Div").show();
        }
    }
    else {
        $("#label_codigo").show();
        $("#span_codigo").show();
        CargarxCB(EditandoCodigoBarra);
    }
});


$("#btn_cancelar_servicio").click(function () {
    EdicionServicio = 0;
    $("#txt_servicioalta_nombre").val("");
    $("#txt_servicioalta_abreviatura").val("");
    $("#SERVICIO_Div").hide();
});


var EdicionOrtopedia = 0;
$("#btn_ortopedia_alta").click(function () {
    EdicionOrtopedia = 0;
    $("#ORTOPEDIA_Div").show();
});


$("#btn_ortopedia_edicion").click(function () {
    if ($("#cbo_ortopedia").val() != 0) {
        EdicionOrtopedia = $("#cbo_ortopedia").val();
        CargarOrtopedias(EdicionOrtopedia);
        $("#ORTOPEDIA_Div").show();
    }
    else {
        alert("Seleccione la ortopedia a editar");
    }
    
});


$("#btn_cancelar_ortopedia").click(function () {
    EdicionOrtopedia = 0;
    $("#txt_ortopediaalta_nombre").val("");
    $("#ORTOPEDIA_Div").hide();
});

var EdicionServicio = 0;
$("#btn_servicio_edicion").click(function () {
    if ($("#cbo_alta_servicio").val() != 0) {
        EdicionServicio = $("#cbo_alta_servicio").val();
        CargarServicio(EdicionServicio);
        $("#SERVICIO_Div").show();
    }
    else {
        alert("Seleccione el servicio a editar");
    }
});

$("#btn_servicio_nuevo").click(function () {
    EdicionServicio = 0;
    $("#txt_servicioalta_nombre").val("");
    $("#txt_servicioalta_abreviatura").val("");
    $("#SERVICIO_Div").show();
});


var EdicionMarca = 0;
$("#btn_marca_nuevo").click(function () {
    EdicionMarca = 0;
    $("#txt_marcaalta_nombre").val("");    
    $("#MARCA_Div").show();
});


$("#btn_cancelar_marca").click(function () {
    $("#MARCA_Div").hide();
    EdicionMarca = 0;
    $("#txt_marcaalta_nombre").val("");    
});


$("#btn_marca_edicion").click(function () {
    if ($("#cbo_alta_marca").val() != 0) {
        EdicionMarca = $("#cbo_alta_marca").val();
        $("#MARCA_Div").show();
    }
    else {
        alert("Seleccione la marca a editar");
    }
});





$("#btn_guardar_ortopedia").click(function () {
    GuardarOrtopedia();
});

$("#btn_guardar_servicio").click(function () {
    GuardarServicio();
});


$("#btn_guardar_marca").click(function () {
    GuardarMarca();
});




function GuardarMarca() {
    var json = JSON.stringify({ "ID": EdicionMarca, "MARCA": $("#txt_marcaalta_nombre").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_MARCA_INSERTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            EdicionMarca = 0;
            $("#txt_marcaalta_nombre").val("");            
            $("#MARCA_Div").hide();
            ListarMarcas();
        },
        error: errores
    });
}


function GuardarServicio() {
    var json = JSON.stringify({ "ID": EdicionServicio, "SERVICIO": $("#txt_servicioalta_nombre").val(), "ABREVIATURA": $("#txt_servicioalta_abreviatura").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_SERVICIOS_ALTA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            EdicionServicio = 0;
            $("#txt_servicioalta_nombre").val("");
            $("#txt_servicioalta_abreviatura").val("");
            $("#SERVICIO_Div").hide();
            ListarServicios();
        },
        error: errores
    });
}


function GuardarOrtopedia() {
    var json = JSON.stringify({ "id": EdicionOrtopedia, "nombre": $("#txt_ortopediaalta_nombre").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_ORTOPEDIAS_ALTA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            EdicionOrtopedia = 0;
            $("#txt_ortopediaalta_nombre").val("");
            $("#ORTOPEDIA_Div").hide();
            ListarOrtopedias();

        },
        error: errores
    });
}



function ListarEtiquetaxInsumo(InsumoId) {
    Tipo = $("#cbo_filtro_tipo").val();
    Medida = $("#cbo_filtro_medida").val();
    if (Tipo == null) { Tipo = 0; }
    if (Medida == null) { Medida = 0; }
    var json = JSON.stringify({ "InsumoId": InsumoId, "Desde": $("#txt_fecha_desde").val(), "Hasta": $("#txt_fecha_hasta").val(), "ServicioID": $("#cbo_servicio").val(), "TipoID": Tipo, "MedidaID": Medida });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_LISTAR_ADM_FILTRO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var tabla = "";
            var cantidad = 0;
            $("#th_insumo").html("<tr><td><input type='checkbox' id='cbo_todos'/></td><td>Código</td><td>Insumo</td><td>Movimiento</td><td>Servicio</td><td>F. Vencimiento</td><td>Comentario</td><td>Deposito</td></tr>");
            $.each(lista, function (index, ins) {
                if (ins.fecha_vencimiento == "01/01/1900") { ins.fecha_vencimiento = ""; }
                tabla = tabla + "<tr><td><input type='checkbox' value='" + ins.codigo + "' /></td><td>" + ins.codigo + "</td><td>" + ins.nombre + "</td><td>" + ins.motivo + "</td><td>" + ins.sservicio + "</td><td>" + ins.fecha_vencimiento + "</td><td>" + ins.comentario + "</td><td>" + ins.deposito + "</td></tr>";
                cantidad++;
            });
            $("#tb_insumo").html(tabla);
            $("#label_stock").html("Cantidad: ");
            $("#span_stock").html(cantidad);            
        },
        error: errores
    });
}



function ListarEtiquetaxInsumoDET(InsumoId) {
    var json = JSON.stringify({ "InsumoId": InsumoId, "ServicioID": $("#cbo_servicio").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_LISTAR_ADM_DET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#th_insumo").html("<tr><td>Código</td><td>Insumo</td><td>Movimiento</td><td>Paciente</td><td>Servicio</td><td>F. Vencimiento</td><td>Usuario</td><td>F. Movimiento</td><td>Comentario</td></tr>");
            var tabla = "";

            $("#span_stock").html("");
            $.each(lista, function (index, ins) {
                if (ins.fecha_vencimiento == "01/01/1900") { ins.fecha_vencimiento = ""; }
                tabla = tabla + "<tr><td>" + ins.codigo + "</td><td>" + ins.nombre + "</td><td>" + ins.motivo + "</td><td>" + ins.paciente + "</td><td>" + ins.sservicio + "</td><td>" + ins.fecha_vencimiento + "</td><td>" + ins.usuario + "</td><td>" + ins.fecha_movimiento + "</td><td>" + ins.comentario + "</td></tr>";
            });
            $("#label_stock").html("");
            $("#span_stock").html("");
            $("#tb_insumo").html(tabla);
        },
        error: errores
    });
}




$("#btn_alta_guardar").click(function () {
    if ($("#cbo_alta_tipo").val() == -1) { alert("Seleccione el tipo"); return; }
    if ($("#cbo_alta_medida").val() == -1) { alert("Seleccione la medida"); return; }


    if ($("#cbo_alta_servicio").val() == 0) { alert("Seleccione el servicio."); return; }

    if ($("#esuom").is(':checked')) {
        //        
    }
    else {
        if ($("#esortopedia").is(':checked')) {
            if ($("#cbo_ortopedia").val() == 0) { alert("Seleccione la ortopedia."); return; }
        }
        else {
            alert("Debe seleccionar Si es UOM o de Ortopedia."); return;
        }
    }


    if ($("#txt_alta_fvencimiento").val() == "") { alert("Seleccione la fecha de vencimiento"); return; }
    if ($("#cbo_movimiento").val() == 0) { alert("Seleccione el movimiento"); return; }



    var esuom = false;
    if ($("#esuom").is(':checked')) { esuom = true; }

    if (EditandoCodigoBarra != 0) {        
        GuardarInsumoxCB();
    } else {
        if ($("#txt_alta_cantidad").val() == "" || $("#txt_alta_cantidad").val() < 1) { alert("Ingrese la cantidad de insumo a generar"); return; }
        var json = JSON.stringify({ "InsumoId": $("#cbo_insumo").val(), "Servicio": $("#cbo_alta_servicio").val(), "EsUOM": esuom, "OrtopediaId": $("#cbo_ortopedia").val(), "FV": $("#txt_alta_fvencimiento").val(), "Cantidad": $("#txt_alta_cantidad").val(), "Movimiento": $("#cbo_movimiento").val(), "Observacion": $("#txt_alta_observacion").val(), "TipoId": $("#cbo_alta_tipo").val(), "MedidaId": $("#cbo_alta_medida").val(), "MarcaId": $("#cbo_alta_marca").val(), "Deposito": $("#txt_deposito").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_INSERTAR",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                ListarInsumos_ADM();
                $("#ALTA_Div").hide();
                Imprimir(Resultado.d);
            },
            error: errores
        });
    }
});

//$("#cbo_insumo, #ck_detallada, #cbo_servicio, #cbo_filtro_tipo, #cbo_filtro_medida").change(function () {    
//    ListarInsumos_ADM();
//});


$("#btn_filtrar").click(function () {
    ListarInsumos_ADM();
})


$("#cbo_servicio").change(function () {
    $("#btn_agregarinsumo").hide();
    $("#btn_editarnombredeinsumo").hide();
    $("#btn_bajadeinsumo").hide();
    $("#btnImprimir").hide();
    $("#btnImprimirListado").hide();
});


function ListarInsumos_ADM() {
    $("#btn_agregarinsumo").html("Carga de stock");
    if ($("#cbo_insumo").val() != 0) {
        if ($("#ck_detallada").is(':checked')) {
            ListarEtiquetaxInsumoDET($("#cbo_insumo").val());
        }
        else {
            ListarEtiquetaxInsumo($("#cbo_insumo").val());
        }
    }
}


$("#txt_fecha_desde, #txt_fecha_hasta").change(function () {
    ListarInsumos_ADM();
});




EditandoCodigoBarra = 0;
function CargarxCB(CB) {
    EditandoCodigoBarra = CB;
    var json = JSON.stringify({ "CodBar": CB });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_CARGAR_X_CODBARRA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ins = Resultado.d;
            $("#span_alta_insumo").html(ins.nombre);
            $("#cbo_alta_servicio").val(ins.ServicioID);
            $("#cbo_alta_marca").val(ins.marca);
            $("#span_codigo").html(CB);

            if (ins.material_uom == true) {
                $("#esuom").prop('checked', true);
                $("#esortopedia").prop('checked', false);
                $("#cbo_ortopedia").val("0");
            }
            else{
                $("#esuom").prop('checked', false);
                $("#esortopedia").prop('checked', true);
                $("#cbo_ortopedia").val(ins.OrtopediaID);
            }           
            
            
            CargarTipo(0,$("#cbo_insumo").val(),"cbo_alta_tipo",ins.tipo);
            CargarMedida(0,$("#cbo_insumo").val(),ins.tipo,"cbo_alta_medida",ins.medida);

            $("#txt_alta_fvencimiento").val(ins.fecha_vencimiento);
            $("#txt_alta_cantidad").val("").prop("disabled", true); ;
            $("#cbo_movimiento").val(ins.motivo);
            $("#txt_alta_observacion").val(ins.observacion);
            $("#txt_deposito").val(ins.deposito);
            $("#ALTA_Div").show();
        },
        error: errores
    });
}




function GuardarInsumoxCB() {
    esUOM = false;

    if ($("#esuom").is(':checked')) { 
        esUOM = true;
    }

    var json = JSON.stringify({        
        "CodBar": EditandoCodigoBarra,
        "SERVICIO": $("#cbo_alta_servicio").val(),
        "UOM": esUOM,
        "ORTOPEDIAID": $("#cbo_ortopedia").val(),
        "FECHAVENCIMIENTO": $("#txt_alta_fvencimiento").val(),
        "MOTIVO": $("#cbo_movimiento").val(),
        "OBSERVACION": $("#txt_alta_observacion").val(),
        "TipoId": $("#cbo_alta_tipo").val(),
        "MedidaId": $("#cbo_alta_medida").val(),
        "MarcaId": $("#cbo_alta_marca").val(),
        "Deposito": $("#txt_deposito").val()
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_ACTUALIZAR_X_CODBARRA",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#ALTA_Div").hide();
            EditandoCodigoBarra = 0;            
            ListarInsumos_ADM();
        },
        error: errores
    });
}


$("#btn_guardar_baja").click(function () {
    if (BajaCodigoBarra != 0) {

        if ($("#cbo_baja_motivo").val() == "0") { alert("Falta seleccionar un motivo de baja."); return; }

        var json = JSON.stringify({ "CodBar": BajaCodigoBarra, "MOTIVO": $("#cbo_baja_motivo").val(), "OBSERVACION": $("#txt_baja_observacion").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_UTILIZAR_X_CODBARRA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var ins = Resultado.d;
                BajaCodigoBarra = 0;
                $("#INSUMOBAJA_Div").hide();
                ListarInsumos_ADM();
            },
            error: errores
        });
    }
});




function InsumoEliminar(Insumo) {
    var json = JSON.stringify({ "INSUMOID": Insumo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_ELIMINAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ins = Resultado.d;
            if (ins == false) {
                alert("No se pudo eliminar el insumo, tal vez este insumo ya se ha usado en algun momento.");
            }
            else {
                ListarInsumos();
                $("#cbo_insumo").val(0);
                $("#cbo_insumo").change();
            }
        },
        error: errores
    });
}



$("#btn_cancelar_baja").click(function () {
    $("#INSUMOBAJA_Div").hide();
});


$("#btn_editarnombredeinsumo").click(function () {
    if ($("#cbo_insumo").val() == "0") {        
        alert("Falta seleccionar el insumo a editar el nombre");
        return;
    }
    EditandoNombre = $("#cbo_insumo").val();
    $("#INSUMOALTA_Titulo").html("Edición de insumo");
    CargarInsumo();
});


$("#btn_nuevoinsumo").click(function () {
    $("#ck_enstock").prop('checked', true);
    EditandoNombre = 0;
    $("#txt_insumoalta_insumo").val("");
    $("#txt_insumoalta_stockminimo").val("");
    $("#INSUMOALTA_Titulo").html("Nuevo Insumo");
    $("#INSUMOALTA_Div").show();
});



$('#cbo_todos').live('change', function () {
    $('#tb_insumo input:checkbox').not(this).prop('checked', this.checked);

    if ($("#cbo_todos").is(':checked')) {
        $("#tb_insumo tr").addClass("check_marcado");
    }
    else {
        $("#tb_insumo tr").removeClass("check_marcado");
    }

});


$('#tb_insumo input:checkbox').live('change', function () {
    var $checkboxes = $('#tb_insumo td input[type="checkbox"]');
    var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
    //$("tr").removeClass("check_marcado");

    if ($(this).parents("tr").hasClass("check_marcado")) {
        $(this).parents("tr").removeClass("check_marcado");
    }
    else {
        $(this).parents("tr").addClass("check_marcado");
    }

    if (countCheckedCheckboxes == 1) {
        //alert( $(this).parents("tr").find("td:nth-child(2)").html() );
        //return;
        $("#ALTA_Titulo").html("Edición de stock");
        $("#btn_agregarinsumo").html("Edición de stock");
        $("#btn_agregarinsumo").show();

        $("#tb_insumo input[type='checkbox']:checked").each(function () {
            EditandoCodigoBarra = $(this).val();
        });
    }

    if (countCheckedCheckboxes == 0) {
        EditandoCodigoBarra = 0;
        $("#ALTA_Titulo").html("Carga de stock");
        $("#btn_agregarinsumo").html("Carga de stock");
        $("#btn_agregarinsumo").show();
    }

    if (countCheckedCheckboxes > 1) {
        EditandoCodigoBarra = 0;
        $("#btn_agregarinsumo").hide();
    }


});



function Imprimir(Cuales) {
    var aImprimir = "";
    if (Cuales == "-1") {
        $("#tb_insumo input[type='checkbox']:checked").each(function () {
            aImprimir = aImprimir + $(this).val() + ',';
        });
    } else {
        aImprimir = Cuales;
    }

    if (aImprimir.length < 2) {        
        return;
    }

        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Hemodinamia/EtiquetaInsumo.aspx?codigos=' + aImprimir,
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


    $("#btn_bajadeinsumo").click(function () {        
        var r = confirm("¿Confirma la eliminación de todos los insumos "  + $("#cbo_insumo :selected").html() + " ?");
        if (r == true) {
            InsumoEliminar($("#cbo_insumo").val());
        }
    });



    var ediciontipo = 0;
    $("#btn_alta_tipo_edicion").click(function () {
        if ($("#cbo_alta_tipo").val() != -1) {            
            ediciontipo = $("#cbo_alta_tipo").val();
            TraerTipo(ediciontipo);
            $("#SUBRUBRO_Div").show();
        }
        else {
            alert("Seleccione el tipo a editar");
        }   
    });

    $("#btn_alta_tipo_nuevo").click(function () {
        ediciontipo = 0;
        $("#span_tipo_insumo").html($("#cbo_insumo option:selected").text());
        $("#SUBRUBRO_Div").show();
    });
    
    var edicionmedida = 0;
    $("#btn_alta_medida_edicion").click(function () {
        if ($("#cbo_alta_medida").val() != -1) {
            edicionmedida = $("#cbo_alta_medida").val();
            $("#span_medida_tipo").html($("#cbo_alta_tipo option:selected").text());
            $("#span_medida_insumo").html($("#cbo_insumo option:selected").text());
            TraerMedida(edicionmedida);
            $("#MEDIDA_Div").show();
        }
        else {
            alert("Seleccione la medidad a editar");
        }         
    });

    $("#btn_alta_medida_nueva").click(function () {
        if ($("#cbo_alta_tipo").val() != -1) {
            edicionmedida = 0;

            $("#span_medida_tipo").html($("#cbo_alta_tipo option:selected").text());
            CargarTipo(0, $("#cbo_insumo").val(), "cbo_divmedida_subrubro", $("#cbo_alta_tipo").val());
            $("#MEDIDA_Div").show();
        }
        else {
            alert("Seleccione primero el tipo de insumo.");
        }
    });



    var edicionrubro= 0;
    $("#btn_alta_rubro_edicion").click(function () {
        if ($("#cbo_alta_rubro").val() != -1) {
            edicionrubro = $("#cbo_alta_rubro").val();
            TraerRubro(edicionrubro);
            $("#RUBRO_Div").show();
        }
        else {
            alert("Seleccione el rubro a editar");
        }       
    });

    $("#btn_alta_rubro_nuevo").click(function () {
        edicionrubro = 0;
        $("#RUBRO_Div").show();
    });


    $("#btn_cancelar_rubro").click(function () {
        edicionrubro = 0;
        $("#txt_edicion_rubro").val("");
        $("#RUBRO_Div").hide();
    });

    $("#btn_guardar_rubro").click(function () {
        alert("btn_guardar_rubro");
        //        if ($("#txt_edicion_rubro").val() == "") { alert("Falta ingresar el rubro."); return; }

        //        var json = JSON.stringify({ "RubroId": edicionrubro, "Rubro": $("#txt_edicion_rubro").val() });
        //        $.ajax({
        //            type: "POST",
        //            data: json,
        //            url: "../Json/Quirofano/Quirofano_.asmx/QUIROFANO_EXTRA_ALTARUBRO",
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (Resultado) {
        //                var ins = Resultado.d;
        //                $("#btn_cancelar_rubro").click();
        //                CargarRubro(0, edicionrubro);
        //            },
        //            error: errores
        //        });

    });


    $("#btn_cancelar_subrubro").click(function () {
        ediciontipo = 0;
        $("#cbo_divsubrubro_rubro").val("0");
        $("#txt_insumoalta_subinsumo").val("");
        $("#SUBRUBRO_Div").hide();
    });

    $("#btn_guardar_subrubro").click(function () {        
        if ($("#txt_insumoalta_subinsumo").val() == "") { alert("Falta ingresar el tipo."); return; }

        var json = JSON.stringify({ "TipoId": ediciontipo, "RubroId": $("#cbo_insumo").val(), "Tipo": $("#txt_insumoalta_subinsumo").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/HEMODINAMIA_EXTRA_ALTATIPO",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var ins = Resultado.d;
                $("#btn_cancelar_subrubro").click();
                CargarTipo(0, $("#cbo_insumo").val(), "cbo_alta_tipo", 0);
            },
            error: errores
        });
    });



    $("#btn_cancelar_medida").click(function () {
        edicionmedida = 0;
        $("#cbo_divmedida_rubro").val("0");
        $("#cbo_divmedida_subrubro").val("0");
        $("#txt_medidaalta_medida").val("");
        $("#MEDIDA_Div").hide();
    });

    $("#btn_guardar_medida").click(function () {
        if ($("#cbo_divmedida_rubro").val() == "-1") { alert("Falta seleccionar el rubro."); return; }
        if ($("#cbo_divmedida_subrubro").val() == "-1") { alert("Falta seleccionar el tipo."); return; }
        if ($("#txt_medidaalta_medida").val() == "") { alert("Falta ingresar la medida."); return; }

        var json = JSON.stringify({ "TipoId": $("#cbo_alta_tipo").val(), "RubroId": $("#cbo_insumo").val(), "MedidaId": edicionmedida, "Medida": $("#txt_medidaalta_medida").val() });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/HEMODINAMIA_EXTRA_ALTAMEDIDA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var ins = Resultado.d;
                $("#btn_cancelar_medida").click();
                CargarMedida(0, $("#cbo_insumo").val(), $("#cbo_alta_tipo").val(), "cbo_alta_medida", 0);
            },
            error: errores
        });
    });



    function CargarRubro_Cual(RubroId, SeleccionarId, Cual) {
        alert("CargarRubro_Cual");
//        var json = JSON.stringify({ "RubroId": RubroId });
//        $.ajax({
//            type: "POST",
//            data: json,
//            url: "../Json/Quirofano/Quirofano_.asmx/QUIROFANO_EXTRA_LISTARRUBRO",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (Resultado) {
//                var lista = Resultado.d;
//                $('#' + Cual).empty();
//                $('#' + Cual).append($('<option></option>').val(-1).html("Seleccione un rubro."));

//                $.each(lista, function (index, rubro) {
//                    $('#' + Cual).append($('<option></option>').val(rubro.RubroId).html(rubro.Rubro));
//                });

//                if (SeleccionarId != "-1") {
//                    $('#' + Cual).val(SeleccionarId);                    
//                }

//            },
//            error: errores
//        });
    }

        

    function CargarTipo(TipoId, RubroId, QueCargo, SeleccionarId) {
        var json = JSON.stringify({ "RubroId": RubroId, "TipoId": TipoId });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/HEMODINAMIA_EXTRA_LISTARTIPO",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $('#' + QueCargo).empty();
                $('#' + QueCargo).append($('<option></option>').val(-1).html("Seleccione un tipo."));                
                $.each(lista, function (index, tipo) {
                    $('#' + QueCargo).append($('<option></option>').val(tipo.TipoId).html(tipo.Tipo));
                });
                if (SeleccionarId != "-1") {
                    $('#' + QueCargo).val(SeleccionarId);
                }
            },
            error: errores
        });
    }



    function CargarTipo2(TipoId, RubroId, QueCargo, SeleccionarId) {
        var json = JSON.stringify({ "RubroId": RubroId, "TipoId": TipoId });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/QUIROFANO_EXTRA_LISTARTIPO",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $('#' + QueCargo).empty();
                $('#' + QueCargo).append($('<option></option>').val(0).html("Todos los tipos."));
                $.each(lista, function (index, tipo) {
                    $('#' + QueCargo).append($('<option></option>').val(tipo.TipoId).html(tipo.Tipo));
                });
                if (SeleccionarId != "-1") {
                    $('#' + QueCargo).val(SeleccionarId);
                }
            },
            error: errores
        });
    }

    
    
    function CargarMedida(MedidaId, RubroId, TipoId, QueCargo, SeleccionarId) {
        var json = JSON.stringify({ "MedidaId": MedidaId, "RubroId": RubroId, "TipoId": TipoId });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/HEMODINAMIA_EXTRA_LISTARMEDIDA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $('#' + QueCargo).empty();
                $('#' + QueCargo).append($('<option></option>').val(-1).html("Seleccione una medida."));
                $('#' + QueCargo).append($('<option></option>').val(0).html("Sin medida"));
                $.each(lista, function (index, medida) {
                    $('#' + QueCargo).append($('<option></option>').val(medida.MedidaId).html(medida.Medida));
                });
                if (SeleccionarId != "-1") {
                    $('#' + QueCargo).val(SeleccionarId);
                }
            },
            error: errores
        });
    }


    function CargarMedida2(MedidaId, RubroId, TipoId, QueCargo, SeleccionarId) {
        var json = JSON.stringify({ "MedidaId": MedidaId, "RubroId": RubroId, "TipoId": TipoId });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/HEMODINAMIA_EXTRA_LISTARMEDIDA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $('#' + QueCargo).empty();
                $('#' + QueCargo).append($('<option></option>').val(-1).html("Todas Las medidas."));                
                $.each(lista, function (index, medida) {
                    $('#' + QueCargo).append($('<option></option>').val(medida.MedidaId).html(medida.Medida));
                });
                if (SeleccionarId != "-1") {
                    $('#' + QueCargo).val(SeleccionarId);
                }
            },
            error: errores
        });
    }


    function TraerMedida(MedidaId) {
        var json = JSON.stringify({ "MedidaId": MedidaId, "RubroId": 0, "TipoId": 0 });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/HEMODINAMIA_EXTRA_LISTARMEDIDA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $.each(lista, function (index, medida) {
                    CargarRubro_Cual(0, medida.RubroId, "cbo_divmedida_rubro");
                    CargarTipo(medida.TipoId, medida.RubroId, "cbo_divmedida_subrubro", medida.TipoId);                    
                    $('#txt_medidaalta_medida').val(medida.Medida);

                });
            },
            error: errores
        }); 
    }


    function TraerTipo(TipoId) {
        var json = JSON.stringify({ "RubroId": 0, "TipoId": TipoId });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/HEMODINAMIA_EXTRA_LISTARTIPO",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $.each(lista, function (index, tipo) {
                    $('#cbo_divsubrubro_rubro').val(tipo.RubroId);
                    $("#txt_insumoalta_subinsumo").val(tipo.Tipo);
                });               
            },
            error: errores
        });
    }


    function TraerRubro(RubroId) {
        alert("TraerRubro");
//        var json = JSON.stringify({ "RubroId": RubroId });
//        $.ajax({
//            type: "POST",
//            data: json,
//            url: "../Json/Quirofano/Quirofano_.asmx/QUIROFANO_EXTRA_LISTARRUBRO",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (Resultado) {
//                var lista = Resultado.d;
//                $.each(lista, function (index, rubro) {
//                    $('#txt_edicion_rubro').val(rubro.Rubro);
//                });               

//            },
//            error: errores
//        });
    }



    $("#cbo_alta_tipo").change(function () {
        CargarMedida(0, $("#cbo_insumo").val(), $("#cbo_alta_tipo").val(), "cbo_alta_medida", "-1");
    });



    $("#cbo_servicio").change(function () {
        ListarInsumos();
        $("#cbo_filtro_tipo").empty();
        $("#cbo_filtro_medida").empty();
    });


    $("#cbo_ortopedia").change(function () {
        $("#esortopedia").prop('checked', true);
    });




    function solo_enteros(evt) {        
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }









    function ImprimirListado() {
        INSUMOID = $("#cbo_insumo").val();
        PDESDE = "01/01/1900";
        FHASTA = "31/12/2090";
        SERVICIOID = $("#cbo_servicio").val();
        TIPOID = $("#cbo_filtro_tipo").val();
        MEDIDAID = $("#cbo_filtro_medida").val();
        if (MEDIDAID == null) { MEDIDAID = 0; }
        if (TIPOID == null) { TIPOID = 0; }

        var Sitio = '../Impresiones/Hemodinamia/ListadoInsumos.aspx?INSUMOID=' + INSUMOID + "&PDESDE=" + PDESDE + "&FHASTA=" + FHASTA + "&SERVICIOID=" + SERVICIOID + "&TIPOID=" + TIPOID + "&MEDIDAID=" + MEDIDAID;

        if ($("#ck_detallada").is(':checked')) {
            Sitio = '../Impresiones/Hemodinamia/ListadoInsumosCompleto.aspx?INSUMOID=' + INSUMOID + "&SERVICIOID=" + SERVICIOID + "&TIPOID=" + TIPOID + "&MEDIDAID=" + MEDIDAID;
        }

        $.fancybox(
        {
            'autoDimensions': false,
            'href': Sitio,
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
