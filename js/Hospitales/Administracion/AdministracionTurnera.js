var ActualId = 0;

parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Administrar Turneras</strong>";


function Turnera_Nueva() {
    var json = JSON.stringify({
        "Nombre": $("#txtNombreTurnera").val()
    });


    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Turnera/Turnera.asmx/Turnera_Nueva",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            self.location = "AdministrarTurneras.aspx";
        },
        error: errores
    });
}



function CargarTurneras(Id) {
    ActualId = Id;
    var json = JSON.stringify({
        "Turnera": Id
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Turnera/Turnera.asmx/ListaConsultorioEnTurnera",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Consultorios_Cargados,
        error: errores
    });
}

function Consultorios_Cargados(Resultado) {
    var Consultorios = Resultado.d;
    $('#TablaConsultorio').empty();
    var Datos = "";
    $.each(Consultorios, function (index, cons) {
        Datos = Datos + "<tr><td><input type='checkbox' name='ConsultoriosC' value='" + cons.ConsultorioID + "' " + cons.Estado + "></td><td>" + cons.Consultorio + "</td></tr>";
    });
    $('#TablaConsultorio').html(Datos);

}


function GuardarConsultorios() {

    var objConsultorios = "";

    

        $("#TablaConsultorio input").each(function () {
            if ($(this).is(':checked')) {
                objConsultorios = objConsultorios + $(this).val() + ",";
            }
        });

    var json = JSON.stringify({
        "Turnera": ActualId,
        "Consultorios": objConsultorios
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Turnera/Turnera.asmx/GuardarConsultorios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarConsultorios_Guardado,
        error: errores
    });
}

function GuardarConsultorios_Guardado(Resultado) {
    var Consultorios = Resultado.d;
    alert("Guardado");
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

});


