var InsumoId;
var Monodroga;
var Unidad;
var Presentacion;
var Rubro;
var Laboratorio;

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



$.validator.setDefaults({
    ignore: ""
});
var ObjInsumo = Array();



function List_Medicamento_Medidas() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Medidas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicamento_Medidas_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Medicamento_Medidas_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medida) {
        $("#cbo_unidad").append($("<option></option>").val(Medida.Id).html(Medida.Medida));
        if (Medida.Id == Unidad) $("#cbo_unidad").val(Unidad);
    });

}

function List_Laboratorio() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Laboratorio_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Laboratorio_Cargado,
        error: errores,
        complete: function () { 
            $("#cbo_laboratorio").val(Laboratorio);
        }
    });
}

function List_Laboratorio_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Laboratorio) {
        $("#cbo_laboratorio").append($("<option></option>").val(Laboratorio.Id).html(Laboratorio.Laboratorio));
    });

}


function List_Depositos() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Deposito",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Depositos_Cargado,
        error: errores
    });
}

function List_Depositos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Deposito) {
        $("#cbo_deposito").append($("<option></option>").val(Deposito.Id).html(Deposito.Deposito));
    });

}

function ListaMonoDrogras() {
    var Id = 0;
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/MonoDrogas",
        data: '{Numero: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var MonoDrogas = Resultado.d;
            $('#cbo_Monodroga').empty();
            $('#cbo_Monodroga').append('<option value="0"></option>');
            $.each(MonoDrogas, function (index, mono) {
                $('#cbo_Monodroga').append(
              $('<option></option>').val(mono.numero).html(mono.nombre)
            );
                if (mono.numero == Monodroga) $('#cbo_Monodroga').val(Monodroga);
            });
        },
        error: errores
    });
}


function List_Rubros() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamentos_Rubro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rubros_Cargado,
        error: errores
    });
}

function List_Rubros_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, R) {
        $("#cbo_Rubro").append($("<option></option>").val(R.Id).html(R.Rubro));
        if (R.Id == Rubro) $("#cbo_Rubro").val(Rubro);
    });

}

function List_Presentacion() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamento_Presentacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Presentacion_Cargado,
        error: errores
    });
}

function List_Presentacion_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, P) {
        $("#cbo_Presentacion").append($("<option></option>").val(P.Id).html(P.Presentacion));
        if (P.Id == Presentacion) $("#cbo_Presentacion").val(Presentacion);
    });

}

$(document).ready(function () {


    List_Depositos();
    $("#fecha_compra").datepicker();
    $("#fechavto").datepicker();
    $("#btnEliminar").hide();
    $("#frm_").validate({
        rules: {
            'insumo': { required: true },
            'unidadblister': { required: true, number: true, range: [1, 99] },
            'stockmin': { required: true, number: true, range: [-99999, 99999] }
        },
        messages: {
            'insumo': { required: '' },
            'unidadblister': { required: '', number: '', range: '' },
            'stockmin': { required: '', number: '', range: '' }
        },
        showErrors: function (errorMap, errorList) {
            // Nada
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            var msj = 'Errores: \n';
            for (var i = 0; i < list.length; i++) {
                msj = msj + $(list[i]).attr("rel") + "\n";
            }
            alert(msj);
        }

    });

    var queryObj = {};
    queryObj = GetQueryString();
    if (queryObj['id'] != null) {
        InsumoId = queryObj['id'];
        LoadInsumo(queryObj['id']);
        $("#btnEliminar").show();
        $("#btnAgregar").html('<i class=" icon-ok icon-white"></i>&nbsp;Modificar');
    }
    else {
        List_Rubros();
        List_Presentacion();
        ListaMonoDrogras();
        List_Medicamento_Medidas();
        List_Laboratorio();
    }
});

function LoadInsumo(IdInsumo) {
    $.ajax({
        type: "POST",
        data: '{Id: ' + IdInsumo + '}',
        url: "../Json/Farmacia/Farmacia.asmx/Insumos_List_byId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insumos_List_byId_Cargado,
        error: errores,
        complete: function () {
            List_Rubros();
            List_Presentacion();
            List_Laboratorio();
            ListaMonoDrogras();
            List_Medicamento_Medidas();
        }
    });
}


