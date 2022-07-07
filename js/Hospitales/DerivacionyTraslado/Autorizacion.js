var listaPracticas = new Array();
var listaPracticas = new Array();
﻿var listaPracticas = new Array();
var listaModulos = new Array();
var listpracticas = [];
var valor = 0;
var total = 0;
var editar = 0;
var indiceEditar = 0;
var intAmbu = "";
var idAutorizacion = 0;
var GET = {};
var plantilla = {};
var copiar = 0;
var fecha = new Date();
var nombrePractica = "";
var idPractica = 0;
var avanzar = 0;
var guardando = 0;
var ft = "";

//inicializacion de variables para el guardado de las distintas fechas del voucher
var fechaActualImpresion = new Date();
var part1;
var fechaTurnoImpresion;        
var part2;
var fechaAuditadoImpresion;
//variable para guardar el listado de practicas que tiene la prestacion (esto es para ser usado en la impresion del voucher) se guarda en formato HTML
var _tempNombrePracticas = "";


$(".fechas").mask("99/99/9999", { placeholder: "-" });
var f = "";
f = f + fecha.getDate();
f = f + "/" + (fecha.getMonth() + 1) + "/";
f = f + fecha.getFullYear();
$("#txtFechaMigue").val(f);

    ListTipoDoc();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $("#txt_dni").focus();
    var NHC = "";
    var Documento = "";
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

if (GET["volver"] != "" && GET["volver"] != null) {
   
    $("#txt_dni").val(GET["volver"]);

    if (GET["idAutorizacion"] != "" && GET["idAutorizacion"] != null) {
        idAutorizacion = GET["idAutorizacion"];
        console.log(idAutorizacion);
    }
    if (GET["copiar"] != "" && GET["copiar"] != null) {
        copiar = GET["copiar"];
    }
    //setInterval("$('#txtNHC').focus();", 500);
    //$("#txtNHC").focus();
//        $("#txt_dni").change(function(){
//   alert();
//    });

    //$("#desdeaqui").click();
//    e = jQuery.Event("keypress")
//    e.which = 13 //choose the one you want
//    $("#desdeaqui").keypress(function(){
//    // alert('keypress triggered')
//    }).trigger(e)
//var callback = function(e){
//    console.log(e.type, e);
//    var text = e.type;
//    var code = 13;//e.which ? e.which : e.keyCode;
////    if(13 === code){
////        text += ': ENTER';
////    } else {
////        text += ': keycode '+code;
////    }
////    console.d(text);
//};
//alert(callback);
//$('#txt_dni').keydown(callback);
//$('#txt_dni').focusout(function(){
//alert();
//});

//alert(avanzar);
//if(avanzar == 0)
//{
//var e = jQuery.Event("keypress");
//e.which = 13; // # Some key code value
////alert(e);
//setInterval("$('#txt_dni').trigger(e);", 500);
//autoclick = setInterval("$('#desdeaqui').click();", 1000);
//setInterval("clearInterval(autoclick);",2000);
//}
}

//--------------oculta el boton para imprimir si es que no esta en estado auditado
        if ($('#cboEstado option:selected').text() != "Auditado") {
            $('#btnImpVaucher').hide();
        } else {
            $('#btnImpVaucher').show();
        }
//---------



