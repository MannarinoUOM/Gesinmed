using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Descripción breve de Atencion_Consultorio_IMG
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class Atencion_Consultorio_IMG : System.Web.Services.WebService {

    public Atencion_Consultorio_IMG () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public long Guardar_AtencionGeneral_IMG(long Protocolo, int Especialidad_Id, long NHC, int MedicoId, string Alias
        , string txt_1_cant, string txt_2_cant, string txt_3_cant, string txt_4_cant, string txt_5_cant, string txt_6_cant
        , string txt_7_cant, string txt_8_cant, string txt_9_cant, string txt_10_cant, string txt_otros_desc_1, string txt_otros_desc_2,
        string txt_otros_1, string txt_otros_2, string txt_cant_placas, string cbo_realizalopedido, string txt_fundamentar
        )
    {
        if (Session["Usuario"] != null)
        {
            long Resultado;
            
            AtConsultorio_IMGBLL CargarG = new AtConsultorio_IMGBLL();
            Resultado = CargarG.Guardar_IMG_Cabecera(Protocolo, null, "", "", Especialidad_Id, NHC, "", MedicoId, Alias);


            //Guardo los otros datos...
            AtConsultorio_IMGBLL CargarG_item = new AtConsultorio_IMGBLL();
            CargarG_item.Guardar_General_Items_IMG(Resultado, txt_1_cant, txt_2_cant, txt_3_cant,
                    txt_4_cant, txt_5_cant, txt_6_cant, txt_7_cant, txt_8_cant, txt_9_cant,
                    txt_10_cant,
                    txt_otros_desc_1, txt_otros_desc_2, txt_otros_1,
                    txt_otros_2, txt_cant_placas, cbo_realizalopedido, txt_fundamentar);

            //Cambio el estado del protocolo a 1
            CargarG.Cambiar_Estado(Resultado, 1);

            return Resultado;
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }



    [WebMethod(EnableSession = true)]
    public AtConsultorioIMG_item Cargar_IMG_items(long Protocolo)
    {
        if (Session["Usuario"] != null)
        {
            AtConsultorio_IMGBLL CargarG = new AtConsultorio_IMGBLL();
            return CargarG.Cargar_IMG_item(Protocolo);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }


    [WebMethod(EnableSession = true)]
    public AtConsultorioIMG_CAB CargarAtencion_IMG_CAB(long Protocolo)
    {
        if (Session["Usuario"] != null)
        {
            AtConsultorio_IMGBLL CargarG = new AtConsultorio_IMGBLL();
            return CargarG.CargarAtencion_IMG_CAB(Protocolo);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }




    [WebMethod]
    public int At_Consultorio_Existe_Atencion_by_NHC(int MedicoId, int EspecialidadId, long NHC)
    {
        AtConsultorio_IMGBLL atConsultorio = new AtConsultorio_IMGBLL();
        return atConsultorio.At_Consultorio_Existe_Atencion_by_NHC(MedicoId, EspecialidadId, NHC);
    }


    [WebMethod(EnableSession = true)]
    public long Ultimo_Protocolo_by_NHC_Medico(long NHC, int EspecialidadId, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            AtConsultorio_IMGBLL CargarG = new AtConsultorio_IMGBLL();
            return CargarG.Ultimo_Protocolo_by_NHC_Medico(NHC, EspecialidadId, MedicoId);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }



    [WebMethod(EnableSession = true)]
    public void AtConsultorio_IMG_Guardar(int Tipo, long Turno_Id, string Comentario, string Alias, string Ruta_Voz)
    {
        if (Session["Usuario"] != null)
        {
            long Usuario_Id = ((usuarios)(Context.Session["Usuario"])).id;
        AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter();
        adapter.H2_AtConsultorio_IMG_Guardar(Tipo, Turno_Id, (Int32)Usuario_Id, Comentario, Alias, Ruta_Voz);
        adapter.H3_Actualizar_Estado(Tipo, Turno_Id);    
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }


    [WebMethod(EnableSession = true)]
    public AtConsultorioIMG_subconsulta AtConsultorio_IMG_Cargar(int Tipo, long Turno_Id)
    {
        if (Session["Usuario"] != null)
        {
            AtConsultorio_IMGBLL atimg = new AtConsultorio_IMGBLL();
            return atimg.AtConsultorio_IMG_Cargar(Tipo, Turno_Id);    
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }



    [WebMethod(EnableSession = true)]
    public List<listapacientes> At_Consultorio_CargarTurnos_IMG(int MedicoId, int Especialidad, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            DateTime Fecha = Convert.ToDateTime(fecha);
            AtConsultorio_IMGBLL atConsultorio = new AtConsultorio_IMGBLL();
            return atConsultorio.At_Consultorio_ListaPacientes_IMG(MedicoId, Especialidad, Fecha);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    public int AtConsultorio_Turno_Estado(long Turno_Id)
    {
        if (Session["Usuario"] != null)
        {
            AtConsultorio_IMGBLL atConsultorio = new AtConsultorio_IMGBLL();
            return atConsultorio.AtConsultorio_Turno_Estado(Turno_Id);
        }
        else {
            throw new Exception("Error de Usuario");
        }
    }


    [WebMethod]
    public List<Chequeo_gral_carga_Lista_Practicas> Cargar_gral_carga_practicas(long TurnoId)
    {
        AtConsultorio_IMGBLL at_consultorio = new AtConsultorio_IMGBLL();        
        return at_consultorio.Cargar_gral_carga_practicas(TurnoId);
    }

    
}
