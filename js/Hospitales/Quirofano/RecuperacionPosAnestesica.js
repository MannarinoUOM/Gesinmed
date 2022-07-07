var Id = 0;
var objSV = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objSVs= new Array();
var objSVs2 = {};
var CamaId = 0;

$(document).ready(function () {
    var Query = {};
    Query = GetQueryString();
    Id = Query['Id'];
    if (Id > 0) {
        LoadDatos();
        Cargar_Sala_y_Cama();
    }
});


$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});

$("#btnVolver").click(function () {
    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
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
        CamaId = Cirugia.cama_id;
        GetCama();
        //$("#CargadoCama").html(Cirugia.cama_id);
        $("#CargadoHora").html(Cirugia.hora);
        LoadSV();
    });
    $("#hastaaqui").fadeIn(1500);    
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
}

function LoadSV() {
    var json = JSON.stringify({ "Id": Id});
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Quirofano_ControlSignosVitales_ListbyCirugiaId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadSV_Cargado,
        error: errores
    });
}

function LoadSV_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>TA</th><th>FC</th><th>FR</th><th>Temp.</th><th>Hora</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.TA + " </td><td> " + Detalle.FC + " </td><td> " + Detalle.FR + " </td><td> " + Detalle.Temperatura + " </td><td> " + Detalle.Hora + " </td></tr>";
        objSV = {};
        objSV.FC = Detalle.FC;
        objSV.FR = Detalle.FR;
        objSV.Hora = Detalle.Hora;
        objSV.TA = Detalle.TA;
        objSV.Temperatura = Detalle.Temperatura;
        objSV.Cirugia_Id = Detalle.Cirugia_Id;
        objSVs[i] = objSV;
        objSVs2[i] = objSV;
        objSVs[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
        //alert(objSV.FC);
    });
    var Pie = "</tbody></table>";
    $("#TablaDatos").html(Encabezado + Contenido + Pie);
    LoadPosAnesCargado();
}

function LoadPosAnesCargado() {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Quirofano_RecPosAnestesia_ListById",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadPosAnesCargado_Cargado,
        error: errores
    });
}

function LoadPosAnesCargado_Cargado(Resultado) {
    var Detalle = Resultado.d;
        $("#SFisiologica").val(Detalle.S_Fisiologica);
        $("#Dextrosa").val(Detalle.Dextrosa);
        $("#Ringer").val(Detalle.RingerLactato);
        $("#Expansor1").val(Detalle.ExpansorPlasmatico);
        $("#Expansor2").val(Detalle.ExpansorPlasmatico2);
        $("#Sat").val(Detalle.Sat02);
        $("#HS").val(Detalle.Hs);
        $("#HS2").val(Detalle.Hs2);
        $("#HS3").val(Detalle.Hs3);
        $("#HS4").val(Detalle.Hs4);
        $("#HS5").val(Detalle.Hs5);
        $("#HS6").val(Detalle.Hs6);
        $("#Hemato").val(Detalle.Hematocrito);
        //alert(Detalle.S_Fisiologica);
        $("#HB").val(Detalle.HB);
        $("#KPTT").val(Detalle.KPTT);
        $("#Quick").val(Detalle.Quick);
        $("#PH").val(Detalle.PH);
        $("#PCO2").val(Detalle.PCo2);
        $("#PO2").val(Detalle.Po2);
        $("#EB").val(Detalle.EB);
        $("#HCO3").val(Detalle.HCO3);
        $("#NA").val(Detalle.Na);
        $("#SAT").val(Detalle.Sat);
        $("#CL").val(Detalle.Cl);
        $("#k").val(Detalle.K);

        if (Detalle.Canula == true)
            $("#chkCanula").attr("checked", "checked");

        if (Detalle.Mascara == true)
            $("#chkMascara").attr("checked", "checked");

        $("#HoraEgreso").val(Detalle.HoraEgreso);
        $("#Aspiracion").val(Detalle.Aspiracion);
        $("#Observacion").val(Detalle.Observacion);
        $("#Sangrado").val(Detalle.SangradoIntra);
        $("#Diuresis").val(Detalle.Diuresis);
        $("#Fluidos").val(Detalle.Fluidos);
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

        $("#afiliadoId").val(paciente.documento);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#afiliadoId").val(paciente.documento);
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

function errores(msg) {
    alert('Error: ' + msg.responseText);
}

$("#btnCargar").click(function () {
    var Estado = 1;
    var q = {};
    q.Cirugia_Id = Id;
    q.FC = $("#FC").val();
    q.FR = $("#FR").val();
    q.Hora = $("#Hora").val();
    q.TA = $("#TA").val();
    q.Temperatura = $("#Temp").val();
    q.Estado = Estado;
    var Cual = Total;
    if (Editando == 1) {
        Cual = EditandoPos;
    }
    else {
        Total = Total + 1;
        Cual = Total;
    }
    objSVs[Cual] = q;
    RenderizarTabla();
    Editando = 0;
    EditandoPos = -1;
    LimpiarCampos();
    //alert(Total);
});


function LimpiarCampos() {
    $("#TA").val("");
    $("#FC").val("");
    $("#FR").val("");
    $("#Temp").val("");
    $("#Hora").val("");
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>TA</th><th>FC</th><th>FR</th><th>Temp.</th><th>Hora</th></tr></thead><tbody>";
    var Contenido = "";
    // alert('paso');
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objSVs[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objSVs[i].TA + " </td><td> " + objSVs[i].FC + " </td><td> " + objSVs[i].FR + " </td><td> " + objSVs[i].Temperatura + " </td><td> " + objSVs[i].Hora + " </td></tr>";
        }

    }

    var Pie = "</tbody></table>";
    $("#TablaDatos").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#TA").val(objSVs[Nro].TA);
    $("#FC").val(objSVs[Nro].FC);
    $("#FR").val(objSVs[Nro].FR);
    $("#Temp").val(objSVs[Nro].Temperatura);
    $("#Hora").val(objSVs[Nro].Hora);
    $("#btnCargar").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
}

