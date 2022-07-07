using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for cama
/// </summary>
public class cama
{
	public cama()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int id { get; set; }
    public string descripcion { get; set; }
    public bool estado { get; set; }
    public int sala { get; set; }
    public string clase { get; set; }
    public string claseD { get; set; }
}

public class cama_A
{
    public int id { get; set; }
    public string descripcion { get; set; }
    public int sala { get; set; }
    public string Paciente { get; set; }   
}