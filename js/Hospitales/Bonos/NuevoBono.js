var Practicas = new Array();
var Total = -1;
var i = 0;
var Editando = 0;
var EditandoPos = 0;
var Actual = "";
var Hora = "";
var MedicoID = "";
var EspecialidadId = "";
var Fecha = "";
var TurnoTelefonico = false;
var CUIL = "";
var MedicoId = 0;
var objPracticas = new Array();
var Moneda = /^(-)?\d+(\.\d\d)?$/;
var TurnoAutorizanteId = "0";
var TurnoPrimeraVez = false;
var TurnoEmiteBono = false;
var TurnoEmiteComprobante = false;
var Recepcionaturno = false;
var FechaTurno = "";
var EsAtencionSinTurno = false;
var Cod_OS = 0;
var Impreso = 0;
var CertificadoMostrado = false;
var Internado = 0;
var Ultimo_OK = 0;
var nopaga = false;
var Observaciones = "";
var EsMonotributo = false;
var CC;
var S;
var TotalBono = "";
var chkNobody;
var arr_Practicas_Cero = [];
var Importe;
var ImporteReal;
var valorPractica;
var celCache;
var sector = "";

$("#afiliadoCuil").change(function () {
   // CargarAfiliadoIdVPN();
});


function CargarAfiliadoIdVPN() {
    var json = JSON.stringify({ "afiliadoCuil": $("#afiliadoCuil").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerIdXCuilDBT",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#desdeaqui").hide();
            $("#desdeaqui2").hide();
        },
        success: function (Resultado) {
            if (Resultado.d == 0) {
                alert("EL CUIL DEL PACIENTE INGRESADO NO CORRESPONDE CON EL CARGADO EN EL PADRON UOM. \nACTUALICELO PARA CONTINUAR.");
                $("#desdeaqui").hide();
                $("#desdeaqui2").hide();
                window.open('http://10.10.8.71/Pacientes/NuevoAfiliado.aspx?ID=' + $("#afiliadoId").val(),'popup','width=900px,height=600px');
            }
            else {
                $("#afiliadoIdVPN").val(Resultado.d);
                $("#desdeaqui").show();
                $("#desdeaqui2").show();
            }
        },
        error: errores
    });
}



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

Cargar_Seccionales_Lista();
Cargar_Especialidades(false, 0, false);
var modal_ver = 0;

function ExisteTurno(AfiliadoId) { //Verifico que el paciente tenga un turno sin usar en el dia de la fecha.
    var json = JSON.stringify({ "AfiliadoId": AfiliadoId });
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/Bonos.asmx/Existe_Turno",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Turnos = Resultado.d;
            if (modal_ver == 1) return false;
            if (Turnos.length > 0) {

                if (CC != 1) {
                    if (confirm("El paciente tiene turnos para el dia de hoy.\nDesea visualizarlos?")) {
                        $("#ModalTurnos").modal('show');
                        CargarGrilla(Turnos);
                    } 
                }
                modal_ver = 1;
            }
        }
    });
}




function CargarGrilla(lista) {
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var visible = "none";
    if (lista != null) {
        Tabla_Titulo = "<table id='ListaTurnos' class='table table-hover table-condensed'><thead><tr><th>Fecha</th><th>Hora</th><th>Médico</th><th>Especialidad</th><th>Bono</th></tr></thead><tbody>";
        $.each(lista, function (index, turnos) {
        //alert(turnos.idBono);
            if (turnos.idBono != 0) { visible = 'inline'; } else {visible = 'none';}
            Tabla_Datos = Tabla_Datos + "<tr title='Click para cargar datos'";
            Tabla_Datos = Tabla_Datos + "><td id='tdFecha" + index + "' onclick='CargarDatosTurno(" + index + ")'; >" + turnos.fecha + "</td>" +
            "<td onclick='CargarDatosTurno(" + index + ")'; >" + turnos.hora + "</td>" +
            "<td onclick='CargarDatosTurno(" + index + ")'; >" + turnos.medico + "</td>" +
            "<td onclick='CargarDatosTurno(" + index + ")'; >" + turnos.especialidad + "</td>" +
            "<td id='tdMedId" + index + "' style='display:none;'>" + turnos.medicoid + "</td>" +
            "<td id='tdEspId" + index + "' style='display:none;'>" + turnos.especialidadid + "</td>";
            Tabla_Datos = Tabla_Datos + "<td><a class='btn btn-mini btn-success bono' data-id='" + turnos.idBono + "' data-fecha='" + turnos.fechaBono + "' style='display:"+ visible +"' >Imprimir</a></td></tr>";
        });
        Tabla_Fin = "</tbody></table>";
        $("#ListaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
    else $("#ListaTurnos").empty();
}

function CargarDatosTurno(index) { //Cargo datos del turno para sacar el bono.
    $("#cbo_Especialidad").val($("#tdEspId"+index).html());
    Cargar_Medicos_por_Especialidad($("#tdEspId" + index).html(), $("#tdMedId" + index).html());
    Cargar_Practicas_by_Especialidad($("#tdEspId" + index).html());
    $("#desdeaqui").click();
    $("#ModalTurnos").modal('hide');
}

function UltimoAporte_OK() {
    if (Ultimo_OK == 1) { return false; }
    var json = JSON.stringify({ "Documento": $("#txt_dni").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/UltimoAporte_OK",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Ultimo_OK == 1) { return false; }
            Ultimo_OK = 1;
            var ok = Resultado.d;
            if (!ok) alert("No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.\nVerificar con SSS.");
            else { $("#btnVencimiento").click(); }
        }
    });
}

function PatologiabyId(Id) {
    if (Id <= 1) { $('#span_Discapacidad').html("PATOLOGÍA: NO"); $("#discapacidad_paga").val('S'); $("#span_Discapacidad").css("color","white"); return; }
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, item) {
                $('#span_Discapacidad').html("PATOLOGÍA: " + item.patologias);
                $("#span_Discapacidad").blink();
                $("#discapacidad_paga").val(item.pagobono);
            });
        },
        error: errores
    });
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


function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}

function VerificarPMI(PacienteID) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/VerificarPMI",
        data: '{PacienteId: "' + PacienteID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#verificarPMI").val(Resultado.d);
        },
        error: errores
    });
}

