<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RecuperacionPosAnestesica.aspx.cs" Inherits="Quirofano_RecuperacionPosAnestesica" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<title>Gestión Hospitalaria</title>
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
<link href="../css/barra.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="clearfix"></div>


<div id="lightbox" style="display:none;position:absolute;z-index:899;width:100%; height:100%;background-color:RGBA(255,255,255,0.8);"> </div>

<div class="container">
  <div class="contenedor_1">
    <div class="contenedor_a" style="position:relative;margin-left:15px;">
      
         

      
      <div class="resumen_datos" style="height:74px;">
        
        <div class="datos_persona">
        <div ><img id = "fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img> </div>
        <div class="datos_resumen_paciente">
          <div>Paciente: <strong><span id="CargadoApellido"></span> (<span id="CargadoEdad"></span>)</strong><a href="javascript:VerMas();" class="ver_mas_datos">Ver más</a></div>
          <div><span>DNI: <strong><span id="CargadoDNI"></span></strong></span>&nbsp;&nbsp;&nbsp;<span>NHC: <strong><span id="CargadoNHC"></span></strong></span>&nbsp;&nbsp;&nbsp; <span>Sala: <strong><span id="Cargado_Sala"></span></strong></span> &nbsp;&nbsp;&nbsp; <span>Cama: <strong><span id="Cargado_Cama"></span></strong></span></div>
          <div><span>Teléfono: <strong><span id="CargadoTelefono"></span></strong></span></div>
        <div><span id="CargadoSeccionalTitulo">Seccional:</span> <strong><span id="CargadoSeccional"></span></strong>  &nbsp;&nbsp;&nbsp; <span>Hora ingreso: <strong><span id="Span1"></span></strong></span></div>        
        </div>
        
        <input id="afiliadoId" type="hidden"/>

      </div>
      </div>


      <div>
        <ul class="nav nav-tabs" data-tabs="tabs">
          <li class="active"><a data-toggle="tab" href="#tab1">Datos</a></li>
          <li><a data-toggle="tab" href="#tab2">Monitoreo</a></li>
          <li><a data-toggle="tab" href="#tab3">Control de signos vitales</a></li>
        </ul>
      </div>
      <div id="my-tab-content" class="tab-content"> 
        <!--SIGNOS VITALES-->
        <div class="tab-pane active fade in" id="tab1">
          <div style="padding:0px 15px 0px 15px;">
          <div class="row">
            <div class="span1">TA
              <input type="text" id="TA" name="TA" class="input-mini"/>
            </div>
            <div class="span1">FC
              <input type="text" id="FC" name="FC" class="input-mini"/>
            </div>
            <div class="span1">FR
              <input type="text" id="FR" name="FR" class="input-mini"/>
            </div>
            <div class="span1">Temp.
              <input type="text" id="Temp" name="Temp" class="input-mini"/>
            </div>
            <div class="span1">Hora
              <input type="text" id="Hora" name="Hora" class="input-mini"/>
            </div>
            <div class="span1">&nbsp;
              <input class="btn" id="btnCargar" type="button" style="width:100px" value="Cargar"/>
            </div>
            </div>

          </div>
          <div style="padding:0px 15px 0px 15px;">
            <div class="tabla" style="height:150px;">
              <table id="TablaDatos" class="table table-hover table-condensed">
                <thead>
                  <tr>
                    <th>TA</th>
                    <th>FC</th>
                    <th>FR</th>
                    <th>Temp.</th>
                    <th>Hora</th>
                  </tr>
                </thead>
  
              </table>
            </div>
          </div>


          <div style="padding:10px;">
            <div class="label_top">
              <div>S.Fisiologica</div>
              <input type="text" id="SFisiologica" name="SFisiologica" class="span2"/>
            </div>
            <div class="label_top">
              <div>Dextrosa</div>
              <input type="text" id="Dextrosa" name="Dextrosa" class="span2"/>
            </div>
            <div class="label_top">
              <div>Ringer Lactato</div>
              <input type="text" id="Ringer" name="Ringer" class="span2"/>
            </div>
            <div class="label_top">
              <div>Expansor Plas</div>
              <input type="text" id="Expansor1" name="Expansor1" class="span2"/>
              <input type="text" id="Expansor2" name="Expansor2" class="span2"/>
            </div>
            <div class="clearfix"></div>
          </div>

        </div>
        
        <!--MONITOREO-->
        <div class="tab-pane fade in DP" id="tab2">



          <div style="padding:0px 15px 0px 15px;">
            <div class="input_mini">Sat. O2
              <input type="text" id="Sat" name="Sat"/>
            </div>
            <div class="input_mini">HS
              <input type="text" id="HS" name="HS" style="width: 40px;"/>
            </div>
            <div class="input_mini">&nbsp;
              <input type="text" id="HS2" name="HS2"/>
            </div>
            <div class="input_mini">HS
              <input type="text" id="HS3" name="HS3" style="width: 40px;"/>
            </div>
            <div class="input_mini">&nbsp;
              <input type="text" id="HS4" name="HS4"/>
            </div>
            <div class="input_mini">HS
              <input type="text" id="HS5" name="HS5"  style="width: 40px;"/>
            </div>
            <div class="input_mini">Hemato
              <input type="text" id="Hemato" name="Hemato"/>
            </div>
            <div class="input_mini">HB
              <input type="text" id="HB" name="HB"/>
            </div>
            <div class="input_mini">KPTT
              <input type="text" id="KPTT" name="KPTT"/>
            </div>
            <div class="input_mini">Quick
              <input type="text" id="Quick" name="Quick"/>
            </div>
            <div class="input_mini">HS
              <input type="text" id="HS6" name="HS6"  style="width: 40px;"/>
            </div>
            <div class="input_mini">PH
              <input type="text" id="PH" name="PH"/>
            </div>
            <div class="input_mini">PCO2
              <input type="text" id="PCO2" name="PCO2"/>
            </div>
            <div class="input_mini">PO2
              <input type="text" id="PO2" name="PO2"/>
            </div>
            <div class="input_mini">EB
              <input type="text" id="EB" name="EB"/>
            </div>
            <div class="input_mini">HCO3
              <input type="text" id="HCO3" name="HCO3"/>
            </div>
            <div class="input_mini">NA+
              <input type="text" id="NA" name="NA"/>
            </div>
            <div class="input_mini">SAT.%
              <input type="text" id="SAT" name="SAT"/>
            </div>
            <div class="input_mini">CL-
              <input type="text" id="CL" name="CL"/>
            </div>
            <div class="input_mini">K+
              <input type="text" id="POTASIO" name="POTASIO"/>
            </div>
            <div class="label_top">
              <div>Sangrado intraquirúrgico</div>
              <input type="text" id="Sangrado" name="Sangrado" class="span2"/>
            </div>
            <div class="label_top">
              <div>V. Total Diuresis</div>
              <input type="text" id="Diuresis" name="Diuresis" class="span2"/>
            </div>
            <div class="label_top">
              <div>V. Total Fluidos</div>
              <input type="text" id="Fluidos" name="Fluidos" class="span2"/>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <!--DATOS-->
        <div class="tab-pane fade in" id="tab3">
          <form class="form-horizontal" >
            <div class="control-group">
              <label class="control-label">Cánula</label>
              <div class="controls">
                <input id="chkCanula" name="chkCanula"  type="checkbox" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Máscara</label>
              <div class="controls">
                <input id="chkMascara" name="chkMascara" type="checkbox" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Hora</label>
              <div class="controls">
                <input type="text" id="HoraEgreso" name="HoraEgreso" class="span1" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Aspiración</label>
              <div class="controls">
                <input type="text" id="Aspiracion" name="Aspiracion" class="span7" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Observación</label>
              <div class="controls">
                <textarea id="Observacion" name="Observacion" class="span7"></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
          <div class="pie_gris">
            <div class="pull-right" style="margin-bottom:5px; height:120px;">
              <a id="btnVolver" class="btn" style="display:none"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
              <a id="btnCarga_Insumo_Post_Quirurgico" class="btn">&nbsp;Insumos Post</a>
              <button id = "btnGuardar" class="btn btn-info"><i class=" icon-ok icon-white"></i>&nbsp;Guardar e Imprimir</button>
            </div>
           </div>
<%--      <div class="pie_gris"> <a id="btnGuardar" class="btn btn-info pull-right">Guardar</a> <a href="CargadeTurnos.aspx" id="btnVolver" class="btn"><i class=" icon-arrow-left"></i>&nbsp;Volver</a>
        <div class="clearfix"></div>
      </div>--%>
    </div>
  </div>
</div>
</div>

<!--Pie de p�gina-->


<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 
    <script src="../js/Hospitales/Quirofano/RecuperacionPosAnestesica.js" type="text/javascript"></script> 
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>

<script src="../js/General.js" type="text/javascript"></script>

<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    });



    parent.document.getElementById("DondeEstoy").innerHTML = "Quirófano > <strong>Post</strong>";

</script> 

</body>
</html>


