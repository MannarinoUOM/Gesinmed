var Id = 0;
var objMedicamento = Array();
var Editando = 0;
var EditandoPos = 0;
var objMedicamentos = new Array();
var objMedicamentosEliminar = new Array();
var objBorrados = new Array();
var objMedicamentos2 = {};
var OperacionId = 0;
var HuboCambio = false;

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
    Id = Query['Id'];
    if (Id > 0) {
        OperacionId = Id;
        ListaCirugia();
        Cargar_Sala_y_Cama();
        PermisoEdicion(Id);
    }


//    $(window).keydown(function (event) {
//        if (event.keyCode == 13) {
//            event.preventDefault();
//            return false;
//        }
//    });


    

    PonerFoco();

});



$("#btn_cancelear_todo").click(function () {
    if (HuboCambio == true) {
        var r = confirm("¡ATENCION!\nlos cambios realizados no se guardarán, ¿Confirma que desea perder todos los cambios?\n\nSi se generaron nuevos insumos, comuniquese con el responsable del sector a la brevedad.");
        if (r == true) {
            window.location = "Planificar-Hemodinamia.aspx?Cirugia_Id=" + Id;
        }
    }
    else      
    {
    window.location = "Planificar-Hemodinamia.aspx?Cirugia_Id=" + Id;
    }
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
        url: "../Json/Hemodinamia.asmx/ListaCirugias_Id",
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
        url: "../Json/Hemodinamia.asmx/ListaAnestesia",
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
            'href': '../Impresiones/Hemodinamia/ProtesisyOtros2.aspx?Id=' + Id,
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
                    window.location.href = "Planificar-Hemodinamia.aspx?Cirugia_Id=" + Id;
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
                HuboCambio = false;
                window.location.href = "Planificar-Hemodinamia.aspx?Cirugia_Id=" + Id;
            }
            else {
                HuboCambio = false;
                alert("Se ha guardo correctamente");
            }
        }

    }
    else { alert("Error al Guardar Protesis!!"); }
    imprimir_comprobate = false;
}

function DeleteDetalles() {
    var Insertar = true;
    var Cual = -1;

    var CantidadBorrar = 0;
    CantidadBorrar = objBorrados.length;
    if (CantidadBorrar == 'undefined') {
        CantidadBorrar = 0;
    }

    for (var i = 0; i <= CantidadBorrar - 1; i++) {
        for (var j = 0; j <= objMedicamentos.length-1; j++) {
            if (objBorrados[i].Estado == 0 && objBorrados[i].CodigoBarra == objMedicamentos[j].CodigoBarra && objMedicamentos[j].Estado == 1) {                
                Insertar = false;                            
            }
        }
                
        //if (Insertar && objBorrados[i].Nuevo == 0) {
        if (Insertar) {
                Cual = Cual + 1;
                var objMedicamentoEliminar = {};
                objMedicamentoEliminar.CodigoBarra = objBorrados[i].CodigoBarra;
                objMedicamentoEliminar.operacion_Id = objBorrados[i].operacion_Id;
                objMedicamentosEliminar[Cual] = objBorrados[i];                
        }
        Insertar = true;
    }       
    
    var json = JSON.stringify({ "ObjetosEliminar": objMedicamentosEliminar });
    
    $.ajax({
        type: "POST",
        url: "../Json/Hemodinamia.asmx/Hemodinamia_Extra_Protesis_Borrar_Det",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarCab,
        error: errores
    });
}

