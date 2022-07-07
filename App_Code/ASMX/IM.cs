using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;
using System.Web.Script.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for IM
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class Indicaciones_Medicas : System.Web.Services.WebService {

    public Indicaciones_Medicas()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public long ExisteIM_Hoy_by_NHC(string NHC)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            long _NHC;
            if (!long.TryParse(NHC, out _NHC)) throw new Exception("Nro. HC no válido.");
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.ExisteIM_Hoy_by_NHC(_NHC);
        }
        else return -1;
    }

    [WebMethod]
    public List<long> IM_VER_ANTIOBIOTICO(long IMId)
    {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.IM_VER_ANTIOBIOTICO(IMId);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_IM_Cab(IM_Cab I)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.Insert_IM_Cab(I);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Egr_Detalle> VerHistorialEntregasIM(int IMId)
    {
        if (Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.VerHistorialEntregasIM(IMId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_IM_Det(List<IM_Det> objMedicamentos, string Id, int Modificar, int MedicoId)
    {
        int IdPed = 0;
        if (HttpContext.Current.Session["Usuario"] != null)
        {

                
                //FEDE: ESTO ES PARA QUE MODIFIQUE EL MEDICOOOOOOOOOOOOOOO
                FarmaciaBLL far = new FarmaciaBLL();
                far.H2_IM_ACTUALIZAR_MEDICO(int.Parse(Id), MedicoId);


                if (Modificar == 1)
                {
                    IndicacionMedicaBLL del = new IndicacionMedicaBLL();
                   del.Delete_IM_Det(Id); //Elimino los detalles de la IM_Anterior
                    far.Update_UsuarioModifica(2,int.Parse(Id), ((usuarios)HttpContext.Current.Session["Usuario"]).id); //Guardo el usuario que modifica la IM
                }
                objMedicamentos.ForEach(delegate (IM_Det det) { //Guardo los detalles de la IM
                    det.IM_Id = Id;
                    IndicacionMedicaBLL a = new IndicacionMedicaBLL();
                    IdPed = a.Insert_IM_Det(det);
                });

                FarmaciaBLL farm = new FarmaciaBLL();
                farm.UpdateIMPendiente(int.Parse(Id), true); //Siempre que agreguen nuevos insumos, se pone en pendiente la IM, para hacer luego la entrega...
                
                return int.Parse(Id);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<IM_Buscar> BuscarIM(string NHC, string Id, string Apellido, string Desde, string Hasta, string objBusquedaLista, string MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            if (string.IsNullOrEmpty(Id))
            {
                if (!string.IsNullOrEmpty(objBusquedaLista))
                    return a.BuscarIM(NHC, Id, Apellido, Desde, Hasta, objBusquedaLista, MedicoId);
                else return null;
            }
            else return a.BuscarIM(NHC, Id, Apellido, Desde, Hasta, objBusquedaLista, MedicoId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<IM_Buscar> BuscarIM_ENT(string NHC, string Id, string Desde, string Hasta, string ServicioId, int Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.Buscar_IM_ENT(NHC, Id, Desde, Hasta, ServicioId,Pendiente);
        }
        else return null;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void IM_DeleteItems_Modifica(int IdIM, int NroEntregaDet)
    {
        IndicacionMedicaBLL a = new IndicacionMedicaBLL();
        a.IM_DeleteItems_Modifica(IdIM, NroEntregaDet);
    }
    
    [WebMethod]
    [ScriptMethod]
    public List<IM_Ent_Det> BuscarIM_ENT_Det(string Id)
    {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.BuscarIM_ENT_Det(Id);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<IM_Ent_Det> BuscarIM_ENT_Det_Modifica(int IdIM, int NroEntregaDet)
    {
        IndicacionMedicaBLL a = new IndicacionMedicaBLL();
        return a.BuscarIM_ENT_Det_Modifica(IdIM,NroEntregaDet);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<IM_Det> BuscarIM_Det(string Id)
    {
        if (Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.BuscarIM_Det(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Delete_IM_Det(IM_Det i)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            a.Delete_IM_Det(i.IM_Id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Delete_IM_ENT(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            a.Delete_IM_ENT(Id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Get_NroEntrega_for_Remito(int IdIM)
    {
        if (Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            return a.Get_NroEntrega_for_Remito(IdIM);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Insert_IM_Ent(List<IM_Ent_Det> i, int Sala, int Cama, int Id, string Tipo, int NroEnt)
    {
        var paso = false;
        if (Session["Usuario"] != null)
        {

            // busca si en el array de los lotes seleccionados existe ENT. POR SUPERVISIÓN y solo entrega por ese lote
            i.ForEach(delegate (IM_Ent_Det obj){

                if (obj.NRO_LOTE_ARRAY != null)
                {
                    for (int e = 0; e < obj.NRO_LOTE_ARRAY.Length; e++)
                    {
                        if (obj.NRO_LOTE_ARRAY[e].valor == "ENT. POR SUPERVISIÓN")
                        {

                            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
                            obj.IM_Id = Id.ToString();
                            obj.NroEntrega = NroEnt;

                            // obj.Cantidad_aEnt = obj.Cantidad_aEnt - Convert.ToInt32(obj.UnidadEnt);

                            a.Insert_IM_Ent(obj, Sala, Cama, Tipo, ((usuarios)Session["Usuario"]).id);

                            // paso = true;
                            return;
                        }
                        else {
                            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
                            obj.IM_Id = Id.ToString();
                            obj.NroEntrega = NroEnt;

                            // obj.Cantidad_aEnt = obj.Cantidad_aEnt - Convert.ToInt32(obj.UnidadEnt);

                            a.Insert_IM_Ent(obj, Sala, Cama, Tipo, ((usuarios)Session["Usuario"]).id);
                        }
                    }
                }
            });


            // si no existe ENT. POR SUPERVISIÓN entrega por los lotes seleccionados
            //if (!paso)
            //{
            //    i.ForEach(delegate(IM_Ent_Det obj)
            //    {
            //        IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            //        obj.IM_Id = Id.ToString();
            //        obj.NroEntrega = NroEnt;

            //        // obj.Cantidad_aEnt = obj.Cantidad_aEnt - Convert.ToInt32(obj.UnidadEnt);

            //        a.Insert_IM_Ent(obj, Sala, Cama, Tipo, ((usuarios)Session["Usuario"]).id);
            //    });
            //}
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    

    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Duplicar_IM(int Id, string Fecha)
    {
        if (Session["Usuario"] != null)
        {            
                IndicacionMedicaBLL a = new IndicacionMedicaBLL();         
                object id = a.Duplicar_IM(Id, Fecha, ((usuarios)Session["Usuario"]).id);
                return Convert.ToInt32(id.ToString());
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int H2_IndicacionMedica_TraerLaUltima(int PacienteId)
    {
        if (Session["Usuario"] != null)
        {            
                IndicacionMedicaBLL a = new IndicacionMedicaBLL();
                object id = a.H2_IndicacionMedica_TraerLaUltima(PacienteId);
                return Convert.ToInt32(id.ToString());
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void IM_DETALLE_UPDATE(long IdIndicacionMedica, long IdIMDetalle, long IdInsumo, decimal Cantidad, int Frecuencia,
        decimal DosisEntregada, int UnidadesEntregada)
    {
        if (Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            a.IM_DETALLE_UPDATE(IdIndicacionMedica, IdIMDetalle, IdInsumo, Cantidad, Frecuencia, DosisEntregada, UnidadesEntregada,((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<IM_Det> verificarBajaMedicamentos(List<IM_Det> objMedicamentos)
    {
        string bajas = "";
        foreach(IM_Det item in objMedicamentos)
            {
                if (item.Insumo_Id != "0")
                bajas = bajas + " , " + item.Insumo_Id; 
            }
        IndicacionMedicaBLL IM = new IndicacionMedicaBLL();
        return IM.VerificarBajaInsumo(bajas);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void CerrarIM(int Id)
    {
        if (Session["Usuario"] != null)
        {
            IndicacionMedicaBLL a = new IndicacionMedicaBLL();
            a.CerrarIM(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
}
