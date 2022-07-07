using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for AtConsultorioBLL
/// </summary>
namespace Hospital
{
    public class AtConsultorioBLL
    {
        public AtConsultorioBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public void At_Consultorio_Historial_Guardar(string Mensaje, long MedicoId, long NHC, long Especialidad) 
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
             adapter.H2_AT_CONSULTORIO_HISTORIALES_GUARDAR(Mensaje, MedicoId, NHC, Especialidad);
        }

        public long At_Consultorio_AltaComplejidad_Guardar(altacomplejidad obj)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object o = adapter.H2_At_Consultorio_EstudiosAltaComplejidad_Guardar(obj.id, obj.medicoid, obj.nhc, DateTime.Parse(obj.Fecha), obj.Practica_Estudios, obj.Resumen_HC, obj.Relacion_Algoritmo,
                    obj.Resultados, obj.UsuarioId);
                if (o != null) return Convert.ToInt64(o.ToString());
                else throw new Exception("No se ha podido guardar la orden."); 
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int At_Consultorio_Existe_Atencion_by_NHC(int MedicoId, int EspecialidadId,long NHC)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object obj = adapter.H2_ATCONSULTORIO_EXISTE_ATENCION_BY_NHC(MedicoId, EspecialidadId, NHC);
                if (obj != null) return Convert.ToInt32(obj.ToString());
                else return -1;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string At_Consultorio_Cargar_FechaNac(long NHC)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object fecha = adapter.H2_AtConsultorio_NeoNatologia_CargarFechaNac(NHC);
                if (fecha != null) return Convert.ToDateTime(fecha.ToString()).ToShortDateString();
                else return string.Empty;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Pedido_Enfermeria_Guardar(int MedicoId, int ConsultorioId, string Pedido, DateTime Fecha, int Usuario)
        {
            if (ConsultorioId == 0) { throw new Exception("Falta Seleccionar Consultorio"); }

            pedidosenfermeria p = new pedidosenfermeria();
            p = Estado_Pedido(Fecha, MedicoId, Usuario);

            if (p == null)
            {
                ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
                adapter.H2_Enfermeria_Pedir(MedicoId, ConsultorioId, Pedido, Fecha, Usuario);
            }
            else
            {
                if (p.FechaEntregado != null)
                {
                    throw new Exception("No se puede modificar un pedido realizado");
                }
                else
                {
                    ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
                    adapter.H2_Enfermeria_Pedir(MedicoId, ConsultorioId, Pedido, Fecha, Usuario);
                }

            }
        }

        public bool MedicoUsuarioExiste(int MedicoId, int Usuario)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                int R = Convert.ToInt32(adapter.H2_At_Usuario_Relacionado_Medico(Usuario, MedicoId));
                if (R == 1) return true; 
                else return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<pedidosenfermeria> Enfermeria_Cargar(int MedicoId, int Usuario,bool Todos)
        {
            AtConsultoioDALTableAdapters.H2_Enfermeria_Cargar_Pedidos_EnfermeriaTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_Enfermeria_Cargar_Pedidos_EnfermeriaTableAdapter();
            AtConsultoioDAL.H2_Enfermeria_Cargar_Pedidos_EnfermeriaDataTable aTable = adapter.GetData(MedicoId, Usuario, Todos);

            List<pedidosenfermeria> Lista = new List<pedidosenfermeria>();

            foreach (AtConsultoioDAL.H2_Enfermeria_Cargar_Pedidos_EnfermeriaRow row in aTable.Rows)
            {
                pedidosenfermeria p = new pedidosenfermeria();
                p.Fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm:ss");
                p.MedicoId = row.medicoid;
                p.ConsultorioId = row.consultorioid;
                if (!row.IsPedidoNull()) { p.Pedido = row.Pedido; }
                if (!row.IsUsuarioIdNull()) { p.UsuarioId = row.UsuarioId; }
                if (!row.IsEstadoNull())
                {
                    p.Estado = "Entregado";
                    p.Clase = "success";
                }
                if (!row.IsFechaEntregadoNull()) { p.FechaEntregado = row.FechaEntregado.ToString("dd/MM/yyyy HH:mm:ss"); }


                Lista.Add(p);
            }

            return Lista;
        }

