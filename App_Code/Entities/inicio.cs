using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for inicio
/// </summary>
public class inicio
{
	public inicio()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}

public class version
{
    public long Id { get; set; }
    public string Version { get; set; }
    public string Comentario { get; set; }
    public string Fecha { get; set; }

    public version() { }
}