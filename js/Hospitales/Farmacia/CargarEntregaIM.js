var Pedido_Id = 0;
var Sala_Id_Aux;
var Cama_Id_Aux;
var Medico_Id;
var Servicio_Id_Aux;
var objMedicamento = Array();
var Total = -1;
var Editando = 0;
var objMedicamentos = new Array();
var objMedicamentos2 = {};
var Pendiente;
var Id_Internacion;
var NroEntrega = 0;
var Documento;
var Pend = 0;
var saldo = 0;

var Confirma = 0;
var AfiliadoId = 0;

//Modificacion//
var NroEntregaDet = 0;
var Desde;
var Hasta;
var ServId;
var row_actual = -1;
var combos = [];// para el combo de lote

//Autoseleccion en celdas//
$.fn.selectText = function () {
    var doc = document;
    var element = this[0];
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
//////////////////////////////


//AutoComplete Insumos//
var sourceArr = [];
var mapped = {};

$("#cbo_Medicamento").typeahead({
    source: sourceArr,
    updater: function (selection) {
        $("#cbo_Medicamento").val(selection); //nom
        $("#medicamentoId").val(mapped[selection]); //id
        return selection;
    },
    minLength: 4,
    items: 10
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

/////Fin AutoComplete Insumos////

$("#cbo_Medicamento").keypress(function (e) {
    if (e.keyCode == 13) {
        if (row_actual != -1) ModificarInsumo(row_actual);
    }
});

$("#btnActualizarInsumo").click(function () {
    if (row_actual != -1) ModificarInsumo(row_actual);
});

function ModificarInsumo(row) {
    var json = JSON.stringify({ "IdIndicacionMedica": Pedido_Id, "IdIMDetalle": $("#Horas" + row).data("id"), "IdInsumo": $("#medicamentoId").val().trim(),
        "Cantidad": parseFloat($("#Cantidad" + row).html().trim()), "Frecuencia": $("#Horas" + row).html().trim(), "DosisEntregada": $("#UnidadEnt"+row).html().trim(),
        "UnidadesEntregada": $("#Cantidad_aEnt" + row).html().trim()
    });
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/IM_DETALLE_UPDATE",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {

//            document.cookie = ("people", JSON.stringify(combos));
//            alert(document.cookie);

//            document.cookie.split(";").forEach(function (c) {
//                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//            });


//            document.cookie = "hola";
//            console.log(document.cookie);
//            console.log("ACA");
            combos.length = 0;
            LimpiarModificacionIns();
            LoadDetalles();
        },
        error: errores
    });
}

function LimpiarModificacionIns() {
    $("#cbo_Medicamento").val(""); //nom
    $("#medicamentoId").val(""); //id
    $("#btnActualizarInsumo").hide();
    row_actual = -1;
}


function PrintPedido() {

//   var ancho = 900;
//        var alto = 600;
//        var posicion_x = (screen.width / 2) - (ancho / 2);
//        var posicion_y = (screen.height / 2) - (alto / 2);
//        var pagina = "../Impresiones/Print_Indicacion.aspx?Id=433820&medicoId=0";
//        var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=508, height=365, top=85, left=140";
//        window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
var  colour= "red";
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Print_Indicacion.aspx?Id=' + Pedido_Id + "&medicoId=" + 0, //Pedido_Id,
            'width': '80%',
            'height': '80%',
//            'afterLoad': function(){
//        alert('running');
//        jQuery('.fancybox-skin').css('background-color',colour); // colour to 'red' for example. typo
//        $(".fancybox-skin").css('heigth',500);
//        $(".fancybox-outer").css('heigth',500);
//        $(".fancybox-inner").css('heigth',500);
//        $(this).height(500);
//        $("#viewer").height(1000);
//        $("#reajustar").click();
//   },
            'fitToView'   : false,
            'autoSize'    : false,
            'autoDimensions': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });


}

$("#reajustar").click(function(){
        $(".fancybox-skin").css('heigth',500);
        $(".fancybox-outer").css('heigth',500);
        $(".fancybox-inner").css('heigth',500);
        $(this).height(500);
});

$("#btnImprimirPedido").click(function () {
    if (Pedido_Id > 0) PrintPedido();
    else alert("Nro. de Pedido no válido.");
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


$(document).ready(function () {

    var Query = {};
    Query = GetQueryString();
    Pedido_Id = Query['Id'];
    if (Query['NroEntregaDet'] != null && Query['NroEntregaDet'] != undefined) NroEntregaDet = Query['NroEntregaDet'];

    if (Query['Pend'] != null && Query['Pend'] != undefined) Pend = 1;

    // if (Query['Pendiente'] != null && Query['Pendiente'] != undefined && Query['Pendiente'] == "2") { $("#btnEntregaRapida").hide(); };


    Desde = Query['Desde'];
    Hasta = Query['Hasta'];
    ServId = Query['ServId'];

    List_by_Monodroga(0);

    $("#btnConfirmarEntrega").attr("disabled", true);

    if (Pedido_Id > 0) {
        EstaPendiente();
        LoadPedido();
        $("#CargadoPedido").html(Pedido_Id);
        $("#btnFinalizarIM").show();
    }
    else $("CargadoFecha").html(FechaActual());



    $("#btnConfirmarEntrega").attr("disabled", "true");

});

$("#btnVolver").click(function () {
    if (Pend == 0) window.location.href = "EntregasIM.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
    else window.location.href = "PedidosPendientes.aspx";
}); 

function LoadPedido() {
    var json = JSON.stringify({"NHC": null, "Id": Pedido_Id, "Apellido": null, "Desde": null, "Hasta": null, "objBusquedaLista": null, "MedicoId": null});
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPedido_Cargado,
        error: errores,
        complete: function () {
            LoadDetalles();
            GetSala();
            $("#cargando2").hide();
            $("#cont_datospac").show();
            $('#desdeaqui').click();
        },
        beforeSend: function () {
            $("#cargando2").show();
            $("#cont_datospac").hide();
        }
    });
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
    var PError = false;


    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#afiliadoId").val(paciente.documento);
        AfiliadoId = paciente.documento;
        $("#cbo_TipoDOC").val(paciente.TipoDoc);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + Paciente.Foto);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
    });

}


