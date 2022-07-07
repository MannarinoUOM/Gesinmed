<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadodeInsumosaComprar.aspx.cs" Inherits="Compras_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>GesInMed</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/arbol.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="container" style="padding-top:20px; margin-left:10%">
    <span class="titulo_seccion" style="width:100%; text-align:center; padding-bottom:10px">LISTADO DE INSUMOS A COMPRAR</span><br>
    <form id="form1" runat="server">
    <div class="contenedor_4" style="height:450px; width:1000px; padding:20px; margin-top:10px">
    <div class="contenedor_3" style="width:970px; height:400px">
    <div class="contenedor_4" style="width:96%">
    <table class="table">
    <tr><td style="border-color:transparent"><b>Paciente </b><input type="text" id="txtPaciente" /></td><td style="border-color:transparent"><b>NHC </b><input type="text" id="txtNhc" class="numeroEntero"/></td><td style="border-color:transparent"><b>DNI </b><input type="text" id="txtDni" class="numeroEntero" /></td></tr>
    <tr><td><b>Desde </b><input type="text" id="txtDesde" style="text-align:center; width:90px" class="desde1" /> <b>Hasta </b><input type="text" id="txtHasta" style="text-align:center; width:90px" class="hasta1" /></td><td><b>Seccional </b><select id="cboSeccional"></select></td><td><label for="chkAuditado" style="display:inline; margin-left:0px"><b>Con Auditoría </b>
    <input type="checkbox" id="chkAuditado" style="margin-top:0px; display:inline; width:20px" /></label></td></tr>
    </table>
    </div>
    <div class="contenedor_3" style="width:97%; margin-left:15px; height:240px; padding-top:0px; overflow:auto">
    <div id="conFiltros" style="display:none">
      <div>
          <ul class="nav nav-tabs tabslist" style="background-color:#D8D8D8; margin-bottom:0px" data-tabs="tabs">
          <li class="active datos reff reff_activo"><a data-toggle="tab" href="#tab1" id="todosT"><b>Todos (0)</b></a></li>          
          <li class="datos reff"><a data-toggle="tab" href="#tab2" id="pendientesT"><b>Pendientes (0)</b></a></li>
          <li class="datos reff"><a data-toggle="tab" href="#tab3" style="background-color:rgb(88, 250, 88)" id="compradosT"><b>Comprados (0)</b></a></li>
          </ul>
      </div>

        <div id="my-tab-content" class="tab-content" style="overflow:auto; height:220px">
        <div class="tab-pane active fade in DP" id="tab1">
        <%--TODOS--%>
        <div id="TabTodos"></div>
        <div id="buscando" style="padding-left:47%; padding-top:10%; display:none;" class="buscando" >
        <img src="../img/esperar.gif" /><br />        Buscando...
        </div>
        </div>
   
        <div class="tab-pane fade in DP" id="tab2">
       <%-- PENDIENTES--%>
        <div id="TabPendientes"></div>
        <div id="Div2" style="padding-left:47%; padding-top:10%; display:none;" class="buscando" >
        <img src="../img/esperar.gif" /><br />        Buscando...
        </div>
        </div>
      
        <div class="tab-pane fade in DP" id="tab3">
        <%--COMPRADOS--%>
        <div id="TabComprados"></div>
        <div id="Div4" style="padding-left:47%; padding-top:10%; display:none;" class="buscando" >
        <img src="../img/esperar.gif" /><br />        Buscando...
        </div>
        </div>
        </div>
        </div>

        <div id="sinFiltros">
        <div id="tabSinFiltros"></div>
        <div id="Div3" style="padding-left:47%; padding-top:10%; display:none;" class="buscando" >
        <img src="../img/esperar.gif" /><br />        Buscando...
        </div>
        </div>

    </div>
    <div class="pie_gris">
    <a class="btn btn-info pull-right" id="btnBuscar"><i class="ico icon-search"></i>&nbspBuscar</a>
    </div>
    </div>
    </div>
    </form>
    </div>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/Hospitales/Recurrentes.js" type="text/javascript"></script>


