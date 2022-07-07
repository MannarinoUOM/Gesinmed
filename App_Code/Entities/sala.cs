using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for sala
/// </summary>
public class sala
{
	public sala()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int id { get; set; }
    public string descripcion { get; set; }
    public bool estado { get; set; }
    public int servicio { get; set; }
    public string clase { get; set; }
    public string claseD { get; set; }
}

public class disponibilidadsala
{
    public int Libres { get; set; }
    public int Ocupadas { get; set; }
    public int Totales { get; set; }
}

public class sala_A
{
    public int id { get; set; }
    public string descripcion { get; set; }
    public bool estado { get; set; }
    public int servicio { get; set; }
    public string clase { get; set; }
    public string claseD { get; set; }
    public int Ocupadas { get; set; }
    public int Libres { get; set; }
    public int Totales { get; set; }
}