function LoadPedido_Cargado(Resultado) {
    var Lista;
    Lista = Resultado.d;
    $.each(Lista, function (index, PedidoCab) {
        AfiliadoId = PedidoCab.AfiliadoId;
        $("#CargadoDNI").html(PedidoCab.Documento);
        Documento = PedidoCab.Documento;
        $("#CargadoNHC").html(PedidoCab.NHC);
        Cargar_Paciente_NHC(PedidoCab.NHC);
        $("#CargadoEntrega").html(PedidoCab.NroEntrega);

        //FEDE ESTO ES PARA LA REIMPRESION
        if ($("#CargadoEntrega").html() != "Provisorio") {
            $("#btnImprimir").show();
        }

        $("#CargadoTelefono").html(PedidoCab.Telefono);
        $("#CargadoServicio").html(PedidoCab.Servicio);
        $("#CargadoFecha").html(PedidoCab.Fecha);
        $("#CargandoMedico").html(PedidoCab.Medico);
        $("#CargandoDiag").html(PedidoCab.Diagnostico);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + PedidoCab.foto);
        $("#CargadoApellido").html(PedidoCab.Nombre);
        Sala_Id_Aux = PedidoCab.IdSala;
        Cama_Id_Aux = PedidoCab.IdCama;
        EstaInternado();
        Servicio_Id_Aux = PedidoCab.IdServicio;
        Medico_Id = PedidoCab.IdMedico;
        Id_Internacion = PedidoCab.IdInternacion;
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function EstaInternado() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Internacion_Pac_byDoc",
        data: '{Documento: "' + AfiliadoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_PacienteInt_byDocumento_Cargado,
        error: errores
    });
}

function Cargar_PacienteInt_byDocumento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null) {
        $("#CargadoCama").html(Paciente.Cama);
        $("#CargadoSala").html(Paciente.Sala);        
    }
}

function GetCama() {
    var Cama = Cama_Id_Aux;
    var Sala = Sala_Id_Aux;
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas",
        data: '{IdCama: ' + parseInt(Cama) + ', Sala: ' + parseInt(Sala) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCama_Cargado,
        error: errores
    });
}

function GetCama_Cargado(Resultado) {
    var Cama = Resultado.d;    
    $("#CargadoCama").html(Cama[0].descripcion);
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function GetSala() {
    var Sala = Sala_Id_Aux;
    var ServicioId = Servicio_Id_Aux;
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Salas",
        data: '{SalaId: ' + parseInt(Sala) + ', Servicio: ' + parseInt(ServicioId) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetSala_Cargado,
        error: errores
    });
}

function GetSala_Cargado(Resultado) {
    var Sala = Resultado.d;
    $("#CargadoSala").html(Sala[0].descripcion);
}

function LoadDetalles() {
//alert(Pedido_Id);
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/IM.asmx/BuscarIM_ENT_Det",
        data: '{Id: "' + Pedido_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#tabla").show();
            $("#cargando").hide();
        },
        success: LoadPedidoDet_Cargado,
        error: errores
    });
}

