using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for practicas
/// </summary>
public class practicas
{
	public practicas()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int Id {get; set;}
    public int Codigo { get; set; }
    public string Practica { get; set; }
}

public class practicaLista : List<practicas>
{ 
}

public class practicas_edicion
{
    public int Id { get; set; }
    public string Descripcion { get; set; }
    public string Activa { get; set; }
    public int Codigo { get; set; }
    public string PF { get; set; }
    public string PG { get; set; }
    public string PP { get; set; }
}

public class IMG_Practicas
{    
    public long PracticaId { get; set; }
    public long PracticaCodigo { get; set; }
    public string PracticaNombre { get; set; }
    public int PracticaDuracion { get; set; }
    public string Comentario { get; set; }
    public int Eliminado { get; set; }
    public string Indicacion { get; set; }
    public string Abreviacion { get; set; }
    public bool SeInforma { get; set; }
}