<script type="text/javascript">

    $(document).ready(function () {

        parent.document.getElementById("DondeEstoy").innerHTML = "Compras > Internación > <strong>Listado de Insumos a Comprar</strong>";

        $.ajax({
            type: "POST",
            url: "../json/HistoriaClinica/HistoriaClinica.asmx/Seccional_Lista",
            contentType: "application/json; charset=utf-8",
            success: function (Resultado) {
                var lista = Resultado.d;
                 $("#cboSeccional").append(new Option("Seleccione", 0)); 

                $.each(lista, function (index, item) {
                    $("#cboSeccional").append(new Option(item.descripcion, item.id));
                });
            }
        });
        
    });

    $("#txtDesde").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
    $("#txtDesde").datepicker('setDate', 'today');
    $("#txtDesde").keydown(function (e) { e.preventDefault(); });

    $("#txtHasta").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
    $("#txtHasta").datepicker('setDate', 'today');
    $("#txtHasta").keydown(function (e) { e.preventDefault(); });

    var todosT = 0;
    var pendientesT = 0;
    var compradosT = 0;

    $("#btnBuscar").click(function () {
        var auditoria = 0;
        if ($("#chkAuditado").is(":checked")) { auditoria = 1; } else { auditoria = 0; }
        if (auditoria == 1) { $("#conFiltros").show(); $("#sinFiltros").hide(); } else { $("#conFiltros").hide(); $("#sinFiltros").show(); }

        $("#TabTodos").hide();
        $("#TabPendientes").hide();
        $("#TabComprados").hide();
        $("#tabSinFiltros").hide();
        $(".buscando").show();

        todosT = 0;
        pendientesT = 0;
        compradosT = 0;

        var dni;
        var nhc;
        //$("#txtDesde").val(""); $("#txtHasta").val("");
        if ($('#txtNhc').val().trim().length <= 0) { nhc = 0; } else { nhc = $('#txtNhc').val(); }
        if ($('#txtDni').val().trim().length <= 0) { dni = 0; } else { dni = $('#txtDni').val(); }

        //if ($('#txtPaciente').val().trim.length > 0) { $("#txtDesde").val(""); $("#txtHasta").val(""); }
        //if ($("#cboSeccional").val() > 0) { $("#txtDesde").val(""); $("#txtHasta").val(""); }

        var json = JSON.stringify({
            "paciente": $('#txtPaciente').val(),
            "nhc": nhc,
            "dni": dni,
            "desde": $("#txtDesde").val(),
            "hasta": $("#txtHasta").val(),
            "seccional": $("#cboSeccional").val(),
            "auditoria": auditoria
        });

        console.log(json);

        $.ajax({
            type: "POST",
            url: "../json/HistoriaClinica/HistoriaClinica.asmx/BuscarPedidoMaterial",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var visible;
                if (auditoria == 1) { visible = "show"; } else { visible = "none"; }
                var lista = Resultado.d;
                var encabezado = "<table class='table table-hover'><tr style='background-color:#CCCCCC'><td><b>Afiliado</b></td><td><b>Fecha</b></td><td style='display:" + visible + "; width:12%'></td></tr>";
                var filaTodos = "";
                var filaPendientes = "";
                var filaComprados = "";
                var filaSinFiltros = "";
                var pie = "</table>";
                var boton;
                var botonTodos;

                $.each(lista, function (index, item) {

                    if (auditoria == 1) {
                        switch (item.estado) {
                            //                        case 0:                
                            //                            boton = "<a id='boton" + item.idCarga + "' data-id='" + item.idCarga + "' class='btn btn-mini estado '>PENDIENTE</a>";                
                            //                            break;                

                            case 1:
                                boton = "<a id='boton" + item.idCarga + "' data-id='" + item.idCarga + "' style='color:black' class='btn btn-mini estado btn" + item.idCarga + "'>Cambiar Estado</a>";
                                botonTodos = "<a id='boton" + item.idCarga + "' data-id='" + item.idCarga + "' style='color:black' data-tipo='todos' class='btn btn-mini estado btn" + item.idCarga + "'>Cambiar Estado</a>";
                                filaTodos = filaTodos + "<tr style='cursor:pointer' class='tr" + item.idCarga + "' ><td class='ver' id='" + item.idCarga + "'>" + item.afiliado + "</td><td class='ver' id='" + item.idCarga + "'>" + item.fechaCirugia + "</td><td style='display:" + visible + "'>" + botonTodos + "</td><td style='display:none' id='" + item.idCarga + "' class='estado" + item.idCarga + "'>" + item.estado + "</td></tr>";
                                filaPendientes = filaPendientes + "<tr style='cursor:pointer' class='trP" + item.idCarga + "' ><td class='ver' id='" + item.idCarga + "'>" + item.afiliado + "</td><td class='ver' id='" + item.idCarga + "'>" + item.fechaCirugia + "</td><td style='display:" + visible + "'>" + boton + "</td><td style='display:none' id='estado" + item.idCarga + "' class='estado" + item.idCarga + "'>" + item.estado + "</td></tr>";
                                todosT += 1;
                                pendientesT += 1;
                                break;

                            case 2:
                                boton = "<a id='boton" + item.idCarga + "' data-id='" + item.idCarga + "' class='btn btn-mini estado btn" + item.idCarga + "'>Cambiar Estado</a>";
                                botonTodos = "<a id='boton" + item.idCarga + "' data-id='" + item.idCarga + "' data-tipo='todos' class='btn btn-mini estado mini" + item.idCarga + "'>Cambiar Estado</a>";
                                filaTodos = filaTodos + "<tr style='cursor:pointer; background-color:rgb(88, 250, 88)' class='tr" + item.idCarga + "'><td class='ver' id='" + item.idCarga + "'>" + item.afiliado + "</td><td class='ver' id='" + item.idCarga + "'>" + item.fechaCirugia + "</td><td style='display:" + visible + "'>" + botonTodos + "</td><td style='display:none' id='estado" + item.idCarga + "' class='estado" + item.idCarga + "'>" + item.estado + "</td></tr>";
                                filaComprados = filaComprados + "<tr style='cursor:pointer; background-color:rgb(88, 250, 88) 'class='trC" + item.idCarga + "'><td class='ver' id='" + item.idCarga + "'>" + item.afiliado + "</td><td class='ver' id='" + item.idCarga + "'>" + item.fechaCirugia + "</td><td style='display:" + visible + "'>" + boton + "</td><td style='display:none' id='estado" + item.idCarga + "' class='estado" + item.idCarga + "'>" + item.estado + "</td></tr>";
                                todosT += 1;
                                compradosT += 1;
                                break;
                        }
                    } else {
                        filaSinFiltros = filaSinFiltros + "<tr style='cursor:pointer' ><td class='ver' id='" + item.idCarga + "'>" + item.afiliado + "</td><td class='ver' id='" + item.idCarga + "'>" + item.fechaCirugia + "</td><td style='display:" + visible + "'>" + boton + "</td><td style='display:none' id='estado" + item.idCarga + "'>" + item.estado + "</td></tr>";
                    }
                });

                $("#TabTodos").html(encabezado + filaTodos + pie);
                $("#TabPendientes").html(encabezado + filaPendientes + pie);
                $("#TabComprados").html(encabezado + filaComprados + pie);
                $("#tabSinFiltros").html(encabezado + filaSinFiltros + pie);

                $("#todosT").html("<b>Todos (" + todosT + ")<b>");
                $("#pendientesT").html("<b>Pendientes (" + pendientesT + ")</b>");
                $("#compradosT").html("<b>Comprados (" + compradosT + ")</b>");

            },
            complete: function () { $(".buscando").hide(); $("#TabTodos").show(); $("#TabPendientes").show(); $("#TabComprados").show(); $("#tabSinFiltros").show(); }
        });
    });

    $(".ver").live('click', function () {

        $.fancybox({
            'autoDimensions': false,
            'href': "../HistoriaClinica/PedidodeMateriales.aspx?id=" + $(this).attr('id') + "",
            'width': '100%',
            'height': '100%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'showCloseButton': true,
            'onClosed': function () { $("#btnBuscar").click(); }
        });
    });

    $(".estado").live("click", function () {
        var mensaje;
        var estado;
        var id = $(this).data('id');
        var estadoActual = $("#estado" + id).html();
        var tipo = $(this).data('tipo');
        switch (estadoActual) {
            //            case "0":                
            //                mensaje = "COMPRADO";                
            //                estado = 2;                
            //                break;                
            case "1":
                mensaje = "Comprado";
                estado = 2;
                break;
            case "2":
                mensaje = "Pendiente";
                estado = 1;
                break;
        }

        var r = confirm("¿Desea cambiar el estado del pedido a " + mensaje + "?");
        if (r) {
            var json = JSON.stringify({ "estado": estado, "id": id });
            console.log(json);
            var filaEdit;
            $.ajax({
                type: "POST",
                url: "../json/HistoriaClinica/HistoriaClinica.asmx/ActualizarEstadoPedido",
                contentType: "application/json; charset=utf-8",
                data: json,
                dataType: "json",
                success: function (Resultado) {
                    //                    alert("estadoActual: " + estadoActual);
                    //                    alert("Resultado: " + Resultado.d);
                    //                    alert(tipo);
                    if (Resultado.d == 1) {

                        switch (estadoActual) {
                            //                            case "0":                
                            //                                $("#boton" + id).addClass("btn-success");                
                            //                                $("#boton" + id).html("COMPRADO");                
                            //                                $("#estado" + id).html("2");                
                            //                                break;                

                            case "1":
                               // alert();
                                $(".btn" + id).removeClass("btn-success");
                                $(".btn" + id).html("Cambiar Estado");
                                $(".btn" + id).css("color", "black");
                                $(".estado" + id).html("2");
                                $(".tr" + id).css("background-color", "#58fa58");
                                if (tipo == "todos") {
                                    //alert(id);
                                    //$(".tr" + id).css("background-color", "#58fa58");
                                    filaEdit = "<tr style='cursor:pointer; background-color:rgb(88, 250, 88)' class='trC" + id + "'>" + $(".tr" + id).html() + "</tr>";
                                } else {
                                    filaEdit = "<tr style='cursor:pointer; background-color:rgb(88, 250, 88)' class='trC" + id + "'>" + $(".trP" + id).html() + "</tr>";
                                }

                                $(".trP" + id).hide();
                                $("#TabComprados tbody ").append(filaEdit);

                                pendientesT -= 1;
                                compradosT += 1;
                                $("#pendientesT").html("<b>Pendientes (" + pendientesT + ")</b>");
                                $("#compradosT").html("<b>Comprados (" + compradosT + ")</b>");
                                break;

                            case "2":
                               // $(".btn" + id).addClass("btn-success");
                                $(".btn" + id).html("Cambiar Estado");
                                $(".btn" + id).css("color","black");
                                $(".estado" + id).html("1");
                                $(".tr" + id).css("background-color", "#ffffff");
                                if (tipo == "todos") { filaEdit = "<tr style='cursor:pointer' class='trP" + id + "'>" + $(".tr" + id).html() + "</tr>"; } else {
                                    filaEdit = "<tr style='cursor:pointer' class='trP" + id + "'>" + $(".trC" + id).html() + "</tr>";
                                }

                                $(".trC" + id).hide();
                                $("#TabPendientes tbody ").append(filaEdit);

                                pendientesT += 1;
                                compradosT -= 1;
                                $("#pendientesT").html("<b>Pendientes (" + pendientesT + ")</b>");
                                $("#compradosT").html("<b>Comprados (" + compradosT + ")</b>");

                                break;
                        }
                    } else { alert("No se pudo actualizar el estado del pedido."); }
                }
            });
        }
    });


    $(".datos").click(function () {
        $(".datos").removeClass('reff_activo');
        $(".datos").removeClass('active');
        $(this).addClass('reff_activo');
    });
</script>