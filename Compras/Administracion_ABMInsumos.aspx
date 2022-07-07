<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Administracion_ABMInsumos.aspx.cs" Inherits="Compras_Administracion_ABMInsumos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
</head>
<body>
<form id="form1" runat="server">
    <div style=" max-height: 360px;overflow:hidden;">
             <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando Pacientes...
             </div>    
        <div id="Resultado" style="max-height:315px; overflow:auto;">
            <table class="table table-hover" style="width: 100%;">
                    <thead>
                        <tr>
                          <th>&nbsp;</th>
                          <th>Insumo</th>
                          <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>          
            </table>
        </div>
        <div class="minicontenedor100" style="max-height:100px;">
            <div class="control-group">
                <span class="span1" style="margin-top:5px;">Insumo</span>
                <div class="controls">
                    <div class="input-append">
                        <input id="txtInsumo" class="input-medium" style="width:500px;" type="text" />
                        <a id="btnConfirmar" style="margin-left:5px;" class="btn btn-primary pull-right">&nbsp;Grabar</a>
                        <a id="btnCancelar" class="btn pull-right">&nbsp;Limpiar</a>
                    </div>
                    
                    <span class="span1" style="margin-top:5px; display:none;">Activo</span> 
                    <div class="input-append">
                        <input id="chkActivo" type="checkbox" style="margin-top:10px;display:none;"/>
                    </div>
                  
                </div>
                
             </div>
                
        </div>
        <script src="../js/bootstrap.js" type="text/javascript"></script>
        <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
        <script src="../js/bootstrap-alert.js" type="text/javascript"></script>    
        <script src="../js/jquery.validate.js" type="text/javascript"></script>
        <script src="../js/Hospitales/Compras/Administracion_ABMInsumos.js" type="text/javascript"></script>
        <script src="../js/GeneralG.js" type="text/javascript"></script>
    </div>
</form>
</body>
</html>
