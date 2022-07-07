<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UnicosBonosTurnos.aspx.cs" Inherits="Ayuda_UnicosBonosTurnos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>    
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    

</head>
<body>

    <div class="DivNovedades" style="height:600px; overflow-x:hidden; overflow-y:auto; padding-top: 100px;">
    Usuarias del Sistema seccional Quilmes.<br />
Les comento que al parecer se está recepcionado de forma incorrecta. Tal vez fue un error mío de no ser claro. O tal vez se mal entendió algo. Es por ese motivo que les voy a escribir la siguiente guía. Para que entiendan el porque de las cosas.
<br /><br /><b>Comenzamos desde el principio</b><br />
Cuando un paciente viene a pedir un turno, para realizarse una determinada práctica ustedes les dan un turno. Eso está muy bien, pero ¿Qué sucede cuando el paciente tiene diferentes practicas?, por ejemplo Clínico y Flebólogo, no le dan un solo turno, sino que le dan 2 turnos. Lo mismo sucede con las Rx o los E.C.G. El problema es que no tienen generados profesionales para esa área. Entonces quiero creer que es por eso que están poniendo en el turno todas las prácticas. Es decir, en el turno del cardiólogo, la consulta y el electro. Lo correcto es dar un turno para rayos. Un turno para Electro por separado, sin la consulta. Yo les recomiendo que se creen 2 profesionales, una para las placas y otro para los electros, y si hay practicas que el medico no las hacen también. Que tengan días de At. De Lunes a Domingo. De 08 a 12 hs por ejemplo.  
<br /><br />
<b>¿A que voy con todo eso? </b><br />
A que la relación del Bono-Turno es única, cuando ustedes confirmar un turno usando el Nro de Turno, y crean un nuevo Bono, internamente el sistema sabe que el bono que usaron es para un turno en especial. Y ya no se puede volver a usar el Nro de Turno. Cuando ustedes recepcionan un paciente que se viene a realizar varias practicas generan 2 o más bonos. Eso esta bien, pero necesitarían generar la misma cantidad de turnos, de esa forma, el bono que emitan es cancelado con el turno. 
<br /><br />
<b>No quiero generar más de 1 turno, ¿puedo hacer algo?</b><br />
Si, si solo generan 1 solo turno, entonces generen un solo Bono. <br />
¿Pero eso es correcto?. No.<br /> 
<br />
<b>¿Qué pasa si no cambio lo que estoy haciendo?</b><br />
Simplemente no se factura, cuando Administración saque el listado van a ver que tienen bonos sin que aparezcan en los listados. Tengan en cuenta que, no es por escarchar a nadie, pero sus nombres aparecen en los movimientos de los pacientes. Y dar un turno, decepcionarlo, venderle un bono, son movimientos.
<br /><br />
<b>Yo vengo haciendo eso desde el principio, ¿Hay forma de solucionarlo?</b><br />
Si. La forma de solucionarlo es generar turnos, a todos los pacientes que tengan los bonos sin usar. Para luego recepcionar esos pacientes, con esos bonos.
<br /><br />
Espero haber sido claro. <br />
Estoy a su disposición.<br />
Saludos cordiales,<br />
Sistemas<br />

    </div>

</body>
</html>
<script src="../js/JPantalla.js" type="text/javascript"></script>