using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for medicos
/// </summary>
public class medicos
{
	public medicos()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string Medico { get; set; }
    public long Id { get; set; }
    public string Especialidad { get; set; }
}

public class medicoslista : List<medicos>
{
}

public class medicos_Buscar
{
    public string Medico { get; set; }
    public long Id { get; set; }
    public string Especialidad { get; set; }
    public string MN { get; set; }
    public string MP { get; set; }
    public string Calle { get; set; }
    public string Nro { get; set; }
    public string Piso { get; set; }
    public string Dpto { get; set; }
    public string Localidad { get; set; }
    public string Provincia { get; set; }
    public string Documento { get; set; }
    public string Estado { get; set; }
}

public class medicos_Buscar_Info
{
    public int Id { get; set; }
    public string Medico { get; set; }
    public string FechaBaja { get; set; }
    public string MotivoBaja { get; set; }
    public string Calle { get; set; }
    public string Nro { get; set; }
    public string Piso { get; set; }
    public string Dpto { get; set; }
    public string Localidad { get; set; }
    public string CodPos { get; set; }
    public string Provincia { get; set; }
    public string Documento { get; set; }
    public string Fecha_Nacimiento { get; set; }
    public string Sexo { get; set; }
    public string CUIT { get; set; }
    public string Telefono { get; set; }
    public string AplicaRetenciones { get; set; }
    public string EMail { get; set; }
    public int Max_Sobreturno { get; set; }
    public string Observaciones { get; set; }
    public string RindeHonorario { get; set; }
    public string MostrarenTurnos { get; set; }
    public int CantUrgencia { get; set; }

    public string nombreFirmaC { get; set; }
    public string especialidadNombreC { get; set; }
    public string matriculaNacionalC { get; set; }
    public string matriculaProvincialC { get; set; }
    public string imagenRutaC { get; set; }

    public string nombreFirmaA { get; set; }
    public string especialidadNombreA { get; set; }
    public string matriculaNacionalA { get; set; }
    public string matriculaProvincialA { get; set; }
    public string imagenRutaA { get; set; }

    public string nombreFirmaCC { get; set; }
    public string especialidadNombreCC { get; set; }
    public string matriculaNacionalCC { get; set; }
    public string matriculaProvincialCC { get; set; }
    public string imagenRutaCC { get; set; }
    public int Teleconsulta { get; set; }
}


public class medicos_Buscar_Nombre
{
    public string Medico { get; set; }   

}

public class medicoslistaBuscar : List<medicos_Buscar>
{
}


public class medicos_Especialidades
{
    public int EspecialidadId {get;set;}
    public string Especialidad { get; set; }
    public bool Tipo_Guardia { get; set; }
    public bool Tipo_Quirofano { get; set; }
    public bool Tipo_Ambulatorio { get; set; }
    public bool Tipo_Internacion { get; set; }
    public string MN { get; set; }
    public string MP { get; set; }
    public bool IsActive { get; set; }
    public int CHK_ESP_SHOW { get; set; }
    public int ESP_CHK { get; set; }
}

public class MedicoEspecialidad
{
    public int EspecialidadId;
    public string Especialidad;
}

public class medicos_quirofano_x_especialidad
{    
    public string Medico { get; set; }
    public long Id { get; set; }
    public string Clase { get; set; }
}