from fastapi import FastAPI, UploadFile, File, Form, Body
from fastapi.middleware.cors import CORSMiddleware

from extractor import (
    extract_text_from_pdf,
    extract_text_from_docx,
    extract_text_from_txt
)

from masker import mask_sensitive_data, restore_masked_data
from domain_classifier import predict_domain
from translator import process_text
from speech import generate_audio_base64


app = FastAPI()

# Enable frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload/")
async def upload_document(
    file: UploadFile = File(...),
    mode: str = Form("translate")
):
    """
    Upload → Extract → Mask → Translate → Return TEXT ONLY
    """

    file_bytes = await file.read()

    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file_bytes)

    elif file.filename.endswith(".docx"):
        text = extract_text_from_docx(file_bytes)

    elif file.filename.endswith(".txt"):
        text = extract_text_from_txt(file_bytes)

    else:
        return {"error": "Unsupported file format ❌"}

    domain = predict_domain(text)

    masked_text, mask_map = mask_sensitive_data(text)

    result = process_text(masked_text, domain, mode=mode)

    if mode == "both":

        translated_text = restore_masked_data(
            result["translation"], mask_map
        )

        explanation_text = restore_masked_data(
            result["explanation"], mask_map
        )

        return {
            "domain": domain,
            "mode": mode,
            "translated_text": translated_text,
            "explanation_text": explanation_text
        }

    else:

        final_text = restore_masked_data(result, mask_map)

        return {
            "domain": domain,
            "mode": mode,
            "translated_text": final_text
        }


@app.post("/generate-audio/")
async def generate_audio_endpoint(text: str = Body(...)):
    """
    Generate Telugu speech separately after translation
    """

    audio_base64 = generate_audio_base64(text)

    return {
        "audio_base64": audio_base64
    }