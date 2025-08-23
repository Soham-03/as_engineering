import streamlit as st
import requests
import json
import urllib.parse
import time
import base64
from PIL import Image
import io


def load_json_from_url(url):
    """Load JSON from direct URL"""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return json.loads(response.text)
        else:
            st.error(f"Failed to load JSON from {url}: {response.status_code}")
            return None
    except Exception as e:
        st.error(f"Error loading JSON from {url}: {e}")
        return None


def load_firebase_configs_from_urls():
    """Load both Firebase configs from direct URLs"""
    # Your direct URLs
    old_json_url = "https://asengineeringworks.in/old.json"
    new_json_url = "https://asengineeringworks.in/new.json"
    
    st.info("🔄 Loading Firebase configurations from server...")
    
    # Load both JSON files
    old_data = load_json_from_url(old_json_url)
    new_data = load_json_from_url(new_json_url)
    
    if old_data and new_data:
        try:
            old_config = {
                'project_id': old_data['project_info']['project_id'],
                'api_key': old_data['client'][0]['api_key'][0]['current_key']
            }
            new_config = {
                'project_id': new_data['project_info']['project_id'],
                'api_key': new_data['client'][0]['api_key'][0]['current_key']
            }
            return old_config, new_config
        except KeyError as e:
            st.error(f"Error parsing JSON configuration: {e}")
            return None, None
    
    return None, None


