var NHC2 = 0;
var MedicoId2 = 0;
var IdConsulta = 0;
var IdConsulta = 0;
var IdDiagnosticoyClinica = 0;
var id = 0;
var nueva = 0;
var imprimir = 0;
var fec = 0;
var txtMetforminaP = 0;
var txtGlibenclamidaP = 0;
var txtGlimeripideP = 0;
var txtGlicazidaP = 0;
var txtInsulinaNPHDosisP = 0;
var txtInsulinaCorrienteP = 0;
var txtInsulinaAsparticaBifàsicaP = 0;
var txtInsulinaLispro7525P = 0;
var txtInsulinaLispro5050P = 0;
var consultaIdNueva = 0;
var anos = 0;
var listaInsulinas = new Array();
var ocultarCancelar = 0;

$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
        }
        else {

        }

    }
    else {

        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            Cargar_Paciente_ID(NHC);
            $("#fotopaciente").attr("src", NHC);
            NHC2 = NHC;

            CargarConsultas();

            if (GET["IdConsulta"] != "" && GET["IdConsulta"] != null) {

                IdConsulta = GET["IdConsulta"];
                if (IdConsulta != 0) { cargar(IdConsulta); IdConsulta = 0; }
            }
        }
        else if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            MedicoId = GET["MedicoId"];
            MedicoId2 = MedicoId;
        }

    }

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
        MedicoId2 = MedicoId;
    }
    if (GET["IdConsulta"] != "" && GET["IdConsulta"] != null) {

        IdConsulta = GET["IdConsulta"];
        if (IdConsulta != 0) { cargar(IdConsulta); IdConsulta = 0; }
    }
    else {

    }

    if (GET["imprimir"] == 1) {
        imprimir = GET["imprimir"];
        $("#btnImprimir").attr('disabled', false);
    }
    if (GET["MostrarBtnCancelar"] == 1) {
        $('#ModalExistePaciente').modal('show');
        ocultarCancelar = GET["MostrarBtnCancelar"];
        $("#btnCancelar").hide();
        $("#btnCance").hide();
    }

    if (ocultarCancelar == 1) {
        $("#BtnVolver").click(function () {
            parent.$.fancybox.close();
        });
    }

    //VerificarUltimaAtencion();

});         ///////////////// termina el ready/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TraerDiagnosticoYclinica();
TraerComplicaciones();
TraerEstudios();
TraerTratamiento();
TraerInsulinas();
//TraerEstudiosExtras();

$("#cboInsulinaBasal").change(function () {
    var seleccion = $(this).val();
    if ($(this).val() != 0) {
        $.each(listaInsulinas, function (index, item) {
            //alert(item.id + "/" + item.nombreComercial + "/" + seleccion);
            if (item.id == seleccion) {
                $("#txtBasalComercial").val(item.nombreComercial);
                $("#txtBasalComercial").attr('disabled', true);
            }
        });
    } else {
        $("#txtBasalComercial").attr('disabled', true);
        $("#txtBasalComercial").val("");
    }
});

$("#cboInsulinaCorreccion").change(function () {
    // if ($(this).val() != 0) { $("#txtCorreccionComercial").attr('disabled', false); } else { $("#txtCorreccionComercial").attr('disabled', true); $("#txtCorreccionComercial").val(""); }
    var seleccion = $(this).val();
    if ($(this).val() != 0) {
        $.each(listaInsulinas, function (index, item) {
            //alert(item.id + "/" + item.nombreComercial + "/" + seleccion);
            if (item.id == seleccion) {
                $("#txtCorreccionComercial").val(item.nombreComercial);
                $("#txtCorreccionComercial").attr('disabled', true);
            }
        });
    } else {
        $("#txtCorreccionComercial").attr('disabled', true);
        $("#txtCorreccionComercial").val("");
    }
});



//alert("SI" + $(this).val());
function complicacionesSI(obj) {

    //if ($(obj).is(':checked') == true) { alert("si"); }
    //if ($(obj).is(':checked') == false) { alert("no"); }
    $("#FechaComplicaciones" + $(obj).val()).attr('disabled', false);
}
//if ($(obj).is(':checked') == true) { alert("si"); }
//if ($(obj).is(':checked') == true) { alert("no"); }


function complicacionesNO(obj) {

    $("#FechaComplicaciones" + $(obj).val()).val("");
    $("#FechaComplicaciones" + $(obj).val()).attr('disabled', true);
}

function valorChange(obj) {
    var aux = $(obj).attr('id');
    var id = 0;
    if (aux.length == 9) { id = aux.slice(-1); } else { id = aux.slice(-2); }
    //alert(id);
    if ($(obj).val() != "") { $("#FechaEstudios" + id).attr('disabled', false); }
    else { $("#FechaEstudios" + id).attr('disabled', true); $("#FechaEstudios" + id).val(""); }
}

function valorChangeCombo(obj) {
    var aux = $(obj).attr('id');
    var id = 0;
    if (aux.length == 9) { id = aux.slice(-1); } else { id = aux.slice(-2); }
    //alert(id);
    if ($(obj).val() != 1) { $("#FechaEstudios" + id).attr('disabled', false); }
    else { $("#FechaEstudios" + id).attr('disabled', true); $("#FechaEstudios" + id).val(""); }
}

