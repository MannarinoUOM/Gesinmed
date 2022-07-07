using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Menus
/// </summary>
public class Menus
{
	public Menus()
	{
		//
		// TODO: Add constructor logic here
		//
	    }
    public int id { get; set; }
    public string descripcion { get; set; }
    public string apodo { get; set; }
    public string Es { get; set; }
    public int quetabla { get; set; }
}

public class cantidades {
    public cantidades() { }

    public int sin_cargar { get; set; }
    public int cargados {get;set;}
    public int pacientes { get; set; }
    public int acompañante { get; set; }
    public int totalPacientes { get; set; }
}


public class encabezadoNutricion
{
    public encabezadoNutricion() { }
    public string telefono { get; set; }
    public string localidad { get; set; }
    public string NHC_UOM { get; set; }
    public long documento_real { get; set; }
    public string apellido { get; set; }
    public int edad { get; set; }
    public string seccional { get; set; }
    public string servicio { get; set; }
    public string cama { get; set; }
    public string medico { get; set; }
    public string documento { get; set; }
    public string sala { get; set; }
    public string fehcaInternacion { get; set; }
    public string patologia { get; set; }
    public DateTime fecha_nacimiento { get; set; }
    public string Edad_Format { get; set; }
    public string fecha_Egreso { get; set; }
    public string foto { get; set; }
}


public class indicacionesNutricion
{
    public indicacionesNutricion() { }

    public string REM_NOMBRE { get; set; }
    public string indicacion { get; set; }
    public string codAlmuerzo { get; set; }
    public string descAlmuerzo { get; set; }
    public int idAlmuerzo { get; set; }
    public string codCena { get; set; }
    public string descCena { get; set; }
    public int idCena { get; set; }
    public long id { get; set; }
    public int AIdAlmuerzo { get; set; }
    public string Aalmuerzo { get; set; }
    public int AidCena { get; set; }
    public string Acena { get; set; }

}

public class pedidoNutricion
{
    public pedidoNutricion() { }

    public long idPedido { get; set; }
    public string tipificacion { get; set; }
    public string dieta { get; set; }
    public int cantidad { get; set; }
    public string fecha { get; set; }
    public string codAlmuerzo { get; set; }
    public string desAlmuerzo { get; set; }
    public string codCena { get; set; }
    public string desCena { get; set; }
    public int dietaId { get; set; }
    public long nInt { get; set; }
    public string sala { get; set; }
    public string cama { get; set; }
    public string nhc { get; set; }
    public string afiliado { get; set; }
    public string fIngreso { get; set; }
    public string diagnosticoIngreso { get; set; }
    public string seccional { get; set; }
    public string servicio { get; set; }
    public string aAlmuerzo { get; set; }
    public string aCena { get; set; }
    public int cantidadAcompañante { get; set; }
    public string piso { get; set; }
    public int confirmado { get; set; }
    public long idInternacion { get; set; }
    public long idPaciente { get; set; }
    public string idsAlmuerzo { get; set; }
    public string idsCena { get; set; }
    public string fechaEgreso { get; set; }
    public long idAcompanante { get; set; }
    public int acomp_id_almuerzo { get; set; }
    public int acomp_id_cena { get; set; }
    public int AlmuerzoConfirm { get; set; }
    public int cenaConfirm { get; set; }
    public int acompConfirmado { get; set; }
}

public class internacionIds
{
    public internacionIds() { }

    public long id;
    public string nombre;
    public string fechaEgreso;
}


public class nutricionAcompañante
{
    public nutricionAcompañante() { }

    public long id { get; set; }
    public long idIntenacion { get; set; }
    public string fecha { get; set; }
    public int idalmuerzo { get; set; }
    public string codAlmuerzo { get; set; }
    public int idCena { get; set; }
    public string codCena { get; set; }
    public int hay { get; set; }
}

public class nutricionTotalDiarias
{
    public nutricionTotalDiarias() { }

    public string fecha { get; set; }
    public int tipo { get; set; }
    public int personalComedor { get; set; }
    public int ambulatorio {get;set;}
    public int medicos { get; set; }
    public int dietasEspeciales { get; set; }
    public int usuario { get; set; }
    public string tipoNombre { get; set; }
    public int existe { get; set; }
}

public class itemCatering {
    public itemCatering() { }

    public int id { get; set; }
    public string dieta { get; set; }
    public int dietaId { get; set; }
    public int cantidad { get; set; }
    public string fecha { get; set; }
    public int existe { get; set; }
}