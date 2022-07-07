<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Solicitud_Hemodinamia_Programada.aspx.cs" Inherits="AtConsultorio_Solicitud_Hemodinamia_Programada" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>

    <asp:Literal ID="literal_usuario" runat="server"></asp:Literal>



    <style>
        .dropdown-menu { max-height: 250px; max-width: 800px; font-size:11px; overflow-y: auto; overflow-x: hidden; }
        
.d_flotante {display: inline-block; float:left; width: 300px;}
cp {display:inline-block; width:150px;}
input[type="radio"], label{cursor:pointer;  margin-top: 0px;}
label {margin-right:20px;}
label {display:inline-block;}
.div_contenedor {margin-left:20px;}
.div_contenedor div{margin-top:4px;}
te {display:inline-block; width:95px;}
lb {display:inline-block; width:95px;}
#CirujanoUsuario {display:inline-block; width:291px;}
</style>

</head>
<body>

<div style="background-color:rgba(0,0,0,0.7); width:100%; height:100%; position: fixed; z-index:10; display:none; " id="div_MedicoNuevo" >
    <div style="background-color:#255c77; color:white; width:400px; height:160px; position:absolute; padding:20px; 
        left:0; right:0;
        top:0; bottom:0;
        margin:auto;        
        max-width:100%;
        max-height:100%;
        overflow:auto;
        border-radius: 9px;">
    <div><lb>Médico:</lb> <input type="text" id="txt_medico_nombre" /></div>
    <div><lb>Mat. Nacional:</lb> <input type="text" id="txt_medico_MN" /></div>
    <div><lb>Mat. Provincial:</lb> <input type="text" id="txt_medico_MP" /></div>

    <a class="btn btn-success" onclick="MedicoGuardar();">Guardar</a> <a class="btn btn-danger" onclick="CerrarMedico();">Cancelar</a>

    </div>
</div>

    <div class="container">
        <div class="contenedor_1 fancywidth" style="width:800px;overflow-y:hidden; height:760px">
            <div class="contenedor_a" style="position: relative; margin-left: 10px; height: 690px;
                padding-bottom: 25px; overflow-y:hidden;">
                <div class="resumen_datos" style="margin-top: 0px;font-size:12px;">
                    <div class="datos_persona">
                        <div>
                            <img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img>
                        </div>
                        <div class="datos_resumen_paciente">
                            <div>
                                Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor: pointer;"
                                    onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
                            <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;
                            <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
                            <input id="afiliadoId" value="" type="hidden"/>
                            <div>
                                Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
                        </div>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        <div>
                            Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
                        <div>
                            Seccional/OS:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
                        <div>
                            Fecha:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoFecha"></span></strong></span></div>
                        
                        <div class="clearfix"></div>
                </div>
                </div>
                
                


<div class="div_contenedor">

<div><te>Diagnóstico:</te> <input class="typeahead span8" id="cbo_diagnostico" type="text" data-provide="typeahead" autocomplete="off">
<input type="hidden" id="diag_nombre" />
<input type="hidden" id="id_val" /></div>

<div><te>Procedimiento:</te> <input type="text" id="txt_procedimiento" name="txt_procedimiento" class="span3" maxlength="100"/>
<te style="margin-left: 117px">Anestesia:</te> <select id="cbo_anestesia" style="width:180px;"><option value="0">Seleccione anestesia.</option></select>
</div>
<div style="display:none"><te>Cirujano:</te> <span id="CirujanoUsuario" style=" margin-right:30px"></span>   Cirujano Externo: <select id="cbo_cirujano" style="width:180px;"><option value="0">Seleccione un médico externo.</option></select> <a class="btn btn-success" style="margin-bottom: 11px; display:none" onclick="javascript:CargarMedico();">E</a>
</div>
<div>Teléfono Afiliado o Contacto <b>(CORRECTO)</b>: <input type="text" id="txt_telefono" name="txt_telefono" class="span7" maxlength="20" /></div>


<div><cp>Internación: </cp> 
<input type="radio" id="rb_Internacion_0" name="rb_Internacion" value="0"> <label for="rb_Internacion_0">Internación</label>
<input type="radio" id="rb_Internacion_1" name="rb_Internacion" value="1"> <label for="rb_Internacion_1">U.T.I.</label>
<input type="radio" id="rb_Internacion_2" name="rb_Internacion" value="2"> <label for="rb_Internacion_2">I.Q.B.</label>
<input type="radio" id="rb_Internacion_3" name="rb_Internacion" value="3"> <label for="rb_Internacion_3">Cirugía Ambulatoria</label>
</div>


<div class="d_flotante"><cp>Congelación: </cp> 
<input type="radio" id="rb_ANP_1" name="rb_ANP" value="1"> <label for="rb_ANP_1">Si</label>
<input type="radio" id="rb_ANP_0" name="rb_ANP" value="0"> <label for="rb_ANP_0">No</label>
</div>

<div><cp>Hemoterapia: </cp> 
<input type="radio" id="rb_hemoterapia_1" name="rb_hemoterapia" value="1"> <label for="rb_hemoterapia_1">Si</label>
<input type="radio" id="rb_hemoterapia_0" name="rb_hemoterapia" value="0"> <label for="rb_hemoterapia_0">No</label>
<input type="text" id="txt_hemoterapia" class="input-medium" maxlength="50"> <label for="txt_hemoterapia"></label>
</div>


