<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HistoriaClinica.aspx.cs" Inherits="HistoriaClinica_HistoriaClinica" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
<link href="../css/arbol.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="container">

<div class="selector_quirofano">
    <a id="btnR28" class="btn" onclick="javascript:ImprimirQX(1);">Resolución 28</a>
    <a id="btnProtocolo" class="btn" onclick="javascript:ImprimirQX(2);">Protocolo</a>
    <a id="btnPost" class="btn" onclick="javascript:ImprimirQX(3);">Post</a>
    <a id="btnInsumoQX" class="btn" onclick="javascript:ImprimirQX(4);">Insumos QX</a>
    <a id="btnParte" class="btn" onclick="javascript:ImprimirQX(5);">Parte Anestesia</a>
    <a id="btnExtrasv" class="btn" onclick="javascript:ImprimirQX(6);">Extras</a>
    <a id="btnExtrasn" class="btn" onclick="javascript:ImprimirQX(7);">Extras</a>
    <a id="btnPre" class="btn" onclick="javascript:ImprimirQX(8);">Pre</a>
    <a class="btn btn-danger" style="float:right;" onclick="javascript:$('.selector_quirofano').hide();">Cerrar</a>
</div>

<div class="selector_hemodinamia">
    <a id="btnR28H" class="btn" onclick="javascript:ImprimirQX(1,1);">Resolución 28</a>
    <a id="btnProtocoloH" class="btn" onclick="javascript:ImprimirQX(2,1);">Protocolo</a>
    <a id="btnPostH" class="btn" onclick="javascript:ImprimirQX(3,1);">Post</a>
    <a id="btnInsumoQXH" class="btn" onclick="javascript:ImprimirQX(4,1);">Insumos QX</a>
    <a id="btnParteH" class="btn" onclick="javascript:ImprimirQX(5,1);">Parte Anestesia</a>
    <a id="btnExtrasvH" class="btn" onclick="javascript:ImprimirQX(6,1);">Extras</a>
    <a id="btnExtrasnH" class="btn" onclick="javascript:ImprimirQX(7,1);">Extras</a>
    <a id="btnPreH" class="btn" onclick="javascript:ImprimirQX(8,1);">Pre</a>
    <a class="btn btn-danger" style="float:right;" onclick="javascript:$('.selector_hemodinamia').hide();">Cerrar</a>
</div>


  <div class="contenedor_1" style="overflow:hidden;position:relative; height:500px"> 

  

    <!--Datos del paciente-->
    
      <div class="resumen_datos">
        
        <div class="datos_persona">
        <div><img id="fotopaciente" class="avatar2" src="../img/silueta.jpg" onerror="imgErrorPaciente(this);"></img> </div>
        <div class="datos_resumen_paciente" style="width:80%">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span>
          <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong><div class="pull-right"><span id="DBT" style="display:none"><a id="btnDBT" class="btn btn-danger" style="cursor:default">Diabetes mas de 6 meses</a></span></div></div>
        </div>
         <input id="txtdocumento" type="hidden" />
         <input id="axionnumerohc" type="hidden" />         
         <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
         <%--para DBT--%>
         <input type="hidden" id="afiliadoIdVPN"/>
         <%--para DBT--%>
      </div>        
      </div>

<!--COLUMNA IZQUIERDA-->    
    

<!--CONTENIDO-->
<div>

    <asp:Literal ID="axionnumerohc_literal" runat="server"></asp:Literal>

<div class="ContenedorHistoriaClinica">
<a  id="mostrarantecedentes" class="btn btn-success pull-left">Mostrar Historia Clínica</a>
<a  id="btnOpciones" class="btn btn-info pull-left" style="margin-left:5px;">Opciones</a>
<input type="hidden" id="medicoId" />
<input type="hidden" id="Fecha_Hora" runat="server" />
<a id="btnVolver" class="btn pull-left" style="margin-left:5px;"><i class="icon-th-list"></i>&nbsp;Volver</a>
<div class="clearfix"></div>

<div class="MenuHistoriaClinica">
<a id="cerrarantecedentes"style="position:absolute;right:0;top:0" class="btn pull-right">x</a>

<div class="ArbolHistoriaClinica">

