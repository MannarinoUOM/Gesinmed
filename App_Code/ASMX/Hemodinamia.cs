using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Hospital;

/// <summary>
/// Summary description for Hemodinamia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Hemodinamia : System.Web.Services.WebService {

    public Hemodinamia () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<hemodinamia> ListaHemodinamia_Id(int Id, string Fecha, bool Baja)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Hemodinamia_CirugiaList(Id, Fecha, Baja);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Sala_y_Cama Cargar_Sala_y_Cama(int Quirofano_ID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            return qbll.Cargar_Sala_y_Cama(Quirofano_ID);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void CambiarPaciente(long CirugiaId, long PacienteId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            q.H2_HEMODINAMIA_CAMBIAR_PACIENTE_PROVISORIO(CirugiaId, PacienteId);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Hemodinamia_Estado H2_HEMODINAMIA_ESTADOS(long CirugiaId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.H2_HEMODINAMIA_ESTADOS(CirugiaId);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<medicos_quirofano_x_especialidad> Listar_Medico_x_Especialidad(string Especialidad, int Medico_Predeterminado)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Listar_Medico_x_Especialidad(int.Parse(Especialidad), Medico_Predeterminado);
        }
        else return null;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public List<Quirofano_Diagnostico> Diagnostico_Planificar_Cirugia(string Id, bool estado, int Cirugia_id)
    //{
    //    if (HttpContext.Current.Session["Usuario"] != null)
    //    {
    //        QuirofanoBLL q = new QuirofanoBLL();
    //        return q.DiagnosticoDiagnostico_Planificar_Cirugia(int.Parse(Id), estado, Cirugia_id);
    //    }
    //    else return null;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Hemodinamia_Permisos_Tiempo TengoPermisoEdicion(int CirugiaId)
    {
        Hemodinamia_Permisos_Tiempo estado = new Hemodinamia_Permisos_Tiempo();
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
            if (v.PermisoSM("73"))
            {
                estado.Dias = "0";
                estado.Puedo = true;
                return estado;
            }

            HemodinamiaBLL q = new HemodinamiaBLL();
            int? dias = q.H2_Hemodinamia_Permiso_Edicion(CirugiaId);
            estado.Dias = dias.ToString();
            estado.Puedo = true;
            if (dias < -7)
            {
                estado.Puedo = false;
            }
            return estado;
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool Hemodinamia_Extra_EsViejo(long CirugiaID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Hemodinamia_Extra_EsViejo(CirugiaID);                        
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool VerificarUsuarioCirujano()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Verificar_Usuario_Cirujano(Convert.ToInt32(((usuarios)Session["Usuario"]).id));
        }
        else return false;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Hemodinamia_Diagnostico> Diagnostico_Planificar_Cirugia(string Id, bool estado, int Cirugia_id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Diagnostico_Planificar_Cirugia(int.Parse(Id), estado, Cirugia_id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Hemodinamia_MotivoSusp> ListMotivo()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Motivo_Susp_Lista(0);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<medicos> List_Medicos_Hemodinamia(string Activo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Lista_Medicos_TODOS(Activo);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Hemodinamia_Anestesia> ListaAnestesia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Anestesia_Lista(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<medicos> List_Medicos_HemodinamiabyEsp(string Activo, string Especialidad)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Lista_Medicos_byEsp(Activo, int.Parse(Especialidad));
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Cirugia_Tipo> ListaCirugia(string Id, bool estado, int Cirugia_id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Cirugia_Tipo(int.Parse(Id), estado, Cirugia_id);
        }
        else return null;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public List<Quirofano_Diagnostico> Diagnostico_Planificar_Cirugia(string Id, bool estado, int Cirugia_id)
    //{
    //    if (HttpContext.Current.Session["Usuario"] != null)
    //    {
    //        QuirofanoBLL q = new QuirofanoBLL();
    //        return q.DiagnosticoDiagnostico_Planificar_Cirugia(int.Parse(Id), estado, Cirugia_id);
    //    }
    //    else return null;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Quirofano_Cirugia> Cirugia_Planificar_Cirugia(string Id, bool estado, int Cirugia_id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            QuirofanoBLL q = new QuirofanoBLL();
            return q.Cirugias_Planificar_Cirugia(int.Parse(Id), estado, Cirugia_id);
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
                HemodinamiaBLL q = new HemodinamiaBLL();
                q.Suspender_Cirugia(Id, Motivo, ((usuarios)Session["Usuario"]).id);
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
    public int ReanudarCirugia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                q.Reanudar_Cirugia(Id);
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
    public void Guardar_Diagnostico_PlanificarCirugia(int Id, string Diagnostico)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            q.Guardar_Diagnostico_PlanificarCirugia(Id, Diagnostico);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Guardar_Cirugia_PlanificarCirugia(int Id, string Cirugia)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            q.Guardar_Cirugia_PlanificarCirugia(Id, Cirugia);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Eliminar_Cirugia_PlanificarCirugia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            q.Eliminar_Cirugia_PlanificarCirugia(Id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Eliminar_Diagnostico_PlanificarCirugia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            q.Eliminar_Diagnostico_PlanificarCirugia(Id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int BorrarCirugia(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                q.Borrar_Cirugia(Id, ((usuarios)Session["Usuario"]).id);
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
    public List<Hemodinamia_Listado> ListaCirugias(int Id, string Fecha, bool Baja, int Turno, int cuales)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Hemodinamia_Turno_Lista(Id, Fecha, Baja, Turno, cuales);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Hemodinamia_turnos_totales ListaCirugias_Totales(int Id, string Fecha, bool Baja, int Turno, int cuales)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Hemodinamia_Turno_Lista_cantidad(Id, Fecha, Baja, Turno, 0);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool TengoPermisoPlanificarCirugia()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.PermisoSM("72")) { return false; } else { return true; }
        }
        else
        {
            return false;
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int GenerarRegistroTurnoParteQuirurgico(int id, string fecha, bool dadodebaja, int turno, int cuales, string ruta)
    {
        HemodinamiaBLL q = new HemodinamiaBLL();
        return q.Generar_Registro_Turno_Parte_Quirurgico(id, fecha, dadodebaja, turno, cuales, ruta, Convert.ToInt32(((usuarios)Session["Usuario"]).id));
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int GuardarCirugia(hemodinamia qobj)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.HemodinamiaTurno_Guardar(qobj, ((usuarios)Session["Usuario"]).id);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR_ADM_FILTRO(long InsumoId, string Desde, string Hasta, int ServicioID, int TipoID, int MedidaID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            DateTime FD;
            DateTime FH;
            HemodinamiaBLL q = new HemodinamiaBLL();
            try
            {
                FD = Convert.ToDateTime(Desde);
            }
            catch
            {
                FD = Convert.ToDateTime("01/01/2000");
            }


            try
            {
                FH = Convert.ToDateTime(Hasta);
            }
            catch
            {
                FH = Convert.ToDateTime("01/01/3000");
            }

            if (TipoID == -1) { TipoID = 0; }
            if (MedidaID == -1) { MedidaID = 0; }

            List<INSUMO_EXTRA> lista = q.INSUMO_EXTRA_LISTAR_ADM_FILTRO(InsumoId, FD, FH, ServicioID, TipoID, MedidaID);
            return lista;
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_CREAR_NOMBRE(long InsumoId, string Nombre, int StockMinimo, bool EnStock)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            StockMinimo = 0;
            return q.INSUMO_EXTRA_CREAR_NOMBRE(InsumoId, Nombre, StockMinimo, EnStock);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public INSUMO_EXTRA INSUMO_EXTRA_CARGARINSUMO_X_ID(int ID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_CARGARINSUMO_X_ID(ID);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA_ORTOPEDIA> INSUMO_EXTRA_ORTOPEDIAS_LISTAR(long ID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_ORTOPEDIA_LISTAR(ID);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA_SERVICIO> INSUMO_EXTRA_SERVICIOS_LISTAR(long ID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_SERVICIOS_LISTAR(ID);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA_ORTOPEDIA> INSUMO_EXTRA_MARCAS_LISTAR()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_MARCAS_LISTAR();
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA_MOTIVO> INSUMO_EXTRA_MOTIVO_LISTAR(int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_MOTIVO_LISTAR(Tipo);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_MARCA_INSERTAR(long ID, string MARCA)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_MARCA_INSERTAR(ID, MARCA);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_SERVICIOS_ALTA(long ID, string SERVICIO, string ABREVIATURA)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_SERVICIOS_ALTA(ID, SERVICIO, ABREVIATURA);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_ORTOPEDIAS_ALTA(long id, string nombre)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_ORTOPEDIAS_ALTA(id, nombre);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR_ADM_DET(long InsumoId, int ServicioID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            List<INSUMO_EXTRA> lista = q.INSUMO_EXTRA_LISTAR_ADM_DET(InsumoId, ServicioID);
            return lista;
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string INSUMO_EXTRA_INSERTAR(long InsumoId, int Servicio, bool EsUOM, int OrtopediaId, string FV, int Cantidad, int Movimiento, string Observacion, long TipoId, long MedidaId, long MarcaId, string Deposito)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_ALTA(InsumoId, Convert.ToDateTime(FV), (int)((usuarios)HttpContext.Current.Session["Usuario"]).id, Movimiento.ToString(), Movimiento, Observacion, OrtopediaId, EsUOM, "", "", Cantidad, Servicio, TipoId, MedidaId, MarcaId, Deposito);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public INSUMO_EXTRA INSUMO_EXTRA_CARGAR_X_CODBARRA(long CodBar)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_CARGAR_X_CODBARRA(CodBar);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_ACTUALIZAR_X_CODBARRA(long CodBar, int SERVICIO, bool UOM, long ORTOPEDIAID, string FECHAVENCIMIENTO, int MOTIVO, string OBSERVACION, long TipoId, long MedidaId, long MarcaId, string Deposito)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            if (MOTIVO > 800) //>800 son los movimientos negativos.
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                return q.INSUMO_EXTRA_BAJA(CodBar.ToString(), (int)((usuarios)HttpContext.Current.Session["Usuario"]).id, MOTIVO, OBSERVACION);
            }
            else
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                return q.INSUMO_EXTRA_ACTUALIZAR_X_CODBARRA(CodBar, SERVICIO, UOM, ORTOPEDIAID, Convert.ToDateTime(FECHAVENCIMIENTO), MOTIVO, OBSERVACION, (int)((usuarios)HttpContext.Current.Session["Usuario"]).id, TipoId, MedidaId, MarcaId, Deposito);
            }
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_UTILIZAR_X_CODBARRA(long CodBar, int MOTIVO, string OBSERVACION)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_UTILIZAR_X_CODBARRA(CodBar, MOTIVO, OBSERVACION, (int)((usuarios)HttpContext.Current.Session["Usuario"]).id);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_ELIMINAR(long INSUMOID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            if (!q.INSUMO_EXTRA_USADO(INSUMOID))
            {
                return q.INSUMO_EXTRA_ELIMINAR(INSUMOID);
            }
            else
            {
                return false;
            }

        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool HEMODINAMIA_EXTRA_ALTATIPO(long TipoId, int RubroId, string Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.HEMODINAMIA_EXTRA_ALTATIPO(TipoId, RubroId, Tipo);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool HEMODINAMIA_EXTRA_ALTAMEDIDA(long TipoId, int RubroId, long MedidaId, string Medida)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.HEMODINAMIA_EXTRA_ALTAMEDIDA(RubroId, TipoId, MedidaId, Medida);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA_TIPO> HEMODINAMIA_EXTRA_LISTARTIPO(int RubroId, long TipoId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.HEMODINAMIA_EXTRA_LISTARTIPO(RubroId, TipoId);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA_MEDIDA> HEMODINAMIA_EXTRA_LISTARMEDIDA(long MedidaId, int RubroId, long TipoId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.HEMODINAMIA_EXTRA_LISTARMEDIDA(MedidaId, RubroId, TipoId);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    public List<AtConsultorioCirugia_Etapa> Hemodinamia_Programada_UltimaEtapa_x_Paciente_Listar(long PacienteId, string FDesde, string FHasta, string Paciente, string NHC, long Documento, bool Anulado, bool Finalizado, int Etapa)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            if (FDesde == "") { FDesde = "01/01/2018"; }
            if (FHasta == "") { FHasta = "01/01/2050"; }
            return Consultorio.Hemodinamia_Programada_UltimaEtapa_x_Paciente_Listar(PacienteId, FDesde, FHasta, Paciente, NHC, Documento, Anulado, Convert.ToInt32(Finalizado), Etapa);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public AtConsultorioCirugia_EtapaInfo Hemodinamia_Programada_ProximaEtapa(long CirugiaProgramadaID)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Hemodinamia_Programada_ProximaEtapa(CirugiaProgramadaID);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool Hemodinamia_Programada_GuardarProximaEtapa(long CirugiaProgramadaID, int Resultado, string Comentario)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            usuarios obj = (usuarios)Session["Usuario"];
            int UsuarioId = (int)obj.id;

            return Consultorio.Hemodinamia_Programada_GuardarProximaEtapa(CirugiaProgramadaID, UsuarioId, Resultado, Comentario);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool Hemodinamia_Programada_Anular(long CirugiaProgramadaID)
    {
        if (Session["Usuario"] != null)
        {
            usuarios obj = (usuarios)Session["Usuario"];
            int UsuarioId = (int)obj.id;
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Hemodinamia_Programada_Anular(CirugiaProgramadaID, UsuarioId);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool HemodinamiaProgramadaGuardarFechaAviso(long CirugiaProgramadaID, string fecha, int tipo)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Hemodinamia_Programada_Guardar_Fecha_Aviso(CirugiaProgramadaID, fecha, tipo);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool HemodinamiaProgramadaGuardarVaucher(Cirugia_Vaucher Objeto)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Hemodinamia_Programada_Guardar_Vaucher(Objeto);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public Cirugia_Vaucher HemodinamiaProgramadaImprimirVaucher(long CirugiaProgramadaID)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Hemodinamia_Programada_Imprimir_Vaucher(CirugiaProgramadaID);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<ParteQuirurgicoGenerado> TraerPartesQuirurgicosGeneradosHemodinamia()
    {
        HemodinamiaBLL q = new HemodinamiaBLL();
        return q.TraerPartesQuirurgicosGeneradosHemodinamia();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR(int EspecialidadID, bool NoStock)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_LISTAR(EspecialidadID, NoStock);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<hemodinamia> ListaCirugias_Id(int Id, string Fecha, bool Baja)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Hemodinamia_CirugiaList(Id, Fecha, Baja);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool Hemodinamia_Extra_Protesis_Borrar_Det(List<HemodinamiaProtesis> ObjetosEliminar)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
        if ((HttpContext.Current.Session["Usuario"] != null) && (v.Permiso("75")))
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            foreach (HemodinamiaProtesis qp in ObjetosEliminar)
            {
                qp.usuario = ((usuarios)Session["Usuario"]).id;
                q.Hemodinamia_Extra_Protesis_Borrar_Det(qp.operacion_Id, qp.codigobarra);
            }
            return true;
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public int Guardar_Protesis_Cab(Quirofano_Protesis_Cab p)
    //{
    //    if (HttpContext.Current.Session["Usuario"] != null)
    //    {
    //        HemodinamiaBLL qbll = new HemodinamiaBLL();
    //        p.usuario = ((usuarios)Session["Usuario"]).id;
    //        qbll.Guardar_Protesis_Cab(p);
    //        return 1;
    //    }
    //    else return -1;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool Hemodinamia_Extra_Protesis_Guardar_Det(List<HemodinamiaProtesis> p)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            foreach (HemodinamiaProtesis qp in p)
            {
                if (qp.Nuevo == 1 && qp.Estado == 1)
                {
                    qp.usuario = ((usuarios)Session["Usuario"]).id;
                    qbll.Hemodinamia_Extra_Protesis_Guardar_Det(qp.operacion_Id, qp.codigobarra);
                }
            }
            return true;
        }
        else return false;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Guardar_Protesis_Cab(Hemodinamia_Protesis_Cab p)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            p.usuario = ((usuarios)Session["Usuario"]).id;
            qbll.Guardar_Protesis_Cab(p);
            return 1;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<HemodinamiaProtesis> Hemodinamia_Extra_Protesis_Lista_Det(long CirugiaID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Hemodinamia_Extra_Protesis_Lista_Det(CirugiaID);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool INSUMO_EXTRA_CREAR_NOMBRE_AUTOMATICO(long InsumoId, string Nombre)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_CREAR_NOMBRE_AUTOMATICO(InsumoId, Nombre);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA> INSUMO_EXTRA_INSERTAR_AUTOMATICO(long InsumoId, int Servicio, bool EsUOM, int OrtopediaId, string FV, int Cantidad, int Movimiento, string Observacion, long TipoId, long MedidaId, long MarcaId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_ALTA_AUTOMATICO(InsumoId, Convert.ToDateTime(FV), (int)((usuarios)HttpContext.Current.Session["Usuario"]).id, Observacion, OrtopediaId, EsUOM, "", Observacion, Servicio, TipoId, MedidaId, Cantidad, MarcaId);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public INSUMO_EXTRA INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADO(long CodBar)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADO(CodBar);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<INSUMO_EXTRA_MEDIDA> QUIROFANO_EXTRA_LISTARMEDIDA(long MedidaId, int RubroId, long TipoId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.HEMODINAMIA_EXTRA_LISTARMEDIDA(MedidaId, RubroId, TipoId);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Resolucion28_Guardar(Resolucion28 c)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            qbll.Resolucion28_Guardar(c);
            return 1;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Resolucion28 CargarResolucion(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            return qbll.CargarResolucion(Id);
        }
        else return null;
    }

    [WebMethod]
    public List<cama> Lista_Camas(int Sala)
    {
        Hospital.CamaBLL c = new Hospital.CamaBLL();
        return c.Cama_Lista(null, Sala);
    }

    [WebMethod]
    public List<sala> Lista_Salas_S(int Servicio)
    {
        Hospital.SalasBLL s = new Hospital.SalasBLL();
        return s.Salas_Lista(null, Servicio);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Hemodinamia_Protocolos_Guardar(Hemodinamia_Protocolos q)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            qbll.Hemodinamia_Protocolos_Guardar(q, (int)((usuarios)HttpContext.Current.Session["Usuario"]).id);
            return 1;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Protocolo_Hemodinamia_Info Protocolos_Cirugia_Info(long CirugiaId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Protocolos_Cirugia_Info(CirugiaId);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Hemodinamia_Diagnostico> Diagnostico_Planificar_Hemodinamia(string Id, bool estado, int Cirugia_id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.DiagnosticoDiagnostico_Planificar_Hemodinamia(int.Parse(Id), estado, Cirugia_id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Hemodinamia_Protocolos ListProtocolo_ByCirugiaId(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            return qbll.ListByCirugiaId(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Quirofano_Permisos_Tiempo PuedoModificarParte(int U)
    {
        Quirofano_Permisos_Tiempo estado = new Quirofano_Permisos_Tiempo();
        if (HttpContext.Current.Session["Usuario"] != null)
        {

            if (U == 0)
            {
                estado.Dias = "0";
                estado.Puedo = true;
            }
            else
            {
                Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
                if ((((usuarios)HttpContext.Current.Session["Usuario"]).id == U) || v.PermisoSM("73"))
                {
                    estado.Dias = "0";
                    estado.Puedo = true;
                }
                else
                {
                    estado.Dias = "0";
                    estado.Puedo = false;
                }
            }
            return estado;
        }
        else
        {
            throw new Exception("Error Sesion");
        }

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Hemodinamia_PreAnes_Enc> ListPreAnes_Enc(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.ListPreAnes_Enc(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Guardar_Pre_Anestesico(PreQuirurgico p, int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            long Usuario = ((usuarios)Session["Usuario"]).id;
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Guardar_Pre_Anestesico(p, Id, (int)Usuario);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public PreQuirurgico Cargar_Preanestesico(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            return qbll.Cargar_Pre_Anestesico(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Insumo_PRE_Anestesia_Listado> Listar_Insumos_PreAnestesia(long CirugiaID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.Listar_Insumos_PreAnestesia(CirugiaID);
        }
        else
            return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<usuarios> cargarEnfermeros()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.cargarEnfermeros();
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
                HemodinamiaBLL q = new HemodinamiaBLL();
                q.Delete_Hemodinamia_InsumosbyIdOperacion(Cirugia_Id, Tipo);
            }
            catch
            {

            }
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertInsumosQuirurgicos(long Cirugia_Id, List<Hemodinamia_Insumo> Insumos, int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                foreach (Hemodinamia_Insumo insu in Insumos)
                {
                    if (insu != null)
                    {
                        q.Insert_Insumos_Hemodinamia(Cirugia_Id, insu.Insumo_Id, insu.Cantidad, "", 0, Tipo);
                    }
                }
            }
            catch
            {

            }
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertPreQuirurgicos_Plantilla(int Id, int IdInsumo, int Cantidad, int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                int Cod_Quirofano = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings.Get("MesesTurnos"));
                q.Insert_Plantilla_Servicios(1, IdInsumo, Cod_Quirofano, Cantidad, Tipo);
            }
            catch
            {

            }
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Insumo> ListInsumosPlantilla_cargada_POS(int Planilla)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                return q.Select_Plantilla_by_Rubro_Cargado_pos(Planilla);
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
    public List<Insumo> H2_HEMODINAMIA_LISTAR_INSUMOS(string Insumo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
                return q.H2_HEMODINAMIA_LISTAR_INSUMOS(Insumo);
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
    public List<Insumo> Cargar_Plantilla_Cargado(long Cirugia_id, int Tipo)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            try
            {
                HemodinamiaBLL q = new HemodinamiaBLL();
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
    public void H2_HEMODINAMIA_POST_GUARDAR(Post_Gral cg, List<Post_csv> csv, List<Post_Monitoreo> pm)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            q.H2_HEMODINAMIA_POST_GUARDAR(cg, csv, pm);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Post_Gral H2_HEMODINAMIA_POST_CABECERA_CARGAR(long Cirugia_Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.H2_HEMODINAMIA_POST_CARGAR(Cirugia_Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Post_Monitoreo> H2_HEMODINAMIA_POST_CABECERA_DETALLE_MONITOREO_CARGAR(long Cirugia_Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.H2_HEMODINAMIA_POST_MONITOREO_CARGAR(Cirugia_Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Post_csv> H2_HEMODINAMIA_POST_SIGNOS_VITALES_CARGAR(long Cirugia_Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.H2_HEMODINAMIA_POST_SIGNOS_VITALES_CARGAR(Cirugia_Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<diagnostico> HemodinamiaDiagnosticoPlanificarHemodinamia()
    {
        HemodinamiaBLL q = new HemodinamiaBLL();
        return q.HemodinamiaDiagnosticoPlanificarHemodinamia();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Hemodinamia_Protesis_Cab> Protesis_CAB(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL qbll = new HemodinamiaBLL();
            return qbll.Protesis_Lista_CAB(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public IMPRESION_ESTADOS IMPRESION_ESTADO(int CirugiaID)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            HemodinamiaBLL q = new HemodinamiaBLL();
            return q.HEMODINAMIA_IMPRESION_LISTADO_ESTADO(CirugiaID);
        }
        else
        {
            throw new Exception("Error Sesion");
        }
    }

    [WebMethod(EnableSession = true)]
    public bool Guardar_Atencion_Hemodinamia_MedicoExterno_Guardar(AtConsultorioCirugia_CirujanoExterno Medico)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Guardar_Atencion_Hemodinamia_MedicoExterno_Guardar(Medico);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<AtConsultorioCirugia_CirujanoExterno> Guardar_Atencion_Hemodinamia_MedicoExterno_Listar(int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Guardar_Atencion_Hemodinamia_MedicoExterno_Listar(MedicoId);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public AtConsultorioCirugia_Cirujano AtConsultorioHemodinamiaCargar(long PacienteId)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.AtConsultorioHemodinamiaCargar(PacienteId);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool Guardar_Atencion_Hemodinamia_Guardar(AtConsultorioCirugia_Cirujano Objeto)
    {
        if (Session["Usuario"] != null)
        {
            usuarios obj = (usuarios)Session["Usuario"];
            Objeto.UsuarioId = (int)obj.id;
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.Guardar_Atencion_Hemodinamia_Guardar(Objeto);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool AtConsultorioHemodinamiaProgramadaReestablecerTurno(long AfiliadoId, string observacion)
    {
        if (Session["Usuario"] != null)
        {
            HemodinamiaBLL Consultorio = new HemodinamiaBLL();
            return Consultorio.AtConsultorio_Hemodinamia_Programada_Reestablecer_Turno(AfiliadoId, observacion);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }
}


