<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TurnosOtorgados.aspx.cs"
    Inherits="Turnos_TurnosOtorgados" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Turnos Otorgados</title>
    <link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/bootstrap.js" type="text/javascript"></script>
    <script src="../js/Hospitales/Turnos/Otorgados.js" type="text/javascript"></script>
    <script src="../js/GeneralG.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <legend>Turnos Otorgados</legend>
        <h4 id="NombrePaciente">
            Nombre Paciente</h4>
        <div id="Dias">
            <h5>
                Historial de turnos</h5>
            <div id="dTablaTurnos">
                <table id="TablaTurnos" class="table table-condensed table-bordered table-striped"
                    style="width: 100%;">
                    <thead>
                        <tr>
                            <th>
                                Fecha
                            </th>
                            <th>
                                Hora
                            </th>
                            <th>
                                Médico
                            </th>
                            <th>
                                Especialidad
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
