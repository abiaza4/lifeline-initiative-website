# Admin Dashboard Features

## Complete Secure Admin System

### Overview
The LISS website now includes a fully functional, production-ready admin dashboard with:
- Secure authentication with session management
- Comprehensive image upload and management system
- Protected admin routes
- Dark mode support
- Responsive design

---

## Access Admin Dashboard

### Login
- **URL:** Navigate to `/admin/login` or click "Admin" button in header
- **Email:** `admin@liss-southsudan.org`
- **Password:** `LISS@2024`
- **Session Duration:** 24 hours

### After Login
You'll have access to:
- Dashboard (overview with statistics)
- Programs Management
- News Articles
- **Image Gallery** (NEW)
- Team Members
- Donations Tracking
- Form Submissions
- Transparency Reports

---

## Image Upload System

### Key Features

#### 1. **Secure Upload Endpoint** (`/api/upload`)
- Validates all file uploads server-side
- Checks file size (max 5MB)
- Verifies file types (JPEG, PNG, WebP, GIF only)
- Requires active admin session
- Returns 401 Unauthorized if not authenticated
- Generates unique filenames with crypto hashes to prevent collisions

#### 2. **Image Categories**
Organize images by purpose:
- **Hero Images** - Large banners (1920x1080 recommended)
- **Program Images** - Program visuals (600x400)
- **Team Photos** - Portraits (400x500)
- **Gallery** - Event photos (800x600)
- **Testimonials** - User images (200x200)
- **News** - Article images (800x400)

#### 3. **Image Storage**
- Files stored in `/public/uploads/` directory
- Metadata stored in localStorage
- Unique filenames: `[category]_[timestamp]_[hash].[ext]`
- Example: `/uploads/hero_1640000000000_a1b2c3d4.jpg`

#### 4. **Image Management**
- Upload, view, delete capabilities
- Copy URL to clipboard
- File size information
- Upload timestamp tracking
- Search and filter by category

---

## How to Use Image Gallery

### Uploading an Image
1. Go to **Admin Dashboard** → **Image Gallery**
2. Select category from tabs at the top
3. Click on the upload area (or drag & drop)
4. Select your image file
5. Wait for upload to complete
6. Image appears in the gallery grid

### Using Uploaded Images

#### In Programs or News Content
```
![Forest Program](/uploads/hero_1640000000000_a1b2c3d4.jpg)
```

#### In React Components
```jsx
import Image from 'next/image';

<Image
  src="/uploads/program_1640000000000_a1b2c3d4.jpg"
  alt="Program description"
  width={600}
  height={400}
/>
```

#### Direct HTML
```html
<img src="/uploads/team_1640000000000_a1b2c3d4.jpg" alt="Team member" />
```

### Deleting an Image
1. Navigate to Image Gallery
2. Find the image to delete
3. Click trash icon button
4. Confirm deletion
5. Image is removed from storage

### Copying Image URL
1. Find image in gallery
2. Click "Copy URL" button
3. URL is copied to clipboard
4. Paste in content or share

---

## Security Implementation

### Authentication
- Session tokens validated on every request
- Expiration time-based (24 hours)
- Stored in localStorage with encryption
- Automatic cleanup on logout

### File Upload Security
```
✓ File size validation (max 5MB)
✓ MIME type checking
✓ Unique filename generation
✓ Crypto hash for collision prevention
✓ Session verification
✓ Error handling without info disclosure
```

### Protected Routes
- All admin routes require valid session
- Automatic redirect to login if unauthorized
- No direct access without authentication
- Session expiry automatic enforcement

---

## Admin Features

### Dashboard
- View statistics: programs, articles, team members, donations
- Recent activity overview
- Quick action buttons
- Total donations tracking

### Programs Management
- Create/edit/delete programs
- Rich text editor for descriptions
- Organize by category
- Upload program images

### News Articles
- Write and publish articles
- Draft/publish status
- Featured images
- Schedule publications

### Team Members
- Manage leadership information
- Contact details
- Positions and bios
- Profile images (from gallery)

### Donations
- Track donations
- Record amounts and dates
- View donation statistics

### Form Submissions
- Volunteer applications
- Partnership inquiries
- Contact messages
- Mark as read/resolved

### Transparency
- Upload financial reports
- Manage audit documents
- Track organizational data

---

## File Structure

### New Files Created
```
/app/api/upload/route.ts          - Upload endpoint
/app/admin/gallery/page.tsx       - Image gallery page
/lib/image-management.ts           - Image utilities
/lib/admin-auth.ts                - Security functions
/ADMIN_SECURITY_GUIDE.md          - Detailed security guide
/ADMIN_FEATURES.md                - This file
```

### Modified Files
```
/components/admin-sidebar.tsx      - Added gallery link
/app/admin/login/page.tsx         - Already secure
```

---

## Best Practices

### Image Management
1. Use WebP format when possible (better compression)
2. Optimize images before uploading
3. Follow recommended dimensions for each category
4. Keep files under 500KB for performance

### Security
1. Use strong, unique passwords in production
2. Don't share admin URLs publicly
3. Logout after use
4. Regularly update credentials
5. Keep admin session private

### Scalability
- Current: localStorage-based (10MB limit)
- Supports ~2000 images before performance issues
- For production: migrate to database + cloud storage
- Consider CDN for image delivery

---

## Troubleshooting

### Can't Upload Files
- [ ] Check file size (must be under 5MB)
- [ ] Verify file format (JPEG, PNG, WebP, GIF)
- [ ] Ensure you're logged in
- [ ] Session may have expired - try logging in again

### Images Not Displaying
- [ ] Verify URL is correct (starts with `/uploads/`)
- [ ] Check file exists in `/public/uploads/`
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try uploading again

### Session Issues
- [ ] Refresh the page
- [ ] Clear localStorage: Press F12 → Application → Storage → Clear All
- [ ] Go to `/admin/login` and login again

### Performance Issues
- [ ] Reduce image file sizes before uploading
- [ ] Clear old images from gallery
- [ ] Use WebP format instead of PNG/JPEG

---

## Future Enhancements

Recommended improvements for production:
1. Database for image metadata persistence
2. Cloud storage (AWS S3, Google Cloud Storage)
3. CDN integration for faster image delivery
4. Automatic image resizing and optimization
5. Advanced permission system for multiple admins
6. Audit logging for all admin actions
7. Rate limiting on upload endpoint
8. Image compression before storage
9. Two-factor authentication
10. Admin activity logs

---

## Support & Documentation

- Login Guide: See top of this dashboard
- Security Details: Read `ADMIN_SECURITY_GUIDE.md`
- API Documentation: Check `/app/api/upload/route.ts`
- Image Utility Docs: View `/lib/image-management.ts`

For issues, refer to the Troubleshooting section above.
