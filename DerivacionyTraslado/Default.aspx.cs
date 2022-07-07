using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using Newtonsoft.Json;

public partial class DerivacionyTraslado_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
//        string URI = "http://opq.aws.grupoolmos.com.ar:50000/RESTAdapter/CrearOrdenCompra/";
        string myParameters = "{ 'NroDocumento': '850001'," +
      "'Prestador': '30563079025'," +
      "'TextoMedicoSolic': 'Texto Medi'}," +
      "'Posiciones': {" +
         "'Material': 'NN230178'," +
         "'Cantidad': '1'," +
         "'UnidadMedida': 'un'," +
         "'PrecioNeto': '145'," +
         "'FechaTurno': '20.07.2018'," +
         "'DNI': '39609948'," +
         "'Solicitante': 'CAAS MATIAS ALEJANDRO'," +
         "'CentroCosto': ''" +
      "}," +
      "'Posiciones': {" +
         "'Material': 'NN230133'," +
         "'Cantidad': '1'," +
         "'UnidadMedida': 'un'," +
         "'PrecioNeto': '293'," +
         "'FechaTurno': '20.07.2018'," +
         "'DNI': '39609948'," +
         "'Solicitante': 'CAAS MATIAS ALEJANDRO'," +
         "'CentroCosto': ''" +
      "}," +
      "'Posiciones': {" +
         "'Material': 'NN660934'," +
         "'Cantidad': '1'," +
         "'UnidadMedida': 'un'," +
         "'PrecioNeto': '41'," +
         "'FechaTurno': '20.07.2018'," +
         "'DNI': '39609948'," +
         "'Solicitante': 'CAAS MATIAS ALEJANDRO'," +
         "'CentroCosto': ''" +
      "}," +
      "'Posiciones': {" +
         "'Material': 'NN660063'," +
         "'Cantidad': '1'," +
         "'UnidadMedida': 'un'," +
         "'PrecioNeto': '291'," +
         "'FechaTurno': '20.07.2018'," +
         "'DNI': '39609948'," +
         "'Solicitante': 'CAAS MATIAS ALEJANDRO'," +
         "'CentroCosto': ''" +
      "}," +
      "'Posiciones': {" +
         "'Material': 'NN660711'," +
         "'Cantidad': '1'," +
         "'UnidadMedida': 'un'," +
         "'PrecioNeto': '100'," +
         "'FechaTurno': '20.07.2018'," +
         "'DNI': '39609948'," +
        " 'Solicitante': 'CAAS MATIAS ALEJANDRO'," +
       "  'CentroCosto': ''" +
      "}" +
"}";

        //using (WebClient wc = new WebClient())
        //{
        //    wc.Headers[HttpRequestHeader.ContentType] = "application/json; charset=utf-8";
        //    wc.UseDefaultCredentials = true;
        //    wc.Credentials = new NetworkCredential("OPQ_LEGADO_GESINMED", "InterOPQ_01");
        //    string HtmlResult = wc.UploadString(URI, myParameters);
        //}

        //string respuesta = "{\"CrearOrdenCompra_Res\":{\"Estado\":\"E\",\"Descripcion\":\"No existe DNI en la tabla ZMM_PADRON_UOM.\"}}";	
        //int i = myParameters.
        //myParameters = myParameters.Replace("{\"CrearOrdenCompra_Res\":", " ");
        //myParameters = myParameters.Remove(myParameters.Length - 1, 1);
        
//    var inputJson = @"{
//    ""Id"":""bb816aa1-feab-4e35-b9be-80f1273d4913"",
//    ""Nombre"":""Pedro"",
//    ""Apellidos"":""Herrarte"",
//    ""FechaNacimiento"":""20/01/1975""}";

        //dynamic jsonObj = JsonConvert.DeserializeObject(myParameters);
        //var numero = jsonObj[0]["Estado"].ToString();
        //var json = Newtonsoft.Json.JsonConvert.SerializeObject(respuesta);
        //Posiciones p = Newtonsoft.Json.JsonConvert.DeserializeObject<Posiciones>(respuesta);
        //Console.Write(p.Estado);
    }   
}