function LoadPedidoDet_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Encabezado = "<table id='tabla' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Dosis</th><th>Frec/Hs</th><th>Total Dosis</th><th>Unidades a Entregar</th><th>Dosis Entregada</th><th>Unidades Entregadas</th><th>Saldo</th><th>Unidades Stock</th><th>Imprime Etiqueta</th></tr></thead><tbody>";
    var Contenido = "";

    var insumo = 0;
    var contItems = 0; // para ingresar en el array de insumos ya que al sacar los repetidos no podia usar el index del each porque saltaba y dejaba indices en nulo
   // console.log("esto trae");
   var mostrareditar;
   var disabled;
    $.each(Detalles, function (index, Detalle) {
        // carga array para llenar combo de lote
        var opcion = {};
        var stock;
        if(Detalle.NRO_LOTE == "ENT. POR SUPERVISIÓN"){ stock = "*"; }else { stock = Detalle.Stock; }

        opcion.descripcion = stock + " - Nro. de Lote:" + Detalle.NRO_LOTE;
        opcion.valor = Detalle.NRO_LOTE;
        opcion.comboId = Detalle.Insumo_Id;
        opcion.VENCIMIENTO = Detalle.VENCIMIENTO;
        opcion.FEC_VENC = Detalle.FEC_VENC;
        opcion.Stock = Detalle.Stock;
        combos.push(opcion);
        // carga array para llenar combo de lote
        // se oculto por mal funcionamiento
        //$("#btnHistorial").show();

        //console.log(combos);

        var check = "checked";
        if (!Detalle.Etiqueta) check = "";

        if (Detalle.Cantidad_aEnt == 0) check = "checked";
        if(Detalle.Saldo < 0) { mostrareditar = "style='display:none'"; disabled = "disabled='disabled'"; } else { mostrareditar = ""; disabled = ""; }


        // alert(Detalle.CantEnt);
        if (Detalle.Insumo_Id != 0) { //Es Insumo    
            if (insumo != Detalle.Insumo_Id) {// se fija si trae repetido el insumo(por el combo agregado de lote), para no generar filas demas
                insumo = Detalle.Insumo_Id;
                //antees tenia el index del each pero jodia al recorrer en la funcion ObtenerGramaje
                Contenido = Contenido + "<tr data-index='" + contItems + "' id='row" + Detalle.DetalleId + "'><td><a id='Editar" + Detalle.DetalleId + "' onclick='Editar(" + Detalle.DetalleId + ");' class='btn btn-mini' rel='tooltip' title='Editar' "+ mostrareditar +"><i class='icon-edit'></i></a></td>" +
            "<td style='display:none;' id='InsumoId" + Detalle.DetalleId + "'>" + Detalle.Insumo_Id + "</td>" +
            "<td id='Nombre" + Detalle.DetalleId + "'>" + Detalle.Nombre + " " + Detalle.Gramaje + Detalle.Medida + " - " + Detalle.Presentacion + "</td>" +
            "<td class='editable Cantidad' id='Cantidad" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable> " + parseFloat(Detalle.Cantidad) + " </td>" +
            "<td class='editable Horas' id='Horas" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable>" + Detalle.Horas + " </td>" +
            "<td class='editable Total' id='Total" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable>" + parseFloat(Detalle.Total).toFixed(2) + " </td>" +
            "<td class='editable Unidad_aEnt' id='Unidad_aEnt" + Detalle.DetalleId + "' data-id=" + Detalle.DetalleId + " contenteditable>" + parseFloat(Detalle.Unidad_aEnt).toFixed(2) + "</td>" +
            "<td id='UnidadEnt" + Detalle.DetalleId + "' class='editable UnidadEnt' data-id='" + Detalle.DetalleId + "' contenteditable>" + parseFloat(Detalle.UnidadEnt).toFixed(2) + "</td>" +
            "<td id='Cantidad_aEnt" + Detalle.DetalleId + "' class='editable Cantidad_aEnt' data-id='" + Detalle.DetalleId + "' contenteditable>" + Detalle.Cantidad_aEnt + "</td>" + // unidades entregadas
            "<td id='Saldo" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "'>" + parseFloat(Detalle.Saldo).toFixed(2) + " </td>" + // saldo
            "<td><select style='width:100px' class='combo' id='cbo_" + Detalle.Insumo_Id + "' multiple='multiple'  "+ disabled +" ></select></td>" + // select lote
            "<td><input id='chk_Etiqueta" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' data-index='" + contItems + "' class='et_check' type='checkbox' " + check + "/></td>" + //check impresion
                /// aca
            "<td id='Uni_Ini" + Detalle.DetalleId + "' style='display:none'>" + Detalle.Cantidad_aEnt + "</td>" +
            "<td id='Unidad_aEnt" + Detalle.DetalleId + "' style='display:none'>" + Detalle.Unidad_aEnt + "</td>" +

            "</tr>";

                //   alert("carga insumo: " + contItems);
                //Detalle.Saldo = Saldo;
                Detalle.Cant_Ini = Detalle.UnidadEnt;
                Detalle.Uni_Ini = Detalle.Cantidad_aEnt;
                Detalle.Unidad_aEnt_Original = Detalle.Unidad_aEnt; //Para cant. dias
                Detalle.Total_Original = Detalle.Total; //Para cant. dias
                Detalle.NRO_LOTE_ARRAY = null;// una vez cargado el lote del insumo en array de los combos de lotes lo limpio para hacer la validacion de seleccion de lote al guardar 
                objMedicamentos[contItems] = Detalle; // carga el array de medicamentos con lo que trae del pedido de la base de datos para guardar despues
                objMedicamentos[contItems].Estado = 1;
                contItems += 1;
                //    alert("carga insumo: " + contItems);


                saldo = (parseFloat(saldo) + parseFloat(Detalle.Saldo));
                saldo = parseFloat(saldo).toFixed(2);
                 //alert(saldo);
                // alert(saldo + aux);
                // var a = 2.23456;
                // var b = 2.23456;
                // a = parseFloat(a);
                // b = parseFloat(b);
                //  alert (a + b);
                //                var c = c.toFixed(2);
                //                alert(c);
            }
        }
        else { //Es Indicacion
            insumo = Detalle.Insumo_Id;

            Contenido = Contenido + "<tr><td>&nbsp;</td><td> *" + Detalle.Indicacion + " </td><td> " + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + "</td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>&nbsp;</th></tr>";

            //Detalle.Saldo = Saldo;
            Detalle.Cant_Ini = Detalle.UnidadEnt;
            Detalle.Uni_Ini = Detalle.Cantidad_aEnt;
            Detalle.Unidad_aEnt_Original = Detalle.Unidad_aEnt; //Para cant. dias
            Detalle.Total_Original = Detalle.Total; //Para cant. dias
            objMedicamentos[contItems] = Detalle; // carga el array de medicamentos con lo que trae del pedido de la base de datos para guardar despues
            objMedicamentos[contItems].Estado = 1;
            contItems += 1;
            // alert("carga indicacion: " + contItems);

        }

    });

    var Pie = "</tbody></table>";
    $("#tabla").html(Encabezado + Contenido + Pie);

    //objMedicamentos.NRO_LOTE_ARRAY = combos;
    //alert(saldo);
   // if (saldo <= 0) { $("#btnConfirmarEntrega").attr("disabled", true); }
//llena el combo de lote con el array cargado anteriormente
    $.each(combos, function (index, item) {
        //
        //if (item.comboId == 147) { alert(item.valor); }
        
        switch (item.VENCIMIENTO) {
            case "1":
                $("#cbo_" + item.comboId).append('<option data-vencimiento="1" style="background-color:#2B2929; color:white" value="' + item.valor + '">' + item.descripcion + ' * ' + item.FEC_VENC + '</option>');
                break;
            case "180":
                $("#cbo_" + item.comboId).append('<option style="background-color:#F73409" value="' + item.valor + '">' + item.descripcion + ' * ' + item.FEC_VENC + '</option>');
                break;
            case "181":
                $("#cbo_" + item.comboId).append('<option  value="' + item.valor + '">' + item.descripcion + ' * ' + item.FEC_VENC + '</option>');
                break;
        }
    });

    //llena el combo de lote con el array cargado anteriormente
   // alert(saldo);
   // console.log(objMedicamentos);
    $(".combo").multiselect({

        nonSelectedText: 'Elija lote',
        nSelectedText: 'Seleccionados',
        allSelectedText: 'Todos',
        numberDisplayed: '1',
        buttonWidth: '100px'

    });

   
   $('.combo').change(function () {
   //alert();
   var id = $(this).attr('id').replace("cbo_","");
   var idCompleto = $(this).attr('id');

   const found =  objMedicamentos.find(element => element.Insumo_Id == id);

   var index = objMedicamentos.findIndex(element => element.Insumo_Id == id);
        
   found.NRO_LOTE_ARRAY = $(this).val();

   objMedicamentos[index] = found;
   console.log("despues");
   console.log(objMedicamentos);
   });

   console.log("antes");
   console.log(objMedicamentos);
}


//NO FUNCIONA EL LIVE CON LA NUEVA VERSION DEL SCRIPT
//$(".combo").live('change', function () {
//    //alert($($(this).attr('id') + ' option:selected').val());
//    var id = $(this).attr('id');
//    if ($("#" + id + " option:selected").data('vencimiento') == 1) { alert("Este lote está vencido"); }
//});



