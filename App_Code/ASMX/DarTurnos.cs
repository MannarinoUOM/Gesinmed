using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for Cargas
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class DarTurnos : System.Web.Services.WebService {

    public DarTurnos()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
        
    }

    [WebMethod]
    public List<especialidades> Especialidades_Lista(bool Todas, long? Id, bool SoloTurnos)
    {
        Hospital.EspecialidadesBLL especialidades = new Hospital.EspecialidadesBLL();
        return especialidades.Especialidades_Lista(Todas, Id, SoloTurnos);
    }

    [WebMethod]
    public List<TipoDoc> ListTipoDoc()
    {
        Hospital.PacientesBLL p = new Hospital.PacientesBLL();
        return p.ListTipo_Doc();
    }

    [WebMethod]
    public List<medicos> Medico_Lista_por_Especialidad(int Especialidad)
    {
        Hospital.MedicosBLL medicos = new Hospital.MedicosBLL();
        return medicos.Medicos_Por_Especialidad(Especialidad);
    }

    [WebMethod]
    public List<medicos> Medico_Lista_por_Especialidad_SoloActivos(int Especialidad)
    {
        Hospital.MedicosBLL medicos = new Hospital.MedicosBLL();
        return medicos.Medicos_Por_Especialidad_SoloActivos(Especialidad);
    }

    [WebMethod]
    public List<medicos> Medico_Lista_por_Especialidad_SoloActivosTipo(int Especialidad, string Tipo, int TLC)
    {
        Hospital.MedicosBLL medicos = new Hospital.MedicosBLL();
        return medicos.Medicos_Por_Especialidad_SoloActivos(Especialidad, Tipo, TLC);
    }


    [WebMethod]
    public List<TipoDoc> Documentos_Listas()
    {
        Hospital.TipoDocBLL tipodocumento = new Hospital.TipoDocBLL();
        return tipodocumento.List();
    }

    [WebMethod]
    public seccionalesListas Seccionales_Listas()
    {
        Hospital.SeccionalesBLL secionales = new Hospital.SeccionalesBLL();
        return secionales.SeccionalList();
    }

    [WebMethod]
    public List<seccional> List_Seccionales()
    {
        Hospital.SeccionalesBLL secionales = new Hospital.SeccionalesBLL();
        return secionales.List_Seccionales();
    }

    [WebMethod]
    public List<pacientes> CargarPacienteNHC(string NHC)
    {
        try
        {
            long nroNHC = Convert.ToInt64(NHC);
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            return pacientes.Paciente_NHC(nroNHC);
        }
        catch (Exception e)
        {
            return null;
        }
                
    }

    [WebMethod]
    public List<pacientes> CargarPacienteNHC_UOM(string NHC)
            {
        try
        {
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            return pacientes.Paciente_NHC_UOM(NHC);
        }
        catch (Exception e)
        {
            return null;
        }
    }

    [WebMethod]
    public List<pacientes> CargarPacienteID(string ID)
    {
        try
        {
            long id = Convert.ToInt64(ID);
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            return pacientes.Paciente_ID(id);
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod]
    public List<pacientes> CargarPacienteID_Diabetes(string ID)
    {
        try
        {
            long id = Convert.ToInt64(ID);
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            return pacientes.Paciente_ID_Diabetes(id);
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod]
    public List<pacientes> CargarPacienteNHC_Internacion(string NHC, string Id)
    {
        try
        {
            long nroNHC = Convert.ToInt64(NHC);
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            List<pacientes> Lista = pacientes.Paciente_NHC(nroNHC);
            Hospital.InternacionesBLL I = new Hospital.InternacionesBLL();
            if (Lista.Count > 0)
            {
                if (Id == "0")
                {
                    if (I.Interncion_Existe(Lista[0].cuil)) { throw new Exception("El Paciente ya se encuentra internado."); }
                }
                return Lista;
            }
            else throw new Exception("El paciente buscado no existe.");
        }
        catch (Exception e)
        {
            throw new Exception("El paciente buscado no existe.");
        }

    }


    [WebMethod]
    public List<pacientes> Cargar_Paciente_Documento(string Documento, string T_Doc)
            
    {
        try
        {
        int nrodoc = Convert.ToInt32(Documento);
        if (nrodoc != 0)
        {
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            return pacientes.Paciente_DOC(nrodoc,T_Doc);
        }
        else
        {
            return null;
        }

        }
        catch (Exception e)
        {
            return null;
        }
    }

    [WebMethod]
    public List<pacientes> Cargar_Paciente_Documento_internacion(string Documento, string Id,string T_Doc)
    {

        try
        {
            int nrodoc = Convert.ToInt32(Documento);
            if (nrodoc != 0)
            {
                Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
                List<pacientes> Lista = pacientes.Paciente_DOC(nrodoc,T_Doc);
                Hospital.InternacionesBLL I = new Hospital.InternacionesBLL();
                if (Lista != null)
                {
                    if (Id=="0")
                    {
                    if (I.Interncion_Existe(Lista[0].cuil)) { throw new Exception("El Paciente ya se encuentra internado"); }
                    }
                }
                return pacientes.Paciente_DOC(nrodoc,T_Doc);
            }
            else
            {
                return null;
            }

        }
        catch (Exception e)
        {
            throw new Exception("El Paciente buscado no se encuentra.");
        }
    }
    
    
    
    [WebMethod]
    public List<TurnosOtorgados> Turnos_Otorgados(int Documento)
    {
        string Fecha = DateTime.Now.ToShortDateString() + " " + "00:00";
        Hospital.TurnosBLL Turnos = new Hospital.TurnosBLL();
        return Turnos.Turnos_Otorgados(Documento, Fecha);
    }


    [WebMethod]
    public CentroUnicoList CentroUnico()
    {
        Hospital.CentroBLL centro = new Hospital.CentroBLL();
        return centro.UnicoCentro();
    }


    [WebMethod]
    public List<pacientes> BuscarApellido(string Paciente)
    {
        List<pacientes> pacientes_lista = new List<pacientes>();
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        pacientes_lista = t.Paciente_Apellido(Paciente);
        return pacientes_lista;
    }

    [WebMethod]
    public List<pacientes> BuscarApellido_Hospitales(string Paciente, string Documento)
    {
        List<pacientes> pacientes_lista = new List<pacientes>();
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        pacientes_lista = t.Paciente_Apellido_Hospitales(Paciente,Documento);
        return pacientes_lista;
    }

    [WebMethod]
    public bool SobreTurnosLibre(string F, string H, int Mid, int Esp)
    {       
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        DateTime FH =  Convert.ToDateTime(F + " " + H );

        if (!t.Turno_EstaLibre(Mid, Esp, FH))
        {
            throw new Exception("ATENCIÓN: Se está intentando dar un Sobreturno en un día y hora existente. Intente con otra hora.");
        }

        //if (t.Atiende_El_Dia(Mid, Esp, FH)) //Verifico los dias de no atencion
        if (!t.Atiende_El_Dia_Sobreturno(Mid,Esp,FH))
        {
            throw new Exception("ATENCIÓN: El médico no atiende en ese dia y horario.");
        }


        string Feriado = t.Es_Feriado_Descripcion(FH);
        if (Feriado == null)
        {
            return t.SobreTurnosLibres(Mid, Esp, FH);
        }
        else
        {
            throw new Exception("ATENCIÓN: Se está intentando dar un Sobreturno en un día feriado.\n\n" + FH.ToShortDateString() + " - " + Feriado);
        }

       
        
    }

    [WebMethod]
    public bool AtiendeDiaDeLaSemana(string F, string H, int Mid, int Esp)
    {
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        DateTime FH = Convert.ToDateTime(F + " " + H);
        return t.Atiende_Medico_El_Dia(Mid, Esp, FH);        
    }

    [WebMethod] //Verifico que el medico tenga turnos generados ese dia y horario...
    public bool AtiendeDiaDeLaSemana_Sobreturno(string F, string H, int Mid, int Esp)
    {
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        DateTime FH = Convert.ToDateTime(F + " " + H);
        return t.Atiende_El_Dia_Sobreturno(Mid, Esp, FH);
    }


    [WebMethod]
    public List<autorizantes> Autorizantes(int Id)
    {
        Hospital.TurnosBLL Autorizantes = new Hospital.TurnosBLL();
        return Autorizantes.Autorizantes(Id);
    }

    [WebMethod]
    public List<autorizantes> AutorizantesBono()
    {
        Hospital.TurnosBLL Autorizantes = new Hospital.TurnosBLL();
        return Autorizantes.AutorizantesBono();
    }

    [WebMethod]
    public List<motivo_autoriza> MotivoAutorizaBono()
    {
        Hospital.TurnosBLL Autorizantes = new Hospital.TurnosBLL();
        return Autorizantes.MotivoAutorizaBono();
    }


    [WebMethod]
    public TurnosListaenTurnosLista Turno_List(int MedicoId, int EspecialidadId, string sFechaDesde, string HoraDesde, bool Reservados, bool Libres, int Dias )
    {
        if (MedicoId == 0 && EspecialidadId == 0) { throw new Exception("Falta seleccionar Médico y/o Especialidad"); }
        DateTime FechaDesde = DateTime.TryParse(sFechaDesde,out FechaDesde) ? FechaDesde : Convert.ToDateTime(DateTime.Now.ToShortDateString());
        if (FechaDesde.ToShortDateString() == "01/01/0001")
        {
            FechaDesde = Convert.ToDateTime(DateTime.Now.ToShortDateString() + " " + "00:00");
        }

        int MesesTurnos = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings.Get("MesesTurnos"));
        DateTime FechaHasta = DateTime.Now.AddMonths(MesesTurnos);
        bool Correcto = false;
        DateTime d;
        if (DateTime.TryParse(HoraDesde, out d))
        {
        Correcto = true;
        }

        DateTime dd;
        if (DateTime.TryParse("23:59:59", out dd))
        {
            Correcto = true;
        }

        if (Correcto)
        {
            Time Hdesde = d;
            Time Hhasta = dd;
            Hospital.TurnosBLL turnos = new Hospital.TurnosBLL();
            return turnos.Turnos_Resevados(EspecialidadId, MedicoId, FechaDesde, FechaHasta, Hdesde, Hhasta, Libres, Dias, Reservados);
        }
        else
            return null;
    }

    [WebMethod] //Modificado para turnos cancelados y sobreturnos, nuevo SP
    public TurnosListaenTurnosLista Turno_List_2(int MedicoId, int EspecialidadId, string sFechaDesde, string HoraDesde, bool Reservados, bool Libres, int Dias, bool Sobreturnos, bool Cancelados, int monotributista, int TLC)
    {
        if (MedicoId == 0 && EspecialidadId == 0) { throw new Exception("Falta seleccionar Médico y/o Especialidad"); }
        DateTime FechaDesde = DateTime.TryParse(sFechaDesde, out FechaDesde) ? FechaDesde : Convert.ToDateTime(DateTime.Now.AddDays(2).ToShortDateString());
        if (FechaDesde.ToShortDateString() == "01/01/0001")
        {
            FechaDesde = Convert.ToDateTime(DateTime.Now.ToShortDateString() + " " + "00:00");
        }

        int MesesTurnos = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings.Get("MesesTurnos"));
        DateTime FechaHasta = DateTime.Now.AddMonths(MesesTurnos);
        bool Correcto = false;
        DateTime d;
        if (DateTime.TryParse(HoraDesde, out d))
        {
            Correcto = true;
        }

        DateTime dd;
        if (DateTime.TryParse("23:59:59", out dd))
        {
            Correcto = true;
        }

        if (Correcto)
        {
            Time Hdesde = d;
            Time Hhasta = dd;
            Hospital.TurnosBLL turnos = new Hospital.TurnosBLL();
            return turnos.Turnos_Resevados(EspecialidadId, MedicoId, FechaDesde, FechaHasta, Hdesde, Hhasta, Libres, Dias, Reservados, Sobreturnos, Cancelados, monotributista,TLC);
        }
        else
            return null;
    }


    [WebMethod]
    public int AusentesTelefonicos(int DNI)
    {
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        return t.TurnosTelefonicosNoUsados(DNI);
    }


    [WebMethod]
    public List<TurnosTodos> TurnosPaciente(string NHC, string Desde, string Hasta, int EspId)
    {
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        DateTime _desde, _hasta;
        if (!DateTime.TryParse(Desde, out _desde)) throw new Exception("Verifique fecha.");
        if (!DateTime.TryParse(Hasta, out _hasta)) throw new Exception("Verifique fecha.");
        return t.VerTodoslosTurnosPaciente(NHC, _desde, _hasta, EspId);
    }

    [WebMethod]
    public List<TurnosTodos> TurnosPaciente_Historico(string NHC, string Desde, string Hasta, int EspId)
    {
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        DateTime _desde, _hasta;
        if (!DateTime.TryParse(Desde, out _desde)) throw new Exception("Verifique fecha.");
        if (!DateTime.TryParse(Hasta, out _hasta)) throw new Exception("Verifique fecha.");
        return t.VerTodoslosTurnosPaciente_Historico(NHC, _desde, _hasta, EspId);
    }

    [WebMethod]
    public List<TurnosTodos> TurnosPaciente_IMG(string NHC, string Desde, string Hasta, int EspId)
    {
        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
        DateTime _desde, _hasta;
        if (!DateTime.TryParse(Desde, out _desde)) throw new Exception("Verifique fecha.");
        if (!DateTime.TryParse(Hasta, out _hasta)) throw new Exception("Verifique fecha.");
        return t.VerTodoslosTurnosPaciente_IMG(NHC, _desde, _hasta, EspId);
    }



    [WebMethod]
    public TurnosListaenTurnosLista Turno_List_IMG(int MedicoId, int EspecialidadId, string Fecha)
    {
        if (MedicoId == 0 && EspecialidadId == 0) { throw new Exception("Falta seleccionar Médico y/o Especialidad"); }
        DateTime FechaDesde = DateTime.TryParse(Fecha, out FechaDesde) ? FechaDesde : Convert.ToDateTime(DateTime.Now.ToShortDateString());
        if (FechaDesde.ToShortDateString() == "01/01/0001")
        {
            FechaDesde = Convert.ToDateTime(DateTime.Now.ToShortDateString() + " " + "00:00");
        }

            Hospital.TurnosBLL turnos = new Hospital.TurnosBLL();
            return turnos.Turnos_Resevados_IMG(EspecialidadId, MedicoId, FechaDesde);
    }

    [WebMethod]
    public List<string> ListarSemana(string Fecha)
    {        
        List<string> lista = new List<string>();
        for (int i = 0;  i < 7; i++)
        {
            DateTime fecha = new DateTime();
            string dia_nombre = "";
            fecha = Convert.ToDateTime(Fecha).AddDays(i);
            if ((int)fecha.DayOfWeek == 0) { dia_nombre = "Dom. "; }
            if ((int)fecha.DayOfWeek == 1) { dia_nombre = "Lun. "; }
            if ((int)fecha.DayOfWeek == 2) { dia_nombre = "Mar. "; }
            if ((int)fecha.DayOfWeek == 3) { dia_nombre = "Mié. "; }
            if ((int)fecha.DayOfWeek == 4) { dia_nombre = "Jue. "; }
            if ((int)fecha.DayOfWeek == 5) { dia_nombre = "Vie. "; }
            if ((int)fecha.DayOfWeek == 6) { dia_nombre = "Sáb. "; }

            lista.Add(dia_nombre + " " + fecha.ToString("dd"));
        }
        return lista;
    }

}
