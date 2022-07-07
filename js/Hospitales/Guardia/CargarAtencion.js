
var Id;
var Especialidad;
var Medico;
var ICD10 = 0;
var MotivoAlta = 0;
var objBusqueda = '';

///Autocomplete
var sourceArr = [];
var mapped = {};

$(document).ready(function () {
    $('input.typeahead').typeahead({
        updater: function (item) {
            $("#diag_nombre").val(item); //nom
            $("#id_val").val(mapped[item]); //id
            return item;
        },
        minLength: 4,
        items: 50,
        hint: true,
        highlight: true,
        source: function (query, process) {
            var json = JSON.stringify({ "str": query });
            $.ajax({
                url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles_Autocomplete",
                type: 'POST',
                dataType: "json",
                data: json,
                contentType: "application/json; charset=utf-8",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    $.each(lista, function (i, icd) {
                        if (i == 0) {
                            sourceArr.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped[str] = icd.Codigo;
                        sourceArr.push(str);
                    });
                    return process(sourceArr);
                }
            });
        }
    });
    var Query = {};
    Query = GetQueryString();
    Id = Query['Id'];
    Especialidad = Query['Especialidad'];
    Medico = Query['Medico'];
    objBusqueda = Query['objBusqueda'];
    if (Id > 0) {
        Buscar_Guardia();
    }
    ListEgresoMotivo();
});

$("#btnVolver").click(function () {
    document.location = "Listado.aspx?Id="+Id + "&objBusqueda=" + objBusqueda;
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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Buscar_Guardia() {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/GuardiaListadobyId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Buscar_Guardia_Cargada,
        complete: function () {
            LoadAtencion();
        },
        error: errores
    });

}

function Buscar_Guardia_Cargada(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, objGuardia) {
        Cargar_Paciente_NHC(objGuardia.NHC);
    });
}

function LoadAtencion() {
    var json = JSON.stringify({ "GuardiaId": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/List_GuardiaAtencionbyId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_GuardiaAtencionbyId_Cargada,
        complete: function (){
            ListEgresoMotivo();
        },
        error: errores
    });
}

function List_GuardiaAtencionbyId_Cargada(Resultado) {
    var Atencion = Resultado.d;

    if (Atencion != null) {
        $("#motivoconsulta").val(Atencion.MotivoConsulta);
        $("#evolucion").val(Atencion.Evolucion);
        ICD10 = Atencion.ICD10;
        MotivoAlta = Atencion.MotivoEgreso;
        if (Atencion.Laboratorio)
            $("#chkLab").attr("checked", 'checked');
        else
            $("#chkLab").removeAttr("checked");
        if (Atencion.Rx)
            $("#chkRayos").attr("checked", 'checked');
        else $("#chkRayos").removeAttr("checked");
        if (Atencion.Tac)
            $("#chkTAC").attr("checked", 'checked');
        else $("#chkTAC").removeAttr("checked");
        if (Atencion.Ecografia)
            $("#chkEco").attr("checked", 'checked');
        else $("#chkEco").removeAttr("checked");

        //$("#chkART").attr("checked", Atencion.ART);
        //alert(Atencion.ART +"/"+ Atencion.MotivoConsulta);
        if (Atencion.ART == true) { $("#ARTsi").attr("checked", 'checked'); }
        if (Atencion.MotivoConsulta != null && Atencion.ART == false) { $("#ARTno").attr("checked", 'checked'); }

        if (Atencion.Internado == true) { $("#QuedaIntsi").attr("checked", 'checked'); }
        if (Atencion.MotivoConsulta != null && Atencion.Internado == false) { $("#QuedaIntno").attr("checked", 'checked'); }

        $("#OtrosEstudios").val(Atencion.Otros);
        $("#Interconsulta").val(Atencion.Interconsulta);
        $("#Indicaciones").val(Atencion.IndicacionesEnfermeria);

        $("#id_val").val(Atencion.ICD10);
        $("#diag_nombre").val(Atencion.ICD10_Desc);
        $("#cbo_ICD10").val($("#diag_nombre").val());

        if (Atencion.Policial)
            $("#chkPolicial").attr("checked", 'checked');
        else $("#chkPolicial").removeAttr("checked");
//        if (Atencion.Internado)
//            $("#chkInternado").attr("checked", 'checked');
//        else $("#chkInternado").removeAttr("checked");
    }
}

