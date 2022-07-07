var dni = 0;
var Tdni = 0;
var paciente = 0;
var NHC = 0;
var listRojo = new Array();
var listAmarillo = new Array();
var listVerde = new Array();
var listTodos = new Array();
var listAzules = new Array();
var listSinConsulta = new Array();
var todos = 0;
var rojos = 0;
var amarillos = 0;
var verdes = 0;
var azules = 0;
var sinConsultas = 0;

var Tabla_Titulo = "";
var Tabla_Datos = "";
var Tabla_Fin = "";
var json = "";
$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();

    }


    $("#sinReultados").hide();
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });




    if (GET["Semaforo"] != "1") {
        //            alert("semaforo1");

        Tdni = GET["Tdni"]
        dni = GET["dni"]
        paciente = GET["paciente"]
        NHC = GET["NHC"]

        $("#btnSin").show();
        $("#titulo").html("Pacientes");

        if (GET["ocultarTitulo"] != "1") {
            parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes</strong>";
        } 

        var json = JSON.stringify({ "Nombre": paciente, "DNI": dni, "Tdni": Tdni, "NHC": NHC });
        //    alert(paciente + " " + "d" + dni + " " + Tdni);
        $.ajax({
            ////////////////llama a todos
            type: "POST",
            url: "../Json/Diabetes.asmx/ExistePaciente",
            data: json,
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
            success: resultado,
            error: errores
        });
    }
    else {
        parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Diabetología</strong> > <strong>Pacientes Existentes</strong>";
        cargarSemaforo(json)


    }
});

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

    function resultado(Resultado) {
        var pacientes = Resultado.d;

        $("#TablaConsultas").empty();
        Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>Documento</th><th style='width:280px'>Apellido y Nombre</th><th style='width:110px'>Seccional</th></thead><tbody>";
        $.each(pacientes, function (index, Paciente) {
            Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.PacienteId + ");' style='cursor:pointer;' ><td>" + Paciente.dni + "</td><td>" + Paciente.Nombre + "</td><td>" + Paciente.seccional + "</td>";

        });
        $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin); 
    }


//    function resultado(Resultado) {
//            var Pacientes = Resultado.d;
//            if (Pacientes.length > 0) {
//                todos = Pacientes.length;
//                        var semaforo = "";

//                        $("#TablaConsultas").empty();
//                        Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>DOC</th><th style='width:280px'>Apellido y Nombre</th><th style='width:110px'>Secc.</th><th style='width: 150px;'>Apertura Protocolo</th><th style='width:220px'>Doctor</th><th style='width:144px'>Última Consulta</th><th style='width:150px'>Observaciones</th></thead><tbody>";
//                        $.each(Pacientes, function (index, Paciente) {

//                            //                            if (Paciente.Consulta.glucemiaAyunoUltimo == null || Paciente.Consulta.HBA1Cultimo == null || Paciente.Consulta.urea == null || Paciente.Consulta.creatinina == null || Paciente.Consulta.cdeCreatinina == null || Paciente.Consulta.microalbuminuria == null) {
//                            if (Paciente.glucemiaAyunoUltimo == null || Paciente.HBA1Cultimo == null || Paciente.urea == null || Paciente.creatinina == null || Paciente.cdeCreatinina == null) {
//                                //                                alert("if");
//                                switch (Paciente.semaforo) {

//                                    case 1:
//                                        //Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Rojo '; ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
//                                        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;font-size:small' class='Semaforo_Rojo '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
//                                        var Pac = {};
//                                        Pac.semaforo = Paciente.semaforo;
//                                        Pac.documento = Paciente.documento;
//                                        Pac.documento_real = Paciente.documento_real;
//                                        Pac.tipoDoc = Paciente.TipoDoc;
//                                        Pac.Paciente = Paciente.Paciente;
//                                        Pac.Seccional = Paciente.Seccional;
//                                        Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes;
//                                        Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                        Pac.profesional = Paciente.profesional;