function Insumos_List_byId_Cargado(Resultado) {
    var ObjInsumo = Resultado.d;
    if (ObjInsumo.REM_APE == 'S') { $("#ape").attr("checked", "checked"); }
    if (ObjInsumo.REM_FACT == 'S') { $("#factura").attr("checked", "checked"); }
    if (ObjInsumo.REM_BAJA == 'S') { $("#baja").attr("checked", "checked"); }
    if (ObjInsumo.CRequiereAuto == 'S') { $("#auto").attr("checked", "checked"); }
    if (ObjInsumo.REM_TRAZABILIDAD == 1) { $("#traza").attr("checked", "checked"); }
    if (ObjInsumo.REM_MULTIDOSIS == "S") { $("#multidosis").attr("checked", "checked"); }
    if (ObjInsumo.CTrazabilidad == true) $("#traza").attr("checked", "checked");
    if (ObjInsumo.ELIMINADO == true) $("#Eliminado").attr("checked", "checked");

    if (ObjInsumo.CRequiereAuto == true) $("#auto").attr("checked", "checked");

    $("#insumo").val(ObjInsumo.REM_NOMBRE);
    $("#desc").val(ObjInsumo.REM_DESC_COMP);
    $("#gramaje").val(ObjInsumo.REM_GRAMAJE);
    Unidad = ObjInsumo.REM_UNIDADES_ID;

    Presentacion = ObjInsumo.REM_PRESENTACION_ID;
    Monodroga = ObjInsumo.MONODROGA;
    Laboratorio = ObjInsumo.LAB_ID;
    Rubro = ObjInsumo.REM_RUBRO_ID;

    $("#precio_fact").val(PrecioDec(ObjInsumo.REM_PRECIO));
    //$("#precio_compra").val(PrecioDec(ObjInsumo.REM_PRECOMPRA));
    //$("#cbo_deposito").val(ObjInsumo.STO_DEP_ID);
    //$("#lote").val(ObjInsumo.NROLOTE);
    //$("#serie").val(ObjInsumo.NROSERIE);
    $("#unidadblister").val(ObjInsumo.CANT_BLISTER);
    //$("#fecha_compra").val(ObjInsumo.REM_FECHA_VIGENCIA_PRECIO.substring(0, 10));
    $("#stockmin").val(ObjInsumo.STO_MINIMO);
    //$("#stockactual").val(ObjInsumo.STO_CANTIDAD);
    //$("#fechavto").val(ObjInsumo.STO_VENCIMIENTO.substring(0, 10));
    $("#unidadblister").val(ObjInsumo.CANT_BLISTER);
}


function RemoveClass() {
    $("#controlinsumo").removeClass("error");
    $("#controlunidadblister").removeClass("error");
    $("#controlprecio_fact").removeClass("error");
    $("#controlprecio_compra").removeClass("error");
    $("#controlfecha_compra").removeClass("error");
    $("#controlstockmin").removeClass("error");
    $("#controlstockactual").removeClass("error");
    $("#controlfechavto").removeClass("error");
}

$("#btnAgregar").click(function () {
    var frmValid = $("#frm_").valid();
    if (frmValid) {
        RemoveClass();
        LoadData();
    }
});

