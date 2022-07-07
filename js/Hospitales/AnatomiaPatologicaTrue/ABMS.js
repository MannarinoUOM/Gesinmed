var opcion = 0;
var titulo = "";
var idtopo = 0;
var GET = {};
var metodo = "";

$(document).ready(function () {
    $("#busqueda").focus();
    opcion = 1;
    $("#1").attr('checked', true);
});

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});


if (GET["titulo"] != "" && GET["titulo"] != null) {
    titulo = GET["titulo"];

    switch (titulo) {
        case "Procedimientos":
            metodo = "PatoProcedimientosListado";
            break;

        case "Material":
            //titulo = "Topografias";
            metodo = "PatoMaterialTopografiasListado";
            //            $("#1").click();
            //            $("#busqueda").attr('disabled', false);
            //            $("#busqueda").focus();
            //            opcion = 2;
            break;

        case "Métodos":
            metodo = "PatoMetodosListado";
//            $("#2").click();
//            $("#busqueda").attr('disabled', false);
//            $("#busqueda").focus();  
//            opcion = 1;
            break;

        case "Técnicas":
            metodo = "traerTecnicas";
            $("#txtCodigo").attr('disabled', true);
            break;

        case "Nomenclador":
            metodo = "traerNomenclador";
            $("#txtCodigo").attr('disabled', true);
            break;

        case "Diagnósticos":
            metodo = "PatoDiagnosticosListado";
            $("#txtCodigo").attr('disabled', true);
           // $("#txtCodigo").attr('disabled', true);
            break;
     }

    switch (titulo){
        case "Nomenclador":
            $("#titulo").html("Alta y Edición de " + titulo + " Nacional");
            $("#txtDescripcion").css('width', '30%');
            $("#lblPrecio").css('display', 'inline');
            $("#txtPrecio").show();
            break;
    case "Técnicas":
        $("#titulo").html("Alta y Edición de " + titulo + " Especiales");
        break;
    case "Diagnósticos":
        $("#titulo").html("Alta y Edición de Códigos de Diagnóstico");
        break;
    default:
        $("#titulo").html("Alta y Edición de " + titulo);
        break;
     }
    if (GET["mostrar"] != "" && GET["mostrar"] != null) {
    var mostrar = GET["mostrar"];
    if (mostrar != 0) {
        switch (titulo) {
            case "Nomenclador":
                parent.document.getElementById("DondeEstoy").innerHTML = "Patología > <strong>Alta y Edición de " + titulo + " Nacional</strong>";
                break;
            case "Técnicas":
                parent.document.getElementById("DondeEstoy").innerHTML = "Patología > <strong>Alta y Edición de " + titulo + " Especiales</strong>";
                break;
            case "Diagnósticos":
                parent.document.getElementById("DondeEstoy").innerHTML = "Patología > <strong>Alta y Edición de Códigos de Diagnóstico</strong>";
                break;
            default:
                parent.document.getElementById("DondeEstoy").innerHTML = "Patología > <strong>Alta y Edición de " + titulo + "</strong>";
                break;
        }
    }
    }
    if (titulo == "Métodos") {
        $("#txtCodigo").attr('disabled', true);
        $("#txtDescripcion").attr('maxlength', 500);
    }
}

//$("#busqueda").attr('disabled', true);
$(".seleccion").click(function () {
    $("#busqueda").val("");
    if ($(this).attr('id') > 0)
    { $("#busqueda").attr('disabled', false); }
    else
    { $("#busqueda").attr('disabled', true); }
    opcion = $(this).attr('id');
    //alert(opcion);
    cargar();
});

$("#busqueda").keyup(function () {
    if ($(this).val().trim().length >= 1) { cargar(); }



    if ($(this).val().trim().length == 0) {
        cargar();
    }
});


cargar();

