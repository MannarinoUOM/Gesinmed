using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for VerificadorBLL
/// </summary>
namespace Hospital
{
    public class VerificadorBLL
    {
        public VerificadorBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

//----Funcion para verificar lo que puede o no ver un usuario o un administrador.
//----Retorna un true o false de acuerdo a si es administrador o si es usuario y dentro 
//----de sus permisos y permisosB se encuentra la seccion a mostrar
        public bool Permisos(string Permisos, string Seccion, string Tipo)
        {
            bool Resultado = false;

            if (Tipo == null)
            {
                Resultado = false;
                return Resultado;
            }

            if (Permisos == "") { Permisos = "-1"; }
           
//--------si es super usuario o administrador ve todo lo que haya----------------------
            if (Tipo == "SuperUsuario" || Tipo.ToString() == "Administrador")
            {
                Resultado = true;
            }
            else
            {
//--------de lo contrario verifica los permisos guardados en base de datos en tabla Ususarios (permisos y permisosB)
                char[] separator = new char[] { '|' };
                string[] strSplitArr = Permisos.Split(separator);
                foreach (string arrStr in strSplitArr)
                {
//--------compara los valores traido de la DB con la seccion que se pregunta.
                    if (arrStr == Seccion)
                    {
                        Resultado = true;
                        return true;
                    }
                }
            }

            return Resultado;
        }

    

        //verifica si tiene permiso para ver el item del menu principal
        public bool PermisosM(string Permisos, string Seccion, string Tipo)
        {
            bool Resultado = false;

            if (Tipo == null)
            {
                Resultado = false;
                return Resultado;
            }


            if (Seccion.Equals("9999"))
            {
                string interno = ((usuarios)HttpContext.Current.Session["Usuario"]).interno;
                if (interno.Equals("SISTEMAS")) return true;
                else return false;
            }

            if (Permisos == "") { Permisos = "-1"; }
            if (Tipo == "SuperUsuario" || Tipo.ToString() == "Administrador")
            {
                Resultado = true;
            }
            else
            {
                //se sacan los pipes de la cadena de texto. Se arma un array por cada contenido separado por los pipes
                //usando la funcion de split para cortar cada grupo de cadena de submenu
                char[] separator = new char[] { '|' };
                string[] strSplitArr = Permisos.Split(separator);
                //recorre el array que contiene los valores de COD (identificador del item del menu en tabla Permisos)
                //cada submenu es recorrido y le resta el ultimo valor del cod para saber a que menu pertenece
                foreach (string arrStr in strSplitArr)
                {
                    string Consultando = arrStr;
                
                   if (Consultando.Length > 1) { Consultando = Consultando.Substring(0, Consultando.Length - 1); }

                    //if(Consultando != null){
                    //UsuariosDALTableAdapters.QueriesTableAdapter adapter = new UsuariosDALTableAdapters.QueriesTableAdapter();
                    //object obj = adapter.H2_Traer_Menu_Principal(Convert.ToInt32(Consultando));
                    //if (obj != null)
                    //    Consultando = obj.ToString();
                    //}

                    if (Consultando == Seccion)
                    {
                        Resultado = true;
                        return true;
                    }
                }
            }

            return Resultado;
        }

        public bool PermisoOK(String Seccion)
        {
            try
            {
                usuarios u = (usuarios)HttpContext.Current.Session["Usuario"];
                if (u == null)
                {
                    return false;
                }
                if (Permisos(u.permisos, Seccion, u.tipo))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }


        public bool Permiso(String Seccion)
        {
            try
            {
                usuarios u = (usuarios)HttpContext.Current.Session["Usuario"];
                if (u == null) {
                    System.Web.HttpContext.Current.Response.Redirect("~/Error.aspx");
                    return false; 
                }
                if (Permisos(u.permisos, Seccion, u.tipo))
                {
                    return true;
                }
                else
                {
                    System.Web.HttpContext.Current.Response.Redirect("~/Error.aspx");
                    return false;
                }
            }
            catch
            {
                System.Web.HttpContext.Current.Response.Redirect("~/Error.aspx");
                return false;
            }
        }

//-----permisos para el menu----------------
        public bool PermisoMenu(String Seccion)
        {
            try
            {
                usuarios u = (usuarios)System.Web.HttpContext.Current.Session["Usuario"];
                if (u == null) {
                    System.Web.HttpContext.Current.Response.Redirect("~/Error.aspx");
                    return false; 
                }
                if (PermisosM(u.permisos, Seccion, u.tipo))
                {
                    return true;
                }
                else
                {                       
                    return false;
                }
            }
            catch
            {
                System.Web.HttpContext.Current.Response.Redirect("~/Error.aspx");
                return false;
            }
        }

//----Al iniciar la app verifica que puede o no mostrar--------------
//----En esta funcion comienza a ver lo que puede o no verse. arbitrariamente se verifica
//----La seccion que viene de la clase Inicio.aspx
        public bool PermisoSM(String Seccion)
        {
            try 
            {
                usuarios u = (usuarios)System.Web.HttpContext.Current.Session["Usuario"];
                if (u == null)
                {
                    System.Web.HttpContext.Current.Response.Redirect("~/Error.aspx");
                    return false;
                }
//----Se llama a la funcion que hara la comparacion si es administrador o usuario y que puede o no ver----
                if (Permisos(u.permisos, Seccion, u.tipo))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                System.Web.HttpContext.Current.Response.Redirect("~/Error.aspx");
                return false;
            }
        }



        public bool PermisoMensajes(String Seccion)
        {
            try
            {
                usuarios u = (usuarios)System.Web.HttpContext.Current.Session["Usuario"];
                if (u == null)
                {
                    return false;
                }
                if (PermisosSinPrivilegios(u.permisos, Seccion, u.tipo))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }



        public bool PermisosSinPrivilegios(string Permisos, string Seccion, string Tipo)
        {
            bool Resultado = false;

            if (Tipo == null)
            {
                Resultado = false;
                return Resultado;
            }

            if (Permisos == "") { Permisos = "-1"; }
            
            
            {
                char[] separator = new char[] { '|' };
                string[] strSplitArr = Permisos.Split(separator);
                foreach (string arrStr in strSplitArr)
                {
                    if (arrStr == Seccion)
                    {
                        Resultado = true;
                        return true;
                    }
                }
            

            return Resultado;
        }



}


    }
}