var sourceArr = [];
var mapped = {};

$(document).ready(function () {
    $('input.typeahead').typeahead({
       updater: function (item) {
            $("#diag_nombre").val(item); //nom
            $("#id_val").val(mapped[item]); //id
            return item;
       },
       minLength: 4,
       items: 10,
        source: function (query, process) {
            var json = JSON.stringify({ "str": query });
            $.ajax({
                url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles_Autocomplete",
                type: 'POST',
                dataType: "json",
                data: json,
                contentType: "application/json; charset=utf-8",
                success: function (Resultado) {
                    var lista = Resultado.d;
                    $.each(lista, function (i, icd) {
                        if (i == 0) {
                            sourceArr.length = 0;
                        }
                        str = icd.Descripcion;
                        mapped[str] = icd.Codigo;
                        sourceArr.push(str);
                    });
                    return process(sourceArr);
                }
            });
        }
    });
});