function cargar() {
    var json = JSON.stringify({ "tipo": opcion, "busqueda": $("#busqueda").val() });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/" + metodo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaMedicamentos_div").empty();
            $("#TablaMedicamentos_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaMedicamentos_div").show();
        },
        success: function (resultado) {
            var lista = resultado.d;
            if (lista.length == 0) { $("#mensaje").show() } else { $("#mensaje").hide() }
            cargarLista(lista);
        },
        error: errores
    });
}
function cargarLista(lista) {
   
        $("#tablaTopografias").empty();
        var Encabezado = "<table class='table table-condensed' style='width: 100%;overflow:auto'><thead></thead><tbody>";
        var Contenido = "";
        $.each(lista, function (index, item) {
            var n = item.codigo;
            var p = "";
            if (titulo == "Técnicas" || titulo == "Nomenclador") { n = item.id; }
            if (titulo == "Nomenclador") { p = item.precio; }
            Contenido = Contenido + "<tr style='height:20px; cursor:default' id='fila" + item.id + "'>" +
           "<td style='cursor:default'>" +
           "<a class='btn btn-mini btn-success' onclick='editar(" + item.id + ")' ><i class='icon-edit'></i></a>" +
           "<a class='btn btn-mini btn-danger' onclick='eliminar(" + item.id + ")' style='display:none'><i class='icon-remove-circle icon-white'></i></a>" +
           "<label id='codigo" + item.id + "' style='display:inline'>" + n + "</label></td>" +
           "<td id='descripcion" + item.id + "' style='width:60%;cursor:default'>" + item.descripcion +
           "<td id='precio" + item.id + "' style='text-align:right'>" + p + "</td>" + "</div></td>"

        });
        var Pie = "</tbody></table>";
        $("#tablaTopografias").html(Encabezado + Contenido + Pie);
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function eliminar(id) {
    $("#btncancelarEdicion").click();
    var r = confirm("Desea eliminar " + $("#descripcion" + id).html().toString().toUpperCase());
    if (r == false) {
        return false; 
    }

    var json = JSON.stringify({ "id": id });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/eliminar" + titulo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        beforeSend: function () {
            $("#cargando").show();
            $("#TablaMedicamentos_div").empty();
            $("#TablaMedicamentos_div").hide();
        },
        complete: function () {
            alert("Borrado!");
            cargar();
        },
        error: errores
    });
}

function editar(id) {
    $("#btnGuardar").html("<i class='icon-thumbs-up icon-white'></i>&nbsp;Confirmar Edición");
    $("#btnGuardar").addClass('btn-success');
    $("#btncancelarEdicion").show();
    $("#txtDescripcion").val($("#descripcion" + id).html());
    $("#txtCodigo").val($("#codigo" + id).html());
    if (titulo == "Nomenclador")
        $("#txtPrecio").val($("#precio" + id).html());

    idtopo = id;
    }

    $("#btnGuardar").click(function () {
        var r = 0;
        var seguir = 1;

        if (titulo == "Nomenclador")
            if ($("#txtPrecio").val().trim().length <= 0) { seguir = 0; alert("Ingrese un precio."); }

        if (titulo == "Nomenclador" || titulo == "Métodos" || titulo == "Diagnósticos" || titulo == "Técnicas")
            if ($("#txtDescripcion").val().trim().length <= 0) { seguir = 0; alert("Ingrese una descripción."); }


        if (titulo == "Material" || titulo == "Procedimientos")
            if ($("#txtDescripcion").val().trim().length <= 0 || $("#txtCodigo").val().trim().length <= 0) { seguir = 0; alert("Ingrese una descripción y código."); }

        if (titulo == "Métodos")
            titulo = "Metodos";


        if (titulo == "Diagnósticos")
            titulo = "Diagnosticos";

        if (titulo == "Técnicas")
            titulo = "Tecnicas";

        if (seguir == 0)
            return false;

        var json = JSON.stringify({ "id": idtopo, "codigo": $("#txtCodigo").val(), "descripcion": $("#txtDescripcion").val(), "precio": $("#txtPrecio").val() });
        $.ajax({
            type: "POST",
            url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/guardarEditar" + titulo,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaMedicamentos_div").empty();
                $("#TablaMedicamentos_div").hide();
            },
            success: function (resultado) { r = resultado.d; },
            complete: function () {
                if (r == -1) { alert("El codigo ya existe."); } else {
                    alert("Guardado!");
                    $("#btncancelarEdicion").click();
                    cargar();
                    if (titulo == "Tecnicas")
                        titulo = "Técnicas";
                }
            },
            error: errores
        });
    });

$("#btncancelarEdicion").click(function () {
    idtopo = 0;
    $("#txtDescripcion").val("");
    $("#txtCodigo").val("");
    $(this).hide();
    $("#btnGuardar").html("<i class='icon-ok icon-white'></i>&nbsp;Guardar");
    $("#btnGuardar").removeClass('btn-success');
    $("#btnGuardar").addClass('btn-warning');
});

$("#txtCodigo").keydown(function () {
    this.style.textTransform = 'uppercase';
});