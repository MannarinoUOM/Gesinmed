var Id = 0;
var Cirujano;
var Cama;
var Efectuada;
var Post = 0;

var Editando1 = -1;
var Editando2 = -1;

var Control_Signos_Vitales_Guardar = new Array();
var Monitoreo_Guardar = new Array();
var Control_Signos_Vitales = {};
var Monitoreo = {};

var imprimir_comprobate = false;
var volver_pantalla = false;

var MostrarMonitoreo = false;
var CargarDatos = true;

$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

$(document).ready(function () {
    $("#PRE_LABORATORIO_FECHA").datepicker();
    $("#PRE_RIESGO_Q_FECHA").datepicker();


    $("#txt_hora").mask("99:99", { placeholder: "__:__" });
    $("#txt_hora2").mask("99:99", { placeholder: "__:__" });
    $("#txt_hora_ingreso").mask("99:99", { placeholder: "__:__" });
    $("#txt_hora_egreso").mask("99:99", { placeholder: "__:__" });


    var Query = {};
    ListTipoDoc();
    Query = GetQueryString();
    Id = Query['Id'];
    if (Id > 0) {
        ListaCirugia();
        Cargar_Sala_y_Cama();
        PermisoEdicion(Id);
        //Listar_Insumos_Utilizados();
    }

    cargarEnfermeros();

});

$('#Hora').change(function () {

    ErrorHora = false;
    var hora = $('#Hora').val();
    if ($('#Hora').val().length == 5) {

        var h1 = hora.charAt(0);
        var h2 = hora.charAt(1);
        var dp = hora.charAt(2);
        var m1 = hora.charAt(3);

        if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
        if (m1 > 5) { ErrorHora = true; }
        if (dp != ":") { ErrorHora = true; }
        if (ErrorHora) {
            $('#Hora').val("");
        }
    }
});


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
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

$("#txt_dni").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txt_dni').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txt_dni").val());
        }

    }
});

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


function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
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
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        //var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        //if (AnioNacimiento.getFullYear() == 0) {
        //    edad = S / FN;
        //}


        $("#txt_dni").val(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.NHC_UOM);


        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }

        //alert(paciente.documento);
        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}




function Cargar_Paciente_Documento(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);

        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }

        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}


function ListaCirugia() {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Hemodinamia.asmx/ListPreAnes_Enc",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListaCirugia_Cargado,
        error: errores
    });
}

function ListaCirugia_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Cirugia) {
        $("#CargadoApellido").html(Cirugia.Paciente);
        $("#CargadoNHC").html(Cirugia.NHC);
        CargarPacienteID(Cirugia.Paciente_Id);

        if (Cirugia.Urgencia) {
            $("#CargadoUrgencia").html("SI");
        } else {
            $("#CargadoUrgencia").html("NO");
        }


        $("#CargaMonitoreo").html(Cirugia.Monitoreo);
        //$("#CargarCirugia").html(Cirugia.Cirugia);
        //$("#CargarCirujano").html(Cirugia.Cirujano);

        $("#CargadoFecha").html(Cirugia.Fecha);
        $("#CargadoDiagnostico").html(Cirugia.Diagnostico);
        $("#CargadoAnestesista").html(Cirugia.Anestesista);
        $("#CargadoAnestesia").html(Cirugia.Anestesia);
        //$("#CargadoObservaciones").html(Cirugia.Observaciones);
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
	$('.pie').height() -
	$('#hastaaqui').height()));

    //ESTO CARGAR LOS DATOS DEL PRE-ANESTESICO (ID)    
    if (CargarDatos) {
        Cargar_Post(Id);
        Cargar_Post_Monitoreo(Id);
        Post_Signos_Vitales_Cargar(Id);
    }
}

function formatTime(time) {
    var result = false, m;
    var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    if ((m = time.match(re))) {
        result = (m[1].length == 2 ? "" : "0") + m[1] + ":" + m[2];
    }
    return result;
}

