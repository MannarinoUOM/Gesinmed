using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.NetworkInformation;

/// <summary>
/// Summary description for UsuariosBLL
/// </summary>
namespace Hospital
{
    public class UsuariosBLL
    {
        public UsuariosBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public string Login(string Usuario, string Clave, string Pc)
        {
            UsuariosDALTableAdapters.H2_Usuario_LoginTableAdapter adapter = new UsuariosDALTableAdapters.H2_Usuario_LoginTableAdapter();
            UsuariosDAL.H2_Usuario_LoginDataTable aTable = adapter.GetData(Usuario, Clave);
            usuarios u = new usuarios();
            if (aTable.Rows.Count > 0)
            {
                u.activo = aTable[0].activo;
                u.vencimiento = aTable[0].fechavencimiento;

                if (!u.activo) { return "ERROR=No es un usuario en actividad.</br>Comuniquese con Sistemas"; }
                if (u.vencimiento < DateTime.Now) { return "ERROR=El usuario ha superado la fecha de vencimiento.</br>Comuniquese con Sistemas"; }

                u.id = aTable[0].id;
                u.nombre = aTable[0].nombre;
                u.usuario= aTable[0].usuario;
                u.seccional = aTable[0].Seccional;
                u.ip = Pc;
                if (!aTable[0].IstipoNull()) { u.tipo = aTable[0].tipo; } else { u.tipo = ""; }
                if (!aTable[0].IspermisosNull()) { u.permisos = aTable[0].permisos; } else { u.permisos = ""; }
                if (!aTable[0].IspermisosBNull()) { u.permisosB = aTable[0].permisosB; } else { u.permisosB = ""; }
                u.seccionalnumero = (int)aTable[0].seccionanumero;
                u.permisos = u.permisos + u.permisosB;
                if (!aTable[0].IsInternoNull()) u.interno = aTable[0].Interno;
                else u.interno = string.Empty;
                //if (u.tipo.ToUpper() == "USUARIO" && (Pc == "127.0.0.1" || Pc.Length < 6) ) {
                //    return "ERROR=Error en la terminal.</br>Vuelva a iniciar sesión y/o Comuniquese con Sistemas"; 
                //}

                if (!aTable[0].IsperfilNull()) { u.perfil = aTable[0].perfil; }


                HttpContext.Current.Session["Usuario"] = u;

               
                //ipList = System.Net.Dns.GetHostByAddress(Environment.UserName);
                
                //string computer_name = System.Environment.GetEnvironmentVariable("COMPUTERNAME");
                //string Detalles = "PC: " + PC;           
                string Detalles = "Inicio Session // " + Pc;
                Estadisticas.Est_UsuarioMovBLL E = new Estadisticas.Est_UsuarioMovBLL();
                E.EstUsuMov(Convert.ToInt32(u.id), Detalles);

                //if (u.id == 250) { return "MIGUE=54"; } else { 
                return "OK=54"; 
                //}
                
            }
            return "ERROR=Usuario y/o Contraseña incorrecto";
        }




        public string GetComputerName(string clientIP)
        {
            try
            {
                var hostEntry = Dns.GetHostEntry(clientIP);
                return hostEntry.HostName;
            }
            catch
            {
                return string.Empty;
            }
        }



public string LocalIPAddress()
{
IPHostEntry host;
string localIP = "";
host = Dns.GetHostEntry(Dns.GetHostName());
foreach (IPAddress ip in host.AddressList)
{
if (ip.AddressFamily.ToString() == "InterNetwork")
{
localIP = ip.ToString();
}
}
return localIP;
}

        public List<usuarios> Lista_T(bool? Todos)
        { 
        UsuariosDALTableAdapters.H2_Usuarios_Lista_TTableAdapter adapter = new UsuariosDALTableAdapters.H2_Usuarios_Lista_TTableAdapter();
            UsuariosDAL.H2_Usuarios_Lista_TDataTable aTable = adapter.GetData(Todos);
            List<usuarios> Us = new List<usuarios>();
            foreach (UsuariosDAL.H2_Usuarios_Lista_TRow row in aTable.Rows)
            {
                usuarios u = new usuarios();
                u.id = row.id;
                u.nombre = row.nombre;
                Us.Add(u);
            }
            return Us;
        }

        public List<usuarios> UsuariobyId(long UsuarioId)
        {

            List<usuarios> Us = new List<usuarios>();
            UsuariosDALTableAdapters.H2_Usuarios_Lista_Rendicion_Bonos_SNTableAdapter adapter = new UsuariosDALTableAdapters.H2_Usuarios_Lista_Rendicion_Bonos_SNTableAdapter();
            UsuariosDAL.H2_Usuarios_Lista_Rendicion_Bonos_SNDataTable aTable = adapter.GetData(UsuarioId);
            foreach (UsuariosDAL.H2_Usuarios_Lista_Rendicion_Bonos_SNRow row in aTable.Rows)
            {
                usuarios u = new usuarios();
                u.id = row.id;
                u.nombre = row.nombre;
                Us.Add(u);
            }
            return Us;
        }

        public usuarios UsuariobyId_Item(long UsuarioId)
        {
            usuarios u = new usuarios();
            UsuariosDALTableAdapters.H2_USUARIOS_BY_ID_LISTTableAdapter adapter = new UsuariosDALTableAdapters.H2_USUARIOS_BY_ID_LISTTableAdapter();
            UsuariosDAL.H2_USUARIOS_BY_ID_LISTDataTable aTable = adapter.GetData(UsuarioId);
            foreach (UsuariosDAL.H2_USUARIOS_BY_ID_LISTRow row in aTable.Rows)
            {
                u.id = row.id;
                u.nombre = row.nombre;
                u.usuario = row.usuario;
            }
            return u;
        }


        public string IpLocal()
        {
            try
            {
                //Leemos todas las interfaces de red de nuestra máquina
                NetworkInterface[] ni = NetworkInterface.GetAllNetworkInterfaces();
                string IP = "";
                //Después, las recorremos y las tratamos.
                foreach (NetworkInterface n in ni)
                {
                    IP = IP + n.GetIPProperties().UnicastAddresses[0].Address.ToString();
                }
                return IP;
            }
            catch { 
            return "";
            }
        }






        public List<Usuarios_Farmacia> Lista_x_Permiso(string Permiso)
        {
            UsuariosDALTableAdapters.H2_Usuarios_x_PermisoTableAdapter adapter = new UsuariosDALTableAdapters.H2_Usuarios_x_PermisoTableAdapter();
            UsuariosDAL.H2_Usuarios_x_PermisoDataTable aTable = adapter.GetData(Permiso);
            List<Usuarios_Farmacia> Us = new List<Usuarios_Farmacia>();
            foreach (UsuariosDAL.H2_Usuarios_x_PermisoRow row in aTable.Rows)
            {
                Usuarios_Farmacia u = new Usuarios_Farmacia();
                u.id = row.id;
                u.Nombre = row.nombre;
                u.Usuario = row.usuario;
                Us.Add(u);
            }
            return Us;
        }


    }
}