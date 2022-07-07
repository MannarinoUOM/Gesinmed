using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Hospital;

/// <summary>
/// Summary description for AnatomiaPatologica
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class AnatomiaPatologica : System.Web.Services.WebService
{
        public AnatomiaPatologica()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<AnatomiaPatologica_Material> ListMaterial()
        {
            if (Session["Usuario"] != null)
            {
                AnatomiaPatologicaBLL a = new AnatomiaPatologicaBLL();
                return a.List_Material();
            }
            else return null;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<AnatomiaPatologica_Metodos> ListMetodos()
        {
            if (Session["Usuario"] != null)
            {
                AnatomiaPatologicaBLL a = new AnatomiaPatologicaBLL();
                return a.List_Metodos();
            }
            else return null;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<AnatomiaPatologica_Procedimientos> ListProcedimientos()
        {
            if (Session["Usuario"] != null)
            {
                AnatomiaPatologicaBLL a = new AnatomiaPatologicaBLL();
                return a.List_Procedimientos();
            }
            else return null;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public long InsertProtocoloCab(AnatomiaPatologica_ProtocoloCab Cab)
        {
            if (Session["Usuario"] != null)
            {
                AnatomiaPatologicaBLL a = new AnatomiaPatologicaBLL();
                Cab.UsuarioId = ((usuarios)Session["Usuario"]).id;
                return a.InsertProtocoloCab(Cab);
            }
            else return -1;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public long InsertProtocoloDet(AnatomiaPatologica_ProtocoloDet Det)
        {
            if (Session["Usuario"] != null)
            {
                AnatomiaPatologicaBLL a = new AnatomiaPatologicaBLL();
                return a.InsertProtocoloDet(Det);
            }
            else return -1;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<AnatomiaPatologica_Diagnostico> List_Diagnosticos()
        {
            if (Session["Usuario"] != null)
            {
                AnatomiaPatologicaBLL a = new AnatomiaPatologicaBLL();
                return a.List_Diagnosticos();
            }
            else return null;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<AnatomiaPatologica_Nomenclador> List_Nomenclador()
        {
            if (Session["Usuario"] != null)
            {
                AnatomiaPatologicaBLL a = new AnatomiaPatologicaBLL();
                return a.List_Nomenclador();
            }
            else return null;
        }
}