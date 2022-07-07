var Id = 0;
var Cirujano;
var Cama;
var Efectuada;
var Pre = 0;
var imprimir_comprobate = false;
var volver_pantalla = false;




$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

$(document).ready(function () {
    $("#PRE_LABORATORIO_FECHA").datepicker();
    $("#PRE_RIESGO_Q_FECHA").datepicker();


    $("#PRE_HORA_INGRESO").mask("99:99", { placeholder: "-" });
    $("#PRE_HS_UCPA_INGRESO_Q").mask("99:99", { placeholder: "-" });

    $("#PRE_ANTITETANICA_DOSIS").mask("9", { placeholder: "_" });


    var Query = {};
    ListTipoDoc();
    Query = GetQueryString();
    Id = Query['Id'];
    if (Id > 0) {
        ListaCirugia();
        Cargar_Sala_y_Cama();
        //Quirofano_Estados();
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
        url: "../Json/Quirofano/Quirofano_.asmx/ListPreAnes_Enc",
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

        var str_cirugia = "";
        str_cirugia = Cirugia.Cirugia;
        if (Cirugia.Cirugia.length > 50) {
            str_cirugia = str_cirugia.substring(0, 50); ;
        }
        $("#CargarCirugia").html(str_cirugia);
        $("#CargarCirujano").html(Cirugia.Cirujano);

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
    Cargar_Preanestesico(Id);
}


function Guardar() {
    if ($("#PRE_ANTITETANICA_DOSIS").val() != "") {
        if ($("#PRE_ANTITETANICA_DOSIS").val() > 3) {
            alert("Error en la dosis de antitetánica");
            return;
        }
    }    

    var p = {};    
    p.PRE_HORA_INGRESO = $("#PRE_HORA_INGRESO").val();
    if ($("#PRE_AYUNO").is(':checked') == true) p.PRE_AYUNO = true; else p.PRE_AYUNO = false;
    p.PRE_OBS_1 = $("#PRE_OBS_1").val();    
    p.PRE_HS_UCPA_INGRESO_Q = $("#PRE_HS_UCPA_INGRESO_Q").val();
    if ($("#PRE_ING_VENOCLISIS").is(':checked') == true) p.PRE_ING_VENOCLISIS = true; else p.PRE_ING_VENOCLISIS = false;
    
    if ($("#PRE_BANIO_PRE_QX").is(':checked') == true) p.PRE_BANIO_PRE_QX = true; else p.PRE_BANIO_PRE_QX = false;
    if ($("#PRE_PROFILAXIS_ATB").is(':checked') == true) p.PRE_PROFILAXIS_ATB = true; else p.PRE_PROFILAXIS_ATB = false;

    if ($("#PRE_MONITOREO").is(':checked') == true) p.PRE_MONITOREO = true; else p.PRE_MONITOREO = false;

    p.PRE_OBS_2 = $("#PRE_OBS_2").val();

    if ($("#TXT_PEDIDO_SANGRE").is(':checked') == true) p.PRE_PEDIDO_SANGRE = "1"; else p.PRE_PEDIDO_SANGRE = "0";    

    if ($("#PRE_PROTESIS_DENTARIA").is(':checked') == true) p.PRE_PROTESIS_DENTARIA = true; else p.PRE_PROTESIS_DENTARIA = false;
    p.PRE_OBS_3 = $("#PRE_OBS_3").val();    
    p.PRE_ANTITETANICA_DOSIS = $("#PRE_ANTITETANICA_DOSIS").val();
    if (p.PRE_ANTITETANICA_DOSIS == "") { p.PRE_ANTITETANICA_DOSIS = -1; }    
    p.PRE_RIESGO_Q_FECHA = $("#PRE_RIESGO_Q_FECHA").val();    
    p.PRE_CONTROL_SIGNOS_VITALES_TA = $("#PRE_CONTROL_SIGNOS_VITALES_TA").val();
    p.PRE_CONTROL_SIGNOS_VITALES_FC = $("#PRE_CONTROL_SIGNOS_VITALES_FC").val();
    p.PRE_CONTROL_SIGNOS_VITALES_FR = $("#PRE_CONTROL_SIGNOS_VITALES_FR").val();
    p.PRE_CONTROL_SIGNOS_VITALES_TEMP = $("#PRE_CONTROL_SIGNOS_VITALES_TEMP").val();
    p.PRE_CONTROL_SIGNOS_VITALES_SPO2 = $("#PRE_CONTROL_SIGNOS_VITALES_SPO2").val();
    p.PRE_OBS_4 = $("#PRE_OBS_4").val();
    p.PRE_LABORATORIO_FECHA = $("#PRE_LABORATORIO_FECHA").val();
    p.PRE_LABORATORIO_HTO = $("#PRE_LABORATORIO_HTO").val();
    p.PRE_LABORATORIO_HB = $("#PRE_LABORATORIO_HB").val();
    p.PRE_LABORATORIO_PLAQUETAS = $("#PRE_LABORATORIO_PLAQUETAS").val();
    p.PRE_LABORATORIO_KPTT = $("#PRE_LABORATORIO_KPTT").val();
    p.PRE_LABORATORIO_QUICK = $("#PRE_LABORATORIO_QUICK").val();
    p.PRE_LABORATORIO_GLUCEMIA = $("#PRE_LABORATORIO_GLUCEMIA").val();
    if ($("#PRE_TIPO_HABITUAL").is(':checked') == true) { p.PRE_TIPO = "1"; }
    if ($("#PRE_TIPO_MODERADO").is(':checked') == true) { p.PRE_TIPO = "2"; }
    if ($("#PRE_TIPO_ALTO").is(':checked') == true) { p.PRE_TIPO = "3"; }
    if ($("#PRE_ANTECEDENTES_HTA").is(':checked') == true) p.PRE_ANTECEDENTES_HTA = true; else p.PRE_ANTECEDENTES_HTA = false;
    if ($("#PRE_ANTECEDENTES_DBT").is(':checked') == true) p.PRE_ANTECEDENTES_DBT = true; else p.PRE_ANTECEDENTES_DBT = false;
    if ($("#PRE_ANTECEDENTES_ENF_RESPIRATORIAS").is(':checked') == true) p.PRE_ANTECEDENTES_ENF_RESPIRATORIAS = true; else p.PRE_ANTECEDENTES_ENF_RESPIRATORIAS = false;
    if ($("#PRE_ANTECEDENTES_ENF_CARDIACAS").is(':checked') == true) p.PRE_ANTECEDENTES_ENF_CARDIACAS = true; else p.PRE_ANTECEDENTES_ENF_CARDIACAS = false;
    p.PRE_OBS_5 = $("#PRE_OBS_5").val();
    p.PRE_OBS_6 = $("#PRE_OBS_6").val();
    p.Peso = $("#txt_peso").val();
    p.PRE_UNIDAD_SANGRE = $("#cbo_unidades_sangre :selected").val();
    
    p.PRE_GRUPO = $("#cbo_sangre_grupo :selected").val();
    p.PRE_FACTOR = $("#cbo_sangre_factor :selected").val();

    if ($("#cboEnfermero option:selected").val() > 0) {p.enfermero = $("#cboEnfermero").val(); }
    
    var json = JSON.stringify({ "p": p, "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Guardar_Pre_Anestesico",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Guardar_Pre_Anestesico_Guardada,
        error: errores
    });
}


$("#btn_imprimir").click(function () {
    imprimir_comprobate = true;


    if (!PermisoEdicion_PuedoGuardar) {
        f_Imprimir();
        return;
    }

    Guardar();
});

//Guardar PreAnestesico
$("#btnGuardar").click(function () {
    Guardar();
});


function f_Imprimir() {
    $.fancybox({
        'autoDimensions': false,
        'href': '../Impresiones/Pre_Anestesico.aspx?Id=' + Id,
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
                window.location.href = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
            }

        }
    });
}

