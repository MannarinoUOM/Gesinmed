using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.IO;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using Hospital;
using System.Net;
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;
using SautinSoft;
using System.Drawing.Imaging;


public partial class Impresiones_Hemodinamia_ParteAnestesiaImpresion : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            crear();
           // GenerarGrilla();

            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[7];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            //parameters[2] = new ReportParameter("grilla", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/grilla.jpeg");//desarrollo
            parameters[2] = new ReportParameter("grilla", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/ParteAnestesia/grilla.jpeg");// produccion
            parameters[3] = new ReportParameter("check", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/check.png");
            parameters[4] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");
            parameters[5] = new ReportParameter("blanco", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/blanco.jpg");
            parameters[6] = new ReportParameter("tipo", Request.QueryString["tipo"]);

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();

        }
    }


    //public void GenerarGrilla()
    //{
    //    string[] celdas = { };

    //    QuirofanoDALTableAdapters.H2_Traer_Parte_AnestesiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Traer_Parte_AnestesiaTableAdapter();
    //    QuirofanoDAL.H2_Traer_Parte_AnestesiaDataTable aTable = adapter.GetData(Convert.ToInt64(Request.QueryString["id"]));

    //    foreach (QuirofanoDAL.H2_Traer_Parte_AnestesiaRow row in aTable)
    //    {
    //        celdas = row.celdas.ToString().Split('|');
    //    }




    //    //creando el objeto de la imagen
    //    System.Drawing.Image bitmap = (System.Drawing.Image)Bitmap.FromFile(Server.MapPath("grillaFinal.jpg")); // set image 
    //    //Dibujo la imagen
    //    Graphics graphicsImage = Graphics.FromImage(bitmap);

    //    //Establezco la orientación mediante coordenadas  
    //    StringFormat stringformat = new StringFormat();
    //    stringformat.Alignment = StringAlignment.Far;
    //    stringformat.LineAlignment = StringAlignment.Far;


    //    //Propiedades de la fuente  
    //    Color StringColor = System.Drawing.ColorTranslator.FromHtml("#000000");//le damos color

    //    string Str_TextOnImage = "   ";//Your Text On Image
    //    int x = 35;
    //    int y = 47;
    //    int celda = 1;
    //    int hasta = 48;
    //    int tamanoItem = 19;
    //    string numeroCelda = "";
    //    string valorCelda = "";
    //    for (int j = 1; j <= 54; j++)// genera el salto de fila de la grilla
    //    {
    //        for (int i = 1; i <= hasta; i++) // genera la fila
    //        {
    //            // verifica si la celda que se esta creando tiene valor asignado por usuario
    //            ///Str_TextOnImage = celda.ToString();
    //            Str_TextOnImage = "   ";
    //            for (int s = 1; s <= celdas.Length - 1; s++)
    //            {
    //                numeroCelda = celdas[s].ToString().Substring(0, celdas[s].IndexOf(','));
    //                valorCelda = celdas[s].ToString().Substring(celdas[s].IndexOf(',')).Replace(",", "");

    //                if (celda == Convert.ToInt32(numeroCelda))
    //                {

    //                    switch (valorCelda)
    //                    {
    //                        case "x":
    //                            Str_TextOnImage = valorCelda.PadLeft(2000, ' ');
    //                            break;

    //                        case ".":
    //                            Str_TextOnImage = valorCelda.PadRight(2000, ' ');
    //                            break;

    //                        default:
    //                            Str_TextOnImage = valorCelda;
    //                            break;
    //                    }
    //                }

    //            }
    //            // if (j >= 17 && j <= 18) { tamanoItem = 15; } else { tamanoItem = 20; }


    //            //va imprimiendo el valor correspondiente en la celda correspondiente 
    //            graphicsImage.DrawString(Str_TextOnImage, new Font("arial", tamanoItem,
    //            FontStyle.Bold), new SolidBrush(StringColor), new Point(x, y),
    //            stringformat); Response.ContentType = "image/jpg";



    //            x = x + 20;
    //            celda++;
    //            if (j >= 47) { hasta = 49; }
    //        }


    //        if (j >= 47)
    //        {
    //            x = 35;
    //            y = y + 19;
    //        }
    //        else
    //        {
    //            x = 35;
    //            y += 19;
    //        }

    //        // if (j % 2 == 0) { y -= 2; }
    //        if (j % 3 == 0) { y += 2; }

    //    }
    //    // guarda la imagen de la grilla finalizada
    //    //bitmap.Save(Server.MapPath("grillaGenerada.jpeg"), System.Drawing.Imaging.ImageFormat.Jpeg);// para desarollo
    //    bitmap.Save("//10.10.8.66/Files/Parte Anestesia/grillaGenerada.jpeg", System.Drawing.Imaging.ImageFormat.Jpeg);// para produccion
    //    //bitmap.Save("../ParteAnestesia/grillaGenerada.jpeg", System.Drawing.Imaging.ImageFormat.Jpeg); 





    //}

    public void crear()
    {
        //se guardan los valores y posiciones de la grilla que se traen de la DB
        string[] celdas = { };
        //contador de la posicion de la grilla que incrementa al ir generandola y debe coincidir con la posicion de la DB
        int celda = 0;
        //bandera para saber si se inserto valor en la grilla
        int agrego = 0;
        //valor maximo de la presion de la grilla que va decreciendo
        int presion = 245;
        //para mostras los minutos en la grilla
        int minutos = 0;
        //para modificar el largo de la fila en la interacion
        int hasta = 85;

        //se traen los valores dergados de la DB
        QuirofanoDALTableAdapters.H2_Traer_Parte_AnestesiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Traer_Parte_AnestesiaTableAdapter();
        QuirofanoDAL.H2_Traer_Parte_AnestesiaDataTable aTable = adapter.GetData(Convert.ToInt64(Request.QueryString["id"]), Convert.ToInt32(Request.QueryString["tipo"]));
        foreach (QuirofanoDAL.H2_Traer_Parte_AnestesiaRow row in aTable)
        {
            celdas = row.celdas.ToString().Split('|');
        }
        //se traen los valores dergados de la DB


        // Inicializamos el documento PDF
        Document doc = new Document(iTextSharp.text.PageSize.LEGAL.Rotate());
        //PdfWriter.GetInstance(doc, new FileStream(Server.MapPath("grillaPdf.PDF"), FileMode.Create)); // para desarrollo
        PdfWriter.GetInstance(doc, new FileStream("//10.10.8.66/Files/Parte Anestesia/grillaPdf.PDF", FileMode.Create)); // para produccion
        // Importante Abrir el documento
        doc.Open();
        //seteamos los margenes
        doc.SetMargins(0, 0, 0, 0);
        //Empezamos a crear la tabla, definimos una tabla de 49 columnas
        PdfPTable table = new PdfPTable(85);
        //ancho total de la tabla
        table.TotalWidth = 1000;
        //ancho sin variacion
        table.LockedWidth = true;
        //ajustamos el porcetanje del ancho
        table.WidthPercentage = 100;
        table.DefaultCell.FixedHeight = 10f;
        //definicion de la fuente 
        iTextSharp.text.Font fontH1 = new iTextSharp.text.Font();
        fontH1.SetStyle("BOLD");
        fontH1.Size = 6;
        iTextSharp.text.Font fontH2 = new iTextSharp.text.Font();
        fontH2.SetStyle("BOLD");
        fontH2.Size = 4;
        //definicion de la fuente 
        //se almacena id de la celda almacenado en la DB
        string numeroCelda = "";
        //se almacena el valor guardado en la celda en la DB
        string valorCelda = "";

        for (int j = 1; j <= 55; j++)// genera el salto de fila de la grilla
        {   //para que la presion decrezca en 5 a partir de la segunda fila
            if (j > 1) { presion -= 5; }                      
                               //84
            for (int i = 1; i <= hasta; i++) // genera la fila
            {

                if (i > 1) { minutos += 5; }// incrementa los minutos
                // asigna el valor vacio a la celda 1-1
                if(j ==1 && i == 1){ table.AddCell(""); } 
                // asigna el valor de los minutos al mod de 3
                else if (j == 1) { if ((i-1) % 3 == 0 && minutos != 60) {
                    table.AddCell(new PdfPCell(new Phrase(minutos.ToString(), fontH1))).HorizontalAlignment = Element.ALIGN_CENTER;
                   
                } else { table.AddCell("");// si no es mod de 3 y distinto a 60 minutos
                if (minutos == 60) { minutos = 0; } // resetera los minutos
                } 
                }
                else
                {
                    if (i == 1)
                    {
                        if (j < 50)
                        {

                            table.AddCell(new PdfPCell(new Phrase(presion.ToString(), fontH2))).HorizontalAlignment = Element.ALIGN_CENTER; //agrego = 1;
                        }
                        // para insertar la columna 1 con datos despues de la fila 49
                        else if (j >= 49) {
                            hasta = 85;
                           // agrego = 0;
                        }
                        // para insertar la columna 1 con datos despues de la fila 49
                        else
                        {
                            table.AddCell(" ");
                        }

                    }
                    else
                    {
                        //if (j <= 49)
                        //{
                            if (i > 1) { celda = celda + 1; }
                        //}
                        //else { celda = celda + 1; }
                        //celda = celda + 1;
                        for (int s = 1; s <= celdas.Length - 1; s++)
                        {
                            numeroCelda = celdas[s].ToString().Substring(0, celdas[s].IndexOf(','));
                            valorCelda = celdas[s].ToString().Substring(celdas[s].IndexOf(',')).Replace(",", "");

                            if (celda == Convert.ToInt32(numeroCelda))
                            {
                                table.AddCell(new PdfPCell(new Phrase(valorCelda, fontH1))).HorizontalAlignment = Element.ALIGN_CENTER;
                                //table.AddCell(celda.ToString());
                                agrego = 1;
                            }
                        }

                        if (agrego == 0) { table.AddCell(" "); }
                        // table.AddCell(celda.ToString());

                        agrego = 0;
                    }
                }
            }
        }
        //Agregamos la tabla al documento
        doc.Add(table);
        //Ceramos el documento
        doc.Close();
        doc.Dispose();
        SautinSoft.PdfFocus f = new SautinSoft.PdfFocus();
        //f.OpenPdf(Server.MapPath("grillaPdf.PDF"));// desarrollo
        f.OpenPdf(@"//10.10.8.66/Files/Parte Anestesia/grillaPdf.PDF");// produccion
      
       
        if (f.PageCount > 0)
        {
            f.ImageOptions.Dpi = 600;
            //f.ToMultipageTiff(Server.MapPath("grilla.tiff"));// desarrollo
            f.ToMultipageTiff(@"//10.10.8.66/Files/Parte Anestesia/grilla.tiff");// produccion
            f.ClosePdf();
        }

        TiffToImage();

    }

    protected void TiffToImage()
    {
        //Stream _stream = new FileStream(Server.MapPath("grilla.tiff"), (FileMode)FileAccess.ReadWrite); // desarrollo
        Stream _stream = new FileStream(@"//10.10.8.66/Files/Parte Anestesia/grilla.tiff", (FileMode)FileAccess.ReadWrite); // produccion
        MemoryStream storeStream = new MemoryStream();
        storeStream.SetLength(_stream.Length);
        _stream.Read(storeStream.GetBuffer(), 0, (int)_stream.Length);
        byte[] byteArray = storeStream.ToArray();

        Bitmap bm = new Bitmap(_stream);
        //bm.Save(Server.MapPath("grilla.jpg"), System.Drawing.Imaging.ImageFormat.Jpeg);// desarrollo
        bm.Save(@"//10.10.8.66/Files/Parte Anestesia/grilla.Jpeg", System.Drawing.Imaging.ImageFormat.Jpeg);// produccion
        bm.Dispose();

        storeStream.Flush();
        storeStream.Close();
        _stream.Close();

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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=PasteAnestesiaHemodinamia." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

}