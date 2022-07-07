using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Imagen
/// </summary>
public class IMG_Tipo_Imagen
{
    public IMG_Tipo_Imagen() {}
    public int TIMG_ID { get; set; }
    public string TIMG_DESCRIPCION { get; set; }    
}



public class IMG_Tipo_Protocolo
{
    public IMG_Tipo_Protocolo() { }
    public int TPRO_ID { get; set; }
    public int TPRO_TIMG_ID { get; set; }
    public string TPRO_DESCRIPCION { get; set; }
    public string TPRO_PATH { get; set; }
}


public class IMG_Protocolo_Estudio
{
    public long IMG_ID { get; set; }
    public string IMG_FECHA_INICIO { get; set; }
    public int IMG_NUMERO { get; set; }
    public int IMG_TIMG_ID { get; set; }
    public int IMG_TPRO_ID { get; set; }
    public int IMG_ESPECIALIDAD_ID { get; set; }
    public int IMG_MEDICO_ID { get; set; }
    public int IMG_SOC_ID { get; set; }
    public string IMG_PATH { get; set; }
    public string IMG_URGENCIA { get; set; }
    public string IMG_PACIENTE { get; set; }
    public string IMG_NHC { get; set; }
    public int IMG_USUARIO { get; set; }
    public long PACIENTE_ID { get; set; }

}


public class IMG_Protocolos_Buscar {
    public string Fecha_Desde { get; set; }
    public string Fecha_Hasta { get; set; }
    public string IMG_FECHA_ACTUAL { get; set; }
    public int IMG_ID { get; set; }
    public int IMG_NUMERO { get; set; }
    public string apellido { get; set; }
    public string HC_UOM_CENTRAL { get; set; }
    public string TIMG_DESCRIPCION { get; set; }
    public string TPRO_DESCRIPCION { get; set; }    
}


public class IMG_Turno_Info
{
    public long IMG_TURNO_ID { get; set; }
    public string IMG_TURNO_FECHA { get; set; }
    public long IMG_TURNO_PACIENTE_ID { get; set; }
    public string IMG_TURNO_HORA_INICIO { get; set; }
    public string IMG_TURNO_HORA_FIN { get; set; }
    public int IMG_TURNO_ESPECIALIDAD { get; set; }
    public int IMG_TURNO_MEDICO { get; set; }
    public bool IMG_TURNO_SOBRETURNO { get; set; }
    public int IMG_TURNO_ESTADO { get; set; }
    public string IMG_TURNO_BONO_ID { get; set; }
    public string IMG_TURNO_FECHA_HORA_GUARDADO { get; set; }
    public bool IMG_TURNO_FORZADO { get; set; }
    public bool IMG_TURNO_ELIMINADO { get; set; }
    public bool IMG_TURNO_VENCIDO { get; set; }
    public string IMG_TURNO_MINUTOS { get; set; }
    public bool IMG_TURNO_MINUTOSFIJOS { get; set; }
    public string IMG_TURNO_FECHA_FIN { get; set; }
    public string Paciente { get; set; }
    public string documento_real { get; set; }
    public string HC_UOM_CENTRAL { get; set; }
    public string PacienteId { get; set; }
    public string Seccional { get; set; }
    public string Medico { get; set; }
    public string Especialidad { get; set; }
    public bool IMG_TURNO_X_EMAIL { get; set; }
    public int Mostrar48hs { get; set; }
    public bool TurnoHoy { get; set; }
    public bool IMG_TURNO_URG { get; set; }
    public string IMG_TURNO_TIPO { get; set; }
    public string IMG_TURNO_HORAVISIBLE { get; set; }
    public string IMG_TURNO_COMENTARIO { get; set; }
    public string MOTIVO_CANCELACION { get; set; }
    public string IMG_MEDICO_INFORMA { get; set; }
    public int MEDICODERIVANTE_ID { get; set; }
    public string MEDICODERIVANTE_NOMBRE { get; set; }
    public bool IMG_RECITAR { get; set; }
    public string COMENTARIO_MEDICO { get; set; }
}


public class IMG_Pacientes_Info
{
    public string Email { get; set; }
    public string Telefono { get; set; }
    public string Celular { get; set; }    
}

public class IMG_Escaneado
{
    public long Id { get; set; }    
    public string Archivo { get; set; }
    public int esAdjunto { get; set; }
}

public class IMG_Plantilla
{
    public int InsumoId { get; set; }
    public string Insumo { get; set; }
    public int Cantidad { get; set; }
}


public class IMG_ATENCION
{
    public string foto { get; set; }
    public string tipo { get; set; }
    public string nro_turno { get; set; }
    public bool urgencia { get; set; }
    public string paciente { get; set; }
    public string documento { get; set; }
    public string nhc { get; set; }
    public string estudio { get; set; }
    public string estado { get; set; }
    public bool escaneado { get; set; }
    public string hora_turno { get; set; }
    public string arribo { get; set; }
    public string inicio { get; set; }
    public string usuario_inicio { get; set; }
    public string fin { get; set; }    
    public string horario_fin { get; set; }
    public string usuario_fin { get; set; }
    public string comentario { get; set; }
    public string fecha { get; set; }
    public string practicas { get; set; }
    public bool turnoforzado { get; set; }
    public bool sobreturno { get; set; }
    public int estado_numero { get; set; }
    public string medico { get; set; }
    public string especialidad { get; set; }
    public long PacienteId { get; set; }
    public int adjunto { get; set; }
    public string NOTIFICACION { get; set; }
}


