<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Solicitud_Hemodinamia_Programada_Listado.aspx.cs" Inherits="Solicitud_Hemodinamia_Programada_Listado" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />

    <style>
        table tr {cursor:pointer;}
    </style>

</head>
<body>


<div style="position:fixed; width: 100%; height:100%; display:block; background-color:rgba(0,0,0,0.5); display:none;" id="div_opcion" >
     <div id="opc" style="background-color:#255c77; color:white; width:400px; height:160px; position:absolute; padding:20px; 
        left:0; right:0;
        top:0; bottom:0;
        margin:auto;        
        max-width:100%;
        max-height:100%;
        overflow:auto;
        border-radius: 9px;">
    
    <div id="div_opciones_seleccion">
    <div id="div_cuadro_titulo">
    <b>¿Se ha finalizado la etapa "<span id="span_etapa"></span>"?</b>
    </div>

       
    <div id="div_cuadro_comentario">
    <div>Comentario: <input type="text" id="txt_comentario" style="width:300px;"/></div>
    </div>


        <div style="margin-top:1%; display:none" id="fechasAviso">
         <label style="display:inline">1ª Fecha de aviso: </label><input id="txt1fecha" class="fAviso" type="text" style="width:70px"/><br />
         <label style="display:inline">2ª Fecha de aviso: </label><input id="txt2fecha" class="fAviso" type="text" style="width:70px"/>
        </div>

    <a id="btn_cuadro_si" class="btn btn-success" onclick="Guardar(1);">Si</a> <a id="btn_cuadro_no" class="btn btn-danger" onclick="Guardar(0);">No</a> <a class="btn btn-warning" onclick="btn_Ocultar();">Cancelar</a>
    <div id="div_voucher" style="display:none; float:right">
        <a class="btn btn-info" onclick="ImprimirVaucher();">Imprimir Vaucher</a> 
    </div>
    </div>
    
    <div id="div_opciones_final">
        <b>Solicitud finalizada.</b><br /><br />
        <a class="btn btn-danger" onclick="ImprimirVaucher();">Imprimir Vaucher</a> <a class="btn btn-warning" onclick="btn_Ocultar();">Cancelar</a>
    </div>
    
    
    </div>


    

</div>

            <div style="height:670px; overflow:auto">                

            <div>
            <b>Solicitud Turno Hemodinamia - Listado </b><br />
            <input type="checkbox" id="ck_finalizado" style="margin-left:20px"/> <label for="ck_finalizado" style="display:inline-block;">Ver Finalizados</label>
            <input class="filtro" type="radio" id="ck_Todos" name="etapa" style="margin-left:20px" value="0" checked=checked/> <label for="ck_Todos" style="display:inline-block;">Todos</label>
            <input class="filtro" type="radio" id="ck_Cirujano" name="etapa" style="margin-left:20px" value="1"/> <label for="ck_Cirujano" style="display:inline-block;">Cirujano</label>
            <input class="filtro" type="radio" id="ck_Afiliación" name="etapa" style="margin-left:20px" value="2"/> <label for="ck_Afiliación" style="display:inline-block;">Afiliación</label>
            <input class="filtro" type="radio" id="ck_Auditoria" name="etapa" style="margin-left:20px" value="3"/> <label for="ck_Auditoria" style="display:inline-block;">Auditoria</label>
            <input class="filtro" type="radio" id="ck_Compras" name="etapa" style="margin-left:20px" value="4"/> <label for="ck_Compras" style="display:inline-block;">Compras</label>
            <input class="filtro" type="radio" id="ck_Asignación" name="etapa" style="margin-left:20px" value="5"/> <label for="ck_Asignación" style="display:inline-block;">Asignación Turno</label>
            <input class="filtro" type="radio" id="ck_Cirujano_Turno" name="etapa" style="margin-left:20px" value="6"/> <label for="ck_Cirujano_Turno" style="display:inline-block;">Turno Cirujano</label>
            <input class="filtro" type="radio" id="ck_Anestesista" name="etapa" style="margin-left:20px" value="7"/> <label for="ck_Anestesista" style="display:inline-block;">Turno Anestesista</label>
            <input class="filtro" type="radio" id="ck_Paciente" name="etapa" style="margin-left:20px" value="8"/> <label for="ck_Paciente" style="display:inline-block;">Aviso Paciente</label>
            </div>

                       <div style="max-height:600px; overflow:auto;">
                       <table class="table tab-content" >
                       <tr>
                        <th>Fecha Inicio</th>
                        <th>Fecha Limite</th>
                        <th>Paciente</th>
                        <th>Documento</th>
                        <th>Seccional</th>
                        <th>Telefono</th>                        
                        <th>Etapa</th>                        
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Observacion</th> 
                        <th></th>                       
                       </tr>
                       <tbody id="tabla_cirugia">
                        
                       </tbody>
                       </table>      
                       </div>
                        

            </div>        

    
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>   
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>    
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
    <script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
    <script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <script src="../js/Hospitales/Hemodinamia/Consulta_Cirugia_Programada_Listado.js" type="text/javascript"></script>
    <!--Barra sup-->
</body>
</html>
<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "Hemodinamia > <strong>Listado solicitud turno Hemodinamia</strong>";
</script> 