cargarEditar(idAutorizacion);

    $(".fechas").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
   // $(".fechas").keydown(function () { return false; });
   //$(".fechas").mask("99/99/9999", { placeholder: "-" });
        $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPracticasCombo",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 2 + '"}',
        dataType: "json",
        success: function (Resultado) {
            listaPracticas = Resultado.d;
            $("#cboPractica").append(new Option("Seleccione", 0));
            $.each(listaPracticas, function (index, item) {
                $("#cboPractica").append(new Option(item.Practica, item.Codigo));
            });
        }
    });

    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerModulosCombo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            listaModulos = Resultado.d;
            $("#cboModulo").append(new Option("Seleccione", 0));
            $.each(listaModulos, function (index, item) {
                $("#cboModulo").append(new Option(item.nombre, item.id));
            });
        }
    });



    $("#txtCodigo").keyup(function () {
    
        $("#cboPractica").val($("#txtCodigo").val());
//        var json = JSON.stringify({ "id": $("#txtCodigo").val() });
//                $.ajax({
//            type: "POST",
//            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPracticaPorCodigo",
//            contentType: "application/json; charset=utf-8",
//            data: json,
//            dataType: "json",
//            success: function (Resultado) {
//            //alert(Resultado.d);
//                 $("#cboPractica").val(Resultado.d);
//                 }
//        });  

        if ($("#txtCodigo").val().trim().length > 0) {
            $("#cboModulo").attr('disabled', true);
            $("#cboModulo").val(0);
            $("#txtCodMod").attr('disabled', true);
            $("#txtCodMod").val("");

//            var json = JSON.stringify({ "prestador": $('#cboPrestador option:selected').val(), "practica": $("#txtCodigo").val() });
//        $.ajax({
//            type: "POST",
//            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPreciosPrestadoresLista",
//            contentType: "application/json; charset=utf-8",
//            data: json,
//            dataType: "json",
//            success: function (Resultado) {
//                valor = Resultado.d;
//                $("#txtImporte").val(valor.valor);
//                $("#txtCantidad").val("1");

//                total = total + $("#txtImporte").val() * $("#txtCantidad").val();

//                $("#txtTotal").val("$ " + total);
//                seleccion.importe = $('#txtImporte').val();
//            }
//        });         
        } else {
            $("#cboModulo").attr('disabled', false);
            $("#cboModulo").val("");
            $("#txtCodMod").attr('disabled', false);
            $("#txtCodMod").val("");
            $("#txtImporte").val("");
        }
    });

            $("#txtCodigo").keydown(function (event) {
    if (event.shiftKey) {
        event.preventDefault();
    }

    if (event.keyCode == 46 || event.keyCode == 8) {
    }
    else {
        if (event.keyCode < 95) {
            if (event.keyCode < 48 || event.keyCode > 57) {
                event.preventDefault();
            }
        }
        else {
            if (event.keyCode < 96 || event.keyCode > 105) {
                event.preventDefault();
            }
        }
    }

});



    $("#cboPractica").change(function () {

         $("#txtCodigo").val($("#cboPractica").val());
//       $.each(mapped,function(index,item){
//       alert(item);
//       });
      // $("#txtCodigo").val(mapped[$("#cboPractica").val()]);

        if ($("#cboPractica").val() != 0) { $("#cboModulo").val(0); $("#cboModulo").attr('disabled', true); $("#txtCodMod").val(""); $("#txtCodMod").attr('disabled', true); } else { $("#cboModulo").attr('disabled', false); $("#txtCodMod").attr('disabled', false); }


    });

    $("#txtCodMod").keyup(function () {
        $("#cboModulo").val($("#txtCodMod").val());

        if ($("#txtCodMod").val().trim().length > 0) {
            $("#cboPractica").attr('disabled', true);
            $("#cboPractica").val(0);
            $("#txtCodigo").attr('disabled', true);
            $("#txtCodigo").val("");
        } else {
            $("#cboPractica").attr('disabled', false);
            $("#cboPractica").val(0);
            $("#txtCodigo").attr('disabled', false);
            $("#txtCodigo").val("");
            $("#txtImporte").val("");
        }
    });

    $("#txtCodMod").keydown(function (event) {
        if (event.shiftKey) {
            event.preventDefault();
        }

        if (event.keyCode == 46 || event.keyCode == 8) {
        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        } 
    });


    $("#cboModulo").change(function () {

        $("#txtCodMod").val($("#cboModulo").val());
        if ($("#cboModulo").val() != 0) { $("#cboPractica").val(0); $("#cboPractica").attr('disabled', true); $("#txtCodigo").val(""); $("#txtCodigo").attr('disabled', true); } else { $("#cboPractica").attr('disabled', false); $("#txtCodigo").attr('disabled', false); }
    });

    $('#btnactualizar').click(function () {
        Actualizar_Telefono_Seccional($('#txtTelefono').val(), $('#cboSeccional option:selected').val(), $('#afiliadoId').val());
    });


    $("#btnAgregar").click(function () {
    
        if ($("#cboPrestador").val() == 0) { alert("Seleccione Prestador"); return false; }
        if ($('#cboPractica option:selected').val() == 0 && $('#cboModulo option:selected').val() == 0) { alert("Seleccione una Práctica."); return false; }
        if($("#txtImporte").val().trim().length <= 0 || parseInt($("#txtImporte").val()) <= 0){alert("Ingrese un importe"); return false;}
//        if (mapped[("#cboPractica").val()] == 0 && $('#cboModulo option:selected').val() == 0) { alert("Seleccione una Práctica."); return false; }
        if ($('#cboModulo option:selected').val() == 0 && $('#cboPractica option:selected').val() == 0) { alert("Seleccione un Módulo"); return false; }
        if($('#cboSubrubro option:selected').val() == 0){alert("Seleccione un Subrubro"); return false;}
     // if ($('#cboModulo option:selected').val() == 0 && mapped[("#cboPractica").val()] == 0) { alert("Seleccione un Módulo"); return false; }
        if ($("#txtCantidad").val() == 0 || $("#txtCantidad").val() == "") { alert("Ingrese una Cantidad"); return false; }

        if ($('#cboPractica option:selected').val() != 0 && $('#cboModulo option:selected').val() != 0) { alert("Seleccione un Modulo o una Práctica por Vez"); return false; }

        if (editar == 1) {

            total = total - listpracticas[indiceEditar].importe;
            if (listpracticas[indiceEditar].esPractica == 0) {//$('#cboPractica option:selected').val() == 0) {
                listpracticas[indiceEditar].codigoPrac = $('#cboModulo option:selected').val();
                listpracticas[indiceEditar].nombrePrac = $('#cboModulo option:selected').text();
                listpracticas[indiceEditar].subRubroCodigo = $('#cboSubrubro option:selected').val();
                listpracticas[indiceEditar].subRubroNombre = $('#cboSubrubro option:selected').text();
                listpracticas[indiceEditar].prestadorCodigo = $('#cboPrestador option:selected').val();
                listpracticas[indiceEditar].prestadorNombre = $('#cboPrestador option:selected').text();
                listpracticas[indiceEditar].prestadorCuit = $("#cboPrestador option:selected").data('cuit');
                                
            } else {
                listpracticas[indiceEditar].codigoPrac = $('#cboPractica option:selected').val();
                listpracticas[indiceEditar].nombrePrac = $('#cboPractica option:selected').text();
                listpracticas[indiceEditar].subRubroCodigo = $('#cboSubrubro option:selected').val();
                listpracticas[indiceEditar].subRubroNombre = $('#cboSubrubro option:selected').text();
                listpracticas[indiceEditar].prestadorCodigo = $('#cboPrestador option:selected').val();
                listpracticas[indiceEditar].prestadorNombre = $('#cboPrestador option:selected').text();
                listpracticas[indiceEditar].prestadorCuit = $('#cboPrestador option:selected').data('cuit');
                listpracticas[indiceEditar].paso_sap = 0;
            }
            listpracticas[indiceEditar].cantidad = $('#txtCantidad').val();
            listpracticas[indiceEditar].importe = $('#txtImporte').val() * $('#txtCantidad').val();

            total = 0;
            $.each(listpracticas, function (index, item) { total = parseFloat(total) + parseFloat(item.importe); });
            $("#txtTotal").val(total);

            cargarTabla(listpracticas);
            editar = 0;
            $("#btnCancelarEdicion").click();
            $("#cboSubrubro").val(0);
            $("#cboPrestador").val(0);
        } else {
            var seleccion = {};
            //si el combo de practica esta en seleccione cargo el modulo y viceversa
            if ($('#cboPractica option:selected').val() == 0) {
                seleccion.codigoPrac = $('#cboModulo option:selected').val();
                seleccion.nombrePrac = $('#cboModulo option:selected').text();
                seleccion.subRubroCodigo = $('#cboSubrubro option:selected').val();
                seleccion.subRubroNombre = $('#cboSubrubro option:selected').text();
                seleccion.prestadorCodigo = $('#cboPrestador option:selected').val();
                seleccion.prestadorNombre = $('#cboPrestador option:selected').text();
                seleccion.prestadorCuit = $('#cboPrestador option:selected').data('cuit');
                seleccion.esPractica = 0;
            } else {
                seleccion.codigoPrac = $('#cboPractica option:selected').val();
                seleccion.nombrePrac = $('#cboPractica option:selected').text();
                seleccion.subRubroCodigo = $('#cboSubrubro option:selected').val();
                seleccion.subRubroNombre = $('#cboSubrubro option:selected').text();
                seleccion.prestadorCodigo = $('#cboPrestador option:selected').val();
                seleccion.prestadorNombre = $('#cboPrestador option:selected').text();
                seleccion.prestadorCuit = $('#cboPrestador option:selected').data('cuit');
                seleccion.paso_sap = 0;
                seleccion.esPractica = 1;

            }

            seleccion.cantidad = $('#txtCantidad').val();
            seleccion.usuario = "";
            seleccion.fecha = "";
            //alert($('#txtImporte').val()); 
            if ($('#txtImporte').val() == "") { seleccion.importe = 0; } else { seleccion.importe = $('#txtImporte').val() * seleccion.cantidad; }


            var indice = listpracticas.length;
            //listpracticas[indice] = seleccion;
            listpracticas.push(seleccion);
            total = 0;
            $.each(listpracticas, function (index, item) { total = parseFloat(total) + parseFloat(item.importe); });
            $("#txtTotal").val("$ " + total);
            cargarTabla(listpracticas);
        }
    });


    function Eliminar(indice) {
    if(editar == 1){return false;}
        var resta = listpracticas[indice].importe;
        total = (total - resta);
        listpracticas.splice(indice, 1);
        if (total == 0) { $("#txtTotal").val("") } else { $("#txtTotal").val("$ " + total);}
        
        cargarTabla(listpracticas);
        restablecerControles();
        if (listpracticas.length <= 0) {$("#cboPrestador").attr('disabled', false); } 
    }

    function Edita(indice) {
        $("#btnCancelarEdicion").show();
        $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Aceptar Edicion");
        //$("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
        editar = 1;
        indiceEditar = indice;
        if (listpracticas[indice].esPractica == 1) {
            $("#cboPractica").val(listpracticas[indice].codigoPrac);
            $("#txtCodigo").val(listpracticas[indice].codigoPrac);
            $("#cboSubrubro").val(listpracticas[indice].subRubroCodigo);
            $("#cboPrestador").val(listpracticas[indice].prestadorCodigo);
            //deshabilito los controles de seleccion de modulo.
        $("#cboModulo").attr('disabled',true);
        $("#txtCodMod").attr('disabled',true);
        } 
        else {
        //alert(listpracticas[indice].codigoMod);
        $("#cboModulo").val(listpracticas[indice].codigoPrac);
        $("#txtCodMod").val(listpracticas[indice].codigoPrac);
        $("#cboSubrubro").val(listpracticas[indice].subRubroCodigo);
        $("#cboPrestador").val(listpracticas[indice].prestadorCodigo);
        //deshabilito los controles de seleccion de practica.
        $("#cboPractica").attr('disabled',true);
        $("#txtCodigo").attr('disabled',true);
        }
        $("#txtCantidad").val(listpracticas[indice].cantidad);
        $("#txtImporte").val(listpracticas[indice].importe);
     }

    function cargarTabla(lista) {

        $("#tablaPracticas").empty();
        var Contenido = "";
        var Pie = "";
        var Encabezado = "";
        //Encabezado = ""; //"<table class='tabla table-hover table-condensed' style='width: 100%;'><thead style='height:0px'><tr><th  style='width:8%'></th><th style='padding:0px; text-align:center; width:8%'></th><th style='padding:0px; text-align:center; width:60%;color:Black'></th><th style='padding:0px; text-align:center; width:10%;color:Black' ></th><th style='padding:0px; text-align:center; width:8%;color:Black'></th><th style='padding:0px; text-align:center; width:8%;color:Black'></th></tr></thead><tbody>";
        var cont = listpracticas.length - 1;
        

        _tempNombrePracticas = "<ul>";//abrimos la lista de practicas
        $.each(lista, function (index, item) {

            //var numero = (parseInt(index) + 1);
            //alert(numero + "/" + item.codigoPrac + "/" + item.nombrePrac + "/" + item.cantidad + "/" + item.importe);
            var pract_mod_nomb = "";
            var prcat_mod_cod = 0;
            if (lista[cont].codigoPrac == 0) { pract_mod_nomb = lista[cont].nombreMod; } else { pract_mod_nomb = lista[cont].nombrePrac; }
            if (lista[cont].codigoPrac == 0) { prcat_mod_cod = lista[cont].codigoMod; } else { prcat_mod_cod = lista[cont].codigoPrac }
            Contenido = Contenido + "<tr style='width:100%'>" +
            "<td style='cursor:auto;width:6%;padding-left:3px;padding-right:3px'><a id='Editar" + cont + "' onclick='Edita(" + cont + ");' class='btn btn-mini' rel='tooltip' title='Editar Práctica'><i class='icon-edit'></i></a>" +
            "<a id='Elminar" + cont + "'onclick='Eliminar(" + cont + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica' style='float:right'><i class='icon-remove-circle icon-white'></i></a></td>" +
            "<td id='idCod' style='cursor:auto;width:5%;padding-left:3px;padding-right:3px; text-align:center; color:black'> " + prcat_mod_cod + " </td>" +
            "<td id='idNombrePract' style='cursor:auto; width:30%;padding-left:3px;padding-right:3px; text-aling:center; color:black'>" + pract_mod_nomb + "</td>" +
            "<td style='width:8%;padding-left:3px;padding-right:3px; text-align:center; color:black'>" + lista[cont].cantidad + "</td>" +
            "<td style='width:1%;padding-left:3px;padding-right:3px'></td>" +
            "<td style='width:8%;padding-left:3px;padding-right:3px; text-align:center; color:black'>" + "$ " + lista[cont].importe + "</td>" +
            "<td style='width:20%;padding-left:3px;padding-right:3px; color:black'>" + lista[cont].subRubroNombre + "</td>" +
            "<td id='idPrestador'style='width:20%;padding-left:3px;padding-right:3px; color:black'>" + lista[cont].prestadorNombre + "</td>";
            cont--;
//                seleccion.subRubroCodigo 
//                seleccion.subRubroNombre
//------------guardo en una variable todas los nombres de las practicas para luego poder imprimirlas en voucher derivacion en formato html----------------
            _tempNombrePracticas = _tempNombrePracticas + " <li>" +pract_mod_nomb + "</li>";//agregamos item en la lista
//----------------------------------------------------------------------------------------------------------------------------------------
        });

        _tempNombrePracticas = _tempNombrePracticas + "</ul>";//cerramos la lista de practicas

        Pie = "</tbody></table>";
        $("#tablaPracticas").html(Encabezado + Contenido + Pie);
        restablecerControles();
    }

    function restablecerControles() {
        $("#cboPractica").val(0);
        $("#cboPractica").attr('disabled', false);
        $("#cboModulo").val(0);
        $("#cboModulo").attr('disabled', false);
        $("#txtCodigo").val("");
        $("#txtCodigo").attr('disabled',false);
        $("#txtCodMod").val("");
        $("#txtCodMod").attr('disabled', false);
        $("#txtCantidad").val(1);
        $("#txtImporte").val("");
        //$("#txtTotal").val("");
    }

    function restablecerControlesTodos() {
        $("#cboPractica").val(0);
        $("#cboPractica").attr('disabled', false);
        $("#cboModulo").val(0);
        $("#cboModulo").attr('disabled', false);
        $("#txtCodigo").val("");
        $("#txtCodigo").attr('disabled', false);
        $("#txtCodMod").val("");
        $("#txtCodMod").attr('disabled', false);
        $("#txtCantidad").val(1);
        $("#txtImporte").val("");
        $("#txtFechaMigue").val(f);
        $("#rdo_Ambulatorio").attr('checked', true);
        $("#cboSubrubro").val(0);
        $("#cboEspecialidad").val(0);
        $("#cboPrestador").val(0);
        $("#cboPrestador").attr('disabled', false);
        $("#cboMedInterno").val(0);
        $("#txtMedExt").attr('disabled', false);
        $("#txtMedExt").val("");
        $("#txtComentarios").val("");
        $("#cboEstado").val(0);
        $("#txtFecTurno").val("");
        $("#txtFecAuditado").val("");
        $("#txtFecRetirado").val("");
        listpracticas.length = 0;
        $("#tablaPracticas").empty();
        $("#txtTotal").val("0");
    }

    $("#btnCancelarEdicion").click(function () {
        indiceEditar = 0;
        editar = 0;
        $("#btnCancelarEdicion").hide();
        $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
        restablecerControles();
        $("#cboSubrubro").val(0);
        $("#cboPrestador").val(0);
    });

    $("#btnGuardar").click(function () {  

    var fecha = new Date();
    var dia = "";
    var mes = "";

    
    if($("#txtFecTurno").val().toString().trim().length <= 0){
    if(fecha.getDate().toString().length == 1){dia = "0" + fecha.getDate().toString();}else{dia = fecha.getDate();}
    if(fecha.getMonth().toString().length == 1){mes = "0" + (fecha.getMonth() + 1).toString();}else{mes = fecha.getMonth() + 1;}
    //20.07.2018
    ft = dia +"."+ mes +"."+ fecha.getFullYear();
    }else{ft = $("#txtFecTurno").val();}

    

    if(guardando == 0){

        if ($("#cboMedInterno").val() == 0 && $("#txtMedExt").val().trim().length == 0) { alert("Seleccione Médico"); return false; }
        if ($("#cboEspecialidad").val() == 0) { alert("Seleccione Especialidad"); return false; }
        if (listpracticas.length == 0) { alert("Cargue alguna Especialidad o Modulo"); return false; }
        if ($("#cboEstado").val() == 0) { alert("Seleccione Un Estado"); return false; }
        if ($("#txtFechaMigue").val() == "") { alert("Ingrese una Fecha"); return false; }
        //if($("#txtFecTurno").val().toString().trim().length <= 0){alert("Ingrese Fecha Turno"); return false;}
        if ($("#rdo_Ambulatorio").is(':checked')) { intAmbu = "A"; } else { intAmbu = "I"; }
                        guardando = 1;
                        //alert(idAutorizacion);

        var json = JSON.stringify({
          "id": idAutorizacion
        , "numero": 1
        , "idPaciente": $("#afiliadoId").val()
        , "intAmbu": intAmbu
        , "fecha": $("#txtFechaMigue").val()
        , "prestador": $("#cboPrestador").val()
        , "idEspecialidad": $('#cboEspecialidad option:selected').val()
        , "idMedico": $('#cboMedInterno option:selected').val()
        , "observacion": $("#txtComentarios").val()
        , "estado": $('#cboEstado option:selected').val()
        , "medicoExterno": $("#txtMedExt").val()
        , "fechaTurno": $("#txtFecTurno").val()
        , "fechaAuditado": $("#txtFecAuditado").val()
        , "fechaRetirado": $("#txtFecRetirado").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarActulizarEncabezado",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {

                idAutorizacion = Resultado.d;

                guardarLogEstado(idAutorizacion);
                guardarDetalle(idAutorizacion,$('#cboEstado option:selected').val());


            }
        });
                   }      
    });


                      

