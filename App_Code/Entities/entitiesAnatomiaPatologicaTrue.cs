using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de anatomiaPatologicaTrue
/// </summary>
public class entitiesAnatomiaPatologicaTrue
{
    public entitiesAnatomiaPatologicaTrue()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}
}

public class topografias
{
    public topografias()
    {
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }

    public int id { get; set; }
    public string codigo { get; set; }
    public string descripcion { get; set; }
}

public class procedimientos
{
    public procedimientos()
    {
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }

    public int id { get; set; }
    public string codigo { get; set; }
    public string descripcion { get; set; }
}

public class metodos
{
    public metodos()
    {
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }

    public int id { get; set; }
    public int codigo { get; set; }
    public string descripcion { get; set; }
}

public class nomenclador {
    public nomenclador() { }

    public int id { get; set; }
    public string descripcion { get; set; }
    public decimal precio { get; set; }
}

public class tecnicas { 
public tecnicas () { }

public int id { get; set; }
public string descripcion { get; set; }
}

public class diagnosticoPat
{
    public diagnosticoPat() { }

    public int id { get; set; }
    public string descripcion { get; set; }
}


public class Patologos
{
    public Patologos() { }

    public int id { get; set; }
    public string descripcion { get; set; }
}

public class sericiosPato
{
    public sericiosPato() { }

    public int id { get; set; }
    public string descripcion { get; set; }
}

public class seccionalPato
{
    public seccionalPato() { }

    public int id { get; set; }
    public string descripcion { get; set; }
}

public class estudioPato
{
    public estudioPato() { }

    public int id { get; set; }
    public string fechaInicio { get; set; }
    public string fechaSalida { get; set; }
    public string pacienteInterno { get; set; }
    public long documentoInterno { get; set; }
    public string hcInterno { get; set; }
    public string seccionalInterno { get; set; }
    public int seccionalInternoId { get; set; }
    public string hcExterno { get; set; }
    public string pacienteExterno { get; set; }
    public string seccionalExterna { get;set; }
    public int ?seccionalExternaId { get; set; }
    public string tipoEstudio {get;set;}
    public int tipoEstudioId { get; set; }
    public string medicoInterno { get; set; }
    public int medicoInternoId { get; set; }
    public string servicioInterno { get; set; }
    public int servicioInternoId { get; set; }
    public string especialidad { get; set; }
    public int especialidadId { get; set; }
    public string medicoExterno { get; set; }
    public int medicoExternoId { get; set; }
    public string servicioExterno { get; set; }
    public int servicioExternoId { get; set; }
    public string diagnosticos { get; set; }
    public string diagnosticosIds { get; set; }
    public string material { get; set; }
    public int materialId { get; set; }
    public string procedimiento { get; set; }
    public int procedimientoId { get; set; }
    public string metodo { get; set; }
    public int metodoId { get; set; }
    public int protocolo { get;set; }
    public string tecnicasEspeciales {get;set;}
    public string tecnicasEspecialesIds { get; set; }
    public string nomenclador { get; set; }
    public int nomencladorId { get; set; }
    public string macro { get; set; }
    public string micro { get; set; }
    public string diagnostico { get; set; }
    public int ?afiliadoId { get; set; }
    public int externo { get; set; }
    public string telefono { get; set; }
    public string tipoDoc { get; set; }
    public int diagnosticador { get; set; }
    public string tecnicasEspViejas { get; set; }
    public int existeProtocolo { get; set; }
    public string diagnosticoTab { get; set; }

    public int ?tacos { get; set; }
    public int ?preparados { get; set; }
    public string receptoresHormonales { get; set; }
    public string placa { get; set; }
    public int ?tecEspCantidad { get; set; }
    public int ?tecIhqCantidad { get; set; }
    public int usuario { get; set; }
    public int pendiente { get; set; }
    public string materialCod { get; set; }
    public string procedimientoCod { get; set; }
    public string metodoCod { get; set; }
    public string informeComplementario { get; set; }

}

public class busquedaPato { 

    public busquedaPato(){}

public string desdeIng {get;set;}
public string hastaIng {get;set;}
public string desdeSal {get;set;}
public string hastaSal {get;set;}
public string paciente {get;set;}
public string dni {get;set;}
public string hc {get;set;}
public int seccional {get;set;}
public int tipoEstudio {get;set;}
public int medicoCentral {get;set;}
public int servicio {get;set;}
public int especialidad {get;set;}
public int medicoExt {get;set;}
public int servicioExt {get;set;}
public int cDiagnostico {get;set;}
public int material {get;set;}
public int procedimiento {get;set;}
public int metodo {get;set;}
public int protocolo {get;set;}
public int diagnosticador {get;set;}
public int tEspeciales {get;set;}
public int NN {get;set;}
public string placa {get;set;}
public string pacienteExterno {get;set;}
public string nhcExterno { get; set; }
public long PAT_ID { get; set; }
}

