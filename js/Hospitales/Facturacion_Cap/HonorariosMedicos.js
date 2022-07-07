var Medicos;

$(document).ready(function () {
    $("#frm").validate({
        rules: {
            'txtFechaInicio': { required: true, dateES: true },
            'txtFechaFin': { required: true, dateES: true }
        },
        messages: {
            'txtFechaInicio': { required: '', dateES: '' },
            'txtFechaFin': { required: '', dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            //RemoveClass();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    List_Medicos();
    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();
    $("#txtFechaInicio").val(FechaActual());
    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").val(FechaActual_2(1));
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
});

function FechaActual_2(e) {
    var currentDt = new Date();
    var yyyy = currentDt.getFullYear();
    var mm = currentDt.getMonth() + 1 + e;
    if (parseInt(mm) <= 0) {
        yyyy = parseInt(yyyy) - 1;
        mm = 12 + parseInt(mm);
    }
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var date = '01' + '/' + mm + '/' + yyyy;
    return (date);
}

$("#btnBuscar").click(function () {
    if ($("#frm").valid()) {
        if ($("#cbo_Todos_Med").is(":checked")) {
            var url = "../Impresiones/ImpresionFactHonorarios.aspx?Desde=" + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&MedicoId=" + '0';
            Ventana(url);
        }
        else RecorrerMedicos();
    }
    else alert("Ingrese Correctamente la Fecha");
});

function RecorrerMedicos() {
    Medicos = "";
    var i = 0;
    var size = $(".checkstable").size();
    $(".checkstable").each(function () {
        i = i + 1;
        if ($(this).hasClass("active")) {
            var MedicoId = $(this).attr("rel");
            Medicos = Medicos + "," + MedicoId;
        }
        if (i == size - 1) Buscar();
    });
}

function Buscar() {
    var url = "../Impresiones/ImpresionFactHonorarios.aspx?Desde=" + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&MedicoId=" + Medicos;
    Ventana(url);
}




function Ventana(url) {

    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
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

function List_Medicos() {
    var json = JSON.stringify({ "Id": 0});
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar_Info_Todos",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    var i = 0;
    var Contenido = "";
    //var Contenido = "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstableIns' onclick='toggle_check(this)' id='chkNS' rel ='' >---NINGUNA---</label>";
    $.each(Lista, function (index, Medico) {
        Contenido = Contenido + "<label style='text-align:left;' class='checkbox'><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + i + "' rel='" + Medico.Id + "'>" + Medico.Medico + "</label>";
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#FiltroMedicos").html(Contenido);
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function toggle_check(chk) {
    if ($(chk).is(":checked")) {
        $(chk).attr("checked", "checked");
        $(chk).addClass("active");
    }
    else {
        $(chk).removeAttr("checked");
        $(chk).removeClass("active");
    }
}

function toggle_checks(chk) {
    if ($(chk).is(":checked")) {
        $(".checkstable").attr("checked", "checked");
        $(".checkstable").attr("disabled", "disabled");
        $(".checkstable").addClass("active");
    }
    else {
        $(".checkstable").removeAttr("checked");
        $(".checkstable").removeAttr("disabled");
        $(".checkstable").removeClass("active");
    }
}