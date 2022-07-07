<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImpresionTurno.aspx.cs" Inherits="Turnos_ImpresionTurno" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos.js" type="text/javascript"></script>

    <title>Impresion Turno</title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="Imprimir">
        <button id="btn_ImprimirTurno" type="button" class="btn btn-primary"><i class="icon-print icon-white"></i>Imprimir</button>
        <button id="btn_VolveraTurno" type="button" class="btn btn-primary"><i class="icon-arrow-left icon-white"></i>Volver</button>
    </div>
    </form>
</body>
</html>
