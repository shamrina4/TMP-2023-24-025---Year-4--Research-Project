using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;
using System.Xml.Linq;

namespace FrontEndCodeGen_Mobile
{
    public partial class viewComponents : Form
    {
        public static String xmlFilePath = Form1.xmlFilePath;

        public viewComponents()
        {
            InitializeComponent();

            DataTable table = new DataTable();
            BindingSource SBind = new BindingSource();
            SBind.DataSource = table;
            DataGridView ServersTable = new DataGridView();

            // DataTable table = new DataTable();
            table.Columns.Add("COMPONENT NAME", typeof(string));
            table.Columns.Add("TYPE", typeof(string));
            table.Columns.Add("NAME", typeof(string));

            XmlDocument doc = new XmlDocument();
            //doc.Load("C://Users//acer//Desktop//XMLV1.xml");
            doc.Load(xmlFilePath);

            //XDocument xDoc = XDocument.Load("C://Users//acer//Desktop//XMLV1.xml");
            XDocument xDoc = XDocument.Load(xmlFilePath);

            var nodes = doc.DocumentElement.ChildNodes[0].ChildNodes[0].Name;


            if (nodes.Equals("Form"))
            {


                XmlNodeList nodelist = doc.DocumentElement?.ChildNodes[0].ChildNodes[0]?.ChildNodes;
                foreach (XmlNode xmlNode in nodelist!)
                {
                    if (xmlNode.Attributes == null) continue;

                    String name = xmlNode.Attributes["Name"]?.Value;
                    String type = xmlNode.Attributes["x:type"]?.Value;

                    table.Rows.Add(xmlNode.Name.ToString(), type, name);



                }

            }
            else
            {
                XmlNodeList nodelist = doc.DocumentElement?.ChildNodes[0]?.ChildNodes;
                foreach (XmlNode xmlNode in nodelist!)
                {
                    if (xmlNode.Attributes == null) continue;

                    var cur = xmlNode.Attributes["type"]?.Value;
                    var rate = xmlNode.Attributes["name"]?.Value;

                    Console.WriteLine($"{cur}: {rate}");
                }
            }

            dataGridView1.DataSource = table;
            dataGridView1.Columns[0].Width = 230;
            dataGridView1.Columns[1].Width = 225;
            dataGridView1.Columns[2].Width = 225;

        }
    

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.Hide();
            selectTheme form = new selectTheme();
            form.Show();
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            Form1 form = new Form1();
            form.Show();
        }
    }
}
