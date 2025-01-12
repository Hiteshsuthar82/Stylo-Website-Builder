# API Routes Documentation

## Base URL
`http://localhost:8000/api/v1/`

### User Routes
- **Base URL:** `http://localhost:8000/api/v1/user`
  - Description: User-related routes for authentication and profile management.

#### Register User
- **Method:** `POST`
- **Route:** `http://localhost:8000/api/v1/user/register`
- **Controller Function:** `registerUser`
- **Middleware:** `upload.fields([{ name: "avatar", maxCount: 1 }])`
- **Description:** Registers a new user with an optional avatar.

#### Login User
- **Method:** `POST`
- **Route:** `http://localhost:8000/api/v1/user/login`
- **Controller Function:** `loginUser`
- **Description:** Logs in a user and provides access tokens.

#### Logout User (Secured)
- **Method:** `POST`
- **Route:** `http://localhost:8000/api/v1/user/logout`
- **Controller Function:** `logoutUser`
- **Middleware:** `verifyJWT`
- **Description:** Logs out a user and invalidates the access token.

#### Refresh Access Token (Secured)
- **Method:** `POST`
- **Route:** `http://localhost:8000/api/v1/user/refresh-token`
- **Controller Function:** `refreshAccessToken`
- **Middleware:** `verifyJWT`
- **Description:** Refreshes the access token for authenticated users.

#### Change Password (Secured)
- **Method:** `PATCH`
- **Route:** `http://localhost:8000/api/v1/user/change-password`
- **Controller Function:** `changePassword`
- **Middleware:** `verifyJWT`
- **Description:** Allows users to change their password.

#### Update User Profile (Secured)
- **Method:** `PATCH`
- **Route:** `http://localhost:8000/api/v1/user/update-profile`
- **Controller Function:** `updateUserProfile`
- **Middleware:** `verifyJWT`
- **Description:** Updates the user's profile information.

#### Update User Avatar (Secured)
- **Method:** `PATCH`
- **Route:** `http://localhost:8000/api/v1/user/avatar`
- **Controller Function:** `updateUserAvatar`
- **Middleware:** `verifyJWT`, `upload.single("avatar")`
- **Description:** Updates the user's avatar image.

#### Get Current User (Secured)
- **Method:** `GET`
- **Route:** `http://localhost:8000/api/v1/user/get-current-user`
- **Controller Function:** `getCurrentUser`
- **Middleware:** `verifyJWT`
- **Description:** Retrieves the current logged-in user's information.

---

### Template Routes
- **Base URL:** `http://localhost:8000/api/v1/temp`
  - Description: Template-related routes for resume management.

#### Insert Dummy Data
- **Method:** `GET`
- **Route:** `http://localhost:8000/api/v1/temp/resume-data`
- **Controller Function:** `insertDummyData`
- **Description:** Inserts dummy data into the database.

#### Edit Resume (Secured)
- **Method:** `POST`
- **Route:** `http://localhost:8000/api/v1/temp/edit-resume`
- **Controller Function:** `editResume`
- **Middleware:** `verifyJWT`
- **Description:** Edits a resume.

#### Update Resume by Resume ID (Secured)
- **Method:** `PATCH`
- **Route:** `http://localhost:8000/api/v1/temp/resume-edit/:resumeId`
- **Controller Function:** `updateResumeByResumeId`
- **Middleware:** `verifyJWT`
- **Description:** Updates a resume by its ID.

#### Update User Avatar in Resume (Secured)
- **Method:** `PATCH`
- **Route:** `http://localhost:8000/api/v1/temp/image/:resumeId`
- **Controller Function:** `updateUserAvatar`
- **Middleware:** `verifyJWT`, `upload.single("image")`
- **Description:** Updates the avatar image within a resume by its ID.

#### Get All Resumes by User ID (Secured)
- **Method:** `GET`
- **Route:** `http://localhost:8000/api/v1/temp/Allresume`
- **Controller Function:** `getResumesByUserId`
- **Middleware:** `verifyJWT`
- **Description:** Retrieves all resumes by user ID.

#### Delete All Resumes by User ID (Secured)
- **Method:** `DELETE`
- **Route:** `http://localhost:8000/api/v1/temp/delete-Allresume`
- **Controller Function:** `deleteAllResumesByUserId`
- **Middleware:** `verifyJWT`
- **Description:** Deletes all resumes by user ID.

#### Get Resume by ID (Secured)
- **Method:** `GET`
- **Route:** `http://localhost:8000/api/v1/temp/resume-data/:resumeId`
- **Controller Function:** `getResumeById`
- **Middleware:** `verifyJWT`
- **Description:** Retrieves a resume by its ID.

#### Delete Resume by ID (Secured)
- **Method:** `DELETE`
- **Route:** `http://localhost:8000/api/v1/temp/delete/resume/:resumeId`
- **Controller Function:** `deleteResumeById`
- **Middleware:** `verifyJWT`
- **Description:** Deletes a resume by its ID.
