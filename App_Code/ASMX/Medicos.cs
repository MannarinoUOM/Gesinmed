using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Medicos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Medicos : System.Web.Services.WebService {

    public Medicos () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public medicoslista Cargar_Medico_Id(int MedicoId, int Especialidad)
    {
        Hospital.MedicosBLL MedicosEncabezado = new Hospital.MedicosBLL();
        return MedicosEncabezado.Medicos_Encabezado(MedicoId, Especialidad);
    }

    [WebMethod]
    public List<medicos_Buscar> MedicoBuscar(string Apellido, string MN, string MP, string objBusquedaLista)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        return MedicosBuscar.Medicos_Buscar(Apellido, MN, MP, objBusquedaLista);
    }

    [WebMethod]
    public int List_MedicoId_by_CodigoInt_SN(string CodigoInt)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        if (!string.IsNullOrEmpty(CodigoInt)) return MedicosBuscar.List_MedicoId_by_CodigoInt_SN(CodigoInt);
        else return 0;
    }

    [WebMethod]
    public medicos_Buscar_Info MedicoBuscar_Info(int Id)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        if (Id != 0)
        {
            return MedicosBuscar.Medicos_Buscar_Info(Id);
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public List<medicos_Buscar_Info> MedicoBuscar_Info_Todos(int Id)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        return MedicosBuscar.Medicos_Buscar_Info_Todos(Id);
    }

    [WebMethod]
    public medicos_Buscar_Info MedicoBuscar_Info_Con_Baja(int Id) //Busca info de los que estan dado de baja tambien.
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        return MedicosBuscar.Medicos_Buscar_Info_Con_Baja(Id);
    }

    [WebMethod]
    public List<medicos_Especialidades> MedicosEspecialidades(int Id)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        return MedicosBuscar.Medicos_Especialidades_Id(Id);
    }

    [WebMethod]
    public List<medicos> Medicos_Por_Especialidad(int EspId)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        return MedicosBuscar.Medicos_Por_Especialidad(EspId);
    }

    [WebMethod]
    public List<medicos> MedicosPorEspecialidadGastosExtra(int EspId)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        return MedicosBuscar.Medicos_Por_Especialidad_Gastos_Extra(EspId);
    }

    public int ExistenTurnosMedico(int MedicoId, int DiaId)
    {
        int existe = 0;
        MedicosDALTableAdapters.QueriesTableAdapter adapter = new MedicosDALTableAdapters.QueriesTableAdapter();
        object r = adapter.H2_MEDICOS_EXISTEN_TURNOS(MedicoId,DiaId);
        if (r != null) existe = Convert.ToInt32(r.ToString());
        return existe;
    }

    [WebMethod]
    public bool Verificar_si_existen_turnos(int MedicoId)
    {
        if (ExistenTurnosMedico(MedicoId, 0) == 1) return true; //No se puede dar de baja.
        return false;
    }

    public int ExistenTurnosMedicobyEsp(int MedicoId, int Especialidad)
    {
        int existe = 0;
        MedicosDALTableAdapters.QueriesTableAdapter adapter = new MedicosDALTableAdapters.QueriesTableAdapter();
        object r = adapter.H2_MEDICOS_EXISTEN_TURNOS_BY_ESP(MedicoId, Especialidad);
        if (r != null) existe = Convert.ToInt32(r.ToString());
        return existe;
    }

    [WebMethod]
    public bool Verificar_si_existen_turnos_byEsp(int MedicoId, int Especialidad)
    {
        if (ExistenTurnosMedicobyEsp(MedicoId, Especialidad) == 1) return true; //No se puede dar de baja.
        return false;
    }

      [WebMethod(EnableSession = true)] 
    public int Guardar_Medicos(List<medicos_Especialidades> objEspecialidades, int Id, string Apellido, string FechaBaja, string MotivoBaja, string Calle, string Nro, string Piso, string Depto, string CP, int LocalidadId, string Provincia, string TipoDoc, string NroDoc, string FechaNacimiento, string Sexo, string Telefono, string Mail, int CantMinSobreturno, string Observaciones, string IsActive, string Cuit, bool Retencion, bool Honorarios, bool MostrarenTurnos, string CantUrgencia, int TLC)
    {

        if (!string.IsNullOrEmpty(FechaBaja))
            if (ExistenTurnosMedico(Id,0) == 1) throw new Exception("El médico no puede ser dado de baja, ya que posee turnos asignados.");

        DateTime laFechaBaja = Convert.ToDateTime("31/12/9999");
        DateTime laFechaNacimiento;
        if (!DateTime.TryParse(FechaNacimiento, out laFechaNacimiento)) laFechaNacimiento = Convert.ToDateTime("31/12/9999");


        try 
        {
            laFechaBaja = Convert.ToDateTime(FechaBaja);
        }
        catch
        {
            laFechaBaja = Convert.ToDateTime("31/12/9999");
        }

        int _CantUrgencia;
        if (!int.TryParse(CantUrgencia, out _CantUrgencia)) throw new Exception("Ingrese Cantidad de Turnos para Urgencia.");

        int _CantMinSobreturno;


        long usuario = 0;

        if (Session["Usuario"] != null) { usuario = ((usuarios)Session["Usuario"]).id; }
        

        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        if (int.TryParse(CantMinSobreturno.ToString(), out _CantMinSobreturno))
            return MedicosBuscar.Medicos_Guardar(objEspecialidades, Id, Apellido, laFechaBaja, MotivoBaja, Calle, Nro, Piso, Depto, CP, LocalidadId, Provincia, "", NroDoc, laFechaNacimiento, Sexo, Telefono, Mail, _CantMinSobreturno, Observaciones, IsActive, Cuit, Retencion, Honorarios, MostrarenTurnos, _CantUrgencia, usuario, TLC);
        else throw new Exception("Ingrese la Cantidad de Sobreturnos");
    }

    [WebMethod]
    public medicos_Buscar_Nombre MedicoBuscar_Nombre(int Id)
    {
        Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
        return MedicosBuscar.Medicos_Buscar_Nombre(Id);
    }

    [WebMethod(EnableSession = true)]    
    public bool SolicitarSoporte(string fecha, string consultorio, string hospital, string horainicio, string horafin, string medico)
    {
        #region
        //verificacion de sesion de usuario y llamado a la funcion de solicitud de soporte para
        //capacitacion de medico nuevo
        //esto es pedido desde javascript desde Medicos.aspx por metodo POST url: "../Json/Medicos.asmx/SolicitarSoporte"
        #endregion
        if (Session["Usuario"] != null)
        {
            Hospital.MedicosBLL MedicosBuscar = new Hospital.MedicosBLL();
            Hospital.BonosBLL B = new Hospital.BonosBLL();           
            return MedicosBuscar.SolicitarSoporte(fecha, consultorio, hospital, horainicio, horafin, ((usuarios)Session["Usuario"]).nombre, medico);
        }
        else  {
            return false;
        }
    }
}
