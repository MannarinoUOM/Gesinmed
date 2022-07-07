/*
* FeedEk jQuery RSS/ATOM Feed Plugin 
* http://jquery-plugins.net/FeedEk/FeedEk.html
* Author : Engin KIZIL 
* http://www.enginkizil.com
*/



function CargarNoticiasRSS() { 
        var def = { FeedUrl: '', MaxCount: 5, ShowDesc: true, ShowPubDate: true };
        Datos = "";
        var Direccion = "";
            Cual++;
            if (Cual > 5) { Cual = 1; }
            if (Cual == 1) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/origen=2'; }
            if (Cual == 2) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=131'; }
            if (Cual == 3) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=120'; }
            if (Cual == 4) { Direccion = 'http://www.minutouno.com/rss/tecnologia.xml'; }
            if (Cual == 5) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=272'; }
            def.FeedUrl = Direccion;
        var pubdt;        
        //$('#divRss').html('<div style="text-align:left; padding:3px;"><img src="../img/Espere.gif" /></div>');
        $.ajax({ url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1&output=json&q=' + encodeURIComponent(Direccion) + '&callback=?', dataType: 'json', success: function (data) {
            //$('#divRss').html(''); 
            $.each(data.responseData.feed.entries, function (i, entry) {
                Datos = Datos + '<span class="RSSTitulo"><b>' + entry.title + ':</b> </span>';
                if (def.ShowDesc) Datos = Datos + '<span class="RSSContenido">' + entry.content + ' </span>';
                Datos = Datos.replace(/<br+[^>]*>/gi, '');
                Datos = Datos.replace('<div>', '<span>');
                Datos = Datos.replace('</div>', '</span>');
                Datos = Datos.replace(/<img src=+[^>]*>/gi, '');
                Datos = Datos + '<span class="RSSImg"><foto src="../img/LogoRSS.jpg" style="vertical-align:bottom;" width="40" height="40"> </span>';
            })
            Datos = Datos.replace(/<foto+/gi, '<img');
            //alert(Datos);
            //alert(Datos);
            //$("#divRss").html(Datos + " " + Cual);
            //if (!Movido) {
            //Mover();
            //}
            //Movido = true;            
            alert(Datos);
            return Datos;
            
        }
        }
        )        
    }    
