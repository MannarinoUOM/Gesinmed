using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for IntSSC
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class IntSSC : System.Web.Services.WebService
{

    public IntSSC()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<servicio> Lista_Servicios()
    {
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        return s.Servicio_Lista(null, "");
    }

    [WebMethod]
    public List<servicio> Lista_Servicios_A()
    {
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        return s.Servicio_Lista_A(null, "");
    }

    [WebMethod]
    public List<servicio> Servicios_Archivo()
    {
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        return s.Servicios_Archivo(0, "");
    }

    [WebMethod]
    public List<servicio> Servicio_Lista_A_At_Internados()
    {
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        return s.Servicio_Lista_A_At_Internados(null, "");
    }

    [WebMethod]
    public List<sala> Lista_Salas(int Servicio)
    {
        Hospital.SalasBLL s = new Hospital.SalasBLL();
        return s.Salas_Lista(null, Servicio);
    }

    [WebMethod]
    public List<sala_A> Lista_Salas_A(int Servicio)
    {
        Hospital.SalasBLL s = new Hospital.SalasBLL();
        return s.Salas_Lista_A(null, Servicio);
    }

    [WebMethod]
    public long Insert_DatosAcompa(Acompa_Internacion a)
    {
        Hospital.InternacionesBLL i = new Hospital.InternacionesBLL();
        try
        {
            i.Insert_Datos_Acompa(a);
            return a.NroInternacion;
        }
        catch
        {
            return -1;
        }

    }

    [WebMethod]
    public Acompa_Internacion DatosAcompa_List(long Id)
    {
        Hospital.InternacionesBLL i = new Hospital.InternacionesBLL();
        try
        {
            return i.DatosAcompa_List(Id);
        }
        catch
        {
            return null;
        }

    }


    [WebMethod]
    public List<cama> Lista_Camas(int Sala)
    {
        Hospital.CamaBLL c = new Hospital.CamaBLL();
        return c.Cama_Lista(null, Sala);
    }


    [WebMethod]
    public List<cama_A> Lista_Camas_A(int Sala)
    {
        Hospital.CamaBLL c = new Hospital.CamaBLL();
        return c.Cama_Lista_A(null, Sala);
    }

    [WebMethod]
    public List<cama_A> Lista_Camas_byId(int Cama)
    {
        Hospital.CamaBLL c = new Hospital.CamaBLL();
        return c.Cama_Lista_A(Cama, 0);
    }


    [WebMethod]
    public void ServicioActivo(int Id, string Estado)
    {
        bool Est = (Estado == "Activo") ? false : true;
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        s.CambiarEstado(Id, Est);
    }

    [WebMethod]
    public void ServicioGuardar(int Id, string Servicio)
    {
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        s.GuardarServicio(Id, Servicio);
    }

    [WebMethod]
    public void SalaGuardar(int Id, string Sala, int Servicio)
    {
        Hospital.SalasBLL s = new Hospital.SalasBLL();
        s.Guardar(Id, Sala, Servicio);
    }

    [WebMethod]
    public void CamaGuardar(int Id, string Cama, int SalaId)
    {
        Hospital.CamaBLL s = new Hospital.CamaBLL();
        s.Guardar(Id, Cama, SalaId);
    }


    [WebMethod]
    public void EliminarServicio(int Id)
    {
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        s.ServicioEliminar(Id);
    }



    [WebMethod]
    public void SalaActiva(int Id, string Estado)
    {
        bool Est = (Estado == "Activo") ? false : true;
        Hospital.SalasBLL s = new Hospital.SalasBLL();
        s.CambiarEstado(Id, Est);
    }

    [WebMethod]
    public void CamaActiva(int Id, string Estado)
    {
        bool Est = (Estado == "Activo") ? false : true;
        Hospital.CamaBLL s = new Hospital.CamaBLL();
        s.CambiarEstado(Id, Est);
    }

    [WebMethod]
    public void EliminarSala(int Id)
    {
        Hospital.SalasBLL s = new Hospital.SalasBLL();
        s.Eliminar(Id);
    }

    [WebMethod]
    public void EliminarCama(int Id)
    {
        Hospital.CamaBLL s = new Hospital.CamaBLL();
        s.Eliminar(Id);
    }

    [WebMethod]
    public List<hosppor> HospPorLista()
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Hospitalizado_Por_Lista();
    }

    [WebMethod]
    public List<motivoIngreso> MotivoIngresoLista()
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Motivo_Ingreso();
    }

    [WebMethod]
    public List<motivoEgreso> MotivoEgresoLista()
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Motivo_Egreso();
    }

    [WebMethod(EnableSession = true)]
    public long Internacion_Guardar(int? Id, long NHC, string Fecha, int Servicio, int Sala, int Cama, string Telefono, string Diagnostico, int Hospitalizadopor, int Motivo, string Observacion,
        int Especialidad, int Medico, string AfiliadoId, int Movimiento, string Direccion_Acompa)
    {
        if (Session["Usuario"] != null)
        {
            long UsuarioId = ((usuarios)(Session["Usuario"])).id;
            long _AfiliadoId;
            if (!long.TryParse(AfiliadoId, out _AfiliadoId)) throw new Exception("Numero de Afiliado incorrecto");

            Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
            return h.Ingreso_Guardar(Id, NHC, Convert.ToDateTime(Fecha), Servicio, Sala, Cama, Telefono, Diagnostico, Hospitalizadopor, Motivo, Observacion, Especialidad, Medico, (int)UsuarioId, _AfiliadoId, Movimiento, Direccion_Acompa);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void Internacion_Baja(int Id, string Obs)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
            h.Internacion_Baja(Id, Obs);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void Internacion_Baja_Ambulatoria_SN(int Id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
            h.Internacion_Baja_Ambulatorio(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void Internacion_Borrar_Egreso(int Id, string Obs)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
            h.Internacion_Borrar_Egreso(Id, Obs);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod]
    public int UltimoMovimiento_Pac(long IdPaciente)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.UltimoMovimiento_Pac(IdPaciente);
    }

    //Internacion ambulatoria casos como quimioterapia en SN...No genera nro rendicion y se egresa en el dia
    [WebMethod(EnableSession = true)]
    public long Internacion_Guardar_Ambulatorio_SN(int? Id, long NHC, string Fecha, int Servicio, int Sala, int Cama, string Telefono, string Diagnostico, int Hospitalizadopor, int Motivo, string Observacion, int Especialidad, int Medico)
    {
        long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Ingreso_Guardar_Ambulatorio_SN(Id, NHC, Convert.ToDateTime(Fecha), Servicio, Sala, Cama, Telefono, Diagnostico, Hospitalizadopor, Motivo, Observacion, Especialidad, Medico, (int)UsuarioId);
    }

    [WebMethod]
    public int_egreso Egreso_Cargar(int Id)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Egreso_Id(Id);
    }

    [WebMethod]
    public long InternacionId_by_NHC(string NHC)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.InternacionId_by_NHC(NHC);
    }

    [WebMethod]
    public long InternacionId_Egresoby_NHC(string NHC)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.InternacionId_Egresoby_NHC(NHC);
    }


    [WebMethod]
    public int_ingreso Cargar_Internacion_Id(int Id)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Ingreso_Id(Id);
    }

    [WebMethod]
    public int_ingreso Cargar_Internacion_Id_Ambulatorio_SN(int Id)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Ingreso_Id_AmbulatorioSN(Id);
    }

    [WebMethod]
    public List<DiagnosticoICD10> CargarDiagnosticoSN()
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Diagnosticos_SN();
    }



    [WebMethod]
    public List<DiagnosticoICD10> CargarDiagnosticoICD10(string Codigo)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.DiagnosticoICD10(Codigo);
    }

    [WebMethod]
    public List<DiagnosticoICD10Detalle> CargarDiagnosticoICD10Detalles(string Codigo, string ICD10)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.DiagnosticoICD10Detalles(Codigo, ICD10);
    }

    //Autocomplete, like con descripcion
    [WebMethod]
    public List<DiagnosticoICD10Detalle> CargarDiagnosticoICD10Detalles_Autocomplete(string str)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.DiagnosticoICD10Detalles_Autocomplete(str);
    }

    [WebMethod]
    public List<buscarinternacion> BuscarInternaciones(string Fecha, string FechaHasta, int ServicioId, int SalaId, int CamaId, string NroDoc, string NroHC, string NombreYApllido, string Todas)
    {
        int rNroDoc;
        long rNHC;

        if (!int.TryParse(NroDoc, out rNroDoc)) rNroDoc = 0;
        if (!long.TryParse(NroHC, out rNHC)) rNHC = 0;

        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Buscar_Internacion(0, Convert.ToDateTime(Fecha), Convert.ToDateTime(FechaHasta), ServicioId, SalaId, CamaId, rNroDoc, rNHC, NombreYApllido, Todas);
    }

    [WebMethod]
    public List<buscarinternacion> BuscarInternaciones_Ambulatorio_SN(string Fecha, string FechaHasta, int ServicioId, int SalaId, int CamaId, string NroDoc, string NroHC, string NombreYApllido, string Todas)
    {
        int rNroDoc = 0;
        long rNHC = 0;

        if (NroDoc != "")
        {
            if (!int.TryParse(NroDoc, out rNroDoc))
            {
                throw new Exception("Verifique el Numero de Documento");
            }
        }

        if (NroHC != "")
        {
            if (!long.TryParse(NroDoc, out rNHC))
            {
                throw new Exception("Verifique el Numero de CUIL");
            }
        }


        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Buscar_Internacion_Ambulatorio(0, Convert.ToDateTime(Fecha), Convert.ToDateTime(FechaHasta), ServicioId, SalaId, CamaId, rNroDoc, rNHC, NombreYApllido, Todas);
    }

    [WebMethod]
    public List<buscarinternacion> BuscarInternaciones_Egresos(string Fecha, string FechaHasta, int ServicioId, int SalaId, int CamaId, string NroDoc, string NroHC, string NombreYApllido, string Todas)
    {
        int rNroDoc;
        long rNHC;

        if (!int.TryParse(NroDoc, out rNroDoc)) rNroDoc = 0;

        if (!long.TryParse(NroHC, out rNHC)) rNHC = 0;


        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Buscar_Internacion_Egresos(0, Convert.ToDateTime(Fecha), Convert.ToDateTime(FechaHasta), ServicioId, SalaId, CamaId, rNroDoc, rNHC, NombreYApllido, Todas);
    }

    [WebMethod(EnableSession = true)]
    public void Egreso_Guardar(int Id, string DiagnosticoICD10Id, string DiagnosticoICD10DetalleId, string ICD10_3, int Motivo, string ObservacionFinal, string Operado,
        string OperadoFecha, int EgresoEspecialidadId, int EgresoMedicoId, string FechaEgreso, string FechaIngreso)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();

            DateTime f_ing, f_egr;

            if (!DateTime.TryParse(FechaIngreso, out f_ing)) throw new Exception("Fecha de ingreso no válida.");
            if (!DateTime.TryParse(FechaEgreso, out f_egr)) throw new Exception("Fecha de egreso no válida.");

            if (f_egr < f_ing) throw new Exception("La fecha de egreso debe ser posterior a la fecha de ingreso.");

            long UsuarioId = ((usuarios)(Session["Usuario"])).id;
            bool operado = false;
            bool Error = false;
            if (Operado == "Si") { operado = true; }
            if (Operado != "Si" && Operado != "No")
            {
                Error = true;
            }

            DateTime? FOperado = null;

            if (OperadoFecha != "")
            {
                FOperado = Convert.ToDateTime(OperadoFecha);
            }

            if (!Error)
            {
                h.Guardar_Egreso(Id, DiagnosticoICD10Id, DiagnosticoICD10DetalleId, ICD10_3, Motivo, ObservacionFinal, operado, FOperado, EgresoEspecialidadId, EgresoMedicoId,
                    (int)UsuarioId, Convert.ToDateTime(FechaEgreso));
            }
            else
            {
                throw new Exception("Verifique los campos");
            }
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public void Aislar_Sala(int SalaId, string Motivo, string Estado)
    {
        bool Aislada = true;
        if (Estado == "Disponible")
        {
            Aislada = false;
        }
        long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        h.Aislar_Sala(SalaId, (int)UsuarioId, Motivo, Aislada);
    }

    [WebMethod(EnableSession = true)]
    public estado_aislado Estado_Aislado_Sala(int Salaid)
    {
        Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
        return h.Estado_Aislado_Sala(Salaid);
    }



    [WebMethod]
    public List<sala> Lista_Salas_S(int Servicio)
    {
        Hospital.SalasBLL s = new Hospital.SalasBLL();
        return s.Salas_Lista(null, Servicio);
    }

    [WebMethod]
    public List<servicio> Lista_ServiciosbyId(int Servicio)
    {
        Hospital.ServicioBLL s = new Hospital.ServicioBLL();
        return s.Servicio_Lista(Servicio, "");
    }

    [WebMethod(EnableSession = true)]
    public intresumen InternacionResumen(int IntId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL i = new Hospital.InternacionesBLL();
            return i.InternacionResumen(IntId);
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public long AT_INT_EST_ALT_COMP_ULT_BY_PAC(long PacienteId)
    {
        Hospital.AtInternadosBLL i = new Hospital.AtInternadosBLL();
        return i.AT_INT_EST_ALT_COMP_ULT_BY_PAC(PacienteId);
    }


    [WebMethod(EnableSession = true)]
    public List<Alcaloide> Traer_Alcaloides(long idIntenacion)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.Traer_Alcaloides(idIntenacion);
    }


    [WebMethod(EnableSession = true)]
    public long guardarAlcaloides(long internacion, long medico, List<Alcaloide> lista)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.Guardar_Alcaloides(internacion, medico, lista);
    }

    [WebMethod(EnableSession = true)]
    public string copiarPDFconsentimiento(long afiliadoId, string tipo, long UsuarioId, string nombreArchivo, int? cual)
    {
        //long UsuarioId = Convert.ToInt64(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.copiarPDFconsentimiento(afiliadoId, tipo, UsuarioId,nombreArchivo, cual);
    }

    [WebMethod(EnableSession = true)]
    public long traerUsuario()
    {
        return Convert.ToInt64(((usuarios)Session["Usuario"]).id);
    }
    [WebMethod(EnableSession = true)]
    public List<intIngresoListar> BuscarImpresionIngreso(string desde, string hasta, string apellido, int doc, int cama, int sala, string hc)
    {
        //long UsuarioId = Convert.ToInt64(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.BuscarImpresionIngreso(desde, hasta, apellido, doc, cama, sala, hc);
    }
    [WebMethod(EnableSession = true)]
    public List<intIngresoListar> BuscarImpresionEgreso(string desde, string hasta, string apellido, int doc, int cama, int sala, string hc)
    {
        //long UsuarioId = Convert.ToInt64(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.BuscarImpresionEgreso(desde, hasta, apellido, doc, cama, sala, hc);
    }

    [WebMethod(EnableSession = true)]
    public List<controlRemoto> TraerControlesRemotos()
    {
        //long UsuarioId = Convert.ToInt64(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.TraerControlesRemotos();
    }

    [WebMethod(EnableSession = true)]
    public long GuardarPermisoVisita(long idInternacion, long afiliadoId, string permiso, int permanente)
    {
        long UsuarioId = Convert.ToInt64(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.GuardarPermisoVisita(idInternacion, afiliadoId, permiso, UsuarioId, permanente);
    }

    [WebMethod(EnableSession = true)]
    public List<permisoVisita> TraerPermisosVisita(long internacionId, string nombre)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.TraerPermisosVisita(internacionId, nombre);
    }

    [WebMethod(EnableSession = true)]
    public int ActualizarEstadoPermisoVisita(int id, int estado)
    {
        long UsuarioId = Convert.ToInt64(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.ActualizarEstadoPermisoVisita(id, UsuarioId, estado);
    }

    [WebMethod(EnableSession = true)]
    public int ActualizarVisitas(long id, int cantidad)
    {
        long UsuarioId = Convert.ToInt64(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.ActualizarVisitas(id, cantidad, UsuarioId);
    }

    [WebMethod(EnableSession = true)]
    public int GuardarEvolucionEspecialista(long id, long internacionId, long afiliadoId, int practicaId, string evolucion)
    {
        int usuario = Convert.ToInt32(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.GuardarEvolucionEspecialista(id, internacionId, afiliadoId, practicaId, evolucion, usuario);
    }

    [WebMethod(EnableSession = true)]
    public List<practicaEspecialista> TraerPracticaEpecialista()
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.TraerPracticaEpecialista();
    }

    [WebMethod(EnableSession = true)]
    public List<evolucionEspecialista> TraerEvolucionEspecialista(long internacionId)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.TraerEvolucionEspecialista(internacionId);
    }

    [WebMethod(EnableSession = true)]
    public List<controlRemotoListar> ListarInternacionesControles(bool tienen, long afiliadoId, long servicioId, int controlId)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.ListarInternacionesControles(tienen, afiliadoId, servicioId, controlId);
    }

    [WebMethod(EnableSession = true)]
    public int AdminitrarEntregasControles(int id, int camaId, int controlId, string observacion, int afiliadoId,string servicio)
    {
        int usuario = Convert.ToInt32(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.AdminitrarEntregasControles(id, camaId, controlId, usuario, observacion, afiliadoId, servicio);
    }

    [WebMethod(EnableSession = true)]
    public List<controlesRemotos> TraerControles(int activo)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.TraerControles(activo);
    }

    [WebMethod(EnableSession = true)]
    public int InsertarControl(int id, string marca, string modelo, int cantidad, string observacion)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.InsertarControl(id, marca, modelo, cantidad, observacion);
    }

    [WebMethod(EnableSession = true)]
    public void ActualizarEstadoControl(int id)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        h.ActualizarEstadoControl(id);
    }


    [WebMethod(EnableSession = true)]
    public void InsertarLogDescontarStock(int idControl, int cantidad, string observacion)
    {
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        h.InsertarLogDescontarStock(idControl, cantidad, observacion,Convert.ToInt32(((usuarios)Session["Usuario"]).id));
    }


    [WebMethod(EnableSession = true)]
    public int DevolverControlxEgreso(int id)
    {
        int usuario = Convert.ToInt32(((usuarios)Session["Usuario"]).id);
        Hospital.AtInternadosBLL h = new Hospital.AtInternadosBLL();
        return h.DevolverControlxEgreso(id, usuario);
    }
}






