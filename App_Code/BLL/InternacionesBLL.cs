using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for InternacionesBLL
/// </summary>
namespace Hospital
{
    public class InternacionesBLL
    {
        public InternacionesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<hosppor> Hospitalizado_Por_Lista()
        {
            InternacionDALTableAdapters.H2_HospPor_ListTableAdapter adapter = new InternacionDALTableAdapters.H2_HospPor_ListTableAdapter();
            InternacionDAL.H2_HospPor_ListDataTable aTable = adapter.GetData(null, 1);

            List<hosppor> Lista = new List<hosppor>();

            foreach (InternacionDAL.H2_HospPor_ListRow row in aTable.Rows)
            {
                hosppor h = new hosppor();
                h.id = row.Id;
                h.descripcion = row.Descripcion;
                Lista.Add(h);
            }
            return Lista;
        }


        public List<motivoIngreso> Motivo_Ingreso()
        {
            InternacionDALTableAdapters.H2_MotivoIngreso_ListTableAdapter adapter = new InternacionDALTableAdapters.H2_MotivoIngreso_ListTableAdapter();
            InternacionDAL.H2_MotivoIngreso_ListDataTable aTable = adapter.GetData(null, 1);

            List<motivoIngreso> Lista = new List<motivoIngreso>();

            foreach (InternacionDAL.H2_MotivoIngreso_ListRow row in aTable.Rows)
            {
                motivoIngreso m = new motivoIngreso();
                m.id = row.Id;
                m.motivo = row.Descripcion;
                Lista.Add(m);
            }
            return Lista;
        }


        public List<motivoEgreso> Motivo_Egreso()
        {
            InternacionDALTableAdapters.H2_MotivoDeEgreso_ListTableAdapter adapter = new InternacionDALTableAdapters.H2_MotivoDeEgreso_ListTableAdapter();
            InternacionDAL.H2_MotivoDeEgreso_ListDataTable aTable = adapter.GetData(null);

            List<motivoEgreso> Lista = new List<motivoEgreso>();

            foreach (InternacionDAL.H2_MotivoDeEgreso_ListRow row in aTable.Rows)
            {
                motivoEgreso m = new motivoEgreso();
                m.id = row.Id;
                m.motivo = row.Descripcion;
                Lista.Add(m);
            }
            return Lista;
        }

        public long Ingreso_Guardar(int? Id, long NHC, DateTime Fecha, int Servicio, int Sala, int Cama, string Telefono, string Diagnostico, int Hospitalizadopor, int Motivo, string Observacion, int Especialidad, int Medico, int Usuario, long AfiliadoId, int Movimiento, string Direccion_Acompa)
        {
            try
            {
                InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
                object R = adapter.H2_Internacion_Guardar(Id, NHC, Fecha, Servicio, Sala, Cama, Telefono, Diagnostico, Hospitalizadopor, Motivo, Observacion, Especialidad, Medico, 1, Usuario, AfiliadoId, Movimiento,Direccion_Acompa);
                if (R != null) return Convert.ToInt64(R);
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public long Ingreso_Guardar_Ambulatorio_SN(int? Id, long NHC, DateTime Fecha, int Servicio, int Sala, int Cama, string Telefono, string Diagnostico, int Hospitalizadopor, int Motivo, string Observacion, int Especialidad, int Medico, int Usuario)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Internacion_Guardar_Ambulatorio_SN(Id, NHC, Fecha, Servicio, Sala, Cama, Telefono, Diagnostico, Hospitalizadopor, Motivo, Observacion, Especialidad, Medico, 1, Usuario);
            return Convert.ToInt64(R);
        }

        public int UltimoMovimiento_Pac(long IdPaciente)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            try
            {
                object r = adapter.H2_INTERNACION_ULTIMO_MOV_BY_PAC(IdPaciente);
                return Convert.ToInt32(r.ToString());
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Internacion_Baja(int Id, string Obs)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_INTERNACION_DAR_BAJA(Id, Obs);
        }

        public void Internacion_Baja_Ambulatorio(int Id)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_INTERNACION_DAR_BAJA_AMBULATORIO_SN(Id);
        }

        public void Internacion_Borrar_Egreso(int Id, string Obs)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_INTERNACION_EGRESO_BORRAR(Id,Obs);
        }


