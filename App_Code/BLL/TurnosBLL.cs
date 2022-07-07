using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HospitalBLL.Entities;
using System.Globalization;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for TurnosBLL
/// </summary>
/// 
namespace Hospital
{
    public class TurnosBLL
    {
        public TurnosBLL()
        {
        }


        public List<pacientes> Paciente_Apellido(string Apellido)
        {
            List<pacientes> lista = new List<pacientes>();
            //long _documento;
            //if (!long.TryParse(Documento, out _documento)) _documento = 0;
            
            PacientesDALTableAdapters.H2_Gente_BuscarPacientes_ApellidoTableAdapter adapter = new PacientesDALTableAdapters.H2_Gente_BuscarPacientes_ApellidoTableAdapter();
            PacientesDAL.H2_Gente_BuscarPacientes_ApellidoDataTable aTable = adapter.GetData(Apellido);

            int pos = 0;
            foreach (PacientesDAL.H2_Gente_BuscarPacientes_ApellidoRow row in aTable.Rows)
            {
                pacientes p = new pacientes();
                pos++;
                p.Nro_Busqueda = pos;
                p.Paciente = row.apellido;
                p.documento_real = row.documento_real;
                p.TipoDoc = row.Tipo_doc;
                p.documento = row.documento;

                if (!row.IstelefonoNull() && row.telefono.Length > 5) p.Telefono = row.telefono; else p.Telefono = "";
                p.NHC = row.cuil;
                p.ObraSocial = row.OS;
                lista.Add(p);
            }

            return lista;
        }

        public List<pacientes> Paciente_Apellido_Hospitales(string Apellido, string Documento)
        {
            List<pacientes> lista = new List<pacientes>();
            long _documento;
            if (!long.TryParse(Documento, out _documento)) _documento = 0;

            PacientesDALTableAdapters.H2_Gente_BuscarPacientes_Apellido_HospitalesTableAdapter adapter = new PacientesDALTableAdapters.H2_Gente_BuscarPacientes_Apellido_HospitalesTableAdapter();
            PacientesDAL.H2_Gente_BuscarPacientes_Apellido_HospitalesDataTable aTable = adapter.GetData(Apellido, _documento);

            int pos = 0;
            foreach (PacientesDAL.H2_Gente_BuscarPacientes_Apellido_HospitalesRow row in aTable.Rows)
            {
                pacientes p = new pacientes();
                pos++;
                p.Nro_Busqueda = pos;
                p.Paciente = row.apellido;
                p.documento_real = row.documento_real;
                p.TipoDoc = row.Tipo_doc;
                p.documento = row.documento;

                if (!row.IstelefonoNull() && row.telefono.Length > 5) p.Telefono = row.telefono; else p.Telefono = "";
                p.NHC = row.cuil;
                p.ObraSocial = row.OS;
                lista.Add(p);
            }

            return lista;
        }
        

