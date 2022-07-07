var objBusquedaLista = "";
var total_esp;
var Color_EnEspera = "warning";
var Color_EnConsultorio = "success";
var Color_Atendido = "info";
var Color_Ausente = "error";
var BonoId = "";
var MedicoId = "";
var FechaBono = "";
var Id = "";
var Especialidad = "";
var NHC = "";
var Estado = "";
var Open = 0;
var BOX_ = 0;
var _Index = -1;
var IdAux = -1;
var S_Medico = 0;

var Cantidad_Estado = [0,0,0,0]; //Espera,Llamados,Atendido,Ausente

setInterval(Buscar, 30000); 

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    var queryObj = {};
    for (var i = 0; i < querystring.length; i++) {
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        queryObj[name] = value;
    }
    return queryObj;
}

$(document).ready(function () {
    $(".pos").hide();
    var QueryObj = {};
    QueryObj = GetQueryString();
    if (QueryObj['Id'] != null) { IdAux = QueryObj['Id']; }

    if (QueryObj['objBusqueda'] != null) objBusquedaLista = QueryObj['objBusqueda'];

    if (QueryObj['FechaIni'] != null) {
        $("#desde").val(QueryObj['FechaIni']);
        $("#txtHoraIni").val(QueryObj['HoraIni']);
        $("#hasta").val(QueryObj['FechaFin']);
        $("#txtHoraFin").val(QueryObj['HoraFin']);
        Buscar();
    }
    else {
        var currentDt = new Date();
        var mm = currentDt.getMonth() + 1;
        mm = (mm < 10) ? '0' + mm : mm;
        var dd = currentDt.getDate();
        dd = (dd < 10) ? '0' + dd : dd;
        var yyyy = currentDt.getFullYear();
        var f = dd + '/' + mm + '/' + yyyy;
        $("#desde").val(f);
        $("#hasta").val(f);
        $("#txtHoraIni").val("00:00");
        $("#txtHoraFin").val("23:59");
    }
    $("#desde").datepicker();
    $("#hasta").datepicker();
    $("#txtHoraIni").mask("99:99", { placeholder: "-" });
    $("#txtHoraFin").mask("99:99", { placeholder: "-" });
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });
    List_Especialidades(1);
    MedicobyUsuario();
    $(".opciones").hide();
});

function MedicobyUsuario() {
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/MedicoId_by_Usuario",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            S_Medico = Resultado.d;
        },
        error: errores
    });
}


function List_Especialidades(Todas) {
    var json = JSON.stringify({"Todas": Todas});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Guardia/Guardia.asmx/Especialidades_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Especialidades_Cargado,
        complete: function () {
            if (objBusquedaLista != '') ChequarEsp();
            $("#btnActualizar").click();
            //Buscar();
            $(".reff_0").addClass("reff_activo");
        },
        error: errores
    });
}

function ChequarEsp() {
    var Busqueda_arr = objBusquedaLista.split(',');
    $("#chkEspecialidad").removeAttr("checked");
    $(".checks").removeAttr("checked");
    $(Busqueda_arr).each(function (index, value) {
        $(".checks").each(function (i, chk) {
            if ($(chk).val() == value) $(chk).attr("checked", true);
        });
        if ($(".checks").length - 1 == index) Buscar_Pedidos();
    });
}

function List_Especialidades_Cargado(Resultado) {

    var Especialidad = Resultado.d;
    $('#Esp1').empty();
    $('#Esp2').empty();

    total_esp = Especialidad.length;
    var mitad1 = Math.ceil(total_esp / 2);
    var i = 0;
    $('#Esp1').append('<label class="checkbox" style="color:blue;"><input id="chkEspecialidad" onclick="func(this)" type="checkbox" name="chkEspecialidad" checked>' + "Marcar Todas las Especialidades" + '</label>');
    $('#Esp2').append('<label class="checkbox" style="color:blue;"><input id="chkNinguna" onclick="funcNinguno(this)" type="checkbox" name="chkNinguna">' + "Desmarcar Todas las Especialidades" + '</label>');
    for (i = 0; i < mitad1; i++) {
        $('#Esp1').append('<label class="checkbox"><input id="CBE' + i + '" class="checks" onclick="func_ch(this)" type="checkbox" checked value="' + Especialidad[i].Id + '">' + Especialidad[i].Especialidad + '</label>');
    }

    for (i = mitad1; i <= (total_esp - 1); i++) {
        $('#Esp2').append('<label class="checkbox"><input id="CBE' + i + '" class="checks" onclick="func_ch(this)" type="checkbox" checked value="' + Especialidad[i].Id + '">' + Especialidad[i].Especialidad + '</label>');
    }

}

