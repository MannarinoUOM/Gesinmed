using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Reflection;


public partial class Impresiones_Compras_REPORTE_DE_GASTOS_COMPRAS_INTERNACION : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            if (Session["Usuario"] != null)
            {
                ReportParameter[] parameters = new ReportParameter[6];

                parameters[0] = new ReportParameter("desde", Request.QueryString["desde"]);
                parameters[1] = new ReportParameter("hasta", Request.QueryString["hasta"]);
                parameters[2] = new ReportParameter("proveedor", Request.QueryString["proveedor"]);
                parameters[3] = new ReportParameter("PDF", Request.QueryString["PDF"]);
                parameters[4] = new ReportParameter("proveedorName", Request.QueryString["proveedorName"]);
                parameters[5] = new ReportParameter("Insumo", Request.QueryString["Insumo"]);

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
            }
            else throw new Exception("Inicie Sesion.");
        }
    }

    private string MostrarOpcion(string Opcion)
    {
        switch (Opcion)
        {
            case "0": return "Todos";
            case "2": return "Pendientes";
            case "1": return "Entregados";
            default: return string.Empty;
        }
    }

    public void PDF()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Compras_Internacion_Reporte_De_Gastos." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}