using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for firma
/// </summary>
public class firma
{
	public firma()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public long id { get; set; }
    public long medicoId { get; set; }
    public long especialidadId { get; set; }
    public string especialidadNombre { get; set; }
    public long matriculaNacional { get; set; }
    public long matriculaProvincial { get; set; }
    public string imagenRuta { get; set; }
    public string fecha { get; set; }
    public int usuario { get; set; }
    public int activo { get; set; }
    public string nombreFirma { get; set; }
    public string nombreArchivo { get; set; }
    public int confirmada { get; set; }
    public string nombreConfirma { get; set; }
}