//$(".combo").live('click', function () {
//    var id = $(this).attr('id');
////alert($("#" + id + ' option:selected').data('vencimiento'));
////    
////    if ($("#" + id + " option:selected").data('vencimiento') == 1) { alert("Este lote está vencido"); }
//});


/////////Eventos de tabla/////////

$(document).on('focus', '.editable', function () {
    $(this).selectText();
});

$(document).on('click', '.et_check', function () {
    var id = $(this).data("id");
    var index = $(this).data("index");
   // alert(index);
   // alert(id);
    console.log(objMedicamentos);
    objMedicamentos[index].Etiqueta = $("#chk_Etiqueta" + id).is(":checked");
});

$(document).on('keydown', '.editable', function (e) {
    //Ver si lo ingresado es numero y maxima longitud de campo = 5//
    if (e.keyCode == 8) return; //Permitir Borrar

    if ($(this).html().trim().length >= 9) e.preventDefault();

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110,190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    /////
});

$(document).on('focusout', '.Cantidad', function (e) {
    var id = $(this).data("id");
    CalcularUnidades(id);
});

$(document).on('focusout', '.Horas', function (e) {
    var id = $(this).data("id");
    CalcularUnidades(id);
});

/////////////////////////////////////////////////////

function CalcularDosis(id) {
    var gramaje = ObtenerGramaje(id);
    //alert("gramaje: " + gramaje);
    var Cantidad_aEnt = parseFloat($("#Cantidad_aEnt" + id).html());
    //alert("Cantidad_aEnt: " + Cantidad_aEnt);
    var dosis_aEnt = parseFloat(Cantidad_aEnt.toFixed(2) * gramaje); //dosis entregada
    //alert("dosis_aEnt: " + dosis_aEnt);
    $("#UnidadEnt" + id).html(dosis_aEnt);
    //alert("Total: " + $("#Total" + id).html());
    $("#Saldo" + id).html(parseFloat($("#Total" + id).html() - dosis_aEnt).toFixed(2));
}

$(document).on('focusout', '.Cantidad_aEnt', function (e) { //Unidades entregadas, necesito calcular dosis entregada
  // alert(saldo);
  //  if (saldo > 0) {
        var id = $(this).data("id");
        CalcularDosis(id);
        ModificarItem(id); //Actualizar campos en lista.
  //  }
    $("#mensaje").hide();
});

///////////////////////////////////////////////////////

$(document).on('focusout', '.UnidadEnt', function (e) {
    var id = $(this).data("id");
    var dosis_ent = parseFloat($(this).html()); //Dosis Entregada
   // alert(dosis_ent);
    //Calculo unidades a entregar del insumo//
    var gramaje = ObtenerGramaje(id);
    var unidades_aEnt = Math.ceil(dosis_ent.toFixed(2) / gramaje); //Unidades Entregadas
    $("#Cantidad_aEnt" + id).html(unidades_aEnt);
    $("#Saldo" + id).html(parseFloat($("#Total" + id).html() - dosis_ent).toFixed(2));

    ModificarItem(id); //Actualizar campos en lista.
});


/// aca
$(document).on('focusout', '.Cantidad_aEnt', function (e) {


    //    "<td id='Uni_Ini" + Detalle.DetalleId + "'>" + Detalle.CantEnt + "</td>" +
    //    "<td id='Unidad_aEnt" + Detalle.DetalleId + "'>" + Detalle.Unidad_aEnt + "</td>" +

    console.log(objMedicamentos);

    var id = $(this).data("id");
    var cantidad_entrega = parseFloat($(this).html()); // Cantidad entrega
    var cantidad_entregada = $("#Uni_Ini" + $(this).data("id")).html(); // cantidad entregada
    var cantidad_pedida = $("#Unidad_aEnt" + $(this).data("id")).html(); // cantidad pedida

    //alert("/cantidad entrega/" + cantidad_entrega + "/cantidad entregada/" + cantidad_entregada + "/cantidad pedida/" + cantidad_pedida);

    if (cantidad_entrega < cantidad_entregada) {
        alert("Columna 'UNIDADES ENTREGADAS' sumar mentalmente las unidades entregadas con las que se van a entregar e ingresar ese valor.");
        $("#Cantidad_aEnt" + id).html(cantidad_entregada);
        $("#btnConfirmarEntrega").attr("disabled", "true");
    } else { $("#btnConfirmarEntrega").removeAttr("disabled"); }

    if (cantidad_entrega > cantidad_pedida) {
        alert("Columna 'UNIDADES ENTREGADAS' sumar mentalmente las unidades entregadas con las que se van a entregar e ingresar ese valor.");
        $("#Cantidad_aEnt" + id).html(cantidad_entregada);
        $("#btnConfirmarEntrega").attr("disabled", "true");
    } else { $("#btnConfirmarEntrega").removeAttr("disabled"); }

    if (parseInt(cantidad_entrega) == parseInt(cantidad_pedida)) { $("#btnConfirmarEntrega").removeAttr("disabled"); }

    //alert(parseInt(cantidad_entrega) + "/" + parseInt(cantidad_pedida));
});



function CalcularUnidades(id) {
    var total = $("#Cantidad" + id).html().trim() * (24 / parseFloat($("#Horas" + id).html().trim()));
    $("#Total" + id).html(total.toFixed(2));

    //Calculo unidades a entregar del insumo//
    var gramaje = ObtenerGramaje(id);
    var unidades_aEnt = Math.ceil(total.toFixed(2) / gramaje);
    $("#Unidad_aEnt" + id).html(unidades_aEnt);
}

function ObtenerGramaje(id) {
   // alert(id);
    var index = $("#row" + id).data("index");
    if (objMedicamentos[index].Gramaje == "") return 1;
    else return parseFloat(objMedicamentos[index].Gramaje).toFixed(2);
}

function Editar(row) {
    row_actual = row;
    Editando = 1;

    $("#cbo_Medicamento").val($("#Nombre" + row).html().trim());
    $("#medicamentoId").val($("#InsumoId" + row).html().trim());
    $("#btnActualizarInsumo").show();
}


///////// FIN Eventos de tabla/////////