//// farmacia

public class farmaciaPedido {
    public farmaciaPedido() { }

    public string servicio { get; set; }
    public int cantidad { get; set; }
    public string insumo { get; set; }
    public string gramaje { get; set; }
    public string presentacion { get; set; }
    public string medida { get; set; }
    public string marca { get; set; }

}

public class PAP_Item {

    public PAP_Item() { }

    public int id { get; set; }
    public string descripcion { get; set; }
    public int tipo { get; set; }
}

public class PAP_Estudio {

    public PAP_Estudio() { }

    public int id { get; set; }
    public int pacienteId { get; set; }
    public string paciente { get; set; }
    public string hc { get; set; }
    public int usuario { get; set; }
    public string fechaCarga { get; set; }
    public int borrado { get; set; }
    public string adecuacionMuestra { get; set; }
    public int adecuacionMuestraIdS { get; set; }
    public string adecuacionMuestraName { get; set; }
    public int categoriaGeneral { get; set; }
    public string categoriaGeneralName { get; set; }
    public int servicio { get; set; }
    public string servicioName { get; set; }
    public string fechaIngreso { get; set; }
    public int protocolo { get; set; }
    public int flora { get; set; }
    public string floraname { get; set; }
    public int microorganismos { get; set; }
    public string microorganismosIds { get; set; }
    public string microorganismosName { get; set; }

    public string noNeoplasticos { get; set; }
    public string noNeoplasticosName { get; set; }
    public int noNeoplasticosIdS { get; set; }

    public string celulasEscamosas { get; set; }
    public string celulasEscamosasName { get; set; }
    public int celulasEscamosasIds { get; set; }

    public int celulasGladulares { get; set; }
    public string celulasGladularesName { get; set; }
    public int ValoracionHormonal { get; set; }
    public string ValoracionHormonalName { get; set; }
    public string comentario { get; set; }
    public string fechaDiagnostico { get; set; }
    public string fechaEntrega { get; set; }
    public string fechaNotificacion { get; set; }
    public int diagnosticador { get; set; }
    public string diagnosticadorName { get; set; }
    public string pacienteExterno { get; set; }
    public string hcExterno { get; set; }
    public int SeccionalExterna { get; set; }
    public string seccionalExternaName { get; set; }
    public string fechaIngresoDesde { get; set; }
    public string fechaIngresoHasta { get; set; }
    public string fehcaDiagnosticoDesde { get; set; }
    public string fechaDiagnosticoHasta { get; set; }
    public string fechaEntregaDesde { get; set; }
    public string fechaEntregaHasta { get; set; }
    public string fechaNotificacionDesde { get; set; }
    public string fechaNotificacionHasta { get; set; }
    public long documento_real { get; set; }
    public int seccional { get; set; }
    public string seccionalName { get; set; }
    public int externo { get; set; }
    public int medicoInternoId { get; set; }
    public string medicoInternoName { get; set; }
    public int medicoExternoId { get; set; }
    public string medicoExternoName { get; set; }
  
}
//606
public class PAP_Estudio_Viejo
{
    public PAP_Estudio_Viejo() { }

    public int id { get; set; }
    public int idPaciente { get; set; }
    public string apellido { get; set; }
    public string hc { get; set; }
    public string seccional { get; set; }
    public string protocolo { get; set; }
    public string medico { get; set; }
    public string fechaCarga { get; set; }
    public string evaluacion { get; set; }
    public string diagnostico { get; set; }
    public string comentario { get; set; }
    public string comentarioDiagnostico { get; set; }
    public string condicionMuestra { get; set; }
    public int superficiales { get; set; }
    public int intermedias { get; set; }
    public int parabasales { get; set; }
    public string otrosElementos { get; set; }
    public string glandulares { get; set; }
    public string escamosas { get; set; }
    public string tipo_doc { get; set; }
    public int documento_real { get; set; }
    public string fecha_entrega { get; set; }
    public string vinculable { get; set; }
    public string otros_comentario { get; set; }
    public string aspecto { get; set; }
    public string presencia { get; set; }
    public string elementos { get; set; }
}

public class reasinarProtocolo{
    public reasinarProtocolo() { }

    public int internoExterno { get; set; }
    public string nhc { get; set; }
    public int seccionalId { get; set; }
    public string seccionalName { get; set; }
    public string afiliadoname { get; set; }
    public int idEstudio { get; set; }
    public string pacienteInternoName { get; set; }
    public long dni { get; set; }
    public string telefono { get; set; }
    public string edad { get; set; }
    public long afiliadoId { get; set; }
    public string foto { get; set; }
}