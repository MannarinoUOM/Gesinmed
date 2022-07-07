<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Diabetologia.aspx.cs" Inherits="AtConsultorio_Consulta_Diabetologia" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../css/barra.css"/>
</head>

<body>
<div class="container">
  <div class="contenedor_1 fancywidth">
    <div class="contenedor_a" style="position:relative;margin-left:10px;height:auto;padding-bottom:50px;">
      
      <div class="resumen_datos" style="margin-top:0px;">        
        <div class="datos_persona">
        <div ><img id="fotopaciente" class="avatar2" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span></strong><a style="cursor:pointer;" onclick="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>NHC: <strong><span id="CargadoNHC"></span></strong></span>
          <div>Edad: <strong><span id="CargadoEdad"></span></strong>&nbsp;&nbsp;&nbsp;</div>
        </div>        
      </div>
        <div class="pull-left" style="margin-left:20px"> 
        <div>Localidad:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoLocalidad"></span></strong></span></div>
        <div>Seccional:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoSeccional"></span></strong></span></div>
        <div>Teléfono:&nbsp;&nbsp;&nbsp;<span><strong><span id="CargadoTelefono"></span></strong></span></div>
        </div>
        <div class="clearfix"></div>
      </div>


      <div>
        <div style="padding:0px 15px 0px 15px">
          <table class="comprimida">
            <tr>
              <td><span>Peso</span></td>
              <td><input id="txt_PESO" class="span2" type="text"></td>
              <td><span>&nbsp;&nbsp;&nbsp;Talla</span></td>
              <td><input id="txt_TALLA" class="span2" type="text"></td>
            </tr>
          </table>
        </div>
        <ul class="nav nav-tabs" data-tabs="tabs" style="margin:5px;">
          <li class="active"><a data-toggle="tab" href="#tab1">Medicación</a></li>
          <li><a data-toggle="tab" href="#tab2">Laboratorio</a></li>
          <li><a data-toggle="tab" href="#tab3">Evolución</a></li>
          <li><a data-toggle="tab" href="#tab4">Antecedentes de diabetología</a></li>
          <li id="TabModificacion" style="display:none;"><a data-toggle="tab" id="TabModificacionA" href="#tab5">Modificación</a></li>
        </ul>
      </div>
      <div id="my-tab-content" class="tab-content"> 
        <!--SIGNOS VITALES-->
        <div class="tab-pane active fade in" id="tab1">
          <div style="padding:0px 15px 0px 15px">
            <h3>Hipoglucemiantes</h3>
            <div class="pull-left" style="width:45%">
              <h4>Orales</h4>
              <table class="comprimida">
                <tr>
                  <td><span>Metformina</span></td>
                  <td><input id="txt_MET" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Glibenclamida</span></td>
                  <td><input id="txt_GLIB" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Glicazida</span></td>
                  <td><input id="txt_GLIZ" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Glimepirida</span></td>
                  <td><input id="txt_GLI" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Glipizida</span></td>
                  <td><input id="txt_GL" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Rosiglitazona</span></td>
                  <td><input id="txt_RO" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Atorvastatina</span></td>
                  <td><input id="txt_AT" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Sinvastatina</span></td>
                  <td><input id="txt_SIN" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Ezetimibe</span></td>
                  <td><input id="txt_EZE" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Fenofibrato</span></td>
                  <td><input id="txt_FENO" class="span2" type="text"></td>
                </tr>
              </table>
            </div>
            <div class="pull-left" style="width:45%">
              <h4>Insulinas</h4>
              <table class="comprimida">
                <tr>
                  <td><span>NPH</span></td>
                  <td><input id="txt_NPH" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Rápida</span></td>
                  <td><input id="txt_RAPIDA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Rápida analogo</span></td>
                  <td><input id="txt_RAPIDAANALOGO" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Lispro</span></td>
                  <td><input id="txt_LISPRO" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Ultralenta</span></td>
                  <td><input id="txt_ULTRALENTA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Mix 25</span></td>
                  <td><input id="txt_M25" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Mix 30</span></td>
                  <td><input id="txt_M30" class="span2" type="text"></td>
                </tr>
              </table>
            </div>
            <div class="clearfix"></div>
            <div class="label_top">
              <div>Otros</div>
              <textarea id="txt_Otros_Medicamentos" type="text" class="span7"></textarea>
            </div>
          </div>
        </div>
        
        <!--Laboratorio-->
        <div class="tab-pane fade in" id="tab2">
          <div style="padding:0px 15px 0px 15px">
            <h3>Laboratorio</h3>
            <div class="pull-left" style="width:45%">
              <table class="comprimida">
                <tr>
                  <td><span>Hbg A1C</span></td>
                  <td><input id="txt_HBGA1C" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>H.D.L.</span></td>
                  <td><input id="txt_HDL" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>T.G.</span></td>
                  <td><input id="txt_TG" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Fructosamina</span></td>
                  <td><input id="txt_FRUCTOSAMINA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Uricemia</span></td>
                  <td><input id="txt_URICEMIA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Dep. creatinina</span></td>
                  <td><input id="txt_DEPCREATININA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>UREA</span></td>
                  <td><input id="txt_UREA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>TGO</span></td>
                  <td><input id="txt_TGO" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>BT</span></td>
                  <td><input id="txt_BT" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Bd</span></td>
                  <td><input id="txt_BD" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Fondo de ojo</span></td>
                  <td><input placeholder="iqz." id="txt_OJO_I" class="span1" type="text">
                    &nbsp;&nbsp;
                    <input placeholder="der." id="txt_OJO_D" class="span1" type="text"></td>
                </tr>
              </table>
            </div>
            <div class="pull-left" style="width:45%">
              <table class="comprimida">
                <tr>
                  <td><span>Col AT</span></td>
                  <td><input id="txt_COLAT" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>L.D.L</span></td>
                  <td><input id="txt_LDL" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Microalbuminuria</span></td>
                  <td><input id="txt_MICROALBUMINURIA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Creatinina</span></td>
                  <td><input id="txt_CREATININA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Glucemia</span></td>
                  <td><input id="txt_GLUCEMIA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Proteinuria 24hs.</span></td>
                  <td><input id="txt_PROTEINURIA" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>CPK</span></td>
                  <td><input id="txt_CPK" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>TGP</span></td>
                  <td><input id="txt_TGP" class="span2" type="text"></td>
                </tr>
                <tr>
                  <td><span>Bi</span></td>
                  <td><input id="txt_BI" class="span2" type="text"></td>
                </tr>
              </table>
            </div>
            <div class="clearfix"></div>
            <div class="label_top">
              <div>Observaciones</div>
              <input id="txt_observaciones_laboratorio" type="text" class="span7"/>
            </div>
            <div class="label_top">
              <div>Fecha analisis</div>
              <input id="txt_FechaAnalisis" type="text" class="span2"/>
            </div>
          </div>
        </div>
        <!--antecedentes-->
        <div class="tab-pane fade in" id="tab4">
          <div style="padding:0px 15px 0px 15px">
            <h4>Diagnóstico</h4>
            <table class="comprimida">
              <tr>
                <td><span>Diabético</span></td>
                <td><select id="cbo_TipoDiabetes" class="span2" type="text">
                    <option value="1">Gestacional</option>
                    <option value="2">Tipo1</option>
                    <option value="3">Tipo2</option>
                  </select></td>
                <td><span>&nbsp;&nbsp;&nbsp;Obesidad</span></td>
                <td><input id="ck_Obesidad" type="checkbox" class="span2" type="text"/></td>
              </tr>
              <tr>
                <td><span>Dislipidemia</span></td>
                <td><input id="ck_dislipidemia" type="checkbox" class="span2" type="text"/></td>
                <td><span>&nbsp;&nbsp;&nbsp;Tras. Met. H de C</span></td>
                <td><input id="ck_TMHC" type="checkbox" class="span2" type="text"/></td>
              </tr>
            </table>
            <div class="label_top">
              <div>Otros</div>
              <textarea id="txt_otros_diagnosticos" type="text" class="span7"></textarea>
            </div>
            <h4>Antecedentes</h4>
            <table class="comprimida">
              <tr>
                <td><span>Retinopatia</span></td>
                <td><select id="cbo_retinopatia" class="span2" type="text">
                    <option value="1">No</option>
                    <option value="2">Desconoce</option>
                    <option value="3">Si/No Prolif.</option>
                    <option value="4">Si Prolif.</option>
                  </select></td>
                <td><span>&nbsp;&nbsp;&nbsp;Nefropatia</span></td>
                <td><select id="cbo_nefropatia" class="span2" type="text">
                    <option value="1">Desconoce</option>
                    <option value="2">No</option>
                    <option value="3">Si/Clinica</option>
                    <option value="4">Si/Microalbuminuria</option>
                    <option value="5">Si/Subclinica</option>
                </select>
                </td>
              </tr>
              <tr>
                <td><span>Neuropatia</span></td>
                <td><select id="cbo_neuropatia" class="span2" type="text">
                    <option value="1">Desconoce</option>
                    <option value="2">Si</option>
                    <option value="3">No</option>
                  </select></td>
                <td><span>&nbsp;&nbsp;&nbsp;Pie Diabético</span></td>
                <td><select id="cbo_pie" class="span2" type="text">
                    <option value="1">No</option>
                    <option value="2">Si/Mixto</option>
                    <option value="3">Si/Neuropatico.</option>
                    <option value="4">Si/Vascular</option>
                </select></td>
              </tr>
              <tr>
                <td><span>Ins. Vasc. Perisferico</span></td>
                <td><select id="cbo_ivp" class="span2" type="text">
                    <option value="1">Desconoce</option>
                    <option value="2">No</option>
                    <option value="3">Si</option>
                  </select></td>
                <td><span>&nbsp;&nbsp;&nbsp;H.T.A.</span></td>
                <td><select id="cbo_hta" class="span2" type="text">
                    <option value="1">Desconoce</option>
                    <option value="2">No</option>
                    <option value="3">Si</option>
                </select></td>
              </tr>
              <tr>
                <td><span>Cardio. Isquem.</span></td>
                <td><select id="cbo_cardioisquemia" class="span2" type="text">
                    <option value="1">Desconoce</option>
                    <option value="2">No</option>
                    <option value="3">Si</option>
                  </select></td>
                <td><span>&nbsp;&nbsp;&nbsp;Tabaco</span></td>
                <td><select id="cbo_tabaco" class="span2" type="text">
                    <option value="1">No</option>
                    <option value="2">Si</option>
                </select></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="tab-pane fade in" id="tab3">
          <form class="form-horizontal" >
            <div class="control-group">
              <label class="control-label">Evolución</label>
              <div class="controls">
                <textarea id="txt_evolucion" type="text" rows="5" class="span5"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="tab-pane fade in" id="tab5">
          <form class="form-horizontal" >
            <div class="control-group">
              <label class="control-label">Motivo Modificación</label>
              <div class="controls">
                <textarea id="txt_Motivo" type="text" rows="5" class="span5"></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="pie_gris"> <a id="btnGuardar" class="btn btn-info pull-right">Guardar</a> <a class="btn pull-right">Imprimir</a> <a class="btn pull-right">Volver</a>
        <div class="clearfix"></div>
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
    <script src="../js/Hospitales/AtConsultorio/Consulta_Diabetologia.js" type="text/javascript"></script>


<!--Barra sup--> 

</body>
</html>
