<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IMGMedicoFirma.aspx.cs" Inherits="Imagenes_Turno_IMGMedicoFirma" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="form1" runat="server">


    <div id="Mensaje_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Mensaje_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Titulo Mensaje</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Mensaje_Mensaje">           
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">
            <a class="btn btn-info" id="Mensaje_btn_Aceptar">Aceptar</a>
            <a class="btn btn-danger" style="display:none;" id="Mensaje_btn_cancelar">Cancelar</a>
            <a class="btn btn-success" style="display:none;" id="Mensaje_btn_turno_forzado">Turno Forzado</a>
         </div>
         <div style="clear:both;"></div>
    </div>
    </div>



    <div id="Editar_Div" style="background:rgba(0,0,0,0.6); display:none; position:fixed; width:100%; height:100%; z-index:9999;left:0;top:0;">
    <div style="background:white; margin:30px auto; width:500px; min-height:165px; border-radius:5px;padding-bottom:10px;">
         <div id="Editar_Titulo" style="text-align:center; font-size:21px; padding-top:10px;">Rechazar Turno</div>
         <hr />
         <div style="margin:5px 10px 5px 10px;" id="Editar_Mensaje">           
            ID: <span id="span_medico_id"></span><br />           
            Médico: <span id="span_medico_nombre"></span><br />           
            Abreviatura: <input type="text" id="txt_editar_abreviatura" maxlength="20"  style="width:368px;" /><br />           
            Usuario: <select id="cbo_usuario" style="width:407px;"></select><br /> 
            Sobre Firma: <input type="text" id="txt_editar_sobrefirma" maxlength="50"  style="width:363px;" /><br />           
            Firma: <input type="file" id="txt_archivo" style="width:400px;" /><br />           
            <img id="img_firma" style="max-width:200px;" />            
         </div>
         <hr />
         <div style="float:right; margin-right:10px;">                        
            <a class="btn btn-danger" id="Editar_btn_cancelar">Cancelar</a>
            <a class="btn btn-success" id="Editar_btn_guardar">Guardar</a>
         </div>
         <div style="clear:both;"></div>
    </div>
