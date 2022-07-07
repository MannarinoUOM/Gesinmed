using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for OdontologiaBLL
/// </summary>
public class OdontologiaBLL
{
	public OdontologiaBLL()
	{
		//
		// TODO: Add constructor logic here
		//
	}


    public List<practica> Traer_Nomenclador_Odontologico()
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Nomenclador_OdontologicoTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Nomenclador_OdontologicoTableAdapter();
            OdontologiaDAL.H2_Traer_Nomenclador_OdontologicoDataTable aTable = new OdontologiaDAL.H2_Traer_Nomenclador_OdontologicoDataTable();
            aTable = adapter.GetData();
            List<practica> l = new List<practica>();
            foreach(OdontologiaDAL.H2_Traer_Nomenclador_OdontologicoRow row in aTable.Rows){
                practica obj = new practica();
                obj.codigo = row.Codigo;
                obj.descripcion = row.Descripcion;
                obj.valor = row._822_866;
                obj.talca = row.Talca;
                obj.baja = row.baja;
                if (!row.IsMostrarEnPresupuestoNull()) { obj.MostrarEnPresupuesto = row.MostrarEnPresupuesto; } else { obj.MostrarEnPresupuesto = 1; }
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<procedimeinto> Traer_Procedimientos_Odontologicos()
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Procedimientos_OdontologicosTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Procedimientos_OdontologicosTableAdapter();
            OdontologiaDAL.H2_Traer_Procedimientos_OdontologicosDataTable aTable = new OdontologiaDAL.H2_Traer_Procedimientos_OdontologicosDataTable();
            aTable = adapter.GetData();
            List<procedimeinto> l = new List<procedimeinto>();
            foreach (OdontologiaDAL.H2_Traer_Procedimientos_OdontologicosRow row in aTable.Rows)
            {
                procedimeinto obj = new procedimeinto();
                obj.id = row.id;
                obj.descripcion = row.descripcion;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int Guardar_Odontograma_Cab(List<diente> dientes, List<parte> partes, long TurnoId)
    {
        try
        {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Eliminar_Odontograma(TurnoId);
            foreach (diente diente in dientes) {
                adapter.H2_Guardar_Odontograma_Cab(diente.TurnoId, diente.id, diente.procedimiento);
                foreach (parte part in partes) { if (part.diente == diente.id) { adapter.H2_Guardar_Odontograma_Det(part.TurnoId, part.diente, part.color,part.seccion); } }
            }
            
            return 1;
        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);         
        }
    }


    public List<caras> Traer_Caras_Odontologia()
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Caras_OdontologiaTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Caras_OdontologiaTableAdapter();
            OdontologiaDAL.H2_Traer_Caras_OdontologiaDataTable aTable = new OdontologiaDAL.H2_Traer_Caras_OdontologiaDataTable();
            aTable = adapter.GetData();
            List<caras> l = new List<caras>();
            foreach (OdontologiaDAL.H2_Traer_Caras_OdontologiaRow row in aTable.Rows)
            {
                caras obj = new caras();
                obj.id = row.id;
                obj.descripcion = row.descripcion;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long Traer_Turno_Id_Odontologia(string Fecha, long Medico, long Especialidad, long Afiliado)
    {
        OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
        object obj = adapter.H2_Traer_Turno_Id_Odontologia(Fecha, Medico, Especialidad, Afiliado);
        return Convert.ToInt64(obj);
    }

    public long Guardar_Odontologia_Det(long TurnoId, List<detalle> procedimientos)
    {
        OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Eliminar_Consulta_Odontologica_Det(TurnoId);
         
        object obj = new object(); 
        foreach (detalle item in procedimientos) {
            if (item.eliminado == 0)
            {
                obj = adapter.H2_Guardar_Odontologia_Det(item.id, TurnoId, item.codigo, item.pieza, item.caras, item.observacion);
            }
        }
        if (obj != null) return Convert.ToInt64(obj); else return 1;
    }

    public List<detalle> Traer_Consulta_Del_Dia_Odontologia(long TurnoId)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Consulta_Del_Dia_OdontologiaTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Consulta_Del_Dia_OdontologiaTableAdapter();
            OdontologiaDAL.H2_Traer_Consulta_Del_Dia_OdontologiaDataTable aTable = new OdontologiaDAL.H2_Traer_Consulta_Del_Dia_OdontologiaDataTable();
            aTable = adapter.GetData(TurnoId);
            List<detalle> l = new List<detalle>();
            foreach (OdontologiaDAL.H2_Traer_Consulta_Del_Dia_OdontologiaRow row in aTable.Rows)
            {
                detalle obj = new detalle();
                obj.id = row.id;
                obj.codigo = Convert.ToInt32(row.Codigo);
                obj.practica = row.practica;
                obj.pieza = Convert.ToInt32(row.pieza);
                obj.caras = row.idCaras;
                obj.caraDescripcion = row.caras;
                obj.observacion = row.observacion;
                obj.eliminado = 0;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<detalle> Traer_Consultas_Odontologicas(long AfiliadoId, string fecha, int odonto)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Consultas_OdontologicasTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Consultas_OdontologicasTableAdapter();
            OdontologiaDAL.H2_Traer_Consultas_OdontologicasDataTable aTable = new OdontologiaDAL.H2_Traer_Consultas_OdontologicasDataTable();
            aTable = adapter.GetData(AfiliadoId, fecha,odonto);
            List<detalle> l = new List<detalle>();
            foreach (OdontologiaDAL.H2_Traer_Consultas_OdontologicasRow row in aTable.Rows)
            {
                detalle obj = new detalle();
                obj.fecha = row.fechaTurno.ToString("dd/MM/yyyy HH:mm");
                obj.turnoId = row.Turno_Id;
                obj.odonto = row.odonto;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int Traer_ConsultaG_Odontologia(long AfiliadoId, string fecha, long MedicoId)
    {
        OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
        object obj = new object();
        obj = adapter.H2_Traer_ConsultaG_Odontologia(AfiliadoId, fecha, MedicoId);
        return Convert.ToInt32(obj);
    }

    public int Insertar_ConsultaG_Odontologia(long AfiliadoId, string fecha, long medico)
    {
        OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
        object obj = new object();
        obj = adapter.H2_Insertar_ConsultaG_Odontologia(AfiliadoId, fecha, medico);
        return Convert.ToInt32(obj);
    }

    public int Eliminar_Detalle_Odontologia(long id)
    {
        OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
        object obj = new object();
        obj = adapter.H2_Eliminar_Detalle_Odontologia(id);
        return Convert.ToInt32(obj);
    }



    public List<diente> Traer_Ultimo_Odontograma_Cab(long AfiliadoId)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Ultimo_Odontograma_CabTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Ultimo_Odontograma_CabTableAdapter();
            OdontologiaDAL.H2_Traer_Ultimo_Odontograma_CabDataTable aTable = new OdontologiaDAL.H2_Traer_Ultimo_Odontograma_CabDataTable();
            aTable = adapter.GetData(AfiliadoId);
            List<diente> l = new List<diente>();
            foreach (OdontologiaDAL.H2_Traer_Ultimo_Odontograma_CabRow row in aTable.Rows)
            {
                diente obj = new diente();
                obj.TurnoId = row.TurnoId;
                obj.id = row.pieza;
                obj.procedimiento = row.procedimiento;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<parte> Traer_Ultimo_Odontograma_Det(string TurnosIds)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Ultimo_Odontograma_DetTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Ultimo_Odontograma_DetTableAdapter();
            OdontologiaDAL.H2_Traer_Ultimo_Odontograma_DetDataTable aTable = new OdontologiaDAL.H2_Traer_Ultimo_Odontograma_DetDataTable();
            aTable = adapter.GetData(TurnosIds);
            List<parte> l = new List<parte>();
            foreach (OdontologiaDAL.H2_Traer_Ultimo_Odontograma_DetRow row in aTable.Rows)
            {
                parte obj = new parte();
                obj.TurnoId = row.TurnoId;
                obj.seccion = row.seccion;
                obj.color = row.color;
                obj.diente = row.diente;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {        throw new Exception(ex.Message);
        }
    }

    public List<diente> Traer_Odontograma_Consulta_Cab(long TurnoId)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Odontograma_Consulta_CabTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Odontograma_Consulta_CabTableAdapter();
            OdontologiaDAL.H2_Traer_Odontograma_Consulta_CabDataTable aTable = new OdontologiaDAL.H2_Traer_Odontograma_Consulta_CabDataTable();
            aTable = adapter.GetData(TurnoId);
            List<diente> l = new List<diente>();
            foreach (OdontologiaDAL.H2_Traer_Odontograma_Consulta_CabRow row in aTable.Rows)
            {
                diente obj = new diente();
                obj.TurnoId = row.TurnoId;
                obj.id = row.pieza;
                obj.procedimiento = row.procedimiento;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<parte> Traer_Odontograma_Consulta_Det(long TurnoId)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Odontograma_Consulta_DetTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Odontograma_Consulta_DetTableAdapter();
            OdontologiaDAL.H2_Traer_Odontograma_Consulta_DetDataTable aTable = new OdontologiaDAL.H2_Traer_Odontograma_Consulta_DetDataTable();
            aTable = adapter.GetData(TurnoId);
            List<parte> l = new List<parte>();
            foreach (OdontologiaDAL.H2_Traer_Odontograma_Consulta_DetRow row in aTable.Rows)
            {
                parte obj = new parte();
                obj.TurnoId = row.TurnoId;
                obj.seccion = row.seccion;
                obj.color = row.color;
                obj.diente = row.diente;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<estudiosOdonto> traer_Procedimientos_Presupuesto_Odontologia()
    {
        try
        {
            OdontologiaDALTableAdapters.H2_traer_Procedimientos_Presupuesto_OdontologiaTableAdapter adapter = new OdontologiaDALTableAdapters.H2_traer_Procedimientos_Presupuesto_OdontologiaTableAdapter();
            OdontologiaDAL.H2_traer_Procedimientos_Presupuesto_OdontologiaDataTable aTable = new OdontologiaDAL.H2_traer_Procedimientos_Presupuesto_OdontologiaDataTable();
            aTable = adapter.GetData();
            List<estudiosOdonto> l = new List<estudiosOdonto>();
            foreach (OdontologiaDAL.H2_traer_Procedimientos_Presupuesto_OdontologiaRow row in aTable.Rows)
            {
                estudiosOdonto obj = new estudiosOdonto();
                obj.id = Convert.ToInt32(row.id);
                obj.codigo = Convert.ToInt32(row.id);
                obj.codigoText = row.id.ToString();
                if (!row.IsvalorConfiguradoNull()) { obj.valorConfigurado = row.valorConfigurado; }              
                obj.descripcion = row.descripcion;
                obj.cuotas = row.cuotas;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<estudiosOdonto> Traer_Odontologos()
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_OdontologosTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_OdontologosTableAdapter();
            OdontologiaDAL.H2_Traer_OdontologosDataTable aTable = new OdontologiaDAL.H2_Traer_OdontologosDataTable();
            aTable = adapter.GetData();
            List<estudiosOdonto> l = new List<estudiosOdonto>();
            foreach (OdontologiaDAL.H2_Traer_OdontologosRow row in aTable.Rows)
            {
                estudiosOdonto obj = new estudiosOdonto();
                obj.id = row.id;
                obj.descripcion = row.descripcion;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long Guardar_Orden_Laboratorio_CAB(OrdenLaboraOdonto obj, List<OrdenLaboraOdonto> estudios)
    {
        OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
        object objR = new object();
        objR = adapter.H2_Guardar_Orden_Laboratorio_CAB(obj.id,obj.AfiliadoId,obj.TurnoId,obj.laboratorio,obj.fechaEnvio,obj.fechaEntrega);

        adapter.H2_Eliminar_Orden_Laboratorio_DET(Convert.ToInt64(objR));

        foreach (OrdenLaboraOdonto item in estudios) { adapter.H2_Guardar_Orden_Laboratorio_DET(Convert.ToInt64(objR), item.estudio); }

        return Convert.ToInt64(objR);
    }

    public List<OrdenLaboraOdonto> H2_Traer_Orden_Laboratorio_CAB(long AfiliadoId, int tipo, long id)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Orden_Laboratorio_CABTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Orden_Laboratorio_CABTableAdapter();
            OdontologiaDAL.H2_Traer_Orden_Laboratorio_CABDataTable aTable = new OdontologiaDAL.H2_Traer_Orden_Laboratorio_CABDataTable();
            aTable = adapter.GetData(AfiliadoId, tipo,id);
            List<OrdenLaboraOdonto> l = new List<OrdenLaboraOdonto>();

            if (tipo == 1)
            {
                foreach (OdontologiaDAL.H2_Traer_Orden_Laboratorio_CABRow row in aTable.Rows)
                {
                    OrdenLaboraOdonto obj = new OrdenLaboraOdonto();
                    obj.id = row.id;
                    obj.AfiliadoId = row.AfiliadoId;
                    obj.TurnoId = row.TurnoId;
                    obj.fechaGuardado = row.fechaGuardado.ToShortDateString();
                    obj.laboratorio = row.laboratorio;
                    obj.fechaEnvio = row.fechaEnvio;
                    obj.fechaEntrega = row.fechaEntrega;
                    l.Add(obj);
                }
            }

            if (tipo == 2)
            {
                foreach (OdontologiaDAL.H2_Traer_Orden_Laboratorio_CABRow row in aTable.Rows)
                {
                    OrdenLaboraOdonto obj = new OrdenLaboraOdonto();
                    obj.id = row.id;
                    obj.AfiliadoId = row.AfiliadoId;
                    obj.TurnoId = row.TurnoId;
                    obj.fechaGuardado = row.fechaGuardado.ToShortDateString();
                    obj.laboratorio = row.laboratorio;
                    obj.fechaEnvio = row.fechaEnvio;
                    obj.fechaEntrega = row.fechaEntrega;
                    obj.idDET = row.id1;

                    if (!row.IsestudioNull())
                    {
                        obj.estudio = row.estudio;
                    }
                    else { obj.estudio = ""; }

                    l.Add(obj);
                }
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<LaboratoiosOdonto> Traer_Laboratorios_Odontologia()
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Laboratorios_OdontologiaTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Laboratorios_OdontologiaTableAdapter();
            OdontologiaDAL.H2_Traer_Laboratorios_OdontologiaDataTable aTable = new OdontologiaDAL.H2_Traer_Laboratorios_OdontologiaDataTable();
            aTable = adapter.GetData();
            List<LaboratoiosOdonto> l = new List<LaboratoiosOdonto>();
            foreach (OdontologiaDAL.H2_Traer_Laboratorios_OdontologiaRow row in aTable.Rows)
            {
                LaboratoiosOdonto obj = new LaboratoiosOdonto();
                obj.id = row.id;
                obj.descripcion = row.descripcion;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public long Presupuesto_Odontologia_Proximo_Numero()
    {
        try
        {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Presupuesto_Odontologia_Proximo_Numero();
            return Convert.ToInt64(obj);
        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }

    public long Presupuesto_Odontologia_Guardar_CAB(persupuestoCABodonto item)
    {
        try
        {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Presupuesto_Odontologia_Guardar_CAB(item.id,item.medico,item.usuario,item.afiliadoId, item.fecha);
            return Convert.ToInt64(obj);
        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }


    public long Presupuesto_Odontologia_Guardar_DET(List<persupuestoDETodonto> lista, long idCab)
    {
        try
        {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Presupuesto_Odontologia_Eliminar_DET(idCab);
            foreach (persupuestoDETodonto item in lista) {
                object obj = adapter.H2_Presupuesto_Odontologia_Guardar_DET(idCab, item.codigo, item.cantidad, item.valor);
            }

            return 1;
        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }

    public long Presupuesto_Odontologia_Guardar_Plan_Pago(List<persupuestoCUOTAodonto> lista, int guardar)
    {
 
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            object obj = new object();
            foreach (persupuestoCUOTAodonto item in lista)
            {
               obj = adapter.H2_Presupuesto_Odontologia_Guardar_Plan_Pago(item.idCab, item.cuota, item.valor,item.saldada,guardar);

            }
            return Convert.ToInt64(obj.ToString());
    }

    public List<persupuestoBusquedaOodonto> Buscar_Presupuestos_Odontologia(long afiliadoId, string nombre, string documento, string nhc, long Npresupuesto, bool saldados)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Buscar_Presupuestos_OdontologiaTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Buscar_Presupuestos_OdontologiaTableAdapter();
            OdontologiaDAL.H2_Buscar_Presupuestos_OdontologiaDataTable aTable = new OdontologiaDAL.H2_Buscar_Presupuestos_OdontologiaDataTable();
            aTable = adapter.GetData(afiliadoId, nombre, documento, nhc,Npresupuesto,saldados);
            List<persupuestoBusquedaOodonto> l = new List<persupuestoBusquedaOodonto>();
            foreach (OdontologiaDAL.H2_Buscar_Presupuestos_OdontologiaRow row in aTable.Rows)
            {
                persupuestoBusquedaOodonto obj = new persupuestoBusquedaOodonto();
                obj.Npresupuesto = row.Npresupuesto;
                obj.medico = row.medico;
                obj.valor = row.valor;
                obj.pagado = row.pagado;
                obj.saldo = row.saldo;
                obj.nombre = row.afiliado;
                obj.afiliadoId = row.afiliadoId;
                obj.medicoId = row.medicoId;
                obj.documento = row.documento_real.ToString();
                obj.nhc = row.hc;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<persupuestoDETodonto> Traer_Detalle_Presupuestos_Odontologia(long Npresupuesto)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Detalle_Presupuestos_OdontologiaTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Detalle_Presupuestos_OdontologiaTableAdapter();
            OdontologiaDAL.H2_Traer_Detalle_Presupuestos_OdontologiaDataTable aTable = new OdontologiaDAL.H2_Traer_Detalle_Presupuestos_OdontologiaDataTable();
            aTable = adapter.GetData(Npresupuesto);
            List<persupuestoDETodonto> l = new List<persupuestoDETodonto>();
            foreach (OdontologiaDAL.H2_Traer_Detalle_Presupuestos_OdontologiaRow row in aTable.Rows)
            {
                persupuestoDETodonto obj = new persupuestoDETodonto();
                obj.codigo = row.codigo;
                obj.descripcion = row.descripcion;
                obj.cantidad = row.cantidad;
                obj.valorMostrar = row.valor.ToString();
                obj.valor = row.valor;
                obj.total = row.total;
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<persupuestoPAGOodonto> Traer_Cuotas_Actualizar_Presupuestos_Odontologia(long Npresupuesto)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Traer_Cuotas_Actualizar_Presupuestos_OdontologiaTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Traer_Cuotas_Actualizar_Presupuestos_OdontologiaTableAdapter();
            OdontologiaDAL.H2_Traer_Cuotas_Actualizar_Presupuestos_OdontologiaDataTable aTable = new OdontologiaDAL.H2_Traer_Cuotas_Actualizar_Presupuestos_OdontologiaDataTable();
            aTable = adapter.GetData(Npresupuesto);
            List<persupuestoPAGOodonto> l = new List<persupuestoPAGOodonto>();

            foreach (OdontologiaDAL.H2_Traer_Cuotas_Actualizar_Presupuestos_OdontologiaRow row in aTable.Rows)
            {
                persupuestoPAGOodonto obj = new persupuestoPAGOodonto();
                obj.id = row.id; 
                obj.idCab = row.idCab;
                obj.cuota = row.Cuota;
                obj.valor = row.Valor;
                obj.saldada = row.saldada;
                if(!row.IsFechaNull())
                obj.fecha = row.Fecha.ToShortDateString();
                l.Add(obj);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int configurar_Procedimientos_Presupuesto_Odontologia(string codigo, int estado)
    {
        try
        {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_configurar_Procedimientos_Presupuesto_Odontologia(codigo , estado);

            return 1;
        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }

        public long Insertar_Reclamo(long IdReclamo, string titulo, long servicio, string telefono, string reclamo, long afiliadoID, long usuario, int estado)
        {
            try
            {
                OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
                object obj = adapter.H2_Insertar_Reclamo(IdReclamo, titulo, servicio, telefono, reclamo, afiliadoID, usuario,estado);

                return Convert.ToInt64(obj);
  
            }
            catch (SqlException ex)
            {
                return -1;
                throw new Exception(ex.Message);
            }
        }

    public List<reclamo> Reclamo_Buscar(reclamo obj)
    {
        try
        {
            OdontologiaDALTableAdapters.H2_Reclamo_BuscarTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Reclamo_BuscarTableAdapter();
            OdontologiaDAL.H2_Reclamo_BuscarDataTable aTable = new OdontologiaDAL.H2_Reclamo_BuscarDataTable();
            aTable = adapter.GetData(obj.reclamoId,obj.afiliadoId,obj.afiliado,obj.dni,obj.nhc,obj.fechaReclamo,obj.fechaResolucion,obj.estado,obj.servId,obj.seccId,obj.retraso);

            List<reclamo> l = new List<reclamo>();
            foreach (OdontologiaDAL.H2_Reclamo_BuscarRow row in aTable.Rows)
            {
                reclamo r = new reclamo();

                if(!row.IsAfiliadoIdNull())
                r.afiliadoId = row.AfiliadoId;

                r.reclamoId = row.IdReclamo;
                
                if(!row.IstituloNull())
                r.titulo = row.titulo;

                r.servDescripcion = row.servicio;
                
                if(!row.IsreclamoNull())
                    r.reclamoDescripcion = row.reclamo;

                r.servId = row.servId;

                if (!row.IssoluccionNull())
                    r.resolucion = row.soluccion;

                    r.afiliado = row.afiliado;
                    r.dni = row.documento_real.ToString();

                if (!row.IsHC_UOM_CENTRALNull())
                    r.nhc = row.HC_UOM_CENTRAL;

                r.usuApertura = row.usuApertura;
                r.fechaReclamo = row.fechaApertura.ToShortDateString();

                if (!row.IsusuResolucionNull())
                    r.usuResolucion = row.usuResolucion;

                if (!row.IsfechaResolucionNull())
                    r.fechaResolucion = row.fechaResolucion.ToShortDateString();

                if (!row.IsadjuntoNull())
                    r.adjunto = row.adjunto;

                if (!row.IsestadoNull())
                    r.estado = row.estado;

                l.Add(r);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public long Reclamo_Cerrar(long IdReclamo,long usuarioResolucion,string soluccion)
    {
        try
        {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Reclamo_Cerrar(IdReclamo, usuarioResolucion,soluccion);

            return Convert.ToInt64(obj);

        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }


    public int Odontologia_Guardar_Plan_Pago_Encabezado(long practicaId, decimal valorTotal, int cantidadCuotas, long usuario)
    {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Odontologia_Borrar_PlanPago(practicaId);
            object obj = new object();
            obj = adapter.H2_Odontologia_Guardar_Plan_Pago_Encabezado(practicaId, valorTotal, cantidadCuotas, usuario);

            return Convert.ToInt32(obj);
    }


    public plaCAB Odontologia_Traer_Plan_Pago_Encabezado(long practicaId)
    {
            OdontologiaDALTableAdapters.H2_Odontologia_Traer_Plan_Pago_EncabezadoTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Odontologia_Traer_Plan_Pago_EncabezadoTableAdapter();
            OdontologiaDAL.H2_Odontologia_Traer_Plan_Pago_EncabezadoDataTable aTable = new OdontologiaDAL.H2_Odontologia_Traer_Plan_Pago_EncabezadoDataTable();
            aTable = adapter.GetData(practicaId);

            plaCAB obj = new plaCAB();
            foreach (OdontologiaDAL.H2_Odontologia_Traer_Plan_Pago_EncabezadoRow row in aTable.Rows)
            {
                obj.practicaId = row.practicaId;
                obj.valorTotal = row.valorTotal;
                obj.cantidadCuotas = row.cantidadCuotas;
            }

            return obj;
    }


    public int Odontologia_Guardar_PlanPago(List<cuota> planPago, long usuario, long practicaId)
    { object obj = new object();
        try
        {
            OdontologiaDALTableAdapters.QueriesTableAdapter adapter = new OdontologiaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Odontologia_Borrar_PlanPago(practicaId);

            foreach (cuota c in planPago) {
                obj = adapter.H2_Odontologia_Guardar_PlanPago(c.practicaId, c.Ncuota, c.valor, usuario);            
            }

            return Convert.ToInt32(obj);

        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }

    public List<cuota> Odontologia_Traer_Plan_Pago(long practicaId)
    {

            OdontologiaDALTableAdapters.H2_Odontologia_Traer_PlanPagoTableAdapter adapter = new OdontologiaDALTableAdapters.H2_Odontologia_Traer_PlanPagoTableAdapter();
            OdontologiaDAL.H2_Odontologia_Traer_PlanPagoDataTable aTable = new OdontologiaDAL.H2_Odontologia_Traer_PlanPagoDataTable();
            aTable = adapter.GetData(practicaId);

            List<cuota> l = new List<cuota>();
            foreach (OdontologiaDAL.H2_Odontologia_Traer_PlanPagoRow row in aTable.Rows)
            {
                cuota c = new cuota();
                c.practicaId = row.practicaId;
                c.Ncuota = row.cuota;
                c.valor = row.valor;
                l.Add(c);
            }

            return l;
    }
}
    

