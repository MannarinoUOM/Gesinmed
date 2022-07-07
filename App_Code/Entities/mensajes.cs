using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for mensajes
/// </summary>
public class mensajes
{
	public mensajes()
	{
		//
		// TODO: Add constructor logic here
		//
    }

    public int id { get; set; }
    public string mensaje { get; set; }
    public string fecha { get; set; }
    public DateTime fechaLeido { get; set; }
    public string respuesta { get; set; }
    public string encabezado { get; set; }
    public string numero { get; set; }
    public string tipo { get; set; }
    public string UsuarioEnviado { get; set; }
    public string UsuarioNotificado { get; set; }
    public bool importante { get; set; }

}