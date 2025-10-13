# Authentication Flow

## User Details Collection

Collect the following information from the user:

- **Name**
- **Username**
- **Email**
  - Email Verification Page  
    - Options: `Resend` or `OK`
- **Date of Birth** (DD/MM/YYYY)
- **Gender**  
  - Options: Male / Female only

## Location Permission

- Request location permission from the user.
- Use location data for matching purposes.

## Data Storage

- Store all collected values in the database.

---

## Profile Pictures Upload

Ask the user to upload **3 pictures**:

1. **Profile Picture**
2. **Normal Post**
3. **Normal Post**

> [!NOTE]
> At least one image must clearly show the user's face.

- Validate that uploaded images contain a face.
  - If not, display an error message.

> [!IMPORTANT]
> Learn more at [Face Recognition](FaceRecognition.md)

## Cloud Storage

- Store uploaded files in cloud storage.

---

## Permissions

- Request permission for:
  - **Camera**
  - **Gallery**

## Camera Integration

- Open the built-in camera to allow live image capture.
- Enable live face recognition or capture image in the moment.

## Verification

- Verify the picture or display a loading indicator during processing.
