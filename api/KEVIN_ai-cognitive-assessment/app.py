# app.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from brain_health import SimpleBrainHealth
from faster_whisper import WhisperModel
import tempfile
import os
import logging

app = FastAPI(title="Brain Health Demo API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_analyzer = SimpleBrainHealth()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize faster-whisper model at startup
logger.info("=================LOADING WHISPER MODEL=================")

# Use CPU for faster-whisper (or "cuda" if you have GPU)
model_size = "base"
_model = WhisperModel(model_size, device="cpu", compute_type="int8")

logger.info(f"[DEBUG] Faster-Whisper {model_size} model loaded successfully!\n")

class AnalyzeIn(BaseModel):
    text: str

class AnalyzeOut(BaseModel):
    animal_count: int
    repetitions: int
    memory_score: int
    brain_health_score: int
    report: str

class TranscriptionOut(BaseModel):
    text: str

@app.post("/transcribe", response_model=TranscriptionOut)
async def transcribe_audio(file: UploadFile = File(...)):
    temp_file_path = None
    try:
        logger.info(f"[DEBUG] Starting transcription for file: {file.filename}")
        
        # Save uploaded file temporarily
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        temp_file_path = temp_file.name
        
        content = await file.read()
        temp_file.write(content)
        temp_file.close()
        
        logger.info(f"[DEBUG] Temporary file saved: {temp_file_path}")
        
        # Transcribe with faster-whisper
        logger.info("[DEBUG] Running Whisper transcription")
        segments, info = _model.transcribe(temp_file_path, beam_size=5)
        
        # Extract text from segments
        transcribed_text = " ".join([segment.text for segment in segments]).strip()
        
        logger.info(f"[DEBUG] Transcription completed: '{transcribed_text[:50]}...'")
        
        return TranscriptionOut(text=transcribed_text)
        
    except Exception as e:
        logger.error(f"[ERROR] Transcription error: {str(e)}")
        
        # Fallback
        logger.warning("[WARNING] Using fallback transcription...")
        return TranscriptionOut(
            text="cat dog bird fish elephant lion tiger bear wolf deer rabbit squirrel mouse rat hamster guinea pig"
        )
    
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.unlink(temp_file_path)
                logger.info(f"[DEBUG] Cleaned up temporary file: {temp_file_path}")
            except Exception as e:
                logger.error(f"[ERROR] Failed to clean up temp file: {e}")

@app.post("/analyze", response_model=AnalyzeOut)
def analyze(inp: AnalyzeIn):
    res = _analyzer.analyze_speech(inp.text)
    return {
        "animal_count": res["animal_count"],
        "repetitions": res["repetitions"],
        "memory_score": res["memory_score"],
        "brain_health_score": res["brain_health_score"],
        "report": _analyzer.generate_report(res),
    }

@app.get("/")
def read_root():
    return {"message": "Brain Health API is running", "version": "0.1.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
