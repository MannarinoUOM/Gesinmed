using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Pacientes_NuevoAfiliado : System.Web.UI.Page
{
    public int tipo;

    protected void Page_Load(object sender, EventArgs e)
    {

    }
    string Archivos_Subidos = string.Empty;
    private string IdReclamo;

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

    private Compras_Adjuntos Archivo_Cargar_Datos(String NombreArchivo_Actual, string IdReclamo)
    {
        long _IdReclamo;
        if (!long.TryParse(IdReclamo, out _IdReclamo)) throw new Exception("Numero de Requerimiento no valido.");
        Compras_Adjuntos adjunto = new Compras_Adjuntos();
        //adjunto.Estado = Estado;
        adjunto.IdDetalle = _IdReclamo;
        adjunto.ExpId = _IdReclamo;
        adjunto.ExpPedId = Convert.ToInt64("0");
        adjunto.ExpPreDetId = Convert.ToInt64("0");
        adjunto.IdReclamo = _IdReclamo;
       // adjunto.RutaArchivo = tipo + "_" + Exp_Id.ToString() + "_" + "0" + "_" + "0" + "_" + NombreArchivo_Actual;
        adjunto.RutaArchivo = "\\10.10.8.66\\documentacion_new\\Reclamos_Adjuntos\\" + NombreArchivo_Actual;
        adjunto.nombreArchivo = NombreArchivo_Actual;
        return adjunto;
    }

    private Compras_Adjuntos Archivo_Cargar_Datos_reclamo_Afiliacion(String NombreArchivo_Actual, string IdReclamo)
    {
        long _IdReclamo;
        if (!long.TryParse(IdReclamo, out _IdReclamo)) throw new Exception("Numero de Requerimiento no valido.");
        Compras_Adjuntos adjunto = new Compras_Adjuntos();
        //adjunto.Estado = Estado;
        adjunto.IdDetalle = _IdReclamo;
        adjunto.ExpId = _IdReclamo;
        adjunto.ExpPedId = Convert.ToInt64("0");
        adjunto.ExpPreDetId = Convert.ToInt64("0");
        adjunto.IdReclamo = _IdReclamo;
        // adjunto.RutaArchivo = tipo + "_" + Exp_Id.ToString() + "_" + "0" + "_" + "0" + "_" + NombreArchivo_Actual;
        adjunto.RutaArchivo = "\\10.10.8.66\\documentacion_new\\ErroresAfiliaciones\\" + NombreArchivo_Actual;
        adjunto.nombreArchivo = NombreArchivo_Actual;
        return adjunto;
    }

    private void Archivo_Guardar_en_Base(String NombreArchivo_Actual, string IdReclamo)
    {
        ComprasInternacionBLL Compras = new ComprasInternacionBLL();
        Compras.Compras_Adjunto_Insert(Archivo_Cargar_Datos(NombreArchivo_Actual, IdReclamo));
    }

    private void Archivo_Guardar_en_Base_Reclamo_Afiliaciones(String NombreArchivo_Actual, string IdReclamo)
    {
        reclamoAfiliacionesBLL reclamo = new reclamoAfiliacionesBLL();
        reclamo.Reclamo_Afiliacion_Adjunto_Insert(Archivo_Cargar_Datos_reclamo_Afiliacion(NombreArchivo_Actual, IdReclamo));
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, string Ruta, string IdReclamo)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {
                
                //Ruta = Ruta + "adjunto_" + ReclamoId.Value;
                Archivo_Actual.SaveAs(Ruta + "/" + ReclamoId.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivo_Guardar_en_Base(ReclamoId.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), ReclamoId.Value);

                Response.Write("<script>");
                //Response.Write("alert('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "');");
                Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "' ,'_blank');");
                Response.Write("</script>"); 
                return true;
            }
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo guardar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }


    private bool Archivo_Guardar_Reclamo_Afiliaciones(HttpPostedFile Archivo_Actual, string Ruta, string IdReclamo)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {

                //Ruta = Ruta + "adjunto_" + ReclamoId.Value;
                Archivo_Actual.SaveAs(Ruta + "/" + reclamorIdAfiliaciones.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivo_Guardar_en_Base_Reclamo_Afiliaciones(reclamorIdAfiliaciones.Value + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), reclamorIdAfiliaciones.Value);

                Response.Write("<script>");
                //Response.Write("alert('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "');");
                Response.Write("window.open('../Impresiones/reclamosAfiliaciones/reclamoAfiliacionImpresion.aspx?id=" + reclamorIdAfiliaciones.Value + "&estado=" + 0 + "' ,'_blank');");
                Response.Write("</script>");
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
        tipo = 1;
        String Ruta = @"\\10.10.8.66\documentacion_new\Reclamos_Adjuntos\";
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;
        
        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            if (Lista_Archivos[index].ContentLength == 0) {
                Response.Write("<script>");
                Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "' ,'_blank');");
                Response.Write("</script>"); 
            }

            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, IdReclamo)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);
                
            }
        }
        //lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }

    protected void btnSubirAfiliaciones_Click(object sender, EventArgs e)
    {
        tipo = 1;
        String Ruta = @"\\10.10.8.66\documentacion_new\ErroresAfiliaciones\";
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;

        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            if (Lista_Archivos[index].ContentLength == 0)
            {
                Response.Write("<script>");
                Response.Write("window.open('../Impresiones/reclamosAfiliaciones/reclamoAfiliacionImpresion.aspx?id=" + reclamorIdAfiliaciones.Value + "&estado=" + 0 + "' ,'_blank');");
                Response.Write("</script>");
            }

            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar_Reclamo_Afiliaciones (Lista_Archivos[index], Ruta, IdReclamo)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);

            }
        }
        //lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }

}