function TraerDiagnosticoYclinica() {

    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerDiagnosticoYclinica",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MostrardiagnosticoYclinica,
        error: errores

    });
}

function TraerComplicaciones() {

    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerComplicaciones",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MostrarComplicaciones,
        complete: function () {
            $(".fechas").css('text-align', 'center');
            $(".fechas").keydown(function () { return false; });
            $(".fechas").datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                maxDate: '0m'
            });
        },
        error: errores
    });
}

function TraerEstudios() {

    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerEstudios",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MostrarEstudios,

        complete: function () {
            $(".numeroP").css('text-align', 'center');
            $(".numeroP").css('text-align', 'center');
            $(".numeroP").on('keydown', function (e) {

                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                    return;
                }

                if ($(this).val().trim().length > 0 && e.keyCode == 190 && ($(this).val().trim().indexOf('.') === -1)) return;

                //                if ($(this).val().trim().indexOf('.') === -1) {
                //                    return;
                //                }

                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
            $(".fechas").css('text-align', 'center');
            $(".fechas").keydown(function () { return false; });
            $(".fechas").datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                maxDate: '0m'
            });
            TraerEstudiosExtras();
        },
        error: errores
    });
}
function TraerTratamiento() {

    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerTratamiento",
        //data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MostrarTratamiento,
        error: errores

    });
}

function TraerInsulinas() {
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerInsulinas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Mostrarinsulinas,
        error: errores
    });
}

function TraerEstudiosExtras() {
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerEstudiosExtras",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MostrarEstudioExtras,
        error: errores
    });
}

function MostrarEstudioExtras(resultado) {
    var lista = resultado.d;
    $.each(lista, function (index, item) {
        if (item.Microalbuminuria == 1) { $("#Estudios5").append(new Option(item.Descripcion, item.Estudios_Id)); }
        if (item.FondoDeOjo == 1) { $("#Estudios9").append(new Option(item.Descripcion, item.Estudios_Id)); }
    });


}

function MostrardiagnosticoYclinica(resultado) {

    var lista = resultado.d;
    var mensaje1 = "";
    var mensaje2 = "";
    $("#DatosDiagnosticoYclinica").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th></th><th></th></tr></thead><tbody>";
    var Contenido = "";
    $.each(lista, function (index, item) {
        if (item.Diag_Cli_Items_Id == 1) {
            mensaje1 = "Tipo 1";
            mensaje2 = "Tipo 2";
        } else { mensaje1 = "Si"; mensaje2 = "No"; } //rell='" + item.Diag_Cli_Items_Id + "' data-foo='" + item.Diag_Cli_Items_Id +                                                                                                                                                                                                                                                                                                                                                                                                                     value='false'                                                                                   
        Contenido = Contenido + "<tr><td style='cursor:auto;width:131px; text-align:left'><strong>" + item.nombre + "</strong></td><td style='cursor:auto;width:225px; text-align:right'><label style='display:inline'>" + mensaje1 + "</label><input  value='" + item.Diag_Cli_Items_Id + "' class='DiagCli'  id='" + "Cbo" + item.nombre.replace(/ /g, "_") + "' type='radio' name='" + item.nombre.replace(/ /g, "_") + "' /></td><td style='cursor:auto;width:225px; text-align:right'><label style='display:inline'>" + mensaje2 + "</label><input  id='" + "Cbo" + item.nombre.replace(/ /g, "_") + "no' type='radio' name='" + item.nombre.replace(/ /g, "_") + "'/></td>";
    });
    var Pie = "</tbody></table>";
    $("#DatosDiagnosticoYclinica").html(Encabezado + Contenido + Pie);

}


function MostrarComplicaciones(resultado) {
    var lista = resultado.d;
    var mensaje1 = "Si";
    var mensaje2 = "No";
    $("#Complicaciones").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th></th><th></th></tr></thead><tbody>";
    var Contenido = "";
    $.each(lista, function (index, item) {
        Contenido = Contenido + "<tr><td style='cursor:auto;width:300px; text-align:left'><strong>" + item.nombre + "</strong></td><td style='cursor:auto;width:100px'>" + mensaje1 + "<input onchange='complicacionesSI(this)' class='complicaciones' value='" + item.Complicaciones_Items_Id + "' id='Cbo" + item.nombre.replace(/ /g, "_") + "' name='" + item.nombre.replace(/ /g, "_") + "' type='radio'/></td><td style='cursor:auto;width:100px'><label style='display:inline'>" + mensaje2 + "</label><input value='" + item.Complicaciones_Items_Id + "' onchange='complicacionesNO(this)' id='Cbo" + item.nombre.replace(/ /g, "_") + "no" + "' type='radio' name='" + item.nombre.replace(/ /g, "_") + "'/></td><td><label>Fecha de Detección<input type='text' id='" + "FechaComplicaciones" + item.Complicaciones_Items_Id + "' class='fechas' style='width:100px' disabled/></label></td>";
    });
    var Pie = "</tbody></table>";
    $("#Complicaciones").html(Encabezado + Contenido + Pie);

}

