var VerificarMedicamento;
var verificarId;
var existe = false;

$(document).ready(function () {

    $("#Nombre").focus();
    CargarGrilla();
    $(".numero").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
})



function CargarGrilla () {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/GuardiaListaMedicamentos",
//        url: "../App_Code/ASMX/Guardia.cs/GuardiaListaMedicamentos",
//        data: '{Paciente: "' + Paciente + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: antes,
        success: resultado,
        error: errores,
        complete: finalizo
    });
}


function resultado(Resultado) { 
    var Medicamento = Resultado.d;
    VerificarMedicamento = Medicamento;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    $("#TablaMedicamentos_div").empty();
    Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>Insumo Id</th><th>Precio UOM</th><th>Precio OS</th><th>Nombre</th><th>Codigo Kike</th></tr></thead>";
    $.each(Medicamento, function (index, Medicamento) {
        Tabla_Datos = Tabla_Datos + "<tr onclick='editar(" + Medicamento.InsumoID + ")'; style='cursor:pointer; id=tab'><td id='med_id_" +
        Medicamento.InsumoID+"'>" + Medicamento.InsumoID + "</td><td id='Precio_uom_"+ Medicamento.InsumoID +"'>" + Medicamento.PrecioUOM + "</td><td id='Precio_os_"+ Medicamento.InsumoID +"'>" + Medicamento.PrecioOS + "</td><td id='nombreId_"+ Medicamento.InsumoID +"'>" + Medicamento.Nombre + "</td><td id='codigo_kike_id_"+ Medicamento.InsumoID +"'>" + Medicamento.Codigo_Kike + "</td></tr>";
    });
    Tabla_Fin = "</tbody></table>";
       $("#TablaMedicamentos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        
}   

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function editar(codigo) {

    var id = $("#med_id_" + codigo).html();
    verificarId = $("#InsumoId").val();
    var nombre = $("#nombreId_" + codigo).html();
    var precioUom = $("#Precio_uom_" + codigo).html();
    var precioOs = $("#Precio_os_" + codigo).html();
    var cod_kike = $("#codigo_kike_id_" + codigo).html();

//    alert(id +"  "+ nombre +" "+ precioUom + " " + precioOs + "" + cod_kike);

//        document.getElementById("InsumoId").value = id;
//        document.getElementById("Nombre").value = nombre;
//        document.getElementById("PecrioUOM").value = precioUom;
//        document.getElementById("PrecioOS").value = precioOs;
//        document.getElementById("CodigoKike").value = cod_kike;

    $("#InsumoId").val(id);
    $("#Nombre").val(nombre);
    $("#PecrioUOM").val(precioUom);
    $("#PrecioOS").val(precioOs);
    $("#CodigoKike").val(cod_kike);

    }

    function Actualizar() {
   

        if (verificarTextboxVacios()) {

            existe = false;
            verificarId = "";
            verificarId = $("#InsumoId").val();

            $.each(VerificarMedicamento, function (index, VerificarMedicamento) {

                if (VerificarMedicamento.InsumoID == verificarId) {

                    existe = true;
                    return existe;
                }

            });

            if (existe == false) {
                var json = JSON.stringify({ "id": $("#InsumoId").val(), "precioUOM": $("#PecrioUOM").val(), "precioOS": $("#PrecioOS").val(), "nombre": $("#Nombre").val(), "codKike": $("#CodigoKike").val() });

                $.ajax({
                    type: "POST",
                    url: "../Json/Guardia/Guardia.asmx/actualizarMedicamentos",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //        beforeSend: antes,
                    success: resultado2,
                    error: errores
                    //        complete: finalizo

                });
                CargarGrilla();

            }
            else {
//  
                if (confirm('El medicamento ya existe. Desea modificarlo?')) {

                    var json = JSON.stringify({ "id": $("#InsumoId").val(), "precioUOM": $("#PecrioUOM").val(), "precioOS": $("#PrecioOS").val(), "nombre": $("#Nombre").val(), "codKike": $("#CodigoKike").val() });
               
                    $.ajax({
                        type: "POST",
                        url: "../Json/Guardia/Guardia.asmx/actualizarMedicamentos",
                        data: json,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        //        beforeSend: antes,
                        success: resultado2,
                        error: errores
                        //        complete: finalizo

                    });
                    CargarGrilla();

                }
            }
        }
        else { alert("No puede haber campos vacíos."); }
      
    }

    function resultado2(codigo) {
        if (existe == false) {
            alert("Se agregó el medicamento.");
        }
        else {
            alert("Se modificó el medicamento.");

        }
        }
     
       function verificarTextboxVacios()
        {
            if ($("#InsumoId").val() == "" || $("#PecrioUOM").val() == "" || $("#PrecioOS").val() == "" || $("#Nombre").val() == "" || $("#CodigoKike").val() == "") {

                return false;
              
            }
            else {return true;
            }   
        }

        function LimpiarCampos() {
            $(".input-mini").val("");
            $("#Nombre").focus();
        }
        $("#btnBuscar").click(function () {
            if ($("#Nombre").val() != "") {
                $.fancybox({ 'autoDimensions': false,
                    'href': '../Guardia/BuscarInsumos.aspx',
                    'width': '40%',
                    'height': '100%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'elastic',
                    'easingIn': 'swing',
                    'easingOut': 'swing',
                    'showCloseButton': 'true',
                    'type': 'iframe',
//                    'hideOnOverlayClick': false,
//                    'enableEscapeButton': false,
//                    'hideOnContentClick': 'true',
//                    'showCloseButton': true,
                    'scrolling': 'no'

                });
            }
            else { alert("Ingrese un nombre a buscar"); }
        });
        function validar(e) {
            tecla = (document.all) ? e.keyCode : e.which;
            if (tecla == 13)

                $("#btnBuscar").click();
//            alert('Has pulsado enter');
        }

        function finalizo() {
            //alert("entro finalizado");
            $("#cargando").hide();
//            $("#TablaMedicamentos_div").show();
        }

        function antes() {
            //alert("entro antes");
            $("#cargando").show();
//            $("#TablaMedicamentos_div").hide();
        }