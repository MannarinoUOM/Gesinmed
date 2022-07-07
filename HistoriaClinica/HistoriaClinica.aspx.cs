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

            Hospital.HistoriaClinicaBLL H = new Hospital.HistoriaClinicaBLL();
            List<lista_anios> Anios = H.Ambulatorio_Anios(NHC);
            foreach (lista_anios anio in Anios)
            {
                UlAmbulatorio.Text = UlAmbulatorio.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",3);'>" + anio.anio + "</a>";

                List<lista_meses> Meses = H.Ambulatorio_Meses(NHC, Convert.ToInt32(anio.anio));
                foreach (lista_meses mes in Meses)
                {
                    UlAmbulatorio.Text = UlAmbulatorio.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",3);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                UlAmbulatorio.Text = UlAmbulatorio.Text + "</li>";
            }

            //PRACTICA ESPECIALISTA
            Anios = H.Especialista_Anios(NHC);
            foreach (lista_anios anio in Anios)
            {
                UlEspecialistaAnios.Text = UlEspecialistaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",15);'>" + anio.anio + "</a>";

                List<lista_meses> Meses = H.Especialista_Meses(NHC, Convert.ToInt32(anio.anio));
                foreach (lista_meses mes in Meses)
                {
                    UlEspecialistaAnios.Text = UlEspecialistaAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",15);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                UlEspecialistaAnios.Text = UlEspecialistaAnios.Text + "</li>";
            }
            //PRACTICA ESPECIALISTA

            Anios = H.Cirugias_Anios(NHC);
            foreach (lista_anios anio in Anios)
            {
                CirugiasAnios.Text = CirugiasAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",2);'>" + anio.anio + "</a></li>";
            }

            Anios = H.Internaciones_Anios(NHC);
            foreach (lista_anios anio in Anios)
            {
                InternacionAnios.Text = InternacionAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",1);'>" + anio.anio + "</a></li>";
            }

            //Recetas
            Anios = H.Recetas_Anios(NHC);
            foreach (lista_anios anio in Anios)
            {
                RecetasAnios.Text = RecetasAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",4);'>" + anio.anio + "</a></li>";
            }
            //Guardia
            Anios = H.Guardia_Anios(NHC);
            foreach (lista_anios anio in Anios)
            {
                UlGuardia.Text = UlGuardia.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",5);'>" + anio.anio + "</a></li>";
            }
            //Labo
            PacientesBLL pbll = new PacientesBLL();
            Anios = H.Labo_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString());
            foreach (lista_anios anio in Anios)
            {
                LaboratorioAnios.Text = LaboratorioAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",6);'>" + anio.anio + "</a></li>";
            }
            Anios = H.Interconsultas_Anios(NHC.ToString());
            foreach (lista_anios anio in Anios)
            {
                InterconsultaAnios.Text = InterconsultaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",7);'>" + anio.anio + "</a></li>";
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
                Anios = H.Imagenes_Anios(Paciente.Soc_Id.ToString(), pbll.Paciente_ID(NHC)[0].documento.ToString());
                foreach (lista_anios anio in Anios)
                {
                    axionnumerohc_literal.Text = "<script>var axionnumerohc = '" + Paciente.Soc_Id.ToString() + "';</script>";
                    ImagenesAnios.Text = ImagenesAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",8);'>" + anio.anio + "</a></li>";
                }
            //}


               // if (Paciente.Soc_Id != null && Paciente.documento.Soc_Id != "")
                if (Paciente.documento.ToString() != null && Paciente.documento.ToString() != "")
            {
                //Anios = H.AnatomiaPatologica_Anios(Paciente.Soc_Id.ToString());
                Anios = H.AnatomiaPatologica_Anios(Paciente.documento.ToString());
                foreach (lista_anios anio in Anios)
                {
                    AnatomiaPatologicaAnios.Text = AnatomiaPatologicaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",9);'>" + anio.anio + "</a></li>";
                }
            }


            Anios = H.Endoscopia_Anios(NHC);
            foreach (lista_anios anio in Anios)
            {
                EndoscopiaAnios.Text = EndoscopiaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",10);'>" + anio.anio + "</a></li>";
            }

            //Labo Bacterio            
            Anios = H.Labo_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString());
            foreach (lista_anios anio in Anios)
            {
                LaboratorioBactrioAnios.Text = LaboratorioBactrioAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",11);'>" + anio.anio + "</a></li>";
            }
            //Labo Bacterio


            //odontologia            
             Anios = H.Odonto_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString());
            foreach (lista_anios anio in Anios)
            {
                OdontologiaAnios.Text = OdontologiaAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",12);'>" + anio.anio + "</a></li>";
            }
            //odontologia

            //otras instituciones            
            Anios = H.Otras_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString());
            foreach (lista_anios anio in Anios)
            {
                OtrasAnios.Text = OtrasAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",13);'>" + anio.anio + "</a></li>";
            }
            //otras instituciones



            //otras instituciones            
            Anios = H.Complementarios_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString());
            foreach (lista_anios anio in Anios)
            {
                ComplementariosAnios.Text = ComplementariosAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",18);'>" + anio.anio + "</a></li>";
            }
            //otras instituciones


            //escaneos internos       
            Anios = H.Otras_Anios(pbll.Paciente_ID(NHC)[0].documento.ToString());
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


            //HEMODINAMIA INTERNACION
            Anios = H.Hemodinamia_Anios(NHC,1);
            foreach (lista_anios anio in Anios)
            {
                HemoInternacionAnios.Text = HemoInternacionAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",16);'>" + anio.anio + "</a>";

                List<lista_meses> Meses = H.Hemodinamia_Meses(NHC, Convert.ToInt32(anio.anio),1);
                foreach (lista_meses mes in Meses)
                {
                    HemoInternacionAnios.Text = HemoInternacionAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",16);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                HemoInternacionAnios.Text = HemoInternacionAnios.Text + "</li>";
            }

            //AMBULATORIO
            Anios = H.Hemodinamia_Anios(NHC, 2);
            foreach (lista_anios anio in Anios)
            {
                HemoAmbulatorioAnios.Text = HemoAmbulatorioAnios.Text + "<li><a onclick='javascript:CargarAnio(" + anio.anio + ",17);'>" + anio.anio + "</a>";

                List<lista_meses> Meses = H.Hemodinamia_Meses(NHC, Convert.ToInt32(anio.anio), 2);
                foreach (lista_meses mes in Meses)
                {
                    HemoAmbulatorioAnios.Text = HemoAmbulatorioAnios.Text + "<ul><li><a onclick='javascript:CargarAnioyMes(" + anio.anio + "," + mes.mes + ",17);'>" + Nombredelmes(Convert.ToInt32(mes.mes)) + "</a></li></ul>";
                }
                HemoAmbulatorioAnios.Text = HemoAmbulatorioAnios.Text + "</li>";
            }
            //HEMODINAMIA

        }
    }

    private string Nombredelmes(int intMes)
    {
        string[] Mes = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
        return Mes[intMes - 1];
    }
}