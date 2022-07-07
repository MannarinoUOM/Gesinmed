	    var Cual = 0;
	    var Datos = "";
	    var Contador = 0;  


	
   var use_debug = false;

	    function debug() {
	        if (use_debug && window.console && window.console.log) console.log(arguments);
	    }

	    // on DOM ready
	    $(document).ready(function () {
	        $(".marquee").marquee({
	            loop: -1
	            // this callback runs when the marquee is initialized
			, init: function ($marquee, options) {
			    debug("init", arguments);

			    // shows how we can change the options at runtime
			    if ($marquee.is("#marquee2")) options.yScroll = "bottom";
			}
	            // this callback runs before a marquee is shown
			, beforeshow: function ($marquee, $li) {
			    Contador++;
			    //alert(Contador);
			    debug("beforeshow", arguments);
			    //if (Contador > 2) { alert("Se han visto todas las noticias"); }
			    //if (Contador > 2) { $("#marquee5").marquee('pause'); BorrarTodo(); return false; }
			    // check to see if we have an author in the message (used in #marquee6)
			    var $author = $li.find(".author");
			    // move author from the item marquee-author layer and then fade it in
			    if ($author.length) {
			        $("#marquee-author").html("<span style='display:none;'>" + $author.html() + "</span>").find("> span").fadeIn(850);
			    }
			}
	            // this callback runs when a has fully scrolled into view (from either top or bottom)
			, show: function () {
			    debug("show", arguments);
			    //CargarNoticiasRSS();			    
			}
	            // this callback runs when a after message has being shown
			, aftershow: function ($marquee, $li) {
			    debug("aftershow", arguments);
			    //CargarNoticiasRSS();
			    // find the author
			    var $author = $li.find(".author");
			    // hide the author
			    if ($author.length) $("#marquee-author").find("> span").fadeOut(250);
			}
            , pauseOnHover: false
	        });
	    });

	    var iNewMessageCount = 0;

	    function addMessage(selector, Mensaje) {
	        // increase counter
	        iNewMessageCount++;

	        // append a new message to the marquee scrolling list
	        var $ul = $(selector).append("<li>" + Mensaje + "</li>");
	        // update the marquee
	        $ul.marquee("update");
	    }

	    function BorrarTodo() {
	        Contador = 0;
	        iNewMessageCount = 0;
	        $("#marquee5").empty();
	        CargarNoticiasRSS();
	        $("#marquee5").marquee('resume');
        }
		
		
		function CargarNoticiasRSS() {
        var Datoss = "";
        var Direccion = "";
        Cual++;
        if (Cual > 5) { Cual = 1; }
        if (Cual == 1) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/origen=2'; }
        if (Cual == 2) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=131'; }
        if (Cual == 3) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=120'; }
        if (Cual == 4) { Direccion = 'http://www.minutouno.com/rss/tecnologia.xml'; }
        if (Cual == 5) { Direccion = 'http://contenidos.lanacion.com.ar/herramientas/rss/categoria_id=272'; }
        var pubdt;
        $.ajax({ url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=0&output=json&q=' + encodeURIComponent(Direccion) + '&callback=?', dataType: 'json', success: function (data) {
            $.each(data.responseData.feed.entries, function (i, entry) {
                Datoss = Datoss + '<span class="RSSTitulo"><b>' + entry.title + ':</b> </span>';
                Datoss = Datoss + '<span class="RSSContenido">' + entry.content + ' </span>';                
                Datoss = Datoss.replace(/<br+[^>]*>/gi, '');
                Datoss = Datoss.replace('<div>', '<span>');
                Datoss = Datoss.replace('</div>', '</span>');
                Datoss = Datoss.replace(/<img src=+[^>]*>/gi, '');
                Datoss = Datoss + '<span class="RSSImg"><foto src="../img/LogoRSS.jpg" style="vertical-align:bottom;" width="40" height="40"> </span>';                
            })
            Datoss = Datoss.replace(/<foto+/gi, '<img');
            addMessage('#marquee5', Datoss);
        }
        });
    }

	function CargarTodas()
	{
    for (var i = 0; i < 5; i++) {
        CargarNoticiasRSS();
    }
	}
