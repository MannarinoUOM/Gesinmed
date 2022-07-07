<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Pacientes_Existentes.aspx.cs" Inherits="AtConsultorio_Listar_Pacientes_Existentes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
         <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/Hospitales.css" rel="stylesheet" type="text/css" />
<%--    <script type="text/javascript">
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes Existentes</strong>";
</script> --%>

</head>
<body>
    <form id="form1" runat="server">
   <div class="container" style="padding-top: 30px; height: 530px; width:800px; margin-top:50px; background-position:center; margin:auto">
        <div class="contenedor_1" style="width:800px; vertical-align:middle; text-align:center; background-position:center; margin-left:6px">
            <div class="contenedor_3" style="height:400px; width:700px; background-position:center; margin-left:0px">
                <div class="titulo_seccion" style="margin-top: 5px;">
                    <label id="titulo" style=" font-size:larger; margin:auto" >Pacientes Existentes</label>
                 
                </div>

                <div id="Resultado" class="tabla" style="height: 340px; width: 98%; margin-left: 1%; overflow:auto">
                    <table id="TablaConsultas" class="table table-bordered table-bordered" style="overflow:auto">
                        <thead style="width: 147px;">
                            <tr>
                           
                                <th style="width: 147px;">
                                    Documento
                                </th>
                                <th>
                                    Apellido y Nombre
                                </th>
                                
                                <th>Seccional</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>

                    </table>
<label id="sinReultados" style="display:list-item"><strong>NO HAY RESULTADOS</strong></label>
                
                    <div id="cargando" style="text-align:center; display:list-item; font-size:xx-small">
                    <br /><br />                                                                                                                                    
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
                </div> 
       <%--         <div id="mensaje" style="display:none">--%>
                
                
              <%--  </div>--%>
                </div>
                <div style="height: 100px; width: 100%; background-color: #CCCCCC; margin-top: 5px;">
               <div class="pull-right" style="padding: 5px">

              <%-- <div id="btnRojo" class="reff Turnos_Cancelado">Estudios Pendientes/Más de 90 días</div>
               <div id="btnAmarillo" class="reff Turnos_Libres">Estudios Pendientes/Menos de 90 días</div>
               <div id="btnAzul" class="reff Semaforo_Azul" >Sin Pendientes Más de 30 días</div>

               <div id="btnVerde" class="reff Turnos_Ocupados" >Sin Pendientes</div>
               <div id="btnSin" class="reff ref_0"  style="display:inline">Sin Consultas</div>
               <div id="btnTodos" class="reff ref_0 reff_activo" style="margin-right:0px">Todos</div>--%>

                        <a class="btn btn-info" id="btnVolver" href="Buscar_Paciente.aspx" data-backdrop="static" role="button" data-toggle="modal" style="margin-right:0px">
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