function CertificadoVencido(DNI) {
    $.ajax({
        type: "POST",
        url: "../Json/Discapacidad/Discapacidad.asmx/VerificarFechaCertificado",
        data: '{DNI: "' + DNI + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}


$("#cbo_Especialidad").change(function () {
    Cargar_Practicas_by_Especialidad($("#cbo_Especialidad :selected").val());
});

function Practicas_Id_Codigo(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/Practicas/Practicas.asmx/Practicas_Id_Codigo",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Id_Codigo,
        error: errores
    });
}


function Cargar_Id_Codigo(Resultado) {
    var Codigo = Resultado.d;
    codigoPractica = Codigo;
    $("#txtCodigo").val(Codigo);
    ValorPractica();
    $("#txtImporte").focus();
}
var guardias = ["179", "179", "180", "253", "181", "182"];
function Cargar_Practicas_by_Especialidad(EspecialidadId) {


    //alert($("#afiliadoId").val());

    if ($.inArray(EspecialidadId, guardias) >= 0) {
        var json = JSON.stringify({ "afiliadoId": $("#afiliadoId").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Gente.asmx/VerificarVencimientoReciboSueldo",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                //alert(Resultado.d);
                if (Resultado.d <= 0) { alert("Revise fecha de vencimiento del último recibo de sueldo"); }
            },
            error: errores
        });    
     }



    var json = JSON.stringify({ "EspecialidadId": EspecialidadId });
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Lista_Practicas_by_Esp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        complete: function () {
            
            //ESTO ES PARA QUE TOME DE MANERA AUTOMATICA LAS PRACTICAS SEGUN ESPECIALIDAD
            if ($("#cbo_Especialidad").val() == "202") {
                $("#cbo_Practicas").val("300000");
                $("#txtCodigo").val("300000");
                ValorPractica();
            }
            else {
                if ($("#cbo_Especialidad").val() == "168") {
                    $("#cbo_Practicas").val("170101");
                    $("#txtCodigo").val("170101");
                    ValorPractica();
                }
                else {

                    
                    if ($("#cbo_Practicas option[value='420101']").val() == undefined) {
                        $("#cbo_Practicas :nth(1)").attr("selected", "selected");
                        $("#txtCodigo").val($("#cbo_Practicas :selected").val());
                        ValorPractica();
                    }
                    else {
                        $("#cbo_Practicas").val("420101");
                        $("#txtCodigo").val("420101");
                        ValorPractica();
                    }



                }
                   
            }
            //ESTO ES PARA QUE TOME DE MANERA AUTOMATICA LAS PRACTICAS SEGUN ESPECIALIDAD
                        

        },
        error: errores
    });
}

function Cargar_Practicas() {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Listas_Total",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Cargar_Practicas_Guardia() {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practica_Listar_Guardia",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Practica_Codigo_ID(Codigo) {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Codigo_ID",
        data: '{Codigo: "' + Codigo + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practica_Codigo_ID_Cargadas,
        error: errores
    });
}

function Practica_Codigo_ID_Cargadas(Resultado) {
    var Id = Resultado.d;
    if (Id != 0) {
        $("#cbo_Practicas option[value=" + Id + "]").attr("selected", true);
        $("#txtImporte").focus();
        ValorPractica();
    }
    else {
        $("#cbo_Practicas option[value=0]").attr("selected", true);
        $("#ControltxtCodigo").addClass("error");
        $("#txtCodigo").val('');
        $("#txtCodigo").focus();
    }
}

function ValorPractica() {
    if ($("#CargadoNHC").html() == '4' || $("#CargadoNHC").html() == '5' || $("#CargadoNHC").html() == '6') { $("#txtImporte").val('0'); $("#txtImporteReal").val('0'); return false; } //Apertura HC, Prest. Docu, Cambio de Turno.
    if ($("#chkVIP").is(":checked")) { $("#txtImporte").val('0'); $("#txtImporteReal").val('0'); return false; } //Es VIP, no paga bono.(Req. Auto)
    if (nopaga) { $("#txtImporte").val('0'); $("#txtImporteReal").val('0'); return false; }

    var Seccional_Id = $("#cboSeccional :selected").val();
    var json = JSON.stringify({ "Seccional": Seccional_Id, "EspecialidadId": $("#cbo_Especialidad :selected").val(), "PracticaId": $("#cbo_Practicas :selected").val(),"NomencladorId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ValorPracticaporConvenio",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ValorPractica_Cargado,
        error: errores
    });
}

$('#cboNoPagaAutoriza').hover(function () {
    $(this).attr('size', 1);
});

$("#chkVIP").click(function () {
    $("#cboNoPagaAutoriza").val("0");
    $("#cboObservacionesNP").val("0");
    if ($(this).is(":checked")) {
        $("#cboNoPagaAutoriza").show();
        $("#cboObservacionesNP").show();
        $("#txtObsNP").show();
        $("#txtImporte").val('0.00');
        $("#txtImporteReal").val('0.00');
        $('#cboNoPagaAutoriza').attr('size', 2);
        //$("#txtImporte").removeAttr("disabled");
        //desactivo nobody
        $("#chkNobody").prop("checked", false);
        $("#txtObsNP").hide();
        $(".ImportePaga").hide();
        $(".ImportePaga").val("");
    }
    else {
        $("#cboNoPagaAutoriza").hide();
        $("#cboObservacionesNP").hide();
        $("#txtObsNP").hide();
        //$("#txtImporte").attr("disabled", true);

        // les vuelvo a poner el precio
        $("#txtImporte").val(Importe);
        $("#txtImporteReal").val(ImporteReal);
    }
});

// PAGO PARCIAL
$("#chkNobody").click(function () {
    $("#cboNoPagaAutoriza").val("0");
    $("#cboObservacionesNP").val("0");
    if ($(this).is(":checked")) {
        $("#cboNoPagaAutoriza").show();
        $("#cboObservacionesNP").show();
        $("#txtObsNP").show();
        //$("#txtImporte").val('0.00');
        //$("#txtImporteReal").val('0.00');
        $('#cboNoPagaAutoriza').attr('size', 2);
        //$("#txtImporte").removeAttr("disabled");
        $(".ImportePaga").show();
        //desactivo vip
        $("#chkVIP").prop("checked", false);
        $("#txtImporte").val(Importe);
        $("#ControltxtImporteReal").val(ImporteReal);
    }
    else {
        $("#cboNoPagaAutoriza").hide();
        $("#cboObservacionesNP").hide();
        $("#txtObsNP").hide();
        //$("#txtImporte").attr("disabled", true);
        $(".ImportePaga").hide();
        $(".ImportePaga").val("");
    }
});
// PAGO PARCIAL

