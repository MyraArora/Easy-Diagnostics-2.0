from flask import Flask, request, jsonify
import fitz  # PyMuPDF
import re

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'Invalid file type. Please upload a PDF file.'}), 400

    try:
        # Load the PDF
        pdf_document = fitz.open(stream=file.read(), filetype="pdf")
        full_text = ""

        # Extract text from all pages
        for page in pdf_document:
            full_text += page.get_text()

        # Extract the numerical value near the term 'result'
        match = re.search(r'result.*?([\d.]+)', full_text, re.IGNORECASE)
        result_value = match.group(1) if match else "No result found"

        return jsonify({'result_value': result_value})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)
