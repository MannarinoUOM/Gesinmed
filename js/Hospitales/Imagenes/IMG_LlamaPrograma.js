
var Tipo_Id = 0;
var Numero_Protocolo = 0;

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

var Query = {};
Query = GetQueryString();
Afiliado_Id = Query['AfiliadoID'];
Tipo_Id = Query['Tipo'];
Numero_Protocolo = Query['Protocolo'];
U = Query['U'];

var Medico_Id = 0;
var Especialidad_Id = 0;
var Fecha = "";
var Tipo_Protocolo = 0;
var U = 0;
var Ruta = "";



function Cargar_Tipo_Imagen() {
    $.ajax({
        type: "POST",
        url: "../Json/Imagenes/Imagenes.asmx/Cargar_Tipo_Imagen",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_tipo_img').append($('<option></option>').val(Tipo.TIMG_ID).html(Tipo.TIMG_DESCRIPCION));
            });
            if (Tipo_Id > 0) {
                $("#cbo_tipo_img").val(Tipo_Id);
                Cargar_Tipo_Protocolo(Tipo_Id, 0);
            }
        },
        error: errores
    });
}

function Cargar_Tipo_Protocolo(TI, TP) {
    var json = JSON.stringify({ "TI": TI });
    $.ajax({
        type: "POST",
        url: "../Json/Imagenes/Imagenes.asmx/Cargar_Tipo_Protocolo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_tipo_protocolo').empty();
            $.each(lista, function (index, Tipo) {
                $('#cbo_tipo_protocolo').append($('<option></option>').val(Tipo.TPRO_ID).html(Tipo.TPRO_DESCRIPCION));
            });
            $('#cbo_tipo_protocolo').val(TP);
        },
        error: errores
    });
}

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Especialidad = Resultado.d;
            $('#cbo_especialidad').append($('<option></option>').val(-1).html(""));
            $.each(Especialidad, function (index, especialidades) {
                $('#cbo_especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
            });
            $('#cbo_especialidad').val(Id);
        },
        error: errores
    });
}

$('#cbo_especialidad').change(function () {    
    Cargar_Medicos_por_Especialidad($(this).val(), '');
});


$('#cbo_tipo_img').change(function () {
    Cargar_Tipo_Protocolo($('#cbo_tipo_img :selected').val(), 0);
});


function Cargar_Medicos_por_Especialidad(Especialidad, MedicoId) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Medicos = Resultado.d;
            $('#cbo_medico').empty();
            $('#cbo_medico').append($('<option></option>').val(-1).html(""));
            $.each(Medicos, function (index, medicos) {
                $('#cbo_medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
            });
            $('#cbo_medico').val(MedicoId);
            //if (MedicoId != '0' || MedicoId != '') {
                //$("#cbo_Medico option[value=" + MedicoId + "]").attr("selected", true);            
            //}          
        },
        error: errores
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



function Cargar_Protocolo(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/Imagenes/Imagenes.asmx/Cargar_Protocolo",
        data: '{Protocolo_ID: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Datos = Resultado.d;
            //$.each(Especialidad, function (index, especialidades) {
            //    $('#cbo_especialidad').append(
            //  $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            //);
            //});            
            //$('#cbo_especialidad').val(Id);

            Medico_Id = Datos.IMG_MEDICO_ID;
            Especialidad_Id = Datos.IMG_ESPECIALIDAD_ID;
            Fecha = Datos.IMG_FECHA_INICIO;
            $("#txt_fecha").val(Fecha);
            if (Datos.IMG_URGENCIA == "S") $("#ck_urgencia").prop('checked', true);

            Tipo_Protocolo = Datos.IMG_TIMG_ID;
            Ruta = Datos.IMG_PATH;
            Cargar_Tipo_Imagen(Datos.IMG_TIMG_ID);
            Cargar_Tipo_Protocolo(Datos.IMG_TIMG_ID, Datos.IMG_TPRO_ID);
            Cargar_Especialidades(true, Especialidad_Id, false);
            Cargar_Medicos_por_Especialidad(Especialidad_Id, Medico_Id);
            $("#s_Paciente").html(Datos.IMG_PACIENTE);
            $("#s_NHC").html(Datos.IMG_NHC);
            Afiliado_Id = Datos.PACIENTE_ID;
            

        },
        error: errores
    });
}