function ValorPractica_Cargado(Resultado) {
    $("#txtImporte").removeAttr('disabled');
    var Valor = Resultado.d;
    if (Valor != null) {
        var val = parseFloat(Valor.ValorBono).toFixed(2);
        if (parseInt(val) == 0) arr_Practicas_Cero.push(parseInt($("#txtCodigo").val())); //Practicas valor cero inserto

        if (EsMonotributo) val = parseFloat(Valor.ValorACA).toFixed(2); //Valor Monotrib

        if ($("#discapacidad_paga").val() == 'N') { $("#txtImporte").val('0'); return; }
        if ($("#verificarPMI").val() == 1) { $("#txtImporte").val('0'); return; } //CUBRE PMI
        if (val == '0.00') {$("#txtImporte").val('0');  return; }
        $("#txtImporte").val(val);
        if ($("#txtCodigo").val() != "999999") { $("#txtImporte").prop('disabled', true); }
        $("#txtImporteReal").val(val);

        Importe = val;
        ImporteReal = val;
    } else {
        $("#txtImporte").val('0');
        $("#txtImporte").removeAttr('disabled');
        $("#txtImporteReal").val('0');
    }
}

$("#txtCodigo").change(function () {
    var Numeros = /^([0-9])*$/;
    if (Numeros.test($("#txtCodigo").val())) {
        $("#ControltxtCodigo").removeClass("error");
        if ($("#txtCodigo").val() == "") {            
            //$("#btnConfirmarNuevoBono").focus();
        }
        else {
            Practica_Codigo_ID($("#txtCodigo").val());
            $("#txtImporte").focus();
        }
    } else {
        $("#ControltxtCodigo").addClass("error");
        $("#txtCodigo").focus();
    }
});

$("#txtCodigo").keypress(function (event) {
    var Numeros = /^([0-9])*$/;
    if (event.which == 13 || event.keyCode == 9) {
        event.preventDefault();
        if (Numeros.test($("#txtCodigo").val())) {            
            if ($("#txtCodigo").val() == "") {
                //$("#btnConfirmarNuevoBono").focus();
            }
            else {
                Practica_Codigo_ID($("#txtCodigo").val());
            }
        }
        else {
            $("#ControltxtCodigo").addClass("error");
        }
    }

});



function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Practicas').empty();
    $('#cbo_Practicas').append('<option value="0">Seleccione una Práctica</option>');
    $.each(Practicas, function (index, practicas) {
        $('#cbo_Practicas').append(
              $('<option></option>').val(practicas.Id).html(practicas.Practica) ///***Ver
            );
    });
}


$("#btnAgregarPractica").click(function () {
    if ($("#txtImporte").val().trim().length == 0 || $("#txtImporte").val() == undefined) { $("#txtImporte").val("0"); $("#txtImporteReal").val("0"); }
    if ($("#cbo_Practicas :selected").val() == "0") { alert("Seleccione una práctica."); return false; }

    if ($("#txtCodigo").val() == '') {
        $("#ControltxtCodigo").addClass("error");
        $("#txtCodigo").focus();
    }
    else {
        if ($("#ControltxtImporte").hasClass("error")) {
            $("#txtImporte").focus();
            return false;
        }
        else {
            if ($("#ControltxtImporteReal").hasClass("error")) {
                $("#txtImporteReal").focus();
                return false;
            }
            else {

                //if (!Existe($("#txtCodigo").val())) {

                Nombre = $("#cbo_Practicas :selected").text();
                //Codigo = $('#cbo_Practicas option:selected').val();  //$("#txtCodigo").val();
                Codigo = $("#txtCodigo").val();
                Precio = $("#txtImporte").val().replace(".", ",");

                //si no trae el precio real del bono lo pone en 0 para que no falle la creacion del bono
                if ($("#txtImporteReal").val() == "") { PrecioReal = 0; } else {
                    PrecioReal = $("#txtImporteReal").val().replace(".", ",");
                }

                ComentarioPractica = $("#txtPracticaComentario").val();
                PracticaId = $("#cbo_Practicas").val();
                Estado = 1;
                var Cual = Total;
                if (Editando == 1) {
                    Cual = EditandoPos;
                }
                else {
                    Total = Total + 1;
                    Cual = Total;
                }

                var objPractica = {};
                objPractica.Codigo = Codigo;
                objPractica.Precio = Precio;
                objPractica.PrecioReal = PrecioReal;
                objPractica.Estado = Estado;
                objPractica.ComentarioPractica = ComentarioPractica;
                objPractica.Nombre = Nombre;
                objPractica.PracticaId = PracticaId;
                objPracticas[Cual] = objPractica;

                //TotalBono += parseFloat(Precio);
                //Practicas[Cual] = [Codigo, Nombre, Precio, PrecioReal, Estado, ComentarioPractica, PracticaId];           
                RenderizarTabla();
                Editando = 0;
                EditandoPos = -1;

                LimpiarCampos();
                $("#txtCodigo").focus();

                //}
            }
        }
    }

});

    function formatoMoneda(num) {
        var p = num.toFixed(2).split(".");
        var chars = p[0].split("").reverse();
        var newstr = '';
        var count = 0;
        for (x in chars) {
            count++;
            if (count % 3 == 1 && count != 1) {
                newstr = chars[x] + ',' + newstr;
            } else {
                newstr = chars[x] + newstr;
            }
        }
        return newstr + "." + p[1];
    }

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Código</th><th>Práctica</th><th>Importe</th><th style='display:none'>Importe Real</th></tr></thead><tbody>";
    var Contenido = "";
    $("#totalBono").val("0");
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Práctica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].Codigo + " </td><td> " + objPracticas[i].Nombre.substring(0, 20) + " </td><td> $ " + objPracticas[i].Precio + " </td><td style='display:none'> $ " + objPracticas[i].PrecioReal + " </td></tr>";
            $("#totalBono").val(parseFloat($("#totalBono").val()) + parseFloat(objPracticas[i].Precio.replace(',','.')));
        }
        if (objPracticas.length - 1 == Total) $("#Total").html("TOTAL A PAGAR: $" + formatoMoneda(parseFloat($("#totalBono").val()))); 
    }

    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }



}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#txtCodigo").val(objPracticas[Nro].Codigo);
    $("#txtImporte").val(objPracticas[Nro].Precio);
    $("#txtImporteReal").val(objPracticas[Nro].PrecioReal);
    $("#txtPracticaComentario").val(objPracticas[Nro].ComentarioPractica);
    $("#cbo_Practicas option[value=" + objPracticas[Nro].PracticaId + "]").attr("selected", true);
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");

}