function Guardar() {

    if (!PermisoEdicion_PuedoGuardar) {
        if (Post == 1) {
            document.location = "Insumo.aspx?Id=" + Id + "&Tipo=3&Volver=3";
            return;
        }
        else {
            f_Imprimir();
            return;
        }
    }

    if ($("#txt_hora_ingreso").val().trim() != "") {
        if (!formatTime($("#txt_hora_ingreso").val().trim())) {
            alert("La hora 'Hora Ingreso a Post' ingresada no es válida");
            return;
        }
    }

    if ($("#txt_hora_egreso").val().trim() != "") {
        if (!formatTime($("#txt_hora_egreso").val().trim())) {
            alert("La hora 'Hora Egreso de Post' ingresada no es válida");
            return;
        }
    }


    var p = {};
    p.txt_sol_fisiologica = $("#txt_sol_fisiologica").val();
    p.txt_dextrosa = $("#txt_dextrosa").val();
    p.txt_ringer_lactato = $("#txt_ringer_lactato").val();
    p.txt_expansor_plasmatico = $("#txt_expansor_plasmatico").val();
    p.txt_observaciones = $("#txt_observaciones").val();
    p.txt_hora_fin = $("#txt_hora_egreso").val();
    p.txt_hora_ingreso = $("#txt_hora_ingreso").val();


    p.cirugia_id = Id;
    p.eliminado = false;

    if ($("#ck_sonda_nasogastrica").is(':checked') == true) p.sondas_nasogastrica = true; else p.sondas_nasogastrica = false;
    if ($("#ck_sonda_vesical").is(':checked') == true) p.sondas_vesical = true; else p.sondas_vesical = false;
    p.cant_sondas = $("#cbo_sondas").val();


    if ($("#cboEnfermero  option:selected").val() > 0) { p.enfermero = $("#cboEnfermero").val(); }
    

    var json = JSON.stringify({ "cg": p, "csv": Control_Signos_Vitales_Guardar,  "pm": Monitoreo_Guardar });
    $.ajax({
        type: "POST",
        url: "../Json/Hemodinamia.asmx/H2_HEMODINAMIA_POST_GUARDAR",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardar_Post_Anestesico_Guardada,
        error: errores
    });
}


$("#btn_imprimir").click(function () {
    imprimir_comprobate = true;
    Guardar();
});

//Guardar PreAnestesico
$("#btnGuardar").click(function () {
    Guardar();
});


function f_Imprimir() {
    $.fancybox({
        'autoDimensions': false,
        'href': '../Impresiones/Quirofano_Impresion_Post.aspx?Cirugia_Id=' + Id,
        'width': '95%',
        'height': '95%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'onClosed': function () {
            if (volver_pantalla) {
                window.location.href = "Planificar-Hemodinamia.aspx?Cirugia_Id=" + Id;
            }
        }
    });
}

function Guardar_Post_Anestesico_Guardada(Resultado) {
    Monitoreo = {};
    Control_Signos_Vitales = {};
    Control_Signos_Vitales_Guardar = [];
    Monitoreo_Guardar = [];

    if (CargarDatos) {
        Cargar_Post_Monitoreo(Id);
        Post_Signos_Vitales_Cargar(Id);
    }

    
    //var Id = Resultado.d;
    if (Post == 1) {
        document.location = "Insumo.aspx?Id=" + Id + "&Tipo=3&Volver=3";
    }

    if (Post == 0) {
        if (Id > 0) {

            if (imprimir_comprobate) {
                f_Imprimir();                
            }
            else {
                if (volver_pantalla) {
                    window.location.href = "Planificar-Hemodinamia.aspx?Cirugia_Id=" + Id;
                }
                else {
                    alert("Se ha guardado correctamente");
                }
            }

        }
        else { alert("Error al Guardar Intervención!!"); }
        
    }
    imprimir_comprobate = false;
}

$("#btn_cancelear_todo").click(function () {
    window.location = "Planificar-Hemodinamia.aspx?Cirugia_Id=" + Id;
});

$("#btnVolver").click(function () {
    imprimir_comprobate = false;
    volver_pantalla = true;
    Guardar();
});



function Cargar_Post(Quiro_Id) {
    var json = JSON.stringify({ "Cirugia_Id": Quiro_Id });
    $.ajax({
        type: "POST",
        url: "../Json/Hemodinamia.asmx/H2_HEMODINAMIA_POST_CABECERA_CARGAR",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Post_Cargado,
        error: errores
    });
}