class FirebaseDebugger:
    def __init__(self, project_id, api_key):
        self.project_id = project_id
        self.api_key = api_key
        self.base_url = f"https://firestore.googleapis.com/v1/projects/{project_id}/databases/(default)/documents"
    
    def get_categories(self):
        """Get all categories"""
        try:
            url = f"{self.base_url}/categories?key={self.api_key}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                categories = {}
                if 'documents' in data:
                    for doc in data['documents']:
                        cat_id = doc['name'].split('/')[-1]
                        cat_data = {}
                        if 'fields' in doc:
                            for field_name, field_data in doc['fields'].items():
                                if 'stringValue' in field_data:
                                    cat_data[field_name] = field_data['stringValue']
                        categories[cat_id] = cat_data
                return categories
            else:
                st.error(f"Failed to get categories: {response.status_code} - {response.text}")
                return {}
        except Exception as e:
            st.error(f"Error fetching categories: {e}")
            return {}
    
    def add_category(self, category_id, category_name, category_img_url):
        """Add a new category"""
        try:
            url = f"{self.base_url}/categories/{category_id}?key={self.api_key}"
            data = {
                "fields": {
                    "categoryName": {"stringValue": category_name},
                    "categoryImg": {"stringValue": category_img_url}
                }
            }
            response = requests.patch(url, json=data)
            if response.status_code == 200:
                return True
            else:
                st.error(f"Failed to add category: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            st.error(f"Error adding category: {e}")
            return False
    
    def get_machines(self, category_id):
        """Get all machines for a category"""
        try:
            url = f"{self.base_url}/categories/{category_id}/machines?key={self.api_key}"
            
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                machines = {}
                if 'documents' in data:
                    for doc in data['documents']:
                        machine_name = doc['name'].split('/')[-1]  # Machine name is the document ID
                        machine_data = {}
                        if 'fields' in doc:
                            for field_name, field_data in doc['fields'].items():
                                if 'stringValue' in field_data:
                                    machine_data[field_name] = field_data['stringValue']
                        machines[machine_name] = machine_data
                return machines
            else:
                return {}
        except Exception as e:
            st.error(f"Error fetching machines: {e}")
            return {}
    
    def get_machine_details(self, category_id, machine_name):
        """Get machine details including all data"""
        machine_data = {}
        
        # Get basic machine info (including detail1, detail2, detail3)
        try:
            url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}?key={self.api_key}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                if 'fields' in data:
                    for field_name, field_data in data['fields'].items():
                        if 'stringValue' in field_data:
                            machine_data[field_name] = field_data['stringValue']
        except:
            pass
        
        # Get additional details subcollection (custom key-value pairs)
        try:
            url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}/details/details?key={self.api_key}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                if 'fields' in data:
                    additional_details = {}
                    for field_name, field_data in data['fields'].items():
                        if 'stringValue' in field_data:
                            additional_details[field_name] = field_data['stringValue']
                    machine_data['additional_details'] = additional_details
        except:
            machine_data['additional_details'] = {}
        
        # Get images subcollection
        try:
            url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}/images/images?key={self.api_key}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                if 'fields' in data:
                    images = {}
                    for field_name, field_data in data['fields'].items():
                        if 'stringValue' in field_data:
                            images[field_name] = field_data['stringValue']
                    machine_data['images'] = images
        except:
            machine_data['images'] = {}
        
        return machine_data
    
    def add_machine(self, category_id, machine_name, machine_data, additional_details_data, images_data):
        """Add a new machine with all its data - machine_name is used as document ID"""
        try:
            # Add main machine document (machine_name is the document ID)
            url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}?key={self.api_key}"
            main_fields = {}
            for key, value in machine_data.items():
                if value:  # Only add non-empty values
                    main_fields[key] = {"stringValue": str(value)}
            
            main_doc = {"fields": main_fields}
            response = requests.patch(url, json=main_doc)
            if response.status_code != 200:
                st.error(f"Failed to add main machine: {response.status_code} - {response.text}")
                return False
            
            # Add additional details subcollection (custom key-value pairs)
            if additional_details_data:
                url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}/details/details?key={self.api_key}"
                details_fields = {}
                for key, value in additional_details_data.items():
                    if value:  # Only add non-empty values
                        details_fields[key] = {"stringValue": str(value)}
                
                if details_fields:
                    detail_doc = {"fields": details_fields}
                    response = requests.patch(url, json=detail_doc)
                    if response.status_code != 200:
                        st.error(f"Failed to add additional details: {response.status_code} - {response.text}")
                        return False
            
            # Add images subcollection
            if images_data:
                url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}/images/images?key={self.api_key}"
                images_fields = {}
                for key, value in images_data.items():
                    if value:  # Only add non-empty values
                        images_fields[key] = {"stringValue": str(value)}
                
                if images_fields:
                    images_doc = {"fields": images_fields}
                    response = requests.patch(url, json=images_doc)
                    if response.status_code != 200:
                        st.error(f"Failed to add images: {response.status_code} - {response.text}")
                        return False
            
            return True
        except Exception as e:
            st.error(f"Error adding machine: {e}")
            return False
    
    def update_machine(self, category_id, machine_name, machine_data, additional_details_data, images_data):
        """Update an existing machine"""
        return self.add_machine(category_id, machine_name, machine_data, additional_details_data, images_data)
    
    def delete_specific_additional_detail(self, category_id, machine_name, detail_key):
        """Delete a specific additional detail key from machine additional details"""
        try:
            # Get current additional details
            machine_data = self.get_machine_details(category_id, machine_name)
            current_details = machine_data.get('additional_details', {})
            
            # Remove the specific key
            if detail_key in current_details:
                del current_details[detail_key]
                
                # Update the additional details document
                url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}/details/details?key={self.api_key}"
                
                if current_details:
                    # Update with remaining details
                    details_fields = {}
                    for key, value in current_details.items():
                        details_fields[key] = {"stringValue": str(value)}
                    
                    detail_doc = {"fields": details_fields}
                    response = requests.patch(url, json=detail_doc)
                else:
                    # Delete entire additional details document if no details left
                    response = requests.delete(url)
                
                return response.status_code == 200
            return True
        except Exception as e:
            st.error(f"Error deleting additional detail: {e}")
            return False
    
    def delete_specific_image(self, category_id, machine_name, image_key):
        """Delete a specific image key from machine images"""
        try:
            # Get current images
            machine_data = self.get_machine_details(category_id, machine_name)
            current_images = machine_data.get('images', {})
            
            # Remove the specific key
            if image_key in current_images:
                del current_images[image_key]
                
                # Update the images document
                url = f"{self.base_url}/categories/{category_id}/machines/{machine_name}/images/images?key={self.api_key}"
                
                if current_images:
                    # Update with remaining images
                    images_fields = {}
                    for key, value in current_images.items():
                        images_fields[key] = {"stringValue": str(value)}
                    
                    images_doc = {"fields": images_fields}
                    response = requests.patch(url, json=images_doc)
                else:
                    # Delete entire images document if no images left
                    response = requests.delete(url)
                
                return response.status_code == 200
            return True
        except Exception as e:
            st.error(f"Error deleting image: {e}")
            return False
    
    def delete_machine_like_android(self, category_id, machine_name):
        """Delete machine following the exact same pattern as Android Kotlin code"""
        st.write(f"🎯 Deleting machine '{machine_name}' from category '{category_id}' (Android style)")
        
        success = False
        
        # Step 1: Delete details subcollection first (like Android)
        st.write("📋 Step 1: Deleting additional details subcollection...")
        details_success = self.delete_document_simple(f"categories/{category_id}/machines/{machine_name}/details/details")
        
        if details_success:
            st.write("✅ Additional details subcollection deleted successfully")
            
            # Step 2: Delete images subcollection if exists
            st.write("📋 Step 2: Deleting images subcollection (if exists)...")
            images_success = self.delete_document_simple(f"categories/{category_id}/machines/{machine_name}/images/images")
            
            if images_success:
                st.write("✅ Images subcollection deleted successfully")
            else:
                st.write("ℹ️ Images subcollection not found or already deleted")
            
            # Step 3: Delete main machine document (like Android)
            st.write("📋 Step 3: Deleting main machine document...")
            machine_success = self.delete_document_simple(f"categories/{category_id}/machines/{machine_name}")
            
            if machine_success:
                st.write(f"✅ {machine_name} deleted successfully")
                success = True
            else:
                st.write(f"❌ Failed to delete main machine document")
        else:
            st.write("❌ Failed to delete additional details subcollection")
        
        return success
    
    def delete_document_simple(self, document_path):
        """Simple document deletion like Android Firestore"""
        try:
            url = f"{self.base_url}/{document_path}?key={self.api_key}"
            st.write(f"   🔍 Attempting: {url}")
            
            response = requests.delete(url)
            st.write(f"   📊 Response: {response.status_code}")
            
            if response.status_code == 200:
                st.write(f"   ✅ Successfully deleted!")
                return True
            elif response.status_code == 404:
                st.write(f"   ℹ️ Document not found (may already be deleted)")
                return True
            else:
                st.write(f"   ❌ Failed: {response.status_code} - {response.text[:100]}")
                return False
        except Exception as e:
            st.write(f"   ❌ Exception: {e}")
            return False
    
    def check_document_exists(self, document_path):
        """Check if a document exists"""
        try:
            url = f"{self.base_url}/{document_path}?key={self.api_key}"
            response = requests.get(url)
            return response.status_code == 200
        except:
            return False
    
    def sync_machine(self, source_db, category_id, machine_name):
        """Sync a machine from source database to this database"""
        try:
            # Get machine data from source
            machine_data = source_db.get_machine_details(category_id, machine_name)
            
            if not machine_data:
                return False
            
            # Separate data into different collections
            main_data = {}
            additional_details_data = machine_data.get('additional_details', {})
            images_data = machine_data.get('images', {})
            
            # Extract main machine fields (not additional_details or images)
            for key, value in machine_data.items():
                if key not in ['additional_details', 'images']:
                    main_data[key] = value
            
            # Add to this database
            return self.add_machine(category_id, machine_name, main_data, additional_details_data, images_data)
            
        except Exception as e:
            st.error(f"Error syncing machine: {e}")
            return False


def image_to_base64(image_file):
    """Convert uploaded image to base64 string"""
    try:
        image = Image.open(image_file)
        # Resize image if too large
        if image.width > 800 or image.height > 600:
            image.thumbnail((800, 600), Image.Resampling.LANCZOS)
        
        buffer = io.BytesIO()
        image.save(buffer, format='JPEG', quality=85)
        img_str = base64.b64encode(buffer.getvalue()).decode()
        return f"data:image/jpeg;base64,{img_str}"
    except Exception as e:
        st.error(f"Error processing image: {e}")
        return None


def show_add_category_page(old_db, new_db):
    """Show add category page"""
    st.header("➕ Add New Category")
    
    with st.form("add_category_form"):
        category_id = st.text_input("Category ID", help="Unique identifier (e.g., 'excavators')")
        category_name = st.text_input("Category Name", help="Display name (e.g., 'Excavators')")
        category_img = st.file_uploader("Category Image", type=['jpg', 'jpeg', 'png'])
        
        col1, col2 = st.columns(2)
        add_to_old = col1.checkbox("Add to Old Database", value=True)
        add_to_new = col2.checkbox("Add to New Database", value=True)
        
        submitted = st.form_submit_button("➕ Add Category")
        
        if submitted:
            if not category_id or not category_name:
                st.error("Please fill in all fields")
                return
            
            # Process category image
            category_img_url = ""
            if category_img:
                category_img_url = image_to_base64(category_img)
            
            success_old = True
            success_new = True
            
            if add_to_old:
                st.write("📤 Adding to Old Database...")
                success_old = old_db.add_category(category_id, category_name, category_img_url)
            
            if add_to_new:
                st.write("📤 Adding to New Database...")
                success_new = new_db.add_category(category_id, category_name, category_img_url)
            
            if success_old and success_new:
                st.success("✅ Category added successfully!")
                st.balloons()
            elif success_old or success_new:
                st.warning("⚠️ Category added to some databases only")
            else:
                st.error("❌ Failed to add category")


