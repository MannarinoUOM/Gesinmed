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

public partial class Impresiones_Endoscopia_ParteAnestesiaImpresion : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GenerarGrilla();

            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[5];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            //parameters[2] = new ReportParameter("grilla", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/Impresiones/Quirofano/grillaGenerada.jpeg");
            parameters[2] = new ReportParameter("grilla", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/ParteAnestesia/grillaGenerada.jpeg");
            parameters[3] = new ReportParameter("check", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/check.png");
            parameters[4] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();

        }
    }

    public void GenerarGrilla()
    {
        string[] celdas = { };


        EndoscopiaDALTableAdapters.H2_Traer_Parte_Anestesia_ETableAdapter adapter = new EndoscopiaDALTableAdapters.H2_Traer_Parte_Anestesia_ETableAdapter();
        EndoscopiaDAL.H2_Traer_Parte_Anestesia_EDataTable aTable = adapter.GetData(Convert.ToInt64(Request.QueryString["id"]));

        foreach (EndoscopiaDAL.H2_Traer_Parte_Anestesia_ERow row in aTable)
        {
            celdas = row.celdas.ToString().Split('|');
        }




        //creando el objeto de la imagen
        System.Drawing.Image bitmap = (System.Drawing.Image)Bitmap.FromFile(Server.MapPath("grillaFinal.jpg")); // set image 
        //Dibujo la imagen
        Graphics graphicsImage = Graphics.FromImage(bitmap);

        //Establezco la orientación mediante coordenadas  
        StringFormat stringformat = new StringFormat();
        stringformat.Alignment = StringAlignment.Far;
        stringformat.LineAlignment = StringAlignment.Far;


        //Propiedades de la fuente  
        Color StringColor = System.Drawing.ColorTranslator.FromHtml("#000000");//le damos color

        string Str_TextOnImage = "   ";//Your Text On Image
        int x = 65;
        int y = 65;
        int celda = 1;
        int hasta = 48;
        int tamanoItem = 20;
        string numeroCelda = "";
        string valorCelda = "";
        for (int j = 1; j <= 21; j++)// genera el salto de fila de la grilla
        {
            for (int i = 1; i <= hasta; i++) // genera la fila
            {
                // verifica si la celda que se esta creando tiene valor asignado por usuario
                ///Str_TextOnImage = celda.ToString();
                Str_TextOnImage = "   ";
                for (int s = 1; s <= celdas.Length - 1; s++)
                {
                    numeroCelda = celdas[s].ToString().Substring(0, celdas[s].IndexOf(','));
                    valorCelda = celdas[s].ToString().Substring(celdas[s].IndexOf(',')).Replace(",", "");

                    if (celda == Convert.ToInt32(numeroCelda))
                    {

                        switch (valorCelda)
                        {
                            case "x":
                                Str_TextOnImage = valorCelda.PadLeft(2000, ' ');
                                break;

                            case ".":
                                Str_TextOnImage = valorCelda.PadRight(2000, ' ');
                                break;

                            default:
                                Str_TextOnImage = valorCelda;
                                break;
                        }
                    }

                }
                if (j >= 17 && j <= 18) { tamanoItem = 15; } else { tamanoItem = 20; }


                //va imprimiendo el valor correspondiente en la celda correspondiente 
                graphicsImage.DrawString(Str_TextOnImage, new Font("arial", tamanoItem,
                FontStyle.Bold), new SolidBrush(StringColor), new Point(x, y),
                stringformat); Response.ContentType = "image/jpg";



                x = x + 34;
                celda++;
                if (j >= 17) { hasta = 49; }
            }

            if (j >= 17)
            {
                x = 30;
                y = y + 23;
            }
            else
            {
                x = 65;
                y = y + 30;
            }
            if (j == 16)
            {
                x = 30;
                y = y - 5;
            }
            if (j == 19)
            {
                x = 30;
                y = y + 5;
            }
        }
        // guarda la imagen de la grilla finalizada
        //bitmap.Save(Server.MapPath("grillaGenerada.jpeg"), System.Drawing.Imaging.ImageFormat.Jpeg);// para desarollo
        bitmap.Save("//10.10.8.66/Files/Parte Anestesia/grillaGenerada.jpeg", System.Drawing.Imaging.ImageFormat.Jpeg);// para produccion
        //bitmap.Save("../ParteAnestesia/grillaGenerada.jpeg", System.Drawing.Imaging.ImageFormat.Jpeg); 

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