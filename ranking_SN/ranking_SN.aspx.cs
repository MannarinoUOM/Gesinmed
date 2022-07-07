using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class ranking_SN : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

    protected void H2_Gen_List(object sender, EventArgs e)
    {
            int incluirOS;
            int ordena;
            string orden;
            int incluirPractica;
            int cantidad;

            if (rdoOs.Checked) { ordena = 2; } else { ordena = 1; }

            if (rdoAsc.Checked) { orden = "2"; } else { orden = "1"; }

            if (chkIncOs.Checked) { incluirOS = 1; } else { incluirOS = 0; }

            if (chkIncPr.Checked) { incluirPractica = 1; } else { incluirPractica = 0; }

            if (Convert.ToInt32(txtCantidad.Value) == 0 || txtCantidad.Value == "") { cantidad = 0; } else { cantidad = Convert.ToInt32(txtCantidad.Value); }

            if (idsObrasSociales.Text == "") { Response.Write("<script>alert('Seleccione por lo menos una obra social.'); </script>"); return; }

            if (idsPracticas.Text == "") { Response.Write("<script>alert('Seleccione por lo menos una obra práctica.'); </script>"); return; }

            //StringWriter tw = new StringWriter();
            //HtmlTextWriter hw = new HtmlTextWriter(tw);
            //DataGrid dgGrid = new DataGrid();
            //dgGrid.DataSource = adapter.GetData(Convert.ToDateTime(txtDesde.Value), Convert.ToDateTime(txtHasta.Value), 0, cantidad, ordena, orden, incluirOS, idsObrasSociales.Text, incluirPractica, idsPracticas.Text);
            //dgGrid.DataBind();
            //dgGrid.RenderControl(hw);
            //Response.ContentType = "application/xls";
            //Response.AppendHeader("Content-Disposition", "attachment; filename=" + "Ranking_Practicas" + ".xls");
            //Response.Write(tw.ToString());
            //Response.End();
            string mensaje = "SSS Generado";

            ranking_SNDALTableAdapters.H2_INFORMES_RANKING_PRAC_POR_OS_FEC_TESTTableAdapter adapter = new ranking_SNDALTableAdapters.H2_INFORMES_RANKING_PRAC_POR_OS_FEC_TESTTableAdapter();
            ranking_SNDAL.H2_INFORMES_RANKING_PRAC_POR_OS_FEC_TESTDataTable table = new ranking_SNDAL.H2_INFORMES_RANKING_PRAC_POR_OS_FEC_TESTDataTable();
            table = adapter.GetData(Convert.ToDateTime(txtDesde.Value), Convert.ToDateTime(txtHasta.Value), 0, cantidad, ordena, orden, incluirOS, idsObrasSociales.Text, incluirPractica, idsPracticas.Text);

            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            string encabezado = "<table><tr><td><b>Codigo O.S</b></td><td><b>Obra Social</b></td><td><b>Codigo Practica</b></td><td><b>Practica</b></td><td><b>Cantidad</b></td></tr>";
            string fila = "";
            string pie = "</table>";

            foreach (ranking_SNDAL.H2_INFORMES_RANKING_PRAC_POR_OS_FEC_TESTRow row in table.Rows)
            {
                try
                {
                    fila += "<tr><td>" + row.CodOS + "</td><td>" + row.Descripcion + "</td><td>" + row.Id + "</td><td>" + row.Descripcion1 + "</td><td>" + row.Cant_Pr + "</td></tr>";
                }
                catch
                {
                    mensaje = "Ocurrio un Error al Generar el Archivo Excel";
                }
            }
            sb.AppendLine(encabezado + fila + pie);
            string text = sb.ToString();

            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();

            HttpContext.Current.Response.AddHeader("Content-Length", text.Length.ToString());
            HttpContext.Current.Response.ContentType = "application/xls";
            Response.AppendHeader("Content-Disposition", "attachment; filename=" + "Ranking_Practicas" + ".xls");
            HttpContext.Current.Response.Write(text);
            HttpContext.Current.Response.End();
    }
}