//                                        // if (Paciente.Fecha_Ultima_Diabetes != "") {
//                                        listRojo.push(Pac);

//                                        //}
//                                        listTodos.push(Pac);
//                                        break;

//                                    case 2:
//                                        //alert("2");
//                                        //                                        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Amarillo '; ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
//                                        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Amarillo '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
//                                        var Pac = {};
//                                        Pac.semaforo = Paciente.semaforo;
//                                        Pac.documento = Paciente.documento;
//                                        Pac.documento_real = Paciente.documento_real;
//                                        Pac.tipoDoc = Paciente.TipoDoc;
//                                        Pac.Paciente = Paciente.Paciente;
//                                        Pac.Seccional = Paciente.Seccional;
//                                        Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes;
//                                        Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                        Pac.profesional = Paciente.profesional;

//                                        listAmarillo.push(Pac);
//                                        listTodos.push(Pac);
//                                        break;
//                                    case 5:
//                                        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Amarillo '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
//                                        var Pac = {};
//                                        Pac.semaforo = Paciente.semaforo;
//                                        Pac.documento = Paciente.documento;
//                                        Pac.documento_real = Paciente.documento_real;
//                                        Pac.tipoDoc = Paciente.TipoDoc;
//                                        Pac.Paciente = Paciente.Paciente;
//                                        Pac.Seccional = Paciente.Seccional;
//                                        Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes;
//                                        Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                        Pac.profesional = Paciente.profesional;

//                                        listAmarillo.push(Pac);
//                                        listTodos.push(Pac);
//                                        break;
//                                    //                                    case 3:  

//                                    //                                        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Rojo '; ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";  
//                                    //                                        var Pac = {};  
//                                    //                                        Pac.semaforo = Paciente.semaforo;  
//                                    //                                        Pac.documento = Paciente.documento;  
//                                    //                                        Pac.documento_real = Paciente.documento_real;  
//                                    //                                        Pac.tipoDoc = Paciente.TipoDoc;  
//                                    //                                        Pac.Paciente = Paciente.Paciente;  
//                                    //                                        Pac.Seccional = Paciente.Seccional;  
//                                    //                                        Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;  
//                                    //                                        Pac.profesional = Paciente.profesional;  

//                                    //                                        Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes;  

//                                    //                                        if (Paciente.Fecha_Ultima_Diabetes != "") {  
//                                    //                                            listRojo.push(Pac);  
//                                    //                                        }  
//                                    //                                        listTodos.push(Pac);  

//                                    //                                        break;  

//                                    //  case 4:   
//                                    default:
//                                        //alert();
//                                        //                                        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
//                                        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
//                                        var Pac = {};
//                                        Pac.semaforo = Paciente.semaforo;
//                                        Pac.documento = Paciente.documento;
//                                        Pac.documento_real = Paciente.documento_real;
//                                        Pac.tipoDoc = Paciente.TipoDoc;
//                                        Pac.Paciente = Paciente.Paciente;
//                                        Pac.Seccional = Paciente.Seccional;
//                                        Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes;
//                                        Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                        Pac.profesional = Paciente.profesional;
//                                        //                                        if (Paciente.Fecha_Ultima_Diabetes != "") {
//                                        //                                            listRojo.push(Pac);
//                                        //                                           
//                                        //                                        }
//                                        listSinConsulta.push(Pac);
//                                        // listRojo.push(Pac);
//                                        listTodos.push(Pac);
//                                        break;
//                                }
//                            }

