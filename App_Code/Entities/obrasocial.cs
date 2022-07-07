using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for obrasocial
/// </summary>
public class obrasocial
{
	public obrasocial()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int id { get; set; }
    public string OS { get; set; }
    public bool TipoAcindar { get; set; }
}

public class ObraSocialesListar
{
    public int id { get; set; }
    public string OS { get; set; }
    public string Estado { get; set; }
    public string Direccion { get; set; }
    public string CUIT { get; set; }
}