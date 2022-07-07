<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListadosDiabetología.aspx.cs" Inherits="AtConsultorio_ListadosDiabetología" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" /><link rel="stylesheet" type="text/css" href="../css/barra.css" /><link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>

<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
    
     <table id="TablaConsultas" class="table table-bordered table-bordered">
                        <thead>
                            <tr>
                           
                                <th>
                                    D.N.I
                                </th>
                                <th>
                                    Apellido y Nombre
                                </th>
                                <th>
                                    HC
                                </th>
                                <th>
                                    Edad
                                </th>
                                <th>Seccional</th>
                            <th>Última Consulta </th>
                          
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>

                    </table>


    </div>
    </form>
</body>
<script src="../js/Hospitales/AtConsultorio/ListarDiabeticos.js" type="text/javascript"></script>
</html>
