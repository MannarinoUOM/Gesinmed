using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using Hospital;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class Deposito : System.Web.Services.WebService {

    public Deposito () {
    }

    [WebMethod(EnableSession=true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Deposito(Medicamento_Deposito p) 
    {
        if (Session["Usuario"] != null)
        {
            DepositoBLL _d = new DepositoBLL();
            return _d.Insert_Deposito(p);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Medicamento_Deposito> List_Depositos()
    {
        if (Session["Usuario"] != null)
        {
            DepositoBLL _d = new DepositoBLL();
            return _d.List_Medicamento_Deposito();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    
}