def show_add_machine_page(old_db, new_db):
    """Show add machine page"""
    st.header("🔧 Add New Machine")
    
    # Get categories
    categories = old_db.get_categories()
    if not categories:
        st.warning("No categories found. Please add a category first.")
        return
    
    # Initialize counters in session state OUTSIDE the form
    if 'additional_detail_count' not in st.session_state:
        st.session_state.additional_detail_count = 3
    if 'image_count' not in st.session_state:
        st.session_state.image_count = 2
    
    # DYNAMIC CONTROLS OUTSIDE THE FORM
    st.subheader("📝 Configure Form Fields")
    
    col1, col2 = st.columns(2)
    with col1:
        st.write("**Additional Detail Fields:**")
        st.info("These are custom key-value pairs stored in subcollection")
        col1a, col1b = st.columns(2)
        if col1a.button("➕ Add Additional Detail Field", key="add_additional_detail_btn"):
            st.session_state.additional_detail_count += 1
            st.rerun()
        
        if col1b.button("➖ Remove Additional Detail Field", key="remove_additional_detail_btn") and st.session_state.additional_detail_count > 1:
            st.session_state.additional_detail_count -= 1
            st.rerun()
        
        st.info(f"Current additional detail fields: {st.session_state.additional_detail_count}")
    
    with col2:
        st.write("**Image Fields:**")
        col2a, col2b = st.columns(2)
        if col2a.button("➕ Add Image Field", key="add_img_btn"):
            st.session_state.image_count += 1
            st.rerun()
        
        if col2b.button("➖ Remove Image Field", key="remove_img_btn") and st.session_state.image_count > 1:
            st.session_state.image_count -= 1
            st.rerun()
        
        st.info(f"Current image fields: {st.session_state.image_count}")
    
    st.markdown("---")
    
    # FORM WITH STATIC FIELDS (no buttons inside)
    with st.form("add_machine_form"):
        # Basic Info
        st.subheader("📋 Basic Information")
        selected_category = st.selectbox("Select Category", list(categories.keys()), key="add_machine_category_select")
        machine_name = st.text_input("Machine Name", help="This will be used as the document ID (e.g., 'bajra_roti_making_machine')")
        
        # Images
        st.subheader("📸 Images")
        machine_img = st.file_uploader("Main Machine Image", type=['jpg', 'jpeg', 'png'], key="machine_img")
        
        # Main Machine Details (detail1, detail2, detail3)
        st.subheader("📝 Main Machine Details")
        st.info("These are the 3 fixed details stored directly in the machine document (detail1, detail2, detail3)")
        
        detail1 = st.text_input("Detail 1", help="Stored as 'detail1' in machine document")
        detail2 = st.text_input("Detail 2", help="Stored as 'detail2' in machine document")
        detail3 = st.text_input("Detail 3", help="Stored as 'detail3' in machine document")
        
        # Additional Details Section (custom key-value pairs)
        st.subheader("📝 Additional Details")
        st.info(f"These are custom key-value pairs stored in subcollection (Currently showing {st.session_state.additional_detail_count} fields)")
        
        additional_details = {}
        for i in range(st.session_state.additional_detail_count):
            col1, col2 = st.columns(2)
            with col1:
                detail_key = st.text_input(f"Additional Detail Key {i+1}", key=f"add_additional_detail_key_{i}")
            with col2:
                detail_value = st.text_input(f"Additional Detail Value {i+1}", key=f"add_additional_detail_value_{i}")
            
            if detail_key and detail_value:
                additional_details[detail_key] = detail_value
        
        # Dynamic Images Section
        st.subheader("🖼️ Additional Images")
        st.info(f"Add multiple images. Each image will be stored with keys like image1, image2, etc. (Currently showing {st.session_state.image_count} fields)")
        
        additional_images = {}
        for i in range(st.session_state.image_count):
            img = st.file_uploader(f"Additional Image {i+1}", type=['jpg', 'jpeg', 'png'], key=f"add_img_{i}")
            if img:
                img_url = image_to_base64(img)
                if img_url:
                    additional_images[f"image{i+1}"] = img_url
        
        # YouTube Link
        st.subheader("📺 YouTube Video (Optional)")
        youtube_link = st.text_input("YouTube Video URL", help="Will be stored in additional details")
        
        # Database Selection
        st.subheader("🎯 Target Databases")
        col1, col2 = st.columns(2)
        add_to_old = col1.checkbox("Add to Old Database", value=True)
        add_to_new = col2.checkbox("Add to New Database", value=True)
        
        # FORM SUBMIT BUTTON (the only button allowed in forms)
        submitted = st.form_submit_button("🔧 Add Machine")
        
        if submitted:
            if not machine_name or not selected_category:
                st.error("Please fill in required fields (Category and Machine Name)")
                return
            
            # Process main machine image
            machine_img_url = ""
            if machine_img:
                machine_img_url = image_to_base64(machine_img)
            
            # Prepare main machine data (includes detail1, detail2, detail3)
            # Note: We don't store machineName as a field since the name IS the document ID
            machine_data = {
                "machineImg": machine_img_url,
                "detail1": detail1,
                "detail2": detail2,
                "detail3": detail3
            }
            
            # Add YouTube link to additional details if provided
            if youtube_link:
                additional_details["youtubeLink"] = youtube_link
            
            success_old = True
            success_new = True
            
            if add_to_old:
                st.write("📤 Adding to Old Database...")
                success_old = old_db.add_machine(selected_category, machine_name, machine_data, additional_details, additional_images)
            
            if add_to_new:
                st.write("📤 Adding to New Database...")
                success_new = new_db.add_machine(selected_category, machine_name, machine_data, additional_details, additional_images)
            
            if success_old and success_new:
                st.success("✅ Machine added successfully!")
                st.balloons()
                # Reset counters
                st.session_state.additional_detail_count = 3
                st.session_state.image_count = 2
            elif success_old or success_new:
                st.warning("⚠️ Machine added to some databases only")
            else:
                st.error("❌ Failed to add machine")