        public TurnosListaenTurnosLista Turnos_Resevados(int especialidadId, int? medicoId, DateTime? desde, DateTime? hasta, Time horaDesde, Time horaHasta, bool showLibres, int? dia, bool reservados)
        {
            int? horaDesdeMilitar = null;
            if (horaDesde != null)
            {
                horaDesdeMilitar = horaDesde.Hour * 100 + horaDesde.Minutes;
            }

            int? horaHastaMilitar = null;
            if (horaHasta != null)
            {
                horaHastaMilitar = horaHasta.Hour * 100 + horaHasta.Minutes;
            }

            TurnosListaenTurnosLista lista = new TurnosListaenTurnosLista();
            TurnosDALTableAdapters.H2_Turno_SearchHastaTableAdapter adapter = new TurnosDALTableAdapters.H2_Turno_SearchHastaTableAdapter();
            TurnosDAL.H2_Turno_SearchHastaDataTable aTable = adapter.GetData(medicoId, especialidadId, desde, hasta, horaDesdeMilitar, horaHastaMilitar, reservados, showLibres, dia);

            CultureInfo ci = new CultureInfo("Es-Es");

            foreach (TurnosDAL.H2_Turno_SearchHastaRow row in aTable.Rows)
            {
                TurnosListaenTurnos t = new TurnosListaenTurnos();


                if (!row.IsMotivoCancelacionIdNull()) t.MovitoCanceladoId = row.MotivoCancelacionId;
                t.SobreTurno = row.EsSobreTurno;

                if (!row.IstelefonoNull()) { t.Telefono = row.telefono; } else { t.Telefono = ""; }

                if (!row.IsAfiliadoDescripcionNull())
                    t.NombrePaciente = row.AfiliadoDescripcion;
                else
                    t.NombrePaciente = "";

                if (!row.IsDocumentoNull())
                {
                    t.AfiliadoID = row.Documento;
                    t.Ocupado = true;
                }
                else t.AfiliadoID = 0;
                if (!row.IsNroHCNull()) t.NHC = long.Parse(row.NroHC);
                else t.NHC = 0;
                if (!row.IsEsConfirmadoNull()) { t.EsConfirmado = row.EsConfirmado; } else { t.EsConfirmado = false; }
                t.EspecialidadDescripcion = row.EspecialidadDescripcion;
                t.EspecialidadId = row.EspecialidadId;
                t.NombreMedico = row.MedicoDescripcion;
                t.MedicoId = row.MedicoId;
                t.Fecha = row.Fecha.ToShortDateString();
                t.Hora = row.Fecha.ToString("HH:mm");
                t.DiaSemana = ci.DateTimeFormat.GetDayName(row.Fecha.DayOfWeek).Substring(0, 3).ToUpper();
                if (!row.IsMotivoCancelacionIdNull())
                { t.Clase = "error"; }
                else if (t.SobreTurno)
                {
                    t.Clase = "info";
                }
                else if (!row.IsDocumentoNull())
                {
                    t.Clase = "success";
                }
                else
                {
                    t.Clase = "warning";
                }


                if (!row.IsMotivoCancelacionIdNull())
                { t.ClaseAtencion = "error"; }
                else if (row.IsDocumentoNull())
                {
                    t.ClaseAtencion = "";
                }
                else if (t.EsConfirmado)
                {
                    t.ClaseAtencion = "success";
                }
                else
                {
                    t.ClaseAtencion = "warning";
                }
                if (!row.IsOSNull())
                    t.OS = row.OS;
                else t.OS = string.Empty;

                if (!row.IsPracticaNull())
                    t.Practica = row.Practica;
                else t.Practica = string.Empty;

                lista.Add(t);
            }

            return lista;
        }

        public TurnosListaenTurnosLista Turnos_Resevados(int especialidadId, int? medicoId, DateTime? desde, DateTime? hasta, Time horaDesde, Time horaHasta, bool showLibres, int? dia, bool reservados, bool sobreturnos, bool cancelados, int monotributista,int TLC)
        {
            int? horaDesdeMilitar = null;
            if (horaDesde != null)
            {
                horaDesdeMilitar = horaDesde.Hour * 100 + horaDesde.Minutes;
            }

            int? horaHastaMilitar = null;
            if (horaHasta != null)
            {
                horaHastaMilitar = horaHasta.Hour * 100 + horaHasta.Minutes;
            }

            TurnosListaenTurnosLista lista = new TurnosListaenTurnosLista();
            TurnosDALTableAdapters.H2_Turno_SearchHasta_2TableAdapter adapter = new TurnosDALTableAdapters.H2_Turno_SearchHasta_2TableAdapter();
            TurnosDAL.H2_Turno_SearchHasta_2DataTable aTable = adapter.GetData(medicoId, especialidadId, desde, hasta, horaDesdeMilitar, horaHastaMilitar, reservados, showLibres, dia, sobreturnos, cancelados, monotributista,TLC);

            CultureInfo ci = new CultureInfo("Es-Es");

            foreach (TurnosDAL.H2_Turno_SearchHasta_2Row row in aTable.Rows)
            {
                TurnosListaenTurnos t = new TurnosListaenTurnos();

                if (!row.IsTurno_IdNull()) t.TurnoId = row.Turno_Id;

                if (!row.IsMotivoCancelacionIdNull()) t.MovitoCanceladoId = row.MotivoCancelacionId;
                t.SobreTurno = row.EsSobreTurno;

                if (!row.IstelefonoNull()) { t.Telefono = row.telefono; } else { t.Telefono = ""; }

                if (!row.IsAfiliadoDescripcionNull())
                    t.NombrePaciente = row.AfiliadoDescripcion;
                else
                    t.NombrePaciente = "";

                if (!row.IsDocumentoNull())
                {
                    t.Ocupado = true;
                }
                if (!row.IsNroHCNull()) t.NHC = row.NroHC;
                if (!row.IsEsConfirmadoNull()) { t.EsConfirmado = row.EsConfirmado; } else { t.EsConfirmado = false; }
                t.EspecialidadDescripcion = row.EspecialidadDescripcion;
                t.EspecialidadId = row.EspecialidadId;
                t.NombreMedico = row.MedicoDescripcion;
                t.MedicoId = row.MedicoId;
                t.Fecha = row.Fecha.ToShortDateString();
                t.Hora = row.Fecha.ToString("HH:mm");
                t.DiaSemana = ci.DateTimeFormat.GetDayName(row.Fecha.DayOfWeek).Substring(0, 3).ToUpper();
                if (!row.IsMotivoCancelacionIdNull())
                { t.Clase = "error"; }
                else if (t.SobreTurno)
                {
                    t.Clase = "info";
                }
                else if (!row.IsDocumentoNull())
                {
                    t.Clase = "success";
                }
                else
                {
                    t.Clase = "warning";
                }


                if (!row.IsMotivoCancelacionIdNull())
                { t.ClaseAtencion = "error"; }
                else if (row.IsDocumentoNull())
                {
                    t.ClaseAtencion = "";
                }
                else if (t.EsConfirmado)
                {
                    t.ClaseAtencion = "success";
                }
                else
                {
                    t.ClaseAtencion = "warning";
                }
                    t.OS = row.OS;

                    if (!row.IsFechaOtorgaNull())
                        t.FechaAdj = row.FechaOtorga.ToShortDateString();
                    if (!row.IsUsuarioNull()) t.Usuario = row.Usuario;
                
                lista.Add(t);
            }

            return lista;
        }




