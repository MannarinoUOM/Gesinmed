<%@ Page Language="C#" AutoEventWireup="true" CodeFile="consentimientoFirma.aspx.cs" Inherits="Internacion_consentimientoScan" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
    <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/bootstrap.js"></script>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>


    <script type="text/javascript">
        var tipo = "";
        var afiliadoId = 0;
        var UsuarioId = 0;
        var nombreArchivo = "";
        var cual = 0;

        $(document).ready(function () {
            var GET = {};
            document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                function decode(s) {
                    return decodeURIComponent(s.split("+").join(" "));
                }

                GET[decode(arguments[1])] = decode(arguments[2]);

            });

            if (GET["afiliadoId"] != "" && GET["afiliadoId"] != null) {
                tipo = GET["tipo"];
                afiliadoId = GET["afiliadoId"];
                UsuarioId = GET["UsuarioId"];
                nombreArchivo = GET["nombreArchivo"];
                cual = GET["cual"];
                iniciarProceso(afiliadoId);
            } else {
                //    alert("Intentelo nuevamente:"); return false; 
                // para vizualizar los controles remotos ya creados
                var_ = GET["ruta"];
                //alert(var_);
                MyObject = new ActiveXObject("WScript.Shell");
                MyObject.Run("file://///10.10.8.71/Software/firmar.exe " + var_);
            }
        });


        function iniciarProceso(afiliadoId) {

            var json = JSON.stringify({ "afiliadoId": afiliadoId, "tipo": tipo, "UsuarioId": UsuarioId, "nombreArchivo": nombreArchivo, "cual": cual });
            $.ajax({
                type: "POST",
                url: "../Json/Internaciones/IntSSC.asmx/copiarPDFconsentimiento",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    if (Resultado.d == "0") { alert("Intentelo nuevamente."); return false; } else {
                        //var_ = "\\\\10.10.8.66\\Files\\Software\\Aplicaciones\\Gesinmed_CONSENTIMIENTO\\Manu.pdf";
                        var_ = Resultado.d;
                        MyObject = new ActiveXObject("WScript.Shell");
                        MyObject.Run("file://///10.10.8.71/Software/firmar.exe " + var_);
                    }
                },
                error: errores
            });
        }

        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }
    </script>

 <%--   //// '//10.10.8.66/Files/Software/Aplicaciones/Gesinmed_CONSENTIMIENTO/Manu.pdf'
 C:\Program Files (x86)\pDoc Signer>"C:\Program Files (x86)\pDoc Signer\pDoc Signer.exe" "\\10.10.8.66\Files\Software\Aplicaciones\Gesinmed_CONSENTIMIENTO\Manu.pdf"
             // MyObject.Run("C:\Program Files (x86)\Internet Explorer>'C:\Program Files (x86)\Internet Explorer\iexplore.exe'");

            //var shell = WScript.CreateObject("WScript.Shell");
            //shell.Run("C:\Program Files (x86)\Internet Explorer>'C:\Program Files (x86)\Internet Explorer\iexplore.exe'"); 

            //            // Instantiate the Shell object and invoke its execute method. 
            //            var oShell = new ActiveXObject("Shell.Application");

            //            var commandtoRun = "C:\Program Files (x86)\pDoc Signer>'C:\Program Files (x86)\pDoc Signer\pDoc Signer.exe' '\\10.10.8.66\Files\Software\Aplicaciones\Gesinmed_CONSENTIMIENTO\Manu.pdf'";
            //            if (inputparms != "") {
            //                var commandParms = document.Form1.filename.value;
            //            }

            //            // Invoke the execute method. 
            //            oShell.ShellExecute(commandtoRun, commandParms, "", "open", "1");


            //            var shell = new ActiveXObject("WScript.Shell");
            //            shell.run("C:\Program Files (x86)\pDoc Signer\pDoc Signer.exe"); 
            --%>