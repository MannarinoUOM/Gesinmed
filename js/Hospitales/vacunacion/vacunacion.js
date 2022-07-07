var afiliadoId = 0;
var InternacionId = 0;
var GET = {};
$(document).ready(function () {
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["afiliadoId"] != "" && GET["afiliadoId"] != null) {
        afiliadoId = GET["afiliadoId"];
        cargarAplicaciones();
        cargarGrupo();
    }

    if (GET["InternacionId"] != "" && GET["InternacionId"] != null) {
        InternacionId = GET["InternacionId"];
        CargarEncabezado();
    }

    cargarComboTipoVacunas();
    $(".fecha").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
    $(".fecha").on('keydown', function (e) { return false; });
});

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }


    function cargarComboVacunas(tipo) {
       var json = JSON.stringify({ "tipo": tipo });
       $.ajax({
           type: "POST",
           url: "../Json/vacunacion/vacum.asmx/TraerVacunas",
           contentType: "application/json; charset=utf-8",
           data: json,
           dataType: "json",
           success: function (resultado) {
               $("#vacunas").empty();
               $("#vacunas").append("<option value='0'>Vacuna</option");
               var l = resultado.d;
               $.each(l, function (index, item) { $("#vacunas").append("<option value='" + item.id + "'>" + item.descripcion + "</option"); });
           },
           error: errores
       });
    }

    function cargarComboTipoVacunas() {
        $.ajax({
            type: "POST",
            url: "../Json/vacunacion/vacum.asmx/TraerTipoVacuna",
            contentType: "application/json; charset=utf-8",
            success: function (resultado) {
                $("#tipoVacunas").append("<option value='0'>Tipo</option");
                var l = resultado.d;
                $.each(l, function (index, item) { $("#tipoVacunas").append("<option value='" + item.id + "'>" + item.tipo + " - " + item.descripcion + "</option"); });
            },
            error: errores
        });
    }

    $("#tipoVacunas").on('change', function () {
        if ($(this).val() > 0)
            cargarComboVacunas($(this).val());
        else
            $("#vacunas").empty();
    });

    $("#btnGuardar").click(function () {
        if ($("#tipoVacunas").val() == 0) { alert("Seleccione el tipo de vacuna!"); return false; }
        if ($("#vacunas").val() == 0) { alert("Seleccione la vacuna!"); return false; }
        if ($("#txtFecha").val().trim().length <= 0) { alert("Seleccione la fecha de la vacuna!"); return false; }

        var apli = {};
        apli.afiliadoId = afiliadoId;
        apli.vacuna = $("#vacunas").val();
        apli.fecha = $("#txtFecha").val();
        apli.grupoFactor = $("#GrupoSanguineo").val();

        var json = JSON.stringify({ "apli": apli });
        $.ajax({
            type: "POST",
            url: "../Json/vacunacion/vacum.asmx/InsertarAplicacionVacuna",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function () { alert("Guardado."); cargarAplicaciones(); },
            error: errores
        });
    });

    function cargarGrupo(){
     var json = JSON.stringify({ "afiliadoId": afiliadoId });
        $.ajax({
            type: "POST",
            url: "../Json/vacunacion/vacum.asmx/TraerGrupoFactorSaguineo",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                $("#GrupoSanguineo").append("<option value='0'></option");
                var l = Resultado.d;
                var seleccionado = 0;
                $.each(l, function (index, item) { $("#GrupoSanguineo").append("<option value='" + item.id + "'>" + item.descripcion + "</option");

                if(item.seleccionado > 0){ seleccionado = item.seleccionado;}
                 });
                 $("#GrupoSanguineo").val(seleccionado);
            },
            error: errores
        });
    }

    function cargarAplicaciones() {
        var apli = {};
        apli.afiliadoId = afiliadoId;
        apli.vacuna = null;
        apli.usuario = null;
        apli.fecha = null;

        var json = JSON.stringify({ "apli": apli });
        $.ajax({
            type: "POST",
            url: "../Json/vacunacion/vacum.asmx/TraerAplicacionesVacuna",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var encabezado = "<table class='table table-hover'><tr style='background-color:#BDBDBD'>" +
                "<td style='width:100px'><b>Tipo</b></td>" +
                "<td style='width:100px'><b>Vacuna</b></td>" +
                "<td style='width:100px'><b>Fecha</b></td>" +
                "<td style='width:100px'><b>Usuario</b></td>" +
                "<td style='width:40px'><b>Eliminar</b></td></tr>";
                var fila = "";
                var pie = "</table>";
                $.each(Resultado.d, function (index, item) {
                    fila += "<tr><td>" + item.tipo + "</td><td>" + item.vacunaName + "</td><td>" + item.fecha + "</td><td>" + item.usuarioName + "</td>" +
                    "<td><a class='btn btn-mini btn-danger' onclick=eliminar("+ item.id +")><i class='icon icon-remove-circle'></i></a></td></tr>";
                });
                $("#dosis").html(encabezado + fila + pie);
            },
            error: errores
        });
    }

    function eliminar(id){
            var json = JSON.stringify({
            "id": id
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/vacunacion/vacum.asmx/EliminarAplicacionVacuna",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(){
            cargarAplicaciones();
            cargarGrupo();
            alert("Eliminado.");},
            error: errores
        });
    }

      function CargarPacienteID() {
        var json = JSON.stringify({
            "ID": afiliadoId
        });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/DarTurnos.asmx/CargarPacienteID",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: CargarEncabezado_Cargados,
            error: errores
        });
    }

    function CargarEncabezado_Cargados(Resultado) {

    var Paciente = Resultado.d;

    $.each(Paciente, function (index, paciente) {

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#SPaciente").html(paciente.Paciente);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + Paciente.Foto);
        if (InternacionId == "H") { $("#Dinternacion").hide(); }

    });
    }

    function CargarEncabezado() {
        var json = JSON.stringify({
            "Id": InternacionId
        });

        if (InternacionId == "H") { CargarPacienteID(afiliadoId); } else {
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/AtInternados/ListaPacientesInternados.asmx/CargarEncabezadoInternacion",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: CargarEncabezado_1,
                error: errores
            });
        }
    }

    function CargarEncabezado_1(Resultado) {
        var Encabezado = Resultado.d;
        $("#afiliadoId").val(Encabezado.NHC);
        CargarPacienteID(Encabezado.NHC);
        $("#SPaciente").html(Encabezado.paciente);
        $("#CargadoDNI").html(Encabezado.dni);

        $("#SSala").html(Encabezado.sala);
        $("#SCama").html(Encabezado.cama);
        $("#SServicio").html(Encabezado.servicio);

        if (InternacionId == 0) { $("#Dinternacion").hide(); }

        //alert(paciente.Foto); 
        $('#fotopaciente').attr('src', '../fotoPerfil/' + Encabezado.foto);
        //$('#fotopaciente').attr('src', '../img/Pacientes/' + Encabezado.NHC + '.jpg');
        //CargadoEdad
    }

    $("#GrupoSanguineo").on('change',function(){
    if($(this).val() > 0){
            var json = JSON.stringify({ "afiliadoId": afiliadoId, "grupoFactor": $(this).val() });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/vacunacion/vacum.asmx/GuardarGrupoSanguineo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(Resultado){
            if(Resultado.d == 1){$("#ok").show();} else {$("#error").show(); $("#GrupoSanguineo").val(0);}
             setTimeout(function(){ $("#ok").removeClass("animacion") }, 3000);

             },
            error: errores
        });
    }
    });

    function imgErrorPaciente(image) {
        image.onerror = "";
        image.src = "../img/silueta.jpg";
        return true;
    }

   
  