<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Internacion_Censo.aspx.cs" Inherits="Impresiones_Internacion_Censo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/GridView.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
 <div style="width: 500px; padding-left: 2px">
        <div style="text-align:right">
            <asp:Label runat="server" ID="lblFechaActual1" Visible="false"></asp:Label>
        </div>
        <div class="title" style="font-size:medium; text-align:center; font-size:large; font-weight:bold; text-decoration:underline;">
            CENSO DIARIO ACTUAL <br />
            DEL <asp:Label runat="server" ID="lblFechaActual"></asp:Label><asp:Label runat="server" ID="lblFecha" Visible="false"></asp:Label>
        </div>
        <br />
        <asp:Repeater runat="server" ID="repeater1" OnItemDataBound="repeater1_ItemDataBound">
            <ItemTemplate>
            <br /> 
            <table border="1" bgcolor="#D8D8D8">
            <tr>
                <td>
                <div class="divServicio" style="font-size:medium; font-weight:bold;">
                    <span>Servicio: </span>
                    <asp:Label runat="server" ID="lblServicio" Text='<%# Bind("ServicioDescripcion") %>'></asp:Label>
                </div>
                </td>
            </tr>
            </table>

                <asp:Repeater runat="server" ID="repeater2" OnItemDataBound="repeater2_ItemDataBound">
                    <ItemTemplate>
                                                    
                                <div class="divSala" style="font-size:medium;">
                                 <table border="1">
                                    <tr>
                                        <td>
                                    <asp:Label runat="server" ID="lblSala" Text='<%# Bind("SalaDescripcion") %>'></asp:Label>
                                                                </td>
                        </tr>
                        </table>
                                    </div>
                            <div class="grid" style="font-size:small;">
                            <asp:GridView runat="server" ID="gvCama" AutoGenerateColumns="false" EmptyDataText="Sala sin camas"
                                ShowHeader="true" DataKeyNames="CamaId" Width="100%" GridLines="None">
                                <Columns>
                                   <%-- <asp:BoundField DataField="InternacionId" HeaderText="N. Int" ItemStyle-Width="20px" HeaderStyle-Width="20px" HeaderStyle-CssClass="gvheader" />--%>
                                    <asp:BoundField DataField="CamaDescripcion" HeaderText="Cama" ItemStyle-Width="20px" HeaderStyle-Width="20px" HeaderStyle-CssClass="gvheader" ItemStyle-CssClass="hr"/>
                                    <asp:BoundField DataField="Fecha" DataFormatString="{0:dd/MM/yyyy}" HeaderText="Fecha"
                                        HeaderStyle-CssClass="gvheader" HeaderStyle-Width="20px" ItemStyle-HorizontalAlign="Center" ItemStyle-Width="20px" ItemStyle-CssClass="hr"/>
                                    <asp:BoundField DataField="Hora" DataFormatString="{0:HH:mm}" HeaderText="Hora"
                                        HeaderStyle-CssClass="gvheader" HeaderStyle-Width="20px" ItemStyle-HorizontalAlign="Center" ItemStyle-Width="20px" ItemStyle-CssClass="hr"/>
                                    <asp:BoundField DataField="NroHC" HeaderText="Nro HC" HeaderStyle-Width="150px" ItemStyle-Width="100px"  HeaderStyle-CssClass="gvheader" ItemStyle-CssClass="hr" />
                                    <asp:BoundField DataField="NombreYApellido" HeaderText="Nombre" HeaderStyle-Width="150px"
                                        HeaderStyle-CssClass="gvheader" ItemStyle-Width="200px" ItemStyle-CssClass="hr"/>
                                        <asp:BoundField DataField="Edad" HeaderText="Edad" HeaderStyle-Width="70px"
                                        HeaderStyle-CssClass="gvheader" ItemStyle-Width="70px" ItemStyle-CssClass="hr"/>
                                        <asp:BoundField DataField="Sexo" HeaderText="S" HeaderStyle-Width="70px"
                                        HeaderStyle-CssClass="gvheader" ItemStyle-Width="70px" ItemStyle-CssClass="hr"/>
                                    <asp:BoundField DataField="OS" HeaderText="Seccional" HeaderStyle-Width="150px"
                                        HeaderStyle-CssClass="gvheader" ItemStyle-Width="200px" ItemStyle-CssClass="hr"/>
                                    <asp:BoundField DataField="Diagnostico" HeaderText="Diagnostico" HeaderStyle-Width="120px"
                                        HeaderStyle-CssClass="gvheader" ItemStyle-Width="100px" ItemStyle-CssClass="hr"/>
                                    <asp:BoundField DataField="EspecialidadDescripcion" HeaderText="Especialidad" ItemStyle-Width="100px" HeaderStyle-Width="120px"
                                        HeaderStyle-CssClass="gvheader" ItemStyle-CssClass="hr"/>
                                    <asp:BoundField DataField="Dias" HeaderText="Cant. Dias Internado" HeaderStyle-Width="150px" ItemStyle-Width="100px"  HeaderStyle-CssClass="gvheader" ItemStyle-CssClass="hr"/>
                                    <%--<asp:BoundField DataField="Edad" HeaderText="Edad" HeaderStyle-Width="40px" />--%>
                                </Columns>
                            </asp:GridView>
                            
                            <div class="divSubtotales">
                                <asp:Label runat="server" ID="Label9" Text="Total de Camas "></asp:Label>
                                <asp:Label runat="server" ID="Label8" Text='<%# Bind("TotalDeCamas") %>'></asp:Label>
                                &nbsp;&nbsp;
                                <asp:Label runat="server" ID="Label10" Text="Ocupadas "></asp:Label>
                                <asp:Label runat="server" ID="Label12" Text='<%# Bind("Ocupadas") %>'></asp:Label>
                                &nbsp;&nbsp;
                                <asp:Label runat="server" ID="Label13" Text="Libres "></asp:Label>
                                <asp:Label runat="server" ID="Label14" Text='<%# Bind("Libres") %>'></asp:Label>
                                 &nbsp;&nbsp;
                               <asp:Label runat="server" ID="Label15" Text="% Ocupadas "></asp:Label>
                                <asp:Label runat="server" ID="Label16" Text='<%# Bind("OcupadasPorcentaje") %>'></asp:Label>
                                &nbsp;&nbsp;
                                <asp:Label runat="server" ID="Label17" Text="% Libres "></asp:Label>
                                <asp:Label runat="server" ID="Label18" Text='<%# Bind("LibresPorcentaje") %>'></asp:Label>
                            </div>
                        </div>
                    </ItemTemplate>
                    
                </asp:Repeater>
            </ItemTemplate>
            
        </asp:Repeater>
        <asp:Label ID="cad" runat="server" Text="" Visible="False"></asp:Label>
    </div>
    </form>
</body>
</html>
