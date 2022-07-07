using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Data;
using System.Data.SqlClient;

public partial class Impresion_VentaalPublico_Impresion : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            decimal total = EjecutarProcedimiento("H2_FAR_PEDIDOS_PUBLICO_SELECT_DETALLE_VIEW", int.Parse(Request.QueryString["Id"]));
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportParameter rParam = new ReportParameter();
           
            rParam = new ReportParameter("Imagen1", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            ReportParameter rParam1 = new ReportParameter();
            rParam1 = new ReportParameter("Total",total.ToString());
            ReportParameter rParam2 = new ReportParameter();
            rParam2 = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
            ReportParameter rParam3 = new ReportParameter();
            string Comentario = "NO VALIDO COMO FACTURA";
            if (total < 0)
                Comentario = "<U>CONTRA MOVIMIENTO</U>";

            rParam3 = new ReportParameter("Comentario", Comentario);
            //
            ReportViewer1.LocalReport.SetParameters(rParam);
            ReportViewer1.LocalReport.SetParameters(rParam1);
            ReportViewer1.LocalReport.SetParameters(rParam2);
            ReportViewer1.LocalReport.SetParameters(rParam3);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    private decimal EjecutarProcedimiento(string Procedimiento, int NroPedido)
    {
        DataTable ds = new DataTable();
        SqlConnection Conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["HospitalConnectionString"].ConnectionString);
        Conn.Open();
        SqlCommand Comm = new SqlCommand(Procedimiento, Conn);
        SqlParameter par = new SqlParameter("@PED_ID", SqlDbType.Int);
        par.Value = NroPedido;
        Comm.Parameters.Add(par);
        Comm.CommandType = CommandType.StoredProcedure;
        Comm.CommandText = Procedimiento;
        SqlDataAdapter adapter = new SqlDataAdapter(Comm);
        adapter.Fill(ds);
        decimal total = 0; decimal porcentaje = 100; decimal por_1;
        foreach (DataRow dr in ds.Rows)
        {
            if (decimal.TryParse(dr["Descuento"].ToString(), out por_1))
            {
                total+=((porcentaje - decimal.Parse(dr["Descuento"].ToString())) / porcentaje) * decimal.Parse(dr["Total"].ToString());
            }
            else
            {
               total+=decimal.Parse(dr["Total"].ToString());
            }
        }
        Conn.Close();
        return total;
    }

    public void Crearpdf()
    {
        //ReportViewer1.LocalReport.ReportPath = "Impresion/ConfirmacionTurnos.rdlc";

        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;

        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=BonoContribucion." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}