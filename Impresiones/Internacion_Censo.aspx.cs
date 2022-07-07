using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.IO;
//using iTextSharp.text;
//using iTextSharp.text.html.simpleparser;
//using iTextSharp.text.pdf;
using System.Web.SessionState;

public partial class Impresiones_Internacion_Censo : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {



        DateTime fecha = Convert.ToDateTime(Request["fecha"]);
        string servIds = Convert.ToString(Request["servIds"]);

        lblFechaActual.Text = DateTime.Now.ToShortDateString() + " A LAS " + DateTime.Now.ToString("HH:mm") + "hs.";
        lblFecha.Text = fecha.ToShortDateString();

        Hospital.InternacionesBLL i = new Hospital.InternacionesBLL();
        
        CensoToPrint list = i.CensoForPrinting(fecha, servIds);

        repeater1.DataSource = list.Servicios;
        repeater1.DataBind();


    }

    protected void repeater1_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        ServicioToPrint servicio = (ServicioToPrint)e.Item.DataItem;
        Repeater repeater2 = e.Item.FindControl("repeater2") as Repeater;
        repeater2.DataSource = servicio.Salas;
        repeater2.DataBind();
    }

    protected void repeater2_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        SalaToPrint servicio = (SalaToPrint)e.Item.DataItem;
        GridView gvCama = e.Item.FindControl("gvCama") as GridView;
        gvCama.DataSource = servicio.Camas;
        gvCama.DataBind();
    }

    private void Page_PreRender(object sender, EventArgs e)
    {
        //PDF();

    }

    //public void PDF()
    //{
    //    //iTextSharp.text.Image jpg = iTextSharp.text.Image.GetInstance(System.Web.Configuration.WebConfigurationManager.AppSettings["Imagen_Logo"].ToString());
    //    Response.ContentType = "application/pdf";
    //    Response.AddHeader("content-disposition", "inline; filename=censo_diario.pdf");
    //    Response.Cache.SetCacheability(HttpCacheability.NoCache);
    //    StringWriter sw = new StringWriter();
    //    HtmlTextWriter hw = new HtmlTextWriter(sw);
    //    this.Page.RenderControl(hw);


    //    StyleSheet styles = new StyleSheet();
    //    styles.LoadStyle("hr", "text-decoration", "underline");


    //    Document document = new Document(PageSize.A4, 20f, 20f, 50f, 50f);
    //    HTMLWorker htmlparser = new HTMLWorker(document);
    //    htmlparser.SetStyleSheet(styles);

    //    StringReader sr = new StringReader(sw.ToString());

    //    //HTMLWorker htmlparser = new HTMLWorker(document);
    //    PdfWriter writer = PdfWriter.GetInstance(document, Response.OutputStream);
    //    PdfHandlerEvents PageEventHandler = new PdfHandlerEvents();
    //    writer.PageEvent = PageEventHandler;



    //    document.Open();
    //    htmlparser.Parse(sr);
    //    document.Close();
    //    Response.Write(document);
    //    Response.End();

    //}
    public void ShowPdf(string strFileName)
    {
        Response.ClearContent();
        Response.ClearHeaders();
        Response.AddHeader("Content-Disposition", "inline;filename=" + strFileName);
        Response.ContentType = "application/pdf";
        Response.WriteFile(strFileName);
        Response.Flush();
        Response.Clear();
    }

}