function Eliminar(Nro) {
    objSVs[Nro].Estado = 0;
    RenderizarTabla();
    objSVs = $.grep(objSVs, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
}

$("#btnGuardar").click(function () {
    DeletePosAnestesica();

});

function DeletePosAnestesica() {
    var q = {};
    q.Cirugia_Id = Id;
        var json = JSON.stringify({ "q": q });
        //alert(json);
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Quirofano_ControlSignosVitales_Delete",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: DeletePos,
            error: errores
        });
}

function DeletePos() {
    var q = {};
    q.Cirugia_Id = Id;
    var json = JSON.stringify({ "q": q });
    //alert(json);
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Quirofano_RecPosAnestesia_Delete",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarPosAnes,
        error: errores
    });
}

function Quirofano_RecPosAnestesia_Guardar_Guardada() {
        //for (var j = 0; j <= Total; j++) {
            //var json = JSON.stringify({ "q": objSVs[j] });
            var json = JSON.stringify({ "q": objSVs });
            //alert(json);
            $.ajax({
                type: "POST",
                url: "../Json/Quirofano/Quirofano_.asmx/Quirofano_ControlSignosVitales_Guardar",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Quirofano_ControlSignosVitales_Guardar_Guardada,
                error: errores
            });
        //}
}

function GetCama() {
    var json = JSON.stringify({"Cama":CamaId});
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Lista_Camas_byId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GetCama_Guardada,
        error: errores
    });
}

function GetCama_Guardada(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Cama) {
        $("#CargadoCama").html(Cama.descripcion);
    });
}

    function GuardarPosAnes () {
        var q = {};
        q.Cirugia_Id = Id;
        q.S_Fisiologica = $("#SFisiologica").val();
        q.Dextrosa = $("#Dextrosa").val();
        q.RingerLactato = $("#Ringer").val();
        q.ExpansorPlasmatico = $("#Expansor1").val();
        q.ExpansorPlasmatico2 = $("#Expansor2").val();
        q.Sat02 = $("#Sat").val();
        q.Hs = $("#HS").val();
        q.Hs2 = $("#HS2").val();
        q.Hs3 = $("#HS3").val();
        q.Hs4 = $("#HS4").val();
        q.Hs5 = $("#HS5").val();
        q.Hs6 = $("#HS6").val();
        q.Hematocrito = $("#Hemato").val();

        q.HB = $("#HB").val();
        q.KPTT = $("#KPTT").val();
        q.Quick = $("#Quick").val();
        q.PH = $("#PH").val();
        q.PCo2 = $("#PCO2").val();
        q.Po2 = $("#PO2").val();
        q.EB = $("#EB").val();
        q.HCO3 = $("#HCO3").val();
        q.Na = $("#NA").val();
        q.Sat = $("#SAT").val();
        q.Cl = $("#CL").val();
        q.POTASIO = $("#POTASIO").val();
        if ($("#chkCanula").is(':checked') == true)
            q.Canula = true;
        else q.Canula = false;
        if ($("#chkMascara").is(':checked') == true)
            q.Mascara = true;
        else q.Mascara = false;
        q.HoraEgreso = $("#HoraEgreso").val();
        q.Aspiracion = $("#Aspiracion").val();
        q.Observacion = $("#Observacion").val();
        q.SangradoIntra = $("#Sangrado").val();
        q.Diuresis = $("#Diuresis").val();
        q.Fluidos = $("#Fluidos").val();
        var json = JSON.stringify({ "q": q });        
        $.ajax({
            type: "POST",
            url: "../Json/Quirofano/Quirofano_.asmx/Quirofano_RecPosAnestesia_Guardar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Quirofano_RecPosAnestesia_Guardar_Guardada,
            error: errores
        });
    }

    function Quirofano_ControlSignosVitales_Guardar_Guardada() {
        $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Quirofano_PosAnestesia.aspx?Id=' + Id,
            'width': '95%',
            'height': '95%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "Planificar-Cirugia.aspx?Id=" + Id;
            }
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