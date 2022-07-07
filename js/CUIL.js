function cuil_cuit_error(genero, documento) {
    /*
    Verifico que el documento tenga exactamente ocho números y que
    la cadena no contenga letras.
    */
    
    if ((documento.length != 8) || (isNaN(documento))) {
        //Muestro un error en caso de no serlo.
        alert("El número de documento ingresado no es correcto.")
    } else {
        //Defino el valor del prefijo.
        if (genero == 1) {
            var AB = '20';
        } else if (genero == 2) {
            var AB = '27';
        } else {
            var AB = '30';
        }
               

        /*
        Los números (excepto los dos primeros) que le tengo que
        multiplicar a la cadena formada por el prefijo y por el
        número de documento los tengo almacenados en un arreglo.
        */
        var multiplicadores = new Array('3', '2', '7', '6', '5', '4', '3', '2');

        //Realizo las dos primeras multiplicaciones por separado.
        var calculo = ((parseInt(AB.charAt(0)) * 5) + (parseInt(AB.charAt(1)) * 4));
        /*
        Recorro el arreglo y el número de documento para
        realizar las multiplicaciones.
        */
        for (var i = 0; i < 8; i++) {
            calculo += (parseInt(documento.charAt(i)) * parseInt(multiplicadores[i]));
        }

        //Calculo el resto.
        var resto = (parseInt(calculo)) % 11;

        /*
        Llevo a cabo la evaluación de las tres condiciones para
        determinar el valor de C y conocer el valor definitivo de
        AB.
        */
        if ((genero != 3) && (resto <= 1)) {
            if (resto == 0) {
                var C = '0';
            } else {
                if (genero == 1) {
                    var C = '9';
                } else {
                    var C = '4';
                }
            }
            AB = '23';
        } else {
            var C = 11 - resto;
        }

        //Almaceno el CUIL o CUIT en una variable.
        //var cuil_cuit = AB + "-" + documento + "-" + C;
        var cuil_cuit = AB + "" + documento + "" + C;

        //Lo muestro en la ventana del navegador.
        return(cuil_cuit);
    }
}


function cuil_cuit(genero, documento) {
    return ""; //CUIL

    var cuil = "";
    var documento = documento;
    if (documento == "") return;
    var d = "2";
    if (genero == "1")
        var dig_sexo = "0";
    else var dig_sexo = "7";
    var s = d.concat(dig_sexo);
    var doc = s.concat(documento);
    var array = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    var total = 0;
    for (i = 0; i < array.length; i++)
        total += parseInt(doc[i]) * array[i];
    var resto = total % 11;
    if (resto == 0) {
        cuil = doc.concat("0");
    }
    else if (resto == 1) {
        d = "23";
        if (genero == "1") {
            doc = d.concat(documento); //es hombre
            cuil = doc.concat("9");
        }
        else {
            doc = d.concat(documento); //es mujer
            cuil = doc.concat("4");
        }
    }
    else { var dig_verificador = 11 - resto; cuil = doc.concat(dig_verificador.toString()); }
    return (cuil);
}