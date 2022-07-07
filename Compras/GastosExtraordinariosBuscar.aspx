<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GastosExtraordinariosBuscar.aspx.cs" Inherits="Compras_GastosExtraordinariosBuscar" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container" style="padding-top:30px;">
  <div class="contenedor_1">
   <div class="contenedor_3" style="height:530px;">
      <form id="frm_Main" name="frm_Main">
        <div class="">
          <div class="contenedor_4 pagination-centered" style="height:150px; margin-top:5px;">
          
              <div id="controltxtNHC" class="control-group" style="display:inline; margin:25px 25px 0px 25px;">
                    <label for="txtNHC" style="display:inline; margin-top:10px;">NHC: </label>
                    <input type="text" id="txtNHC" name="txtNHC" placeholder="Ingrese NHC" class="input-medium" style="margin-top:10px; margin-left:25px;width:250px;" />
              </div>
              <div id="controltxtNroPed" class="control-group" style="margin:0px 25px 0px 25px;">
                    <label for="txtNroPed" style="display:inline; margin-top:10px;">Pedido: </label>
                    <input type="text" id="txtNroPed" name="txtNroPed" placeholder="Ingrese Nro de Pedido" class="input-medium" style="margin-top:10px; margin-left:10px; width:250px;" />
              </div>
               <div id="controltxtNombre" class="control-group" style="margin:0px 25px 25px 25px;">
                    <label for="txtNombre" style="display:inline; margin-top:10px;">Paciente: </label>
                    <input type="text" id="txtNombre" name="txtNombre" placeholder="Ingrese Nombre" class="input-medium" style="margin-top:10px; width:250px;" />
              </div>
          
          </div>
           
          </div>
          <div class="contenedor_4 pagination-centered" style="height:150px; margin-top:5px;">
               
               <div id="controldesde" class="control-group" style="display:inline; margin:10px 10px 0px 10px;"><label for="desde" style="display:inline;">Desde: </label><input type="text" id="desde" name="desde" class="input-small" style="margin-top:10px; margin-left:11px"" /></div><br />
               <div id="controlhasta" class="control-group" style="display:inline; margin:0px 10px 10px 10px;"><label for="hasta" style="display:inline;">Hasta: </label><input type="text" id="hasta" name="hasta" class="input-small" style="margin-top:10px; margin-left:16px" /></div>
         
          </div>

          </form>
          <div class="clearfix"></div>
        <!--Tabla de estudios-->
        <div style="padding:0px 15px 0px 15px;">
            
            <div class="clearfix"></div>
              <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div>   
            <div id="TablaPedidos_div" class="tabla" style="height:320px;width:100%;">
              <table class="table table-hover table-condensed">
                <thead>					
                  <tr>
                    <th></th>
                    <th>Pedido</th>
                    <th>Fecha</th>
                    <th>NHC</th>
                    <th>Paciente</th>
                    <th>Servicio</th>
                    <th>Usuario</th>
                  </tr>
                </thead>

              </table>
            </div>
        </div>
        <div class="clearfix"></div>

<div class="pie_gris">
<div class="pull-right" style="height:90px;">
<a id = "btnBuscar" class="btn btn-info"><i class=" icon-search icon-white"></i>&nbsp;Buscar</a>
<a id = "btnCargar" class="btn btn-warning"><i class=" icon-ok icon-white"></i>&nbsp;Cargar Pedido</a>
</div>
</div>
      </div>
    </div>
  </div>