function Cargar_Post_Cargado(Resultado) {
    var paciente = Resultado.d;
    var PError = false;    
    $("#txt_sol_fisiologica").val(paciente.txt_sol_fisiologica);
    $("#txt_dextrosa").val(paciente.txt_dextrosa);
    $("#txt_ringer_lactato").val(paciente.txt_ringer_lactato);
    $("#txt_expansor_plasmatico").val(paciente.txt_expansor_plasmatico);
    $("#txt_hora_egreso").val(paciente.txt_hora_fin);
    $("#txt_hora_ingreso").val(paciente.txt_hora_ingreso);
    $("#txt_observaciones").val(paciente.txt_observaciones);
    $('#ck_sonda_nasogastrica').prop('checked', paciente.sondas_nasogastrica);
    $('#ck_sonda_vesical').prop('checked', paciente.sondas_vesical);
    $('#cbo_sondas').val(paciente.cant_sondas);
    $("#cboEnfermero").val(paciente.enfermero);
}



//Boton Insumo
$("#btnCarga_Post_Quirurgico").click(function () {
    $("#btnCarga_Post_Quirurgico").prop('disabled', false);
    Post = 1;
    CargarDatos = false;    
    Guardar();
});





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


    function Cargar_Sala_y_Cama() {
        $.ajax({
            type: "POST",
            url: "../Json/Hemodinamia.asmx/Cargar_Sala_y_Cama",
            contentType: "application/json; charset=utf-8",
            data: '{Quirofano_ID: "' + Id + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#Cargado_Sala").html(lista.Sala);
                $("#Cargado_Cama").html(lista.Cama);
            },
            error: errores
        });
    }







    function Aceptar1() {

        if ($("#txt_hora").val().trim() != "") {
            if (!formatTime($("#txt_hora").val().trim())) {
                alert("La hora ingresada no es válida");
                return;
            }
        }
     
        if (Editando1 == -1) 
        {            
            Control_Signos_Vitales = {};
            Control_Signos_Vitales.eliminado = false;
            Control_Signos_Vitales.id = 0;
            Control_Signos_Vitales.txt_TA = $("#txt_TA").val();
            Control_Signos_Vitales.txt_FC = $("#txt_FC").val();
            Control_Signos_Vitales.txt_FR = $("#txt_FR").val();
            Control_Signos_Vitales.txt_TEMP = $("#txt_TEMP").val();
            Control_Signos_Vitales.txt_SPO2 = $("#txt_SPO2").val();
            Control_Signos_Vitales.txt_hora = $("#txt_hora").val();
            Control_Signos_Vitales_Guardar.push(Control_Signos_Vitales);            
        }
        else 
        {         
            Control_Signos_Vitales_Guardar[Editando1].txt_TA = $("#txt_TA").val();
            Control_Signos_Vitales_Guardar[Editando1].txt_FC = $("#txt_FC").val();
            Control_Signos_Vitales_Guardar[Editando1].txt_FR = $("#txt_FR").val();
            Control_Signos_Vitales_Guardar[Editando1].txt_TEMP = $("#txt_TEMP").val();
            Control_Signos_Vitales_Guardar[Editando1].txt_SPO2 = $("#txt_SPO2").val();
            Control_Signos_Vitales_Guardar[Editando1].txt_hora = $("#txt_hora").val();
        }

        Editando1 = -1;
        Renderizar1();
        Cancelar1();
    }

    function Renderizar1() {
        $("#body_CSV").html("");
        for (var i = 0; i < Control_Signos_Vitales_Guardar.length; i++) {
            if (Control_Signos_Vitales_Guardar[i].eliminado == 0) {
                $('#body_CSV').append('<tr><td style="width: 32px;"><a href="javascript:Editar1(' + i + ');" ><img src="../img/Quirofano/Editar.png" /></a><a href="javascript:Borrar1(' + i + ');"><img src="../img/Quirofano/Borrar.png" /></a></td><td style="width: 97px;">' + Control_Signos_Vitales_Guardar[i].txt_TA + '</td><td style="width: 97px;">' + Control_Signos_Vitales_Guardar[i].txt_FC + '</td><td style="width: 97px;">' + Control_Signos_Vitales_Guardar[i].txt_FR + '</td><td style="width: 167px;">' + Control_Signos_Vitales_Guardar[i].txt_TEMP + '</td><td style="width: 163px;">' + Control_Signos_Vitales_Guardar[i].txt_SPO2 + '</td><td style="width: 146px;">' + Control_Signos_Vitales_Guardar[i].txt_hora + '</td></tr>');
            }
        }
        
    }

    function Cancelar1() {
        $("#txt_TA").val("");
        $("#txt_FC").val("");
        $("#txt_FR").val("");
        $("#txt_TEMP").val("");
        $("#txt_SPO2").val("");
        $("#txt_hora").val("");
    }

    function Borrar1(pos_id) {
        Control_Signos_Vitales_Guardar[pos_id].eliminado = true;
        Renderizar1();
    }






    function Aceptar2() {

        if ($("#txt_hora2").val().trim() != "") {
            if (!formatTime($("#txt_hora2").val().trim())) {
                alert("La hora ingresada no es válida");
                return;
            }
        }

        if (Editando2 == -1) {
            Monitoreo = {};
            Monitoreo.eliminado = false;
            Monitoreo.id = 0;
            Monitoreo.txt_sato2 = $("#txt_sato2").val();
            Monitoreo.txt_hto = $("#txt_hto").val();
            Monitoreo.txt_hb = $("#txt_hb").val();
            Monitoreo.txt_ph = $("#txt_ph").val();
            Monitoreo.txt_po2 = $("#txt_po2").val();
            Monitoreo.txt_pco2 = $("#txt_pco2").val();
            Monitoreo.txt_quick = $("#txt_quick").val();
            Monitoreo.txt_hco3 = $("#txt_hco3").val();
            Monitoreo.txt_na = $("#txt_na").val();
            Monitoreo.txt_cl = $("#txt_cl").val();
            Monitoreo.txt_k = $("#txt_k").val();
            Monitoreo.txt_kptt = $("#txt_kptt").val();
            Monitoreo.txt_sat = $("#txt_sat").val();
            Monitoreo.txt_eb = $("#txt_eb").val();
            Monitoreo.txt_hora2 = $("#txt_hora2").val();
            Monitoreo_Guardar.push(Monitoreo);            
        }
        else {
            Monitoreo_Guardar[Editando2].txt_sato2 = $("#txt_sato2").val();
            Monitoreo_Guardar[Editando2].txt_hto = $("#txt_hto").val();
            Monitoreo_Guardar[Editando2].txt_hb = $("#txt_hb").val();
            Monitoreo_Guardar[Editando2].txt_ph = $("#txt_ph").val();
            Monitoreo_Guardar[Editando2].txt_po2 = $("#txt_po2").val();
            Monitoreo_Guardar[Editando2].txt_pco2 = $("#txt_pco2").val();
            Monitoreo_Guardar[Editando2].txt_quick = $("#txt_quick").val();
            Monitoreo_Guardar[Editando2].txt_hco3 = $("#txt_hco3").val();
            Monitoreo_Guardar[Editando2].txt_na = $("#txt_na").val();
            Monitoreo_Guardar[Editando2].txt_cl = $("#txt_cl").val();
            Monitoreo_Guardar[Editando2].txt_k = $("#txt_k").val();
            Monitoreo_Guardar[Editando2].txt_kptt = $("#txt_kptt").val();
            Monitoreo_Guardar[Editando2].txt_sat = $("#txt_sat").val();
            Monitoreo_Guardar[Editando2].txt_eb = $("#txt_eb").val();
            Monitoreo_Guardar[Editando2].txt_hora2 = $("#txt_hora2").val();     
        }        

        Editando2 = -1;
        Renderizar2();
        Cancelar2();
    }

    function Renderizar2() {
        
        $("#body_MONITOREO").html("");
        for (var i = 0; i < Monitoreo_Guardar.length; i++) {
            if (Monitoreo_Guardar[i].eliminado == 0) {            
                $('#body_MONITOREO').append('<tr><td style="width: 42px;"><a href="javascript:Editar2(' + i + ');" ><img src="../img/Quirofano/Editar.png" /></a><a href="javascript:Borrar2(' + i + ');"><img src="../img/Quirofano/Borrar.png" /></a></td><td style="width: 65px;">' + Monitoreo_Guardar[i].txt_sato2 + '</td><td style="width: 42px;">' + Monitoreo_Guardar[i].txt_hto + '</td><td style="width: 42px;">' + Monitoreo_Guardar[i].txt_hb + '</td><td style="width: 42px;">' + Monitoreo_Guardar[i].txt_ph + '</td><td style="width: 42px;">' + Monitoreo_Guardar[i].txt_po2 + '</td><td style="width: 45px;">' + Monitoreo_Guardar[i].txt_pco2 + '</td><td style="width: 53px;">' + Monitoreo_Guardar[i].txt_quick + '</td><td style="width: 46px;">' + Monitoreo_Guardar[i].txt_hco3 + '</td><td style="width: 42px;">' + Monitoreo_Guardar[i].txt_na + '</td><td style="width: 42px;">' + Monitoreo_Guardar[i].txt_cl + '</td><td style="width: 43px;">' + Monitoreo_Guardar[i].txt_k + '</td><td style="width: 44px;">' + Monitoreo_Guardar[i].txt_kptt + '</td><td style="width: 43px;">' + Monitoreo_Guardar[i].txt_sat + '</td><td style="width: 43px;">' + Monitoreo_Guardar[i].txt_eb + '</td><td style="width: 44px;">' + Monitoreo_Guardar[i].txt_hora2 + '</td></tr>');                
            }
        }
    }

    function Cancelar2() {
        $("#txt_sato2").val("");
        $("#txt_hto").val("");
        $("#txt_hb").val("");
        $("#txt_ph").val("");
        $("#txt_po2").val("");
        $("#txt_pco2").val("");
        $("#txt_quick").val("");
        $("#txt_hco3").val("");
        $("#txt_na").val("");
        $("#txt_cl").val("");
        $("#txt_k").val("");
        $("#txt_kptt").val("");
        $("#txt_sat").val("");
        $("#txt_eb").val("");
        $("#txt_hora2").val("");
    }

    function Borrar2(pos_id) {
        Monitoreo_Guardar[pos_id].eliminado = true;
        Renderizar2();
    }


    function Editar1(pos_id) {
        Editando1 = pos_id;
        $("#txt_TA").val(Control_Signos_Vitales_Guardar[pos_id].txt_TA);
        $("#txt_FC").val(Control_Signos_Vitales_Guardar[pos_id].txt_FC);
        $("#txt_FR").val(Control_Signos_Vitales_Guardar[pos_id].txt_FR);
        $("#txt_TEMP").val(Control_Signos_Vitales_Guardar[pos_id].txt_TEMP);
        $("#txt_SPO2").val(Control_Signos_Vitales_Guardar[pos_id].txt_SPO2);
        $("#txt_hora").val(Control_Signos_Vitales_Guardar[pos_id].txt_hora);
    }

    function Editar2(pos_id) {
        Editando2 = pos_id;
        $("#txt_sato2").val(Monitoreo_Guardar[pos_id].txt_sato2);
        $("#txt_hto").val(Monitoreo_Guardar[pos_id].txt_hto);
        $("#txt_hb").val(Monitoreo_Guardar[pos_id].txt_hb);
        $("#txt_ph").val(Monitoreo_Guardar[pos_id].txt_ph);
        $("#txt_po2").val(Monitoreo_Guardar[pos_id].txt_po2);
        $("#txt_pco2").val(Monitoreo_Guardar[pos_id].txt_pco2);
        $("#txt_quick").val(Monitoreo_Guardar[pos_id].txt_quick);
        $("#txt_hco3").val(Monitoreo_Guardar[pos_id].txt_hco3);
        $("#txt_na").val(Monitoreo_Guardar[pos_id].txt_na);
        $("#txt_cl").val(Monitoreo_Guardar[pos_id].txt_cl);
        $("#txt_k").val(Monitoreo_Guardar[pos_id].txt_k);
        $("#txt_kptt").val(Monitoreo_Guardar[pos_id].txt_kptt);
        $("#txt_sat").val(Monitoreo_Guardar[pos_id].txt_sat);
        $("#txt_eb").val(Monitoreo_Guardar[pos_id].txt_eb);
        $("#txt_hora2").val(Monitoreo_Guardar[pos_id].txt_hora2);
    }


    

    function Cargar_Post_Monitoreo(Quiro_Id) {
        var json = JSON.stringify({ "Cirugia_Id": Quiro_Id });
        $.ajax({
            type: "POST",
            url: "../Json/Hemodinamia.asmx/H2_HEMODINAMIA_POST_CABECERA_DETALLE_MONITOREO_CARGAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Post_Monitoreo_Cargado,
            error: errores
        });
    }

    function Cargar_Post_Monitoreo_Cargado(Resultado) {
        var lista = Resultado.d;

        $.each(lista, function (index, dato) {
            Monitoreo = {};
            Monitoreo.eliminado = dato.eliminado;
            Monitoreo.id = dato.id;
            Monitoreo.txt_sato2 = dato.txt_sato2;
            Monitoreo.txt_hto = dato.txt_hto;
            Monitoreo.txt_hb = dato.txt_hb;
            Monitoreo.txt_ph = dato.txt_ph;
            Monitoreo.txt_po2 = dato.txt_po2;
            Monitoreo.txt_pco2 = dato.txt_pco2;
            Monitoreo.txt_quick = dato.txt_quick;
            Monitoreo.txt_hco3 = dato.txt_hco3;            
            Monitoreo.txt_na = dato.txt_na;
            Monitoreo.txt_cl = dato.txt_cl;
            Monitoreo.txt_k = dato.txt_k;
            Monitoreo.txt_kptt = dato.txt_kptt;
            Monitoreo.txt_sat = dato.txt_sat;
            Monitoreo.txt_eb = dato.txt_eb;
            Monitoreo.txt_hora2 = dato.txt_hora2;
            Monitoreo_Guardar.push(Monitoreo);            
        });
        Renderizar2();
    }



    function Post_Signos_Vitales_Cargar(Quiro_Id) {
        var json = JSON.stringify({ "Cirugia_Id": Quiro_Id });
        $.ajax({
            type: "POST",
            url: "../Json/Hemodinamia.asmx/H2_HEMODINAMIA_POST_SIGNOS_VITALES_CARGAR",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Post_Signos_Vitales_Cargado,
            error: errores
        });
    }

    function Cargar_Post_Signos_Vitales_Cargado(Resultado) {
        var lista = Resultado.d;


        $.each(lista, function (index, dato) {            
            Control_Signos_Vitales = {};
            Control_Signos_Vitales.eliminado = dato.eliminado;
            Control_Signos_Vitales.id = dato.id;
            Control_Signos_Vitales.txt_TA = dato.txt_TA;
            Control_Signos_Vitales.txt_FC = dato.txt_FC;
            Control_Signos_Vitales.txt_FR = dato.txt_FR;
            Control_Signos_Vitales.txt_TEMP = dato.txt_TEMP;
            Control_Signos_Vitales.txt_SPO2 = dato.txt_SPO2;
            Control_Signos_Vitales.txt_hora = dato.txt_hora;            
            Control_Signos_Vitales_Guardar.push(Control_Signos_Vitales);
        });
        Renderizar1();
    }



    $("#btn_Iono_EAB").click(function () {
        if (MostrarMonitoreo == false) {
            MostrarMonitoreo = true;
            $("#Contenedor_MONITOREO").show();
        }
        else {
            $("#Contenedor_MONITOREO").hide();
            MostrarMonitoreo = false;
        }
    });


    //Permiso Guardado
    PermisoEdicion_PuedoGuardar = true;
    PermisoEdicion_dias = "";

    function PermisoEdicion(Cirugia_id) {
        var json = JSON.stringify({ "CirugiaId": Cirugia_id });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Hemodinamia.asmx/TengoPermisoEdicion",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Respuesta) {
                var dato = Respuesta.d;
                PermisoEdicion_PuedoGuardar = dato.Puedo;
                PermisoEdicion_dias = dato.Dias;
                if (!PermisoEdicion_PuedoGuardar) {
                    $("#btnGuardar").hide();
                    $("#btnVolver").remove();
                }
            },
            error: errores
        });
    }

    function cargarEnfermeros() {
        $.ajax({
            type: "POST",
            url: "../Json/Hemodinamia.asmx/cargarEnfermeros",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Respuesta) {
                $("#cboEnfermero").append("<option value='0'>Seleccione</option>");
                $.each(Respuesta.d, function (index, item) { $("#cboEnfermero").append("<option value='"+ item.id +"'>"+ item.usuario +"</option>"); });
            },
            error: errores
        });
    }