using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Insulinas
/// </summary>
public class Insulinas
{
	public Insulinas()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int id { get; set; }
    public int codigo { get; set; }
    public string nombre { get; set; }
    public string nombreComercial { get; set; }
    public bool basal { get; set; }
    public bool correccion { get; set; }
}