function Eliminar(Nro) {
    objPracticas[Nro].Estado = 0;
    //TotalBono = TotalBono - objPracticas[Nro].Precio;
    RenderizarTabla();
}


function Existe(Algo) {

    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].Codigo == Algo && objPracticas[i].Estado == 1 && Editando != 1 ) {
            alert("Ya ha cargado la práctica Nro: " + Algo);
            LimpiarCampos();
            $("#txtCodigo").focus();
            return true;
        }
    }
    return false;
}


$("#cbo_Practicas").change(function () {
    Practicas_Id_Codigo($('#cbo_Practicas option:selected').val());
});





function imgErrorMedico(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$("#txtImporte").keypress(function (event) {

    if (event.keyCode == 9) {
        event.preventDefault();

        if (Moneda.test($("#txtImporte").val())) {
            $("#txtImporteReal").val($("#txtImporte").val());
            $("#ControltxtImporte").removeClass("error");
            $("#ControltxtImporteReal").removeClass("error");
            $("#btnAgregarPractica").focus();
        }
        else {
            if ($("#txtImporte").val() == '') {
                $("#txtImporte").val('0');
                $("#txtImporteReal").val('0');
                $("#ControltxtImporte").removeClass("error");
                $("#ControltxtImporteReal").removeClass("error");
                $("#btnAgregarPractica").focus();
            }
            else {
                $("#ControltxtImporte").addClass("error");
            }
        }
    }

    if (event.which == 13) {

        if (Moneda.test($("#txtImporte").val())) {

            $("#txtImporteReal").val($("#txtImporte").val());
            if ($("#txtImporte").val() == '') { $("#txtImporte").val('0'); $("#txtImporteReal").val('0'); }

            $("#ControltxtImporte").removeClass("error");
            $("#btnAgregarPractica").focus();
        }
        else {
            if ($("#txtImporte").val() == '') {
                $("#txtImporte").val('0');
                $("#txtImporteReal").val('0');
                $("#ControltxtImporte").removeClass("error");
                $("#ControltxtImporteReal").removeClass("error");
                $("#btnAgregarPractica").focus();
            }
            else {
                $("#ControltxtImporte").addClass("error");
            }
        }
    }
});

$("#txtImporte").blur(function () {

    if (Moneda.test($("#txtImporte").val())) {
        $("#ControltxtImporte").removeClass("error");
        $("#btnAgregarPractica").focus();
        $("#txtImporteReal").val($("#txtImporte").val());
    }
    else {
        if ($("#txtImporte").val() == '') {
            $("#txtImporte").val('0');
            $("#txtImporteReal").val('0');
            $("#ControltxtImporte").removeClass("error");
            $("#txtImporteReal").focus();
        }
        else {
            $("#ControltxtImporte").addClass("error");
        }
    }

});

$("#btnCancelarPractica").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar");

    $("#ControltxtCodigo").removeClass("error");
    $("#ControltxtImporteReal").removeClass("error");
    $("#ControltxtImporte").removeClass("error");

    LimpiarCampos();
});

function LimpiarCampos() {
    $("#txtCodigo").val("");
    $("#txtImporte").val("");
    $("#txtImporteReal").val("");
    $("#txtPracticaComentario").val("");
    $("#cbo_Practicas option[value=0]").attr("selected", true);
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
}



$("#CerrarError").click(function () {
    window.location.href = "DarTurnos.aspx?NHC=" + CUIL;
});

function MostrarError(Mensaje) {
    Impreso = 0;
    $("#DialogoError").html(Mensaje);
    $('#ModalError').modal({
        keyboard: false,
        backdrop: 'static'
    });
}


function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {
    ListTipoDoc();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    Cargar_Practicas();
    $("#txtNHC").focus();
    var GET = {};
    var NHC = "";
    var Documento = "";
    $("#txtTelefono").mask("9999999999", { placeholder: "-" });

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        Cargar_Paciente_NHC(NHC);
    }

    if (GET["CC"] != "" && GET["CC"] != null) {
        CC = GET["CC"];
    }

    //para saber si viene del menu bonos- nuevo bono y pasar el sector a la generacion del saldo 
    if (GET["S"] != "" && GET["S"] != null) {
        S = GET["S"];
    }
    //para saber si viene del menu bonos- nuevo bono y pasar el sector a la generacion del saldo

    //para el log de la actualizacion del celular
    if (GET["sector"] != "" && GET["sector"] != null) {
        sector = GET["sector"];
    }

    if (GET["Documento"] != "" && GET["Documento"] != null) {
        Documento = GET["Documento"];
        Cargar_Paciente_Documento(Documento);
        $("#txt_dni").val(Documento);
    }


    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }

    Cargar_Autorizantes(0);
    Cargar_AutorizantesBono();
    Cargar_MotivoAutorizantesBono();
});

function CargarPacienteID(ID) {
    //if (Internado == 1) { return false; }
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

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

$("#btnReservaTurnoAhora").click(function () {
    if (!$("#btnReservaTurnoAhora").is(':checked')) {
        $("#NroTurnoAhora").hide();
    } else {
        $("#NroTurnoAhora").show();

        $.ajax({
            type: "POST",
            url: "../Json/Bonos/NuevoBonos.asmx/Ultimo_Nro_ReservaAhora",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ActualizarNroTurno,
            error: errores
        });
    }
});

function ActualizarNroTurno_() {
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/NuevoBonos.asmx/Ultimo_Nro_ReservaAhora",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ActualizarNroTurno,
        error: errores
    });
}


function ActualizarNroTurno(Resultado) {
    $("#NroTurnoAhora").html('');
    $("#NroTurnoAhora").html(Resultado.d);
}

function VerImporteCero() {
    if ($("#chkVIP").is(":checked")) return false; //Es VIP no paga bono.
    if (nopaga) return false; //no paga tiene PMI, no paga menor de 1 año o discapacitado..
    if ($("#CargadoNHC").html() == '4' || $("#CargadoNHC").html() == '5' || $("#CargadoNHC").html() == '6') return false; //Es apertura HC,Cambio Turno, Prest. Docu.

    Controlar();
    return error_controlar;
}

var error_controlar = false;

