using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for HemoterapiaBLL
/// </summary>
/// 
namespace Hospital
{
    public class HemoterapiaBLL
    {
        public HemoterapiaBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }


        public long GuardaActualizarSolicitudTransfusion(solicitudTransfusion sol)
        {
            try
            {
                HemoterapiaDALTableAdapters.QueriesTableAdapter adapter = new HemoterapiaDALTableAdapters.QueriesTableAdapter();
                object newId = adapter.H2_Guarda_Actualizar_Solicitud_Transfusion(sol.id,sol.afiliadoId,sol.diagnostico,sol.hematocrito,sol.hb,sol.plaquetas,sol.leucocitos,
                    sol.quick,sol.kptt,sol.tt,sol.fc,sol.ta,sol.otros,sol.defecha,sol.desplamatizados,sol.plasma,sol.plasmacongelado,sol.plaquetario,sol.precipitados,
                    sol.granulocitario,sol.entera,sol.irradiados,sol.lavados,sol.desleucocitos,sol.pediatria,sol.caractertrasnfusion,sol.anteriores ,sol.alergicas,sol.obstetricos, 
                    sol.tranfusionales ,sol.petransfucional ,sol.grupoAbo,sol.rhd,sol.fenotipo,sol.anticuerpos,sol.observaciones,sol.usuario ,sol.estado );
                if (newId != null) return Convert.ToInt64(newId);
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public long GuardaActualizarUnidadestransfundir(unidadesTransfundir uni)
        {
            try
            {
                HemoterapiaDALTableAdapters.QueriesTableAdapter adapter = new HemoterapiaDALTableAdapters.QueriesTableAdapter();
                object newId = adapter.H2_Guarda_Actualizar_Unidades_transfundir(uni.id,uni.idEncabezado,uni.Nunidad,uni.comprobante,uni.grupoFactor,uni.fecha,uni.hora,uni.aspecto,uni.color);
                if (newId != null) return Convert.ToInt64(newId);
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<solicitudTransfusion> TraerSolicitudTransfusion(long id)
        {

            HemoterapiaDALTableAdapters.H2_Traer_Solicitud_TransfusionTableAdapter adapter = new HemoterapiaDALTableAdapters.H2_Traer_Solicitud_TransfusionTableAdapter();
            HemoterapiaDAL.H2_Traer_Solicitud_TransfusionDataTable table = new HemoterapiaDAL.H2_Traer_Solicitud_TransfusionDataTable();
            table = adapter.GetData(id);
            List<solicitudTransfusion> L = new List<solicitudTransfusion>();
            foreach (HemoterapiaDAL.H2_Traer_Solicitud_TransfusionRow row in table.Rows)
            {
                solicitudTransfusion S = new solicitudTransfusion();
                 S.id = row.id;
S.afiliadoId = row.afiliadoId;
S.diagnostico = row.diagnostico;
S.hematocrito  = row.hematocrito;
S.hb = row.hb;
S.plaquetas = row.plaquetas;
S.leucocitos = row.leucocitos;
S.quick = row.quick;
S.kptt = row.kptt;
S.tt = row.tt;
S.fc = row.fc;
S.ta = row.ta;
S.otros = row.otros;
S.defecha = row.defecha;
S.desplamatizados = row.desplamatizados;
S.plasma = row.plasma;
S.plasmacongelado = row.plasmacongelado;
S.plaquetario = row.plaquetario;
S.precipitados = row.precipitados;
S.granulocitario = row.granulocitario;
S.entera = row.entera;
S.irradiados = row.irradiados;
S.lavados = row.lavados;
S.desleucocitos = row.desleucocitos;
S.pediatria = row.pediatria;
S.caractertrasnfusion = row.caractertrasnfusion;
S.anteriores = row.anteriores;
S.alergicas = row.alergicas;
S.obstetricos = row.obstetricos;
S.tranfusionales = row.tranfusionales;
S.petransfucional = row.petransfucional;
S.grupoAbo = row.grupoAbo;
S.rhd = row.rhd;
S.fenotipo = row.fenotipo;
S.anticuerpos = row.anticuerpos;
S.observaciones = row.observaciones;
S.usuario = row.usuario;
S.fecha = row.fecha.ToShortDateString(); ;
S.estado = row.estado;
                L.Add(S);
            }

            return L;
        }


        public List<unidadesTransfundir> TraerUnidadestransfundir(long id)
        {

            HemoterapiaDALTableAdapters.H2_Traer_Unidades_transfundirTableAdapter adapter = new HemoterapiaDALTableAdapters.H2_Traer_Unidades_transfundirTableAdapter();
            HemoterapiaDAL.H2_Traer_Unidades_transfundirDataTable table = new HemoterapiaDAL.H2_Traer_Unidades_transfundirDataTable();
            table = adapter.GetData(id);
            List<unidadesTransfundir> L = new List<unidadesTransfundir>();
            foreach (HemoterapiaDAL.H2_Traer_Unidades_transfundirRow row in table.Rows)
            {
                unidadesTransfundir U = new unidadesTransfundir();
U.id = row.id;
U.idEncabezado = row.idEncabezado;
U.Nunidad = row.Nunidad;
U.comprobante = row.comprobante;
U.grupoFactor = row.grupoFactor;
U.fecha = row.fecha;
U.hora = row.hora;
U.aspecto = row.aspecto;
U.color = row.color;
                L.Add(U);
            }

            return L;
        }

    }
}