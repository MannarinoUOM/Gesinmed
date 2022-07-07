using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for DiasNoAtencionEdicion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class DiasNoAtencionEdicion : System.Web.Services.WebService {

    public DiasNoAtencionEdicion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<MedicoEspecialidad> Especialidad_Atencion_Medico(int MedicoId)
    {
        Hospital.MedicosBLL Especialidades = new Hospital.MedicosBLL();
        return Especialidades.MedicoEspecialidadesporMedicoId(MedicoId);
    }

    [WebMethod]
    public List<MedicoEspecialidad> Especialidades_que_Atiende_el_Medico(int MedicoId)
    {
        Hospital.MedicosBLL Especialidades = new Hospital.MedicosBLL();
        return Especialidades.Especialidades_que_Atiende_el_Medico(MedicoId);
    }
    


    [WebMethod]
    public List<diasdenoatencion> Dias_No_Atencion_Lista(int MedicoId, int Especialidad)
    {
        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        return DiaAtencion.Dias_de_No_Atencion_Lista(MedicoId, Especialidad);
    }

    [WebMethod]
    public void Eliminar_Dia_No_Atencion_Id(int Id)
    {
        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        DiaAtencion.Eliminar_DiasNoAtencion_Id(Id);
    }

    [WebMethod]
    public List<diasdenoatencion> Dias_No_Atencion_Id(int Id)
    {
        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        return DiaAtencion.Dias_de_No_Atencion_Id(Id);
    }


    [WebMethod]
    public int Guardar_Dias_No_Atencion(int id, int medicoId, string fechaInicio, string fechaFin, int EspecialidadId, string Motivo)
    {
        DateTime lFechaDesde = Convert.ToDateTime(null);
        DateTime lFechaHasta = Convert.ToDateTime(null);

        try
        {
            lFechaDesde = Convert.ToDateTime(fechaInicio);
            lFechaHasta = Convert.ToDateTime(fechaFin);         

        }
        catch
        {
            throw new Exception("Error En los Horarios");
        }


        int fDesde = lFechaDesde.Year * 10000 + lFechaDesde.Month * 100 + lFechaDesde.Day;
        int fHasta = lFechaHasta.Year * 10000 + lFechaHasta.Month * 100 + lFechaHasta.Day;

        if (fHasta < fDesde)
        {
            throw new Exception("La fecha Final, tiene que ser menor que la fecha Inicial");
        }

        try { Convert.ToInt32(id); }
        catch { throw new Exception("Error en el ID"); }
        try { Convert.ToInt32(medicoId); }
        catch { throw new Exception("Error Datos del Médico"); }

        try { Convert.ToInt32(EspecialidadId); }
        catch { throw new Exception("Error en la Especialidad"); }
        if (Convert.ToInt32(EspecialidadId) < 0) throw new Exception("Error en la Especialidad");

        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        return DiaAtencion.Guardar_No_Atencion(id, medicoId, fechaInicio, fechaFin, EspecialidadId, Motivo);
    }


}
