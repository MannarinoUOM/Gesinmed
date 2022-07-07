using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using Hospital;


public partial class Impresion_ProtesisyOtros : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
            {
                QuirofanoBLL qbll = new QuirofanoBLL();
                Quirofano q = new Quirofano();
                List<Quirofano> lista = new List<Quirofano>();
                lista = qbll.Quirofano_CirugiaList(Convert.ToInt32(Request.QueryString["Id"]), null, false);
                if (lista.Count > 0)
                {
                    q = lista[0];
                

                ReportViewer1.LocalReport.Refresh();

                string Servicio = "";
                string Ortopedia = "";
                string Diagnostico = "";
                //string MaterialUOM = "NO";

                 Quirofano_Protesis_Cab q_cab = new Quirofano_Protesis_Cab();
                 try
                 {
                     q_cab = qbll.Protesis_Lista_CAB(Convert.ToInt32(Request.QueryString["Id"].ToString()))[0];



                     Servicio = q_cab.servicio_nombre;
                Ortopedia = q_cab.ortopedia;

                try { Diagnostico = qbll.Diagnostico(q.diagnostico_id, true)[0].diagnostico; }
                catch { }

                //if (q_cab.material)
                //    MaterialUOM = " SI";
                

                }
                catch
                {
                //    //SystemMessage(ex.ToString(), SystemMessageType.Error);
                }
                 PacientesBLL pbll = new PacientesBLL();
                 pacientes pa = new pacientes();

                 pa = pbll.Paciente_ID(Convert.ToInt64(q.nhc))[0];

                string Seccional = "";
                try { 
                Seccional = pa.Seccional;
                    //Seccional = SeccionalBLL.GetById ( Convert.ToInt32 (pa.Seccional)).Descripcion;
                }
                catch{}

                CentroBLL cent = new CentroBLL();
                centro_unico c = new centro_unico();
                c = cent.UnicoCentro()[0];

                ReportParameter[] parameters = new ReportParameter[4];
                parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
                parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                parameters[2] = new ReportParameter("Titulo", c.RazonSocial);
                parameters[3] = new ReportParameter("Nombre", c.Calle + " " + c.Nro + " (" + c.CodigoPostal + ") <br />" + c.Telefono);

                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();
                }
            }
        }
    }



    public void pdf_Click()
    {

        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;

        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=ProtesisyOtros." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

}