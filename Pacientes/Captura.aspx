<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Captura.aspx.cs" Inherits="Fotos_Captura" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

<script src="../js/webcam.js" type="text/javascript"></script>

<script language="JavaScript">
    webcam.set_api_url('Foto.aspx');
    webcam.set_quality(10); // JPEG quality (1 - 100)
    webcam.set_shutter_sound(true); // play shutter click sound
 </script>


    <title></title>
    
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div style="background-image: url('Polaroid.jpg'); width: 433px; height: 389px;">
        <div style="position:absolute; margin-top:51px; margin-left:50px; top: 15px; left: 10px; height: 246px; width: 329px;">
        <script language="JavaScript">
            document.write(webcam.get_html(320, 240));
	    </script>
        </div>

        
        <div style="position:absolute;width: 60px; height: 60px; margin-top:305px; margin-left:48px;">		
            
            <div>
            <table style="width: 330px">
            <tr>
            <td style="width: 65px;"><a href="javascript:take_snapshot();">
                <img src="../img/camara.png" width="50" /></a></td>
            <td style="width: 247px;">
                <asp:Label ID="LblCuil" runat="server" Text="Label" Font-Bold="True" 
                    Font-Names="Arial" Font-Size="20pt"></asp:Label></td>
            </tr>
            </table>
                       
            
            </div>          
            
        </div>           
            <form>
        &nbsp;</form>
        </div>


	    

        </div>
        

    <script language="JavaScript">
        webcam.set_hook('onComplete', 'my_completion_handler');

        function take_snapshot() {
            // take snapshot and upload to server
            webcam.set_api_url('Foto.aspx?CUIL=<% CUIL(); %>'   );
            document.getElementById('upload_results').innerHTML = '<h1>Uploading...</h1>';
            webcam.snap();
        }

        function my_completion_handler(msg) {
            // extract URL out of PHP output
            if (msg.match(/(http\:\/\/\S+)/)) {
                var image_url = RegExp.$1;
                // show JPEG image in page
                document.getElementById('upload_results').innerHTML =
					'<h1>Upload Successful!</h1>' +
					'<h3>JPEG URL: ' + image_url + '</h3>' +
					'<img src="' + image_url + '">';

                // reset camera for another shot
                webcam.reset();
            }
            else alert("PHP Error: " + msg);
        }
    </script>

    <div id="upload_results" style="background-color:#eee;"></div>

    </div>
    </form>
</body>
</html>