function Eliminar(Nro) {
    objMedicamentos[Nro].Estado = 0;
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    RenderizarTabla_Modifica();
    $("#btnConfirmarEntrega").removeAttr("disabled");
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

$("#medicamentoId").change(function () {
    Get_StockbyId($('#medicamentoId').val());
});

function Get_Insumo_by_Id(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_Insumo_by_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_Insumo_by_Id_Cargado,
        error: errores
    });
}

function Get_Insumo_by_Id_Cargado(Resultado) {
    var Insumo = Resultado.d;
    if (Insumo != null) {
        $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
    }
    else $("#stock_medicamento").html('0');
}

function ModificarItem(id) {
    var index = $("#row" + id).data("index"); //Modificar lista de medicamentos a grabar en base.

    objMedicamentos[index].UnidadEnt = parseFloat($("#UnidadEnt" + id).html().trim()).toFixed(2);

    //console.log(objMedicamentos[index].UnidadEnt);

    objMedicamentos[index].Cantidad_aEnt = parseInt($("#Cantidad_aEnt" + id).html().trim());
    objMedicamentos[index].Etiqueta = $("#chk_Etiqueta" + id).is(":checked");
    objMedicamentos[index].Saldo = parseFloat($("#Saldo" + id).html().trim()).toFixed(2);
  
    if (saldo > 0) {
        $("#btnConfirmarEntrega").removeAttr("disabled"); //Habilitar boton para grabar
    }
}

// para validar si se selecciono algun lote 
function validarSeleccionLote() {
    var cont =  0;
    $.each(objMedicamentos, function (index, item) {
        //alert(objMedicamentos[index].Cantidad_aEnt + " | " + objMedicamentos[index].Uni_Ini + " | " + objMedicamentos[index].NRO_LOTE);
        //alert(objMedicamentos[index].Cantidad_aEnt  +"|"+ objMedicamentos[index].Uni_Ini);
        if ((objMedicamentos[index].Cantidad_aEnt > objMedicamentos[index].Uni_Ini) && (objMedicamentos[index].NRO_LOTE_ARRAY == null || objMedicamentos[index].NRO_LOTE_ARRAY == "")) {
            cont++;
//            alert(objMedicamentos[index].Cantidad_aEnt  +"|"+ objMedicamentos[index].Uni_Ini);
//            alert(objMedicamentos[index].NRO_LOTE_ARRAY);
//            alert(objMedicamentos[index].Saldo);
        }
    });

    if(cont > 0)
        return false;
    else
        return true;
}
// para validar si se selecciono algun lote



$("#btnConfirmarEntrega").click(function () {

    if ($("#btnConfirmarEntrega").attr("disabled") == "disabled") return false;

    if (confirm("¿Desea confirmar la entrega?")) {
   
   if(actualizarItems()){
    console.log("click");
    console.log(objMedicamentos);

    if(!validarSeleccionLote()){
    alert("Seleccione algún lote para continuar.");
    return false;}
    else{

    

        $.each(objMedicamentos, function (index, item) {

            if (objMedicamentos[index].Uni_Ini > 0) { objMedicamentos[index].Cantidad_aEnt = objMedicamentos[index].Cantidad_aEnt - objMedicamentos[index].Uni_Ini; }

            //sila cantidad entregada anteriormente es menor o igual a la que se quiere entregar ahora le pongo insumoid en 0 para que no lo inserte en la tabla desde el bll   
            //if (objMedicamentos[index].Uni_Ini >= objMedicamentos[index].Cantidad_aEnt) { objMedicamentos[index].Insumo_Id = "0"; }
            if (objMedicamentos[index].Uni_Ini >= objMedicamentos[index].Unidad_aEnt_Original) { objMedicamentos[index].Insumo_Id = "0"; }
        });


        //  if (NroEntregaDet > 0) { estaba preguntando por este valor que supuestamente recibiria por query string pero no es asi
        if (NroEntregaDet > 0) {
            DeleteItems(); //Es una modificacion
            Pendiente = true;
        }
        else {
            VerificarPendiente();
            GetNroEntregaForRemito(); //Entrega nueva 
        }
        }
    }
    }
});



function actualizarItems(){


console.log("actItem");
console.log(objMedicamentos);

       objMedicamentos.forEach(item1 =>
       
       item1.NRO_LOTE_ARRAY != null ?

       item1.NRO_LOTE_ARRAY.forEach(item2  => combos.forEach(item3 =>  item2 == item3.valor && item1.Insumo_Id == item3.comboId ? 
       
       item1.NRO_LOTE_ARRAY[item1.NRO_LOTE_ARRAY.indexOf(item2)] = item3

       : console.log("no es el item") )) : console.log("es null") );

//       console.log(combos);
//       console.log(objMedicamentos);

       return true;
}




function DeleteItems() {
    var json = JSON.stringify({ "IdIM": Pedido_Id, "NroEntregaDet": NroEntregaDet });

    alert();
    $.ajax({
        data: json,
        url: "../Json/Farmacia/IM.asmx/IM_DeleteItems_Modifica",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { //Inserto Nuevos Items
            NroEntrega = NroEntregaDet;
            var json = JSON.stringify({ "i": objMedicamentos, "Sala": Sala_Id_Aux, "Cama": Cama_Id_Aux, "Id": Pedido_Id, "Tipo": "IM", "NroEnt": NroEntregaDet });
            $.ajax({
                data: json,
                url: "../Json/Farmacia/IM.asmx/Insert_IM_Ent",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Insert_IM_Ent_Cargado,
                error: errores
            });
        },
        error: errores
    });
}


function VerificarPendiente() {
    Pendiente = false;
    for (var k = 0; k <= Total; k++) {
        if (objMedicamentos[k].Saldo > 0 && objMedicamentos[k].Insumo_Id > 0)
            Pendiente = true;
    }
}

function GetNroEntregaForRemito() {
    var json = JSON.stringify({ "IdIM": Pedido_Id });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/IM.asmx/Get_NroEntrega_for_Remito",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insert_IM_Ent,
        error: errores
    });
}

