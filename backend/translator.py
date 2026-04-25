# # import os
# # import json
# # import re
# # from dotenv import load_dotenv
# # import google.generativeai as genai


# # # Load environment variables
# # load_dotenv(dotenv_path=".env")

# # # Read API key
# # api_key = os.getenv("GEMINI_API_KEY")

# # if not api_key:
# #     raise ValueError("GEMINI_API_KEY not found in .env file")

# # # Configure Gemini
# # genai.configure(api_key=api_key)

# # # Load model
# # model = genai.GenerativeModel("gemini-2.5-flash")


# # def extract_json_from_response(text):
# #     """
# #     Safely extract JSON block from Gemini response.
# #     Handles cases where model adds extra text before/after JSON.
# #     """
# #     match = re.search(r"\{.*\}", text, re.DOTALL)
# #     if not match:
# #         raise ValueError("No JSON object found in Gemini response.")

# #     json_text = match.group()
# #     return json.loads(json_text)


# # def process_text(text, domain, mode="translate"):
# #     """
# #     mode options:
# #         translate  -> formal Telugu translation
# #         simplify   -> explanation of document in simple Telugu
# #         both       -> translation + explanation (returned separately)
# #     """

# #     # -------------------------
# #     # TRANSLATE MODE
# #     # -------------------------
# #     if mode == "translate":

# #         prompt = f"""
# # Translate the following {domain} document into Telugu.

# # Important Rules:
# # 1. Return ONLY Telugu text.
# # 2. Do NOT include English sentences.
# # 3. Preserve exact meaning.
# # 4. Maintain formatting and structure.
# # 5. Do NOT summarize content.
# # 6. Keep placeholders unchanged like <ACCOUNT_1>.

# # Document:
# # <<<START>>>
# # {text}
# # <<<END>>>
# # """

# #         response = model.generate_content(prompt)
# #         return response.text.strip()


# #     # -------------------------
# #     # SIMPLIFY MODE
# #     # -------------------------
# #     elif mode == "simplify":

# #         prompt = f"""
# # Read the following {domain} document and explain its meaning in simple Telugu so that a common person can easily understand it.

# # Instructions:
# # 1. Explain the document as a whole.
# # 2. Include important details like amount, purpose, conditions, deadlines, and required actions.
# # 3. Do NOT translate sentence-by-sentence.
# # 4. Do NOT include English text.
# # 5. Keep placeholders unchanged like <ACCOUNT_1>.
# # 6. Write in clear paragraph-style Telugu.

# # Document:
# # <<<START>>>
# # {text}
# # <<<END>>>
# # """

# #         response = model.generate_content(prompt)
# #         return response.text.strip()


# #     # -------------------------
# #     # BOTH MODE
# #     # -------------------------
# #     elif mode == "both":

# #         prompt = f"""
# # Translate the following {domain} document into Telugu and also explain its meaning in simple Telugu.

# # Return ONLY valid JSON in this exact format:

# # {{
# #   "translation": "...",
# #   "explanation": "..."
# # }}

# # Do NOT add any extra text before or after JSON.

# # Instructions:
# # 1. "translation" must contain the full Telugu translation.
# # 2. "explanation" must describe the document meaning as a whole.
# # 3. Include important details like amount, conditions, deadlines, and actions required.
# # 4. Do NOT include English sentences.
# # 5. Keep placeholders unchanged like <ACCOUNT_1>.
# # 6. Preserve all important information.

# # Document:
# # <<<START>>>
# # {text}
# # <<<END>>>
# # """

# #         response = model.generate_content(prompt)

# #         try:
# #             parsed = extract_json_from_response(response.text)
# #             return parsed

# #         except Exception as e:
# #             raise ValueError(
# #                 f"Gemini returned invalid JSON format. Raw response:\n{response.text}"
# #             )


# #     else:
# #         raise ValueError("Invalid mode selected. Use: translate, simplify, or both.")




# import os
# import json
# import re
# from dotenv import load_dotenv
# import google.generativeai as genai


# # Load environment variables
# load_dotenv(dotenv_path=".env")


# # Read API keys
# TRANSLATE_API_KEY = os.getenv("GEMINI_TRANSLATE_KEY")
# SIMPLIFY_API_KEY = os.getenv("GEMINI_SIMPLIFY_KEY")


