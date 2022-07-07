using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for TipoDoc
/// </summary>
public class TipoDoc
{
	public TipoDoc()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string Descripcion { get; set; }
    public string Id { get; set; }


    public TipoDoc(string id, string descripcion)
    {
        Id = id;
        Descripcion = descripcion;
    }
}

public class TipoDocList : List<TipoDoc>
{

}