//                            //                            if (Paciente.Consulta.glucemiaAyunoUltimo != null && Paciente.Consulta.HBA1Cultimo != null && Paciente.Consulta.urea != null && Paciente.Consulta.creatinina != null && Paciente.Consulta.cdeCreatinina != null && Paciente.Consulta.microalbuminuria != null) {
//                            if (Paciente.glucemiaAyunoUltimo != null && Paciente.HBA1Cultimo != null && Paciente.urea != null && Paciente.creatinina != null && Paciente.cdeCreatinina != null) {
//                                if (Paciente.semaforo == 5) {
//                                    // alert("entro verde");
//                                    //                                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
//                                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
//                                    var Pac = {};
//                                    Pac.semaforo = Paciente.semaforo;
//                                    Pac.documento = Paciente.documento;
//                                    Pac.documento_real = Paciente.documento_real;
//                                    Pac.tipoDoc = Paciente.TipoDoc;
//                                    Pac.Paciente = Paciente.Paciente;
//                                    Pac.Seccional = Paciente.Seccional;
//                                    Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes;
//                                    Pac.glucemiaAyunoUltimo = Paciente.glucemiaAyunoUltimo;
//                                    Pac.HBA1Cultimo = Paciente.HBA1Cultimo;
//                                    Pac.urea = Paciente.urea;
//                                    Pac.creatinina = Paciente.creatinina;
//                                    Pac.cdeCreatinina = Paciente.cdeCreatinina;
//                                    Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                    Pac.profesional = Paciente.profesional;

//                                    listVerde.push(Pac);
//                                    listTodos.push(Pac);
//                                }

//                                if (Paciente.semaforo == 3) {
//                                    //alert("entro verde");
//                                    //                                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td><a class='btn btn-mini btn-success'>Necesita Consulta</a></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
//                                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td><a class='btn btn-mini btn-success'>Necesita Consulta</a></td>";
//                                    var Pac = {};
//                                    Pac.semaforo = Paciente.semaforo;
//                                    Pac.documento = Paciente.documento;
//                                    Pac.documento_real = Paciente.documento_real;
//                                    Pac.tipoDoc = Paciente.TipoDoc;
//                                    Pac.Paciente = Paciente.Paciente;
//                                    Pac.Seccional = Paciente.Seccional;
//                                    Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes;
//                                    Pac.glucemiaAyunoUltimo = Paciente.glucemiaAyunoUltimo;
//                                    Pac.HBA1Cultimo = Paciente.HBA1Cultimo;
//                                    Pac.urea = Paciente.urea;
//                                    Pac.creatinina = Paciente.creatinina;
//                                    Pac.cdeCreatinina = Paciente.cdeCreatinina;
//                                    Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                    Pac.profesional = Paciente.profesional;

//                                    listVerde.push(Pac);
//                                    listTodos.push(Pac);
//                                }
//                                //else 
//                                // if (Paciente.semaforo != 1 || Paciente.semaforo != 2 || Paciente.semaforo != 5) {
//                                //      
//                                //else if (Paciente.semaforo == 4){
//                                //                                    if (Paciente.semaforo == 1)
//                                //                                      alert(Paciente.semaforo);
//                                //                                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
//                                //                                    var Pac = {};
//                                //                                    Pac.semaforo = Paciente.semaforo;
//                                //                                    Pac.documento = Paciente.documento;
//                                //                                    Pac.documento_real = Paciente.documento_real;
//                                //                                    Pac.tipoDoc = Paciente.TipoDoc;
//                                //                                    Pac.Paciente = Paciente.Paciente;
//                                //                                    Pac.Seccional = Paciente.Seccional;
//                                //                                    Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes
//                                //                                    Pac.glucemiaAyunoUltimo = Paciente.glucemiaAyunoUltimo;
//                                //                                    Pac.HBA1Cultimo = Paciente.HBA1Cultimo;
//                                //                                    Pac.urea = Paciente.urea;
//                                //                                    Pac.creatinina = Paciente.creatinina;
//                                //                                    Pac.cdeCreatinina = Paciente.cdeCreatinina;

//                                //                                    Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                //                                    Pac.profesional = Paciente.profesional;
//                                //                                    listVerde.push(Pac);
//                                //                                    listTodos.push(Pac);

//                                //                                }
//                                //                                else
//                                if (Paciente.semaforo == 2 || Paciente.semaforo == 1) {

