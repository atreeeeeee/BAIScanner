# assign_barcodes.py

def parse_barcode(barcode_str):
    """
    Parses a 12-digit barcode and extracts the actual user ID to query from the API.

    Barcode format:
    - First 4 digits: Family ID (e.g., 0254)
    - Next 4 digits: User ID (0000 means it's the primary registrant)
    - Last 4 digits: Reserved/ignored

    Returns:
        int: The user ID to be used in the API request
    """
    if len(barcode_str) != 12 or not barcode_str.isdigit():
        raise ValueError("Barcode must be exactly 12 numeric digits.")

    family_id_str = barcode_str[0:4]
    user_id_str = barcode_str[4:8]

    if user_id_str == "0000":
        # Primary registrant, use family ID as user ID
        return int(family_id_str)
    else:
        # Family member, use actual user ID from the barcode
        return int(user_id_str)
