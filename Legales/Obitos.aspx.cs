using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Legales_Obitos : System.Web.UI.Page
{
    string Archivos_Subidos = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnSubir_Click(object sender, EventArgs e)
    {

        //tipo = 1;
        String Ruta = @"\\10.10.8.20\data\Gesinmed\Imagenes\adjuntosObitos\";
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;
        string turno = AfiliadoId.Value;

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

    private void Archivo_Guardar_en_Base(String NombreArchivo_Actual, string IdReclamo)
    {
        Hospital.LegalesBLL leg = new Hospital.LegalesBLL();
        usuarios U = (usuarios)Session["Usuario"];

        leg.Imagenes_Obito_Insert(IdReclamo, NombreArchivo_Actual, Convert.ToInt32(U.id));// nuevo
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, string Ruta, string IdReclamo)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {

                //Ruta = Ruta + "adjunto_" + ReclamoId.Value;
                Archivo_Actual.SaveAs(Ruta + "/" + AfiliadoId.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivo_Guardar_en_Base(AfiliadoId.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), AfiliadoId.Value);

                Response.Write("<script>");
                Response.Write("alert('FOTO ADJUNTADA');");
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
}