function Guardar_Pre_Anestesico_Guardada(Resultado) {
    var Id = Resultado.d;
    
    if (Pre == 1) {
        document.location = "Insumo.aspx?Id=" + Id + "&Tipo=1&Volver=1";
    }

    if (Pre == 0) {        
        if (Id > 0) {            
            if (imprimir_comprobate) {

                f_Imprimir();
        
            }
            else {
                
                if (volver_pantalla) {
                    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
                }else {
                    alert("Se ha guardado correctamente");
                }
            }

        }
        else { alert("Error al Guardar Intervención!!"); }
    }
    imprimir_comprobate = false;
}


$("#btnVolver").click(function () {
    imprimir_comprobate = false;
    volver_pantalla = true;
    Guardar();
});

$("#btn_cancelear_todo").click(function () {
    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
});



function Cargar_Preanestesico(Quiro_Id) {
    var json = JSON.stringify({ "Id": Quiro_Id });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Cargar_Preanestesico",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Preanestesico_Cargado,
        error: errores
    });
}




//Boton Insumo
$("#btnCarga_Pre_Quirurgico").click(function () {

    if (!PermisoEdicion_PuedoGuardar) {
            document.location = "Insumo.aspx?Id=" + Id + "&Tipo=1&Volver=1";
            return;                
    }

    Pre = 1;
    Guardar();
});