//                                    //                                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Azul '; ><td>" + Paciente.TipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
//                                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Azul '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
//                                    var Pac = {};
//                                    Pac.semaforo = Paciente.semaforo;
//                                    Pac.documento = Paciente.documento;
//                                    Pac.documento_real = Paciente.documento_real;
//                                    Pac.tipoDoc = Paciente.TipoDoc;
//                                    Pac.Paciente = Paciente.Paciente;
//                                    Pac.Seccional = Paciente.Seccional;
//                                    Pac.Fecha_Ultima_Diabetes = Paciente.Fecha_Ultima_Diabetes
//                                    Pac.glucemiaAyunoUltimo = Paciente.glucemiaAyunoUltimo;
//                                    Pac.HBA1Cultimo = Paciente.HBA1Cultimo;
//                                    Pac.urea = Paciente.urea;
//                                    Pac.creatinina = Paciente.creatinina;
//                                    Pac.cdeCreatinina = Paciente.cdeCreatinina;

//                                    Pac.fecha_alta_protocolo = Paciente.fecha_alta_protocolo;
//                                    Pac.profesional = Paciente.profesional;
//                                    listAzules.push(Pac);
//                                    listTodos.push(Pac);

//                                }

//                            }

//                        });

//                        rojos = listRojo.length;
//                        amarillos = listAmarillo.length;
//                        verdes = listVerde.length;
//                        sinConsultas = listSinConsulta.length;
//                        azules = listAzules.length;
//                        //todos = listTodos.length;
//                        $("#btnTodos").html("Todos(" + todos + ")");
//                        $("#btnRojo").html("Estudios Pendientes/Más de 90 días(" + rojos + ")");
//                        $("#btnAmarillo").html("Estudios Pendientes/Menos de 90 días(" + amarillos + ")");
//                        $("#btnSin").html("Sin Consultas(" + sinConsultas + ")");
//                        $("#btnVerde").html("Sin Pendientes(" + verdes + ")");
//                        $("#btnAzul").html("Sin Pendientes Más de 30 días(" + azules + ")");
//                        Tabla_Fin = "</tbody></table>";

//                        $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);         

//            }
//            else {
//                if (confirm("El paciente no existe. Desea Ingresarlo?")) {