        public List<pedidosenfermeria> Enfermeria_Cargar_Todos(int MedicoId, int ConsultorioId, int Cuales)
        {
            AtConsultoioDALTableAdapters.H2_Enfermeria_Pedidos_CargarTodosTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_Enfermeria_Pedidos_CargarTodosTableAdapter();
            try
            {
                DateTime Fecha = DateTime.Now;
                AtConsultoioDAL.H2_Enfermeria_Pedidos_CargarTodosDataTable aTable = adapter.GetData(MedicoId, ConsultorioId, Fecha, Cuales);

                List<pedidosenfermeria> Lista = new List<pedidosenfermeria>();

                foreach (AtConsultoioDAL.H2_Enfermeria_Pedidos_CargarTodosRow row in aTable.Rows)
                {
                    pedidosenfermeria p = new pedidosenfermeria();
                    p.Fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm:ss");
                    p.MedicoId = row.medicoid;
                    p.ConsultorioId = row.consultorioid;
                    if (!row.IsPedidoNull()) { p.Pedido = row.Pedido; }
                    if (!row.IsUsuarioIdNull()) { p.UsuarioId = row.UsuarioId; }
                    if (!row.IsEstadoNull())
                    {
                        p.Estado = "Entregado";
                        p.Clase = "success";
                    }
                    else
                    {
                        p.Clase = "warning";
                    }
                    if (!row.IsFechaEntregadoNull()) { p.FechaEntregado = row.FechaEntregado.ToString("dd/MM/yyyy HH:mm:ss"); }
                    p.Consultorio = row.ConsultorioNombre;
                    p.Medico = row.Medico;
                    Lista.Add(p);
                }

                return Lista;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public void Borrar_Pedido(DateTime Fecha, int MedicoId, int Usuario)
        {
            if (MedicoId == 0 || Usuario == 0) { throw new Exception("Error Inesperado, recargue el sistema"); }


            if (Estado_Pedido(Fecha, MedicoId, Usuario).FechaEntregado == null)
            {
                try
                {
                    ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
                    adapter.H2_Enfermeria_Borrar_Pedidos(MedicoId, Fecha, Usuario);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            else
            {
                throw new Exception("No se puede eliminar un pedido entregado");
            }
        }

        public pedidosenfermeria Estado_Pedido(DateTime Fecha, int MedicoId, int Usuario)
        {
            AtConsultoioDALTableAdapters.H2_Enfermeria_Pedidos_EstadoTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_Enfermeria_Pedidos_EstadoTableAdapter();
            AtConsultoioDAL.H2_Enfermeria_Pedidos_EstadoDataTable aTable = adapter.GetData(MedicoId, Usuario, Fecha);

            if (aTable.Rows.Count > 0)
            {
                pedidosenfermeria p = new pedidosenfermeria();
                p.Fecha = aTable[0].Fecha.ToString();
                p.MedicoId = aTable[0].medicoid;
                p.ConsultorioId = aTable[0].consultorioid;
                if (!aTable[0].IsPedidoNull()) { p.Pedido = aTable[0].Pedido; }
                if (!aTable[0].IsUsuarioIdNull()) { p.UsuarioId = aTable[0].UsuarioId; }
                if (!aTable[0].IsEstadoNull())
                    if (!aTable[0].IsFechaEntregadoNull()) { p.FechaEntregado = aTable[0].FechaEntregado.ToString(); }

                return p;
            }

            return null;
        }




        public void PedidoEntrgaCambiarEstado(DateTime Fecha, int MedicoId, int Usuario, int ConsultorioId, int Estado)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Enfermeria_Entregar(MedicoId, ConsultorioId, Fecha, Estado, Usuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public void LlamarPAciente(DateTime Fecha, int MedicoId, int Especialidad, int Estado, int Usuario)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_AtConsultorio_ActualizarTurno(Fecha, MedicoId, Especialidad, 1);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public void LlamarPAcienteFinalizar(DateTime Fecha, int MedicoId, int Especialidad, int Estado, int Usuario, long NHC)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_AtConsultorio_Finalizar_ActualizarTurno(Fecha, MedicoId, Especialidad, Estado);
                Hospital.BonosBLL B = new BonosBLL();
                if (HttpContext.Current.Session["Usuario"] != null)
                {
                    usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
                    Estadisticas.Est_PacienteMovBLL E = new Estadisticas.Est_PacienteMovBLL();
                    E.EstPacMov(NHC, 6, (Int32)U.id, "At. Finaliazada");
                }
                else throw new Exception("Inicie Sesión Nuevamente.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
		
        public List<atconsultorio> At_Consultorio_BonoId(int BonoId, DateTime Fecha)
        {
            try
            {
                List<atconsultorio> lista = new List<atconsultorio>();
                AtConsultoioDALTableAdapters.H2_AtConsultorio_PorBonoIdTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_PorBonoIdTableAdapter();
                AtConsultoioDAL.H2_AtConsultorio_PorBonoIdDataTable aTable = adapter.GetData(Fecha, BonoId);
                foreach (AtConsultoioDAL.H2_AtConsultorio_PorBonoIdRow row in aTable)


                {
                    atconsultorio a = new atconsultorio();
                    a.Fecha = row.Fecha.ToString();
                    a.Hora = row.Hora.ToString();
                    a.Medico = row.Medico;
                    a.Especialidad = row.Especialidad;
                    a.Consultorio = row.Consultorio;
                    a.TurnoId = row.Turno_Id;
                    a.Documento = row.documento.ToString();
                    if (!row.IsMotivoCancelacionIdNull()) a.Estado = "Cancelado"; else a.Estado = "Activo";
                    lista.Add(a);

                }
                return lista;
                


                   // throw new Exception("Verifique el Nro. del Bono.");                


            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

		

        public List<atconsultorio> At_Consultorio_PorDocumento(int Documento, DateTime Fecha)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_PorDocumentoTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_PorDocumentoTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_PorDocumentoDataTable aTable = adapter.GetData(Fecha, Documento);

            List<atconsultorio> Lista = new List<atconsultorio>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_PorDocumentoRow row in aTable.Rows)
            {
                atconsultorio a = new atconsultorio();
                a.Fecha = row.Fecha.ToString();
                a.Hora = row.Hora.ToString();
                a.Medico = row.Medico;
                a.Especialidad = row.Especialidad;
                a.Consultorio = row.Consultorio;
                a.TurnoId = row.Turno_Id;
                a.EspecialidadId = row.TurnoEspecialidadId;

                Lista.Add(a);
            }

            return Lista;
        }



        public List<bono_libre> At_Consultorio_Bono_Libres(int Documento, int Especialidad)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_BonoLibreTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_BonoLibreTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_BonoLibreDataTable aTable = adapter.GetData(Documento, Especialidad);

            List<bono_libre> Lista = new List<bono_libre>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_BonoLibreRow row in aTable.Rows)
            {
                bono_libre b = new bono_libre();

                b.Medico = row.Medico;
                b.Bono_id = row.Bono_Id.ToString();
                b.Especialidad = row.Especialidad;
                b.Fecha = row.Fecha.ToString("dd/MM/yyyy");
				if (row.EstaCancelado) b.Estado = "Cancelado"; else b.Estado = "Activo";

                Lista.Add(b);
            }

            return Lista;
        }


        public void At_Consultorio_Confirmar_Turnos(int Usuario, int BonoId, int TurnosId)
        {
            if (BonoId > 0)
            {
                ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
                try
                {
                    adapter.H2_AtConsultorio_Confirmar_Turnos(Usuario, BonoId, TurnosId);
                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            else
            {
                throw new Exception("Falta Seleccionar Bono y/o Turno");
            }
        }


        public int Recetas_Eliminar(long Protocolo, long UsuarioId, bool Verificar)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object obj = adapter.H2_AT_CONSULTORIO_RECETAS_ELIMINAR(Protocolo, UsuarioId, Verificar);
                if (obj != null) return Convert.ToInt32(obj.ToString());
                else throw new Exception("Error al eliminar receta.");
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<medicos> Medicos_Por_Usurios(int Usuario)
        {
            AtConsultoioDALTableAdapters.H2_At_Consultorio_Relacion_Usuario_MedicoTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_At_Consultorio_Relacion_Usuario_MedicoTableAdapter();

            AtConsultoioDAL.H2_At_Consultorio_Relacion_Usuario_MedicoDataTable aTable = adapter.GetData(Usuario);

            List<medicos> Lista = new List<medicos>();

            foreach (AtConsultoioDAL.H2_At_Consultorio_Relacion_Usuario_MedicoRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Id = row.Id;
                m.Medico = row.Medico;
                Lista.Add(m);
            }

            return Lista;
        }


        public List<medicos> Medicos_Por_Usurios_Filtrado(int Usuario)
        { //Solo Medicos que figuren en Dias de Atencion...
            AtConsultoioDALTableAdapters.H2_At_Consultorio_Relacion_Usuario_Medico_FiltradoTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_At_Consultorio_Relacion_Usuario_Medico_FiltradoTableAdapter();

            AtConsultoioDAL.H2_At_Consultorio_Relacion_Usuario_Medico_FiltradoDataTable aTable = adapter.GetData(Usuario);

            List<medicos> Lista = new List<medicos>();

            foreach (AtConsultoioDAL.H2_At_Consultorio_Relacion_Usuario_Medico_FiltradoRow row in aTable.Rows)
            {
                medicos m = new medicos();
                m.Id = row.Id;
                m.Medico = row.Medico;
                Lista.Add(m);
            }

            return Lista;
        }
        



        public List<listapacientes> At_Consultorio_ListaPacientes(int MedicoId, int Especialidad, DateTime Fecha)
        {
            try
            {
                AtConsultoioDALTableAdapters.H2_AtConsultorio_ListaPacientesTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_ListaPacientesTableAdapter();

                AtConsultoioDAL.H2_AtConsultorio_ListaPacientesDataTable aTable = adapter.GetData(Especialidad, MedicoId, Fecha);

                List<listapacientes> Lista = new List<listapacientes>();

                foreach (AtConsultoioDAL.H2_AtConsultorio_ListaPacientesRow row in aTable.Rows)
                {
                    listapacientes l = new listapacientes();
                    l.Fecha = row.TurnoFecha.ToString("dd/MM/yyyy HH:mm");
                    l.NHC = row.NHC.ToString();
                    l.documento = row.documento;
                    if (!row.IsEstadoNull()) { l.Estado = row.Estado; } else { l.Estado = "0"; }
                    if (!row.IsFInicioNull()) { l.LLamadoI = row.FInicio.ToShortTimeString(); }
                    if (!row.IsFFinNull()) { l.LLamadoF = row.FFin.ToShortTimeString(); }
                    l.Paciente = row.Paciente;

                    if (!row.IsRecepNull()) l.HoraRecep = "(" + row.Recep + "hs.)";
                    else l.HoraRecep = string.Empty;

                    if (!row.IsSeccionalNull()) { l.Seccional = row.Seccional; }

                    l.Turno_Id = row.Turno_Id;

                    l.TeleConsulta = row.Teleconsulta;

                    if (!row.IsAlto_RiesgoNull()) l.Alto_Riesgo = row.Alto_Riesgo;
                    else l.Alto_Riesgo = false;
                    Lista.Add(l);
                }

                return Lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void At_Consultorio_Pasar_AEspera(DateTime TurnoFecha,int Especialidad, int MedicoId) //Pasa un paciente de estado "llamado" a "espera", para permitirle al medico llamar a otro de la lista.
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_AT_CONSULTORIO_AUSENTE_PACIENTE(Especialidad, MedicoId, TurnoFecha);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //PARA MARCAR AUSENTISMO MASIVO
        public void AT_CONSULTORIO_AUSENTE_PACIENTE_MASIVO(DateTime TurnoFecha, int Especialidad, int MedicoId) //Pasa un paciente de estado "llamado" a "espera", para permitirle al medico llamar a otro de la lista.
        {

            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_AT_CONSULTORIO_AUSENTE_PACIENTE_MASIVO(Especialidad, MedicoId, TurnoFecha);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string Verificar_Ausentes_Consultorio(int MedicoId) 
        {

            AtConsultoioDALTableAdapters.QueriesTableAdapter adapter = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_Verificar_Ausentes_Consultorio(MedicoId);

                if (R != null) { return R.ToString(); } else { return "0"; }
                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //PARA MARCAR AUSENTISMO MASIVO

        public long At_Consultorio_Certificado_Medico_Guardar(int Usuario, long NHC, string Indicaciones, int MedicoId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_Certificado_Medico_Guardar(NHC, Indicaciones, MedicoId, Usuario);
                if (R != null) return Convert.ToInt64(R);
                else throw new Exception("Error al guardar certificado médico.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void ConfirmaAtencionCentral(long MedicoId,long EspecialidadId,long NHC,string FechaTurno)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_TURNO_CONFIRMA_ATENCION_CENTRAL(MedicoId, EspecialidadId, NHC, Convert.ToDateTime(FechaTurno));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public certificadosmedicosImpresion CertificadoMedico_NHC(long NHC, int MedicoId)
        {
            AtConsultoioDALTableAdapters.H2_Certificado_Medico_Cargar_Ultimo_NHCTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_Certificado_Medico_Cargar_Ultimo_NHCTableAdapter();
            AtConsultoioDAL.H2_Certificado_Medico_Cargar_Ultimo_NHCDataTable aTable = adapter.GetData(MedicoId, NHC);

            certificadosmedicosImpresion c = new certificadosmedicosImpresion();

            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IsIndicacionesNull()) { c.Indicaciones = aTable[0].Indicaciones; } else { c.Indicaciones = ""; }
                return c;
            }

            return null;
        }



        public long GuardarOrdenesdeEstudio(List<ordenesdeestudiospracticas> Practicas, long Protocolo, DateTime FechaEntrega, int MedicoId, int Patologia, long NHC, DateTime FechaInicio, string DiagnosticoId, int servicioId, long UsuarioId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_AtConsultorio_OrdendeEstudio_Guardar_Cab(Protocolo, FechaEntrega, MedicoId, Patologia, NHC, FechaInicio, DiagnosticoId, null, null, servicioId, UsuarioId);
            long Prot = Convert.ToInt64(R);
            adapter.H2_AtConsultorio_OrdendeEstudio_Borrar_Det(Prot);
            foreach (ordenesdeestudiospracticas practica in Practicas)
            {
                if (practica.Estado != "0")
                {
                    adapter.H2_AtConsultorio_OrdendeEstudio_Guardar_Det(practica.Observacion, Prot);
                }

            }
            return Prot;
        }


        public List<ordenesdeestudiospracticas> At_Consultorio_CargarPracticas_Detalles(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_OrdenesEstudio_CargarPracticasTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_OrdenesEstudio_CargarPracticasTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_OrdenesEstudio_CargarPracticasDataTable aTable = adapter.GetData(Protocolo);

            List<ordenesdeestudiospracticas> Lista = new List<ordenesdeestudiospracticas>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_OrdenesEstudio_CargarPracticasRow row in aTable.Rows)
            {
                ordenesdeestudiospracticas od = new ordenesdeestudiospracticas();
                od.Id = row.Id;
                if (!row.IsObservacionNull()) { od.Observacion = row.Observacion; }

                Lista.Add(od);
            }

            return Lista;
        }



        public List<ordenesdeestudiosneonatologia> At_Consultorio_Neonatologia_Cargar(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Neonatologia_CargarOrdenTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Neonatologia_CargarOrdenTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_Neonatologia_CargarOrdenDataTable aTable = adapter.GetData(Protocolo);

            List<ordenesdeestudiosneonatologia> Lista = new List<ordenesdeestudiosneonatologia>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Neonatologia_CargarOrdenRow row in aTable.Rows)
            {
                ordenesdeestudiosneonatologia neo = new ordenesdeestudiosneonatologia();
                neo.Protocolo = row.consultaid.ToString();
                neo.NHC = row.NHC.ToString();
                neo.MedicoId = row.MedicoId.ToString();
                
                if (!row.Isfecha_nacNull()) neo.fecha_nac = row.fecha_nac.ToShortDateString();
                if (!row.IspesoNull()) neo.peso = row.peso;
                if (!row.IstallaNull()) neo.talla = row.talla;
                if (!row.IspercefalicoNull()) neo.percefalico = row.percefalico;
                Lista.Add(neo);
            }
            return Lista;
        }

        public ordenesdeestudios At_Consultorio_CargarPracticas_Cab(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_OrdenesEstudio_CargarCABTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_OrdenesEstudio_CargarCABTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_OrdenesEstudio_CargarCABDataTable aTable = adapter.GetData(Protocolo);

            ordenesdeestudios od = new ordenesdeestudios();

            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IsFechaInicioNull()) { od.fechainicio = aTable[0].FechaInicio.ToShortDateString(); }
                od.medicoid = aTable[0].MedicoId.ToString();
                if (!aTable[0].IsDiagnosticoIdNull()) { od.diagnosticoid = aTable[0].DiagnosticoId; }
                if (!aTable[0].IsPatologiaNull()) { od.patologiaid = aTable[0].Patologia.ToString(); }
                if (!aTable[0].IsDiagnosticoNameNull()) { od.DiagnosticoName = aTable[0].DiagnosticoName.ToString(); }
                if (!aTable[0].IsservicioIdNull()) { od.servicioId = aTable[0].servicioId; }
            }

            return od;
        }



        public List<ordenesdeestudiosbuscar> OrdenesdeEstudiosBuscar(long NHC, string Afiliado, DateTime FechaInicio, DateTime FechaFinal)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_BuscarOrdenesEstudiosTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_BuscarOrdenesEstudiosTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_BuscarOrdenesEstudiosDataTable aTable = adapter.GetData(NHC, Afiliado, FechaInicio, FechaFinal);

            List<ordenesdeestudiosbuscar> Lista = new List<ordenesdeestudiosbuscar>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_BuscarOrdenesEstudiosRow row in aTable.Rows)
            {
                ordenesdeestudiosbuscar od = new ordenesdeestudiosbuscar();
                od.documento = row.documento.ToString();
                od.fechaingreso = row.FechaInicio.ToShortDateString();
                od.medicoid = row.MedicoId.ToString();
                od.NHC = row.NHC.ToString();
                od.paciente = row.apellido;
                od.protocolo = row.Protocolo;
                if (!row.IsMedicoNull())
                    od.medico = row.Medico;
                else od.medico = string.Empty;
                if (!row.IsHC_UOMNull())
                    od.HC_UOM = row.HC_UOM;
                else od.HC_UOM = string.Empty;
                Lista.Add(od);
            }

            return Lista;
        }


        public List<ordenesdeestudiosbuscar> OrdenesdeEstudios_AltaComplejidad_Buscar(string NHC, string Afiliado, DateTime FechaInicio, DateTime FechaFinal)
        {
            AtConsultoioDALTableAdapters.H2_AT_CONSULTORIO_LISTAR_EST_ALTA_COMPLEJIDADTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AT_CONSULTORIO_LISTAR_EST_ALTA_COMPLEJIDADTableAdapter();

            AtConsultoioDAL.H2_AT_CONSULTORIO_LISTAR_EST_ALTA_COMPLEJIDADDataTable aTable = adapter.GetData(NHC, Afiliado, FechaInicio, FechaFinal);

            List<ordenesdeestudiosbuscar> Lista = new List<ordenesdeestudiosbuscar>();

            foreach (AtConsultoioDAL.H2_AT_CONSULTORIO_LISTAR_EST_ALTA_COMPLEJIDADRow row in aTable.Rows)
            {
                ordenesdeestudiosbuscar od = new ordenesdeestudiosbuscar();
                od.documento = row.PacienteId.ToString();
                od.medicoid = row.MedicoId.ToString();
                od.fechaingreso = row.Fecha.ToShortDateString();
                od.NHC = row.NHC.ToString();
                od.paciente = row.Paciente;
                od.protocolo = row.EstId;
                od.medico = row.Medico;
                od.HC_UOM = row.NHC;
                Lista.Add(od);
            }

            return Lista;
        }

        public altacomplejidad AltaComplejidad_byID(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AT_CONSULTORIO_ALTA_COMPLEJIDAD_LIST_IDTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AT_CONSULTORIO_ALTA_COMPLEJIDAD_LIST_IDTableAdapter();
            AtConsultoioDAL.H2_AT_CONSULTORIO_ALTA_COMPLEJIDAD_LIST_IDDataTable aTable = adapter.GetData(Protocolo);
            altacomplejidad od = new altacomplejidad();
            foreach (AtConsultoioDAL.H2_AT_CONSULTORIO_ALTA_COMPLEJIDAD_LIST_IDRow row in aTable.Rows)
            {
                od.Practica_Estudios = row.Practicas_Estudios;
                od.Relacion_Algoritmo = row.Relacion_Algoritmo;
                od.Resultados = row.Resultados;
                od.Resumen_HC = row.Resumen_HC;
                od.Fecha = row.Fecha.ToShortDateString();
                od.medicoid = row.MedId;
                od.nhc = row.PacienteId;
            }
            return od;
        }

        public List<ordenesdeestudiosbuscar> OrdenesdeTrasladoBuscar(long NHC, string Afiliado, DateTime FechaInicio, DateTime FechaFinal)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_BuscarOrdenesTrasladoTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_BuscarOrdenesTrasladoTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_BuscarOrdenesTrasladoDataTable aTable = adapter.GetData(NHC, Afiliado, FechaInicio, FechaFinal);

            List<ordenesdeestudiosbuscar> Lista = new List<ordenesdeestudiosbuscar>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_BuscarOrdenesTrasladoRow row in aTable.Rows)
            {
                ordenesdeestudiosbuscar od = new ordenesdeestudiosbuscar();
                od.documento = row.documento.ToString();
                od.fechaingreso = row.FechaGuardado.ToShortDateString();
                od.medicoid = row.MEDICO_ID.ToString();
                od.NHC = row.NHC.ToString();
                od.paciente = row.apellido;
                od.protocolo = row.ID_ORDEN_TRASLADO;
                od.medicoNombre = row.MedicoNombre;
                if (!row.IsNHC_UOMNull()) od.HC_UOM = row.NHC_UOM;
                else od.HC_UOM = string.Empty;
                Lista.Add(od);
            }

            return Lista;
        }




        public int Guardar_Orden_Traslado(long cargaID,long NHC, DateTime Fecha_Atencion, int Medico_Id, string Comun,
            string Utim, string Neonatal, string Diagnostico, string Observaciones, string Desde_Traslado, string Localidad_Traslado,
            string Calles_Traslado, string Hasta_Traslado, string Localidad_Traslado_Hasta, string Horario_Destino, bool Con_Regreso,
            bool De_Ambula, string Empresa, string Operador_Sol, DateTime Fecha_Sol, string Hora_Sol, string Operador_Recep,
            DateTime Fecha_Recep, string Hora_Recep, string Calles_Destino)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object ID_Orden = adapter.H2_AtConsultorio_Orden_Traslado_Guardar(cargaID,NHC, Fecha_Atencion, Medico_Id, Comun,
                 Utim, Neonatal, Diagnostico, Observaciones, Desde_Traslado, Localidad_Traslado,
                 Calles_Traslado, Hasta_Traslado, Localidad_Traslado_Hasta, Horario_Destino, Con_Regreso,
                 De_Ambula, Empresa, Operador_Sol, Fecha_Sol, Hora_Sol, Operador_Recep,
                 Fecha_Recep, Hora_Recep, Calles_Destino);
                if (ID_Orden != null) return int.Parse(ID_Orden.ToString());
                else throw new Exception("Error al guardar orden de traslado.");
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }


        public ordentraslado Cargar_Orden_Traslado(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cargar_SolicitudTrasladoTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cargar_SolicitudTrasladoTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_Cargar_SolicitudTrasladoDataTable aTable = adapter.GetData(Protocolo);
            ordentraslado o = new ordentraslado();
            if (aTable.Rows.Count > 0)
            {

                o.protocolo = aTable[0].ID_ORDEN_TRASLADO;
                o.NHC = aTable[0].NHC;
                o.Fecha_Atencion = aTable[0].FECHA_ATENCION.ToShortDateString();
                o.Medico_Id = aTable[0].MEDICO_ID;
                o.Comun = aTable[0].COMUN;
                o.Utim = aTable[0].UTIM;
                o.Neonatal = aTable[0].NEONATAL;
                o.Diagnostico = aTable[0].DIAGNOSTICO;
                o.Observaciones = aTable[0].OBSERVACIONES;
                o.Desde_Traslado = aTable[0].DESDE_TRASLADO;
                o.Localidad_Traslado = aTable[0].LOCALIDAD_TRASLADO;
                o.Calles_Traslado = aTable[0].CALLES_TRASLADO;
                o.Hasta_Traslado = aTable[0].HASTA_TRASLADO;
                o.Localidad_Traslado_Hasta = aTable[0].LOCALIDAD_TRASLADO;
                if (!aTable[0].IsHORARIO_DESTINONull()) o.Horario_Destino = aTable[0].HORARIO_DESTINO.ToString();
                else o.Horario_Destino = string.Empty;
                o.Con_Regreso = aTable[0].CON_REGRESO;
                o.De_Ambula = aTable[0].DE_AMBULA;
                o.Empresa = aTable[0].EMPRESA;
                o.Operador_Sol = aTable[0].OPERADOR_SOL;
                o.Fecha_Sol = aTable[0].FECHA_SOL.ToShortDateString();
                if (!aTable[0].IsHORA_SOLNull())
                    o.Hora_Sol = aTable[0].HORA_SOL.ToString();
                else o.Hora_Sol = string.Empty;
                o.Operador_Recep = aTable[0].OPERADOR_RECEP;
                o.Fecha_Recep = aTable[0].FECHA_RECEP.ToShortDateString();
                if (!aTable[0].IsHORA_RECEPNull())
                    o.Hora_Recep = aTable[0].HORA_RECEP.ToString();
                else o.Hora_Recep = string.Empty;
                o.Calles_Destino = aTable[0].ENTRE_CALLES_DESTINO;

            }

            return o;
        }


        public List<monodrogas> MonoDrogas(int Numero)
        {
            AtConsultoioDALTableAdapters.H2_MonoDrogas_ListaTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_MonoDrogas_ListaTableAdapter();

            AtConsultoioDAL.H2_MonoDrogas_ListaDataTable aTable = adapter.GetData(Numero);

            List<monodrogas> Lista = new List<monodrogas>();

            foreach (AtConsultoioDAL.H2_MonoDrogas_ListaRow row in aTable.Rows)
            {
                monodrogas m = new monodrogas();
                m.id = row.id;
                m.numero = row.Numero;
                if (!row.IsMonoDrogaNull()) { m.nombre = row.MonoDroga; }
                if (!row.IsActivoNull()) { m.activo = false; } else { m.activo = true; }
                Lista.Add(m);
            }

            return Lista;
        }

        public List<insumos_medidas> Insumos_Medidas()
        {
            AtConsultoioDALTableAdapters.H2_MEDIDAS_LISTTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_MEDIDAS_LISTTableAdapter();

            AtConsultoioDAL.H2_MEDIDAS_LISTDataTable aTable = adapter.GetData();

            List<insumos_medidas> Lista = new List<insumos_medidas>();

            foreach (AtConsultoioDAL.H2_MEDIDAS_LISTRow row in aTable.Rows)
            {
                insumos_medidas m = new insumos_medidas();
                m.id = row.id;
                m.medida = row.medida;
                Lista.Add(m);
            }

            return Lista;
        }


        public List<insumos_presentacion> Insumos_Presentacion()
        {
            AtConsultoioDALTableAdapters.H2_PRESENTACION_LISTTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_PRESENTACION_LISTTableAdapter();

            AtConsultoioDAL.H2_PRESENTACION_LISTDataTable aTable = adapter.GetData();

            List<insumos_presentacion> Lista = new List<insumos_presentacion>();

            foreach (AtConsultoioDAL.H2_PRESENTACION_LISTRow row in aTable.Rows)
            {
                insumos_presentacion p = new insumos_presentacion();
                p.id = row.id;
                p.presentacion = row.presentacion;
                Lista.Add(p);
            }

            return Lista;
        }



        public Int64 BorrarReceta(long Protocolo, int MonoDrogaId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            if (Protocolo != 0 && MonoDrogaId != 0)
            {
                try
                {
                    object Nro = adapter.H2_AtConsultorio_Recetas_Borrar_Det(MonoDrogaId, Protocolo);
                    return Convert.ToInt64(Protocolo);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            return 0;
        }



        public Int64 Guardar_Recetas(List<recetasmonodrogas> MonoDrogas, long Protocolo, DateTime FechaEntrega, int MedicoId, int Patologia, long NHC, DateTime FechaInicio, string DiagnosticoId, int AutoizadoId, string PeriodoSolicitado, int EspecialidadId, long UsuarioId)
        { 
            try
            {
                ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
                object Nro = adapter.H2_AtConsultorio_Recetas_Guardar_Cab(Protocolo, FechaEntrega, MedicoId, Patologia, NHC, FechaInicio, DiagnosticoId, AutoizadoId, PeriodoSolicitado, EspecialidadId,UsuarioId);
                long NroR = 0;
                if (Nro != null) NroR = Convert.ToInt64(Nro);
                else throw new Exception("Problema al guardar la receta.");

                foreach (recetasmonodrogas mono in MonoDrogas)
                {
                    if (mono.Estado == "0")
                    {
                        adapter.H2_AtConsultorio_Recetas_Borrar_Det(mono.monodrogascodigo, NroR);
                    }
                }
                foreach (recetasmonodrogas mono in MonoDrogas)
                {
                    if (mono.Estado != "0")
                    {
                        adapter.H2_AtConsultorio_Recetas_Guardar_Det(mono.monodrogascodigo, mono.adicional, mono.dosis_diaria, mono.dosis, mono.unidad_medida_id, mono.presentacion_id, NroR, mono.observacion);
                    }

                }
                return NroR;
            }
            catch(Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public List<recetas_cab> CargarRecetas_CAB(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Recetas_Cargar_CABTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Recetas_Cargar_CABTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_Recetas_Cargar_CABDataTable aTable = adapter.GetData(Protocolo);

            List<recetas_cab> Lista = new List<recetas_cab>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Recetas_Cargar_CABRow row in aTable.Rows)
            {
                recetas_cab r = new recetas_cab();
                if (!row.IsAutoizadoIdNull()) { r.autorizanteid = row.AutoizadoId; }
                if (!row.IsDiagnosticoIdNull()) { r.diagnoticoid = row.DiagnosticoId; }
                if (!row.IsFechaEntregaNull()) { r.fechaentrega = row.FechaEntrega.ToShortDateString(); }
                if (!row.IsFechaInicioNull()) { r.fechainicio = row.FechaInicio.ToShortDateString(); }
                if (!row.IsMedicoIdNull()) { r.medicoid = row.MedicoId; }
                if (!row.IsNHCNull()) { r.NHC = row.NHC; }
                if (!row.IsPatologiaNull()) { r.patologia = row.Patologia; }
                if (!row.IsPeriodoSolicitadoNull()) { r.periodo = row.PeriodoSolicitado; }
                if (!row.IsICDDescNull()) r.diagnoticodesc = row.ICDDesc;
                else r.diagnoticodesc = string.Empty;
                r.protocolo = row.Protocolo;
                Lista.Add(r);
            }

            return Lista;
        }

        public List<recetasmonodrogas> CargarRecetas_DET(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Recetas_Cargar_DETTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Recetas_Cargar_DETTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_Recetas_Cargar_DETDataTable aTable = adapter.GetData(Protocolo);

            List<recetasmonodrogas> Lista = new List<recetasmonodrogas>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Recetas_Cargar_DETRow row in aTable.Rows)
            {
                recetasmonodrogas r = new recetasmonodrogas();
                if(!row.IsadicionalNull()) r.adicional = row.adicional;
                if (!row.IsDosisNull()) { r.dosis = row.Dosis; }
                if (!row.IsDosisDiarioNull()) { r.dosis_diaria = row.DosisDiario; }
                r.monodrogascodigo = row.monodrograid;
                r.monodrogasnombre = row.MonoDroga;
                if (!row.IsObservacionNull()) { r.observacion = row.Observacion; }
                if (!row.IsPresentacionIdNull()) { r.presentacion_id = row.PresentacionId; } else { r.presentacion_id = 0; r.presentacion = ""; }
                if (!row.IsUnidad_PresentacionNull()) { r.presentacion = row.Unidad_Presentacion; } else { r.presentacion = ""; }
                if (!row.IsUnidadIdNull()) { r.unidad_medida_id = row.UnidadId; } else { r.unidad_medida_id = 0; }
                if (!row.IsUnidad_NombreNull()) { r.unidad_medida = row.Unidad_Nombre; } else { r.unidad_medida = ""; }
                r.detalleid = row.DetalleId;
                Lista.Add(r);
            }

            return Lista;
        }

        public Int64 UltimaReceta(long NHC)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            long _NHC;
            if (!long.TryParse(NHC.ToString(), out _NHC)) throw new Exception("Paciente Incorrecto.");
            try
            {
                object Nro = adapter.H2_AtConsultorio_UltimaReceta(_NHC);
                if (Nro != null) return Convert.ToInt64(Nro);
                else throw new Exception("Ultima Receta no encontrada.");
            }
            catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public List<recetas_busqueda> BuscarRecetas(DateTime IngresoDesde, DateTime IngresoHasta, DateTime EgresoDesde, DateTime EgresoHasta, long NHC, string Paciente)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Receta_BusquedaTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Receta_BusquedaTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_Receta_BusquedaDataTable aTable = adapter.GetData(IngresoDesde, IngresoHasta, EgresoDesde, EgresoHasta, NHC, Paciente);

            List<recetas_busqueda> Lista = new List<recetas_busqueda>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Receta_BusquedaRow row in aTable.Rows)
            {
                recetas_busqueda r = new recetas_busqueda();
                r.apellido = row.apellido;
                if (!row.IsFechaInicioNull()) r.fechainicio = row.FechaInicio.ToShortDateString();
                else r.fechainicio = string.Empty;
                if (!row.IsFechaEntregaNull()) r.fechaentrega = row.FechaEntrega.ToShortDateString();
                else r.fechaentrega = string.Empty;

                if (!row.IsNHCNull()) r.NHC = row.NHC;
                else r.NHC = string.Empty;

                r.protocolo = row.Protocolo;
                if (!row.IsMedicoNull()) r.medico = row.Medico;
                else r.medico = string.Empty;


                r.medicoId = row.MedicoId;

                Lista.Add(r);
            }

            return Lista;
        }



        public long Guarcar_Diabetes(long Protocolo, int Tipo, bool Obesidad, bool Dislipidemia, bool HC, string otros, int Retinopatia, int Neuropatia,
            int ivp, int CI, int Nefropatia, int Pie, int hta, int tabaco, long NHC, int Medico_Diabetes_Id,
            string MotivoModificacion, string HbgA1C, string HDL, string TG, string FRUCTOSAMINA, string URICEMIA, string CLEARENCEC, string UREA, string TGO, string BT,
            string BD, string COLTOTAL, string LDL, string MICROALBUMINURIA, string CREA, string GLUCEMIA, string PROTEINURIA, string CPK, string TGP, string BI, string OJO_D,
            string OJO_I, string OTROS_LABORATORIO, DateTime FECHA_ANALISIS, string EVOLUCION, string Peso, string Talla, string Metformina, string Glibenciamida, string Glicazida,
            string Glimepirida, string Glipizida, string Rosiglitazona, string Atorvastatina, string Sinvastantina, string Ezetimibe, string Fenofibrato, string NPH, string Rapida,
            string RapidaAnalogo, string Lispro, string Ultralenta, string Mix25, string Mix30, string OTROS_MEDICAMENTOS
            )
        {
            DiabetesDALTableAdapters.QueriesTableAdapter adapter = new DiabetesDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_AtConsultorio_Diabetes_Guardar(
                 Protocolo, Tipo, Obesidad, Dislipidemia, HC, otros, Retinopatia, Neuropatia,
             ivp, CI, Nefropatia, Pie, hta, tabaco, NHC, Medico_Diabetes_Id, MotivoModificacion, HbgA1C, HDL, TG, FRUCTOSAMINA, URICEMIA, CLEARENCEC, UREA, TGO, BT,
             BD, COLTOTAL, LDL, MICROALBUMINURIA, CREA, GLUCEMIA, PROTEINURIA, CPK, TGP, BI, OJO_D,
             OJO_I, OTROS_LABORATORIO, FECHA_ANALISIS, EVOLUCION, Peso, Talla, Metformina, Glibenciamida, Glicazida,
             Glimepirida, Glipizida, Rosiglitazona, Atorvastatina, Sinvastantina, Ezetimibe, Fenofibrato, NPH, Rapida,
             RapidaAnalogo, Lispro, Ultralenta, Mix25, Mix30, OTROS_MEDICAMENTOS
                );
            return Convert.ToInt64(R);

        }

        public cargar_diabetes CargarDiabetes(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_CargaDiabetesTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_CargaDiabetesTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_CargaDiabetesDataTable aTable = adapter.GetData(Protocolo);

            if (aTable.Rows.Count > 0)
            {
                cargar_diabetes r = new cargar_diabetes();

                r.Protocolo = aTable[0].id;
                if (!aTable[0].IsTipoNull()) r.Tipo = aTable[0].Tipo;
                if (!aTable[0].IsObesidadNull()) r.Obesidad = aTable[0].Obesidad;
                if (!aTable[0].IsDislipidemiaNull()) r.Dislipidemia = aTable[0].Dislipidemia;
                if (!aTable[0].IsHCNull()) r.HC = aTable[0].HC;
                if (!aTable[0].IsOtrosNull()) r.otros = aTable[0].Otros;
                if (!aTable[0].IsRetinopatiaNull()) r.Retinopatia = aTable[0].Retinopatia;
                if (!aTable[0].IsNeuropatiaNull()) r.Neuropatia = aTable[0].Neuropatia;
                if (!aTable[0].IsivpNull()) r.ivp = aTable[0].ivp;
                if (!aTable[0].IsivpNull()) r.CI = aTable[0].CI;
                if (!aTable[0].IsNefropatiaNull()) r.Nefropatia = aTable[0].Nefropatia;
                if (!aTable[0].IsPieNull()) r.Pie = aTable[0].Pie;
                if (!aTable[0].IshtaNull()) r.hta = aTable[0].hta;
                if (!aTable[0].IstabacoNull()) r.tabaco = aTable[0].tabaco;
                if (!aTable[0].IsNHCNull()) r.NHC = aTable[0].NHC;
                if (!aTable[0].IsMedico_Diabetes_IdNull()) r.Medico_Diabetes_Id = aTable[0].Medico_Diabetes_Id;
                if (!aTable[0].IsMotivoModificacionNull()) r.MotivoModificacion = aTable[0].MotivoModificacion;
                if (!aTable[0].IsHbgA1CNull()) r.HbgA1C = aTable[0].HbgA1C;
                if (!aTable[0].IsHDLNull()) r.HDL = aTable[0].HDL;
                if (!aTable[0].IsTGNull()) r.TG = aTable[0].TG;
                if (!aTable[0].IsFRUCTOSAMINANull()) r.FRUCTOSAMINA = aTable[0].FRUCTOSAMINA;
                if (!aTable[0].IsURICEMIANull()) r.URICEMIA = aTable[0].URICEMIA;
                if (!aTable[0].IsCLEARENCECNull()) r.CLEARENCEC = aTable[0].CLEARENCEC;
                if (!aTable[0].IsUREANull()) r.UREA = aTable[0].UREA;
                if (!aTable[0].IsTGONull()) r.TGO = aTable[0].TGO;
                if (!aTable[0].IsBTNull()) r.BT = aTable[0].BT;
                if (!aTable[0].IsBDNull()) r.BD = aTable[0].BD;
                if (!aTable[0].IsCOLTOTALNull()) r.COLTOTAL = aTable[0].COLTOTAL;
                if (!aTable[0].IsLDLNull()) r.LDL = aTable[0].LDL;
                if (!aTable[0].IsMICROALBUMINURIANull()) r.MICROALBUMINURIA = aTable[0].MICROALBUMINURIA;
                if (!aTable[0].IsCREANull()) r.CREA = aTable[0].CREA;
                if (!aTable[0].IsGLUCEMIANull()) r.GLUCEMIA = aTable[0].GLUCEMIA;
                if (!aTable[0].IsPROTEINURIANull()) r.PROTEINURIA = aTable[0].PROTEINURIA;
                if (!aTable[0].IsCPKNull()) r.CPK = aTable[0].CPK;
                if (!aTable[0].IsTGPNull()) r.TGP = aTable[0].TGP;
                if (!aTable[0].IsBINull()) r.BI = aTable[0].BI;
                if (!aTable[0].IsOJO_DNull()) r.OJO_D = aTable[0].OJO_D;
                if (!aTable[0].IsOJO_INull()) r.OJO_I = aTable[0].OJO_I;
                if (!aTable[0].IsOTROS_LABORATORIONull()) r.OTROS_LABORATORIO = aTable[0].OTROS_LABORATORIO;
                if (!aTable[0].IsFECHA_ANALISISNull()) r.fechaanalisis = aTable[0].FECHA_ANALISIS.ToShortDateString();
                if (!aTable[0].IsEVOLUCIONNull()) r.EVOLUCION = aTable[0].EVOLUCION;
                if (!aTable[0].IsPesoNull()) r.Peso = aTable[0].Peso;
                if (!aTable[0].IsTallaNull()) r.Talla = aTable[0].Talla;
                if (!aTable[0].IsMetforminaNull()) r.Metformina = aTable[0].Metformina;
                if (!aTable[0].IsGlibenciamidaNull()) r.Glibenciamida = aTable[0].Glibenciamida;
                if (!aTable[0].IsGlicazidaNull()) r.Glicazida = aTable[0].Glicazida;
                if (!aTable[0].IsGlimepiridaNull()) r.Glimepirida = aTable[0].Glimepirida;
                if (!aTable[0].IsGlipizidaNull()) r.Glipizida = aTable[0].Glipizida;
                if (!aTable[0].IsRosiglitazonaNull()) r.Rosiglitazona = aTable[0].Rosiglitazona;
                if (!aTable[0].IsAtorvastatinaNull()) r.Atorvastatina = aTable[0].Atorvastatina;
                if (!aTable[0].IsSinvastantinaNull()) r.Sinvastantina = aTable[0].Sinvastantina;
                if (!aTable[0].IsEzetimibeNull()) r.Ezetimibe = aTable[0].Ezetimibe;
                if (!aTable[0].IsFenofibratoNull()) r.Fenofibrato = aTable[0].Fenofibrato;
                if (!aTable[0].IsNPHNull()) r.NPH = aTable[0].NPH;
                if (!aTable[0].IsRapidaNull()) r.Rapida = aTable[0].Rapida;
                if (!aTable[0].IsRapidaAnalogoNull()) r.RapidaAnalogo = aTable[0].RapidaAnalogo;
                if (!aTable[0].IsLisproNull()) r.Lispro = aTable[0].Lispro;
                if (!aTable[0].IsUltralentaNull()) r.Ultralenta = aTable[0].Ultralenta;
                if (!aTable[0].IsMix25Null()) r.Mix25 = aTable[0].Mix25;
                if (!aTable[0].IsMix30Null()) r.Mix30 = aTable[0].Mix30;
                if (!aTable[0].IsOTROS_MEDICAMENTOSNull()) r.OTROS_MEDICAMENTOS = aTable[0].OTROS_MEDICAMENTOS;

                return r;
            }

            return null;
        }



        public long Guardar_P_General(
            long Protocolo, string Patologia, string ICD10_Det_Id, string Observaciones, int Especialidad_Id, long NHC,string MotivoModificacion, int MedicoId
    )
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_AtConsultorio_Guardar_P_General(Protocolo, Patologia, ICD10_Det_Id, Observaciones, Especialidad_Id, NHC, MotivoModificacion, MedicoId);
                if (R != null) return Convert.ToInt64(R);
                else throw new Exception("Error al guardar protocolo.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public long Guardar_Neonatologia(long Protocolo, long NHC, string fnac, string peso, string talla, string percef, int MedicoId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_AtConsultorio_NeoNatologia_Guardar(Protocolo, NHC, peso, talla, percef, Convert.ToDateTime(fnac), MedicoId);
                if (R != null) return Convert.ToInt64(R);
                else throw new Exception("Error al guardar consulta de neonatología.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public long Ultimo_Protocolo_by_NHC_Medico(long NHC, int EspecialidadId ,int MedicoId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_AtConsultorio_Ultimo_Protocolo_by_NHC_Medico(NHC, EspecialidadId, MedicoId);
                if (R != null) return Convert.ToInt64(R);
                else throw new Exception("No existe un protocolo anterior.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public carga_general  Cargar_At_P_General(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_CargadePGeneralTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_CargadePGeneralTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_CargadePGeneralDataTable aTable = adapter.GetData(Protocolo);
            if (aTable.Rows.Count > 0)
            {
                carga_general c = new carga_general();
                if (!aTable[0].IsICD10_Det_IdNull()) c.diagnostico_cod = aTable[0].ICD10_Det_Id;
                if (!aTable[0].IsFecha_AtencionNull()) c.fecha = aTable[0].Fecha_Atencion.ToShortDateString();
                if (!aTable[0].IsMotivoModificacionNull()) c.modificacion = aTable[0].MotivoModificacion;
                if (!aTable[0].IsNHCNull()) c.NHC = aTable[0].NHC;
                if (!aTable[0].IsObservacionesNull()) c.observaciones = aTable[0].Observaciones;
                if (!aTable[0].IsPatologiaNull()) c.patologia = aTable[0].Patologia;
                c.medico = aTable[0].Medico;
                c.especialidad  = aTable[0].Especialidad;
                c.diagnostico_desc = aTable[0].ICD10;            
                c.protocolo = aTable[0].ConsultaGid;
                return c;
            }

            return null;

        }


        public List<servicios_hospitalario> CargarServicios()
        {
            AtConsultoioDALTableAdapters.H2_Servicio_Lista_ATableAdapter adapter = new AtConsultoioDALTableAdapters.H2_Servicio_Lista_ATableAdapter();

            AtConsultoioDAL.H2_Servicio_Lista_ADataTable aTable = adapter.GetData(null,null);

            List<servicios_hospitalario> Lista = new List<servicios_hospitalario>();

            foreach (AtConsultoioDAL.H2_Servicio_Lista_ARow row in aTable.Rows)
            {
                servicios_hospitalario s = new servicios_hospitalario();
                s.id = row.Id;
                s.servicio = row.Descripcion;
                Lista.Add(s);
            }

            return Lista;
        }


        public Int64 UltimaOrdenInternacion(long NHC)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            if (NHC != 0)
            {
                try
                {
                    object Nro = adapter.H2_AtConsultorio_UltimaOrdenInternacion(NHC);
                    if (Nro != null) return Convert.ToInt64(Nro);
                    else throw new Exception("No se encontró última orden de internación."); 
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }

            return 0;
        }



        public orden_internacion CargarOrdenInternacion(long Protocolo)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cargar_OrdenInternacionTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cargar_OrdenInternacionTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_Cargar_OrdenInternacionDataTable aTable = adapter.GetData(Protocolo);

            if (aTable.Rows.Count > 0)
            {
                orden_internacion o = new orden_internacion();
                if (!aTable[0].IsCAMANull()) { o.cama = aTable[0].CAMA; }
                if (!aTable[0].IsDIAGNOSTICONull()) { o.diagnostico = aTable[0].DIAGNOSTICO; }
                o.fechainternacion = aTable[0].FECHA_INTERNACION.ToShortDateString();
                o.id = aTable[0].ID_ORDEN_INT;
                if (!aTable[0].IsINDICACIONESNull()) { o.indicaciones = aTable[0].INDICACIONES; }
                if (!aTable[0].IsMEDICO_IDNull()) { o.medicoid = aTable[0].MEDICO_ID; }
                o.ordenindicada = aTable[0].ID_AREA.ToString();
                if (!aTable[0].IsPISONull()) { o.piso = aTable[0].PISO; }
                o.servicioid = aTable[0].ID_SERV.ToString();
                o.NHC = aTable[0].NHC;
                
                return o;
            }

            return null;
        }




        public long Guardar_Orden_Internacion(long NHC, int ID_SERV, string DIAGNOSTICO, int AREA, DateTime FECHA_INTERNACION, string PISO, string CAMA, string INDICACIONES, int MEDICOID, long ordenId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                object R = adapter.H2_AtConsultorio_Guardar_OrdenInternacion(NHC, ID_SERV, DIAGNOSTICO, AREA, FECHA_INTERNACION, PISO, CAMA, INDICACIONES, MEDICOID,ordenId);
                if (R != null) return Convert.ToInt64(R);
                else throw new Exception("Error al guardar orden de internación.");
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
        }



        public string Consultorio_del_Dia_MyE(int MedicoId, int EspecialidadId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_AtConsultorio_Consultorio_MyE(MedicoId, EspecialidadId);
            if (R != null)
            {
                return R.ToString();
            }
            else
            {
                return "*";
            }
        }


        public void Llamar_Paciente_Turnera(int MedicoId, int EspecialidadId, long NHC, string ConsultorioId)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_AtConsultorio_Llamar_Paciente(MedicoId, EspecialidadId, NHC, ConsultorioId);
                long Doc = NHC;
                usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
                Estadisticas.Est_PacienteMovBLL E = new Estadisticas.Est_PacienteMovBLL();
                E.EstPacMov(Doc, 5, (Int32)U.id, "Paciente Llamado MedicoId:" + MedicoId + " // EspecialidadId:" + EspecialidadId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string Medico_Paciente_Sin_Finalizar(int MedicoId, int Especialidad, DateTime Fecha)
        {
            ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter adapter = new ConfirmarTurnos_RecepcionTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Medico_Tiene_Llamados_Sin_Finalizar(MedicoId, Especialidad, Fecha);
            if (R != null)
            {
                return (Convert.ToDateTime(R)).ToString("dd/MM/yyyy HH:mm");
            }
            else
            {
                return "";
            }
        }

       /*Manuel==============================================================================================================================================*/
        public long Atencion_Diabetes_Guardar(int Protocolo, int NHC, int MedicoId, string Tipo, string Antiguedad, string Antecedentes, string Peso, string IMC, string CC, int hipoglucemias, string Grado, string Fecuencia, int Retinopatia, int Nefropatia,
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

            DiabetesDALTableAdapters.QueriesTableAdapter adapter = new DiabetesDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_AtConsultorio_Diabetes_CargarAtencion(
Tipo
, Antiguedad
, Antecedentes
, Peso
, IMC
, CC
, hipoglucemias
, Grado
, Fecuencia
, Retinopatia
, Nefropatia
, Neuropatia
, Macrovascular
, MetforminaP
, MetforminaDosis
, MetforminaMgxdia
, MetforminaAntiguedad
, GlibenclamidaP
, GlibenclamidaDosis
, GlibenclamidaMgxdia
, GlibenclamidaAntiguedad
, GlicazidaDosis
, GlicazidaMgxdia
, GlicazidaAntiguedad
, InsulinaNPHDosis
, InsulinaNPHMgxdia
, InsulinaNPHAntiguedad
, InsulinaCORRIENTEDosis
, InsulinaCORRIENTEMgxdia
, InsulinaCORRIENTEAntiguedad
, otraNom
, otraDosis
, otraMgxdia
, otraAntiguedad
, HBA1CUltimo
, HBA1CUltimoFecha
, HBA1CAnterior
, HBA1CAnteriorFecha
, GlucemiaAyunoUltimo
, GlucemiaAyunoUltimoFecha
, GlucemiaAyunoAnterior
, GlucemiaAyunoAnteriorFecha
, FondoOjo
, FuncionRenal
, Creatinina
, Urea
, CdeCreatinina
, Microalbuminuria
, Pies
, Protocolo
, NHC
, MedicoId
, Asiste_Taller
, Taller_Fecha
, Altura
, HTA
, EnfermedadCoronaria
, Tabaquismo
, Obesidad
, Dislipidemia
, Acv
, GlimeripideDosis
, GlimeripideMgxdia
, GlimeripideAntiguedad
, SitagliptinaDosis
, SitagliptinaMgxdia
, SitagliptinaAntiguedad
, VildagliptinaDosis
, VildagliptinaMgxdia
, VildagliptinaAntiguedad
, SaxaGliptinaDosis
, SaxaGliptinaMgxdia
, SaxaGliptinaAntiguedad
, LinagliptinaDosis
, LinagliptinaMgxdia
, LinagliptinaAntiguedad
, InsulinaAsparticaDosis
, InsulinaAsparticaMgxdia
, InsulinaAsparticaAntiguedad
, InsulinaLisproDpsis
, InsulinaLisproMgxdia
, InsulinaLisproAntiguedad
, InsulinaGlucolisinaDosis
, InsulinaGlucolisinaMgxdia
, InsulinaGlucolisinaAntiguedad
, InsulinaAsparticaBifàsicaDosis
, InsulinaAsparticaBifàsicaMgxdia
, InsulinaAsparticaBifàsicaAntiguedad
, InsulinaLispro7525Dosis
, InsulinaLispro7525mgxdia
, InsulinaLispro7525Antiguedad
, InsulinaLispro5050Dosis
, InsulinaLispro5050Mgxdia
, InsulinaLispro5050Antiguedad
, InsulinaGlarginaDosis
, InsulinaGlarginaMgxdia
, InsulinaGlarginaAntiguedad
, InsulinaDetermirDosis
, InsulinaDetermirMgxdia
, InsulinaDetermirAntiguedad
, InsulinaDegludecDosis
, InsulinaDegludecMgxdia
, InsulinaDegludecAntiguedad
, TirasReactivaDosis
, TirasReactivaMgxdia
, TirasReactivaAntiguedad
, OtroTipo2
, OtroTipoDosis2
, OtroTipoMgxdía2
, OtroTipoAntiguedad2
, OtroTipo3
, OtroTipoDosis3
, OtroTipoMgxdía3
, OtroTipoAntiguedad3
, OtroTipo4
, OtroTipoDosis4
, OtroTipoMgxdía4
, OtroTipoAntiguedad4
, OtroTipo5
, OtroTipoDosis5
, OtroTipoMgxdía5
, OtroTipoAntiguedad5
, documentoReal
, fechaFondoOjo
, GlicazidaP
, InsulinaNPHDosisP
, InsulinaCorrienteP
, GlimeripideP
, SitagliptinaP
, VildagliptinaP
, SaxaGliptinaP
, LinagliptinaP
, InsulinaAsparticaP
, InsulinaLisproP
, InsulinaGlucolisinaP
, InsulinaAsparticaBifàsicaP
, InsulinaLispro7525P
, InsulinaLispro5050P
, InsulinaGlarginaP
, InsulinaDetermirP
, InsulinaDegludecP
, TirasReactivaP
, OtroTipoP
, OtroTipo2P
, OtroTipo3P
, OtroTipo4P
, OtroTipo5P
, MetforminaAntiguedad
, Retinopatia.ToString()
, NHC
, MedicoId


           );


            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;


        }


        public List<Consulta_Diabetes> Diabetes_Cargar_Consultas(long NHC)
        {

            //AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_ConsultasTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_ConsultasTableAdapter();
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_ConsultasTableAdapter adaptador = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_ConsultasTableAdapter();

            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_ConsultasTableAdapter a = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_ConsultasTableAdapter();

            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_ConsultasDataTable aTable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_ConsultasDataTable();

            aTable = a.GetData(NHC);
            List<Consulta_Diabetes> lista = new List<Consulta_Diabetes>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_ConsultasRow row in aTable.Rows)
            {
                Consulta_Diabetes consulta = new Consulta_Diabetes();
                consulta.id_consulta = row.Consulta_ID;
                consulta.nombre_paciente = row.Paciente;
                consulta.nombre_medico = row.Médico;
                consulta.fecha_consulta = row.Fecha_de_Consulta.ToShortDateString();
                if (!row.IsFecha_ModificacionNull())
                {
                    consulta.fecha_modificacion = row.Fecha_Modificacion.ToShortDateString();
                }
                else { consulta.fecha_modificacion = ""; }
                lista.Add(consulta);
            }

            return lista;
        }



        public Consulta_Diabetes Diabetes_Cargar_Una_Consulta(int id)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_Consulta_IdTableAdapter adaptador = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_Consulta_IdTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Consulta_IdDataTable aTable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Consulta_IdDataTable();

            aTable = adaptador.GetData(id);
            Consulta_Diabetes consulta = new Consulta_Diabetes();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Consulta_IdRow row in aTable.Rows)
            {
                consulta.id_consulta = row.id;
                consulta.tipo = row.Tipo;
                if (!row.IsAntiguedadNull())
                    consulta.antiguedad = row.Antiguedad;

                if (!row.IsAntecedentesNull())
                    consulta.antecendentes = row.Antecedentes;

                if (!row.IsPesoNull())
                    consulta.peso = row.Peso;

                if (!row.IsTallaNull())
                    consulta.talla = row.Talla;

                if (!row.IsIMCNull())
                    consulta.IMC = row.IMC;

                if (!row.IsCCNull())
                    consulta.CC = row.CC;

                if (!row.IsCdeCreatininaNull())//////////////////////////////////////////////
                    consulta.cdeCreatinina = row.CdeCreatinina;

                if (!row.IshipoglucemiasNull())
                    consulta.hipoglucemias = row.hipoglucemias;

                if (!row.IsGradoNull())
                    consulta.grado = row.Grado;

                if (!row.IsFecuenciaNull())
                    consulta.frecuencia = row.Fecuencia;

                if (!row.IsRetinopatíaNull())
                    consulta.retinopatia = row.Retinopatía;

                if (!row.IsNefropatiaNull())
                    consulta.nefropatia = row.Nefropatia;

                if (!row.IsNeuropatiaNull())
                    consulta.neuropatia = row.Neuropatia;

                if (!row.IsMacrovascularNull())
                    consulta.macrovascular = row.Macrovascular;

                if (!row.IsMetforminaDosisNull())
                    consulta.metforminaDosis = row.MetforminaDosis;

                if (!row.IsMetforminaMgxdiaNull())
                    consulta.metforminaDosisMgXdia = row.MetforminaMgxdia;

                if (!row.IsMetforminaAntigüedadNull())
                    consulta.metforminaAntiguedad = row.MetforminaAntigüedad;

                if (!row.IsGlibenclamidaDosisNull())
                    consulta.glibenclamidaDosis = row.GlibenclamidaDosis;

                if (!row.IsGlibenclamidaMgxdiaNull())
                    consulta.glibenclamidaMgXdia = row.GlibenclamidaMgxdia;

                if (!row.IsGlibenclamidaAntiguedadNull())
                    consulta.glibenclamidaAntiguedad = row.GlibenclamidaAntiguedad;

                if (!row.IsGlicazidaDosisNull())
                    consulta.glicazidaDosis = row.GlicazidaDosis;

                if (!row.IsGlicazidaMgxdiaNull())
                    consulta.glicazidaMgXdia = row.GlicazidaMgxdia;

                if (!row.IsGlicazidaAntiguedadNull())
                    consulta.glicazidaAntiguedad = row.GlicazidaAntiguedad;

                if (!row.IsInsulinaNPHDosisNull())
                    consulta.insulinaNPHdosis = row.InsulinaNPHDosis;

                if (!row.IsInsulinaNPHMgxdiaNull())
                    consulta.insulinaNPHmgXdia = row.InsulinaNPHMgxdia;

                if (!row.IsInsulinaNPHAntiguedadNull())
                    consulta.insulinaNPHantiguedad = row.InsulinaNPHAntiguedad;

                if (!row.IsInsulinaCORRIENTEDosisNull())
                    consulta.insulinaCorrienteDosis = row.InsulinaCORRIENTEDosis;

                if (!row.IsInsulinaCORRIENTEMgxdiaNull())
                    consulta.insulinaCorrienteMgXdia = row.InsulinaCORRIENTEMgxdia;

                if (!row.IsInsulinaCORRIENTEAntiguedadNull())
                    consulta.insulinaCorrienteAntiguedad = row.InsulinaCORRIENTEAntiguedad;

                if (!row.IsotraNomNull())
                    consulta.otraNom = row.otraNom;

                if (!row.IsotraDosisNull())
                    consulta.otraDosis = row.otraDosis;

                if (!row.IsotraMgxdiaNull())
                    consulta.otraMgXdia = row.otraMgxdia;

                if (!row.IsotraAntiguedadNull())
                    consulta.otraAntiguedad = row.otraAntiguedad;

                if (!row.IsHBA1CUltimoNull())
                    consulta.HBA1Cultimo = row.HBA1CUltimo;

                if (!row.IsHBA1CUltimoFechaNull())
                    consulta.HBA1CultimoFecha = row.HBA1CUltimoFecha;

                if (!row.IsHBA1CAnteriorNull())
                    consulta.HBA1Canterior = row.HBA1CAnterior;

                if (!row.IsHBA1CAnteriorFechaNull())
                    consulta.HBA1CanteriorFecha = row.HBA1CAnteriorFecha;

                if (!row.IsGlucemiaAyunoUltimoNull())
                    consulta.glucemiaAyunoUltimo = row.GlucemiaAyunoUltimo;

                if (!row.IsGlucemiaAyunoUltimoFechaNull())
                    consulta.glucemiaAyunoUltimoFecha = row.GlucemiaAyunoUltimoFecha;

                if (!row.IsGlucemiaAyunoAnteriorNull())
                    consulta.glucemiaAyunoAnterior = row.GlucemiaAyunoAnterior;

                if (!row.IsGlucemiaAyunoAnteriorFechaNull())
                    consulta.glucemiaAyunonteriorFecha = row.GlucemiaAyunoAnteriorFecha;

                if (!row.IsFondoOjoNull())
                    consulta.fondoOjo = row.FondoOjo;

                if (!row.IsFuncionRenalNull())
                    consulta.funcionrenal = row.FuncionRenal;

                if (!row.IsCreatininaNull())
                    consulta.creatinina = row.Creatinina;

                if (!row.IsUreaNull())
                    consulta.urea = row.Urea;

                if (!row.IsCdeCreatininaNull())
                    consulta.cdeCreatinina = row.CdeCreatinina;

                if (!row.IsMicroalbuminuriaNull())
                    consulta.microalbuminuria = row.Microalbuminuria;

                if (!row.IsPiesNull())
                    consulta.pies = row.Pies;

                if (!row.IsAsiste_TallerNull())
                    consulta.Asiste_Taller = row.Asiste_Taller;

                if (!row.IsTaller_FechaNull())
                    consulta.Taller_Fecha = row.Taller_Fecha.ToShortDateString();

                consulta.fecha_consulta = row.FechaConsulta.ToString();
                consulta.idPaciente = row.IdPaciente;
                consulta.idMedco = row.IdMedico;

                if (!row.IsAlturaNull())
                    consulta.Altura = row.Altura;

                if (!row.IsHTANull())
                    consulta.HTA = row.HTA;

                if (!row.IsEnfermedadCoronariaNull())
                    consulta.EnfermedadCoronaria = row.EnfermedadCoronaria;

                if (!row.IsTabaquismoNull())
                    consulta.Tabaquismo = row.Tabaquismo;

                if (!row.IsObesidadNull())
                    consulta.Obesidad = row.Obesidad;

                if (!row.IsDislipidemiaNull())
                    consulta.Dislipidemia = row.Dislipidemia;

                if (!row.IsAcvNull())
                    consulta.Acv = row.Acv;

                if (!row.IsGlimeripideDosisNull())
                    consulta.GlimeripideDosis = row.GlimeripideDosis;

                if (!row.IsGlimeripideMgxdiaNull())
                    consulta.GlimeripideMgxdia = row.GlimeripideMgxdia;

                if (!row.IsGlimeripideAntiguedadNull())
                    consulta.GlimeripideAntiguedad = row.GlimeripideAntiguedad;

                if (!row.IsSitagliptinaDosisNull())
                    consulta.SitagliptinaDosis = row.SitagliptinaDosis;


                if (!row.IsSitagliptinaMgxdiaNull())
                    consulta.SitagliptinaMgxdia = row.SitagliptinaMgxdia;

                if (!row.IsSitagliptinaAntiguedadNull())
                    consulta.SitagliptinaAntiguedad = row.SitagliptinaAntiguedad;

                if (!row.IsVildagliptinaDosisNull())
                    consulta.VildagliptinaDosis = row.VildagliptinaDosis;

                if (!row.IsVildagliptinaMgxdiaNull())
                    consulta.VildagliptinaMgxdia = row.VildagliptinaMgxdia;

                if (!row.IsVildagliptinaAntiguedadNull())
                    consulta.VildagliptinaAntiguedad = row.VildagliptinaAntiguedad;


                if (!row.IsSaxaGliptinaDosisNull())
                    consulta.SaxaGliptinaDosis = row.SaxaGliptinaDosis;

                if (!row.IsSaxaGliptinaMgxdiaNull())
                    consulta.SaxaGliptinaMgxdia = row.SaxaGliptinaMgxdia;

                if (!row.IsSaxaGliptinaAntiguedadNull())
                    consulta.SaxaGliptinaAntiguedad = row.SaxaGliptinaAntiguedad;

                if (!row.IsLinagliptinaDosisNull())
                    consulta.LinagliptinaDosis = row.LinagliptinaDosis;

                if (!row.IsLinagliptinaMgxdiaNull())
                    consulta.LinagliptinaMgxdia = row.LinagliptinaMgxdia;

                if (!row.IsLinagliptinaAntiguedadNull())
                    consulta.LinagliptinaAntiguedad = row.LinagliptinaAntiguedad;

                if (!row.IsInsulinaAsparticaDosisNull())
                    consulta.InsulinaAsparticaDosis = row.InsulinaAsparticaDosis;

                if (!row.IsInsulinaAsparticaMgxdiaNull())
                    consulta.InsulinaAsparticaMgxdia = row.InsulinaAsparticaMgxdia;

                if (!row.IsInsulinaAsparticaAntiguedadNull())
                    consulta.InsulinaAsparticaAntiguedad = row.InsulinaAsparticaAntiguedad;

                if (!row.IsInsulinaLisproDpsisNull())
                    consulta.InsulinaLisproDpsis = row.InsulinaLisproDpsis;


                //if (!row.IsInsulinaLisproMgxdiaNull())
                //    consulta.InsulinaLisproMgxdia = row.InsulinaLisproMgxdia;

                if (!row.IsInsulinaLisproMgxdiaNull())
                    consulta.InsulinaLisproMgxdia = row.InsulinaLisproMgxdia;

                if (!row.IsInsulinaLisproAntiguedadNull())
                    consulta.InsulinaLisproAntiguedad = row.InsulinaLisproAntiguedad;

                if (!row.IsInsulinaGlucolisinaDosisNull())
                    consulta.InsulinaGlucolisinaDosis = row.InsulinaGlucolisinaDosis;

                if (!row.IsInsulinaGlucolisinaMgxdiaNull())
                    consulta.InsulinaGlucolisinaMgxdia = row.InsulinaGlucolisinaMgxdia;


                if (!row.IsInsulinaGlucolisinaAntiguedadNull())
                    consulta.InsulinaGlucolisinaAntiguedad = row.InsulinaGlucolisinaAntiguedad;

                if (!row.IsInsulinaAsparticaBifàsicaDosisNull())
                    consulta.InsulinaAsparticaBifàsicaDosis = row.InsulinaAsparticaBifàsicaDosis;

                if (!row.IsInsulinaAsparticaBifàsicaMgxdiaNull())
                    consulta.InsulinaAsparticaBifàsicaMgxdia = row.InsulinaAsparticaBifàsicaMgxdia;

                if (!row.IsInsulinaAsparticaBifàsicaAntiguedadNull())
                    consulta.InsulinaAsparticaBifàsicaAntiguedad = row.InsulinaAsparticaBifàsicaAntiguedad;

                if (!row.IsInsulinaLispro7525DosisNull())
                    consulta.InsulinaLispro7525Dosis = row.InsulinaLispro7525Dosis;


                if (!row.IsInsulinaLispro7525mgxdiaNull())
                    consulta.InsulinaLispro7525mgxdia = row.InsulinaLispro7525mgxdia;

                if (!row.IsInsulinaLispro7525AntiguedadNull())
                    consulta.InsulinaLispro7525Antiguedad = row.InsulinaLispro7525Antiguedad;

                if (!row.IsInsulinaLispro5050DosisNull())
                    consulta.InsulinaLispro5050Dosis = row.InsulinaLispro5050Dosis;

                if (!row.IsInsulinaLispro5050MgxdiaNull())
                    consulta.InsulinaLispro5050Mgxdia = row.InsulinaLispro5050Mgxdia;

                if (!row.IsInsulinaLispro5050AntiguedadNull())
                    consulta.InsulinaLispro5050Antiguedad = row.InsulinaLispro5050Antiguedad;


                if (!row.IsInsulinaGlarginaDosisNull())
                    consulta.InsulinaGlarginaDosis = row.InsulinaGlarginaDosis;

                if (!row.IsInsulinaGlarginaMgxdiaNull())
                    consulta.InsulinaGlarginaMgxdia = row.InsulinaGlarginaMgxdia;

                if (!row.IsInsulinaGlarginaAntiguedadNull())
                    consulta.InsulinaGlarginaAntiguedad = row.InsulinaGlarginaAntiguedad;

                if (!row.IsInsulinaDetermirDosisNull())
                    consulta.InsulinaDetermirDosis = row.InsulinaDetermirDosis;

                if (!row.IsInsulinaDetermirMgxdiaNull())
                    consulta.InsulinaDetermirMgxdia = row.InsulinaDetermirMgxdia;

                if (!row.IsInsulinaDetermirAntiguedadNull())
                    consulta.InsulinaDetermirAntiguedad = row.InsulinaDetermirAntiguedad;

                if (!row.IsInsulinaDegludecDosisNull())
                    consulta.InsulinaDegludecDosis = row.InsulinaDegludecDosis;

                if (!row.IsInsulinaDegludecMgxdiaNull())
                    consulta.InsulinaDegludecMgxdia = row.InsulinaDegludecMgxdia;

                if (!row.IsInsulinaDegludecAntiguedadNull())
                    consulta.InsulinaDegludecAntiguedad = row.InsulinaDegludecAntiguedad;

                if (!row.IsTirasReactivaDosisNull())
                    consulta.TirasReactivaDosis = row.TirasReactivaDosis;

                if (!row.IsTirasReactivaMgxdiaNull())
                    consulta.TirasReactivaMgxdia = row.TirasReactivaMgxdia;

                if (!row.IsTirasReactivaAntiguedadNull())
                    consulta.TirasReactivasAntiguedad = row.TirasReactivaAntiguedad;

                if (!row.IsOtroTipo2Null())
                    consulta.OtroTipo2 = row.OtroTipo2;

                if (!row.IsOtroTipoDosis2Null())
                    consulta.OtroTipoDosis2 = row.OtroTipoDosis2;

                if (!row.IsOtroTipoMgxdía2Null())
                    consulta.OtroTipoMgxdía2 = row.OtroTipoMgxdía2;

                if (!row.IsOtroTipoAntiguedad2Null())
                    consulta.OtroTipoAntiguedad2 = row.OtroTipoAntiguedad2;

                if (!row.IsOtroTipo3Null())
                    consulta.OtroTipo3 = row.OtroTipo3;

                if (!row.IsOtroTipoDosis3Null())
                    consulta.OtroTipoDosis3 = row.OtroTipoDosis3;

                if (!row.IsOtroTipoMgxdía3Null())
                    consulta.OtroTipoMgxdía3 = row.OtroTipoMgxdía3;

                if (!row.IsOtroTipoAntiguedad3Null())
                    consulta.OtroTipoAntiguedad3 = row.OtroTipoAntiguedad3;

                if (!row.IsOtroTipo4Null())
                    consulta.OtroTipo4 = row.OtroTipo4;

                if (!row.IsOtroTipoDosis4Null())
                    consulta.OtroTipoDosis4 = row.OtroTipoDosis4;

                if (!row.IsOtroTipoMgxdía4Null())
                    consulta.OtroTipoMgxdía4 = row.OtroTipoMgxdía4;

                if (!row.IsOtroTipoAntiguedad4Null())
                    consulta.OtroTipoAntiguedad4 = row.OtroTipoAntiguedad4;

                if (!row.IsOtroTipo5Null())
                    consulta.OtroTipo5 = row.OtroTipo5;

                if (!row.IsOtroTipoDosis5Null())
                    consulta.OtroTipoDosis5 = row.OtroTipoDosis5;

                if (!row.IsOtroTipoMgxdía5Null())
                    consulta.OtroTipoMgxdía5 = row.OtroTipoMgxdía5;

                if (!row.IsOtroTipoAntiguedad5Null())
                    consulta.OtroTipoAntiguedad5 = row.OtroTipoAntiguedad5;
                ////////////////////////////////////////////////////////////////////////////


                if (!row.IsGlicazidaPNull())
                    consulta.GlicazidaP = row.GlicazidaP;

                if (!row.IsInsulinaNPHPNull())
                    consulta.InsulinaNPHDosisP = row.InsulinaNPHP;

                if (!row.IsInsulinaCORRIENTEPNull())
                    consulta.InsulinaCorrienteP = row.InsulinaCORRIENTEP;

                if (!row.IsGlimeripidePNull())
                    consulta.GlimeripideP = row.GlimeripideP;

                if (!row.IsSitagliptinaPNull())
                    consulta.SitagliptinaP = row.SitagliptinaP;

                if (!row.IsVildagliptinaPNull())
                    consulta.VildagliptinaP = row.VildagliptinaP;

                if (!row.IsSaxaGliptinaPNull())
                    consulta.SaxaGliptinaP = row.SaxaGliptinaP;

                if (!row.IsLinagliptinaPNull())
                    consulta.LinagliptinaP = row.LinagliptinaP;

                if (!row.IsInsulinaAsparticaPNull())
                    consulta.InsulinaAsparticaP = row.InsulinaAsparticaP;

                if (!row.IsInsulinaLisproPNull())
                    consulta.InsulinaLisproP = row.InsulinaLisproP;

                if (!row.IsInsulinaGlucolisinaPNull())
                    consulta.InsulinaGlucolisinaP = row.InsulinaGlucolisinaP;

                if (!row.IsInsulinaAsparticaBifàsicaPNull())
                    consulta.InsulinaAsparticaBifàsicaP = row.InsulinaAsparticaBifàsicaP;

                if (!row.IsInsulinaLispro7525PNull())
                    consulta.InsulinaLispro7525P = row.InsulinaLispro7525P;

                if (!row.IsInsulinaLispro5050PNull())
                    consulta.InsulinaLispro5050P = row.InsulinaLispro5050P;

                if (!row.IsInsulinaGlarginaPNull())
                    consulta.InsulinaGlarginaP = row.InsulinaGlarginaP;

                if (!row.IsInsulinaDetermirPNull())
                    consulta.InsulinaDetermirP = row.InsulinaDetermirP;

                if (!row.IsInsulinaDegludecPNull())
                    consulta.InsulinaDegludecP = row.InsulinaDegludecP;

                if (!row.IsTirasReactivaPNull())
                    consulta.TirasReactivaP = row.TirasReactivaP;

                if (!row.IsotraPNull())
                    consulta.OtroTipoP = row.otraP;

                if (!row.IsOtroTipo2PNull())
                    consulta.OtroTipo2P = row.OtroTipo2P;

                if (!row.IsOtroTipo3PNull())
                    consulta.OtroTipo3P = row.OtroTipo3P;

                if (!row.IsOtroTipo4PNull())
                    consulta.OtroTipo4P = row.OtroTipo4P;

                if (!row.IsOtroTipo5PNull())
                    consulta.OtroTipo5P = row.OtroTipo5P;

                if (!row.IsMetforminaPNull())
                    consulta.MetformiaP = row.MetforminaP;

                if (!row.IsGlibenclamidaPNull())
                    consulta.GlibenclamidaP = row.GlibenclamidaP;

                if (!row.IsfechaFondoOjoNull())
                    consulta.fechaFondoOjo = row.fechaFondoOjo.ToShortDateString();

            }
            ///crear el stored y el dal para buscar una consulta por su id
            ///
            return consulta;

        }

