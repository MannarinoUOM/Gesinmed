using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;


public partial class panel : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

            DirectoryInfo di = new DirectoryInfo(@"C:\Users\Manuel\Central\img");
            Console.WriteLine("No search pattern returns:");
            string Tabla =  "<table style='margin:auto'><tr>";
            int i = 0;
            foreach (var fi in di.GetFiles())
            {
                
                if (fi.Name != "fondo.jpg")
                {

                    if (i == 7)
                    {
                        Tabla += "</tr><tr>" +
                                 "<td><div class='flip-container'>" +
                                 "<div class='flipper'>" +
                                 "<label>"+ i +"</label><div class='back' style='float:right'><img width='100' heigth='100' src='../Central/img/" + fi.Name + "'/></div>" +
                                 "<div class='front' style='float:right'><img width='100' heigth='100' src='../Central/img/fondo.jpg'/></div>" +
                                 "</div>" +
                                 "</div>" +
                                 "</td>";
                        i = 0;
                    }
                    else {
              Tabla +=
             "<td><div class='flip-container'>" +
             "<div class='flipper'>" +
             "<div class='back' style='float:right'><img width='100' heigth='100' src='../Central/img/" + fi.Name + "'/></div>" +
             "<div class='front' style='float:right'><img width='100' heigth='100' src='../Central/img/fondo.jpg'/></div>" +
             "</div>" +
             "</div>" +
             "</td>";
                    
                    }
                    i += 1;
                }
                
            }
            Tabla += "</table>";
            Label1.Text = Tabla;
    
    }
}