//                        var ancho = 815;
//                        var alto = 600;
//                        var posicion_x = (screen.width / 2) - (ancho / 2);
//                        var posicion_y = (screen.height / 2) - (alto / 2);
//                        var pagina = "../Pacientes/NuevoAfiliado.aspx?volverDiabetes=1";
//                        var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=508, height=365, top=85, left=140";
//                        window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
//                }
//                else {document.location = "../AtConsultorio/Buscar_Paciente.aspx";
//}
//              }
//        }

    function CargarPaciente(id) {document.location = "../AtConsultorio/Listar_Consultas_Diabeticos.aspx?NHC=" + id;}


    $("#btnRojo").click(function () {
        //        alert("hola");
        $("#sinReultados").hide();
        $("#btnRojo").addClass("reff_activo");
        $("#btnAmarillo").removeClass("reff_activo");
        $("#btnVerde").removeClass("reff_activo");
        $("#btnTodos").removeClass("reff_activo");
        $("#btnSin").removeClass("reff_activo");
        $("#btnAzul").removeClass("reff_activo");

        if (listRojo.length > 0) {
            Tabla_Datos = "";
            $("#TablaConsultas").empty();

            //Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead  style='width: 147px;'><tr style='width: 147px;'><th style='width: 90px;'>Documento</th><th>Apellido y Nombre</th><th>Seccional</th><th style='width: 109px;'>Última Consulta</th><th>Observaciones</th><th style='width:144px'>Fecha alta Protocolo</th><th>Profesional</th></thead><tbody>";
            Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>DOC</th><th style='width:280px'>Apellido y Nombre</th><th style='width:110px'>Secc.</th><th style='width: 150px;'>Apertura Protocolo</th><th style='width:220px'>Doctor</th><th style='width:144px'>Última Consulta</th><th style='width:150px'>Observaciones</th></thead><tbody>";
            $.each(listRojo, function (index, Paciente) {

                //Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Rojo '; ><td>" + Paciente.tipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>"; ;
                Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;font-size:small' class='Semaforo_Rojo '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        }
        else {
            $("#sinReultados").css('text-align', 'center');
            $("#sinReultados").css('font-size', 'large');
            $("#sinReultados").html("No Hay Estudios Pendientes/Más de 90 días");
            $("#sinReultados").show();
            $("#TablaConsultas").empty();


        }
    });



    $("#btnAmarillo").click(function () {
        $("#sinReultados").hide();
        $("#btnAmarillo").addClass("reff_activo");
        $("#btnRojo").removeClass("reff_activo");
        $("#btnVerde").removeClass("reff_activo");
        $("#btnTodos").removeClass("reff_activo");
        $("#btnSin").removeClass("reff_activo");
        $("#btnAzul").removeClass("reff_activo");
       // alert(listAmarillo.length);
        if (listAmarillo.length > 0) {
            Tabla_Datos = "";
            $("#TablaConsultas").empty();

            //Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 90px;'>Documento</th><th>Apellido y Nombre</th><th>Seccional</th><th style='width: 109px;'>Última Consulta</th><th>Observaciones</th><th style='width:144px'>Fecha alta Protocolo</th><th>Profesional</th></thead><tbody>";
            Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>DOC</th><th style='width:280px'>Apellido y Nombre</th><th style='width:110px'>Secc.</th><th style='width: 150px;'>Apertura Protocolo</th><th style='width:220px'>Doctor</th><th style='width:144px'>Última Consulta</th><th style='width:150px'>Observaciones</th></thead><tbody>";
            $.each(listAmarillo, function (index, Paciente) {
                //            alert(Paciente.documento);
                //                Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Amarillo '; ><td>" + Paciente.tipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>"; 
                //Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Amarillo '; ><td>" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>"; 
                Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Amarillo '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        }
        else {


            $("#sinReultados").css('text-align', 'center');
            $("#sinReultados").css('font-size', 'large');
            $("#sinReultados").html("No Hay Estudios Pendientes/Menos de 90 días");
            $("#sinReultados").show();
            $("#TablaConsultas").empty();

        }

    });

    $("#btnVerde").click(function () {
        $("#sinReultados").hide();
        $("#btnVerde").addClass("reff_activo");
        $("#btnRojo").removeClass("reff_activo");
        $("#btnAmarillo").removeClass("reff_activo");
        $("#btnTodos").removeClass("reff_activo");
        $("#btnSin").removeClass("reff_activo");
        $("#btnAzul").removeClass("reff_activo");

        if (listVerde.length > 0) {
            Tabla_Datos = "";
            $("#TablaConsultas").empty();

            //Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 90px;'>Documento</th><th>Apellido y Nombre</th><th>Seccional</th><th style='width: 109px;'>Última Consulta</th><th>Observaciones</th><th style='width:144px'>Fecha alta Protocolo</th><th>Profesional</th></thead><tbody>";
            Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>DOC</th><th style='width:280px'>Apellido y Nombre</th><th style='width:110px'>Secc.</th><th style='width: 150px;'>Apertura Protocolo</th><th style='width:220px'>Doctor</th><th style='width:144px'>Última Consulta</th><th style='width:150px'>Observaciones</th></thead><tbody>";
            $.each(listVerde, function (index, Paciente) {
                if (Paciente.semaforo == 3) {
                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td><a class='btn btn-mini btn-success'>Necesita Consulta</a></td>";
                 }
                else {
                    //                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td>" + Paciente.tipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Verde '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
                }
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        }
        else {

            $("#sinReultados").css('text-align', 'center');
            $("#sinReultados").css('font-size', 'large');
            $("#sinReultados").html("No Hay Sin Pendientes");
            $("#sinReultados").show();
            $("#TablaConsultas").empty();

        }
    });


    $("#btnTodos").click(function () {

        $("#sinReultados").hide();
        $("#btnTodos").addClass("reff_activo");

        $("#btnRojo").removeClass("reff_activo");
        $("#btnAmarillo").removeClass("reff_activo");
        $("#btnVerde").removeClass("reff_activo");
        $("#btnSin").removeClass("reff_activo");
        $("#btnAzul").removeClass("reff_activo");

        if (listTodos.length > 0) {
            var semaforo = "";
            Tabla_Datos = "";
            $("#TablaConsultas").empty();

            // Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 90px;'>Documento</th><th>Apellido y Nombre</th><th>Seccional</th><th style='width: 109px;'>Última Consulta</th><th>Observaciones</th><th style='width:145px'>Fecha alta Protocolo</th><th>Profesional</th></thead><tbody>";
            Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>DOC</th><th style='width:280px'>Apellido y Nombre</th><th style='width:110px'>Secc.</th><th style='width: 150px;'>Apertura Protocolo</th><th style='width:220px'>Doctor</th><th style='width:144px'>Última Consulta</th><th style='width:150px'>Observaciones</th></thead><tbody>";
            $.each(listTodos, function (index, Paciente) {
              
                switch (Paciente.semaforo) {
                    case 1:

                        if (Paciente.Fecha_Ultima_Diabetes == "") {
                            semaforo = "";
                        } else { semaforo = "Semaforo_Rojo"; }

                        break;
                    case 2:
                        semaforo = "Semaforo_Amarillo";

                        break;
                    case 3:

                        if (Paciente.Fecha_Ultima_Diabetes == "") {
                            semaforo = "";
                        } else { semaforo = "Semaforo_Rojo"; }

                        break;
                    case 4:
                        semaforo = "";
                        break;
                }

                if (Paciente.glucemiaAyunoUltimo != null && Paciente.HBA1Cultimo != null && Paciente.urea != null && Paciente.creatinina != null && Paciente.cdeCreatinina != null) {
                    if (Paciente.semaforo == 3 || Paciente.semaforo == 5) {
                        semaforo = "Semaforo_Verde";


                    }
                    else if (Paciente.semaforo != 1 || Paciente.semaforo != 2) { //|| Paciente.semaforo != 3) {
                        // semaforo = "Semaforo_Verde";
                        semaforo = "Semaforo_Azul";

                    }
                }
                //Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='" + semaforo + "'; ><td>" + Paciente.tipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td><td>" + Paciente.fecha_alta_protocolo + "</td><td>" + Paciente.profesional + "</td>";
                if (Paciente.glucemiaAyunoUltimo == null || Paciente.HBA1Cultimo == null || Paciente.urea == null || Paciente.creatinina == null || Paciente.cdeCreatinina == null) {
                    if (Paciente.semaforo == 5) {
                        semaforo = "Semaforo_Amarillo";
                    }
                }

                Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='" + semaforo + "'; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
                semaforo = "";  
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        }
        else {

            $("#sinReultados").css('text-align', 'center');
            $("#sinReultados").css('font-size', 'large');
            $("#sinReultados").html("No Hay Pacientes");
            $("#sinReultados").show();
            $("#TablaConsultas").empty();

        }


    });


    function cargarSemaforo(json) {


        if (listRojo.length > 0)
        { listRojo.length = 0; }

        if (listAmarillo.length > 0)
        { listAmarillo.length = 0 }

        if (listVerde.length > 0)
        { listVerde.length = 0 }


        Tabla_Datos = "";
        $("#TablaConsultas").empty();
        $.ajax({
            //////////////////////////llama solo  los que tienen consultas
            type: "POST",
            url: "../Json/Diabetes.asmx/TraerPacientesTodos",
            data: json,
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
            success: resultado,
            error: errores
        });

    }

        $("#btnSin").click(function () {
            $("#sinReultados").hide();

            $("#btnSin").addClass("reff_activo");
            $("#btnVerde").removeClass("reff_activo");
            $("#btnRojo").removeClass("reff_activo");
            $("#btnAmarillo").removeClass("reff_activo");
            $("#btnTodos").removeClass("reff_activo");
            $("#btnAzul").removeClass("reff_activo");

            if(listSinConsulta.length > 0){
            Tabla_Datos = "";
            $("#TablaConsultas").empty();

            //Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 90px;'>Documento</th><th>Apellido y Nombre</th><th>Seccional</th><th style='width: 109px;'>Última Consulta</th><th>Observaciones</th></thead><tbody>";
            Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>DOC</th><th style='width:280px'>Apellido y Nombre</th><th style='width:280px'>Secc.</th><th style='width: 150px;'>Apertura Protocolo</th><th style='width:105px'>Doctor</th><th style='width:144px'>Última Consulta</th><th style='width:150px'>Observaciones</th></thead><tbody>";
            $.each(listSinConsulta, function (index, Paciente) {
                //            alert(Paciente.documento);
                //Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' ><td>" + Paciente.tipoDoc + "/" + Paciente.documento_real + "</td><td>" + Paciente.Paciente + "</td><td>" + Paciente.Seccional + "</td><td>" + Paciente.Fecha_Ultima_Diabetes + "<td></td>";
                Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;font-size:small'; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";
            });

            Tabla_Fin = "</tbody></table>";
            $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
        }
        else {
           
            $("#sinReultados").css('text-align', 'center');
            $("#sinReultados").css('font-size', 'large');
            $("#sinReultados").html("No Hay Afiliados");
            $("#sinReultados").show();
            $("#TablaConsultas").empty();
        
        }
        });

    $("#btnAzul").click(function () {
        $("#sinReultados").hide();

            $("#btnSin").removeClass("reff_activo");
            $("#btnVerde").removeClass("reff_activo");
            $("#btnRojo").removeClass("reff_activo");
            $("#btnAmarillo").removeClass("reff_activo");
            $("#btnTodos").removeClass("reff_activo");
            $("#btnAzul").addClass("reff_activo");

            if (listAzules.length > 0) {

                Tabla_Datos = "";
                $("#TablaConsultas").empty();

                Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead style='width: 147px;'><tr style='width: 147px;'><th style='width: 65px;'>DOC</th><th style='width:280px'>Apellido y Nombre</th><th style='width:110px'>Secc.</th><th style='width: 150px;'>Apertura Protocolo</th><th style='width:220px'>Doctor</th><th style='width:144px'>Última Consulta</th><th style='width:150px'>Observaciones</th></thead><tbody>";
                $.each(listAzules, function (index, Paciente) {
                    //            alert(Paciente.documento);
                    Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + Paciente.documento + ");' style='cursor:pointer;' class='Semaforo_Azul '; ><td style='font-size:small'>" + Paciente.documento_real + "</td><td style='font-size:small'>" + Paciente.Paciente + "</td><td style='font-size:small'>" + Paciente.Seccional + "</td><td style='font-size:small'>" + Paciente.fecha_alta_protocolo + "</td><td style='font-size:small'>" + Paciente.profesional + "</td><td style='font-size:small'>" + Paciente.Fecha_Ultima_Diabetes + "</td><td></td>";

                });

                Tabla_Fin = "</tbody></table>";
                $("#TablaConsultas").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

            } else {
                $("#sinReultados").css('text-align', 'center');
                $("#sinReultados").css('font-size', 'large');
                $("#sinReultados").html("No Hay Sin Pendientes Más de 30 Días");
                $("#sinReultados").show();
                $("#TablaConsultas").empty();
            }
        });
            
        
   