function Insert_IM_Ent(Resultado) {
    NroEntrega = Resultado.d;
    //le pone el lote selecionado a cada insumo para descontar de ese lote
//    $(".combo").each(function (index, item) {
//        var id = $(this).attr("id").replace("cbo_", "");
//        //alert($(this).val());
//        var lote = $(this).val();
//        //alert(id + "//" + lote);
//        $.each(objMedicamentos, function (index, item) {
//            //alert(objMedicamentos[index].Insumo_Id);
//            if (objMedicamentos[index].Insumo_Id == id)//INSUMO_ID
//            {
//                objMedicamentos[index].NRO_LOTE_ARRAY = lote;
//                //alert("med " + objMedicamentos[index].NRO_LOTE);
//            }
//        });
//    });

        console.log(objMedicamentos);
     //   return false;
    //le pone el lote selecionado a cada insumo para descontar de ese lote
    
    if (NroEntrega > 0) {
        var json = JSON.stringify({ "i": objMedicamentos, "Sala": Sala_Id_Aux, "Cama": Cama_Id_Aux, "Id": Pedido_Id, "Tipo": "IM", "NroEnt": NroEntrega });
        $.ajax({
            data: json,
            url: "../Json/Farmacia/IM.asmx/Insert_IM_Ent",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_IM_Ent_Cargado,
            error: errores
        });
    }
    else alert("Error al Ingresar Entrega");
}




function Insert_IM_Ent_Cargado(Resultado) {
    var json = JSON.stringify({ "Id": Pedido_Id, "Pendiente": Pendiente });
    $.ajax({
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/UpdateIMPendiente",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Print,
        error: errores
    });
    }

    function Print() {
//        alert(NroEntregaDet);
//        return false;
        var str = "";
        if (NroEntregaDet > 0) str = "&M=1";
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/EntregasIM.aspx?Id=' + Pedido_Id + "&Nro=" + NroEntrega + str,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'fitToView'   : false,
            'autoSize'    : false,
            'autoDimensions': false,
            'onClosed': function () {
                                setTimeout(function () {
                                    Imprimir_Etiq(Pedido_Id, NroEntrega,1);
                                }, 1000);
                //window.location.href = "EntregasIM.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId; //nueva entrega
            }
        });
    }

    function Imprimir_Etiq(Id, Nro, New) {
        $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/ImpresionFarmacia_Etiq.aspx?Id=' + Id + '&Nro=' + Nro + "&EsIM=1",
                    'width': '75%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'onClosed': function () {
                        if (New == 1) window.location.href = "EntregasIM.aspx"; //New = 1 nueva entrega
                    }
                });
    }

    function EstaPendiente() {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/IMPendiente",
            data: '{Id: "' + Pedido_Id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: EstaPendiente_Cargado,
            error: errores
        });
    }

    function EstaPendiente_Cargado(Resultado) {
        var EstaPendiente = Resultado.d;
        if (EstaPendiente) { //El Pedido Esta Pendiente
        /// aca
           // $("#btnConfirmarEntrega").removeAttr("disabled");
        }
    }


    $("#EntregasModal").on('show', function () {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/IM.asmx/VerHistorialEntregasIM",
            data: '{IMId: "' + $("#CargadoPedido").html() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Entregas = Resultado.d;
                var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Nro. Entrega</th><th>Fecha</th><th>Usuario</th></tr></thead><tbody>";
                var Contenido = "";
                $.each(Entregas, function (index, Entrega) {
                    Contenido = Contenido + "<tr onclick=LoadPedido_Modifica(" + Entrega.NRO_ENTREGA + ")><td>" + Entrega.NRO_ENTREGA + " </td><td> " + Entrega.FECHA + " </td><td>" + Entrega.USUARIO + " </td></tr>";
                });
                var Pie = "</tbody></table>";
                $("#TablaEntregas_div").html(Encabezado + Contenido + Pie);
            },
            error: errores
        });
    });

    function LoadPedido_Modifica(NroEntregaDet) {
        window.location = "CargarEntregaIM.aspx?Id=" + $("#CargadoPedido").html() + "&NroEntregaDet=" + NroEntregaDet + "&Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
    }

    function LoadRemito(Entrega) {
   
        $.fancybox(
                {
                    'autoDimensions': false,
                    'href': '../Impresiones/EntregasIM.aspx?Id=' + $("#CargadoPedido").html() + "&Nro=" + Entrega,
                    'width': '80%',
                    'height': '80%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'fitToView'   : false,
                    'autoSize'    : false,
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'onClosed': function () {
                        setTimeout(function () { Imprimir_Etiq($("#CargadoPedido").html(), Entrega, 0); }, 1000);
                    }
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
                    beforeSend: function () {
                        $("#stock_medicamento").html('0');
                    },
                    error: errores
                });
            }

            function Get_StockbyId_Cargado(Resultado) {
                var Insumo = Resultado.d;
                if (Insumo != null) {
                    $("#stock_medicamento").html(Insumo.STO_CANTIDAD);
                    //if (parseInt(Insumo.STO_MINIMO) > parseInt(Insumo.STO_CANTIDAD) && Nombre_Alert.length > 0) { alert("Insumo por debajo del stock mínimo."); Nombre_Alert = ""; }
                }
                else $("#stock_medicamento").html('0');
            }

//FEDE ESTO ES PARA LA REIMPRESION
$("#btnImprimir").click(function () {
    LoadRemito($("#CargadoEntrega").html());
});

//FINALIZA MANUALMENTE UNA INDICACION... PARA QUE NO QUEDE PENDIENTE...
$("#btnFinalizarIM").click(function () {
    if (confirm("¿Desea finalizar la indicación?")) {
        if (Pedido_Id > 0) {
            var json = JSON.stringify({ "Id": Pedido_Id, "Pendiente": false });
            $.ajax({
                data: json,
                url: "../Json/Farmacia/Farmacia.asmx/UpdateIMPendiente",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    alert("La indicación ha sido finalizada.");
                    window.location.href = "EntregasIM.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
                },
                error: errores
            });
        }
    }
});

$("#btnEntregaRapida").click(function () {
     if (confirm("¿Desea completar la entrega?")) Entrega_Rapida();
});

