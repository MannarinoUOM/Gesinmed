<%@ Page Language="C#" AutoEventWireup="true" CodeFile="insumoExtraABM.aspx.cs" Inherits="Compras_insumoExtraABM" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" />
</head>
<body>
    <form id="form1" runat="server">
    <label style="display:inline; margin-left:10px"><b>Insumo:</b> </label>
    <input type="text" id="txtBusqueda" style="width:500px"/>
    <a class=" btn ; btn-info" id="btnBuscar">Buscar</a>
    <a class=" btn ; btn-success" id="btnGuardar">Guardar</a>
    <a class=" btn ; btn-danger" id="btnEliminar">Eliminar</a>
    <div id="resultado">
    
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
<script src="../js/General.js" type="text/javascript"></script>

<script type="text/javascript">
    var insumoId = 0;

    $("#btnBuscar").click(function () {
        insumoId = 0;
        var json = JSON.stringify({ "tipo": 1, "busqueda": $("#txtBusqueda").val(), "id": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/AdministrarInsumosExtras",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: function (Resultado) {
                var lista = Resultado.d;
                var encabezado = "<table class='table table-hover' style='color:black'><tr><td><b>INSUMO</b></td></tr>";
                var fila = "";
                var pie = "</table>";
                $.each(lista, function (index, item) {
                    fila = fila + "<tr style='cursor:pointer' onclick='editar(" + item.COM_GASTOS_EXT_DET_INS_ID + ")'><td id='" + item.COM_GASTOS_EXT_DET_INS_ID + "'>" + item.COM_INS_GASTOS_EXT_DESC + "</td></tr>";
                });
                $("#resultado").html(encabezado + fila + pie);
                $("#txtBusqueda").val("");
            },
            error: errores
        });
    }); 

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    function editar(id) {
        insumoId = id;
        $("#txtBusqueda").val($("#" + id).html());
        $("#btnGuardar").hide();
    }

    $("#btnGuardar").click(function () {
        if ($("#txtBusqueda").val().trim().length <= 0) { alert("Escriba el nombre de un insumo para crearlo o seleccione uno para editarlo."); return false; }
       // return false;

        var json = JSON.stringify({ "tipo": 2, "busqueda": $("#txtBusqueda").val(), "id": insumoId });
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/AdministrarInsumosExtras",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: function (Resultado) {
                $("#txtBusqueda").val("");
                $("#btnBuscar").click();
                alert("Nuevo insumo creado.");
            },
            error: errores
        });
    });

    $("#btnEliminar").click(function () {
    if (insumoId == 0) { alert("Seleccione un insumo para eliminarlo");  return false;}
        var json = JSON.stringify({ "tipo": 3, "busqueda": $("#txtBusqueda").val(), "id": insumoId });
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/AdministrarInsumosExtras",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: function (Resultado) {              
                $("#txtBusqueda").val("");
                $("#btnBuscar").click();
                alert("Insumo dado de baja.");
            },
            error: errores
        });
    });


    $("#txtBusqueda").on("change", function () {
        insumoId = 0;
        $("#btnGuardar").show();
    });

</script>