        public string Crear_Un_Turno(int MedicoID, int EspecialidadID, DateTime Horario, int Consultorio, bool SobreTurno, bool SinAgenda)
        {
            try
            {
                TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                return adapter.H2_Turno_CrearUnTurno(MedicoID, EspecialidadID, Horario, SobreTurno, SinAgenda).ToString();
            }
            catch (Exception e)
            {
                return "0";
            }
        }

        public string Crear_Un_Turno_Automaticamente(int MedicoID, int EspecialidadID)
        {
		if (Atiende_El_Dia(MedicoID, EspecialidadID, DateTime.Now))
            {
                throw new Exception("El médico no tiene fecha de atención en el día de la fecha.");
            }
			
            if (Atiende_Medico_El_Dia(MedicoID, EspecialidadID,DateTime.Now))
            {
                try
                {
                    TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                    return adapter.H2_Turno_CrearUnTurno_Automaticamente(MedicoID, EspecialidadID, DateTime.Now, false, true).ToString();
                }
                catch (Exception e)
                {
                    return "0";
                }
            }
            else
            {
                throw new Exception("El médico no tiene fecha de atención en el día de la fecha.");
            }
        }

        public bool Atiende_El_Dia_Sobreturno(int MedicoID, int EspecialidadId, DateTime Fecha)
        {
            //Sirve para dar sobreturno, con dias que el medico no tiene agenda pero si turnos generados
            try
            {
                TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                int r = Convert.ToInt32(adapter.H2_Turnos_Atiende_Sobreturno(MedicoID, Fecha, EspecialidadId));
                if (r == 1) return true; else return false;
            }
            catch
            {
                return false;
            }
        }


        public bool Atiende_El_Dia(int MedicoID, int EspecialidadId, DateTime Fecha)
        {
            //Con esto en realidad son lo dias de no atencion.
            try
            {
                TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                int r =Convert.ToInt32(adapter.H2_Turnos_Atiende_El_Dia(MedicoID, Fecha, EspecialidadId));
                if (r == 1) return true; else return false;
            }
            catch 
            {
                return false;
            }
        }

        public bool Medico_Tiene_Turnos_Generados_Dia(int MedicoID, int EspecialidadId, DateTime Fecha)
        {
            //Con esto en realidad son lo dias de no atencion.
            try
            {
                TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                int r = Convert.ToInt32(adapter.H2_Turnos_Turnos_Generados_Dia(MedicoID, Fecha, EspecialidadId));
                if (r == 1) return true; else return false;
            }
            catch
            {
                return false;
            }
        }

