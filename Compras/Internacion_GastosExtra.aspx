<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Internacion_GastosExtra.aspx.cs" Inherits="Compras_Internacion_GastosExtra" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" CONTENT="text/html; charset=iso-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Gestión Hospitalaria</title>
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../css/barra.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
    <style>
        .dropdown-menu { max-height: 250px; max-width: 100%; overflow-y: auto; overflow-x: hidden; }
        .dropdown-menu > li a { color: #333333 !important; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important; background-color: #f8f9fa;}
    </style>
</head>
<body class="bg-light">
    <div id="header" class="container">
        <h1>Compras - Gastos Extraordinarios</h1>
    </div>
<div id="datos_cabecera" class="container">
    <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <label class="input-group-text" for="cbo_TipoDOC">Tipo Documento</label>
            </div>
            <select id="cbo_TipoDOC" class="custom-select">
            </select>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">DNI</span>
            </div>
            <input id="txt_dni" type="text" class="form-control numero" maxlength="8" placeholder="Ej: 99111222"/>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">NHC</span>
            </div>
            <input id="txtNHC" type="text" class="form-control numero" maxlength="12" placeholder="Ej: 99123456789"/>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Paciente</span>
            </div>
            <input id="txtPaciente" type="text" class="form-control" maxlength="60" placeholder="Ingrese Paciente" />
            <div class="input-group-append">
                <button id="btnBuscarPaciente" type="button" class="btn btn-info">
                    <span class="glyphicon glyphicon-search"></span>Buscar
                </button>
            </div>
            <input id="txtdocumento" type="hidden" />
            <input id="afiliadoId" value="" class="ingreso" type="hidden"/>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Fecha Solicitud</span>
            </div>
            <input id="txtFechaSolicitud" type="text" class="form-control date" maxlength="10" placeholder="Ej. 99/99/9999" />
        </div>
    </div>
     <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Fecha Autorizado</span>
            </div>
            <input id="txtFechaAutorizado" type="text" class="form-control date" maxlength="10" placeholder="Ej. 99/99/9999" />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Fecha Cirugía</span>
            </div>
            <input id="txtFechaCirugia" type="text" class="form-control date" maxlength="10" placeholder="Ej. 99/99/9999" />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <label class="input-group-text" for="cboMedicoSolicita">Médico Solicitante</label>
            </div>
            <select id="cboMedicoSolicita" class="custom-select">
            </select>
        </div>
    </div>
     <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <label class="input-group-text" for="cbo_Servicio">Servicio</label>
            </div>
            <select id="cbo_Servicio" class="custom-select">
            </select>
        </div>
    </div>

         <div class="row mb-3">
        <div class="col-md-xs-12 col-md-lg-12 input-group">
            <div class="input-group-prepend">
                <label class="input-group-text" for="cbo_Orservaciones">Observaciones</label>
            </div>
            <input id="txtObservaciones" type="text" class="form-control" class="custom-select" />
            </select>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4">
            <button id="btnOtroPaciente" class="btn btn-danger btn-lg btn-block">Otro Paciente</button>
        </div>
        <div class="col-md-4">
            <button id="btnPedidos" class="btn btn-warning btn-lg btn-block">Buscar Gastos</button>
        </div>
        <div class="col-md-4">
            <button id="desdeaqui" class="btn btn-primary btn-lg btn-block">Siguiente</button>
        </div>
    </div>
</div>
    
    <!-- Encabezado con datos del paciente -->
    <div id="hastaaqui" class="container">
        <div class="resumen_datos font-weight-bold" style="display: block;height: 80px;">
        <div class="row" style="padding:0px;height: 30px;">
            <div class="col-md-xs-4 col-md-sm-4 col-md-1 col-md-lg-1">
                <img id ="fotopaciente" class="avatar2" onerror="imgErrorPaciente(this);" src="../img/silueta.jpg"></img>
            </div>
            <div class="col-md-xs-4 col-md-sm-4 col-md-2 col-md-lg-2">
                <p class="text-bold">Nro. Pedido: <span id="CargadoPedido"></span></p>
            </div>
            <div class="col-md-xs-4 col-md-sm-4 col-md-2 col-md-lg-2">
                <p class="text-bold">Fecha: <span id="CargadoFecha"></span></p>
            </div>
            <div class="d-none d-lg-block col-md-lg-6">
                <p class="text-bold">Paciente: <span id="CargadoPaciente"></span>
                <a href="javascript:VerMas();" class="ver_mas_datos" tabindex="-1">(Ver más)</a>
                </p>
            </div>
        </div>
        <div class="row" style="padding:0px;height: 30px;">
            <div class="col-md-xs-4 col-md-sm-4 col-md-2 col-md-lg-2 offset-1">
                <p class="text-bold">DNI: <span id="CargadoDNI"></span></p>
            </div>
            <div class="col-md-xs-4 col-md-sm-4 col-md-2 col-md-lg-2">
                <p class="text-bold">NHC: <span id="CargadoNHC"></span></p>
            </div>
                <div class="d-none d-lg-block col-md-lg-6">
                    <p class="text-bold">Servicio: <span id="CargadoServicio"></span></p>
                </div>
        </div>
      </div>

      <!-- Comienza carga de detalles -->

      <div class="row my-4">
          <div class="col-md-xs-12 col-md-6 col-md-lg-6 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Insumo</span>
                </div>
                <input id="cbo_Medicamento" type="text" class="form-control" maxlength="60" data-provide="typeahead" autocomplete="off"/>
                <div id="Medicamento_val" style="display:none;">0</div>
                <input id="txt_Medicamento" name="txt_Medicamento" value="0" type="hidden" />
          </div>


          <div class="col-md-xs-12 col-md-6 col-md-lg-6 input-group">

                <a id="btnInsABM" class="form-control btn btn-info">Nuevo Insumo</a>

          </div>

          <div class="col-md-xs-12 col-md-6 col-md-lg-6 input-group" style="margin-top:20px">
            <div class="input-group-prepend">
                <label class="input-group-text" for="cbo_Proveedor">Proveedor</label>
            </div>
            <select id="cbo_Proveedor" class="custom-select">
            </select>
        </div>
      </div>
      <div class="row my-4">
            <div class="col-md-xs-12 col-md-4 col-md-lg-4 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Cantidad</span>
                </div>
                <input id="cantidad" type="text" class="form-control numero" maxlength="4"/>
            </div> 
            <div class="col-md-xs-12 col-md-4 col-md-lg-4 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Precio Presupuestado($)</span>
                </div>
                <input id="precio_presu" type="text" class="form-control numero" maxlength="12"/>
            </div>
            <div class="col-md-xs-12 col-md-4 col-md-lg-4 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Precio Facturado($)</span>
                </div>
                <input id="precio_fact" type="text" class="form-control numero" maxlength="12"/>
            </div>
      </div>
      <div class="row my-4">
            <div class="col-md-xs-12 col-md-4 col-md-lg-4 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">N° Factura</span>
                </div>
                <input id="txt_NroFact" type="text" class="form-control" maxlength="13"/>
            </div> 
            <div class="col-md-xs-12 col-md-4 col-md-lg-4 input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">Fecha Factura</span>
                </div>
                <input id="txt_FechaFact" type="text" class="form-control date"/>
            </div>
            <div class="col-md-xs-6 col-md-2 my-auto">
                <button id="btnCancelarMedicamento" class="btn btn-danger">Cancelar</button>
            </div>
            <div class="col-md-xs-6 col-md-2">
                <button id="btnAgregarMedicamento" class="btn btn-success">Agregar</button>
            </div>
      </div>
        <!--Tabla de insumos-->
        <div class="table-responsive" style="overflow: auto; max-height: 240px;">
            
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"></th>
                        <th scope="col">Insumo</th>
                        <th scope="col">Presupuestado</th>
                        <th scope="col">Facturado</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">N° Factura</th>
                        <th scope="col">Fecha Factura</th>
                    </tr>
                </thead>
                <tbody id="contenido_table" class="bg-light">
                </tbody>
            </table>
        </div>
    <div class="row my-auto">
        <div class="col-md-2 offset-8">
            <button type="button" id="btnVolver" class="btn btn-info">Volver</button>
        </div>
        <div class="col-md-2">
            <button type="button" id="btnConfirmarPedido" class="btn btn-success">Confirmar</button>
        </div>
    </div>
</div>
<!--Pie de p�gina-->
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>
<script src="../js/jQuery-validate.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/autocomplete-tweet.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script type="text/javascript">
    //VARIABLES GLOBALES//
    var sourceArr = [];
    var mapped = {};
    var Editando = -1;
    var objMedicamentos = [];
    var Pedido_Id = 0;
    /////////////////////

        function imgErrorPaciente(image) {
        image.onerror = "";
        image.src = "../img/silueta.jpg";
        return true;
    }

    $("#btnOtroPaciente, #btnVolver").click(function () {
        document.location = "Internacion_GastosExtra.aspx";
    });

    $("#btnPedidos").click(function () {
        document.location = "Internacion_GastosExtra_Buscar.aspx";
    });

    function Print() {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/PPP_Impresion.aspx?Id=' + Pedido_Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
    }

    function GetQueryString() {
        var querystring = location.search.replace('?', '').split('&');
        // declare object
        var queryObj = {};
        // loop through each name-value pair and populate object
        for (var i = 0; i < querystring.length; i++) {
            // get name and value
            var name = querystring[i].split('=')[0];
            var value = querystring[i].split('=')[1];
            // populate object
            queryObj[name] = value;
        }
        return queryObj;
    }

    function ListTipoDoc() {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/ListTipoDoc",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $.each(lista, function (index, Tipo) {
                    $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
                });

            },
            error: errores
        });
    }

    $('#cbo_TipoDOC').change(function () {
        if ($("#txt_dni").val() != "") Cargar_Paciente_Documento($("#txt_dni").val());
    });

    function List_Servicios() {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: List_Servicios_Cargado,
            error: errores
        });
    }

    function List_Servicios_Cargado(Resultado) {
        var Lista = Resultado.d;
        $.each(Lista, function (index, Servicio) {
            $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
        });

    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    function List_Medicos() {
        var json = JSON.stringify({ "EspId": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: List_Medicos_Cargado,
            error: errores
        });
    }

    function List_Medicos_Cargado(Resultado) {
        var Lista = Resultado.d;
        $.each(Lista, function (index, Medico) {
            $("#cboMedicoSolicita").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        });

    }

    $(document).ready(function () {
        List_Servicios();
        List_Insumos(false);
        ListTipoDoc();
        List_Medicos();
        List_Proveedores('S');
        var Query = {};
        Query = GetQueryString();
        Pedido_Id = Query['PedidoId'];
        if (Pedido_Id > 0) {
            LoadPedido();
            $("#CargadoPedido").html(Pedido_Id);
        }
        else $("#CargadoFecha").html(FechaActual());
        if (Query['ID'] != null) { CargarPacienteID(Query['ID']); }
        $("#txt_NroFact").mask("9999-99999999", { placeholder: "-" });
        $(".date").datepicker();
    });

    function List_Proveedores(Todos) {
        $.ajax({
            type: "POST",
            data: '{Todos: "' + Todos + '"}',
            url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: List_Proveedores_Cargado,
            error: errores
        });
    }

    function List_Proveedores_Cargado(Resultado) {
        var Lista = Resultado.d;
        $("#cbo_Proveedor").append($("<option></option>").val("0").html("Seleccione Proveedor..."));
        $.each(Lista, function (index, Proveedor) {
            $("#cbo_Proveedor").append($("<option></option>").val(Proveedor.Id).html(Proveedor.Nombre));
        });

    }

    function List_Insumos(Todos) {
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/COMPRAS_INSUMOS_INTERNACION_EXTRAORD",
            data: '{Todos: "' + Todos + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Medicamentos = Resultado.d;
                $.each(Medicamentos, function (i, item) {
                    if (i == 0) {
                        sourceArr.length = 0;
                    }
                    str = Medicamentos[i].COM_INS_GATOS_EXT_DESC;
                    mapped[str] = item.COM_INS_GASTOS_EXT_ID;
                    sourceArr.push(str);
                    if (i == Medicamentos.length - 1) $("#cbo_Medicamento").removeAttr("disabled");
                });
            },
            beforeSend: function () {
                $("#cbo_Medicamento").attr("disabled", true);
            },
            complete: function () {
                $("#cbo_Medicamento").removeAttr("disabled");
            },
            error: errores
        });
    }

    $("#cbo_Medicamento").typeahead({
        source: sourceArr,
        updater: function (selection) {
            $("#txt_Medicamento").val(selection); //nom
            $("#Medicamento_val").html(mapped[selection]); //id
            return selection;
        },
        minLength: 0,
        items: 10
    });

    function LoadPedido() {
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/COM_GASTOS_EXT_CAB_LIST_BY_ID",
            data: '{COM_GASTOS_EXT_CAB_ID: "' + Pedido_Id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var PedidoCab = {};
                PedidoCab = Resultado.d;
                $("#CargadoFecha").html(PedidoCab.COM_GASTOS_EXT_CAB_FECHA_SOL);
                $("#afiliadoId").val(PedidoCab.COM_GASTOS_EXT_CAB_PACIENTE_ID);
                $("#txtFechaSolicitud").val(PedidoCab.COM_GASTOS_EXT_CAB_FECHA_SOL);
                $("#txtFechaAutorizado").val(PedidoCab.COM_GASTOS_EXT_CAB_FECHA_AUT);
                $("#txtFechaCirugia").val(PedidoCab.COM_GASTOS_EXT_CAB_FECHA_CIR);
                $("#cboMedicoSolicita").val(PedidoCab.COM_GASTOS_EXT_CAB_MED_SOL);
                $("#cbo_Servicio").val(PedidoCab.COM_GASTOS_EXT_CAB_SERV_ID);
                CargarPacienteID(PedidoCab.COM_GASTOS_EXT_CAB_PACIENTE_ID);
                LoadDetalles();
            },
            error: errores,
            beforeSend: function () {
//                $("#cargando2").show();
//                $("#cont_datospac").hide();
            }
        });
    }

    $("#txtNHC").keypress(function (event) {
        if (event.which == 13) {
            if ($('#txtNHC').attr('readonly') == undefined) {
                if ($('#txtNHC').val() != '-----------') {
                    Cargar_Paciente_NHC($("#txtNHC").val());

                }
            }

        }
    });

    $("#txt_dni").change(function () {
        if ($('#txt_dni').val() != '--------') {
            Cargar_Paciente_Documento($("#txt_dni").val());

        }
    });

    $("#txtNHC").change(function () {
        if ($('#txtNHC').val() != '-----------') {
            Cargar_Paciente_NHC($("#txtNHC").val());

        }
    });

    function Cargar_Paciente_NHC(NHC) {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
            data: '{NHC: "' + NHC + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Paciente_NHC_Cargado,
            error: errores
        });
    }

    function CargarPacienteID(ID) {
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/CargarPacienteID",
            data: '{ID: "' + ID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Paciente_NHC_Cargado,
            error: errores
        });
    }

    function Cargar_Paciente_NHC_Cargado(Resultado) {
        var Paciente = Resultado.d;
        var PError = false;


        $.each(Paciente, function (index, paciente) {

            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txt_dni").attr('value', paciente.documento_real);
            $("#txtNHC").attr('value', paciente.NHC_UOM);

            $("#afiliadoId").val(paciente.documento);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            $("#CargadoEdad").html(paciente.Edad_Format);

            $("#CargadoApellido").html(paciente.Paciente);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoSeccional").html(paciente.Seccional);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoPaciente").html(paciente.Paciente);

            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
            $("#btnOtroPaciente").show();
            $('#desdeaqui').show();
        });

    }


    $("#btnBuscarPaciente").fancybox({
        'hideOnContentClick': true,
        'width': '75%',
        'height': '75%',
        'href': '../Turnos/BuscarPacientes.aspx?Express=0&Apellido=' + $("#txtPaciente").val().trim(),
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $("a#inline").fancybox({
        'hideOnContentClick': true
    });

    function RecargarPagina(url) {
        document.location = "../Compras/Internacion_GastosExtra.aspx" + url;
    }

    function LoadDetalles() {
        $.ajax({
            type: "POST",
            url: "../Json/Compras/Compras.asmx/COM_GASTOS_EXT_DET_LIST_BY_ID",
            data: '{COM_GASTOS_EXT_CAB_ID: "' + Pedido_Id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: LoadPedidoDet_Cargado,
            complete: function () {
                $("#cargando2").hide();
                $("#cont_datospac").show();
                $('#desdeaqui').click();
            },
            error: errores
        });
    }

    function LoadPedidoDet_Cargado(Resultado) {
        var Detalles = Resultado.d;
        $.each(Detalles, function (i, Detalle) {
            Detalle.Nombre = Detalle.COM_INS_GASTOS_EXT_DESC;
            Detalle.COM_GASTOS_EXT_DET_PRV_NOMBRE = Detalle.COM_GASTOS_EXT_DET_PRV_NOMBRE;
            objMedicamentos.push(Detalle);
        });
        RenderizarTabla();
    }

    $("#txt_dni").keypress(function (event) {
        if (event.which == 13) {
            if ($('#txt_dni').attr('readonly') == undefined) {
                Cargar_Paciente_Documento($("#txt_dni").val());
            }
        }
    });

    function Cargar_Paciente_Documento(Documento) {
        var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Paciente_Documento_Cargado,
            error: errores
        });
    }


    function Cargar_Paciente_Documento_Cargado(Resultado) {
        var Paciente = Resultado.d;
        var PError = false;
        if (Paciente.length == 1) {
            $.each(Paciente, function (index, paciente) {

                $("#txt_dni").prop("readonly", true);
                $("#txtNHC").prop("readonly", true);

                $("#txtPaciente").attr('value', paciente.Paciente);
                $("#txtNHC").attr('value', paciente.NHC_UOM);

                $("#CargadoApellido").html(paciente.Paciente);
                $("#CargadoEdad").html(paciente.Edad_Format);
                $("#CargadoNHC").html(paciente.NHC_UOM);
                $("#CargadoTelefono").html(paciente.Telefono);

                $("#txt_dni").val(paciente.documento_real);
                $("#CargadoDNI").html(paciente.documento_real);
                $("#afiliadoId").val(paciente.documento);
                $("#cbo_TipoDOC").val(paciente.TipoDoc);
                $("#CargadoSeccional").html(paciente.Seccional);

               $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);


                if (PError) {
                    $("#btnOtroPaciente").show();
                }
                else {
                    $("#btnOtroPaciente").show();
                }

            });
        }
        else if (Paciente.length > 1) {
            $("#txtdocumento").val($("#txt_dni").val());
            BuscarPacientes_fancy();
        }
    }

    function BuscarPacientes_fancy() {
        $.fancybox({
            'hideOnContentClick': true,
            'width': '85%',
            'href': "../Turnos/BuscarPacientes.aspx?Express=0",
            'height': '85%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe'
        });
    }

    //Mascara para campo input, admite solo numeros y puntos

    $(".numero").on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    //Validar ingreso de un detalle a la tabla de insumos

    function ValidarDet() {
        if ($("#cbo_Proveedor :selected").val() == "0") { alert("Seleccione Proveedor."); return false; }
        if ($("#Medicamento_val").val() == "0") { alert("Seleccione Insumo."); return false; }
        if ($("#cantidad").val() <= 0) { alert("Ingrese Cantidad."); return false; }
        if ($("#precio_presu").val().trim().length == 0) { alert("Ingrese Precio Presupuestado."); return false; }
        if ($("#precio_fact").val().trim().length == 0) { alert("Ingrese Precio Facturado."); return false; }
        return true;
    }

    function LoadObjDet(){
        var objMedicamento = {};
        objMedicamento.COM_GASTOS_EXT_DET_INS_ID = $("#Medicamento_val").html();
        objMedicamento.COM_GASTOS_EXT_DET_CANTIDAD = parseInt($("#cantidad").val());
        objMedicamento.COM_GASTOS_EXT_DET_PRECIO_PRESU = parseFloat($("#precio_presu").val()).toFixed(2);
        objMedicamento.COM_GASTOS_EXT_DET_PRECIO_FACT = ($("#precio_fact").val().length > 0) ? parseFloat($("#precio_fact").val()).toFixed(2) : 0;
        objMedicamento.COM_GASTOS_EXT_DET_USADO = true;
        objMedicamento.COM_GASTOS_EXT_DET_PRV_ID = $("#cbo_Proveedor :selected").val();
        objMedicamento.COM_GASTOS_EXT_DET_PRV_NOMBRE = $("#cbo_Proveedor :selected").text();
        objMedicamento.Nombre = $("#txt_Medicamento").val();
        objMedicamento.COM_GASTOS_EXT_DET_NRO_FACTURA = $("#txt_NroFact").val();
        objMedicamento.COM_GASTOS_EXT_DET_FECHA_FACT = ($("#txt_FechaFact").val().trim().length == 0) ? "01/01/1900" : $("#txt_FechaFact").val();
        return objMedicamento;
    }

    //Si existe el insumo en la tabla lo actualiza, sino lo inserta como nuevo.
    //Compara por ID de Insumo.

    $("#btnAgregarMedicamento").click(function () {
        if (!ValidarDet()) return false;

        var objIndex = objMedicamentos.findIndex((obj => parseInt(obj.COM_GASTOS_EXT_DET_INS_ID) == parseInt($("#Medicamento_val").html())));

//        if (objIndex == -1)
            objMedicamentos.push(LoadObjDet());
//        else 
//        { modificado para que permita cargar repetidos lo smedicamentos. 13/4/21
//            objMedicamentos[objIndex] = LoadObjDet();
//        }
        RenderizarTabla();
        LimpiarCampos();
    });

    $("#btnCancelarMedicamento").click(function () {
        LimpiarCampos();
    });

    function LimpiarCampos() {
        Editando = -1;
        $("#cantidad").val('');
        $("#cbo_Medicamento").val('');
        $("#Medicamento_val").html('0');
        $("#cbo_Proveedor").removeAttr("disabled");
        $("#cbo_Proveedor").val('0');
        $("#cbo_Medicamento").removeAttr("disabled");
        $("#precio_presu").val('0');
        $("#precio_fact").val('0');
        $("#txt_NroFact").val('');
        $("#txt_FechaFact").val('');
    }

    //Actualiza el contenido de la tabla cuando se inserta, actualiza o elimina un insumo

    function RenderizarTabla() {
        //var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Insumo</th><th>Presupuestado</th><th>Facturado</th><th>Cantidad</th><th>Proveedor</th><th>Nro. Fact</th><th>Fecha Fact</th></tr></thead><tbody>";
        $("#contenido_table").empty();
        $.each(objMedicamentos, function (i,objMedicamento) {
            objMedicamento.COM_GASTOS_EXT_DET_FECHA_FACT = (objMedicamento.COM_GASTOS_EXT_DET_FECHA_FACT == "") ? "01/01/1900" : objMedicamento.COM_GASTOS_EXT_DET_FECHA_FACT;
            Fecha_Fact = (objMedicamento.COM_GASTOS_EXT_DET_FECHA_FACT == "01/01/1900") ? "" : objMedicamento.COM_GASTOS_EXT_DET_FECHA_FACT;
            $("#contenido_table").append("<tr><th scope='row'>"+(i+1)+"</th><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-info btn-sm mr-1' title='Editar Insumo'>Editar</a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-danger btn-sm' title='Quitar Insumo'>Quitar</a></td><td>" + objMedicamento.Nombre + "</td><td>$" + objMedicamento.COM_GASTOS_EXT_DET_PRECIO_PRESU + "</td><td>$" + objMedicamento.COM_GASTOS_EXT_DET_PRECIO_FACT + "</td><td>" + objMedicamento.COM_GASTOS_EXT_DET_CANTIDAD + "</td><td>" + objMedicamento.COM_GASTOS_EXT_DET_PRV_NOMBRE + "</td><td>"+objMedicamento.COM_GASTOS_EXT_DET_NRO_FACTURA+"</td><td>"+ Fecha_Fact +"</td></tr>");
        });
    }

    //Editar insumos en tabla

    function Editar(Nro) {
        Editando = Nro;
        $("#cantidad").val(objMedicamentos[Nro].COM_GASTOS_EXT_DET_CANTIDAD);
        $("#cbo_Medicamento").val(objMedicamentos[Nro].Nombre);
        $("#cbo_Proveedor").val(objMedicamentos[Nro].COM_GASTOS_EXT_DET_PRV_ID);
        $("#cbo_Medicamento").attr('disabled', 'disabled');
        $("#Medicamento_val").html(objMedicamentos[Nro].COM_GASTOS_EXT_DET_INS_ID);
        $("#precio_presu").val(objMedicamentos[Nro].COM_GASTOS_EXT_DET_PRECIO_PRESU);
        $("#precio_fact").val(objMedicamentos[Nro].COM_GASTOS_EXT_DET_PRECIO_FACT);
        $("#txt_Medicamento").val(objMedicamentos[Nro].Nombre);
        $("#txt_NroFact").val(objMedicamentos[Nro].COM_GASTOS_EXT_DET_NRO_FACTURA);
        $("#txt_FechaFact").val(objMedicamentos[Nro].COM_GASTOS_EXT_DET_FECHA_FACT);
    }

    //Funcion eliminar para eliminar insumo de tabla

    function Eliminar(Nro) {
        objMedicamentos.splice(Nro,1);
        RenderizarTabla();
    }

    $("#btnConfirmarPedido").click(function () {
        if (confirm("¿Desea confirmar el pedido?")) {
            if (objMedicamentos.length > 0) {
                    Insert_Pedido(); //Nuevo Remito
            }
            else alert("No hay Medicamentos en la Lista");
        }
    });


    //Inserta cabecera en tabla COM_GASTOS_EXT_CAB
    //Si existe actualiza sino inserta. (Pedido_Id > 0)

    function Insert_Pedido() {
        var f = {};
        f.COM_GASTOS_EXT_CAB_ID = Pedido_Id;
        f.COM_GASTOS_EXT_CAB_PACIENTE_ID = $("#afiliadoId").val();
        f.COM_GASTOS_EXT_CAB_SERV_ID = $("#cbo_Servicio :selected").val();
        f.COM_GASTOS_EXT_CAB_FECHA_SOL = $("#txtFechaSolicitud").val();
        f.COM_GASTOS_EXT_CAB_FECHA_AUT = $("#txtFechaAutorizado").val();
        f.COM_GASTOS_EXT_CAB_FECHA_CIR = $("#txtFechaCirugia").val();
        f.COM_GASTOS_EXT_CAB_MED_SOL = $("#cboMedicoSolicita :selected").val();
        f.COM_GASTOS_EXT_CAB_SERV_ID = $("#cbo_Servicio :selected").val();
        f.COM_GASTOS_OBSERVACIONES = $("#txtObservaciones").val();


        var json = JSON.stringify({ "cab": f });
        $.ajax({
            data: json,
            url: "../Json/Compras/Compras.asmx/COM_GASTOS_EXT_CAB_INSERT",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                Pedido_Id = Resultado.d;
                Insert_Detalles();
            },
            error: errores
        });

    }

    //Si existen detalles los elimina y luego inserta lo nuevo
    //Tabla COM_GASTOS_EXT_DET

    function Insert_Detalles() {
        var json = JSON.stringify({ "arr_Data": objMedicamentos, "CabeceraId": Pedido_Id });
        $.ajax({
            data: json,
            url: "../Json/Compras/Compras.asmx/COM_GASTOS_EXT_DET_INSERT",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                Pedido_Id = Resultado.d;
                alert("Gasto ingresado correctamente.");
                document.location = "Internacion_GastosExtra.aspx";
            },
            error: errores
        });
    }
