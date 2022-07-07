using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Reflection;

public partial class Impresiones_Listado_Pacientes_Externos_Sobreturnos : System.Web.UI.Page
{
    public bool Existe = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[7];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[2] = new ReportParameter("desde", Request.QueryString["desde"]);
            parameters[3] = new ReportParameter("hasta", Request.QueryString["hasta"]);
            parameters[4] = new ReportParameter("PDF", Request.QueryString["PDF"]);
            parameters[5] = new ReportParameter("tipo", Request.QueryString["tipo"]);
            parameters[6] = new ReportParameter("especialidadMostrar", Request.QueryString["especialidadMostrar"]);

            foreach (RenderingExtension elemento in ReportViewer1.LocalReport.ListRenderingExtensions())
            {
                //ponemos la condición para entrar a poner falso la exportación a Excel y a Word
                if (elemento.Name == "PDF" | elemento.Name == "WORD")
                {
                    //traemos la información del campo con sus respectivos flags
                    FieldInfo infCampo = elemento.GetType().GetField("m_isVisible", BindingFlags.Instance | BindingFlags.NonPublic);
                    //colocamos el valor de false a la extension 
                    infCampo.SetValue(elemento, false);
                }
            }

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();

            foreach (Control c in ReportViewer1.Controls)
            {
                foreach (Control b in c.Controls) { Response.Write(b.Controls.Count); }

            }
        }

    }

    public void pdf()
    {
        if (Existe)
        {
            Warning[] warnings;
            string[] streamids;
            string mimeType;
            string encoding;
            string extension;

            byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);
            //byte[] byteArray = ReportViewer1.LocalReport.Render("PDF");
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = mimeType;
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=ConsultaDiabetica." + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }
    }
}