        public bool Atiende_Medico_El_Dia(int MedicoID, int EspecialidadId, DateTime Fecha)
        {
            //Aca vemos si el medico atiende ese dia.
            try
            {
                TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                int r = Convert.ToInt32(adapter.H2_Turno_Atiendeelmedicoeldia(MedicoID, (int)Fecha.DayOfWeek, EspecialidadId));
                if (r > 0) return true; else return false;
            }
            catch
            {
                return false;
            }
        }
                                                                                                                                                                                                                                                                                                //TELECONSULTA
        public int Guardar_Turno(List<Confirmarturnos> Practicas, int documento, int medicoid, int EspecialidadId, string Hora, string Dia, bool EsTurnoTelefonico, int AutorizanteId, bool EsPrimeraVez, bool EmiteBono, bool EmiteComprobante, string Verificado, string Comentario, int Usuario, int TLC, int Seccional,int? Monotributo)
        {
            TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
            DateTime Fecha = new DateTime();
            Fecha = Convert.ToDateTime(Dia + " " + Hora);
            object TurnoId;
            try
            {
               TurnoId = adapter.H2_AfiliadoTurno_Save(documento,
                    medicoid,
                    EspecialidadId,
                    Fecha,
                    EsTurnoTelefonico,
                    AutorizanteId,
                    EsPrimeraVez,
                    EmiteBono,
                    EmiteComprobante,
                    Verificado,
                    Comentario, Usuario,TLC);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
            adapter.H2_AfiliadoTurnoPractica_DeleteAll(documento, medicoid, EspecialidadId, Fecha);
            foreach (Confirmarturnos practica in Practicas)
            {
                if (practica.Estado != 0)
                {
                    adapter.H2_AfiliadoTurnoPractica_Save(documento, medicoid, EspecialidadId, Fecha, practica.PracticaId, Convert.ToDecimal(practica.Precio), Convert.ToDecimal(practica.PrecioReal), practica.ComentarioPractica);
                }
            }


            Hospital.BonosBLL B = new BonosBLL();
            long Doc = documento;

            usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
            Estadisticas.Est_PacienteMovBLL E = new Estadisticas.Est_PacienteMovBLL();
            E.EstPacMov(Doc, 2, (Int32)U.id, "Turno Creado // Médico: " + medicoid + " // Especialista: " + EspecialidadId + " // Fecha: " + Fecha);


            ///////////////

            if (TLC == 1 || EsTurnoTelefonico) { //GENERA EL BONO DE TELECONSULTA CON LA PRACTICA DE TELECONSULTA Y EL VALOR QUE FIGURA EN BONOS DE ESA PRACTICA

                List<Confirmarturnos> L = new List<Confirmarturnos>();
                FacturacionBLL F = new FacturacionBLL();
                FactValorPracticasEspecialidad Practica = new FactValorPracticasEspecialidad();
                string descripcion = "";

                ////// iteracion para obtener valores de practicas y generar bono automatico
                foreach (Confirmarturnos practica in Practicas)
                {
                Confirmarturnos P = new Confirmarturnos();
                if (EsTurnoTelefonico) {
                    Practica = F.ValorPracticaporConvenio(Seccional, EspecialidadId, practica.Codigo, 10);
                    P.Codigo = practica.Codigo;
                    P.PracticaId = practica.PracticaId;
                    descripcion = "GENERADO POR TURNO TELEFONICO";
                }
                else
                {
                    Practica = F.ValorPracticaporConvenio(Seccional, EspecialidadId, 450101, 10);
                    P.Codigo = 450101;
                    P.PracticaId = 450101;
                    descripcion = "GENERADO POR TELECONSULTA";
                }
                // le pone el valor del monotributo del bono si se genera un bono automatico por turno telefonico. si no tienevalor le pone el valor copmun del bono
                if (Monotributo == 1) { if (Practica.ValorACA != null) { P.Precio = Practica.ValorACA; } else { P.valorMonotributo = Practica.ValorBono; } }
                else
                {
                    P.Precio = Practica.ValorBono;
                }
                P.PrecioReal = Practica.ValorNN;
                P.Estado = 1;
                L.Add(P);

            }//////////////////fin iteracion

                string ip = ((usuarios)HttpContext.Current.Session["Usuario"]).ip;
                string retorno;
                retorno = B.GuardarBono(L, documento, EsPrimeraVez, Verificado, EmiteComprobante, AutorizanteId, medicoid, EspecialidadId, false, false, false, Usuario,ip, AutorizanteId, 0, descripcion,TLC,1,0,EsTurnoTelefonico);

                Match m = Regex.Match(retorno, "(\\d+)");
                string numBono = string.Empty;

                if (m.Success)
                {
                    numBono = m.Value;
                }
               // int NumeroBono;

               //object obj = adapter.H2_Traer_Bono_Creado_Para_Teleconsulta(Convert.ToInt32(numBono), documento);

               //NumeroBono = Convert.ToInt32(obj);

               // AtConsultorioBLL AT = new AtConsultorioBLL();
               // AT.At_Consultorio_Confirmar_Turnos(Usuario, NumeroBono, Convert.ToInt32(TurnoId));
            }


            return int.Parse(TurnoId.ToString());
        }



       
        //public void Guardar_Practicas_Turnos(List<Confirmarturnos> Practicas, int Documento, int MedicoId, int EspecialidadId, string Dia, string Hora)
        //{
        //    DateTime Fecha = new DateTime();
        //    Fecha = Convert.ToDateTime(Dia + " " + Hora);

        //    TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
        //    adapter.H2_AfiliadoTurnoPractica_DeleteAll(Documento, MedicoId, EspecialidadId, Fecha);
        //    foreach (Confirmarturnos practica in Practicas)
        //    {
        //        adapter.H2_AfiliadoTurnoPractica_Save(Documento, MedicoId, EspecialidadId, Fecha, practica.PracticaId, Convert.ToDecimal(practica.Precio), Convert.ToDecimal(practica.PrecioReal), practica.ComentarioPractica);                    
        //    }
        //}


        public List<TurnosOtorgados> Turnos_Otorgados(int documento, string Fecha)
        {
            DateTime FechaHora = Convert.ToDateTime(Fecha);
            TurnosDALTableAdapters.H2_Turno_Afiliado_Turnos_ListaTableAdapter adapter = new TurnosDALTableAdapters.H2_Turno_Afiliado_Turnos_ListaTableAdapter();
            TurnosDAL.H2_Turno_Afiliado_Turnos_ListaDataTable aTable = adapter.GetData(documento, FechaHora);

            List<TurnosOtorgados> lista = new List<TurnosOtorgados>();
            foreach (TurnosDAL.H2_Turno_Afiliado_Turnos_ListaRow row in aTable.Rows)
            {
                TurnosOtorgados to = new TurnosOtorgados();
                to.Especialidad = row.Especialidad;
                to.Fecha = row.TurnoFecha.ToShortDateString();
                to.Hora = row.TurnoFecha.ToString("HH:mm");
                to.Medico = row.Medico;
                to.MedicoId = row.TurnoMedicoId;
                to.EspecialidadId = row.TurnoEspecialidadId;

                lista.Add(to);
            }
            return lista;
        }

        public bool SobreTurnosLibres(int MedicoId, int EspecialidadId, DateTime Fecha)
        {
            TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
            int CM = Convert.ToInt32(adapter.H2_Turno_CantidaddesobreturnosMaximos(MedicoId));
            int A = Convert.ToInt32(adapter.H2_Turno_CantidaddeSobreturnos(MedicoId, EspecialidadId, Fecha));
            if ((CM - A) > 0)
            {
                return true;

            }
            else
            {
                return false;
            }


        }


        public int TurnoEstadoporId(int TurnoId)
        {
            TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Turno_Estado_Por_Id(TurnoId);
            if (R != null)
            {
                return Convert.ToInt32(R);
            }            
            else
            {
                return 0;
            }
        }



        public int TurnosTelefonicosNoUsados(int DNI)
        {
            TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Turnos_Telefonicos_Ausentes(DNI);
            if (R != null)
            {
                return Convert.ToInt32(R);
            }
            else
            {
                return 0;
            }
        }



        public string Es_Feriado_Descripcion(DateTime Fecha)
        {            
            
                TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                object r = adapter.H2_Turno_Es_Feriado_Descripcion(Fecha);
                if (r != null)
                {
                    return r.ToString();
                }
                else
                {
                    return null;
                }
            
        }



        public bool Turno_EstaLibre(int MedicoID, int EspecialidadId, DateTime Fecha)
        {
            //Aca vemos si el medico atiende ese dia.
            try
            {
                TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
                object r = adapter.H2_Turno_EstaLibre(MedicoID, EspecialidadId, Fecha);
                if (r != null)
                {
                    if (r.ToString() == "1")
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
                else
                {
                    return true;
                }
                
            }
            catch
            {
                return false;
            }
        }



        public List<autorizantes> Autorizantes(int Id)
        {
            List<autorizantes> lista = new List<autorizantes>();
            AutorizantesDALTableAdapters.H2_AutorizantesTableAdapter adapter = new AutorizantesDALTableAdapters.H2_AutorizantesTableAdapter();
            AutorizantesDAL.H2_AutorizantesDataTable aTable = adapter.GetData(Id);

            foreach (AutorizantesDAL.H2_AutorizantesRow row in aTable.Rows)
            {
                autorizantes a = new autorizantes();
                a.autorizante = row.NombreYApellido;
                a.id = row.Id;
                lista.Add(a);
            }

            return lista;
        }

        public List<autorizantes> AutorizantesBono()
        {
            List<autorizantes> lista = new List<autorizantes>();
            AutorizantesDALTableAdapters.H2_BONOS_AUTORIZANTE_LISTTableAdapter adapter = new AutorizantesDALTableAdapters.H2_BONOS_AUTORIZANTE_LISTTableAdapter();
            AutorizantesDAL.H2_BONOS_AUTORIZANTE_LISTDataTable aTable = adapter.GetData();
            foreach (AutorizantesDAL.H2_BONOS_AUTORIZANTE_LISTRow row in aTable.Rows)
            {
                autorizantes a = new autorizantes();
                a.autorizante = row.Autorizante;
                a.id = row.Id_AutorizanteBono;
                lista.Add(a);
            }
            return lista;
        }

        public List<motivo_autoriza> MotivoAutorizaBono()
        {
            List<motivo_autoriza> lista = new List<motivo_autoriza>();
            AutorizantesDALTableAdapters.H2_BONOS_AUTORIZA_MOTIVOS_LISTTableAdapter adapter = new AutorizantesDALTableAdapters.H2_BONOS_AUTORIZA_MOTIVOS_LISTTableAdapter();
            AutorizantesDAL.H2_BONOS_AUTORIZA_MOTIVOS_LISTDataTable aTable = adapter.GetData();
            foreach (AutorizantesDAL.H2_BONOS_AUTORIZA_MOTIVOS_LISTRow row in aTable.Rows)
            {
                motivo_autoriza a = new motivo_autoriza();
                a.motivo = row.Motivo;
                a.id = row.IdMotivoAutoriza;
                lista.Add(a);
            }
            return lista;
        }


        public List<TurnosTodos> VerTodoslosTurnos(string MedicosId, string EspecialidadesId, DateTime FechaInicio, DateTime FechaFin)
        {
            List<TurnosTodos> lista = new List<TurnosTodos>();
            TurnosDALTableAdapters.H2_Turnos_VerTodosTableAdapter adapter = new TurnosDALTableAdapters.H2_Turnos_VerTodosTableAdapter();
            TurnosDAL.H2_Turnos_VerTodosDataTable aTable = adapter.GetData(MedicosId, EspecialidadesId, FechaInicio, FechaFin);

            foreach (TurnosDAL.H2_Turnos_VerTodosRow row in aTable.Rows)
            {
                TurnosTodos t = new TurnosTodos();
                t.especialidad = row.Especialidad;
                t.medico = row.Medico;
                t.fecha = row.Fecha.ToString("dd/MM/yyyy HH:mm");
                if (!row.IsPacienteNull()) { t.paciente = row.Paciente; } else { t.paciente = ""; }
                if (!row.IsTelefonoNull()) { t.telefono = row.Telefono; } else { t.telefono = ""; }
                lista.Add(t);
            }

            return lista;
        }

        public TurnoInfo TURNO_BUSCAR_POR_MED_ESP_FEC(int medicoId, int especialidadId, DateTime fechaturno)
        {
            try
            {
                TurnosDALTableAdapters.H2_TURNO_BUSCAR_POR_MED_ESP_FECTableAdapter adapter = new TurnosDALTableAdapters.H2_TURNO_BUSCAR_POR_MED_ESP_FECTableAdapter();
                TurnosDAL.H2_TURNO_BUSCAR_POR_MED_ESP_FECDataTable aTable = adapter.GetData(medicoId, especialidadId, fechaturno);

                foreach (TurnosDAL.H2_TURNO_BUSCAR_POR_MED_ESP_FECRow row in aTable.Rows)
                    return new TurnoInfo(row.IdTurno, row.PacienteId, row.UsuarioId, row.ConfirmadoBono, row.EsConfirmado, row.MotCancelacion, row.Comentario);

                return new TurnoInfo();
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<TurnosTodos> VerTodoslosTurnosPaciente(string NHC, DateTime Desde, DateTime Hasta, int EspId)
        {
            List<TurnosTodos> lista = new List<TurnosTodos>();
            TurnosDALTableAdapters.H2_Turnos_VerTodos_por_PacienteTableAdapter adapter = new TurnosDALTableAdapters.H2_Turnos_VerTodos_por_PacienteTableAdapter();
            TurnosDAL.H2_Turnos_VerTodos_por_PacienteDataTable aTable = adapter.GetData(NHC, Desde, Hasta, EspId);

            foreach (TurnosDAL.H2_Turnos_VerTodos_por_PacienteRow row in aTable.Rows)
            {
                TurnosTodos t = new TurnosTodos();
                t.especialidad = row.Especialidad;
                t.medico = row.Medico;
                t.fecha = row.Fecha.ToString("dd/MM/yyyy");
                t.hora = row.Fecha.ToString("HH:mm");
                if (!row.IsObservacionesNull())
                    t.observaciones = row.Observaciones;
                if (!row.IsEstadoNull())
                    t.estado = row.Estado;
                if (!row.IsTurno_IdNull())
                    t.turnoid = row.IdTurno.ToString();
                if (!row.IsEspIdNull())
                    t.especialidadid = row.EspId.ToString();
                if (!row.IsMedIdNull())
                    t.medicoid = row.MedId.ToString();
                lista.Add(t);
            }

            return lista;
        }


        public List<TurnosTodos> VerTodoslosTurnosPaciente_Historico(string NHC, DateTime Desde, DateTime Hasta, int EspId)
        {
            List<TurnosTodos> lista = new List<TurnosTodos>();
            TurnosDALTableAdapters.H2_Turnos_VerTodos_por_Paciente_HistoricoTableAdapter adapter = new TurnosDALTableAdapters.H2_Turnos_VerTodos_por_Paciente_HistoricoTableAdapter();
            TurnosDAL.H2_Turnos_VerTodos_por_Paciente_HistoricoDataTable aTable = adapter.GetData(NHC, Desde, Hasta, EspId);

            foreach (TurnosDAL.H2_Turnos_VerTodos_por_Paciente_HistoricoRow row in aTable.Rows)
            {
                TurnosTodos t = new TurnosTodos();
                t.especialidad = row.Especialidad;
                t.medico = row.Medico;
                t.fecha = row.Fecha.ToString("dd/MM/yyyy");
                t.hora = row.Fecha.ToString("HH:mm");
                if (!row.IsObservacionesNull())
                    t.observaciones = row.Observaciones;
                if (!row.IsEstadoNull())
                    t.estado = row.Estado;
                if (!row.IsTurno_IdNull())
                    t.turnoid = row.IdTurno.ToString();
                if (!row.IsEspIdNull())
                    t.especialidadid = row.EspId.ToString();
                if (!row.IsMedIdNull())
                    t.medicoid = row.MedId.ToString();
                lista.Add(t);
            }

            return lista;
        }


        public List<TurnosTodos> VerTodoslosTurnosPaciente_IMG(string NHC, DateTime Desde, DateTime Hasta, int EspId)
        {
            List<TurnosTodos> lista = new List<TurnosTodos>();
            TurnosDALTableAdapters.H2_Turnos_VerTodos_por_Paciente_IMGTableAdapter adapter = new TurnosDALTableAdapters.H2_Turnos_VerTodos_por_Paciente_IMGTableAdapter();
            TurnosDAL.H2_Turnos_VerTodos_por_Paciente_IMGDataTable aTable = adapter.GetData(NHC, Desde, Hasta, EspId);

            foreach (TurnosDAL.H2_Turnos_VerTodos_por_Paciente_IMGRow row in aTable.Rows)
            {
                TurnosTodos t = new TurnosTodos();
                t.especialidad = row.Especialidad;
                t.medico = row.Medico;
                t.fecha = row.Fecha.ToString("dd/MM/yyyy");
                t.hora = row.Fecha.ToString("HH:mm");
                if (!row.IsObservacionesNull())
                    t.observaciones = row.Observaciones;
                if (!row.IsEstadoNull())
                    t.estado = row.Estado;
                if (!row.IsTurno_IdNull())
                    t.turnoid = row.IdTurno.ToString();
                if (!row.IsEspIdNull())
                    t.especialidadid = row.EspId.ToString();
                if (!row.IsMedIdNull())
                    t.medicoid = row.MedId.ToString();
                lista.Add(t);
            }

            return lista;
        }



        ////IMAGENES
        //private string GenerarCodigo(int length)
        //{
        //    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        //    var random = new Random();
        //    return new string(Enumerable.Repeat(chars, length)
        //      .Select(s => s[random.Next(s.Length)]).ToArray());
        //}
                                                                                                                                                                                                                                                                                                                      //TELECONSULTA                                      
        public int Guardar_Turno_IMG(List<Confirmarturnos> Practicas, int documento, int medicoid, int EspecialidadId, string Hora, string Dia, bool EsTurnoTelefonico, int AutorizanteId, bool EsPrimeraVez, bool EmiteBono, bool EmiteComprobante, string Verificado, string Comentario, int Usuario, string Codigo,int TLC)
        {
            usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];

            TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
            DateTime Fecha = new DateTime();
            Fecha = Convert.ToDateTime(Dia + " " + Hora);
            object TurnoId;
            try
            {
                TurnoId = adapter.H2_AfiliadoTurno_Save(documento,
                     medicoid,
                     EspecialidadId,
                     Fecha,
                     EsTurnoTelefonico,
                     AutorizanteId,
                     EsPrimeraVez,
                     EmiteBono,
                     EmiteComprobante,
                     Verificado,
                     Comentario, Usuario,TLC);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }

            //int.Parse(TurnoId.ToString())
            //Acá inserto el Codigo generado en la tabla para relacionarlo con el turno...
            //usuario_fecha_letras 
            //string codigo_generado = U.id.ToString().PadLeft(3, '0') + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + GenerarCodigo(4);
            TurnosDALTableAdapters.QueriesTableAdapter adapter_turnos = new TurnosDALTableAdapters.QueriesTableAdapter();
            adapter_turnos.H2_Guardar_Detalles_Turno_IMG(int.Parse(TurnoId.ToString()), null, Codigo, null, null);


            adapter.H2_AfiliadoTurnoPractica_DeleteAll(documento, medicoid, EspecialidadId, Fecha);
            foreach (Confirmarturnos practica in Practicas)
            {
                if (practica.Estado != 0)
                {
                    adapter.H2_AfiliadoTurnoPractica_Save(documento, medicoid, EspecialidadId, Fecha, practica.PracticaId, Convert.ToDecimal(practica.Precio), Convert.ToDecimal(practica.PrecioReal), practica.ComentarioPractica);
                }
            }


            Hospital.BonosBLL B = new BonosBLL();
            long Doc = documento;

            
            Estadisticas.Est_PacienteMovBLL E = new Estadisticas.Est_PacienteMovBLL();
            E.EstPacMov(Doc, 2, (Int32)U.id, "Turno Creado // Médico: " + medicoid + " // Especialista: " + EspecialidadId + " // Fecha: " + Fecha);

            return int.Parse(TurnoId.ToString());
        }




        public TurnosListaenTurnosLista Turnos_Resevados_IMG(int especialidadId, int medicoId, DateTime fecha)
        {

            TurnosListaenTurnosLista lista = new TurnosListaenTurnosLista();
            TurnosDALTableAdapters.H2_Turnos_Listar_IMGTableAdapter adapter = new TurnosDALTableAdapters.H2_Turnos_Listar_IMGTableAdapter();
            TurnosDAL.H2_Turnos_Listar_IMGDataTable aTable = adapter.GetData(especialidadId, medicoId, fecha);

            CultureInfo ci = new CultureInfo("Es-Es");

            foreach (TurnosDAL.H2_Turnos_Listar_IMGRow row in aTable.Rows)
            {
                TurnosListaenTurnos t = new TurnosListaenTurnos();

                if (!row.IsTurno_IdNull()) t.TurnoId = row.Turno_Id;

                if (!row.IsMotivoCancelacionIdNull()) t.MovitoCanceladoId = row.MotivoCancelacionId;
                t.SobreTurno = row.EsSobreTurno;

                if (!row.IstelefonoNull()) { t.Telefono = row.telefono; } else { t.Telefono = ""; }

                if (!row.IsAfiliadoDescripcionNull())
                    t.NombrePaciente = row.AfiliadoDescripcion;
                else
                    t.NombrePaciente = "";

                if (!row.IsDocumentoNull())
                {
                    t.Ocupado = true;
                }
                if (!row.IsNroHCNull()) t.NHC = row.NroHC;
                if (!row.IsEsConfirmadoNull()) { t.EsConfirmado = row.EsConfirmado; } else { t.EsConfirmado = false; }
                t.EspecialidadDescripcion = row.EspecialidadDescripcion;
                t.EspecialidadId = row.EspecialidadId;
                t.NombreMedico = row.MedicoDescripcion;
                t.MedicoId = row.MedicoId;
                t.Fecha = row.Fecha.ToShortDateString();
                t.Hora = row.Fecha.ToString("HH:mm");
                t.DiaSemana = ci.DateTimeFormat.GetDayName(row.Fecha.DayOfWeek).Substring(0, 3).ToUpper();
                if (!row.IsMotivoCancelacionIdNull())
                { t.Clase = "cancelado"; }
                else if (t.SobreTurno)
                {
                    t.Clase = "sobreturno";
                }
                else if (!row.IsDocumentoNull())
                {
                    t.Clase = "ocupado";
                }
                else
                {
                    t.Clase = "libre";
                }


                if (!row.IsMotivoCancelacionIdNull())
                { 
                    t.ClaseAtencion = "error"; 
                }
                    else if (row.IsDocumentoNull())
                    {
                        t.ClaseAtencion = "";
                    }
                        else if (t.EsConfirmado)
                        {
                            t.ClaseAtencion = "success";
                        }
                        else
                            {
                                t.ClaseAtencion = "warning";
                            }
                t.OS = row.OS;

                if (!row.IsFechaOtorgaNull())
                    t.FechaAdj = row.FechaOtorga.ToShortDateString();
                if (!row.IsUsuarioNull()) t.Usuario = row.Usuario;

                lista.Add(t);
            }

            return lista;
        }


        public string Crear_Un_Turno_Automaticamente_IMG(int MedicoID, int EspecialidadID, string Fecha, string Hora)
        {
            TurnosDALTableAdapters.QueriesTableAdapter adapter = new TurnosDALTableAdapters.QueriesTableAdapter();
            return adapter.H2_Turno_CrearUnTurno_Automaticamente_IMG(MedicoID, EspecialidadID, Convert.ToDateTime(Fecha + " " + Hora), false, true).ToString();
        }


    }
}