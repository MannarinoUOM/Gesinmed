<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Pacientes_Existentes.aspx.cs" Inherits="AtConsultorio_Listar_Pacientes_Existentes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
         <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Atención Diabetología</strong> > <strong>Pacientes Existentes</strong>";
</script> 

</head>
<body>
    <form id="form1" runat="server">
   <div class="container" style="padding-top: 30px; height: 530px;">
        <div class="contenedor_1" style="width:865px; margin-left:40px">
            <div class="contenedor_3" style="height:400px; width:837px">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <span>Seleccione un Paciente</span>
                 
                </div>

                <div id="Resultado" class="tabla" style="height: 340px; width: 98%; margin-left: 1%">
                    <table id="TablaConsultas" class="table table-bordered table-bordered">
                        <thead>
                            <tr>
                           
                                <th>
                                    D.N.I
                                </th>
                                <th>
                                    Apellido y Nombre
                                </th>
                                
                                <th>Seccional</th>
                            <th>Última Consulta </th>
                            <th>Observaciones Consulta</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>

                    </table>

                    <div id="cargando" style="text-align:center; display:list-item;">
                    <br /><br />                                                                                                                                    
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 

                </div>
                <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
               <div class="pull-right" style="padding: 5px">
               <label style="background-color:#FA5858; float:left;margin-right:57px">Estudios Pendientes/Más de 90 días</label>
               <label style="background-color:#F4FA58;float:left;margin-right:52px">Estudios Pendientes/Menos de 90 días</label>
               <label style="background-color:#58FA58;float:left; margin-right:60px">Sin Pendientes</label>
                        <a class="btn btn-info" id="btnVolver" href="Buscar_Paciente.aspx" data-backdrop="static" role="button" data-toggle="modal">
                            <i id="btnNuevo" class=" icon-arrow-left icon-white"></i>&nbsp;Volver</a>
                        <%--    <a class="btn btn-info" id="A1" href="#myModal" data-backdrop="static" role="button" data-toggle="modal" onclick=!!>Volver</a>--%>
                        <%--<a class="btn btn-info" href="Buscar_Turno_Paciente.aspx">Volver</a>--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
<%--<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>--%>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="../js/Hospitales/AtConsultorio/Listar_Pacientes.js" type="text/javascript"></script>
