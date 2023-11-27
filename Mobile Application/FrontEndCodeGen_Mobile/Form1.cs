using System.Data;
using System.Xml;
using System.Xml.Linq;
using System.Windows.Forms;

namespace FrontEndCodeGen_Mobile
{
   

    public partial class Form1 : Form
    {
        public static String xmlFilePath = "";
        public static String folderPath = "";
        public static DataSet myDataSet = new DataSet();
        String XMLFilePath;

        public Form1()
        {
            InitializeComponent();
            xmlPath.Hide();
            String folderPathLocal = "D://Frontend_Codegen_Mobile";
            folderPathTxtBox.Text = folderPathLocal.ToString().Trim();
            folderPathTxtBox.ReadOnly = true;
            //
            folderPath = folderPathTxtBox.Text;

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void panel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void panel3_Paint(object sender, PaintEventArgs e)
        {

        }

        private void tableLayoutPanel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() == DialogResult.OK)
            {
                // this.XMLFilePath = openFileDialog.FileName;
                xmlFilePath = openFileDialog.FileName;
                MessageBox.Show("File is uploaded");
                xmlPath.Text = xmlFilePath;
                xmlPath.Show();

                //create directory if it does not exist
                String folderStruct = folderPathTxtBox.Text.ToString();
                bool isFolderPathValid = true;
                if (!Directory.Exists(folderStruct))
                {
                    try
                    {
                        Directory.CreateDirectory(folderStruct);
                        MessageBox.Show("Folder created successfully!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        MessageBox.Show("Please change the folder path to store source code files!");
                        isFolderPathValid = false;
                    }
                }


                //next button to navigate

                this.Hide();
                viewComponents form = new viewComponents();
                form.Show();

            }

        }

        private void button2_Click(object sender, EventArgs e)
        {

            this.Hide();
            viewComponents form = new viewComponents();
            form.Show();
        }

        private void tableLayoutPanel2_Paint_1(object sender, PaintEventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void button5_Click(object sender, EventArgs e)
        {

        }

        private void tableLayoutPanel3_Paint(object sender, PaintEventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            
        }


        private void tableLayoutPanel1_Paint_1(object sender, PaintEventArgs e)
        {
            
        }

        private void button6_Click(object sender, EventArgs e)
        {

        }

        private void button4_Click(object sender, EventArgs e)
        {

        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void panel5_Paint(object sender, PaintEventArgs e)
        {

        }

        private void label2_Click_1(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void label5_Click(object sender, EventArgs e)
        {

        }



        private void textBox1_TextChanged(object sender, EventArgs e)
        {
           
        }


        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void label7_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox2_Click(object sender, EventArgs e)
        {

        }

        private void changeFolderBtn_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            dialog.ShowNewFolderButton = true;
            DialogResult result = dialog.ShowDialog();
            if (result == DialogResult.OK)
            {
                folderPathTxtBox.Text = dialog.SelectedPath;
                folderPath = folderPathTxtBox.Text;
            }
        }
    }
}