<div id="wrapper">
<div class="tree">
        <ul>
                <li><a>Antecedentes Internaciones</a>
                        <ul>
                                <li><a>Registro de Internaciones</a>
                                <ul id="ulInternaciones">
                                    <asp:Literal ID="InternacionAnios" runat="server"></asp:Literal>
								</ul>
                                </li>
                                <li><a>Cirugias</a>
                                <ul id="ulCirugias">
                                    <asp:Literal ID="CirugiasAnios" runat="server"></asp:Literal>
								</ul>
                                </li>
                                <li><a>Interconsultas</a>
                                <ul id="ulInterconsultas">
                                    <asp:Literal ID="InterconsultaAnios" runat="server"></asp:Literal>
								</ul>
                                </li>
                        </ul>
                </li>
                <li><a>Antecedentes Ambulatorios</a>
                        <ul>
                            <asp:Literal ID="UlAmbulatorio" runat="server"></asp:Literal>
                        
                                <li><a>Especialista</a>
                                <ul id="UlEspecialista">
                                    <asp:Literal ID="UlEspecialistaAnios" runat="server"></asp:Literal>
								</ul>
                                </li>
                        </ul>
                </li>


                <li><a>Analisis y Estudios</a>
                        <ul>
                                <li><a>Laboratorio</a>
                                <ul id="UlLaboratorio">
                                    <asp:Literal ID="LaboratorioAnios" runat="server"></asp:Literal>
								</ul>
                                </li>

                                <li><a>Laboratorio Bacteriología</a>
                                <ul id="UlLaboratorioBacteriologia">
                                    <asp:Literal ID="LaboratorioBactrioAnios" runat="server"></asp:Literal>
								</ul>
                                </li>

                                <li><a>Recetas de Medicamentos</a>
                                <ul>
                                    <asp:Literal ID="RecetasAnios" runat="server"></asp:Literal>
								</ul>
                                </li>
                                <li><a>Diagnóstico por Imágenes</a>
                                <ul id="UlImagenes">
                                    <asp:Literal ID="ImagenesAnios" runat="server"></asp:Literal>
								</ul>
                                </li>

                                <li><a>Anatomía Patológica</a>
                                <ul id="UlAnatomiaPatologica">
                                    <asp:Literal ID="AnatomiaPatologicaAnios" runat="server"></asp:Literal>
								</ul>
                                </li>

                                <li><a>Endoscopía</a>
                                <ul id="UlEndoscopia">
                                    <asp:Literal ID="EndoscopiaAnios" runat="server"></asp:Literal>
								</ul>
                                </li>

                                <li><a>Estudios Otras Instituciones</a>
                                <ul id="UlOtras">
                                    <asp:Literal ID="OtrasAnios" runat="server"></asp:Literal>
								</ul>
                                </li>

                                <li><a>Estudios Complementarios</a>
                                <ul id="UlComplementarios">
                                    <asp:Literal ID="ComplementariosAnios" runat="server"></asp:Literal>
								</ul>
                                </li>

                        </ul>
                </li>
                <li><a>Atención en Guardia</a>
                        <ul>
                            <asp:Literal ID="UlGuardia" runat="server"></asp:Literal>
                        </ul>
                </li>

                <li><a>Odontología</a>
                    <ul>
                    <asp:Literal ID="OdontologiaAnios" runat="server"></asp:Literal>
                    </ul>
                </li>

                                <li><a>Escaneos Internos</a>
                                <ul>
                                    <asp:Literal ID="InternosAnios" runat="server"></asp:Literal>
								</ul>
                                </li>


               <li><a>Hemodinamia</a>
                   <ul>
                       <li><a>Internación</a>
                           <ul id="UlHemoInternacion">
                                        <asp:Literal ID="HemoInternacionAnios" runat="server"></asp:Literal>
						   </ul>
                       </li>

                       <li><a>Ambulatorio</a>
                           <ul id="UlHemoAmbulatorio">
                                        <asp:Literal ID="HemoAmbulatorioAnios" runat="server"></asp:Literal>
						   </ul>
                       </li>
                   </ul>
              </li>
        </ul>
</div>
</div>

</div>

<div class="PieHistoriaClinica">
<a class="btn pull-right" style="display:none;"><i class="icon-print"></i>&nbsp;Imprimir</a>
<div class="clearfix"></div>
</div>

</div>


<div style="float:left;width:850px;margin-left:15px">
<br/>
<span class="DatoHistoriaClinica"></span>
<br/><br/>

