using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for historiaclinica
/// </summary>
public class historiaclinica
{
	public historiaclinica()
	{
		//
		// TODO: Add constructor logic here
		//

     }
    public string HClinica { get; set; }

}

public class lista_protocolos
{
    public string ruta { get; set; }
    public string archivo { get; set; }
}


public class otras
{
    public long id { get; set; }
    public int documentacion_tipo { get; set; }
    public long documentacion_autorizacion_id { get; set; }
    public int documentacion_count { get; set; }
    public string documentacion_archivo { get; set; }
    public string documentacion_fecha { get; set; }
    public int documentacion_eliminado { get; set; }
    public string nombre { get; set; }
}

public class labo_protocolos
{
    public int documento { get; set; }
    public string protocolo { get; set; }
    public string archivo { get; set; }
    public string fecha { get; set; }
    public string ruta { get; set; }
    public string tipoorden { get; set; }
    public string complejidad { get; set; }
}

public class interconsulta
{
    public long id { get; set; }
    public string fecha { get; set; }
    public string medsol { get; set; }
    public string espinter { get; set; }
    public string medinter { get; set; }
    public string motivo { get; set; }
}


public class hc_imagenes
{
    public long IMG_ID { get; set; }
    public string IMG_FECHA_INICIO { get; set; }
    public string IMG_NUMERO { get; set; }
    public string IMG_PATH { get; set; }
    public string IMG_USUARIO { get; set; }
    public string TIMG_DESCRIPCION { get; set; }
    public string WORK_LIST_NUMERO { get; set; }
    public int TIENE_ANESTESIA { get; set; }
    public long IMG_TURNO_ID_CAB { get; set; }
}


public class hc_anatomiapatologica
{
    public long PAT_NUMERO { get; set; }
    public string PAT_FECHA_INICIO { get; set; }
    public string PMAT_DESCRIPCION { get; set; }
    public string MED_APELLIDO_NOMBRE { get; set; }
    //public string IMG_USUARIO { get; set; }
    //public string TIMG_DESCRIPCION { get; set; }
}

public class lista_anios
{
    public string anio { get; set; }
}

public class lista_meses
{
    public string mes { get; set; }
    public string numMes { get; set; }
}

public class registro_internacion
{
    public string ingreso { get; set; }
    public string egreso { get; set; }
    public string servicio { get; set; }
    public int idservicio { get; set; }
    public string motivoingreso { get; set; }
    public string motivoegreso { get; set; }
    public string especialidad { get; set; }
    public string medico { get; set; }
    public string id { get; set; }
    public string cama { get; set; }
}


public class registro_cirugias
{
    public string fecha { get; set; }
    public string cirugia { get; set; }
    public string medico { get; set; }
    public string diagnostico { get; set; }
    public string especialidad { get; set; }
    public string id { get; set; }
    public int susp { get; set; }
}

public class registro_recetas
{
    public string fecha { get; set; }
    public string medico { get; set; }
    public string diagnostico { get; set; }
    public string especialidad { get; set; }
    public string id { get; set; }
}

public class registro_ambulatorio
{
    public string id { get; set; }
    public string fecha { get; set; }
    public string especialidad { get; set; }
    public string medico { get; set; }
    public string diagnostico { get; set; }
    public string tipo { get; set; }
}


public class registro_especialista
{
    public string id { get; set; }
    public string fecha { get; set; }
    public string especialidad { get; set; }
    public string medico { get; set; }
    public string diagnostico { get; set; }
    public string tipo { get; set; }
}

public class HC_Compacta
{
    public string fecha { get; set; }
    public string HC { get; set; }
}

public class HC_Movimiento
{
    public long Id { get; set; }
    public string Fecha { get; set; }
    public string Origen { get; set; }
    public string Destino { get; set; }
    public long OrigenId { get; set; }
    public long DestinoId { get; set; }
    public string Usuario { get; set; }
    public long UsuarioId { get; set; }
    public bool Estado { get; set; }
    public string NHC { get; set; }
    public string Observaciones { get; set; }

    public HC_Movimiento() { }
}

 public class pedidoMaterial {
     public long idCarga { get; set; }
     public int prioridad { get; set; }
     public string equipos { get; set; }
     public string insumos { get; set; }
     public string diagnostico { get; set; }
     public string fechaCirugia { get; set; }
     public string servicio { get; set; }
     public string auditoria { get; set; }
     public long afiliadoId { get; set; }
     public int usuario { get; set; }
     public string afiliado { get; set; }
     public int nhc { get; set; }
     public int dni { get; set; }
     public string fechaAuditoria { get; set; }
     public int edita { get; set; }
     public string antecedentes { get; set; }
     public string tratamiento { get; set; }
     public string actual { get; set; }
     public string funcional { get; set; }
     public string Complicaciones { get; set; }
     public int estado { get; set; }
     public long usuarioEstado { get; set; }
 }

 public class verificarInternado
 {
     public int internado { get; set; }
     public long internacion { get; set; }
 }