import os
import json

# Define the gallery directory and categories
gallery_dir = r"C:\Users\user\Desktop\RG TECH\public\gallery"
categories = [
    "Fabrication Services",
    "Steel Gates", 
    "Metal Safety Doors",
    "Decorative Metal Panels"
]

# Material mappings for each category
materials = {
    "Fabrication Services": "Industrial Steel",
    "Steel Gates": "Solid Steel",
    "Metal Safety Doors": "Reinforced Metal",
    "Decorative Metal Panels": "Decorative Laser Cut"
}

def generate_items():
    items = []
    
    for category in categories:
        category_path = os.path.join(gallery_dir, category)
        
        if not os.path.exists(category_path):
            print(f"Warning: {category_path} does not exist")
            continue
            
        # Get all image files
        files = [f for f in os.listdir(category_path) 
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.avif'))]
        
        files.sort()  # Sort alphabetically
        
        print(f"\n{category}: {len(files)} images")
        
        for idx, filename in enumerate(files, 1):
            # Create title from filename (remove extension and clean up)
            title = os.path.splitext(filename)[0]
            title = title.replace('_', ' ').replace('-', ' ').title()
            
            # Simplify very long titles
            if len(title) > 50:
                title = f"{category} Sample {idx:02d}"
            
            item = {
                "img": f"/gallery/{category}/{filename}",
                "title": title,
                "material": materials.get(category, "Premium Metal"),
                "filter": category
            }
            items.append(item)
    
    return items

def format_js_array(items):
    """Format items as JavaScript array"""
    js_lines = []
    
    current_category = None
    for item in items:
        if item['filter'] != current_category:
            if current_category is not None:
                js_lines.append("")
            js_lines.append(f"            // {item['filter']}")
            current_category = item['filter']
        
        js_line = f"            {{ img: '{item['img']}', title: '{item['title']}', material: '{item['material']}', filter: '{item['filter']}' }},"
        js_lines.append(js_line)
    
    return "\n".join(js_lines)

if __name__ == "__main__":
    items = generate_items()
    
    print(f"\n{'='*60}")
    print(f"Total items generated: {len(items)}")
    print(f"{'='*60}")
    
    # Generate JavaScript code
    js_code = format_js_array(items)
    
    # Save to file
    output_file = "gallery_items_updated.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_code)
    
    print(f"\nJavaScript array saved to: {output_file}")
    print("\nCopy the contents and replace the corresponding sections in App.jsx")
