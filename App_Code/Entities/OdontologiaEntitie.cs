using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for OdontologiaEntitie
/// </summary>
public class OdontologiaEntitie
{
	public OdontologiaEntitie()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}


public class practica {
    public practica() { }
    public string codigo { get; set; }
    public string descripcion { get; set; }
    public string valor { get; set; }
    public string talca { get; set; }
    public bool baja { get; set; }
    public int MostrarEnPresupuesto { get; set; }
}

public class procedimeinto {
    public procedimeinto() { }
    public int id { get; set; }
    public string descripcion { get; set; }
}

public class caras
{
    public caras() { }
    public int id { get; set; }
    public string descripcion { get; set; }
}


public class detalle
{
    public detalle() { }
    public long id { get; set; }
    public long turnoId { get; set; }
    public int codigo { get; set; }
    public string practica { get; set; }
    public int pieza { get; set; }
    public string caras { get; set; }
    public string caraDescripcion { get; set; }
    public string observacion { get; set; }
    public int eliminado { get; set; }
    public string fecha { get; set; }
    public int odonto { get; set; }
}

public class diente
{
    public diente() { }
    public long TurnoId { get; set; }
    public int id { get; set; }
    public int procedimiento { get; set; }
    public string fecha { get; set; }
}

public class parte
{
    public parte() { }
    public long TurnoId { get; set; }
    public int diente { get; set; }
    public string color { get; set; }
    public int seccion { get; set; }
    public string fecha { get; set; }
}

public class OrdenLaboraOdonto
{
    public OrdenLaboraOdonto() { }
    public long id { get; set; }
    public long AfiliadoId { get; set; }
    public long TurnoId { get; set; }
    public int laboratorio { get; set; }
    public string fechaEnvio { get; set; }
    public string fechaEntrega { get; set; }
    public string fechaGuardado { get; set; }
    public long idDET { get; set; }
    public string estudio { get; set; }
    public string descripcion { get; set; }
}

public class LaboratoiosOdonto
{
    public LaboratoiosOdonto() { }
    public int id { get; set; }
    public string descripcion { get; set; }
}

public class estudiosOdonto
{
    public estudiosOdonto() { }
    public int id { get; set; }
    public string descripcion { get; set; }
    public int codigo { get; set; }
    public string codigoText { get; set; }
    public decimal valorConfigurado { get; set; }
    public int cuotas { get; set; }
}

public class persupuestoCABodonto
{
    public persupuestoCABodonto() { }
    public long id { get; set; }
    public long afiliadoId { get; set; }
    public int medico { get; set; }
    public string fecha { get; set; }
    public int usuario { get; set; }
    public int eliminado { get; set; }
    public string fechaActualizado { get; set; }
    public long usuarioActualizo { get; set; }
    
}

public class persupuestoDETodonto
{
    public persupuestoDETodonto() { }
    public long idCab { get; set; }
    public int codigo { get; set; }
    public int cantidad { get; set; }
    public decimal valor { get; set; }
    public string descripcion { get; set; }
    public decimal total { get; set; }
    public string valorMostrar { get; set; }
}

public class persupuestoPAGOodonto
{
    public persupuestoPAGOodonto() { }
    public long id { get; set; }
    public long idCab { get; set; }
    public int cuota { get; set; }
    public decimal valor { get; set; }
    public int saldada { get; set; }
    public string fecha { get; set; }
    public decimal pago2 { get; set; }
    public decimal saldo { get; set; }
}

public class persupuestoCUOTAodonto
{
    public persupuestoCUOTAodonto() { }
    public long idCab { get; set; }
    public int cuota { get; set; }
    public decimal valor { get; set; }
    public int saldada { get; set; }
}

public class persupuestoBusquedaOodonto
{
    public persupuestoBusquedaOodonto() { }
    public long afiliadoId { get; set; }
    public string nombre { get; set; }
    public string documento { get; set; }
    public string nhc { get; set; }
    public long Npresupuesto { get; set; }
    public string medico { get; set; }
    public long medicoId { get; set; }
    public decimal valor {get;set;}
    public decimal pagado { get; set; }
    public decimal saldo { get; set; }
}

public class reclamo
{
    public reclamo() { }
    public long reclamoId { get; set; }
    public long afiliadoId { get; set; }
    public string afiliado { get; set; }
    public string dni { get; set; }
    public string nhc { get; set; }
    public string fechaReclamo { get; set; }
    public string fechaResolucion { get; set; }
    public int estado { get; set; }
    public string titulo { get; set; }
    public long servId { get; set; }
    public string servDescripcion { get; set; }
    public string reclamoDescripcion { get; set; }
    public string resolucion { get; set; }
    public string adjuntoReclamo { get; set; }
    public string usuApertura { get; set; }
    public string usuResolucion { get; set; }
    public string adjunto { get; set; }
    public long seccId { get; set; }
    public int retraso { get; set; }
    public int unoTdos { get; set; }
}

public class cuota{
public cuota(){}
   public long practicaId { get; set; }
   public int Ncuota { get; set; }
   public decimal valor { get; set; }
}


public class plaCAB
{
    public plaCAB() { }
    public long practicaId { get; set; }
    public decimal valorTotal { get; set; }
    public int cantidadCuotas { get; set; }
    public long usuario { get; set; }
}