function MostrarEstudios(resultado) {
    var lista = resultado.d;
    $("#Estudios").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th></th><th></th></tr></thead><tbody>";
    var Contenido = "";
    $.each(lista, function (index, item) {
        switch (item.id) {
            case 5: //microalbuminuria
                Contenido = Contenido + "<tr><td style='cursor:auto;width:300px; text-align:left'><strong>" + item.nombre + "</strong></td><td style='cursor:auto;width:100px'><label style='display:inline'>Valor</label><select name='" + item.nombre + "' onchange='valorChangeCombo(this)' class='estudios' id='" + "Estudios" + item.id + "' style='width:180px'></select></td><td style='cursor:auto;width:60px'><label style='display:inline'>Fecha</label><input class='fechas' id='" + "FechaEstudios" + item.id + "' type='text' style='width:100px' disabled/></td>";
                break;

            case 9: // fondo de ojo
                Contenido = Contenido + "<tr><td style='cursor:auto;width:300px; text-align:left'><strong>" + item.nombre + "</strong></td><td style='cursor:auto;width:100px'><label style='display:inline'>Valor</label><select name='" + item.nombre + "' onchange='valorChangeCombo(this)' class='estudios' id='" + "Estudios" + item.id + "'  style='width:180px'></select></td><td style='cursor:auto;width:60px'><label style='display:inline'>Fecha</label><input class='fechas' id='" + "FechaEstudios" + item.id + "' type='text'  style='width:100px' disabled/></td>";
                break;
            default:
                Contenido = Contenido + "<tr><td style='cursor:auto;width:300px; text-align:left'><strong>" + item.nombre + "</strong></td><td style='cursor:auto;width:100px'><label style='display:inline'>Valor</label><input name='" + item.nombre + "' onKeyUp='valorChange(this)' class='numeroP estudios input-large'  id='" + "Estudios" + item.id + "' type='text' style='width:166px' maxlength='4'/></td><td style='cursor:auto;width:60px'><label style='display:inline'>Fecha<input class='fechas' id='" + "FechaEstudios" + item.id + "' type='text' style='width:100px' disabled/></label></td>";
                break;
        }
    });
    var Pie = "</tbody></table>";
    $("#Estudios").html(Encabezado + Contenido + Pie);

}

function MostrarTratamiento(resultado) {
    var lista = resultado.d;
    $("#Tratamiento").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th></th><th></th></tr></thead><tbody>";
    var Contenido = "";
    $.each(lista, function (index, item) {
        Contenido = Contenido + "<tr><td style='cursor:auto;width:300px; text-align:left'><strong>" + item.nombre + "</strong></td><td style='cursor:auto;width:100px'><label style='display:inline'>Si</label><input class='tratamiento' value='" + item.id + "' id='" + "Cbo" + item.nombre.replace(/ /g, "_") + "'  name='" + item.nombre.replace(/ /g, "_") + "' type='radio'/></td><td style='cursor:auto;width:100px'><label style='display:inline'>No</label><input id='Cbo" + item.nombre.replace(/ /g, "_") + "no" + "' type='radio' class='input-mini' name='" + item.nombre.replace(/ /g, "_") + "'/></td>";
    });
    var Pie = "</tbody></table>";
    $("#Tratamiento").html(Encabezado + Contenido + Pie);

}

function Mostrarinsulinas(resultado) {
    var lista = resultado.d;
    $("#cboInsulinaBasal").append(new Option("Seleccione", 0));
    $("#cboInsulinaCorreccion").append(new Option("Seleccione", 0));
    $.each(lista, function (index, item) {

        var insulina = new Object();
        insulina.id = item.id;
        insulina.nombre = item.nombre;
        insulina.basal = item.basal;
        insulina.correccion = item.correccion;
        insulina.codigo = item.codigo;
        insulina.nombreComercial = item.nombreComercial;

        listaInsulinas.push(insulina);

        if (item.basal == 1)
        { $("#cboInsulinaBasal").append(new Option(item.nombre, item.id)); }
        else
        { $("#cboInsulinaCorreccion").append(new Option(item.nombre, item.id)); }
    });
}

