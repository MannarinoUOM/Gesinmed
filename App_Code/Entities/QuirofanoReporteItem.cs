using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de QuirofanoReporte
/// </summary>
public class QuirofanoReporteItem
{
    public QuirofanoReporteItem()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

    public QuirofanoReporteItem(long idd, string nombree)
    {
        id = idd;
        nombre = nombree;
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }
    public string nombre { get; set; }
    public long id { get; set; }

    ////reporte de indicadores
    public int idIndicador;
    public string codigo;
    public string descripcion;
    public Boolean titulo;
    public int cantidad;
    public Boolean soon;
    public string desde;
    public string hasta;
    public string como;
   
}

public class ParteQuirurgicoGenerado {
    public long id { get; set; }
    public string ruta { get; set; }
    public int usuario { get; set; }
    public string fecha { get; set; }
    public string usuarioName { get; set; }
}

public class celda
{
    public long id { get; set; }
    public string celdas { get; set; }
}

public class diagnostico
{
    public long id { get; set; }
    public string descripcion { get; set; }
}

public class datosAnestesia
{
public long id { get; set; }
public string celdas { get; set; }
public int anestesiologo { get; set; }
public int cirujano { get; set; }
public int cardiologo { get; set; }
public int obstetra { get; set; }
public int ayudante { get; set; }
public string inicio { get; set; }
public string fin { get; set; }
public string profilaxis { get; set; }
public string diagnostico { get; set; }
public string programada { get; set; }
public string realizada { get; set; }
public int asa { get; set; }
public int protesis { get; set; }
public int lentes { get; set; }
public int proteccion { get; set; }
public int general { get; set; }
public int nla { get; set; }
public int regional { get; set; }
public int intub { get; set; }
public int mask { get; set; }
public int espontanea { get; set; }
public int asistida { get; set; }
public int controlada { get; set; }
public int manual { get; set; }
public int mecanica { get; set; }
public string venopuntura { get; set; }
public string circuito { get; set; }
public string premedic { get; set; }
public string induc { get; set; }
public string mantenim { get; set; }
public string tecnica { get; set; }

public string posicion { get; set; }
public string anestesia { get; set; }

public string tas { get; set; }
public string tad { get; set; }
public string tam { get; set; }
public string pvs { get; set; }
public string fc { get; set; }
public string DescAnestesia { get; set; }
public string aldrete { get; set; }
public string pts { get; set; }
public int ast { get; set; }
public int depresionR { get; set; }
public int obedece { get; set; }
public int asf { get; set; }
public int depresionO { get; set; }
public int intub2 { get; set; }
public int conversa { get; set; }
public int nvpo { get; set; }
public int recup { get; set; }
public int habit { get; set; }
public int manual2 { get; set; }
public int nro { get; set; }
public int uti { get; set; }
public string alas { get; set; }
public string motivo { get; set; }
public string observaciones { get; set; }
public string pasa { get; set; }
public long cirugiaId { get; set; }
public int usuario { get; set; } 
public int prioridad {get;set;}
public decimal anestesiaNum {get;set;}
public int balon {get;set;}
public int ECG {get;set;}
public int SAT {get;set;}
public int ETCO2 {get;set;}
public int PANI {get;set;}
public int TAI {get;set;}
public int tipo { get; set; }
public int modifica { get; set; }
}