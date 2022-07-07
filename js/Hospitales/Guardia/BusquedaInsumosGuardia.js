var VerificarMedicamento;
var verificarId;
var existe = false;

$(document).ready(function () {
//    alert("entro ready");
//    parent.$("#PecrioUOM").val("");
//    parent.$("#PrecioOS").val("");
//    parent.$("#Nombre").val("");
//    parent.$("#CodigoKike").val("");
//    parent.$("#InsumoId").val("");
    CargarGrilla();

})

function CargarGrilla() {
    var nom = parent.$("#Nombre").val();


//    parent.$("#PecrioUOM").val("");
//    parent.$("#PrecioOS").val("");
//    parent.$("#Nombre").val("");
//    parent.$("#CodigoKike").val("");
//    parent.$("#InsumoId").val("");

//  alert("entro ajax");
    $.ajax({
  
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/GuardiaListaMedicamentosBusqueda",
        //        url: "../App_Code/ASMX/Guardia.cs/GuardiaListaMedicamentos",
        //                data: '{Nombre: "' + $("#Nombre").val() + '"}',
        data: '{Nombre: "' + nom + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //        beforeSend: antes,
        success: resultado,
        error: errores,
        beforeSend: antes,
        complete: finalizo
        //        complete: finalizo
    });
}

function resultado(Resultado) {
//alert("entro resultado");
    var Medicamento = Resultado.d;
    VerificarMedicamento = Medicamento;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    $("#tablaDeBusqueda").empty();
    //    Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>Insumo Id</th><th>Precio UOM</th><th>Precio OS</th><th>Nombre</th><th>Codigo Kike</th></tr></thead>";
    Tabla_Titulo = "<table class='table table-hover' style='width:100%;'><thead><tr><th style='width:20%'>Insumo Id</th><th>Nombre Insumo</th></tr></thead>";
//    $.each(Medicamento, function (index, Medicamento) {
//        Tabla_Datos = Tabla_Datos + "<tr onclick='editar(" + Medicamento.InsumoID + ")'; style='cursor:pointer; id=tab'><td id='med_id_" +
//        Medicamento.InsumoID + "'>" + Medicamento.InsumoID + "</td><td id='Precio_uom_" + Medicamento.InsumoID + "'>" + Medicamento.PrecioUOM + "</td><td id='Precio_os_" + Medicamento.InsumoID + "'>" + Medicamento.PrecioOS + "</td><td id='nombreId_" + Medicamento.InsumoID + "'>" + Medicamento.Nombre + "</td><td id='codigo_kike_id_" + Medicamento.InsumoID + "'>" + Medicamento.Codigo_Kike + "</td></tr>";
    //    });

    $.each(Medicamento, function (index, Medicamento) {
        Tabla_Datos = Tabla_Datos + "<tr onclick='editar(" + Medicamento.id + ")'; style ='cursor:pointer; id=tab'><td id='med_id_" + Medicamento.id + "'>" + Medicamento.id + "</td><td id='nombreId_" + Medicamento.id + "'>" + Medicamento.nombre + "</td></tr>";

    });
  
    Tabla_Fin = "</tbody></table>";
    $("#tablaDeBusqueda").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
                
//         var tf1 = setFilterGrid("tablaDeBusqueda"); 

      

}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function editar(codigo) {

    var id = $("#med_id_" + codigo).html();
//    verificarId = $("#InsumoId").val();
    var nombre = $("#nombreId_" + codigo).html();
//    var nom = $("#nombreId_" + codigo).html();
//    var precioUom = $("#Precio_uom_" + codigo).html();
//    var precioOs = $("#Precio_os_" + codigo).html();
//    var cod_kike = $("#codigo_kike_id_" + codigo).html();


    parent.$("#PecrioUOM").val("");
    parent.$("#PrecioOS").val("");
    parent.$("#Nombre").val(nombre);
    parent.$("#CodigoKike").val("");
    parent.$("#InsumoId").val(id);
    parent.$.fancybox.close();

}

function finalizo() {
//alert("entro finalizado");
    $("#cargando").hide();
    $("#tablaDeBusqueda").show();
}

function antes() {
//alert("entro antes");
    $("#cargando").show();
    $("#tablaDeBusqueda").hide();
}