$(".Turnos_Libres").click(function () {
    $("#cbo_Estado").val("0");
    Buscar();
});

$(".Turnos_Ocupados").click(function () {
    $("#cbo_Estado").val("1");
    Buscar();
});

$(".Turnos_Sobreturno").click(function () {
    $("#cbo_Estado").val("2");
    Buscar();
});

$(".Turnos_Cancelado").click(function () {
    $("#cbo_Estado").val("99");
    Buscar();
});

$(".reff_0").click(function () {
    $("#cbo_Estado").val("88");
    Buscar();
});

$(".reff").click(function () {
    $(".reff").removeClass("reff_activo");
    $(this).addClass("reff_activo");
    Buscar();
});

function func_ch(obj) {
    $("#chkNinguna").removeAttr("checked");
    $("#chkEspecialidad").removeAttr("checked");
}

function func(obj) {
    if ($(obj).is(":checked")) { $(".checks").attr("checked", true);$("#chkNinguna").removeAttr("checked"); }
    else $(".checks").removeAttr("checked");
}

function funcNinguno(obj) {
    if ($(obj).is(":checked")) { $(".checks").removeAttr("checked"); $("#chkEspecialidad").removeAttr("checked"); }
    else $(".checks").attr("checked", true); 
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnActualizar").click(function () {
    Buscar();
});

function Buscar() {
    if (!$("#chkActualiza").is(":checked")) {return false;} //No actualiza lista
    if (Open == 0) {
        objBusquedaLista = "";
        $(".checks").each(function (index, value) {
            if ($(value).is(":checked")) objBusquedaLista = objBusquedaLista + "," + $(value).val();
            if ($(".checks").length - 1 == index) Buscar_Pedidos();
        });
    }
}

function Buscar_Pedidos() {
    var Especialidad = true;
    $("#TablaPartes_div").empty();
    var Estado = parseInt($("#cbo_Estado :selected").val());
    var FechaIni = $('#desde').val() + " " + $("#txtHoraIni").val();
    var FechaFin = $('#hasta').val() + " " + $("#txtHoraFin").val();
    var json = JSON.stringify({ "FechaIni": FechaIni, "FechaFin": FechaFin, "Especialidad": Especialidad, "Apellido": $('#txtPaciente').val(), "objBusquedaLista": objBusquedaLista, "Estado": Estado });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/GuardiaListado",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pedidos_Cargados,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaPedidos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaPedidos_div").show();
            Contadores();
            if (_Index > -1) Ventana(_Index);
        },
        error: errores
    });

}