<div style="height:300px; width:600px; overflow-x:auto; background-color:#fff; overflow:auto;">
<table id="TablaInternacion" class="table table-condensed table-hover" style="display:none;">
<thead class="contenido">
           <tr>
              <th>Ingreso</th>
              <th>Egreso</th>
              <th>Servicio</th>
              <th>Motivo Ingreso</th>
              <th>Motivo Egreso</th>
              <th>Especialidad</th>
              <th>Médico</th>
          </tr>
          </thead>
          <tbody id="TInternacion" class="contenido">
          </tbody>
</table>

<table id="TablaCirugia" class="table table-condensed table-hover" style="display:none;">
 <thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Cirugia</th>
          <th>Cirujano</th>
          <th>Diangostico</th>
          <th>Especialidad</th>
          </tr>
</thead>
          <tbody id="TCirugia" class="contenido">

          </tbody>
</table>

<table id="TablaAmbulatorio" class="table table-condensed table-hover" style="display:none;">
<thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Diagnostico</th>
          </tr>
          </thead>
          <tbody id="TAmbulatorio" class="contenido">

          </tbody>        
</table>

<table id="TablaRecetas" class="table table-condensed table-hover" style="display:none;">
<thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Diagnostico</th>
          </tr>
          </thead>
          <tbody id="TRecetas" class="contenido">

          </tbody>        
</table>

<table id="TablaLaboratorio" class="table table-condensed table-hover" style="display:none; width:614px">
  <div id="cargando" style="text-align:center; display:none;">
                    <br /><br />
                    <img src="../img/Espere.gif" /><br />
                    Cargando...
 </div>   
<thead class="contenido">
          <tr>
          <th style="width:20px">Protocolo</th>
          <th style="width:20px">Tipo Orden</th>
          <th style="width:20px">Media/Alta<br /> Complejidad</th>
          <th style="width:20px">Fecha</th>
          </tr>
          </thead>
          <tbody id="TLabo" class="contenido">

          </tbody>        
</table>

<table id="TablaInterconsultas" class="table table-condensed table-hover" style="display:none;">
<thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Med. Solicitante</th>
          <th>Esp. de Interconsulta</th>
          <th>Med. Interconsulta</th>
          <th>Motivo</th>
          </tr>
          </thead>
          <tbody id="TInter" class="contenido">

          </tbody>        
</table>



<table id="TablaImagenes" class="table table-condensed table-hover" style="display:none;">
<thead class="contenido">
          <tr>
          <th></th>
          <th>Fecha</th>
          <th>Est. Solicitado</th>          
          </tr>
          </thead>
          <tbody id="TImg" class="contenido">

          </tbody>        
</table>


<table id="TablaAnatomiaPatologica" class="table table-condensed table-hover" style="display:none;">
<thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Cirugía</th>          
          <th>Cirujano</th>          
          </tr>
          </thead>
          <tbody id="TAnaPato" class="contenido">

          </tbody>        
</table>


<table id="TablaEndoscopia" class="table table-condensed table-hover" style="display:none;">
 <thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Procedimiento</th>
          <th>Endoscopista</th>
          <th>Diangostico</th>
          <th>Especialidad</th>
          </tr>
</thead>
          <tbody id="TEndo" class="contenido">

          </tbody>
</table>


<table id="TablaOtras" class="table table-condensed table-hover" style="display:none;">
 <thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          </tr>
</thead>
<tbody id="TOtras" class="contenido">

          </tbody>
</table>


<table id="TablaEspecialista" class="table table-condensed table-hover" style="display:none;">
 <thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Diagnóstico</th>
          </tr>
</thead>
<tbody id="TEspecialista" class="contenido"></tbody>
</table>

<table id="TablaHemodinamiaInt" class="table table-condensed table-hover" style="display:none;">
 <thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Diagnóstico</th>
          </tr>
</thead>
<tbody id="THemodinamiaInt" class="contenido"></tbody>
</table>

<table id="TablaHemodinamiaAmb" class="table table-condensed table-hover" style="display:none;">
 <thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Especialidad</th>
          <th>Médico</th>
          <th>Diagnóstico</th>
          </tr>
</thead>
<tbody id="THemodinamiaAmb" class="contenido"></tbody>
</table>


<table id="TablasComplementarios" class="table table-condensed table-hover" style="display:none;">
 <thead class="contenido">
          <tr>
          <th>Fecha</th>
          <th>Médico</th>
          <th>Tipo</th>
          </tr>
