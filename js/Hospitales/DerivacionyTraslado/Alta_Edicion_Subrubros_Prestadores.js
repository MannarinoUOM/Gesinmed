var id  = 0;
var GET = {};
var titulo = 0;

$(document).ready(function () {
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["titulo"] != "" && GET["titulo"] != null) {
        titulo = GET["titulo"];
        if (titulo == 1) {
            $("#titulo").html("Alta y Edición de Subrubros");
            $("#lblDinamica").html("Subrubros");
            cargarSubrubro();
            $("#Ext").show();
        } else {
            $("#titulo").html("Alta y Edición de Prestadores");
            $("#lblDinamica").html("Prestadores");
            cargarPrestadores();
            $("#Ext").hide();
        }
    }
});


function cargarSubrubro() {
    $("#cboDinamico").empty();
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerSubrubrosCombo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            listaModulos = Resultado.d;
            $("#cboDinamico").append(new Option("Crear Nuevo Subrubro", 0));
            $.each(listaModulos, function (index, item) {
                //cboDinamico").append(new Option(item.nombre, item.id, title = "holaaa"));
                $("#cboDinamico").append('<option value="'+ item.id +'" title="' + item.externo + '">'+ item.nombre +'</option>');
                
            });
        }
    }); 
}

function cargarPrestadores() {
    $("#cboDinamico").empty();
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPrestadoresCombo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            listaPrestadores = Resultado.d;
            $("#cboDinamico").append(new Option("Crear Nuevo Prestador",0));
            $.each(listaPrestadores, function (index, item) {
                $("#cboDinamico").append(new Option(item.nombre, item.id));
            });
        }
    });

}

$("#cboDinamico").change(function () {
    id = $("#cboDinamico").val();
    if ($('#cboDinamico option:selected').val() > 0) {
        $("#txtNombre").val($('#cboDinamico option:selected').html());
        if ($('#cboDinamico option:selected').attr('title') == 1) { $("#chkExterno").attr('checked', true); } else { $("#chkExterno").attr('checked', false); }
    } else { $("#txtNombre").val(""); }
});


$("#BtnAceptar").click(function () {
var externo = 0;
    if ($("#cboDinamico").val() == 0 && $("#txtNombre").val().trim().length == 0) { alert("Ingrese el nombre del nuevo item."); return false; }
    if ($("#cboDinamico").val() > 0 && $("#txtNombre").val().trim().length == 0) { alert("Ingrese el nuevo nombre del item."); return false; }

    if($("#chkExterno").is(':checked')){
    externo = 1;}
    else{
    externo = 0;}

    if (titulo == 1) {
        var json = JSON.stringify({ "id": id, "descripcion": $("#txtNombre").val(), "externo": externo });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarActulizarSubrubro",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                $("#txtNombre").val("");
                id = 0;
                cargarSubrubro();
                alert("Guardado");
            }
        });
    } else {
        var json = JSON.stringify({ "id": id, "descripcion": $("#txtNombre").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarActulizarPrestadores",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                $("#txtNombre").val("");
                id = 0;
                cargarPrestadores();
                alert("Guardado");
            }
        });
    }
});