</div>



    <div>            
        <div class="Contenedor_Info_Medico well">
            <div>
                <span>Médico:</span>
                <select id="cbo_Medico"></select>        
                <a class="btn btn-success" style="margin-bottom: 5px;" id="btn_medicofirma_insertar">Agregar</a>
            </div>
            <div style="max-height:500px; overflow:auto;">
                <table class="table table-condensed"><tr><td></td><td>Médico</td><td>Usuario</td><td>Abreviación</td><td>Sobre Firma</td><td>Firma</td></tr><tbody id="tabla"></tbody></table>
            </div>
        </div>                
    </div>

    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script> 

    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>    
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>        
    <script src="../js/GeneralG.js" type="text/javascript"></script>    
    <script>
        function Cargar_Todos_Los_Medicos() {
            var json = JSON.stringify({ "Especialidad": 0, "Tipo": "A" });
            $.ajax({
                type: "POST",
                url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: TodosLosMedicos_Cargados,
                error: errores
            });

        }

        function TodosLosMedicos_Cargados(Resultado) {
            var Medicos = Resultado.d;
            $('#cbo_Medico').empty();            
            $.each(Medicos, function (index, medicos) {
                $('#cbo_Medico').append($('<option></option>').val(medicos.Id).html(medicos.Medico));
            });
        }




        function ActualizarMensaje(Titulo, Mensaje) {
            $("#Mensaje_Titulo").html(Titulo);
            $("#Mensaje_Mensaje").html(Mensaje);
            $("#Mensaje_Div").show();
        }

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            ActualizarMensaje("Error", jsonObj.Message);
        }

        Cargar_Todos_Los_Medicos();

        $("#btn_medicofirma_insertar").click(function () {            
            MedicoFirma_Insertar($("#cbo_Medico").val());
        });

        function MedicoFirma_Insertar(MedicoId) {
            var json = JSON.stringify({ "MedicoID": MedicoId });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_MEDICO_FIRMA_AGREGAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    MedicosFirmas_Listar(0);
                },
                error: errores
            });

        }

        function Editar(MedicoID) {            
            MedicosFirmas_Listar(MedicoID);
        }

        function Eliminar(MedicoId) {
            var json = JSON.stringify({ "MedicoID": MedicoId });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_MEDICO_FIRMA_QUITAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    MedicosFirmas_Listar(0);
                },
                error: errores
            });
        }

        function MedicosFirmas_Listar(MedicoID) {
            var json = JSON.stringify({ "MedicoID": MedicoID });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_MEDICO_FIRMA_INFO",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var Auxi = "";
                    var Datos = Resultado.d;
                    if (MedicoID == 0) {
                        $.each(Datos, function (index, dato) {
                            Auxi = Auxi + "<tr><td style='width:150px;'><a class='btn btn-info' onclick='Editar(" + dato.IMF_MEDICOID + ");'>Editar</a><a class='btn btn-danger' onclick='Eliminar(" + dato.IMF_MEDICOID + ");'>Eliminar</a></td><td>" + dato.MEDICO + "</td><td>" + dato.USUARIO_NOMBRE + "</td><td>" + dato.ABREVIACION + "</td><td>" + dato.SOBREFIRMA + "</td><td><img src='../img/Firmas_IMG/" + dato.IMF_MEDICOID + ".png' width=100px ></td></tr>";
                        });
                        $("#tabla").html(Auxi);
                    }
                    else {
                        $.each(Datos, function (index, dato) {
                            $("#span_medico_id").html(dato.IMF_MEDICOID);
                            $("#span_medico_nombre").html(dato.MEDICO);
                            $("#txt_editar_abreviatura").val(dato.ABREVIACION);
                            $("#txt_editar_sobrefirma").val(dato.SOBREFIRMA);
                            $("#cbo_usuario").val(dato.USUARIO_ID);
                            $("#img_firma").attr("src", "../img/Firmas_IMG/" + dato.IMF_MEDICOID + ".png");
                            $("#Editar_Div").show();
                        });
                    }
                },
                error: errores
            });

        }

        MedicosFirmas_Listar(0);



        $("#Mensaje_btn_Aceptar").click(function () { $("#Mensaje_Div").hide(); });


        $("#Editar_btn_cancelar").click(function () {
            $("#Editar_Div").hide();
        });

        $("#Editar_btn_guardar").click(function () {
            var MedicoId = $("#span_medico_id").html();

            var json = JSON.stringify({ "MedicoID": MedicoId, "Abreviacion": $("#txt_editar_abreviatura").val(), "USUARIO": $("#cbo_usuario").val(), "SOBREFIRMA": $("#txt_editar_sobrefirma").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_MEDICO_FIRMA_ACTUALIZAR",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    $("#Editar_Div").hide();
                    $("#txt_editar_abreviatura").val('');
                    $("#cbo_usuario").val('0');
                    $("#txt_editar_sobrefirma").val('');

                    var fileUpload = $("#txt_archivo").get(0);
                    var files = fileUpload.files;
                    if (files.length > 0) {
                        SubirArchivo();
                    }
                    MedicosFirmas_Listar(0);
                },
                error: errores
            });

        });


        function SubirArchivo() {
            var fileUpload = $("#txt_archivo").get(0);
            var files = fileUpload.files;

            var data = new FormData();            
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }

            var MedicoId = $("#span_medico_id").html();

            $.ajax({
                url: "SubirFirma.ashx?Med=" + MedicoId,
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (result) { $("#txt_archivo").val(''); ActualizarMensaje("Firma Subida", "Firma Actualizada"); },
                error: function (err) {
                    ActualizarMensaje("Error", err);
                }
            });            
        }


        function ListarUsuario() {            
            $.ajax({
                type: "POST",
                url: "../Json/Imagenes/Imagenes.asmx/IMG_LISTAR_USUARIOS",                
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var Datos = Resultado.d;
                    $('#cbo_usuario').append($('<option></option>').val(0).html("Seleccione un usuario"));
                        $.each(Datos, function (index, dato) {
                            $('#cbo_usuario').append($('<option></option>').val(dato.ID).html(dato.USUARIO));
                        });                                           
                },
                error: errores
            });

        }

        ListarUsuario();

    </script>

    </form>
</body>
</html>
