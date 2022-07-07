using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for firmaDigital
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class firmaDigital : System.Web.Services.WebService {

    public firmaDigital () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public firma TraerFirmaMedico(long idMedico)
    {
         firmaDigitalBLL f = new firmaDigitalBLL();
         return f.Traer_Firma_Medico(idMedico);
    }

    [WebMethod(EnableSession = true)]
    public long AtConsultorioCargadePGeneralImpresion(long protocolo)
    {
        firmaDigitalBLL f = new firmaDigitalBLL();
        return f.AtConsultorioCargadePGeneralImpresion(protocolo);
    }

    [WebMethod(EnableSession = true)]
    public long atinternadosimpresionevolucion(string Ids)
    {
        firmaDigitalBLL f = new firmaDigitalBLL();
        return f.atinternadosimpresionevolucion(Ids);
    }

    [WebMethod(EnableSession = true)]
    public long IMCABPRINT(int id)
    {
        firmaDigitalBLL f = new firmaDigitalBLL();
        return f.IMCABPRINT(id);
    }

    [WebMethod(EnableSession = true)]
    public long ImpresionEpicrisis(int id)
    {
        firmaDigitalBLL f = new firmaDigitalBLL();
        return f.ImpresionEpicrisis(id);
    }

    [WebMethod(EnableSession = true)]
    public long InternacionAltaTraer(int id)
    {
        firmaDigitalBLL f = new firmaDigitalBLL();
        return f.InternacionAltaTraer(id);
    }

    [WebMethod(EnableSession = true)]
    public long AtInternadosHCPRACTICASQUIRURGICASImpresion(int id)
    {
        firmaDigitalBLL f = new firmaDigitalBLL();
        return f.AtInternadosHCPRACTICASQUIRURGICASImpresion(id);
    }

    [WebMethod(EnableSession = true)]
    public string VerificarDeclaracionFirmaConfirmada()
    {
     long usuario = ((usuarios)Session["Usuario"]).id;
        firmaDigitalBLL f = new firmaDigitalBLL();
        return f.VerificarDeclaracionFirmaConfirmada(usuario);
    }

    [WebMethod(EnableSession = true)]
    public void ConfirmarFirmaLogin(long id)
    {
        firmaDigitalBLL f = new firmaDigitalBLL();
         f.ConfirmarFirmaLogin(id);
    }
}
