using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for AdministracionBLL
/// </summary>
namespace Hospital
{
    public class AdministracionBLL
    {
        public AdministracionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public int CancelarBono(DateTime Fecha, int Usuario, int NroBono, int UsuarioCancelo, string Observacion,string ip)
        {
            try
            {
                BonosDALTableAdapters.QueriesTableAdapter adapter = new BonosDALTableAdapters.QueriesTableAdapter();
                object newId = adapter.H2_Bono_CancelarBono(NroBono, Fecha, Usuario, UsuarioCancelo, Observacion,ip);
                if (newId != null) return Convert.ToInt32(newId);
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string Diabetes_Generar_Txt(string desde, string hasta)
        {


            ReportesDALTableAdapters.H2_AtConsultorio_Diabetes_Generar_TxtTableAdapter adapter = new ReportesDALTableAdapters.H2_AtConsultorio_Diabetes_Generar_TxtTableAdapter();
            ReportesDAL.H2_AtConsultorio_Diabetes_Generar_TxtDataTable table = new ReportesDAL.H2_AtConsultorio_Diabetes_Generar_TxtDataTable();
            table = adapter.GetData(desde, hasta);
            string mensaje = "SSS Generado";


            desde = desde.Replace("/", "");
            hasta = hasta.Replace("/", "");


            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            //string output = Mi_Texto.Text;
            string output = "";
            foreach (ReportesDAL.H2_AtConsultorio_Diabetes_Generar_TxtRow row in table.Rows)
            {
                try
                {

                    string ccfecha;
                    if (row.cc == "000")
                    {
                        ccfecha = row.fechaconsulta;
                    }
                    else { ccfecha = "00000000"; }

                    output =
                        //cuil 1               tipo 2          fecha de registro 3     edad de registro 4           dislipidemia 5            obesidad 6           tabaquismo 7       hiperfia ventar 8  infarto agudo 9   insufi card 10                                                         
                        "|" + row.cuil + "|" + row.tipo + "|" + row.fechaconsulta + "|" + row.edad_diagnostico + "|" + row.dislipidemia + "|" + row.obesidad + "|" + row.tabaquismo + "|" + "00000000" + "|" + "00000000" + "|" + "00000000" + "|"// 10 campos

                        //acv 11          retinopatia 12         ceguera 13         neuropati 14            vasc 15               16             nefropati 17               18                 19             glucemia 20                                                                        
                       + row.acv + "|" + row.retinopatia + "|" + "00000000" + "|" + row.neuropatia + "|" + "00000000" + "|" + "00000000" + "|" + row.nefropatia + "|" + "00000000" + "|" + "00000000" + "|" + row.glucemiaAyunoUltimo + "|"  // 10 campos

                      // glucemia fecha 21                       hba1c 22              hba1c fecha 23              24             25             26             27              28             29               30    
                     + row.glucemiaAyunoUltimoFecha + "|" + row.HBA1CUltimo + "|" + row.HBA1CUltimoFecha + "|" + "0" + "|" + "00000000" + "|" + "0" + "|" + "00000000" + "|" + "0" + "|" + "00000000" + "|" + "000" + "|" // 10 campos

                     //    31               32              33             creatinina  34         creatin fech  35          fondo ojo 36           ojo fech 37             peso 38          peso fecha 39            talla 40
                     + "00000000" + "|" + "000" + "|" + "00000000" + "|" + row.creatinina + "|" + row.fechaconsulta + "|" + row.fondoojo + "|" + row.fechafondoojo + "|" + row.peso + "|" + row.fechaconsulta + "|" + row.talla + "|" // 10 campos

                      //talla fecha  41           cc  42     cc fecha 43          44         45           46         47          48          49              hipoglucemi orales 50
                      + row.fechaconsulta + "|" + row.cc + "|" + ccfecha + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0" + "|" + row.hipoglucemiantesOrales + "|" // 10 campos

                      //  insuli basal  51         insul correccion  52
                        // + "40" + "|" + "42" + "|"
                       + row.insulinabasal + "|" + row.insulinadecorrecion + "|"
                       ;
                    sb.Append(output);
                    sb.Append("\r\n");
                }
                catch
                {
                    mensaje = "Ocurrio un Error al Generar el Archivo SSS";
                    return mensaje;
                }
            }

            string text = sb.ToString();




            return mensaje;
        }

        public int CancelarBonoSN(long NroBono)
        {
            BonosDALTableAdapters.QueriesTableAdapter adapter = new BonosDALTableAdapters.QueriesTableAdapter();
            object newId = adapter.H2_Bono_CancelarBono_SN(NroBono);
            return Convert.ToInt32(newId);
        }

        public void EliminarHC(long PacienteId)
        {
            try
            {
                AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_HC_ELIMINAR(PacienteId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool CancelarTurnos_FueUsado(DateTime Fecha, int Usuario, int NroBono)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object newId = adapter.H2_CancelarTurnos_FueUsado(NroBono, Fecha, Usuario);
            if (Convert.ToInt32(newId) == 1) 
                return true;
            else
                return false;
        }

        public bool CancelarTurnos_FueUsado_SN(long NroBono)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object newId = adapter.H2_CancelarTurnos_FueUsado_SN(NroBono);
            if (Convert.ToInt32(newId) == 1)
                return true;
            else
                return false;
        }
		
        public bono_estado BonoEstado(DateTime Fecha, int Usuario, int NroBono)
        {
            BonosDALTableAdapters.H2_Bono_EstadoBonoTableAdapter adapter = new BonosDALTableAdapters.H2_Bono_EstadoBonoTableAdapter();
            BonosDAL.H2_Bono_EstadoBonoDataTable aTable = adapter.GetData(NroBono, Fecha, Usuario);
            bono_estado b = new bono_estado();       
            if (aTable.Rows.Count > 0)
            {
                b.Bono_id = aTable[0].Id.ToString();
                if (!aTable[0].IsConfirmadoBonoNull()) { b.ConfirmadoBono = aTable[0].ConfirmadoBono.ToString(); }
                if (!aTable[0].IsdocumentoNull()) { b.documento = aTable[0].documento; }
                b.EstaCancelado = aTable[0].EstaCancelado;
                b.Especialidad = aTable[0].Especialidad;
                b.Fecha = aTable[0].Fecha.ToShortDateString();
                if (!aTable[0].IsFFinNull()) { b.FFin = aTable[0].FFin.ToShortDateString(); }
                b.Medico = aTable[0].Medico;
                if (!aTable[0].IsNroNull()) { b.Nro = aTable[0].Nro; }
                if (!aTable[0].IsPasoporVentanillaNull()) { b.PasoporVentanilla = aTable[0].PasoporVentanilla; }
                if (!aTable[0].IsPasoporVentanillaNull()) { b.ReservaTurnoAhora = aTable[0].ReservaTurnoAhora; }
            }
            return b;

        }
              




        public bono_estado BonoEstadoSN(long NroBono)
        {
            BonosDALTableAdapters.H2_Bono_EstadoBono_SNTableAdapter adapter = new BonosDALTableAdapters.H2_Bono_EstadoBono_SNTableAdapter();
            BonosDAL.H2_Bono_EstadoBono_SNDataTable aTable = adapter.GetData(NroBono);
            bono_estado b = new bono_estado();
            if (aTable.Rows.Count > 0)
            {
                b.Bono_id = aTable[0].Id.ToString();
                if (!aTable[0].IsConfirmadoBonoNull()) { b.ConfirmadoBono = aTable[0].ConfirmadoBono.ToString(); }
                if (!aTable[0].IsdocumentoNull()) { b.documento = aTable[0].documento; }
                b.EstaCancelado = aTable[0].EstaCancelado;
                b.Especialidad = aTable[0].Especialidad;
                b.Fecha = aTable[0].Fecha.ToShortDateString();
                if (!aTable[0].IsFFinNull()) { b.FFin = aTable[0].FFin.ToShortDateString(); }
                b.Medico = aTable[0].Medico;
                if (!aTable[0].IsNroNull()) { b.Nro = aTable[0].Nro; }
                if (!aTable[0].IsPasoporVentanillaNull()) { b.PasoporVentanilla = aTable[0].PasoporVentanilla; }
                if (!aTable[0].IsPasoporVentanillaNull()) { b.ReservaTurnoAhora = aTable[0].ReservaTurnoAhora; }
            }
            return b;

        }

        public List<usuarios> Usuarios_Buscar(string Nombre)
        {
            AdministracionDALTableAdapters.H2_Administracion_Usuario_BuscarTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Usuario_BuscarTableAdapter();
            AdministracionDAL.H2_Administracion_Usuario_BuscarDataTable aTable = adapter.GetData(Nombre);
            List<usuarios> Lista = new List<usuarios>();

            foreach (AdministracionDAL.H2_Administracion_Usuario_BuscarRow row in aTable.Rows)
            {
                usuarios u = new usuarios();
                u.id = row.id;
                u.nombre = row.nombre;
                u.usuario = row.usuario;
                u.tipo = row.tipo;
                Lista.Add(u);
            }
            return Lista;
        }



        public List<perfiles> Perfiles_Listar(long Id)
        {
            AdministracionDALTableAdapters.H2_Administracion_PerfilesTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_PerfilesTableAdapter();
            AdministracionDAL.H2_Administracion_PerfilesDataTable aTable = adapter.GetData(Id);
            List<perfiles> Lista = new List<perfiles>();

            foreach (AdministracionDAL.H2_Administracion_PerfilesRow row in aTable.Rows)
            {
                perfiles p = new perfiles();
                p.id = row.id;
                p.perfil = row.perfil.ToUpper();
                p.permisos = null;                
                Lista.Add(p);
            }
            return Lista;
        }

        public List<perfiles> Perfiles_Listar_Permisos(long Id)
        {
            AdministracionDALTableAdapters.H2_Administracion_PerfilesTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_PerfilesTableAdapter();
            AdministracionDAL.H2_Administracion_PerfilesDataTable aTable = adapter.GetData(Id);
            List<perfiles> Lista = new List<perfiles>();

            foreach (AdministracionDAL.H2_Administracion_PerfilesRow row in aTable.Rows)
            {
                perfiles p = new perfiles();
                p.id = row.id;
                p.perfil = row.perfil;
                p.permisos = row.seccion;
                Lista.Add(p);
            }
            return Lista;
        }

        public usuario_edicion Usuario_Id(long Id)
        {
            AdministracionDALTableAdapters.H2_Administracion_Usuario_VerTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Usuario_VerTableAdapter();
            AdministracionDAL.H2_Administracion_Usuario_VerDataTable aTable = adapter.GetData(Id);

                if (aTable.Rows.Count > 0)
                {
                    usuario_edicion u = new usuario_edicion();
                    u.activo = aTable[0].activo;
                    u.id = aTable[0].id;
                    u.interno = aTable[0].interno;
                    u.nombre = aTable[0].nombre;
                    u.nroperfil = aTable[0].nroperfil;
                    u.seccional = aTable[0].Seccional;
                    u.tipo = aTable[0].tipo;
                    u.usuario = aTable[0].usuario;
                    u.vencimiento = aTable[0].fechavencimiento.ToShortDateString();
                    return u;
                }

            return null;
        }

        public bool EsAdministrador(long Id)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Administracion_EsAdministrador(Id);
            if (R.ToString().ToUpper() == "Administrador".ToUpper())
            {
                return true;
            }
            return false;
        }

        public bool ExisteelUsuario(string Nombre)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Administracion_Usuario_Existe(Nombre);
            if (R != null)
            {
                return true;
            }
            return false;
        }

        public string Existe_NuevoUsuario(string Nombre) //Si el usuario existe genera un nuevo nombre...
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Administracion_Usuario_Nuevo_User(Nombre);
            if (R != null) return R.ToString();
            else throw new Exception("No se generó el Usuario.");
        }

