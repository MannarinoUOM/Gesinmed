using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

/// <summary>
/// Descripción breve de QuirofanoReporte
/// </summary>
namespace Hospital
{
    public class QuirofanoReporte
    {
        public QuirofanoReporte()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }


        public List<QuirofanoReporteItem> Traer_Filtros(int tipo)
        {
            List<QuirofanoReporteItem> lista = new List<QuirofanoReporteItem>();
            ReportesQuirofanoTableAdapters.H2_Reportes_Quirofano_Traer_FiltrosTableAdapter adapter = new ReportesQuirofanoTableAdapters.H2_Reportes_Quirofano_Traer_FiltrosTableAdapter();
            ReportesQuirofano.H2_Reportes_Quirofano_Traer_FiltrosDataTable tabla = new ReportesQuirofano.H2_Reportes_Quirofano_Traer_FiltrosDataTable();
            tabla = adapter.GetData(tipo);
            long id = 0;
            switch (tipo)
            { 
                case 1:
                    id = 1000000000;
                    break;
                case 2:
                    id = 2000000000;
                    break;

                case 3:
                    id = 3000000000;
                    break;

                case 4:
                    id = 4000000000;
                    break;
            }
            QuirofanoReporteItem todos = new QuirofanoReporteItem(id , "---- TODOS ----");
            lista.Add(todos);
            foreach (ReportesQuirofano.H2_Reportes_Quirofano_Traer_FiltrosRow row in tabla.Rows)
            {
                QuirofanoReporteItem item = new QuirofanoReporteItem();
                item.id = row.id;
                item.nombre = row.nombre;
                lista.Add(item);
            }
            
            return lista;
        }

        public List<QuirofanoReporteItem> traer_Indicadores()
        {
            List<QuirofanoReporteItem> lista = new List<QuirofanoReporteItem>();
            IndicadoresTableAdapters.H2_Traer_indicadores_TablaTableAdapter adapter = new IndicadoresTableAdapters.H2_Traer_indicadores_TablaTableAdapter();
            Indicadores.H2_Traer_indicadores_TablaDataTable tabla = new Indicadores.H2_Traer_indicadores_TablaDataTable();

            tabla = adapter.GetData();
            foreach (Indicadores.H2_Traer_indicadores_TablaRow row in tabla.Rows)
            {
                QuirofanoReporteItem item = new QuirofanoReporteItem();
                item.idIndicador = row.id;
                item.codigo = row.tipo;
                item.descripcion = row.descripcion;
                item.titulo = row.titulo;
                item.soon = row.soon;
                if (!row.IscomoNull())
                    item.como = row.como;

                lista.Add(item);
            }
            
            return lista;
        }

        public QuirofanoReporteItem Calcular_Indicadores(string desde, string hasta, int tipo)
        {
            IndicadoresTableAdapters.H2_Listado_IndicadoresTableAdapter adapter = new IndicadoresTableAdapters.H2_Listado_IndicadoresTableAdapter();
               Indicadores.H2_Listado_IndicadoresDataTable tabla = new Indicadores.H2_Listado_IndicadoresDataTable();

            QuirofanoReporteItem valor = new QuirofanoReporteItem();

            tabla = adapter.GetData(desde,hasta,tipo);
            foreach (Indicadores.H2_Listado_IndicadoresRow row in tabla.Rows)
            {
                valor.descripcion = row.descripcion;

                if (!row.IscantidadNull())
                { valor.cantidad = row.cantidad; }
                else { valor.cantidad = 0; }
            }

            return valor;
        }

        public void actualizar_tabla(int id, int cantidad, string desde, string hasta)
        {
            IndicadoresTableAdapters.QueriesTableAdapter adapter = new IndicadoresTableAdapters.QueriesTableAdapter();
            adapter.H2_Limpiar_Tabla_Indicadores(id, cantidad, desde, hasta);
        }


        public void actualizar_Impresion_Indicadores(List<QuirofanoReporteItem> lista)
        {
            IndicadoresTableAdapters.QueriesTableAdapter adapter = new IndicadoresTableAdapters.QueriesTableAdapter();

            foreach(QuirofanoReporteItem item in lista){
            adapter.H2_actualizar_impresion_indicadores(item.idIndicador, item.cantidad, item.desde, item.hasta);
            }
        }


        public List<especialidades> Especialidades_Lista_Parte_Imagenes(bool Todos, long? Agregar_Id, bool SoloTurnos)
        {
            List<especialidades> lista = new List<especialidades>();
            ReportesQuirofanoTableAdapters.H2_Especialidades_Lista_Parte_ImagenesTableAdapter adapter = new ReportesQuirofanoTableAdapters.H2_Especialidades_Lista_Parte_ImagenesTableAdapter();
            ReportesQuirofano.H2_Especialidades_Lista_Parte_ImagenesDataTable aTable = adapter.GetData(Todos, Agregar_Id, SoloTurnos);

            foreach (ReportesQuirofano.H2_Especialidades_Lista_Parte_ImagenesRow row in aTable.Rows)
            {
                especialidades e = new especialidades();
                if (!row.IsIdNull()) e.Id = row.Id;
                if (!row.IsDescripcionNull()) e.Especialidad = row.Descripcion;
                lista.Add(e);
            }

            return lista;
        }

        public List<medicos> Medicos_Por_Especialidad_Imagenes(string Especialidad)
        {
            ReportesQuirofanoTableAdapters.H2_Medicos_Lista_por_Especialidad_ImagenesTableAdapter adapter = new ReportesQuirofanoTableAdapters.H2_Medicos_Lista_por_Especialidad_ImagenesTableAdapter();
            ReportesQuirofano.H2_Medicos_Lista_por_Especialidad_ImagenesDataTable aTable = adapter.GetData(Especialidad);

            List<medicos> Lista = new List<medicos>();

            foreach (ReportesQuirofano.H2_Medicos_Lista_por_Especialidad_ImagenesRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Medico = row.ApellidoYNombre;
                m.Id = row.Id;
                Lista.Add(m);
            }

            return Lista;
        }

    }
}
