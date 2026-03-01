# LISS Admin Dashboard Guide

## Overview
The complete admin dashboard is now fully functional with dark mode support across all pages.

## Access Admin Dashboard

**Login URL**: `/admin/login`

**Demo Credentials:**
- Email: `admin@liss-southsudan.org`
- Password: `LISS@2024`

Session duration: 24 hours

## Dashboard Features

### 1. Dashboard Home (`/admin/dashboard`)
- Overview of all key statistics
- Total programs, articles, team members, donations
- New submissions count
- Total donation amount
- Quick action buttons for common tasks

### 2. Programs Management (`/admin/programs`)
- View all programs
- Add new programs with:
  - Slug (unique identifier)
  - Title
  - Description
  - HTML content
  - Status (active/inactive)
- Edit existing programs
- Delete programs
- Full CRUD operations

### 3. News Articles (`/admin/news`)
- Create, read, update, delete news articles
- Article fields:
  - Title
  - Slug
  - Excerpt (summary)
  - Full content
  - Author name
  - Publication date
  - Status (draft/published)
- Filter by publication status

### 4. Form Submissions (`/admin/submissions`)
- View all form submissions from visitors
- Track submission types:
  - Volunteer applications
  - Partnership inquiries
  - General contact messages
  - GBV incident reports
- Status tracking:
  - New (unread)
  - Read
  - Resolved
- Mark submissions as read or resolved
- Delete submissions

### 5. Donations (`/admin/donations`)
- Record donations from donors
- Track donation data:
  - Donor name and email
  - Amount and currency
  - Donation type (one-time/monthly)
  - Date received
- View donation statistics:
  - Total donations count
  - Total amount donated
  - Monthly recurring donors count

### 6. Team Members (`/admin/team`)
- Manage leadership and staff
- Team member information:
  - Full name
  - Position/title
  - Email address
  - Phone number
  - Professional biography
  - Profile image

### 7. Transparency Reports (`/admin/transparency`)
- Upload and manage financial reports
- Track annual budgets:
  - Budget allocated
  - Amount spent
  - Remaining budget
  - Budget by category
- Download reports

## Dark Mode Support

All admin pages fully support dark and light modes:
- **Automatic detection**: Respects system preferences
- **Manual toggle**: Theme toggle button in header
- **Full color consistency**: All elements properly themed
- **Text readability**: Pure white text (#ffffff) in dark mode
- **Proper contrast**: All colors meet WCAG AA standards

## Data Storage

- All data stored in browser's localStorage
- Data persists across sessions
- Can export/import data as JSON
- Auto-saves on every change

## Color Scheme

### Light Mode (Default)
- Primary: Green (#2D7D3D)
- Secondary: Blue (#1F5A7D)
- Accent: Orange (#E67E22)
- Background: White
- Text: Dark gray/black

### Dark Mode
- Primary: Green (#5fbb97)
- Secondary: Blue (#6fa3d4)
- Accent: Orange (#ff9c5c)
- Background: Dark (#1a1a1a)
- Text: Pure White (#ffffff)

## Navigation

The admin sidebar provides quick access to all sections:
- Dashboard
- Programs
- News Articles
- Team Members
- Donations
- Form Submissions
- Transparency Reports
- Logout button

Mobile responsive sidebar with hamburger menu for screens < 1024px.

## Security Notes

- Session expires after 24 hours of inactivity
- Only demo credentials work for login
- To add production authentication, modify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `/lib/auth-context.tsx`
- Consider implementing:
  - Database-backed authentication
  - OAuth integration
  - Two-factor authentication
  - Role-based access control

## Future Enhancements

- Database integration (Supabase, PostgreSQL, etc.)
- Email notifications for submissions
- Advanced analytics and reporting
- User role management
- Content scheduling
- Backup and restore functionality
- API access for integrations
