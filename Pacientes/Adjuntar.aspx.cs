using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hospital;

public partial class Pacientes_Adjuntar : System.Web.UI.Page
{
    public int tipo;
    string Archivos_Subidos = string.Empty;
    private string IdReclamo;
  
    protected void Page_Load(object sender, EventArgs e)
    {

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

    protected void btnSubir_Click(object sender, EventArgs e)
    {
        tipo = 1;
        String Ruta = @"\\10.10.8.66\documentacion_new\PacientesAdjuntos\";
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;

        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            //if (Lista_Archivos[index].ContentLength == 0)
            //{
            //    Response.Write("<script>");
            //    Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "' ,'_blank');");
            //    Response.Write("</script>");
            //}

            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, IdReclamo)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);
            }
        }
        //lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }

    private void Archivo_Guardar_en_Base(long afiliadoId,string ruta,string nombreArchivo, int tipo)
    {  
        PacientesBLL pac = new PacientesBLL();
        pac.Pacientes_Adjuntos_Insert(Archivo_Cargar_Datos(afiliadoId, ruta, nombreArchivo,tipo));
    }

    private Pacientes_Adjuntos Archivo_Cargar_Datos(long afiliadoId, string ruta, string nombreArchivo,int tipo)
    {
        //long _IdAfiliado;
        //if (!long.TryParse(afiliadoId, out _IdAfiliado)) throw new Exception("Numero de Requerimiento no valido.");
        Pacientes_Adjuntos adjunto = new Pacientes_Adjuntos();
        adjunto.afiliadoId = afiliadoId;
        adjunto.nombreArchivo = nombreArchivo;
        adjunto.rutaArchivo = ruta;
        adjunto.tipo = tipo;
        // adjunto.RutaArchivo = tipo + "_" + Exp_Id.ToString() + "_" + "0" + "_" + "0" + "_" + NombreArchivo_Actual;
        //adjunto.RutaArchivo = "\\10.10.8.66\\documentacion_new\\PacientesAdjuntos\\" + NombreArchivo_Actual;
        return adjunto;
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, string Ruta, string IdReclamo)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {

                string fecha = DateTime.Today.Day.ToString() + DateTime.Today.Month.ToString() + DateTime.Today.Year.ToString();
                Archivo_Actual.SaveAs(Ruta + "/" + afiliadoId.Value + "_" + fecha + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivo_Guardar_en_Base(Convert.ToInt64(afiliadoId.Value), Ruta, afiliadoId.Value + "_" + fecha + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), Convert.ToInt32(txtTipo.Value));

                Response.Write("<script>");
                Response.Write(" alert('Archivo Adjuntado.'); parent.ListaDocumentacion_Paciente();");
              //  Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + afiliadoId.Value + "&estado=" + 0 + "' ,'_blank');");
                Response.Write("</script>");
                return true;
            }
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo adjuntar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }
}