<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        InitControls();
    });

    function InitControls() {
        $("#txtNroPed").mask("9?99999999", { placeholder: "", clearOnLostFocus: true });
        $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
        $("#desde").mask("99/99/9999", { placeholder: "-" });
        $("#hasta").mask("99/99/9999", { placeholder: "-" });
        var currentDt = new Date();
        var mm = currentDt.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;
        var yyyy = currentDt.getFullYear();
        var dia = currentDt.getDate() > 9 ? currentDt.getDate() : '0' + currentDt.getDate();
        var d = dia + '/' + mm + '/' + yyyy;
        var p = '01' + '/' + mm + '/' + yyyy;
        $("#desde").val(p);
        $("#hasta").val(d);
        List_Servicios();
    }

    $(function () {
        $("#desde").datepicker({
            onClose: function (selectedDate) {
                $("#hasta").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#hasta").datepicker({
            onClose: function (selectedDate) {
                $("#desde").datepicker("option", "maxDate", selectedDate);
            }
        });
    });


    $("#desde").blur(function () {
        $("#desde").removeClass("error");
    });

    $("#hasta").blur(function () {
        $("#hasta").removeClass("error");
    });

    $("#txtNroPed").keypress(function (event) {
        if (event.which == 13) {
            if ($('#txtNroPed').attr('readonly') == undefined) {
                $("#btnBuscar").click();
            }
        }
    });

    function List_Servicios() {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: List_Servicios_Cargado,
            error: errores
        });
    }

    $("#btnCargar").click(function () {
        window.location = "CargarPedidoporPaciente.aspx";
    });

    function List_Servicios_Cargado(Resultado) {

        var Servicio = Resultado.d;
        $('#Servicio1').empty();
        $('#Servicio2').empty();

        total_serv = Servicio.length;
        var mitad1 = Math.ceil(total_serv / 2);
        var i = 0;

        for (i = 0; i < mitad1; i++) {
            $('#Servicio1').append('<label class="checkbox"><input class="checks" checked disabled onclick=Set() id="CBS' + i + '" type="checkbox" value="' + Servicio[i].id + '">' + Servicio[i].descripcion + '</label>');
        }

        for (i = mitad1; i <= (total_serv - 1); i++) {
            $('#Servicio2').append('<label class="checkbox"><input class="checks" checked disabled onclick=Set() id="CBS' + i + '" type="checkbox" value="' + Servicio[i].id + '">' + Servicio[i].descripcion + '</label>');
        }

    }

    function Set() {
        $("#cbo_Todos_Especialidades").removeAttr("checked");
        $("#chk_Ninguno").removeAttr("checked");
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    $("#btnBuscar").click(function () {
        var valid = $("#frm_Main").valid();
        if (valid) {
            objBusquedaLista = "";
            for (var j = 0; j < total_serv; j++) {

                if ($('input[id=CBS' + j + ']').is(':checked')) {
                    objBusquedaLista = objBusquedaLista + $('input[id=CBS' + j + ']:checked').val() + ",";
                }
            }
            Buscar_Pedidos();
        }
    });

    function Buscar_Pedidos() {
        var json = JSON.stringify({ "NHC": $('#txtNHC').val(), "Id": $('#txtNroPed').val(), "Apellido": $('#txtNombre').val(), "Desde": $('#desde').val(), "Hasta": $('#hasta').val(), "objBusquedaLista": objBusquedaLista });
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/BuscarPPP",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Pedidos_Cargados,
            error: errores,
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaPedidos_div").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaPedidos_div").show();
            }
        });
    }

    function Pedidos_Cargados(Resultado) {
        Pedidos = Resultado.d;
        if (Pedidos != null) {
            var Tabla_Datos = "";
            Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Pedido</th><th>Fecha</th><th>NHC</th><th>Paciente</th><th>Servicio</th><th>Usuario</th></tr></thead><tbody>";
            $.each(Pedidos, function (index, Pedido) {
                Tabla_Datos = Tabla_Datos + "<tr";
                Tabla_Datos = Tabla_Datos + " style='cursor:pointer' onclick=Ventana('CargarPedidoporPaciente.aspx?PedidoId=" + Pedido.Pedido_Id + "');";
                Tabla_Datos = Tabla_Datos + "><td>" + Pedido.Pedido_Id + "</td><td>" + Pedido.Fecha + "</td><td>" + Pedido.NHC + "</td><td>" + Pedido.Paciente + "</td><td>" + Pedido.Servicio + "</td><td>" + Pedido.Usuario + "</td></tr>";
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        }
        else $("#TablaPedidos_div").empty();

    }

    function Ventana(url) {
        document.location = url;
    }

</script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<!--Barra sup--> 
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > <strong> Gastos Extraordinarios > Buscar Gastos Extraordinarios</strong>";
</script> 

</body>
</html>

