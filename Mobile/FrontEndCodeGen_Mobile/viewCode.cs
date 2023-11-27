using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FrontEndCodeGen_Mobile
{
    public partial class viewCode : Form
    {
        public viewCode()
        {
            InitializeComponent();
            //string text = File.ReadAllText("C://Users//acer//Desktop//WriteTextClone.txt");
            //MessageBox.Show(selectTheme.resultantCode);
            richTextBox1.Text = selectTheme.resultantCode;
            //textBox1.Text = selectTheme.resultantCode;
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            

        }

        private void label4_Click(object sender, EventArgs e)
        {
            this.Hide();
            selectTheme selectTheme = new selectTheme();
            selectTheme.Show();
        }

        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
