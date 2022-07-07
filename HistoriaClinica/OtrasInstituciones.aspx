<%@ Page Language="C#" AutoEventWireup="true" CodeFile="OtrasInstituciones.aspx.cs" Inherits="HistoriaClinica_OtrasInstituciones" EnableEventValidation="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <asp:Button ID='btnSubir' onclick="btnSubir_Click" runat='server' Text='Subir Archivo' UseSubmitBehavior='false' style="display:none"/>
    <div>

<%--        <asp:DropDownList ID="cbo_Tipos" runat="server">
        </asp:DropDownList>--%>



            <div class="label_top" style="margin-left:10px;">

             <div>
             <span id="titulo" >Está por escanear ESTUDIOS DE OTRAS INSTITUCIONES para la Historia Clínica Número: </span><br /><span id="span_paciente_nombre" style="font-size:25px;"><b>Paciente</b></span>
             </div>

              <div>Tipo de Documento</div>
              <asp:DropDownList id="cbo_Tipos" type="text" class="span4" runat="server"  name="cbo_Tipos">
        <%--        <option value="">Seleccione Tipo...</option>--%>
              </asp:DropDownList>
              <input type="hidden" id="numero" value="0" runat="server"/>
              <input type="hidden" id="interno" value="0" runat="server"/>
             <a id="btnScan" class="btn btn-info" style="display:none">Escanear</a>


             <div class="btn-group">
               <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> Seleccione Opción <span class="caret"></span></button>
               <ul class="dropdown-menu" role="menu">
               <li><a href="#" id="OPCescanear"><i class="icon-file"></i>&nbsp;Escanear</a></li>
               <li><a href="#" id="OPCadjuntar"><i class=" icon-upload"></i>&nbsp;Adjuntar</a></li>
               </ul>
               </div>

             <a id="btnVer" class="btn btn-info" style="display:inline">Ver</a>


                     <asp:FileUpload ID='btnAdjuntar' runat='server' AllowMultiple='true' style="display:none"/>
                     

            </div>  

            <div style="width:100%; height:70%">
            <div id="archivos"></div>
            </div>
    </div>
    </form>
</body>
</html>

 <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script> 
        <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script type="text/javascript">
        function ListDocumentacionTipo() {
            $.ajax({
                type: "POST",
                url: "../Json/Documentacion.asmx/DocumentacionListaHC",
                contentType: "application/json; charset=utf-8",
                data: '{interno: "' + $("#interno").val() + '"}',
                dataType: "json",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    $('#cbo_Tipos').append($('<option></option>').val(0).html("Seleccione Tipo..."));
                    $.each(lista, function (index, item) {
                        $('#cbo_Tipos').append($('<option></option>').val(item.id).html(item.descripcion));
                    });
                },
                error: errores
            });
        }

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }


        function CargarPacienteID(ID) {
            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/CargarPacienteID",
                data: '{ID: "' + ID + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    if (lista.length > 0) {
                        $("#span_paciente_nombre").html(lista[0].Paciente);
                    }
                    else alert("Paciente no encontrado.");
                },
                error: errores
            });
        }



        $("#btnScan").click(function () {
        

            if ($("#numero").val() != "0" && $('#cbo_Tipos :selected').val()) {
                var_ = $('#cbo_Tipos :selected').val() + "-" + $("#numero").val() + "-" + $("#interno").val();
                MyObject = new ActiveXObject("WScript.Shell");
                MyObject.Run("file://///10.10.8.71/Software/Escanear_Doc_Ext.exe " + var_);
            }
            else alert("Seleccione tipo de Documento");
        });

        $(document).ready(function () {
            //ListDocumentacionTipo();
            var GET = {};
            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                    return decodeURIComponent(s.split("+").join(" "));
                }
                GET[decode(arguments[1])] = decode(arguments[2]);
            });
            if (GET["numero"] != "" && GET["numero"] != null) {
                $("#numero").val(GET["numero"]);
                $("#span_paciente_nombre").html($("#numero").val());
                //cargarAdjuntos($("#numero").val());
            }

            if (GET["Int"] != "" && GET["Int"] != null && GET["Int"] == "1") {
                $("#titulo").html("Escaneos Internos para la Historia Clínica Número:");
                $("#interno").val("1");
                $("#btnVer").hide();
            }
            ListDocumentacionTipo();
        });


        $("#btnVer").click(function () {
            $.fancybox(
		{
		    'autoDimensions': false,
		    'href': "../HistoriaClinica/verEscaneos.aspx?id=" + $("#numero").val() + "&int=" + $("#interno").val(),
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		});
        });

        function cargarAdjuntos(id) {
            $.ajax({
                type: "POST",
                url: "../Json/Documentacion.asmx/DocumentacionArchivosAutorizaciones",
                data: '{id: "' + id + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    if (lista.length > 0) {
                        var encabezado = "<table>";
                        var fila = "";
                        var pie = "</table>";
                        $.each(lista, function (index, item) {
                            //alert("\\10.10.8.66\\Files\\Software\\Aplicaciones\\" + item.archivo);
                            //desarrollo
                            //fila = "<tr><td><img src='//10.10.8.66/Files/Software/Aplicaciones/" + item.archivo + "' /></td></tr>";
                            //produccion
                            fila = "<tr><td><img src='../EscaneoAutorizacion/" + item.archivo + "' /></td></tr>";
                        });
                        $("#archivos").html(encabezado + fila + pie);
                    }
                },
                error: errores
            });

        }


        $("#OPCescanear").click(function () { $("#btnScan").click(); });
        $("#OPCadjuntar").click(function () {
//            alert($('#cbo_Tipos :selected').val());
//            alert($("#numero").val());
            if ($("#numero").val() != "0" && $('#cbo_Tipos :selected').val()) {
                var_ = $('#cbo_Tipos :selected').val() + "-" + $("#numero").val();
                $("#btnAdjuntar").click();
            }
            else alert("Seleccione tipo de Documento");
        });

        $("#btnAdjuntar").change(function () {
            if ($("#btnAdjuntar").val() != "") {
                $("#btnSubir").click();
            }
        });


    </script>