var Id = 0;
var imprimir_comprobate = false;
var volver_pantalla = false;

$(document).ready(function () {

    var Query = {};
    Query = GetQueryString();
    Id = Query['Id'];
    if (Id > 0) {
        LoadCirugia();
        Cargar_Sala_y_Cama();
    }
    PermisoEdicion(Id);
    ListTipoDoc();
});


$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});


$("#btn_imprimir").click(function () {
    imprimir_comprobate = true;
    $("#btnGuardar").click();    
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$("#btn_cancelear_todo").click(function () {
    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
});

$("#btnVolver").click(function () {
    volver_pantalla = true;
    imprimir_comprobate = false;
    $("#btnGuardar").click();
});


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

function LoadCirugia() {
    var json = JSON.stringify({ "Id": Id, "Fecha": null, "Baja": false });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Cargada,
        error: errores
    });
}



function errores(msg) {
    alert('Error: ' + msg.responseText);
}

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


function Cargar_Paciente_NHC_Cargado(Resultado) {
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


        //var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        //if (AnioNacimiento.getFullYear() == 0) {
        //    edad = S / FN;
        //}

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
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

$("#btnGuardar").click(function () {

    if (!PermisoEdicion_PuedoGuardar) {
        f_Imprimir();
        return;
    }

    var r = {};
    error = 0;
    $(":radio").each(function () {
        var val = $('input:radio[name=' + this.name + ']:checked').val();
        if (val === undefined) {
            //error = 1;

            //alert("Faltan seleccionar opciones.");
            //return false;
        }
    });

    if (error == 1) { return; }

    r.nhc = $("#CargadoNHC").html();
    r.operacion = Id;
    r.observaciones = $("#txt_Observaciones").val();

    r.A1 = $('input:radio[name=A1]:checked').val();
    r.A2 = $('input:radio[name=A2]:checked').val();
    r.A3 = $('input:radio[name=A3]:checked').val();
    r.A4 = $('input:radio[name=A4]:checked').val();
    r.A5 = $('input:radio[name=A5]:checked').val();
    r.A6 = $('input:radio[name=A6]:checked').val();
    r.A7 = $('input:radio[name=A7]:checked').val();
    r.A8 = $('input:radio[name=A8]:checked').val();
    r.A9 = $('input:radio[name=A9]:checked').val();
    r.A10 = $('input:radio[name=A10]:checked').val();
    r.A11 = $('input:radio[name=A11]:checked').val();
    r.A12 = $('input:radio[name=A12]:checked').val();
    r.A13 = $('input:radio[name=A13]:checked').val();
    r.A14 = $('input:radio[name=A14]:checked').val();



    r.B1 = $('input:radio[name=B1]:checked').val();
    r.B2 = $('input:radio[name=B2]:checked').val();
    r.B3 = $('input:radio[name=B3]:checked').val();
    r.B4 = $('input:radio[name=B4]:checked').val();
    r.B5 = $('input:radio[name=B5]:checked').val();
    r.B6 = $('input:radio[name=B6]:checked').val();



    r.C1 = $('input:radio[name=C1]:checked').val();
    r.C2 = $('input:radio[name=C2]:checked').val();
    r.C3 = $('input:radio[name=C3]:checked').val();
    r.C4 = $('input:radio[name=C4]:checked').val();
    r.C5 = $('input:radio[name=C5]:checked').val();
    r.C6 = $('input:radio[name=C6]:checked').val();
    r.C7 = $('input:radio[name=C7]:checked').val();
    r.C8 = $('input:radio[name=C8]:checked').val();
    r.C9 = $('input:radio[name=C9]:checked').val();



    var json = JSON.stringify({ "c": r });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Resolucion28_Guardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Resolucion28_Guardar_Guardada,
        error: errores
    });
});

