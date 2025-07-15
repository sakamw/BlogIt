# BlogIt

**BlogIt** is a minimal blogging platform built to demonstrate full-stack skills: authentication, CRUD operations, user profiles, and markdown content handling.

---

## Table of Contents

- [BlogIt](#blogit)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [User Authentication](#user-authentication)
    - [Blogging](#blogging)
    - [User Profile](#user-profile)
    - [Navigation \& UI](#navigation--ui)
  - [Tech Stack](#tech-stack)
  - [Setup \& Installation](#setup--installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Blogs](#blogs)
    - [User](#user)
  - [Contributing](#contributing)

---

## Features

### User Authentication

- Register with first name, last name, username, email, and password
- Login using email or username
- Secure authentication with JWT tokens
- Protected routes for authenticated-only access

### Blogging

- Users can **create**, **read**, **update**, and **delete** blog posts
- Each post includes: featured image URL, title, synopsis, markdown content, timestamps, and soft-delete flag
- List view with cards showing title, synopsis, image, author initials, and "Read More" link
- Markdown content rendered as HTML
- Soft-deleted posts hidden from views

### User Profile

- View all personal posts with edit and delete options
- Update personal info (name, username, email)
- Change password (requires current password for validation)
- Logout functionality
- Optional: profile picture upload

### Navigation & UI

- Landing page for unauthenticated users
- Conditional header navigation:
  - For guests: **Login**, **Sign Up**
  - For authenticated users: **Posts**, **New Blog**, **Profile**
  - Welcome banner: "Welcome back, {username}!"

## Tech Stack

| Layer        | Tech                            |
| ------------ | ------------------------------- |
| Backend      | Node.js + Express.js, JWT       |
| Database     | PostgerSQL                      |
| Markdown     | `markdown-it`                   |
| Frontend     | React && TypeScript             |
| Auth Storage | `Authorization: Bearer <token>` |

---

## Setup & Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/sakamw/BlogIt
   cd Blogit-Requirements
   ```

2. **Install dependencies**

- Server: `pnpm install`

- Frontend: `pnpm install`

3. **Environment variables**

Server `.env` example:

```bash
PORT=5000
DATABASE_URL=...
JWT_SECRET=supersecret
```

4. **Run the app**

Server: `pnpm run start:dev`

Frontend: `pnpm run dev`

Access the app at <http://localhost:3500> (frontend) and server API at <http://localhost:5173/api>.

## Usage

- Register Sign up, then log in
- Create a Blog New Blog
- Explore Post Posts Listing
- Edit/Delete Under Profile
- Update Profile & Password Profile Page
- Sign out Logout

## API Endpoints

### Auth

- `POST /api/auth/register` – Register
- `POST /api/auth/login` – Login
- `POST /api/auth/logout` – Logout

### Blogs

- `GET /api/blogs` – List all (non-deleted) blogs
- `POST /api/blogs` – Create a new blog
- `GET /api/blogs/:blogId` – Get specific blog
- `PATCH /api/blogs/:blogId` – Update blog
- `DELETE /api/blogs/:blogId` – Soft-delete blog

### User

- `GET /api/user/blogs` – Get user's blogs
- `PATCH /api/user` – Update primary info
- `PATCH /api/user/password` – Change password (requires current + new)

## Contributing

- Fork the repository
- Create a feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a pull request
