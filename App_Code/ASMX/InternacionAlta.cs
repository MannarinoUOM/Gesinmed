using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for InternacionAlta
/// </summary>
/// [WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class InternacionAlta : System.Web.Services.WebService
{
	public InternacionAlta()
	{
		//
		// TODO: Add constructor logic here
		//
	}


    [WebMethod(EnableSession = true)]
    public long GuardarAlta(long idAlta, long idInternacion, long idPaciente, int motivoEgreso, int autopsia, int operado, string fecha,
            string diasOperatorio, string cirugiaRealizda, string princiapl, string conmitentes, string complicaciones, string observaciones, int idMedico)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionAlta Alta = new Hospital.InternacionAlta();

            long idUsuario = ((usuarios)Session["Usuario"]).id;

            return  Alta.Internacion_Alta_Guardar( idAlta,  idInternacion,  idPaciente,  idUsuario,  motivoEgreso,  autopsia, operado,  fecha,
             diasOperatorio, cirugiaRealizda, princiapl,  conmitentes, complicaciones, observaciones, idMedico);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public AltaMedica TraerAlta(long idIntenacion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionAlta Alta = new Hospital.InternacionAlta();

            return Alta.Traer_Alta(idIntenacion);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    
    }


    [WebMethod(EnableSession = true)]
    public long InternacionAltaBorrar(long idAlta)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.InternacionAlta Alta = new Hospital.InternacionAlta();

            return Alta.Internacion_Alta_Borrar(idAlta);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

}