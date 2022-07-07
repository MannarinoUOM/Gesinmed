using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for configuracionturnos
/// </summary>
public class configuracionturnos
{
	public configuracionturnos()
	{
		//
		// TODO: Add constructor logic here
		//        
	}

    public int minturnos { get; set; }
    public int maxturnos { get; set; }
    public int agenda { get; set; }
    public string HorariosTurnosTelefonicos { get; set; }
    public string HorariosTurnosPersonales { get; set; }
    public string Telefono { get; set; }
}