var afiliadoId = 0;
var idCarga = 0;
var GET = {};

$(document).ready(function () {
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });
    // $(".datos").click(function () { alert(); });

    cargarMedicoSeguimiento();

    if (GET["id"] != "" && GET["id"] != null) {
        idCarga = GET["id"];
        traerCarga(idCarga);
    }


    if (idCarga == 0) { $("#btnBuscarCarga").click(); }

});

function cargarMedicoSeguimiento() {
    var json = JSON.stringify({ "medico": "" });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/TraerMedicosCOVID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Reseultado) {
            $.each(Reseultado.d, function (index, item) {//item.id
                $("#cboMedSeguimiento").append("<option value='" + item.medico + "'>" + item.medico + "</option");
            });
        },
        error: errores
    });
}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnGuardar").click(function () {
    //@usuario bigint
    // if (afiliadoId > 0) {
    var json = JSON.stringify({ "id": idCarga, "afiliadoId": afiliadoId, "nombre": $("#txtNombre").val(), "dni": $("#txtDni").val(), "pediatrico": $("#cboPediatrico").val()
    , "direccion": $("#txtDireccion").val(), "localidad": $("#txtLocalidad").val(), "uom": $("#cboUom").val(), "telefono": $("#txtTelefono").val(), "fechaIsopado": $("#txtHisopado").val()
    , "resultado": $("#cboResultado").val(), "destino": $("#cboDestino").val(), "internacion": $("#txtInternacion").val(), "alta": $("#TxtAltaInternacion").val(), "Mseguimiento": $("#cboMedSeguimiento").val()
    , "hisopadoControl": $("#txtHisopadoControl").val(), "fechaEpidemilogica": $("#txtFechaAltaEpidemiolo").val(), "donate": $("#cboDoantePlasma").val(), "obito": $("#cboObito").val()
    });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/SeguimientoCOVIDGuardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Reseultado) {
            if (Reseultado.d > 0) { alert("Guardado"); }
            if (Reseultado.d == 0) { alert("Ha perdido sesión. Vuelva loguearse."); }
            if (Reseultado.d == -1) { alert("No se ha podido guardar su consulta."); }
        },
        error: errores,
        complete: function () { if (idCarga == 0) { document.location = "SeguimientoCOVID.aspx"; } else { document.location = "SeguimientoCOVID_Busqueda.aspx"; } }
    });
    //   } else { alert("Seleccione un Paciente"); }
});


$("#btnBuscar").click(function () {
    if ($("#txtDniBusqueda").val() == "") { alert("Ingrese un Dni para buscar"); return false; }

    var json = JSON.stringify({ "dni": $("#txtDniBusqueda").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/BuscarafiliadoSeguimientoCOVID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            //  alert(Resultado.d);
            afiliadoId = Resultado.d.afiliadoId;
            $(".defautl").val("");
            $("#txtNombre").val(Resultado.d.nombre);
            $("#txtDni").val(Resultado.d.dni);
            $("#txtDireccion").val(Resultado.d.direccion);
            $("#txtLocalidad").val(Resultado.d.localidad);
            $("#txtTelefono").val(Resultado.d.telefono);

            $("#t1").click();
        },
        error: errores
    });
});


$("#btnBuscarCarga").click(function () {
    var json = JSON.stringify({ "id": 0 ,"desde": $("#txtDesde").val(), "hasta": $("#txtHasta").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/TraerSeguimientoCOVID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            //  alert(Resultado.d);
            var encabezado = "<table class='table table-hover'><tr><td><b>Nombre</b></td><td><b>Dni</b></td><td><b>Fecha</b></td></tr>";
            var fila = "";
            var pie = "</table>";
            $.each(Resultado.d, function (index, item) {
                fila = fila + "<tr onclick='llamar(" + item.id + ")' style='cursor:pointer' ><td>" + item.nombre + "</td><td>" + item.dni + "</td><td>" + item.fechaCarga + "</td></tr>";

            });
            $("#resultado").html(encabezado + fila + pie);
        },
        error: errores
    });
});

function llamar(id) {
    document.location = "SeguimientoCOVID.aspx?id=" + id;
}

function traerCarga(id) {
    $("#t0").hide();
    $("#tab0").hide();
    $("#tab0").removeClass("active");
    $("#tab1").addClass("active");
    $("#btnVolver").show();
    var json = JSON.stringify({ "id": idCarga, "desde": '', "hasta": '' });
    $.ajax({
        type: "POST",
        url: "../Json/Guardia/Guardia.asmx/TraerSeguimientoCOVID",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $.each(Resultado.d, function (index, item) {
                afiliadoId = item.afiliadoId;
                $("#txtNombre").val(item.nombre);
                $("#txtDni").val(item.dni);
                $("#cboPediatrico").val(item.pediatrico);
                $("#txtDireccion").val(item.direccion);
                $("#txtLocalidad").val(item.localidad);
                $("#cboUom").val(item.uom);
                $("#txtTelefono").val(item.telefono);

                if (item.fechaIsopado == "1/1/1900") { $("#txtHisopado").val(""); } else { $("#txtHisopado").val(item.fechaIsopado); }

                $("#cboResultado").val(item.resultado);
                $("#cboDestino").val(item.destino);

                if (item.internacion == "1/1/1900") { $("#txtInternacion").val(""); } else { $("#txtInternacion").val(item.internacion); }

                if (item.alta == "1/1/1900") { $("#TxtAltaInternacion").val(""); } else { $("#TxtAltaInternacion").val(item.alta); }

                $("#cboMedSeguimiento").val(item.Mseguimiento);

                if (item.hisopadoControl == "1/1/1900") { $("#txtHisopadoControl").val(""); } else { $("#txtHisopadoControl").val(item.hisopadoControl); }

                if (item.fechaEpidemilogica == "1/1/1900") { $("#txtFechaAltaEpidemiolo").val(""); } else { $("#txtFechaAltaEpidemiolo").val(item.fechaEpidemilogica); }
                
                $("#cboDoantePlasma").val(item.donate);
                $("#cboObito").val(item.obito);
            });
        },
        error: errores
    });
}