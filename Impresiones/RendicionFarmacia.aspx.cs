using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
//using iTextSharp.text.pdf;
//using iTextSharp.text;
using System.IO;
//using iTextSharp.text.html.simpleparser;

public partial class Impresion_RendicionFarmacia : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        EjecutarProcedimiento("PEDIDOS_PUBLICO_RENDICION");
    }

    private void EjecutarProcedimiento(string Procedimiento)
    {
        SqlConnection Conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["HospitalConnectionString"].ConnectionString);
        Conn.Open();
        SqlCommand Comm = new SqlCommand(Procedimiento, Conn);
        DataTable Datos = new DataTable();
        SqlParameter par = new SqlParameter("@Fecha", SqlDbType.DateTime);
        par.Value = Convert.ToDateTime(Request.QueryString["Fecha"].ToString());
        SqlParameter par2 = new SqlParameter("@Usuario", SqlDbType.VarChar);
        par2.Value = Request.QueryString["Usuario"].ToString();
        SqlParameter par3 = new SqlParameter("@FechaHasta", SqlDbType.DateTime);
        par3.Value = Convert.ToDateTime(Request.QueryString["Hasta"].ToString());
        Comm.Parameters.Add(par);
        Comm.Parameters.Add(par2);
        Comm.Parameters.Add(par3);
        Comm.CommandType = CommandType.StoredProcedure;
        Comm.CommandText = Procedimiento;
        SqlDataAdapter adaptador = new SqlDataAdapter(Comm);
        adaptador.Fill(Datos);
        decimal total = 0; decimal porcentaje = 100; decimal por_1;
        foreach (DataRow dr in Datos.Rows)
        {
            if (decimal.TryParse(dr["Descuento"].ToString(), out por_1))
            {
                total += ((porcentaje - decimal.Parse(dr["Descuento"].ToString())) / porcentaje) * decimal.Parse(dr["Total"].ToString());
            }
            else
            {
                total += decimal.Parse(dr["Total"].ToString());
            }
        }
        lblRendicion.Text = "Rendicion Total: " + string.Format("{0:C}", total);
        grv_RendicionVentas.DataSource = Datos;
        grv_RendicionVentas.DataBind();
        Conn.Close();
    }

    protected void Page_Prerender(object sender, EventArgs e)
    {
        //PDF();
    }

    //public void PDF()
    //{
    //    ////iTextSharp.text.Image jpg = iTextSharp.text.Image.GetInstance(System.Web.Configuration.WebConfigurationManager.AppSettings["Imagen_Logo"].ToString());
    //    Response.ContentType = "application/pdf";
    //    Response.AddHeader("content-disposition", "inline; filename=Rendicion_Farm.pdf");
    //    BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
    //    Response.Cache.SetCacheability(HttpCacheability.NoCache);
    //    StringWriter sw = new StringWriter();
    //    HtmlTextWriter hw = new HtmlTextWriter(sw);
    //    this.Page.RenderControl(hw);
    //    StringReader sr = new StringReader(sw.ToString());
    //    Document document = new Document(PageSize.A4, 20f, 20f, 50f, 50f);
    //    HTMLWorker htmlparser = new HTMLWorker(document);
    //    PdfWriter writer = PdfWriter.GetInstance(document, Response.OutputStream);
    //    PdfHandlerEvents PageEventHandler = new PdfHandlerEvents();
    //    writer.PageEvent = PageEventHandler;
    //    document.Open();
    //    iTextSharp.text.Paragraph usuario = new Paragraph("Usuario: " + Request.QueryString["Usuario"].ToString() + "                                    " + "Desde: " + Request.QueryString["Fecha"].ToString() + " - Hasta: " + Request.QueryString["Hasta"].ToString() + "\n\n\n", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK));
    //    document.Add(usuario);
    //    document.Add(ExportGridToPdf());
    //    iTextSharp.text.Paragraph rendicion = new Paragraph(lblRendicion.Text, new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK));
    //    iTextSharp.text.Paragraph firma = new Paragraph("\n\n\nFirma: .........................................", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK));
    //    iTextSharp.text.Paragraph aclaracion = new Paragraph("\nAclaración: .........................................", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK));
    //    document.Add(rendicion);
    //    document.Add(firma);
    //    document.Add(aclaracion);
    //    document.Close();
    //    Response.Write(document);
    //    Response.End();
    //}

    //public PdfPTable ExportGridToPdf()
    //{
    //    BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
    //    iTextSharp.text.pdf.PdfPTable tableLayout = new iTextSharp.text.pdf.PdfPTable(5);
    //    float[] headers = { 100, 60, 120, 40, 40};
    //    tableLayout.SetWidths(headers);
    //    tableLayout.WidthPercentage = 100;
    //    PdfPCell Afiliado = new PdfPCell(new Phrase("Afiliado", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK)));
    //    PdfPCell Nombre = new PdfPCell(new Phrase("Nro. H.C.", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK)));
    //    PdfPCell DNI = new PdfPCell(new Phrase("Medicamento", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK)));
    //    PdfPCell Calle = new PdfPCell(new Phrase("Cantidad", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK)));
    //    PdfPCell Nro = new PdfPCell(new Phrase("Total", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK)));
    //    //PdfPCell Desc = new PdfPCell(new Phrase("Descuento", new iTextSharp.text.Font(bf, 12, 1, BaseColor.BLACK)));
    //    tableLayout.AddCell(Afiliado);
    //    tableLayout.AddCell(Nombre);
    //    tableLayout.AddCell(DNI);
    //    tableLayout.AddCell(Calle);
    //    tableLayout.AddCell(Nro);
    //    //tableLayout.AddCell(Desc);
    //    tableLayout.DefaultCell.BorderWidth = 1;
    //    try
    //    {
    //        int index = 1;
    //        foreach (GridViewRow row in grv_RendicionVentas.Rows)
    //        {
    //            if (index % 2 == 0)
    //            {
    //                tableLayout.DefaultCell.BackgroundColor = iTextSharp.text.BaseColor.WHITE;
    //            }
    //            else { tableLayout.DefaultCell.BackgroundColor = iTextSharp.text.BaseColor.WHITE; }
    //            if (row.Cells[0].Text != "&nbsp;")
    //                tableLayout.AddCell(row.Cells[0].Text);
    //            else
    //                tableLayout.AddCell("");
    //            if (row.Cells[1].Text != "&nbsp;")
    //                tableLayout.AddCell(row.Cells[1].Text);
    //            else
    //                tableLayout.AddCell("");
    //            if (row.Cells[2].Text != "&nbsp;")
    //                tableLayout.AddCell(row.Cells[2].Text);
    //            else
    //                tableLayout.AddCell("");
    //            if (row.Cells[3].Text != "&nbsp;")
    //                tableLayout.AddCell(row.Cells[3].Text);
    //            else
    //                tableLayout.AddCell("");
    //            if (row.Cells[4].Text != "&nbsp;")
    //                tableLayout.AddCell(row.Cells[4].Text);
    //            else
    //                tableLayout.AddCell("");
    //            //if (row.Cells[5].Text != "&nbsp;")
    //            //    tableLayout.AddCell(row.Cells[5].Text);
    //            //else
    //            //    tableLayout.AddCell("");
    //            index++;
    //        }
    //        return tableLayout;
    //    }
    //    catch (SqlException ex)
    //    {
    //        Response.Write(ex.Message);
    //        return tableLayout;
    //    }
    //}
    protected void grv_RendicionVentas_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        //if (e.Row.RowType == DataControlRowType.DataRow)
        //{
        //    decimal por1, porcentaje = 100, total;
        //    if (decimal.TryParse(e.Row.Cells[5].Text, out por1))
        //    {
        //        total = decimal.Parse(e.Row.Cells[4].Text) * ((porcentaje - decimal.Parse(e.Row.Cells[5].Text)) / 100);
        //    }
        //    else total = Convert.ToDecimal(e.Row.Cells[4].Text);
        //    e.Row.Cells[4].Text = string.Format("{0:C}", total);
        //    if (e.Row.Cells[1].Text == "&nbsp;")
        //        e.Row.Cells[0].Text = "Bono Contribución";
        //    //if (e.Row.Cells[5].Text != "&nbsp;")
        //    //    e.Row.Cells[5].Text = e.Row.Cells[5].Text + "%";
        //}
    }
}