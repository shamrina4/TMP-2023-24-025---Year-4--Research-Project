from services.openai_helper import send_to_openai


def generate_html(xml_structure):
    
    # Connect To OpenAI --------------------

   

    template = f"""
        This is a the structure of a image in XML format

            Structure: {xml_structure}

        convert this structure to html 
      
    """

    
    response = send_to_openai(template)
                
    return response
     


