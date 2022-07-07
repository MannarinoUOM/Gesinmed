using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de EstudiosComplementariosBLL
/// </summary>
namespace Hospital
{
    public class EstudiosComplementariosBLL
    {
        public EstudiosComplementariosBLL()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }

        public List<EstudiosComp> Estudios_Complementarios_listar()
        {
            EstudiosComplementariosDALTableAdapters.Estudios_Complementarios_ListaTableAdapter adapter = new EstudiosComplementariosDALTableAdapters.Estudios_Complementarios_ListaTableAdapter();
            EstudiosComplementariosDAL.Estudios_Complementarios_ListaDataTable aTable = adapter.GetData();

            List<EstudiosComp> Lista = new List<EstudiosComp>();

            foreach (EstudiosComplementariosDAL.Estudios_Complementarios_ListaRow row in aTable.Rows)
            {
                EstudiosComp estComp = new EstudiosComp();
                estComp.Descripcion = row.Descripcion;
                estComp.Id = row.id;
                Lista.Add(estComp);
            }

            return Lista;
        }

        public List<TipoEstudioComp> Filtro_Estudios_Complementarios(string Descripcion)
        {
            EstudiosComplementariosDALTableAdapters.Filtrar_Estudio_Complementario_Segun_DescripcionTableAdapter adapter = new EstudiosComplementariosDALTableAdapters.Filtrar_Estudio_Complementario_Segun_DescripcionTableAdapter();
            EstudiosComplementariosDAL.Filtrar_Estudio_Complementario_Segun_DescripcionDataTable aTable = adapter.GetData(Descripcion);
            List<TipoEstudioComp> Lista = new List<TipoEstudioComp>();

            foreach (EstudiosComplementariosDAL.Filtrar_Estudio_Complementario_Segun_DescripcionRow row in aTable.Rows)
            {
                TipoEstudioComp tipoEstudios = new TipoEstudioComp();
                tipoEstudios.Descripcion = row.Descripcion;
                tipoEstudios.Id = row.Id;
                tipoEstudios.Codigo = row.Codigo;
                Lista.Add(tipoEstudios);
            }

            return Lista;
        }

        public int Insertar_Historial_Practicas_Complementarias(int idAfiliado,int Id_Medico, int idPractica, string TipoPractica, 
            DateTime fechaPractica,int internado, string columna1, string columna2,
            string columna3, string columna4, string columna5, string columna6,
            string columna7, string Link_Pdf, string Observaciones, DateTime Fecha_Sistema,
            string titulo, string tituloB, DateTime fechaYHora)
        {
            EstudiosComplementariosDALTableAdapters.QueriesTableAdapter adapter = new EstudiosComplementariosDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.Insertar_Historial_Practicas_Complementarias(idAfiliado, Id_Medico, idPractica, TipoPractica,
                fechaPractica, internado, Fecha_Sistema, Observaciones, 
                Link_Pdf,columna1,columna2,columna3,
                columna4,columna5, columna6, columna7,
                titulo,tituloB, fechaYHora));
        }
    }
}
