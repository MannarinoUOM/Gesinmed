using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for vacunacion
/// </summary>
public class vacunas
{
	public vacunas()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int id { get; set; }
    public int tipo { get; set; }
    public string descripcion { get; set; }
    public bool activa { get; set; }
}

public class tipovacunas
{
    public tipovacunas()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public int id { get; set; }
    public string tipo { get; set; }
    public string descripcion { get; set; }
    public bool activo { get; set; }
}

public class aplicacion
{
public aplicacion(){}

public long afiliadoId { get; set; }
public int? vacuna { get; set; }
public long? usuario { get; set; }
public string fecha { get; set; }
public string apellido { get; set; }
public string usuarioName { get; set; }
public string vacunaName { get; set; }
public string tipo { get; set; }
public int grupoFactor { get; set; }
public long id { get; set; }
}


public class grupoFactor
{
    public grupoFactor() { }

    public int id { get; set; }
    public string descripcion { get; set; }
    public int seleccionado { get; set; }
}