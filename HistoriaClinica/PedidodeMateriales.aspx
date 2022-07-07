<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PedidodeMateriales.aspx.cs" Inherits="HistoriaClinica_PedidodeMateriales" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>GesInMed</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/arbol.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet"/>
</head>
<body>
<div class="container" style="margin-top:5%; margin-left:13%">

    <!-- Wrapper for slides -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
    <div class="carousel-inner" role="listbox" style="width:100%">
    <div class="item active">
    <div class="clearfix">
    </div>
    <!-- Wrapper for slides -->


    <form id="form1" runat="server">
    <span class="titulo_seccion" style="width:100%; text-align:center">FORMULARIO PARA PEDIDO DE MATERIALES</span>
    <div class="contenedor_a" style="height:480px">
    <div class=" contenedor_migue" style="width:95%; margin-left:2%; height:20px; padding:5px; margin-bottom:10px"> 
    <div>
    <label style="display:inline" for="rodProgramado">PROGRAMADO</label><input type="radio" name="prioridad" id="rodProgramado" checked="checked" style="margin:0px 0px 5px 5px" value="0" class="deshabilitar" />
    <label style="display:inline" for="rodUrgencia">&nbsp&nbspURGENCIA</label><input type="radio" name="prioridad" id="rodUrgencia" style="margin:0px 0px 5px 5px" value="1" class="deshabilitar" />
    </div>
    </div>

    <div class=" contenedor_migue"  style="width:95%; margin-left:2%; height:150px; padding:5px; margin-bottom:10px">
    <span>ALQUILER DE EQUIPOS</span>
    <div>
    <textarea cols="10" id="txtEquipos" style="width:98%" class="deshabilitar" ></textarea>
    </div>
    <span>COMPRA DE INSUMOS</span>
    <div>
    <textarea cols="10" id="txtInsumos" style="width:98%" class="deshabilitar" ></textarea>
    </div>
    </div>

    <div class=" contenedor_migue" style="width:95%; margin-left:2%; height:120px; padding:5px; margin-bottom:10px">
    <span><label style="display:inline; margin-left:110px">Diagnóstico </label><input type="text" id="txtDiagnostico" class="deshabilitar" /></span><br />
    <span><label style="display:inline">Fecha Probable de Cirugía </label>&nbsp&nbsp&nbsp&nbsp<input type="text" id="txtFechaCirugia" style="text-align:center" class="deshabilitar" /></span><br />
    <span><label style="display:inline">Servicio que realiza el pedido </label><input type="text" id="txtServicio" class="deshabilitar" /></span>
    </div>

    <div class=" contenedor_migue" style="width:95%; margin-left:2%; height:90px; padding:5px; margin-bottom:10px">
    <span>RESERVADO PARA AUDITORIA</span>
    <img id="NubeFalse" src="../img/NubeFalse.png" width="40px" style="margin-bottom:10px; display:none"" />
    <img id="NubeAnimation" src="../img/NubeAnimation.gif" width="40px" style="margin-bottom:10px; display:none"/>
    <img id="NubeTrue" src="../img/NubeTrue.png" width="40px" style="margin-bottom:10px; display:none" />
    <div>
    <textarea rows"10" cols="10" id="txtAuditoria" style="width:98%" disabled="disabled"></textarea>
    </div>
    </div>
    <div style="background-color:#CCCCCC; height:60px; padding:7px">
    <div class="pull-right">
    <a class="btn btn-info" id="btnCancelar" style="display:none"><i class=" icon-ban-circle"></i>&nbspCancelar Auditoria</a>
    <a class="btn btn-info" id="btnImprimir" style="display:none"><i class="icon-print"></i>&nbspImprimir</a>
    <a class="btn btn-info" id="btnSiguiente"><i class=" icon-arrow-right"></i>&nbspSiguiente</a>
    <a class="btn btn-info" id="btnGuardar" style="display:none"><i class="icon-hdd"></i>&nbspGuardar</a>
    </div>
    </div>
    </div>
    
    </form>

    </div>
    <div class="item"> <%-- “Resúmen de Historia Clínica”-----------------------------------------------------------------------------------------------%> 
    <div class="clearfix">
    </div>
    
    <form id="form2">
    <span class="titulo_seccion" style="width:100%; text-align:center">RESUMEN DE HISTORIA CLINICA</span>
    <div class="contenedor_a" style="height:480px">
    <div class=" contenedor_migue" style="width:95%; margin-left:2%; height:90%; padding:5px; margin-bottom:10px"> 
    <label>Antecedentes de la enfermedad</label><textarea id="txtAntecendentes" type="text" style="width:98%" class="completar" name="Antecedentes de la enfermedad"> </textarea> 
    <label>Tratamiento indicado</label><textarea id="txtTratamiento" type="text" style="width:98%" class="completar" name="Tratamiento indicado"></textarea>
    <label>Estado actual</label><textarea id="txtActual" type="text" style="width:98%" class="completar" name="Estado actual"></textarea>
    <label>Estado funcional</label><textarea id="txtFuncional" type="text" style="width:98%" class="completar" name="Estado funcional"></textarea>
    <label>Complicaciones y/o morbilidades</label><textarea id="txtComplicaciones" type="text" style="width:98%" class="completar" name="Complicaciones y/o morbilidades"></textarea>
    </div>
    <div style="background-color:#CCCCCC; height:40px; padding-top:10px; padding-left:20px; margin-top:20px">
    <div class="pull-right" style="width:100%">
    <a class="btn btn-info" id="btnVolver" style="display:inline"><i class=" icon-arrow-left"></i>&nbspVolver</a>
    <a class="btn btn-info" id="btnConfirmar" style="display:inline; margin-left:77%"><i class="icon-hdd"></i>&nbspGuardar</a>
    </div>
    </div>
    </div>
    </form>
    </div>
    </div>
    </div>

