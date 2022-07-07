// $("#btnactualizar").click(function () { alert(); return false; });
// $("#txtTelefono").on('chnage', function () { alert($("#txtTelefono").text().charAt(0)); });
// desdeaqui


function PhoneValidate(btn, phone) {
     var retorno = false;
     var phone = $("#" + phone).val();
     var num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
     var sinlet = true;
   
//     var reg = /\$\s*(\d){1,3}((\,\d{3})+)?\.\d{2}/g
//     
//     var match = phone.match(reg);
//     console.log(match);

     for (var i = 0; i <= phone.length - 1; i++) {
       // alert(phone[i] + "//" + $.inArray(parseInt(phone[i]), num));
         if ($.inArray(parseInt(phone[i]), num) == -1) {sinlet = false; }
     }

     if (phone.length < 10) {
         retorno = false;
         //alert("El Celular debe contener 10 caracteres!. Acutalícelo");
         alert("Por favor el telefono va sin 0 y sin 15.. y son 10 digitos... Codigo y Numero controlar que sea 10 digitos");
         if (btn != "") {
             $("#" + btn).hide();
         }
     }
     else if (phone.substring(0, 1).toString() == "0") {
         retorno = false;
         //alert("El Celular no puede comenzar con 0!. Acutalícelo");
         alert("Por favor el telefono va sin 0 y sin 15.. y son 10 digitos... Codigo y Numero controlar que sea 10 digitos");
         if (btn != "") {
             $("#" + btn).hide();
         }
     }
     else if (phone.substring(0, 2).toString() == "15") {
         retorno = false;
         //alert("El Celular no puede comenzar con 15!. Acutalícelo");
         alert("Por favor el telefono va sin 0 y sin 15.. y son 10 digitos... Codigo y Numero controlar que sea 10 digitos");
         if (btn != "") {
             $("#" + btn).hide();
         }
     } else if (!sinlet) {
         alert("Por favor el telefono va solo con números");
         if (btn != "") {
             $("#" + btn).hide();
         }
     }
     else {
        // alert(phone.substring(0, 1));
         retorno = true;
     }

//     alert(retorno);
    return retorno;
}

function generarLog(afiliadoId, celular, sector) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/logCelInsert",
        data: '{afiliadoId: "' + afiliadoId + '", celular: "' + celular + '", sector: "' + sector + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}