using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for diasdeatencion
/// </summary>
public class diasdeatencion_Vista
{
    public diasdeatencion_Vista()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string Dia { get; set; }
    public string Inicio  { get; set; }
    public string Fin { get; set; }
    public string Consultorio { get; set; }
    public string Especialidad { get; set; }
    public string Duracion { get; set; }
    public string Medico { get; set; }
    public int Id { get; set; }
    public int ConsultorioId { get; set; }

}

public class diasdeatencion_Vista_Lista: List<diasdeatencion_Vista>
{
}

public class diasdenoatencion
{

    public string FechaDesde { get; set; }
    public string FechaHasta { get; set; }
    public string MotivoAusencia { get; set; }
    public int EspecialidadId { get; set; }
    public int Id { get; set; }
}


public class IMG_diasdenoatencion
{
    public string FechaDesde { get; set; }
    public string FechaHasta { get; set; }
    public string HoraDesde { get; set; }
    public string HoraHasta { get; set; }
    public string MotivoAusencia { get; set; }

    public int Medico { get; set; }
    public int Especialidad { get; set; }    

    public long Id { get; set; }
}


public class IMG_Dias_Extraordinario
{
    public string Dia { get; set; }
    public string Inicio  { get; set; }
    public string Fin { get; set; }
    public string Consultorio { get; set; }
    public string Especialidad { get; set; }
    public string Duracion { get; set; }
    public string Medico { get; set; }
    public long Id { get; set; }
    public int ConsultorioId { get; set; }
    public string HoraInicio { get; set; }
    public string HoraFin{ get; set; }
}