function guardarLogEstado(id){
        var json = JSON.stringify({"idAutorizacion": id,"estado": $('#cboEstado option:selected').val() });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarLogAutorizaciones",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json"     
        }); 
}

    function guardarDetalle(id,estado) {
        var json = JSON.stringify({"lista": listpracticas,"id": id, "estado": $('#cboEstado option:selected').val() });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarDetalle",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                alert("guardado. Número: " + idAutorizacion);
                var idAutorizacionAUX = idAutorizacion;
                //if($("#cboEstado option:selected").val() == 2){ pasarSAP(idAutorizacionAUX);}else{
                //alert("else");
                idAutorizacion = 0;
                console.log(idAutorizacion);
                guardando = 0;
                restablecerControlesTodos();
                chekearPendientes(); 
                //}       
            }
        }); 
    }
     

     function PadLeft(value, length) {
    return (value.toString().length < length) ? PadLeft("0" + value, length) : 
    value;
}
        
        function  pasarSAP(idAuto){
        
        console.log("id pasado: " + idAuto);
        var a = []; 
            $.each(listpracticas, function(index , item) {
            //alert("contando cuit: " + item.prestadorCuit + "/practica: /" + item.nombrePrac);
            //alert("inarray: " + ($.inArray(item.prestadorCuit,a)));
            if(item.esPractica == 1 && item.paso_sap == 0){
            if(($.inArray(parseFloat(item.prestadorCuit),a)) == -1){ //alert("agrego"); 
            a.push(parseFloat(item.prestadorCuit));}}
            //alert("longitud: " + a.length);
            });

       //alert("longitud afuera: " + a.length);

       //si guardo pero no se tiene qu enviar nada reseto los campos para otra carga
       if(a.length == 0){
       //alert("y aca que onda?");
                idAutorizacion = 0;
                console.log("id pasado: " + idAuto);
                guardando = 0;
                restablecerControlesTodos();
                chekearPendientes(); 
       }

        for(i = 0;i<= a.length - 1;i++){
        
        var DATA = ""; //30563079025 /7$("#cboPrestador").val()   $("#cboPrestador option:selected").data('cuit')
        DATA = "{ 'NroDocumento':" + idAuto + "," + "'Prestador':" + a[i] + "," + "'TextoMedicoSolic':" + $("#cboMedInterno option:selected").html().toString().replace(',', ' ');
                                     //$("#CargadoDNI2").html()         
                                     console.log(idAutorizacion);

    var enviar = 0;
    var prestadorCodigo = 0;
    $.each(listpracticas, function(index , item) {//660711
    if(item.prestadorCuit == a[i]){

    //alert(item.esPractica +"//"+ item.paso_sap);

    //le agrego posiciones si es una ractica y esa practica todavia no fue aceptada por sap
    if(item.esPractica == 1 && item.paso_sap == 0){
    enviar = 1;
    //alert("cuit: " + item.prestadorCuit);
    prestadorCodigo = item.prestadorCodigo;
            //alert(ft);
    
    DATA += ",'Posiciones': {'Material': NN" + PadLeft(item.codigoPrac.toString(),6) + "," + 
                       "'Cantidad':" + item.cantidad.toString() + "," + 
                       "'UnidadMedida': un," +  
                       "'PrecioNeto':" +   item.importe.toString().replace(",",".") + "," + 
                       //"'FechaTurno':" + $("#txtFecTurno").val().toString().replace(/\//g, '.').toString() + "," + 
                       "'FechaTurno':" + ft + "," + 
                       "'DNI':" + $("#CargadoDNI2").html().toString() + "," + //39609948
                       //"'DNI':" + "39609948" + "," + //39609948
                       "'Solicitante':" + $("#CargadoApellido2").html().toString() + "," +
                       "'CentroCosto': '' }"; 
                       }
                       }
   });
   DATA = DATA + "}";

   console.log(DATA);

        var json = JSON.stringify({
          //DESARROLLO
          "URL": "http://opq.aws.grupoolmos.com.ar:50000/RESTAdapter/CrearOrdenCompra/"
          //PRODUCCION:
          //"URL": "http://opp.aws.grupoolmos.com.ar:50000/RESTAdapter/CrearOrdenCompra/"
          ,"DATA": DATA         
          //DESARROLLO:
          ,"USUARIO": "OPQ_LEGADO_GESINMED"
          ,"PASS": "InterOPQ_01"
          //PRODUCCION:
          //,"USUARIO": "OPP_LEGADO_GESINMED"
          //,"PASS": "InterOPP_01"       
          ,"idAutorizacion": idAuto
          ,"Prestador": prestadorCodigo
        }); 
        console.log("id pasado: " + idAuto);
        if(enviar == 1){// si se cargo alguna practica se lo mando a SAP
            $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/pasarSAP",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) { 
            //alert("succes de pasasr");
                idAutorizacion = 0;
                console.log("id pasado: " + idAuto);
                guardando = 0;
                restablecerControlesTodos();
                chekearPendientes(); 
            },
            error: errores
        });
        }else { enviar = 0;} }
    }

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
    console.log(msg);
}

     function  chekearPendientes(){
        var json = JSON.stringify({ "id": pacienteId });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/ChekearPendientes",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json"
        });}

    $("#cboMedInterno").change(function () {
        if ($("#cboMedInterno").val() > 0) { $("#txtMedExt").val(""); $("#txtMedExt").attr('disabled', true); } else { $("#txtMedExt").attr('disabled', false); }
    });
    $("#txtMedExt").keyup(function () {
        if ($("#txtMedExt").val().trim().length > 0) { $("#cboMedInterno").val(0); $("#cboMedInterno").attr('disabled', true); } else { $("#cboMedInterno").attr('disabled',false); }
    });

    
    $("#btnVolver").click(function () {
      avanzar = 1;
        $("#primero").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#primero").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#primero').height()));
        //$('#cbo_Especialidad').focus();
        $("#autorizaciones").hide();
        $("#txt_dni").focus();
    });

    function cargarEditar(id) {
        //alert("cargar plantilla");
        //if (copiar == 1) { $("#cboPrestador").attr('disabled', true);}
        var json = JSON.stringify({ "id": id });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerUnEncabezado",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $.each(lista, function (index, item) {
                    //alert(item.subRubroId);
                    plantilla.subRubroId = item.subRubroId;
                    plantilla.amb_int = item.amb_int;
                    plantilla.numero = item.numero;
                    plantilla.fecha = item.fecha;
                    plantilla.comentarios = item.comentarios;
                    plantilla.especialidadId = item.especialidadId;
                    plantilla.prestadorId = item.prestadorId;
                    plantilla.medicoInternoId = item.medicoInternoId;
                    plantilla.estadoId = item.estadoId;
                    plantilla.fechaTurno = item.fechaTurno;
                    plantilla.fechaAuditado = item.fechaAuditado;
                    plantilla.fechaRetiro = item.fechaRetiro;
                    plantilla.medicoExterno = item.medicoExterno;
                    //alert(plantilla.comentarios);
                    if (plantilla.amb_int == "A") { $("#rdo_Ambulatorio").attr('checked', true); } else { $("#radio_Internacion").attr('checked', true); }
                    $("#txtFechaMigue").val(plantilla.fecha);
                    $("#txtComentarios").val(plantilla.comentarios);
                    $("#txtMedExt").val(plantilla.medicoExterno);

                    if (plantilla.fechaTurno == "01/01/1900") {
                        $("#txtFecTurno").val("");
                    } else { $("#txtFecTurno").val(plantilla.fechaTurno); }
              
                    if (plantilla.fechaAuditado == "01/01/1900") {
                        $("#txtFecAuditado").val("");
                    } else { $("#txtFecAuditado").val(plantilla.fechaAuditado); }

                    if (plantilla.fechaRetiro == "01/01/1900") {
                        $("#txtFecRetirado").val("");
                    } else { $("#txtFecRetirado").val(plantilla.fechaRetiro); }
                });
                //alert(" plantilla cargada");
            },
            complete: function () {

                cargarDetalles(id);
                cargarSubRubro();
                cargarMedico();
                cargarEspecialidad();
                cargarEstados();
                cargarPrestadores();

            }
        });
    }

    $("#BtnBuscar").click(function () { document.location = "../DerivacionyTraslado/BuscarAutorizaciones.aspx?pacienteId=" + $("#afiliadoId").val(); });

    function cargarSubRubro() {
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerSubrubrosCombo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                listaModulos = Resultado.d;
                $("#cboSubrubro").append(new Option("Seleccione", 0));
                $.each(listaModulos, function (index, item) {
                    $("#cboSubrubro").append(new Option(item.nombre, item.id));
                });
            }//,
