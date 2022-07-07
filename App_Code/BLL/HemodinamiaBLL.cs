using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for HemodinamiaBLL
/// </summary>
public class HemodinamiaBLL
{
    public HemodinamiaBLL()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public List<hemodinamia> Hemodinamia_CirugiaList(int? Id, string Fecha, bool Baja)
    {
        List<hemodinamia> lista = new List<hemodinamia>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Turnos_ListadoTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Turnos_ListadoTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Turnos_ListadoDataTable aTable = adapter.GetData(Id, Baja, Fecha);
        foreach (HemodinamiaDAL.H2_Hemodinamia_Turnos_ListadoRow row in aTable.Rows)
        {
            lista.Add(CrearDesdeRowHemoTurno(row));
        }
        return lista;
    }

    private hemodinamia CrearDesdeRowHemoTurno(HemodinamiaDAL.H2_Hemodinamia_Turnos_ListadoRow row)
    {
        hemodinamia q = new hemodinamia();
        q.id = row.id;
        q.nhc = row.nhc;

        if (!row.IsfechaNull())
        {
            q.fecha = row.fecha.ToShortDateString();
            //q.fecha = row.fecha.ToString("dd/MM/yyyy");
        }

        if (!row.IshoraNull())
            q.hora = row.hora;
        else
            q.hora = "A/C";

        if (!row.IsOtros_InsumosNull())
            q.OtrosInsumos = row.Otros_Insumos;
        else q.OtrosInsumos = "";

        if (!row.IsdiagnosticoidNull())
            q.diagnostico_id = row.diagnosticoid;

        if (!row.IsurgenciaNull())
            q.urgencia = row.urgencia;
        else
            q.urgencia = false;

        if (!row.IssalaidNull())
            q.sala_id = row.salaid;

        if (!row.IscamaidNull())
            q.cama_id = row.camaid;

        if (!row.IscirugiaidNull())
            q.cirugia_tipo_id = row.cirugiaid;

        if (!row.Iscirujano_especialidad_idNull())
            q.cirujano_especialidad_id = row.cirujano_especialidad_id;

        if (!row.Iscirujano_idNull())
            q.cirujano_id = row.cirujano_id;

        if (!row.Isayudante_idNull())
            q.ayudante_id = row.ayudante_id;

        if (!row.Isanestesista_idNull())
            q.anestesista_id = row.anestesista_id;

        if (!row.Isanestesia_tipoNull())
            q.anestesia_tipo_id = row.anestesia_tipo;

        if (!row.IshemoNull())
            q.hemo = row.hemo;

        if (!row.Iscbo_hemoNull())
            q.cbo_hemo = row.cbo_hemo;

        if (!row.Iscbo_anpaNull())
            q.cbo_anpa = row.cbo_anpa;

        if (!row.Iscbo_monitoreoNull())
            q.cbo_monitoreo = row.cbo_monitoreo;

        if (!row.Ismed_solicitante_idNull())
            q.medico_solicitante = row.med_solicitante_id;

        if (!row.IsobservacionesNull())
            q.observaciones = row.observaciones;

        if (!row.Ismotivo_susp_idNull())
            q.motivo_susp_id = row.motivo_susp_id;

        if (!row.IsbajaNull())
            q.baja = row.baja;

        if (!row.Isquienlodeiodebaja_idNull())
            q.quien_dio_baja_id = row.quienlodeiodebaja_id;

        if (!row.Isayudante2Null())
            q.ayudante2_id = row.ayudante2;

        if (!row.Isayudante3Null())
            q.ayudante3_id = row.ayudante3;

        if (!row.IshorafinNull())
            q.hora_fin = row.horafin.ToString();

        if (!row.IsefectuadaNull())
            if (row.efectuada)
                q.efectuada = true;
            else
                q.efectuada = false;
        else
            q.efectuada = false;
        if (!row.Iscirculante_idNull())
            q.Circulante_id = row.circulante_id;
        if (!row.Ismonitoreo_idNull())
            q.Monitoreo_id = row.monitoreo_id;
        if (!row.Isusuario_id_modifNull())
            q.usuario_id_modificacion = row.usuario_id_modif;
        if (!row.Ismotivo_modificacionNull())
            q.motivo_modificacion = row.motivo_modificacion;

        if (!row.Isinstrumentalista_idNull())
            q.Instrumentalista_Id = row.instrumentalista_id;
        if (!row.Iscbo_rayosNull())
            q.cbo_rayos = row.cbo_rayos;
        if (!row.IsusuarioNull())
            q.usuario_modificacion = row.usuario;

        if (!row.Isexterno_medico_matriculaNull()) q.externo_medico_matricula = row.externo_medico_matricula;
        if (!row.Isexterno_medicoNull()) q.externo_medico = row.externo_medico;

        //if (!row.IsINGRESO_UCPA_PRENull()) q.hora_ingreso_UCPA_pre = row.INGRESO_UCPA_PRE;
        //if (!row.IsINGRESO_UCPA_POSTNull()) q.hora_ingreso_UCPA_post = row.INGRESO_UCPA_POST;

        if (!row.IsTURNO_HORA_INICIONull()) q.hora_inicio = row.TURNO_HORA_INICIO;
        if (!row.IsTURNO_HORA_FINNull()) q.hora_fin = row.TURNO_HORA_FIN;

        if (!row.IsPesoNull()) q.peso = row.Peso;

        if (!row.Isck_cirugias_idNull()) q.cirugias_ck = row.ck_cirugias_id;
        if (!row.Isck_diagnosticos_idNull()) q.diagnosticos_ck = row.ck_diagnosticos_id;

        return q;

    }

    public Sala_y_Cama Cargar_Sala_y_Cama(int Quirofano_ID)
    {
        Sala_y_Cama sc = new Sala_y_Cama();
        HemodinamiaDALTableAdapters.H2_Sala_Cama_HemodinamiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Sala_Cama_HemodinamiaTableAdapter();
        HemodinamiaDAL.H2_Sala_Cama_HemodinamiaDataTable aTable = adapter.GetData(Quirofano_ID);

        foreach (HemodinamiaDAL.H2_Sala_Cama_HemodinamiaRow row in aTable)
        {
            if (!row.IscamaNull()) { sc.Cama = row.cama; }
            if (!row.IssalaNull()) { sc.Sala = row.sala; }
        }

        return sc;
    }

