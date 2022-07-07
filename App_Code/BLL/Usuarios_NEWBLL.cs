using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HospitalBLL.Entities;
using System.Globalization;
using System.Data.SqlClient;

/// <summary>
/// Summary description for Usuarios_NEW
/// </summary>
public class Usuarios_NEWBLL
{
	public Usuarios_NEWBLL()
	{
		//
		// TODO: Add constructor logic here
		//
	}


    public List<usuarios> Traer_Usuario_Para_Actualizacion(string usuario, string nombre, string fechaAlta)
    {
        List<usuarios> lista = new List<usuarios>();
        //long _documento;
        //if (!long.TryParse(Documento, out _documento)) _documento = 0;

        Usuarios_NEWDALTableAdapters.H2_Traer_Usuario_Para_ActualizacionTableAdapter adapter = new Usuarios_NEWDALTableAdapters.H2_Traer_Usuario_Para_ActualizacionTableAdapter();
        Usuarios_NEWDAL.H2_Traer_Usuario_Para_ActualizacionDataTable aTable = adapter.GetData(usuario,nombre,fechaAlta);
        foreach (Usuarios_NEWDAL.H2_Traer_Usuario_Para_ActualizacionRow row in aTable.Rows)
        {
            usuarios u = new usuarios();
            u.id = row.id;
            u.usuario = row.usuario;
            u.password = row.password;
            if (!row.IsnombreNull()) { u.nombre = row.nombre; } else { u.nombre = "";}
            if (!row.IsactivoNull()) { u.activo = row.activo; } else { u.activo = false; }
            if (!row.IsseccionalNull()) { u.seccionalnumero = (int)row.seccional; } else { u.seccionalnumero = 0; }
            if (!row.IsinternoNull()) { u.interno = row.interno; } else { u.interno = ""; }
            if (!row.IsEmailNull()) { u.email = row.Email; } else { u.email = ""; }

            lista.Add(u);
        }

        return lista;
    }
}