function Controlar() {
    var t = 0;
    error_controlar = false;

    $(objPracticas).each(function (inx, val) {
        if (val.Estado == 1) t += parseFloat(val.PrecioReal);

        if (objPracticas.length - 1 == inx) {
            if (t == 0)  //Bono en cero. Busco si existen practicas que no valen 0.
            {
                $(objPracticas).each(function (index, elem) {
                    if (elem.Estado == 1) { //Practica activa en bono.
                        if (($.inArray(parseInt(elem.Codigo), arr_Practicas_Cero) == -1) || arr_Practicas_Cero.length == 0) { error_controlar = true; return false; } //practica que no vale 0, esta valiendo cero.
                    }
                    if (objPracticas.length - 1 == index) { error_controlar = false; return true; } //ultimo elem todo ok.
                });
            }
            else { error_controlar = false; return true; } //Importe mayor a cero, el paciente no es VIP ni DISC, debe pagar bono.
        }
    });
}
var generando = 0;
var importePaga = 0;
$("#btnConfirmarNuevoBono").click(function () {
    if (generando == 0) {
        generando = 1;
        if (!$.isNumeric($("#afiliadoId").val()) || $("#afiliadoId").val() <= 0) { alert("Paciente no válido."); $("#btnConfirmarNuevoBono").hide(); return false; }
        if ($("#chkVIP").is(":checked") && $("#cboNoPagaAutoriza :selected").val() == "0") { alert("Seleccione Autorizante."); return false; }
        if ($("#chkVIP").is(":checked") && $("#cboObservacionesNP :selected").val() == "0") { alert("Seleccione Motivo."); return false; }
        if (VerImporteCero()) { alert("NO SE PUEDE EMITIR BONO EN CERO.\nEL PACIENTE NO ESTA AUTORIZADO."); return false; }
        //    alert(VerImporteCero());
        //    return false;
        //PAGO PARCIAL
        if ($("#chkNobody").is(":checked") && $("#cboNoPagaAutoriza :selected").val() == "0") { alert("Seleccione Autorizante."); return false; }
        if ($("#chkNobody").is(":checked") && $("#cboObservacionesNP :selected").val() == "0") { alert("Seleccione Motivo."); return false; }
        if ($("#chkNobody").is(":checked") && $("#txtImportePaga").val().trim().length <= 0) { alert("Ingrese Importe Paga."); return false; }

        TotalBono = $("#Total").html();
        TotalBono = TotalBono.replace("TOTAL A PAGAR: $", "");
        // alert(TotalBono);

        if ($("#txtImportePaga").val() > parseFloat(TotalBono)) { alert("Esta pagando mas del valor total del bono."); return false; }
        //PAGO PARCIAL
        //    verificarDeuda($("#afiliadoId").val());

        if (Impreso == 0) {
            Impreso = 1;

            if ($('#cbo_Medico option:selected').val() == "0" || $('#cbo_Medico option:selected').val() == '' || $('#cbo_Medico option:selected').val() == null) { $("#Controlcbo_Medico").addClass("error"); Impreso = 0; return false; }
            if ($('#cbo_Especialidad option:selected').val() == "0" || $('#cbo_Especialidad option:selected').val() == '' || $('#cbo_Especialidad option:selected').val() == null) { $("#Controlcbo_Especialidad").addClass("error"); Impreso = 0; return false; }

            TurnoAutorizanteId = $('#cboAutorizante option:selected').val();
            TurnoPrimeraVez = false;
            TurnoEmiteComprobante = false;
            Recepcionaturno = false;

            if ($("#btnEmitecoprobante").is(":checked")) {
                TurnoEmiteComprobante = true;
            }
            else {
                TurnoEmiteComprobante = true;
            }

            if ($("#btnRecepcionaturno").is(":checked")) {
                Recepcionaturno = true;
            }
            else {
                Recepcionaturno = false;
            }

            if ($("#btnReservaTurnoAhora").is(":checked")) {
                ReservaTurnoAhora = true;
            }
            else {
                ReservaTurnoAhora = false;
            }

            if ($("#btnAtencionSinTurno").is(":checked")) {
                EsAtencionSinTurno = true;
            }
            else {
                EsAtencionSinTurno = false;
            }

            var TurnoVerificado = null;
            var Comentario = $("#txtComentario").val();

            var observacion = "";

            importePaga = 0;
            if ($("#chkNobody").is(":checked")) {
                chkNobody = 1;
                //observacion = " " + $('#cbo_Medico option:selected').text();
                //$.each(objPracticas, function (index, item) { observacion += observacion + " " + item.Nombre; });
                observacion = "Autorizante: " + $('#cboNoPagaAutoriza option:selected').text() + " Motivo: " + $('#cboObservacionesNP option:selected').text();
                importePaga = $("#txtImportePaga").val();
            } else { chkNobody = 0; }


            //VERIFICO SI EXISTE BONO PARA ESE AFILIADO ESE DIA Y ESA ESPECIALIDAD
            var jAson = JSON.stringify({ "Documento": $("#afiliadoId").val(), "EspecialidadId": $('#cbo_Especialidad option:selected').val() });

            $.ajax({
                type: "POST",
                url: "../Json/Bonos/NuevoBonos.asmx/VerficarExisteBono",
                data: jAson,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    if (Resultado.d != 0) {// si existe bono

                        if (confirm(Resultado.d)) { generarBono(observacion); } else { $("#btnVolver").click(); }

                    } else { generarBono(observacion); }
                },
                error: errores
            });
        }
    }
});


function generarBono(observacion) {
    var obs = "";
    if ($("#txtObsNP").val().trim() == "") { obs = ComentarioPractica; } else { obs = $("#txtObsNP").val().trim(); }

    var json = JSON.stringify({ "objPracticas": objPracticas, "Documento": $("#afiliadoId").val(), "EsPrimeraVez": false, "Verificado": '',
        "EmiteComprobante": TurnoEmiteComprobante, "AutorizanteId": $('#cboAutorizante option:selected').val(), "MedicoId": $('#cbo_Medico option:selected').val(),
        "EspecialidadId": $('#cbo_Especialidad option:selected').val(), "EsAtencionSinTurno": EsAtencionSinTurno, "EsUrgencia": false, "ReservaTurnoAhora": ReservaTurnoAhora,
        "FechaTurno": FechaTurno, "Recepcionaturno": Recepcionaturno, "AutorizaBono": $("#cboNoPagaAutoriza :selected").val(), "MotivoAutorizaBono": $("#cboObservacionesNP :selected").val(),
        //S
        "Observaciones": obs.toUpperCase(), "TLC": 0, "chkNobody": chkNobody, "ImportePaga": importePaga, "S": S, "observacion": observacion
    });
    //  console.log(json);

    $.ajax({
        type: "POST",
        url: "../Json/Bonos/NuevoBonos.asmx/GuardarPracticasBono",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BonoGuardado,
        error: errores
    });

}