//   complete: function () { $("#cboSubrubro").val(plantilla.subRubroId); }
        }); 
    }

    function cargarMedico() {
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerMedicosCombo",
            contentType: "application/json; charset=utf-8",
            data: '{id: "' + 0 + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#cboMedInterno").append(new Option("Seleccione", 0));
                $.each(lista, function (index, item) {
                    $("#cboMedInterno").append(new Option(item.Medico, item.Id));
                });
            },
            complete: function () { $("#cboMedInterno").val(plantilla.medicoInternoId); }
        });
    }
    function cargarEspecialidad() {
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesCombo",
            contentType: "application/json; charset=utf-8",
            data: '{id: "' + 0 + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#cboEspecialidad").append(new Option("Seleccione", 0));
                $.each(lista, function (index, item) {
                    $("#cboEspecialidad").append(new Option(item.Especialidad, item.Id));
                });
            },
            complete: function () { $("#cboEspecialidad").val(plantilla.especialidadId); }
        });
    }

    function cargarEstados() {

        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEstadosCombo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                listaModulos = Resultado.d;
                $("#cboEstado").append(new Option("Seleccione", 0));
                $.each(listaModulos, function (index, item) {
                    $("#cboEstado").append(new Option(item.nombre, item.id));
                });
            },
            complete: function () { 
            $("#cboEstado").val(plantilla.estadoId); 
//--------------oculta o muestra el boton para imprimir si es que esta o no en estado de auditado
        if ($('#cboEstado option:selected').text() != "Auditado") {
            $('#btnImpVaucher').hide();
        } else {
            $('#btnImpVaucher').show();
        }
        //console.log($('#cboEstado option:selected').text());
        //console.log($('#cboEstado option:selected').value);
//---------
            }
        });
    }

    function cargarPrestadores() {

        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPrestadoresCombo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                listaPrestadores = Resultado.d;
                $("#cboPrestador").append(new Option("Seleccione", 0));
                $.each(listaPrestadores, function (index, item) {
                   // $("#cboPrestador").append(new Option(item.nombre, item.id));
                   $("#cboPrestador").append("<option value='"+ item.id +"' data-cuit='"+ item.cuit +"' >" + item.nombre + "</option>");
                });
            }//,
            //complete: function () { $("#cboPrestador").val(plantilla.prestadorId); }
        });
    
    }
    function cargarDetalles(id) {
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerDetallePlantilla",
            contentType: "application/json; charset=utf-8",
            data: '{id: "' + id + '"}',
            dataType: "json",
            success: function (Resultado) {
                listpracticas = Resultado.d;
                cargarTabla(listpracticas);
            },
            complete: function () {
                //if (listpracticas.length >= 0) {
                    total = 0;
                    $.each(listpracticas, function (index, item) { total = parseFloat(total) + parseFloat(item.importe); });
                    $("#txtTotal").val(total);
                //}
            }
        });
    }

