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



    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        Cargar_Paciente_NHC(NHC); //////////////cargar encabezado
        $("#fotopaciente").attr("src", NHC);
        NHC2 = NHC;
       
        Cargar_Recetas(NHC2);

        //        CargarConsultas();

        if (GET["IdConsulta"] != "" && GET["IdConsulta"] != null) {

            Protocolo = GET["IdConsulta"];
            cargar(Protocolo);
        }
    }
    else if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
        MedicoId2 = MedicoId;
    }





    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
        MedicoId2 = MedicoId;
    }
    if (GET["IdConsulta"] != "" && GET["IdConsulta"] != null) {

        IdConsulta = GET["IdConsulta"];
    }



    function Cargar_Paciente_NHC(NHC) {
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

    if (GET["MostrarBtnCancelar"] == 1) {
        $('#ModalExistePaciente').modal('show');
        ocultarCancelar = GET["MostrarBtnCancelar"];
        $("#btnCancelar").hide();
        $("#btnCance").hide();
    }


});
function Cargar_Paciente_Cargado(Resultado) {

    var Paciente = Resultado.d;
    var PError = false;


    $.each(Paciente, function (index, paciente) {

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoCuil").html(paciente.cuil);
        $("#CargadoCarnet").html(paciente.carnet);

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
     // $("#fotopaciente").attr('src', '../../../img/silueta.jpg');
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
 
function Cargar_Recetas(idPaciente) {
 


   var json = JSON.stringify({"idPaciente": idPaciente });

//   alert(json);

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarRecetasDiabeticas ",
        //        data: '{"idPaciente: "' + idPaciente + '"}',
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
//            alert("before");
            $("#cargando").show();
            $("#TablaRecetas").empty();
            $("#TablaRecetas").hide();
//            alert("paso before");
        },
        complete: function () {
//            alert("complete");
            $("#cargando").hide();
            $("#TablaRecetas").show();
        },
        success: Cargar_Recetas_Paciente_Cargado,
        error: errores
    });

}

  function Cargar_Recetas_Paciente_Cargado(Recetas) {
//  alert(" a cargar recetas 2");
    var resultado = Recetas.d;
 

    $("#TablaRecetas").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='text-align:center'>Fecha</th><th>Fecha Modificación</th><th>Paciente</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(resultado, function (index, R) {
//        alert(R.fechaReceta);
//        alert(R.fechaModificacion);
//        alert(R.paciente.apellido);
//        alert(R.idReceta);
        //        Contenido = Contenido + "<tr><td>" + Consulta.fecha_consulta + " </td><td> " + Consulta.fecha_modificacion + " </td><td>" + Consulta.nombre_paciente + " </td><td><a class='btn btn-mini btn-danger' onclick=Eliminar(" + Consulta.id_consulta + ")>Eliminar Consulta</a></td><td><a class='btn btn-mini btn-success' onclick = 'Atender(" + Consulta.id_consulta + ")'>Editar Consulta</a></td><td> ";
        Contenido = Contenido + "<tr><td style='cursor:auto;width:81px'>" + R.fechaReceta + " </td><td style='cursor:auto;width:142px; text-align:center'> " + R.fechaModificacion + " </td><td style='cursor:auto'>" + R.paciente.apellido + " </td><td style='cursor:auto;width:83px'><a class='btn btn-mini btn-success' onclick=Editar(" + R.idReceta + ")>Editar Receta</a></td>";

    });
    var Pie = "</tbody></table>";
    $("#TablaRecetas").html(Encabezado + Contenido + Pie);
}

function Editar(id) {
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes Existentes</strong> > <strong>Consultas Médicas</strong> > <strong>Recetas</strong> > <strong>Editar Receta</strong>";
    document.location = "../AtConsultorio/Cargar_Recetas_Diabetes.aspx?idpaciente=" + NHC2 + "&idReceta=" + id + "&imprimir=" + 1;

}

$("#btnNuevaReceta").click(function () {

    document.location = "../AtConsultorio/Cargar_Recetas_Diabetes.aspx?idpaciente=" + NHC2 + "&imprimir=" + 0;
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes Existentes</strong> > <strong>Consultas Médicas</strong> > <strong>Recetas</strong> > <strong>Nueva Receta</strong>";
});


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