    public void H2_HEMODINAMIA_CAMBIAR_PACIENTE_PROVISORIO(long CirugiaId, long PacienteId)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_HEMODINAMIA_CAMBIAR_PACIENTE_PROVISORIO(PacienteId, CirugiaId);
    }

    public Hemodinamia_Estado H2_HEMODINAMIA_ESTADOS(long Cirugia_Id)
    {
        Hemodinamia_Estado Estado = new Hemodinamia_Estado();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_EstadosTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_EstadosTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_EstadosDataTable aTable = adapter.GetData(Cirugia_Id);
        if (aTable.Count > 0)
        {
            HemodinamiaDAL.H2_Hemodinamia_EstadosRow row = aTable[0];
            if (!row.IsPRENull()) Estado.PRE = row.PRE;
            if (!row.IsQXNull()) Estado.QX = row.QX;
            if (!row.IsR28_ALGONull()) Estado.R28_ALGO = row.R28_ALGO;
            if (!row.IsR28_COMPLETONull()) Estado.R28_COMPLETO = row.R28_COMPLETO;

        }
        return Estado;
    }


    public List<medicos_quirofano_x_especialidad> Listar_Medico_x_Especialidad(int Especialidad, int Medico_Predeterminado)
    {

        List<medicos_quirofano_x_especialidad> list = new List<medicos_quirofano_x_especialidad>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Listar_Medicos_x_EspecialidadTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Listar_Medicos_x_EspecialidadTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Listar_Medicos_x_EspecialidadDataTable aTable = adapter.GetData(-1, Especialidad, Medico_Predeterminado);
        foreach (HemodinamiaDAL.H2_Hemodinamia_Listar_Medicos_x_EspecialidadRow row in aTable.Rows)
        {
            list.Add(CreateFromRowbyListar_Medico_x_Especialidad(row));
        }

        return list;

    }

    private medicos_quirofano_x_especialidad CreateFromRowbyListar_Medico_x_Especialidad(HemodinamiaDAL.H2_Hemodinamia_Listar_Medicos_x_EspecialidadRow row)
    {
        medicos_quirofano_x_especialidad c = new medicos_quirofano_x_especialidad();
        c.Id = row.Id;
        c.Medico = row.ApellidoYNombre;
        c.Clase = "Quirofano";
        if (!row.IsFechaBajaNull())
        {
            c.Clase = "Baja";
        }
        else
        {
            if (!row.EsQuirofano)
            {
                c.Clase = "NoQuirofano";
            }
        }
        return c;
    }


    public List<Hemodinamia_Diagnostico> Diagnostico_Planificar_Hemodinamia(int? id, bool estado, int Cirugia_id)
    {
        List<Hemodinamia_Diagnostico> lista = new List<Hemodinamia_Diagnostico>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(id, estado, Cirugia_id);

        foreach (HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaRow row in aTable.Rows)
        {
            lista.Add(CreardeRowDiagnostico_Planificar_Hemodinamia(row));
        }

        return lista;
    }


    private Hemodinamia_Diagnostico CreardeRowDiagnostico_Planificar_Hemodinamia(HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaRow row)
    {
        Hemodinamia_Diagnostico q = new Hemodinamia_Diagnostico();
        q.id = row.id;
        q.diagnostico = row.Diagnostico;
        return q;
    }


    public int? H2_Hemodinamia_Permiso_Edicion(int Cirugia_Id)
    {
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Permiso_EdicionTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Permiso_EdicionTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Permiso_EdicionDataTable aTable = adapter.GetData(Cirugia_Id);
        if (aTable.Count > 0)
        {
            return aTable[0].Fecha_Diferencia;
        }
        else
        {
            return null;
        }

    }

    public bool Hemodinamia_Extra_EsViejo(long CirugiaID)
    {
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_EXISTEEXTRATableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_EXISTEEXTRATableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_EXISTEEXTRADataTable aTable = adapter.GetData(CirugiaID);

        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_EXISTEEXTRARow row in aTable.Rows)
        {
            if (!row.IsAuxiNull()) return true; else return false;
        }
        return false;
    }

    public bool Verificar_Usuario_Cirujano(int usuario)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        object obj = adapter.H2_Hemodinamia_Verificar_Usuario_Cirujano(usuario);

        if (obj != null)
            return Convert.ToBoolean(obj);
        else
            return false;
    }

    //public List<Hemodinamia_Diagnostico> Diagnostico_Planificar_Hemodinamia(int? id, bool estado, int Cirugia_id)
    //{
    //    List<Hemodinamia_Diagnostico> lista = new List<Hemodinamia_Diagnostico>();
    //    HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter();
    //    HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(id, estado, Cirugia_id);

    //    foreach (HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaRow row in aTable.Rows)
    //    {
    //        lista.Add(CreardeRowDiagnostico_Planificar_Hemodinamia(row));
    //    }

    //    return lista;
    //}


    //private Hemodinamia_Diagnostico CreardeRowDiagnostico_Planificar_Hemodinamia(HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaRow row)
    //{
    //    Hemodinamia_Diagnostico q = new Hemodinamia_Diagnostico();
    //    q.id = row.id;
    //    q.diagnostico = row.Diagnostico;
    //    return q;
    //}

    public List<Hemodinamia_MotivoSusp> Motivo_Susp_Lista(int? Id)
    {
        List<Hemodinamia_MotivoSusp> list = new List<Hemodinamia_MotivoSusp>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Motivo_Susp_ListaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Motivo_Susp_ListaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Motivo_Susp_ListaDataTable aTable = adapter.GetData(Id);
        foreach (HemodinamiaDAL.H2_Hemodinamia_Motivo_Susp_ListaRow row in aTable.Rows)
        {
            list.Add(CrearDesdeRowSusp(row));
        }
        return list;
    }

    public Hemodinamia_MotivoSusp CrearDesdeRowSusp(HemodinamiaDAL.H2_Hemodinamia_Motivo_Susp_ListaRow row)
    {
        Hemodinamia_MotivoSusp m = new Hemodinamia_MotivoSusp();
        m.id = row.id;
        m.motivo = row.motivo;
        return m;
    }

    public List<medicos> Lista_Medicos_TODOS(string Activo)
    {

        List<medicos> list = new List<medicos>();
        HemodinamiaDALTableAdapters.H2_Turnos_Medico_List_HemodinamiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Turnos_Medico_List_HemodinamiaTableAdapter();
        HemodinamiaDAL.H2_Turnos_Medico_List_HemodinamiaDataTable aTable = adapter.GetData(null, "A");
        foreach (HemodinamiaDAL.H2_Turnos_Medico_List_HemodinamiaRow row in aTable.Rows)
        {
            list.Add(CreateFromRowTodos(row));
        }

        return list;

    }

    private medicos CreateFromRowTodos(HemodinamiaDAL.H2_Turnos_Medico_List_HemodinamiaRow row)
    {
        medicos c = new medicos();
        c.Id = row.Id;
        c.Medico = row.ApellidoYNombre;
        c.Especialidad = row.Especialidad_Activo;
        return c;
    }

    public List<Hemodinamia_Anestesia> Anestesia_Lista(int? Id)
    {

        List<Hemodinamia_Anestesia> list = new List<Hemodinamia_Anestesia>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Anestesia_Tipo_ListaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Anestesia_Tipo_ListaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Anestesia_Tipo_ListaDataTable aTable = adapter.GetData(Id);
        foreach (HemodinamiaDAL.H2_Hemodinamia_Anestesia_Tipo_ListaRow row in aTable.Rows)
        {
            list.Add(CreateFromRowAnestesia(row));
        }

        return list;

    }

    private Hemodinamia_Anestesia CreateFromRowAnestesia(HemodinamiaDAL.H2_Hemodinamia_Anestesia_Tipo_ListaRow row)
    {
        Hemodinamia_Anestesia a = new Hemodinamia_Anestesia();
        a.id = row.id;
        if (!row.Isanestesia_tipoNull())
            a.tipo = row.anestesia_tipo;
        return a;
    }

    public List<medicos> Lista_Medicos_byEsp(string Activo, int Especialidad)
    {

        List<medicos> list = new List<medicos>();
        HemodinamiaDALTableAdapters.H2_Turnos_Medico_List_Hemodinamia_byEspTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Turnos_Medico_List_Hemodinamia_byEspTableAdapter();
        HemodinamiaDAL.H2_Turnos_Medico_List_Hemodinamia_byEspDataTable aTable = adapter.GetData(null, Activo, Especialidad);
        foreach (HemodinamiaDAL.H2_Turnos_Medico_List_Hemodinamia_byEspRow row in aTable.Rows)
        {
            list.Add(CreateFromRowbyEsp(row));
        }

        return list;

    }

    private medicos CreateFromRowbyEsp(HemodinamiaDAL.H2_Turnos_Medico_List_Hemodinamia_byEspRow row)
    {
        medicos c = new medicos();
        c.Id = row.Id;
        c.Medico = row.ApellidoYNombre;
        c.Especialidad = row.Especialidad_Activo;
        return c;
    }

    public List<Cirugia_Tipo> Cirugia_Tipo(int? Id, bool estado, int Cirugia_id)
    {
        if (Id == 0) Id = null;
        List<Cirugia_Tipo> Lista = new List<Cirugia_Tipo>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(Id, estado, Cirugia_id);

        foreach (HemodinamiaDAL.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaRow row in aTable.Rows)
        {
            Lista.Add(CreardeRowTipoCirugia(row));
        }

        return Lista;
    }

    private Cirugia_Tipo CreardeRowTipoCirugia(HemodinamiaDAL.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaRow row)
    {
        Cirugia_Tipo c = new Cirugia_Tipo();
        c.id = row.id;
        c.tipo = row.tipo;
        return c;
    }


    public List<Hemodinamia_Diagnostico> Diagnostico_Planificar_Cirugia(int? id, bool estado, int Cirugia_id)
    {
        List<Hemodinamia_Diagnostico> lista = new List<Hemodinamia_Diagnostico>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(id, estado, Cirugia_id);

        foreach (HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaRow row in aTable.Rows)
        {
            lista.Add(CreardeRowDiagnostico_Planificar_Cirugia(row));
        }

        return lista;
    }



    private Hemodinamia_Diagnostico CreardeRowDiagnostico_Planificar_Cirugia(HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaRow row)
    {
        Hemodinamia_Diagnostico q = new Hemodinamia_Diagnostico();
        q.id = row.id;
        q.diagnostico = row.Diagnostico;
        return q;
    }

    public List<Hemodinamia_Cirugia> Cirugias_Planificar_Cirugia(int? id, bool estado, int Cirugia_id)
    {
        List<Hemodinamia_Cirugia> lista = new List<Hemodinamia_Cirugia>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(id, estado, Cirugia_id);

        foreach (HemodinamiaDAL.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaRow row in aTable.Rows)
        {
            lista.Add(CreardeRowCirugias_Planificar_Cirugia(row));
        }

        return lista;
    }

    private Hemodinamia_Cirugia CreardeRowCirugias_Planificar_Cirugia(HemodinamiaDAL.H2_Hemodinamia_Cirugia_Lista_Planificar_CirugiaRow row)
    {
        Hemodinamia_Cirugia q = new Hemodinamia_Cirugia();
        q.id = row.id;
        q.cirugia = row.tipo;
        return q;
    }

    public void Suspender_Cirugia(int Id, int Motivo, long Usuario)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Hemodinamia_Suspender_Cirugia(Id, Motivo, Usuario);
    }

    public void Reanudar_Cirugia(int Id)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Hemodinamia_Reanudar_Cirugia(Id);
    }

    public void Guardar_Diagnostico_PlanificarCirugia(int Id, string Dianostico)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Hemodinamia_Guardar_Diagnostico_PlanificarCirugia(Id, Dianostico);
    }

    public void Guardar_Cirugia_PlanificarCirugia(int Id, string Cirugia)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Hemodinamia_Guardar_Cirugia_PlanificarCirugia(Id, Cirugia);
    }

    public void Eliminar_Cirugia_PlanificarCirugia(int Id)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Hemodinamia_Eliminar_Cirugia_PlanificarCirugia(Id);
    }

    public void Eliminar_Diagnostico_PlanificarCirugia(int Id)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Hemodinamia_Eliminar_Diagnostico_PlanificarCirugia(Id);
    }

    public int Borrar_Cirugia(int Id, long Usuario)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        object id = adapter.H2_Hemodinamia_Borrar_Cirugia(Id, Usuario);
        try
        {
            return Convert.ToInt32(id);
        }
        catch
        {
            return 0;
        }
    }

    public List<Hemodinamia_Listado> Hemodinamia_Turno_Lista(int? Id, string Fecha, bool Baja, int Turno, int cuales)
    {
        List<Hemodinamia_Listado> lista = new List<Hemodinamia_Listado>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Lista_ImprimirTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Lista_ImprimirTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Lista_ImprimirDataTable aTable = adapter.GetData(Id, Fecha, Baja, Turno, cuales);

        foreach (HemodinamiaDAL.H2_Hemodinamia_Lista_ImprimirRow row in aTable.Rows)
        {
            lista.Add(CreateFromRow_TurnoList(row));
        }
        return lista;
    }

    private Hemodinamia_Listado CreateFromRow_TurnoList(HemodinamiaDAL.H2_Hemodinamia_Lista_ImprimirRow row)
    {
        Hemodinamia_Listado q = new Hemodinamia_Listado();
        q.Id = row.id.ToString();
        q.HC = row.NHC;

        if (!row.IsFechaNull())
            q.Fecha = row.Fecha.ToShortDateString();

        if (!row.IsHoraNull())
            q.Hora = row.Hora.ToString();
        else
            q.Hora = "A/C";

        if (!row.IsSalaNull())
            q.Sala = row.Sala;
        else q.Sala = "";

        if (!row.IsCamaNull())
            q.Cama = row.Cama;
        else q.Cama = "";

        if (!row.IsPacienteNull())
            q.Paciente = row.Paciente;
        else q.Paciente = "Sin Nombre";

        if (!row.IsDiagnosticoNull())
            q.Diagnostico = row.Diagnostico;
        else q.Diagnostico = "";

        if (!row.IsCirugiaNull())
            q.Cirugia = row.Cirugia;
        else q.Cirugia = "";

        if (!row.IsCirujanoNull())
            q.Cirujano = row.Cirujano;
        else q.Cirujano = "";

        if (!row.IsAyudanteNull())
            q.Ayudante = row.Ayudante;
        else q.Ayudante = "";

        if (!row.IsAnestesistaNull())
            q.Anestesista = row.Anestesista;
        else q.Anestesista = "";

        if (!row.IsAnestesia_TipoNull())
            q.Anestesia = row.Anestesia_Tipo;
        else q.Anestesia = "";

        if (!row.IsSeccionalNull())
            q.Seccional = row.Seccional;
        else q.Seccional = "Sin Secc";

        if (!row.IsurgenciaNull())
            q.Urgencia = row.urgencia;

        if (!row.IshemoNull())
            q.Hemo = row.hemo;

        if (!row.Iscbo_rayosNull())
            q.Rayos = row.cbo_rayos;

        if (!row.Iscbo_anpaNull()) q.AP = row.cbo_anpa;

        if (!row.Iscbo_monitoreoNull()) q.Monitoreo = row.cbo_monitoreo;

        if (!row.IsobservacionesNull()) q.Observaciones = row.observaciones;
        else q.Observaciones = "";

        if (!row.Ismotivo_susp_idNull()) q.MotivoSusp = row.motivo_susp_id.ToString();

        if (!row.IsEspecialidad_CirujanoNull()) q.Especialidad = row.Especialidad_Cirujano; else q.Especialidad = "";

        q.AL = "";
        q.AM = "";
        q.AN = "";

        if (!row.IshorafinNull()) q.Hora_Fin = row.horafin;

        if (!row.IsMotivo_SuspensionNull()) q.Motivo_Descripcion = row.Motivo_Suspension; else q.Motivo_Descripcion = "";

        return q;

    }

    public Hemodinamia_turnos_totales Hemodinamia_Turno_Lista_cantidad(int? Id, string Fecha, bool Baja, int Turno, int cuales)
    {
        Hemodinamia_turnos_totales totales = new Hemodinamia_turnos_totales();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Lista_ImprimirTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Lista_ImprimirTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Lista_ImprimirDataTable aTable = adapter.GetData(Id, Fecha, Baja, Turno, cuales);

        foreach (HemodinamiaDAL.H2_Hemodinamia_Lista_ImprimirRow row in aTable.Rows)
        {
            totales.todos++;
            if (!row.IshorafinNull() && row.IsurgenciaNull())
            {
                totales.realizadas++;
            }
            else
            {
                if (!row.Ismotivo_susp_idNull())
                {
                    totales.cancelados++;
                }
                else
                {
                    if (!row.IsurgenciaNull() && row.urgencia)
                    {
                        totales.urgencias++;
                    }
                    else
                    {
                        totales.ocupados++;
                    }
                }
            }
        }
        return totales;
    }

    public int Generar_Registro_Turno_Parte_Quirurgico(int id, string fecha, bool dadodebaja, int turno, int cuales, string ruta, int usuario)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        object obj = adapter.H2_Generar_Registro_Turno_Parte_Quirurgico_Hemodinamia(id, fecha, dadodebaja, turno, cuales, ruta, usuario);
        if (obj != null)
            return Convert.ToInt32(obj);
        else
            return 0;
    }

    public int HemodinamiaTurno_Guardar(hemodinamia q, long usuario)
    {
        int turno = 2;

        try
        {
            DateTime hora = Convert.ToDateTime(q.hora);
            if (hora.Hour < 14) { turno = 1; }
            else
            { turno = 2; }
        }
        catch
        {
            turno = 2;
        }


        //q.hora_fin no se usa para nada pero es mas facil dejarlo que modificar todo.
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        object id = adapter.H2_Hemodinamia_Turno_Guardar(q.id, q.nhc, DateTime.Parse(q.fecha), q.hora, q.diagnostico_id, q.urgencia, q.sala_id, q.cama_id, q.cirugia_tipo_id, q.cirujano_especialidad_id, q.cirujano_id, q.ayudante_id, q.anestesista_id, q.anestesia_tipo_id, q.hemo, q.cbo_hemo, q.cbo_rayos, q.cbo_anpa, q.cbo_monitoreo, q.medico_solicitante, q.observaciones, usuario, turno, q.ayudante2_id, q.ayudante3_id, q.Monitoreo_id, q.Instrumentalista_Id, q.Circulante_id, q.externo_medico, q.externo_medico_matricula, q.hora_fin, q.peso, q.cirugias_ck, q.hora_inicio, q.diagnosticos_ck);
        return Convert.ToInt32(id);
    }

    public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR_ADM_FILTRO(long InsumoId, DateTime FD, DateTime FH, int ServicioID, int TipoID, int MedidaID)
    {
        List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTROTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTROTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTRODataTable aTable = adapter.GetData(InsumoId, FD, FH, ServicioID, TipoID, MedidaID);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTRORow row in aTable.Rows)
        {
            INSUMO_EXTRA I = new INSUMO_EXTRA();
            string MARCA = "";
            if (row.MARCA != "")
            {
                MARCA = " (" + row.MARCA + ")";
            }
            I.nombre = row.QE_NOMBRE + " " + row.TIPO + " " + row.MEDIDA + MARCA;
            I.motivo = row.QEMOV_DESCRIPCION;
            I.fecha_vencimiento = row.QES_FECHA_VENCIMIENTO.ToShortDateString();
            I.id = row.QES_ID;
            I.codigo = row.QES_CODIGOBARRA.ToString();
            if (!row.IsSERVICIONull()) I.sservicio = row.SERVICIO;
            if (!row.IsQES_OBSERVACIONNull()) I.comentario = row.QES_OBSERVACION;
            if (!row.IsQES_DEPOSITONull()) I.deposito = row.QES_DEPOSITO;
            LISTA.Add(I);
        }
        return LISTA;

    }

    public bool INSUMO_EXTRA_CREAR_NOMBRE(long InsumoId, string Nombre, int StockMinimo, bool EnStock)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_CREARINSUMO(InsumoId, Nombre, StockMinimo, EnStock);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public INSUMO_EXTRA INSUMO_EXTRA_CARGARINSUMO_X_ID(long ID)
    {
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_CARGARINSUMO_X_IDTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_CARGARINSUMO_X_IDTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_CARGARINSUMO_X_IDDataTable aTable = adapter.GetData(ID);
        INSUMO_EXTRA I = new INSUMO_EXTRA();
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_CARGARINSUMO_X_IDRow row in aTable.Rows)
        {
            I.id = row.QE_ID;
            I.nombre = row.QE_NOMBRE;
            if (!row.IsQE_STOCKMINIMONull()) I.stock_minimo = row.QE_STOCKMINIMO; else I.stock_minimo = 0;
            I.enstock = row.QE_ENSTOCK;
        }
        return I;
    }
    public List<INSUMO_EXTRA_ORTOPEDIA> INSUMO_EXTRA_ORTOPEDIA_LISTAR(long ID)
    {
        List<INSUMO_EXTRA_ORTOPEDIA> LISTA = new List<INSUMO_EXTRA_ORTOPEDIA>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_ORTOPEDIA_LISTARTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_ORTOPEDIA_LISTARTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_ORTOPEDIA_LISTARDataTable aTable = adapter.GetData(ID);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_ORTOPEDIA_LISTARRow row in aTable.Rows)
        {
            INSUMO_EXTRA_ORTOPEDIA O = new INSUMO_EXTRA_ORTOPEDIA();
            O.id = row.QEO_ID;
            O.descripcion = row.QEO_DESCRPCION;
            LISTA.Add(O);
        }
        return LISTA;
    }


    public List<INSUMO_EXTRA_SERVICIO> INSUMO_EXTRA_SERVICIOS_LISTAR(long ID)
    {
        List<INSUMO_EXTRA_SERVICIO> LISTA = new List<INSUMO_EXTRA_SERVICIO>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_SERVICIO_LISTATableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_SERVICIO_LISTATableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_SERVICIO_LISTADataTable aTable = adapter.GetData(ID);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_SERVICIO_LISTARow row in aTable.Rows)
        {
            INSUMO_EXTRA_SERVICIO S = new INSUMO_EXTRA_SERVICIO();
            S.id = row.QESV_ID;
            S.descripcion = row.QESV_DESCRIPCION;
            S.abreviatura = row.QESV_ABREVIATURA;
            LISTA.Add(S);
        }
        return LISTA;
    }

    internal List<INSUMO_EXTRA_ORTOPEDIA> INSUMO_EXTRA_MARCAS_LISTAR()
    {
        List<INSUMO_EXTRA_ORTOPEDIA> Lista = new List<INSUMO_EXTRA_ORTOPEDIA>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_MARCA_LISTARTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_MARCA_LISTARTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_MARCA_LISTARDataTable aTable = adapter.GetData();
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_MARCA_LISTARRow row in aTable.Rows)
        {
            INSUMO_EXTRA_ORTOPEDIA M = new INSUMO_EXTRA_ORTOPEDIA();
            M.id = row.QEM_ID;
            M.descripcion = row.QEM_MARCA;
            Lista.Add(M);
        }
        return Lista;
    }

    public List<INSUMO_EXTRA_MOTIVO> INSUMO_EXTRA_MOTIVO_LISTAR(int Tipo)
    {
        List<INSUMO_EXTRA_MOTIVO> LISTA = new List<INSUMO_EXTRA_MOTIVO>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_MOTIVO_LISTATableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_MOTIVO_LISTATableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_MOTIVO_LISTADataTable aTable = adapter.GetData(Tipo);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_MOTIVO_LISTARow row in aTable.Rows)
        {
            INSUMO_EXTRA_MOTIVO M = new INSUMO_EXTRA_MOTIVO();
            M.id = row.QEMOV_ID;
            M.descripcion = row.QEMOV_DESCRIPCION;
            LISTA.Add(M);
        }
        return LISTA;
    }
    public bool INSUMO_EXTRA_MARCA_INSERTAR(long ID, string MARCA)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_MARCA_ALTA(ID, MARCA);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool INSUMO_EXTRA_SERVICIOS_ALTA(long ID, string SERVICIO, string ABREVIATURA)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_SERVICIO_ALTA(ID, SERVICIO, ABREVIATURA);
            return true;
        }
        catch
        {
            return false;
        }

    }

    public bool INSUMO_EXTRA_ORTOPEDIAS_ALTA(long Id, string Nombre)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_ORTOPEDIA_ALTA(Id, Nombre);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR_ADM_DET(long InsumoId, int ServicioID)
    {
        List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_DETALLETableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_DETALLETableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_DETALLEDataTable aTable = adapter.GetData(InsumoId, ServicioID);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_LISTAR_DETALLERow row in aTable.Rows)
        {
            INSUMO_EXTRA I = new INSUMO_EXTRA();
            string MARCA = "";
            if (row.MARCA != "")
            {
                MARCA = " (" + row.MARCA + ")";
            }
            I.id = row.QES_ID;
            I.fecha_vencimiento = row.QES_FECHA_VENCIMIENTO.ToShortDateString();
            I.nombre = row.QE_NOMBRE + " " + row.TIPO + " " + row.MEDIDA + MARCA;
            I.motivo = row.QEMOV_DESCRIPCION;
            I.usuario = row.usuario;
            I.codigo = row.QES_CODIGOBARRA.ToString();
            I.fecha_movimiento = row.QES_FECHAMOVIMIENTO.ToShortDateString();
            if (!row.IsQES_OBSERVACIONNull()) I.comentario = row.QES_OBSERVACION;
            if (!row.IsSERVICIONull()) I.sservicio = row.SERVICIO; else I.sservicio = "";
            if (!row.IsPACIENTENull()) I.paciente = row.PACIENTE; else I.paciente = "";
            LISTA.Add(I);
        }
        return LISTA;

    }


    public string INSUMO_EXTRA_ALTA(long QES_INSUMOID, DateTime QES_FECHA_VENCIMIENTO, int QES_USUARIO, string QES_MOVIMIENTO, int QES_MOTIVOID, string QES_OBSERVACION, int QES_ORTOPEDIAID, bool QES_UOM, string QES_CODIGOBARRA, string QES_DESCRIPCION, int CANTIDAD, int SERVICIO, long TIPOID, long MEDIDAID, long MARCAID, string desposito)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            object Salida = adapter.H2_HEMODINAMIA_INSUMO_EXTRA_INSERTAR(QES_INSUMOID, QES_FECHA_VENCIMIENTO, QES_USUARIO, QES_MOVIMIENTO, QES_MOTIVOID, QES_OBSERVACION, QES_ORTOPEDIAID, QES_UOM, QES_CODIGOBARRA, QES_DESCRIPCION, CANTIDAD, SERVICIO, TIPOID, MEDIDAID, MARCAID, desposito);
            return Salida.ToString();
        }
        catch
        {
            return "";
        }
    }

    public INSUMO_EXTRA INSUMO_EXTRA_CARGAR_X_CODBARRA(long CodBar)
    {
        try
        {
            INSUMO_EXTRA I = new INSUMO_EXTRA();
            HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_CARGAR_X_CODBARRATableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_CARGAR_X_CODBARRATableAdapter();
            HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_CARGAR_X_CODBARRADataTable aTable = adapter.GetData(CodBar);
            foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_CARGAR_X_CODBARRARow row in aTable.Rows)
            {
                I.nombre = row.QE_NOMBRE;
                I.ServicioID = row.QES_SERVICIO;
                I.material_uom = row.QES_UOM;
                I.OrtopediaID = row.QES_ORTOPEDIAID;
                I.fecha_vencimiento = row.QES_FECHA_VENCIMIENTO.ToShortDateString();
                I.motivo = row.QES_MOTIVOID.ToString();
                I.observacion = row.QES_OBSERVACION;
                if (!row.IsQES_TIPONull()) I.tipo = row.QES_TIPO;
                if (!row.IsQES_MEDIDANull()) I.medida = row.QES_MEDIDA;
                if (!row.IsQES_MARCANull()) I.marca = row.QES_MARCA;
                if (!row.IsQES_DEPOSITONull()) I.deposito = row.QES_DEPOSITO; else I.deposito = "";
            }
            return I;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public bool INSUMO_EXTRA_BAJA(string CodBarra, int Usuario, int Motivo, string Observacion)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_ELIMINAR(CodBarra, Usuario, Motivo, Observacion);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool INSUMO_EXTRA_ACTUALIZAR_X_CODBARRA(long CodBar, int SERVICIO, bool UOM, long ORTOPEDIAID, DateTime FechaVencimiento, int MOTIVO, string OBSERVACION, int Usuario, long TipoId, long MedidaId, long MarcaId, string Deposito)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_ACTUALIZAR_X_CODBARRA(CodBar, SERVICIO, UOM, ORTOPEDIAID, FechaVencimiento, MOTIVO, OBSERVACION, Usuario, TipoId, MedidaId, MarcaId, Deposito);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool INSUMO_EXTRA_UTILIZAR_X_CODBARRA(long CodBar, int MOTIVO, string OBSERVACION, int USUARIO)
    {
        try
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_QUIROFANO_INSUMO_EXTRA_UTILIZAR_X_CODBARRA(CodBar, MOTIVO, OBSERVACION, USUARIO);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool INSUMO_EXTRA_ELIMINAR(long INSUMOID)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_ELIMINARINSUMO(INSUMOID);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool INSUMO_EXTRA_USADO(long INSUMOID)
    {
        try
        {
            bool Existe = false;
            HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_FUEUSADOTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_FUEUSADOTableAdapter();
            HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_FUEUSADODataTable aTable = adapter.GetData(INSUMOID);
            foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_FUEUSADORow row in aTable.Rows)
            {
                if (!row.IsUsadosNull())
                {
                    Existe = true;
                }
            }
            return Existe;
        }
        catch
        {
            return false;
        }
    }


    public bool HEMODINAMIA_EXTRA_ALTATIPO(long QETIPO_ID, int QERUBRO_ID, string QETIPO_TIPO)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_EXTRA_ALTATIPO(QETIPO_ID, QERUBRO_ID, QETIPO_TIPO);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool HEMODINAMIA_EXTRA_ALTAMEDIDA(int RubroId, long TipoId, long MedidaId, string Medida)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_EXTRA_ALTAMEDIDA(RubroId, TipoId, MedidaId, Medida);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public List<INSUMO_EXTRA_TIPO> HEMODINAMIA_EXTRA_LISTARTIPO(int RubroId, long TipoId)
    {
        List<INSUMO_EXTRA_TIPO> Lista = new List<INSUMO_EXTRA_TIPO>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_EXTRA_LISTARTIPOTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_EXTRA_LISTARTIPOTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_EXTRA_LISTARTIPODataTable aTable = adapter.GetData(RubroId, TipoId);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_EXTRA_LISTARTIPORow row in aTable.Rows)
        {
            INSUMO_EXTRA_TIPO T = new INSUMO_EXTRA_TIPO();
            T.RubroId = row.QERUBRO_ID;
            T.Tipo = row.QETIPO_TIPO;
            T.TipoId = row.QETIPO_ID;
            Lista.Add(T);
        }
        return Lista;
    }

    public List<INSUMO_EXTRA_TIPO> QUIROFANO_EXTRA_LISTARTIPO(int RubroId, long TipoId)
    {
        List<INSUMO_EXTRA_TIPO> Lista = new List<INSUMO_EXTRA_TIPO>();
        QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTARTIPOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTARTIPOTableAdapter();
        QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTARTIPODataTable aTable = adapter.GetData(RubroId, TipoId);
        foreach (QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTARTIPORow row in aTable.Rows)
        {
            INSUMO_EXTRA_TIPO T = new INSUMO_EXTRA_TIPO();
            T.RubroId = row.QERUBRO_ID;
            T.Tipo = row.QETIPO_TIPO;
            T.TipoId = row.QETIPO_ID;
            Lista.Add(T);
        }
        return Lista;
    }

    public List<INSUMO_EXTRA_MEDIDA> HEMODINAMIA_EXTRA_LISTARMEDIDA(long MedidaId, int RubroId, long TipoId)
    {
        List<INSUMO_EXTRA_MEDIDA> Lista = new List<INSUMO_EXTRA_MEDIDA>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_EXTRA_LISTARMEDIDATableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_EXTRA_LISTARMEDIDATableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_EXTRA_LISTARMEDIDADataTable aTable = adapter.GetData(MedidaId, RubroId, TipoId);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_EXTRA_LISTARMEDIDARow row in aTable.Rows)
        {
            INSUMO_EXTRA_MEDIDA M = new INSUMO_EXTRA_MEDIDA();
            M.Medida = row.QEMED_MEDIDA;
            M.MedidaId = row.QEMED_ID;
            M.RubroId = row.QEMED_RUBRO;
            M.TipoId = row.QEMED_TIPO;
            Lista.Add(M);
        }
        return Lista;
    }

    public List<AtConsultorioCirugia_Etapa> Hemodinamia_Programada_UltimaEtapa_x_Paciente_Listar(long PacienteId, string FDesde, string FHasta, string Paciente, string NHC, long Documento, bool Anulado, int Finalizado, int Etapa)
    {
        HemodinamiaDALTableAdapters.H2_AtConsultorio_Hemodinamia_Programada_UltimaEtapa_x_PacienteTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_AtConsultorio_Hemodinamia_Programada_UltimaEtapa_x_PacienteTableAdapter();
        HemodinamiaDAL.H2_AtConsultorio_Hemodinamia_Programada_UltimaEtapa_x_PacienteDataTable atable = adapter.GetData(PacienteId, Convert.ToDateTime(FDesde), Convert.ToDateTime(FHasta), Anulado, Paciente, NHC, Documento, Finalizado, Etapa);
        List<AtConsultorioCirugia_Etapa> L = new List<AtConsultorioCirugia_Etapa>();
        foreach (HemodinamiaDAL.H2_AtConsultorio_Hemodinamia_Programada_UltimaEtapa_x_PacienteRow row in atable.Rows)
        {
            AtConsultorioCirugia_Etapa et = new AtConsultorioCirugia_Etapa();
            if (!row.IsAnuladoNull()) et.Anulado = row.Anulado; else et.Anulado = false;
            if (!row.IsAnulado_FechaNull()) et.Anulado_Fecha = row.Anulado_Fecha.ToString(); else et.Anulado_Fecha = "";
            et.apellido = row.Paciente;
            et.CirugiaProgramadaID = row.CirugiaProgramadaID;
            et.documento_real = row.documento_real.ToString();
            et.Estado = row.Estado;
            et.Etapa = row.Etapa;
            et.EtapaId = row.EtapaID;
            et.Fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm");
            et.FechaInicio = row.FechaInicio.ToString("dd/MM/yyyy HH:mm");
            et.HC_UOM_CENTRAL = row.HC_UOM_CENTRAL;
            et.Observacion = row.Observacion;
            et.Orden = row.Orden;
            et.Seccional = row.Seccional;
            et.Telefono = row.Telefono;
            et.Usuario = row.Usuario;
            if (!row.IsFechaAviso1Null()) et.FechaAviso1 = row.FechaAviso1.ToShortDateString(); else et.FechaAviso1 = "";
            if (!row.IsFechaaviso2Null()) et.Fechaaviso2 = row.Fechaaviso2.ToShortDateString(); else et.Fechaaviso2 = "";
            if (!row.IsFecha_LimiteNull()) et.Fecha_Limite = row.Fecha_Limite.ToShortDateString(); else et.Fecha_Limite = "";
            et.ResultadoEtapa = row.ResultadoEtapa; //else et.ResultadoEtapa = -1;
            L.Add(et);
        }
        return L;
    }

    public AtConsultorioCirugia_EtapaInfo Hemodinamia_Programada_ProximaEtapa(long CirugiaProgramadaID)
    {
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Programada_EtapaSiguienteTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Programada_EtapaSiguienteTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Programada_EtapaSiguienteDataTable atable = adapter.GetData(CirugiaProgramadaID);

        if (atable.Count > 0)
        {
            AtConsultorioCirugia_EtapaInfo Etapa = new AtConsultorioCirugia_EtapaInfo();
            HemodinamiaDAL.H2_Hemodinamia_Programada_EtapaSiguienteRow row = atable[0];
            if (!row.IsActivoNull()) Etapa.Activo = row.Activo; else Etapa.Activo = 1;
            Etapa.CirugiaProgramadaID = CirugiaProgramadaID;
            if (!row.IsDescripcionNull()) Etapa.Descripcion = row.Descripcion; else Etapa.Descripcion = "";
            if (!row.IsEtapadIdNull()) Etapa.EtapadId = row.EtapadId;
            if (!row.IsOrdenNull()) Etapa.Orden = row.Orden; else Etapa.Orden = 1;
            Etapa.Observacion = "";

            if (Etapa.EtapadId != -1)
            {
                return Etapa;
            }
            else
            {
                return Hemodinamia_Programada_EtapaActual(CirugiaProgramadaID);
            }
        }

        return null;
    }

    public AtConsultorioCirugia_EtapaInfo Hemodinamia_Programada_EtapaActual(long CirugiaProgramadaID)
    {
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Programada_EtapaActualTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Programada_EtapaActualTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Programada_EtapaActualDataTable atable = adapter.GetData(CirugiaProgramadaID);

        if (atable.Count > 0)
        {
            AtConsultorioCirugia_EtapaInfo Etapa = new AtConsultorioCirugia_EtapaInfo();
            HemodinamiaDAL.H2_Hemodinamia_Programada_EtapaActualRow row = atable[0];
            Etapa.CirugiaProgramadaID = row.CirugiaProgramadaID;
            Etapa.Estado = row.Estado;
            Etapa.EtapadId = row.EtapaId;
            Etapa.Fecha = row.Fecha.ToShortDateString(); ;
            if (!row.IsObservacionNull()) Etapa.Observacion = row.Observacion; else Etapa.Observacion = "";
            Etapa.Descripcion = row.EtapaDescripcion;
            return Etapa;
        }

        return null;
    }

    public bool Hemodinamia_Programada_GuardarProximaEtapa(long CirugiaProgramadaID, int UsuarioId, int Resultado, string Comentario)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter query = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            query.H2_Hemodinamia_Programada_GuardarProximaEtapa(CirugiaProgramadaID, UsuarioId, Resultado, Comentario);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool Hemodinamia_Programada_Anular(long CirugiaProgramadaID, int UsuarioId)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter query = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            query.H2_Hemodinamia_Programada_Anular(CirugiaProgramadaID, UsuarioId);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool Hemodinamia_Programada_Guardar_Fecha_Aviso(long CirugiaProgramadaID, string fecha, int tipo)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter query = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            query.H2_Hemodinamia_Programada_Guardar_Fecha_Aviso(CirugiaProgramadaID, fecha, tipo);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool Hemodinamia_Programada_Guardar_Vaucher(Cirugia_Vaucher Objeto)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter query = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            query.H2_Hemodinamia_Programada_Guardar_Vaucher(Objeto.CirugiaProgramadaID, Objeto.servicio, Objeto.fechaInternacion, Objeto.horaIntenracion, Objeto.indicaciones);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public Cirugia_Vaucher Hemodinamia_Programada_Imprimir_Vaucher(long CirugiaProgramadaID)
    {

        HemodinamiaDALTableAdapters.H2_Hemodinamia_Programada_Imprimir_VaucherTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Programada_Imprimir_VaucherTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Programada_Imprimir_VaucherDataTable atable = adapter.GetData(CirugiaProgramadaID);

        Cirugia_Vaucher Cirugia = new Cirugia_Vaucher();

        foreach (HemodinamiaDAL.H2_Hemodinamia_Programada_Imprimir_VaucherRow row in atable.Rows)
        {
            Cirugia.servicioId = row.servicioId;
            Cirugia.fechaInternacion = row.fechaInternacion;
            Cirugia.horaIntenracion = row.horaInternacion;
            Cirugia.indicaciones = row.indicaciones;
        }
        return Cirugia;

    }

    public List<ParteQuirurgicoGenerado> TraerPartesQuirurgicosGeneradosHemodinamia()
    {
        HemodinamiaDALTableAdapters.H2_Traer_Partes_Quirurgicos_Generados_HemodinamiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Traer_Partes_Quirurgicos_Generados_HemodinamiaTableAdapter();
        HemodinamiaDAL.H2_Traer_Partes_Quirurgicos_Generados_HemodinamiaDataTable aTable = adapter.GetData();
        List<ParteQuirurgicoGenerado> l = new List<ParteQuirurgicoGenerado>();
        foreach (HemodinamiaDAL.H2_Traer_Partes_Quirurgicos_Generados_HemodinamiaRow row in aTable)
        {
            ParteQuirurgicoGenerado u = new ParteQuirurgicoGenerado();

            u.id = row.id;
            if (!row.IsrutaNull()) { u.ruta = row.ruta; }
            if (!row.IsusuarioNull()) { u.usuario = row.usuario; }
            if (!row.IsfechaNull()) { u.fecha = row.fecha.ToShortDateString(); }
            u.usuarioName = row.usuarioName;
            l.Add(u);
        }
        return l;
    }

    public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR(int EspecialidadID, bool NoStock)
    {
        List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_LISTARTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_LISTARTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_LISTARDataTable aTable = adapter.GetData(EspecialidadID, NoStock);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_LISTARRow row in aTable.Rows)
        {
            INSUMO_EXTRA I = new INSUMO_EXTRA();
            I.id = row.QE_ID;
            I.nombre = row.QE_NOMBRE;
            I.enstock = row.QE_ENSTOCK;
            LISTA.Add(I);
        }
        return LISTA;
    }

    public bool Hemodinamia_Extra_Protesis_Borrar_Det(long CirugiaID, string CB)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_PROTESIS_BORRAR_Det(CirugiaID, CB);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public int Guardar_Protesis_Cab(Hemodinamia_Protesis_Cab p)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        object obj = adapter.H2_Hemodinamia_ProtesisyOtros_CAB_Guardar(p.id, p.servicio, p.ortopedia, p.material, p.usuario, p.observaciones);
        return p.id;
    }

    public bool Hemodinamia_Extra_Protesis_Guardar_Det(long CirugiaID, string CodigoBarra)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_PROTESIS_GUARDAR_DET(CirugiaID, CodigoBarra);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public int Guardar_Protesis_Cab(Quirofano_Protesis_Cab p)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        object obj = adapter.H2_Hemodinamia_ProtesisyOtros_CAB_Guardar(p.id, p.servicio, p.ortopedia, p.material, p.usuario, p.observaciones);
        return p.id;
    }
    public List<HemodinamiaProtesis> Hemodinamia_Extra_Protesis_Lista_Det(long CirugiaID)
    {
        List<HemodinamiaProtesis> Lista = new List<HemodinamiaProtesis>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_Protesis_Lista_DetTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_Protesis_Lista_DetTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_Protesis_Lista_DetDataTable aTable = adapter.GetData(CirugiaID);

        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_Protesis_Lista_DetRow row in aTable.Rows)
        {
            HemodinamiaProtesis I = new HemodinamiaProtesis();
            I.nombre = row.QE_NOMBRE;
            I.codigobarra = row.QEP_CB;
            I.operacion_Id = row.QEP_CIRUGIAID;
            I.insumo_id = row.QEP_INSUMOID;

            if (!row.IsQES_OBSERVACIONNull()) I.comentario = row.QES_OBSERVACION; else I.comentario = "";
            if (!row.IsMEDIDANull()) I.medida = row.MEDIDA; else I.medida = "";
            if (!row.IsTIPONull()) I.tipo = row.TIPO; else I.tipo = "";
            if (!row.IsMARCANull()) I.marca = row.MARCA; else I.marca = "";
            Lista.Add(I);
        }

        return Lista;
    }

    public bool INSUMO_EXTRA_CREAR_NOMBRE_AUTOMATICO(long InsumoId, string Nombre)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HEMODINAMIA_INSUMO_EXTRA_CREARINSUMO_AUTOMATICO(InsumoId, Nombre);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public List<INSUMO_EXTRA> INSUMO_EXTRA_ALTA_AUTOMATICO(long QES_INSUMOID, DateTime QES_FECHA_VENCIMIENTO, int QES_USUARIO, string QES_OBSERVACION, int QES_ORTOPEDIAID, bool QES_UOM, string QES_CODIGOBARRA, string QES_DESCRIPCION, int SERVICIO, long TIPO, long MEDIDA, int CANTIDAD, long MARCA)
    {
        try
        {
            List<INSUMO_EXTRA> Lista = new List<INSUMO_EXTRA>();
            HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_INSERTAR_AUTOMATICOTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMO_EXTRA_INSERTAR_AUTOMATICOTableAdapter();
            HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_INSERTAR_AUTOMATICODataTable aTable = adapter.GetData(QES_INSUMOID, QES_FECHA_VENCIMIENTO, QES_USUARIO, QES_OBSERVACION, QES_ORTOPEDIAID, QES_UOM, QES_CODIGOBARRA, QES_DESCRIPCION, SERVICIO, CANTIDAD, TIPO, MEDIDA, MARCA);
            foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMO_EXTRA_INSERTAR_AUTOMATICORow row in aTable.Rows)
            {
                INSUMO_EXTRA T = new INSUMO_EXTRA();
                T.nombre = row.QE_NOMBRE;
                if (!row.IsQEMED_MEDIDANull()) T.smedida = row.QEMED_MEDIDA; else T.smedida = "";
                if (!row.IsQETIPO_TIPONull()) T.stipo = row.QETIPO_TIPO; else T.stipo = "";
                T.codigo = row.QES_CODIGOBARRA.ToString();
                if (!row.IsQES_OBSERVACIONNull()) T.comentario = row.QES_OBSERVACION;
                Lista.Add(T);
            }
            return Lista;
        }
        catch (Exception EX)
        {
            throw new Exception(EX.Message);
        }

    }


    public INSUMO_EXTRA INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADO(long CodBar)
    {
        try
        {
            INSUMO_EXTRA I = new INSUMO_EXTRA();
            HemodinamiaDALTableAdapters.H2_INSUMO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADOTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_INSUMO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADOTableAdapter();
            HemodinamiaDAL.H2_INSUMO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADODataTable aTable = adapter.GetData(CodBar);
            foreach (HemodinamiaDAL.H2_INSUMO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADORow row in aTable.Rows)
            {
                I.nombre = row.QE_NOMBRE;
                I.ServicioID = row.QES_SERVICIO;
                I.material_uom = row.QES_UOM;
                I.OrtopediaID = row.QES_ORTOPEDIAID;
                I.fecha_vencimiento = row.QES_FECHA_VENCIMIENTO.ToShortDateString();
                I.motivo = row.QES_MOTIVOID.ToString();
                I.observacion = row.QES_OBSERVACION;
                if (!row.IsMARCANull()) I.smarca = row.MARCA; else I.smarca = "";
                if (!row.IsTIPONull()) I.stipo = row.TIPO; else I.stipo = "";
                if (!row.IsMEDIDANull()) I.smedida = row.MEDIDA; else I.smedida = "";
                if (!row.IsQES_DEPOSITONull()) I.deposito = row.QES_DEPOSITO; else I.deposito = "";
            }
            return I;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<INSUMO_EXTRA_MEDIDA> QUIROFANO_EXTRA_LISTARMEDIDA(long MedidaId, int RubroId, long TipoId)
    {
        List<INSUMO_EXTRA_MEDIDA> Lista = new List<INSUMO_EXTRA_MEDIDA>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_EXTRA_LISTARMEDIDATableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_EXTRA_LISTARMEDIDATableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_EXTRA_LISTARMEDIDADataTable aTable = adapter.GetData(MedidaId, RubroId, TipoId);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_EXTRA_LISTARMEDIDARow row in aTable.Rows)
        {
            INSUMO_EXTRA_MEDIDA M = new INSUMO_EXTRA_MEDIDA();
            M.Medida = row.QEMED_MEDIDA;
            M.MedidaId = row.QEMED_ID;
            M.RubroId = row.QEMED_RUBRO;
            M.TipoId = row.QEMED_TIPO;
            Lista.Add(M);
        }
        return Lista;
    }

    private hemodinamia CrearDesdeRowHemodinamia(HemodinamiaDAL.H2_Hemodinamia_Turnos_ListadoRow row)
    {
        hemodinamia q = new hemodinamia();
        q.id = row.id;
        q.nhc = row.nhc;

        if (!row.IsfechaNull())
        {
            q.fecha = row.fecha.ToShortDateString();
            //q.fecha = row.fecha.ToString("dd/MM/yyyy");
        }

        if (!row.IshoraNull())
            q.hora = row.hora;
        else
            q.hora = "A/C";

        if (!row.IsOtros_InsumosNull())
            q.OtrosInsumos = row.Otros_Insumos;
        else q.OtrosInsumos = "";

        if (!row.IsdiagnosticoidNull())
            q.diagnostico_id = row.diagnosticoid;

        if (!row.IsurgenciaNull())
            q.urgencia = row.urgencia;
        else
            q.urgencia = false;

        if (!row.IssalaidNull())
            q.sala_id = row.salaid;

        if (!row.IscamaidNull())
            q.cama_id = row.camaid;

        if (!row.IscirugiaidNull())
            q.cirugia_tipo_id = row.cirugiaid;

        if (!row.Iscirujano_especialidad_idNull())
            q.cirujano_especialidad_id = row.cirujano_especialidad_id;

        if (!row.Iscirujano_idNull())
            q.cirujano_id = row.cirujano_id;

        if (!row.Isayudante_idNull())
            q.ayudante_id = row.ayudante_id;

        if (!row.Isanestesista_idNull())
            q.anestesista_id = row.anestesista_id;

        if (!row.Isanestesia_tipoNull())
            q.anestesia_tipo_id = row.anestesia_tipo;

        if (!row.IshemoNull())
            q.hemo = row.hemo;

        if (!row.Iscbo_hemoNull())
            q.cbo_hemo = row.cbo_hemo;

        if (!row.Iscbo_anpaNull())
            q.cbo_anpa = row.cbo_anpa;

        if (!row.Iscbo_monitoreoNull())
            q.cbo_monitoreo = row.cbo_monitoreo;

        if (!row.Ismed_solicitante_idNull())
            q.medico_solicitante = row.med_solicitante_id;

        if (!row.IsobservacionesNull())
            q.observaciones = row.observaciones;

        if (!row.Ismotivo_susp_idNull())
            q.motivo_susp_id = row.motivo_susp_id;

        if (!row.IsbajaNull())
            q.baja = row.baja;

        if (!row.Isquienlodeiodebaja_idNull())
            q.quien_dio_baja_id = row.quienlodeiodebaja_id;

        if (!row.Isayudante2Null())
            q.ayudante2_id = row.ayudante2;

        if (!row.Isayudante3Null())
            q.ayudante3_id = row.ayudante3;

        if (!row.IshorafinNull())
            q.hora_fin = row.horafin.ToString();

        if (!row.IsefectuadaNull())
            if (row.efectuada)
                q.efectuada = true;
            else
                q.efectuada = false;
        else
            q.efectuada = false;
        if (!row.Iscirculante_idNull())
            q.Circulante_id = row.circulante_id;
        if (!row.Ismonitoreo_idNull())
            q.Monitoreo_id = row.monitoreo_id;
        if (!row.Isusuario_id_modifNull())
            q.usuario_id_modificacion = row.usuario_id_modif;
        if (!row.Ismotivo_modificacionNull())
            q.motivo_modificacion = row.motivo_modificacion;

        if (!row.Isinstrumentalista_idNull())
            q.Instrumentalista_Id = row.instrumentalista_id;
        if (!row.Iscbo_rayosNull())
            q.cbo_rayos = row.cbo_rayos;
        if (!row.IsusuarioNull())
            q.usuario_modificacion = row.usuario;

        if (!row.Isexterno_medico_matriculaNull()) q.externo_medico_matricula = row.externo_medico_matricula;
        if (!row.Isexterno_medicoNull()) q.externo_medico = row.externo_medico;

        //if (!row.IsINGRESO_UCPA_PRENull()) q.hora_ingreso_UCPA_pre = row.INGRESO_UCPA_PRE;
        //if (!row.IsINGRESO_UCPA_POSTNull()) q.hora_ingreso_UCPA_post = row.INGRESO_UCPA_POST;

        if (!row.IsTURNO_HORA_INICIONull()) q.hora_inicio = row.TURNO_HORA_INICIO;
        if (!row.IsTURNO_HORA_FINNull()) q.hora_fin = row.TURNO_HORA_FIN;

        if (!row.IsPesoNull()) q.peso = row.Peso;

        if (!row.Isck_cirugias_idNull()) q.cirugias_ck = row.ck_cirugias_id;
        if (!row.Isck_diagnosticos_idNull()) q.diagnosticos_ck = row.ck_diagnosticos_id;

        return q;

    }
    public int Resolucion28_Guardar(Resolucion28 c)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        //cirujano_circulante_anestesista_corfirman_verbalmente
        object id = adapter.H2_Hemodinamia_Resolucion28_Guardar(c.nhc, c.operacion, c.A1, c.A2, c.A3, c.A4, c.A5, c.A6, c.A7, c.A8, c.A9, c.A10, c.A11, c.A12, c.A13, c.A14, c.B1, c.B2, c.B3, c.B4, c.B5, c.B6, c.C1, c.C2, c.C3, c.C4, c.C5, c.C6, c.C7, c.C8, c.C9, c.observaciones);
        return Convert.ToInt32(id);
    }

    public Resolucion28 CargarResolucion(int Id)
    {
        Resolucion28 r = new Resolucion28();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Resolucion28_ListaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Resolucion28_ListaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Resolucion28_ListaDataTable aTable = adapter.GetData(Id);
        foreach (HemodinamiaDAL.H2_Hemodinamia_Resolucion28_ListaRow row in aTable.Rows)
        {
            r = CreateFromRowResolucion28(row);
        }
        return r;
    }


    private Resolucion28 CreateFromRowResolucion28(HemodinamiaDAL.H2_Hemodinamia_Resolucion28_ListaRow row)
    {
        Resolucion28 r = new Resolucion28();

        if (!row.Iscirculante_confirmaNull()) r.A1 = row.circulante_confirma;

        if (!row.IsnhcNull())
            r.nhc = row.nhc;
        if (!row.Ispaciente_puede_responderNull())
            r.A2 = row.paciente_puede_responder;
        if (!row.Iscontrol_de_equipamento_anestesiaNull())
            r.A3 = row.control_de_equipamento_anestesia;
        if (!row.Isoximetro_de_pulso_colocado_y_funcionandoNull())
            r.A4 = row.oximetro_de_pulso_colocado_y_funcionando;
        if (!row.Isverificacion_de_existencia_de_alergia_conocidasNull())
            r.A5 = row.verificacion_de_existencia_de_alergia_conocidas;
        if (!row.Ischequeo_de_via_aereaNull())
            r.A6 = row.chequeo_de_via_aerea;
        if (!row.Isverificacion_de_profilaxis_antibioticosNull())
            r.A7 = row.verificacion_de_profilaxis_antibioticos;
        if (!row.Isequipos_quirurgicos_conoce_comorbilidadesNull())
            r.A8 = row.equipos_quirurgicos_conoce_comorbilidades;
        if (!row.Isdemarcacion_de_sitiosNull())
            r.A9 = row.demarcacion_de_sitios;
        if (!row.Ischequeo_de_disponibilidad_de_estudio_complementarioNull())
            r.A10 = row.chequeo_de_disponibilidad_de_estudio_complementario;
        if (!row.Isverificacion_de_riesgos_hemorragiaNull())
            r.A11 = row.verificacion_de_riesgos_hemorragia;
        if (!row.Isconfirmacion_esterilidadNull())
            r.A12 = row.confirmacion_esterilidad;
        if (!row.Iscirujano_e_instrumentadora_verificaron_materialesNull())
            r.A13 = row.cirujano_e_instrumentadora_verificaron_materiales;
        if (!row.Ischequeo_del_correcto_funcionamiento_de_todosNull())
            r.A14 = row.chequeo_del_correcto_funcionamiento_de_todos;
        if (!row.Isque_todos_los_miembros_del_equipo_q_presentesNull())
            r.B1 = row.que_todos_los_miembros_del_equipo_q_presentes;
        if (!row.Isque_todos_los_miembros_del_equipo_s_h_presentadosNull())
            r.B2 = row.que_todos_los_miembros_del_equipo_s_h_presentados;
        if (!row.Iscirujano_circulante_anestesista_corfirman_verbalmenteNull())
            r.B3 = row.cirujano_circulante_anestesista_corfirman_verbalmente;
        if (!row.Ischequeo_de_control_de_decubitos_y_fNull())
            r.B4 = row.chequeo_de_control_de_decubitos_y_f;
        if (!row.Isel_cirujano_revisa_en_vozNull())
            r.B5 = row.el_cirujano_revisa_en_voz;
        if (!row.Isanestesista_revisa_en_vozNull())
            r.B6 = row.anestesista_revisa_en_voz;


        if (!row.Isel_nombre_del_procedimiento_realizadoNull())
            r.C1 = row.el_nombre_del_procedimiento_realizado;
        if (!row.Isel_recuento_de_instrumentalNull())
            r.C2 = row.el_recuento_de_instrumental;
        if (!row.Isrotulado_de_muestrasNull())
            r.C3 = row.rotulado_de_muestras;
        if (!row.Issi_se_detectaron_problemasNull())
            r.C4 = row.si_se_detectaron_problemas;
        if (!row.Iscirujano_anestesista_y_circulante_revisaranNull())
            r.C5 = row.cirujano_anestesista_y_circulante_revisaran;
        if (!row.Istranspaso_escrito_de_medicamentosNull())
            r.C6 = row.transpaso_escrito_de_medicamentos;
        if (!row.Iscontrol_de_normotermiaNull())
            r.C7 = row.control_de_normotermia;
        if (!row.Isparte_quirurgicos_cNull())
            r.C8 = row.parte_quirurgicos_c;
        if (!row.Isparte_anestesicos_cNull())
            r.C9 = row.parte_anestesicos_c;

        if (!row.IsobservacionesNull())
            r.observaciones = row.observaciones;

        return r;
    }



    private hemodinamia CrearDesdeRowHemodinamiaTurno(HemodinamiaDAL.H2_Hemodinamia_Turnos_ListadoRow row)
    {
        hemodinamia q = new hemodinamia();
        q.id = row.id;
        q.nhc = row.nhc;

        if (!row.IsfechaNull())
        {
            q.fecha = row.fecha.ToShortDateString();
            //q.fecha = row.fecha.ToString("dd/MM/yyyy");
        }

        if (!row.IshoraNull())
            q.hora = row.hora;
        else
            q.hora = "A/C";

        if (!row.IsOtros_InsumosNull())
            q.OtrosInsumos = row.Otros_Insumos;
        else q.OtrosInsumos = "";

        if (!row.IsdiagnosticoidNull())
            q.diagnostico_id = row.diagnosticoid;

        if (!row.IsurgenciaNull())
            q.urgencia = row.urgencia;
        else
            q.urgencia = false;

        if (!row.IssalaidNull())
            q.sala_id = row.salaid;

        if (!row.IscamaidNull())
            q.cama_id = row.camaid;

        if (!row.IscirugiaidNull())
            q.cirugia_tipo_id = row.cirugiaid;

        if (!row.Iscirujano_especialidad_idNull())
            q.cirujano_especialidad_id = row.cirujano_especialidad_id;

        if (!row.Iscirujano_idNull())
            q.cirujano_id = row.cirujano_id;

        if (!row.Isayudante_idNull())
            q.ayudante_id = row.ayudante_id;

        if (!row.Isanestesista_idNull())
            q.anestesista_id = row.anestesista_id;

        if (!row.Isanestesia_tipoNull())
            q.anestesia_tipo_id = row.anestesia_tipo;

        if (!row.IshemoNull())
            q.hemo = row.hemo;

        if (!row.Iscbo_hemoNull())
            q.cbo_hemo = row.cbo_hemo;

        if (!row.Iscbo_anpaNull())
            q.cbo_anpa = row.cbo_anpa;

        if (!row.Iscbo_monitoreoNull())
            q.cbo_monitoreo = row.cbo_monitoreo;

        if (!row.Ismed_solicitante_idNull())
            q.medico_solicitante = row.med_solicitante_id;

        if (!row.IsobservacionesNull())
            q.observaciones = row.observaciones;

        if (!row.Ismotivo_susp_idNull())
            q.motivo_susp_id = row.motivo_susp_id;

        if (!row.IsbajaNull())
            q.baja = row.baja;

        if (!row.Isquienlodeiodebaja_idNull())
            q.quien_dio_baja_id = row.quienlodeiodebaja_id;

        if (!row.Isayudante2Null())
            q.ayudante2_id = row.ayudante2;

        if (!row.Isayudante3Null())
            q.ayudante3_id = row.ayudante3;

        if (!row.IshorafinNull())
            q.hora_fin = row.horafin.ToString();

        if (!row.IsefectuadaNull())
            if (row.efectuada)
                q.efectuada = true;
            else
                q.efectuada = false;
        else
            q.efectuada = false;
        if (!row.Iscirculante_idNull())
            q.Circulante_id = row.circulante_id;
        if (!row.Ismonitoreo_idNull())
            q.Monitoreo_id = row.monitoreo_id;
        if (!row.Isusuario_id_modifNull())
            q.usuario_id_modificacion = row.usuario_id_modif;
        if (!row.Ismotivo_modificacionNull())
            q.motivo_modificacion = row.motivo_modificacion;

        if (!row.Isinstrumentalista_idNull())
            q.Instrumentalista_Id = row.instrumentalista_id;
        if (!row.Iscbo_rayosNull())
            q.cbo_rayos = row.cbo_rayos;
        if (!row.IsusuarioNull())
            q.usuario_modificacion = row.usuario;

        if (!row.Isexterno_medico_matriculaNull()) q.externo_medico_matricula = row.externo_medico_matricula;
        if (!row.Isexterno_medicoNull()) q.externo_medico = row.externo_medico;

        //if (!row.IsINGRESO_UCPA_PRENull()) q.hora_ingreso_UCPA_pre = row.INGRESO_UCPA_PRE;
        //if (!row.IsINGRESO_UCPA_POSTNull()) q.hora_ingreso_UCPA_post = row.INGRESO_UCPA_POST;

        if (!row.IsTURNO_HORA_INICIONull()) q.hora_inicio = row.TURNO_HORA_INICIO;
        if (!row.IsTURNO_HORA_FINNull()) q.hora_fin = row.TURNO_HORA_FIN;

        if (!row.IsPesoNull()) q.peso = row.Peso;

        if (!row.Isck_cirugias_idNull()) q.cirugias_ck = row.ck_cirugias_id;
        if (!row.Isck_diagnosticos_idNull()) q.diagnosticos_ck = row.ck_diagnosticos_id;

        return q;

    }

    public void Hemodinamia_Protocolos_Guardar(Hemodinamia_Protocolos q, Int32 UsuarioId)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Hemodinamia_Protocolos_Guardar(q.Cirugia_Id, q.Descripcion_Esquema, q.Descripcion_Macro, q.Biopsia, q.Biopsia_Detalle, q.Diagnostico_PostOperatorio_Id, UsuarioId, q.observaciones);
    }

    internal Protocolo_Hemodinamia_Info Protocolos_Cirugia_Info(long CirugiaId)
    {
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Protocolos_Info_CirugiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Protocolos_Info_CirugiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Protocolos_Info_CirugiaDataTable aTable = adapter.GetData(CirugiaId);
        HemodinamiaDAL.H2_Hemodinamia_Protocolos_Info_CirugiaRow row = aTable[0];

        Protocolo_Hemodinamia_Info i = new Protocolo_Hemodinamia_Info();
        if (!row.IsAnestesistaNull()) i.Anestesista = row.Anestesista;
        if (!row.IsAyudante1Null()) i.Ayudante1 = row.Ayudante1;
        if (!row.IsAyudante2Null()) i.Ayudante2 = row.Ayudante2;
        if (!row.IsAyudante3Null()) i.Ayudante3 = row.Ayudante3;
        if (!row.IsCirujanoNull()) i.Cirujano = row.Cirujano;
        //if (!row.IsDiagnosticoNull()) i.Diagnostico = row.Diagnostico;
        if (!row.IsEspecialidadNull()) i.Especialidad = row.Especialidad;

        if (!row.IsH_FinNull()) i.Hora_Fin = row.H_Fin.ToString();
        if (!row.IsH_InicioNull()) i.Hora_Inicio = row.H_Inicio.ToString();

        if (!row.IsInstrumentNull()) i.Instrument = row.Instrument;
        if (!row.IsMonitoreoNull()) i.Monitoreo = row.Monitoreo;
        if (!row.IsNHCNull()) i.nhc = row.NHC.ToString();
        if (!row.IsFechaNull()) i.Fecha = row.Fecha.ToShortDateString();
        if (!row.IsCirugiaNull()) i.Cirugia = row.Cirugia;
        if (!row.IsDiagnosticoIdNull()) i.Diagnostico_Id = row.DiagnosticoId;
        if (!row.Isck_diagnosticosNull()) i.Diagnostico = row.ck_diagnosticos;

        return i;
    }

    public List<Hemodinamia_Diagnostico> DiagnosticoDiagnostico_Planificar_Hemodinamia(int? id, bool estado, int Cirugia_id)
    {
        List<Hemodinamia_Diagnostico> lista = new List<Hemodinamia_Diagnostico>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(id, estado, Cirugia_id);

        foreach (HemodinamiaDAL.H2_Hemodinamia_Diagnostico_Lista_Planificar_CirugiaRow row in aTable.Rows)
        {
            lista.Add(CreardeRowDiagnostico_Planificar_Hemodinamia(row));
        }

        return lista;
    }


    public Hemodinamia_Protocolos ListByCirugiaId(int CirugiaId)
    {
        Hemodinamia_Protocolos q = new Hemodinamia_Protocolos();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Protocolos_Protocolos_ListTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Protocolos_Protocolos_ListTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Protocolos_Protocolos_ListDataTable aTable = adapter.GetData(CirugiaId);
        foreach (HemodinamiaDAL.H2_Hemodinamia_Protocolos_Protocolos_ListRow row in aTable.Rows)
        {
            q = CreateRowFromProtocolos(row);
        }
        return q;
    }

    private Hemodinamia_Protocolos CreateRowFromProtocolos(HemodinamiaDAL.H2_Hemodinamia_Protocolos_Protocolos_ListRow row)
    {
        Hemodinamia_Protocolos q = new Hemodinamia_Protocolos();
        q.Id = row.Id;
        if (!row.IsBiopsiaNull()) q.Biopsia = row.Biopsia;
        if (!row.IsBiopsia_DetalleNull()) q.Biopsia_Detalle = row.Biopsia_Detalle;
        q.Cirugia_Id = row.Cirugia_Id;
        if (!row.IsDescripcion_EsquemaNull()) q.Descripcion_Esquema = row.Descripcion_Esquema;
        if (!row.IsDescripcion_MacroNull()) q.Descripcion_Macro = row.Descripcion_Macro;
        if (!row.IsDiagnostico_PostOperario_IdNull()) q.Diagnostico_PostOperatorio_Id = row.Diagnostico_PostOperario_Id;
        if (!row.IsUsuario_IdNull()) q.usuario_id = row.Usuario_Id;
        if (!row.IsUsuarioNull()) q.usuario = row.Usuario;
        if (!row.IsObservacionNull()) q.observaciones = row.Observacion;
        return q;
    }

    public string Cirugia_Tipo_x_CirugiaId(long Id)
    {
        string Cirugias = "";
        HemodinamiaDALTableAdapters.H3_Hemodinamia_Cirugia_x_CirugiaIdTableAdapter adapter = new HemodinamiaDALTableAdapters.H3_Hemodinamia_Cirugia_x_CirugiaIdTableAdapter();
        HemodinamiaDAL.H3_Hemodinamia_Cirugia_x_CirugiaIdDataTable aTable = adapter.GetData(Id);
        if (aTable.Count > 0)
        {
            Cirugias = aTable[0].Cirugia;
        }

        return Cirugias;
    }

    public List<Hemodinamia_PreAnes_Enc> ListPreAnes_Enc(int Id)
    {
        List<Hemodinamia_PreAnes_Enc> list = new List<Hemodinamia_PreAnes_Enc>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_PreAnes_EncabezadoTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_PreAnes_EncabezadoTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_PreAnes_EncabezadoDataTable aTable = adapter.GetData(Id);
        foreach (HemodinamiaDAL.H2_Hemodinamia_PreAnes_EncabezadoRow row in aTable.Rows)
        {
            list.Add(CreateFromRowPreAnes_Enc(row));
        }
        return list;
    }

    private Hemodinamia_PreAnes_Enc CreateFromRowPreAnes_Enc(HemodinamiaDAL.H2_Hemodinamia_PreAnes_EncabezadoRow row)
    {
        Hemodinamia_PreAnes_Enc q = new Hemodinamia_PreAnes_Enc();
        if (!row.IsAnestesiaNull())
            q.Anestesia = row.Anestesia;
        if (!row.Isanestesia_tipoNull())
            q.AnestesiaId = row.anestesia_tipo;
        if (!row.IsApellidoYNombreNull())
            q.Anestesista = row.ApellidoYNombre;
        if (!row.Isanestesista_idNull())
            q.AnestesistaId = row.anestesista_id;
        if (!row.IsDescripcionNull())
            q.Cama = row.Descripcion;
        if (!row.IscamaidNull())
            q.CamaId = row.camaid;
        if (!row.IsDiagnosticoNull())
            q.Diagnostico = row.Diagnostico;
        if (!row.IsdiagnosticoidNull())
            q.DiagnosticoId = row.diagnosticoid;
        if (!row.IsfechaNull())
            q.Fecha = row.fecha.ToShortDateString();
        q.Id = row.id;
        if (!row.IsnhcNull())
            q.NHC = row.gente_NHC;
        q.Paciente_Id = row.nhc;
        if (!row.IsobservacionesNull())
            q.Observaciones = row.observaciones;
        q.Paciente = row.Paciente;

        if (!row.IsurgenciaNull()) q.Urgencia = row.urgencia;

        if (!row.IsCirujanoNull()) q.Cirujano = row.Cirujano;
        if (!row.IsCirugiaNull()) q.Cirugia = row.Cirugia;
        if (!row.IsMonitoreoNull()) { if (row.Monitoreo == true) { q.Monitoreo = "SI"; } else { q.Monitoreo = "NO"; } } else { q.Monitoreo = "NO"; }

        return q;
    }

    public int Guardar_Pre_Anestesico(PreQuirurgico p, int cirugia, int usuario)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H3_Hemodinamia_Actualizar_Peso(p.Peso, cirugia);
        object id = adapter.H2_Hemodinamia_Guardar_PreAnestesico(p.PRE_HORA_INGRESO, p.PRE_AYUNO, p.PRE_OBS_1, p.PRE_HS_UCPA_INGRESO_Q, p.PRE_ING_VENOCLISIS, p.PRE_ANTITETANICA_DOSIS, p.PRE_BANIO_PRE_QX, p.PRE_PROFILAXIS_ATB, p.PRE_OBS_2, p.PRE_PROTESIS_DENTARIA, p.PRE_OBS_3, p.PRE_RIESGO_Q_FECHA, p.PRE_TIPO, p.PRE_CONTROL_SIGNOS_VITALES_TA, p.PRE_CONTROL_SIGNOS_VITALES_FC, p.PRE_CONTROL_SIGNOS_VITALES_FR, p.PRE_CONTROL_SIGNOS_VITALES_TEMP, p.PRE_CONTROL_SIGNOS_VITALES_SPO2, p.PRE_OBS_4, p.PRE_LABORATORIO_FECHA, p.PRE_LABORATORIO_HTO, p.PRE_LABORATORIO_HB, p.PRE_LABORATORIO_PLAQUETAS, p.PRE_LABORATORIO_KPTT, p.PRE_LABORATORIO_QUICK, p.PRE_LABORATORIO_GLUCEMIA, p.PRE_ANTECEDENTES_HTA, p.PRE_ANTECEDENTES_DBT, p.PRE_ANTECEDENTES_ENF_RESPIRATORIAS, p.PRE_ANTECEDENTES_ENF_CARDIACAS, p.PRE_OBS_5, p.PRE_OBS_6, cirugia, usuario, p.PRE_UNIDAD_SANGRE, p.PRE_PEDIDO_SANGRE, p.PRE_GRUPO, p.PRE_FACTOR, p.PRE_MONITOREO, p.enfermero);
        try
        {
            return cirugia;
        }
        catch
        {
            return 0;
        }
    }

    public PreQuirurgico Cargar_Pre_Anestesico(int id)
    {
        PreQuirurgico q = new PreQuirurgico();

        HemodinamiaDALTableAdapters.H2_Hemodinamia_Pre_Anestesia_CargarTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Pre_Anestesia_CargarTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Pre_Anestesia_CargarDataTable aTable = adapter.GetData(id);

        if (aTable.Rows.Count > 0)
        {
            HemodinamiaDAL.H2_Hemodinamia_Pre_Anestesia_CargarRow row = aTable[0];

            if (!row.IsPRE_IDNull())
            {
                q.id = row.PRE_ID;
                if (!row.IsPRE_HORA_INGRESONull()) q.PRE_HORA_INGRESO = row.PRE_HORA_INGRESO;
                if (!row.IsPRE_AYUNONull()) q.PRE_AYUNO = row.PRE_AYUNO;
                if (!row.IsPRE_OBS_1Null()) q.PRE_OBS_1 = row.PRE_OBS_1;
                if (!row.IsPRE_HS_UCPA_INGRESO_QNull()) q.PRE_HS_UCPA_INGRESO_Q = row.PRE_HS_UCPA_INGRESO_Q;
                if (!row.IsPRE_ING_VENOCLISISNull()) q.PRE_ING_VENOCLISIS = row.PRE_ING_VENOCLISIS;
                if (!row.IsPRE_ANTITETANICA_DOSISNull()) q.PRE_ANTITETANICA_DOSIS = row.PRE_ANTITETANICA_DOSIS; else q.PRE_ANTITETANICA_DOSIS = -1;
                if (!row.IsPRE_BANIO_PRE_QXNull()) q.PRE_BANIO_PRE_QX = row.PRE_BANIO_PRE_QX;
                if (!row.IsPRE_PROFILAXIS_ATBNull()) q.PRE_PROFILAXIS_ATB = row.PRE_PROFILAXIS_ATB;
                if (!row.IsPRE_OBS_2Null()) q.PRE_OBS_2 = row.PRE_OBS_2;
                if (!row.IsPRE_PROTESIS_DENTARIANull()) q.PRE_PROTESIS_DENTARIA = row.PRE_PROTESIS_DENTARIA;
                if (!row.IsPRE_OBS_3Null()) q.PRE_OBS_3 = row.PRE_OBS_3;
                if (!row.IsPRE_RIESGO_Q_FECHANull()) q.PRE_RIESGO_Q_FECHA = row.PRE_RIESGO_Q_FECHA;
                if (!row.IsPRE_TIPO_HABITUALNull()) q.PRE_TIPO = row.PRE_TIPO_HABITUAL;
                if (!row.IsPRE_CONTROL_SIGNOS_VITALES_TANull()) q.PRE_CONTROL_SIGNOS_VITALES_TA = row.PRE_CONTROL_SIGNOS_VITALES_TA;
                if (!row.IsPRE_CONTROL_SIGNOS_VITALES_FCNull()) q.PRE_CONTROL_SIGNOS_VITALES_FC = row.PRE_CONTROL_SIGNOS_VITALES_FC;
                if (!row.IsPRE_CONTROL_SIGNOS_VITALES_FRNull()) q.PRE_CONTROL_SIGNOS_VITALES_FR = row.PRE_CONTROL_SIGNOS_VITALES_FR;
                if (!row.IsPRE_CONTROL_SIGNOS_VITALES_TEMPNull()) q.PRE_CONTROL_SIGNOS_VITALES_TEMP = row.PRE_CONTROL_SIGNOS_VITALES_TEMP;
                if (!row.IsPRE_CONTROL_SIGNOS_VITALES_SPO2Null()) q.PRE_CONTROL_SIGNOS_VITALES_SPO2 = row.PRE_CONTROL_SIGNOS_VITALES_SPO2;
                if (!row.IsPRE_OBS_4Null()) q.PRE_OBS_4 = row.PRE_OBS_4;
                if (!row.IsPRE_LABORATORIO_FECHANull()) q.PRE_LABORATORIO_FECHA = row.PRE_LABORATORIO_FECHA;
                if (!row.IsPRE_LABORATORIO_HTONull()) q.PRE_LABORATORIO_HTO = row.PRE_LABORATORIO_HTO;
                if (!row.IsPRE_LABORATORIO_HBNull()) q.PRE_LABORATORIO_HB = row.PRE_LABORATORIO_HB;
                if (!row.IsPRE_LABORATORIO_PLAQUETASNull()) q.PRE_LABORATORIO_PLAQUETAS = row.PRE_LABORATORIO_PLAQUETAS;
                if (!row.IsPRE_LABORATORIO_KPTTNull()) q.PRE_LABORATORIO_KPTT = row.PRE_LABORATORIO_KPTT;
                if (!row.IsPRE_LABORATORIO_QUICKNull()) q.PRE_LABORATORIO_QUICK = row.PRE_LABORATORIO_QUICK;
                if (!row.IsPRE_LABORATORIO_GLUCEMIANull()) q.PRE_LABORATORIO_GLUCEMIA = row.PRE_LABORATORIO_GLUCEMIA;
                if (!row.IsPRE_ANTECEDENTES_HTANull()) q.PRE_ANTECEDENTES_HTA = row.PRE_ANTECEDENTES_HTA;
                if (!row.IsPRE_ANTECEDENTES_DBTNull()) q.PRE_ANTECEDENTES_DBT = row.PRE_ANTECEDENTES_DBT;
                if (!row.IsPRE_ANTECEDENTES_ENF_RESPIRATORIASNull()) q.PRE_ANTECEDENTES_ENF_RESPIRATORIAS = row.PRE_ANTECEDENTES_ENF_RESPIRATORIAS;
                if (!row.IsPRE_ANTECEDENTES_ENF_CARDIACASNull()) q.PRE_ANTECEDENTES_ENF_CARDIACAS = row.PRE_ANTECEDENTES_ENF_CARDIACAS;
                if (!row.IsPRE_OBS_5Null()) q.PRE_OBS_5 = row.PRE_OBS_5;
                if (!row.IsPRE_OBS_6Null()) q.PRE_OBS_6 = row.PRE_OBS_6;
                if (!row.IsQUI_CIR_IDNull()) q.QUI_CIR_ID = row.QUI_CIR_ID;
                if (!row.IsPRE_USUARIO_IDNull()) q.PRE_USUARIO_ID = row.PRE_USUARIO_ID;
                if (!row.IsPRE_FECHA_IMPRESIONNull()) q.PRE_FECHA_IMPRESION = row.PRE_FECHA_IMPRESION.ToString();
                if (!row.IspesoNull()) q.Peso = row.peso;
                if (!row.IsPRE_UNIDAD_SANGRENull()) q.PRE_UNIDAD_SANGRE = row.PRE_UNIDAD_SANGRE;
                if (!row.IsPRE_PEDIDO_SANGRENull()) q.PRE_PEDIDO_SANGRE = row.PRE_PEDIDO_SANGRE;
                if (!row.IsPRE_GRUPONull()) q.PRE_GRUPO = row.PRE_GRUPO;
                if (!row.IsPRE_FACTORNull()) q.PRE_FACTOR = row.PRE_FACTOR;
                if (!row.IsPRE_MONITOREONull()) q.PRE_MONITOREO = row.PRE_MONITOREO; else q.PRE_MONITOREO = false;
                if (!row.Ispedido_sangre_turnoNull())
                {
                    if (row.pedido_sangre_turno == "1")
                    {
                        q.pedido_sangre_turno = true; ;
                    }
                    else
                    {
                        q.pedido_sangre_turno = false;
                    }

                }
                else
                {
                    q.pedido_sangre_turno = false;
                }
            }
            else
            {
                if (!row.IspesoNull()) q.Peso = row.peso;
            }

            if (!row.IsenfermeroNull()) q.enfermero = row.enfermero;
        }


        return q;
    }

    public List<Insumo_PRE_Anestesia_Listado> Listar_Insumos_PreAnestesia(long CirugiaID)
    {
        List<Insumo_PRE_Anestesia_Listado> Lista = new List<Insumo_PRE_Anestesia_Listado>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_ListarInsumos_PreAnestesiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_ListarInsumos_PreAnestesiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_ListarInsumos_PreAnestesiaDataTable aTable = adapter.GetData(CirugiaID);

        foreach (HemodinamiaDAL.H2_Hemodinamia_ListarInsumos_PreAnestesiaRow row in aTable)
        {
            Insumo_PRE_Anestesia_Listado insu = new Insumo_PRE_Anestesia_Listado();
            insu.Cantidad = row.CANTIDAD.ToString();
            if (!row.IsINSUMONull()) { insu.Insumo = row.INSUMO; }
            if (!row.IsOBSERVACIONESNull()) { insu.Observacion = row.OBSERVACIONES; }
            Lista.Add(insu);
        }

        return Lista;
    }

    public List<usuarios> cargarEnfermeros()
    {
        HemodinamiaDALTableAdapters.H2_Cargar_Enfermeros_HemodinamiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Cargar_Enfermeros_HemodinamiaTableAdapter();
        HemodinamiaDAL.H2_Cargar_Enfermeros_HemodinamiaDataTable aTable = adapter.GetData();
        List<usuarios> l = new List<usuarios>();
        foreach (HemodinamiaDAL.H2_Cargar_Enfermeros_HemodinamiaRow row in aTable)
        {
            usuarios u = new usuarios();
            u.id = row.id;
            u.usuario = row.usuario;
            l.Add(u);
        }
        return l;
    }
    public void Delete_Hemodinamia_InsumosbyIdOperacion(long IdOperacion, int Tipo)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Delete_InsumobyIdOperacion_Hemodinamia(IdOperacion, Tipo);
    }

    public void Insert_Insumos_Hemodinamia(long IdOperacion, int IdInsumo, int Cantidad, string Obs, int Monodroga, int Tipo)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_INSERT_HEMODINAMIA_INSUMOS(IdOperacion, IdInsumo, Cantidad, Obs, Monodroga, Tipo);
    }

    public void Insert_Plantilla_Servicios(int IdPlantilla, int IdInsumo, int IdServicio, int Cantidad, int Tipo)
    {
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_HEMODINAMIA_INSERT_PLANTILLA_SERVICIOS(IdPlantilla, IdInsumo, IdServicio, Cantidad, Tipo);
    }

    public List<Insumo> Select_Plantilla_by_Rubro_Cargado_pos(int Id_Planilla)
    {
        List<Insumo> list = new List<Insumo>();
        HemodinamiaDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POS_HEMODINAMIATableAdapter adapter = new HemodinamiaDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POS_HEMODINAMIATableAdapter();
        HemodinamiaDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POS_HEMODINAMIADataTable aTable = adapter.GetData(Id_Planilla);
        foreach (HemodinamiaDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POS_HEMODINAMIARow row in aTable.Rows)
        {
            Insumo aInsumo = ReadInsumoForPlantilla_POS(row);
            list.Add(aInsumo);
        }
        return list;
    }

    private Insumo ReadInsumoForPlantilla_POS(HemodinamiaDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POS_HEMODINAMIARow row)
    {
        Insumo aInsumo = new Insumo();
        aInsumo.Id = row.ID_INSUMO;
        if (!row.IsREM_NOMBRENull())
            aInsumo.Descripcion = row.REM_NOMBRE;

        if (!row.IsCANTIDADNull())
            aInsumo.Cantidad = row.CANTIDAD;
        else aInsumo.Cantidad = 0;

        if (!row.IsTIPONull()) aInsumo.Monodroga = row.TIPO;
        if (!row.IsPRESENTACIONNull()) aInsumo.Presentacion = row.PRESENTACION; else aInsumo.Presentacion = string.Empty;
        if (!row.IsMEDIDANull()) aInsumo.Medida = row.MEDIDA; else aInsumo.Medida = string.Empty;
        if (!row.IsGRAMEJENull()) aInsumo.Gramaje = row.GRAMEJE; else aInsumo.Gramaje = string.Empty;
        if (!row.IsPLANTILLANull()) aInsumo.Plantilla = row.PLANTILLA; else aInsumo.Plantilla = 0;
        if (!row.IsOBSERVACIONESNull()) aInsumo.Observacion = row.OBSERVACIONES; else aInsumo.Observacion = "";

        return aInsumo;
    }

    public List<Insumo> H2_HEMODINAMIA_LISTAR_INSUMOS(string Insumo)
    {
        List<Insumo> list = new List<Insumo>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_LISTAR_INSUMOSTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_LISTAR_INSUMOSTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_LISTAR_INSUMOSDataTable aTable = adapter.GetData(Insumo);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_LISTAR_INSUMOSRow row in aTable.Rows)
        {

            Insumo aInsumo = new Insumo();
            aInsumo.Id = row.REM_ID;
            if (!row.IsREM_NOMBRENull())
                aInsumo.Descripcion = row.REM_NOMBRE;

            if (!row.IsREM_RUBRONull()) aInsumo.Rubro = row.REM_RUBRO;
            if (!row.IsPRESENTACIONNull()) aInsumo.Presentacion = row.PRESENTACION; else aInsumo.Presentacion = string.Empty;
            if (!row.IsMEDIDANull()) aInsumo.Medida = row.MEDIDA; else aInsumo.Medida = string.Empty;
            if (!row.IsGRAMEJENull()) aInsumo.Gramaje = row.GRAMEJE; else aInsumo.Gramaje = string.Empty;
            if (!row.IsPLANTILLANull()) aInsumo.Plantilla = row.PLANTILLA; else aInsumo.Plantilla = 0;

            list.Add(aInsumo);
        }
        return list;
    }

    public List<Insumo> Cargar_Plantilla_Cargado(long Cirugia_Id, int Tipo)
    {
        //Tipo 1: Pre
        //Tipo 2: Durante
        //Tipo 3: Post

        List<Insumo> list = new List<Insumo>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMOS_PLANTILLA_CARGARTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_INSUMOS_PLANTILLA_CARGARTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_INSUMOS_PLANTILLA_CARGARDataTable aTable = adapter.GetData(Cirugia_Id, Tipo);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_INSUMOS_PLANTILLA_CARGARRow row in aTable.Rows)
        {

            Insumo aInsumo = new Insumo();
            aInsumo.Id = row.ID_INSUMO;
            if (!row.IsREM_NOMBRENull())
                aInsumo.Descripcion = row.REM_NOMBRE;

            if (!row.IsCANTIDADNull())
                aInsumo.Cantidad = row.CANTIDAD;
            else aInsumo.Cantidad = 0;

            if (!row.IsREM_RUBRONull()) aInsumo.Rubro = row.REM_RUBRO;
            if (!row.IsPRESENTACIONNull()) aInsumo.Presentacion = row.PRESENTACION; else aInsumo.Presentacion = string.Empty;
            if (!row.IsMEDIDANull()) aInsumo.Medida = row.MEDIDA; else aInsumo.Medida = string.Empty;
            if (!row.IsGRAMEJENull()) aInsumo.Gramaje = row.GRAMEJE; else aInsumo.Gramaje = string.Empty;
            if (!row.IsPLANTILLANull()) aInsumo.Plantilla = row.PLANTILLA; else aInsumo.Plantilla = 0;
            if (!row.IsOBSERVACIONESNull()) aInsumo.Observacion = row.OBSERVACIONES; else aInsumo.Observacion = "";

            list.Add(aInsumo);
        }
        return list;
    }


    public void H2_HEMODINAMIA_POST_GUARDAR(Post_Gral cg, List<Post_csv> l_csv, List<Post_Monitoreo> l_pm)
    {
        long id = 0;
        HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
        object ob = adapter.H2_HEMODINAMIA_POST_CABECERA_GUARDAR(cg.cirugia_id, cg.txt_sol_fisiologica, cg.txt_dextrosa, cg.txt_ringer_lactato, cg.txt_expansor_plasmatico, cg.txt_observaciones, cg.eliminado, cg.txt_hora_fin, cg.txt_hora_ingreso, cg.sondas_nasogastrica, cg.sondas_vesical, cg.cant_sondas, cg.enfermero);
        try
        {
            id = Convert.ToInt64(ob);

            foreach (Post_csv csv in l_csv)
            {
                adapter.H2_HEMODINAMIA_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_GUARDAR(csv.id, csv.txt_TA, csv.txt_FC, csv.txt_FR, csv.txt_TEMP, csv.txt_SPO2, csv.txt_hora, id, csv.eliminado);
            }

            foreach (Post_Monitoreo pm in l_pm)
            {
                adapter.H2_HEMODINAMIA_POST_CABECERA_DETALLE_MONITOREO_GUARDAR(pm.id, pm.txt_sato2, pm.txt_hto, pm.txt_hb, pm.txt_ph, pm.txt_po2, pm.txt_pco2, pm.txt_quick, pm.txt_hco3, pm.txt_na, pm.txt_cl, pm.txt_k, pm.txt_kptt, pm.txt_sat, pm.txt_eb, pm.txt_hora2, id, pm.eliminado);
            }

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }

    public Post_Gral H2_HEMODINAMIA_POST_CARGAR(long Cirugia_Id)
    {
        Post_Gral cargado = new Post_Gral();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_POST_CABECERA_CARGARTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_POST_CABECERA_CARGARTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_POST_CABECERA_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_POST_CABECERA_CARGARRow row in aTable.Rows)
        {
            cargado.cirugia_id = Cirugia_Id;
            if (!row.IsQPC_DEXTROSANull()) cargado.txt_dextrosa = row.QPC_DEXTROSA;
            if (!row.IsQPC_EXPANSORNull()) cargado.txt_expansor_plasmatico = row.QPC_EXPANSOR;
            if (!row.IsQPC_OBSERVACIONNull()) cargado.txt_observaciones = row.QPC_OBSERVACION;
            if (!row.IsQPC_RINGERNull()) cargado.txt_ringer_lactato = row.QPC_RINGER;
            if (!row.IsQPC_SOL_FISIONull()) cargado.txt_sol_fisiologica = row.QPC_SOL_FISIO;
            if (!row.IshorafinNull()) cargado.txt_hora_fin = row.horafin;
            if (!row.Ishora_inicioNull()) cargado.txt_hora_ingreso = row.hora_inicio;

            if (!row.IsQPC_SONDA_GASOGASTRICANull()) cargado.sondas_nasogastrica = row.QPC_SONDA_GASOGASTRICA;
            if (!row.IsQPC_SONDA_VESICALNull()) cargado.sondas_vesical = row.QPC_SONDA_VESICAL;
            if (!row.IsQPC_CANT_SONDASNull()) cargado.cant_sondas = row.QPC_CANT_SONDAS; else cargado.cant_sondas = 0;
            if (!row.IsenfermeroNull()) cargado.enfermero = row.enfermero;
        }

        return cargado;
    }

    public List<Post_Monitoreo> H2_HEMODINAMIA_POST_MONITOREO_CARGAR(long Cirugia_Id)
    {
        List<Post_Monitoreo> lista = new List<Post_Monitoreo>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_POST_CABECERA_DETALLE_MONITOREO_CARGARTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_POST_CABECERA_DETALLE_MONITOREO_CARGARTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_POST_CABECERA_DETALLE_MONITOREO_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_POST_CABECERA_DETALLE_MONITOREO_CARGARRow row in aTable.Rows)
        {
            Post_Monitoreo cargado = new Post_Monitoreo();
            if (!row.IsQPCM_ELIMINADONull()) cargado.eliminado = row.QPCM_ELIMINADO;
            cargado.id = row.QPCM_ID;
            if (!row.IsQPCM_CLNull()) cargado.txt_cl = row.QPCM_CL;
            if (!row.IsQPCM_EBNull()) cargado.txt_eb = row.QPCM_EB;
            if (!row.IsQPCM_HBNull()) cargado.txt_hb = row.QPCM_HB;
            if (!row.IsQPCM_HC03Null()) cargado.txt_hco3 = row.QPCM_HC03;
            if (!row.IsQPCM_HORANull()) cargado.txt_hora2 = row.QPCM_HORA;
            if (!row.IsQPCM_HTONull()) cargado.txt_hto = row.QPCM_HTO;
            if (!row.IsQPCM_KNull()) cargado.txt_k = row.QPCM_K;
            if (!row.IsQPCM_KPTTNull()) cargado.txt_kptt = row.QPCM_KPTT;
            if (!row.IsQPCM_NANull()) cargado.txt_na = row.QPCM_NA;
            if (!row.IsQPCM_PC02Null()) cargado.txt_pco2 = row.QPCM_PC02;
            if (!row.IsQPCM_PHNull()) cargado.txt_ph = row.QPCM_PH;
            if (!row.IsQPCM_PO2Null()) cargado.txt_po2 = row.QPCM_PO2;
            if (!row.IsQPCM_QUICKNull()) cargado.txt_quick = row.QPCM_QUICK;
            if (!row.IsQPCM_SATNull()) cargado.txt_sat = row.QPCM_SAT;
            if (!row.IsQPCM_SAT02Null()) cargado.txt_sato2 = row.QPCM_SAT02;

            lista.Add(cargado);
        }

        return lista;
    }


    public List<Post_csv> H2_HEMODINAMIA_POST_SIGNOS_VITALES_CARGAR(long Cirugia_Id)
    {
        List<Post_csv> lista = new List<Post_csv>();
        HemodinamiaDALTableAdapters.H2_HEMODINAMIA_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARTableAdapter();
        HemodinamiaDAL.H2_HEMODINAMIA_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
        foreach (HemodinamiaDAL.H2_HEMODINAMIA_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARRow row in aTable.Rows)
        {
            Post_csv cargado = new Post_csv();
            if (!row.IsQPCCSV_ELIMINADONull()) cargado.eliminado = row.QPCCSV_ELIMINADO;
            cargado.id = row.QPCCSV_ID;
            if (!row.IsQPCCSV_FCNull()) cargado.txt_FC = row.QPCCSV_FC;
            if (!row.IsQPCCSV_FRNull()) cargado.txt_FR = row.QPCCSV_FR;
            if (!row.IsQPCCSV_HORANull()) cargado.txt_hora = row.QPCCSV_HORA;
            if (!row.IsQPCCSV_SPO2Null()) cargado.txt_SPO2 = row.QPCCSV_SPO2;
            if (!row.IsQPCCSV_TANull()) cargado.txt_TA = row.QPCCSV_TA;
            if (!row.IsQPCCSV_TEMPNull()) cargado.txt_TEMP = row.QPCCSV_TEMP;
            lista.Add(cargado);
        }

        return lista;
    }

    public List<diagnostico> HemodinamiaDiagnosticoPlanificarHemodinamia()
    {
        HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_PlanificarHemodinamiaTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_Diagnostico_PlanificarHemodinamiaTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_Diagnostico_PlanificarHemodinamiaDataTable aTable = adapter.GetData(0, true);

        List<diagnostico> l = new List<diagnostico>();
        foreach (HemodinamiaDAL.H2_Hemodinamia_Diagnostico_PlanificarHemodinamiaRow row in aTable)
        {
            diagnostico d = new diagnostico();

            d.id = row.id;
            d.descripcion = row.Diagnostico;
            l.Add(d);
        }
        return l;
    }

    public List<Hemodinamia_Protesis_Cab> Protesis_Lista_CAB(int id)
    {
        List<Hemodinamia_Protesis_Cab> Lista = new List<Hemodinamia_Protesis_Cab>();
        HemodinamiaDALTableAdapters.H2_Hemodinamia_ProtesisyOtros_Lista_CABTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_Hemodinamia_ProtesisyOtros_Lista_CABTableAdapter();
        HemodinamiaDAL.H2_Hemodinamia_ProtesisyOtros_Lista_CABDataTable aTable = adapter.GetData(id);


        foreach (HemodinamiaDAL.H2_Hemodinamia_ProtesisyOtros_Lista_CABRow row in aTable.Rows)
        {
            Lista.Add(CreardeRowProtesisCAB(row));
        }

        return Lista;
    }

    private static Hemodinamia_Protesis_Cab CreardeRowProtesisCAB(HemodinamiaDAL.H2_Hemodinamia_ProtesisyOtros_Lista_CABRow row)
    {
        Hemodinamia_Protesis_Cab q = new Hemodinamia_Protesis_Cab();
        if (!row.IsidNull()) q.id = (int)(row.id);

        if (!row.Ismaterial_uomNull())
            q.material = row.material_uom;

        if (!row.IsservicioNull())
        {
            q.servicio = row.servicio;
            q.servicio_nombre = row.servicio;
        }

        if (!row.IsortopediaNull())
            q.ortopedia = row.ortopedia.ToString();

        if (!row.IsobservacionesNull())
            q.observaciones = row.observaciones;

        if (!row.IsDiagnosticosNull())
            q.diagnostico = row.Diagnosticos;

        return q;
    }

    public IMPRESION_ESTADOS HEMODINAMIA_IMPRESION_LISTADO_ESTADO(int ID)
    {
        try
        {
            IMPRESION_ESTADOS Estado = new IMPRESION_ESTADOS();
            HemodinamiaDALTableAdapters.H2_HEMODINAMIA_IMPRESION_LISTADO_ESTADOTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_HEMODINAMIA_IMPRESION_LISTADO_ESTADOTableAdapter();
            HemodinamiaDAL.H2_HEMODINAMIA_IMPRESION_LISTADO_ESTADODataTable aTable = adapter.GetData(ID);
            foreach (HemodinamiaDAL.H2_HEMODINAMIA_IMPRESION_LISTADO_ESTADORow row in aTable)
            {
                if (!row.IsR28Null()) Estado.R28 = true; else Estado.R28 = false;
                if (!row.IsProtocoloNull()) Estado.Protocolo = true; else Estado.Protocolo = false;
                if (!row.IsPostNull()) Estado.Post = true; else Estado.Post = false;
                if (!row.IsInsumoQXNull()) Estado.InsumoQX = true; else Estado.InsumoQX = false;
                if (!row.IsParteNull()) Estado.Parte = true; else Estado.Parte = false;
                if (!row.IsExtra_vNull()) Estado.Extra_v = true; else Estado.Extra_v = false;
                if (!row.IsExtra_nNull()) Estado.Extra_n = true; else Estado.Extra_n = false;
                if (!row.IsPreNull()) Estado.Pre = true; else Estado.Pre = false;
            }
            return Estado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public bool Guardar_Atencion_Hemodinamia_MedicoExterno_Guardar(AtConsultorioCirugia_CirujanoExterno Medico)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter query = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            query.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_Externo_Guardar(Medico.MedicoId, Medico.MedicoNombre, Medico.MN, Medico.MP);
            return true;
        }
        catch
        {
            return false;
        }
    }


    public List<AtConsultorioCirugia_CirujanoExterno> Guardar_Atencion_Hemodinamia_MedicoExterno_Listar(int MedicoId)
    {
        HemodinamiaDALTableAdapters.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_Externo_ListarTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_Externo_ListarTableAdapter();
        HemodinamiaDAL.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_Externo_ListarDataTable atable = adapter.GetData(MedicoId);

        List<AtConsultorioCirugia_CirujanoExterno> L = new List<AtConsultorioCirugia_CirujanoExterno>();

        foreach (HemodinamiaDAL.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_Externo_ListarRow row in atable.Rows)
        {
            AtConsultorioCirugia_CirujanoExterno m = new AtConsultorioCirugia_CirujanoExterno();

            m.MedicoId = row.MedicoId;
            m.MedicoNombre = row.MedicoNombre;
            if (!row.IsMedicoMNNull()) m.MN = row.MedicoMN; else m.MN = "";
            if (!row.IsMedicoMPNull()) m.MP = row.MedicoMP; else m.MP = "";
            L.Add(m);
        }
        return L;
    }

    public AtConsultorioCirugia_Cirujano AtConsultorioHemodinamiaCargar(long PacienteId)
    {

        HemodinamiaDALTableAdapters.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_CargarTableAdapter adapter = new HemodinamiaDALTableAdapters.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_CargarTableAdapter();
        HemodinamiaDAL.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_CargarDataTable atable = adapter.GetData(PacienteId);

        AtConsultorioCirugia_Cirujano Cirugia = new AtConsultorioCirugia_Cirujano();

        foreach (HemodinamiaDAL.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_CargarRow row in atable.Rows)
        {
            Cirugia.Antitetanica = row.Antitetanica;
            Cirugia.AP = row.AP;
            Cirugia.Etapa = row.Etapa;
            Cirugia.CirujanoExternoId = row.CirujanoExternoId;
            Cirugia.CirujanoId = row.CirujanoId;
            Cirugia.Estudios_Pre = row.Pre;
            Cirugia.Externo = row.PrestadorExterno;
            Cirugia.FechaOptativa = row.Fecha_Optativa;
            Cirugia.Hemoterapia = row.Hemoterapia;
            Cirugia.ICD10_Det_Id = row.ICD10;
            Cirugia.ICD10_Det_Descripcion = row.ICDDescripcion;
            Cirugia.Internacion = row.Internacion;
            Cirugia.MatCirugia = row.MatCirugia;
            Cirugia.Monitoreo = row.Monitoreo;
            Cirugia.Ortopedia = row.Ortopedia;
            Cirugia.Procedimiento = row.Procedimiento;
            Cirugia.Radiologia = row.Rayos;
            Cirugia.Telefono = row.Telefono;
            Cirugia.TorreLap = row.TorreLap;
            Cirugia.Fecha = row.Fecha.ToShortDateString();
            Cirugia.CirujanoNombre = row.CirujanoNombre;
            Cirugia.Microscopio = row.Microscopio;
            if (!row.IsMatCirugia_textoNull()) Cirugia.txt_MatCirugia = row.MatCirugia_texto; else Cirugia.txt_MatCirugia = "";
            if (!row.IsObservacionesNull()) Cirugia.txt_observaciones = row.Observaciones; else Cirugia.txt_observaciones = "";
            if (!row.IsOrtopedia_textoNull()) Cirugia.txt_Ortopedia = row.Ortopedia_texto; else Cirugia.txt_Ortopedia = "";
            if (!row.IsPrestadorExternoNameNull()) Cirugia.PrestadorExternoName = row.PrestadorExternoName; else Cirugia.PrestadorExternoName = "";

            if (!row.IsAnestesiaNull()) Cirugia.Anestesia = row.Anestesia; else Cirugia.Anestesia = 0;
            if (!row.IsHemoterapia_ValorNull()) Cirugia.Hemoterapia_Valor = row.Hemoterapia_Valor; else Cirugia.Hemoterapia_Valor = "";
        }
        return Cirugia;

    }

    public bool Guardar_Atencion_Hemodinamia_Guardar(AtConsultorioCirugia_Cirujano Objeto)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter query = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            query.H2_AtConsultorio_Hemodinamia_Programada_Cirujano_Guardar(Objeto.PacienteId, Objeto.TurnoId, Objeto.InternacionId, Objeto.UsuarioId, Objeto.ICD10_Det_Id, Objeto.Procedimiento, Objeto.CirujanoId, Objeto.Telefono, Objeto.Internacion, Objeto.Hemoterapia, Objeto.AP, Objeto.Monitoreo, Objeto.MatCirugia, Objeto.txt_MatCirugia, Objeto.TorreLap, Objeto.Ortopedia,
                Objeto.txt_Ortopedia, Objeto.Estudios_Pre, Objeto.FechaOptativa, Objeto.Radiologia, Objeto.Antitetanica, Objeto.Externo, Objeto.txt_observaciones, Objeto.CirujanoExternoId, Objeto.PrestadorExternoName, Objeto.Microscopio, Objeto.Anestesia, Objeto.Hemoterapia_Valor);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool AtConsultorio_Hemodinamia_Programada_Reestablecer_Turno(long AfiliadoId, string observacion)
    {
        try
        {
            HemodinamiaDALTableAdapters.QueriesTableAdapter query = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
            query.H2_AtConsultorio_Hemodinamia_Programada_Reestablecer_Turno(AfiliadoId, observacion);
            return true;
        }
        catch
        {
            return false;
        }
    }

}