        public void Insert_Datos_Acompa(Acompa_Internacion a)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_INTERNACION_ACOMPA_INSERT(a.NroInternacion, a.Nombre, a.TipoDoc, a.DNI, a.Parentezco, a.Calle, a.Numero, a.Piso, a.CP, a.Localidad, a.Provincia, a.Telefono, a.Observaciones);
        }

        public int_ingreso Ingreso_Id(int id)
        {
            InternacionDALTableAdapters.H2_Internacion_IdTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_IdTableAdapter();
            InternacionDAL.H2_Internacion_IdDataTable aTable = adapter.GetData(id);

            if (aTable.Rows.Count > 0)
            {
                int_ingreso i = new int_ingreso();
                i.id = aTable[0].Id;
                i.fecha = aTable[0].Fecha;
                i.AfiliadoId = aTable[0].AfiliadoId;
                i.dia = i.fecha.ToShortDateString();
                i.hora = i.fecha.ToString("HH:mm");

                if (!aTable[0].IsNHCNull()) { i.NHC = aTable[0].NHC; } else { i.NHC = 0; }

                i.servicioId = aTable[0].ServicioId;
                i.salaId = aTable[0].SalaId;
                i.CamaId = aTable[0].CamaId;
                i.telefono = aTable[0].Telefono;
                if (!aTable[0].IsDiagnosticoNull()) { i.diagnostico = aTable[0].Diagnostico; } else { i.diagnostico = ""; }
                i.hospitalizadopor = aTable[0].HospPorId;
                i.motivoingreso = aTable[0].MotivoIngresoId;
                if (!aTable[0].IsObservacionesNull()) { i.observaciones = aTable[0].Observaciones; } else { i.observaciones = ""; }
                i.especialidad = aTable[0].EspecialidadId;
                i.medico = aTable[0].MedicoId;
                i.servicio = aTable[0].Servicio;
                i.cama = aTable[0].Cama;
                i.sala = aTable[0].Sala;

                if (!aTable[0].IsDireccion_AcompaNull()) i.direccion_acompa = aTable[0].Direccion_Acompa;
                else i.direccion_acompa = string.Empty;

                return i;
            }
            return null;
        }

        public int_ingreso Ingreso_Id_AmbulatorioSN(int id)
        {
            InternacionDALTableAdapters.H2_Internacion_Id_Ambulatorio_SNTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Id_Ambulatorio_SNTableAdapter();
            InternacionDAL.H2_Internacion_Id_Ambulatorio_SNDataTable aTable = adapter.GetData(id);

            if (aTable.Rows.Count > 0)
            {
                int_ingreso i = new int_ingreso();
                i.id = (int)aTable[0].Id;
                i.fecha = aTable[0].Fecha;

                i.dia = i.fecha.ToShortDateString();
                i.hora = i.fecha.ToString("HH:mm");

                if (!aTable[0].IsNHCNull()) { i.NHC = aTable[0].NHC; } else { i.NHC = 0; }

                i.servicioId = aTable[0].ServicioId;
                i.salaId = aTable[0].SalaId;
                i.CamaId = aTable[0].CamaId;
                i.telefono = aTable[0].Telefono;
                if (!aTable[0].IsDiagnosticoNull()) { i.diagnostico = aTable[0].Diagnostico; } else { i.diagnostico = ""; }
                i.hospitalizadopor = aTable[0].HospPorId;
                i.motivoingreso = aTable[0].MotivoIngresoId;
                if (!aTable[0].IsObservacionesNull()) { i.observaciones = aTable[0].Observaciones; } else { i.observaciones = ""; }
                i.especialidad = aTable[0].EspecialidadId;
                i.medico = aTable[0].MedicoId;
                return i;
            }
            return null;
        }

        public int_egreso Egreso_Id(int id)
        {
            InternacionDALTableAdapters.H2_Egreso_Cargar_IdTableAdapter adapter = new InternacionDALTableAdapters.H2_Egreso_Cargar_IdTableAdapter();
            InternacionDAL.H2_Egreso_Cargar_IdDataTable aTable = adapter.GetData(id);

            if (aTable.Rows.Count > 0)
            {
                int_egreso i = new int_egreso();

                if (!aTable[0].IsICD10Null()) { i.diagnosticoicd10 = aTable[0].ICD10; }
                if (!aTable[0].IsICD10_DescNull()) i.diagnosticoicd10_desc = aTable[0].ICD10_Desc;

                if (!aTable[0].IsICD10Detalle2Null()) { i.detalleicd10 = aTable[0].ICD10Detalle2; }
                if (!aTable[0].IsICD10_2DescNull()) i.detalleicd10_desc = aTable[0].ICD10_2Desc;

                if (!aTable[0].IsICD10Detalle3Null()) i.detalleicd10_3 = aTable[0].ICD10Detalle3;
                if (!aTable[0].IsICD10_3DescNull()) i.detalleicd10_3desc = aTable[0].ICD10_3Desc;

                if (!aTable[0].IsMotivoDeEgresoIdNull()) { i.motivoegreso = aTable[0].MotivoDeEgresoId; }
                if (!aTable[0].IsObservacionFinalNull()) { i.observacionegreso = aTable[0].ObservacionFinal; }
                if (!aTable[0].IsOperadoNull()) { if (aTable[0].Operado) { i.operado = "Si"; i.bclas = "btn-success"; } else { i.operado = "No"; i.bclas = "btn-danger"; } } else { i.operado = "No"; i.bclas = "btn-danger"; };
                if (!aTable[0].IsOperadoFechaNull()) { i.fechaoperado = aTable[0].OperadoFecha.ToShortDateString(); }
                if (!aTable[0].IsEgresoEspecialidadIdNull()) { i.egresoespecialidad = aTable[0].EgresoEspecialidadId; }
                if (!aTable[0].IsEgresoMedicoIdNull()) { i.egresomedico = aTable[0].EgresoMedicoId; }
                if (!aTable[0].IsNHCNull()) { i.NHC = Convert.ToInt64(aTable[0].NHC); }
                i.Paciente = aTable[0].apellido;
                if (!aTable[0].Isfecha_nacimientoNull()) { i.Edad = Convert.ToInt32(DateTime.Now.Year) - Convert.ToInt32(aTable[0].fecha_nacimiento.ToString("yyyy")); }
                i.DNI = aTable[0].documento;
                i.AfiliadoId = aTable[0].AfiliadoId;
                if (!aTable[0].IsSeccionalNull()) { i.Seccional = aTable[0].Seccional; }
                if (!aTable[0].IstelefonoNull()) { i.Telefono = aTable[0].telefono; }
                if (!aTable[0].IsFecha_EgresoNull())
                {
                    i.fechaegreso = aTable[0].Fecha_Egreso;
                    i.fecha = aTable[0].Fecha_Egreso;
                    i.dia = i.fecha.ToShortDateString();
                    i.hora = i.fecha.ToString("HH:mm");
                }
                i.cama = aTable[0].Cama;
                i.servicio = aTable[0].Servicio;
                i.sala = aTable[0].Sala;
                i.EgresoUsuario = aTable[0].UsuarioEgreso;
                i.fechaIngreso = aTable[0].fecha_ingreso;//MANUEL
                i.diaIngreso = i.fechaIngreso.ToShortDateString();//MANUEL
                i.horaIngreso = i.fechaIngreso.ToString("HH:mm");//MANUEL
                if (!aTable[0].IsDebeNull()) { i.debeControl = aTable[0].Debe; }
                if (!aTable[0].IsCualNull()) { i.idEntrega = aTable[0].Cual; }

                if (!aTable[0].IsfotoNEWNull()) { i.foto = aTable[0].fotoNEW; } else { i.foto = "..//img//silueta.jpg"; }

                return i;
            }
            return null;
        }

        public List<DiagnosticoICD10> Diagnosticos_SN()
        {
            List<DiagnosticoICD10> Lista = new List<DiagnosticoICD10>();
            InternacionDALTableAdapters.H2_INTERNACION_DIAG_SN_LISTTableAdapter adapter = new InternacionDALTableAdapters.H2_INTERNACION_DIAG_SN_LISTTableAdapter();
            InternacionDAL.H2_INTERNACION_DIAG_SN_LISTDataTable aTable = adapter.GetData();

            foreach (InternacionDAL.H2_INTERNACION_DIAG_SN_LISTRow row in aTable.Rows)
            {
                DiagnosticoICD10 d = new DiagnosticoICD10();
                d.Codigo = row.CodigoICD10;
                d.Descripcion = row.Descripcion_SN;
                Lista.Add(d);
            }
            return Lista;
        }


        public List<DiagnosticoICD10> DiagnosticoICD10(string Codigo)
        {
            List<DiagnosticoICD10> Lista = new List<DiagnosticoICD10>();
            //if (Codigo != "")
            //{
            InternacionDALTableAdapters.H2_DiagnosticoICD10TableAdapter adapter = new InternacionDALTableAdapters.H2_DiagnosticoICD10TableAdapter();
            InternacionDAL.H2_DiagnosticoICD10DataTable aTable = adapter.GetData(Codigo);

            foreach (InternacionDAL.H2_DiagnosticoICD10Row row in aTable.Rows)
            {
                DiagnosticoICD10 d = new DiagnosticoICD10();
                d.Codigo = row.Codigo;
                d.Descripcion = row.Descripcion;
                Lista.Add(d);
            }
            //}
            return Lista;
        }



        public List<DiagnosticoICD10Detalle> DiagnosticoICD10Detalles(string Codigo, string ICD10)
        {
            if (ICD10 == "0") ICD10 = "";
            InternacionDALTableAdapters.H2_DiagnosticoICD10_DetalleTableAdapter adapter = new InternacionDALTableAdapters.H2_DiagnosticoICD10_DetalleTableAdapter();
            InternacionDAL.H2_DiagnosticoICD10_DetalleDataTable aTable = adapter.GetData(Codigo, ICD10);

            List<DiagnosticoICD10Detalle> Lista = new List<DiagnosticoICD10Detalle>();

            foreach (InternacionDAL.H2_DiagnosticoICD10_DetalleRow row in aTable.Rows)
            {
                DiagnosticoICD10Detalle d = new DiagnosticoICD10Detalle();
                d.Codigo = row.Codigo.Trim();
                d.Descripcion = row.Descripcion;
                Lista.Add(d);
            }
            return Lista;
        }

        public List<DiagnosticoICD10Detalle> DiagnosticoICD10Detalles_Autocomplete(string str)
        {
            InternacionDALTableAdapters.H2_DiagnosticoICD10_Detalle_AutocompleteTableAdapter adapter = new InternacionDALTableAdapters.H2_DiagnosticoICD10_Detalle_AutocompleteTableAdapter();
            InternacionDAL.H2_DiagnosticoICD10_Detalle_AutocompleteDataTable aTable = adapter.GetData(str);

            List<DiagnosticoICD10Detalle> Lista = new List<DiagnosticoICD10Detalle>();

            foreach (InternacionDAL.H2_DiagnosticoICD10_Detalle_AutocompleteRow row in aTable.Rows)
            {
                DiagnosticoICD10Detalle d = new DiagnosticoICD10Detalle();
                d.Codigo = row.Codigo.Trim();
                d.Descripcion = row.Descripcion;
                Lista.Add(d);
            }
            return Lista;
        }

        public void Guardar_Egreso(int Id, string DiagnosticoICD10Id, string DiagnosticoICD10DetalleId, string ICD10_3, int Motivo, string ObservacionFinal, 
            bool Operado, DateTime? OperadoFecha, int EgresoEspecialidadId, int EgresoMedicoId, int Usuario, DateTime FechaEgreso)
        {
            try
            {
                InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Internacion_GuardarEgreso(Id, DiagnosticoICD10Id, DiagnosticoICD10DetalleId, ICD10_3, Motivo, ObservacionFinal, Operado, OperadoFecha,
                    EgresoEspecialidadId, EgresoMedicoId, Usuario, FechaEgreso);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public long InternacionId_by_NHC(string NHC)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Internacion_Id_by_NHC(NHC);
            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;
        }

        public long InternacionId_Egresoby_NHC(string NHC)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Internacion_Egreso_Id_by_NHC(NHC);
            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;
        }


        public List<buscarinternacion> Buscar_Internacion(int id, DateTime Fecha, DateTime FechaHasta, int ServicioId, int SalaId, int CamaId, int NroDoc, long NroHC, string NombreYApllido, string Todas)
        {
            InternacionDALTableAdapters.H2_Internacion_BuscarTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_BuscarTableAdapter();
            InternacionDAL.H2_Internacion_BuscarDataTable aTable = adapter.GetData(id, Fecha, FechaHasta, ServicioId, SalaId, CamaId, NroDoc, NroHC, NombreYApllido, Todas);
            List<buscarinternacion> Lista = new List<buscarinternacion>();
            foreach (InternacionDAL.H2_Internacion_BuscarRow row in aTable.Rows)
            {
                buscarinternacion i = new buscarinternacion();
                i.Id = (int)row.Id;
                i.Fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm");
                i.Servicio = row.Servicio;
                i.Sala = row.Sala;
                i.Cama = row.Cama;
                i.Paciente = row.NombreYApellido;
                i.NHC = row.NroHC.ToString();
                Lista.Add(i);
            }
            return Lista;
        }

        public List<buscarinternacion> Buscar_Internacion_Ambulatorio(int id, DateTime Fecha, DateTime FechaHasta, int ServicioId, int SalaId, int CamaId, int NroDoc, long NroHC, string NombreYApllido, string Todas)
        {
            InternacionDALTableAdapters.H2_Internacion_Buscar_Ambulatorio_SNTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Buscar_Ambulatorio_SNTableAdapter();
            InternacionDAL.H2_Internacion_Buscar_Ambulatorio_SNDataTable aTable = adapter.GetData(id, Fecha, FechaHasta, ServicioId, SalaId, CamaId, NroDoc, NroHC, NombreYApllido, Todas);

            List<buscarinternacion> Lista = new List<buscarinternacion>();


            foreach (InternacionDAL.H2_Internacion_Buscar_Ambulatorio_SNRow row in aTable.Rows)
            {
                buscarinternacion i = new buscarinternacion();
                i.Id = (int)row.Id;
                i.Fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm");
                i.Servicio = row.Servicio;
                i.Sala = row.Sala;
                i.Cama = row.Cama;
                i.Paciente = row.NombreYApellido;
                i.NHC = row.NroHC.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<buscarinternacion> Buscar_Internacion_Egresos(int id, DateTime Fecha, DateTime FechaHasta, int ServicioId, int SalaId, int CamaId, int NroDoc, long NroHC, string NombreYApllido, string Todas)
        {
            try
            {
                InternacionDALTableAdapters.H2_Internacion_Buscar_EgresosTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Buscar_EgresosTableAdapter();
                InternacionDAL.H2_Internacion_Buscar_EgresosDataTable aTable = adapter.GetData(id, Fecha, FechaHasta, ServicioId, SalaId, CamaId, NroDoc, NroHC, NombreYApllido, Todas);
                List<buscarinternacion> Lista = new List<buscarinternacion>();
                foreach (InternacionDAL.H2_Internacion_Buscar_EgresosRow row in aTable.Rows)
                {
                    buscarinternacion i = new buscarinternacion();
                    i.Id = (int)row.Id;
                    i.Fecha = row.EgresoFecha.ToString("dd/MM/yyyy HH:mm");
                    i.Servicio = row.Servicio;
                    i.Sala = row.Sala;
                    i.Cama = row.Cama;
                    i.Paciente = row.NombreYApellido;
                    i.NHC = row.NroHC.ToString();
                    Lista.Add(i);
                }
                return Lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public List<buscarinternacion> Buscar_Internacion_Id(int id)
        {
            try
            {
                InternacionDALTableAdapters.H2_Internacion_Buscar_IdTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Buscar_IdTableAdapter();
                InternacionDAL.H2_Internacion_Buscar_IdDataTable aTable = adapter.GetData(id);

                List<buscarinternacion> Lista = new List<buscarinternacion>();


                foreach (InternacionDAL.H2_Internacion_Buscar_IdRow row in aTable.Rows)
                {
                    buscarinternacion i = new buscarinternacion();
                    i.Id = Convert.ToInt32(row.Id);
                    i.Fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm");
                    i.Servicio = row.Servicio;
                    i.Sala = row.Sala;
                    i.Cama = row.Cama;
                    i.Paciente = row.NombreYApellido;
                    i.NHC = row.NroHC.ToString();
                    i.CamaId = row.CamaId;
                    Lista.Add(i);
                }
                return Lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }




        public estado_aislado Estado_Aislado_Sala(int Salaid)
        {
            InternacionDALTableAdapters.H2_Sala_Estado_AisladaTableAdapter adapter = new InternacionDALTableAdapters.H2_Sala_Estado_AisladaTableAdapter();
            InternacionDAL.H2_Sala_Estado_AisladaDataTable aTable = adapter.GetData(Salaid);
            estado_aislado e = new estado_aislado();
            e.Estado = "Disponible";
            e.Clase = "btn-success";

            if (aTable.Rows.Count > 0)
            {

                if (!aTable[0].IsAisladaNull())
                {
                    if (aTable[0].Aislada) { e.Estado = "Aislada"; e.Clase = "btn btn-warning"; } else { e.Estado = "Disponible"; e.Clase = "btn btn-success"; }
                }

                e.Usuario = aTable[0].usuario;

                if (!aTable[0].IsFechaNull())
                {
                    e.Fecha = aTable[0].Fecha.ToString("dd/MM/yyyy HH:mm");
                }

                if (!aTable[0].IsMotivoNull())
                {
                    e.Motivo = aTable[0].Motivo;
                }

                return e;
            }
            return e;

        }



        public void Aislar_Sala(int SalaId, int Usuario, string Motivo, bool Aislada)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Sala_Aislar(SalaId, Usuario, Motivo, Aislada);
        }

        public bool Interncion_Existe(long NHC)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            if (adapter.H2_Internacion_Existe(NHC) != null)
            {
                return true;
            }
            return false;
        }

        public CensoToPrint CensoForPrinting(DateTime fecha, string servIds)
        {
            CensoToPrint result = new CensoToPrint();
            InternacionDALTableAdapters.H2_Internacion_Censo_ImpresionTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Censo_ImpresionTableAdapter();
            InternacionDAL.H2_Internacion_Censo_ImpresionDataTable aTable = adapter.GetData(servIds, fecha);

            ServicioToPrint aServicio = null;
            SalaToPrint aSala = null;
            CamaToPrint aCama = null;
            foreach (InternacionDAL.H2_Internacion_Censo_ImpresionRow row in aTable.Rows)
            {
                if (aServicio == null || aServicio.ServicioId != row.ServicioId)
                {
                    aServicio = new ServicioToPrint(row.ServicioId, row.ServicioDescripcion);
                    result.Servicios.Add(aServicio);
                }
                if (!row.IsSalaIdNull())
                {
                    if (aSala == null || aSala.SalaId != row.SalaId)
                    {
                        aSala = new SalaToPrint(row.SalaId, row.SalaDescripcion);
                        aServicio.Salas.Add(aSala);
                    }

                    if (!row.IsCamaIdNull())
                    {
                        if (aCama == null || aCama.CamaId != row.CamaId)
                        {
                            aCama = new CamaToPrint(row.CamaId, row.CamaDescripcion);
                            aSala.Camas.Add(aCama);
                            if (!row.IsOSNull())
                                aCama.OS = row.OS;
                            if (!row.IsDiagnosticoNull())
                                aCama.Diagnostico = row.Diagnostico;
                            if (!row.IsEspecialidadDescripcionNull())
                                aCama.EspecialidadDescripcion = row.EspecialidadDescripcion;
                            if (!row.IsFechaNull())
                            {
                                aCama.Fecha = row.Fecha.ToShortDateString();
                                aCama.Hora = row.Fecha.ToShortTimeString();
                            }
                            if (!row.IsNombreYApellidoNull())
                                aCama.NombreYApellido = row.NombreYApellido;
                            if (!row.IsNroHCNull())
                                aCama.NroHC = row.NroHC.ToString();
                            if (!row.IsOSNull())
                                aCama.SeccionalDescripcion = row.OS;
                            if (!row.IsEstadoNull())
                                aCama.Estado = row.Estado;
                            if (!row.IsDiasNull())
                                aCama.Dias = row.Dias.ToString();
                            else aCama.Dias = string.Empty;
                            if (!row.IsEdadNull())
                                aCama.Edad = row.Edad;
                            else aCama.Edad = string.Empty;
                            if (!row.IsSexoNull())
                                aCama.Sexo = row.Sexo;
                            else aCama.Sexo = string.Empty;
                        }
                    }
                }
                else
                {
                    aSala = new SalaToPrint(0, "SERVICIO SIN SALAS");
                    aServicio.Salas.Add(aSala);
                }
            }

            return result;
        }



        public intresumen InternacionResumen(int id)
        {
            InternacionDALTableAdapters.H2_AtInternados_CamayFechasTableAdapter adapter = new InternacionDALTableAdapters.H2_AtInternados_CamayFechasTableAdapter();
            InternacionDAL.H2_AtInternados_CamayFechasDataTable aTable = adapter.GetData(id);

            if (aTable.Rows.Count > 0)
            {
                intresumen i = new intresumen();
                i.servicio = aTable[0].servicio;
                i.sala = aTable[0].sala;
                i.cama = aTable[0].cama;
                if (!aTable[0].IsfechaegresoNull()) { i.fechaegreso = aTable[0].fechaegreso.ToString(); }
                i.fechaingreso = aTable[0].fechaingreso.ToString();

                return i;
            }
            return null;
        }

        public Acompa_Internacion DatosAcompa_List(long IdInternacion)
        {
            InternacionDALTableAdapters.H2_INTERNACION_DATOSACOMPA_LISTTableAdapter adapter = new InternacionDALTableAdapters.H2_INTERNACION_DATOSACOMPA_LISTTableAdapter();
            InternacionDAL.H2_INTERNACION_DATOSACOMPA_LISTDataTable aTable = adapter.GetData(IdInternacion);

            if (aTable.Rows.Count > 0)
            {
                Acompa_Internacion i = new Acompa_Internacion();
                if (!aTable[0].IsCalleNull())
                    i.Calle = aTable[0].Calle;
                else i.Calle = "";
                if (!aTable[0].IsCPNull())
                    i.CP = aTable[0].CP;
                else i.CP = "";
                i.DNI = aTable[0].Documento;
                if (!aTable[0].IsLocalidadNull())
                    i.Localidad = aTable[0].Localidad;
                else i.Localidad = "";
                i.Nombre = aTable[0].Nombre;
                i.NroInternacion = aTable[0].NroInternacion;
                if (!aTable[0].IsNumeroNull())
                    i.Numero = aTable[0].Numero;
                else i.Numero = "";
                if (!aTable[0].IsObservacionesNull())
                    i.Observaciones = aTable[0].Observaciones;
                else i.Observaciones = "";
                if (!aTable[0].IsParentezcoNull())
                    i.Parentezco = aTable[0].Parentezco;
                else i.Parentezco = "";
                if (!aTable[0].IsPisoNull())
                    i.Piso = aTable[0].Piso;
                else i.Piso = "";
                if (!aTable[0].IsProvinciaNull())
                    i.Provincia = aTable[0].Provincia;
                else i.Provincia = "";
                if (!aTable[0].IsTelefonoNull())
                    i.Telefono = aTable[0].Telefono;
                else i.Telefono = "";
                i.TipoDoc = aTable[0].TipoDoc;
                return i;
            }
            return null;
        }
        //===========================MANUEL== NUTRCION===========================================================//
        public List<Menus> cargar_Combo_Menus()
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_Combo_DietasTableAdapter adater = new InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_Combo_DietasTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_Traer_Combo_DietasDataTable atable = new InternacionDAL.H2_Internacion_Nutricion_Traer_Combo_DietasDataTable();

            atable = adater.GetData();
            List<Menus> L = new List<Menus>();
            foreach (InternacionDAL.H2_Internacion_Nutricion_Traer_Combo_DietasRow row in atable.Rows)
            {
                Menus M = new Menus();


                M.id = (int)row.id;
                M.apodo = row.Dieta;

                if (!row.IsDietaGeneralNull())
                    M.descripcion = row.Tipificacion;

                L.Add(M);
            }
            return L;

        }

        public encabezadoNutricion cargar_Encabezado(long idInternacion)
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_Datos_EmcabezadoTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutricion_Datos_EmcabezadoTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_Datos_EmcabezadoDataTable atable = new InternacionDAL.H2_Internacion_Nutricion_Datos_EmcabezadoDataTable();

            atable = adapter.GetData(idInternacion);
            encabezadoNutricion E = new encabezadoNutricion();

            foreach (InternacionDAL.H2_Internacion_Nutricion_Datos_EmcabezadoRow row in atable.Rows)
            {

                //TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;
                //E.fec = p.fecha_nacimiento.Year;

                //int anios = ts.Days / 365;
                //int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                ////int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                //string str_anios, str_meses;

                //if (anios != 1) str_anios = " Años ";
                //else str_anios = " Año ";
                //if (meses != 1) str_meses = " Meses ";
                //else str_meses = " Mes ";


                if (!row.IsPATOLOGIANull())
                    E.patologia = row.PATOLOGIA;
                //if(!row.IsapellidoNull())
                E.apellido = row.apellido;

                E.documento = row.documento.ToString();

                //if(!row.Isdocumento_realNull())
                E.documento_real = row.documento_real;

                if (!row.IsEDADNull())
                    E.edad = row.EDAD;

                if (!row.IsHC_UOM_CENTRALNull())
                    E.NHC_UOM = row.HC_UOM_CENTRAL.ToString();

                if (!row.IslocalidadNull())
                    E.localidad = row.localidad;

                if (!row.IsSECCIONAL1Null())
                    E.seccional = row.SECCIONAL1;

                if (!row.IstelefonoNull())
                    E.telefono = row.telefono;

                //if(!row.IsSERVICIONull())
                E.servicio = row.SERVICIO;

                //if(!row.isDescripcionNUll())
                E.cama = row.CAMA;
                E.sala = row.SALA;
                E.fehcaInternacion = row.INGRESO.ToShortDateString();

            }
            return E;
        }


        public List<indicacionesNutricion> cargar_Indicaciones(long idInternacion, string fecha)
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_IndicacionesTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_IndicacionesTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_Traer_IndicacionesDataTable atable = new InternacionDAL.H2_Internacion_Nutricion_Traer_IndicacionesDataTable();

            atable = adapter.GetData(idInternacion, fecha);
            List<indicacionesNutricion> L = new List<indicacionesNutricion>();

            foreach (InternacionDAL.H2_Internacion_Nutricion_Traer_IndicacionesRow row in atable.Rows)
            {
                indicacionesNutricion I = new indicacionesNutricion();

                if (!row.IsREM_NOMBRENull())
                    // I.REM_NOMBRE = row.REM_NOMBRE + " -Monodroga: " + row.MonoDroga1 + " -Presentacion: " + row.Presentacion + " -Unidad: " + row.Unidad + " -Cantidad: " + row.Cantidad + " Cada " + row.Frecuencia + " Horas";
                    // I.REM_NOMBRE = row.REM_NOMBRE + " -- " + row.MonoDroga1 + " -- " + row.Presentacion + " -- " + row.Unidad + " -- " + row.Cantidad + " Cada " + row.Frecuencia + " Horas";
                    I.REM_NOMBRE = row.REM_NOMBRE;
                else
                    I.REM_NOMBRE = "";

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.MonoDroga1;

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Presentacion;

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Unidad;

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Cantidad + " Cada ";

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Frecuencia + " Horas";



                if (!row.IsIndicacionNull())
                    I.indicacion = row.Indicacion;
                else
                    I.indicacion = "";

                L.Add(I);
            }
            return L;
        }


        public long guardar_Nutricion1(long idNutricion, long idInternacion, long documento, string codAlmuerzo, string codCena, int usuario, string fecha, int idAlmuero, int idCena)
        //, int AIdalmuerzo, string Aalmuerzo, int AIdcena, string Acena)
        // string descAlmuerzo,string descCena,
        {

            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            //InternacionDALTableAdapters.H2_Internacion_Nutrcion_GuardarTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutrcion_GuardarTableAdapter();

            object obj = adapter.H2_Internacion_Nutrcion_Guardar(idNutricion, idInternacion, documento, usuario, codAlmuerzo, codCena, fecha, idAlmuero, idCena);
            //, AIdalmuerzo, Aalmuerzo, AIdcena, Acena);
            //descAlmuerzo,descCena,

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;


        }

        public List<Menus> cargar_Menus(long idInternacion, string fecha, string tipo)
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_DietaTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_DietaTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_Traer_DietaDataTable table = new InternacionDAL.H2_Internacion_Nutricion_Traer_DietaDataTable();
            //DateTime f = Convert.ToDateTime(fecha);
            table = adapter.GetData(idInternacion, fecha, tipo);
            List<Menus> L = new List<Menus>();
            foreach (InternacionDAL.H2_Internacion_Nutricion_Traer_DietaRow row in table.Rows)
            {
                //indicacionesNutricion I = new indicacionesNutricion();
                Menus M = new Menus();


                if (!row.IsdietaNull())
                    M.apodo = row.dieta;

                if (!row.IsidDietaNull())
                    M.id = row.idDieta;

                if (!row.IstipoNull())
                    M.Es = row.tipo;

                L.Add(M);
            }
            return L;
        }


        public long Guardar_Pedido_Encabezado(long idPedido, int idUsuario, DateTime fecha)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Internacion_Nutricion_Guardar_Pedido_Encavezado(idPedido, idUsuario, fecha);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }

        public long Guardar_Pedido_Detalle(List<pedidoNutricion> pedidos, long idPedido)
        {

            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Internacion_Nutricion_Limpiar_Pedido_Detalle(idPedido);

            object obj = null;
            foreach (pedidoNutricion item in pedidos)
            {
                obj = adapter.H2_Internacion_Nutricion_Guardar_Pedido_Detalle(idPedido, item.tipificacion, item.dieta, item.cantidad, item.dietaId);
            }
            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;

        }

        public List<pedidoNutricion> traer_Pedido(string fecha)
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_PedidoTableAdapter adapter1 = new InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_PedidoTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_Traer_PedidoDataTable table = new InternacionDAL.H2_Internacion_Nutricion_Traer_PedidoDataTable();

            table = adapter1.GetData(fecha);

            List<pedidoNutricion> L = new List<pedidoNutricion>();

            foreach (InternacionDAL.H2_Internacion_Nutricion_Traer_PedidoRow row in table.Rows)
            {
                pedidoNutricion P = new pedidoNutricion();

                //P.tipificacion = row.tipificacion;
                P.dieta = row.comida;
                // P.fecha = row.fechaPedido.ToShortDateString();
                P.cantidad = row.cantidad;
                //P.idPedido = row.id;
                //P.dietaId = row.idDieta;
                L.Add(P);
            }

            return L;
        }


        public List<pedidoNutricion> traer_Pedidos_Internados(DateTime fecha, int imprime)
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_Menus_InternadosTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_Menus_InternadosTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_Traer_Menus_InternadosDataTable table = new InternacionDAL.H2_Internacion_Nutricion_Traer_Menus_InternadosDataTable();

            table = adapter.GetData(fecha);

            List<pedidoNutricion> L = new List<pedidoNutricion>();


            foreach (InternacionDAL.H2_Internacion_Nutricion_Traer_Menus_InternadosRow row in table.Rows)
            {
                pedidoNutricion P = new pedidoNutricion();

                InternacionDALTableAdapters.QueriesTableAdapter adapter2 = new InternacionDALTableAdapters.QueriesTableAdapter();

                string f = fecha.ToShortDateString();

                object obj = null;

                obj = adapter2.H2_Internacion_Nutricion_Traer_Acompañante_Comida_Totales(f);

                P.cantidadAcompañante = (int)obj;

                if (!row.IscomidaNull())
                    P.dieta = row.comida;

                P.cantidad = row.cantidad;

                P.piso = row.serv_descripcion;
                if (!row.IscomidaNull())
                    L.Add(P);
            }


            return L;
        }

        public List<pedidoNutricion> traer_Totales_Pedidos(DateTime fecha)
        {
            InternacionDALTableAdapters.H2_Internacon_Nutricion_Traer_Totales_DietasTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacon_Nutricion_Traer_Totales_DietasTableAdapter();
            InternacionDAL.H2_Internacon_Nutricion_Traer_Totales_DietasDataTable table = new InternacionDAL.H2_Internacon_Nutricion_Traer_Totales_DietasDataTable();

            table = adapter.GetData(fecha);

            List<pedidoNutricion> L = new List<pedidoNutricion>();


            foreach (InternacionDAL.H2_Internacon_Nutricion_Traer_Totales_DietasRow row in table.Rows)
            {
                pedidoNutricion P = new pedidoNutricion();


                P.tipificacion = row.Comida;
                P.cantidad = row.Total;

                L.Add(P);
            }

            return L;
        }


        public List<long> traer_Ids_Internacion(string fecha)
        {
            InternacionDALTableAdapters.H2_Internacion_Traer_IdsTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Traer_IdsTableAdapter();
            InternacionDAL.H2_Internacion_Traer_IdsDataTable table = new InternacionDAL.H2_Internacion_Traer_IdsDataTable();

            table = adapter.GetData(fecha);
            List<long> L = new List<long>();


            foreach (InternacionDAL.H2_Internacion_Traer_IdsRow row in table.Rows)
            {
                internacionIds P = new internacionIds();

                L.Add(row.ID);
            }

            return L;
        }

        public List<pedidoNutricion> listsar_Pacientes_Comidas(string fecha)
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_ListarTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutricion_ListarTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_ListarDataTable table = new InternacionDAL.H2_Internacion_Nutricion_ListarDataTable();

            table = adapter.GetData(fecha);
            List<pedidoNutricion> L = new List<pedidoNutricion>();

            foreach (InternacionDAL.H2_Internacion_Nutricion_ListarRow row in table.Rows)
            {
                pedidoNutricion P = new pedidoNutricion();
                //  P.nInt = row.NRO_INT;
                P.servicio = row.SERVICIO;
                P.sala = row.SALA;
                P.cama = row.CAMA;
                P.nhc = row.NHC;
                P.afiliado = row.AFILIADO;

                if (!row.IsACOMP_ALMUERZONull())
                    P.aAlmuerzo = row.ACOMP_ALMUERZO;
                else
                    P.aAlmuerzo = "";

                if (!row.IsACOMP_CENANull())
                    P.aCena = row.ACOMP_CENA;
                else
                    P.aCena = "";

                if (!row.IsALMUERZONull())
                    P.codAlmuerzo = row.ALMUERZO;
                else
                    P.codAlmuerzo = "";

                if (!row.IsCENANull())
                    P.codCena = row.CENA;
                else
                    P.codCena = "";


                L.Add(P);
            }
            return L;
        }


        public long Internacion_Nutrcion_Eliminar_Acompañante(long idInternacion, string fecha)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            object obj = null;
            obj = adapter.H2_Internacion_Nutrcion_Eliminar_Acompañante(idInternacion, fecha);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }
        public long Internacion_Nutricion_Guardar_Acompañante(long idInternacion, string fecha, int idalmuerzo, string codAlmuerzo, int idCena, string codCena)
        {
            InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            object obj = null;

            obj = adapter.H2_Internacion_Nutricion_Guardar_Acompañante(idInternacion, fecha, idalmuerzo, codAlmuerzo, idCena, codCena);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }

        public nutricionAcompañante Internacion_Nutricion_Traer_Acompañante_Comida(string fecha, long idIntenacion)
        {
            InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_Acompañante_ComidaTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutricion_Traer_Acompañante_ComidaTableAdapter();
            InternacionDAL.H2_Internacion_Nutricion_Traer_Acompañante_ComidaDataTable table = new InternacionDAL.H2_Internacion_Nutricion_Traer_Acompañante_ComidaDataTable();

            table = adapter.GetData(idIntenacion, fecha);

            nutricionAcompañante P = new nutricionAcompañante();
            foreach (InternacionDAL.H2_Internacion_Nutricion_Traer_Acompañante_ComidaRow row in table.Rows)
            {

                P.hay = 1;

                if (!row.IsidInternacionNull())
                    P.idIntenacion = row.idInternacion;

                if (!row.IsfechaCargaNull())
                    P.fecha = row.fechaCarga.ToShortDateString();

                if (!row.IsidAlmuerzoNull())
                    P.idalmuerzo = row.idAlmuerzo;

                if (!row.IscodAlmuerzoNull())
                    P.codAlmuerzo = row.codAlmuerzo;

                if (!row.IsidCenaNull())
                    P.idCena = row.idCena;

                if (!row.IscodCenaNull())
                    P.codCena = row.codCena;

                P.id = row.id;

            }
            return P;
        }
        //===========================MANUEL=============================================================//


        public int VerificarFaltaPatologiaCronica(long afiliadoId)
        {

            GenteDALTableAdapters.QueriesTableAdapter adapter = new GenteDALTableAdapters.QueriesTableAdapter();
            object obj = null;

            obj = adapter.H2_Verificar_Falta_Patologia_Cronica(afiliadoId);

            if (obj != null)
                return Convert.ToInt32(obj);
            else return -1;
        }

    }
}