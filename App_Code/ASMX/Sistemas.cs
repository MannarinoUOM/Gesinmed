using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Sistemas
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class Sistemas : System.Web.Services.WebService
{
	public Sistemas()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    [WebMethod]
    public List<version> ListComentariosVersion()
    {
        Hospital.InicioBLL i = new Hospital.InicioBLL();
        return i.ListVersionComentarios();
    }

    [WebMethod]
    public void InsertComentarioVersion(version v)
    {
        Hospital.InicioBLL i = new Hospital.InicioBLL();
        i.InsertComentarioVersion(v);
    }

    [WebMethod]
    public void DeleteComentarioVersion(long Id)
    {
        Hospital.InicioBLL i = new Hospital.InicioBLL();
        i.DeleteComentarioVersion(Id);
    }

}