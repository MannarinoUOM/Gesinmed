using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Compras_scan_Rem_Comp_Internacion : System.Web.UI.Page
{
    public int tipo;

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

    private Compras_Adjuntos Archivo_Cargar_Datos(String NombreArchivo_Actual, string Exp_Id, long IdDetalle, bool Estado, long RemId)
    {
        long _Exp_Id;
        if (!long.TryParse(Exp_Id, out _Exp_Id)) throw new Exception("Numero de Requerimiento no valido.");
        Compras_Adjuntos adjunto = new Compras_Adjuntos();
        adjunto.Estado = Estado;
        adjunto.IdDetalle = IdDetalle;
        adjunto.ExpId = _Exp_Id;
        adjunto.ExpPedId = Convert.ToInt64("0");
        adjunto.ExpPreDetId = Convert.ToInt64("0");
        adjunto.RutaArchivo = tipo + "_" + Exp_Id.ToString() + "_" + id_Pedido.Value + "_" + id_Presupuesto.Value + "_" + NombreArchivo_Actual;
        adjunto.RemId = RemId;
        return adjunto;
    }

    private void Archivo_Guardar_en_Base(String NombreArchivo_Actual, string Exp_Id, string id_Pedido, string id_Presupuesto)
    {
        ComprasInternacionBLL Compras = new ComprasInternacionBLL();
        Compras.Compras_Internacion_Adjunto_Insert(Archivo_Cargar_Datos(NombreArchivo_Actual, "0", 0, true, Convert.ToInt64(id_Presupuesto)));
    }

    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, String Ruta, string Exp_Id, string id_Pedido, string id_Presupuesto)
    {
        try
        {
            if (Archivo_Actual.ContentLength > 0)
            {
                Archivo_Actual.SaveAs(Ruta + tipo + "_" + Exp_Id + "_" + id_Pedido + "_" + id_Presupuesto + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                Archivo_Guardar_en_Base(System.IO.Path.GetFileName(Archivo_Actual.FileName), Exp_Id, id_Pedido, id_Presupuesto);
                return true;
            }
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo guardar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }

    protected void btnSubir_Receta_Click(object sender, EventArgs e)
    {
        tipo = 1;
        String Ruta = @"\\10.10.8.66\documentacion_new\Compras_Adjuntos_Internacion\";
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;
        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, id_Expediente.Value, id_Pedido.Value, id_Presupuesto.Value)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);
            }
        }
        //lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }


    protected void btnSubir_Presupuesto_Click(object sender, EventArgs e)
    {
        tipo = 2;
        String Ruta = @"\\10.10.8.66\documentacion_new\Compras_Adjuntos_Internacion\";
        HttpFileCollection Lista_Archivos = Request.Files;
        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            if (Archivo_ValidarFormato(Lista_Archivos[index]))
            {
                if (Archivo_Guardar(Lista_Archivos[index], Ruta, id_Expediente.Value, id_Pedido.Value, id_Presupuesto.Value)) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);
            }
        }
        //lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        Dispose();
    }
}