function Pedidos_Cargados(Resultado) {
    Pedidos = Resultado.d;
    var Tabla_Datos = "";
    var Color;
    Cantidad_Estado = [0, 0, 0, 0]; //Espera,Llamados,Atendido,Ausente
    Tabla_Titulo = "<table id='TablaPedidos_div' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Bono</th><th>Recep.</th><th>Atención</th><th>Nro. HC</th><th>Afiliado</th><th>Medico Atendio</th><th>Especialidad</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>";
   
    $.each(Pedidos, function (index, Pedido) {
        switch (Pedido.ESTADO) {
            case 'Espera': Color = Color_EnEspera; Cantidad_Estado[0]++; break;
            case 'Llamado': Color = Color_EnConsultorio; Cantidad_Estado[1]++; break;
            case 'Atendido': Color = Color_Atendido; Cantidad_Estado[2]++; break;
            case 'Finalizado': Color = Color_Atendido; Cantidad_Estado[2]++; break;
            case 'Transito': Color = Color_Atendido; Cantidad_Estado[2]++; break;
            case 'En Observación': Color = Color_EnConsultorio; break;
            case 'Ausente': Color = Color_Ausente; Cantidad_Estado[3]++; break;
            default: Color = "";
        }
        Tabla_Datos = Tabla_Datos + "<tr id='" + index + "'";
        Tabla_Datos = Tabla_Datos + " class='" + Color + "' onclick=Ventana(" + index + ");";
        Tabla_Datos = Tabla_Datos + "><td>" + Pedido.HORA + "</td><td>" + Pedido.RECEPCIONO + "</td><td>" + Pedido.ATENCION + "</td><td id='NHC'>" + Pedido.NHC + "</td><td id='Apellido'>" + Pedido.APELLIDO + "</td><td>" + Pedido.MEDICONOMBRE + "</td><td id='Especialidad'>" + Pedido.ESPECIALIDAD + "</td><td id='Estado'>" + Pedido.ESTADO + "</td><td>" + Pedido.FECHA + "</td><td id='EspId' style='display:none;'>" + Pedido.ESPECIALIDADID + "</td><td id='BonoId' style='display:none;'>" + Pedido.BONOID + "</td><td id='MedicoId' style='display:none;'>" + Pedido.MEDICOID + "</td><td id='Fecha' style='display:none;'>" + Pedido.FECHA + "</td><td id='Id' style='display:none;' class='consulta'>" + Pedido.ID + "</td><td id='Box' style='display:none;'>" + Pedido.BOX + "</td></tr>";
        if (Pedido.ID == IdAux) { _Index = index; IdAux = -1; }
    });

    Tabla_Fin = "</tbody></table>";
    $("#TablaPedidos_div").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    if (Pedidos.length == 0) {
        $("#cargando").hide();
        $("#TablaPedidos_div").show();
    }
}

function Contadores() { //Muestro cantidades
    //Espera,Llamados,Atendido,Ausente
    $(".Turnos_Libres").html("Espera (" + Cantidad_Estado[0] + ")");
    $(".Turnos_Ocupados").html("Llamado (" + Cantidad_Estado[1] + ")");
    $(".Turnos_Sobreturno").html("Atendido (" + Cantidad_Estado[2] + ")");
    $(".Turnos_Cancelado").html("Ausente (" + Cantidad_Estado[3] + ")");
    var Totales = Cantidad_Estado[0] + Cantidad_Estado[1] + Cantidad_Estado[2] + Cantidad_Estado[3];
    $(".reff_0").html("Todos (" + Totales + ")");
}

function Ventana(index) {
    var Apellido = "";
    Open = 1;
    $("#" + index + " > td#Apellido").each(function () {
       Apellido = $(this).html();
       $("#Paciente").html('Paciente: ' + Apellido);
   });
   $("#" + index + " > td#EspId").each(function () {
       Especialidad = $(this).html();
       LoadMedicosGuardiabyEsp(Especialidad);
   });
   $("#" + index + " > td#BonoId").each(function () {
       BonoId = $(this).html();
   });
   $("#" + index + " > td#MedicoId").each(function () {
       MedicoId = $(this).html();
       
   });
   $("#" + index + " > td#Fecha").each(function () {
       FechaBono = $(this).html();
   });
   $("#" + index + " > td#Id").each(function () {
       Id = $(this).html();
   });
   $("#" + index + " > td#NHC").each(function () {
       NHC = $(this).html();
       Cargar_Paciente_NHC(NHC);
   });
   $("#" + index + " > td#Estado").each(function () {
       Estado = $(this).html();
       switch (Estado) {
           case 'Espera': Espera_Botones(); break;
           case 'En Consultorio': EnConsul_Botones(); break;
           case 'Ausente': Ausente_Botones(); break;
           case 'En Espera': EnEspera_Botones(); break;
       }
   });
   $("#" + index + " > td#Box").each(function () {
       BOX_ = $(this).html();
   });
   LoadBoxes();
   $(".hsuper_menu").toggleClass("hsuper_menu_Accion");
   $(".hsuper_menu").css("margin-left", "-10px");
   Open = 1;
   _Index = -1;
   IdAux = -1;
   if ($("#"+index).hasClass("info")) Atendido_Botones(index);
   if ($("#" + index).hasClass("success")) Llamado();
   if ($("#" + index).hasClass("error")) Ausente_Botones();  
}