# if not TRANSLATE_API_KEY:
#     raise ValueError("GEMINI_TRANSLATE_KEY not found in .env file")

# if not SIMPLIFY_API_KEY:
#     raise ValueError("GEMINI_SIMPLIFY_KEY not found in .env file")


# MODEL_NAME = "gemini-2.5-flash"


# def get_model(api_key):
#     """
#     Returns Gemini model configured with given API key
#     """
#     genai.configure(api_key=api_key)
#     return genai.GenerativeModel(MODEL_NAME)


# def extract_json_from_response(text):
#     """
#     Safely extract JSON block from Gemini response.
#     Handles cases where model adds extra text before/after JSON.
#     """
#     match = re.search(r"\{.*\}", text, re.DOTALL)

#     if not match:
#         raise ValueError("No JSON object found in Gemini response.")

#     json_text = match.group()

#     return json.loads(json_text)


# def process_text(text, domain, mode="translate"):
#     """
#     mode options:
#         translate  -> Telugu translation
#         simplify   -> simple Telugu explanation
#         both       -> translation + explanation
#     """

#     # =========================
#     # TRANSLATE MODE
#     # =========================
#     if mode == "translate":

#         model = get_model(TRANSLATE_API_KEY)

#         prompt = f"""
# Translate the following {domain} document into clear and user-friendly Telugu.

# Important Rules:
# 1. Return ONLY Telugu text.
# 2. Do NOT include English sentences.
# 3. Preserve exact meaning.
# 4. Maintain formatting and structure.
# 5. Do NOT summarize content.
# 6. Keep placeholders unchanged like <ACCOUNT_1>.
# 7. Use simple and natural Telugu (not overly formal Telugu).

# Document:
# <<<START>>>
# {text}
# <<<END>>>
# """

#         response = model.generate_content(prompt)

#         return response.text.strip()


#     # =========================
#     # SIMPLIFY MODE
#     # =========================
#     elif mode == "simplify":

#         model = get_model(SIMPLIFY_API_KEY)

#         prompt = f"""
# Read the following {domain} document and explain its meaning in simple Telugu so that a common person can easily understand it.

# Instructions:
# 1. Explain the document as a whole.
# 2. Include important details like amount, purpose, conditions, deadlines, and required actions.
# 3. Do NOT translate sentence-by-sentence.
# 4. Do NOT include English text.
# 5. Keep placeholders unchanged like <ACCOUNT_1>.
# 6. Use clear conversational Telugu.

# Document:
# <<<START>>>
# {text}
# <<<END>>>
# """

#         response = model.generate_content(prompt)

#         return response.text.strip()


#     # =========================
#     # BOTH MODE
#     # =========================
#     elif mode == "both":

#         model = get_model(SIMPLIFY_API_KEY)

#         prompt = f"""
# Translate the following {domain} document into Telugu and also explain its meaning in simple Telugu.

# Return ONLY valid JSON in this exact format:

# {{
#   "translation": "...",
#   "explanation": "..."
# }}

# Do NOT add any extra text before or after JSON.

# Instructions:
# 1. "translation" must contain full Telugu translation.
# 2. "explanation" must describe the document meaning clearly.
# 3. Include important details like amount, conditions, deadlines, and actions required.
# 4. Do NOT include English sentences.
# 5. Keep placeholders unchanged like <ACCOUNT_1>.
# 6. Use simple and natural Telugu.

# Document:
# <<<START>>>
# {text}
# <<<END>>>
# """

#         response = model.generate_content(prompt)

#         try:
#             parsed = extract_json_from_response(response.text)

#             return parsed

#         except Exception:

#             raise ValueError(
#                 f"Gemini returned invalid JSON format.\nRaw response:\n{response.text}"
#             )


#     # =========================
#     # INVALID MODE
#     # =========================
#     else:

#         raise ValueError("Invalid mode selected. Use: translate, simplify, or both.")


import os
import json
import re
from dotenv import load_dotenv
import google.generativeai as genai


# Load environment variables
load_dotenv(dotenv_path=".env")


# Read API keys
TRANSLATE_API_KEY = os.getenv("GEMINI_TRANSLATE_KEY")
SIMPLIFY_API_KEY = os.getenv("GEMINI_SIMPLIFY_KEY")