function GuardarCab(Resultado) {
    objBorrados = [];
    objMedicamentosEliminar = [];     
    var r = Resultado.d;
    if (r > 0) {
        var p = {};
        p.id = OperacionId;
        p.servicio = "0";
        p.ortopedia = "0";
        p.observaciones = $("#txt_observaciones").val();                             
        p.material = false;
        
        var json = JSON.stringify({ "p": p });
        $.ajax({
            type: "POST",
            url: "../Json/Hemodinamia.asmx/Guardar_Protesis_Cab",
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
            url: "../Json/Hemodinamia.asmx/Hemodinamia_Extra_Protesis_Guardar_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Impresion,
            error: errores
        });
    //}
    }





    $("#btnAgregarMedicamento").click(function () {
        if ($("#txt_codigobarra").val() != "") {
            HuboCambio = true;
            CargarxCB(parseInt($("#txt_codigobarra").val()));
        }
    });




$("#btnCancelarMedicamento").click(function () {
    Editando = 0;
    EditandoPos = -1;            
    LimpiarCampos();
});

function RenderizarTabla() {
    
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width: 50px;'></th><th style='width: 100px;'>Código Barra</th><th>Insumo/Protesis</th></tr></thead><tbody>";
    var Contenido = "";
    var Eliminarhtml = "";
    // alert('paso');
    for (var i = 0; i <= objMedicamentos.length - 1; i++) {        
        //Estado = 0 es Borrado       
        if (objMedicamentos[i].Estado == 1) {
            unaObservacion = "";
            if (objMedicamentos[i].Observacion != "") {
                unaObservacion = "<br/><b>Comentario: </b>" + objMedicamentos[i].Observacion;
            }
            
            if (PermisoEliminar) {
                Eliminarhtml = "<a id='Eliminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a>";
            }
            else {
                Eliminarhtml = "";
            }
            Contenido = Contenido + "<tr><td>" + Eliminarhtml + "</td><td> " + objMedicamentos[i].CodigoBarra + " </td><td> " + objMedicamentos[i].Nombre + unaObservacion + "</td></tr>";
        }

    }

    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}


function Eliminar(Nro) {
    HuboCambio = true;
    objMedicamentos[Nro].Estado = 0;
    var cant = 0;
    if (objBorrados.length != 'undefined') {
        cant = objBorrados.length;
    }    
    objBorrados[cant] = objMedicamentos[Nro];    
    RenderizarTabla();
    //objMedicamentos = $.grep(objMedicamentos, function (value) {return value.Estado != 0; });    
}

function LimpiarCampos() {    
    $("#txt_codigobarra").val("");
    //$("#cbo_insumo").val("-1");
    $("#txt_codigobarra").focus();
}

function LimpiarAlta() {
    $("#cbo_nuevo_insumo").val("0");
    $("#cbo_alta_tipo").val("-1");
    $("#cbo_alta_medida").val("-1");
    $("#cbo_alta_marca").val("0");
    $("#cbo_alta_servicio").val("0");
    $("#cbo_ortopedia").val("0");
    $("#txt_alta_fvencimiento").val("");
    $("#txt_cantidad").val("");
    $("#txt_alta_observacion").val("");
}

function CargarProtesis() {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Hemodinamia.asmx/Protesis_CAB",
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
        //$("#txt_servicio").val(p.servicio);        
        $("#txt_observaciones").val(p.observaciones);
        $("#CargadoDiagnostico").html(p.diagnostico);

        var json = JSON.stringify({ "CirugiaID": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Hemodinamia.asmx/Hemodinamia_Extra_Protesis_Lista_Det",
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width:50px;'></th><th style='width:100px;'>Código Barra</th><th>Protesis/Insumo</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    var Eliminarhtml = "";
    $.each(Lista, function (index, p) {

        elcomentario = "";
        if (p.comentario != "") {
            elcomentario = "<br/><b>Comentario:</b> " + p.comentario;
        }
        var Marca = "";
        if (p.marca != "") {
            Marca = " (" + p.marca + ")";
        }
        if (PermisoEliminar) {
            Eliminarhtml = "<a id='Eliminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a>";
        }
        else {
            Eliminarhtml = "";
        }
        Contenido = Contenido + "<tr><td>" + Eliminarhtml + "</td><td>" + p.codigobarra + "</td><td> " + p.nombre + " " + p.tipo + " " + p.medida + p.marca + elcomentario + "</td></tr>";
        objMedicamento = {};

        objMedicamento.Nombre = p.nombre + " " + p.tipo + " " + p.medida + p.marca;
        objMedicamento.Observacion = p.comentario;
        objMedicamento.Nuevo = 0;
        objMedicamento.CodigoBarra = p.codigobarra;
        objMedicamento.Operacion_Id = Id;

        objMedicamentos[i] = objMedicamento;
        objMedicamentos2[i] = objMedicamento;
        objMedicamentos[i].Estado = 1;
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

//function ListarTodosInsumos(Cual) {
//    $.ajax({
//        type: "POST",
//        url: "../Json/Quirofano/Quirofano_.asmx/INSUMO_EXTRA_LISTARTODOS",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (Resultado) {
//            var lista = Resultado.d;
//            $('#cbo_insumo').empty();
//            $('#cbo_insumo').append($('<option></option>').val("-1").html("Seleccione un insumo"));
//            $.each(lista, function (index, Tipo) {
//                $('#cbo_insumo').append($('<option></option>').val(Tipo.codigo).html(Tipo.nombre + " - [" + Tipo.codigo + "]"));
//            });
//            if (Cual != 0) {
//                $('#cbo_insumo').val(Cual);
//                $("#txt_codigobarra").val(Cual);
//                $("#btnAgregarMedicamento").click();
//            }
//        },
//        error: errores
//    });
//}

//ListarTodosInsumos(0);


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






//Permiso Guardado
PermisoEdicion_PuedoGuardar = true;
PermisoEdicion_dias = "";

function PermisoEdicion(Cirugia_id) {
    var json = JSON.stringify({ "CirugiaId": Cirugia_id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/TengoPermisoEdicion",
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





$("#btn_noestaenlista").click(function () {
    $("#INSUMOALTA_Div").show();
});

$("#btnNuevoMedicamento").click(function () {
    $("#ALTA_Div").show();
});

$("#btn_cancelar_insumo").click(function () {
    EditandoNombre = 0;
    $("#INSUMOALTA_Div").hide();
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





function PonerFoco() {
    setTimeout(function () { $("#txt_codigobarra").focus(); }, 500);    
}

$("#btn_servicio_nuevo").click(function () {
    EdicionServicio = 0;
    $("#txt_servicioalta_nombre").val("");
    $("#txt_servicioalta_abreviatura").val("");
    $("#SERVICIO_Div").show();
});

$("#btn_cancelar_servicio").click(function () {
    EdicionServicio = 0;
    $("#txt_servicioalta_nombre").val("");
    $("#txt_servicioalta_abreviatura").val("");
    $("#SERVICIO_Div").hide();
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

$("#btn_alta_cancelar").click(function () {
    $("#ALTA_Div").hide();
    LimpiarAlta();
});

function LimpiarAlta() {
    $("#cbo_nuevo_insumo").val("0");
    $("#cbo_alta_tipo").val("-1");
    $("#cbo_alta_medida").val("-1");
    $("#txt_cantidad").val("");
    $("#cbo_alta_servicio").val("0");
    $("#cbo_alta_marca").val("0");
    $("#esuom").prop('checked', false);
    $("#esortopedia").prop('checked', false);    
    $("#cbo_ortopedia").val("0");
    $("#txt_alta_fvencimiento").val("");
    $("#txt_alta_observacion").val("");
    
}

$("#btn_cancelar_ortopedia").click(function () {
    EdicionOrtopedia = 0;
    $("#txt_ortopediaalta_nombre").val("");
    $("#ORTOPEDIA_Div").hide();
});


var EdicionOrtopedia = 0;
$("#btn_ortopedia_alta").click(function () {
    EdicionOrtopedia = 0;
    $("#ORTOPEDIA_Div").show();
});


$("#btn_guardar_insumo").click(function () {
    var json = JSON.stringify({ "InsumoId": $("#cbo_nuevo_insumo").val(), "Nombre": $("#txt_insumoalta_insumo").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_CREAR_NOMBRE_AUTOMATICO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#INSUMOALTA_Div").hide();
            EditandoNombre = 0;
            $("#txt_insumoalta_insumo").val("");
            $("#txt_insumoalta_stockminimo").val("");
            //$("#cbo_insumo").val(0);
            ListarInsumos();
        },
        error: errores
    });
});



function ListarInsumos() {
    var json = JSON.stringify({ "EspecialidadID": 0, "NoStock": true });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_LISTAR",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_nuevo_insumo').empty();
            $('#cbo_nuevo_insumo').append($('<option></option>').val(0).html("Seleccione un insumo."));
            $.each(lista, function (index, insu) {
                $('#cbo_nuevo_insumo').append($('<option></option>').val(insu.id).html(insu.nombre));
            });

        },
        error: errores
    });
}


$("#btn_guardar_servicio").click(function () {
    GuardarServicio();
});


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
            $('#cbo_alta_servicio').append($('<option></option>').val(0).html("Seleccione un Servicio."));
            $.each(lista, function (index, serv) {
                $('#cbo_alta_servicio').append($('<option></option>').val(serv.id).html(serv.descripcion));
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


$("#btn_guardar_ortopedia").click(function () {
    GuardarOrtopedia();
});

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

ListarOrtopedias();
ListarServicios();
ListarInsumos();


$("#txt_alta_fvencimiento").datepicker({ minDate: 0 });

$("#btn_alta_guardar").click(function () {
    if ($("#cbo_nuevo_insumo").val() == 0) { alert("Seleccione el insumo."); return; }
    if ($("#cbo_alta_tipo").val() == -1) { alert("Seleccione un tipo."); return; }
    if ($("#cbo_alta_medida").val() == -1) { alert("Seleccione una medida."); return; }
    if ($("#cbo_alta_servicio").val() == 0) { alert("Seleccione el servicio."); return; }
    if ($("#cbo_ortopedia").val() == 0) { alert("Seleccione la ortopedia."); return; }
    //if ($("#txt_alta_fvencimiento").val() == "") { alert("Seleccione la fecha de vencimiento"); return; } 
    var esuom = false;
    if ($("#txt_cantidad").val() == "") { alert("Ingrese una cantidad."); return; }

    if ($("#cbo_nuevo_insumo option:selected").text() == "PROVISORIO") {
        if ($("#txt_alta_observacion").val() == "") { alert("Es necesario ingresar la descripión del insumo ingresado."); return; }
    }

    //var json = JSON.stringify({ "InsumoId": $("#cbo_nuevo_insumo").val(), "Servicio": $("#cbo_alta_servicio").val(), "EsUOM": esuom, "OrtopediaId": $("#cbo_ortopedia").val(), "FV": $("#txt_alta_fvencimiento").val(), "Cantidad": $("#txt_cantidad").val(), "Movimiento": 0, "Observacion": $("#txt_alta_observacion").val(), "TipoId": $("#cbo_alta_tipo").val(), "MedidaId": $("#cbo_alta_medida").val(), "MarcaId": $("#cbo_alta_marca").val() });
    var json = JSON.stringify({ "InsumoId": $("#cbo_nuevo_insumo").val(), "Servicio": $("#cbo_alta_servicio").val(), "EsUOM": esuom, "OrtopediaId": $("#cbo_ortopedia").val(), "FV": "01/01/1900", "Cantidad": $("#txt_cantidad").val(), "Movimiento": 0, "Observacion": $("#txt_alta_observacion").val(), "TipoId": $("#cbo_alta_tipo").val(), "MedidaId": $("#cbo_alta_medida").val(), "MarcaId": $("#cbo_alta_marca").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_INSERTAR_AUTOMATICO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;

            $.each(lista, function (index, ins) {
                var Estado = 1;
                var Cual = objMedicamentos.length;
                objMedicamento = {};
                objMedicamento.Nombre = ins.nombre + " " + ins.stipo + " " + ins.smedida;
                objMedicamento.Observacion = ins.comentario;
                objMedicamento.CodigoBarra = ins.codigo;
                objMedicamento.Nuevo = 1;
                objMedicamento.Estado = Estado;
                objMedicamento.operacion_Id = OperacionId;
                objMedicamentos[Cual] = objMedicamento;
                Editando = 0;
                EditandoPos = -1;
            });

            RenderizarTabla();
            LimpiarCampos();
            LimpiarAlta();
            $("#ALTA_Div").hide();
        },
        error: errores
    });

});


$("#btn_insumo_editar").click(function () {
    if ($("#cbo_nuevo_insumo").val() == "0") {
        alert("Falta seleccionar el insumo a editar el nombre");
        return;
    }
    EditandoNombre = $("#cbo_nuevo_insumo").val();
    $("#INSUMOALTA_Titulo").html("Edición de insumo");
    CargarInsumo();
});



function CargarInsumo() {
    var json = JSON.stringify({ "ID": $("#cbo_nuevo_insumo").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_CARGARINSUMO_X_ID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var insu = Resultado.d;
            $('#txt_insumoalta_insumo').val(insu.nombre);            
            $("#INSUMOALTA_Div").show();
        },
        error: errores
    });
}



$("#txt_codigobarra").keydown(function (event) {
    if (event.keyCode == 13) {
        if ($("#txt_codigobarra").val() != "") {
            HuboCambio = true;
            CargarxCB(parseInt($("#txt_codigobarra").val()));
        }
        event.preventDefault();
        return false;
    }
});



function CargarxCB(CB) {
    EditandoCodigoBarra = CB;
    var json = JSON.stringify({ "CodBar": CB });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADO",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ins = Resultado.d;

            if (ins.nombre == null) {
                alert("Insumo no encontrado");
                return;
            }

            $("#span_alta_insumo").html(ins.nombre);
            $("#cbo_alta_servicio").val(ins.ServicioID);
            $("#span_codigo").html(CB);


            //if ($("#cbo_insumo").val() == "-1") {
            //    return;
            //}

            CodigoBarra = CB;

            for (var i = 0; i <= objMedicamentos.length - 1; i++) {
                if (objMedicamentos[i].Estado == 1 && objMedicamentos[i].CodigoBarra == CodigoBarra) {
                    alert("El insumo ya está en la lista.");
                    LimpiarCampos();
                    return;
                }

            }

            var Estado = 1;
            var Cual = objMedicamentos.length;
            objMedicamento = {};

            var marca = "";
            if (ins.smarca != "") {
                marca = " (" + ins.smarca + ")";
            }

            objMedicamento.Nombre = ins.nombre + " " + ins.stipo + " " + ins.smedida + marca;
            objMedicamento.Observacion = ins.observacion;
            objMedicamento.CodigoBarra = CodigoBarra;
            objMedicamento.Nuevo = 1;
            objMedicamento.Estado = Estado;
            objMedicamento.operacion_Id = OperacionId;
            objMedicamentos[Cual] = objMedicamento;
            RenderizarTabla();
            Editando = 0;
            EditandoPos = -1;
            //$("#cbo_insumos").prop('disabled', false);
            LimpiarCampos();

        },
        error: errores
    });
}



function CargarTipo(TipoId, RubroId, QueCargo, SeleccionarId) {
    var json = JSON.stringify({ "RubroId": RubroId, "TipoId": TipoId });
    var provisorio = "16";
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Hemodinamia.asmx/QUIROFANO_EXTRA_LISTARTIPO",
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

            if ($("#cbo_nuevo_insumo option:selected").text() == "PROVISORIO") {
                $('#' + QueCargo).val(provisorio);
                CargarMedida(0, $("#cbo_nuevo_insumo").val(), $("#cbo_alta_tipo").val(), "cbo_alta_medida", 0);
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
        url: "../Json/Hemodinamia.asmx/QUIROFANO_EXTRA_LISTARMEDIDA",
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


$("#cbo_nuevo_insumo").change(function () {    

    if ($("#cbo_nuevo_insumo option:selected").text() == "PROVISORIO") {
        //$("#txt_cantidad").val("1").prop("disabled", true);
        $("#cbo_alta_tipo").empty();
        $("#cbo_alta_medida").empty();
        $("#cbo_alta_marca").empty();

        $('#cbo_alta_tipo').append(new Option("PROVISORIO", "0"));
        $('#cbo_alta_medida').append(new Option("PROVISORIO", "0"));
        $('#cbo_alta_marca').append(new Option("PROVISORIA", "0"));

        $("#cbo_alta_tipo").val("1").prop("disabled", true);
        $("#cbo_alta_medida").val("1").prop("disabled", true);
        $("#cbo_alta_marca").val("1").prop("disabled", true);
    }
    else {
        CargarTipo(0, $("#cbo_nuevo_insumo").val(), "cbo_alta_tipo", 0);
        //$("#txt_cantidad").val("").prop("disabled", false);
        $("#cbo_alta_tipo").val("").prop("disabled", false);
        $("#cbo_alta_medida").val("").prop("disabled", false);
        $("#cbo_alta_marca").val("").prop("disabled", false);
        $("txt_cantidad").val("");
    }
});

$("#cbo_alta_tipo").change(function () {
    CargarMedida(0, $("#cbo_nuevo_insumo").val(), $("#cbo_alta_tipo").val(), "cbo_alta_medida", 0);
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

$("#txt_observaciones").change(function () {
    HuboCambio = true;
});
