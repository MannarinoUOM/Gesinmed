var G_FACT_NOMENCLA_ID = 0;

function InitControls() {
    $(".date").mask("99/99/9999", { placeholder: "-" });
    $(".date").datepicker();
    BuscarNomencladores(true); //Muestro todos
    CargarConvenios();
}

$(document).ready(function () {
    InitControls();
});

function CargarConvenios() {
    var json = JSON.stringify({ "Convenio": "" });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/VerlosConvenios",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Convenios = Resultado.d;
            $('#FACT_CONVENIO_ID').append($('<option></option>').val("").html("Seleccione Convenio...")); 
            $.each(Convenios, function (index, conv) {
                $('#FACT_CONVENIO_ID').append($('<option></option>').val(conv.id).html(conv.convenios)); 
            });
        },
        error: errores
    });
}

function BuscarNomencladores(Todos) {
    var json = JSON.stringify({ "Todos": Todos, "ConvenioId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/FACT_NOMENCLA_LIST",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarConvenios_Cargado,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaBonos").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaBonos").show();
        }
    });

}

function CargarConvenios_Cargado(Resultado) {
    var Nomencladores = Resultado.d;
    var Tabla_Datos = "";
    $("#TConvenios").empty();

    $.each(Nomencladores, function (index, nom) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + nom.FACT_NOMENCLA_ID + ");";
        Tabla_Datos = Tabla_Datos + "><td id='FACT_NOMENCLA_ID" + nom.FACT_NOMENCLA_ID + "'>" + nom.FACT_NOMENCLA_ID + "</td><td style='display:none;' id='FACT_CONVENIO_ID" + nom.FACT_NOMENCLA_ID + "'>" + nom.FACT_CONVENIO_ID + "</td><td>" + nom.FACT_CONVENIO + "</td><td style='display:none;' id='FACT_CONVENIO_ID" + nom.FACT_NOMENCLA_ID + "'>" + nom.FACT_CONVENIO_ID + "</td><td id='FACT_NOMENCLA_DESDE" + nom.FACT_NOMENCLA_ID + "'>" + nom.FACT_NOMENCLA_DESDE + "</td><td id='FACT_NOMENCLA_HASTA" + nom.FACT_NOMENCLA_ID + "'>" + nom.FACT_NOMENCLA_HASTA + "</td><td id='FACT_NOMENCLA_DESC" + nom.FACT_NOMENCLA_ID + "'>" + nom.FACT_NOMENCLA_DESC + "</td><td id='FACT_NOMENCLA_BAJA" + nom.FACT_NOMENCLA_ID + "'>" + VerBaja(nom.FACT_NOMENCLA_BAJA) + "</td></tr>";
    });

    $("#TConvenios").html(Tabla_Datos);
}

function VerBaja(Baja) {
    if (Baja == false) return 'NO';
    else return 'SI';
}

function Editar(Id) {
    G_FACT_NOMENCLA_ID = Id;
    $("#FACT_CONVENIO_ID").val($("#FACT_CONVENIO_ID" + Id).html());
    $("#FACT_NOMENCLA_DESDE").val($("#FACT_NOMENCLA_DESDE" + Id).html());
    $("#FACT_NOMENCLA_HASTA").val($("#FACT_NOMENCLA_HASTA" + Id).html());
    if ($("#FACT_NOMENCLA_BAJA" + Id).html() == "SI")
        $("#FACT_NOMENCLA_BAJA").attr("checked", true);
    else $("#FACT_NOMENCLA_BAJA").removeAttr("checked");
    $("#FACT_NOMENCLA_DESC").val($("#FACT_NOMENCLA_DESC" + Id).html());
    $("#btnQuitar").show();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function NomenclaObj_Baja() {
    var nom = {};
    nom.FACT_NOMENCLA_ID = G_FACT_NOMENCLA_ID;
    nom.FACT_CONVENIO_ID = $("#FACT_CONVENIO_ID :selected").val();
    nom.FACT_NOMENCLA_DESDE = $("#FACT_NOMENCLA_DESDE").val();
    nom.FACT_NOMENCLA_HASTA = $("#FACT_NOMENCLA_HASTA").val();
    nom.FACT_NOMENCLA_DESC = $("#FACT_NOMENCLA_DESC").val().trim().toUpperCase();
    nom.FACT_NOMENCLA_BAJA = true;
    return nom;
}

$("#btnQuitar").click(function () {
    if (confirm("¿Desea dar de baja nomenclador?")) {
        if (G_FACT_NOMENCLA_ID <= 0) { alert("Seleccione Nomenclador."); return false; }
        var json = JSON.stringify({ "nomencla": NomenclaObj_Baja() });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/FACT_NOMENCLA_INSERT",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                alert("Nomenclador dado de baja.");
                BuscarNomencladores(true);
                Limpiar();
            },
            error: errores
        });
    }
});

function Limpiar() {
    G_FACT_NOMENCLA_ID = 0;
    $(".datos").val("");
    $("#FACT_NOMENCLA_BAJA").removeAttr("checked");
    $("#btnQuitar").hide();
}

$("#btnCancelar").click(function () {
    Limpiar();
});

function NomenclaObj() {
    var nom = {};
    nom.FACT_NOMENCLA_ID = G_FACT_NOMENCLA_ID;
    nom.FACT_CONVENIO_ID = $("#FACT_CONVENIO_ID :selected").val();
    nom.FACT_NOMENCLA_DESDE = $("#FACT_NOMENCLA_DESDE").val();
    nom.FACT_NOMENCLA_HASTA = $("#FACT_NOMENCLA_HASTA").val();
    nom.FACT_NOMENCLA_DESC = $("#FACT_NOMENCLA_DESC").val().trim().toUpperCase();
    nom.FACT_NOMENCLA_BAJA = $("#FACT_NOMENCLA_BAJA").is(":checked");
    return nom;
}

$("#btnGuardar").click(function () {
    if (confirm("¿Desea guardar nomenclador?")) {
        var json = JSON.stringify({ "nomencla": NomenclaObj() });

        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/FACT_NOMENCLA_INSERT",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d > 0) {
                    alert("Nomenclador guardado.");
                    Limpiar();
                    BuscarNomencladores(true);
                }
                else alert("Error al guardar nomenclador.");
            },
            error: errores
        });
    }
});