# from gtts import gTTS
# from io import BytesIO
# import base64
# import re

# # Maximum characters per chunk for gTTS stability
# MAX_CHUNK_LENGTH = 1000


# def split_text_into_chunks(text, max_length=MAX_CHUNK_LENGTH):
#     """
#     Splits long Telugu text into smaller sentence-based chunks
#     so full audio can be generated without truncation.
#     """

#     # Split text at sentence boundaries
#     sentences = re.split(r'(?<=[.!?।]) +', text)

#     chunks = []
#     current_chunk = ""

#     for sentence in sentences:
#         if len(current_chunk) + len(sentence) <= max_length:
#             current_chunk += " " + sentence
#         else:
#             chunks.append(current_chunk.strip())
#             current_chunk = sentence

#     if current_chunk:
#         chunks.append(current_chunk.strip())

#     return chunks


# def generate_audio_base64(text, language="te"):
#     """
#     Converts long Telugu text into full speech audio (Base64)
#     by chunking and merging audio segments.
#     """

#     audio_stream = BytesIO()

#     # Split long text safely
#     text_chunks = split_text_into_chunks(text)

#     for chunk in text_chunks:
#         chunk_stream = BytesIO()

#         tts = gTTS(text=chunk, lang=language)
#         tts.write_to_fp(chunk_stream)

#         chunk_stream.seek(0)
#         audio_stream.write(chunk_stream.read())

#     audio_stream.seek(0)

#     return base64.b64encode(audio_stream.read()).decode("utf-8")







from gtts import gTTS
from io import BytesIO
import base64
import re


# Maximum characters per chunk for stable audio generation
MAX_CHUNK_LENGTH = 1000


def clean_text_for_audio(text):
    """
    Removes markdown symbols like *, ** and masked *** symbols
    without adding any replacement words.
    Keeps original Telugu content unchanged.
    """

    # Remove bold markdown **text**
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)

    # Remove bullet stars at beginning of lines
    text = re.sub(r"^\s*\*\s*", "", text, flags=re.MULTILINE)

    # Remove sequences like ***
    text = re.sub(r"\*{2,}", "", text)

    # Remove any remaining stray *
    text = text.replace("*", "")

    return text.strip()


def split_text_into_chunks(text, max_length=MAX_CHUNK_LENGTH):
    """
    Splits Telugu text into sentence-based chunks
    for stable long audio generation.
    """

    sentences = re.split(r'(?<=[.!?।:])\s+', text)

    chunks = []
    current_chunk = ""

    for sentence in sentences:

        if len(current_chunk) + len(sentence) <= max_length:
            current_chunk += " " + sentence
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks


def generate_audio_base64(text, language="te"):
    """
    Converts Telugu text into Base64 audio
    after cleaning markdown formatting symbols.
    """

    # Clean formatting before audio generation
    text = clean_text_for_audio(text)

    audio_stream = BytesIO()

    text_chunks = split_text_into_chunks(text)

    for chunk in text_chunks:

        chunk_stream = BytesIO()

        tts = gTTS(text=chunk, lang=language)
        tts.write_to_fp(chunk_stream)

        chunk_stream.seek(0)
        audio_stream.write(chunk_stream.read())

    audio_stream.seek(0)

    return base64.b64encode(audio_stream.read()).decode("utf-8")