        public bool FueAtendido(DateTime Fecha, int Usuario, int NroBono )
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_CancelarBono_Atendido(Fecha, Usuario, NroBono);
            if ((bool)R == true)
            {
                return true;
            }
            return false;
        }


        public bool FueAtendidoIMG(long NroBono)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_CancelarBono_Atendido_IMG(NroBono);
            if ((bool)R == true)
            {
                return true;
            }
            return false;
        }

        public bool FueAtendidoSN(long NroBono)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_CancelarBono_Atendido_SN(NroBono);
            if ((bool)R == true)
            {
                return true;
            }
            return false;
        }


        public bool FueAtendidoLABO(long NroBono)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_CancelarBono_Atendido_LABO(NroBono);
            if ((bool)R == true)
            {
                return true;
            }
            return false;
        }
                
		
        public void CambiarPerfilUsuario(long Usuario, int NroPerfil)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_ActualizarPerfilUsuario(Usuario, NroPerfil);
        }

        public long Usuarios_Guardar(long Id, string nombre, string tipo, bool activo, string interno, DateTime vencimiento, string usuario, string C1, string C2, int NroPerfil)
        {
            usuarios u = (usuarios)System.Web.HttpContext.Current.Session["Usuario"];
            if (C1 != C2) { throw new Exception("Las Contraseñas no coinciden"); }
            if (vencimiento < DateTime.Now) { throw new Exception("La fecha de vencimiento no puede ser menor a la actual"); }
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Administracion_GuardarUsuario(Id, nombre, tipo, activo, interno, vencimiento, usuario, u.id, u.seccionalnumero);
            return Convert.ToInt64(R);
        }

        public void Usuario_Cambiar_Clave(long Id, string Clave)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_CambiarClave(Clave, Id);
        }


        public List<secciones> Secciones_Cab()
        {
            AdministracionDALTableAdapters.H2_Administracion_ListaSeccionesTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_ListaSeccionesTableAdapter();
            AdministracionDAL.H2_Administracion_ListaSeccionesDataTable aTable = adapter.GetData();
            List<secciones> Lista = new List<secciones>();

            foreach (AdministracionDAL.H2_Administracion_ListaSeccionesRow row in aTable.Rows)
            {
                secciones s = new secciones();
                s.cod = row.Cod;
                s.nombre = row.Nombre;
                Lista.Add(s);
            }
            return Lista;
        }



        public List<secciones_det> Secciones_Det(long UsuarioId)
        {
            AdministracionDALTableAdapters.H2_Administracion_ListaSecciones_DetallesTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_ListaSecciones_DetallesTableAdapter();
            AdministracionDAL.H2_Administracion_ListaSecciones_DetallesDataTable aTable = adapter.GetData();
            List<secciones_det> Lista = new List<secciones_det>();

            permisos p = Usuario_Permisos(UsuarioId);

            foreach (AdministracionDAL.H2_Administracion_ListaSecciones_DetallesRow row in aTable.Rows)
            {
                secciones_det s = new secciones_det();
                s.cod = row.Cod;
                s.nombre = row.Nombre;
                if (!row.IsPrincipalNull())
                {
                    s.principal = Convert.ToInt32(row.Principal);
                }
   
                if (p.permiso.Replace(" ", "").IndexOf("|" + s.cod + "|") != -1)
                {
                    s.clase = "info";
                }
                else
                {
                    s.clase = "";
                }

                if (p.permisos_extras != null)
                {
                if (p.permisos_extras.Replace(" ", "").IndexOf("|" + s.cod + "|") != -1)
                {
                    s.estado = true;
                }
                else
                {
                    s.estado = false;
                }
                }

                Lista.Add(s);
            }
            return Lista;
        }

        public permisos Usuario_Permisos(long Usuario)
        {
            AdministracionDALTableAdapters.H2_Administracion_Usuario_PermisosTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Usuario_PermisosTableAdapter();
            AdministracionDAL.H2_Administracion_Usuario_PermisosDataTable aTable = adapter.GetData(Usuario);

            permisos p = new permisos();

            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IspermisosBNull()) p.permiso = aTable[0].permisosB;
                if(!aTable[0].IspermisosNull()) p.permisos_extras = aTable[0].permisos;
                return p;
            }
            return null;
        }

        public void Guardar_Permisos_Especiales(long Id, string Permisos)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_ActualizarPerfilUsuario_Especial(Id, Permisos);
        }

   

        public List<secciones_det> Secciones_Perfiles_Det(long Perfil)
        {
            AdministracionDALTableAdapters.H2_Administracion_ListaSecciones_DetallesTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_ListaSecciones_DetallesTableAdapter();
            AdministracionDAL.H2_Administracion_ListaSecciones_DetallesDataTable aTable = adapter.GetData();
            List<secciones_det> Lista = new List<secciones_det>();

            string p = Perfile_Cargar(Perfil);

            foreach (AdministracionDAL.H2_Administracion_ListaSecciones_DetallesRow row in aTable.Rows)
            {
                secciones_det s = new secciones_det();
                s.cod = row.Cod;
                s.nombre = row.Nombre;
                if (!row.IsPrincipalNull())
                {
                    s.principal = Convert.ToInt32(row.Principal);
                }

                if (p.Replace(" ", "").IndexOf("|" + s.cod + "|") != -1)
                {
                    s.estado = true;
                }
                else
                {
                    s.estado = false;
                }

                Lista.Add(s);
            }
            return Lista;
        }

        public string Perfile_Cargar(long Perfil)
        {
            AdministracionDALTableAdapters.H2_Administracion_Secciones_Perfiles_DetTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Secciones_Perfiles_DetTableAdapter();
            AdministracionDAL.H2_Administracion_Secciones_Perfiles_DetDataTable aTable = adapter.GetData(Perfil);
            if (aTable.Rows.Count > 0)
            {
                return aTable[0].seccion;
            }
            return null;
        }

        public long Guardar_Perfil(long NroPerfil, string Perfil, string Secciones)
        {
			Secciones = "|0|" + Secciones;
            if (NroPerfil == 0 && Perfil.Trim().Replace(" ", "") != "")
            {
                AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
                object R = adapter.H2_Administracion_Guardar_Perfiles(NroPerfil, Perfil, Secciones);
                return Convert.ToInt64(R);
            }
            else
            {
                if (NroPerfil != 0)
                {
                    AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
                    object R = adapter.H2_Administracion_Guardar_Perfiles(NroPerfil, Perfil, Secciones);
                    return Convert.ToInt64(R);
                }
                else
                {
                    throw new Exception("Seleccione un perfil");
                }
            }
        }

        public List<feriados> Feriados_Lista()
        {
            AdministracionDALTableAdapters.H2_Administracion_Feriados_ListaTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Feriados_ListaTableAdapter();
            AdministracionDAL.H2_Administracion_Feriados_ListaDataTable aTable = adapter.GetData();

            List<feriados> Lista = new List<feriados>();

            foreach (AdministracionDAL.H2_Administracion_Feriados_ListaRow row in aTable.Rows)
            {
                feriados f = new feriados();
                f.fecha = row.fecha.ToShortDateString();
                f.descripcion = row.descripcion;
                Lista.Add(f);                
            }
            return Lista;
        }

        public void Feriados_Guardar(DateTime Fecha, string Descripcion)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_Guardar_Feriados(Fecha, Descripcion);

        }

        public void Feriados_Quitar(DateTime Fecha)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_Feriados_Quitar(Fecha);

        }

        public int CambiarEspecialidad(long NroBono, int EspecialidadNew, long Usuario)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            try
            {
                object obj = adapter.H2_BONO_CAMBIO_ESPECIALIDAD(NroBono, EspecialidadNew, Usuario);
                if (obj != null) return Convert.ToInt32(obj.ToString());
                else throw new Exception("Error al actualizar bono.");
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public bonos_encabezado Bono_Resumen(DateTime Fecha, int Usuario, long BonoId)
        {
            AdministracionDALTableAdapters.H2_Administracion_Bono_ResumenTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Bono_ResumenTableAdapter();
            AdministracionDAL.H2_Administracion_Bono_ResumenDataTable aTable = adapter.GetData(Fecha, Usuario, BonoId);

            bonos_encabezado b = new bonos_encabezado();

            if (aTable.Rows.Count > 0)
            {

                if (!aTable[0].IsapellidoNull()) b.apellido = aTable[0].apellido;
                if (!aTable[0].IscuilNull()) b.cuil = aTable[0].cuil;
                if (!aTable[0].IsEspecialidadNull()) b.especialidad = aTable[0].Especialidad;
                if (!aTable[0].IsMedicoNull()) b.medico = aTable[0].Medico;
                if (!aTable[0].IsMedicoNull()) b.comentario_turno = aTable[0].Bono_Id.ToString();
                if (!aTable[0].IsdocumentoNull()) b.documento = aTable[0].documento;
                
            }
            return b;
        }


        public bonos_encabezado Bono_ResumenSN(long BonoId)
        {
            AdministracionDALTableAdapters.H2_Administracion_Bono_Resumen_SNTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Bono_Resumen_SNTableAdapter();
            AdministracionDAL.H2_Administracion_Bono_Resumen_SNDataTable aTable = adapter.GetData(BonoId);

            bonos_encabezado b = new bonos_encabezado();

            if (aTable.Rows.Count > 0)
            {

                if (!aTable[0].IsapellidoNull()) b.apellido = aTable[0].apellido;
                if (!aTable[0].IscuilNull()) b.cuil = aTable[0].cuil;
                if (!aTable[0].IsEspecialidadNull()) b.especialidad = aTable[0].Especialidad;
                if (!aTable[0].IsMedicoNull()) b.medico = aTable[0].Medico;
                if (!aTable[0].IsMedicoNull()) b.comentario_turno = aTable[0].Bono_Id.ToString();
                if (!aTable[0].IsdocumentoNull()) b.documento = aTable[0].documento;

            }
            return b;
        }

        public configuracionturnos InfoImpresionTurnos()
        {
            AdministracionDALTableAdapters.H2_Administracion_Conf_Turnos_CargarTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Conf_Turnos_CargarTableAdapter();
            AdministracionDAL.H2_Administracion_Conf_Turnos_CargarDataTable aTable = adapter.GetData();

            configuracionturnos c = new configuracionturnos();

            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IsAgendaAbiertaNull()) c.agenda = aTable[0].AgendaAbierta;
                if (!aTable[0].IsHoraAtencionPersonalNull()) c.HorariosTurnosPersonales = aTable[0].HoraAtencionPersonal;
                if (!aTable[0].IsHorarioAtencionNull()) c.HorariosTurnosTelefonicos = aTable[0].HorarioAtencion;
                if (!aTable[0].IsTelefonoNull()) c.Telefono = aTable[0].Telefono;
                c.maxturnos = aTable[0].HararioMax;
                c.minturnos = aTable[0].HararioMin;              
            }
            return c;
        }

        public void ImpresionTurnosGuardarConfiguracion(string HorarioAtencion, int HorarioMax, int HorarioMin, int AgendaAbierta, string Telefono, string HoraAtencionPersonal)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_Conf_Turnos_Modificar(HorarioAtencion, HorarioMax, HorarioMin, AgendaAbierta, Telefono, HoraAtencionPersonal);

        }

        public void AdministracionGuardar(string HorarioAtencion, int HorarioMax, int HorarioMin, int AgendaAbierta, string Telefono, string HoraAtencionPersonal)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_Conf_Turnos_Modificar(HorarioAtencion, HorarioMax, HorarioMin, AgendaAbierta, Telefono, HoraAtencionPersonal);

        }

        public void RelacionMedicoGuardar(int Medico, int Usuario)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_Relacion_Usuario_Medico_Guardar(Usuario, Medico);
        }

        public void RelacionMedicoQuitar(int Medico, int Usuario)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Administracion_Relacion_Usuario_Medico_Quitar(Usuario, Medico);
        }

        public List<medicos> SoloMedicosRelacionados(int Usuario)
        {
            AdministracionDALTableAdapters.H2_Administracion_Relacion_Usuario_Medico_SoloLosRelaciadosTableAdapter adapter = new AdministracionDALTableAdapters.H2_Administracion_Relacion_Usuario_Medico_SoloLosRelaciadosTableAdapter();
            AdministracionDAL.H2_Administracion_Relacion_Usuario_Medico_SoloLosRelaciadosDataTable aTable = adapter.GetData(Usuario);
            
             List<medicos> Lista = new List<medicos>();

             foreach (AdministracionDAL.H2_Administracion_Relacion_Usuario_Medico_SoloLosRelaciadosRow row in aTable.Rows)
             {
                 medicos m = new medicos();
                 m.Id = row.Id;
                 m.Medico = row.Medico;
                 Lista.Add(m);
             }
             return Lista;
        }

        public List<medicos> ListaMedicosparaRelacionar(int Usuario, bool Todos, string Medico)
        {
            if (Todos)
            {
                List<medicos> MedicosR = SoloMedicosRelacionados(Usuario);

                MedicosDALTableAdapters.H2_Medicos_ListaTotalTableAdapter adapter = new MedicosDALTableAdapters.H2_Medicos_ListaTotalTableAdapter();
                MedicosDAL.H2_Medicos_ListaTotalDataTable aTable = adapter.GetData(Medico);

                List<medicos> Lista = new List<medicos>();
                bool encotrado = false;
                foreach (MedicosDAL.H2_Medicos_ListaTotalRow row in aTable.Rows)
                {
                    encotrado = false;
                    medicos m = new medicos();
                    m.Id = row.id;
                    m.Medico = row.ApellidoYNombre;

                    foreach (medicos mm in MedicosR)
                    {
                        if (mm.Id == m.Id) { encotrado = true; }
                    }
                    if (encotrado) { m.Especialidad = "info"; } else { m.Especialidad = ""; }

                    Lista.Add(m);
                }
                return Lista;

            }
            else
            {
                List<medicos> MedicosR = SoloMedicosRelacionados(Usuario);
                List<medicos> Lista = new List<medicos>();
                foreach (medicos mm in MedicosR)
                {
                    medicos m = new medicos();
                    m.Id = mm.Id;
                    m.Medico = mm.Medico;
                    m.Especialidad = "info";
                    Lista.Add(m);
                }
                return Lista;
                
            }
        }


        public void Bono_UsarElBono(int Usuario, int NroBono, DateTime Fecha)
        {
            usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
            
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Bono_UsarElBono(Usuario, Fecha, NroBono, Convert.ToInt32(U.id));
        }

        public int Administracion_Cambiar_Clave(int Id, string ClaveAnt, string ClaveNueva)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            object resultado = adapter.H2_Administracion_CambiarClaveUsuario(Id, ClaveAnt, ClaveNueva);
            if (resultado != null)
            {
                return Convert.ToInt32(resultado);
            }
            return 0;
        }

        public bool PasajedeHC(long Origen, long Destino, long UsuarioId)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_HC_PASAJE(Origen, Destino);
                GrabarLog_PasajeHC(Origen, Destino, "OK", UsuarioId);
                return true;
            }
            catch (SqlException ex)
            {
                GrabarLog_PasajeHC(Origen, Destino, "ERROR: " + ex.Message, UsuarioId);
                throw new Exception(ex.Message);
            }
        }

        public void GrabarLog_PasajeHC(long Origen, long Destino, string Detalle, long UsuarioId)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_ESTADISTICAS_PASAJE_HC(Origen, Destino, Detalle, UsuarioId);
        }


        public void LiberarBono(long NroBono, int Usuario, string Observacion)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_BONO_LIBERAR(NroBono, Usuario, Observacion);
        }


        //mensajes
        public void Generar_Mensaje(string mensaje, string encabezado, string enviadoPor,int perfil)
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Generar_Mensaje(mensaje, encabezado, enviadoPor,perfil);
        }


        public List<mensajes> Traer_Mensaje()
        {
            AdministracionDALTableAdapters.H2_Traer_MensajeTableAdapter adapter = new AdministracionDALTableAdapters.H2_Traer_MensajeTableAdapter();
            AdministracionDAL.H2_Traer_MensajeDataTable aTable = adapter.GetData();

            List<mensajes> l = new List<mensajes>();
            foreach (AdministracionDAL.H2_Traer_MensajeRow row in aTable.Rows)
            {
                mensajes m = new mensajes();
                if (!row.IstituloNull()) { m.encabezado = row.titulo; }
                if (!row.IsEnviadoPorNull()) { m.UsuarioEnviado = row.EnviadoPor; }
                if (!row.IsMensajeNull()) { m.mensaje = row.Mensaje; }
                if (!row.IsfechaGeneracionNull()) { m.fecha = row.fechaGeneracion.ToShortDateString(); }
                l.Add(m);
            }
            return l;
        }

        public List<mensajes> Traer_Usuarios_Notificados_Mensaje()
        {
            AdministracionDALTableAdapters.H2_Traer_Usuarios_Notificados_MensajeTableAdapter adapter = new AdministracionDALTableAdapters.H2_Traer_Usuarios_Notificados_MensajeTableAdapter();
            AdministracionDAL.H2_Traer_Usuarios_Notificados_MensajeDataTable aTable = adapter.GetData();

            List<mensajes> l = new List<mensajes>();
            foreach (AdministracionDAL.H2_Traer_Usuarios_Notificados_MensajeRow row in aTable.Rows)
            {
                mensajes m = new mensajes();
                m.UsuarioNotificado = row.usuario;
                if (!row.IsfechaLeidoNull()) { m.fecha = row.fechaLeido.ToShortDateString() + " " + row.fechaLeido.ToShortTimeString(); }
                l.Add(m);
            }
            return l;
        }

        public void Limpiar_Mensaje()
        {
            AdministracionDALTableAdapters.QueriesTableAdapter adapter = new AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Limpiar_Mensaje();
        }
    }
}
    //mensajes