function Cargar_Preanestesico_Cargado(Resultado) {
    var paciente = Resultado.d;
    var PError = false;
    //$.each(Paciente, function (index, paciente) {
    $("#PRE_HORA_INGRESO").val(paciente.PRE_HORA_INGRESO);
    $('#PRE_AYUNO').prop('checked', paciente.PRE_AYUNO);
    $("#PRE_OBS_1").val(paciente.PRE_OBS_1);
    $("#PRE_HS_UCPA_INGRESO_Q").val(paciente.PRE_HS_UCPA_INGRESO_Q);
    $('#PRE_ING_VENOCLISIS').prop('checked', paciente.PRE_ING_VENOCLISIS);    
    if (paciente.PRE_ANTITETANICA_DOSIS == "-1") {paciente.PRE_ANTITETANICA_DOSIS = ""; }
    $("#PRE_ANTITETANICA_DOSIS").val(paciente.PRE_ANTITETANICA_DOSIS);
    $('#PRE_BANIO_PRE_QX').prop('checked', paciente.PRE_BANIO_PRE_QX);
    $('#PRE_PROFILAXIS_ATB').prop('checked', paciente.PRE_PROFILAXIS_ATB);
    $("#PRE_OBS_2").val(paciente.PRE_OBS_2);
    $('#PRE_PROTESIS_DENTARIA').prop('checked', paciente.PRE_PROTESIS_DENTARIA);
    $("#PRE_OBS_3").val(paciente.PRE_OBS_3);
    $("#PRE_RIESGO_Q_FECHA").val(paciente.PRE_RIESGO_Q_FECHA);
    $("#PRE_CONTROL_SIGNOS_VITALES_TA").val(paciente.PRE_CONTROL_SIGNOS_VITALES_TA);
    $("#PRE_CONTROL_SIGNOS_VITALES_FC").val(paciente.PRE_CONTROL_SIGNOS_VITALES_FC);
    $("#PRE_CONTROL_SIGNOS_VITALES_FR").val(paciente.PRE_CONTROL_SIGNOS_VITALES_FR);
    $("#PRE_CONTROL_SIGNOS_VITALES_TEMP").val(paciente.PRE_CONTROL_SIGNOS_VITALES_TEMP);
    $("#PRE_CONTROL_SIGNOS_VITALES_SPO2").val(paciente.PRE_CONTROL_SIGNOS_VITALES_SPO2);
    $("#PRE_OBS_4").val(paciente.PRE_OBS_4);
    $("#PRE_LABORATORIO_FECHA").val(paciente.PRE_LABORATORIO_FECHA);
    $("#PRE_LABORATORIO_HTO").val(paciente.PRE_LABORATORIO_HTO);
    $("#PRE_LABORATORIO_HB").val(paciente.PRE_LABORATORIO_HB);
    $("#PRE_LABORATORIO_PLAQUETAS").val(paciente.PRE_LABORATORIO_PLAQUETAS);
    $("#PRE_LABORATORIO_KPTT").val(paciente.PRE_LABORATORIO_KPTT);
    $("#PRE_LABORATORIO_QUICK").val(paciente.PRE_LABORATORIO_QUICK);
    $("#PRE_LABORATORIO_GLUCEMIA").val(paciente.PRE_LABORATORIO_GLUCEMIA);
    $('#PRE_ANTECEDENTES_HTA').prop('checked', paciente.PRE_ANTECEDENTES_HTA);
    $('#PRE_ANTECEDENTES_DBT').prop('checked', paciente.PRE_ANTECEDENTES_DBT);

    $('#PRE_MONITOREO').prop('checked', paciente.PRE_MONITOREO);    

    $('#PRE_ANTECEDENTES_ENF_RESPIRATORIAS').prop('checked', paciente.PRE_ANTECEDENTES_ENF_RESPIRATORIAS);
    $('#PRE_ANTECEDENTES_ENF_CARDIACAS').prop('checked', paciente.PRE_ANTECEDENTES_ENF_CARDIACAS);
    $("#PRE_OBS_5").val(paciente.PRE_OBS_5);
    $("#PRE_OBS_6").val(paciente.PRE_OBS_6);
    $("#txt_peso").val(paciente.Peso);

    $("#cbo_unidades_sangre").val(paciente.PRE_UNIDAD_SANGRE);    
    
    $("#cbo_sangre_grupo").val(paciente.PRE_GRUPO);
    $("#cbo_sangre_factor").val(paciente.PRE_FACTOR);

    if(paciente.pedido_sangre_turno == 1){$("#TXT_PEDIDO_SANGRE").prop('checked', true);}
    if(paciente.PRE_TIPO==1){$( "#PRE_TIPO_HABITUAL").prop('checked', true);}
    if(paciente.PRE_TIPO==2){$( "#PRE_TIPO_MODERADO").prop('checked', true);}
    if(paciente.PRE_TIPO==3){$( "#PRE_TIPO_ALTO").prop('checked', true);}

    $("#cboEnfermero").val(paciente.enfermero);

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


    function Cargar_Sala_y_Cama() {
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Cargar_Sala_y_Cama",
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


    function Listar_Insumos_Utilizados() {
        $.ajax({
            type: "POST",
            data: "{CirugiaID: '" + Id + "'}",
            url: "../Json/Quirofano/Quirofano_.asmx/Listar_Insumos_PreAnestesia",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Lista = Resultado.d;
                var Salida = "";
                $.each(Lista, function (index, Insumo) {
                    Salida = Salida + "Insumo: " + Insumo.Insumo + " - Cant: " + Insumo.Cantidad + " - Obs.: " + Insumo.Observacion + "</br>";
                });                
                $("#PRE_INSUMO").html(Salida);
            },
            error: errores
        });
    }



    

//    function Quirofano_Estados() {
//        $.ajax({
//            type: "POST",
//            url: "../Json/Quirofano/Quirofano_.asmx/H2_QUIROFANO_ESTADOS",
//            contentType: "application/json; charset=utf-8",
//            data: '{CirugiaId: "' + Id + '"}',
//            dataType: "json",
//            success: function (Resultado) {
//                var estado = Resultado.d;
//                if (estado.PRE == 0) {
//                    //$("#btnVolver").hide();
//                }
//            },
//            error: errores
//        });
//    }



    //Permiso Guardado
    PermisoEdicion_PuedoGuardar = true;
    PermisoEdicion_dias = "";

    function PermisoEdicion(Cirugia_id) {
        var json = JSON.stringify({ "CirugiaId": Cirugia_id });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Quirofano/Quirofano_.asmx/TengoPermisoEdicion",
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
            url: "../Json/Quirofano/Quirofano_.asmx/cargarEnfermeros",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Respuesta) {
                $("#cboEnfermero").append("<option value='0'>Seleccione</option>");
                $.each(Respuesta.d, function (index, item) { $("#cboEnfermero").append("<option value='" + item.id + "'>" + item.usuario + "</option>"); });
            },
            error: errores
        });
    }