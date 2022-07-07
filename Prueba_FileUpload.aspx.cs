using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Configuration;

public partial class Prueba_FileUpload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    string Archivos_Subidos = string.Empty;

    private bool Archivo_ValidarFormato(HttpPostedFile Archivo_Actual)
    {
        String fileExtension = System.IO.Path.GetExtension(Archivo_Actual.FileName).ToLower();           
        String[] allowedExtensions = { ".pdf" };
        for (int i = 0; i < allowedExtensions.Length; i++)
        {
            if (fileExtension == allowedExtensions[i]) return true;    
        }
        return false;
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, String Ruta)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {
                Archivo_Actual.SaveAs(Ruta + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Archivo_Actual.FileName);
                return true;
            }
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo guardar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }

    protected void btnSubir_Click(object sender, EventArgs e)
    {
         String Ruta = HttpContext.Current.Server.MapPath("~/Prueba_legales/");
         HttpFileCollection Lista_Archivos = Request.Files;
         for (int index = 0; index < Lista_Archivos.Count; index++)
         {
             if (Archivo_ValidarFormato(Lista_Archivos[index]))
             {
                 if (Archivo_Guardar(Lista_Archivos[index], Ruta)) lbl_File_NHC.InnerHtml = "Se han subido los siguientes archivos correctamente: " + Archivos_Subidos;
             }
         }
    }
}