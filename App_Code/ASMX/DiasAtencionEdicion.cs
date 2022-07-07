using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for DiasAtencionEdicion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class DiasAtencionEdicion : System.Web.Services.WebService {

    public DiasAtencionEdicion() {

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
    public List<MedicoEspecialidad> Especialidades_que_Atiende_el_Medico_por_Tipo(int MedicoId, string Tipo)
    {
        Hospital.MedicosBLL Especialidades = new Hospital.MedicosBLL();
        return Especialidades.Especialidades_que_Atiende_el_Medico_por_Tipo(MedicoId, Tipo);
    }
    

    [WebMethod]
    public List<diasdeatencion_Vista> Dias_Atencion_Lista(int MedicoId, int Especialidad)
    {
        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        return DiaAtencion.DiasAtencionVistaMedi_Esp(MedicoId, Especialidad);
    }

    [WebMethod(EnableSession=true)]
    public void Eliminar_Dia_Id(int Id, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            MedicosDALTableAdapters.QueriesTableAdapter adapter = new MedicosDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_MEDICOS_EXISTEN_TURNOS(MedicoId, Id);
            if (Convert.ToInt32(r.ToString()) == 1) throw new Exception("El dia de atención no puede ser eliminado, ya que en el mismo hay turnos generados.");
            Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
            DiaAtencion.Eliminar_Id(Id, ((usuarios)Session["Usuario"]).id);
        }
    }

    [WebMethod]
    public List<diasdeatencion_Vista> Dias_Atencion_Id(int Id)
    {
        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        return DiaAtencion.DiasAtencionVistaMedi_Esp_Id(Id);
    }

    [WebMethod(EnableSession=true)]
    public int Guardar_Dias_Atencion(string id, string medicoId, string diaDeAtencion, string horaInicio, string horaFin, string EspecialidadId, string Duracion, string ConsultorioId)
    {
        if (Session["Usuario"] != null)
        {
            Time lhoraInicio = null;
            Time lhoraFin = null;
            int _id, _medicoId, _diaDeAtencion, _EspecialidadId, _Duracion, _ConsultorioId;

            try
            {
                lhoraInicio = Convert.ToDateTime(horaInicio);
                lhoraFin = Convert.ToDateTime(horaFin);
            }
            catch
            {
                throw new Exception("Verifique los horarios.");
            }

            if (!int.TryParse(id, out _id)) { throw new Exception("Verifique el ID."); }

            if (!int.TryParse(medicoId, out _medicoId)) { throw new Exception("Verifique datos del médico."); }

            if (!int.TryParse(diaDeAtencion, out _diaDeAtencion)) { throw new Exception("Verifique el día de atención."); }

            if (!int.TryParse(EspecialidadId, out _EspecialidadId)) { throw new Exception("Verifique la especialidad."); }

            if (!int.TryParse(Duracion, out _Duracion)) { throw new Exception("Verifique la duración."); }

            if (!int.TryParse(ConsultorioId, out _ConsultorioId)) { throw new Exception("Verifique el consultorio."); }


            if (_diaDeAtencion < 0) throw new Exception("Verifique el día de atención.");

            if (_EspecialidadId < 0) throw new Exception("Verifique la especialidad.");
            if (_Duracion < 0) throw new Exception("Verifique la duración.");
            if (_ConsultorioId < 0) throw new Exception("Verifique el consultorio.");

            //if (_id > 0) //Modificacion de Dia -- Verifico si tiene turnos generados...
            //{
            //    MedicosDALTableAdapters.QueriesTableAdapter adapter = new MedicosDALTableAdapters.QueriesTableAdapter();
            //    object r = adapter.H2_MEDICOS_EXISTEN_TURNOS(_medicoId, _id);
            //    if (Convert.ToInt32(r.ToString()) == 1) throw new Exception("El dia de atención no puede ser modificado, ya que en el mismo hay turnos generados.");
            //}

            Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
            return DiaAtencion.Guardar(_id, _medicoId, _diaDeAtencion, lhoraInicio, lhoraFin, _Duracion, _ConsultorioId, _EspecialidadId, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie Sesion Nuevemente.");
    }
    
}
