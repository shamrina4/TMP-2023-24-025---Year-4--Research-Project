using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;
using System.Xml.Linq;

namespace FrontEndCodeGen_Mobile
{
    public partial class selectTheme : Form
    {
        public static String xmlFilePath = Form1.xmlFilePath;
        public static String folderPath = Form1.folderPath;
        String theme = "blue";
        public static String resultantCode = "";
        
        public selectTheme()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.theme = "default";
            //GenerateCode(theme);
            MobileCodeGeneration();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.theme = "blue";
            //GenerateCode(theme);
            MobileCodeGeneration();
        }

        private void pictureBox2_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }


        private void GenerateCode(String themeName)
        {


            String backgroundColor = "blue", buttonColor = "468466", headerColor = "black", buttonText = "black", labelColour = "black";

            switch (themeName)
            {

                case "default":
                    backgroundColor = "ede6a3";
                    buttonColor = "468466";
                    buttonText = "fff6bc";
                    labelColour = "000000";
                    headerColor = "4db886";
                    break;

                case "blue":
                    backgroundColor = "c1e3ed";
                    buttonColor = "78aed3";
                    buttonText = "d2e1e6";
                    labelColour = "000000";
                    headerColor = "4f77aa";
                    break;

                case "theme3":
                    backgroundColor = "ffb997";
                    buttonColor = "0b032d";
                    buttonText = "f67e7d";
                    labelColour = "000000";
                    headerColor = "621940";
                    break;

                case "theme4":
                    backgroundColor = "CAB7A1";
                    buttonColor = "AC3834";
                    buttonText = "B29576";
                    labelColour = "000000";
                    headerColor = "881D1D";
                    break;

                case "theme5":
                    backgroundColor = "FAF2E6";
                    buttonColor = "A62C2C";
                    buttonText = "80A1C2";
                    labelColour = "000000";
                    headerColor = "6683A9";
                    break;

                case "theme6":
                    backgroundColor = "CFE3F1";
                    buttonColor = "C0D7EA";
                    buttonText = "FFADA8";
                    labelColour = "000000";
                    headerColor = "FFCBCB";
                    break;


            }


            //for both forms and non forms
            String codeBegin = "import 'package:flutter/material.dart';" + "\r\n" + "\r\n" + "void main() {" + "\r\n \t" +
                            "runApp( MyApp());" + "\r\n" + "}" + "\r\n" + "\r\n" + "class MyApp extends StatelessWidget {"
                            + "\r\n \t" + "Widget build(BuildContext context) {" + "\r\n \t" + "return MaterialApp(" + "\r\n \t\t" + " home: Scaffold("
                            + "\r\n \t\t\t\t" + "backgroundColor: Color(0xFF" + backgroundColor + ")," + "\r\n \t\t\t" + "appBar: AppBar(" +
                            "\r\n \t\t\t\t" + "title: const Text('Welcome to My App')," + "\r\n \t\t\t" + ")," + "\r\n \t\t\t";

            //only for non forms  
            String codeBody = "body: Container("
                           + "\r\n \t\t\t\t" + "child: Center(" + "\r\n \t\t\t\t\t" + "child: Column(";

            //only for non forms
            String codeEnd = "\r\n \t\t\t\t\t" + ")," + "\r\n \t\t\t\t" + ")," + "\r\n \t\t\t" + ")," +
                "\r\n \t\t" + ")," + "\r\n \t" + ");" + "\r\n " + "}" + "}";

            //only for forms
            String codeEndForms = "body: MyCustomForm()," + "\r\n \t\t\t" + ")," + "\r\n \t" + ");" + "\r\n " + "}" + "}"
                + "\n\n// Create a Form widget." + "\n" + "class MyCustomForm extends StatefulWidget"
                    + "{\n" + "\tMyCustomFormState createState() {" + "\n\t\treturn MyCustomFormState();" + "\n\t}" + "\n}";



            XmlDocument doc = new XmlDocument();
            //doc.Load("C://Users//acer//Desktop//XMLV1.xml");
            doc.Load(xmlFilePath);

            //XDocument xDoc = XDocument.Load("C://Users//acer//Desktop//XMLV1.xml")
            XDocument xDoc = XDocument.Load(xmlFilePath);

            var nodes = doc.DocumentElement.ChildNodes[0].ChildNodes[0].Name;
            //Console.WriteLine(doc.DocumentElement.ChildNodes[0].ChildNodes[0].Name);


            if (nodes.Equals("Form"))
            {
                String codeBeginForm = "\n\nclass MyCustomFormState extends State<MyCustomForm> { " + " \n\t" + "//a global key that uniquely identifies" +
                " the Form widget and allows validation of the form"
                + " \n\t" + "final _formKey = GlobalKey<FormState>();" + "\n\t" + "Widget build(BuildContext context) {  " + " \n\t" +
                " return Form(  " + "\n\t\t" + "key: _formKey," + "\n\t\t" + "child: Center( " + "child: Column( " + "\n\t\t\t"
                + "crossAxisAlignment: CrossAxisAlignment.start," + "\n\t\t\t" + "children: <Widget>[";


                String codeEndForm = "\n\t\t\t" + "]," + "\n\t\t" + "),)," + " \n\t" + ");" + "\n" + "} }" + "\n";


                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeBegin);
                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeEndForms);
                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeBeginForm);

                if (!File.Exists(@folderPath + "//WriteTextClone.txt"))
                {
                    try
                    {
                        File.WriteAllTextAsync(@folderPath + "//WriteTextClone.txt", "");
                        MessageBox.Show("File created successfully!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        MessageBox.Show("File cannot be created");
                       
                    }
                }

                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeBegin);
                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeEndForms);
                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeBeginForm);

                //append the code
                resultantCode = codeBegin;
                resultantCode = resultantCode + codeEndForms;
                resultantCode = resultantCode + codeBeginForm;

                XmlNodeList nodelist = doc.DocumentElement?.ChildNodes[0].ChildNodes[0]?.ChildNodes;
                foreach (XmlNode xmlNode in nodelist!)
                {
                    if (xmlNode.Attributes == null) continue;

                    String content = xmlNode.Attributes["Content"]?.Value;
                    String type = xmlNode.Attributes["x:type"]?.Value;

                    String codeInput = "\n\t\t\t\t" + "TextFormField(" + "\n\t\t\t\t\t" + "decoration: const InputDecoration( " + "\n\t\t\t\t\t\t" + "hintText: '" + content
                    + "',\n\t\t\t\t\t" + "labelText: '" + content + "'," + "\n\t\t\t\t\t" + ")," + "\n\t\t\t\t\t//Validate input fields" + "\n\t\t\t\t\t" + "validator: (value) {" +
                    "\n\t\t\t\t\t\t" + "if (value!.isEmpty) { " + "\n\t\t\t\t\t\t\t" + " return 'Please enter valid input';" + "\n\t\t\t\t\t\t" + "}" +
                    "\n\t\t\t\t\t\t" + "return null;" + "\n\t\t\t\t\t" + "}," + "\n\t\t\t\t" + "),";

                    String codeButton = "\n\t\t\t\t" + "new Container( " + "\n\t\t\t\t\t" + "padding: EdgeInsets.all(5),"
                 + "\n\t\t\t\t\t" + "child: new RaisedButton(" + "\n\t\t\t\t\t\t" +
                "child: Text('" + content + "', style: TextStyle(" + "\n\t\t\t\t\t\t" + "fontSize: 18," + "\n\t\t\t\t\t\t" + ")" + ")," + "\n\t\t\t\t\t\t" + "\n\t\t\t\t\t\t" + "textColor: Color(0xFF" + buttonText + ")," + "\n\t\t\t\t\t\t" +
                 "color: Color(0xFF" + buttonColor + ")," + "\n\t\t\t\t\t\t" + "onPressed: () { }," + "\n\t\t\t\t\t" + ")),";

                    String codeHeader = "\n\t\t\t\t" + " Text( '" + content + "'," + "\n\t\t\t\t" + "style: TextStyle(" + "\n\t\t\t\t" + "color: Color(0xFF" +
                        headerColor + ")," + "\n\t\t\t\t" + "fontSize: 30," + "\n\t\t\t\t" + "fontWeight: FontWeight.bold)"
                        + "\n\t\t\t\t" + "),";

                    String codeLabel = "\n\t\t\t\t" + " Text( '" + content + "'," + "\n\t\t\t\t" + "style: TextStyle(" + "\n\t\t\t\t" + "color: Color(0xFF" +
                        labelColour + ")," + "\n\t\t\t\t" + "fontSize: 20," + "\n\t\t\t\t" + ")"
                        + "\n\t\t\t\t" + "),";

                    String codeHorizontalLine = "\n\t\t\t\tDivider(" + "\n\t\t\t\t\t" + "color: Color(0xFF" + buttonColor + ")\n\t\t\t\t\t),";

                    switch (type)
                    {
                        case "input":
                            resultantCode = resultantCode + codeInput;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeInput);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeInput);
                            break;

                        case "header":
                            resultantCode = resultantCode + codeHeader;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeHeader);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeHeader);
                            break;

                        case "button":
                            resultantCode = resultantCode + codeButton;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeButton);
                            File.AppendAllText (@folderPath +"//WriteTextClone.txt" , codeButton);
                            break;

                        case "horizontal-line":
                            resultantCode = resultantCode + codeHorizontalLine;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeHorizontalLine);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeHorizontalLine);
                            break;

                        case "label":
                            resultantCode = resultantCode + codeLabel;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeLabel);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeLabel);
                            break;

                        default:
                            break;
                    }



                }
                resultantCode = resultantCode + codeEndForm;
                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeEndForm);
                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeEndForm);

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

            MessageBox.Show("Your code is generated!");
            this.Hide();
            viewCode form = new viewCode();
            form.Show();
        }

        private void MobileCodeGeneration()
        {
            String backgroundColor = "ede6a3", buttonColor = "468466",
            buttonText = "fff6bc",
            labelColour = "000000",
            headerColor = "4db886" ;

            //for both forms and non forms
            String codeBegin = "import 'package:flutter/material.dart';" + "\r\n" + "\r\n" + "void main() {" + "\r\n \t" +
                            "runApp( MyApp());" + "\r\n" + "}" + "\r\n" + "\r\n" + "class MyApp extends StatelessWidget {"
                            + "\r\n \t" + "Widget build(BuildContext context) {" + "\r\n \t" + "return MaterialApp(" + "\r\n \t\t" + " home: Scaffold("
                            + "\r\n \t\t\t\t" + "backgroundColor: Color(0xFF" + backgroundColor + ")," + "\r\n \t\t\t" + "appBar: AppBar(" +
                            "\r\n \t\t\t\t" + "title: const Text('Welcome to My App')," + "\r\n \t\t\t" + ")," + "\r\n \t\t\t";

            //only for non forms  
            String codeBody = "body: Container("
                           + "\r\n \t\t\t\t" + "child: Center(" + "\r\n \t\t\t\t\t" + "child: Column(";

            //only for non forms
            String codeEnd = "\r\n \t\t\t\t\t" + ")," + "\r\n \t\t\t\t" + ")," + "\r\n \t\t\t" + ")," +
                "\r\n \t\t" + ")," + "\r\n \t" + ");" + "\r\n " + "}" + "}";

            //only for forms
            String codeEndForms = "body: MyCustomForm()," + "\r\n \t\t\t" + ")," + "\r\n \t" + ");" + "\r\n " + "}" + "}"
                + "\n\n// Create a Form widget." + "\n" + "class MyCustomForm extends StatefulWidget"
                    + "{\n" + "\tMyCustomFormState createState() {" + "\n\t\treturn MyCustomFormState();" + "\n\t}" + "\n}";



            XmlDocument doc = new XmlDocument();
            //doc.Load("C://Users//acer//Desktop//XMLV1.xml");
            doc.Load(xmlFilePath);

            //XDocument xDoc = XDocument.Load("C://Users//acer//Desktop//XMLV1.xml")
            XDocument xDoc = XDocument.Load(xmlFilePath);

            var nodes = doc.DocumentElement.ChildNodes[0].ChildNodes[0].Name;
            //Console.WriteLine(doc.DocumentElement.ChildNodes[0].ChildNodes[0].Name);


            if (nodes.Equals("Form"))
            {
                String codeBeginForm = "\n\nclass MyCustomFormState extends State<MyCustomForm> { " + " \n\t" + "//a global key that uniquely identifies" +
                " the Form widget and allows validation of the form"
                + " \n\t" + "final _formKey = GlobalKey<FormState>();" + "\n\t" + "Widget build(BuildContext context) {  " + " \n\t" +
                " return Form(  " + "\n\t\t" + "key: _formKey," + "\n\t\t" + "child: Center( " + "child: Column( " + "\n\t\t\t"
                + "crossAxisAlignment: CrossAxisAlignment.start," + "\n\t\t\t" + "children: <Widget>[";


                String codeEndForm = "\n\t\t\t" + "]," + "\n\t\t" + "),)," + " \n\t" + ");" + "\n" + "} }" + "\n";


                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeBegin);
                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeEndForms);
                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeBeginForm);

                if (!File.Exists(@folderPath + "//WriteTextClone.txt"))
                {
                    try
                    {
                        File.WriteAllTextAsync(@folderPath + "//WriteTextClone.txt", "");
                        MessageBox.Show("File created successfully!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        MessageBox.Show("File cannot be created");

                    }
                }

                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeBegin);
                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeEndForms);
                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeBeginForm);

                //append the code
                resultantCode = codeBegin;
                resultantCode = resultantCode + codeEndForms;
                resultantCode = resultantCode + codeBeginForm;

                XmlNodeList nodelist = doc.DocumentElement?.ChildNodes[0].ChildNodes[0]?.ChildNodes;
                foreach (XmlNode xmlNode in nodelist!)
                {
                    if (xmlNode.Attributes == null) continue;

                    String content = xmlNode.Attributes["Content"]?.Value;
                    String type = xmlNode.Attributes["x:type"]?.Value;
                    String margin = xmlNode.Attributes["Margin"]?.Value;

                    string[] marginVal = { "0", "0", "0", "0" };

                    if (margin != null)
                    {
                        marginVal = margin.Split(',');
                    }

                    String codeInput = "\n\t\t\t\t" + "Container(" + "\n\t\t\t\t\t"  + " margin: EdgeInsets.only(left: " + marginVal[0] + ", bottom: " + marginVal[1] +
                        ", right: " + marginVal[2] + ", top: " + marginVal[3] + ")," + "\n\t\t\t\t\t\t" + "child:" +
                        "TextFormField(" + "\n\t\t\t\t\t\t\t" + "decoration: const InputDecoration( " + "\n\t\t\t\t\t\t\t" + "hintText: '" + content
                  + "',\n\t\t\t\t\t\t\t" + "labelText: '" + content + "'," + "\n\t\t\t\t\t\t" + ")," + "\n\t\t\t\t\t\t//Validate input fields" + "\n\t\t\t\t\t\t" + "validator: (value) {" +
                  "\n\t\t\t\t\t\t\t" + "if (value!.isEmpty) { " + "\n\t\t\t\t\t\t\t\t" + " return 'Please enter valid input';" + "\n\t\t\t\t\t\t\t" + "}" +
                  "\n\t\t\t\t\t\t\t" + "return null;" + "\n\t\t\t\t\t\t" + "}," + "\n\t\t\t\t" + "),),";

                    String codeButton = "\n\t\t\t\t" + "Container(" + "\n\t\t\t\t\t" + "child:" + "new Container( " + "\n\t\t\t\t\t" + "padding: EdgeInsets.all(5),"
                 + "\n\t\t\t\t\t" + "child: new RaisedButton(" + "\n\t\t\t\t\t\t" +
                 "child: Text('" + content + "', style: TextStyle(" + "\n\t\t\t\t\t\t" + "fontSize: 18," + "\n\t\t\t\t\t\t" + ")" + ")," + "\n\t\t\t\t\t\t" + "\n\t\t\t\t\t\t" + "textColor: Color(0xFF" + buttonText + ")," + "\n\t\t\t\t\t\t" +
                  "color: Color(0xFF" + buttonColor + ")," + "\n\t\t\t\t\t\t" + "onPressed: () { }," + "\n\t\t\t\t\t" + ")),),";

                    String codeHeader = "\n\t\t\t\t" + "Container(" + "\n\t\t\t\t\t" + "child:" + " Text( '" + content + "'," + "\n\t\t\t\t\t\t" + "style: TextStyle(" + "\n\t\t\t\t\t\t" + "color: Color(0xFF" +
                        headerColor + ")," + "\n\t\t\t\t\t\t" + "fontSize: 30," + "\n\t\t\t\t\t\t" + "fontWeight: FontWeight.bold)"
                    + "\n\t\t\t\t" + "),),";

                    String codeLabel = "\n\t\t\t\t" + "Container(" + "\n\t\t\t\t\t" + " margin: EdgeInsets.only(left: " + marginVal[0] + ", bottom: " + marginVal[1] +
                        ", right: " + marginVal[2] + ", top: " + marginVal[3] + ")," + "\n\t\t\t\t\t" + "child:" + "const Text( '" + content + "'," + "\n\t\t\t\t\t\t" + "style: TextStyle(" + "\n\t\t\t\t\t\t" + "color: Color(0xFF" +
                        labelColour + ")," + "\n\t\t\t\t\t\t" + "fontSize: 20," + "\n\t\t\t\t" + ")"
                        + "\n\t\t\t\t" + "),),";

                    String codeHorizontalLine = "\n\t\t\t\t " + "Container(" + " margin: EdgeInsets.only(left: " + marginVal[0] + ", bottom: " + marginVal[1] +
                        ", right: " + marginVal[2] + ", top: " + marginVal[3] + ")," + "\n\t\t\t\t\t" + "child:" + "Divider(" + "\n\t\t\t\t\t\t\t" + "color: Color(0xFF" + buttonColor + ")\n\t\t\t\t),),";


                    switch (type)
                    {
                        case "input":
                            resultantCode = resultantCode + codeInput;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeInput);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeInput);
                            break;

                        case "header":
                            resultantCode = resultantCode + codeHeader;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeHeader);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeHeader);
                            break;

                        case "button":
                            resultantCode = resultantCode + codeButton;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeButton);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeButton);
                            break;

                        case "horizontal-line":
                            resultantCode = resultantCode + codeHorizontalLine;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeHorizontalLine);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeHorizontalLine);
                            break;

                        case "label":
                            resultantCode = resultantCode + codeLabel;
                            //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeLabel);
                            File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeLabel);
                            break;

                        default:
                            break;
                    }



                }
                resultantCode = resultantCode + codeEndForm;
                //File.AppendAllText("C://Users//acer//Desktop//WriteTextClone.txt", codeEndForm);
                File.AppendAllText(@folderPath + "//WriteTextClone.txt", codeEndForm);

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

            MessageBox.Show("Your code is generated!");
            this.Hide();
            viewCode form = new viewCode();
            form.Show();


        }

        private void label2_Click(object sender, EventArgs e)
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

        private void panel3_Paint(object sender, PaintEventArgs e)
        {

        }

        private void tableLayoutPanel6_Paint(object sender, PaintEventArgs e)
        {

        }

        private void tableLayoutPanel5_Paint(object sender, PaintEventArgs e)
        {

        }

        private void tableLayoutPanel4_Paint(object sender, PaintEventArgs e)
        {

        }

        private void tableLayoutPanel3_Paint(object sender, PaintEventArgs e)
        {

        }

        private void panel5_Paint(object sender, PaintEventArgs e)
        {

        }

        private void panel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void button6_Click(object sender, EventArgs e)
        {
            this.theme = "theme6";
            //GenerateCode(theme);
            MobileCodeGeneration();
        }

        private void pictureBox6_Click(object sender, EventArgs e)
        {

        }

        private void button5_Click(object sender, EventArgs e)
        {
            this.theme = "theme3";
            //GenerateCode(theme);
            MobileCodeGeneration();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            this.theme = "theme4";
            //GenerateCode(theme);
            MobileCodeGeneration();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.theme = "theme4";
            //GenerateCode(theme);
            MobileCodeGeneration();
        }

        private void pictureBox5_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox4_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox3_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void panel4_Paint(object sender, PaintEventArgs e)
        {

        }

        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void button7_Click(object sender, EventArgs e)
        {
            this.Hide();
            Form1 form = new Form1();
            form.Show();
        }
    }
}
