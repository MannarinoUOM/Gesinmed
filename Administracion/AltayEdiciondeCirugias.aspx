<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AltayEdiciondeCirugias.aspx.cs" Inherits="Administracion_AltayEdiciondeCirugias" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />

<style>
.titulo_derecho{ text-align:right;}
.color_amarillo {background-color: #F4FA58;}    
.color_verde {background-color: #58FA58;}    
.color_rojo {background-color: #FA5858;}  
.color_gris {background-color: #eeeeee;}  
.boton_a {width:150px; display:inline-block; height: 26px; padding-top:5px; cursor:pointer;}  
#frm_ {font-size:12px;}
#frm_ input {margin-bottom:0px;}
#frm_ select {margin-bottom:0px;}
#span_cirugias_cargadas input{margin:0;}
#span_cirugias_cargadas label{margin:0; display:inline-block;}

#span_diagnosticos_cargados input{margin:0;}
#span_diagnosticos_cargados label{margin:0; display:inline-block;}

.manito {cursor:pointer;}
.Baja {background-color:#FFAAAA;}
.Quirofano {background-color:#96F177;}
.NoQuirofano {background-color:#FDFF90;}   
</style>

</head>
<body>
<%--<div id="Modal_Edicion_Cirugia" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">--%>
  <input type="hidden" id="editando_id_cirugia" value="0" />  
  <div class="modal-header">    
    <h3 id="H2">Alta y Edición de Cirugía</h3>
  </div>
  <div class="modal-body" style="margin-left:0px; margin-right:10px;">
    <div><span style="margin-left: 0px;">Filtro:</span><input type="text" id="txt_filtro_cirugia"/></div>
    <select id="select_cirugias" style="width: 100%;"></select>
    <br />
    <div>Cirugía</div> 
    <input id="txt_cirugias_edicion" type="text" style="width: 100%;" maxlength="4000"/>    
  </div>
  <div style="text-align:center; margin-bottom: 10px;">
     
    <a class="color_verde boton_a" style="text-decoration:none;" id="btn_cirugia_guardar"><span id="span_cirugia_guardar">Agregar</span></a>
    <a class="color_rojo boton_a" style="text-decoration:none;" id="btn_cirugia_eliminar">Eliminar</a>
    <a class="color_gris boton_a" style="text-decoration:none; border-style: solid; border-width: 1px;  border-color: #C5C5C5;" id="btn_cirugia_cancelar">Cancelar</a>    
    
<%--  </div>--%>
</div>
</body>
</html>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>


<script type="text/javascript">
    //Guardar Cirugia
    parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Alta y Edición de Cirugías</strong>";
    $(document).ready(function () {
        var json = JSON.stringify({ "Id": 0, "estado": true, "Cirugia_id": 0 });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Quirofano/Quirofano_.asmx/Cirugia_Planificar_Cirugia",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListaCirugia_Cargado_todos_Cirugias_List,
            error: errores
        });

    });

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    $("#btn_cirugia_guardar").click(function () {

        var id = $("#editando_id_cirugia").val();
        var Cirugia = $("#txt_cirugias_edicion").val();

        if (Cirugia.trim() == "") {
            alert("Falta Cargar la cirugía");
            return;
        }


        var json = JSON.stringify({ "Id": id, "Cirugia": Cirugia });
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Guardar_Cirugia_PlanificarCirugia",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                $("#cbo_Cirugia").empty();
                $("#cbo_Cirugia").append($("<option></option>").val("0").html(""));
                ListaCirugia(0, true, 0);
                $("#Modal_Edicion_Cirugia").modal('hide');
            },
            error: errores
        });
    });


    function ListaCirugia(Id, estado, Cirugia_id) {
        if (Cirugia_id == null) { Cirugia_id = 0; }
        var json = JSON.stringify({ "Id": Id, "estado": estado, "Cirugia_id": Cirugia_id });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugia",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListaCirugia_Cargado,
            error: errores
        });
    }

    function ListaCirugia_Cargado(Resultado) {
        var Lista = Resultado.d;
        $("#Cirugia").empty();
        $("#span_cirugias_cargadas").empty();
        var lista_cirugias = "";
        //$("#span_cirugias_cargadas").html("<label for='ck_cir_" + Cirugia.id + "'>" + Cirugia.tipo + "</label> <input type='checkbox' id='ck_cir_" + Cirugia.id + "' />");
        $("#Cirugia").append($("<option></option>").val("0").html(""));
        $.each(Lista, function (index, Cirugia) {
            $("#Cirugia").append($("<option></option>").val(Cirugia.id).html(Cirugia.tipo));
            if (Cirugia.id == CirugiaId) $("#Cirugia").val(CirugiaId);
            lista_cirugias = lista_cirugias + "<div id='div_ck_cir_" + Cirugia.id + "'><input class='ck_class_cirugias' type='checkbox' onclick='Leer_Listas_Cirugias();' id='ck_cir_" + Cirugia.id + "' /> <label id='label_ck_cir_" + Cirugia.id + "' for='ck_cir_" + Cirugia.id + "'>" + Cirugia.tipo + "</label></div>";
        });
        $("#span_cirugias_cargadas").html(lista_cirugias);

        cir_ant_guardar = cirugias_listas_cargadas;

        var separated = cirugias_listas_cargadas.split(",");
        $.each(separated, function (index, los_ids) {
            $("#ck_cir_" + los_ids).prop('checked', true);
            //Cirugias_Check.push(los_ids);
        });

        Leer_Listas_Cirugias();
    }


    var Cirugias_Check = [];

    function Leer_Listas_Cirugias() {
        Cirugias_Check = [];
        $('#span_cirugias_cargadas input[type="checkbox"]:checked').each(function (i, el) {
            Cirugias_Check.push($("#label_" + el.id).html());
        });

        var lista_cargada = "";
        $.each(Cirugias_Check, function (key, value) {
            lista_cargada = lista_cargada + " + " + value;
        });
        $("#txt_cirugias").val(lista_cargada.replace(" + ", ""));

    }


    function ListaCirugia_Cargado_todos_Cirugias_List(Resultado) {
        var Lista = Resultado.d;
        $("#select_cirugias").empty();
        $("#select_cirugias").append($("<option></option>").val("0").html("Nueva Cirugía"));
        $.each(Lista, function (index, Cirugia) {
            $("#select_cirugias").append($("<option></option>").val(Cirugia.id).html(Cirugia.cirugia));
        });

        $("#Aguarde_Momento").hide();
        $("#Modal_Edicion_Cirugia").modal('show');
    }

    //Parte de AMB de Cirugias
    $("#select_cirugias").change(function () {
        //alert();
        if ($("#select_cirugias :selected").val() == "0") {
            $("#editando_id_cirugia").val("0");
            $("#txt_cirugias_edicion").val("");
            $("#span_guardar").html("Agregar");
            $("#btn_cirugia_guardar").removeClass("color_amarillo");
            $("#btn_cirugia_guardar").addClass("color_verde");
        }
        else {
            $("#editando_id_cirugia").val($("#select_cirugias :selected").val());
            $("#txt_cirugias_edicion").val($("#select_cirugias :selected").html());

            $("#span_cirugia_guardar").html("Modificar");
            $("#btn_cirugia_guardar").removeClass("color_verde");
            $("#btn_cirugia_guardar").addClass("color_amarillo");
        }
    });


    //Cancelar cirugia
    $("#btn_cirugia_cancelar").click(function () {
        $("#editando_id_cirugia").val("0");
        $("#txt_cirugias_edicion").val("");
        $("#select_cirugias").prop("selectedIndex", 0);
        $('#Modal_Edicion_Cirugia').modal('hide');

        $("#span_cirugia_guardar").html("Agregar");
        $("#btn_cirugia_guardar").removeClass("color_amarillo");
        $("#btn_cirugia_guardar").addClass("color_verde");

    });


    $("#txt_filtro_cirugia").change(function () {

        var filtro = $("#txt_filtro_cirugia").val().toLowerCase();
        $('#select_cirugias>option').each(function () {
            var text = $(this).text().toLowerCase();
            if (text.indexOf(filtro) !== -1) {
                $(this).show(); $(this).prop('selected', true);
                //alert($(this).val());
                //$("#editando_id_cirugia").val()
            }
            else {
                $(this).hide();
            }

        });
    });

    $("#btn_cirugia_eliminar").click(function () {
        EliminarCirugia();
    });


    function EliminarCirugia() {
        var r = confirm("¿Realmente desea eliminar ese tipo de cirugía");
        if (r == true) {
            var json = JSON.stringify({ "Id": $("#editando_id_cirugia").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Quirofano/Quirofano_.asmx/Eliminar_Cirugia_PlanificarCirugia",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    ListaCirugia(0, true, 0);
                    //$("#Modal_Edicion_Cirugia").modal('hide');
                    alert("Eliminada");
                },
                error: errores
            });
        }
    }

</script>