$("#cbo_Medico").change(function () {
    var str = $('#cbo_Medico option:selected').html();
    if (str.length > 20) $("#CargadoMedico").html(str.substring(0, 19) + "...");
    else $("#CargadoMedico").html(str);
    //FotoMedico();
});

function FotoMedico() {
    $("#fotomedico").attr('src', '../img/medicos/' + $('#cbo_Medico option:selected').val() + '.jpg');
}

$('#fotomedico').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function BonoGuardado(Resultado) {
    var d = "";

    if (Resultado.d.indexOf("_") == -1) { d = Resultado.d; } else { d = Resultado.d.substr(-Resultado.d.length, Resultado.d.indexOf("_")); }

    var url = '../Impresiones/ImpresionBono.aspx?' + d;
    if (EsMonotributo) url = '../Impresiones/ImpresionBono_Mono.aspx?' + d;
    $.fancybox({
        'autoDimensions': false,
        'href': url,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'onClosed': function () { generando = 0; mostarRecibo(Resultado); }
    });

}

function mostarRecibo(Resultado){
    if (chkNobody == 1 && importePaga > 0) {

        var w = "";
        w = Resultado.d.substring(Resultado.d.indexOf("_") + 1, Resultado.d.length);
        //alert(w);
        var url2 = '../Impresiones/ReciboMovimientoBono.aspx?id=' + w.toString();
//        alert(url2);
//        $.fancybox({
//            'autoDimensions': false,
//            'href': url2,
//            'width': '75%',
//            'height': '75%',
//            'autoScale': false,
//            'transitionIn': 'none',
//            'transitionOut': 'none',
//            'type': 'iframe',
//            'hideOnOverlayClick': false,
//            'enableEscapeButton': false,
//            'onClosed': function () {
//                window.location.href = "NuevoBono.aspx?S=" + S;
//                //mostrar saldos
//            }
        //        });

        window.open(url2, "_blank");
        window.location.href = "NuevoBono.aspx?S=" + S;
    } else {
        window.location.href = "NuevoBono.aspx?S=" + S;
        //SALDOS QUITAR PARA SUBIR VERSION
        //mostrarSaldos();
    }
}


function mostrarSaldos() {
    var pagina = "administrarSaldos.aspx?NHC=" + $("#afiliadoId").val() + "&S=1";

    $("#IframeSaldos").attr("src", pagina);
    $("#ModalSaldos").modal('show');

}

function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });

    // si es perfil imagenes se bloquea el combo
    if ($("#perfil").val() == "83") {
        $("#cbo_Especialidad").val("381");
        $("#cbo_Especialidad").prop('disabled', true);
        Cargar_Medicos_por_Especialidad(381, 0);
        
    }
    // si es perfil imagenes se bloquea el combo
}


function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}


$('#cbo_Especialidad').change(function () {
    if ($('#cbo_Especialidad option:selected').html().length > 13) {
        $("#CargadoEspecialidad").html($('#cbo_Especialidad option:selected').html().substring(0, 13)+"...");
    } else {
        $("#CargadoEspecialidad").html($('#cbo_Especialidad option:selected').html());
    }
    Cargar_Medicos_por_EspecialidadporTipo($(this).val(), 'A');
});



function Cargar_Medicos_por_EspecialidadporTipo(Especialidad, Tipo) {
    var json = JSON.stringify({ "Especialidad": Especialidad, "Tipo": Tipo , "TLC": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
        data: json,
        //url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        //data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Medicos = Resultado.d;
            $('#cbo_Medico').empty();
            $.each(Medicos, function (index, medicos) {
                $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
            });
            if (Resultado.d != null && Resultado.d != '') {
                $("#CargadoMedico").html($('#cbo_Medico option:selected').html());
            } else {
                $("#CargadoMedico").html('');
            }

            if (MedicoId != '0' || MedicoId != '') {
                $("#cbo_Medico option[value=" + MedicoId + "]").attr("selected", true);
                $("#CargadoMedico").html($('#cbo_Medico option:selected').html());
            }
            //FotoMedico();

        },
        error: errores
    });

}


function Cargar_Medicos_por_Especialidad(Especialidad, MedicoId) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Medicos = Resultado.d;
            $('#cbo_Medico').empty();
            $.each(Medicos, function (index, medicos) {
                $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
            });
            if (Resultado.d != null && Resultado.d != '') {
                $("#CargadoMedico").html($('#cbo_Medico option:selected').html());
            } else {
                $("#CargadoMedico").html('');
            }

            if (MedicoId != '0' || MedicoId != '') {
                $("#cbo_Medico option[value=" + MedicoId + "]").attr("selected", true);
                $("#CargadoMedico").html($('#cbo_Medico option:selected').html());
            }
            //FotoMedico();

        },
        error: errores
    });

}


function Cargar_Paciente_Documento(Documento) {

   // if (Internado == 1) { return false; }
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        complete: function () {
            if ($("#afiliadoId").val().trim().length > 0) setTimeout(function () { $('#desdeaqui').focus(); }, 100); //$("#desdeaqui").focus();
        },
        error: errores
    });
}