        public long Diabetes_Eliminar_Una_Consulta(int id)
        {
            DiabetesDALTableAdapters.QueriesTableAdapter adapter = new DiabetesDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_AtConsultorio_Diabetes_Eliminar_Una_Consulta(id);

            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;
        }


        public List<Consulta_Diabetes> Existe_Paciente(string nombre, long DNI, string Tdni, string NHC)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Buscar_Existe_PacienteTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Buscar_Existe_PacienteTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Buscar_Existe_PacienteDataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Buscar_Existe_PacienteDataTable();

            List<Consulta_Diabetes> P = new List<Consulta_Diabetes>();

            atable = adapter.GetData(NHC, DNI, nombre, Tdni);

            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Buscar_Existe_PacienteRow row in atable.Rows)
            {
                Consulta_Diabetes pa = new Consulta_Diabetes();


                pa.Paciente = row.apellido;
                pa.documento_real = row.documento_real;
                pa.documento = row.documento;
                pa.TipoDoc = row.tipo_doc;

                if (!row.IsSeccionalNull())
                    pa.Seccional = row.Seccional;

                if (!row.IsFechaCNull())
                    pa.Fecha_Ultima_Diabetes = row.FechaC.ToShortDateString();
                else
                    pa.Fecha_Ultima_Diabetes = "";


                if (!row.IsHBA1CUltimoNull())
                    pa.HBA1Cultimo = row.HBA1CUltimo;

                if (!row.IsGlucemiaAyunoUltimoNull())
                    pa.glucemiaAyunoUltimo = row.GlucemiaAyunoUltimo;

                if (!row.IsUreaNull())
                    pa.urea = row.Urea;

                if (!row.IsCreatininaNull())
                    pa.creatinina = row.Creatinina;

                if (!row.IsCdeCreatininaNull())
                    pa.cdeCreatinina = row.CdeCreatinina;

                if (!row.IsMicroalbuminuriaNull())
                    pa.microalbuminuria = row.Microalbuminuria;

                int a = Diabetes_Fechas_Consultas(pa.Fecha_Ultima_Diabetes);
                pa.semaforo = Diabetes_Fechas_Consultas(pa.Fecha_Ultima_Diabetes);

                if (!row.IsfechaconsultaNull())
                    pa.fecha_alta_protocolo = row.fechaconsulta.ToShortDateString();
                else
                    pa.fecha_alta_protocolo = "";

                if (!row.IsnombreNull())
                    pa.profesional = row.nombre;
                else
                    pa.profesional = "";

                P.Add(pa);
            }

            return P;
        }

        public List<ResultadosLaboDiabetes> Cargar_Estudio_Labo(string Id_Paciente, string Id_Practica, string subCod)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_Estudio_LaboTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_Estudio_LaboTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Estudio_LaboDataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Estudio_LaboDataTable();

            List<ResultadosLaboDiabetes> L = new List<ResultadosLaboDiabetes>();

            atable = adapter.GetData(Id_Paciente, Id_Practica, subCod);
            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Estudio_LaboRow row in atable.Rows)
            {
                ResultadosLaboDiabetes R = new ResultadosLaboDiabetes();
                if (!row.IsResultadoNull())
                    R.resultado = row.Resultado;
                R.UnidadMedida = row.UnidadMedida;

                if (!row.IsFechaNull())
                    R.fecha = row.Fecha.ToShortDateString();

                L.Add(R);
            }
            return L;
        }

        public pacientes Comprobar_Semaforo(long documento)
        {
            pacientes a = new pacientes();
            return a;

        }

        public int Diabetes_Fechas_Consultas(string fecha)
        {
            // AtConsultoioDALTableAdapters.QueriesTableAdapter adapter = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Fechas_Consultas2TableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Fechas_Consultas2TableAdapter();
            int obj = 0;
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Fechas_Consultas2DataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Fechas_Consultas2DataTable();
            //obj = 
            atable = adapter.GetData(fecha);

            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Fechas_Consultas2Row row in atable)
            {

                obj = row.COLOR;
            }
            //obj = adapter.H2_AtConsultorio_Diabetes_Fechas_Consultas(fecha);
            //if (obj != null) return Convert.ToInt32(obj.ToString());
            //else return -1;
            return obj;
        }


        public List<Consulta_Diabetes> Listar_Pacientes_Semaforo()
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Listar_Pacientes_Semaforo1TableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Listar_Pacientes_Semaforo1TableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Listar_Pacientes_Semaforo1DataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Listar_Pacientes_Semaforo1DataTable();

            List<Consulta_Diabetes> P = new List<Consulta_Diabetes>();

            atable = adapter.GetData();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Listar_Pacientes_Semaforo1Row row in atable.Rows)
            {
                Consulta_Diabetes pa = new Consulta_Diabetes();


                pa.Paciente = row.apellido;
                pa.documento_real = row.documento_real;
                pa.documento = row.documento;

                switch (row.tipo_doc)
                {
                    case "DU":
                        pa.TipoDoc = "DNI";
                        break;

                    case "PA":
                        pa.TipoDoc = "PASS";
                        break;

                    default:
                        pa.TipoDoc = row.tipo_doc;
                        break;
                }



                if (!row.IsSeccionalNull())
                    pa.Seccional = row.Seccional;

                if (!row.IsFechaCNull())
                    pa.Fecha_Ultima_Diabetes = row.FechaC.ToShortDateString();
                else
                    pa.Fecha_Ultima_Diabetes = "";


                if (!row.IsHBA1CUltimoNull())
                    pa.HBA1Cultimo = row.HBA1CUltimo;

                if (!row.IsGlucemiaAyunoUltimoNull())
                    pa.glucemiaAyunoUltimo = row.GlucemiaAyunoUltimo;

                if (!row.IsUreaNull())
                    pa.urea = row.Urea;

                if (!row.IsCreatininaNull())
                    pa.creatinina = row.Creatinina;

                if (!row.IsCdeCreatininaNull())
                    pa.cdeCreatinina = row.CdeCreatinina;

                if (!row.IsMicroalbuminuriaNull())
                    pa.microalbuminuria = row.Microalbuminuria;

                if (!row.IsfechaconsultaNull())
                    pa.fecha_alta_protocolo = row.fechaconsulta.ToShortDateString();
                else
                    pa.fecha_alta_protocolo = "";

                if (!row.IsnombreNull())
                    pa.profesional = row.nombre;
                else
                    pa.profesional = "";

                pa.semaforo = Diabetes_Fechas_Consultas(pa.Fecha_Ultima_Diabetes);

                P.Add(pa);
            }

            return P;
        }
        //RECETAS==========================================================================================================
        //public List<RecetasDiabeticas> Cargar_Recetas_Paciente(long idPaciente)
        //{ 
        //      AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Cargar_RecetasTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Cargar_RecetasTableAdapter();
        //    AtConsultoioDAL.H2_AtConsultorio_Diabetes_Cargar_RecetasDataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Cargar_RecetasDataTable();

        //    List<RecetasDiabeticas> L = new List<RecetasDiabeticas>();

        //    atable = adapter.GetData(idPaciente);

        //    foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Cargar_RecetasRow row in atable.Rows)
        //    {

        //        RecetasDiabeticas R = new RecetasDiabeticas();

        //        R.idReceta = row.idReceta;
        //        R.idConsulta = row.idConsulta;
        //        R.farmaco = row.farmaco;
        //        R.dosis = row.dosis;
        //        R.cantidad = row.cantidad;
        //        R.observaciones = row.observaciones;
        //        R.medicoId = row.medicoId;
        //        R.vigencia = row.vigencia;
        //        R.fechaReceta = row.fechaReceta;
        //        R.fechaModificacion = row.fechaModificacion;
        //        L.Add(R);
        //    }
        //    return L;
        //}

        public List<RecetasDiabeticas> Traer_Recetas_Diabeticas(long idPaciente)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_RecetasTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_RecetasTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_RecetasDataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_RecetasDataTable();

            List<RecetasDiabeticas> L = new List<RecetasDiabeticas>();

            atable = adapter.GetData(idPaciente);

            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_RecetasRow row in atable.Rows)
            {

                RecetasDiabeticas R = new RecetasDiabeticas();
                R.farmaco = new Farmaco();
                R.paciente = new personas();

                R.idReceta = row.idReceta;

                R.paciente.apellido = row.apellido; ;



                if (!row.IsfechaRecetaNull())
                    R.fechaReceta = row.fechaReceta.ToShortDateString();

                if (!row.IsfechaModificacionNull())
                    R.fechaModificacion = row.fechaModificacion.ToShortDateString();
                L.Add(R);
            }
            return L;
        }



        public List<Farmaco> cargar_Combos()
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Cargar_ComboTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Cargar_ComboTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Cargar_ComboDataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Cargar_ComboDataTable();
            List<Farmaco> L = new List<Farmaco>();
            atable = adapter.GetData();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Cargar_ComboRow row in atable.Rows)
            {
                Farmaco F = new Farmaco();

                F.id = row.id;
                F.nombre = row.farmaco;

                L.Add(F);
            }


            return L;
        }




        public long Atencion_Diabetes_Guardar_Farmacos_Receta_Encavezado(long idReceta, long idPaciente, long idUsuario, string medico, int vigencia, string observaciones)
        {
            object obj = new object();

            DiabetesDALTableAdapters.QueriesTableAdapter adapter = new DiabetesDALTableAdapters.QueriesTableAdapter();

            //adapter.H2_AtConsultorio_Diabetes_Guardar_Encabezado_Recetas_VPN(idReceta,idPaciente,idUsuario);

            obj = adapter.H2_AtConsultorio_Diabetes_Recetas_Guardar_Encvezado(idReceta, idPaciente, idUsuario, medico, vigencia, observaciones);

            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;
        }


        public long Atencion_Diabetes_Guardar_Farmacos_Receta_Detalle(long idReceta, List<Farmaco> farmacos)
        {
            object obj = null;
            DiabetesDALTableAdapters.QueriesTableAdapter adapter1 = new DiabetesDALTableAdapters.QueriesTableAdapter();
            adapter1.H2_AtConsultorio_Diabetes_Recetas_Borrar_Detalle(idReceta);
            foreach (Farmaco item in farmacos)
            {
                DiabetesDALTableAdapters.QueriesTableAdapter adapter = new DiabetesDALTableAdapters.QueriesTableAdapter();
                obj = adapter.H2_AtConsultorio_Diabetes_Recetas_Guardar_Detalle(idReceta, item.nombre, item.presentacion, item.dosis, item.mg);
            }
            if (obj != null) return Convert.ToInt32(obj.ToString());
            else return -1;
        }

        public List<RecetasDiabeticas> Cargar_Recetas_Diabeticas(long idPaciente)
        {
            AtConsultoioDALTableAdapters.H2_Atconsultorio_Diabetes_Recetas_Cargar_EncavezadoTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_Atconsultorio_Diabetes_Recetas_Cargar_EncavezadoTableAdapter();
            AtConsultoioDAL.H2_Atconsultorio_Diabetes_Recetas_Cargar_EncavezadoDataTable atable = new AtConsultoioDAL.H2_Atconsultorio_Diabetes_Recetas_Cargar_EncavezadoDataTable();

            List<RecetasDiabeticas> L = new List<RecetasDiabeticas>();

            atable = adapter.GetData(idPaciente);

            foreach (AtConsultoioDAL.H2_Atconsultorio_Diabetes_Recetas_Cargar_EncavezadoRow row in atable.Rows)
            {


                RecetasDiabeticas R = new RecetasDiabeticas();
                //R.farmaco = new Farmaco();
                R.paciente = new personas();
                //if(!row.is())
                R.idReceta = row.idReceta;

                if (!row.IsfechaRecetaNull())
                {
                    R.fechaReceta = row.fechaReceta.ToShortDateString();
                }
                else { R.fechaReceta = ""; }


                if (!row.IsfechaModificacionNull())
                {
                    R.fechaModificacion = row.fechaModificacion.ToShortDateString();
                }
                else { R.fechaModificacion = ""; }

                //if (!row.IsapellidoNull())
                R.paciente.apellido = row.apellido;

                L.Add(R);
            }
            return L;
        }


        public RecetasDiabeticas cargar_Una_Receta(long idReceta)
        {


            AtConsultoioDALTableAdapters.H2_AtConsultorio_Dibetes_Cargar_Una_RecetaTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Dibetes_Cargar_Una_RecetaTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Dibetes_Cargar_Una_RecetaDataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Dibetes_Cargar_Una_RecetaDataTable();

            atable = adapter.GetData(idReceta);
            RecetasDiabeticas R = new RecetasDiabeticas();
            R.listaFarmacos = new List<Farmaco>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Dibetes_Cargar_Una_RecetaRow row in atable.Rows)
            {
                //Farmaco F = new Farmaco();

                R.idReceta = row.idReceta1;
                //if(!row.IsmedicoIdNull())

                if (!row.IsidUsuarioNull())
                    R.medicoId = row.idUsuario;

                if (!row.IsmedicoNull())
                    R.medico = row.medico;

                if (!row.IsobservacionesNull())
                    R.observaciones = row.observaciones;

                if (!row.IsfechaRecetaNull())
                    R.fechaReceta = row.fechaReceta.ToShortDateString();

                if (!row.IsfechaModificacionNull())
                { R.fechaModificacion = row.fechaModificacion.ToShortDateString(); }
                else { R.fechaModificacion = ""; }

                if (!row.IsvigenciaNull())
                    R.vigencia = row.vigencia;

            }
            foreach (AtConsultoioDAL.H2_AtConsultorio_Dibetes_Cargar_Una_RecetaRow row in atable.Rows)
            {
                Farmaco F = new Farmaco();

                if (!row.IsfarmacoNull())
                    F.nombre = row.farmaco;

                if (!row.IspresentacionNull())
                    F.presentacion = row.dosis;

                if (!row.IsdosisNull())
                    F.dosis = row.cantidad;

                if (!row.IscantidadNull())
                    F.mg = row.presentacion;

                R.listaFarmacos.Add(F);
            }

            return R;
        }


        public List<PresentacionesDiabetes> traer_Presentaciones_Diabetes(string seCorresponde)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_Presentaciones_DiabetesTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Traer_Presentaciones_DiabetesTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Presentaciones_DiabetesDataTable atable = new AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Presentaciones_DiabetesDataTable();

            List<PresentacionesDiabetes> L = new List<PresentacionesDiabetes>();

            atable = adapter.GetData(seCorresponde);
            foreach (AtConsultoioDAL.H2_AtConsultorio_Diabetes_Traer_Presentaciones_DiabetesRow row in atable.Rows)
            {
                PresentacionesDiabetes p = new PresentacionesDiabetes();

                p.id = row.id;
                p.presentacion = row.presetacion;
                p.seCorresponde = row.seCorresponde;
                L.Add(p);
            }
            return L;
        }

        /*Manuel==============================================================================================================================================*/


        //DIABETOLOGIA ULTIMA FECHA DE ATENCION
        public int Diabetologia_DiasDesdeUltimaAtencion(long NHC)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Fecha_Ultima_AtencionTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Diabetes_Fecha_Ultima_AtencionTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Diabetes_Fecha_Ultima_AtencionDataTable atable = adapter.GetData(NHC);                     

            if (atable.Count > 0) {
                AtConsultoioDAL.H2_AtConsultorio_Diabetes_Fecha_Ultima_AtencionRow row = atable[0];
                return Convert.ToInt32(row.DIAS);
            }
            else{
                return 0;
            }   
        }
        //DIABETOLOGIA ULTIMA FECHA DE ATENCION


        //CIRUGIA TURNO
        public bool Guardar_Atencion_Cirugia_Guardar(AtConsultorioCirugia_Cirujano Objeto)
        {
            try
            {
                AtConsultoioDALTableAdapters.QueriesTableAdapter query = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
                query.H2_AtConsultorio_Cirugia_Programada_Cirujano_Guardar(Objeto.PacienteId, Objeto.TurnoId, Objeto.InternacionId, Objeto.UsuarioId, Objeto.ICD10_Det_Id, Objeto.Procedimiento, Objeto.CirujanoId, Objeto.Telefono, Objeto.Internacion, Objeto.Hemoterapia, Objeto.AP, Objeto.Monitoreo, Objeto.MatCirugia, Objeto.txt_MatCirugia, Objeto.TorreLap, Objeto.Ortopedia,
                    Objeto.txt_Ortopedia, Objeto.Estudios_Pre, Objeto.FechaOptativa, Objeto.Radiologia, Objeto.Antitetanica, Objeto.Externo, Objeto.txt_observaciones, Objeto.CirujanoExternoId,Objeto.PrestadorExternoName,Objeto.Microscopio, Objeto.Anestesia, Objeto.Hemoterapia_Valor);                
                return true;
            }
            catch{
            return false;
            }
        }

        public bool AtConsultorio_Cirugia_Programada_Guardar_Vaucher(Cirugia_Vaucher Objeto)
        {
            try
            {
                AtConsultoioDALTableAdapters.QueriesTableAdapter query = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
                query.H2_AtConsultorio_Cirugia_Programada_Guardar_Vaucher(Objeto.CirugiaProgramadaID, Objeto.servicio, Objeto.fechaInternacion, Objeto.horaIntenracion, Objeto.indicaciones);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public Cirugia_Vaucher AtConsultorio_Cirugia_Programada_Imprimir_Vaucher(long CirugiaProgramadaID)
        {

            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_Imprimir_VaucherTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_Imprimir_VaucherTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_Imprimir_VaucherDataTable atable = adapter.GetData(CirugiaProgramadaID);

            Cirugia_Vaucher Cirugia = new Cirugia_Vaucher();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_Imprimir_VaucherRow row in atable.Rows)
            {
                Cirugia.servicioId = row.servicioId;
                Cirugia.fechaInternacion = row.fechaInternacion;
                Cirugia.horaIntenracion = row.horaInternacion;                
                Cirugia.indicaciones = row.indicaciones;
            }
            return Cirugia;

        }

        public bool AtConsultorio_Cirugia_Programada_Reestablecer_Turno(long AfiliadoId, string observacion)
        {
            try
            {
                AtConsultoioDALTableAdapters.QueriesTableAdapter query = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
                query.H2_AtConsultorio_Cirugia_Programada_Reestablecer_Turno(AfiliadoId,observacion);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public AtConsultorioCirugia_Cirujano AtConsultorioCirugiaCargar(long PacienteId) {

            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_Cirujano_CargarTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_Cirujano_CargarTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_Cirujano_CargarDataTable atable = adapter.GetData(PacienteId);

            AtConsultorioCirugia_Cirujano Cirugia = new AtConsultorioCirugia_Cirujano();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_Cirujano_CargarRow row in atable.Rows)
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

        //CIRUGIA TURNO

        public bool Guardar_Atencion_Cirugia_MedicoExterno_Guardar(AtConsultorioCirugia_CirujanoExterno Medico)
        {
            try
            {
                AtConsultoioDALTableAdapters.QueriesTableAdapter query = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
                query.H2_AtConsultorio_Cirugia_Programada_Cirujano_Externo_Guardar(Medico.MedicoId, Medico.MedicoNombre, Medico.MN, Medico.MP);
                return true;
            }
            catch
            {
                return false;
            }
        }



        public List<AtConsultorioCirugia_CirujanoExterno> Guardar_Atencion_Cirugia_MedicoExterno_Listar(int MedicoId)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_Cirujano_Externo_ListarTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_Cirujano_Externo_ListarTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_Cirujano_Externo_ListarDataTable atable = adapter.GetData(MedicoId);

            List<AtConsultorioCirugia_CirujanoExterno> L = new List<AtConsultorioCirugia_CirujanoExterno>();

            foreach (AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_Cirujano_Externo_ListarRow row in atable.Rows)
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


        public List<Cirugia_Tipo> Quirofano_Cirugia_Tipo_Lista(int? id)
        {
            QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Tipo_ListaTableAdapter adapter = new QuirofanoDALTableAdapters.H2_Quirofano_Cirugia_Tipo_ListaTableAdapter();
            QuirofanoDAL.H2_Quirofano_Cirugia_Tipo_ListaDataTable aTable = adapter.GetData(id);

            List<Cirugia_Tipo> L = new List<Cirugia_Tipo>();

            foreach (QuirofanoDAL.H2_Quirofano_Cirugia_Tipo_ListaRow row in aTable.Rows)
            {
                Cirugia_Tipo c = new Cirugia_Tipo();

                c.id = row.id;
                c.tipo = row.tipo;
                L.Add(c);
            }
            return L;
        }


        public List<AtConsultorioCirugia_Etapa> AtConsultorio_Cirugia_Programada_UltimaEtapa_x_Paciente_Listar(long PacienteId, string FDesde, string FHasta, string Paciente, string NHC, long Documento, bool Anulado, int Finalizado, int Etapa)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_UltimaEtapa_x_PacienteTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_UltimaEtapa_x_PacienteTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_UltimaEtapa_x_PacienteDataTable atable = adapter.GetData(PacienteId, Convert.ToDateTime(FDesde), Convert.ToDateTime(FHasta), Anulado, Paciente, NHC, Documento, Finalizado, Etapa);
            List<AtConsultorioCirugia_Etapa> L = new List<AtConsultorioCirugia_Etapa>();
            foreach (AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_UltimaEtapa_x_PacienteRow row in atable.Rows)
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
                et.Fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm") ;
                et.FechaInicio = row.FechaInicio.ToString("dd/MM/yyyy HH:mm");
                et.HC_UOM_CENTRAL = row.HC_UOM_CENTRAL;
                et.Observacion = row.Observacion;
                et.Orden = row.Orden;
                et.Seccional = row.Seccional;
                et.Telefono = row.Telefono;
                et.Usuario = row.Usuario;   
                if(!row.IsFechaAviso1Null()) et.FechaAviso1 = row.FechaAviso1.ToShortDateString(); else et.FechaAviso1 = "";
                if (!row.IsFechaaviso2Null()) et.Fechaaviso2 = row.Fechaaviso2.ToShortDateString(); else et.Fechaaviso2 = "";
                if (!row.IsFecha_LimiteNull()) et.Fecha_Limite = row.Fecha_Limite.ToShortDateString(); else et.Fecha_Limite = "";
                if (!row.IsResultadoEtapaNull()) et.ResultadoEtapa = row.ResultadoEtapa; else et.ResultadoEtapa = -1;
                L.Add(et);
            }
            return L;
        }

        public bool AtConsultorio_Cirugia_Programada_GuardarProximaEtapa(long CirugiaProgramadaID, int UsuarioId, int Resultado, string Comentario)
        {
            try
            {
                AtConsultoioDALTableAdapters.QueriesTableAdapter query = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
                query.H2_AtConsultorio_Cirugia_Programada_GuardarProximaEtapa(CirugiaProgramadaID, UsuarioId, Resultado, Comentario);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool AtConsultorio_Cirugia_Programada_Guardar_Fecha_Aviso(long CirugiaProgramadaID, string fecha, int tipo)
        {
            try
            {
                AtConsultoioDALTableAdapters.QueriesTableAdapter query = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
                query.H2_AtConsultorio_Cirugia_Programada_Guardar_Fecha_Aviso(CirugiaProgramadaID, fecha, tipo);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public AtConsultorioCirugia_EtapaInfo AtConsultorio_Cirugia_Programada_ProximaEtapa(long CirugiaProgramadaID)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_EtapaSiguienteTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_EtapaSiguienteTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_EtapaSiguienteDataTable atable = adapter.GetData(CirugiaProgramadaID);

            if (atable.Count > 0)
            {
                AtConsultorioCirugia_EtapaInfo Etapa = new AtConsultorioCirugia_EtapaInfo();
                AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_EtapaSiguienteRow row = atable[0];
                if (!row.IsActivoNull()) Etapa.Activo = row.Activo; else Etapa.Activo = 1;
                Etapa.CirugiaProgramadaID = CirugiaProgramadaID;
                if (!row.IsDescripcionNull()) Etapa.Descripcion = row.Descripcion; else Etapa.Descripcion = "";
                if(!row.IsEtapadIdNull()) Etapa.EtapadId = row.EtapadId;
                if (!row.IsOrdenNull()) Etapa.Orden = row.Orden; else Etapa.Orden = 1;
                Etapa.Observacion = "";

                if (Etapa.EtapadId != -1)
                {
                    return Etapa;
                }
                else {
                    return AtConsultorio_Cirugia_Programada_EtapaActual(CirugiaProgramadaID);
                }
            }
            
            return null;                       
        }


        

        public AtConsultorioCirugia_EtapaInfo AtConsultorio_Cirugia_Programada_EtapaActual(long CirugiaProgramadaID)
        {
            AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_EtapaActualTableAdapter adapter = new AtConsultoioDALTableAdapters.H2_AtConsultorio_Cirugia_Programada_EtapaActualTableAdapter();
            AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_EtapaActualDataTable atable = adapter.GetData(CirugiaProgramadaID);

            if (atable.Count > 0)
            {
                AtConsultorioCirugia_EtapaInfo Etapa = new AtConsultorioCirugia_EtapaInfo();
                AtConsultoioDAL.H2_AtConsultorio_Cirugia_Programada_EtapaActualRow row = atable[0];
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

        public bool AtConsultorio_Cirugia_Programada_Anular(long CirugiaProgramadaID, int UsuarioId)
        {
            try
            {
                AtConsultoioDALTableAdapters.QueriesTableAdapter query = new AtConsultoioDALTableAdapters.QueriesTableAdapter();
                query.H2_AtConsultorio_Cirugia_Programada_Anular(CirugiaProgramadaID, UsuarioId);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }

}