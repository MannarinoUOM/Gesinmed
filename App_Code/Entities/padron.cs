using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for padron
/// </summary>
public class titular
{  
      public int cod_os { get; set; }
      public Int64 cuit { get; set; }
      public int seccional { get; set; }
      public Int64 cuil_titu { get; set; }
      public string fechaalta { get; set; }
      public string fechaactualizacion { get; set; }
      public string fechabaja { get; set; }
      public int documento { get; set; }
      public string SeccionalNombre { get; set; }
      public string apellido { get; set; }
      public string RazonSocial { get; set; }
    

}

public class personas
{  
    public Int64 cuil_titu { get; set; }
    public long cuit { get; set; }
    public int cod_pariente { get; set; }
    public Int64 cuil { get; set; }
    public long documento { get; set; }
    public long documento_real { get; set; }
    public string tipo_docu { get; set; }
    public string apellido { get; set; }
    public int sexo { get; set; }
    public string fecha_nacimiento { get; set; }
    public string calle { get; set; }
    public string numero { get; set; }
    public string piso { get; set; }
    public string depto { get; set; }
    public string localidad { get; set; }
    public string cod_pos { get; set; }
    public int provincia { get; set; }
    public string telefono { get; set; }
    public string fechaalta { get; set; }
    public string fechaactualizacion { get; set; }
    public string fechabaja { get; set; }
    public string fechaaltapadron { get; set; }
    public string usuario { get; set; }
    public string titular { get; set; }
    public string email { get; set; }
    public int discapacidad { get; set; }
    public string FVDiscapacidad { get; set; }
    public string AnioCertificado { get; set; }
    public string ObraSocial { get; set; }
    public bool C1 { get; set; }
    public bool C2 { get; set; }
    public bool EsEstudiante { get; set; }
    public bool PMI { get; set; }
    public bool PI { get; set; }
    public string NHC_Old { get; set; }
    public string NHC_UOM { get; set; }
    public int SeccionalId { get; set; }
    public int ObraSocialId { get; set; }
    //Fede
    public string EstadoCivil { get; set; }
    public string Nacionalidad { get; set; }
    public string NroCarnet { get; set; }
    public string Celular { get; set; }
    public string FechaPMI { get; set; }
    public string UsuAlta { get; set; }
    public string UsuModi { get; set; }
    public string Edad_Format { get; set; }
    public bool Alto_Riesgo { get; set; }
    //Ger
    public string Foto { get; set; }
///////////////////////////////////MANUEL
    public int edad { get; set; }
    public string seccional { get; set; }
    public string servicio { get; set; }
    public string cama { get; set; }
    public string medico {get; set;}
}

public class codpariente
{
    public int codigo { get; set; }
    public string descripcion { get; set; }
}

public class codprovincias
{
    public int codigo { get; set; }
    public string descripcion { get; set; }
}

public class empresas
{
    public int numero { get; set; }
    public string razonsocial { get; set; }
    public string cuit { get; set; }
}

public class PatologiasAltoRiesgo
{
    public string codigo { get; set; }
    public string descripcion { get; set; }
    public bool altoRiesgo { get; set; }
    public int tiene { get; set; }
}