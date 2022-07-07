using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hospital;

public partial class HistoriaClinica_HistoriaClinica : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            txtDesde.Value = Request.QueryString["Desde"];
            txtHasta.Value = Request.QueryString["Hasta"];
            //txtDesde.Value = DateTime.Now.Date.ToShortDateString();
            //txtHasta.Value = DateTime.Now.Date.ToShortDateString();
            long NHC = Convert.ToInt64(Request.QueryString["NHC"]);
            Fecha_Hora.Value = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToString("hh:mm");
            pacientes Paciente = null;
            try
            {
                //NHC = ID ???????????????
                Hospital.PacientesBLL P = new PacientesBLL();
                Paciente = P.Paciente_ID(NHC)[0];
            }
            catch
            {
                Paciente = null;
            }

            //AMBULATORIO
            Hospital.HistoriaClinicaFacturacionBLL H = new Hospital.HistoriaClinicaFacturacionBLL();
            List<lista_anios> Anios = H.Ambulatorio_Anios(NHC,txtDesde.Value,txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
               // UlAmbulatorio.Text = UlAmbulatorio.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",3);'>" + anio.anio + "</a>";
                UlAmbulatorio.Text = UlAmbulatorio.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.Ambulatorio_Meses(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    UlAmbulatorio.Text = UlAmbulatorio.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",3);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                UlAmbulatorio.Text = UlAmbulatorio.Text + "</li>";
            }

            //CIRUGIAS
            Anios = H.Cirugias_Anios(NHC, txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                // CirugiasAnios.Text = CirugiasAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",2);'>" + anio.anio + "</a></li>";
                CirugiasAnios.Text = CirugiasAnios.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.Cirugias_Meses(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    CirugiasAnios.Text = CirugiasAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",2);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                CirugiasAnios.Text = CirugiasAnios.Text + "</li>";
            }

            //INTERNACIONES
            Anios = H.Internaciones_Anios(NHC, txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //InternacionAnios.Text = InternacionAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",1);'>" + anio.anio + "</a></li>";
                InternacionAnios.Text = InternacionAnios.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.Internacion_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    InternacionAnios.Text = InternacionAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",1);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                InternacionAnios.Text = InternacionAnios.Text + "</li>";
            }

            //Recetas
            Anios = H.Recetas_Anios(NHC, txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //RecetasAnios.Text = RecetasAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",4);'>" + anio.anio + "</a></li>";
                RecetasAnios.Text = RecetasAnios.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.Recetas_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    RecetasAnios.Text = RecetasAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",4);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                RecetasAnios.Text = RecetasAnios.Text + "</li>";
            }

            //Guardia
            Anios = H.Guardia_Anios(NHC, txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //UlGuardia.Text = UlGuardia.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",5);'>" + anio.anio + "</a></li>";
                UlGuardia.Text = UlGuardia.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.Guardia_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    UlGuardia.Text = UlGuardia.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",5);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                UlGuardia.Text = UlGuardia.Text + "</li>";
            }

            //Labo
            PacientesBLL pbll = new PacientesBLL();
            Anios = H.Labo_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString(), txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
               // LaboratorioAnios.Text = LaboratorioAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",6);'>" + anio.anio + "</a></li>";
                LaboratorioAnios.Text = LaboratorioAnios.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.Laboratorio_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    LaboratorioAnios.Text = LaboratorioAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",6);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                LaboratorioAnios.Text = LaboratorioAnios.Text + "</li>";
            }

            //INTERCONSULTAS
            Anios = H.Interconsultas_Anios(NHC.ToString(), txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //InterconsultaAnios.Text = InterconsultaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",7);'>" + anio.anio + "</a></li>";
                InterconsultaAnios.Text = InterconsultaAnios.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.Internacion_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    InterconsultaAnios.Text = InterconsultaAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",7);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                InterconsultaAnios.Text = InterconsultaAnios.Text + "</li>";
            }

            //IMAGENES Y ANATOMIA PATOLOGICA
            //SE CONECTA AL SERVIDOR 10.10.8.65
            //SE UTILIZAN LAS TABLAS IMG_TIP_PROTOCOLO (LAS PLANTILLAS)
            //IMG_TIP_IMAGEN (TIPO DE ESTUDIOS)
            //IMG_ESTUDIO (ESTAN LOS ESTUDIOS REALIZADOS A MOSTRAR EN FORMATO DOC)

            if (Paciente.Soc_Id == null)
            {
                Paciente.Soc_Id = "";
            }

            //if (Paciente.Soc_Id != null)
            //{
            //IMAGENES
            Anios = H.Imagenes_Anios(Paciente.Soc_Id.ToString(), pbll.Paciente_ID(NHC)[0].documento.ToString(), txtDesde.Value, txtHasta.Value);
                foreach (lista_anios anio in Anios)
                {
                    axionnumerohc_literal.Text = "<script>var axionnumerohc = '" + Paciente.Soc_Id.ToString() + "';</script>";
                    //ImagenesAnios.Text = ImagenesAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",8);'>" + anio.anio + "</a></li>";
                    ImagenesAnios.Text = ImagenesAnios.Text + "<li><a>" + anio.anio + "</a>";

                    List<lista_meses> Meses = H.Imagenes_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                    foreach (lista_meses mes in Meses)
                    {
                        ImagenesAnios.Text = ImagenesAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",8);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                    }
                    ImagenesAnios.Text = ImagenesAnios.Text + "</li>";
                }
            //}


               // if (Paciente.Soc_Id != null && Paciente.documento.Soc_Id != "")
                if (Paciente.documento.ToString() != null && Paciente.documento.ToString() != "")
            {
                //Anios = H.AnatomiaPatologica_Anios(Paciente.Soc_Id.ToString());
                Anios = H.AnatomiaPatologica_Anios(Paciente.documento.ToString(), txtDesde.Value, txtHasta.Value);
                foreach (lista_anios anio in Anios)
                {
                    //AnatomiaPatologicaAnios.Text = AnatomiaPatologicaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",9);'>" + anio.anio + "</a></li>";
                    AnatomiaPatologicaAnios.Text = AnatomiaPatologicaAnios.Text + "<li><a>" + anio.anio + "</a>";

                    List<lista_meses> Meses = H.Anatomia_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                    foreach (lista_meses mes in Meses)
                    {
                        AnatomiaPatologicaAnios.Text = AnatomiaPatologicaAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",9);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                    }
                    AnatomiaPatologicaAnios.Text = AnatomiaPatologicaAnios.Text + "</li>";
                }
            }


                Anios = H.Endoscopia_Anios(NHC, txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //EndoscopiaAnios.Text = EndoscopiaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",10);'>" + anio.anio + "</a></li>";
                EndoscopiaAnios.Text = EndoscopiaAnios.Text + "<li><a>" + anio.anio + "</a>";

                List<lista_meses> Meses = H.Endoscopia_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    EndoscopiaAnios.Text = EndoscopiaAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",10);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                EndoscopiaAnios.Text = EndoscopiaAnios.Text + "</li>";
            }

            //Labo Bacterio            
            Anios = H.LaboBacterio_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString(), txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //LaboratorioBactrioAnios.Text = LaboratorioBactrioAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",11);'>" + anio.anio + "</a></li>";
                LaboratorioBactrioAnios.Text = LaboratorioBactrioAnios.Text + "<li><a>" + anio.anio + "</a>";
                List<lista_meses> Meses = H.LaboratorioBacterio_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    LaboratorioBactrioAnios.Text = LaboratorioBactrioAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",11);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                LaboratorioBactrioAnios.Text = LaboratorioBactrioAnios.Text + "</li>";
            }
            //Labo Bacterio


            //odontologia            
            Anios = H.Odonto_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString(), txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //OdontologiaAnios.Text = OdontologiaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",12);'>" + anio.anio + "</a></li>";
                OdontologiaAnios.Text = OdontologiaAnios.Text + "<li><a>" + anio.anio + "</a>";

                List<lista_meses> Meses = H.Odontologia_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    OdontologiaAnios.Text = OdontologiaAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",12);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                OdontologiaAnios.Text = OdontologiaAnios.Text + "</li>";
            }
            //odontologia

            //otras instituciones            
            Anios = H.Otras_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString(), txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                //OtrasAnios.Text = OtrasAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",13);'>" + anio.anio + "</a></li>";
                OtrasAnios.Text = OtrasAnios.Text + "<li><a>" + anio.anio + "</a>";

                List<lista_meses> Meses = H.Otras_Mes(NHC, Convert.ToInt32(anio.anio), txtDesde.Value, txtHasta.Value);
                foreach (lista_meses mes in Meses)
                {
                    OtrasAnios.Text = OtrasAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",13);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                OtrasAnios.Text = OtrasAnios.Text + "</li>";

            }
            //otras instituciones


            //escaneos internos       
            Anios = H.Otras_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString(), txtDesde.Value, txtHasta.Value);
            foreach (lista_anios anio in Anios)
            {
                   // InternosAnios.Text = InternosAnios.Text + "<li class='parent' id='" + anio.anio + "' ><a onclick='javascript:CargarAnio(" + anio.anio + ",14);'>" + anio.anio + "</a></li>";



                InternosAnios.Text = InternosAnios.Text + "<li><a>" + anio.anio + "</a>";

                List<otras> Otras = H.Inrernos_by_Anio(NHC.ToString(), anio.anio.ToString(),null ,1);
                foreach (otras otra in Otras)
                    {
                        InternosAnios.Text = InternosAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + otra.documentacion_tipo + ",14);'>" + otra.nombre + "</a></li></ul>";
                    }
                InternosAnios.Text = InternosAnios.Text + "</li>";

            }
            //escaneos internos

        }
    }

    private string Nombredelmes(int intMes)
    {
        string[] Mes = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
        return Mes[intMes - 1];
    }
}