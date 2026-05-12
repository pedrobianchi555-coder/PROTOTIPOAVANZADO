import sys
try:
    from pypdf import PdfReader
    reader = PdfReader('c:/Users/Sistemas/Downloads/pruebaantigravity/READMECLE.pdf')
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    with open('c:/Users/Sistemas/Downloads/pruebaantigravity/pdf_text_py.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
