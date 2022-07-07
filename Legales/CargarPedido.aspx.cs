using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Legales_CargarPedido : System.Web.UI.Page
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

    private Legales_Adjuntos Archivo_Cargar_Datos(String NombreArchivo_Actual, string Req_Id, long IdDetalle, bool Estado)
    {
        long _id_Requerimiento;
        if (!long.TryParse(Req_Id, out _id_Requerimiento)) throw new Exception("Numero de Requerimiento no valido.");
        Legales_Adjuntos adjunto = new Legales_Adjuntos();
        adjunto.Estado = Estado;
        adjunto.IdDetalle = IdDetalle;
        adjunto.IdReq = _id_Requerimiento;
        adjunto.RutaArchivo = @"Legales_Adjuntos\" + Req_Id.ToString() + "_" + NombreArchivo_Actual;
        return adjunto;
    }

    private void Archivo_Guardar_en_Base(String NombreArchivo_Actual)
    {
        Hospital.LegalesBLL Legales = new Hospital.LegalesBLL();
        Legales.Legales_Adjunto_Insert(Archivo_Cargar_Datos(NombreArchivo_Actual, id_Requerimiento.Value,0,true));
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, String Ruta, string Req_Id)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {
                Archivo_Actual.SaveAs(Ruta + Req_Id + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivo_Guardar_en_Base(System.IO.Path.GetFileName(Archivo_Actual.FileName));
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
        String Ruta = @"\\10.10.8.66\documentacion_new\Legales_Adjuntos\";
        HttpFileCollection Lista_Archivos = Request.Files;
        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, id_Requerimiento.Value)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);
            }
        }
        lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }

}