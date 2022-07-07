using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Informes_Filtrar_Txt_Diabetes : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnTxt_Click(object sender, EventArgs e)
    {
        if (txtDesde.Text == "" || txtHasta.Text == "")
        {
            Response.Write("<script>alert('error'); </script>");

        }

        else
        {
            ReportesDALTableAdapters.H2_AtConsultorio_Diabetes_Generar_TxtTableAdapter adapter = new ReportesDALTableAdapters.H2_AtConsultorio_Diabetes_Generar_TxtTableAdapter();
            ReportesDAL.H2_AtConsultorio_Diabetes_Generar_TxtDataTable table = new ReportesDAL.H2_AtConsultorio_Diabetes_Generar_TxtDataTable();
            table = adapter.GetData(txtDesde.Text, txtHasta.Text);
            string mensaje = "SSS Generado";


            string desde = txtDesde.Text.Replace("/", "");
            string hasta = txtHasta.Text.Replace("/", "");

            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            //string output = Mi_Texto.Text;
            string output = "";
            foreach (ReportesDAL.H2_AtConsultorio_Diabetes_Generar_TxtRow row in table.Rows)
            {
                try
                {

                    string ccfecha;
                    if (row.cc == "000")
                    {
                        ccfecha = row.fechaconsulta;
                    }
                    else { ccfecha = "00000000"; }

                    output =
                        //cuil 1               tipo 2          fecha de registro 3     edad de registro 4           dislipidemia 5            obesidad 6           tabaquismo 7       hiperfia ventar 8  infarto agudo 9   insufi card 10                                                         
                        "|" + row.cuil + "|" + row.tipo + "|" + row.fechaconsulta + "|" + row.edad_diagnostico + "|" + row.dislipidemia + "|" + row.obesidad + "|" + row.tabaquismo + "|" + "00000000" + "|" + "00000000" + "|" + "00000000" + "|"// 10 campos

                        //acv 11          retinopatia 12         ceguera 13         neuropati 14            vasc 15               16             nefropati 17               18                 19             glucemia 20                                                                        
                       + row.acv + "|" + row.retinopatia + "|" + "00000000" + "|" + row.neuropatia + "|" + "00000000" + "|" + "00000000" + "|" + row.nefropatia + "|" + "00000000" + "|" + "00000000" + "|" + row.glucemiaAyunoUltimo + "|"  // 10 campos

                      // glucemia fecha 21                       hba1c 22              hba1c fecha 23              24             25             26             27              28             29               30    
                     + row.glucemiaAyunoUltimoFecha + "|" + row.HBA1CUltimo + "|" + row.HBA1CUltimoFecha + "|" + "0" + "|" + "00000000" + "|" + "0" + "|" + "00000000" + "|" + "0" + "|" + "00000000" + "|" + "000" + "|" // 10 campos

                     //    31               32              33             creatinina  34         creatin fech  35          fondo ojo 36           ojo fech 37             peso 38          peso fecha 39            talla 40
                     + "00000000" + "|" + "000" + "|" + "00000000" + "|" + row.creatinina + "|" + row.fechaconsulta + "|" + row.fondoojo + "|" + row.fechafondoojo + "|" + row.peso + "|" + row.fechaconsulta + "|" + row.talla + "|" // 10 campos

                      //talla fecha  41           cc  42     cc fecha 43          44         45           46         47          48          49              hipoglucemi orales 50
                      + row.fechaconsulta + "|" + row.cc + "|" + ccfecha + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0" + "|" + "0" + "|" + row.hipoglucemiantesOrales + "|" // 10 campos

                      //  insuli basal  51         insul correccion  52
                        // + "40" + "|" + "42" + "|"
                       + row.insulinabasal + "|" + row.insulinadecorrecion + "|"
                       ;
                    sb.Append(output);
                    sb.Append("\r\n");
                }
                catch
                {
                    mensaje = "Ocurrio un Error al Generar el Archivo SSS";
                    //return mensaje;
                }
            }

            string text = sb.ToString();

            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();

            HttpContext.Current.Response.AddHeader("Content-Length", text.Length.ToString());
            HttpContext.Current.Response.ContentType = "text/plain";
            //HttpContext.Current.Response.AppendHeader("content-disposition", "attachment;filename=\"Mi_Ejemplo.txt\"");
            HttpContext.Current.Response.AppendHeader("content-disposition", "attachment;filename=\"Diabetes" + desde + "_" + hasta + ".txt\"");
            HttpContext.Current.Response.Write(text);
            HttpContext.Current.Response.End();



        }
    }
    }
    