</div>
</body>
</html>

<!-- Left and right controls -->

  
  <a class="left carousel-control success" href="#myCarousel" role="button" data-slide="prev" style="display:none; height:60px; width:120px; padding-top:15px; margin-top:10%">
    <label class="mensaje1" style="font-size:xx-small">RESUMEN DE</br>HISTORIA CLINICA</label>
    <label class="mensaje2" style="display:none; font-size:xx-small">FORMULARIO PARA</br>PEDIDO DE MATERIALES</label>
<%--    <i class="icon icon-chevron-left icon-white"  aria-hidden="true"  style="margin-top:10px; height:20px; width:20px"></i>--%>
  </a>

 
  <a class="right carousel-control success" href="#myCarousel" role="button" data-slide="next"  style="display:none; height:60px; width:120px; padding-top:15px; margin-top:10%">
   <label class="mensaje1" style="font-size: xx-small">RESUMEN DE</br>HISTORIA CLINICA</label>
   <label class="mensaje2" style="display:none; font-size:xx-small">FORMULARIO PARA</br>PEDIDO DE MATERIALES</label>

<%--    <i class="icon icon-chevron-right icon-white" aria-hidden="true" style="margin-top:10px; height:20px; width:20px"></i>--%>
  </a>

  <div id="informar" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header"></div>
  <div class="modal-body"><h1 style="margin-left:20%">GUARDADO.</h1></div>
  <div class="modal-footer"><a class="btn" id="btnClose">Cerrar</a></div>
  </div>


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<script type="text/javascript">
var idCarga = 0;
var afiliadoId;
var M;
var imprime = 0;

$(document).ready(function () {
    var GET = {};


    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["afiliadoId"] != "" && GET["afiliadoId"] != null) {
        afiliadoId = GET["afiliadoId"];
    }


    if (GET["id"] != "" && GET["id"] != null) {
        idCarga = GET["id"];
        cargarPedido(idCarga);
    }


    if (GET["M"] != "" && GET["M"] != null) {
        M = GET["M"];
    } else { $("#NubeFalse").show(); }

    $("#txtFechaCirugia").keydown(function (e) { e.preventDefault(); });
    $("#txtFechaCirugia").datepicker();
});

$("#btnClose").click(function () { $("#informar").hide(); parent.$.fancybox.close(); });