<div class="d_flotante"><cp>Cardiologo p/monitoreo: </cp>
<input type="radio" id="rb_Monitoreo_1" name="rb_Monitoreo" value="1"> <label for="rb_Monitoreo_1">Si</label>
<input type="radio" id="rb_Monitoreo_0" name="rb_Monitoreo" value="0"> <label for="rb_Monitoreo_0">No</label>
</div>



<div><cp>Radiología: </cp>
<input type="radio" id="rb_Radiologia_1" name="rb_Radiologia" value="1"> <label for="rb_Radiologia_1">Si</label>
<input type="radio" id="rb_Radiologia_0" name="rb_Radiologia" value="0"> <label for="rb_Radiologia_0">No</label>
</div>



<div class="d_flotante"><cp>Material Ciguría: </cp>
<input type="radio" id="rb_MatCirugia_1" name="rb_MatCirugia" value="1"> <label for="rb_MatCirugia_1">Si</label>
<input type="radio" id="rb_MatCirugia_0" name="rb_MatCirugia" value="0"> <label for="rb_MatCirugia_0">No</label>
</div>

<div> 
<input type="text" id="txt_MatCirugia" name="txt_MatCirugia" class="span5">
</div>



<div class="d_flotante"><cp>Torre Lap: </cp>
<input type="radio" id="rb_TorreLap_1" name="rb_TorreLap" value="1"> <label for="rb_TorreLap_1">Si</label>
<input type="radio" id="rb_TorreLap_0" name="rb_TorreLap" value="0"> <label for="rb_TorreLap_0">No</label>
</div>

<div><cp>Profilaxis Antitetánica: </cp>
<input type="radio" id="rb_Antitetanica_1" name="rb_Antitetanica" value="1"> <label for="rb_Antitetanica_0">Si</label>
<input type="radio" id="rb_Antitetanica_0" name="rb_Antitetanica" value="0"> <label for="rb_Antitetanica_1">No</label>
</div>



<div class="d_flotante"><cp>Ortopedia: </cp>
<input type="radio" id="rb_Ortopedia_1" name="rb_Ortopedia" value="1"> <label for="rb_Ortopedia_1">Si</label>
<input type="radio" id="rb_Ortopedia_0" name="rb_Ortopedia" value="0"> <label for="rb_Ortopedia_0">No</label>
</div>

<div> 
<input type="text" id="txt_Ortopedia" name="txt_Ortopedia" class="span5">
</div>



<div class="d_flotante" style="font-size:13px;"><cp>Estudios Pre Quirúrgico: </cp>
<input type="radio" id="rb_Estudios_Pre_1" name="rb_Estudios_Pre" value="1"> <label for="rb_Estudios_Pre_1">Si</label>
<input type="radio" id="rb_Estudios_Pre_0" name="rb_Estudios_Pre" value="0"> <label for="rb_Estudios_Pre_0">No</label>
</div>

<div><cp>Prestador Externo: </cp>
<input type="radio" id="rb_Externo_1" name="rb_Externo" value="1"> <label for="rb_Externo_1">Si</label>
<input type="radio" id="rb_Externo_0" name="rb_Externo" value="0"> <label for="rb_Externo_0">No</label>
<input type="text" id="txtPrestadorExterno" class="input-medium"> <label for="txtPrestadorExterno"></label>
</div>



<div class="d_flotante" style="font-size:13px;"><cp>Fecha Optativa Cirugía: </cp>
<input type="radio" id="rb_FechaOptativa_15" name="rb_FechaOptativa" value="15"> <label for="rb_FechaOptativa_15">0 a 15 dias</label>
</div>

<div>
<input type="radio" id="rb_FechaOptativa_45" name="rb_FechaOptativa" value="45"> <label for="rb_FechaOptativa_45">15 a 45 dias</label>
</div>

<div class="d_flotante"><cp>Microscopio: </cp>
<input type="radio" id="rb_Microscopio_1" name="rb_Microscopio" value="1"/> <label for="rb_Microscopio_1">Si</label>
<input type="radio" id="rb_Microscopio_2" name="rb_Microscopio" value="0"/> <label for="rb_Microscopio_2">No</label>
</div>

<div>
<label style="display:inline" class="pull-left">Observaciones: </label>
    <input type="text" id="txt_observaciones" name="txt_observaciones"/> <br />
</div>
<%--<div>
    <label style="display:inline" class="pull-left">Fecha Cirugía: </label>
    <input type="text" class="input-medium" id="txtFechaCirugia" name="txtFechaCirugia" style="text-align:center"/> 
    <input type="text" class="input-mini" id="txtHoraCIrugia"/>
</div>--%>



<div>
<a id="btn_guardar" class="btn btn-success">Guardar</a> <a id="btn_cancelar" class="btn btn-danger">Cancelar</a> <a id="btn_reprogramar" class="btn btn-primary">Reprogramar</a>
</div>




                </div>                
               
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
    <script src="../js/Hospitales/AtConsultorio/Consulta_Hemodinamia_Programada.js" type="text/javascript"></script>
    <!--Barra sup-->
</body>
</html>
