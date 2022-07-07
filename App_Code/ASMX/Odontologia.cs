using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for Odontologia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Odontologia : System.Web.Services.WebService {

    public Odontologia () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

     [WebMethod(EnableSession=true)]
    public List<practica> TraerNomencladorOdontologico()
    {
                 if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return  odon.Traer_Nomenclador_Odontologico();
                             }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public List<procedimeinto> TraerProcedimientosOdontologicos()
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Procedimientos_Odontologicos();
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public int GuardarOdontogramaCab(List<diente> dientes, List<parte> partes, long TurnoId)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Guardar_Odontograma_Cab(dientes, partes, TurnoId);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public List<caras> TraerCarasOdontologia()
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Caras_Odontologia();
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public long TraerTurnoIdOdontologia(string Fecha, long Medico, long Especialidad, long Afiliado)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Turno_Id_Odontologia(Fecha, Medico, Especialidad, Afiliado);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public long GuardarOdontologiaDet(long TurnoId, List<detalle> procedimientos)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Guardar_Odontologia_Det(TurnoId,procedimientos);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public List<detalle> TraerConsultaDelDiaOdontologia(long TurnoId)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Consulta_Del_Dia_Odontologia(TurnoId);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public List<detalle> TraerConsultasOdontologicas(long AfiliadoId, string fecha,int odonto)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Consultas_Odontologicas(AfiliadoId, fecha,odonto);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public int TraerConsultaGOdontologia(long AfiliadoId, string fecha, long MedicoId)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odonto = new OdontologiaBLL();
                   
                    return odonto.Traer_ConsultaG_Odontologia(AfiliadoId, fecha, MedicoId);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public int InsertarConsultaGOdontologia(long AfiliadoId, string fecha, long medico)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();

        return odon.Insertar_ConsultaG_Odontologia(AfiliadoId, fecha, medico);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public int EliminarDetalleOdontologia(long id)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Eliminar_Detalle_Odontologia(id);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public List<diente> TraerUltimoOdontogramaCab(long AfiliadoId)
    {
                          if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Ultimo_Odontograma_Cab(AfiliadoId);
        }
                          else throw new Exception("Inicie Sesión Nuevamente.");

    }

     [WebMethod(EnableSession=true)]
    public List<parte> TraerUltimoOdontogramaDet(string TurnosIds)
    {
                 if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Ultimo_Odontograma_Det(TurnosIds);
                             }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


     [WebMethod(EnableSession=true)]
    public List<diente> TraerOdontogramaConsultaCab(long TurnoId)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Odontograma_Consulta_Cab(TurnoId);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public List<parte> TraerOdontogramaConsultaDet(long TurnoId)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odon = new OdontologiaBLL();
        return odon.Traer_Odontograma_Consulta_Det(TurnoId);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


     [WebMethod(EnableSession=true)]
     public long GuardarOrdenLaboratorioCAB(OrdenLaboraOdonto obj, List<OrdenLaboraOdonto> estudios)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odonto = new OdontologiaBLL();
        return odonto.Guardar_Orden_Laboratorio_CAB(obj, estudios);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession = true)]
     public List<estudiosOdonto> traerProcedimientosPresupuestoOdontologia()
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.traer_Procedimientos_Presupuesto_Odontologia();
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }


     [WebMethod(EnableSession = true)]
     public List<estudiosOdonto> TraerOdontologos()
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.Traer_Odontologos();
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession=true)]
    public List<OrdenLaboraOdonto> TraerOrdenLaboratorioCAB(long AfiliadoId, int tipo, long id)
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odonto = new OdontologiaBLL();
        return odonto.H2_Traer_Orden_Laboratorio_CAB(AfiliadoId, tipo, id);
                            }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession=true)]
    public List<LaboratoiosOdonto> TraerLaboratoriosOdontologia()
    {
                if (Session["Usuario"] != null)
        {
        OdontologiaBLL odonto = new OdontologiaBLL();
        return odonto.Traer_Laboratorios_Odontologia();
        }
                else throw new Exception("Inicie Sesión Nuevamente.");
    }

     [WebMethod(EnableSession = true)]
     public long PresupuestoOdontologiaProximoNumero()
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.Presupuesto_Odontologia_Proximo_Numero();
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public long PresupuestoOdontologiaGuardarCAB(persupuestoCABodonto item)
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             usuarios U = new usuarios();
             U = (usuarios)Session["Usuario"];
             item.usuario = (int)U.id;
             return odonto.Presupuesto_Odontologia_Guardar_CAB(item);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public long PresupuestoOdontologiaGuardarDET(List<persupuestoDETodonto> lista,long idCab)
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.Presupuesto_Odontologia_Guardar_DET(lista, idCab);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public long PresupuestoOdontologiaGuardarPlanPago(List<persupuestoCUOTAodonto> lista,int guardar )
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
           return odonto.Presupuesto_Odontologia_Guardar_Plan_Pago(lista,guardar);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");

     }

     [WebMethod(EnableSession = true)]
     public List<persupuestoBusquedaOodonto> BuscarPresupuestosOdontologia(long afiliadoId, string nombre, string documento, string nhc, long Npresupuesto, bool saldados)
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.Buscar_Presupuestos_Odontologia(afiliadoId, nombre, documento, nhc, Npresupuesto, saldados);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public List<persupuestoDETodonto> TraerDetallePresupuestosOdontologia(long Npresupuesto)
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.Traer_Detalle_Presupuestos_Odontologia(Npresupuesto);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public List<persupuestoPAGOodonto> TraerCuotasActualizarPresupuestosOdontologia(long Npresupuesto)
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.Traer_Cuotas_Actualizar_Presupuestos_Odontologia(Npresupuesto);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

         [WebMethod(EnableSession = true)]
     public int configurarProcedimientosPresupuestoOdontologia(string codigo, int estado)
     {
         if (Session["Usuario"] != null)
         {
             OdontologiaBLL odonto = new OdontologiaBLL();
             return odonto.configurar_Procedimientos_Presupuesto_Odontologia(codigo, estado);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }


         [WebMethod(EnableSession = true)]
         public long InsertarReclamo(long IdReclamo ,string titulo,long servicio,string telefono,string reclamo,long afiliadoID, int estado )
         {
             if (Session["Usuario"] != null)
             {
                 long usuario = ((usuarios)Session["Usuario"]).id;
                 OdontologiaBLL odonto = new OdontologiaBLL();
                 return odonto.Insertar_Reclamo(IdReclamo, titulo, servicio, telefono, reclamo, afiliadoID, usuario, estado);
             }
             else throw new Exception("Inicie Sesión Nuevamente.");
         }

         [WebMethod(EnableSession = true)]
         public List<reclamo> ReclamoBuscar(reclamo obj)
         {
             if (Session["Usuario"] != null)
             {
                 //long usuario = ((usuarios)Session["Usuario"]).id;
                 OdontologiaBLL odonto = new OdontologiaBLL();
                 return odonto.Reclamo_Buscar(obj);
             }
             else throw new Exception("Inicie Sesión Nuevamente.");
         }

         [WebMethod(EnableSession = true)]
         public long ReclamoCerrar(long IdReclamo,string soluccion)
         {
             if (Session["Usuario"] != null)
             {
                 long usuarioResolucion = ((usuarios)Session["Usuario"]).id;
                 OdontologiaBLL odonto = new OdontologiaBLL();
                 return odonto.Reclamo_Cerrar(IdReclamo, usuarioResolucion,soluccion);
             }
             else throw new Exception("Inicie Sesión Nuevamente.");
         }

         [WebMethod(EnableSession = true)]
         public int OdontologiaGuardarPlanPagoEncabezado(long practicaId, decimal valorTotal, int cantidadCuotas)
         {
             if (Session["Usuario"] != null)
             {
                 long usuario = ((usuarios)Session["Usuario"]).id;
                 OdontologiaBLL odonto = new OdontologiaBLL();
                 return odonto.Odontologia_Guardar_Plan_Pago_Encabezado(practicaId, valorTotal, cantidadCuotas, usuario);
             }
             else throw new Exception("Inicie Sesión Nuevamente.");
         }

         [WebMethod(EnableSession = true)]
         public plaCAB OdontologiaTraerPlanPagoEncabezado(long practicaId)
         {
             if (Session["Usuario"] != null)
             {
                 long usuario = ((usuarios)Session["Usuario"]).id;
                 OdontologiaBLL odonto = new OdontologiaBLL();
                 return odonto.Odontologia_Traer_Plan_Pago_Encabezado(practicaId);
             }
             else throw new Exception("Inicie Sesión Nuevamente.");
         }

         [WebMethod(EnableSession = true)]
         public int OdontologiaGuardarPlanPago(List<cuota> planPago,long practicaId)
         {
             if (Session["Usuario"] != null)
             {
                 long usuario = ((usuarios)Session["Usuario"]).id;
                 OdontologiaBLL odonto = new OdontologiaBLL();
                 return odonto.Odontologia_Guardar_PlanPago(planPago, usuario, practicaId);
             }
             else throw new Exception("Inicie Sesión Nuevamente.");
         }


         [WebMethod(EnableSession = true)]
         public List<cuota> OdontologiaTraerPlanPago( long practicaId)
         {
             if (Session["Usuario"] != null)
             {
                 OdontologiaBLL odonto = new OdontologiaBLL();
                 return odonto.Odontologia_Traer_Plan_Pago(practicaId);
             }
             else throw new Exception("Inicie Sesión Nuevamente.");
         }

         //[WebMethod(EnableSession = true)]
         //public persupuestoPAGOodonto TraerCuotasActualizarPresupuestosOdontologia(long Npresupuesto)
         //{
         //    if (Session["Usuario"] != null)
         //    {
         //        OdontologiaBLL odonto = new OdontologiaBLL();
         //        return odonto.H2_Traer_Cuotas_Actualizar_Presupuestos_Odontologia(Npresupuesto);
         //    }
         //    else throw new Exception("Inicie Sesión Nuevamente.");
         //}

}

