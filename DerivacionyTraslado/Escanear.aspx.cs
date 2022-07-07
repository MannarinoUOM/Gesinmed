using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class DerivacionyTraslado_Escanear : System.Web.UI.Page
{
    string Archivos_Subidos = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnSubir_Click(object sender, EventArgs e)
    {

        //tipo = 1;
        String Ruta = @"\\10.10.8.66\Files\Software\Aplicaciones\Gesinmed_AUTORIZACIONES\";
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;
        string HC = numero.Value;
        string tipoDoc = Request.Form["cbo_Tipos"];

        for (int index = 0; index < Lista_Archivos.Count; index++)
        {

            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, HC, tipoDoc)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);

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


    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, string Ruta, string HC, string tipoDoc)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {

                Hospital.HistoriaClinicaBLL his = new Hospital.HistoriaClinicaBLL();
                string cant;
                cant = his.Estudios_Externos_Cant(Convert.ToInt64(HC), Convert.ToInt32(tipoDoc));

                                                           //cantidad archivos                                 // extension archivo
                    Archivo_Actual.SaveAs(Ruta + "/" + tipoDoc + "-" + HC + "-" + cant + System.IO.Path.GetExtension(Archivo_Actual.FileName).ToString());
                    Archivo_Guardar_en_Base(tipoDoc, HC, cant, System.IO.Path.GetExtension(Archivo_Actual.FileName));
                

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
            throw new Exception("No se pudo adjuntar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }

    private void Archivo_Guardar_en_Base(string tipo, string HC, string cant, string EXTENSION)
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

        aut.Documentacion_Autorizacion_Guardar(tipo, HC, cant, EXTENSION);
    }

}