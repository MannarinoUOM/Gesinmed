<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AtSinTurnoAyuda2.aspx.cs" Inherits="Ayuda_AtSinTurnoAyuda2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<style type="text/css">
.Titulos {color:#151515;}
.Contenidos {color:#848484;}
a {color:#848484;}
</style>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script src="../js/JPantalla.js" type="text/javascript"></script>

</head>
<body>
    <div class="DivNovedades" style="height:600px; overflow-x:hidden; overflow-y:auto; padding-top: 100px;">
    <b class="Titulos">¿Qué es Atención sin turno? </b><br />
<span class="Contenidos">La atención sin turno ha sido pensada para crear un turno, desde la venta del Bono, sin que el paciente tenga turno. No es como un sobreturno, la at. sin turno, solo funciona en el mismo día. </span><br />
<br />

<b class="Titulos">¿Qué casos pueden ser estos? </b><br />
<span class="Contenidos">Dependiendo de la seccional, hay prácticas que no es necesario pedir un turno extra. Muchas veces se le informa al paciente que concurra el mismo día de la atención, y que ese día se le realizará las prácticas, y se genera un solo turno. Luego cuando el paciente llega al centro de atención. Se debe genear un bono por práctica, es decir, si el paciente tuviera turno con Cardiología, y el mismo día el paciente necesita realizarse un electrocardiograma, Se deberian generar 2 turnos y 2 bonos.</span>
<br />

<img src="../img/Ayuda/TurnosIncorrecto.png" />
<br />
<span class="Contenidos">Como se puede observar en el gráfico de arriba, el paciente tiene <b>UN</b> solo turno, y tiene 2 Bonos para realizarse 2 practicas.</span>
<br />

<span class="Contenidos">Eso no está del todo bien, existe una relación Bono-Turno que es única, al momento de crear un turno utilizando el Nro de Turno, internamente el sistema sabe que el bono creado es para un turno en especial. Y ya no se puede volver a usar ese el Nro de Turno. Cuando se recepciona un paciente con varias practicas, es necesario generar la misma cantidad de turnos que por prácticas individuales por médico o especialista, de esa forma, el bono que emitan es usado con el turno. <br />
En el siguiente gráfico se puede observar la forma correcta. Son un turno por práctica</span><br />
<img src="../img/Ayuda/TurnosCorrecto.png" />

<br /><br />
<b class="Titulos">No quiero generar más de 1 turno, ¿puedo hacer algo?</b><br />
<span class="Contenidos">Si, si solo se genera 1 solo turno, entonces genere un solo Bono. <br />
¿Pero eso es correcto?. No.</span><br /> 
<br />
<b class="Titulos">¿Qué sucede si no cambio la forma en que estoy recepcionando?</b><br />
<span class="Contenidos">Simplemente no se factura, cuando Administración saque el listado de la facturación van a tener bonos libres, a favor del afiliado, cuando la realidad es que esos bonos fueron utilizados.</span>
<br /><br />
<b class="Titulos">Yo vengo haciendo eso desde el principio, ¿Hay forma de solucionarlo?</b><br />
<span class="Contenidos">Sí. La forma de solucionarlo es generar turnos, a todos los pacientes que tengan los bonos sin usar. Para luego recepcionar esos pacientes, con esos bonos.</span>
<br /><br />

<b class="Titulos">¿Que suecede si no utilizo el Nro de Turno para genear un Bono?</b><br />
<span class="Contenidos">Si no se utiliza el Nro de Turno para generar un Bono, es <b>NECESARIO</b> con el Bono recien emitido, dirigirse a la opción <b><a href="../AtConsultorio/RecepciondePacientes.aspx">Consultorio > Recepción de pacientes</a></b>. Si no se utiliza esa opción el bono no se factura. </span>
<br /><br />

    </div>
</body>
</html>
