using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.NetworkInformation;
using System.Net;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Session.Abandon();
            //Leemos todas las interfaces de red de nuestra máquina
            NetworkInterface[] ni = NetworkInterface.GetAllNetworkInterfaces();
            string PC = "";
            //Después, las recorremos y las tratamos.
            foreach (NetworkInterface n in ni)
            {
                PC = LocalIPAddress();
            }

            Literal1.Text = "<input id='PC' type='hidden' value='" + PC + "' />";
        }
    }

    public string LocalIPAddress()
    {
        //return "";
        string ipList = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

        if (!string.IsNullOrEmpty(ipList))
        {
            return ipList.Split(',')[0];
        }

        return Request.ServerVariables["REMOTE_ADDR"];
    }
}