$("#btnGuardar").click(function () {

    if (afiliadoId == 0 || afiliadoId == null) { alert("No se pudo determinar el afiliado. Vuelva a intentarlo"); return false; }
    var pedido = {};

    pedido.idCarga = idCarga;
    pedido.prioridad = $('input:radio[name=prioridad]:checked').val();
    pedido.equipos = $("#txtEquipos").val();
    pedido.insumos = $("#txtInsumos").val();
    pedido.diagnostico = $("#txtDiagnostico").val();
    pedido.fechaCirugia = $("#txtFechaCirugia").val();
    pedido.servicio = $("#txtServicio").val();
    pedido.auditoria = $("#txtAuditoria").val();
    pedido.antecedentes = $("#txtAntecendentes").val();
    pedido.tratamiento = $("#txtTratamiento").val();
    pedido.actual = $("#txtActual").val();
    pedido.funcional = $("#txtFuncional").val();
    pedido.Complicaciones = $("#txtComplicaciones").val();
    pedido.afiliadoId = afiliadoId;

    var json = JSON.stringify({ "pedido": pedido });

    $.ajax({
        type: "POST",
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/GuardarPedidoMaterial",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            if (M === undefined)
                $("#NubeTrue").hide();
            $("#NubeAnimation").show();
            $("#NubeFalse").hide();
        },
        success: function (Resultado) {

            // if (idCarga == 0) { alert("ATENCIÓN!!! Ha perdido sesión y no se guardarán sus cambios. Vuelva a loguearse para continuar."); return false; }
            idCarga = Resultado.d;

            if (M == 1) {  $("#btnGuardar").hide(); $("#informar").modal('show'); }

            if (M === undefined && imprime == 1) {
                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/ImpresionPedidoMaterial.aspx?idCarga=" + idCarga + "",
                    'width': '100%',
                    'height': '100%',
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'showCloseButton': true
                });
                imprime = 0;
            }
            if (M === undefined)
                $("#NubeTrue").show();
            $("#NubeAnimation").hide();
            $("#NubeFalse").hide();
        },
        error: errores
    });

});

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    $("#btnImprimir").click(function () {
        imprime = 1;
        $("#btnGuardar").click();

    });

    function cargarPedido(id) {
        var json = JSON.stringify({ "id": id });
        $("#btnGuardar").hide();
        $("#btnConfirmar").hide();
        $(".completar").attr('disabled', true);
        $(".right").show();
        $(".left").show();
        $("#btnSiguiente").hide();
        $("#derecha").text("RESUMEN DE HISTORIA CLINICA");
        $("#izquierda").text("RESUMEN DE HISTORIA CLINICA");

        $.ajax({
            type: "POST",
            url: "../Json/HistoriaClinica/HistoriaClinica.asmx/traerPedidoMaterial",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                afiliadoId = Resultado.d.afiliadoId;
                if (Resultado.d.prioridad == 0) { $("#rodProgramado").attr('checked', true); }
                if (Resultado.d.prioridad == 1) { $("#rodUrgencia").attr('checked', true); }
                $("#txtEquipos").val(Resultado.d.equipos);
                $("#txtInsumos").val(Resultado.d.insumos);
                $("#txtDiagnostico").val(Resultado.d.diagnostico);
                $("#txtFechaCirugia").val(Resultado.d.fechaCirugia);
                $("#txtServicio").val(Resultado.d.servicio);
                $("#txtAuditoria").val(Resultado.d.auditoria);

                $("#txtAntecendentes").val(Resultado.d.antecedentes);
                $("#txtTratamiento").val(Resultado.d.tratamiento);
                $("#txtActual").val(Resultado.d.actual);
                $("#txtFuncional").val(Resultado.d.funcional);
                $("#txtComplicaciones").val(Resultado.d.Complicaciones);


                if (Resultado.d.edita == 1) { $("#txtAuditoria").attr('disabled', false); $("#btnCancelar").show(); } else { $("#txtAuditoria").attr('disabled', true); $("#btnCancelar").hide(); } 

                $("#btnImprimir").show();

            },
            complete: function () { $(".deshabilitar").attr('disabled', true); }
        });
    }
    $("#txtAuditoria").on('keyup', function (e) {

        if (M === undefined) {
            $("#NubeTrue").hide();
            $("#NubeAnimation").hide();
            $("#NubeFalse").show();
        }
        if (e.keyCode == 32) { $("#btnGuardar").click(); } 
    });
            $("#txtAuditoria").on('focusout', function () { if(M === undefined) { $("#btnGuardar").click(); } });

            $("#btnCancelar").click(function () {
                $("#txtAuditoria").val("");
                var json = JSON.stringify({ "idCarga": idCarga });
                $.ajax({
                    type: "POST",
                    url: "../Json/HistoriaClinica/HistoriaClinica.asmx/EliminarAuditoriaPedidoMaterial",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {

                    },
                    success: function (Resultado) { }

                })
            });


            // parent.$("#fancybox-close").live('click', function () { alert(); })

            $("#btnSiguiente").click(function () { $(".right").click(); });
            $("#btnVolver").click(function () { $(".left").click(); });

            $("#btnConfirmar").click(function () {
                var mensaje = "DEBEN ESTAR COMPLETOS TODOS LOS CAMPOS";
                //var mensaje = "COMPLETE LOS SIGUIENTES CAMPOS:\n";
                var guardar = 0;
                $(".completar").each(function (index, item) {
                    //                    if ($(this).val().trim().length <= 0) {
                    //                        mensaje += $(this).attr('name') + "\n";
                    //                    }
                    if ($(this).val().trim().length > 0) {
                        guardar += 1;
                    }
                })

//                alert(guardar);
//                return false;
                if (guardar == 5) { $("#btnGuardar").click(); } else { alert(mensaje); } 
            });

            $(".right").click(function () {
                $(".mensaje1").toggle();
                $(".mensaje2").toggle();
            });
            $(".left").click(function () {
                $(".mensaje1").toggle();
                $(".mensaje2").toggle();
            });

            </script>