using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for Documentacion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Documentacion : System.Web.Services.WebService {

    public Documentacion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<documentacion> ListDocumentacionTipo() {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        return doc.Documentacion_Lista();
    }

        [WebMethod]
    public List<documentacion> ListDocumentacionTipoAutorizaciones() {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        return doc.Documentacion_Lista_Autorizaciones();
    }

    [WebMethod]
        public List<documentacion_archivos> DocumentacionArchivosAutorizaciones(long id)
    {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        return doc.Documentacion_Archivos_Autorizaciones(id);
    }

    [WebMethod]
    public List<documentacion_archivos> DocumentacionArchivosExternos(long id, int inter)
    {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        return doc.Documentacion_Archivos_Externos(id,inter);
    }


    [WebMethod]
    public List<documentacion> DocumentacionListaHC(int? interno)
    {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        return doc.Documentacion_Lista_HC(interno);
    }

    [WebMethod]
    public List<documentacion_archivos> Documentacion_Archivos(long IdPaciente)
    {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        return doc.Documentacion_Archivos(IdPaciente);
    }

    [WebMethod]
    public void Documentacion_Eliminar(string Archivo, int PacienteId)
    {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        doc.Documentacion_Eliminar(Archivo, PacienteId);
    }

    [WebMethod]
    public void Documentacion_Autorizacion_Eliminar(long id)
    {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        doc.Documentacion_Autorizacion_Eliminar(id);
    }

    [WebMethod]
    public void Documentacion_Externo_Eliminar(long id)
    {
        Hospital.DocumentacionBLL doc = new Hospital.DocumentacionBLL();
        doc.Documentacion_Externo_Eliminar(id);
    }
}
