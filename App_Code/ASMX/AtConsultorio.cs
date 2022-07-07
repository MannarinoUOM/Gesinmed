using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for AtConsultorio
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class AtConsultorio : System.Web.Services.WebService
{

    public AtConsultorio()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

    }

    [WebMethod]
    public List<atconsultorio> At_Consultorio_BonoId(string BonoId, string Fecha)
    {
        BonoId = BonoId.Replace("_", "");
        if (BonoId.Length > 0 && Fecha != "")
        {
            int bonoId = Convert.ToInt32(BonoId);
            DateTime fecha = Convert.ToDateTime(Fecha);
            Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
            return atConsultorio.At_Consultorio_BonoId(bonoId, fecha);
        }
        else
        {
            throw new Exception("Verifique los datos");
        }
    }

    [WebMethod]
    public string At_Consultorio_Cargar_FechaNac(long NHC)
    {
        Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
        return atConsultorio.At_Consultorio_Cargar_FechaNac(NHC);
    }

    [WebMethod]
    public altacomplejidad AltaComplejidad_byId(long Protocolo)
    {
        Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
        return atConsultorio.AltaComplejidad_byID(Protocolo);
    }

    [WebMethod(EnableSession=true)]
    public long At_Consultorio_AltaComplejidad_Guardar(altacomplejidad obj)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
            obj.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return atConsultorio.At_Consultorio_AltaComplejidad_Guardar(obj);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod]
    public int At_Consultorio_Existe_Atencion_by_NHC(int MedicoId, int EspecialidadId, long NHC)
    {
        Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
        return atConsultorio.At_Consultorio_Existe_Atencion_by_NHC(MedicoId, EspecialidadId, NHC);
    }

    [WebMethod]
    public List<atconsultorio> At_Consultorio_PorDocumento(string Documento, string Fecha)
    {
        Documento = Documento.Replace("_", "");
        int documento = Convert.ToInt32(Documento);
        DateTime fecha = Convert.ToDateTime(Fecha);
        Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
        return atConsultorio.At_Consultorio_PorDocumento(documento, fecha);
    }

    [WebMethod]
    public List<bono_libre> At_Consultorio_Bonos_Libres(string Documento, int Especialidad)
    {
        Documento = Documento.Replace("_", "");
        int documento = Convert.ToInt32(Documento);

        Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
        return atConsultorio.At_Consultorio_Bono_Libres(documento, Especialidad);
    }

    [WebMethod(EnableSession = true)]
    public List<medicos> Medicos_Por_Usuarios()
    {
        if (Session["Usuario"] != null)
        {
            usuarios u = ((usuarios)(Context.Session["Usuario"]));
            int Id = 0;
            
            if (u.tipo.Equals("Administrador")) Id = -1;
            else Id = (int)u.id;

            if (u.permisosB.Contains("141")) Id = -1; //Legales
            Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
            return atConsultorio.Medicos_Por_Usurios(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public List<medicos> Medicos_Por_Usuarios_Filtrado()
    {
        if (Session["Usuario"] != null)
        {
            usuarios u = ((usuarios)(Context.Session["Usuario"]));
            int Id = 0;
            
            if (u.tipo.Equals("Administrador")) Id = -1;
            else Id = (int)u.id;

            if (u.permisosB.Contains("141")) Id = -1; //Legales
            Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
            return atConsultorio.Medicos_Por_Usurios_Filtrado(Id);
        }
        else return null;
    }
    


    [WebMethod(EnableSession = true)]
    public int At_Consultorio_Confirmar_Turnos(int TurnoId, int BonoId)
    {
        if (Session["Usuario"] != null)
        {
            long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;

            if (TurnoId > 0 && BonoId > 0)
            {
                Hospital.AtConsultorioBLL Confirmar = new Hospital.AtConsultorioBLL();
                Confirmar.At_Consultorio_Confirmar_Turnos((int)UsuarioId, BonoId, TurnoId);
                return 1;
            }
            else
            {
                throw new Exception("Falta Seleccionar Turno y/o Bono");
            }
        }
        else return -1; //Inicio de sesion
    }

    [WebMethod(EnableSession = true)]
    public int At_Consultorio_Confirmar_Turnos_Lista(List<int> TurnosId, int BonoId)
    {
        if (Session["Usuario"] != null)
        {
            TurnosId.ForEach(delegate(int TurnoId)
            {
                Hospital.AtConsultorioBLL Confirmar = new Hospital.AtConsultorioBLL();
                Confirmar.At_Consultorio_Confirmar_Turnos((int)((usuarios)(Context.Session["Usuario"])).id, BonoId, TurnoId);
            });
            return 1;
        }
        else throw new Exception("Inicie Sesión.");
    }

    [WebMethod(EnableSession=true)]
    public List<listapacientes> At_Consultorio_CargarTurnos(int MedicoId, int Especialidad, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            DateTime Fecha = Convert.ToDateTime(fecha);
            Hospital.AtConsultorioBLL atConsultorio = new Hospital.AtConsultorioBLL();
            return atConsultorio.At_Consultorio_ListaPacientes(MedicoId, Especialidad, Fecha);
        }
        else return null;
    }

    [WebMethod]
    public void At_Consultorio_Pasar_AEspera(string TurnoFecha, int Especialidad, int MedicoId)
    {
        Hospital.AtConsultorioBLL Espera = new Hospital.AtConsultorioBLL();
        DateTime _fecha;
        if (!DateTime.TryParse(TurnoFecha, out _fecha)) throw new Exception("Error en la fecha del turno.");
        Espera.At_Consultorio_Pasar_AEspera(_fecha, Especialidad, MedicoId);
    }

    //PARA MARCAR AUSENTISMO MASIVO
    [WebMethod]
    public void ATCONSULTORIOAUSENTEPACIENTEMASIVO(string TurnoFecha, int Especialidad, int MedicoId)
    {
        Hospital.AtConsultorioBLL Espera = new Hospital.AtConsultorioBLL();
        DateTime _fecha;
        if (!DateTime.TryParse(TurnoFecha, out _fecha)) throw new Exception("Error en la fecha del turno.");
        Espera.AT_CONSULTORIO_AUSENTE_PACIENTE_MASIVO(_fecha, Especialidad, MedicoId);
    }


    [WebMethod]
    public string VerificarAusentesConsultorio( int MedicoId)
    {
        Hospital.AtConsultorioBLL Espera = new Hospital.AtConsultorioBLL();
        return Espera.Verificar_Ausentes_Consultorio(MedicoId);
    }
    //PARA MARCAR AUSENTISMO MASIVO

    [WebMethod]
    public certificadosmedicosImpresion At_Consultorio_CertificadoUltimo(int MedicoId, long NHC)
    {
        Hospital.AtConsultorioBLL UltimoC = new Hospital.AtConsultorioBLL();
        return UltimoC.CertificadoMedico_NHC(NHC, MedicoId);
    }

    [WebMethod(EnableSession = true)]
    public int LlamarPaciente(string fecha, int MedicoId, int Especialidad, string Estado, long NHC, string Paciente, string ConsultorioId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Confirmar = new Hospital.AtConsultorioBLL();
            DateTime Fecha = DateTime.Now;
            Fecha = Convert.ToDateTime(fecha);
            string PSLL = Confirmar.Medico_Paciente_Sin_Finalizar(MedicoId, Especialidad, Fecha);
            if (PSLL != "" && Fecha != Convert.ToDateTime(PSLL))
            {
                throw new Exception("Falta Finalizar la atención del paciente del dia " + PSLL);
            }

            //IP
            ConsultorioId = ((usuarios)(Context.Session["Usuario"])).ip;

            Confirmar.Llamar_Paciente_Turnera(MedicoId, Especialidad, NHC, ConsultorioId);
            Confirmar.At_Consultorio_Historial_Guardar("Se llama al paciente " + Paciente, MedicoId, NHC, Especialidad);
            if (Estado != "Atendido")
            {
                int iEstado = 0;
                long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
                if (Estado == "Espera") { iEstado = 1; }
                if (Estado == "Llamado") { iEstado = 2; }
                if (Estado == "Solo Turno") { iEstado = 2; }
                if (Estado != "Atendido")
                {
                    Confirmar.LlamarPAciente(Fecha, MedicoId, Especialidad, iEstado, (int)UsuarioId);
                }
                return 1;
            }
            else
            {
                throw new Exception("No se puede llamar un paciente que ya ha finalizado de atender");
            }
        }
        else return -1; //Inicie sesion.
    }


    [WebMethod(EnableSession = true)]
    public void FinalizarAtPaciente(string fecha, int MedicoId, int Especialidad, string Estado, long NHC, string Paciente)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Finalizar = new Hospital.AtConsultorioBLL();

            DateTime Fecha = DateTime.Now;
            Fecha = Convert.ToDateTime(fecha);

            if (Estado != "Atendido")
            {
                int iEstado = 0;
                long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
                if (Estado == "Llamado")
                {
                    Finalizar.LlamarPAcienteFinalizar(Fecha, MedicoId, Especialidad, 2, (int)UsuarioId, NHC);
                    Finalizar.At_Consultorio_Historial_Guardar("Se termina la atención de " + Paciente, MedicoId, NHC, Especialidad);
                }
                else
                {
                    throw new Exception("No se puede finalizar la atención de un paciente que no se ha llamado");
                }

            }
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    public long GuardarOrdenesdeEstudio(List<ordenesdeestudiospracticas> objPracticas, long Protocolo, int MedicoID, int PatologiaID, long NHC, string FechaInicio, string DiagnosticoID, int servicioId)
    {
        Hospital.AtConsultorioBLL Guardar = new Hospital.AtConsultorioBLL();
        DateTime fi = Convert.ToDateTime(FechaInicio);
        DateTime fe = Convert.ToDateTime("01/01/1900");
        long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
 
        return Guardar.GuardarOrdenesdeEstudio(objPracticas, Protocolo, fe, MedicoID, PatologiaID, NHC, fi, DiagnosticoID,servicioId,UsuarioId);
    }

    [WebMethod(EnableSession = true)]
    public ordenesdeestudios CargarOrdenEstudioCab(long Protocolo)
    {
        Hospital.AtConsultorioBLL Cargar = new Hospital.AtConsultorioBLL();
        return Cargar.At_Consultorio_CargarPracticas_Cab(Protocolo);
    }

    [WebMethod(EnableSession = true)]
    public List<ordenesdeestudiospracticas> CargarOrdenEstudioDet(long Protocolo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Cargar = new Hospital.AtConsultorioBLL();
            return Cargar.At_Consultorio_CargarPracticas_Detalles(Protocolo);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public List<ordenesdeestudiosneonatologia> CargarNeonatologia(long Protocolo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Neo = new Hospital.AtConsultorioBLL();
            return Neo.At_Consultorio_Neonatologia_Cargar(Protocolo);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public List<ordenesdeestudiosbuscar> BuscarOrdesnesdeEstudios(string nhc, string Afiliado, string fechainicio, string fechafinal)
    {
        if (Session["Usuario"] != null)
        {
            long NHC;

            if (!long.TryParse(nhc, out NHC)) NHC = 0;

            if (fechainicio == "") { fechainicio = "01/01/1900"; }
            if (fechafinal == "") { fechafinal = "01/01/1900"; }
            DateTime FechaInicio = Convert.ToDateTime(fechainicio);
            DateTime FechaFinal = Convert.ToDateTime(fechafinal);

            Hospital.AtConsultorioBLL Buscar = new Hospital.AtConsultorioBLL();
            return Buscar.OrdenesdeEstudiosBuscar(NHC, Afiliado, FechaInicio, FechaFinal);
        }
        else return null;
    }

    [WebMethod]
    public List<ordenesdeestudiosbuscar> BuscarOrdesnesdeEstudios_AltaComplejidad(string nhc, string Afiliado, string fechainicio, string fechafinal)
    {

            if (fechainicio == "") { fechainicio = "01/01/1900"; }
            if (fechafinal == "") { fechafinal = "01/01/1900"; }
            DateTime FechaInicio = Convert.ToDateTime(fechainicio);
            DateTime FechaFinal = Convert.ToDateTime(fechafinal);

            Hospital.AtConsultorioBLL Buscar = new Hospital.AtConsultorioBLL();
            return Buscar.OrdenesdeEstudios_AltaComplejidad_Buscar(nhc, Afiliado, FechaInicio, FechaFinal);
    }

    [WebMethod(EnableSession = true)]
    public List<ordenesdeestudiosbuscar> BuscarSolicitudTraslado(string nhc, string fechainicio, string fechafinal, string Afiliado)
    {
        if (Session["Usuario"] != null)
        {
            long NHC = 0;
            if (!long.TryParse(nhc, out NHC)) NHC = 0;

            if (fechainicio == "") { fechainicio = "01/01/1900"; }
            if (fechafinal == "") { fechafinal = "01/01/1900"; }
            DateTime FechaInicio = Convert.ToDateTime(fechainicio);
            DateTime FechaFinal = Convert.ToDateTime(fechafinal);

            Hospital.AtConsultorioBLL Buscar = new Hospital.AtConsultorioBLL();
            return Buscar.OrdenesdeTrasladoBuscar(NHC, Afiliado, FechaInicio, FechaFinal);
        }
        else
        {
            return null;
        }
    }



    [WebMethod(EnableSession = true)]
    public int GuardarOrdenTraslado(long cargaID,long NHC, string Fecha_Atencion, int MedicoId, string Comun,
    string Utim, string Neonatal, string Diagnostico, string Observaciones, string Desde_Traslado, string Localidad_Traslado,
    string Calles_Traslado, string Hasta_Traslado, string Localidad_Traslado_Hasta, string Horario_Destino, string Con_Regreso,
    string De_Ambula, string Empresa, string Operador_Sol, string Fecha_Sol, string Hora_Sol, string Operador_Recep,
    string Fecha_Recep, string Hora_Recep, string Calles_Destino)
    {
        if (Session["Usuario"] != null)
        {
            bool conregreso = false;
            bool deambula = false;

            if (Con_Regreso == "Si") { conregreso = true; }
            if (De_Ambula == "Si") { deambula = true; }


            Fecha_Atencion = DateTime.Now.ToShortDateString();
            if (Fecha_Sol == "") { Fecha_Sol = "01/01/1900"; }
            if (Fecha_Recep == "") { Fecha_Recep = "01/01/1900"; }



            DateTime fechaatencion = Convert.ToDateTime(Fecha_Atencion);
            DateTime fechasol = Convert.ToDateTime(Fecha_Sol);
            DateTime fecharecep = Convert.ToDateTime(Fecha_Recep);

            Hospital.AtConsultorioBLL Guardar = new Hospital.AtConsultorioBLL();
            return Guardar.Guardar_Orden_Traslado(cargaID,NHC, fechaatencion, MedicoId, Comun, Utim, Neonatal, Diagnostico, Observaciones, Desde_Traslado, Localidad_Traslado, Calles_Traslado, Hasta_Traslado,
                Localidad_Traslado_Hasta, Horario_Destino, conregreso, deambula, Empresa, Operador_Sol, fechasol, Hora_Sol, Operador_Recep, fecharecep, Hora_Recep, Calles_Destino);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public ordentraslado CargarOrdenTraslado(long OT)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Cargar = new Hospital.AtConsultorioBLL();
            return Cargar.Cargar_Orden_Traslado(OT);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public List<monodrogas> MonoDrogas(int Numero)
    {
        Hospital.AtConsultorioBLL MonoD = new Hospital.AtConsultorioBLL();
        return MonoD.MonoDrogas(Numero);
    }

    [WebMethod(EnableSession = true)]
    public List<insumos_medidas> Lista_Medidas()
    {
        Hospital.AtConsultorioBLL Medidas = new Hospital.AtConsultorioBLL();
        return Medidas.Insumos_Medidas();
    }

    [WebMethod(EnableSession = true)]
    public List<insumos_presentacion> Lista_Presentacion()
    {
        Hospital.AtConsultorioBLL Medidas = new Hospital.AtConsultorioBLL();
        return Medidas.Insumos_Presentacion();
    }

    [WebMethod(EnableSession = true)]
    public long Guardar_Recetas(List<recetasmonodrogas> objMonoDrogas, long Protocolo, string FechaEntrega, int MedicoId, int ParologiaId, long NHC, string FechaInicio, string DiagnosticoID, int AutoizadoId, string PeriodoSolicitado, int EspecialidadId)
    {
        if (Session["Usuario"] != null)
        {
            DateTime fechaentrega, fechainicio;
            if (!DateTime.TryParse(FechaEntrega, out fechaentrega)) throw new Exception("Fecha de entrega incorrecta.");
            if (!DateTime.TryParse(FechaInicio, out fechainicio)) throw new Exception("Fecha de inicio incorrecta.");

            DateTime Hoy = DateTime.Now;
            DateTime Receta = Convert.ToDateTime(FechaEntrega);

            if (Receta > Hoy) throw new Exception("No se puede emitir una receta con fecha superior al día de hoy.");

            Hospital.AtConsultorioBLL Recetas = new Hospital.AtConsultorioBLL();
            return Recetas.Guardar_Recetas(objMonoDrogas, Protocolo, fechaentrega, MedicoId, ParologiaId, NHC, fechainicio, DiagnosticoID, AutoizadoId, PeriodoSolicitado, EspecialidadId, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<recetas_cab> CargarRecetaCAB(long Protocolo)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Recetas = new Hospital.AtConsultorioBLL();
            return Recetas.CargarRecetas_CAB(Protocolo);
        }
        else
        {
            return null;
        }
    }

    [WebMethod]
    public List<recetasmonodrogas> CargarRecetaDET(long Protocolo)
    {
        Hospital.AtConsultorioBLL Recetas = new Hospital.AtConsultorioBLL();
        return Recetas.CargarRecetas_DET(Protocolo);
    }

    [WebMethod(EnableSession = true)]
    public long UltimaReceta(long NHC)
    {
        Hospital.AtConsultorioBLL Recetas = new Hospital.AtConsultorioBLL();
        return Recetas.UltimaReceta(NHC);
    }

    [WebMethod(EnableSession = true)]
    public int Recetas_Eliminar(long Protocolo, bool Verificar)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Recetas = new Hospital.AtConsultorioBLL();
            return Recetas.Recetas_Eliminar(Protocolo, ((usuarios)Session["Usuario"]).id, Verificar);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<recetas_busqueda> BuscarReceta(string Ingresodesde, string Ingresohata, string Egresodesde, string Egresohasta, string NHC, string paciente)
    {
        if (Session["Usuario"] != null)
        {
            long nhc;
            if (!long.TryParse(NHC, out nhc)) nhc = 0;

            DateTime ingresodesde = Convert.ToDateTime("01/01/0001"); DateTime.TryParse(Ingresodesde, out ingresodesde);
            DateTime ingresohata = Convert.ToDateTime("01/01/0001"); DateTime.TryParse(Ingresohata, out ingresohata);
            DateTime egresodesde = Convert.ToDateTime("01/01/0001"); DateTime.TryParse(Egresodesde, out egresodesde);
            DateTime egresohasta = Convert.ToDateTime("01/01/0001"); DateTime.TryParse(Egresohasta, out egresohasta);

            Hospital.AtConsultorioBLL Recetas = new Hospital.AtConsultorioBLL();
            return Recetas.BuscarRecetas(ingresodesde, ingresohata, egresodesde, egresohasta, nhc, paciente);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long GuardarConsultaDiabetes(
        long Protocolo, int Tipo, bool Obesidad, bool Dislipidemia, bool HC, string otros, int Retinopatia, int Neuropatia,
    int ivp, int CI, int Nefropatia, int Pie, int hta, int tabaco, long NHC, int Medico_Diabetes_Id,
    string MotivoModificacion, string HbgA1C, string HDL, string TG, string FRUCTOSAMINA, string URICEMIA, string CLEARENCEC, string UREA, string TGO, string BT,
    string BD, string COLTOTAL, string LDL, string MICROALBUMINURIA, string CREA, string GLUCEMIA, string PROTEINURIA, string CPK, string TGP, string BI, string OJO_D,
    string OJO_I, string OTROS_LABORATORIO, string fechaanalisis, string EVOLUCION, string Peso, string Talla, string Metformina, string Glibenciamida, string Glicazida,
    string Glimepirida, string Glipizida, string Rosiglitazona, string Atorvastatina, string Sinvastantina, string Ezetimibe, string Fenofibrato, string NPH, string Rapida,
    string RapidaAnalogo, string Lispro, string Ultralenta, string Mix25, string Mix30, string OTROS_MEDICAMENTOS
        )
    {
        if (Session["Usuario"] != null)
        {

            if (Protocolo != 0 && MotivoModificacion.Trim().Length <= 0) { throw new Exception("Falta el motivo de la modificación"); }

            DateTime FECHA_ANALISIS = Convert.ToDateTime("01/01/0001"); DateTime.TryParse(fechaanalisis, out FECHA_ANALISIS);

            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.Guarcar_Diabetes(Protocolo, Tipo, Obesidad, Dislipidemia, HC, otros, Retinopatia, Neuropatia,
         ivp, CI, Nefropatia, Pie, hta, tabaco, NHC, Medico_Diabetes_Id, MotivoModificacion, HbgA1C, HDL, TG, FRUCTOSAMINA, URICEMIA, CLEARENCEC, UREA, TGO, BT,
         BD, COLTOTAL, LDL, MICROALBUMINURIA, CREA, GLUCEMIA, PROTEINURIA, CPK, TGP, BI, OJO_D,
         OJO_I, OTROS_LABORATORIO, FECHA_ANALISIS, EVOLUCION, Peso, Talla, Metformina, Glibenciamida, Glicazida,
         Glimepirida, Glipizida, Rosiglitazona, Atorvastatina, Sinvastantina, Ezetimibe, Fenofibrato, NPH, Rapida,
         RapidaAnalogo, Lispro, Ultralenta, Mix25, Mix30, OTROS_MEDICAMENTOS);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }


    [WebMethod(EnableSession = true)]
    public cargar_diabetes CargarDiabetes(long Protocolo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.CargarDiabetes(Protocolo);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public carga_general CargarAtencionGeneral(long Protocolo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL CargarG = new Hospital.AtConsultorioBLL();
            return CargarG.Cargar_At_P_General(Protocolo);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }

    [WebMethod(EnableSession = true)]
    public long Ultimo_Protocolo_by_NHC_Medico(long NHC, int EspecialidadId, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL CargarG = new Hospital.AtConsultorioBLL();
            return CargarG.Ultimo_Protocolo_by_NHC_Medico(NHC, EspecialidadId, MedicoId);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }

    [WebMethod(EnableSession = true)]
    public long Guardar_AtencionGeneral(long Protocolo, string ICD10_Det_Id, string Observaciones, int Especialidad_Id, long NHC, string MotivoModificacion, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            if (Protocolo != 0 && MotivoModificacion.Trim().Length <= 0) { throw new Exception("Falta el motivo de la modificación"); }
            Hospital.AtConsultorioBLL CargarG = new Hospital.AtConsultorioBLL();
            return CargarG.Guardar_P_General(Protocolo, null, ICD10_Det_Id, Observaciones, Especialidad_Id, NHC, MotivoModificacion, MedicoId);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }

    [WebMethod(EnableSession = true)]
    public void ConfirmaAtencionCentral(long MedicoId, long EspecialidadId, long NHC, string FechaTurno)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL CargarG = new Hospital.AtConsultorioBLL();
            CargarG.ConfirmaAtencionCentral(MedicoId, EspecialidadId, NHC, FechaTurno);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long Guardar_Neonatologia(long Protocolo, long NHC, string fnac, string peso, string talla, string percef, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Neo = new Hospital.AtConsultorioBLL();
            return Neo.Guardar_Neonatologia(Protocolo, NHC, fnac, peso, talla, percef, MedicoId);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }



    [WebMethod(EnableSession = true)]
    public especialidades EspecialidadID(long Id)
    {
        Hospital.EspecialidadesBLL ESP = new Hospital.EspecialidadesBLL();
        return ESP.Especialidades_Id(Id);
    }

    [WebMethod(EnableSession = true)]
    public List<servicios_hospitalario> CargarServicios()
    {
        Hospital.AtConsultorioBLL Servicios = new Hospital.AtConsultorioBLL();
        return Servicios.CargarServicios();
    }

    [WebMethod(EnableSession = true)]
    public orden_internacion CargarOrdenInternacion(long Protocolo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL OrdenInternacion = new Hospital.AtConsultorioBLL();
            return OrdenInternacion.CargarOrdenInternacion(Protocolo);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public long UOI(long NHC)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL UOI = new Hospital.AtConsultorioBLL();
            return UOI.UltimaOrdenInternacion(NHC);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long GuardarOrdenInternacion(long NHC, int ID_SERV, string DIAGNOSTICO, int AREA, string fechainternacion, string PISO, string CAMA, string INDICACIONES, int MEDICOID, long ordenId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL OrdenInternacion = new Hospital.AtConsultorioBLL();
            DateTime FECHA_INTERNACION = DateTime.Now;
            DateTime.TryParse(fechainternacion, out FECHA_INTERNACION);
            return OrdenInternacion.Guardar_Orden_Internacion(NHC, ID_SERV, DIAGNOSTICO, AREA, FECHA_INTERNACION, PISO, CAMA, INDICACIONES, MEDICOID, ordenId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    ///77777777MANUEL777777777777777777777777777777777777777777777777777777777777777777777777777MANUEL77777777777777777777777777777777777777777777777777777777777777777777
    [WebMethod(EnableSession = true)]
    public long AtencionDiabetesGuardar(int Protocolo, int NHC, int MedicoId,
        string Tipo, string Antiguedad, string Antecedentes, string Peso, string IMC, string CC, int hipoglucemias, string Grado, string Fecuencia, int Retinopatia, int Nefropatia,
        int Neuropatia, int Macrovascular, string MetforminaDosis, string MetforminaMgxdia, string MetforminaAntiguedad, string GlibenclamidaDosis, string GlibenclamidaMgxdia,
        string GlibenclamidaAntiguedad, string GlicazidaDosis, string GlicazidaMgxdia, string GlicazidaAntiguedad, string InsulinaNPHDosis, string InsulinaNPHMgxdia, string InsulinaNPHAntiguedad,
        string InsulinaCORRIENTEDosis, string InsulinaCORRIENTEMgxdia, string InsulinaCORRIENTEAntiguedad, string otraNom, string otraDosis, string otraMgxdia, string otraAntiguedad,
        string HBA1CUltimo, string HBA1CUltimoFecha, string HBA1CAnterior, string HBA1CAnteriorFecha, string GlucemiaAyunoUltimo, string GlucemiaAyunoUltimoFecha, string GlucemiaAyunoAnterior,
        string GlucemiaAyunoAnteriorFecha, string FondoOjo, string FuncionRenal, string Creatinina, string Urea, string CdeCreatinina, string Microalbuminuria, string Pies, string Asiste_Taller, string Taller_Fecha,
        string Altura, int HTA, int EnfermedadCoronaria, int Tabaquismo, int Obesidad, int Dislipidemia, int Acv, string GlimeripideDosis, string GlimeripideMgxdia, string GlimeripideAntiguedad,
        string SitagliptinaDosis, string SitagliptinaMgxdia, string SitagliptinaAntiguedad, string VildagliptinaDosis, string VildagliptinaMgxdia, string VildagliptinaAntiguedad, string SaxaGliptinaDosis,
        string SaxaGliptinaMgxdia, string SaxaGliptinaAntiguedad, string LinagliptinaDosis, string LinagliptinaMgxdia, string LinagliptinaAntiguedad, string InsulinaAsparticaDosis, string InsulinaAsparticaMgxdia,
        string InsulinaAsparticaAntiguedad, string InsulinaLisproDpsis, string InsulinaLisproMgxdia, string InsulinaLisproAntiguedad, string InsulinaGlucolisinaDosis, string InsulinaGlucolisinaMgxdia, string InsulinaGlucolisinaAntiguedad,
        string InsulinaAsparticaBifàsicaDosis, string InsulinaAsparticaBifàsicaMgxdia, string InsulinaAsparticaBifàsicaAntiguedad, string InsulinaLispro7525Dosis, string InsulinaLispro7525mgxdia, string InsulinaLispro7525Antiguedad,
        string InsulinaLispro5050Dosis, string InsulinaLispro5050Mgxdia, string InsulinaLispro5050Antiguedad, string InsulinaGlarginaDosis, string InsulinaGlarginaMgxdia, string InsulinaGlarginaAntiguedad,
        string InsulinaDetermirDosis, string InsulinaDetermirMgxdia, string InsulinaDetermirAntiguedad, string InsulinaDegludecDosis, string InsulinaDegludecMgxdia, string InsulinaDegludecAntiguedad,
        string TirasReactivaDosis, string TirasReactivaMgxdia, string TirasReactivaAntiguedad, string OtroTipo2, string OtroTipoDosis2, string OtroTipoMgxdía2, string OtroTipoAntiguedad2,
        string OtroTipo3, string OtroTipoDosis3, string OtroTipoMgxdía3, string OtroTipoAntiguedad3, string OtroTipo4, string OtroTipoDosis4,
        string OtroTipoMgxdía4, string OtroTipoAntiguedad4, string OtroTipo5, string OtroTipoDosis5, string OtroTipoMgxdía5, string OtroTipoAntiguedad5, string documentoReal, string fechaFondoOjo,
        string MetforminaP, string GlimeripideP, string GlicazidaP, string GlibenclamidaP, string SitagliptinaP, string VildagliptinaP, string SaxaGliptinaP, string LinagliptinaP, string InsulinaCorrienteP,
        string InsulinaAsparticaP, string InsulinaLisproP, string InsulinaGlucolisinaP, string InsulinaNPHDosisP, string InsulinaAsparticaBifàsicaP, string InsulinaLispro7525P, string InsulinaLispro5050P,
        string InsulinaGlarginaP, string InsulinaDetermirP, string InsulinaDegludecP, string TirasReactivaP, string OtroTipoP, string OtroTipo2P, string OtroTipo3P, string OtroTipo4P, string OtroTipo5P
        )
    {

        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            usuarios U = (usuarios)Session["Usuario"];
            MedicoId = (int)U.id;



            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.Atencion_Diabetes_Guardar(Protocolo, NHC, MedicoId, Tipo, Antiguedad, Antecedentes, Peso, IMC, CC, hipoglucemias, Grado, Fecuencia, Retinopatia, Nefropatia,
          Neuropatia, Macrovascular, MetforminaDosis, MetforminaMgxdia, MetforminaAntiguedad, GlibenclamidaDosis, GlibenclamidaMgxdia,
          GlibenclamidaAntiguedad, GlicazidaDosis, GlicazidaMgxdia, GlicazidaAntiguedad, InsulinaNPHDosis, InsulinaNPHMgxdia, InsulinaNPHAntiguedad,
          InsulinaCORRIENTEDosis, InsulinaCORRIENTEMgxdia, InsulinaCORRIENTEAntiguedad, otraNom, otraDosis, otraMgxdia, otraAntiguedad,
          HBA1CUltimo, HBA1CUltimoFecha, HBA1CAnterior, HBA1CAnteriorFecha, GlucemiaAyunoUltimo, GlucemiaAyunoUltimoFecha, GlucemiaAyunoAnterior,
          GlucemiaAyunoAnteriorFecha, FondoOjo, FuncionRenal, Creatinina, Urea, CdeCreatinina, Microalbuminuria, Pies, Asiste_Taller, Taller_Fecha, Altura, HTA, EnfermedadCoronaria, Tabaquismo, Obesidad, Dislipidemia, Acv, GlimeripideDosis, GlimeripideMgxdia, GlimeripideAntiguedad,
         SitagliptinaDosis, SitagliptinaMgxdia, SitagliptinaAntiguedad, VildagliptinaDosis, VildagliptinaMgxdia, VildagliptinaAntiguedad, SaxaGliptinaDosis,
         SaxaGliptinaMgxdia, SaxaGliptinaAntiguedad, LinagliptinaDosis, LinagliptinaMgxdia, LinagliptinaAntiguedad, InsulinaAsparticaDosis, InsulinaAsparticaMgxdia,
         InsulinaAsparticaAntiguedad, InsulinaLisproDpsis, InsulinaLisproMgxdia, InsulinaLisproAntiguedad, InsulinaGlucolisinaDosis, InsulinaGlucolisinaMgxdia, InsulinaGlucolisinaAntiguedad,
         InsulinaAsparticaBifàsicaDosis, InsulinaAsparticaBifàsicaMgxdia, InsulinaAsparticaBifàsicaAntiguedad, InsulinaLispro7525Dosis, InsulinaLispro7525mgxdia, InsulinaLispro7525Antiguedad,
         InsulinaLispro5050Dosis, InsulinaLispro5050Mgxdia, InsulinaLispro5050Antiguedad, InsulinaGlarginaDosis, InsulinaGlarginaMgxdia, InsulinaGlarginaAntiguedad,
         InsulinaDetermirDosis, InsulinaDetermirMgxdia, InsulinaDetermirAntiguedad, InsulinaDegludecDosis, InsulinaDegludecMgxdia, InsulinaDegludecAntiguedad,
         TirasReactivaDosis, TirasReactivaMgxdia, TirasReactivaAntiguedad, OtroTipo2, OtroTipoDosis2, OtroTipoMgxdía2, OtroTipoAntiguedad2,
         OtroTipo3, OtroTipoDosis3, OtroTipoMgxdía3, OtroTipoAntiguedad3, OtroTipo4, OtroTipoDosis4,
         OtroTipoMgxdía4, OtroTipoAntiguedad4, OtroTipo5, OtroTipoDosis5, OtroTipoMgxdía5, OtroTipoAntiguedad5, documentoReal, fechaFondoOjo,
         MetforminaP, GlimeripideP, GlicazidaP, GlibenclamidaP, SitagliptinaP, VildagliptinaP, SaxaGliptinaP, LinagliptinaP, InsulinaCorrienteP,
         InsulinaAsparticaP, InsulinaLisproP, InsulinaGlucolisinaP, InsulinaNPHDosisP, InsulinaAsparticaBifàsicaP, InsulinaLispro7525P, InsulinaLispro5050P,
         InsulinaGlarginaP, InsulinaDetermirP, InsulinaDegludecP, TirasReactivaP, OtroTipoP, OtroTipo2P, OtroTipo3P, OtroTipo4P, OtroTipo5P);

        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }

    [WebMethod(EnableSession = true)]
    public List<Consulta_Diabetes> DiabetesCargarConsultas(long NHC)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {

            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.Diabetes_Cargar_Consultas(NHC);
        }
        else
        {
            throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");
        }

    }

    [WebMethod(EnableSession = true)]
    public Consulta_Diabetes DiabetesCargarUnaConsulta(int id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.Diabetes_Cargar_Una_Consulta(id);
        }
        else
        {

            throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");
        }


    }


    [WebMethod(EnableSession = true)]
    public long DiabetesEliminarUnaConsulta(int id)
    {

        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.Diabetes_Eliminar_Una_Consulta(id);
        }
        else
        {

            throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");
        }


    }

    [WebMethod(EnableSession = true)]
    public List<Consulta_Diabetes> ExistePaciente(string Nombre, string DNI, string Tdni, string NHC)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            long _dni;
            // long _nhc;
            List<Consulta_Diabetes> l = new List<Consulta_Diabetes>();
            if (!long.TryParse(DNI, out _dni)) _dni = 0;
            // if (!long.TryParse(NHC, out _nhc)) _nhc = 0;
            l = Diabetes.Existe_Paciente(Nombre, _dni, Tdni, NHC);
            return l;
        }
        else
        {

            throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");
        }

    }

    [WebMethod(EnableSession = true)]
    public List<ResultadosLaboDiabetes> CargarEstudioLabo(string Id_Paciente, string Id_Practica, string subCod)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            List<ResultadosLaboDiabetes> L = new List<ResultadosLaboDiabetes>();

            L = Diabetes.Cargar_Estudio_Labo(Id_Paciente, Id_Practica, subCod);

            return L;
        }
        else { throw new Exception("Ha ocurrido un Error"); }

    }

    [WebMethod(EnableSession = true)]
    public pacientes ComprobarSemaforo(long documento)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            pacientes pa = new pacientes();

            pa = Diabetes.Comprobar_Semaforo(documento);

            return pa;
        }
        else { throw new Exception("Ha Perdido Sesión Vuelva a Loguearse"); }
    }

    [WebMethod(EnableSession = true)]
    public int DiabetesFechasConsultas(string fecha)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();

            return Diabetes.Diabetes_Fechas_Consultas(fecha);
        }
        else { throw new Exception(); }
    }


    [WebMethod(EnableSession = true)]
    public List<Consulta_Diabetes> ListarPacientesSemaforo()
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            //long _nhc;
            List<Consulta_Diabetes> l = new List<Consulta_Diabetes>();
            //if (!long.TryParse(NHC, out _nhc)) _nhc = 0;
            l = Diabetes.Listar_Pacientes_Semaforo();
            return l;
        }
        else
        {

            throw new Exception("Ha Perdido Sesión Vuelva a Loguearse");
        }

    }

    [WebMethod(EnableSession = true)]
    public List<pacientes> ListarDiabeticos(string tipo, string filtro)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            List<pacientes> L = new List<pacientes>();
            //L = Diabetes.Listar_Diabeticos(tipo, filtro);
            return L;
        }
        else
        { throw new Exception("Ha Perdido Sesión Vuelva a Loguearse"); }
    }

    //7777777777777777777777777777777777777777777777777RECETAS DIABETICAS77777777777777777777777
    //[WebMethod(EnableSession = true)]
    //public List<RecetasDiabeticas> CargarRecetasPaciente(long idPaciente)
    //{
    //    Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
    //    if(Session["Usuario"] != null)
    //   {
    //      List<RecetasDiabeticas> L = new List<RecetasDiabeticas>();
    //      Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();

    //      L = Diabetes.Cargar_Recetas_Paciente(idPaciente);
    //      return L;
    //   }
    //else{throw new Exception("Ha ocurrido un Error");}

    //}

    [WebMethod(EnableSession = true)]
    public List<RecetasDiabeticas> TraerRecetasDiabeticas(long idPaciente)
    {

        if (Session["Usuario"] != null)
        {
            List<RecetasDiabeticas> L = new List<RecetasDiabeticas>();
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            L = Diabetes.Traer_Recetas_Diabeticas(idPaciente);

            return L;
        }


        else { throw new Exception("Ha Perdido Sesión Vuelva a Loguearse"); }

    }


    [WebMethod(EnableSession = true)]
    public List<Farmaco> cargarCombos()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            List<Farmaco> L = new List<Farmaco>();

            L = Diabetes.cargar_Combos();
            return L;
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long AtencionDiabetesGuardarFarmacosRecetaEncavezado(long idReceta, long idPaciente, long idUsuario, string medico, int vigencia, string observaciones)
    {
        if (Session["Usuario"] != null)
        {
            //if (farmacos.Count != 0)
            //{
            usuarios obj = (usuarios)Session["Usuario"];
            idUsuario = (int)obj.id;
            medico = obj.nombre;
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.Atencion_Diabetes_Guardar_Farmacos_Receta_Encavezado(idReceta, idPaciente, idUsuario, medico, vigencia, observaciones);
            //}
            //else
            //{ return 0; }
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    


    [WebMethod(EnableSession = true)]
    public long AtencionDiabetesGuardarFarmacosRecetaDetalle(long idReceta, List<Farmaco> farmacos)
    {
        if (Session["Usuario"] != null)
        {
            //usuarios obj = (usuarios)Session["Usuario"];
            //idUsuario = (int)obj.id;
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();

            return Diabetes.Atencion_Diabetes_Guardar_Farmacos_Receta_Detalle(idReceta, farmacos);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

    }

    [WebMethod(EnableSession = true)]
    public List<RecetasDiabeticas> CargarRecetasDiabeticas(long idPaciente)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            List<RecetasDiabeticas> L = new List<RecetasDiabeticas>();
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL(); ;

            L = Diabetes.Cargar_Recetas_Diabeticas(idPaciente);
            return L;
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

    }


    [WebMethod(EnableSession = true)]
    public RecetasDiabeticas cargarUnaReceta(long idReceta)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Diabetes = new Hospital.AtConsultorioBLL();
            return Diabetes.cargar_Una_Receta(idReceta);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

    }
    [WebMethod(EnableSession = true)]
    public object traerMedico()
    {

        usuarios obj = (usuarios)Session["Usuario"];

        return obj;
    }

    [WebMethod(EnableSession = true)]
    public List<Menus> cargarComboMenus()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.cargar_Combo_Menus();
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

    }

    [WebMethod(EnableSession = true)]
    public int Diabetologia_DiasDesdeUltimaAtencion(long NHC){
            
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL AT = new Hospital.AtConsultorioBLL();
            return AT.Diabetologia_DiasDesdeUltimaAtencion(NHC);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
        
    }


    //=========== CIRUGIA =========

    [WebMethod(EnableSession = true)]
    public bool Guardar_Atencion_Cirugia_Guardar(AtConsultorioCirugia_Cirujano Objeto)
    {
        if (Session["Usuario"] != null)
        {            
            usuarios obj = (usuarios)Session["Usuario"];
            Objeto.UsuarioId = (int)obj.id;            
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.Guardar_Atencion_Cirugia_Guardar(Objeto);         
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool AtConsultorioCirugiaProgramadaGuardarVaucher(Cirugia_Vaucher Objeto)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorio_Cirugia_Programada_Guardar_Vaucher(Objeto);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public Cirugia_Vaucher AtConsultorioCirugiaProgramadaImprimirVaucher(long CirugiaProgramadaID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorio_Cirugia_Programada_Imprimir_Vaucher(CirugiaProgramadaID);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public bool AtConsultorioCirugiaProgramadaReestablecerTurno(long AfiliadoId, string observacion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorio_Cirugia_Programada_Reestablecer_Turno(AfiliadoId,observacion);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<Cirugia_Tipo> QuirofanoCirugiaTipoListaRow(int? id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.Quirofano_Cirugia_Tipo_Lista(id);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public AtConsultorioCirugia_Cirujano AtConsultorioCirugiaCargar(long PacienteId) 
    {
        if (Session["Usuario"] != null)
        {   
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorioCirugiaCargar(PacienteId);         
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool Guardar_Atencion_Cirugia_MedicoExterno_Guardar(AtConsultorioCirugia_CirujanoExterno Medico) {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.Guardar_Atencion_Cirugia_MedicoExterno_Guardar(Medico);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<AtConsultorioCirugia_CirujanoExterno> Guardar_Atencion_Cirugia_MedicoExterno_Listar(int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.Guardar_Atencion_Cirugia_MedicoExterno_Listar(MedicoId);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public List<AtConsultorioCirugia_Etapa> AtConsultorio_Cirugia_Programada_UltimaEtapa_x_Paciente_Listar(long PacienteId, string FDesde, string FHasta, string Paciente, string NHC, long Documento, bool Anulado, bool Finalizado, int Etapa)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            if (FDesde == "") { FDesde = "01/01/2018"; }
            if (FHasta == "") { FHasta = "01/01/2050"; }
            return Consultorio.AtConsultorio_Cirugia_Programada_UltimaEtapa_x_Paciente_Listar(PacienteId, FDesde, FHasta, Paciente, NHC, Documento, Anulado, Convert.ToInt32(Finalizado), Etapa);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public bool AtConsultorio_Cirugia_Programada_GuardarProximaEtapa(long CirugiaProgramadaID, int Resultado, string Comentario)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            usuarios obj = (usuarios)Session["Usuario"];
            int UsuarioId = (int)obj.id;

            return Consultorio.AtConsultorio_Cirugia_Programada_GuardarProximaEtapa(CirugiaProgramadaID, UsuarioId, Resultado, Comentario);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }
    
    [WebMethod(EnableSession = true)]
    public bool AtConsultorioCirugiaProgramadaGuardarFechaAviso(long CirugiaProgramadaID, string fecha, int tipo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorio_Cirugia_Programada_Guardar_Fecha_Aviso(CirugiaProgramadaID, fecha, tipo);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }



    [WebMethod(EnableSession = true)]
    public AtConsultorioCirugia_EtapaInfo AtConsultorio_Cirugia_Programada_ProximaEtapa(long CirugiaProgramadaID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorio_Cirugia_Programada_ProximaEtapa(CirugiaProgramadaID);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public AtConsultorioCirugia_EtapaInfo AtConsultorio_Cirugia_Programada_EtapaActual(long CirugiaProgramadaID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorio_Cirugia_Programada_EtapaActual(CirugiaProgramadaID);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public bool AtConsultorio_Cirugia_Programada_Anular(long CirugiaProgramadaID)
    {
        if (Session["Usuario"] != null)
        {
            usuarios obj = (usuarios)Session["Usuario"];
            int UsuarioId = (int)obj.id;
            Hospital.AtConsultorioBLL Consultorio = new Hospital.AtConsultorioBLL();
            return Consultorio.AtConsultorio_Cirugia_Programada_Anular(CirugiaProgramadaID, UsuarioId);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    //=========== CIRUGIA =========



    //==========================NUTRICION ==========================================================================================================
    [WebMethod(EnableSession = true)]
    public encabezadoNutricion cargarEncabezado(long idInternacion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            encabezadoNutricion P = new encabezadoNutricion();
            P = Menus.cargar_Encabezado(idInternacion);
            usuarios obj = (usuarios)Session["Usuario"];

            P.medico = obj.nombre;

            return P;
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<indicacionesNutricion> cargarIndicaciones(long idInternacion, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();

            return Menus.cargar_Indicaciones(idInternacion, fecha);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public long guardarNutricion(long idNutricion, long idInternacion, long documento, string codAlmuerzo, string codCena, string fecha, int idAlmuerzo, int idCena)
    //, int AIdalmuerzo, string Aalmuerzo, int AIdcena, string Acena)
    //string descAlmuerzo,string descCena,
    {
        if (Session["Usuario"] != null)
        {
            usuarios obj = (usuarios)Session["Usuario"];
            int usuario = (int)obj.id;

            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.guardar_Nutricion1(idNutricion, idInternacion, documento, codAlmuerzo, codCena, usuario, fecha, idAlmuerzo, idCena);
            //,AIdalmuerzo,Aalmuerzo,AIdcena,Acena);
            //descAlmuerzo,descCena, 
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public List<Menus> cargarMenus(long idInternacion, string fecha, string tipo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.cargar_Menus(idInternacion, fecha, tipo);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long GuardarPedidoEncabezado(long idPedido, string fecha)
    {
        usuarios obj = (usuarios)Session["Usuario"];
        int idUsuario = (int)obj.id;

        if (Session["Usuario"] != null)
        {
            DateTime F = new DateTime();
            F = Convert.ToDateTime(fecha);
            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.Guardar_Pedido_Encabezado(idPedido, idUsuario, F);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

    }

    [WebMethod(EnableSession = true)]
    public long GuardarPedidoDetalle(List<pedidoNutricion> pedidos, long idPedido)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.Guardar_Pedido_Detalle(pedidos, idPedido);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public List<pedidoNutricion> traerPedido(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.traer_Pedido(fecha);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public List<pedidoNutricion> traerPedidosInternados(string fecha, int imprime)
    {
        if (Session["Usuario"] != null)
        {
            DateTime f = new DateTime();
            f = Convert.ToDateTime(fecha);

            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.traer_Pedidos_Internados(f, imprime);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<pedidoNutricion> traerTotalesPedidos(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            DateTime f = new DateTime();
            f = Convert.ToDateTime(fecha);

            Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
            return Menus.traer_Totales_Pedidos(f);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<PresentacionesDiabetes> traerPresentacionesDiabetes(string seCorresponde)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL diabetes = new Hospital.AtConsultorioBLL();
            return diabetes.traer_Presentaciones_Diabetes(seCorresponde);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<long> traerIdsInternacion(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL nutricion = new Hospital.InternacionesBLL();
            return nutricion.traer_Ids_Internacion(fecha);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<pedidoNutricion> listsarPacientesComidas(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL nutricion = new Hospital.InternacionesBLL();
            return nutricion.listsar_Pacientes_Comidas(fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long InternacionNutrcionEliminarAcompañante(long idInternacion, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL nutricion = new Hospital.InternacionesBLL();
            return nutricion.Internacion_Nutrcion_Eliminar_Acompañante(idInternacion, fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public long InternacionNutricionGuardarAcompañante(long idInternacion, string fecha, int idalmuerzo, string codAlmuerzo, int idCena, string codCena)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL nutricion = new Hospital.InternacionesBLL();
            return nutricion.Internacion_Nutricion_Guardar_Acompañante(idInternacion, fecha, idalmuerzo, codAlmuerzo, idCena, codCena);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public nutricionAcompañante InternacionNutricionTraerAcompañanteComida(string fecha, long idIntenacion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL nutricion = new Hospital.InternacionesBLL();
            return nutricion.Internacion_Nutricion_Traer_Acompañante_Comida(fecha, idIntenacion);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    //==========================NUTRICION ==========================================================================================================

    [WebMethod(EnableSession = true)]
    public int VerificarFaltaPatologiaCronica(long afiliadoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionesBLL cronico = new Hospital.InternacionesBLL();
            return cronico.VerificarFaltaPatologiaCronica(afiliadoId);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }
}