$(".numero").css('text-align', 'center');
$(".numero").css('text-align', 'center');
$(".numero").on('keydown', function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if (e.keyCode == 190) e.preventDefault();

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////




$("#btnGuardar").click(function (e) {

    if (imprimir == 0) { Protocolo = 0; }
    //    var tipo;
    //    var grado = "";
    //    var frecuencia = "";
    //    var Taller = "";
    var errorFechaDiagnostico = 0;
    var errorEdadDiagnostico = 0;
    var errorComplicaciones = 0;
    var errorRadios = 0;
    var errorFechaEstudios = 0;
    var control = "";
    var titulo = "";
    //    var edad = $("#CargadoEdad").html();
    //    var fecha = new Date();
    //    var ano = fecha.getFullYear();
    //    var Fnacimiento = ano - edad;


    if ($("#fechaDiagnostico").val() == "") { errorFechaDiagnostico = 1; }
    if (errorFechaDiagnostico == 1) { alert("Faltan Cargar Fecha en Diagnostico y Clínica."); return false; }

    if ($("#EdadDiagnostico").val() > anos) { errorEdadDiagnostico = 1; }
    if (errorEdadDiagnostico == 1) { alert("La Edad al Diagnostico no Puede Ser Mayor a La Edad Actual."); return false; }

    if ($("#EdadDiagnostico").val() == "") { errorEdadDiagnostico = 1; }
    if (errorEdadDiagnostico == 1) { alert("Ingrese Edad al Diagnóstico."); return false; }

    //    var r = {};
    //    $(":radio").each(function () {
    //        var val = $('input:radio[name=' + this.name + ']:checked').val();
    //        if (val === undefined) {
    //            control = this.name
    //            titulo = control.replace(/_/g, " ", titulo);
    //            errorRadios = 1;
    //            //alert("Faltan seleccionar opciones.");
    //            return false;
    //        }
    //    });
    //    if (errorRadios == 1) {
    //        return;
    //    }

    $(".complicaciones").each(function (index, item) {

        if ($(item).is(":checked") && $("#FechaComplicaciones" + $(item).val()).val() == "") {
            //control = this.name;
            titulo = item.name.replace(/_/g, " ", titulo);
            errorComplicaciones = 1;

        }
    });


    $(".numeroP").each(function (index, item) {
        //alert(index);
        if (index <= 6) {
            var id = $(item).attr("id").slice(-1);
        } else { var id = $(item).attr("id").slice(-2); }
        //var id = $(item).attr("id").slice(-1);
        if ($(item).val() != "") {
            if ($("#FechaEstudios" + id).val() == "") {
                titulo = item.name.replace(/_/g, " ", titulo);
                errorFechaEstudios = 1;
            }
        }
    });

    if ($("#Estudios5").val() != 1) {
        if ($("#FechaEstudios5").val() == "") { errorFechaEstudios = 1; titulo = $("#Estudios5").attr('name'); }
    }
    if ($("#Estudios9").val() != 1) {
        if ($("#FechaEstudios9").val() == "") { errorFechaEstudios = 1; titulo = $("#Estudios9").attr('name'); }
    }

    //if ($("#cboInsulinaBasal").val() != 0 && $("#txtBasalComercial").val() == "") { alert("Ingrese Marca Comercial Para La Insulina Basal."); return false; }
    //if ($("#cboInsulinaCorreccion").val() != 0 && $("#txtCorreccionComercial").val() == "") { alert("Ingrese Marca Comercial Para La Insulina de Correción."); return false; }

    if (errorComplicaciones == 1) { alert("Falta Cargar Fecha de " + titulo.toUpperCase() + "."); return false; }
    if (errorRadios == 1) { alert("Falta seleccionar " + titulo.toUpperCase() + "."); return false; }
    if (errorFechaEstudios == 1) { alert("Faltan Cargar Fecha de " + titulo.toUpperCase() + "."); return false; }


    //alert(IdConsulta);
    //objeto cabecera
    var objCabeceraDiabetes = new Object();
    objCabeceraDiabetes.Diabetes_Gral_Id = IdConsulta;
    objCabeceraDiabetes.Diabetes_Gral_PacienteId = NHC2;
    objCabeceraDiabetes.Diabetes_Gral_Edad = anos;

    //objeto diagnostico y clinica cabecera
    var DiabetesDiagnosticoYClinicaCabecera = new Object();
    DiabetesDiagnosticoYClinicaCabecera.DiagYclinica_Fecha = $("#fechaDiagnostico").val();
    if ($("#EdadDiagnostico").val() == "") { }
    else { DiabetesDiagnosticoYClinicaCabecera.DiagYclinica_Edad_Diagno = $("#EdadDiagnostico").val(); }

    //objeto diagnostico y clinica detalle
    var listaDiagnosticoYclinica = new Array();
    $(".DiagCli").each(function (index, val) {
        //alert($(val).attr('rell'));
        //return;
        //alert($(val).attr("id"));

        if ($(val).is(":checked")) {
            var DiagnosticoYclinica = new Object();
            DiagnosticoYclinica.Diag_Cli_Items_Id = $(val).val();
            DiagnosticoYclinica.Diag_Cli_Items_Resultado = true;
            // alert("si");
            //return false;
        }
        else {
            if ($("#" + $(val).attr("id") + "no").is(":checked")) {
                //alert("no");
                var DiagnosticoYclinica = new Object();
                DiagnosticoYclinica.Diag_Cli_Items_Id = $(val).val();
                DiagnosticoYclinica.Diag_Cli_Items_Resultado = false;
            }
            //$("#" + $(val).attr("id")).not(":checked") && 
            else {
                if ($("#" + $(val).attr("id")).not(":checked") && $("#" + $(val).attr("id") + "no").not(":checked")) {
                    //alert("no sabe");
                    var DiagnosticoYclinica = new Object();
                    DiagnosticoYclinica.Diag_Cli_Items_Id = $(val).val();
                    DiagnosticoYclinica.Diag_Cli_Items_Resultado = null;
                }
            }
        }

        listaDiagnosticoYclinica.push(DiagnosticoYclinica);
    });
    //return false;

    //objeto complicaciones  detalle
    var ListaComplicaciones = new Array();
    $(".complicaciones").each(function (index, val) {
        //alert($("#Fecha" + $(val).val()).val());
        if ($(val).is(":checked")) {
            var complicaciones = {};
            complicaciones.Complicaciones_Items_Id = $(val).val();
            complicaciones.Complicaciones_Resultado = true;
            if ($("#FechaComplicaciones" + $(val).val()).val() == null) { complicaciones.Complicaciones_Resultado_Fecha = "00/00/0000" } else {
                complicaciones.Complicaciones_Resultado_Fecha = $("#FechaComplicaciones" + $(val).val()).val();
            }
            //alert("si");
        }
        else {
            if (($("#" + $(val).attr("id") + "no").is(":checked"))) {

                var complicaciones = {};
                complicaciones.Complicaciones_Items_Id = $(val).val();
                complicaciones.Complicaciones_Resultado = false;
                if ($("#FechaComplicaciones" + $(val).val()).val() == null) { complicaciones.Complicaciones_Resultado_Fecha = "00/00/0000" } else {
                    complicaciones.Complicaciones_Resultado_Fecha = $("#FechaComplicaciones" + $(val).val()).val();
                }
                //alert("no");
            } else {
                if ($("#" + $(val).attr("id")).not(":checked") && $("#" + $(val).attr("id") + "no").not(":checked")) {
                    //alert("no sabe");
                    var complicaciones = new Object();
                    complicaciones.Complicaciones_Items_Id = $(val).val();
                    complicaciones.Complicaciones_Resultado = null;
                    complicaciones.Complicaciones_Resultado_Fecha = "00/00/0000";
                }
            }
        }

        ListaComplicaciones.push(complicaciones);
    });
    //return false;
    //objeto tartamiento  cabecera
    var TratamientoCabecera = new Object();
    TratamientoCabecera.Diabetes_Gral_Id = IdConsulta;


    $.each(listaInsulinas, function (index, item) {
        if (item.id == $("#cboInsulinaBasal").val()) { TratamientoCabecera.Tratamiento_InsulinaBasal = item.codigo; }
    });
    $.each(listaInsulinas, function (index, item) {
        if (item.id == $("#cboInsulinaCorreccion").val()) { TratamientoCabecera.Tratamiento_Insulina_Correccion = item.codigo; }
    });
    //TratamientoCabecera.Tratamiento_InsulinaBasal = $("#cboInsulinaBasal").val();
    TratamientoCabecera.MarcaComercial_Basal = $("#txtBasalComercial").val();

    //TratamientoCabecera.Tratamiento_Insulina_Correccion = $("#cboInsulinaCorreccion").val();
    TratamientoCabecera.MarcaComercial_Correcion = $("#txtCorreccionComercial ").val();

    //objeto tratamiento  detalle
    var ListaTratamiento = new Array();
    $(".tratamiento").each(function (index, val) {
        //alert($("#Fecha" + $(val).val()).html());
        if ($(val).is(":checked")) {
            var tratamiento = {};
            tratamiento.Tratamiento_Items_Id = $(val).val();
            tratamiento.Tratamiento_Resultados = true;
            //alert("si");
        }
        else {
            if (($("#" + $(val).attr("id") + "no").is(":checked"))) {
                var tratamiento = {};
                tratamiento.Tratamiento_Items_Id = $(val).val();
                tratamiento.Tratamiento_Resultados = false;
                // alert("no");
            } else {
                if ($("#" + $(val).attr("id")).not(":checked") && $("#" + $(val).attr("id") + "no").not(":checked")) {
                    //alert("no sabe");
                    var tratamiento = new Object();
                    tratamiento.Tratamiento_Items_Id = $(val).val();
                    tratamiento.Tratamiento_Resultados = null;
                }
            }
        }
        ListaTratamiento.push(tratamiento);
    });
    //return false;
    //objeto estudios  detalle
    var ListaEstudios = new Array();
    $(".estudios").each(function (index, item) {
        //alert($(item).val().trim().length);
        var estudio = {};
        switch (item.id) {
            case "Estudios5":
                var id = item.id.slice(-1);
                estudio.Estudios_Items_Id = id;
                estudio.Estudios_Resultados = 0;
                estudio.Estudios_Fecha = $("#FechaEstudios" + id).val();
                estudio.Estudios_Combo = $(item).val();
                //alert(estudio.Estudios_Items_Id + "/" + estudio.Estudios_Resultados + "/" + estudio.Estudios_Fecha + "/" + estudio.Estudios_Combo);  
                break;

            case "Estudios9":
                var id = item.id.slice(-1);
                estudio.Estudios_Items_Id = id;
                estudio.Estudios_Resultados = 0;
                estudio.Estudios_Fecha = $("#FechaEstudios" + id).val();
                estudio.Estudios_Combo = $(item).val();
                //alert(estudio.Estudios_Items_Id + "/" + estudio.Estudios_Resultados + "/" + estudio.Estudios_Fecha + "/" + estudio.Estudios_Combo);  
                break;

            case "Estudios10":
                var id = item.id.slice(-2);
                estudio.Estudios_Items_Id = id;
                if ($(item).val().trim().length == 0) {
                    estudio.Estudios_Resultados = 0;
                } else { estudio.Estudios_Resultados = $(item).val() }
                estudio.Estudios_Fecha = $("#FechaEstudios" + id).val();
                estudio.Estudios_Combo = 0;

                break;

            case "Estudios11":
                var id = item.id.slice(-2);
                estudio.Estudios_Items_Id = id;
                if ($(item).val().trim().length == 0) {
                    estudio.Estudios_Resultados = 0;
                } else { estudio.Estudios_Resultados = $(item).val() }
                estudio.Estudios_Fecha = $("#FechaEstudios" + id).val();
                estudio.Estudios_Combo = 0;

                break;

            case "Estudios12":
                var id = item.id.slice(-2);
                estudio.Estudios_Items_Id = id;
                if ($(item).val().trim().length == 0) {
                    estudio.Estudios_Resultados = 0;
                } else { estudio.Estudios_Resultados = $(item).val() }
                estudio.Estudios_Fecha = $("#FechaEstudios" + id).val();
                estudio.Estudios_Combo = 0;

                break;

            default:
                var id = item.id.slice(-1);
                estudio.Estudios_Items_Id = id;
                if ($(item).val().trim().length == 0) {
                    estudio.Estudios_Resultados = 0;
                } else { estudio.Estudios_Resultados = $(item).val() }
                estudio.Estudios_Fecha = $("#FechaEstudios" + id).val();
                estudio.Estudios_Combo = 0;

                break;
        }
        ListaEstudios.push(estudio);
    });

    var json = JSON.stringify({
        "objCabeceraDiabetes": objCabeceraDiabetes
            , "DiabetesDiagnosticoYClinicaCabecera": DiabetesDiagnosticoYClinicaCabecera
            , "listaDiagnosticoYclinica": listaDiagnosticoYclinica
            , "ListaComplicaciones": ListaComplicaciones
            , "TratamientoCabecera": TratamientoCabecera
            , "ListaTratamiento": ListaTratamiento
            , "ListaEstudios": ListaEstudios
    });


    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/GuardarDiabetes",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: exito,
        error: errores

    });
});                                                                                                                                                         // termina guardar

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function exito(resultado) {
    var r = resultado.d;



    IdConsulta = r;
    //alert(IdConsulta);
    alert("Consulta guardada");
    imprimir = 1;
    $("#btnImprimir").attr('disabled', false);
}