</script>
<!--Barra sup--> 
<script type="text/javascript">
    $('#desdeaqui').click(function () {
        if (!ValidarCabecera()) return false;

        $("#hastaaqui").show();
        $("#datos_cabecera").hide();
        $("#header").hide();
        $("#btnImprimir").hide();
        $("#CargadoServicio").html($("#cbo_Servicio :selected").text());
    });

    function ValidarCabecera() {
        if ($("#afiliadoId").val().trim().length == 0) { alert("Ingrese Paciente"); return false; }
        if ($("#txtFechaSolicitud").val().trim().length == 0) { alert("Ingrese fecha de solicitud"); return false; }
        if ($("#txtFechaAutorizado").val().trim().length == 0) { alert("Ingrese fecha de autorizacion"); return false; }
        if ($("#txtFechaCirugia").val().trim().length == 0) { alert("Ingrese fecha de cirugia"); return false; }
        if ($("#cboMedicoSolicita :selected").val() == 80001742) { alert("Ingrese médico solicitante"); return false; }
        if ($("#cbo_Servicio :selected").val() == 120000088) { alert("Ingrese servicio"); return false; }

        return true;
    }

    parent.document.getElementById("DondeEstoy").innerHTML = "Compras > <strong>Gastos Extraordinarios</strong>";
</script> 
</body>
</html>


<script type="text/javascript">
    $("#btnInsABM").click(function () {
        $.fancybox(
        {
            'autoDimensions': true,
            'href': 'insumoExtraABM.aspx?',
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () { List_Insumos(false); }
        });
    });
</script>
