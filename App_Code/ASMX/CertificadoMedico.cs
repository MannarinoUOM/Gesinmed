using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for CertificadoMedico
/// </summary>
[ScriptService]
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class CertificadoMedico : System.Web.Services.WebService {

    public CertificadoMedico () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public long CertificadoMedico_Guardar(long NHC, string Indicaciones, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;

            if (MedicoId > 0 && Indicaciones.Trim().Length > 0)
            {
                Hospital.AtConsultorioBLL Certificado = new Hospital.AtConsultorioBLL();
                return Certificado.At_Consultorio_Certificado_Medico_Guardar((int)UsuarioId, NHC, Indicaciones, MedicoId);
            }
            else throw new Exception("Error con Id, Médico y/o Indicaciones");
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    
}
