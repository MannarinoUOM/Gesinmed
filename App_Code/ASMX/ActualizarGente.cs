using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Actualizar
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Actualizar : System.Web.Services.WebService {

    public Actualizar () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
        
    }


    [WebMethod]
    public personas Personas(string Documento)
    {
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.Persona(Documento);
    }

    [WebMethod]
    public List<personas> Personas_Local(int Documento)
    
{
        Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
        return Per.Persona_Local(Documento);
    }

    [WebMethod]
    public personas Personas_Local_ID(long Id)
    {
        Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
        return Per.Persona_Local_ID(Id);
    }

    [WebMethod]
    public titular Titular(string cuil)
    {
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.Titular(cuil);
    }

    [WebMethod]
    public titular Titular_Local(Int64 cuil)
    {   
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.Titular_Local(cuil);   
    }

    [WebMethod]
    public personas PersonaXCUIL(string cuil)
    {
        
        Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
        return Per.PersonaXCUIL(cuil);
        
    }

    [WebMethod]
    public personas PersonasNHC(string cuil)
    {
        
        Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
        personas PP = new personas();
        PP = Per.PersonaXCUIL(cuil);
        if (PP != null)
        {
            return Personas(PP.documento.ToString());
        }
        else
        {
            throw new Exception("No se encontro el Afiliado");
        }
        
    }


    [WebMethod]
    public personas PersonasNHC_Local(Int64 cuil)
    {
        
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            personas PP = new personas();
            PP = Per.PersonaXCUIL_Local(cuil);
            if (PP != null)
            {
                return Personas_Local((int)PP.documento)[0];
            }
            else
            {
                throw new Exception("No se encontro el Afiliado");
            }
        
    }


    [WebMethod]
    public personas PersonaXDOCUMENTO(string documento)
    {
        
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.PersonaXDOCUMENTO(documento);
        
    }

    [WebMethod]
    public List<personas> PersonaXApellido(string Apellido)
    {
        
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.PersonaXApellido(Apellido);
        
    }

    [WebMethod]
    public List<personas> PersonaXApellidoSN(string Apellido)
    {

        Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
        return Per.PersonaXApellidoSN(Apellido);

    }

    [WebMethod]
    public List<codpariente> CodPariente(int Codigo)
    {
        
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.Parentesco(Codigo);
        
    }

    [WebMethod]
    public List<codprovincias> Provincias(int Codigo)
    {
        
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.Provincias(Codigo);
        
    }

    [WebMethod]
    public empresas Empresa(string CUIT)
    {
        
            Hospital.SecretariadoPadronBLL Per = new Hospital.SecretariadoPadronBLL();
            return Per.Empresa(CUIT);
        
    }

    [WebMethod(EnableSession = true)]
    public int ActualizarGente(string Id,string tipo_doc,string cuil, string documento, string apellido, string sexo, string telefono, int Seccional, string cuit, string calle, string numero, string piso,
            string depto, string localidad, int provincia, string fecha_nacimiento, int Provisorio, string cuil_titu, int Cod_Pariente, string email, string celular, string CodPostal, 
        int OS, bool ES_UOM, int Discapacidades, string FDVencimiento, string AnioEstudiante2, bool Certificado1, bool Certificado2, bool EsEstudiante, bool PMI, bool PI, string NHC_UOM, string FechaBaja, string FechaVenc_PMI,
        string EstadoCivil, string Nacionalidad, string NroCarnet)
    {

        if (Session["Usuario"] != null)
        {
            int AnioEstudiante = 0;

            if (string.IsNullOrEmpty(sexo)) throw new Exception("Ingrese Sexo.");

            if (string.IsNullOrEmpty(apellido)) throw new Exception("Ingrese Nombre y Apellido.");

            int _documento;
            if (!int.TryParse(documento, out _documento)) throw new Exception("Ingrese Nro. de Documento");

            Int64 _cuil;
            if (!Int64.TryParse(cuil, out _cuil)) throw new Exception("Ingrese CUIL");

            Int64 _cuit;
            if (!Int64.TryParse(cuit, out _cuit)) _cuit = 99999999999;

            Int64 _cuil_titu;
            if (!Int64.TryParse(cuil_titu, out _cuil_titu)) _cuil_titu = _cuil;

            DateTime _fecha_nacimiento;
            if (!DateTime.TryParse(fecha_nacimiento, out _fecha_nacimiento)) _fecha_nacimiento = DateTime.Now;

            DateTime _FechaVenc_PMI;
            if (PMI)
            {
                if (!DateTime.TryParse(FechaVenc_PMI, out _FechaVenc_PMI)) throw new Exception("Ingrese Fecha de Vencimiento del PMI.");
            }
            else _FechaVenc_PMI = DateTime.Parse("01/01/1900");

            if (AnioEstudiante2 != "")
            {
                AnioEstudiante = Convert.ToInt32(AnioEstudiante2);
            }

            long _NHC_UOM;
            if (!long.TryParse(NHC_UOM, out _NHC_UOM)) throw new Exception("Verifique NHC");

            string VencimientoDiscapacidadD = "";
            if (FDVencimiento == "")
            {
                VencimientoDiscapacidadD = "1/1/1900";
            }
            else
            {
                VencimientoDiscapacidadD = FDVencimiento;
            }

            bool Provi = false;
            if (Provisorio == 1)
            {
                Provi = true; ;
            }
            string ComentarioSistema = null;
            int CodOS = 112103;
            if (!ES_UOM)
            {
                CodOS = OS;
                Seccional = 998;
            }
            long id;
            if (!long.TryParse(Id, out id)) id = 0;


            Hospital.GenteBLL gente = new Hospital.GenteBLL();
            if (gente.ExisteNHC(_NHC_UOM, id) == 1) throw new Exception("El NHC ya existe en el sistema.");
            DateTime _Baja;
            if (!DateTime.TryParse(FechaBaja, out _Baja)) _Baja = DateTime.Parse("01/01/1900");

            object obj = gente.ActualizarGente(id, tipo_doc, _cuil, _documento, apellido, sexo, telefono, Seccional, _cuit, calle, numero, piso, depto, localidad, provincia, _fecha_nacimiento, _Baja, Provi,
                    _cuil_titu, DateTime.Now, DateTime.Now, DateTime.Now, CodOS, Cod_Pariente, email, celular, ComentarioSistema, CodPostal, Discapacidades, VencimientoDiscapacidadD, AnioEstudiante, Certificado1, Certificado2, EsEstudiante, PMI, PI, _NHC_UOM.ToString(), _FechaVenc_PMI,
                    EstadoCivil, Nacionalidad, NroCarnet);

            if (obj != null) return Convert.ToInt32(obj.ToString());
            else throw new ApplicationException("Error al guardar afiliado.");
        }
        else throw new ApplicationException("Inicie Sesión.");
    }

    [WebMethod]
    public int VerificarPMI(long PacienteId)
    {
        Hospital.GenteBLL Est = new Hospital.GenteBLL();
        return Est.VerificarPMI(PacienteId);
    }


    [WebMethod]
    public string VerificarSiEsEstudiante(int Documento)
    {
        Hospital.GenteBLL Est = new Hospital.GenteBLL();
        string Cual = Est.VerificarSiEsEstudiante(Documento);
        switch (Cual)
        {
            case "0":
                return "&nbsp;&nbsp;&nbsp;Estudiante: <b>SIN</b> certificado";
                break;
            case "1":
                return "&nbsp;&nbsp;&nbsp;Estudiante: Con certificado";
                break;
            case "2":
                return "";
                break;
        }
        return "";
    }

    [WebMethod]
    public string BuscarUltima_HC(long PacienteId)
    {
        Hospital.GenteBLL Est = new Hospital.GenteBLL();
        return Est.BuscarUltima_HC(PacienteId);
    }


    [WebMethod]
    public string TraerFotoPerfilAfiliado(long afiliadoId)
    {
        Hospital.PacientesBLL Est = new Hospital.PacientesBLL();
        return Est.Traer_Foto_Perfil_Afiliado(afiliadoId);
    }


        
}