function Espera_Botones() {
    $(".pos").hide();
    $("#btnLlamar").show();
    $("#btnVolverLlamar").hide();
    $("#btnOcupar").hide();
    $("#btnTerminar").hide();
    $("#btnAusente").show();
    $("#btnModificarAt").hide();
}

function EnEspera_Botones() {
    $(".pos").hide();
    $(".opciones").hide();
    $("#btnModificarAt").hide();
    $("#btnLlamar").show();
}

function Ausente_Botones() {
    $(".pos").hide();
    $("#btnLlamar").show();
    $("#btnVolverLlamar").hide();
    $("#btnOcupar").hide();
    $("#btnTerminar").hide();
    $("#btnAusente").hide();
    $("#btnModificarAt").hide();
}

function Atendido_Botones(index) {
    $(".pos").show();
    $("#btnLlamar").hide();
    $("#btnVolverLlamar").hide();
    $("#btnOcupar").hide();
    $("#btnTerminar").hide();
    $("#btnAusente").hide();

    var consulta;
    $("#" + index).each(function(index, item) {
       consulta = $(this).find(".consulta").html();    
    });

   // verificar modificacion
   // alert($("#cbo_Medicos").html());
   var json = JSON.stringify({"Consulta": consulta });

   console.log(json);
  // return false;
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/VerificarModificacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            //alert(Resultado.d);
            //alert($("#cbo_Medicos").val());
            if (($("#cbo_Medicos").val() > 0) && (Resultado.d == $("#cbo_Medicos").val())) { $("#btnModificarAt").show(); } else { $("#btnModificarAt").hide(); }
        },
        error: errores
    });
}

function Llamado() {
    $(".pos").hide();
    $("#btnLlamar").hide();
    $("#btnVolverLlamar").show();
    //$("#btnOcupar").show();
    $("#btnTerminar").show();
    $("#altaComp_IMG").show();// mostrar alta complejidad img
    $("#btnAusente").show();
    $("#btnModificarAt").hide();
}

// se cambio para que traiga el medico relacionado con el usuario y no todos los medicos de la especialidad
function LoadMedicosGuardiabyEsp(Especialidad) {
    //alert();
//    var json = JSON.stringify({ "Especialidad": Especialidad });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Guardia/Guardia.asmx/MedicosGuardiabyEsp",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: LoadMedicosGuardiabyEsp_Cargados,
//        complete: function () {
//            if (MedicoId > 0) $("#cbo_Medicos").val(MedicoId);
//            else $("#cbo_Medicos").val(80000514); //Guardia Medica
//        },
//        error: errores
    //    });
   // alert("cargar combo");
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/MedicosXusuario",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadMedicosGuardiabyEsp_Cargados,
//        complete: function () {
//            if (MedicoId > 0) $("#cbo_Medicos").val(MedicoId);
//            else $("#cbo_Medicos").val(80000514); //Guardia Medica
//        },
        error: errores
    });

}

function LoadMedicosGuardiabyEsp_Cargados(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").empty();
    //$("#cbo_Medicos").append($("<option></option>").val("0").html("Seleccione Médico..."));
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        // if (S_Medico == 0) if (Medico.Id == MedicoId) $("#cbo_Medicos").val(MedicoId);
        $("#cbo_Medicos").val(Medico.Id);
    });

    //alert($("#cbo_Medicos").val());
}

function LoadBoxes() {
    var json = JSON.stringify({ "FechaIni": $('#desde').val(), "HoraIni": $("#txtHoraIni").val(), "FechaFin": $('#hasta').val(), "HoraFin": $("#txtHoraFin").val()});
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/BoxesList",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadBoxes_Cargados,
        complete: function () {
            $("#cbo_Boxes").val(BOX_);
        },
        error: errores
    });
}