//Entrega Rapida, completa automaticamente lo pedido...
function Entrega_Rapida() {

    var seleccion = [];
    $(".combo").each(function () {
        var obj = {};
        obj.id = $(this).attr('id');
        obj.val = $(this).val();
        seleccion.push(obj);
    });

    console.log("Rapid");
    console.log(objMedicamentos);
   // combos = [];
    var Encabezado = "<table id='tabla' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Dosis</th><th>Frec/Hs</th><th>Total Dosis</th><th>Unidades a Entregar</th><th>Dosis Entregada</th><th>Unidades Entregadas</th><th>Saldo</th><th>Unidades Stock</th><th>Imprime Etiqueta</th></tr></thead><tbody>";
    var Contenido = "";
    var insumo = 0;
    var mostrareditar;
    var disabled;
    $.each(objMedicamentos, function (index, Detalle) {

        ///alert(Detalle.Insumo_Id);

        if (Detalle.Insumo_Id != 0) { //Es Insumo
            var check = "";
            Detalle.UnidadEnt = parseFloat(Detalle.Total).toFixed(2);
            Detalle.Cantidad_aEnt = Detalle.Unidad_aEnt;
            Detalle.Saldo = 0;
            Detalle.Etiqueta = true;

            if (Detalle.Etiqueta) check = "checked";

            objMedicamentos[index] = Detalle;


            // carga array para llenar combo de lote
            //            var opcion = {};
            //            opcion.descripcion = Detalle.Stock + " - Nro. de Lote:" + Detalle.NRO_LOTE;
            //            opcion.valor = Detalle.NRO_LOTE;
            //            opcion.comboId = Detalle.Insumo_Id;
            //            combos.push(opcion);
            // carga array para llenar combo de lote


            // alert(insumo+ "   "+ Detalle.Insumo_Id);

            if(Detalle.Saldo < 0) { mostrareditar = "style='display:none'"; disabled = "disabled='disabled'"; } else { mostrareditar = ""; disabled = ""; }
            if (insumo != Detalle.Insumo_Id) {// se fija si trae repetido el insumo(por el combo agregado de lote), para no generar filas demas
                insumo = Detalle.Insumo_Id;
                Contenido = Contenido + "<tr data-index='" + index + "' id='row" + Detalle.DetalleId + "'><td><a id='Editar" + Detalle.DetalleId + "' onclick='Editar(" + Detalle.DetalleId + ");' class='btn btn-mini' rel='tooltip' title='Editar' "+ mostrareditar +"><i class='icon-edit'></i></a></td><td style='display:none;' id='InsumoId" + Detalle.DetalleId + "'>" + Detalle.Insumo_Id + "</td>" +
            "<td id='Nombre" + Detalle.DetalleId + "'>" + Detalle.Nombre + " " + Detalle.Gramaje + Detalle.Medida + " - " + Detalle.Presentacion + "</td>" +
            "<td class='editable Cantidad' id='Cantidad" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable> " + parseFloat(Detalle.Cantidad) + " </td>" +
            "<td class='editable Horas' id='Horas" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable>" + Detalle.Horas + " </td>" +
            "<td class='editable Total' id='Total" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable>" + parseFloat(Detalle.Total).toFixed(2) + " </td>" +
            "<td class='editable Unidad_aEnt' id='Unidad_aEnt" + Detalle.DetalleId + "' data-id=" + Detalle.DetalleId + " contenteditable>" + parseFloat(Detalle.Unidad_aEnt).toFixed(2) + "</td>" +
            "<td id='UnidadEnt" + Detalle.DetalleId + "' class='editable UnidadEnt' data-id='" + Detalle.DetalleId + "' contenteditable>" + parseFloat(Detalle.UnidadEnt).toFixed(2) + "</td>" +
            "<td id='Cantidad_aEnt" + Detalle.DetalleId + "' class='editable Cantidad_aEnt' data-id='" + Detalle.DetalleId + "' contenteditable>" + Detalle.Cantidad_aEnt + "</td>" +
            "<td id='Saldo" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "'>" + parseFloat(Detalle.Saldo).toFixed(2) + " </td>" +
                // "<td>" + Detalle.Stock + " </td>" +
            "<td><select style='width:100px' class='combo' id='cbo_" + Detalle.Insumo_Id + "' multiple='multiple' "+ disabled +"></select></td>" +
            "<td><input id='chk_Etiqueta" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "'  data-index='" + index + "' class='et_check' type='checkbox' " + check + "/></td>" +

                                                                               //Cantidad_aEnt
            "<td id='Uni_Ini" + Detalle.DetalleId + "' style='display:none'>" + Detalle.Uni_Ini + "</td>" +
            "<td id='Unidad_aEnt" + Detalle.DetalleId + "' style='display:none'>" + Detalle.Unidad_aEnt + "</td></tr>";

            }

        }
        else { //Es Indicacion
            Contenido = Contenido + "<tr><td>&nbsp;</td><td> *" + Detalle.Indicacion + " </td><td> " + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + "</td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>&nbsp;</th></tr>";
        }
    });
    var Pie = "</tbody></table>";
    $("#tabla").html(Encabezado + Contenido + Pie);

    //llena el combo de lote con el array cargado anteriormente
    $.each(combos, function (index, item) {
       console.log(item);
        $("#cbo_" + item.comboId).append('<option value="' + item.valor + '">' + item.descripcion + ' * ' + item.FEC_VENC + '</option>');
    });
    //llena el combo de lote con el array cargado anteriormente
    // $("#btnConfirmarEntrega").removeAttr("disabled"); 
    console.log(combos);
    $("#btnConfirmarEntrega").attr('disabled', false);

    //console.log(seleccion);
    //aca
    $.each(seleccion, function (index, item) {
        //alert();
        $("#" + item.id).val(item.val); 
        //alert(item.id+"//"+item.val);
    });


        $(".combo").multiselect({
        nonSelectedText: 'Elija lote',
        nSelectedText: 'Seleccionados',
        allSelectedText: 'Todos',
        numberDisplayed: '1',
        buttonWidth: '100px'

    });



       $('.combo').change(function () {
   //alert("rapida");
   var id = $(this).attr('id').replace("cbo_","");
   var idCompleto = $(this).attr('id');

   const found =  objMedicamentos.find(element => element.Insumo_Id == id);

   var index = objMedicamentos.findIndex(element => element.Insumo_Id == id);
        
   found.NRO_LOTE_ARRAY = $(this).val();

   objMedicamentos[index] = found;
   console.log("despues");
   console.log(objMedicamentos);
   });

   console.log("antes");
   console.log(objMedicamentos);


}

