using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using System.IO.Stream;
using System.IO;
//using System.Drawing;

public partial class Turnos_Medicos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        #region
        //validacion para mostrar o no la visualizacion de administrador del modulo medicos.
        //en la cual hay un ABM de medicos y tambien el pedido de capacitacion a los medicos nuevos por parte de sistemas.
        #endregion
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("992")) { Response.Redirect("Login.aspx"); }

       
    }
    string direcionIPfirmas = "";
    protected void btnUploadFimra_Click(object sender, EventArgs e)
    {

         direcionIPfirmas = System.Configuration.ConfigurationManager.AppSettings["direcionIPfirmas"];  // Esto viene del web.config 

        String Ruta = @"\\"+ direcionIPfirmas +"\\documentacion_new\\firmas\\";

        //String Ruta = @"\\"+ direcionIPfirmas +"\\Files\\Software\\Aplicaciones\\documentacion_new\\firmas\\"; 
       
        //String Ruta = Server.MapPath("../Compras_Internacion/");       
        HttpFileCollection Lista_Archivos = Request.Files;

        for (int index = 0; index < Lista_Archivos.Count; index++)
        {
            //if (Lista_Archivos[index].ContentLength == 0)
            //{
            //    Response.Write("<script>");
            //    Response.Write("alert('No se pudo obtener la imagen de la firma, intentelo nuevamente.');");
            //    Response.Write("</script>");
            //}

           // if (Archivo_ValidarFormato(Lista_Archivos[index]))
            //{
                //if (


            //System.Drawing.Bitmap bmp1 = new System.Drawing.Bitmap(Lista_Archivos[index].InputStream); // ó @"C:\sap.jpg"
           // System.IO.FileInfo imgInfo1 = new System.IO.FileInfo(Lista_Archivos[index].InputStream); // ó @"C:\sap.jpg"

            //if (bmp1.Width <= 100 || bmp1.Height <= 100)
            //{
                Archivo_Guardar(Lista_Archivos[index], Ruta, medicoId.Value, firmaId.Value);//) Archivos_Subidos += "<br>" + System.IO.Path.GetFileName(Lista_Archivos[index].FileName);
           // }
           // else
           // {
                //Response.Write("<script>");
                //Response.Write("alert('No se ha actualizado La imagen de la firma del medico. El archivo no puede superar los 500 x 500 px.');");
                //Response.Write("</script>");
            //}
           
        }
        //lbl_File_NHC.InnerHtml = "Archivos subidos: " + Archivos_Subidos;
        //Dispose();
    }

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


    private bool Archivo_Guardar(HttpPostedFile Archivo_Actual, string Ruta, string medicoId,string firmaId)
    {
        try
        {
            //if (Archivo_Actual.ContentLength > 0)
            //{

                //Ruta = Ruta + "adjunto_" + ReclamoId.Value;
            // es la primera carga o esta editando imagen
            if (System.IO.Path.GetFileName(Archivo_Actual.FileName).ToString() != "")
            {
                System.Drawing.Bitmap bmp1 = new System.Drawing.Bitmap(Archivo_Actual.InputStream); // ó @"C:\sap.jpg"
                if (bmp1.Width <= 500 || bmp1.Height <= 500)
                {
                    long retornoId = Archivo_Guardar_en_Base("_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), firmaId, medicoId);
                    Archivo_Actual.SaveAs(Ruta + "\\" + retornoId + "_" + System.IO.Path.GetFileName(Archivo_Actual.FileName).ToString());
                    if (retornoId > 0)
                    {
                        Response.Write("<script>");
                        ////Response.Write("alert('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "');");
                        //Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + firmaId + "&estado=" + 0 + "' ,'_blank');");
                        //Response.Write("alert('Se ha guardao la fima.');");
                        Response.Write("alert('los cambios fueron guardados exitosamente.'); $('#myModal').modal('hide');");
                        Response.Write("</script>");

                        string ruta = "";
                        FirmaDigitalDALTableAdapters.QueriesTableAdapter adapter = new FirmaDigitalDALTableAdapters.QueriesTableAdapter();
                        object obj = adapter.H2_Traer_Firma_Nombre_Archivo(retornoId);
                        if (obj != null) 
                             ruta = Convert.ToString(obj);

                        //string archivoFirma = "/firmaImagen/";
                        //foreach (FirmaDigitalDAL.H2_Traer_Firma_medicoRow row in tabla.Rows) { archivoFirma = archivoFirma + row.nombreArchivo; }
                        ////firmaImagen/1_cuphead.jpg
                        //string ruta = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + archivoFirma;
                        //string ruta = archivoFirma;
                        if (confirmarFirma.Checked)
                        {
                            Response.Write("<script>");
                            //Response.Write("$.fancybox(" +
                            //     "{" +
                            //         "'autoDimensions': false," +
                            //         "'href': '../Turnos/DiasdeAtencion.aspx?MedicoId=1&NombreMedico=pepe'," +
                            //         "'width': '100%'," +
                            //         "'height': '100%'," +
                            //         "'autoScale': false," +
                            //         "'transitionIn': 'none'," +
                            //         "'transitionOut': 'none'," +
                            //         "'type': 'iframe'," +
                            //         "'hideOnOverlayClick': false," +
                            //         "'enableEscapeButton': false }");
                            Response.Write("window.open('../Impresiones/Firma/ComprobanteFirmaConfirmada.aspx?nombreFirma=" + txtNombreFirma.Value + "&imagenFirma=" + ruta + "&mNacional=" + txtMatriculaFirmaNacional.Value + "&mProvincial=" + txtMatriculaFirmaProvincial.Value + "&fechaEscaneo=" + "&id=" + retornoId + "','_blank')");
                            Response.Write("</script>");
     
                        }


                        return true;
                    }
                }
                else
                {
                    Response.Write("<script>");
                    Response.Write("alert('No se ha actualizado La imagen de la firma del medico. El archivo no puede superar los 500 x 500 pixeles.');  $('#myModal').modal('show');");
                    Response.Write("</script>");
                }
            }
            //esta editando datos de firma pero no la imagen. el archivo esta vacio porque se carga la url para mostrar la imagen cargada anteriormente
            // tiene imagen porque se valida en el script
            bool guardo = false;
            if (System.IO.Path.GetFileName(Archivo_Actual.FileName).ToString() == "")
            {
                    long retornoId = Archivo_Guardar_en_Base("_" + System.IO.Path.GetFileName(Archivo_Actual.FileName), firmaId, medicoId);
                    if (retornoId > 0)
                    {
                        guardo = true;
                        Response.Write("<script>");
                        ////Response.Write("alert('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "');");
                        //Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + firmaId + "&estado=" + 0 + "' ,'_blank');");
                        //Response.Write("alert('Se ha guardao la fima.');");
                        Response.Write("alert('los cambios fueron guardados exitosamente.'); $('#myModal').modal('hide');");
                        Response.Write("</script>");

                        return true;
                    }

                //poner impresion aca
                    //Response.Write("<script>");
                    //Response.Write("$.fancybox(" +
                    //     "{" +
                    //         "'autoDimensions': false," +
                    //         "'href': '../Turnos/DiasdeAtencion.aspx?MedicoId=1&NombreMedico=pepe'," +
                    //         "'width': '100%'," +
                    //         "'height': '100%'," +
                    //         "'autoScale': false," +
                    //         "'transitionIn': 'none'," +
                    //         "'transitionOut': 'none'," +
                    //         "'type': 'iframe'," +
                    //         "'hideOnOverlayClick': false," +
                    //         "'enableEscapeButton': false }");

                    //Response.Write("</script>");

            }

            if (guardo)
            {
                Response.Write("<script>");
                ////Response.Write("alert('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + ReclamoId.Value + "&estado=" + 0 + "');");
                //Response.Write("window.open('../Impresiones/reclamos/reclamoImpresion.aspx?id=" + firmaId + "&estado=" + 0 + "' ,'_blank');");
                //Response.Write("alert('Se ha guardao la fima.');");
                Response.Write("alert('los cambios fueron guardados exitosamente.'); $('#myModal').modal('hide');");
                Response.Write("</script>");

                if (confirmarFirma.Checked)
                {
                    Response.Write("<script>");
                    Response.Write("$.fancybox(" +
                         "{" +
                             "'autoDimensions': false," +
                             "'href': '../Impresiones/Firma/ComprobanteFirmaConfirmada.aspx'," +
                             "'width': '100%'," +
                             "'height': '100%'," +
                             "'autoScale': false," +
                             "'transitionIn': 'none'," +
                             "'transitionOut': 'none'," +
                             "'type': 'iframe'," +
                             "'hideOnOverlayClick': false," +
                             "'enableEscapeButton': false }");

                    Response.Write("</script>");
                }
                return true;
            }             
            
            else return false;
        }
        catch (Exception ex)
        {
            throw new Exception("No se pudo guardar la firma del Médico " + System.IO.Path.GetFileName(Archivo_Actual.FileName));
        }
    }

    private long Archivo_Guardar_en_Base(String NombreArchivo_Actual, string firmaId, string medicoId)
    {
        firmaDigitalBLL firma = new firmaDigitalBLL();
       return firma.Compras_Adjunto_Insert(Archivo_Cargar_Datos(NombreArchivo_Actual, firmaId, medicoId));
    }

        private firma Archivo_Cargar_Datos(String NombreArchivo_Actual, string firmaId,string medicoId)
    {
        int _firmaId;
        if (!int.TryParse(firmaId, out _firmaId)) throw new Exception("Numero de Requerimiento no valido.");
        firma firma = new firma();


        firma.id = _firmaId;
        firma.medicoId = Convert.ToInt32(medicoId);
        firma.especialidadId = 0; //Convert.ToInt32(especialidadId.Value);
        firma.especialidadNombre = txtEspecialidad.Value;

        if (txtMatriculaFirmaNacional.Value == "") { firma.matriculaNacional = 0; } else { firma.matriculaNacional = Convert.ToInt32(txtMatriculaFirmaNacional.Value); }
        if (txtMatriculaFirmaProvincial.Value == "") { firma.matriculaProvincial = 0; } else { firma.matriculaProvincial = Convert.ToInt32(txtMatriculaFirmaProvincial.Value); }

        //firma.imagenRuta = "\\" + direcionIPfirmas + "\\firmas\\Reclamos_Adjuntos\\";
        firma.imagenRuta = "\\" + direcionIPfirmas + "\\documentacion_new\\firmas\\";
        firma.nombreArchivo = NombreArchivo_Actual;
        firma.nombreFirma = txtNombreFirma.Value;
        firma.usuario = Convert.ToInt32(((usuarios)Session["Usuario"]).id);

        if (confirmarFirma.Checked) { firma.nombreConfirma = txtNombreFirma.Value; firma.confirmada = 1; }
        else
        {
            firma.nombreConfirma = "";
            firma.confirmada = 0;
        }
        firma.activo = 1;
        
      
         

        return firma;
        // adjunto.RutaArchivo = tipo + "_" + Exp_Id.ToString() + "_" + "0" + "_" + "0" + "_" + NombreArchivo_Actual;
    }


}