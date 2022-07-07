using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Administracion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Administracion : System.Web.Services.WebService {

    public Administracion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
        
    }


    

    [WebMethod(EnableSession = true)]
    public int CancelarBono(string fecha, int Usuario, int NroBono, string Observacion) {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            DateTime Fecha = DateTime.Now;
            try
            {
                Fecha = Convert.ToDateTime(fecha);
            }
            catch
            {
                throw new Exception("Verifique la Fecha");
            }
            bono_estado BE = EstadodelTurno(Fecha, Usuario, NroBono);
			bool FUEATENDIDO = FueAtendido(Fecha, Usuario, NroBono);
			
			
			
			if (FUEATENDIDO) { throw new Exception("El Bono fue utilizado en una consulta, NO se puede Cancelar"); }
            if (BE.EstaCancelado) { throw new Exception("El Bono ya ha sido Cancelado"); }

            return Convert.ToInt32(A.CancelarBono(Fecha, Usuario, NroBono, (int)((usuarios)Session["Usuario"]).id, Observacion + " Terminal: " + ((usuarios)HttpContext.Current.Session["Usuario"]).ip,((usuarios)HttpContext.Current.Session["Usuario"]).ip).ToString());
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public string DiabetesGenerarTxt(string desde, string hasta)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Diabetes_Generar_Txt(desde, hasta);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }



    [WebMethod(EnableSession = true)]
    public int CancelarBonoSN(long NroBono)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();            
            bono_estado BE = EstadodelTurnoSN(NroBono);
            bool FUEATENDIDO = FueAtendidoSN(NroBono);

            if (FUEATENDIDO) { throw new Exception("El Bono fue utilizado en una consulta, NO se puede Cancelar"); }
            if (BE.EstaCancelado) { throw new Exception("El Bono ya ha sido Cancelado"); }

            return Convert.ToInt32(A.CancelarBonoSN(NroBono));
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }



    public bono_estado EstadodelTurno(DateTime Fecha, int Usuario, int NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        return A.BonoEstado(Fecha, Usuario, NroBono);
    }

   
    public bono_estado EstadodelTurnoSN(long NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        return A.BonoEstadoSN(NroBono);
    }

    [WebMethod(EnableSession = true)]
    public bool EliminarHC(long PacienteId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            A.EliminarHC(PacienteId);
            return true;
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    public bool FueAtendido(DateTime Fecha, int Usuario, int NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        return A.FueAtendido(Fecha, Usuario, NroBono);
    }

    public bool FueAtendidoIMG(long NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        return A.FueAtendidoIMG(NroBono);
    }

    public bool FueAtendidoSN(long NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        return A.FueAtendidoSN(NroBono);
    }

    public bool FueAtendidoLABO(long NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        return A.FueAtendidoLABO(NroBono);
    }

    
    
    public bono_estado PacienteAtendido(DateTime Fecha, int Usuario, int NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        return A.BonoEstado(Fecha, Usuario, NroBono);
    }
	
    [WebMethod(EnableSession = true)]
    public List<usuarios> Usuario_Buscar(string Nombre)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Usuarios_Buscar(Nombre);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public List<perfiles> Perfiles_Listar(long Id)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Perfiles_Listar(Id);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public usuario_edicion Usuario_Id(long Id)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Usuario_Id(Id);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public string ExisteUsuario(string Nombre) {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        if (A.ExisteelUsuario(Nombre)) return A.Existe_NuevoUsuario(Nombre);
        else return Nombre;
    } 


    [WebMethod(EnableSession = true)]
    public long Usuario_Guardar(long Id, string nombre, string tipo, bool activo, string interno, string fvencimiento, string usuario, string Clave1, string Clave2, int NroPerfil)
    {
        fvencimiento = "31/12/2099";
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            if (Id != 0)
            {
                if (!A.EsAdministrador(Id) && tipo.ToUpper() == "ADMINISTRADOR")
                {
                    throw new Exception("Error de tipo de Usuario");
                }

            }
            else
            {
                if (tipo.ToUpper() == "ADMINISTRADOR")
                {
                    throw new Exception("No se pueden crear Administradores");
                }
            }
            if (Clave1 != Clave2) { throw new Exception("Las Contraseñas no coinciden"); }
            if (Id == 0)
            {
                if (Clave1.Trim().Replace(" ", "").Length <= 3)
                {
                    throw new Exception("Por seguridad, la contraseña tiene que contener mas de 4 caracteres");
                }
            }
            else
            {
                if ((Clave1.Trim().Replace(" ", "").Length != 0) && (Clave1.Trim().Replace(" ", "").Length < 3))
                {
                    throw new Exception("Por seguridad, la contraseña tiene que contener mas de 4 caracteres");
                }
            }

            DateTime vencimiento = Convert.ToDateTime(fvencimiento);
            //if (vencimiento < DateTime.Now) { throw new Exception("La fecha de vencimiento no puede ser menor a la actual"); }            
            if (tipo != "Usuario" && tipo != "Administrador" && tipo != "Supervisor") { throw new Exception("Error en el tipo de usuario"); }
            if (Convert.ToInt32(NroPerfil) < 1) { throw new Exception("Error en el perfil"); }
            if (nombre.Trim().Replace(" ", "").Length < 4) { throw new Exception("El nombre debe tener como mínimo 4 caracteres"); }
            if (usuario.Trim().Replace(" ", "").Length < 4) { throw new Exception("El nombre de usuario debe tener como mínimo 4 caracteres"); }
            if (Id == 0)
            {
                //existe el usuario?
                if (A.ExisteelUsuario(usuario))
                {
                    return -1;
                }
                //throw new Exception("El nombre de usuario ya existe, intente con otro nombre"); } 
            }

            long R = A.Usuarios_Guardar(Id, nombre, tipo, activo, interno, vencimiento, usuario, Clave1, Clave2, NroPerfil);
            A.CambiarPerfilUsuario(R, NroPerfil);
            if (R > 0)
            {
                if (Clave1.Trim().Replace(" ", "").Length != 0)
                {
                    A.Usuario_Cambiar_Clave(R, Clave1);
                }
                return R;
            }
        }
        else throw new Exception("No posee permisos para crear Usuarios.");
        return 0;
    }


    [WebMethod(EnableSession = true)]
    public List<secciones> Cargar_secciones()
    { 
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Secciones_Cab();
        }
        else
            return null;
    }

    [WebMethod(EnableSession = true)]
    public List<secciones_det> Cargar_secciones_det(long UsuarioId)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Secciones_Det(UsuarioId);
        }
        else
            return null;
    }

    [WebMethod(EnableSession = true)]
    public string Nombre_Usuario_Id(long UsuarioId)
    {
        if (UsuarioId > 0)
        {
            Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
            if (V.Permiso("990"))
            {
                Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
                return A.Usuario_Id(UsuarioId).nombre;
            }
            else
                return null;
        }
        else
            return null;
    }

    [WebMethod(EnableSession = true)]
    public void Guardar_Permisos_Especiales(long UsuarioId, string Permisos)
    {
        if (UsuarioId > 0)
        {
            Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
            if (V.Permiso("990"))
            {
                Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
                A.Guardar_Permisos_Especiales(UsuarioId, Permisos);                
            }
        }
            
    }


    [WebMethod(EnableSession = true)]
    public List<secciones_det> Cargar_secciones_perfil_det(long Perfil)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Secciones_Perfiles_Det(Perfil);
        }
        else
            return null;
    }

    [WebMethod(EnableSession = true)]
    public long Guardar_Perfil(long NroPerfil, string Perfil, string Secciones)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("990"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Guardar_Perfil(NroPerfil, Perfil, Secciones);
        }
        else
            throw new Exception("Error de Administración");
    }

    [WebMethod(EnableSession = true)]
    public List<feriados> Feriados_Lista()
    {   
                Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
                return A.Feriados_Lista();
    }

    [WebMethod(EnableSession = true)]
    public void Guardar_Feriados(string fecha, string descri)
    {
        DateTime tempDate;
        if (!DateTime.TryParse(fecha, out tempDate)) { throw new Exception("Fecha NO valida"); }
        if (fecha.Trim().Replace(" ", "") == "") { throw new Exception("Falta la fecha"); }
        if (descri.Trim().Replace(" ","") == "") { throw new Exception("Falta la descripción"); }

        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("999"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            A.Feriados_Guardar(Convert.ToDateTime(fecha), descri);
        }
    }

    [WebMethod(EnableSession = true)]
    public void Quitar_Feriado(string fecha)
    {
        DateTime tempDate;
        if (!DateTime.TryParse(fecha, out tempDate)) { throw new Exception("Fecha NO valida"); }
        if (fecha.Trim().Replace(" ", "") == "") { throw new Exception("Falta la fecha"); }

        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("999"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            A.Feriados_Quitar(Convert.ToDateTime(fecha));
        }
    }

    [WebMethod(EnableSession = true)]
    public bonos_encabezado BuscarBonoResumen(string fecha, int Usuario, string NroBono)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            int _nro;
            if (int.TryParse(NroBono, out _nro))
            {
                Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();

                if (A.CancelarTurnos_FueUsado(Convert.ToDateTime(fecha), (int)((usuarios)Session["Usuario"]).id, _nro))
                {
                        throw new Exception("El paciente ya fue recepcionado.");
                }
                DateTime Fecha = DateTime.Now;
                try
                {
                    Fecha = Convert.ToDateTime(fecha);
                }
                catch
                {
                    throw new Exception("Verifique la Fecha.");
                }
                bono_estado BE = EstadodelTurno(Fecha, Usuario, _nro);

                if (BE.EstaCancelado) { throw new Exception("El Bono ya ha sido Cancelado."); }

                return A.Bono_Resumen(Fecha, Usuario, _nro);
            }
            else throw new Exception("Ingrese Nro. Bono.");
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public bonos_encabezado BuscarBonoResumenSN(string NroBono)
    {
        Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
        long _Nro;
        if (long.TryParse(NroBono, out _Nro))
        {
            //if (A.CancelarTurnos_FueUsado_SN(_Nro))
            //{
            //    throw new Exception("El médico ha llamado al paciente");
            //}

            bono_estado BE = EstadodelTurnoSN(_Nro);

            if (BE.EstaCancelado) { throw new Exception("El Bono ya ha sido Cancelado"); }

            return A.Bono_ResumenSN(_Nro);
        }
        else throw new Exception("Ingrese Nro. Bono");
    }

    [WebMethod(EnableSession = true)]
    public int CambiarEspecialidad(long NroBono, int EspecialidadNueva)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.CambiarEspecialidad(NroBono, EspecialidadNueva, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void Guardar_ConfTurnos(string HorarioAtencion, int HorarioMax, int HorarioMin, int AgendaAbierta, string Telefono, string HoraAtencionPersonal)
    {       

        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.PermisoSM("23"))
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            A.ImpresionTurnosGuardarConfiguracion(HorarioAtencion,  HorarioMax,  HorarioMin,  AgendaAbierta,  Telefono,  HoraAtencionPersonal);
        }
    }

    [WebMethod(EnableSession = true)]
    public configuracionturnos Cargar_Configuracion_Turnos()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.InfoImpresionTurnos();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public void Relacion_Usuaro_Medico_Cambiar(int Usuario, int Medico, bool Estado)
    {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            if (Usuario <= 0) {throw new Exception("Falta Seleccionar Usuario");}
            if (Medico <= 0) {throw new Exception("Falta Seleccionar Medico");}

            if (!Estado)
            {
                A.RelacionMedicoGuardar(Medico, Usuario);
            }
            else
            {
                A.RelacionMedicoQuitar(Medico, Usuario);
            }
    }

    [WebMethod(EnableSession = true)]
    public List<medicos> RelacionUsuarioMedicoCargar(int Usuario, bool Todos, string Medico)
    {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            if (Usuario <= 0) { throw new Exception("Falta Seleccionar Usuario"); }
            return A.ListaMedicosparaRelacionar(Usuario, Todos, Medico);
    }




    [WebMethod(EnableSession = true)]
    public void UsarElBono(string fecha, int Usuario, string NroBono)
    {
        if (Session["Usuario"] != null)
        {
            int _NroBono;
            if (int.TryParse(NroBono, out _NroBono))
            {
                Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
                DateTime Fecha = DateTime.Now;
                try
                {
                    Fecha = Convert.ToDateTime(fecha);
                }
                catch
                {
                    throw new Exception("Verifique la Fecha");
                }
                bono_estado BE = EstadodelTurno(Fecha, Usuario, _NroBono);

                if (BE.EstaCancelado) { throw new Exception("El Bono es un Bono Cancelado"); }
                A.Bono_UsarElBono(Usuario, _NroBono, Fecha);
            }
            else throw new Exception("Ingrese Nro. de Bono");
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public bool PasajedeHC(long Origen, long Destino) //Pasaje de HC. 
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.PasajedeHC(Origen, Destino,((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }






    

    [WebMethod(EnableSession = true)]
    public void LiberarBono(long NroBono, string Observacion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();            
            bono_estado BE = EstadodelTurnoSN(NroBono);
			bool FUEATENDIDO = false;

            FUEATENDIDO = FueAtendidoIMG(NroBono);
            if (!FUEATENDIDO)
            {
                FUEATENDIDO = FueAtendidoSN(NroBono);
                if (!FUEATENDIDO)
                {
                    FUEATENDIDO = FueAtendidoLABO(NroBono);
                }
            }
            
			
			//if (FUEATENDIDO) { throw new Exception("El Bono fue utilizado en una consulta, NO se puede Liberar"); }
            if (BE.EstaCancelado) { throw new Exception("El Bono ya ha sido Liberado"); }

            try
            {
                A.LiberarBono(NroBono, (int)((usuarios)Session["Usuario"]).id, Observacion + " Terminal: " + ((usuarios)HttpContext.Current.Session["Usuario"]).ip);
            }
            catch (Exception e)
            { 
                throw new Exception(e.Message);
            }
            
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    //mensajes

    [WebMethod(EnableSession = true)]
    public void GenerarMensaje(string mensaje, string encabezado, string enviadoPor,int perfil) 
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            A.Generar_Mensaje( mensaje, encabezado, enviadoPor,perfil);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public List<mensajes> TraerMensaje()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
           return A.Traer_Mensaje();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<mensajes> TraerUsuariosNotificadosMensaje()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            return A.Traer_Usuarios_Notificados_Mensaje();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public void LimpiarMensaje()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
            A.Limpiar_Mensaje();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    //mensajes
}
