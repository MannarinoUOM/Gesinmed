using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

/// <summary>
/// Summary description for QuirofanoBLL
/// </summary>
namespace Hospital
{
    public class QuirofanoBLL
    {
        public QuirofanoBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }



        public List<Quirofano_Diagnostico> Diagnostico_Post(int? id, bool estado)
        {
            List<Quirofano_Diagnostico> lista = new List<Quirofano_Diagnostico>();
            QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_PostTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_PostTableAdapter();
            QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_PostDataTable aTable = adapter.GetData(id, estado);

            foreach (QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_PostRow row in aTable.Rows)
            {
                lista.Add(CreardeRowDiagnostico(row));
            }

            return lista;
        }




        public List<Quirofano_Diagnostico> DiagnosticoDiagnostico_Planificar_Cirugia(int? id, bool estado, int Cirugia_id)
        {
            List<Quirofano_Diagnostico> lista = new List<Quirofano_Diagnostico>();
            QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_Planificar_CirugiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_Planificar_CirugiaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(id, estado, Cirugia_id);

            foreach (QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_CirugiaRow row in aTable.Rows)
            {
                lista.Add(CreardeRowDiagnostico_Planificar_Cirugia(row));
            }

            return lista;
        }


        public List<Quirofano_Diagnostico> DiagnosticoDiagnostico_Planificar_Cirugia_Combo(int? id, bool estado, int Cirugia_id, string Diagnostico)
        {
            List<Quirofano_Diagnostico> lista = new List<Quirofano_Diagnostico>();
            QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_ComboTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_ComboTableAdapter();
            QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_ComboDataTable aTable = adapter.GetData(id, estado, Cirugia_id, Diagnostico);

            foreach (QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_ComboRow row in aTable.Rows)
            {
                Quirofano_Diagnostico q = new Quirofano_Diagnostico();
                q.id = row.id;
                q.diagnostico = row.Diagnostico;
                lista.Add(q);
            }
            return lista;
        }



        public List<Cirugia_Tipo> Cirugia_Tipo(int? Id, bool estado, int Cirugia_id)
        {
            if (Id == 0) Id = null;
            List<Cirugia_Tipo> Lista = new List<Cirugia_Tipo>();
            QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(Id, estado, Cirugia_id);

            foreach (QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaRow row in aTable.Rows)
            {
                Lista.Add(CreardeRowTipoCirugia(row));
            }

            return Lista;
        }


        public string Cirugia_Tipo_x_CirugiaId(long Id)
        {
            string Cirugias = "";
            QuirofanoDALTableAdapters.H3_Quirofano_Cirugia_x_CirugiaIdTableAdapter adapter = new QuirofanoDALTableAdapters.H3_Quirofano_Cirugia_x_CirugiaIdTableAdapter();
            QuirofanoDAL.H3_Quirofano_Cirugia_x_CirugiaIdDataTable aTable = adapter.GetData(Id);
            if (aTable.Count > 0)
            {
                Cirugias = aTable[0].Cirugia;
            }

            return Cirugias;
        }

        public List<Quirofano_Cirugia> Cirugias_Planificar_Cirugia(int? id, bool estado, int Cirugia_id)
        {
            List<Quirofano_Cirugia> lista = new List<Quirofano_Cirugia>();
            QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaDataTable aTable = adapter.GetData(id, estado, Cirugia_id);

            foreach (QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaRow row in aTable.Rows)
            {
                lista.Add(CreardeRowCirugias_Planificar_Cirugia(row));
            }

            return lista;
        }

        public List<Quirofano_Cirugia> Cirugias_Planificar_Cirugia_Combo(int? id, bool estado, int Cirugia_id, string Cirugia)
        {
            List<Quirofano_Cirugia> lista = new List<Quirofano_Cirugia>();
            QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Lista_Planificar_Cirugia_ComboTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Lista_Planificar_Cirugia_ComboTableAdapter();
            QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_Cirugia_ComboDataTable aTable = adapter.GetData(id, estado, Cirugia_id, Cirugia);

            foreach (QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_Cirugia_ComboRow row in aTable.Rows)
            {
                Quirofano_Cirugia q = new Quirofano_Cirugia();
                q.id = row.id;
                q.cirugia = row.tipo;
                lista.Add(q);
            }

            return lista;
        }


        public List<Quirofano_Diagnostico> DiagnosticoDiagnostico_Planificar_Cirugia_Todas(int? id)
        {
            List<Quirofano_Diagnostico> lista = new List<Quirofano_Diagnostico>();
            QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_todasTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_todasTableAdapter();
            QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_todasDataTable aTable = adapter.GetData(id);

            foreach (QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_todasRow row in aTable.Rows)
            {
                lista.Add(CreardeRowDiagnostico_Planificar_Cirugia_todas(row));
            }

            return lista;
        }