def show_edit_machine_page(old_db, new_db):
    """Show edit machine page with proper structure"""
    st.header("✏️ Edit Machine")
    
    # Get categories
    categories = old_db.get_categories()
    if not categories:
        st.warning("No categories found.")
        return
    
    # Select category
    selected_category = st.selectbox("Select Category", list(categories.keys()), key="edit_machine_category_select")
    
    if selected_category:
        # Get machines
        machines = old_db.get_machines(selected_category)
        
        if not machines:
            st.info("No machines found in this category")
            return
        
        # Select machine - machine name is the key
        machine_names = list(machines.keys())
        selected_machine = st.selectbox("Select Machine", machine_names, key="edit_machine_select")
        
        if selected_machine:
            # Get current machine data
            current_data = old_db.get_machine_details(selected_category, selected_machine)
            
            st.subheader(f"📝 Editing: {selected_machine}")
            
            # Display Current Main Image
            st.subheader("🖼️ Current Main Image")
            current_main_img = current_data.get('machineImg', '')
            
            col1, col2 = st.columns([2, 1])
            with col1:
                if current_main_img and current_main_img.startswith('data:image'):
                    try:
                        st.image(current_main_img, caption="Current Main Image", width=300)
                    except:
                        st.write("❌ Current main image: [Cannot display - corrupted data]")
                elif current_main_img:
                    st.write(f"📎 Main image URL: {current_main_img}")
                    st.info("💡 This appears to be a URL. Upload a new image to replace it.")
                else:
                    st.info("ℹ️ No main image currently set")
            
            with col2:
                st.write("**Main Image Options:**")
                if current_main_img:
                    if st.button("🗑️ Remove Main Image", key="remove_main_img_btn"):
                        st.session_state['remove_main_image'] = True
                        st.success("✅ Main image will be removed on update")
            
            # Display Current Additional Images
            st.subheader("🖼️ Current Additional Images")
            current_images = current_data.get('images', {})
            
            if current_images:
                cols_per_row = 3
                image_items = list(current_images.items())
                
                for row_start in range(0, len(image_items), cols_per_row):
                    cols = st.columns(cols_per_row)
                    
                    for col_idx, (img_key, img_url) in enumerate(image_items[row_start:row_start + cols_per_row]):
                        with cols[col_idx]:
                            st.write(f"**{img_key}**")
                            
                            if img_url and img_url.startswith('data:image'):
                                try:
                                    st.image(img_url, caption=f"{img_key}", width=200)
                                    if st.button(f"🗑️ Delete", key=f"del_img_{img_key}"):
                                        with st.spinner(f"Deleting {img_key}..."):
                                            success_old = old_db.delete_specific_image(selected_category, selected_machine, img_key)
                                            success_new = new_db.delete_specific_image(selected_category, selected_machine, img_key)
                                            
                                            if success_old or success_new:
                                                st.success(f"✅ {img_key} deleted!")
                                                time.sleep(1)
                                                st.rerun()
                                            else:
                                                st.error(f"❌ Failed to delete {img_key}")
                                except:
                                    st.write("❌ [Cannot display - corrupted data]")
                                    if st.button(f"🗑️ Delete Corrupted", key=f"del_corrupt_{img_key}"):
                                        success_old = old_db.delete_specific_image(selected_category, selected_machine, img_key)
                                        success_new = new_db.delete_specific_image(selected_category, selected_machine, img_key)
                                        
                                        if success_old or success_new:
                                            st.success(f"✅ {img_key} deleted!")
                                            time.sleep(1)
                                            st.rerun()
                            elif img_url:
                                st.write(f"📎 URL: {img_url[:30]}...")
                                st.info("💡 This appears to be a URL")
                                if st.button(f"🗑️ Delete", key=f"del_url_{img_key}"):
                                    success_old = old_db.delete_specific_image(selected_category, selected_machine, img_key)
                                    success_new = new_db.delete_specific_image(selected_category, selected_machine, img_key)
                                    
                                    if success_old or success_new:
                                        st.success(f"✅ {img_key} deleted!")
                                        time.sleep(1)
                                        st.rerun()
                            else:
                                st.write("ℹ️ Empty image slot")
                
                st.info(f"💡 Found {len(current_images)} additional images.")
            else:
                st.info("ℹ️ No additional images currently stored")
            
            # Display Current Main Details (detail1, detail2, detail3)
            st.subheader("📋 Current Main Details")
            st.write("**Fixed Details (stored in machine document):**")
            st.write(f"📝 **Detail 1:** {current_data.get('detail1', 'Not set')}")
            st.write(f"📝 **Detail 2:** {current_data.get('detail2', 'Not set')}")
            st.write(f"📝 **Detail 3:** {current_data.get('detail3', 'Not set')}")
            
            # Display Current Additional Details
            st.subheader("📋 Current Additional Details")
            current_additional_details = current_data.get('additional_details', {})
            
            if current_additional_details:
                st.write("**Additional Details (custom key-value pairs in subcollection):**")
                
                for detail_key, detail_value in current_additional_details.items():
                    col1, col2 = st.columns([4, 1])
                    
                    with col1:
                        if detail_key.lower() in ['youtubelink', 'youtube_link', 'video']:
                            st.write(f"📺 **{detail_key}:** {detail_value}")
                        else:
                            st.write(f"🔧 **{detail_key}:** {detail_value}")
                    
                    with col2:
                        if st.button(f"🗑️", key=f"del_additional_detail_{detail_key}", help=f"Delete {detail_key}"):
                            with st.spinner(f"Deleting {detail_key}..."):
                                success_old = old_db.delete_specific_additional_detail(selected_category, selected_machine, detail_key)
                                success_new = new_db.delete_specific_additional_detail(selected_category, selected_machine, detail_key)
                                
                                if success_old or success_new:
                                    st.success(f"✅ {detail_key} deleted!")
                                    time.sleep(1)
                                    st.rerun()
                                else:
                                    st.error(f"❌ Failed to delete {detail_key}")
                
                st.info(f"💡 Found {len(current_additional_details)} additional details.")
            else:
                st.info("ℹ️ No additional details currently stored")
            
            # Initialize counters OUTSIDE the form
            if 'edit_image_count' not in st.session_state:
                st.session_state.edit_image_count = 2
            if 'edit_additional_detail_count' not in st.session_state:
                st.session_state.edit_additional_detail_count = 2
            
            # DYNAMIC CONTROLS OUTSIDE THE FORM
            st.markdown("---")
            st.subheader("📝 Configure Edit Form Fields")
            
            col1, col2 = st.columns(2)
            with col1:
                st.write("**New Additional Detail Fields:**")
                col1a, col1b = st.columns(2)
                if col1a.button("➕ Add Additional Detail Field", key="edit_add_additional_detail_btn"):
                    st.session_state.edit_additional_detail_count += 1
                    st.rerun()
                
                if col1b.button("➖ Remove Additional Detail Field", key="edit_remove_additional_detail_btn") and st.session_state.edit_additional_detail_count > 1:
                    st.session_state.edit_additional_detail_count -= 1
                    st.rerun()
                
                st.info(f"New additional detail fields: {st.session_state.edit_additional_detail_count}")
            
            with col2:
                st.write("**New Image Fields:**")
                col2a, col2b = st.columns(2)
                if col2a.button("➕ Add Image Field", key="edit_add_img_btn"):
                    st.session_state.edit_image_count += 1
                    st.rerun()
                
                if col2b.button("➖ Remove Image Field", key="edit_remove_img_btn") and st.session_state.edit_image_count > 1:
                    st.session_state.edit_image_count -= 1
                    st.rerun()
                
                st.info(f"New image fields: {st.session_state.edit_image_count}")
            
            # Update Form
            st.markdown("---")
            with st.form("edit_machine_form"):
                # Basic Info - Note: Machine name cannot be changed as it's the document ID
                st.subheader("📋 Machine Information")
                st.info(f"💡 Machine Name: **{selected_machine}** (Cannot be changed as it's the document ID)")
                
                # Image Updates
                st.subheader("📸 Update Images")
                st.info("💡 Upload new images to replace or add to existing ones. Leave empty to keep current images.")
                
                main_image = st.file_uploader(
                    "New Main Image (replaces current main image)", 
                    type=['jpg', 'jpeg', 'png'], 
                    key="edit_main_img"
                )
                
                remove_main = st.checkbox(
                    "Remove Main Image", 
                    value=st.session_state.get('remove_main_image', False)
                )
                
                # Edit Main Details (detail1, detail2, detail3)
                st.subheader("📝 Edit Main Details")
                st.info("💡 These are the 3 fixed details stored in the machine document")
                
                detail1 = st.text_input("Detail 1", value=current_data.get('detail1', ''))
                detail2 = st.text_input("Detail 2", value=current_data.get('detail2', ''))
                detail3 = st.text_input("Detail 3", value=current_data.get('detail3', ''))
                
                # Edit existing additional details
                st.subheader("📝 Edit Existing Additional Details")
                st.info("💡 Modify existing additional details below. Empty fields will remove the detail.")
                
                edited_additional_details = {}
                for detail_key, detail_value in current_additional_details.items():
                    new_value = st.text_input(
                        f"Edit {detail_key}", 
                        value=detail_value, 
                        key=f"edit_existing_additional_{detail_key}",
                        help=f"Current value: {detail_value}"
                    )
                    if new_value.strip():
                        edited_additional_details[detail_key] = new_value
                
                # Add new additional details
                st.subheader("📝 Add New Additional Details")
                st.info(f"💡 Add new custom key-value pairs (Currently showing {st.session_state.edit_additional_detail_count} fields)")
                
                new_additional_details = {}
                for i in range(st.session_state.edit_additional_detail_count):
                    col1, col2 = st.columns(2)
                    with col1:
                        detail_key = st.text_input(f"New Detail Key {i+1}", key=f"edit_new_additional_detail_key_{i}")
                    with col2:
                        detail_value = st.text_input(f"New Detail Value {i+1}", key=f"edit_new_additional_detail_value_{i}")
                    
                    if detail_key and detail_value:
                        new_additional_details[detail_key] = detail_value
                
                # Dynamic additional images
                st.subheader("🖼️ Add New Additional Images")
                st.info(f"💡 These will be added to your existing images (Currently showing {st.session_state.edit_image_count} fields)")
                
                new_images = {}
                for i in range(st.session_state.edit_image_count):
                    img = st.file_uploader(
                        f"New Additional Image {i+1}", 
                        type=['jpg', 'jpeg', 'png'], 
                        key=f"edit_new_img_{i}"
                    )
                    if img:
                        img_url = image_to_base64(img)
                        if img_url:
                            existing_keys = list(current_images.keys())
                            next_num = 1
                            while f"image{next_num}" in existing_keys:
                                next_num += 1
                            new_images[f"image{next_num + i}"] = img_url
                
                # Database Selection
                st.subheader("🎯 Update Databases")
                col1, col2 = st.columns(2)
                update_old = col1.checkbox("Update Old Database", value=True)
                update_new = col2.checkbox("Update New Database", value=True)
                
                submitted = st.form_submit_button("💾 Update Machine")
                
                if submitted:
                    # Process main image
                    main_image_url = current_data.get('machineImg', '')
                    if main_image:
                        main_image_url = image_to_base64(main_image)
                        st.info("📸 New main image will be uploaded")
                    elif remove_main:
                        main_image_url = ""
                        st.info("🗑️ Main image will be removed")
                    
                    # Prepare machine data (includes detail1, detail2, detail3)
                    # Note: We don't store machine name as a field since it's the document ID
                    machine_data = {
                        "machineImg": main_image_url,
                        "detail1": detail1,
                        "detail2": detail2,
                        "detail3": detail3
                    }
                    
                    # Combine edited and new additional details
                    final_additional_details = {**edited_additional_details, **new_additional_details}
                    
                    # Combine existing and new images
                    final_images = {**current_images, **new_images}
                    
                    # Show summary
                    st.write("**📋 Summary of Changes:**")
                    if main_image:
                        st.write("✅ Main image will be updated")
                    elif remove_main:
                        st.write("🗑️ Main image will be removed")
                    
                    if new_images:
                        st.write(f"✅ {len(new_images)} new additional images will be added")
                    
                    if new_additional_details:
                        st.write(f"✅ {len(new_additional_details)} new additional details will be added")
                    
                    success_old = True
                    success_new = True
                    
                    with st.spinner("Updating machine..."):
                        if update_old:
                            st.write("📤 Updating Old Database...")
                            success_old = old_db.update_machine(selected_category, selected_machine, machine_data, final_additional_details, final_images)
                        
                        if update_new:
                            st.write("📤 Updating New Database...")
                            success_new = new_db.update_machine(selected_category, selected_machine, machine_data, final_additional_details, final_images)
                    
                    if success_old and success_new:
                        st.success("✅ Machine updated successfully!")
                        st.balloons()
                        st.session_state.edit_image_count = 2
                        st.session_state.edit_additional_detail_count = 2
                        if 'remove_main_image' in st.session_state:
                            del st.session_state['remove_main_image']
                        time.sleep(2)
                        st.rerun()
                    elif success_old or success_new:
                        st.warning("⚠️ Machine updated in some databases only")
                    else:
                        st.error("❌ Failed to update machine")


