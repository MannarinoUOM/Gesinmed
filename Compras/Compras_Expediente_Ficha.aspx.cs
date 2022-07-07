using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

public partial class Compras_Compras_Expediente_Ficha : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //string javaScript = "document.getElementsByClassName('toBlock').setAttribute('disabled', true);";
        //ScriptManager.RegisterStartupScript(this, this.GetType(), "script", javaScript, true);
        
        // si tiene el nuevo permiso para compras ambulatorio caba buscar expedientes de farmacia externa le bloqueo los controles
        //Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); 

        // para bloquear controles a el usuario de farmacia externa
        usuarios u = (usuarios)HttpContext.Current.Session["Usuario"];
       // string s = ConfigurationManager.AppSettings.Get("usuariosFE");
        string[] array = ConfigurationManager.AppSettings.Get("usuariosFE").Split(',');

        //if (v.Permiso("160"))
        //{
            if (array.Contains(u.id.ToString()))
            {
                editar.Value = "0";
                btnPedidos.Disabled = true;
                btnGuardar.Disabled = true;
                btnBaja.Disabled = true;
               // btnBuscarExpedientes.Disabled = true;
                btnNuevoExp.Disabled = true;
                cbo_tipo_doc.Disabled = true;
                txtdocumento.Disabled = true;
                txtapellido.Disabled = true;
                txt_NHC_UOM.Disabled = true;
                cboSeccional.Disabled = true;
                txt_NroExpendiente.Disabled = true;
                cboCodPariente.Disabled = true;
                txtFechaNacimiento.Disabled = true;
                txtFechaVencExp.Disabled = true;
                txt_cbo_Patologia.Disabled = true;
                txt_cbo_Diagnostico.Disabled = true;
                txtcuit.Disabled = true;
                txtEmpresa.Disabled = true;
                txtCalleEmpresa.Disabled = true;
                cbo_EstadoExpediente.Disabled = true;
                txtObservaciones.Disabled = true;
                chkDocu_Discapacidad.Disabled = true;
                chkDocu_ReciboSueldo.Disabled = true;
                chkDocu_DNI.Disabled = true;
                chkDocu_NacCasam.Disabled = true;
                btnBuscarPaciente.Disabled = true;
            }
   //     }
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
        adjunto.RutaArchivo = @"Compras_Adjuntos\" + Exp_Id.ToString() + "_" + NombreArchivo_Actual;
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
                if (!System.IO.File.Exists(Ruta + Exp_Id + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName)))
                {
                    Archivo_Actual.SaveAs(Ruta + Exp_Id + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName));
                    Archivo_Guardar_en_Base(System.IO.Path.GetFileName(Archivo_Actual.FileName));
                    return true;
                }
                else {
                    string sc = "<script type='text/javascript'>alert('YA EXISTE UN ARCHIVO CON ESE NOMBRE!, INTENTE CAMBIANDO EL NOMBRE DEL ARCHIVO.');</script>";
                    ScriptManager.RegisterStartupScript(this, typeof(Page), "alerta", sc, false);
                    return false; }
            }
            else return false;
        }
        catch (Exception ex)
        {
            string sc = "<script type='text/javascript'>alert('"+ ex.Message +"');</script>";
            ScriptManager.RegisterStartupScript(this, typeof(Page), "alerta", sc, false);
            return false; 
            //throw new Exception("No se pudo guardar el archivo " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
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