function Bloquear() {
    $("#txtNHC").attr("disabled", true);
    $("#txt_dni").attr("disabled", true);
    $("#txtPaciente").attr("disabled", true);
    $("#btnCancelarPedidoTurno").show();
}

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {

            //alert(paciente.cuil);
            EstaVendico(paciente.cuil);
            //alert(paciente.Vencido);
            if (paciente.Vencido) {
                alert("Paciente dado de baja el día: " + paciente.FechaVencido);
                return false;
            }
            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();
            $("#desdeaqui").show();
            $("#desdeaqui2").show();
            $("#txtnroturno").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            celCache = paciente.Telefono;
            $("#msgCel").text("Datos en Base de Datos: " + paciente.Celular);
            $("#msgCel").show();

            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

            $("#btnOtorgados").css('display', 'inline');


            if (paciente.CUIT == 88888888888) EsMonotributo = true; //CUIT = 88888888888, Monotrib

            else EsMonotributo = false;

            if ($("#txtTelefono").val().length < 10) { // 10 digitos pedido por sansoni el 16/11/21
                $("#controlTelefono").addClass("error");
                PError = true;
            }
            if (paciente.Nro_Seccional == 999) {
                $("#controlSeccional").addClass("error");
                PError = true;
            }

            if (paciente.Paciente.length > 20) $("#CargadoApellido").html(paciente.Paciente.substring(0, 19) + "...");
            else $("#CargadoApellido").html(paciente.Paciente);
            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);

            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoCelular").html(paciente.Celular);
            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
            //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
            //alert(paciente.Foto);
            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

            $("#afiliadoCuil").val(paciente.cuil)
            .trigger('change');
            $("#afiliadoId").val(paciente.documento);

            UltimoAporte_OK(); //Verifica aportes en Padron UOM.
            //alert(paciente.deuda);
            PatologiabyId(paciente.Discapacidad);

            if (!CertificadoMostrado) {
                CertificadoVencido(paciente.documento);
                CertificadoMostrado = true;
            }
            //PAGA BONO?
            nopaga = !paciente.PagaBono;
            //alert(paciente.PagaBono);
            PMIPI = "";
            if (paciente.PMI && paciente.PI == false) {
                PMIPI = "PMI"
            }

            if (paciente.PMI == false && paciente.PI) {
                PMIPI = "PI"
            }

            if (PMIPI != "") {
                $("#CargadoSeccional").html($("#CargadoSeccional").html() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + PMIPI + "]");
            }


            if (PError) {
                $("#desdeaqui").hide();
                $("#desdeaqui2").hide();
            }
            else {
                $("#desdeaqui").show();
                $("#desdeaqui2").show();
            }
            //PAGA BONO?

            if (!PhoneValidate("desdeaqui", "txtTelefono")) {
                return false;
            } else {
                ExisteTurno(paciente.documento);
            }

            if (parseInt(paciente.deuda) > 0) { MostrarObs(paciente.Observaciones + "\n DEUDA DEL AFILIADO: $" + parseFloat(paciente.deuda).toFixed(2)).toString(); } else {
                MostrarObs(paciente.Observaciones);
            }
            
            Bloquear();
           
            Internado = 1;
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            $("#discapacidad_val").val(paciente.Discapacidad);

            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#Titulo_Seccional_o_OS").html("Ob. Social");
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                Cargar_ObraSociales_Cargar(paciente.OSId);
                if (paciente.ObraSocial.length > 40) {
                    $("#CargadoSeccional").html(paciente.ObraSocial.substring(0, 37) + "...");
                } else {
                    $("#CargadoSeccional").html(paciente.ObraSocial);
                }
            }
        });
        //alert(paciente.cuil);
        //EstaVendico(paciente.cuil);
    }
    else if (Paciente.length > 1 && $("#afiliadoId").val().length == 0) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
        $("#txtPaciente").focus();
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

$("#txt_dni").on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13 || keyCode == 9) {
        e.preventDefault();
        if ($("#txt_dni").val().trim().length > 0)
            Cargar_Paciente_Documento($("#txt_dni").val());
    }
});

$("#txtNHC").on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13 || keyCode == 9) {
        e.preventDefault();
        if ($("#txtNHC").val().trim().length > 0)
            Cargar_Paciente_NHC($("#txtNHC").val());
    }
});

function Cargar_Autorizantes(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Autorizantes",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Autorizantes_Cargado,
        error: errores
    });
}

function Cargar_Autorizantes_Cargado(Resultado) {
    var Autorizantes = Resultado.d;
    $('#cboAutorizante').empty();
    $('#cboAutorizante').append('<option value="0">Autorizado por...</option>');
    $.each(Autorizantes, function (index, autori) {
        $('#cboAutorizante').append(
              $('<option></option>').val(autori.id).html(autori.autorizante)
            );
    });
}

function Cargar_AutorizantesBono() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/AutorizantesBono",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Autorizantes = Resultado.d;
            $.each(Autorizantes, function (index, autori) {
                $('#cboNoPagaAutoriza').append($('<option></option>').val(autori.id).html(autori.autorizante));
            });
        },
        error: errores
    });
}

function Cargar_MotivoAutorizantesBono() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/MotivoAutorizaBono",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Autorizantes = Resultado.d;
            $.each(Autorizantes, function (index, motivo) {
                $('#cboObservacionesNP').append($('<option></option>').val(motivo.id).html(motivo.motivo));
            });
        },
        error: errores
    });
}

function Cargar_Paciente_NHC(NHC) {
    //if (Internado == 1) { return false; }
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        complete: function () {
            if ($("#afiliadoId").val().trim().length > 0) $('#desdeaqui').focus();
        },
        error: errores
    });
}


function VerificarSiEsEstudiante(Documento) {
    if (Internado == 1) return false;
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/VerificarSiEsEstudiante",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_VerificarSiEsEstudiante,
        error: errores
    });
}



function Cargar_VerificarSiEsEstudiante(Resultado) {
    $("#span_Estudiante").html(Resultado.d);
}

function MostrarObs(Obs) {
    if (Internado == 1) return false;
    if (Obs.length > 0) alert(Obs);
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;                                                                                                                                                                                                                                                     


    $.each(Paciente, function (index, paciente) {
        if (paciente.Vencido) {
            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
            $("#desdeaqui").hide();
            $("#desdeaqui2").hide();
            return false;
        }
        $("#btnactualizar").show();
        $("#btnCancelarPedidoTurno").show();

        $("#txtnroturno").prop("readonly", true);

        $("#afiliadoCuil").val(paciente.cuil)
        .trigger('change');

        $("#afiliadoId").val(paciente.documento);

        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);

        VerificarSiEsEstudiante(paciente.documento_real);

        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#txtTelefono").attr('value', paciente.Telefono);

        celCache = paciente.Telefono;

        $("#msgCel").text("Datos en Base de Datos: " + paciente.Celular);
        $("#msgCel").show();

        $("#discapacidad_val").val(paciente.Discapacidad);

        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

        if (!PhoneValidate("desdeaqui", "txtTelefono")) {
            return false;
        } else {
            ExisteTurno(paciente.documento);
        }

        VerificarPMI(paciente.documento);
        PatologiabyId(paciente.Discapacidad);

        if (paciente.CUIT == 88888888888) EsMonotributo = true; //CUIT = 99999999999, Monotrib
        else EsMonotributo = false;


        if ($("#txtTelefono").val().length < 10) { // digitos pedido por sansoni el 16/11/21
            $("#controlTelefono").addClass("error");
            PError = true;
        }

        if (paciente.Nro_Seccional == "999") {
            $("#controlSeccional").addClass("error");
            PError = true;
        }


        if (paciente.Paciente.length > 20) $("#CargadoApellido").html(paciente.Paciente.substring(0, 19) + "...");
        else $("#CargadoApellido").html(paciente.Paciente);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoCelular").html(paciente.Celular);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());

        if (!CertificadoMostrado) {
            CertificadoVencido(paciente.documento);
            CertificadoMostrado = true;
        }

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            if (paciente.ObraSocial.length > 40) {
                $("#CargadoSeccional").html(paciente.ObraSocial.substring(0, 37) + "...");
            } else {
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }
        }
        else {
            //$("#btnVencimiento").show();
        }
        //alert(paciente.deuda);
        if (parseInt(paciente.deuda) > 0) { MostrarObs(paciente.Observaciones + "\n DEUDA DEL AFILIADO: $" + parseFloat(paciente.deuda).toFixed(2).toString()); } else {
            MostrarObs(paciente.Observaciones);
        }

        //EstaInternado(); //Verifica si el paciente se encuentra internado en la clinica.
        UltimoAporte_OK(); //Verifica aportes en Padron UOM.
        Bloquear();
        PMIPI = "";

        nopaga = !paciente.PagaBono;
       // alert(paciente.PagaBono);
        if (paciente.PMI && paciente.PI == false) {
            PMIPI = "PMI"
        }

        if (paciente.PMI == false && paciente.PI) {
            PMIPI = "PI"
        }

        if (PMIPI != "") {
            $("#CargadoSeccional").html($("#CargadoSeccional").html() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + PMIPI + "]");
        }
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
            $("#desdeaqui2").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui2").show();
        }
    });
}