def show_sync_page(old_db, new_db):
    """Show sync page"""
    st.header("🔄 Sync Machines Between Databases")
    
    tab1, tab2 = st.tabs(["🆕 Old → New", "🗃️ New → Old"])
    
    with tab1:
        st.subheader("Sync from Old Database to New Database")
        categories = old_db.get_categories()
        
        if categories:
            selected_category = st.selectbox("Select Category", list(categories.keys()), key="sync_old_to_new_cat")
            
            if selected_category:
                machines = old_db.get_machines(selected_category)
                
                if machines:
                    st.write(f"Found {len(machines)} machines in '{selected_category}':")
                    
                    # Individual sync
                    for machine_name, machine_data in machines.items():
                        with st.expander(f"⚙️ {machine_name}"):
                            col1, col2 = st.columns([3, 1])
                            
                            with col1:
                                st.write(f"**Name:** {machine_name}")
                                st.write(f"**Detail 1:** {machine_data.get('detail1', 'Not set')}")
                                st.write(f"**Detail 2:** {machine_data.get('detail2', 'Not set')}")
                            
                            with col2:
                                if st.button(f"🔄 Sync", key=f"sync_old_new_{machine_name}"):
                                    st.write("🚀 Syncing machine...")
                                    success = new_db.sync_machine(old_db, selected_category, machine_name)
                                    
                                    if success:
                                        st.success("✅ Machine synced successfully!")
                                    else:
                                        st.error("❌ Failed to sync machine")
                    
                    # Bulk sync
                    st.markdown("---")
                    if st.button(f"🔄 Sync All Machines in Category ({len(machines)} machines)", key="bulk_sync_old_new"):
                        st.write(f"🚀 Syncing all machines from '{selected_category}'...")
                        
                        success_count = 0
                        for machine_name in machines.keys():
                            success = new_db.sync_machine(old_db, selected_category, machine_name)
                            if success:
                                success_count += 1
                            st.write(f"  {'✅' if success else '❌'} {machine_name}")
                        
                        st.success(f"✅ Sync completed! {success_count}/{len(machines)} machines synced.")
                        if success_count == len(machines):
                            st.balloons()
    
    with tab2:
        st.subheader("Sync from New Database to Old Database")
        categories = new_db.get_categories()
        
        if categories:
            selected_category = st.selectbox("Select Category", list(categories.keys()), key="sync_new_to_old_cat")
            
            if selected_category:
                machines = new_db.get_machines(selected_category)
                
                if machines:
                    st.write(f"Found {len(machines)} machines in '{selected_category}':")
                    
                    # Individual sync
                    for machine_name, machine_data in machines.items():
                        with st.expander(f"⚙️ {machine_name}"):
                            col1, col2 = st.columns([3, 1])
                            
                            with col1:
                                st.write(f"**Name:** {machine_name}")
                                st.write(f"**Detail 1:** {machine_data.get('detail1', 'Not set')}")
                                st.write(f"**Detail 2:** {machine_data.get('detail2', 'Not set')}")
                            
                            with col2:
                                if st.button(f"🔄 Sync", key=f"sync_new_old_{machine_name}"):
                                    st.write("🚀 Syncing machine...")
                                    success = old_db.sync_machine(new_db, selected_category, machine_name)
                                    
                                    if success:
                                        st.success("✅ Machine synced successfully!")
                                    else:
                                        st.error("❌ Failed to sync machine")
                    
                    # Bulk sync
                    st.markdown("---")
                    if st.button(f"🔄 Sync All Machines in Category ({len(machines)} machines)", key="bulk_sync_new_old"):
                        st.write(f"🚀 Syncing all machines from '{selected_category}'...")
                        
                        success_count = 0
                        for machine_name in machines.keys():
                            success = old_db.sync_machine(new_db, selected_category, machine_name)
                            if success:
                                success_count += 1
                            st.write(f"  {'✅' if success else '❌'} {machine_name}")
                        
                        st.success(f"✅ Sync completed! {success_count}/{len(machines)} machines synced.")
                        if success_count == len(machines):
                            st.balloons()


