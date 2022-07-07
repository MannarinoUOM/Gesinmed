<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UsuariosNEW.aspx.cs" Inherits="UsuariosNEW_UsuariosNEW" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
    <title>Relación De Usuarios</title>


<%--    <style type="text/css">

#marco
{
    background-color:Red;
    width:100%;
    height:1000px;
    overflow:hidden;
    }
    
    img
    {
        width:100%;
        }
    
    #izquierda
    {
         background-image: url("../img/error.jpg");
         background-repeat:inherit;
         background-position:center;
         display: inline-flex;
         float:left;
         
         width: 30%; 
         height: 30%; 
        }
    
</style>--%>

</head>
<body>
    <form id="form1" runat="server">
    <div>
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="txtUsuario">Usuario</label>
      <input type="text" class="form-control" id="txtUsuario" placeholder="Ingrese Usuario a buscar"  required />
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="txtNombre">Nombre</label>
      <input type="text" class="form-control" id="txtNombre" placeholder="Ingrese Nombre a buscar"  required />
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="txtFecha">Fecha Alta</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
        </div>
        <input type="text" class="form-control" id="txtFecha" placeholder="Fecha alta" aria-describedby="inputGroupPrepend" required />
        <div class="invalid-feedback">
          Please choose a username.
        </div>
      </div>
    </div>
  </div>

  <a id="btnBuscar" class="btn btn-primary">Buscar</a>



<div id="resultados"></div>


<%--<div id="marco">
<img src="../img/fondo.jpg"/>

<div id="izquierda"></div>
<div id="centro"></div>
<div id="derecha"></div>

</div>--%>
    </div>
    </form>
</body>
</html>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.js" ></script>
<script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


<script type="text/javascript">

    //$("#txtFecha").datepicker();


    $("#btnBuscar").click(function () {
        var cantidad = 0;
        var baja = "";

        $.ajax({
            type: "POST",
            url: "../Json/Usuarios_NEW/Usuarios_NEW.asmx/TraerUsuarioParaActualizacion",
            data: '{usuario: "' + $("#txtUsuario").val() + '", nombre: "' + $("#txtNombre").val() + '", fechaAlta: "' + $("#txtFecha").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var encabezado = "<table class='table table-sm table-dark'>" +
                  "<thead>" +
    "<tr>" +
      "<th scope='col'>#</th>" +
      "<th scope='col'>Usuario</th>" +
                //"<th scope='col'>Password</th>" +
      "<th scope='col'>Nombre</th>" +
      "<th scope='col'>Activo</th>" +
                //"<th scope='col'>seccional</th>" +
      "<th scope='col'>Interno</th>" +
      "<th scope='col'>Email</th>" +
      "<th scope='col'>Documento</th>" +
    "</tr>" +
  "</thead>" +
  "<tbody>";
                var fila = "";
                var pie = "</tbody></table>";
                $.each(Resultado.d, function (index, item) {
                    cantidad += 1;
                    if (item.activo) { baja = "checked='checked'"; } else { baja = ""; }
                    //alert(baja);
                    fila = fila + "<tr><td style='display:none'>" + item.id + "</td>" +
                "<td>" + cantidad + "</td>" +
                "<td contenteditable>" + item.usuario + "</td>" +
                    //"<td>" + item.password + "</td>" +
                "<td contenteditable>" + item.nombre + "</td>" +
                "<td ><input type='checkbox' " + baja + " /></td>" +
                    //"<td>" + item.seccional + "</td>" +
                "<td contenteditable>" + item.interno + "</td>" +
                "<td contenteditable>" + item.email + "</td>" +
                "<td contenteditable></td></tr>";

                });

                $("#resultados").html(encabezado + fila + pie);

            },
            error: errores
        });
    });

    function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}
</script>