////Multiplicar por dias////

$("#Cant_Dias").change(function () {
    var Cantidad_dias = parseInt($("#Cant_Dias").val().trim());
    $.each(objMedicamentos, function (index, Detalle) {
        if (objMedicamentos[index].Insumo_Id != 0) {
            objMedicamentos[index].Unidad_aEnt = objMedicamentos[index].Unidad_aEnt_Original * Cantidad_dias;
            objMedicamentos[index].Total = objMedicamentos[index].Total_Original * Cantidad_dias;
        }
    });
    RenderizarTabla();
});


function RenderizarTabla() {
    var Encabezado = "<table id='tabla' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Dosis</th><th>Frec/Hs</th><th>Total Dosis</th><th>Unidades a Entregar</th><th>Dosis Entregada</th><th>Unidades Entregadas</th><th>Saldo</th><th>Unidades Stock</th><th>Imprime Etiqueta</th></tr></thead><tbody>";
    var Contenido = "";
    var insumo = 0;
    var mostrareditar;
    var disabled;
    $.each(objMedicamentos, function (index, Detalle) {


        // carga array para llenar combo de lote
//        var opcion = {};
//        opcion.descripcion = Detalle.Stock + " - Nro. de Lote:" + Detalle.NRO_LOTE;
//        opcion.valor = Detalle.NRO_LOTE;
//        opcion.comboId = Detalle.Insumo_Id;
//        combos.push(opcion);
        // carga array para llenar combo de lote


        if (Detalle.Insumo_Id != 0) { //Es Insumo
            if (insumo != Detalle.Insumo_Id) {// se fija si trae repetido el insumo(por el combo agregado de lote), para no generar filas demas
                insumo = Detalle.Insumo_Id;
                var check = "";
                if (Detalle.Etiqueta) check = "checked";
                if(Detalle.Saldo < 0) { mostrareditar = "style='display:none'"; disabled = "disabled='disabled'"; } else { mostrareditar = ""; disabled = ""; }

                Contenido = Contenido + "<tr data-index='" + index + "' id='row" + Detalle.DetalleId + "'><td><a id='Editar" + Detalle.DetalleId + "' onclick='Editar(" + Detalle.DetalleId + ");' class='btn btn-mini' rel='tooltip' title='Editar'  "+ mostrareditar +"><i class='icon-edit'></i></a></td>" +
                "<td style='display:none;' id='InsumoId" + Detalle.DetalleId + "'>" + Detalle.Insumo_Id + "</td>" +
                "<td id='Nombre" + Detalle.DetalleId + "'>" + Detalle.Nombre + " " + Detalle.Gramaje + Detalle.Medida + " - " + Detalle.Presentacion + "</td>" +
                "<td class='editable Cantidad' id='Cantidad" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable> " + parseFloat(Detalle.Cantidad) + " </td>" +
                "<td class='editable Horas' id='Horas" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable>" + Detalle.Horas + " </td>" +
                "<td class='editable Total' id='Total" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' contenteditable>" + parseFloat(Detalle.Total).toFixed(2) + " </td>" +
                "<td class='editable Unidad_aEnt' id='Unidad_aEnt" + Detalle.DetalleId + "' data-id=" + Detalle.DetalleId + " contenteditable>" + parseFloat(Detalle.Unidad_aEnt).toFixed(2) + "</td>" +
                "<td id='UnidadEnt" + Detalle.DetalleId + "' class='editable UnidadEnt' data-id='" + Detalle.DetalleId + "' contenteditable>" + parseFloat(Detalle.UnidadEnt).toFixed(2) + "</td>" +
                "<td id='Cantidad_aEnt" + Detalle.DetalleId + "' class='editable Cantidad_aEnt' data-id='" + Detalle.DetalleId + "' contenteditable>" + Detalle.Cantidad_aEnt + "</td>" +
                "<td id='Saldo" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "'>" + parseFloat(Detalle.Saldo).toFixed(2) + " </td>" +
                "<td><select style='width:100px' class='combo' id='cbo_" + Detalle.Insumo_Id + "' multiple='multiple' "+ disabled +" ></select></td>" +
                //"<td>" + Detalle.Stock + " </td>" +
                "<td><input id='chk_Etiqueta" + Detalle.DetalleId + "' data-id='" + Detalle.DetalleId + "' data-index='" + index + "' class='et_check' type='checkbox' " + check + "/></td></tr>";
            }
        }
        else { //Es Indicacion
            Contenido = Contenido + "<tr><td>&nbsp;</td><td> *" + Detalle.Indicacion + " </td><td> " + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + "</td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>" + "" + " </td><td>&nbsp;</th></tr>";
        }
    });
    var Pie = "</tbody></table>";
    $("#tabla").html(Encabezado + Contenido + Pie);
    //llena el combo de lote con el array cargado anteriormente
    $.each(combos, function (index, item) {
        //alert(item.descripcion);
        $("#cbo_" + item.comboId).append('<option value="' + item.valor + '">' + item.descripcion + ' * ' + item.FEC_VENC + ' </option>');
    });
    //llena el combo de lote con el array cargado anteriormente

        $(".combo").multiselect({

        nonSelectedText: 'Elija lote',
        nSelectedText: 'Seleccionados',
        allSelectedText: 'Todos',
        numberDisplayed: '1',
        buttonWidth: '100px'

    });

}


$(document).on('focusin', '.Cantidad_aEnt', function (e) {
    $("#mensaje").show();
});


$("#btnCerrarPedido").click(function () {
    if (confirm("¿Desea cerrar el pedido?")) {
        if (Pedido_Id > 0) {
            var json = JSON.stringify({ "Id": Pedido_Id });
            $.ajax({
                data: json,
                url: "../Json/Farmacia/IM.asmx/CerrarIM",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    alert("El pedido ha sido cerrado!.");
                    //window.location.href = "EntregasIM.aspx?Desde=" + Desde + "&Hasta=" + Hasta + "&ServId=" + ServId;
                },
                error: errores
            });
        }
    }
});

