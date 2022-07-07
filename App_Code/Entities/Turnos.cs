using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Turnos
/// </summary>
public class TurnosListaenTurnos
{
    public TurnosListaenTurnos()
	{
		//
		// TODO: Add constructor logic here
		//
	}    
    public int MovitoCanceladoId { get; set; }
    public bool SobreTurno { get; set; }
    public string CentroDescripcion { get; set; }
    public string NombrePaciente { get; set; }
    public long AfiliadoID { get; set; }
    public long NHC { get; set; }
    public string EspecialidadDescripcion { get; set; }
    public string NombreMedico { get; set; }
    public string Fecha { get; set; }
    public string Hora { get; set; }
    public string DiaSemana { get; set; }
    public int MedicoId { get; set; }
    public int EspecialidadId { get; set; }
    public int CentroId { get; set; }
    public bool EsCancelado { get; set; }
    public bool Ocupado { get; set; }
    public string Clase { get; set; }
    public string Telefono { get; set; }
    public bool EsConfirmado { get; set; }
    public string ClaseAtencion { get; set; }
    public string OS { get; set; }
    public long TurnoId { get; set; }
    public string FechaAdj { get; set; }
    public string Usuario { get; set; }
    public string Practica { get; set; }
}

public class TurnoInfo
{
    public TurnoInfo()
    { 
    
    }

    public TurnoInfo(long _Turno_Id, long _PacienteId, long _UsuarioId, long _ConfirmadoBono, bool _EsConfirmado, int _MotCancelacion,
        string _Comentario)
    {
        Turno_Id = _Turno_Id;
        PacienteId = _PacienteId;
        UsuarioId = _UsuarioId;
        ConfirmadoBono = _ConfirmadoBono;
        EsConfirmado = _EsConfirmado;
        MotCancelacion = _MotCancelacion;
        Comentario = _Comentario;
    }

    public long Turno_Id { get; set; }
    public long PacienteId {get;set;} 
    public long UsuarioId {get;set;} 
    public long ConfirmadoBono {get;set;}
    public bool EsConfirmado {get;set;}  
    public int MotCancelacion {get;set;}
    public string Comentario { get; set; }
}

public class TurnosListaenTurnosLista :List<TurnosListaenTurnos>
{
}


public class TurnosOtorgados
{
    public string Hora { get; set; }
    public string Fecha { get; set; }
    public string Medico { get; set; }
    public string Especialidad { get; set; }
    public int MedicoId { get; set; }
    public int EspecialidadId { get; set; }
}


public class Impresion_Turnos
{
    public string PiePagina { get; set; }
    public string Usuario { get; set; }
    public string NroTurno { get; set; }
    public string FechaHora { get; set; }
    public string Medico { get; set; }
    public string Consultorio { get; set; }
    public string Especialidad { get; set; }
    public string Paciente { get; set; }
    public string NHC { get; set; }
    public string Seccional { get; set; }
    public string ObraSocial { get; set; }
    public string Observaciones { get; set; }
    public string PiePagina2 { get; set; }
    public string PiePagina3 { get; set; }
    public string TelefonoTurno { get; set; }
    public string HorariodeTurnos { get; set; }
    public string RazonSocial { get; set; }
    public bool SobreTurno { get; set; }
    public bool TurnoTelefonico { get; set; }
    public string PacienteTelefono { get; set; }
    public string UsuarioNombre { get; set; }
    public string HorariodeTurnosPersonalmente { get; set; }
}

public class TurnosTodos
{
    public string fecha { get; set; }
    public string hora { get; set; }
    public string especialidad { get; set; }
    public string medico { get; set; }
    public string paciente { get; set; }
    public string telefono { get; set; }
    public string observaciones { get; set; }
    public string estado { get; set; }
    public string turnoid { get; set; }
    public string especialidadid { get; set; }
    public string medicoid { get; set; }
}

public class ConsultoriodelDia
{ 
    public long ConsultorioDia_Id { get; set; }
    public int ConsultorioDia_MedicoId  { get; set; }
    public int ConsultorioDia_EspecialidadId { get; set; }
    public int ConsultorioDia_ConsultorioId { get; set; }
    public string ConsultorioDia_Fecha { get; set; }
    public bool ConsultorioDia_Baja { get; set; }
    public long ConsultorioDia_UsuarioId { get; set; }
    public string ConsultorioDia_MedicoNombre { get; set; }
    public string ConsultorioDia_EspecialidadNombre { get; set; }
    public string ConsultorioDia_ConsultorioNombre { get; set; }

    public ConsultoriodelDia() { }
}