import requests
import os
import json
import uuid

def extract_project_info_from_google_services(google_services_path):
    """Extract project info from google-services.json"""
    with open(google_services_path, 'r') as f:
        data = json.load(f)
    
    return {
        'project_id': data['project_info']['project_id'],
        'storage_bucket': data['project_info']['storage_bucket'],
        'api_key': data['client'][0]['api_key'][0]['current_key']
    }

def download_image_from_url(url, local_path):
    """Download image from URL"""
    try:
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, 'wb') as f:
                f.write(response.content)
            return True
        else:
            print(f"Failed to download {url}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def upload_to_firebase_storage(local_file_path, storage_path, project_id, api_key):
    """Upload file to Firebase Storage using REST API"""
    try:
        # Read file
        with open(local_file_path, 'rb') as f:
            file_data = f.read()
        
        # Upload to Firebase Storage REST API
        upload_url = f"https://firebasestorage.googleapis.com/v0/b/{project_id}.appspot.com/o?uploadType=media&name={storage_path}"
        
        headers = {
            'Content-Type': 'application/octet-stream',
        }
        
        response = requests.post(upload_url, data=file_data, headers=headers, params={'key': api_key})
        
        if response.status_code == 200:
            # Get download URL
            download_url = f"https://firebasestorage.googleapis.com/v0/b/{project_id}.appspot.com/o/{requests.utils.quote(storage_path, safe='')}?alt=media"
            return download_url
        else:
            print(f"Failed to upload {storage_path}: {response.status_code} - {response.text}")
            return None
            
    except Exception as e:
        print(f"Error uploading {storage_path}: {e}")
        return None

def write_to_firestore(project_id, api_key, collection_path, document_id, data):
    """Write data to Firestore using REST API"""
    try:
        # Convert data to Firestore format
        firestore_data = {"fields": {}}
        for key, value in data.items():
            firestore_data["fields"][key] = {"stringValue": str(value)}
        
        url = f"https://firestore.googleapis.com/v1/projects/{project_id}/databases/(default)/documents/{collection_path}/{document_id}?key={api_key}"
        
        response = requests.patch(url, json=firestore_data)
        
        if response.status_code == 200:
            return True
        else:
            print(f"Failed to write to {collection_path}/{document_id}: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"Error writing to Firestore: {e}")
        return False

def scrape_and_migrate_data(old_google_services_path, new_google_services_path):
    """Scrape data from old project and migrate to new project using REST APIs"""
    
    # Get project info
    old_project_info = extract_project_info_from_google_services(old_google_services_path)
    new_project_info = extract_project_info_from_google_services(new_google_services_path)
    
    old_project_id = old_project_info['project_id']
    old_api_key = old_project_info['api_key']
    
    new_project_id = new_project_info['project_id']
    new_api_key = new_project_info['api_key']
    
    print(f"Migrating from: {old_project_id}")
    print(f"Migrating to: {new_project_id}")
    
    # Create temp directory
    os.makedirs('temp_images', exist_ok=True)
    
    # Base URLs for Firestore REST API
    old_base_url = f"https://firestore.googleapis.com/v1/projects/{old_project_id}/databases/(default)/documents"
    
    try:
        # Get categories using REST API
        categories_url = f"{old_base_url}/categories?key={old_api_key}"
        print(f"Fetching categories...")
        
        response = requests.get(categories_url)
        if response.status_code != 200:
            print(f"Error fetching categories: {response.status_code} - {response.text}")
            return
            
        categories_data = response.json()
        
        if 'documents' not in categories_data:
            print("No categories found")
            return
            
        print(f"Found {len(categories_data['documents'])} categories")
            
        for category_doc in categories_data['documents']:
            # Extract category ID from document path
            category_id = category_doc['name'].split('/')[-1]
            print(f"\nProcessing category: {category_id}")
            
            # Extract category data
            category_data = {}
            if 'fields' in category_doc:
                for field_name, field_data in category_doc['fields'].items():
                    if 'stringValue' in field_data:
                        category_data[field_name] = field_data['stringValue']
            
            # Handle category image
            if 'categoryImg' in category_data:
                img_url = category_data['categoryImg']
                img_filename = f"categories/{category_id}.jpg"
                local_path = f"temp_images/{img_filename}"
                
                if download_image_from_url(img_url, local_path):
                    # Upload to new Firebase Storage
                    new_img_url = upload_to_firebase_storage(local_path, img_filename, new_project_id, new_api_key)
                    if new_img_url:
                        category_data['categoryImg'] = new_img_url
                        print(f"  Uploaded category image")
            
            # Save category to new Firestore
            if write_to_firestore(new_project_id, new_api_key, "categories", category_id, category_data):
                print(f"  Saved category: {category_id}")
            
            # Get machines for this category
            machines_url = f"{old_base_url}/categories/{category_id}/machines?key={old_api_key}"
            machines_response = requests.get(machines_url)
            
            if machines_response.status_code == 200:
                machines_data = machines_response.json()
                
                if 'documents' in machines_data:
                    print(f"  Found {len(machines_data['documents'])} machines")
                    
                    for machine_doc in machines_data['documents']:
                        machine_id = machine_doc['name'].split('/')[-1]
                        print(f"    Processing machine: {machine_id}")
                        
                        # Extract machine data
                        machine_data = {}
                        if 'fields' in machine_doc:
                            for field_name, field_data in machine_doc['fields'].items():
                                if 'stringValue' in field_data:
                                    machine_data[field_name] = field_data['stringValue']
                        
                        # Handle main machine image
                        if 'machineImg' in machine_data:
                            img_url = machine_data['machineImg']
                            img_filename = f"machines/{category_id}/{machine_id}/main.jpg"
                            local_path = f"temp_images/{img_filename}"
                            
                            if download_image_from_url(img_url, local_path):
                                new_img_url = upload_to_firebase_storage(local_path, img_filename, new_project_id, new_api_key)
                                if new_img_url:
                                    machine_data['machineImg'] = new_img_url
                                    print(f"      Uploaded machine image")
                        
                        # Save machine to new Firestore
                        machine_path = f"categories/{category_id}/machines"
                        if write_to_firestore(new_project_id, new_api_key, machine_path, machine_id, machine_data):
                            print(f"      Saved machine: {machine_id}")
                        
                        # Get machine details
                        details_url = f"{old_base_url}/categories/{category_id}/machines/{machine_id}/details/details?key={old_api_key}"
                        details_response = requests.get(details_url)
                        
                        if details_response.status_code == 200:
                            details_data = details_response.json()
                            if 'fields' in details_data:
                                details_dict = {}
                                for field_name, field_data in details_data['fields'].items():
                                    if 'stringValue' in field_data:
                                        details_dict[field_name] = field_data['stringValue']
                                
                                details_path = f"categories/{category_id}/machines/{machine_id}/details"
                                if write_to_firestore(new_project_id, new_api_key, details_path, "details", details_dict):
                                    print(f"      Saved machine details")
                        
                        # Get additional images
                        images_url = f"{old_base_url}/categories/{category_id}/machines/{machine_id}/images/images?key={old_api_key}"
                        images_response = requests.get(images_url)
                        
                        if images_response.status_code == 200:
                            images_data = images_response.json()
                            if 'fields' in images_data:
                                new_images_data = {}
                                image_count = 0
                                
                                for field_name, field_data in images_data['fields'].items():
                                    if 'stringValue' in field_data:
                                        img_url = field_data['stringValue']
                                        img_filename = f"machines/{category_id}/{machine_id}/additional_{field_name}.jpg"
                                        local_path = f"temp_images/{img_filename}"
                                        
                                        if download_image_from_url(img_url, local_path):
                                            new_img_url = upload_to_firebase_storage(local_path, img_filename, new_project_id, new_api_key)
                                            if new_img_url:
                                                new_images_data[field_name] = new_img_url
                                                image_count += 1
                                
                                if new_images_data:
                                    images_path = f"categories/{category_id}/machines/{machine_id}/images"
                                    if write_to_firestore(new_project_id, new_api_key, images_path, "images", new_images_data):
                                        print(f"      Saved {image_count} additional images")
        
        print(f"\n✅ Migration completed successfully!")
        print(f"All data has been migrated from {old_project_id} to {new_project_id}")
    
    except Exception as e:
        print(f"❌ Error during migration: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        # Remove temporary files
        import shutil
        if os.path.exists('temp_images'):
            shutil.rmtree('temp_images')
            print("Cleaned up temporary files")

if __name__ == "__main__":
    OLD_GOOGLE_SERVICES_PATH = "old.json"
    NEW_GOOGLE_SERVICES_PATH = "new.json"
    
    # Check if files exist
    if not os.path.exists(OLD_GOOGLE_SERVICES_PATH):
        print(f"Please save your old google-services.json as {OLD_GOOGLE_SERVICES_PATH}")
        exit(1)
    
    if not os.path.exists(NEW_GOOGLE_SERVICES_PATH):
        print(f"Please save your new google-services.json as {NEW_GOOGLE_SERVICES_PATH}")
        exit(1)
    
    print("🚀 Starting Firebase data migration...")
    scrape_and_migrate_data(OLD_GOOGLE_SERVICES_PATH, NEW_GOOGLE_SERVICES_PATH)