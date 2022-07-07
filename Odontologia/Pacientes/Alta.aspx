<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Alta.aspx.cs" Inherits="Pacientes_Alta" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>Gestión Hospitalaria</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
</head>
<body>
    <div class="clearfix">
    </div>
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Bono > <strong>Nuevo Bono</strong>";
     
    </script>
    <div id="lightbox" style="display: none; position: absolute; z-index: 899; width: 100%;
        height: 100%; background-color: RGBA(255,255,255,0.8);">
    </div>
    <div class="container" style="width:800px; padding-top:40px;">
        <div class="contenedor_1">
            <div class="contenedor_bono">
                <div class="titulo_seccion">
                    <span>Padrón UOM</span></div>
                <form class="form-horizontal"  style="margin-top:60px;">
                <div class="control-group">
                    <label class="control-label">
                        Apellido y Nombre</label>
                    <div class="controls">
                        <input id="txtapellidoynombre" type="text" maxlength="60" placeholder="Ej. Perez Juan">
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label">
                        DNI</label>
                    <div class="controls">
                        <input id="txt_dni" type="text" maxlength="8" placeholder="Ingrese el DNI sin puntos">
                    </div>
                </div>

                <div class="control-group" style="display:none;">
                    <label class="control-label">
                        NHC</label>
                    <div class="controls">
                        <input id="txtNHC" type="text" maxlength="11" placeholder="Ej: 99123456789">
                    </div>
                </div>                

                </form>
                <div class="control-group">
                    <div class="controls pagination-centered">                         
                        <a id="btnBuscar" class="btn btn-info">Buscar</a>
                        <a class="btn" id="btnCancelarBusqueda">Cancelar</a>                         
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>           
        </div>
    </div>
    <!-- Modal -->
    <div id="ModalError" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <h3 id="myModalLabel">
                Error en Turno</h3>
        </div>
        <div class="modal-body">
            <p>
                <span id="DialogoError"></span>
            </p>
        </div>
        <div class="modal-footer">
            <button id="CerrarError" class="btn" data-dismiss="modal" aria-hidden="true">
                Cerrar</button>
        </div>
    </div>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Gente/Gente.js" type="text/javascript"></script>
    
</body>
</html>