function LoadBoxes_Cargados(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Boxes").empty();
    $("#cbo_Boxes").append($("<option></option>").val("0").html("Seleccione Box..."));
    $.each(Lista, function (index, Box) {
        $("#cbo_Boxes").append($("<option></option>").val(Box.IDBOX).html(Box.NOMBREBOX));
        if (BOX_ == Box.IDBOX) $("#cbo_Boxes").val(BOX_);
    });
}

function Validar() {
    if ($("#cbo_Medicos :selected").val() == "0") { alert("No se pudo encontrar el Médico.Comuniquese con sistemas."); return false; }
    if ($("#cbo_Boxes :selected").val() == "0") { alert("Seleccione Box."); return false; }
    return true;
}


function VerificarAtencionFinalizada() {
    var mensaje = "Faltan Cerrar las siguentes atenciones: \n";

    if ($("#cbo_Medicos :selected").val() == undefined) {alert("No se pudo determinar el médico. Comuniquese con sistemas."); return false; } else {
        var json = JSON.stringify({ "MedicoId": $("#cbo_Medicos :selected").val() });
    }
    //alert($("#cbo_Medicos :selected").val());
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/VerificarAtencionFinalizada",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
        
            $.each(Resultado.d, function (index, item) { mensaje += item.afiliado + " el " + item.fecha + "\n"; });
            //alert(Resultado.d.length);
            if (Resultado.d.length <= 0) {

                if (BOX_ == 0) BOX_ = $("#cbo_Boxes :selected").val();
                var json = JSON.stringify({ "BonoId": BonoId, "NHC": $("#afiliadoId").val(), "MedicoId": $("#cbo_Medicos :selected").val(), "EspecialidadId": Especialidad, "FechaBono": FechaBono, "id": Id, "Box": BOX_, "MEgreso": 0, "Diagnostico": 0, "IC10": null, "Accidente": null, "MotivoAccidenteId": null, "Obs": "", "Espfinal": null, "Estado": 1 });
                $.ajax({
                    type: "POST",
                    url: "../Json/Guardia/Guardia.asmx/GuardiaSave",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: Save_Cargado,
                    error: errores
                });
            } else { alert(mensaje); }
        },
        error: errores
    });
}

$("#btnLlamar, #btnVolverLlamar").click(function () {
    if (!Validar()) return false;
    VerificarAtencionFinalizada();
});
//90001827
//80001525

function Save_Cargado(Resultado) {
    Id = Resultado.d;
    if (BOX_ == 0) BOX_ = $("#cbo_Boxes :selected").val();
    var json = JSON.stringify({ "MedicoId": $("#cbo_Medicos :selected").val(), "NHC": $("#afiliadoId").val(), "ConsultorioId": $("#cbo_Boxes :selected").val(), "Paciente": $("#CargadoApellido").html(), "EspecialidadId": Especialidad });
    $.ajax({
        type: "POST",
        url: "../Json/Turnera/Turnera.asmx/SaveG",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarHistorial,
        error: errores
    });
}

function GuardarHistorial() {
  var MedicoId = $("#cbo_Medicos :selected").val();
  var json = JSON.stringify({ "Texto": "Llama a " + $("#CargadoApellido").html(), "MedicoId": MedicoId, "NHC": $("#afiliadoId").val(), "Protocolo": 0, "GuardiaId": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/Historial",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Llamado,
        error: errores
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
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        if (paciente.Nro_Seccional != 998)
            $("#CargadoSeccional").html(paciente.Seccional);
        else $("#CargadoSeccional").html(paciente.ObraSocial);
        //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
    });
}


$("#btnAusente").click(function () {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/GuardiaAusente",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarHistorialAusente,
        error: errores
    });
});

