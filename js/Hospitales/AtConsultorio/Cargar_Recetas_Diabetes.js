var NHC = "";
var NHC2 = "";
var listFarmacos = new Array();
var Encabezado = "";
var Contenido = "";
var Pie = "";
var idReceta = 0;
var imprimir = 0;
var visible = false;

$(document).ready(function () {
    //    alert("ready");
 

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

    if (GET["idReceta"] != "" && GET["idReceta"] != null) {
        if (GET["idpaciente"] != "" && GET["idpaciente"] != null) {

            idReceta = GET["idReceta"];
            NHC = GET["idpaciente"];
//            alert(idReceta);
//            alert(NHC);
            Cargar_Paciente_NHC(NHC); //////////////cargar encabezado
            $("#fotopaciente").attr("src", NHC);
            NHC2 = NHC;
            cargarCombo();
            cargarUnaReceta(idReceta);
            
//            alert("entro a editar");
        }
    }
    else {
        if (GET["idpaciente"] != "" && GET["idpaciente"] != null) {
            //        alert("entro al if");
            NHC = GET["idpaciente"];
            Cargar_Paciente_NHC(NHC); //////////////cargar encabezado
            $("#fotopaciente").attr("src", NHC);
            NHC2 = NHC;
//            alert("entro a nueva");
            cargarCombo();
            cargarMedico();
        }

    }
    if(GET["imprimir"] == 1){
    imprimir = GET["imprimir"];
     $("#btnImprimir").attr('disabled', false);
    }

});

    function Cargar_Paciente_NHC(NHC) {

        $.ajax({
            type: "POST",
            url: "../Json/DarTurnos.asmx/CargarPacienteID",
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

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
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

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    function cargarCombo() {
        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/cargarCombos",
            contentType: "application/json; charset=utf-8",
            success: cargar_Combo_Cargado,
            error: errores

        });
    }


    function cargar_Combo_Cargado(resultado) {
        var l = resultado.d;

        $.each(l, function (index, res) {

            $("#cbo_farmacos").append(new Option(res.nombre, res.id));

        });
        $("#cbo_farmacos").append(new Option("Otro", "0"));


    }



    function Cargar_Combo_defecto()
    {
    
        if ($('#cbo_farmacos option:selected').val() == "0") {
        $("#cboPresentacion").html("");
        visible = true;
            $("#mostrar").fadeIn(1000);      
           // $("#txtOtroNombre").fadeIn(1000);
            $("#mostrar").show();
            $("#txtOtroNombre").show(); 
            $("#contieneTabla").css('height','151px');
 
}
          else {  
           $("#cboPresentacion").html("");
           visible = true;
            $("#contieneTabla").css('height','181px');
            $("#txtOtroNombre").hide();
            $("#mostrar").hide();
           $("#mostrar").fadeOut();
  $("#mostrar").fadeOut("slow");
  $("#mostrar").fadeOut(3000);

        }


switch ($('#cbo_farmacos option:selected').val()){
case "16" :
$("#cboPresentacion").html("");
  cargarComboPresentaciones("cboPresentacion", "50/50", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "6" :
$("#cboPresentacion").html("");
  cargarComboPresentaciones("cboPresentacion", "glimeripide", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;

case "3" :
$("#cboPresentacion").html("");
 cargarComboPresentaciones("cboPresentacion", "glicazida", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "1" :
$("#cboPresentacion").html("");
    cargarComboPresentaciones("cboPresentacion", "glibenclamida", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "2" :
$("#cboPresentacion").html("");
cargarComboPresentaciones("cboPresentacion", "metformina", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "5" :
$("#cboPresentacion").html("");
cargarComboPresentaciones("cboPresentacion", "insulinaCorriente", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "14" :
$("#cboPresentacion").html("");
  cargarComboPresentaciones("cboPresentacion", "bifasica", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "4" :
$("#cboPresentacion").html("");
 cargarComboPresentaciones("cboPresentacion", "insulinaNph", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "15" :
$("#cboPresentacion").html("");
 cargarComboPresentaciones("cboPresentacion", "75/25", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;

case "42" :
$("#cboPresentacion").html("");
 cargarComboPresentaciones("cboPresentacion", "insulinaNph/cte", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "39" :
$("#cboPresentacion").html("");
 cargarComboPresentaciones("cboPresentacion", "repaglinida", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "40" :
$("#cboPresentacion").html("");
 cargarComboPresentaciones("cboPresentacion", "pioglitazona", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
case "41" :
$("#cboPresentacion").html("");
 cargarComboPresentaciones("cboPresentacion", "rosiglitazona", "../Json/AtConsultorio/AtConsultorio.asmx/traerPresentacionesDiabetes");
$("#txtPresentacion").hide();
visible = false;
$("#cboPresentacion").show();
break;
default :
$("#txtPresentacion").show();
$("#cboPresentacion").hide();
visible = true;
break

}
    }


    $("#cbo_farmacos").change(function () {
    Cargar_Combo_defecto();
    });

    $("#btnAgregarFarmaco").click(function () {
    imprimir = 0;
     $("#btnImprimir").attr('disabled', true);
        if ($("#txtPresentacion").val().trim().length == 0 && visible == true) {
            //      alert()  || $("#txtPresentacion").val() == "" || $("#txtPresentacion").val() == "") {

            alert("Ingrese Presentación!");
            $("#txtPresentacion").val($("#txtPresentacion").val().trim().toupper());

            return;
        }
        if ($("#txtDosis").val().trim().length == 0) {

            alert("Ingrese Dosis!");
            $("#txtDosis").val($("#txtDosis").val().trim());
            return;
        }

        if ($("#txtmg").val().trim().length == 0) {

            alert("Ingrese Mg x Día!");
            $("#txtmg").val($("#txtmg").val().trim());
            return;
        }

        if ($('#cbo_farmacos option:selected').val() == 0) {
            if ($("#txtOtroNombre").val().trim().length == 0) {

                alert("Ingrese un Nombre!");
                $("#txtOtroNombre").val($("#txtOtroNombre").val().trim());
                return;
            }
        }

        var obj = {};
        obj.id = $('#cbo_farmacos option:selected').val();
        obj.nombre = "";

        if(visible == true){
        obj.presentacion = $("#txtPresentacion").val();}
        else{
        obj.presentacion = $('#cboPresentacion option:selected').text();

        }
        obj.dosis = $("#txtDosis").val();
        obj.mg = $("#txtmg").val();
        obj.antiguedad = $("#txtAntiguedad").val();
        //    obj.otro = $('#txtOtroNombre').val();
        obj.estado = 1;
        var index = listFarmacos.length;
//        alert(index);
        var Encabezado = "";
        var Contenido = "";
        var Pie = "";

        if ($('#cbo_farmacos option:selected').val() != 0)
        { obj.nombre = $('#cbo_farmacos option:selected').html() }
        else { obj.nombre = $('#txtOtroNombre').val(); }


        listFarmacos[index] = obj;

        $("#farmacosLista").empty();

        $.each(listFarmacos, function (index, item) {

            Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fármacos</th><th>Presentación</th><th>Dosis</th><th>Mg x Día/UI</th></tr></thead><tbody>";

            Contenido = Contenido + "<tr><td style='cursor:auto'>" + item.nombre.toUpperCase() + " </td><td style='cursor:auto'> " + item.presentacion.toUpperCase() + " </td><td style='cursor:auto'>" + item.dosis.toUpperCase() + "</td><td style='cursor:auto'> " + item.mg.toUpperCase() + "</td><td><a class='btn btn-mini btn-danger'  onclick = 'EliminarFarmaco(" + index + ")'>Eliminar Fármaco</a></td>";

            Pie = "</tbody></table>";

        });
        $("#farmacosLista").html(Encabezado + Contenido + Pie);
    });

    function EliminarFarmaco(far) {

    imprimir = 0;
    $("#btnImprimir").attr('disabled', true);
        listFarmacos.splice(far, 1)
//        alert("elimino");

        $("#farmacosLista").empty();

        Encabezado = "";
        Contenido = "";
        Pie = "";
        $.each(listFarmacos, function (index, item) {

            Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fármacos</th><th>Presentación</th><th>Dosis</th><th>Mg x Día/UI</th></tr></thead><tbody>";

            Contenido = Contenido + "<tr><td style='cursor:auto'>" + item.nombre.toUpperCase() + " </td><td style='cursor:auto'> " + item.presentacion.toUpperCase() + " </td><td style='cursor:auto'>" + item.dosis.toUpperCase() + "</td><td style='cursor:auto'> " + item.mg +  "</td><td style='cursor:auto'><a class='btn btn-mini btn-danger'  onclick = 'EliminarFarmaco(" + index + ")'>Eliminar Receta</a></td><td> ";
           Pie = "</tbody></table>";

        });
        $("#farmacosLista").html(Encabezado + Contenido + Pie);

    }


    $("#btnGuardar").click(function () {
        if ($("#txtMedico").val() == "") {
            alert("Debe Ingresar un Medico!");
            return;
        }
        if (listFarmacos.length == 0) {
            alert("Cargue algún Farmaco!");
            return;
        }

        var jsonRecetaEncavezado = JSON.stringify({
            "idReceta": idReceta,
            "idPaciente": NHC,
            "idUsuario": 0,
            "medico": $("#txtMedico").val(),
            "vigencia": $('#cboVigencia option:selected').val(),
            "observaciones": $("#txtObservsaciones").val()
        });

        $.ajax({
            type: "POST",
            url: "../Json/AtConsultorio/AtConsultorio.asmx/AtencionDiabetesGuardarFarmacosRecetaEncavezado",
            data: jsonRecetaEncavezado,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: exito,
            complete: cargarDetalleReceta,
            error: errores

        });

    });
        function exito(resultado) {
             idReceta = resultado.d;
        }

    function cargarDetalleReceta() {

        var jsonFarmacosDetalle = JSON.stringify({
                    
                        "idReceta": idReceta,
                        "farmacos": listFarmacos,

                    });

                                $.ajax({
                                    type: "POST",
                                    url: "../Json/AtConsultorio/AtConsultorio.asmx/AtencionDiabetesGuardarFarmacosRecetaDetalle",
                                    data: jsonFarmacosDetalle,
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: exito2,
                                    error: errores

                                });

                            }

                            function exito2() {
                                alert("Receta Guardada!");
//                                $("#btnImprimir").show();
                           imprimir = 1;
                           $("#btnImprimir").attr('disabled', false);
                            }

                            function cargarUnaReceta(id) {

                                var json = JSON.stringify({ "idReceta": id });

                                $.ajax({
                                    type: "POST",
                                    url: "../Json/AtConsultorio/AtConsultorio.asmx/cargarUnaReceta",
                                    data: json,
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: cargarUnaRecetaCargado,
                                    error: errores

                                });
                            }

                            function cargarUnaRecetaCargado(resultado) {
                                var receta = resultado.d;
//                                alert("cargado");
                                listFarmacos.length = 0;
                                var obj = {};
//                                obj.id = $('#cbo_farmacos option:selected').val();
//                                obj.nombre = "";
//                                obj.presentacion = $("#txtPresentacion").val();
//                                obj.dosis = $("#txtDosis").val();
//                                obj.mg = $("#txtmg").val();
//                                obj.antiguedad = $("#txtAntiguedad").val();
                                //    obj.otro = $('#txtOtroNombre').val();
                               // obj.estado = 1;
                                var index = listFarmacos.length;
                                var Encabezado = "";
                                var Contenido = "";
                                var Pie = "";

//                                if ($('#cbo_farmacos option:selected').val() != 0)
//                                { obj.nombre = $('#cbo_farmacos option:selected').html() }
//                                else { obj.nombre = $('#txtOtroNombre').val(); }


                               // listFarmacos[index] = obj;

                                $("#farmacosLista").empty();

                                $.each(receta.listaFarmacos, function (index, item) {

                                    Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fármacos</th><th>Presentación</th><th>Dosis</th><th>Mg x Día/UI</th></tr></thead><tbody>";

                                    Contenido = Contenido + "<tr><td style='cursor:auto'>" + item.nombre.toUpperCase() + " </td><td style='cursor:auto'> " + item.presentacion.toUpperCase() + " </td><td style='cursor:auto'>" + item.dosis.toUpperCase() + "</td><td style='cursor:auto'> " + item.mg.toUpperCase() + "</td><td style='cursor:auto'><a class='btn btn-mini btn-danger'  onclick = 'EliminarFarmaco(" + index + ")'>Eliminar Fármaco</a></td><td> ";

                                    Pie = "</tbody></table>";
                                    listFarmacos[index] = item;

                                });
                                $("#farmacosLista").html(Encabezado + Contenido + Pie);

                                $("#txtObservsaciones").val(receta.observaciones);
                                $("#txtMedico").val(receta.medico);
                                $('#cboVigencia option:selected').val(receta.vigencia);
                               // alert(receta.vigencia);
                                $("#cboVigencia option[value=" + receta.vigencia + "]").attr("selected", true);
                            }

                            $("#btnImprimir").click(function () {
                          if(imprimir == 0)
                          {return;}
//                                alert("imprimir");
                                //                                document.location = "../Impresiones/ImpresionDiabetesReceta.aspx?idReceta="+idReceta;

    $.fancybox({

                    'autoDimensions': false,
//                    'href': '../Impresiones/ImpresionTurno.aspx?MedicoId=' + MedicoID + '&EspecialidadId=' + EspecialidadId + '&Fecha=' + Fecha + ' ' + Hora,
                    'href': "../Impresiones/ImpresionDiabetesReceta.aspx?idReceta="+idReceta,
                    'width': '75%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
                    'transitionOut': 'none',
                    'type': 'iframe',
                    'hideOnOverlayClick': false,
                    'enableEscapeButton': false,
                    'preload': true,
            'onComplete' : function f()
            {
            jQuery.fancybox.showActivity();
            jQuery('#fancybox-frame').load(function(){jQuery.fancybox.hideActivity();
            });
            }
                   
                });
  
});

              function cargarMedico(){
                $.ajax({
                type: "POST",
                url: "../Json/AtConsultorio/AtConsultorio.asmx/traerMedico",
                contentType: "application/json; charset=utf-8",
                success: cargar_Medico_Cargado,
                error: errores
                });

                }

                function cargar_Medico_Cargado(resultado)
                {
                var m = resultado.d;
              
                $("#txtMedico").val(m.nombre);
                }

                   $("#txtObservsaciones").keyup(function(){
                   
                   imprimir = 0;
     $("#btnImprimir").attr('disabled', true);
                   });


   function cargarComboPresentaciones(control, seCorresponde, url) {

    $.ajax({
        type: "POST",
        url: url,
        data: '{seCorresponde: "' + seCorresponde + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
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
