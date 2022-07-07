using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for especialidades
/// </summary>
public class especialidades
{
	public especialidades()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string Especialidad { get; set; }
    public long Id { get; set; }
    public string descripcion { get; set; }
    public int id { get; set; }
    public int teleconsulta { get; set; }

}    

public class Especialidad
{
    public Especialidad()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public string Especialidad_Nombre { get; set; }
    public long Id { get; set; }
    public bool Activa { get; set; }
    public bool Turnos { get; set; }
}