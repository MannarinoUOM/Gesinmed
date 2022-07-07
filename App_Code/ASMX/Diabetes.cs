using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;

/// <summary>
/// Summary description for Diabetes
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Diabetes : System.Web.Services.WebService {

    public Diabetes () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    public long DiagnosticoYClinicaID = 0;
    public long DiabetesCabecerID = 0;
    public long DiagnosticoYClinicaDetalleID = 0;
    public long ComplicacionesID = 0;
    public long TratamientoCabeceraID = 0;
    public long TratamientodetalleID = 0;
    public long EstudioDetalleID = 0;
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
    public List<DiagnosticoYclinica> TraerDiagnosticoYclinica()
    {
        try
        {
            Hospital.DiabetesBLL diabetes = new Hospital.DiabetesBLL();
            return diabetes.Traer_Diagnostico_Y_clinica();
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod]
    public List<complicaciones> TraerComplicaciones()
    {
        try
        {
            Hospital.DiabetesBLL diabetes = new Hospital.DiabetesBLL();
            return diabetes.Traer_Complicaciones();
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod]
    public List<Estudios> TraerEstudios()
    {
        try
        {
            Hospital.DiabetesBLL diabetes = new Hospital.DiabetesBLL();
            return diabetes.Traer_Estudios();
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod]
    public List<Tratamiento> TraerTratamiento()
    {
        try
        {
            Hospital.DiabetesBLL diabetes = new Hospital.DiabetesBLL();
            return diabetes.Traer_Tratamiento();
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod]
    public List<EstudiosExtras> TraerEstudiosExtras()
    {
        try
        {
            Hospital.DiabetesBLL diabetes = new Hospital.DiabetesBLL();
            return diabetes.Traer_Estudios_Extras();
        }
        catch (Exception e)
        {
            return null;
        }

    }


    [WebMethod]
    public List<Insulinas> TraerInsulinas()
    {
        try
        {
            Hospital.DiabetesBLL diabetes = new Hospital.DiabetesBLL();
            return diabetes.Traer_Insulinas();
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod(EnableSession=true)]
    public long GuardarDiabetes(Diabetes_Cabecera objCabeceraDiabetes
        , Diabetes_Diagnostico_Y_Clinica_Cabecera DiabetesDiagnosticoYClinicaCabecera,List <DiagnosticoYclinica> listaDiagnosticoYclinica
        , List<complicaciones> ListaComplicaciones, tratamiento TratamientoCabecera, List<trataientoDetalle> ListaTratamiento, List<EstudiosDetalle> ListaEstudios)
    


    {
        
        if (Session["Usuario"] != null)
        {
            usuarios U = new usuarios();
            U = (usuarios)Session["Usuario"];
            objCabeceraDiabetes.UsuarioId = (int)U.id;
            Hospital.DiabetesBLL diabetes = new Hospital.DiabetesBLL();
            //guardar cabecera
           DiabetesCabecerID = diabetes.Guardar_Diabetes_Encabezado(objCabeceraDiabetes);

            //guardar diagnostico y clinica cabecera
           DiabetesDiagnosticoYClinicaCabecera.Diabetes_Gral_Id = DiabetesCabecerID;
           DiabetesDiagnosticoYClinicaCabecera.DiagYclinica_Id = DiagnosticoYClinicaID;
           DiagnosticoYClinicaID = diabetes.Diabetes_Diagnostico_Y_Clinica_Cabecera(DiabetesDiagnosticoYClinicaCabecera);

            //guardar diagnostico y clinica detalle
            foreach(DiagnosticoYclinica item in listaDiagnosticoYclinica){
                item.Diabetes_Gral_Id = DiabetesCabecerID;
                item.Diag_Cli_Resultados_Id = DiagnosticoYClinicaDetalleID;
            }

            DiagnosticoYClinicaDetalleID = diabetes.Diabetes_Diagnostico_Y_Clinica_Detalle(listaDiagnosticoYclinica, DiabetesCabecerID);

            //guardar complicaciones detalle
            foreach (complicaciones item in ListaComplicaciones)
            {
                item.Diabetes_Gral_Id = DiabetesCabecerID;
                item.Complicaciones_Id = ComplicacionesID;
            }

            ComplicacionesID = diabetes.Diabetes_Compicaciones_Detalle(ListaComplicaciones, DiabetesCabecerID);


            //guardar tratamiento cabecera
            TratamientoCabecera.Diabetes_Gral_Id = DiabetesCabecerID;
            TratamientoCabecera.Tratamiento_Id = TratamientoCabeceraID;
            TratamientoCabeceraID = diabetes.Diabetes_Tratamiento_Cabecera(TratamientoCabecera);

            //guardar tratamiento detalle
            foreach (trataientoDetalle item in ListaTratamiento)
            {
                item.Diabetes_Gral_Id = DiabetesCabecerID;
            }

            TratamientodetalleID = diabetes.Diabetes_Tratamiento_Detalle(ListaTratamiento, DiabetesCabecerID);

            //guardar estudios detalle
            foreach (EstudiosDetalle item in ListaEstudios)
            {
                item.Diabetes_Gral_Id = DiabetesCabecerID;
            }

            EstudioDetalleID = diabetes.Diabetes_Estudio_Detalle(ListaEstudios, DiabetesCabecerID);

           return DiabetesCabecerID;
        }
        else throw new Exception("Inicie Sesion Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    public List<PacienteDiabetico> ExistePaciente(string Nombre, string DNI, string Tdni, string NHC)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.DiabetesBLL Diabetes = new Hospital.DiabetesBLL();
            long _dni;
            // long _nhc;
            List<PacienteDiabetico> l = new List<PacienteDiabetico>();
            if (!long.TryParse(DNI, out _dni)) _dni = 0;
            // if (!long.TryParse(NHC, out _nhc)) _nhc = 0;
            l = Diabetes.Existe_Paciente(Nombre, _dni, Tdni, NHC);
            return l;
        }
        else
        {

            throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");
        }

    }

    [WebMethod(EnableSession = true)]
    public List<PacienteDiabetico> TraerConsultas(long NHC)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.DiabetesBLL Diabetes = new Hospital.DiabetesBLL();
            //long _dni;
            // long _nhc;
            List<PacienteDiabetico> L = new List<PacienteDiabetico>();
            //if (!long.TryParse(DNI, out _dni)) _dni = 0;
            // if (!long.TryParse(NHC, out _nhc)) _nhc = 0;
            L = Diabetes.Traer_Consultas(NHC);
            return L;
        }
        else
        {

            throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");
        }

    }

    [WebMethod(EnableSession = true)]
    public ConsultaDiabetes TraerUnaConsulta(long id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.DiabetesBLL Diabetes = new Hospital.DiabetesBLL();
            ConsultaDiabetes C = new ConsultaDiabetes();
            C = Diabetes.Traer_Una_Consulta(id);
            return C;
        }
        else
        {throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");}
    }

    [WebMethod(EnableSession = true)]
    public List<PacienteDiabetico> TraerPacientesTodos()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.DiabetesBLL Diabetes = new Hospital.DiabetesBLL();
            List<PacienteDiabetico> l = new List<PacienteDiabetico>();
            l = Diabetes.Traer_Pacientes_Todos();
            return l;
        }
        else { throw new Exception("Ha Perdido Sesión Vuelva a Loguearse"); }
    }



    [WebMethod(EnableSession = true)]
    public List<fichaDiabetes> Traer_Fichas_Todas()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.DiabetesBLL Diabetes = new Hospital.DiabetesBLL();
            List<fichaDiabetes> l = new List<fichaDiabetes>();
            l = Diabetes.Traer_Fichas_Todas();
            return l;
        }
        else { throw new Exception("Ha Perdido Sesión Vuelva a Loguearse"); }
    }


    [WebMethod(EnableSession = true)]
    public long TraerIdXCuilDBT(long afiliadoCuil)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.DiabetesBLL Diabetes = new Hospital.DiabetesBLL();
            return Diabetes.Traer_Id_X_Cuil_DBT(afiliadoCuil);
        }
        else { throw new Exception("Ha Perdido Sesión Vuelva a Loguearse"); }
    }


    [WebMethod(EnableSession = true)]
    public string TraerUsuarioExterno()
    {
        if (Session["Usuario"] != null)
        {
            usuarios U = new usuarios();
            U = (usuarios)Session["Usuario"];
            return U.usuario.ToString();
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public int VerificarDBT(long ID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.DiabetesBLL Diabetes = new Hospital.DiabetesBLL();
            return Diabetes.VerificarDBT(ID);
        }
        else { throw new Exception("Ha Perdido Sesión Vuelva a Loguearse"); }
    }
}