function Cargar_Paciente_ID(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/CargarPacienteID",
        data: '{ID: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}


function Cargar_Paciente_Cargado(Resultado) {

    var Paciente = Resultado.d;
    var PError = false;


    $.each(Paciente, function (index, paciente) {

        anos = paciente.Edad_Format.slice(0, 2);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoCuil").html(paciente.cuil);
        $("#CargadoCarnet").html(paciente.carnet);
        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }

        fec = paciente.fec;
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#afiliadoId").val(paciente.documento);
        if (paciente.Nro_Seccional != 998)
            $("#CargadoSeccional").html(paciente.Seccional);
        else $("#CargadoSeccional").html(paciente.ObraSocial);
        //        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        var ruta = "silueta";
        $('#fotopaciente').attr('src', '../img/usuarios/' + ruta + '.jpg');
        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }

    });
}

function VerMas() {
    var ancho = 900;
    var alto = 600;
    var posicion_x = (screen.width / 2) - (ancho / 2);
    var posicion_y = (screen.height / 2) - (alto / 2);
    //var pagina = "../Pacientes/NuevoAfiliado.aspx?Documento=" + $("#CargadoDNI").html();
    var pagina = "../Pacientes/NuevoAfiliado.aspx?ID=" + NHC;
    var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
    window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
}