//    $("#cboPractica").change(function () {
//        var json = JSON.stringify({ "prestador": $('#cboPrestador option:selected').val(), "practica": $("#cboPractica").val() });
//        $.ajax({
//            type: "POST",
//            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPreciosPrestadoresLista",
//            contentType: "application/json; charset=utf-8",
//            data: json,
//            dataType: "json",
//            success: function (Resultado) {
//                valor = Resultado.d;
////                alert(valor.valor);
//                $("#txtImporte").val(valor.valor);
//                $("#txtCantidad").val("1");
//                //                if (valor.valor > 0) {
//                //                    $("#txtImporte").val(valor.valor * $("#txtCantidad").val());
//                //                } else {
//                //                    var aux = $("#txtImporte").val() * $("#txtCantidad").val();
//                //                    $("#txtImporte").val(aux);
//                //                }

//                total = total + $("#txtImporte").val() * $("#txtCantidad").val();

//                $("#txtTotal").val("$ " + total);
//                seleccion.importe = $('#txtImporte').val();
//            }
//        });
//    });


//    $("#cboPrestador").change(function () {
//        var json = JSON.stringify({ "prestador": $('#cboPrestador option:selected').val(), "practica": $("#cboPractica").val() });
//        $.ajax({
//            type: "POST",
//            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPreciosPrestadoresLista",
//            contentType: "application/json; charset=utf-8",
//            data: json,
//            dataType: "json",
//            success: function (Resultado) {
//                valor = Resultado.d;
////                alert(valor.valor);
//                $("#txtImporte").val(valor.valor);
//                $("#txtCantidad").val("1");
//                //                if (valor.valor > 0) {
//                //                    $("#txtImporte").val(valor.valor * $("#txtCantidad").val());
//                //                } else {
//                //                    var aux = $("#txtImporte").val() * $("#txtCantidad").val();
//                //                    $("#txtImporte").val(aux);
//                //                }

