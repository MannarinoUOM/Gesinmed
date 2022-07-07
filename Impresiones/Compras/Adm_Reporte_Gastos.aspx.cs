using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Reflection;
using Hospital;

public partial class Impresiones_Compras_Adm_Reporte_Gastos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Usuario"] != null)
            {
                

                ReportParameter[] parameters = new ReportParameter[5];
                parameters[0] = new ReportParameter("Desde", Request.QueryString["Desde"]);
                parameters[1] = new ReportParameter("Hasta", Request.QueryString["Hasta"]);
                parameters[2] = new ReportParameter("PDF", Request.QueryString["PDF"]);
                parameters[3] = new ReportParameter("Proveedor", Proveedor_Nombre(Request.QueryString["PRV_ID"]).Nombre.ToUpper());
                parameters[4] = new ReportParameter("Insumo", Request.QueryString["Insumo"]);

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

    public Farmacia_Proveedores Proveedor_Nombre(string PRV_ID)
    {
        if (PRV_ID.Equals("0")) return new Farmacia_Proveedores("0", "TODOS");
        FarmaciaBLL fbll = new FarmaciaBLL();
        List<Farmacia_Proveedores> list = fbll.List_Proveedores("S");
        Farmacia_Proveedores find = list.Find(delegate(Farmacia_Proveedores p) {
            return p.Id == PRV_ID;
        });
        return find;
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Reporte_Gastos_Adm." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}