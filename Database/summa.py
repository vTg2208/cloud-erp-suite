from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
import os

app = FastAPI()

# Define your storage directory
UPLOAD_DIR = "static/uploads"

# Create the directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/admin/upload/")
async def upload_image(file: UploadFile = File(...)):
    # 1. Validate file type (optional but recommended)
    if file.content_type not in ["image/jpeg", "image/png", "image/gif"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    # 2. Create the full path
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # 3. Save the file to the server
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"filename": file.filename, "status": "saved to server"}