//                total = total + $("#txtImporte").val() * $("#txtCantidad").val();

//                $("#txtTotal").val("$ " + total);
//                seleccion.importe = $('#txtImporte').val();
//            }
//        });
//    });
    //,188 
    //.190 110
    $("#txtImporte").keydown(function (event) {

   if((event.keyCode == 190 || event.keyCode == 110) && ($(this).val().toString().indexOf(".") != -1)){ return false; }

        if (event.shiftKey) {
            event.preventDefault();
        }

        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 110) {
        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        }
        $("#txtCantidad").val(1);
    });

    $("#txtCantidad").keydown(function (event) {
        if (event.shiftKey) {
            event.preventDefault();
        }

        if (event.keyCode == 46 || event.keyCode == 8) {
        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        }
    
    });

    $("#txtCantidad").keyup(function (event) {
        if (event.shiftKey) {
            event.preventDefault();
        }

        if (event.keyCode == 46 || event.keyCode == 8) {
        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        }
        if( isNaN($("#txtImporte").val()))
        $("#txtImporte").val(parseFloat($("#txtImporte").val()) * $("#txtCantidad").val());
    });


//------------------------------------


/*

function GuardarVoucher(textObservaciones) {
    //$("#idTextoObs").val($("#idTextoObservaciones").val);
    //var text = document.getElementById("idTextoObservaciones").textContent;
    GuardarVoucherImprimir(textObservaciones);

}
*/
/*
$("#btnImpVaucher").on('click', function() {
    $.fancybox(
        '<div class="message">'
            +'<h4>Ingrese Observaciones</h4>'
            +'<input id="idTextoObservaciones" type="text" name="fname"></input>'
        +'</div>'
        +'</br>'
        +'<button id="btnAceptar" class="btn btn-info" style="text-align:center" onclick="GuardarVoucherImprimir();" >Aceptar</button>'
        +'',
		{
            'autoDimensions'        : false,
            'width'                 : '50%',
		    'height'                : '20%',
		    'onCleanup'             : function f() {
                var text = document.getElementById("idTextoObservaciones").textContent;
                var $iframe = $('#fancybox-frame');
                alert($('idTextoObservaciones', $iframe.contents()).val());
                var textA = $('#fancybox-frame').contents().find('#idTextoObservaciones').val();
                //var textA = $('.fancybox-iframe').contents().find('#idTextoObservaciones').val();
		        console.log(text);
                console.log($iframe);}
                   
		}
    );
});
*/