# def show_delete_page(old_db, new_db):
#     """Show delete page"""
#     st.header("🗑️ Delete Machines (Android Style)")
#     st.info("This follows the exact same deletion pattern as your Android Kotlin code")
    
#     # Get categories from old database
#     categories = old_db.get_categories()
    
#     if categories:
#         # Select category
#         selected_category = st.selectbox("Select Category", list(categories.keys()), key="delete_category_select")
        
#         if selected_category:
#             # Get machines
#             machines = old_db.get_machines(selected_category)
            
#             if machines:
#                 st.write(f"Found {len(machines)} machines in '{selected_category}':")
                
#                 # Show machines
#                 for machine_name, machine_data in machines.items():
#                     with st.expander(f"⚙️ {machine_name}"):
#                         st.write(f"**Name:** {machine_name}")
#                         st.write(f"**Detail 1:** {machine_data.get('detail1', 'Not set')}")
#                         st.write(f"**Detail 2:** {machine_data.get('detail2', 'Not set')}")
                        
#                         # Create unique keys for each machine
#                         delete_key = f"delete_{selected_category}_{machine_name}"
#                         confirm_key = f"confirm_{selected_category}_{machine_name}"
                        
#                         if st.button(f"🗑️ Delete {machine_name}", key=delete_key):
#                             st.session_state[confirm_key] = True
                        
#                         # Show confirmation if delete was clicked
#                         if st.session_state.get(confirm_key, False):
#                             st.warning(f"⚠️ Are you sure you want to delete '{machine_name}'?")
                            
#                             col1, col2 = st.columns(2)
#                             with col1:
#                                 if st.button(f"✅ YES, DELETE", key=f"yes_{confirm_key}"):
#                                     st.write("🚀 Starting Android-style deletion process...")
                                    
#                                     # Delete from both databases using Android method
#                                     col1, col2 = st.columns(2)
                                    
#                                     with col1:
#                                         st.write("**🗃️ Old Database:**")
#                                         success_old = old_db.delete_machine_like_android(selected_category, machine_name)
                                    
