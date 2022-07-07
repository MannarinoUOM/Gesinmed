var countryCode = new Array();
var Total = -1;


function Cargar_Practicas() {
    $.ajax({
        type: "POST",
        url: "../Json/Laboratorio/Laboratorio.asmx/Practicas_Listar",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Cargadas,
        error: errores
    });
}


function Practicas_Cargadas(Resultado) {

    var countryLabels = [];
    var countryMapped = {};
   
    var i = 0;

    var Practicas = Resultado.d;
    $('#cbo_Practicas').empty();
    $('#cbo_Practicas').append('<option value="0">Seleccione una Práctica</option>');
    $.each(Practicas, function (index, practicas) {        

        var objPractica = {};
        objPractica.value = practicas.Id;
        objPractica.label = practicas.Practica;
        countryCode[i] = objPractica;
        i = i + 1;
        
   });


    //For each object label=>value in the json, store the labels in the array, and mapping array with label => value    form.
    $.each(countryCode, function (i, item) {
        countryMapped[item.label] = item.value
        countryLabels.push(item.label)
    });


    $("#txt_Buscar").typeahead({
        source: function (query, process) {
            //Pass the array with labels on typeahead to get displayed    
            process(countryLabels)
        },
        updater: function (item) {
            //For the Label selected ( item ) get the value mapped from the mapping array and set it to hidden element
            //$('hiddenelment').val(countryMapped[item]);
            $("#txtCodigo").val(countryMapped[item]);

            //Return the label selected to the typeahead element
            return item;
        }
    });





}

Cargar_Practicas();

function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btn_Agregar").click(function () {
    ObtenerPreparacion($("#txtCodigo").val());
});


function ObtenerPreparacion(Codigo) {
    var json = JSON.stringify({ "Codigo": Codigo });
    $.ajax({
        type: "POST",
        url: "../Json/Laboratorio/Laboratorio.asmx/PreparacionLabo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ObtenerPreparacion_Cargadas,
        error: errores
    });
}

function ObtenerPreparacion_Cargadas(Resultado) {
    var PracticasLab = Resultado.d;
    var txt = $("#txt_Preparaciones");
    if (PracticasLab.Preparacion != null) {
        txt.val(txt.val() + PracticasLab.Preparacion + "\n");
    }
}


$("#cbo_Practicas").change(function () {
    $("#txtCodigo").val($("#cbo_Practicas option:selected").val());
});

$("#txtCodigo").blur(function () {
    if ($("#txtCodigo").val() == "") { return false; }
    var Numeros = /^([0-9])*$/;
    if (Numeros.test($("#txtCodigo").val())) {
        if ($("#txtCodigo").val() == "") {

        }
        else {

            var exists = false;
            $('#cbo_Practicas option').each(function () {
                if (this.value == $("#txtCodigo").val()) {
                    $("#cbo_Practicas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
                    $('#txt_practica').val($(this).text());
                    exists = true;
                    return false;
                }
            });

            if (!exists) {
                $("#txtCodigo").focus();
            }

        }
    } else {
        $("#ControltxtCodigo").addClass("error");
        $("#txtCodigo").focus();
    }
});




$("#txtCodigo").keypress(function (event) {

    var Numeros = /^([0-9])*$/;
    if (event.which == 13 || event.keyCode == 9) {

        if ($("#txtCodigo").val() == "") { $("#txt_Buscar").val("");  $("#txt_Buscar").focus(); return false; }

        event.preventDefault();
        if (Numeros.test($("#txtCodigo").val())) {
            if ($("#txtCodigo").val() == "") {
                //$("#btnConfirmarNuevoBono").focus();
            }
            else {
                var exists = false;

                $.each(countryCode, function (indice, Practica) {
                    if (Practica.value == $("#txtCodigo").val()) {
                        $("#txt_Buscar").val(Practica.label);
                        exists = true;
                    }
                });


                if (exists) {
                    ObtenerPreparacion($("#txtCodigo").val());
                    $("#txtCodigo").val("");
                    $("#txtCodigo").focus();

                }
            }
        }
        else {
            $("#ControltxtCodigo").addClass("error");
        }
    }

});


$("#btnAgregarPractica").click(function () {
    printDiv();
});


function printDiv() {

    //Get the HTML of div
    var divElements = $("#txt_Preparaciones").val();
    var divFrase = $("#Frase").html();
            //Get the HTML of whole page            
            var oldPage = document.body.innerHTML;

            //Reset the page's HTML with div's HTML only
            
            document.body.innerHTML = "<html><head><title></title></head><body>" + 
            divFrase + divElements + "</body>";

            //Print Page            
            window.print();
            setTimeout(function () { window.location.href = "PreparacionLabo.aspx"; }, 1);
            //Restore orignal HTML
            //document.body.innerHTML = oldPage;            
            //window.location.href = "PreparacionLabo.aspx";

            
          
        }
