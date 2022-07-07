using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using Microsoft.Reporting.WebForms;


public partial class Guardia_SospechaCovid : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //String Ruta = @"\\10.10.8.66\documentacion_new\Reclamos_Adjuntos\";
        //String Ruta = @"C:";
        //HttpFileCollection Lista_Archivos = Request.Files;
        //string nombreArchivo = System.IO.Path.GetFileName("http://localhost:55987/hospitales-central/sospecha covid pdf/Ficha Coronavirus OK.pdf");
       // HttpPostedFile archivo;
      //  archivo = Request.Files["http://localhost:55987/hospitales-central/sospecha covid pdf/Ficha Coronavirus OK.pdf"];


       
        //archivo.SaveAs(Ruta);
        //FileUpload f = new FileUpload();
        //f = Op

        //f.SaveAs();


        //File.Copy("C:/Users/Desarrollo1/Desktop/Central/hospitales-central/sospecha covid pdf/Ficha Coronavirus OK.pdf", "C:/Users/Desarrollo1/Desktop/Central/hospitales-central/sospecha covid pdf/Ficha Coronavirus OK copia.pdf");
        //archivoCopia.Value = "../sospecha covid pdf/Ficha Coronavirus OK copia.pdf";




     

    }
    //protected void Button1_Click(object sender, EventArgs e)
    //{

//        byte [] b =  File.ReadAllBytes("C:/Users/Desarrollo1/Desktop/Central/hospitales-central/sospecha covid pdf/Ficha Coronavirus OK.pdf");
//        //System.IO.Stream s;

//       // s = OpenFile("C:/Users/Desarrollo1/Desktop/Central/hospitales-central/sospecha covid pdf/Ficha Coronavirus OK.pdf");

//       // HttpFileCollection archivos = Request.Files;
        
//        //System.IO.File.Create(s.ToString());
//       // MemoryStream m = new MemoryStream();

//        //create new MemoryStream object and add PDF file’s content to outStream.
//        MemoryStream outStream = new MemoryStream();
        
//      //  outStream.ReadByte();
////specify the duration of time before a page cached on a browser expires
//Response.Expires = 0;

////specify the property to buffer the output page
//Response.Buffer = true;

////erase any buffered HTML output
//Response.ClearContent();

////add a new HTML header and value to the Response sent to the client
//Response.AddHeader("content-disposition", "inline; filename=" + "output.pdf");

////specify the HTTP content type for Response as Pdf
//Response.ContentType = "application/pdf";

////write specified information of current HTTP output to Byte array
//Response.BinaryWrite(outStream.ToArray());




//       //byte [] b =  File.ReadAllBytes("C:/Users/Desarrollo1/Desktop/Central/hospitales-central/sospecha covid pdf/Ficha Coronavirus OK.pdf");

//       //System.IO.File.WriteAllBytes(Server.MapPath("~/Report1.pdf"),b);


//using (MemoryStream ms = new MemoryStream())
//{
//    outStream.CopyTo(ms);
//    System.IO.File.WriteAllBytes(Server.MapPath("~/Report1.pdf"), ms.ToArray());
//}



////close the output stream
//outStream.Close();

////end the processing of the current page to ensure that no other HTML content is sent
//Response.End();

        //ScreenCapture sc = new ScreenCapture();
        //// capture entire screen, and save it to a file
        //Image img = sc.CaptureScreen();
        //// display image in a Picture control named imageDisplay
        //this.imageDisplay.Image = img;
        //// capture this window, and save it
        //sc.CaptureWindowToFile(this.Handle, "C:\\temp2.gif", ImageFormat.Gif);



        //var pdfContent = new MemoryStream(System.IO.File.ReadAllBytes(contenedor.ToString()));
        //pdfContent.Position = 0;
        // return new FileStreamResult(pdfContent, "application/pdf");

   // }
    string Archivos_Subidos = string.Empty;

    protected void btnSubir_Click(object sender, EventArgs e)
    {

        //tipo = 1;
        String Ruta = @"\\10.10.8.66\documentacion_new\SospechaCOVID";
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;
        string turno = turnoId.Value;

        for (int index = 0; index < Lista_Archivos.Count; index++)
        {

            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, turno)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);

            }
        }
        //lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }

    private bool Archivo_ValidarFormato(HttpPostedFile Archivo_Actual)
    {
        String fileExtension = System.IO.Path.GetExtension(Archivo_Actual.FileName).ToLower();
        String[] allowedExtensions = { ".jpg", ".png", ".jpeg", ".pdf" };
        for (int i = 0; i < allowedExtensions.Length; i++)
        {
            if (fileExtension == allowedExtensions[i]) return true;
        }
        return false;
    }

    private void Archivo_Guardar_en_Base(String NombreArchivo_Actual, string afiliadoId, string MedicoId)
    {
        Hospital.GuardiaBLL gua = new Hospital.GuardiaBLL();

        gua.SospechaCOVID_PDF_Insert(NombreArchivo_Actual, afiliadoId, MedicoId);// nuevo
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, string Ruta, string IdReclamo)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {
                string fecha = DateTime.Now.Day.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Year.ToString();
                //Ruta = Ruta + "adjunto_" + ReclamoId.Value; + System.IO.Path.GetFileName(Archivo_Actual.FileName)
                if (MedicoId.Value != "0")
                {
                    Archivo_Actual.SaveAs(Ruta + "/" + afiliadoId.Value + "_" + MedicoId.Value + "_" + fecha + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                    Archivo_Guardar_en_Base(afiliadoId.Value + "_" + MedicoId.Value + "_" + fecha + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), afiliadoId.Value, MedicoId.Value);

                    Response.Write("<script>");
                    Response.Write("alert('ARCHIVO ADJUNTADO');");
                    //Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + turnoId.Value + "&estado=" + 0 + "' ,'_blank');");
                    Response.Write("</script>");
                    //mensaje.Visible = false;
                    return true;
                }
                else {
                    Response.Write("<script>");
                    Response.Write("alert('NO SE PUDO OBTENER EL MEDICO. COMUNIQUESE CON SISTEMAS');");
                    Response.Write("</script>");
                    return false;
                }
            }
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo guardar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }

}