if (Numero_Protocolo != 0) {
    Cargar_Protocolo(Numero_Protocolo);
    $('#cbo_tipo_img').attr('disabled', 'disabled');
    $('#cbo_tipo_protocolo').attr('disabled', 'disabled');
    $('#cbo_especialidad').attr('disabled', 'disabled');
    $('#cbo_medico').attr('disabled', 'disabled');
    $('#txt_fecha').attr('disabled', 'disabled');
    $('#ck_urgencia').attr('disabled', 'disabled');
    $("#btn_ReCargar").show();    
}
else {
    Cargar_Tipo_Imagen(0);
    Cargar_Tipo_Protocolo(6);
    Cargar_Especialidades(true, 0, false);
    Cargar_Medicos_por_Especialidad(Especialidad_Id, Medico_Id);
    Cargar_Afiliado(Afiliado_Id);
    $("#btn_Cargar").show();
}


function Guardar() {

    if ($('#txt_fecha').val().trim().length == 0) { alert("Ingrese fecha de entrega."); return false; }
    if ($('#cbo_medico :selected').val() == "") { alert("Seleccione el médico."); return false; }
    if ($('#cbo_tipo_protocolo :selected').val() == "-1") { alert("Seleccione el tiop de protocolo."); return false; }


    var r = {};

    var URG = "N";
    if ($("#ck_urgencia").val()) { URG = "S"; }

    r.IMG_FECHA_INICIO = $("#txt_fecha").val();
    r.IMG_TIMG_ID = $("#cbo_tipo_img :selected").val();
    r.IMG_TPRO_ID = $("#cbo_tipo_protocolo :selected").val();
    r.IMG_USUARIO = U;
    r.IMG_SOC_ID = Afiliado_Id;
    r.IMG_URGENCIA = URG;
    r.IMG_ESPECIALIDAD_ID = $("#cbo_especialidad").val();
    r.IMG_MEDICO_ID = $("#cbo_medico").val();

    var json = JSON.stringify({ "c": r });

    $.ajax({
        type: "POST",
        url: "../Json/Imagenes/Imagenes.asmx/Guardar_Protocolo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var ProtocoloId = Resultado.d;
            //alert(ProtocoloId);
            
            Ejecutar_Programa(ProtocoloId);

            //var Medicos = Resultado.d;
            //$('#cbo_medico').empty();
            //$.each(Medicos, function (index, medicos) {
            //    $('#cbo_medico').append(
            //  $('<option></option>').val(medicos.Id).html(medicos.Medico)
            //);
            //});
            //$('#cbo_medico').val(MedicoId);
            //if (MedicoId != '0' || MedicoId != '') {
            //$("#cbo_Medico option[value=" + MedicoId + "]").attr("selected", true);            
            //}          
        },
        error: errores
    });

}




function Cargar_Afiliado() {
    $.ajax({
        type: "POST",
        url: "../Json/Imagenes/Imagenes.asmx/Cargar_Afiliado",
        data: '{AfiliadoID: "' + Afiliado_Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Datos = Resultado.d;
            $("#s_Paciente").html(Datos.IMG_PACIENTE);
            $("#s_NHC").html(Datos.IMG_NHC);
        },
        error: errores
    });
}



$("#txt_fecha").datepicker();
$("#txt_fecha").mask("99/99/9999", { placeholder: "-" });


$("#btn_Cargar").click(function () {
    Guardar();
});

$("#btn_ReCargar").click(function () {
    Ejecutar_Programa(Numero_Protocolo);
});


function Ejecutar_Programa(nProtocolo) {
    //nombre = $("select option:selected").val() + "2026395277520263952775" + ".jpg";    
    MyObject = new ActiveXObject("WScript.Shell");
    MyObject.Run("file://///LABO-PC/Img_Programa/Imagenes_UOM.exe " + nProtocolo);    
}