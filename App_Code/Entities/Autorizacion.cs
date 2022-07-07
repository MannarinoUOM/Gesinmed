using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Autorizaciones
/// </summary>
public class Autorizacion
{
	public Autorizacion()
	{
		//
		// TODO: Add constructor logic here
		//
	}

}
public class Modulo {
        public string nombre { get; set; }
        public int id { get; set; }

    }

public class Estado
{
    public string nombre { get; set; }
    public int id { get; set; }

}

public class SubRubro
{
    public string nombre { get; set; }
    public int id { get; set; }
    public int externo { get; set; }

}

public class Prestador
{
    public string nombre { get; set; }
    public int id { get; set; }
    public string cuit { get; set; }

}

public class Precios_Prestadores
{
    public int idPractica { get; set; }
    public int idPrestador { get; set; }
    public float valor { get; set; }
}

public class Practica_Autorizacion
{
    public int idEncabezado { get; set; }
    public decimal importe { get; set; }
    public string usuario { get; set; }
    public string fecha { get; set; }   
    public int cantidad { get; set; }
    public int idModulo { get; set; }
    public int esPractica { get; set; }

    public int codigoPrac { get; set; }
    public string nombrePrac { get; set; }
    public int codigoMod { get; set; }
    public string nombreMod { get; set; }
    public int subRubroCodigo { get; set; }
    public string subRubroNombre { get; set; }
    public int prestadorCodigo { get; set; }
    public string prestadorNombre { get; set; }
    public string prestadorCuit { get; set; }
    public int paso_sap { get; set; }
}

public class Encabezado_autorizacion 
{
    public string tipo { get; set; }
    public int subRubroId { get; set; }
    public string amb_int { get; set; }
    public int numero { get; set; }
    public string fecha { get; set; }
    public string comentarios { get; set; }
    public int especialidadId { get; set; }
    public int prestadorId { get; set; }
    public int medicoInternoId { get; set; }
    public string medicoExterno { get; set; }
    public int estadoId { get; set; }
    public string fechaTurno { get; set; }
    public string fechaAuditado { get; set; }
    public string fechaRetiro { get; set; }
    public string especialidad { get; set; }
    public string prestador { get; set; }

}

public class Detalle_Autorizacion
{
    public int codigo { get; set; }
    public string descripcion { get; set; }
    public int cantidad { get; set; }
    public float importe { get; set; }
    public int practicaModuloId { get; set; }
    public int esPractica { get; set; }

    public int codigoPrac { get; set; }
    public string nombrePrac { get; set; }
    public int codigoMod { get; set; }
    public string nombreMod { get; set; }

    public string fecha { get; set; }
    public string tipo { get; set; }
    public string subRubro { get; set; }
    public string especialidad { get; set; }
    public string proveedor { get; set; }
    public string medico { get; set; }
    public string medicoExterno { get; set; }
    public string comentarios { get; set; }
    public string estado { get; set; }
    public string fechaTurno { get; set; }
    public string fechaAuditado { get; set; }
    public string fechaRetirado { get; set; }
}
/// <summary>
/// /////modificacione
/// </summary>
public class PracticaAutoComplete
{
    public string Codigo { get; set; }
    public string Descripcion { get; set; }
}

public class DYT_Centro
{
    public int id { get; set; }
    public string descripcion { get; set; }
}

public class DYT_Item
{ 
public int id {get;set;}
public string tipo {get;set;} 
public int pacienteId {get;set;}
public string fechaPedido {get;set;}
public string horaPedido {get;set;}
public int solicitanteId {get;set;}
public int centroOrigen {get;set;}
public int especialidadOrigen {get;set;}
public int medicoOrigen {get;set;}
public string motivo {get;set;}
public int centroDestino {get;set;}
public int especialidadDestino {get;set;}
public int medicoDestino {get;set;}
public int traslado {get;set;}
public int prestacion {get;set;}
public int seguimiento {get;set;}
public string fechaInternacion {get;set;}
public string fechaAlta {get;set;}
public int estado {get;set;}
public int rechazos {get;set;}
public string usuario {get;set;}
public string diagnostico { get; set; }
public string diagnosticoID { get; set; }
public string observaciones { get; set; }
public string HC { get; set; }
public string apellidoNombre { get; set; }
public string origenNombre { get; set; }
public string destinoNombre { get; set; }
public string estadoNombre { get; set; }
public string rechazosNombre { get; set; }
public string lugar { get; set; }
public string paciente { get; set; }
public string solicitanteNombre { get; set; }
public string especialidadOrigenNombre { get; set; }
public string medicoOrigenNombre { get; set; }
public string DestinoNombre { get; set; }
public string especialidadDestinoNombre {get;set;}
public string medicoDestinoNombre { get; set; }
public string trasladoNombre { get; set; }
public string prestacionNombre { get; set; }
public string seguimientoNombre { get; set; }
//public string estadoNombre { get; set; }
}

public class Practica_Autorizacion_Express
{
    public int id { get; set; }
    public int codigoPrac { get; set; }
    public string descripcionPrac { get; set; }
    public int idMedico { get; set; }
    public string medico { get; set; }
}

public class Encabezado_Autorizacion_Express
{
    public int id { get; set; }
    public string paciente { get; set; }
    public long idPaciente { get; set; }
    public long dni { get; set; }
    public string email { get; set; }
    public string fecha { get; set; }
    public string medico { get;set; }
    public int idMedico { get; set; }
    public string observacion { get; set; }
}


public class VoucherEntities
{
    public int id { get; set; }
    public long numeroCarga { get; set; }
    public string nombre { get; set; }
    public long dni { get; set; }
    public long nhc { get; set; }
    public string destino { get; set; }
    public string fechaActual { get; set; }
    public string fechaTurno { get; set; }
    public string fechaAuditado { get; set; }
    public string nombreAutorizador { get; set; }
    public long derivacion { get; set; }
    public string practicaNombre { get; set; }
    public string comentarios { get; set; }
    public string observaciones { get; set; }
    public long practicaCod { get; set; }

}