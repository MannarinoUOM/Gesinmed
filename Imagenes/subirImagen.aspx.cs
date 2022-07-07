using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Imagenes_subirImagen : System.Web.UI.Page
{
    string Archivos_Subidos = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    
    protected void btnSubir_Click(object sender, EventArgs e)
    {

        //tipo = 1;
        String Ruta = @"\\10.10.8.66\documentacion_new\adjuntosIMG\";
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
        String[] allowedExtensions = { ".jpg", ".png", ".jpeg",".pdf" };
        for (int i = 0; i < allowedExtensions.Length; i++)
        {
            if (fileExtension == allowedExtensions[i]) return true;
        }
        return false;
    }

    private void Archivo_Guardar_en_Base(String NombreArchivo_Actual, string IdReclamo)
    {
        Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();

        img.Imagenes_Adjunto_Insert(IdReclamo, NombreArchivo_Actual);// nuevo
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, string Ruta, string IdReclamo)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {

                //Ruta = Ruta + "adjunto_" + ReclamoId.Value;
                Archivo_Actual.SaveAs(Ruta + "/" + turnoId.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivo_Guardar_en_Base(turnoId.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), turnoId.Value);

                Response.Write("<script>");
                Response.Write("alert('ARCHIVO ADJUNTADO');");
                //Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + turnoId.Value + "&estado=" + 0 + "' ,'_blank');");
                Response.Write("</script>");
                //mensaje.Visible = false;
                return true;
            }
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo guardar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }


    //private Compras_Adjuntos Archivo_Cargar_Datos(String NombreArchivo_Actual, string IdReclamo)
    //{
    //    long _IdReclamo;
    //    if (!long.TryParse(IdReclamo, out _IdReclamo)) throw new Exception("Numero de Requerimiento no valido.");
    //    Compras_Adjuntos adjunto = new Compras_Adjuntos();
    //    //adjunto.Estado = Estado;
    //    adjunto.IdDetalle = _IdReclamo;
    //    adjunto.ExpId = _IdReclamo;
    //    adjunto.ExpPedId = Convert.ToInt64("0");
    //    adjunto.ExpPreDetId = Convert.ToInt64("0");
    //    adjunto.IdReclamo = _IdReclamo;
    //    // adjunto.RutaArchivo = tipo + "_" + Exp_Id.ToString() + "_" + "0" + "_" + "0" + "_" + NombreArchivo_Actual;
    //    adjunto.RutaArchivo = "\\10.10.8.66\\documentacion_new\\Reclamos_Adjuntos\\" + NombreArchivo_Actual;
    //    adjunto.nombreArchivo = NombreArchivo_Actual;
    //    return adjunto;
    //}

}