////////////////////////////////////PAGINA PREVIA////////////////////////////////////////////////////////////////////////////MANUEL

function CargarConsultas() {
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerConsultas",
        data: '{NHC: "' + NHC2 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaMedicamentos_div").empty();
            $("#TablaMedicamentos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaMedicamentos_div").show();
        },
        success: Cargar_Consultas_Cargado,
        error: errores
    });
}

function Cargar_Consultas_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#TablaConsultas").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fecha de Consulta</th><th>Modificación de Consulta</th><th>Médico</th><th>Paciente</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(Lista, function (index, Consulta) {
        var AuxfechaModificacion = "";
        if (Consulta.FechaModificacion == "01/01/1900") { AuxfechaModificacion = ""; } else { AuxfechaModificacion = Consulta.FechaModificacion; }
        Contenido = Contenido + "<tr><td style='cursor:auto;width:131px; text-align:center'>" + Consulta.FechaConsulta + " </td><td style='cursor:auto;width:200px'> " + AuxfechaModificacion + " </td><td style='cursor:auto;width:200px'>" + Consulta.Doctor + "</td><td>" + Consulta.Nombre + " </td><td style='cursor:auto;width:91px'><a class='btn btn-mini btn-success' onclick = 'Atender(" + Consulta.Diabetes_Gral_Id + ")'>Generar Nueva Consulta a partir de esta</a></td>";
        consultaIdNueva = Consulta.Diabetes_Gral_Id;
    });
    var Pie = "</tbody></table>";
    $("#TablaConsultas").html(Encabezado + Contenido + Pie);
}


