<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IMG_LlamaPrograma.aspx.cs" Inherits="Imagenes_IMG_LlamaPrograma" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />

<style>
#Contendor {margin-left: 10px;}
.Titulos {width: 400px; display:inline;}
</style>

</head>
<body>
    <form id="form1" runat="server">
    <div id="Contendor">
    
    <div>Paciente: <span id="s_Paciente"></span></div>
    <div>NHC: <span id="s_NHC"></span></div>
        
    <table>
        <tr>
            <td>Tipo Imagen</td><td><select id="cbo_tipo_img" style="width:600px;"></select></td>
        </tr>
        <tr>
            <td>Tipo Protocolo</td><td><select id="cbo_tipo_protocolo" style="width:600px;"></select></td>
</tr>
<tr>
            <td>Especialidad</td><td><select id="cbo_especialidad" style="width:250px;"></select> <span style="margin-left:40px; margin-right:10px;">Médico</span><select id="cbo_medico" style="width:250px;" ></select></td>
            </tr>
            <tr>
            <td>Fecha Entrega</td><td><input type="text" id="tyle="width:80px;"/> <span style="margin-left:10px;"><label for="ck_urgencia" style="display:inline; cursor:pointer;">Pedido de urgencia</label></span><input type="checkbox" name="ck_urgencia" id="ck_urgencia" /></td>
            
        </tr>
    </table>

    <div>
    
    <a class="btn" style="margin-left: 630px; display:none;" id="btn_Cargar" >Cargar</a>
    <a class="btn" style="margin-left: 630px; display:none;" id="btn_ReCargar">Re Abrir</a>
    
    </div>

    </div>
    </form>
</body>

<input type="hidden" id="afiliadoId"/>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>    
<script src="../js/Hospitales/Imagenes/IMG_LlamaPrograma.js" type="text/javascript"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

</html>