#                                     with col2:
#                                         st.write("**🆕 New Database:**")
#                                         success_new = new_db.delete_machine_like_android(selected_category, machine_name)
                                    
#                                     # Results
#                                     if success_old and success_new:
#                                         st.success("✅ Machine deleted from both databases!")
#                                         st.balloons()
#                                         # Clear the confirmation state
#                                         if confirm_key in st.session_state:
#                                             del st.session_state[confirm_key]
#                                         time.sleep(1)
#                                         st.rerun()
#                                     elif success_old or success_new:
#                                         st.warning("⚠️ Partial success")
#                                         if success_old:
#                                             st.info("✅ Deleted from Old Database")
#                                         if success_new:
#                                             st.info("✅ Deleted from New Database")
#                                     else:
#                                         st.error("❌ Failed to delete from both databases")
                                    
#                                     # Clear confirmation state after processing
#                                     if confirm_key in st.session_state:
#                                         del st.session_state[confirm_key]
                            
#                             with col2:
#                                 if st.button(f"❌ CANCEL", key=f"no_{confirm_key}"):
#                                     # Clear the confirmation state
#                                     if confirm_key in st.session_state:
#                                         del st.session_state[confirm_key]
#                                     st.rerun()
#             else:
#                 st.info("No machines found in this category")
#     else:
#         st.warning("No categories found. Please check your database connection.")
    
#     st.markdown("---")
    
#     # Bulk delete option
#     st.header("🔄 Bulk Delete All Machines in Category")
#     st.warning("This will delete ALL machines in the selected category from both databases!")
    
#     if categories and 'selected_category' in locals() and selected_category:
#         machines = old_db.get_machines(selected_category)
        
#         if machines and st.checkbox(f"I want to delete ALL {len(machines)} machines from '{selected_category}'"):
#             if st.button("🚨 DELETE ALL MACHINES IN CATEGORY"):
#                 if st.button("🚨 FINAL CONFIRMATION - DELETE ALL"):
#                     st.write(f"💥 Deleting all machines from category '{selected_category}'...")
                    
#                     total_machines = len(machines)
#                     success_count = 0
                    
#                     for i, (machine_name, machine_data) in enumerate(machines.items(), 1):
#                         st.write(f"🔄 Processing {i}/{total_machines}: {machine_name}")
                        
#                         # Delete from both databases
#                         success_old = old_db.delete_machine_like_android(selected_category, machine_name)
#                         success_new = new_db.delete_machine_like_android(selected_category, machine_name)
                        
#                         if success_old and success_new:
#                             success_count += 1
#                             st.write(f"   ✅ Successfully deleted from both databases")
#                         else:
#                             st.write(f"   ❌ Failed to delete from one or both databases")
                    
#                     st.success(f"✅ Bulk deletion completed! {success_count}/{total_machines} machines deleted successfully.")
#                     if success_count == total_machines:
#                         st.balloons()

def show_delete_page(old_db, new_db):
    """Show delete page with category deletion option"""
    st.header("🗑️ Delete Machines (Android Style) & Categories")
    st.info("This follows the exact same deletion pattern as your Android Kotlin code")
    
    # Get categories from old database
    categories = old_db.get_categories()
    
    if categories:
        # Select category
        selected_category = st.selectbox("Select Category", list(categories.keys()), key="delete_category_select")
        
        if selected_category:
            # ====== NEW: COMPLETE CATEGORY DELETION OPTION ======
            st.markdown("---")
            st.header("🚨 DELETE COMPLETE CATEGORY")
            st.error(f"⚠️ DANGER ZONE: This will DELETE THE ENTIRE CATEGORY '{selected_category}' including ALL machines and subcollections!")
            
            # Show category info
            category_data = categories[selected_category]
            machines = old_db.get_machines(selected_category)
            
            with st.expander("📋 Category Information"):
                st.write(f"**Category ID:** {selected_category}")
                st.write(f"**Category Name:** {category_data.get('categoryName', 'N/A')}")
                st.write(f"**Total Machines:** {len(machines) if machines else 0}")
                if machines:
                    st.write("**Machines to be deleted:**")
                    for machine_name in machines.keys():
                        st.write(f"  • {machine_name}")
            
            # Confirmation checkbox
            confirm_category_delete = st.checkbox(
                f"I understand this will PERMANENTLY DELETE the entire '{selected_category}' category and ALL its data",
                key="confirm_category_delete"
            )
            
            if confirm_category_delete:
                if st.button(f"🗑️ DELETE COMPLETE CATEGORY '{selected_category}'", key="delete_complete_category_btn"):
                    st.write(f"🚀 Starting complete deletion of category '{selected_category}'...")
                    
                    # Delete category from both databases
                    col1, col2 = st.columns(2)
                    
                    with col1:
                        st.write("**🗃️ Old Database:**")
                        success_old = old_db.delete_document_simple(f"categories/{selected_category}")
                    
                    with col2:
                        st.write("**🆕 New Database:**")
                        success_new = new_db.delete_document_simple(f"categories/{selected_category}")
                    
                    # Results
                    if success_old and success_new:
                        st.success("✅ Category deleted from both databases!")
                        st.balloons()
                        time.sleep(1)
                        st.rerun()
                    elif success_old or success_new:
                        st.warning("⚠️ Partial success deleting category")
                        if success_old:
                            st.info("✅ Deleted category from Old Database")
                        if success_new:
                            st.info("✅ Deleted category from New Database")
                    else:
                        st.error("❌ Failed to delete category from both databases")
            
            st.markdown("---")
            
            # ====== EXISTING: INDIVIDUAL MACHINE DELETION ======
            # Get machines
            machines = old_db.get_machines(selected_category)
            
            if machines:
                st.header("🔧 Delete Individual Machines")
                st.write(f"Found {len(machines)} machines in '{selected_category}':")
                
                # Show machines
                for machine_name, machine_data in machines.items():
                    with st.expander(f"⚙️ {machine_name}"):
                        st.write(f"**Name:** {machine_name}")
                        st.write(f"**Detail 1:** {machine_data.get('detail1', 'Not set')}")
                        st.write(f"**Detail 2:** {machine_data.get('detail2', 'Not set')}")
                        
                        # Create unique keys for each machine
                        delete_key = f"delete_{selected_category}_{machine_name}"
                        confirm_key = f"confirm_{selected_category}_{machine_name}"
                        
                        if st.button(f"🗑️ Delete {machine_name}", key=delete_key):
                            st.session_state[confirm_key] = True
                        
                        # Show confirmation if delete was clicked
                        if st.session_state.get(confirm_key, False):
                            st.warning(f"⚠️ Are you sure you want to delete '{machine_name}'?")
                            
                            col1, col2 = st.columns(2)
                            with col1:
                                if st.button(f"✅ YES, DELETE", key=f"yes_{confirm_key}"):
                                    st.write("🚀 Starting Android-style deletion process...")
                                    
                                    # Delete from both databases using Android method
                                    col1, col2 = st.columns(2)
                                    
                                    with col1:
                                        st.write("**🗃️ Old Database:**")
                                        success_old = old_db.delete_machine_like_android(selected_category, machine_name)
                                    
                                    with col2:
                                        st.write("**🆕 New Database:**")
                                        success_new = new_db.delete_machine_like_android(selected_category, machine_name)
                                    
                                    # Results
                                    if success_old and success_new:
                                        st.success("✅ Machine deleted from both databases!")
                                        st.balloons()
                                        # Clear the confirmation state
                                        if confirm_key in st.session_state:
                                            del st.session_state[confirm_key]
                                        time.sleep(1)
                                        st.rerun()
                                    elif success_old or success_new:
                                        st.warning("⚠️ Partial success")
                                        if success_old:
                                            st.info("✅ Deleted from Old Database")
                                        if success_new:
                                            st.info("✅ Deleted from New Database")
                                    else:
                                        st.error("❌ Failed to delete from both databases")
                                    
                                    # Clear confirmation state after processing
                                    if confirm_key in st.session_state:
                                        del st.session_state[confirm_key]
                            
                            with col2:
                                if st.button(f"❌ CANCEL", key=f"no_{confirm_key}"):
                                    # Clear the confirmation state
                                    if confirm_key in st.session_state:
                                        del st.session_state[confirm_key]
                                    st.rerun()
            else:
                st.info("No machines found in this category")
    else:
        st.warning("No categories found. Please check your database connection.")
    
    st.markdown("---")
    
    # Bulk delete option for machines only
    st.header("🔄 Bulk Delete All Machines in Category")
    st.warning("This will delete ALL machines in the selected category from both databases!")
    
    if categories and 'selected_category' in locals() and selected_category:
        machines = old_db.get_machines(selected_category)
        
        if machines and st.checkbox(f"I want to delete ALL {len(machines)} machines from '{selected_category}'"):
            if st.button("🚨 DELETE ALL MACHINES IN CATEGORY"):
                if st.button("🚨 FINAL CONFIRMATION - DELETE ALL MACHINES"):
                    st.write(f"💥 Deleting all machines from category '{selected_category}'...")
                    
                    total_machines = len(machines)
                    success_count = 0
                    
                    for i, (machine_name, machine_data) in enumerate(machines.items(), 1):
                        st.write(f"🔄 Processing {i}/{total_machines}: {machine_name}")
                        
                        # Delete from both databases
                        success_old = old_db.delete_machine_like_android(selected_category, machine_name)
                        success_new = new_db.delete_machine_like_android(selected_category, machine_name)
                        
                        if success_old and success_new:
                            success_count += 1
                            st.write(f"   ✅ Successfully deleted from both databases")
                        else:
                            st.write(f"   ❌ Failed to delete from one or both databases")
                    
                    st.success(f"✅ Bulk deletion completed! {success_count}/{total_machines} machines deleted successfully.")
                    if success_count == total_machines:
                        st.balloons()



