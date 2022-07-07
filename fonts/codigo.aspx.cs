using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Drawing.Text;
using System.Drawing.Imaging;
using System.IO;

public partial class fonts_codigo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    
    protected void Button1_Click(object sender, EventArgs e)
    {
        Image1.ImageUrl = string.Format(@"code.ashx?code={0}&format={1}" + "&width=400&height=60&size=50", TextBox1.Text, "0");
        Image1.Visible = true;
    }
}