$("#btnCancelar").click(function () {

    window.location = "MostrarInsumos.aspx";

});

 $("#precio_fact").blur(function () {
     var e = $("#precio_fact").val();
     if (!isNaN(Number(e)) && e != "")
         $("#precio_fact").val(parseFloat(e).toFixed(2));
 });

 function PrecioDec(e) {
     if (!isNaN(Number(e)) && e != "")
         return parseFloat(e).toFixed(2);
 }

 $("#precio_compra").blur(function () {
     var e = $("#precio_compra").val();
     if (!isNaN(Number(e)) && e != "")
         $("#precio_compra").val(parseFloat(e).toFixed(2));
 });

 function LoadData() {

     ObjInsumo = {};

     if ($("#ape").attr("checked") == "checked") { ObjInsumo.REM_APE = 'S'; ObjInsumo.CAPE = true; }
     else { ObjInsumo.REM_APE = 'N'; ObjInsumo.CAPE = false; }

     if ($("#factura").attr("checked") == "checked") { ObjInsumo.REM_FACT = 'S'; ObjInsumo.CSeFactura = true; }
     else { ObjInsumo.REM_FACT = 'N'; ObjInsumo.CSeFactura = false; }

     if ($("#baja").attr("checked") == "checked") { ObjInsumo.REM_BAJA = 'S'; ObjInsumo.CDadodeBaja = true; }
     else { ObjInsumo.REM_BAJA = 'N';ObjInsumo.CDadodeBaja = false; }


     if ($("#auto").attr("checked") == "checked") { ObjInsumo.CRequiereAuto = 'S'; }
     else { ObjInsumo.CRequiereAuto = 'N'; }

     if ($("#traza").attr("checked") == "checked") ObjInsumo.CTrazabilidad = true;
     else ObjInsumo.CTrazabilidad = false;

     if ($("#multidosis").attr("checked") == "checked") ObjInsumo.REM_MULTIDOSIS = 'S';
     else ObjInsumo.REM_MULTIDOSIS = 'N';

     if ($("#Eliminado").is(":checked")) ObjInsumo.ELIMINADO = true;
     else ObjInsumo.ELIMINADO = false;

     ObjInsumo.REM_NOMBRE = $("#insumo").val().trim().toUpperCase();
     if ($("#cbo_laboratorio :selected").text().length > 0)
         ObjInsumo.REM_DESC_COMP = $("#cbo_laboratorio :selected").text();
     else ObjInsumo.REM_DESC_COMP = "GENERICO";
     ObjInsumo.REM_GRAMAJE = $("#gramaje").val().trim().toUpperCase();
     ObjInsumo.REM_UNIDADES_ID = $("#cbo_unidad :selected").val();
     ObjInsumo.REM_PRESENTACION_ID = $("#cbo_Presentacion :selected").val();
     ObjInsumo.REM_RUBRO_ID = $("#cbo_Rubro :selected").val();
     ObjInsumo.REM_PRECIO = $("#precio_fact").val();
     //ObjInsumo.REM_PRECOMPRA = $("#precio_compra").val();
     //ObjInsumo.STO_DEP_ID = $("#cbo_deposito :selected").val();
     ObjInsumo.MONODROGA = $("#cbo_Monodroga :selected").val();
     //ObjInsumo.NROLOTE = $("#lote").val();
     //if ($("#serie").val() == "") ObjInsumo.NROSERIE = "0";
     //else ObjInsumo.NROSERIE = $("#serie").val();
     ObjInsumo.CANT_BLISTER = $("#unidadblister").val();
     //ObjInsumo.REM_FECHA_VIGENCIA_PRECIO = $("#fecha_compra").val();
     ObjInsumo.STO_MINIMO = $("#stockmin").val();
     //ObjInsumo.STO_CANTIDAD = $("#stockactual").val();
     //ObjInsumo.STO_VENCIMIENTO = $("#fechavto").val();
     ObjInsumo.CANT_BLISTER = $("#unidadblister").val();
     ObjInsumo.LAB_ID = $("#cbo_laboratorio :selected").val();
     var queryObj = {};
     queryObj = GetQueryString();
     if (queryObj['id'] != null) {
         ObjInsumo.REM_ID = queryObj['id'];
     }
     else ObjInsumo.REM_ID = "0";

     Medicamento_Save(ObjInsumo);
 }

 function Medicamento_Save(ObjInsumo) {
     var json = JSON.stringify({ "f": ObjInsumo });
     $.ajax({
         type: "POST",
         data: json,
         url: "../Json/Farmacia/Farmacia.asmx/Medicamento_Save",
         contentType: "application/json; charset=utf8",
         dataType: "json",
         success: Medicamento_Save_Cargado,
         error: errores
     });
  }

  function Medicamento_Save_Cargado(Resultado) {
      if (Resultado.d != -2) {
          alert("Se inserto/actualizo correctamente el insumo");
          window.location = "MostrarInsumos.aspx?Nombre=" + $("#insumo").val();
      }
      else alert("El Insumo ya existe.");
 }

 $("#btnEliminar").click(function () {
     if (confirm("Está seguro que desea eliminar el insumo?")) {
         var json = JSON.stringify({ "Id": InsumoId });
         $.ajax({
             type: "POST",
             data: json,
             url: "../Json/Farmacia/Farmacia.asmx/Insumo_Eliminado",
             contentType: "application/json; charset=utf8",
             dataType: "json",
             success: Eliminado_Cargado,
             error: errores
         });
     }
 });

 function Eliminado_Cargado(Resultado) {
     if (Resultado.d > 0) {
         alert('Insumo Eliminado Correctamente');
         window.location = "MostrarInsumos.aspx?Nombre=" + $("#insumo").val();
     }
     else alert('Error al Efectuar la Operacion');
 }