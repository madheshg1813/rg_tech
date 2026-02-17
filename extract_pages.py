import fitz  # Standard import for PyMuPDF (formerly known as fitz)
import os

def extract_pdf_pages(pdf_path, output_folder, dpi=300):
    """
    Extracts all pages from a PDF as high-quality PNG images.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    pdf_name = os.path.basename(pdf_path).replace(".pdf", "")
    doc = fitz.open(pdf_path)
    
    print(f"Extracting {len(doc)} pages from {pdf_path}...")
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        
        # Matrix for scaling (DPI / 72 because fitz uses 72 as default)
        zoom = dpi / 72
        matrix = fitz.Matrix(zoom, zoom)
        
        pix = page.get_pixmap(matrix=matrix)
        output_file = f"{pdf_name}_page_{page_num + 1}.png"
        output_path = os.path.join(output_folder, output_file)
        
        pix.save(output_path)
        print(f"  Saved: {output_file}")
    
    doc.close()

if __name__ == "__main__":
    assets_dir = r"C:\Users\user\Desktop\RG TECH\client_assets"
    output_dir = r"C:\Users\user\Desktop\RG TECH\public\gallery_extracted"
    
    pdfs = [f for f in os.listdir(assets_dir) if f.casefold().endswith(".pdf")]
    
    for pdf in pdfs:
        extract_pdf_pages(os.path.join(assets_dir, pdf), output_dir)
    
    print("\nExtraction complete!")