//----------------------------------------

$("#btnImpVaucher").on('click', function() {

var textoObservaciones = prompt("Escriba las Observaciones","");
    GuardarVoucherImprimir(textoObservaciones);
});


//guarda los datos del voucher en DB
function GuardarVoucherImprimir(observaciones){

        fechaActualImpresion = new Date();

        //CONVERSION de string a datetime....el formato que maneja es dia/mes/año y hay que convertirlo a datetime que es año, mes, dia y hora (este ultimo queda en 00:00:00)

        
        //console.log("fecha: "+$("#txtFecTurno").val());
		
        if($("#txtFecTurno").val() == null || $("#txtFecTurno").val() == "")
        {
		//errores("Ingrese fecha de Turno");

        fechaTurnoImpresion = new Date (1900,01,01);
        }else{
		part1 =$("#txtFecTurno").val().split('/');
        fechaTurnoImpresion = new Date(part1[2], part1[1] - 1, part1[0]);
        }

        if($("#txtFecAuditado").val() == null || $("#txtFecAuditado").val() == "")
        {

		//errores("Falta fecha de Auditado");

        fechaAuditadoImpresion = new Date (1900,01,01);
        }else{	
		part2 =$("#txtFecAuditado").val().split('/');
        fechaAuditadoImpresion = new Date(part2[2], part2[1] - 1, part2[0]);	
        }

        if (observaciones=="" || observaciones == null)
        {
            observaciones="Sin Observaciones";
        }

//llamado a las funciones que guardaran los datos en la DB   
        var json = JSON.stringify({
          "numeroCarga": GET["idAutorizacion"]
        , "nombre": document.getElementById("CargadoApellido2").textContent
        , "dni": document.getElementById("CargadoDNI2").textContent
        , "nhc": document.getElementById("CargadoNHC2").textContent
        , "destino": document.getElementById("idPrestador").textContent       
        , "fechaActual": fechaActualImpresion
        , "fechaTurno": fechaTurnoImpresion
        , "fechaAuditado": fechaAuditadoImpresion
        , "nombreAutorizador": "Auditoria Interna"
        , "derivacion": 0
        , "practicaNombre":_tempNombrePracticas
        //, "practicaNombre": document.getElementById("idNombrePract").textContent//se comenta por que se crea una lista para mostrar todas las practicas
        , "comentarios": $("#txtComentarios").val()
        , "observaciones": observaciones
        , "practicaCod": document.getElementById("idCod").textContent
        
        });

        console.log(json);
        
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/VoucherGuardarASMX",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado){
            ImprimirVoucher("../Impresiones/VoucherDerivaciones.aspx?nc=" + GET["idAutorizacion"])
            },
            error: errores     
        });
        
}