        public void Guardar_Diagnostico_PlanificarCirugia(int Id, string Dianostico)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Guardar_Diagnostico_PlanificarCirugia(Id, Dianostico);
        }

        public void Eliminar_Diagnostico_PlanificarCirugia(int Id)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Eliminar_Diagnostico_PlanificarCirugia(Id);
        }

        public List<Quirofano_Diagnostico> Diagnostico(int? id, bool estado)
        {
            List<Quirofano_Diagnostico> lista = new List<Quirofano_Diagnostico>();
            QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_ListaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_ListaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Diagnostico_ListaDataTable aTable = adapter.GetData(id, estado);

            foreach (QuirofanoDAL.H2_Quirofano_Diagnostico_ListaRow row in aTable.Rows)
            {
                lista.Add(CreardeRowDiagnostico(row));
            }

            return lista;
        }


        private Quirofano_Diagnostico CreardeRowDiagnostico_Planificar_Cirugia_todas(QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_Cirugia_todasRow row)
        {
            Quirofano_Diagnostico q = new Quirofano_Diagnostico();
            q.id = row.id;
            q.diagnostico = row.Diagnostico;
            q.estado = row.estado;
            return q;
        }


        private Quirofano_Diagnostico CreardeRowDiagnostico(QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_PostRow row)
        {
            Quirofano_Diagnostico q = new Quirofano_Diagnostico();
            q.id = row.diagnostico_post_id;
            q.diagnostico = row.diagnostico_post_detalle;
            return q;
        }

        private Quirofano_Diagnostico CreardeRowDiagnostico_Planificar_Cirugia(QuirofanoDAL.H2_Quirofano_Diagnostico_Lista_Planificar_CirugiaRow row)
        {
            Quirofano_Diagnostico q = new Quirofano_Diagnostico();
            q.id = row.id;
            q.diagnostico = row.Diagnostico;
            return q;
        }


        private Quirofano_Cirugia CreardeRowCirugias_Planificar_Cirugia(QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaRow row)
        {
            Quirofano_Cirugia q = new Quirofano_Cirugia();
            q.id = row.id;
            q.cirugia = row.tipo;
            return q;
        }

        private Quirofano_Diagnostico CreardeRowDiagnostico(QuirofanoDAL.H2_Quirofano_Diagnostico_ListaRow row)
        {
            Quirofano_Diagnostico q = new Quirofano_Diagnostico();
            q.id = row.id;
            q.diagnostico = row.Diagnostico;
            return q;
        }

        public List<medicos> Lista_Medicos_TODOS(string Activo)
        {

            List<medicos> list = new List<medicos>();
            QuirofanoDALTableAdapters.H2_Turnos_Medico_List_QuirofanoTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Turnos_Medico_List_QuirofanoTableAdapter();
            QuirofanoDAL.H2_Turnos_Medico_List_QuirofanoDataTable aTable = adapter.GetData(null, "A");
            foreach (QuirofanoDAL.H2_Turnos_Medico_List_QuirofanoRow row in aTable.Rows)
            {
                list.Add(CreateFromRowTodos(row));
            }

            return list;

        }

        private medicos CreateFromRowTodos(QuirofanoDAL.H2_Turnos_Medico_List_QuirofanoRow row)
        {
            medicos c = new medicos();
            c.Id = row.Id;
            c.Medico = row.ApellidoYNombre;
            c.Especialidad = row.Especialidad_Activo;
            return c;
        }

        public List<Anestesia> Anestesia_Lista(int? Id)
        {

            List<Anestesia> list = new List<Anestesia>();
            QuirofanoDALTableAdapters.H2_Quirofano_Anestesia_Tipo_ListaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Anestesia_Tipo_ListaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Anestesia_Tipo_ListaDataTable aTable = adapter.GetData(Id);
            foreach (QuirofanoDAL.H2_Quirofano_Anestesia_Tipo_ListaRow row in aTable.Rows)
            {
                list.Add(CreateFromRowAnestesia(row));
            }

            return list;

        }

        private Anestesia CreateFromRowAnestesia(QuirofanoDAL.H2_Quirofano_Anestesia_Tipo_ListaRow row)
        {
            Anestesia a = new Anestesia();
            a.id = row.id;
            if (!row.Isanestesia_tipoNull())
                a.tipo = row.anestesia_tipo;
            return a;
        }


        public List<medicos_quirofano_x_especialidad> Listar_Medico_x_Especialidad(int Especialidad, int Medico_Predeterminado)
        {

            List<medicos_quirofano_x_especialidad> list = new List<medicos_quirofano_x_especialidad>();
            QuirofanoDALTableAdapters.H2_Quirofano_Listar_Medicos_x_EspecialidadTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Listar_Medicos_x_EspecialidadTableAdapter();
            QuirofanoDAL.H2_Quirofano_Listar_Medicos_x_EspecialidadDataTable aTable = adapter.GetData(-1, Especialidad, Medico_Predeterminado);
            foreach (QuirofanoDAL.H2_Quirofano_Listar_Medicos_x_EspecialidadRow row in aTable.Rows)
            {
                list.Add(CreateFromRowbyListar_Medico_x_Especialidad(row));
            }

            return list;

        }

        private medicos_quirofano_x_especialidad CreateFromRowbyListar_Medico_x_Especialidad(QuirofanoDAL.H2_Quirofano_Listar_Medicos_x_EspecialidadRow row)
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

        public List<medicos> Lista_Medicos_byEsp(string Activo, int Especialidad)
        {

            List<medicos> list = new List<medicos>();
            QuirofanoDALTableAdapters.H2_Turnos_Medico_List_Quirofano_byEspTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Turnos_Medico_List_Quirofano_byEspTableAdapter();
            QuirofanoDAL.H2_Turnos_Medico_List_Quirofano_byEspDataTable aTable = adapter.GetData(null, Activo, Especialidad);
            foreach (QuirofanoDAL.H2_Turnos_Medico_List_Quirofano_byEspRow row in aTable.Rows)
            {
                list.Add(CreateFromRowbyEsp(row));
            }

            return list;

        }

        private medicos CreateFromRowbyEsp(QuirofanoDAL.H2_Turnos_Medico_List_Quirofano_byEspRow row)
        {
            medicos c = new medicos();
            c.Id = row.Id;
            c.Medico = row.ApellidoYNombre;
            c.Especialidad = row.Especialidad_Activo;
            return c;
        }

        public int QuirofanoTurno_Guardar(Quirofano q, long usuario)
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
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_Quirofano_Turno_Guardar(q.id, q.nhc, DateTime.Parse(q.fecha), q.hora, q.diagnostico_id, q.urgencia, q.sala_id, q.cama_id, q.cirugia_tipo_id, q.cirujano_especialidad_id, q.cirujano_id, q.ayudante_id, q.anestesista_id, q.anestesia_tipo_id, q.hemo, q.cbo_hemo, q.cbo_rayos, q.cbo_anpa, q.cbo_monitoreo, q.medico_solicitante, q.observaciones, usuario, turno, q.ayudante2_id, q.ayudante3_id, q.Monitoreo_id, q.Instrumentalista_Id, q.Circulante_id, q.externo_medico, q.externo_medico_matricula, q.hora_fin, q.peso, q.cirugias_ck, q.hora_inicio, q.diagnosticos_ck);
            return Convert.ToInt32(id);
        }



        private Cirugia_Tipo CreardeRowTipoCirugia(QuirofanoDAL.H2_Quirofano_Cirugia_Lista_Planificar_CirugiaRow row)
        {
            Cirugia_Tipo c = new Cirugia_Tipo();
            c.id = row.id;
            c.tipo = row.tipo;
            return c;
        }

        public Quirofano_turnos_totales Quirofano_Turno_Lista_cantidad(int? Id, string Fecha, bool Baja, int Turno, int cuales)
        {
            Quirofano_turnos_totales totales = new Quirofano_turnos_totales();
            QuirofanoDALTableAdapters.H2_Quirofano_Lista_ImprimirTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Lista_ImprimirTableAdapter();
            QuirofanoDAL.H2_Quirofano_Lista_ImprimirDataTable aTable = adapter.GetData(Id, Fecha, Baja, Turno, cuales);

            foreach (QuirofanoDAL.H2_Quirofano_Lista_ImprimirRow row in aTable.Rows)
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

        public List<Quirofano_Listado> Quirofano_Turno_Lista(int? Id, string Fecha, bool Baja, int Turno, int cuales)
        {
            List<Quirofano_Listado> lista = new List<Quirofano_Listado>();
            QuirofanoDALTableAdapters.H2_Quirofano_Lista_ImprimirTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Lista_ImprimirTableAdapter();
            QuirofanoDAL.H2_Quirofano_Lista_ImprimirDataTable aTable = adapter.GetData(Id, Fecha, Baja, Turno, cuales);

            foreach (QuirofanoDAL.H2_Quirofano_Lista_ImprimirRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_TurnoList(row));
            }
            return lista;
        }

        public List<Quirofano_Listado> Listado_Control_Facturacion(string desde, string hasta, int tipo,int prioridad, int T)
        {
            List<Quirofano_Listado> lista = new List<Quirofano_Listado>();
            QuirofanoDALTableAdapters.H2_Listado_Control_FacturacionTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Listado_Control_FacturacionTableAdapter();
            QuirofanoDAL.H2_Listado_Control_FacturacionDataTable aTable = adapter.GetData(desde, hasta, tipo, prioridad,T);

            foreach (QuirofanoDAL.H2_Listado_Control_FacturacionRow row in aTable.Rows)
            {
                Quirofano_Listado q = new Quirofano_Listado();
                q.Id = row.id.ToString();
                if (!row.IsNHCNull()) { q.HC = row.NHC; }
                

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

                lista.Add(q);
            }
            return lista;
        }

        private Quirofano_Listado CreateFromRow_TurnoList(QuirofanoDAL.H2_Quirofano_Lista_ImprimirRow row)
        {
            Quirofano_Listado q = new Quirofano_Listado();
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

        public List<Quirofano> Quirofano_CirugiaList(int? Id, string Fecha, bool Baja)
        {
            List<Quirofano> lista = new List<Quirofano>();
            QuirofanoDALTableAdapters.H2_Quirofano_Turnos_ListadoTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Turnos_ListadoTableAdapter();
            QuirofanoDAL.H2_Quirofano_Turnos_ListadoDataTable aTable = adapter.GetData(Id, Baja, Fecha);
            foreach (QuirofanoDAL.H2_Quirofano_Turnos_ListadoRow row in aTable.Rows)
            {
                lista.Add(CrearDesdeRowQuiroTurno(row));
            }
            return lista;
        }

        private Quirofano CrearDesdeRowQuiroTurno(QuirofanoDAL.H2_Quirofano_Turnos_ListadoRow row)
        {
            Quirofano q = new Quirofano();
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

        public List<MotivoSusp> Motivo_Susp_Lista(int? Id)
        {
            List<MotivoSusp> list = new List<MotivoSusp>();
            QuirofanoDALTableAdapters.H2_Quirofano_Motivo_Susp_ListaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Motivo_Susp_ListaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Motivo_Susp_ListaDataTable aTable = adapter.GetData(Id);
            foreach (QuirofanoDAL.H2_Quirofano_Motivo_Susp_ListaRow row in aTable.Rows)
            {
                list.Add(CrearDesdeRowSusp(row));
            }
            return list;
        }

        public MotivoSusp CrearDesdeRowSusp(QuirofanoDAL.H2_Quirofano_Motivo_Susp_ListaRow row)
        {
            MotivoSusp m = new MotivoSusp();
            m.id = row.id;
            m.motivo = row.motivo;
            return m;
        }

        public void Suspender_Cirugia(int Id, int Motivo, long Usuario)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Suspender_Cirugia(Id, Motivo, Usuario);
        }

        public void Reanudar_Cirugia(int Id)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Reanudar_Cirugia(Id);
        }

        public void BorrarPlantillaInsumos()
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_QUIROFANO_PLANTILLA_INS_DEL();
        }

        public int Borrar_Cirugia(int Id, long Usuario)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_Quirofano_Borrar_Cirugia(Id, Usuario);
            try
            {
                return Convert.ToInt32(id);
            }
            catch
            {
                return 0;
            }
        }




        public void Delete_Quirofano_InsumosbyIdOperacion(long IdOperacion, int Tipo)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Delete_InsumobyIdOperacion(IdOperacion, Tipo);
        }

        public void Insert_Insumos_Quirofano(long IdOperacion, int IdInsumo, int Cantidad, string Obs, int Monodroga, int Tipo)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_INSERT_QUIROFANO_INSUMOS(IdOperacion, IdInsumo, Cantidad, Obs, Monodroga, Tipo);
        }


        public void Insert_Plantilla_Servicios(int IdPlantilla, int IdInsumo, int IdServicio, int Cantidad, int Tipo)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_QUIROFANO_INSERT_PLANTILLA_SERVICIOS(IdPlantilla, IdInsumo, IdServicio, Cantidad, Tipo);
        }

        public List<Insumo> Select_Plantilla_by_Rubro(int IdRubro, int IdPlantilla)
        {
            List<Insumo> list = new List<Insumo>();
            QuirofanoDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLATableAdapter adapter = new QuirofanoDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLATableAdapter();
            QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLADataTable aTable = adapter.GetData(IdRubro, IdPlantilla);
            foreach (QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLARow row in aTable.Rows)
            {
                Insumo aInsumo = ReadInsumoForPlantilla(row);
                list.Add(aInsumo);
            }
            return list;
        }



        public List<Insumo> Select_Plantilla_by_Rubro_Cargado(int Id_Planilla)
        {
            List<Insumo> list = new List<Insumo>();
            QuirofanoDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLA_CARGADOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLA_CARGADOTableAdapter();
            QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADODataTable aTable = adapter.GetData(Id_Planilla);
            foreach (QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADORow row in aTable.Rows)
            {
                Insumo aInsumo = ReadInsumoForPlantilla(row);
                list.Add(aInsumo);
            }
            return list;
        }


        public List<Insumo> Select_Plantilla_by_Rubro_Cargado_pos(int Id_Planilla)
        {
            List<Insumo> list = new List<Insumo>();
            QuirofanoDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POSTableAdapter adapter = new QuirofanoDALTableAdapters.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POSTableAdapter();
            QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POSDataTable aTable = adapter.GetData(Id_Planilla);
            foreach (QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POSRow row in aTable.Rows)
            {
                Insumo aInsumo = ReadInsumoForPlantilla_POS(row);
                list.Add(aInsumo);
            }
            return list;
        }

        private Insumo ReadInsumoForPlantilla(QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADORow row)
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

        private Insumo ReadInsumoForPlantilla_POS(QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLA_CARGADO_POSRow row)
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

        public List<Insumo> Select_Insumos_Quirofano_by_IdOperacion(int IdOperacion)
        {
            List<Insumo> list = new List<Insumo>();
            QuirofanoDALTableAdapters.H2_SELECT_QUIROFANO_INSUMOS_BY_ID_OPERACIONTableAdapter adapter = new QuirofanoDALTableAdapters.H2_SELECT_QUIROFANO_INSUMOS_BY_ID_OPERACIONTableAdapter();
            QuirofanoDAL.H2_SELECT_QUIROFANO_INSUMOS_BY_ID_OPERACIONDataTable aTable = adapter.GetData(IdOperacion);
            foreach (QuirofanoDAL.H2_SELECT_QUIROFANO_INSUMOS_BY_ID_OPERACIONRow row in aTable.Rows)
            {
                Insumo aInsumo = ReadInsumoForPlantilla(row);
                list.Add(aInsumo);
            }
            return list;
        }

        private Insumo ReadInsumoForPlantilla(QuirofanoDAL.H2_SELECT_INSUMOS_PLANTILLARow row)
        {
            Insumo aInsumo = new Insumo();
            aInsumo.Id = row.ID_INSUMO;
            if (!row.IsINSUMONull())
                aInsumo.Descripcion = row.INSUMO;

            if (!row.IsCANTIDADNull())
                aInsumo.Cantidad = row.CANTIDAD;
            else aInsumo.Cantidad = 0;

            if (!row.IsTIPONull()) aInsumo.Monodroga = row.TIPO;
            if (!row.IsPRESENTACIONNull()) aInsumo.Presentacion = row.PRESENTACION; else aInsumo.Presentacion = string.Empty;
            if (!row.IsMEDIDANull()) aInsumo.Medida = row.MEDIDA; else aInsumo.Medida = string.Empty;
            if (!row.IsGRAMAJENull()) aInsumo.Gramaje = row.GRAMAJE; else aInsumo.Gramaje = string.Empty;
            return aInsumo;
        }

        private Insumo ReadInsumoForPlantilla(QuirofanoDAL.H2_SELECT_QUIROFANO_INSUMOS_BY_ID_OPERACIONRow row)
        {
            Insumo aInsumo = new Insumo();
            aInsumo.Id = row.ID_INSUMO;
            if (!row.IsINSUMONull())
                aInsumo.Descripcion = row.INSUMO;
            aInsumo.Cantidad = row.CANTIDAD;
            if (!row.IsOBSERVACIONESNull())
                aInsumo.DescripcionResumida = row.OBSERVACIONES;
            return aInsumo;
        }

        public void Quirofano_Turnos_Update(Quirofano q)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Turno_Update(q.id, q.hora, q.diagnostico_id, q.sala_id, q.cama_id, q.cirugia_tipo_id,
            q.cirujano_especialidad_id, q.cirujano_id, q.ayudante_id, q.ayudante2_id, q.ayudante3_id, q.hora_fin, q.anestesista_id, q.anestesia_tipo_id, q.hemo,
            q.cbo_hemo, q.cbo_rayos, q.cbo_anpa, q.cbo_monitoreo, q.medico_solicitante, q.observaciones, q.Instrumentalista_Id, q.Circulante_id, q.Monitoreo_id,
            q.motivo_modificacion, q.usuario_id_modificacion, q.efectuada, q.externo_medico, q.externo_medico_matricula);
        }

        public List<Quirofano_PreAnes_Enc> ListPreAnes_Enc(int Id)
        {
            List<Quirofano_PreAnes_Enc> list = new List<Quirofano_PreAnes_Enc>();
            QuirofanoDALTableAdapters.H2_Quirofano_PreAnes_EncabezadoTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_PreAnes_EncabezadoTableAdapter();
            QuirofanoDAL.H2_Quirofano_PreAnes_EncabezadoDataTable aTable = adapter.GetData(Id);
            foreach (QuirofanoDAL.H2_Quirofano_PreAnes_EncabezadoRow row in aTable.Rows)
            {
                list.Add(CreateFromRowPreAnes_Enc(row));
            }
            return list;
        }

        private Quirofano_PreAnes_Enc CreateFromRowPreAnes_Enc(QuirofanoDAL.H2_Quirofano_PreAnes_EncabezadoRow row)
        {
            Quirofano_PreAnes_Enc q = new Quirofano_PreAnes_Enc();
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
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H3_Quirofano_Actualizar_Peso(p.Peso, cirugia);
            object id = adapter.H2_Quirofano_Guardar_PreAnestesico(p.PRE_HORA_INGRESO, p.PRE_AYUNO, p.PRE_OBS_1, p.PRE_HS_UCPA_INGRESO_Q, p.PRE_ING_VENOCLISIS, p.PRE_ANTITETANICA_DOSIS, p.PRE_BANIO_PRE_QX, p.PRE_PROFILAXIS_ATB, p.PRE_OBS_2, p.PRE_PROTESIS_DENTARIA, p.PRE_OBS_3, p.PRE_RIESGO_Q_FECHA, p.PRE_TIPO, p.PRE_CONTROL_SIGNOS_VITALES_TA, p.PRE_CONTROL_SIGNOS_VITALES_FC, p.PRE_CONTROL_SIGNOS_VITALES_FR, p.PRE_CONTROL_SIGNOS_VITALES_TEMP, p.PRE_CONTROL_SIGNOS_VITALES_SPO2, p.PRE_OBS_4, p.PRE_LABORATORIO_FECHA, p.PRE_LABORATORIO_HTO, p.PRE_LABORATORIO_HB, p.PRE_LABORATORIO_PLAQUETAS, p.PRE_LABORATORIO_KPTT, p.PRE_LABORATORIO_QUICK, p.PRE_LABORATORIO_GLUCEMIA, p.PRE_ANTECEDENTES_HTA, p.PRE_ANTECEDENTES_DBT, p.PRE_ANTECEDENTES_ENF_RESPIRATORIAS, p.PRE_ANTECEDENTES_ENF_CARDIACAS, p.PRE_OBS_5, p.PRE_OBS_6, cirugia, usuario, p.PRE_UNIDAD_SANGRE, p.PRE_PEDIDO_SANGRE, p.PRE_GRUPO, p.PRE_FACTOR, p.PRE_MONITOREO, p.enfermero);
            try
            {
                return cirugia;
            }
            catch
            {
                return 0;
            }
        }

        public void Quirofano_ControlSignosVitales_Guardar(Quirofano_ControlSignosVitales q)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_ControlSignosVitales_Guardar(q.Cirugia_Id, q.TA, q.FC, q.Temperatura, q.Hora, q.FR);
        }

        public void Quirofano_RecPosAnestesia_Guardar(Quirofano_RecPosAnestesia q)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Recuperacion_PosAnestesia_Guardar(q.Cirugia_Id, q.S_Fisiologica, q.Dextrosa, q.RingerLactato, q.ExpansorPlasmatico, q.ExpansorPlasmatico2,
                q.Sat02, q.Hs, q.Hs2, q.Hs3, q.Hs4, q.Hs5, q.Hematocrito, q.HB, q.KPTT, q.Quick, q.Hs6, q.PH, q.PCo2, q.Po2, q.EB, q.HCO3, q.Na, q.Sat, q.Cl, q.POTASIO, q.Canula, q.Mascara,
                q.HoraEgreso, q.Aspiracion, q.Observacion, q.SangradoIntra, q.Diuresis, q.Fluidos);
        }

        public void Quirofano_ControlSignosVitales_Delete(Quirofano_ControlSignosVitales q)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Delete_Quirofano_ControlSignosVitales(q.Cirugia_Id);
        }

        public void Quirofano_RecPosAnestesia_Delete(Quirofano_RecPosAnestesia q)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Delete_Quirofano_Recuperacion_PosAnestesia(q.Cirugia_Id);
        }

        public Quirofano_RecPosAnestesia Quirofano_RecPosAnestesia_ListById(int CirugiaId)
        {
            Quirofano_RecPosAnestesia q = new Quirofano_RecPosAnestesia();
            QuirofanoDALTableAdapters.H2_Quirofano_Recuperacion_PosAnestesia_ListTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Recuperacion_PosAnestesia_ListTableAdapter();
            QuirofanoDAL.H2_Quirofano_Recuperacion_PosAnestesia_ListDataTable aTable = adapter.GetData(CirugiaId);
            foreach (QuirofanoDAL.H2_Quirofano_Recuperacion_PosAnestesia_ListRow row in aTable.Rows)
            {
                q = CreateRow(row);
            }
            return q;
        }

        private Quirofano_RecPosAnestesia CreateRow(QuirofanoDAL.H2_Quirofano_Recuperacion_PosAnestesia_ListRow row)
        {
            Quirofano_RecPosAnestesia q = new Quirofano_RecPosAnestesia();

            q.Cirugia_Id = row.Cirugia_Id;
            if (!row.IsAspiracionNull())
                q.Aspiracion = row.Aspiracion;
            if (!row.IsCanulaNull())
                q.Canula = row.Canula;
            if (!row.IsClNull())
                q.Cl = row.Cl;
            if (!row.IsDextrosaNull())
                q.Dextrosa = row.Dextrosa;
            if (!row.IsDiuresisNull())
                q.Diuresis = row.Diuresis;
            if (!row.IsEBNull())
                q.EB = row.EB;
            if (!row.IsExpansorPlasmaticoNull())
                q.ExpansorPlasmatico = row.ExpansorPlasmatico;
            if (!row.IsExpansorPlasmatico2Null())
                q.ExpansorPlasmatico2 = row.ExpansorPlasmatico2;
            if (!row.IsFluidosNull())
                q.Fluidos = row.Fluidos;
            if (!row.IsHBNull())
                q.HB = row.HB;
            if (!row.IsHCO3Null())
                q.HCO3 = row.HCO3;
            if (!row.IsHematocritoNull())
                q.Hematocrito = row.Hematocrito;
            if (!row.IsHoraEgresoNull())
                q.HoraEgreso = row.HoraEgreso;
            if (!row.IsHsNull())
                q.Hs = row.Hs;
            if (!row.IsHs2Null())
                q.Hs2 = row.Hs2;
            if (!row.IsHs3Null())
                q.Hs3 = row.Hs3;
            if (!row.IsHs4Null())
                q.Hs4 = row.Hs4;
            if (!row.IsHs5Null())
                q.Hs5 = row.Hs5;
            if (!row.IsHs6Null())
                q.Hs6 = row.Hs6;
            if (!row.IsKNull())
                q.POTASIO = row.K;
            if (!row.IsKPTTNull())
                q.KPTT = row.KPTT;
            if (!row.IsMascaraNull())
                q.Mascara = row.Mascara;
            if (!row.IsNaNull())
                q.Na = row.Na;
            if (!row.IsObservacionNull())
                q.Observacion = row.Observacion;
            if (!row.IsPCo2Null())
                q.PCo2 = row.PCo2;
            if (!row.IsPHNull())
                q.PH = row.PH;
            if (!row.IsPo2Null())
                q.Po2 = row.Po2;
            if (!row.IsQuickNull())
                q.Quick = row.Quick;
            if (!row.IsRingerLactatoNull())
                q.RingerLactato = row.RingerLactato;
            if (!row.IsS_FisiologicaNull())
                q.S_Fisiologica = row.S_Fisiologica;
            if (!row.IsSangradoIntraNull())
                q.SangradoIntra = row.SangradoIntra;
            if (!row.IsSatNull())
                q.Sat = row.Sat;
            if (!row.IsSat02Null())
                q.Sat02 = row.Sat02;
            return q;
        }

        public List<Quirofano_ControlSignosVitales> Quirofano_ControlSignosVitales_ListbyCirugiaId(int CirugiaId)
        {
            List<Quirofano_ControlSignosVitales> list = new List<Quirofano_ControlSignosVitales>();
            QuirofanoDALTableAdapters.H2_Quirofano_ControlSignosVitales_ListTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_ControlSignosVitales_ListTableAdapter();
            QuirofanoDAL.H2_Quirofano_ControlSignosVitales_ListDataTable aTable = adapter.GetData(CirugiaId);
            foreach (QuirofanoDAL.H2_Quirofano_ControlSignosVitales_ListRow row in aTable.Rows)
            {
                list.Add(CreateRowSV(row));
            }
            return list;
        }

        private Quirofano_ControlSignosVitales CreateRowSV(QuirofanoDAL.H2_Quirofano_ControlSignosVitales_ListRow row)
        {
            Quirofano_ControlSignosVitales q = new Quirofano_ControlSignosVitales();
            q.Cirugia_Id = row.Cirugia_Id;
            q.Id = row.Id;
            q.FC = row.FC;
            if (!string.IsNullOrEmpty(row.FR))
                q.FR = row.FR;
            else q.FR = "";
            q.Hora = row.Hora;
            q.TA = row.TA;
            q.Temperatura = row.Temperatura;
            return q;
        }

        public List<DiagnosticoICD10> ListDiagnosticoICD10()
        {
            List<DiagnosticoICD10> list = new List<DiagnosticoICD10>();
            QuirofanoDALTableAdapters.H2_DiagnosticoICD10TableAdapter adapter = new QuirofanoDALTableAdapters.H2_DiagnosticoICD10TableAdapter();
            DiagnosticoICD10 e;
            foreach (QuirofanoDAL.H2_DiagnosticoICD10Row row in adapter.GetData(null))
            {
                e = CreateFrom(row);
                list.Add(e);
            }
            return list;
        }

        private DiagnosticoICD10 CreateFrom(QuirofanoDAL.H2_DiagnosticoICD10Row row)
        {
            DiagnosticoICD10 e = new DiagnosticoICD10(row.Codigo, row.Descripcion);
            return e;
        }

        public void Quirofano_Protocolos_Guardar(Quirofano_Protocolos q, Int32 UsuarioId)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Protocolos_Guardar(q.Cirugia_Id, q.Descripcion_Esquema, q.Descripcion_Macro, q.Biopsia, q.Biopsia_Detalle, q.Diagnostico_PostOperatorio_Id, UsuarioId, q.observaciones);
        }

        public void Quirofano_Protocolos_Borrar(int Id)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Protocolos_Delete(Id);
        }

        public Quirofano_Protocolos ListByCirugiaId(int CirugiaId)
        {
            Quirofano_Protocolos q = new Quirofano_Protocolos();
            QuirofanoDALTableAdapters.H2_Quirofano_Protocolos_ListTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Protocolos_ListTableAdapter();
            QuirofanoDAL.H2_Quirofano_Protocolos_ListDataTable aTable = adapter.GetData(CirugiaId);
            foreach (QuirofanoDAL.H2_Quirofano_Protocolos_ListRow row in aTable.Rows)
            {
                q = CreateRowFromProtocolos(row);
            }
            return q;
        }

        private Quirofano_Protocolos CreateRowFromProtocolos(QuirofanoDAL.H2_Quirofano_Protocolos_ListRow row)
        {
            Quirofano_Protocolos q = new Quirofano_Protocolos();
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

        public int Resolucion28_Guardar(Resolucion28 c)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            //cirujano_circulante_anestesista_corfirman_verbalmente
            object id = adapter.H2_Resolucion28_Guardar(c.nhc, c.operacion, c.A1, c.A2, c.A3, c.A4, c.A5, c.A6, c.A7, c.A8, c.A9, c.A10, c.A11, c.A12, c.A13, c.A14, c.B1, c.B2, c.B3, c.B4, c.B5, c.B6, c.C1, c.C2, c.C3, c.C4, c.C5, c.C6, c.C7, c.C8, c.C9, c.observaciones);
            return Convert.ToInt32(id);
        }

        public Resolucion28 CargarResolucion(int Id)
        {
            Resolucion28 r = new Resolucion28();
            QuirofanoDALTableAdapters.H2_Quirofano_Resolucion28_ListaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Resolucion28_ListaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Resolucion28_ListaDataTable aTable = adapter.GetData(Id);
            foreach (QuirofanoDAL.H2_Quirofano_Resolucion28_ListaRow row in aTable.Rows)
            {
                r = CreateFromRowResolucion28(row);
            }
            return r;
        }

        private Resolucion28 CreateFromRowResolucion28(QuirofanoDAL.H2_Quirofano_Resolucion28_ListaRow row)
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

        public void Borrar_Protesis_Det(int id)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_BORRAR_PROTESISYOTROS_DET(id);
        }

        public int Guardar_Protesis_Cab(Quirofano_Protesis_Cab p)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Quirofano_ProtesisyOtros_CAB_Guardar(p.id, p.servicio, p.ortopedia, p.material, p.usuario, p.observaciones);
            return p.id;
        }

        public int Guardar_Protesis_y_Otros(QuirofanoProtesis p)
        {
            //Aca tengo que hacer que guarde la monodrogra asi se puede editar.
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Quirofano_ProtesisyOtros_Guardar(Convert.ToInt32(p.operacion_Id), Convert.ToInt32(p.insumo_id), int.Parse(p.cantidad), p.usuario, p.nombre);
            return p.id;
        }

        public void UpdateCargaInsumosOtros(int Id, string Otros)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_UPDATE_CARGAINSUMOS_OTROS(Id, Otros);
        }

        public List<Quirofano_Protesis_Cab> Protesis_Lista_CAB(int id)
        {
            List<Quirofano_Protesis_Cab> Lista = new List<Quirofano_Protesis_Cab>();
            QuirofanoDALTableAdapters.H2_Quirofano_ProtesisyOtros_Lista_CABTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_ProtesisyOtros_Lista_CABTableAdapter();
            QuirofanoDAL.H2_Quirofano_ProtesisyOtros_Lista_CABDataTable aTable = adapter.GetData(id);


            foreach (QuirofanoDAL.H2_Quirofano_ProtesisyOtros_Lista_CABRow row in aTable.Rows)
            {
                Lista.Add(CreardeRowProtesisCAB(row));
            }

            return Lista;

        }

        private static Quirofano_Protesis_Cab CreardeRowProtesisCAB(QuirofanoDAL.H2_Quirofano_ProtesisyOtros_Lista_CABRow row)
        {
            Quirofano_Protesis_Cab q = new Quirofano_Protesis_Cab();
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

        public List<QuirofanoProtesis> Protesis_Lista_Det(int id)
        {
            List<QuirofanoProtesis> Lista = new List<QuirofanoProtesis>();
            QuirofanoDALTableAdapters.H2_Quirofano_ProtesisyOtros_Lista_DetTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_ProtesisyOtros_Lista_DetTableAdapter();
            QuirofanoDAL.H2_Quirofano_ProtesisyOtros_Lista_DetDataTable aTable = adapter.GetData(id);


            foreach (QuirofanoDAL.H2_Quirofano_ProtesisyOtros_Lista_DetRow row in aTable.Rows)
            {
                Lista.Add(CreardeRowProtesisDet(row));
            }

            return Lista;

        }

        private QuirofanoProtesis CreardeRowProtesisDet(QuirofanoDAL.H2_Quirofano_ProtesisyOtros_Lista_DetRow row)
        {
            QuirofanoProtesis q = new QuirofanoProtesis();
            q.id = (int)(row.id);

            if (!row.IscantidadNull())
                q.cantidad = row.cantidad.ToString();

            if (!row.Isinsumo_idNull())
                q.insumo_id = row.insumo_id;

            if (!row.IscantidadNull())
                q.cantidad = row.cantidad.ToString();

            if (!row.IsInsumo_NombreNull())
                q.nombre = row.Insumo_Nombre.ToString();

            return q;
        }


        public PreQuirurgico Cargar_Pre_Anestesico(int id)
        {
            PreQuirurgico q = new PreQuirurgico();

            QuirofanoDALTableAdapters.H2_Quirofano_Pre_Anestesia_CargarTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Pre_Anestesia_CargarTableAdapter();
            QuirofanoDAL.H2_Quirofano_Pre_Anestesia_CargarDataTable aTable = adapter.GetData(id);

            if (aTable.Rows.Count > 0)
            {
                QuirofanoDAL.H2_Quirofano_Pre_Anestesia_CargarRow row = aTable[0];

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


        public Sala_y_Cama Cargar_Sala_y_Cama(int Quirofano_ID)
        {
            Sala_y_Cama sc = new Sala_y_Cama();
            QuirofanoDALTableAdapters.Sala_Cama_QuirofanoTableAdapter adapter = new QuirofanoDALTableAdapters.Sala_Cama_QuirofanoTableAdapter();
            QuirofanoDAL.Sala_Cama_QuirofanoDataTable aTable = adapter.GetData(Quirofano_ID);

            foreach (QuirofanoDAL.Sala_Cama_QuirofanoRow row in aTable)
            {
                if (!row.IscamaNull()) { sc.Cama = row.cama; }
                if (!row.IssalaNull()) { sc.Sala = row.sala; }
            }

            return sc;
        }




        public void Guardar_Cirugia_PlanificarCirugia(int Id, string Cirugia)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Guardar_Cirugia_PlanificarCirugia(Id, Cirugia);
        }

        public void Eliminar_Cirugia_PlanificarCirugia(int Id)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Eliminar_Cirugia_PlanificarCirugia(Id);
        }



        public List<Insumo_PRE_Anestesia_Listado> Listar_Insumos_PreAnestesia(long CirugiaID)
        {
            List<Insumo_PRE_Anestesia_Listado> Lista = new List<Insumo_PRE_Anestesia_Listado>();
            QuirofanoDALTableAdapters.H2_Quirofano_ListarInsumos_PreAnestesiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_ListarInsumos_PreAnestesiaTableAdapter();
            QuirofanoDAL.H2_Quirofano_ListarInsumos_PreAnestesiaDataTable aTable = adapter.GetData(CirugiaID);

            foreach (QuirofanoDAL.H2_Quirofano_ListarInsumos_PreAnestesiaRow row in aTable)
            {
                Insumo_PRE_Anestesia_Listado insu = new Insumo_PRE_Anestesia_Listado();
                insu.Cantidad = row.CANTIDAD.ToString();
                if (!row.IsINSUMONull()) { insu.Insumo = row.INSUMO; }
                if (!row.IsOBSERVACIONESNull()) { insu.Observacion = row.OBSERVACIONES; }
                Lista.Add(insu);
            }

            return Lista;
        }


        public void InsumoProtesis_AM_Insumos_Guardar(long Insumo_ID, string Descripcion)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Quirofano_Insumo_y_Protesis_GuardarInsumos(Insumo_ID, Descripcion);
        }

        public List<Insumo_y_Protesis_Insumo> InsumoProtesis_Insumos_Listar(long Insumo_ID)
        {
            List<Insumo_y_Protesis_Insumo> lista = new List<Insumo_y_Protesis_Insumo>();

            QuirofanoDALTableAdapters.H2_Quirofano_Insumo_y_Protesis_ListarInsumosTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Insumo_y_Protesis_ListarInsumosTableAdapter();
            QuirofanoDAL.H2_Quirofano_Insumo_y_Protesis_ListarInsumosDataTable aTable = adapter.GetData(Insumo_ID);
            foreach (QuirofanoDAL.H2_Quirofano_Insumo_y_Protesis_ListarInsumosRow row in aTable)
            {
                Insumo_y_Protesis_Insumo i = new Insumo_y_Protesis_Insumo();
                i.descripcion = row.QIP_Insumo;
                i.id = row.QIP_Id;
                lista.Add(i);
            }
            return lista;
        }



        internal Protocolo_Cirugia_Info Protocolos_Cirugia_Info(long CirugiaId)
        {
            QuirofanoDALTableAdapters.H2_Quirofano_Protocolos_Info_CirugiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Protocolos_Info_CirugiaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Protocolos_Info_CirugiaDataTable aTable = adapter.GetData(CirugiaId);
            QuirofanoDAL.H2_Quirofano_Protocolos_Info_CirugiaRow row = aTable[0];

            Protocolo_Cirugia_Info i = new Protocolo_Cirugia_Info();
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



        public List<Insumo> Cargar_Plantilla_Cargado(long Cirugia_Id, int Tipo)
        {
            //Tipo 1: Pre
            //Tipo 2: Durante
            //Tipo 3: Post

            List<Insumo> list = new List<Insumo>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMOS_PLANTILLA_CARGARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMOS_PLANTILLA_CARGARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMOS_PLANTILLA_CARGARDataTable aTable = adapter.GetData(Cirugia_Id, Tipo);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMOS_PLANTILLA_CARGARRow row in aTable.Rows)
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

        public void DeleteInsumosQuirurgicos_POS(int Cirugia_id, int Tipo)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Delete_InsumobyIdOperacion(Cirugia_id, Tipo);
        }

        public List<Insumo> H2_QUIROFANO_LISTAR_INSUMOS(string Insumo)
        {
            List<Insumo> list = new List<Insumo>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_LISTAR_INSUMOSTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_LISTAR_INSUMOSTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_LISTAR_INSUMOSDataTable aTable = adapter.GetData(Insumo);
            foreach (QuirofanoDAL.H2_QUIROFANO_LISTAR_INSUMOSRow row in aTable.Rows)
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


        public List<Parte_Anestesia> H2_QUIROFANO_PARTE_ANESTESIA_CARGAR(long CirugiaId)
        {
            List<Parte_Anestesia> list = new List<Parte_Anestesia>();
            QuirofanoDALTableAdapters.H2_Quirofano_Parte_Anestesia_CargarTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Parte_Anestesia_CargarTableAdapter();
            QuirofanoDAL.H2_Quirofano_Parte_Anestesia_CargarDataTable aTable = adapter.GetData(CirugiaId);
            foreach (QuirofanoDAL.H2_Quirofano_Parte_Anestesia_CargarRow row in aTable.Rows)
            {

                Parte_Anestesia cargado = new Parte_Anestesia();

                if (!row.IsEspecialidadNull()) cargado.Especialidad = row.Especialidad;
                if (!row.IsHora_IngresoNull()) cargado.Hora_Ingreso = row.Hora_Ingreso;
                if (!row.IsHora_FinNull()) cargado.Hora_Fin = row.Hora_Fin;
                if (!row.IsEdadNull()) cargado.Edad = row.Edad.ToString();
                if (!row.IsPesoNull()) cargado.Peso = row.Peso;

                if (!row.IsPremeditacionNull()) cargado.Premeditacion = row.Premeditacion;
                if (!row.IsInduccionNull()) cargado.Induccion = row.Induccion;
                if (!row.IsSangreNull()) cargado.Sangre = row.Sangre;
                if (!row.IsPlasmaNull()) cargado.Plasma = row.Plasma;
                if (!row.IsSueroNull()) cargado.Suero = row.Suero;
                if (!row.IsOtroNull()) cargado.Otro = row.Otro;

                if (!row.IsHALLAZGOS_FISICOS_ANORMALESNull()) cargado.HALLAZGOS_FISICOS_ANORMALES = row.HALLAZGOS_FISICOS_ANORMALES;
                if (!row.IsAGENTES_ANESTESICOSNull()) cargado.AGENTES_ANESTESICOS = row.AGENTES_ANESTESICOS;
                if (!row.IsMETODOS_ANESTESICOSNull()) cargado.METODOS_ANESTESICOS = row.METODOS_ANESTESICOS;
                if (!row.IsRECUPERACIONNull()) cargado.RECUPERACION = row.RECUPERACION;
                if (!row.IsOBSERVACIONESNull()) cargado.OBSERVACIONES = row.OBSERVACIONES;

                if (!row.IsSexoNull()) cargado.SEXO = row.Sexo;


                list.Add(cargado);
            }
            return list;
        }


        public void H2_QUIROFANO_PARTE_ANESTESIA_GUARDAR(long Cirugia_Id, Parte_Anestesia Datos, int Usuario, List<Post_csv> l_csv, List<Post_Monitoreo> l_monitoreo)
        {
            long id = 0;
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H3_Quirofano_Actualizar_Peso(Datos.Peso, Convert.ToInt32(Cirugia_Id));
            object ob = adapter.H2_Quirofano_Parte_Anestesia_Guardar(Cirugia_Id, Datos.Peso, Datos.Induccion, Datos.Sangre, Datos.Plasma, Datos.Suero, Datos.Otro, Datos.HALLAZGOS_FISICOS_ANORMALES, Datos.AGENTES_ANESTESICOS, Datos.METODOS_ANESTESICOS, Datos.RECUPERACION, Datos.OBSERVACIONES, Usuario, Datos.Premeditacion);

            try
            {
                id = Convert.ToInt64(ob);

                foreach (Post_csv csv in l_csv)
                {
                    adapter.H2_QUIROFANO_PARTE_ANESTESIA_CONTROL_SIGNOS_VITALES_GUARDAR(csv.id, csv.txt_TA, csv.txt_FC, csv.txt_FR, csv.txt_TEMP, csv.txt_SPO2, csv.txt_hora, id, csv.eliminado);
                }


                foreach (Post_Monitoreo pm in l_monitoreo)
                {
                    adapter.H2_QUIROFANO_PARTE_ANESTESIA_DETALLE_MONITOREO_GUARDAR(pm.id, pm.txt_sato2, pm.txt_hto, pm.txt_hb, pm.txt_ph, pm.txt_po2, pm.txt_pco2, pm.txt_quick, pm.txt_hco3, pm.txt_na, pm.txt_cl, pm.txt_k, pm.txt_kptt, pm.txt_sat, pm.txt_eb, pm.txt_hora2, id, pm.eliminado);
                }


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }



        }



        public void H2_QUIROFANO_POST_GUARDAR(Post_Gral cg, List<Post_csv> l_csv, List<Post_Monitoreo> l_pm)
        {
            long id = 0;
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object ob = adapter.H2_QUIROFANO_POST_CABECERA_GUARDAR(cg.cirugia_id, cg.txt_sol_fisiologica, cg.txt_dextrosa, cg.txt_ringer_lactato, cg.txt_expansor_plasmatico, cg.txt_observaciones, cg.eliminado, cg.txt_hora_fin, cg.txt_hora_ingreso, cg.sondas_nasogastrica, cg.sondas_vesical, cg.cant_sondas, cg.enfermero);
            try
            {
                id = Convert.ToInt64(ob);

                foreach (Post_csv csv in l_csv)
                {
                    adapter.H2_QUIROFANO_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_GUARDAR(csv.id, csv.txt_TA, csv.txt_FC, csv.txt_FR, csv.txt_TEMP, csv.txt_SPO2, csv.txt_hora, id, csv.eliminado);
                }

                foreach (Post_Monitoreo pm in l_pm)
                {
                    adapter.H2_QUIROFANO_POST_CABECERA_DETALLE_MONITOREO_GUARDAR(pm.id, pm.txt_sato2, pm.txt_hto, pm.txt_hb, pm.txt_ph, pm.txt_po2, pm.txt_pco2, pm.txt_quick, pm.txt_hco3, pm.txt_na, pm.txt_cl, pm.txt_k, pm.txt_kptt, pm.txt_sat, pm.txt_eb, pm.txt_hora2, id, pm.eliminado);
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }





        public Post_Gral H2_QUIROFANO_POST_CARGAR(long Cirugia_Id)
        {
            Post_Gral cargado = new Post_Gral();
            QuirofanoDALTableAdapters.H2_QUIROFANO_POST_CABECERA_CARGARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_POST_CABECERA_CARGARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_POST_CABECERA_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
            foreach (QuirofanoDAL.H2_QUIROFANO_POST_CABECERA_CARGARRow row in aTable.Rows)
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


        public List<Post_csv> H2_QUIROFANO_POST_SIGNOS_VITALES_CARGAR(long Cirugia_Id)
        {
            List<Post_csv> lista = new List<Post_csv>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
            foreach (QuirofanoDAL.H2_QUIROFANO_POST_CABECERA_DETALLE_CONTROL_SIGNOS_VITALES_CARGARRow row in aTable.Rows)
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





        public List<Post_csv> H2_QUIROFANO_PARTE_ANESTESIA_CONTROL_SIGNOS_VITALES_CARGAR(long Cirugia_Id)
        {
            List<Post_csv> lista = new List<Post_csv>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_PARTE_ANESTESIA_CONTROL_SIGNOS_VITALES_CARGARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_PARTE_ANESTESIA_CONTROL_SIGNOS_VITALES_CARGARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_PARTE_ANESTESIA_CONTROL_SIGNOS_VITALES_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
            foreach (QuirofanoDAL.H2_QUIROFANO_PARTE_ANESTESIA_CONTROL_SIGNOS_VITALES_CARGARRow row in aTable.Rows)
            {
                Post_csv cargado = new Post_csv();
                if (!row.IsQPACSV_ELIMINADONull()) cargado.eliminado = row.QPACSV_ELIMINADO;
                cargado.id = row.QPACSV_ID;
                if (!row.IsQPACSV_FCNull()) cargado.txt_FC = row.QPACSV_FC;
                if (!row.IsQPACSV_FRNull()) cargado.txt_FR = row.QPACSV_FR;
                if (!row.IsQPACSV_HORANull()) cargado.txt_hora = row.QPACSV_HORA;
                if (!row.IsQPACSV_SPO2Null()) cargado.txt_SPO2 = row.QPACSV_SPO2;
                if (!row.IsQPACSV_TANull()) cargado.txt_TA = row.QPACSV_TA;
                if (!row.IsQPACSV_TEMPNull()) cargado.txt_TEMP = row.QPACSV_TEMP;
                lista.Add(cargado);
            }

            return lista;
        }



        public List<Post_Monitoreo> H2_QUIROFANO_POST_MONITOREO_CARGAR(long Cirugia_Id)
        {
            List<Post_Monitoreo> lista = new List<Post_Monitoreo>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_POST_CABECERA_DETALLE_MONITOREO_CARGARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_POST_CABECERA_DETALLE_MONITOREO_CARGARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_POST_CABECERA_DETALLE_MONITOREO_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
            foreach (QuirofanoDAL.H2_QUIROFANO_POST_CABECERA_DETALLE_MONITOREO_CARGARRow row in aTable.Rows)
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


        public List<Post_Monitoreo> H2_QUIROFANO_PARTE_ANESTESIA_MONITOREO_CARGAR(long Cirugia_Id)
        {
            List<Post_Monitoreo> lista = new List<Post_Monitoreo>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_PARTE_ANESTESIA_DETALLE_MONITOREO_CARGARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_PARTE_ANESTESIA_DETALLE_MONITOREO_CARGARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_PARTE_ANESTESIA_DETALLE_MONITOREO_CARGARDataTable aTable = adapter.GetData(Cirugia_Id);
            foreach (QuirofanoDAL.H2_QUIROFANO_PARTE_ANESTESIA_DETALLE_MONITOREO_CARGARRow row in aTable.Rows)
            {
                Post_Monitoreo cargado = new Post_Monitoreo();
                if (!row.IsQPAM_ELIMINADONull()) cargado.eliminado = row.QPAM_ELIMINADO;
                cargado.id = row.QPAM_ID;
                if (!row.IsQPAM_CLNull()) cargado.txt_cl = row.QPAM_CL;
                if (!row.IsQPAM_EBNull()) cargado.txt_eb = row.QPAM_EB;
                if (!row.IsQPAM_HBNull()) cargado.txt_hb = row.QPAM_HB;
                if (!row.IsQPAM_HC03Null()) cargado.txt_hco3 = row.QPAM_HC03;
                if (!row.IsQPAM_HORANull()) cargado.txt_hora2 = row.QPAM_HORA;
                if (!row.IsQPAM_HTONull()) cargado.txt_hto = row.QPAM_HTO;
                if (!row.IsQPAM_KNull()) cargado.txt_k = row.QPAM_K;
                if (!row.IsQPAM_KPTTNull()) cargado.txt_kptt = row.QPAM_KPTT;
                if (!row.IsQPAM_NANull()) cargado.txt_na = row.QPAM_NA;
                if (!row.IsQPAM_PC02Null()) cargado.txt_pco2 = row.QPAM_PC02;
                if (!row.IsQPAM_PHNull()) cargado.txt_ph = row.QPAM_PH;
                if (!row.IsQPAM_PO2Null()) cargado.txt_po2 = row.QPAM_PO2;
                if (!row.IsQPAM_QUICKNull()) cargado.txt_quick = row.QPAM_QUICK;
                if (!row.IsQPAM_SATNull()) cargado.txt_sat = row.QPAM_SAT;
                if (!row.IsQPAM_SAT02Null()) cargado.txt_sato2 = row.QPAM_SAT02;

                lista.Add(cargado);
            }

            return lista;
        }



        public void H2_QUIROFANO_CAMBIAR_PACIENTE_PROVISORIO(long CirugiaId, long PacienteId)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            adapter.H2_QUIROFANO_CAMBIAR_PACIENTE_PROVISORIO(PacienteId, CirugiaId);
        }


        public Quirofano_Estado H2_QUIROFANO_ESTADOS(long Cirugia_Id)
        {
            Quirofano_Estado Estado = new Quirofano_Estado();
            QuirofanoDALTableAdapters.H2_Quirofano_EstadosTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_EstadosTableAdapter();
            QuirofanoDAL.H2_Quirofano_EstadosDataTable aTable = adapter.GetData(Cirugia_Id);
            if (aTable.Count > 0)
            {
                QuirofanoDAL.H2_Quirofano_EstadosRow row = aTable[0];
                if (!row.IsPRENull()) Estado.PRE = row.PRE;
                if (!row.IsQXNull()) Estado.QX = row.QX;
                if (!row.IsR28_ALGONull()) Estado.R28_ALGO = row.R28_ALGO;
                if (!row.IsR28_COMPLETONull()) Estado.R28_COMPLETO = row.R28_COMPLETO;

            }
            return Estado;
        }


        public int? H2_Quirofano_Permiso_Edicion(int Cirugia_Id)
        {
            QuirofanoDALTableAdapters.H2_Quirofano_Permiso_EdicionTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Permiso_EdicionTableAdapter();
            QuirofanoDAL.H2_Quirofano_Permiso_EdicionDataTable aTable = adapter.GetData(Cirugia_Id);
            if (aTable.Count > 0)
            {
                return aTable[0].Fecha_Diferencia;
            }
            else
            {
                return null;
            }
        }




        public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR_ADM_FILTRO(long InsumoId, DateTime FD, DateTime FH, int ServicioID, int TipoID, int MedidaID)
        {
            List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTROTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTROTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTRODataTable aTable = adapter.GetData(InsumoId, FD, FH, ServicioID, TipoID, MedidaID);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMO_X_FILTRORow row in aTable.Rows)
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

        public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR_ADM(long InsumoId, DateTime FD, DateTime FH, int ServicioID)
        {
            List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMOTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMODataTable aTable = adapter.GetData(InsumoId, FD, FH, ServicioID);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_X_INSUMORow row in aTable.Rows)
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
                LISTA.Add(I);
            }
            return LISTA;

        }


        public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR_ADM_DET(long InsumoId, int ServicioID)
        {
            List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_DETALLETableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_DETALLETableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_DETALLEDataTable aTable = adapter.GetData(InsumoId, ServicioID);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTAR_DETALLERow row in aTable.Rows)
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

        public List<INSUMO_EXTRA_ORTOPEDIA> INSUMO_EXTRA_ORTOPEDIA_LISTAR(long ID)
        {
            List<INSUMO_EXTRA_ORTOPEDIA> LISTA = new List<INSUMO_EXTRA_ORTOPEDIA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_ORTOPEDIA_LISTARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_ORTOPEDIA_LISTARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_ORTOPEDIA_LISTARDataTable aTable = adapter.GetData(ID);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_ORTOPEDIA_LISTARRow row in aTable.Rows)
            {
                INSUMO_EXTRA_ORTOPEDIA O = new INSUMO_EXTRA_ORTOPEDIA();
                O.id = row.QEO_ID;
                O.descripcion = row.QEO_DESCRPCION;
                LISTA.Add(O);
            }
            return LISTA;
        }




        public bool INSUMO_EXTRA_CREAR_NOMBRE(long InsumoId, string Nombre, int StockMinimo, bool EnStock)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_CREARINSUMO(InsumoId, Nombre, StockMinimo, EnStock);
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
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_ORTOPEDIA_ALTA(Id, Nombre);
                return true;
            }
            catch
            {
                return false;
            }
        }



        public string INSUMO_EXTRA_ALTA(long QES_INSUMOID, DateTime QES_FECHA_VENCIMIENTO, int QES_USUARIO, string QES_MOVIMIENTO, int QES_MOTIVOID, string QES_OBSERVACION, int QES_ORTOPEDIAID, bool QES_UOM, string QES_CODIGOBARRA, string QES_DESCRIPCION, int CANTIDAD, int SERVICIO, long TIPOID, long MEDIDAID, long MARCAID, string desposito)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                object Salida = adapter.H2_QUIROFANO_INSUMO_EXTRA_INSERTAR(QES_INSUMOID, QES_FECHA_VENCIMIENTO, QES_USUARIO, QES_MOVIMIENTO, QES_MOTIVOID, QES_OBSERVACION, QES_ORTOPEDIAID, QES_UOM, QES_CODIGOBARRA, QES_DESCRIPCION, CANTIDAD, SERVICIO, TIPOID, MEDIDAID, MARCAID, desposito);
                return Salida.ToString();
            }
            catch
            {
                return "";
            }
        }



        public bool INSUMO_EXTRA_BAJA(string CodBarra, int Usuario, int Motivo, string Observacion)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_ELIMINAR(CodBarra, Usuario, Motivo, Observacion);
                return true;
            }
            catch
            {
                return false;
            }
        }



        public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTAR(int EspecialidadID, bool NoStock)
        {
            List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTARDataTable aTable = adapter.GetData(EspecialidadID, NoStock);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTARRow row in aTable.Rows)
            {
                INSUMO_EXTRA I = new INSUMO_EXTRA();
                I.id = row.QE_ID;
                I.nombre = row.QE_NOMBRE;
                I.enstock = row.QE_ENSTOCK;
                LISTA.Add(I);
            }
            return LISTA;
        }


        public INSUMO_EXTRA INSUMO_EXTRA_CARGARINSUMO_X_ID(long ID)
        {
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_CARGARINSUMO_X_IDTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_CARGARINSUMO_X_IDTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_CARGARINSUMO_X_IDDataTable aTable = adapter.GetData(ID);
            INSUMO_EXTRA I = new INSUMO_EXTRA();
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_CARGARINSUMO_X_IDRow row in aTable.Rows)
            {
                I.id = row.QE_ID;
                I.nombre = row.QE_NOMBRE;
                if (!row.IsQE_STOCKMINIMONull()) I.stock_minimo = row.QE_STOCKMINIMO; else I.stock_minimo = 0;
                I.enstock = row.QE_ENSTOCK;
            }
            return I;
        }

        public List<INSUMO_EXTRA_SERVICIO> INSUMO_EXTRA_SERVICIOS_LISTAR(long ID)
        {
            List<INSUMO_EXTRA_SERVICIO> LISTA = new List<INSUMO_EXTRA_SERVICIO>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_SERVICIO_LISTATableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_SERVICIO_LISTATableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_SERVICIO_LISTADataTable aTable = adapter.GetData(ID);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_SERVICIO_LISTARow row in aTable.Rows)
            {
                INSUMO_EXTRA_SERVICIO S = new INSUMO_EXTRA_SERVICIO();
                S.id = row.QESV_ID;
                S.descripcion = row.QESV_DESCRIPCION;
                S.abreviatura = row.QESV_ABREVIATURA;
                LISTA.Add(S);
            }
            return LISTA;
        }



        public bool INSUMO_EXTRA_SERVICIOS_ALTA(long ID, string SERVICIO, string ABREVIATURA)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_SERVICIO_ALTA(ID, SERVICIO, ABREVIATURA);
                return true;
            }
            catch
            {
                return false;
            }

        }

        public List<INSUMO_EXTRA_MOTIVO> INSUMO_EXTRA_MOTIVO_LISTAR(int Tipo)
        {
            List<INSUMO_EXTRA_MOTIVO> LISTA = new List<INSUMO_EXTRA_MOTIVO>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_MOTIVO_LISTATableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_MOTIVO_LISTATableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_MOTIVO_LISTADataTable aTable = adapter.GetData(Tipo);
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_MOTIVO_LISTARow row in aTable.Rows)
            {
                INSUMO_EXTRA_MOTIVO M = new INSUMO_EXTRA_MOTIVO();
                M.id = row.QEMOV_ID;
                M.descripcion = row.QEMOV_DESCRIPCION;
                LISTA.Add(M);
            }
            return LISTA;
        }


        public INSUMO_EXTRA INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADO(long CodBar)
        {
            try
            {
                INSUMO_EXTRA I = new INSUMO_EXTRA();
                QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADOTableAdapter();
                QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADODataTable aTable = adapter.GetData(CodBar);
                foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRA_NOUSADORow row in aTable.Rows)
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




        public INSUMO_EXTRA INSUMO_EXTRA_CARGAR_X_CODBARRA(long CodBar)
        {
            try
            {
                INSUMO_EXTRA I = new INSUMO_EXTRA();
                QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRATableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRATableAdapter();
                QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRADataTable aTable = adapter.GetData(CodBar);
                foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_CARGAR_X_CODBARRARow row in aTable.Rows)
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

        public bool INSUMO_EXTRA_ACTUALIZAR_X_CODBARRA(long CodBar, int SERVICIO, bool UOM, long ORTOPEDIAID, DateTime FechaVencimiento, int MOTIVO, string OBSERVACION, int Usuario, long TipoId, long MedidaId, long MarcaId, string Deposito)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_ACTUALIZAR_X_CODBARRA(CodBar, SERVICIO, UOM, ORTOPEDIAID, FechaVencimiento, MOTIVO, OBSERVACION, Usuario, TipoId, MedidaId, MarcaId, Deposito);
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
                HemodinamiaDALTableAdapters.QueriesTableAdapter adapter = new HemodinamiaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_HEMODINAMIA_INSUMO_EXTRA_UTILIZAR_X_CODBARRA(CodBar, MOTIVO, OBSERVACION, USUARIO);
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
                QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_FUEUSADOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_FUEUSADOTableAdapter();
                QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_FUEUSADODataTable aTable = adapter.GetData(INSUMOID);
                foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_FUEUSADORow row in aTable.Rows)
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

        public bool INSUMO_EXTRA_ELIMINAR(long INSUMOID)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_ELIMINARINSUMO(INSUMOID);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<INSUMO_EXTRA> INSUMO_EXTRA_LISTARTODOS()
        {
            List<INSUMO_EXTRA> LISTA = new List<INSUMO_EXTRA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTARTODOSLOSINSUMOSTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_LISTARTODOSLOSINSUMOSTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTARTODOSLOSINSUMOSDataTable aTable = adapter.GetData();
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_LISTARTODOSLOSINSUMOSRow row in aTable.Rows)
            {
                INSUMO_EXTRA I = new INSUMO_EXTRA();
                I.id = row.QES_INSUMOID;
                I.codigo = row.QES_CODIGOBARRA.ToString();
                I.nombre = row.QE_NOMBRE;
                LISTA.Add(I);
            }
            return LISTA;
        }

        public List<QuirofanoProtesis> Quirofano_Extra_Protesis_Lista_Det(long CirugiaID)
        {
            List<QuirofanoProtesis> Lista = new List<QuirofanoProtesis>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_Protesis_Lista_DetTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_Protesis_Lista_DetTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_Protesis_Lista_DetDataTable aTable = adapter.GetData(CirugiaID);

            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_Protesis_Lista_DetRow row in aTable.Rows)
            {
                QuirofanoProtesis I = new QuirofanoProtesis();
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

        public bool Quirofano_Extra_Protesis_Borrar_Det(long CirugiaID, string CB)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_PROTESIS_BORRAR_Det(CirugiaID, CB);
                return true;
            }
            catch
            {
                return false;
            }
        }



        public bool Quirofano_Extra_Protesis_Guardar_Det(long CirugiaID, string CodigoBarra)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_PROTESIS_GUARDAR_DET(CirugiaID, CodigoBarra);
                return true;
            }
            catch
            {
                return false;
            }
        }


        public bool INSUMO_EXTRA_CREAR_NOMBRE_AUTOMATICO(long InsumoId, string Nombre)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_CREARINSUMO_AUTOMATICO(InsumoId, Nombre);
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
                QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_INSERTAR_AUTOMATICOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_INSERTAR_AUTOMATICOTableAdapter();
                QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_INSERTAR_AUTOMATICODataTable aTable = adapter.GetData(QES_INSUMOID, QES_FECHA_VENCIMIENTO, QES_USUARIO, QES_OBSERVACION, QES_ORTOPEDIAID, QES_UOM, QES_CODIGOBARRA, QES_DESCRIPCION, SERVICIO, CANTIDAD, TIPO, MEDIDA, MARCA);
                foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_INSERTAR_AUTOMATICORow row in aTable.Rows)
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

        public bool Quirofano_Extra_EsViejo(long CirugiaID)
        {
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_EXISTEEXTRATableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_EXISTEEXTRATableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_EXISTEEXTRADataTable aTable = adapter.GetData(CirugiaID);

            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_EXISTEEXTRARow row in aTable.Rows)
            {
                if (!row.IsAuxiNull()) return true; else return false;
            }
            return false;
        }








        public bool QUIROFANO_EXTRA_ALTATIPO(long QETIPO_ID, int QERUBRO_ID, string QETIPO_TIPO)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_EXTRA_ALTATIPO(QETIPO_ID, QERUBRO_ID, QETIPO_TIPO);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool QUIROFANO_EXTRA_BAJATIPO(long QETIPO_ID)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_EXTRA_BAJATIPO(QETIPO_ID);
                return true;
            }
            catch
            {
                return false;
            }
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





        public bool QUIROFANO_EXTRA_ALTAMEDIDA(int RubroId, long TipoId, long MedidaId, string Medida)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_EXTRA_ALTAMEDIDA(RubroId, TipoId, MedidaId, Medida);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool QUIROFANO_EXTRA_BAJAMEDIDA(long MedidaId)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_EXTRA_BAJAMEDIDA(MedidaId);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<INSUMO_EXTRA_MEDIDA> QUIROFANO_EXTRA_LISTARMEDIDA(long MedidaId, int RubroId, long TipoId)
        {
            List<INSUMO_EXTRA_MEDIDA> Lista = new List<INSUMO_EXTRA_MEDIDA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTARMEDIDATableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_EXTRA_LISTARMEDIDATableAdapter();
            QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTARMEDIDADataTable aTable = adapter.GetData(MedidaId, RubroId, TipoId);
            foreach (QuirofanoDAL.H2_QUIROFANO_EXTRA_LISTARMEDIDARow row in aTable.Rows)
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







        internal List<INSUMO_EXTRA_ORTOPEDIA> INSUMO_EXTRA_MARCAS_LISTAR()
        {
            List<INSUMO_EXTRA_ORTOPEDIA> Lista = new List<INSUMO_EXTRA_ORTOPEDIA>();
            QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_MARCA_LISTARTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_INSUMO_EXTRA_MARCA_LISTARTableAdapter();
            QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_MARCA_LISTARDataTable aTable = adapter.GetData();
            foreach (QuirofanoDAL.H2_QUIROFANO_INSUMO_EXTRA_MARCA_LISTARRow row in aTable.Rows)
            {
                INSUMO_EXTRA_ORTOPEDIA M = new INSUMO_EXTRA_ORTOPEDIA();
                M.id = row.QEM_ID;
                M.descripcion = row.QEM_MARCA;
                Lista.Add(M);
            }
            return Lista;
        }

        public bool INSUMO_EXTRA_MARCA_INSERTAR(long ID, string MARCA)
        {
            try
            {
                QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
                adapter.H2_QUIROFANO_INSUMO_EXTRA_MARCA_ALTA(ID, MARCA);
                return true;
            }
            catch
            {
                return false;
            }
        }


        public IMPRESION_ESTADOS QUIROFANO_IMPRESION_LISTADO_ESTADO(int ID)
        {
            try
            {
                IMPRESION_ESTADOS Estado = new IMPRESION_ESTADOS();
                QuirofanoDALTableAdapters.H2_QUIROFANO_IMPRESION_LISTADO_ESTADOTableAdapter adapter = new QuirofanoDALTableAdapters.H2_QUIROFANO_IMPRESION_LISTADO_ESTADOTableAdapter();
                QuirofanoDAL.H2_QUIROFANO_IMPRESION_LISTADO_ESTADODataTable aTable = adapter.GetData(ID);
                foreach (QuirofanoDAL.H2_QUIROFANO_IMPRESION_LISTADO_ESTADORow row in aTable)
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



        public List<usuarios> cargarEnfermeros()
        {
            QuirofanoDALTableAdapters.H2_Cargar_EnfermerosTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Cargar_EnfermerosTableAdapter();
            QuirofanoDAL.H2_Cargar_EnfermerosDataTable aTable = adapter.GetData();
            List<usuarios> l = new List<usuarios>();
            foreach (QuirofanoDAL.H2_Cargar_EnfermerosRow row in aTable)
            {
                usuarios u = new usuarios();
                u.id = row.id;
                u.usuario = row.usuario;
                l.Add(u);
            }
            return l;
        }


        public bool Verificar_Usuario_Cirujano(int usuario)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Verificar_Usuario_Cirujano(usuario);

            if (obj != null)
                return Convert.ToBoolean(obj);
            else
                return false;
        }

        public int Generar_Registro_Turno_Parte_Quirurgico(int id, string fecha, bool dadodebaja, int turno, int cuales, string ruta, int usuario)
        {
            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Generar_Registro_Turno_Parte_Quirurgico(id,fecha,dadodebaja,turno,cuales,ruta,usuario);
            if (obj != null)
                return Convert.ToInt32(obj);
            else
                return 0;
        }

        public List<ParteQuirurgicoGenerado> TraerPartesQuirurgicosGenerados()
        {
            QuirofanoDALTableAdapters.H2_Traer_Partes_Quirurgicos_GeneradosTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Traer_Partes_Quirurgicos_GeneradosTableAdapter();
            QuirofanoDAL.H2_Traer_Partes_Quirurgicos_GeneradosDataTable aTable = adapter.GetData();
            List<ParteQuirurgicoGenerado> l = new List<ParteQuirurgicoGenerado>();
            foreach (QuirofanoDAL.H2_Traer_Partes_Quirurgicos_GeneradosRow row in aTable)
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


        public long ParteAnestesiaGuardar(long id, string[] celdas, datosAnestesia datos, int usuario)
        {
            string separadas = "";
            foreach (string item in celdas) {
                separadas = separadas + "|" + item; //item.Replace("|||", "|") + ",";
            }


            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Parte_Anestesia_Guardar(id,separadas,datos.anestesiologo,datos.cirujano,datos.cardiologo ,datos.obstetra ,datos.ayudante ,
datos.inicio ,datos.fin ,datos.profilaxis ,datos.diagnostico ,datos.programada ,datos.realizada ,datos.asa ,datos.protesis ,datos.lentes ,datos.proteccion ,datos.general ,
datos.nla ,datos.regional ,datos.intub ,datos.mask ,datos.espontanea ,datos.asistida ,datos.controlada ,datos.manual ,datos.mecanica ,datos.venopuntura ,datos.circuito ,
datos.premedic, datos.induc, datos.mantenim, datos.tecnica, datos.posicion, datos.anestesia, datos.tas, datos.tad, datos.tam, datos.pvs, datos.fc, datos.DescAnestesia, datos.aldrete, datos.pts, datos.ast, datos.depresionR,
datos.obedece ,datos.asf ,datos.depresionO ,datos.intub2 ,datos.conversa ,datos.nvpo ,datos.recup ,datos.habit ,datos.manual2 ,datos.nro ,datos.uti ,datos.alas ,datos.motivo ,
datos.observaciones, datos.pasa, datos.cirugiaId, usuario, datos.prioridad, datos.anestesiaNum, datos.balon, datos.ECG, datos.SAT, datos.ETCO2, datos.PANI, datos.TAI,datos.tipo);
            if (obj != null)
                return Convert.ToInt64(obj);
            else
                return 0;
        }



        public List<datosAnestesia> TraerParteAnestesia(long id, int tipo)
        {
            QuirofanoDALTableAdapters.H2_Traer_Parte_AnestesiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Traer_Parte_AnestesiaTableAdapter();
            QuirofanoDAL.H2_Traer_Parte_AnestesiaDataTable aTable = adapter.GetData(id,tipo);

            List<datosAnestesia> l = new List<datosAnestesia>();
            foreach (QuirofanoDAL.H2_Traer_Parte_AnestesiaRow row in aTable)
            {
                datosAnestesia c = new datosAnestesia();

                c.id = row.id;
                c.celdas = row.celdas;
                c.anestesiologo = row.anestesiologo ;
                c.cirujano = row.cirujano;
                c.cardiologo = row.cardiologo ;
                c.obstetra = row.obstetra ;
                c.ayudante = row.ayudante ;
                c.inicio = row.inicio ;
                c.fin = row.fin ;
                c.profilaxis = row.profilaxis ;
                c.diagnostico = row.diagnostico ;
                c.programada = row.programada ;
                c.realizada = row.realizada ;
                c.asa = row.asa ;
                c.protesis = row.protesis ;
                c.lentes = row.lentes ;
                c.proteccion = row.proteccion ;
                c.general = row.general ;
                c.nla = row.nla ;
                c.regional = row.regional ;
                c.intub = row.intub ;
                c.mask = row.mask ;
                c.espontanea = row.espontanea ;
                c.asistida = row.asistida ;
                c.controlada = row.controlada ;
                c.manual = row.manual ;
                c.mecanica = row.mecanica ;
                c.venopuntura = row.venopuntura ;
                c.circuito = row.circuito ;
                c.premedic = row.premedic ;
                c.induc = row.induc ;
                c.mantenim = row.mantenim ;
                c.tecnica = row.tecnica ;
                c.posicion = row.posicion;
                c.anestesia = row.anestesia;
                c.tas = row.tas ;
                c.tad = row.tad ;
                c.tam = row.tam ;
                c.pvs = row.pvs ;
                c.fc = row.fc ;
                c.DescAnestesia = row.DescAnestesia;
                c.aldrete = row.aldrete ;
                c.pts = row.pts ;
                c.ast = row .ast ;
                c.depresionR = row.depresionR ;
                c.obedece = row.obedece ;
                c.asf = row.asf ;
                c.depresionO = row.depresionO ;
                c.intub2 = row.intub2;
                c.conversa = row.conversa ;
                c.nvpo = row.nvpo ;
                c.recup = row.recup ;
                c.habit = row.habit ;
                c.manual2 = row.manual2 ;
                c.nro = row.nro ;
                c.uti = row.uti ;
                c.alas = row.alas ;
                c.motivo = row.motivo ;
                c.observaciones = row.observaciones ;
                c.pasa = row.pasa ;
                c.cirugiaId = row.cirugiaId;
                c.usuario = row.usuario;

                if (!row.IsprioridadNull()) { c.prioridad = row.prioridad; } else { c.prioridad = 0; }
                if (!row.IsanestesiaNumNull()) { c.anestesiaNum = row.anestesiaNum; } else { c.anestesiaNum = 0; }
                if (!row.IsbalonNull()) { c.balon = row.balon; } else { c.balon = 0; }
                if (!row.IsECGNull()) { c.ECG = row.ECG; } else { c.ECG = 0; }
                if (!row.IsSATNull()) { c.SAT = row.SAT; } else { c.SAT = 0; }
                if (!row.IsETCO2Null()) { c.ETCO2 = row.ETCO2; } else { c.ETCO2 = 0; }
                if (!row.IsPANINull()) { c.PANI = row.PANI; } else { c.PANI = 0; }
                if (!row.IsTAINull()) { c.TAI = row.TAI; } else { c.TAI = 0; }
                if (!row.IsMODIFICANull()) { c.modifica = row.MODIFICA; } else { c.modifica = 0; }
                l.Add(c);
            }
            return l;
            //if (obj != null)
            //    return Convert.ToInt32(obj);
            //else
            //    return 0;
        }




        public List<diagnostico> QuirofanoDiagnosticoPlanificarCirugia()
        {
            QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_PlanificarCirugiaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Diagnostico_PlanificarCirugiaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Diagnostico_PlanificarCirugiaDataTable aTable = adapter.GetData(0, true);

            List<diagnostico> l = new List<diagnostico>();
            foreach (QuirofanoDAL.H2_Quirofano_Diagnostico_PlanificarCirugiaRow row in aTable)
            {
                diagnostico d = new diagnostico();

                d.id = row.id;
                d.descripcion = row.Diagnostico;
                l.Add(d);
            }
            return l;
        }

        public long TraerIdParteAnestesia(long id, int tipo)
        {

            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Traer_Id_Parte_Anestesia(id,tipo);
            if (obj != null)
                return Convert.ToInt64(obj);
            else
                return 0;
        }

        public int VerficarExisteParteAnestesia(int cirugiaId, int tipo)
        {

            QuirofanoDALTableAdapters.QueriesTableAdapter adapter = new QuirofanoDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Verficar_Existe_Parte_Anestesia(cirugiaId, tipo);
            if (obj != null)
                return Convert.ToInt32(obj);
            else
                return 0;
        }

    }
}