//$("#btnBuscarPaciente").click(function () { alert(S); });

$("#btnBuscarPaciente").click(function () {
    $.fancybox({
        'href': '../Turnos/BuscarPacientes.aspx?Express=0' + '&S=' + S,
        'hideOnContentClick': true,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
});
function RecargarPagina(url) {
    if (CC == 1) {
        document.location = "../Bonos/BusquedaAfiliadoCC.aspx?CC=1&sector=CUENTA%20CORRIENTE%20AFILIADOS" + url.replace("?", "&");
    } else {
        document.location = "../Bonos/NuevoBono.aspx" + url;
    }
}

$('#desdeaqui').click(function () {
  //  if (Internado == 1) return false;
        if (!PhoneValidate("desdeaqui", "txtTelefono")) {
            return false;
        } else {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        }

    //    $("#cbo_Medico option[value=" + MedicoID + "]").attr("selected", true);
    //    $("#hastaaqui").fadeIn(1500);
    //    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    //    $('.container').height($('html').height() + ($('.contenedor_1').height() -
    //				$('.pie').height() -
    //				$('#hastaaqui').height()));
    //    $('#cbo_Especialidad').focus();
});



function Actualizar_Telefono_Seccional(Telefono, Seccional, Documento) {
    Cod_OS = $("#cbo_ObraSocial :selected").val();
    if (Cod_OS == undefined) { Cod_OS = 112103 }

    if (Telefono != celCache) {
        $.ajax({
            type: "POST",
            url: "../Json/Gente.asmx/Actualizar_Telefono_Seccional",
            data: '{Telefono: "' + Telefono + '", Seccional: "' + Seccional + '", Documento: "' + Documento + '", CodOs: "' + Cod_OS + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Actualizado_Telefono_Documento,
            complete: function () { generarLog(Documento, Telefono, sector); celCache = Telefono; },
            error: errores
        });
    }
}


function Actualizado_Telefono_Documento(Resultado) {
    //alert(Resultado.d);
    if (Resultado.d == '1') {
        $("#desdeaqui").show();
        $("#desdeaqui2").show();
        $("#controlTelefono").removeClass("error");
        $("#controlSeccional").removeClass("error");
        $("#CargadoTelefono").html($("#txtTelefono").val());

        if ($("#Cod_OS").val() == "112103") {
            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        }
        else {
            $("#CargadoSeccional").html($("#cbo_ObraSocial :selected").text());
        }
       // $("#msgCel").text("Datos en Base de Datos: " + celCache);
        $("#msgCel").show();
        alert("Paciente Actualizado!.");
        ExisteTurno($("#afiliadoId").val()); // para ver si tiene turnos en el dia despues de actualizar el telefono
    }
    else {


        if ($("#txtTelefono").val().length < 10) { // 10 digitos pedido por sansoni el 16/11/21
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
        }
        else {
            $("#controlTelefono").removeClass("error");
        }

        if ($("#cboSeccional :selected").val() == "999") {
            $("#controlSeccional").addClass("error");
        }
        else {
            $("#controlSeccional").removeClass("error");
        }

    }

}

$('#btnactualizar').click(function () {
    if (!PhoneValidate("desdeaqui", "txtTelefono")) { return false } else {
        Actualizar_Telefono_Seccional($('#txtTelefono').val(), $('#cboSeccional option:selected').val(), $('#afiliadoId').val());
    }
});


$(window).keypress(function (e) {
    if (e.keyCode == 43) {
        $("#btnConfirmarNuevoBono").click();
        return false;
    }
});


function verificarDeuda(afiliado) {
    var json = JSON.stringify({ "afiliado": afiliado });
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/Bonos.asmx/verificarDeuda",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) {
                $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../Bonos/bonosHistorial.aspx?afiliado='+ afiliado,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
//		    'onClosed': function () {
//		        window.location.href = "NuevoBono.aspx";
//		    }
		});
            }
        }
    });
 }


 $("#btnCancelarPedidoTurno").click(function () {
     //alert(S);
     window.location.href = "NuevoBono.aspx?S=" + S + "&sector=" + sector;
     //href="NuevoBono.aspx"
 });

 $("#btnVolver").click(function () {
     //alert(S);
     window.location.href = "NuevoBono.aspx?S=" + S + "&sector=" + sector;
     //href="NuevoBono.aspx"
 });

 $(".bono").live('click', function () {
     //alert($(this).data('id'));
     //alert($(this).data('fecha'));
     var url = '../Impresiones/ImpresionBono.aspx?id=' + $(this).data('id') + '&Fecha=' + $(this).data('fecha');
     $.fancybox({
         'autoDimensions': false,
         'href': url,
         'width': '75%',
         'height': '75%',
         'autoScale': false,
         'transitionIn': 'none',
         'transitionOut': 'none',
         'type': 'iframe',
         'hideOnOverlayClick': false,
         'enableEscapeButton': false,
         'onClosed': function () { window.location.href = "NuevoBono.aspx?S=" + S; }
     });
 });




