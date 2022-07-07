using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for anatomiapatologica
/// </summary>
public class AnatomiaPatologica_Material
{
    public AnatomiaPatologica_Material()
	{

	}

    public long Id { get; set; }
    public string Descripcion { get; set; }
    public string Codigo { get; set; }
}

public class AnatomiaPatologica_Metodos
{
    public AnatomiaPatologica_Metodos()
    {

    }

    public long Id { get; set; }
    public string Descripcion { get; set; }
}

public class AnatomiaPatologica_Procedimientos
{
    public AnatomiaPatologica_Procedimientos()
    {

    }

    public long Id { get; set; }
    public string Descripcion { get; set; }
    public string Codigo { get; set; }
}


public class AnatomiaPatologica_ProtocoloCab
{
    public AnatomiaPatologica_ProtocoloCab()
    {

    }

    public long NroProtocolo { get; set; }
    public string Fecha { get; set; }
    public long NHC { get; set; }
    public bool Pendiente { get; set; }
    public bool Baja { get; set; }
    public long UsuarioId { get; set; }
}


public class AnatomiaPatologica_ProtocoloDet
{
    public AnatomiaPatologica_ProtocoloDet()
    {

    }
    public long NroProtocolo { get; set; }
    public string MaterialId { get; set; }
    public string ProcedimientoId { get; set; }
    public string MetodosId { get; set; }
    public long EspecialidadId { get; set; }
    public long ServicioId { get; set; }
    public long MedicoCentralId { get; set; }
    public string ServicioExt { get; set; }
    public string Estadistica {get;set;}
    public string NroEstudio { get; set; }
    public string MedicoExt {get;set;}
    public string Macroscopia { get; set; }
    public string Microscopia {get;set;}
    public string Diagnostico { get; set; }
    public string Especiales {get;set;}
    public string CodDiagnostico { get; set; }
    public string NomencladorId { get; set; }
    public int Tacos { get; set; }
    public int Preparados {get;set;}
    public string FechaSalida {get;set;}
     public int EspecialesCant { get; set; }
    public int IHQCant {get;set;}
    public bool RecepHormonales {get;set;}
    public bool Placa {get;set;}
}


public class AnatomiaPatologica_Nomenclador
{
    public AnatomiaPatologica_Nomenclador()
    {

    }

    public long Id { get; set; }
    public string Descripcion { get; set; }
    public decimal Valor { get; set; }
}

public class AnatomiaPatologica_Diagnostico
{
    public AnatomiaPatologica_Diagnostico()
    {

    }

    public long Id { get; set; }
    public string Descripcion { get; set; }
}