function f_Imprimir() {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Resolucion28.aspx?Id=' + Id,
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

function Resolucion28_Guardar_Guardada(Resultado) {
    var Resolucion = Resultado.d;
    //alert(Resolucion);

    if (imprimir_comprobate) {
        f_Imprimir();
    }
    else {
        if (volver_pantalla) {
            window.location.href = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
        }
        else {
            alert("Se ha guardado correctamente la Resolución 28");
        }
    }
    imprimir_comprobate = false;
    Quirofano_Estados();
}

function LoadResolucion() {    
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/CargarResolucion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarResolucion_Guardada,
        error: errores
    });

}


var R28 = 0;
function Quirofano_Estados() {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/H2_QUIROFANO_ESTADOS",
        contentType: "application/json; charset=utf-8",
        data: '{CirugiaId: "' + Id + '"}',
        dataType: "json",
        success: function (Resultado) {
            var estado = Resultado.d;
            R28 = estado.R28;
            if (estado.R28_COMPLETO == 1) {
                $("#btn_imprimir").show();
            }
        },
        error: errores
    });
}


function CargarResolucion_Guardada(Resultado) {
    var r = Resultado.d;
    $("#A1_" + r.A1).prop('checked',true);
    $("#A2_" + r.A2).prop('checked',true);
    $("#A3_" + r.A3).prop('checked',true);
    $("#A4_" + r.A4).prop('checked',true);
    $("#A5_" + r.A5).prop('checked',true);
    $("#A6_" + r.A6).prop('checked',true);
    $("#A7_" + r.A7).prop('checked', true);
    $("#A8_" + r.A8).prop('checked', true);
    $("#A9_" + r.A9).prop('checked', true);
    $("#A10_" + r.A10).prop('checked', true);
    $("#A11_" + r.A11).prop('checked', true);
    $("#A12_" + r.A12).prop('checked', true);
    $("#A13_" + r.A13).prop('checked', true);
    $("#A14_" + r.A14).prop('checked', true);


    $("#B1_" + r.B1).prop('checked', true);
    $("#B2_" + r.B2).prop('checked', true);
    $("#B3_" + r.B3).prop('checked', true);
    $("#B4_" + r.B4).prop('checked', true);
    $("#B5_" + r.B5).prop('checked', true);
    $("#B6_" + r.B6).prop('checked', true);

    
    $("#C1_" + r.C1).prop('checked', true);
    $("#C2_" + r.C2).prop('checked', true);
    $("#C3_" + r.C3).prop('checked', true);
    $("#C4_" + r.C4).prop('checked', true);
    $("#C5_" + r.C5).prop('checked', true);
    $("#C6_" + r.C6).prop('checked', true);
    $("#C7_" + r.C7).prop('checked', true);
    $("#C8_" + r.C8).prop('checked', true);
    $("#C9_" + r.C9).prop('checked', true);

    $("#txt_Observaciones").val(r.observaciones);
    Quirofano_Estados();
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

            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


            //var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
            //if (AnioNacimiento.getFullYear() == 0) {
            //    edad = S / FN;
            //}

            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.documento);
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

            $("#afiliadoId").val(paciente.documento);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
                $("#desdeaqui").focus();
            }

        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}





$("#txt_dni").change(function () {
    if ($('#txt_dni').val().length > 0) {
        Cargar_Paciente_Documento($("#txt_dni").val());
    }
});

$("#txtNHC").change(function () {
    if ($('#txtNHC').val().length > 0) {
        Cargar_Paciente_NHC($("#txtNHC").val());
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

        $("#txt_dni").val(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC_Visible").html(paciente.NHC_UOM);
        $("#CargadoNHC").html(paciente.documento);

        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
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

function LoadDatos() {
    var json = JSON.stringify({ "Id": Id, "Fecha": null, "Baja": false });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Cargada,
        error: errores
    });
}


function Cirugia_Cargada(Resultado) {
    var Cirugias = Resultado.d;
    $.each(Cirugias, function (index, Cirugia) {
        CargarPacienteID(Cirugia.nhc);
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    LoadResolucion();
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