using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Hemoterapia
/// </summary>
public class Hemoterapia
{
	public Hemoterapia()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}

public class solicitudTransfusion { 

public long id {get;set;}
public long afiliadoId {get;set;}
public string diagnostico {get;set;}
public string hematocrito {get;set;}
public string hb {get;set;}
public string plaquetas {get;set;}
public string leucocitos {get;set;}
public string quick {get;set;}
public string kptt {get;set;}
public string tt {get;set;}
public string fc {get;set;}
public string ta {get;set;}
public string otros {get;set;}
public string defecha {get;set;}
public string desplamatizados {get;set;}
public string plasma {get;set;}
public string plasmacongelado {get;set;}
public string plaquetario {get;set;}
public string precipitados {get;set;}
public string granulocitario {get;set;}
public string entera {get;set;}
public bool irradiados {get;set;}
public bool lavados {get;set;}
public bool desleucocitos {get;set;}
public bool pediatria {get;set;}
public int caractertrasnfusion {get;set;}
public bool anteriores {get;set;}
public bool alergicas {get;set;}
public bool obstetricos {get;set;}
public bool tranfusionales {get;set;}
public int petransfucional {get;set;}
public string grupoAbo {get;set;}
public string rhd {get;set;}
public string fenotipo {get;set;}
public string anticuerpos {get;set;}
public string observaciones {get;set;}
public int usuario {get;set;}
public string fecha {get;set;}
public int estado { get; set; }
}

public class unidadesTransfundir{

public long id  { get; set; }
public long idEncabezado  { get; set; }
public string Nunidad  { get; set; }
public string comprobante  { get; set; }
public string grupoFactor  { get; set; }
public string fecha  { get; set; }
public string hora  { get; set; }
public string aspecto  { get; set; }
public string color { get; set; }
}