if not TRANSLATE_API_KEY:
    raise ValueError("GEMINI_TRANSLATE_KEY not found in .env file")

if not SIMPLIFY_API_KEY:
    raise ValueError("GEMINI_SIMPLIFY_KEY not found in .env file")


MODEL_NAME = "gemini-2.5-flash"


def get_model(api_key):
    """
    Configure Gemini model with given API key
    """
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(MODEL_NAME)


def extract_json_from_response(text):
    """
    Safely extract JSON block from Gemini response
    """
    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise ValueError("No JSON object found in Gemini response.")

    json_text = match.group()

    return json.loads(json_text)


def clean_markdown(text):
    """
    Removes markdown formatting like *, ** from Gemini output
    so frontend display and audio sound natural
    """

    # Remove bold formatting **text**
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)

    # Remove bullet stars at line start
    text = re.sub(r"^\s*\*\s*", "", text, flags=re.MULTILINE)

    # Remove remaining stray *
    text = text.replace("*", "")

    return text.strip()


def process_text(text, domain, mode="translate"):
    """
    mode options:
        translate  -> Telugu translation
        simplify   -> simple Telugu explanation
        both       -> translation + explanation
    """

    # =========================
    # TRANSLATE MODE
    # =========================
    if mode == "translate":

        model = get_model(TRANSLATE_API_KEY)

        prompt = f"""
Translate the following {domain} document into clear and user-friendly Telugu.

Important Rules:
1. Return ONLY plain Telugu text.
2. Do NOT include English sentences.
3. Do NOT use bullet points (*), markdown (**), or formatting symbols.
4. Preserve exact meaning.
5. Maintain paragraph structure.
6. Do NOT summarize content.
7. Keep placeholders unchanged like <ACCOUNT_1>.
8. Use simple natural Telugu instead of overly formal Telugu.

Document:
<<<START>>>
{text}
<<<END>>>
"""

        response = model.generate_content(prompt)

        return clean_markdown(response.text.strip())


    # =========================
    # SIMPLIFY MODE
    # =========================
    elif mode == "simplify":

        model = get_model(SIMPLIFY_API_KEY)

        prompt = f"""
Read the following {domain} document and explain its meaning in simple Telugu so that a common person can easily understand it.

Instructions:
1. Explain the document as a whole.
2. Include important details like amount, purpose, conditions, deadlines, and required actions.
3. Do NOT translate sentence-by-sentence.
4. Do NOT include English text.
5. Do NOT use bullet points (*), markdown (**), or formatting symbols.
6. Keep placeholders unchanged like <ACCOUNT_1>.
7. Write in clear conversational Telugu.

Document:
<<<START>>>
{text}
<<<END>>>
"""

        response = model.generate_content(prompt)

        return clean_markdown(response.text.strip())


    # =========================
    # BOTH MODE
    # =========================
    elif mode == "both":

        model = get_model(SIMPLIFY_API_KEY)

        prompt = f"""
Translate the following {domain} document into Telugu and also explain its meaning in simple Telugu.

Return ONLY valid JSON in this exact format:

{{
  "translation": "...",
  "explanation": "..."
}}

Do NOT add extra text outside JSON.

Instructions:
1. "translation" must contain full Telugu translation.
2. "explanation" must describe document meaning clearly.
3. Include important details like amount, conditions, deadlines, and required actions.
4. Do NOT include English sentences.
5. Do NOT use bullet points (*), markdown (**), or formatting symbols.
6. Keep placeholders unchanged like <ACCOUNT_1>.
7. Use simple natural Telugu.

Document:
<<<START>>>
{text}
<<<END>>>
"""

        response = model.generate_content(prompt)

        try:

            parsed = extract_json_from_response(response.text)

            parsed["translation"] = clean_markdown(parsed["translation"])
            parsed["explanation"] = clean_markdown(parsed["explanation"])

            return parsed

        except Exception:

            raise ValueError(
                f"Gemini returned invalid JSON format.\nRaw response:\n{response.text}"
            )


    # =========================
    # INVALID MODE
    # =========================
    else:

        raise ValueError("Invalid mode selected. Use: translate, simplify, or both.")