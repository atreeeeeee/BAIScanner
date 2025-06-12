import requests

API_KEY = "a16e6d38-5c4a-444a-b271-1d3d5d03c0e9"
BASE_URL = "https://tsdpregistration.azurewebsites.net/api"

def get_sponsorship_level_from_barcode():
    barcode = input("Enter 12-digit barcode: ").strip()

    if len(barcode) != 12 or not barcode.isdigit():
        print("Invalid barcode format. Must be 12 digits.")
        return

    family_id = int(barcode[:4])
    user_id_part = barcode[4:8]

    try:
        user_id = int(user_id_part)
    except ValueError:
        print("Invalid user ID in barcode.")
        return

    headers = {"apiKey": API_KEY}

    # Step 1: Get full family info
    try:
        user_response = requests.get(f"{BASE_URL}/user/{family_id}", headers=headers)
        user_response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching user info: {e}")
        return

    user_json = user_response.json()
    data = user_json.get("Data", {})
    primary_user = data.get("User")
    family_members = data.get("Family", [])

    if not primary_user:
        print("Primary user not found.")
        return

    # Determine who scanned in
    if user_id == 0 or user_id == family_id:
        name = f"{primary_user.get('fname')} {primary_user.get('lname')}"
    else:
        member = next((m for m in family_members if m.get("id") == user_id), None)
        if member:
            name = f"{member.get('fname')} {member.get('lname')}"
        else:
            print("No matching user found for the given barcode.")
            return

    # Step 2: Lookup sponsorship level using primary email
    email = primary_user.get("email")
    if not email:
        print("Primary user email not found.")
        return

    try:
        reg_response = requests.get(f"{BASE_URL}/user/confirmed-registration-type/{email}", headers=headers)
        reg_response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching registration type: {e}")
        return

    reg_json = reg_response.json()
    message = reg_json.get("Message")
    reg_data = reg_json.get("Data", [])

    # Step 3: Print results
    if reg_data:
        print(f"{name} – Sponsorship Level: {reg_data[0]}")
    else:
        print(f"{name} – {message}")

# Run it
get_sponsorship_level_from_barcode()