function Atender(Id) {

    imprimir = 1;
    ///////////////////////////////Modificacion
    //parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes</strong> > <strong>Consultas Médicas</strong> > <strong>Ver Consulta</strong>";
    var Pagina = "AtencionDiabetico.aspx?NHC=" + NHC2 + "&MedicoId=" + MedicoId2 + "&IdConsulta=" + Id + "&imprimir=" + 1 + "&MostrarBtnCancelar=" + ocultarCancelar;
    location.href = Pagina;
    ///////////////////////////////Modificacion
}


function cargar(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/TraerUnaConsulta",
        data: '{id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Consulta_Ver,
        error: errores
    });

}

/////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<
function Cargar_Consulta_Ver(Resultado) {
    var Diabetes = Resultado.d;
    //diagnostico y clinica
    $.each(Diabetes.Diabetes_Diagnostico_Y_Clinica_Resultados_obj, function (index, item) {

        switch (item.Diag_Cli_Items_Resultado) {
            case true:
                $("#Cbo" + item.nombre.replace(/ /g, "_")).attr('checked', item.Diag_Cli_Items_Resultado);
                break;
            case false:
                $("#Cbo" + item.nombre.replace(/ /g, "_") + "no").attr('checked', !item.Diag_Cli_Items_Resultado);
                break;
        }
    });

    if (Diabetes.Diabetes_Diagnostico_Y_Clinica_Cabecera_obj.DiagYclinica_Fecha == "00/00/0000") { }
    else { $("#fechaDiagnostico").val(Diabetes.Diabetes_Diagnostico_Y_Clinica_Cabecera_obj.DiagYclinica_Fecha); }
    $("#EdadDiagnostico").val(Diabetes.Diabetes_Diagnostico_Y_Clinica_Cabecera_obj.DiagYclinica_Edad_Diagno);

    //complicaciones
    $.each(Diabetes.complicaciones_obj, function (index, item) {
        // alert(item.Complicaciones_Resultado);
        switch (item.Complicaciones_Resultado) {
            case true:
                $("#Cbo" + item.nombre.replace(/ /g, "_")).attr('checked', item.Complicaciones_Resultado);
                $("#FechaComplicaciones" + item.Complicaciones_Items_Id).val(item.Complicaciones_Resultado_Fecha);
                $("#FechaComplicaciones" + item.Complicaciones_Items_Id).attr('disabled', false);
                break;
            case false:
                $("#Cbo" + item.nombre.replace(/ /g, "_") + "no").attr('checked', !item.Complicaciones_Resultado);
                $("#FechaComplicaciones" + item.Complicaciones_Items_Id).attr('disabled', true);
                break;
        }

        //$("#FechaComplicaciones" + item.Complicaciones_Items_Id).val(item.Complicaciones_Resultado_Fecha);

    });


    //estudios
    $.each(Diabetes.EstudiosDetalle_obj, function (index, item) {
        // alert(item.Estudios_Items_Id + "/" + item.Estudios_Resultados);
        //alert(item.Estudios_Items_Id);
        switch (item.Estudios_Items_Id) {
            case 5:
                //                    var id = item.Estudios_Items_Id.slice(-1);
                //                    alert(id);
                //alert(item.Estudios_Combo);
                $("#Estudios" + item.Estudios_Items_Id).val(item.Estudios_Combo);
                if (item.Estudios_Combo == 1) { $("#FechaEstudios" + item.Estudios_Items_Id).attr('disabled', true); }
                else { $("#FechaEstudios" + item.Estudios_Items_Id).val(item.Estudios_Fecha); $("#FechaEstudios" + item.Estudios_Items_Id).attr('disabled', false); }
                break;
            case 9:
                //                    var id = item.Estudios_Items_Id.slice(-1);
                //                    alert(id);
                // alert(item.Estudios_Combo);
                $("#Estudios" + item.Estudios_Items_Id).val(item.Estudios_Combo);
                if (item.Estudios_Combo == 1) { $("#FechaEstudios" + item.Estudios_Items_Id).attr('disabled', true); }
                else { $("#FechaEstudios" + item.Estudios_Items_Id).val(item.Estudios_Fecha); $("#FechaEstudios" + item.Estudios_Items_Id).attr('disabled', false); }
                break;
            default:
                //alert(item.Estudios_Combo);
                //                    var id = item.Estudios_Items_Id.slice(-1);
                //                    alert(id);
                // alert(item.Estudios_Items_Id + "/" + item.Estudios_Resultados);
                if (item.Estudios_Resultados == 0) { item.Estudios_Resultados = ""; } else { }
                $("#Estudios" + item.Estudios_Items_Id).val(item.Estudios_Resultados);
                if (item.Estudios_Resultados == 0) { $("#FechaEstudios" + item.Estudios_Items_Id).attr('disabled', true); }
                else {
                    $("#FechaEstudios" + item.Estudios_Items_Id).val(item.Estudios_Fecha);
                    $("#FechaEstudios" + item.Estudios_Items_Id).attr('disabled', false);
                }
                break;
        }
    });

    //tratamieto
    $.each(Diabetes.trataientoDetalle_obj, function (index, item) {
        switch (item.Tratamiento_Resultados) {
            case true:
                $("#Cbo" + item.nombre.replace(/ /g, "_")).attr('checked', item.Tratamiento_Resultados);
                break;
            case false:
                $("#Cbo" + item.nombre.replace(/ /g, "_") + "no").attr('checked', !item.Tratamiento_Resultados);
                break;
        }
    });

    if (Diabetes.tratamiento_obj.Tratamiento_InsulinaBasal != 0) { $("#txtBasalComercial").attr('disabled', true); }

    $.each(listaInsulinas, function (index, item) {
        if (item.codigo == Diabetes.tratamiento_obj.Tratamiento_InsulinaBasal) {
            $("#cboInsulinaBasal").val(item.id);
        }
        // $("#cboInsulinaBasal").val(item.id); }
    });

    //$("#cboInsulinaBasal").val(Diabetes.tratamiento_obj.Tratamiento_InsulinaBasal);
    $("#txtBasalComercial").val(Diabetes.tratamiento_obj.MarcaComercial_Basal);

    if (Diabetes.tratamiento_obj.Tratamiento_Insulina_Correccion != 0) { $("#txtCorreccionComercial").attr('disabled', true); }

    $.each(listaInsulinas, function (index, item) {

        if (item.codigo == Diabetes.tratamiento_obj.Tratamiento_Insulina_Correccion) {

            $("#cboInsulinaCorreccion").val(item.id);
        }
    });

    //$("#cboInsulinaCorreccion").val(Diabetes.tratamiento_obj.Tratamiento_Insulina_Correccion);
    $("#txtCorreccionComercial").val(Diabetes.tratamiento_obj.MarcaComercial_Correcion);
}