function GuardarHistorialAusente() {
    var MedicoId = $("#cbo_Medicos :selected").val();
    var json = JSON.stringify({ "Texto": $("#CargadoApellido").html() + " Ausente", "MedicoId": MedicoId, "NHC": $("#afiliadoId").val(), "Protocolo": 0, "GuardiaId": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/Historial",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Ausente_Botones,
        error: errores
    });
}

$("#btnOcupar").click(function () {
    var Box = $("#cbo_Boxes :selected").val();
    var json = JSON.stringify({ "Box": Box  , "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/GuardiaOcuparBox",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ActiveBotones,
        error: errores
    });

});

$("#btnTerminar").click(function () {
    var Medico = $("#cbo_Medicos :selected").val();
    window.location = "CargarAtencion.aspx?Id=" + Id + "&Medico=" + Medico + "&Especialidad=" + Especialidad + "&objBusqueda=" + objBusquedaLista;

});

$("#btnModificarAt").click(function () {
    var Medico = $("#cbo_Medicos :selected").val();
    window.location = "CargarAtencion.aspx?Id=" + Id + "&Medico=" + Medico + "&Especialidad=" + Especialidad;

});

$("#btnVerHC").click(function () {
    window.location = "../HistoriaClinica/HistoriaClinica.aspx?NHC=" + $("#afiliadoId").val() + "&Id="+ Id +"&Guardia=1";

});

$("#altaComp_IMG").click(function () {
    //ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + "&IntId=" + IntID + " ";
    $.fancybox({
        'autoDimensions': false,
        'href': "../AtConsultorio_IMG/EstudiosAltaComplejidad_IMG.aspx?ID=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medicos option:selected').val() + "&IntId=" + "&intGuar=0",
        'width': '70%',
        'height': '80%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'onComplete': function () {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }
    });
});

$("#OcultarMenu").click(function () {
    $(".hsuper_menu").removeClass("hsuper_menu_Accion");
    $(".hsuper_menu").css("margin-left", "900px");
    Open = 0;
    Buscar();
    _Index = -1;
    IdAux = -1;
});

function Receta() {
    var Medico = $("#cbo_Medicos :selected").val();
    var Pagina = "../AtConsultorio/Receta.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + Medico + "&EspId=" + Especialidad + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}

function CertificadoMedico() {
    var Medico = $("#cbo_Medicos :selected").val();
    var Pagina = "../AtConsultorio/CertificadoMedico.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + Medico + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}

function OrdenesInternacion() {
    var Medico = $("#cbo_Medicos :selected").val();
    var Pagina = "../AtConsultorio/OrdenInternacion.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + Medico + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '110%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}

function SolicituddeTraslado() {
    var Medico = $("#cbo_Medicos :selected").val();
    var Pagina = "../AtConsultorio/SolicituddeTraslado.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + Medico + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}

function PedidoEnfermeria() {
    var Medico = $("#cbo_Medicos :selected").val();
    var Pagina = "PedidoEnfermeriaGuardia.aspx?MEDICOID=" + 80000553 + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
}


function patologiasCronicas() {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../AtConsultorio/AltoRiesgo.aspx?AfiliadoId=' + $("#afiliadoId").val(),
		    'width': '50%',
		    'height': '50%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'showCloseButton': true
		});
}


function CargadeEstudios(Id) {
    Pagina = "../AtConsultorio/CargadeEstudios.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medico option:selected').val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox({
        'autoDimensions': false,
        'href': Pagina,
        'width': '100%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'showCloseButton': false
    });
}


function sospechaCovid(Id) {
    if ($('#cbo_Medicos option:selected').val() == 0 || $('#cbo_Medicos option:selected').val() == 90001526 || $('#cbo_Medicos option:selected').val() == 80000521) { alert("No se pudo obtener el Médico. Por favor, comuniquese con sistemas."); return false; }

    Pagina = "../Guardia/SospechaCovid.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + $('#cbo_Medicos option:selected').val() + " ";
    Pagina = Pagina.slice(0, -1);
    $.fancybox({
        'autoDimensions': false,
        'href': Pagina,
        'width': '50%',
        'height': '50%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'showCloseButton': true
    });
}