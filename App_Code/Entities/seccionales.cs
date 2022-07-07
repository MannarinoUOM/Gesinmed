using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for seccionales
/// </summary>
public class seccionales
{
	public seccionales()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string Seccional { get; set; }
    public int Id { get; set; }
    public string Nro { get; set; }
  
}

public class seccional
{
    public seccional()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public string descripcion { get; set; }
    public int id { get; set; }
}

public class seccionalesListas : List<seccionales>
{ }