public class IMG_BONO_LISTAR_X_TURNO
{
    public string Bono_Id { get;set;}
    public string Fecha { get; set; }
}



public class IMG_BONO_BUSCAR_PACIENTE
{
    public string NROTURNO { get; set; }
    public string PACIENTE { get; set; }
    public string DNI { get; set; }
    public string NHC { get; set; }
    public string FECHA { get; set; }
    public string HORA { get; set; }
    public string ESPECIALIDAD { get; set; }    
}



public class IMG_PREPARACION
{
    public long ID { get; set; }
    public string TITULO { get; set; }
    public bool ESTADO { get; set; }    
}


public class INFORME_LISTA_ATENDIDO
{
public string IMG_TURNO_FECHA { get; set; }    
public string IMG_TURNO_HORA_INICIO	 { get; set; }    
public string foto { get; set; }    
public string IMG_TURNO_TIPO { get; set; }    
public string tipo_descripcion { get; set; }    
public string IMG_TURNO_ID { get; set; }    
public bool urg { get; set; }    
public string apellido { get; set; }    
public string documento	 { get; set; }    
public string nhc { get; set; }    
public string estudios { get; set; }    
public string estado { get; set; }    
public bool Escaneado { get; set; }    
public string hora { get; set; }    
public string arribo { get; set; }    
public string inicio { get; set; }    
public string usuario_inicio	 { get; set; }    
public string fin { get; set; }    
public string usuario_fin{ get; set; }    
public bool SobreTurno { get; set; }    	
public bool Forzado{ get; set; }    
public string IMG_INFORME_ESTADO_DESCRIPCION { get; set; }
public string IMG_INFORME_ESTADO_ID { get; set; }
public string Medico { get; set; }
public string TurnoDetalleId { get; set; }
public string comentario { get; set; }
public string MI { get; set; }
public string MV { get; set; }
}


public class INFORME_PLANTILLA_TITULO
{
    public int ID;
    public string TITULO;
}

public class INFORME_PLANTILLA_DETALLE : INFORME_PLANTILLA_TITULO
{
    public string INFORME;
    public int MEDICOID;
}


public class PracticaxMedico
{
    public int PracticaId { get; set; }
    public string PracticaDetalle { get; set; }
    public bool PracticaUtiliza { get; set; }
    public int PracticaDuracion { get; set; }
}

public class IMPRESION_INFORME
{
    public string Paciente;
    public string Fecha;
    public string HC;
    public string ObraSocial;
    public string Informe;
}


public class IMG_MEDICO_FIRMA
{
    public int ID;
    public string MEDICO;
    public string ABREVIACION;
    public int IMF_MEDICOID;
    public int USUARIO_ID;
    public string USUARIO_NOMBRE;
    public string USUARIO_USUARIO;
    public string SOBREFIRMA;
}


public class IMG_USUARIO
{
    public long ID;
    public string USUARIO;
    public string NOMBRE;    
}

public class IMG_PROTOCOLO_FIRMA
{    
    public string MI_SOBREFIRMA;
    public string MI_MEDICOID;
    public string MV_SOBREFIRMA;
    public string MV_MEDICOID;
}

public class IMG_COM_PROBLEMA
{
    public string COMENTARIO;
    public int MOTIVO_PROBLEMA;
    public bool MOTIVO_RECITAR;
}


public class IMG_AUDIO
{
    public long TurnoId;
    public long DetalleID;
    public string Ruta;
    public string Fecha;
    public long Audio_ID;
}

public class IMG_MEDICO_DERIVANTE
{
    public int MEDICOID { get; set; }
    public string MEDICO { get; set; }
    public string MN { get; set; }
    public string MP { get; set; }
}


public class IMG_FAR_PEDIDO
{
    public long REM_ID { get; set; }
    public string REM_NOMBRE { get; set; }
    public string MEDIDA { get; set; }
    public string PRESENTACION { get; set; }
    public string RUBRO { get; set; }
    public string GRAMAJE { get; set; }
    public long CAB_ID { get; set; }
    public int CANTIDAD { get; set; }
    public bool ELIMINADO { get; set; }
}


public class IMG_FAR_INFORME_RAPIDO
{
    public string Paciente { get; set; }
    public string HC { get; set; }
    public string Especialidad { get; set; }
    public string Medico { get; set; }
    public string IMG_INFORME_TEXTO { get; set; }
    public string ProblemaID { get; set; }
    public string MedicoInformaId { get; set; }    
}

public class IMG_INDICACION
{
    public long ID { get; set; }
    public string IMG_INFO_TEXTO { get; set; }
    public int IMG_MENOR_EDAD { get; set; }
    public string IMG_INFO_TITULO { get; set; }
}

public class IMG_PRACTICA_NOMENCLADOR
{
    public long ID { get; set; }
    public string COD_IMG { get; set; }
    public string COD_NOMENCLADOR { get; set; }
    public string PRACTICA { get; set; }
}

