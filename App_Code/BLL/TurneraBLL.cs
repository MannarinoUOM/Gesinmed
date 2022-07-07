using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for TurneraBLL
/// </summary>
namespace Hospital
{
    public class TurneraBLL
    {
        public turneraAC LeerTurnosAC(int Usuario)
        {
            TurneraDALTableAdapters.H2_TurneraAC_LeerTableAdapter adapter = new TurneraDALTableAdapters.H2_TurneraAC_LeerTableAdapter();
            TurneraDAL.H2_TurneraAC_LeerDataTable aTable = adapter.GetData(Usuario);
            turneraAC t = new turneraAC();
            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IsConsultorioNull()) t.consultorio = "Cons. " + aTable[0].Consultorio;
                if (!aTable[0].IsMedicoNull()) t.medico = aTable[0].Medico;
                if (!aTable[0].IsPacienteNull()) t.paciente = aTable[0].Paciente;
            }
            return t;
        }

        public turneraAC ProximoTurnoLaboratorio()
        {
            TurneraDALTableAdapters.H2_Laboratorio_ProximoTurnoLaboratorioTableAdapter adapter = new TurneraDALTableAdapters.H2_Laboratorio_ProximoTurnoLaboratorioTableAdapter();
            TurneraDAL.H2_Laboratorio_ProximoTurnoLaboratorioDataTable aTable = adapter.GetData();
            turneraAC t = new turneraAC();
            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].Isnro_cconsNull()) t.consultorio = "Box. " + aTable[0].nro_ccons;                
                if (!aTable[0].IsMedicoNull()) t.medico = aTable[0].Medico;
                if (!aTable[0].IspacienteNull()) t.paciente = aTable[0].paciente;
                t.cod_llamado = aTable[0].cod_llamada.ToString();
                CambiarEstadoTurneraLaboratorio(t.cod_llamado);
            }
            return t;
        }

        public List<turnera_administracion> TurneraLista()
        {
            List<turnera_administracion> list = new List<turnera_administracion>();
            TurneraDALTableAdapters.H2_AdministracionTurnera_ListaTurneraTableAdapter adapter = new TurneraDALTableAdapters.H2_AdministracionTurnera_ListaTurneraTableAdapter();
            TurneraDAL.H2_AdministracionTurnera_ListaTurneraDataTable aTable = adapter.GetData();
            foreach (TurneraDAL.H2_AdministracionTurnera_ListaTurneraRow row in aTable.Rows)
            {
                turnera_administracion t = new turnera_administracion();
                t.id = row.id;
                if (!row.IsNombreNull())t.turnera = row.Nombre;
                if (!row.IsconsultoriosNull()) t.consultorios = row.consultorios;
                list.Add(t);
            }
            return list;
        }

        public string PermisosTurneras(long Turnera)
        {

            TurneraDALTableAdapters.H2_Administrcion_TurneraPermisosTableAdapter adapter = new TurneraDALTableAdapters.H2_Administrcion_TurneraPermisosTableAdapter();
            TurneraDAL.H2_Administrcion_TurneraPermisosDataTable aTable = adapter.GetData(Turnera);
            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IsconsultoriosNull())
                {
                    return aTable[0].consultorios;
                }
                else
                {
                    return string.Empty;
                }
            }
            return null;
        }


        public List<consultorio> ListaConsultorioEnTurnera(long Turnera)
        {
            ConsultoriosDALTableAdapters.H2_Consultorios_ListaTableAdapter adapter = new ConsultoriosDALTableAdapters.H2_Consultorios_ListaTableAdapter();
            ConsultoriosDAL.H2_Consultorios_ListaDataTable aTable = adapter.GetData(null,null);
            List<consultorio> Lista = new List<consultorio>();
                string[] Permisos = PermisosTurneras(Turnera).Split(',');
                bool marcado = false;
                foreach (ConsultoriosDAL.H2_Consultorios_ListaRow row in aTable.Rows)
                {
                    marcado = false;
                    consultorio c = new consultorio();
                    //if (row.Descripcion != null)
                    //{
                    c.Consultorio = row.Descripcion;
                        c.ConsultorioID = row.Id;
                        if (row.Id == 0) { c.Consultorio = "GUARDIA"; }
                        foreach (string p in Permisos)
                        {
                            if (p == c.ConsultorioID.ToString()) { marcado = true; }
                        }
                        if (marcado) { c.Estado = "checked"; } else { c.Estado = ""; }
                    //}
                    Lista.Add(c);
                }
                return Lista;

            }


        public void Guardar_Turnera_Permisos(int Turnera, string Consultorios)
        {
            TurneraDALTableAdapters.QueriesTableAdapter adapter = new TurneraDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_Turnera_Guardar_Permisos(Turnera, Consultorios);   
        }


        public void SaveG(string HNC, int? Medico, int? Box)
        {
            TurneraDALTableAdapters.QueriesTableAdapter adapter = new TurneraDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Turnera_LlamadorG_Guardar(Medico, Convert.ToInt64(HNC), Box);
        }


        public void Turnera_Nueva(string Nombre)
        {
            TurneraDALTableAdapters.QueriesTableAdapter adapter = new TurneraDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_TurneraNueva(Nombre);
        }

        public void CambiarEstadoTurneraLaboratorio(string NroLlamado)
        {
            TurneraDALTableAdapters.QueriesTableAdapter adapter = new TurneraDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Laboratorio_CambiarEstado(Convert.ToInt64(NroLlamado));
        }

        public turnera_bonos ProximoTurnoBono(int TurneraId)
        {
            TurneraDALTableAdapters.H2_Turnera_Turnos_LeerTableAdapter adapter = new TurneraDALTableAdapters.H2_Turnera_Turnos_LeerTableAdapter();
            TurneraDAL.H2_Turnera_Turnos_LeerDataTable aTable = adapter.GetData(TurneraId);
            turnera_bonos t = new turnera_bonos();
            if (aTable.Rows.Count > 0)
            {
                t.box = "Box. " + aTable[0].box.ToString();
                t.paciente = aTable[0].Nro + " - " + aTable[0].Apellido;
            }
            return t;
        }

        public turnera_bonos Llamar_Turno_Bono(string Box, int Usuario, string ip)
        {
            try
            {
                TurneraDALTableAdapters.H2_Turnera_Turno_Llamar_BonosTableAdapter adapter = new TurneraDALTableAdapters.H2_Turnera_Turno_Llamar_BonosTableAdapter();
                TurneraDAL.H2_Turnera_Turno_Llamar_BonosDataTable aTable = adapter.GetData(Box, Usuario, ip);
                turnera_bonos t = new turnera_bonos();
                if (aTable.Rows.Count > 0)
                {
                    t.id = aTable[0].id;
                    t.paciente = aTable[0].Nro + " - " + aTable[0].Apellido;
                }
                return t;
            }
            catch(Exception ex){
                throw new Exception(ex.Message);
            }

        }

        //PARA QUE SOLO LLAME A LOS BONOS GENERADOS EN LAS IPS DE ADMISION
        public turnera_bonos Llamar_Turno_Bono_Internacion(string Box, int Usuario, string ip)
        {
            try
            {
                TurneraDALTableAdapters.H2_Turnera_Turno_Llamar_Bonos_InternacionTableAdapter adapter = new TurneraDALTableAdapters.H2_Turnera_Turno_Llamar_Bonos_InternacionTableAdapter();
                TurneraDAL.H2_Turnera_Turno_Llamar_Bonos_InternacionDataTable aTable = adapter.GetData(Box, Usuario, ip);
                turnera_bonos t = new turnera_bonos();
                if (aTable.Rows.Count > 0)
                {
                    t.id = aTable[0].id;
                    t.paciente = aTable[0].Nro + " - " + aTable[0].Apellido;
                }
                return t;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        //PARA QUE SOLO LLAME A LOS BONOS GENERADOS EN LAS IPS DE ADMISION

        internal turnera_bonos Turnera_Turno_Forzar_Llamar_Bonos(int UsuarioId, string Box)
        {
            try
            {
                TurneraDALTableAdapters.H2_Turnera_Turno_Forzar_Llamar_BonosTableAdapter adapter = new TurneraDALTableAdapters.H2_Turnera_Turno_Forzar_Llamar_BonosTableAdapter();
                TurneraDAL.H2_Turnera_Turno_Forzar_Llamar_BonosDataTable aTable = adapter.GetData(Box, UsuarioId);
                turnera_bonos t = new turnera_bonos();
                if (aTable.Rows.Count > 0)
                {
                    t.id = aTable[0].id;
                    t.paciente = aTable[0].Nro + " - " + aTable[0].Apellido;
                }
                return t;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public int verificarTeleConsultaDisponible(int espId)
        {
            TurneraDALTableAdapters.QueriesTableAdapter adapter = new TurneraDALTableAdapters.QueriesTableAdapter();
           object obj = adapter.H2_Verificar_TeleConsulta_Disponible(espId);
           return Convert.ToInt32(obj);
        }


        public turnera_bonos ProximoTurnoBonosDos(int TurneraId)
        {
            TurneraDALTableAdapters.H2_Turnera_Turnos_Leer_UnificadaTableAdapter adapter = new TurneraDALTableAdapters.H2_Turnera_Turnos_Leer_UnificadaTableAdapter();
            TurneraDAL.H2_Turnera_Turnos_Leer_UnificadaDataTable aTable = adapter.GetData(TurneraId);
            turnera_bonos t = new turnera_bonos();
            if (aTable.Rows.Count > 0)
            {
                t.box = "Box. " + aTable[0].box.ToString();
                t.paciente = aTable[0].Nro + " - " + aTable[0].Apellido;
            }
            return t;
        }

    }
}