def main():
    st.set_page_config(page_title="Firebase Machine Management Tool", layout="wide")
    
    st.title("🔥 Firebase Machine Management Tool")
    st.markdown("Complete CRUD operations for your Firebase machine database!")
    
    # Load configurations from URLs automatically
    st.header("🔗 Firebase Configuration")
    
    with st.spinner("Loading Firebase configurations..."):
        old_config, new_config = load_firebase_configs_from_urls()
    
    if old_config and new_config:
        st.success("✅ Firebase configurations loaded successfully!")
        
        # Show project info
        col1, col2 = st.columns(2)
        with col1:
            st.info(f"**Old Database:** {old_config['project_id']}")
        with col2:
            st.info(f"**New Database:** {new_config['project_id']}")
        
        # Initialize debuggers
        old_db = FirebaseDebugger(old_config['project_id'], old_config['api_key'])
        new_db = FirebaseDebugger(new_config['project_id'], new_config['api_key'])
        
        st.markdown("---")
        
        # Navigation
        st.header("🧭 Navigation")
        tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
            "🔗 Connection Test", 
            "➕ Add Category", 
            "🔧 Add Machine", 
            "✏️ Edit Machine", 
            "🗑️ Delete Machine", 
            "🔄 Sync Databases"
        ])
        
        with tab1:
            st.subheader("🔗 Connection Test")
            col1, col2 = st.columns(2)
            
            with col1:
                if st.button("Test Old Database Connection"):
                    try:
                        categories = old_db.get_categories()
                        if categories:
                            st.success(f"✅ Connected! Found {len(categories)} categories")
                            for cat_id, cat_data in categories.items():
                                st.write(f"• {cat_data.get('categoryName', cat_id)}")
                        else:
                            st.warning("Connected but no categories found")
                    except Exception as e:
                        st.error(f"❌ Connection failed: {e}")
            
            with col2:
                if st.button("Test New Database Connection"):
                    try:
                        categories = new_db.get_categories()
                        if categories:
                            st.success(f"✅ Connected! Found {len(categories)} categories")
                            for cat_id, cat_data in categories.items():
                                st.write(f"• {cat_data.get('categoryName', cat_id)}")
                        else:
                            st.warning("Connected but no categories found")
                    except Exception as e:
                        st.error(f"❌ Connection failed: {e}")
        
        with tab2:
            show_add_category_page(old_db, new_db)
        
        with tab3:
            show_add_machine_page(old_db, new_db)
        
        with tab4:
            show_edit_machine_page(old_db, new_db)
        
        with tab5:
            show_delete_page(old_db, new_db)
        
        with tab6:
            show_sync_page(old_db, new_db)
        
    else:
        st.error("❌ Failed to load Firebase configurations from server")
        st.info("Please check that the JSON files are accessible at:")
        st.write("- Old Database: https://asengineeringworks.in/oldjson")
        st.write("- New Database: https://asengineeringworks.in/new.json")
        
        # Optional: Add manual refresh button
        if st.button("🔄 Retry Loading Configurations"):
            st.rerun()


if __name__ == "__main__":
    main()
