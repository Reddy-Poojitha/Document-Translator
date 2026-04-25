import re


def mask_sensitive_data(text):

    mask_map = {}
    counter = 1


    # -----------------------------
    # Helper functions
    # -----------------------------

    def replace_regex(pattern, label, text):
        nonlocal counter

        matches = re.findall(pattern, text)

        for match in matches:
            token = f"<{label}_{counter}>"
            mask_map[token] = match
            text = text.replace(match, token, 1)
            counter += 1

        return text


    def replace_context(pattern, number_pattern, label, text):
        nonlocal counter

        matches = re.finditer(pattern, text, re.IGNORECASE)

        for match in matches:

            full_match = match.group(0)

            number_match = re.search(number_pattern, full_match)

            if number_match:

                number = number_match.group(0)

                token = f"<{label}_{counter}>"
                mask_map[token] = number

                text = text.replace(number, token, 1)

                counter += 1

        return text


    # -----------------------------
    # CONTEXT-AWARE MASKING FIRST
    # (important ordering)
    # -----------------------------

    # Aadhaar number
    text = replace_context(
        r'(Aadhaar\s*[:\-]?\s*\d{12})',
        r'\d{12}',
        "AADHAAR",
        text
    )

    # Bank account number
    text = replace_context(
        r'(Account\s*(?:Number|No\.?)\s*[:\-]?\s*\d{9,18})',
        r'\d{9,18}',
        "ACCOUNT",
        text
    )

    # Date of Birth
    text = replace_context(
        r'(DOB\s*[:\-]?\s*\d{2}[/-]\d{2}[/-]\d{4})',
        r'\d{2}[/-]\d{2}[/-]\d{4}',
        "DOB",
        text
    )

    # Password
    text = replace_context(
        r'(Password\s*[:\-]?\s*\S+)',
        r'\S+',
        "PASSWORD",
        text
    )

    # Secure PIN
    text = replace_context(
        r'(PIN\s*[:\-]?\s*\d{4,6})',
        r'\d{4,6}',
        "SECUREPIN",
        text
    )

    # OTP
    text = replace_context(
        r'(OTP\s*[:\-]?\s*\d{4,8})',
        r'\d{4,8}',
        "OTP",
        text
    )


    # -----------------------------
    # HOUSE NUMBER MASKING
    # (fixed version)
    # -----------------------------

    house_matches = re.finditer(
        r'\b(?:H\.?\s*No|House\s+No|Flat\s+No|Door\s+No|Plot\s+No|Survey\s+No)\s*[:\-]?\s*([0-9A-Za-z\-\/]+)',
        text,
        re.IGNORECASE
    )

    for match in house_matches:

        house_number = match.group(1)

        token = f"<HOUSENO_{counter}>"
        mask_map[token] = house_number

        text = text.replace(house_number, token, 1)

        counter += 1


    # -----------------------------
    # POSTAL PIN CODE MASKING
    # -----------------------------

    postal_pin_matches = re.finditer(
        r'(?:-\s*(\d{6}))',
        text
    )

    for match in postal_pin_matches:

        pin = match.group(1)

        token = f"<PIN_{counter}>"
        mask_map[token] = pin

        text = text.replace(pin, token, 1)

        counter += 1


    # -----------------------------
    # REGEX-ONLY MASKING LAST
    # (important ordering)
    # -----------------------------

    # Email
    text = replace_regex(
        r'\b[\w\.-]+@[\w\.-]+\.\w+\b',
        "EMAIL",
        text
    )

    # PAN
    text = replace_regex(
        r'\b[A-Z]{5}[0-9]{4}[A-Z]\b',
        "PAN",
        text
    )

    # IFSC
    text = replace_regex(
        r'\b[A-Z]{4}0[A-Z0-9]{6}\b',
        "IFSC",
        text
    )

    # UPI
    text = replace_regex(
        r'\b[\w\.-]+@[a-zA-Z]+\b',
        "UPI",
        text
    )

    # Phone number LAST (avoid masking CIF/IDs)
    text = replace_regex(
        r'\b[6-9]\d{9}\b',
        "PHONE",
        text
    )


    return text, mask_map


def restore_masked_data(text, mask_map):

    for token, original in mask_map.items():
        text = text.replace(token, original)

    return text