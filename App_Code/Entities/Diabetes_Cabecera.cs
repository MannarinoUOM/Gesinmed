using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Diabetes_Cabecera
/// </summary>
public class Diabetes_Cabecera
{
	public Diabetes_Cabecera()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public long Diabetes_Gral_Id {get;set;}
    public long Diabetes_Gral_PacienteId {get;set;}
    public string Diabetes_Gral_Edad {get;set;}
    public int UsuarioId { get; set; }
}

public class Diabetes_Diagnostico_Y_Clinica_Cabecera
{
    public Diabetes_Diagnostico_Y_Clinica_Cabecera()
    { }
    public long Diabetes_Gral_Id { get; set; }
    public long DiagYclinica_Id { get; set; }
    public string DiagYclinica_Fecha { get; set; }
    public int DiagYclinica_Edad_Diagno { get; set; }
}

public class Diabetes_Diagnostico_Y_Clinica_Resultados
{
    public Diabetes_Diagnostico_Y_Clinica_Resultados()
    {  }
    public long Diag_Cli_Resultados_Id { get; set; }
    public long Diabetes_Gral_Id { get; set; }
    public int Diag_Cli_Items_Id { get; set; }
    public bool? Diag_Cli_Items_Resultado { get; set; }
    public string nombre { get; set; }
}

public class complicaciones
{
    public complicaciones()
    { }
    public long Complicaciones_Id { get; set; }
    public long Diabetes_Gral_Id { get; set; }
    public int Complicaciones_Items_Id { get; set; }
    public bool? Complicaciones_Resultado { get; set; }
    public string Complicaciones_Resultado_Fecha { get; set; }
    public string nombre { get; set; }
}

public class tratamiento
{
    public tratamiento()
    { }
    
    public long Diabetes_Gral_Id { get; set; }
    public long Tratamiento_Id { get; set; }
    public int Tratamiento_InsulinaBasal { get; set; }
    public int Tratamiento_Insulina_Correccion { get; set; }
    public string MarcaComercial_Basal { get; set; }
    public string MarcaComercial_Correcion { get; set; }
    public string nombre { get; set; }
}

public class trataientoDetalle
{
    public trataientoDetalle()
    { }

    public long Diabetes_Gral_Id { get; set; }
    public int Tratamiento_Items_Id { get; set; }
    public bool? Tratamiento_Resultados { get; set; }
    public string nombre { get; set; }

}

public class EstudiosDetalle
{
    public EstudiosDetalle()
    { }

    public long Resultados_Result_Id { get; set; }
    public long Diabetes_Gral_Id { get; set; }
    public int Estudios_Items_Id { get; set; }
    public string Estudios_Resultados { get; set; }
    public string Estudios_Fecha { get; set; }
    public int Estudios_Combo { get; set; }
   
}

public class EstudiosExtras
{
    public EstudiosExtras()
    { }

    public int Estudios_Id { get; set; }
    public string Descripcion { get; set; }
    public bool Visible { get; set; }
    public bool Microalbuminuria { get; set; }
    public bool FondoDeOjo { get; set; }

}

public class PacienteDiabetico
{
    public PacienteDiabetico()
    { }

    public long PacienteId { get; set; }
    public long Diabetes_Gral_Id { get; set; }
    public string Nombre { get; set; }
    public long dni { get; set; }
    public string seccional { get; set; }
    public string FechaPrimeraConsulta { get; set; }
    public string FechaModificacion { get; set; }
    public string FechaConsulta { get; set; }
    public string Doctor { get; set;}
    public string FechaUltimaConsulta { get; set; }
}

public class ConsultaDiabetes
{
    public ConsultaDiabetes()
    { }

    public Diabetes_Cabecera Diabetes_Cabecera_obj = new Diabetes_Cabecera(); //{ get; set; }
    public Diabetes_Diagnostico_Y_Clinica_Cabecera Diabetes_Diagnostico_Y_Clinica_Cabecera_obj = new Diabetes_Diagnostico_Y_Clinica_Cabecera();// { get; set; }
    public List<Diabetes_Diagnostico_Y_Clinica_Resultados> Diabetes_Diagnostico_Y_Clinica_Resultados_obj = new List<Diabetes_Diagnostico_Y_Clinica_Resultados>();// { get; set; }
    public List<complicaciones> complicaciones_obj = new List<complicaciones>();// { get; set; }
    public tratamiento tratamiento_obj = new tratamiento();// { get; set; }
    public List<trataientoDetalle> trataientoDetalle_obj = new List<trataientoDetalle>();// { get; set; }
    public List<EstudiosDetalle> EstudiosDetalle_obj = new List<EstudiosDetalle>();// { get; set; }
    public EstudiosExtras EstudiosExtras_obj = new EstudiosExtras();// { get; set; }
    public PacienteDiabetico PacienteDiabetico_obj = new PacienteDiabetico();// { get; set; }
}

public class fichaDiabetes
{
    public fichaDiabetes()
    { }

    public long id { get; set; }
    public string fecha { get; set; }
}