//imprime los datos del voucher guardado en DB
function ImprimirVoucher(pagina){
        

        /*
        console.log(pagina)
        //console.log("../Impresiones/VoucherDerivaciones.aspx?ID=" + GET["idAutorizacion"])
        console.log("----------------------------")
        console.log(GET["idAutorizacion"])
        console.log(document.getElementById("CargadoApellido2").textContent)
        console.log(document.getElementById("CargadoDNI2").textContent)
        console.log(document.getElementById("CargadoNHC2").textContent)
        console.log($("#txtComentarios").val())
        console.log(fechaActualImpresion)
        console.log(fechaTurnoImpresion)
        console.log(fechaAuditadoImpresion)
        console.log(document.getElementById("idPrestador").textContent)
        console.log(document.getElementById("idCod").textContent)
        console.log(document.getElementById("idNombrePract").textContent)
        */


//------uso de fancybox para visualizacion antes de la impresion.

        
        $.fancybox(
		{
		    'autoDimensions': false,
		    'href': pagina,
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

		}
	        );

      
}






//long numeroCarga, string nombre, long dni, long nhc, string destino, DateTime fechaActual, DateTime fechaTurno, DateTime fechaAuditado, string nombreAutorizador, long derivacion

    ///////////////////////////////////////////////////MODIFICACIONES
//var sourceArr = [];
//var mapped = {};
//var idDYT = 0;
//var icd10ID = "";
//var Documento = 0;

//$("#cboPractica").typeahead({
//    updater: function (item) {
//        $("#cboPractica").val(item); //nom
//        $("#txtCodigo").val(mapped[item]); //id
//        icd10ID = mapped[item];
//        return item;
//    },
//    minLength: 4,
//    items: 50,
//    hint: true,
//    highlight: true,
//    source: function (query, process) {
//        var json = JSON.stringify({ "str": query });
//        $.ajax({
//            url: "../Json/Autorizaciones/Autorizaciones.asmx/CargarPractica_Autocomplete",
//            type: 'POST',
//            dataType: "json",
//            data: json,
//            contentType: "application/json; charset=utf-8",
//            success: function (Resultado) {
//                var lista = Resultado.d;
//                $.each(lista, function (i, icd) {
//                    if (i == 0) {
//                        sourceArr.length = 0;
//                    }
//                    str = icd.Descripcion;
//                    nombrePractica = icd.Descripcion;
//                    mapped[str] = icd.Codigo;
//                    idPractica = icd.Codigo;
//                    sourceArr.push(str);
//                });
//                return process(sourceArr);
//            }
//        });
//    }
//});
//var veces = 0;
//function efectoBlink()	{
//	parpadeo = document.getElementById("btnSinResolucion").style;
//	parpadeo.visibility = (parpadeo.visibility == "visible") ? "hidden" : "visible";
//    veces = veces + 1;
//    alert(veces);
//}

//if(veces <= 5){
//var tagBlink = setInterval("efectoBlink()", 500);
//}