using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using Hospital;
using System.IO;


/// <summary>
/// Descripción breve de Endoscopia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class Endoscopia : System.Web.Services.WebService {

    public Endoscopia () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano_Listado> ListaEndoscopias(int Id, string Fecha, bool Baja, int Turno, int cuales, string Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.Endoscopia_Turno_Lista(Id, Fecha, Baja, Turno, cuales, Tipo);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Quirofano_turnos_totales ListaEndoscopias_Totales(int Id, string Fecha, bool Baja, int Turno, int cuales, string Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.Endoscopia_Turno_Lista_cantidad(Id, Fecha, Baja, Turno, 0, Tipo);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<MotivoSusp> ListMotivo()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.Motivo_Susp_Lista(0);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Guardar_Diagnostico_PlanificarEndoscopia(int Id, string Diagnostico)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            q.Guardar_Diagnostico_PlanificarEndoscopia(Id, Diagnostico);
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano_Diagnostico> Diagnostico_Planificar_Endoscopia_Todas(string Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.DiagnosticoDiagnostico_Planificar_Cirugia_Todas(int.Parse(Id));
        }
        else return null;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano_Diagnostico> Diagnostico_Planificar_Endoscopia(string Id, bool estado, int Cirugia_id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.DiagnosticoDiagnostico_Planificar_Endoscopia(int.Parse(Id), estado, Cirugia_id);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Cirugia_Tipo> Lista_Estudios_Endoscopia(string Id, bool estado, int Cirugia_id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.Endoscopia_Tipo(int.Parse(Id), estado, Cirugia_id);
        }
        else return null;
    }


    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano_Cirugia> Endoscopia_Planificar_Endoscopia(string Id, bool estado, int Cirugia_id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.Endoscopia_Planificar_Endoscopia(int.Parse(Id), estado, Cirugia_id);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Guardar_Endoscopia_PlanificarEndoscopia(int Id, string Cirugia)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            q.Guardar_Endoscopia_PlanificarEndoscopia(Id, Cirugia);
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int GuardarEndoscopia(Quirofano qobj)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.EndoscopiaTurno_Guardar(qobj, ((usuarios)Session["Usuario"]).id);
        }
        else return -1;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano> ListaEndoscopia_Id(int Id, string Fecha, bool Baja)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.Endoscopia_Listar_Cargar(Id, Fecha, Baja);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int BorrarEndoscopia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                q.Borrar_Endoscopia(Id, ((usuarios)Session["Usuario"]).id);
                return 1;
            }
            catch
            {
                return 0;
            }
        }
        else return -1;
    }


    //[WebMethod(EnableSession = true)]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public List<Quirofano_Diagnostico> Diagnostico(string Id, bool estado)
    //{
    //    if (HttpContext.Current.Session["Usuario"] != null)
    //    {
    //        EndoscopiaBLL q = new EndoscopiaBLL();
    //        return q.Diagnostico(int.Parse(Id), estado);
    //    }
    //    else return null;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Protocolo_Cirugia_Info Protocolos_Cirugia_Info(long CirugiaId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.ProEndoscoDibujo_Cirugia_Info(CirugiaId);
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Endoscopia_ProEndoscoDibujo_Borrar(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            qbll.Endoscopia_ProEndoscoDibujo_Borrar(Id);
            return 1;
        }
        else return -1;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Endoscopia_ProEndoscoDibujo_Guardar(Endoscopia_ProEndoscoDibujo endo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            qbll.Endoscopia_ProEndoscoDibujo_Guardar(endo);
            return 1;
        }
        else return -1;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Endoscopia_ProEndoscoFCC_Guardar(Endoscopia_ProEndoscoFCC endo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            qbll.Endoscopia_ProEndoscoFCC_Guardar(endo);
            return 1;
        }
        else return -1;
    }
    
    
    

    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Endoscopia_ProEndoscoFeda_Guardar(Endoscopia_ProEndoscoFeda endo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            qbll.Endoscopia_ProEndoscoFeda_Guardar(endo);
            return 1;
        }
        else return -1;
    }
    
    


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Endoscopia_ProEndoscoDibujo CargarProEndoscoDibujo_ByCirugiaId(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.CargarProEndoscoDibujo_ByCirugiaId(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Endoscopia_ProEndoscoFCC CargarProEndoscoFCC_ByCirugiaId(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.CargarProEndoscoFCC_ByCirugiaId(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Endoscopia_ProEndoscoFeda CargarProEndoscoFeda_ByCirugiaId(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.CargarProEndoscoFeda_ByCirugiaId(Id);
        }
        else return null;
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Sala_y_Cama Cargar_Sala_y_Cama(int Quirofano_ID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.Cargar_Sala_y_Cama(Quirofano_ID);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int SuspenderCirugia(int Id, int Motivo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                q.Suspender_Endoscopia(Id, Motivo, ((usuarios)Session["Usuario"]).id);
                return 1;
            }
            catch
            {
                return 0;
            }
        }
        else return -1;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Reanudar_Endoscopia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                q.Reanudar_Endoscopia(Id);
                return 1;
            }
            catch
            {
                return 0;
            }
        }
        else return -1;
    }

    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void SubirImagen(string imageData, string Endoscopia_id)
    {
        //string path = @"C:\Users\Santa\Documents\Proyectos\Paint\Guardados\";
        //string path = @"C:\Users\Santa\Documents\Proyectos\Hospital_Fede_Manu_Gera\Endoscopia\paint\Guardados\";

        //PARA QUE FUNCIONE HAY QUE AGREAR....
        //<identity impersonate="true" userName="Laboratorio_PDF" password="laboratorio_pdf" />

        string path = @"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\ESTUDIOS\";
        string fileNameWitPath = path + "1_" + Endoscopia_id + ".bmp";
        using (FileStream fs = new FileStream(fileNameWitPath, FileMode.Create))
        {
            using (BinaryWriter bw = new BinaryWriter(fs))
            {
                byte[] data = Convert.FromBase64String(imageData);
                bw.Write(data);
                bw.Close();
            }
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Eliminar_Endoscopia_PlanificarEndoscopia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            q.Eliminar_Endoscopia_PlanificarEndoscopia(Id);
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Eliminar_Diagnostico_PlanificarEndoscopia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            q.Eliminar_Diagnostico_PlanificarEndoscopia(Id);
        }
    }




    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Borrar_ProtesisyOtros(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            qbll.Borrar_Protesis_Det(Id);
            return 1;
        }
        else return -1;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Guardar_Protesis_Cab(Quirofano_Protesis_Cab p)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            p.usuario = ((usuarios)Session["Usuario"]).id;
            qbll.Guardar_Protesis_Cab(p);
            return 1;
        }
        else return -1;
    }




    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Guardar_Protesis_Det(List<QuirofanoProtesis> p)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            foreach (QuirofanoProtesis qp in p)
            {
                qp.usuario = ((usuarios)Session["Usuario"]).id;
                qbll.Guardar_Protesis_y_Otros(qp);
            }
            return 1;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int UpdateCargaInsumosOtros(int Id, string Otros)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            qbll.UpdateCargaInsumosOtros(Id, Otros);
            return Id;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano_Protesis_Cab> Protesis_CAB(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.Protesis_Lista_CAB(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<QuirofanoProtesis> Protesis_Lista_Det(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.Protesis_Lista_Det(Id);
        }
        else return null;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsumoProtesis_AM_Insumos_Guardar(long Insumo_ID, string Descripcion)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            q.InsumoProtesis_AM_Insumos_Guardar(Insumo_ID, Descripcion);
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Insumo_y_Protesis_Insumo> InsumoProtesis_Insumos_Listar(long Insumo_ID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.InsumoProtesis_Insumos_Listar(Insumo_ID);
        }
        return null;
    }








    //***********
    //* INSUMOS *
    //***********
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano> ListaCirugias_Id(int Id, string Fecha, bool Baja)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL q = new EndoscopiaBLL();
            return q.Endoscopia_Listar_Cargar(Id, Fecha, Baja);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void DeleteInsumosEndoscopia(long Cirugia_Id, int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                q.Delete_Endoscopia_InsumosbyIdOperacion(Cirugia_Id, Tipo);
            }
            catch
            {

            }
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertInsumosEndoscopia(long Cirugia_Id, List<Qurifano_Insumo> Insumos, int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                foreach (Qurifano_Insumo insu in Insumos)
                {
                    if (insu != null)
                    {
                        q.Insert_Insumos_Endoscopia(Cirugia_Id, insu.Insumo_Id, insu.Cantidad, "", 0, Tipo);
                    }
                }
            }
            catch
            {

            }
        }
    }

    


    //[WebMethod(EnableSession = true)]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public List<Insumo> ListInsumosPlantilla_cargada_POS(int Planilla)
    //{
    //    if (HttpContext.Current.Session["Usuario"] != null)
    //    {
    //        try
    //        {
    //            QuirofanoBLL q = new QuirofanoBLL();
    //            return q.Select_Plantilla_by_Rubro_Cargado_pos(Planilla);
    //        }
    //        catch
    //        {
    //            return null;
    //        }
    //    }
    //    else return null;
    //}


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Insumo> Cargar_Plantilla_Cargado(long Cirugia_id, int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                return q.Cargar_Plantilla_Cargado(Cirugia_id, Tipo);
            }
            catch
            {
                return null;
            }
        }
        else return null;
    }





    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Insumo> H2_ENDOSCOPIA_LISTAR_INSUMOS(string Insumo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                return q.H2_ENDOSCOPIA_LISTAR_INSUMOS(Insumo);
            }
            catch
            {
                return null;
            }
        }
        else return null;
    }





    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void DeleteInsumosQuirurgicos(long Cirugia_Id, int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                EndoscopiaBLL q = new EndoscopiaBLL();
                q.Delete_Endoscopia_InsumosbyIdOperacion(Cirugia_Id, Tipo);
            }
            catch
            {

            }
        }
    }





    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Endoscopia_ProEndoscoVRSC_Guardar(Endoscopia_ProEndoscoFCC endo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            qbll.Endoscopia_ProEndoscoVRSC_Guardar(endo);
            return 1;
        }
        else return -1;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Endoscopia_ProEndoscoFCC CargarProEndoscoVRSC_ByCirugiaId(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.CargarProEndoscoVRSC_ByCirugiaId(Id);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Quirofano_Protocolos CargarProEndoscoCPER_ByCirugiaId(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            EndoscopiaBLL qbll = new EndoscopiaBLL();
            return qbll.CargarProEndoscoCPER_ByCirugiaId(Id);
        }
        else return null;
    }


    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Endoscopia_ProEndoCPER_Guardar(Quirofano_Protocolos q)
     {
         if (HttpContext.Current.Session["Usuario"] != null)
         {
             EndoscopiaBLL qbll = new EndoscopiaBLL();
             qbll.Endoscopia_ProtocolosCPER_Guardar(q);
             return 1;
         }
         else return -1;
     }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long ParteAnestesiaGuardarEndoscopia(long id, string[] celdas, datosAnestesia datos)
    {
        EndoscopiaBLL q = new EndoscopiaBLL();
        return q.ParteAnestesiaGuardarEndoscopia(id, celdas, datos, Convert.ToInt32(((usuarios)Session["Usuario"]).id));
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<datosAnestesia> TraerParteAnestesiaEndoscopia(long id)
    {
        EndoscopiaBLL q = new EndoscopiaBLL();
        return q.TraerParteAnestesiaEndoscopia(id);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long TraerIdParteAnestesiaEndoscopia(long id)
    {
        EndoscopiaBLL q = new EndoscopiaBLL();
        return q.TraerIdParteAnestesiaEndoscopia(id);
    }

}
