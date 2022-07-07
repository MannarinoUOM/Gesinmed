using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Compras_Compras_Expediente_Ficha : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    string Archivos_Subidos = string.Empty;

    private bool Archivo_ValidarFormato(HttpPostedFile Archivo_Actual)
    {
        String fileExtension = System.IO.Path.GetExtension(Archivo_Actual.FileName).ToLower();
        String[] allowedExtensions = { ".jpg", ".png", ".jpeg" };
        for (int i = 0; i < allowedExtensions.Length; i++)
        {
            if (fileExtension == allowedExtensions[i]) return true;
        }
        return false;
    }

    private Compras_Adjuntos Archivo_Cargar_Datos(String NombreArchivo_Actual, string Exp_Id, long IdDetalle, bool Estado)
    {
        long _Exp_Id;
        if (!long.TryParse(Exp_Id, out _Exp_Id)) throw new Exception("Numero de Requerimiento no valido.");
        Compras_Adjuntos adjunto = new Compras_Adjuntos();
        adjunto.Estado = Estado;
        adjunto.IdDetalle = IdDetalle;
        adjunto.ExpId = _Exp_Id;
        adjunto.RutaArchivo = @"Compras_Adjuntos\" + Exp_Id.ToString() + "_" + "Internacion" + "_" + NombreArchivo_Actual;
        return adjunto;
    }

    private void Archivo_Guardar_en_Base(String NombreArchivo_Actual)
    {
        ComprasBLL Compras = new ComprasBLL();
        Compras.Compras_Adjunto_Insert(Archivo_Cargar_Datos(NombreArchivo_Actual, id_Expediente.Value, 0, true));
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, String Ruta, string Exp_Id)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {
                Archivo_Actual.SaveAs(Ruta + Exp_Id + "_" + "Internacion" +  "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
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
        String Ruta = @"\\10.10.8.66\documentacion_new\Compras_Adjuntos\";
        HttpFileCollection Lista_Archivos = Request.Files;
        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, id_Expediente.Value)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);
            }
        } 
        lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }
}