function NuevaConsulta() {
    imprimir = 1;
    //    alert(NHC2);
    //    alert(MedicoId2);
    //    var Pagina = "AtencionDiabetico.aspx?NHC=" + NHC2 + "&MedicoId=" + MedicoId2 + " " + "&imprimir=" + 0;
    //    location.href = Pagina;
    //consultaIdNueva
    var Pagina = "AtencionDiabetico.aspx?NHC=" + NHC2 + "&MedicoId=" + MedicoId2 + "&IdConsulta=" + 0 + "&imprimir=" + 0 + "&MostrarBtnCancelar=" + ocultarCancelar;
    location.href = Pagina;

    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes</strong> > <strong>Consultas Médicas</strong> > <strong>Nueva Consulta</strong>";
}

function Eliminar(id) {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/DiabetesEliminarUnaConsulta",
        data: '{id: "' + id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConsultas,
        error: errores
    });

}

function CerrarVentana() {
    $.fancybox.close
}

var MedicoID = "";
var EspecialidadId = "";
var Fecha = "";
var Hora = "";

$("#btnImprimir").click(function () {
    if (imprimir == 0)
    { return; }

    $.fancybox({
        'autoDimensions': false,
        //                    'href': '../Impresiones/ImpresionTurno.aspx?MedicoId=' + MedicoID + '&EspecialidadId=' + EspecialidadId + '&Fecha=' + Fecha + ' ' + Hora,
        'href': "../Impresiones/Diabetes_Impresion_Consulta.aspx?IdConsulta=" + IdConsulta,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'elastic',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false,
        'preload': true,
        'onComplete': function f() {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function () {
                jQuery.fancybox.hideActivity();
            });
        }
    });
});


///////////////////////////////////////llamar a pagina de recetas

$("#btnRecetas").click(function () {
    document.location = "Listar_Recetas_Diabeticos.aspx?NHC=" + NHC2 + "&MostrarBtnCancelar=" + ocultarCancelar;

    //    var Pagina = "AtencionDiabetico.aspx?NHC=" + NHC2 + "&MedicoId=" + MedicoId2 + "&IdConsulta=" + Id;
});

function cargarComboPresentaciones(control, seCorresponde, url) {

    $.ajax({
        type: "POST",
        url: url,
        data: '{seCorresponde: "' + seCorresponde + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {


            $("#txtMetforminaP").val(txtMetforminaP);

            $("#txtGlimeripideP").val(txtGlimeripideP);

            $("#txtGlicazidaP").val(txtGlicazidaP);

            $("#txtGlibenclamidaP").val(txtGlibenclamidaP);

            $("#txtInsulinaNPHDosisP").val(txtInsulinaNPHDosisP);

            $("#txtInsulinaCorrienteP").val(txtInsulinaCorrienteP);

            $("#txtInsulinaAsparticaBifàsicaP").val(txtInsulinaAsparticaBifàsicaP);

            $("#txtInsulinaLispro7525P").val(txtInsulinaLispro7525P);
            $("#txtInsulinaLispro5050P").val(txtInsulinaLispro5050P);
        },
        success: CargarCombo,
        error: errores
    });

    function CargarCombo(resultado) {
        var l = resultado.d;

        $.each(l, function (index, res) {

            $("#" + control + "").append(new Option(res.presentacion, res.id));
        });
    }
}









function VerificarUltimaAtencion()
{
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Diabetologia_DiasDesdeUltimaAtencion",
        data: '{NHC: "' + NHC2 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",        
        success: FechaUltimaAtencion,
        error: errores
    });

    function FechaUltimaAtencion(resultado) {
        var l = resultado.d;
        if (l > 180) {
            $("#btnRecetas").hide();
            alert("La ultima consulta ha superado los 6 meses. Es necesario cargar una nueva orden para utilizar las recetas.");
            return;
        }    
    }
}

