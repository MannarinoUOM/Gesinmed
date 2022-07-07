using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for laboratorio
/// </summary>
public class laboratoriopracticas
{
    public laboratoriopracticas()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public string PracticaId { get; set; }
    public int SubPracticaCodigo { get; set; }
    public string Comentario { get; set; }
    public int Estado { get; set; }   
}



public class laboratorioBuscar
{
    public string NroProtocolo { get; set; }
    public string Fecha { get; set; }
    public string documento { get; set; }
    public string cuil { get; set; }
    public string apellido { get; set; }
    public string TOrden { get; set; }
}

public class LaboratorioPreparacion
{
    public string Codigo { get; set; }
    public string Nombre { get; set; }
    public string Preparacion { get; set; }

}

public class laboratoriopracticasLista : List<laboratoriopracticas>
{
}