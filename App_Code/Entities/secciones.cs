using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for secciones
/// </summary>
public class secciones
{
	public secciones()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int cod  { get; set; }
    public string nombre { get; set; }
}

public class secciones_det
{
    public int cod { get; set; }
    public int principal { get; set; }
    public string nombre { get; set; }
    public bool estado { get; set; }
    public string clase { get; set; }
}