function ListEgresoMotivo() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/List_Egreso",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListEgresoMotivo_Cargados,
        error: errores
    });
}

function ListEgresoMotivo_Cargados(Resultado) {
    var Lista = Resultado.d;
    $("#MotivoEgreso").empty();
    $.each(Lista, function (index, Egreso) {
        if (MotivoAlta != Egreso.Id)
            $("#MotivoEgreso").append($("<option></option>").val(Egreso.Id).html(Egreso.Motivo));
        else $("#MotivoEgreso").append($("<option selected='selected'></option>").val(Egreso.Id).html(Egreso.Motivo));
    });
}



function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
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
    $.each(Paciente, function (index, paciente) {
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto + '.jpg');
    });
}

$("#motivoconsulta").keyup(function () {
    if ($("#motivoconsulta").val().trim() == 0) {
        $("#motivoconsulta").css('border-color', '#b94a48');
    } else { $("#motivoconsulta").css('border-color', '#cccccc'); }
});

function Validar() {
    if (Medico == 0) { alert("No se pudo obtener el Médico. Comuniquese con sistemas."); return false; }
    if ($("#id_val").val().trim().length == 0) {alert("Ingrese Diagnostico ICD10.");return false; }
    if ($("#motivoconsulta").val().trim() == 0) { $("#motivoconsulta").css('border-color', '#b94a48'); return false; }
    if (!$("#ARTsi").is(":checked") && !$("#ARTno").is(":checked")) { alert("Seleccione si/no es accidente ART."); return false; }
    if (!$("#QuedaIntsi").is(":checked") && !$("#QuedaIntno").is(":checked")) { alert("Seleccione si/no queda internado."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    if (!Validar()) return false;

    var g = {};
    g.IdGuardia = Id;
    g.NHC = $("#afiliadoId").val();
    g.MotivoConsulta = $("#motivoconsulta").val().trim().toUpperCase();
    g.Evolucion = $("#evolucion").val().trim().toUpperCase();
    g.ICD10 = $("#id_val").val();
    g.Laboratorio = $("#chkLab").is(":checked");
    g.Rx = $("#chkRayos").is(":checked");
    g.Tac = $("#chkTAC").is(":checked");
    g.Ecografia = $("#chkEco").is(":checked");
    g.Otros = $("#OtrosEstudios").val().trim().toUpperCase();
    g.Interconsulta = $("#Interconsulta").val().trim().toUpperCase();
    g.IndicacionesEnfermeria = $("#Indicaciones").val().trim().toUpperCase();
    g.MotivoEgreso = $("#MotivoEgreso :selected").val();
    g.Policial = $("#chkPolicial").is(":checked");
    if ($("#QuedaIntsi").is(":checked")) { g.Internado = true; } else { g.Internado = false; }
    if ($("#ARTsi").is(":checked")) { g.ART = true; } else { g.ART = false; }

    var json = JSON.stringify({ "BonoId": 0, "NHC": g.NHC, "MedicoId": Medico, "EspecialidadId": 0, "FechaBono": null, "id": Id, "Box": 0, "MEgreso": g.MotivoEgreso, "Diagnostico": 0, "IC10": 0, "Accidente": null, "MotivoAccidenteId": 0, "Obs": "", "Espfinal": Especialidad, "Estado": 2 }); //2 es atendido
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/GuardiaSave",
        data: json,
        success: function (Resultado) {
//            alert(Resultado.d);
//            return false;
            if (Resultado.d == -1) { alert("Usted no tiene permiso para modificar esta consulta"); } else { GuardarHistorial_Save(g); }

        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
});

function GuardarHistorial_Save(g) {
    var json = JSON.stringify({ "g": g })
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/Atencion_GuardiaSave",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:  Atencion_GuardiaSave_Cargado,
        error: errores
    });
}

function GuardarHistorial(Resultado) {
    var Id = Resultado.d;
    var json = JSON.stringify({ "Texto": "Termina Atención Paciente: " + $("#CargadoApellido").html(), "MedicoId": Medico, "NHC": $("#afiliadoId").val(), "Protocolo": Id, "GuardiaId": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/Historial",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Atencion_GuardiaSave_Cargado,
        error: errores
    });
}

function Atencion_GuardiaSave_Cargado() {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/GuardiaAtencionPrint.aspx?Id=' + Id,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "Listado.aspx?objBusqueda=" + objBusqueda;
            }
        });
}


