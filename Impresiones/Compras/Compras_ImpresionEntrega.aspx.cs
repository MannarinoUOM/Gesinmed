using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Compras_Compras_ImpresionEntrega : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Usuario"] != null)
            {
                
                
                ReportViewer1.LocalReport.ReportPath = CargarUrlReport(Request.QueryString["Duracion"].ToString());
                if (int.Parse(Request.QueryString["Duracion"].ToString()) > 30)
                {
                    List<expediente_entregas_cab> Entregas = new List<expediente_entregas_cab>();
                    Entregas = CargarEntregas(int.Parse(Request.QueryString["PED_CAB_ID"].ToString()));
                    ReportParameter[] parameters = new ReportParameter[4];
                    parameters[0] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                    parameters[1] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
                    parameters[2] = new ReportParameter("NroRemito", Entregas[0].PEE_NUMERO_REM.ToString());
                    parameters[3] = new ReportParameter("NroPedido", Entregas[0].PEE_PED_ID.ToString());
                    //parameters[2] = new ReportParameter("NroRemito_2", Entregas[1].PEE_NUMERO_REM.ToString());
                    //parameters[4] = new ReportParameter("NroPedido_2", Entregas[1].PEE_PED_ID.ToString());
                    //if (int.Parse(Request.QueryString["Duracion"].ToString()) == 90)
                    //{
                    //    parameters[3] = new ReportParameter("NroRemito_3", Entregas[2].PEE_NUMERO_REM.ToString());
                    //    parameters[5] = new ReportParameter("NroPedido_3", Entregas[2].PEE_PED_ID.ToString());
                    //}
                    //else
                    //{
                    //    parameters[3] = new ReportParameter("NroRemito_3", string.Empty);
                    //    parameters[5] = new ReportParameter("NroPedido_3", string.Empty);
                    //}
                    ReportViewer1.LocalReport.EnableExternalImages = true;
                    ReportViewer1.LocalReport.SetParameters(parameters);
                    ReportViewer1.LocalReport.Refresh();
                }
                else
                {
                    ReportParameter[] parameters = new ReportParameter[2];
                    parameters[0] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                    parameters[1] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
                    ReportViewer1.LocalReport.EnableExternalImages = true;
                    ReportViewer1.LocalReport.SetParameters(parameters);
                    ReportViewer1.LocalReport.Refresh();
               }
                
            }
            else throw new Exception("Inicie Sesion.");
        }
    }

    private List<expediente_entregas_cab> CargarEntregas(long NroEntregaId)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.EXP_PEDIDOS_ENTREGAS_IDS_DURACION(NroEntregaId);
    }

    private string CargarUrlReport(string Duracion)
    {
        switch (Duracion)
        {
            case "30": return "Impresiones/Compras/Compras_ImpresionEntrega_30.rdlc";
            case "60": return "Impresiones/Compras/Compras_ImpresionEntrega_60.rdlc";
            case "90": return "Impresiones/Compras/Compras_ImpresionEntrega.rdlc";
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Impresion_Remito_Compras." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}