</thead>
<tbody id="TComplementarios" class="contenido"></tbody>
</table>

</div>
</div>
</div>
<div class="clearfix"></div>

   
</div>
</div>
</div>

<div id="myModalOpciones" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="width:60%; height:50%; position:absolute; left:42%" >
<div class="modal-header">
<button onclick="recargarArbol()" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
<h3 id="myModalLabel">Opciones</h3>
</div>
<div class="modal-body" style="height:70%">
<table style="height:100%">
<tr><td><a class="btn ocultar" onclick="ConsultaG();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Carga de Consulta</label></a></td>
<td><a class="btn ocultar" onclick="Receta();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Recetas</label></a></td>
<td><a class="btn ocultar" onclick="CargadeEstudios();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Ordenes de Estudios</label></a></td>
<td><a class="btn ocultar" onclick="AltaComplejidad();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Estudios de Alta Complejidad</label></a></td></tr>

<tr><td><a class="btn ocultar" onclick="pedidoMateriales();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Pedido de Materiales</label></a></td>
<td><a class="btn success ocultar" onclick="CertificadoMedico();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Certificado Médico</label></a></td>
<td><a class="btn ocultar" onclick="OrdenesInternacion();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Orden de Internación</label></a></td>
<td><a class="btn ocultar" onclick="SolicituddeTraslado();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Orden de Traslado</label></a></td></tr>

<tr><td><a class="btn ocultar" onclick="SolicitudCirugia();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Solicitud Turno Quirúrgico</label></a></td>
<td><a class="btn ocultar" onclick="Diabetologia();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Diabetología</label></a></td>
<td><a class="btn ocultar" onclick="EstudiosOtras();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Estudios Otras Instituciones</label></a></td>
<%--<% Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();%>
<% if (v.PermisoSM("67")) { %><a class="btn" onclick="obitos();" style="margin: 5px 5px 5px 5px;">Obitos</a><%} %>--%>
<td><a class="btn ocultar" onclick="vacunas();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Vacunas</label></a></td></tr>

<tr><td><a class="btn ocultar" onclick="SospechaCOVID();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Sospecha COVID</label></a></td>
<%--<a class="btn" href="../Informes_Medicos/Documentos/Covid1.pdf" style="margin: 5px 5px 5px 5px;">CLOROQUINA O HIDROXICLOROQUINA</a>
<a class="btn" href="../Informes_Medicos/Documentos/Covid2.pdf" style="margin: 5px 5px 5px 5px;">LOPINAVIR/RITONAVIR</a>
<a class="btn" href="../Informes_Medicos/Documentos/Covid3.pdf" style="margin: 5px 5px 5px 5px;">DARUNAVIR/RJTONAVIR</a>--%>
<td><a class="btn ocultar" onclick="EscaneosInternos();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Escaneos Internos</label></a></td>
<td><a class="btn ocultar" onclick="evolucionEspecialista();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Practica en cama</label></a></td>
<td><a class="btn ocultar" onclick="SolicitudHemodinamia();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Solicitud Turno Hemodinamia</label></a></td>
<td><a class="btn ocultar" onclick="EstudiosComplementarios();" style="margin: 5px 5px 5px 5px;"><label style="font-size:small">Estudios Complementarios</label></a></td></tr>
</table>
</div>
<div class="modal-footer">
<button onclick="recargarArbol()" class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
</div>
</div>

<div id="myModalSeleccion" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-header">
<button onclick="ocultarModal()" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
<h3 id="H1">¿Quiere pedir Estudios de Alta Complejidad o hacer un Pedido de Materiales?</h3>
</div>
<div class="modal-body">
<p>
<a class="btn ocultar opcion" style="margin: 5px 5px 5px 5px;" name="1" >Estudios de Alta Complejidad</a>
<a class="btn ocultar opcion" style="margin: 5px 5px 5px 5px;" name="2" >Pedido de Materiales</a>
</p>
</div>
<div class="modal-footer">
<button onclick="ocultarModal()" class="btn" data-dismiss="modal" aria-hidden="true">Cerrar</button>
</div>
</div>

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
<script src="../js/Hospitales/HistoriaClinica/HistoriaClinica.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/GeneralG.js" type="text/javascript"></script>
</body>
</html>

