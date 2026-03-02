# Admin Security & Image Upload Guide

## Admin Access

### Login Credentials
- **Email:** `admin@liss-southsudan.org`
- **Password:** `LISS@2024`
- **URL:** `/admin/login`

### Session Management
- Sessions last for **24 hours**
- Automatically cleared on browser close (localStorage cleared)
- Protected routes redirect to login if session expires
- Session stored in localStorage with expiration timestamp

## Security Features Implemented

### 1. **Secure Authentication**
- Credentials validated server-side and client-side
- Session tokens use base64 encoding with validation
- Constant-time comparison for password validation (prevents timing attacks)
- Session expiration checks on every admin action
- Automatic logout on session expiry

### 2. **Image Upload Protection**
- Maximum file size: **5MB**
- Allowed types: JPEG, PNG, WebP, GIF
- File validation on upload endpoint
- Unique filename generation using crypto hash
- Secure storage in `/public/uploads/` directory
- Requires active admin session to upload

### 3. **API Route Protection**
- Upload endpoint (`/api/upload`) checks for valid session
- Returns 401 Unauthorized if not authenticated
- Input validation for all file metadata
- Error handling prevents information disclosure

## Image Management

### Categories
The admin dashboard organizes images into categories:
1. **Hero Images** - Large banner images (recommended 1920x1080)
2. **Program Images** - Program-specific visuals (recommended 600x400)
3. **Team Photos** - Leadership team portraits (recommended 400x500)
4. **Gallery** - Event and project photos (recommended 800x600)
5. **Testimonials** - User testimonial images (recommended 200x200)
6. **News** - News article images (recommended 800x400)

### Uploading Images

1. Navigate to **Admin Dashboard** → **Image Gallery**
2. Select desired category from tabs
3. Click upload area and select an image, or drag and drop
4. Image automatically uploads and appears in the gallery
5. Copy image URL to use in content

### Image URLs
- Format: `/uploads/[category]_[timestamp]_[hash].[ext]`
- Example: `/uploads/hero_1640000000000_abc123def.jpg`
- URLs are absolute paths - can be used anywhere on the site

### Deleting Images
1. Go to Image Gallery in admin
2. Find the image in the desired category
3. Click the delete button (trash icon)
4. Confirm deletion
5. Image file is removed from `/public/uploads/`

## Using Uploaded Images

### In Markdown Content (Programs, News, etc.)
```markdown
![Alt text](/uploads/hero_1640000000000_abc123def.jpg)
```

### In HTML/React Components
```jsx
import Image from 'next/image';

<Image
  src="/uploads/hero_1640000000000_abc123def.jpg"
  alt="Description"
  width={1920}
  height={1080}
/>
```

### Direct URLs
```html
<img src="/uploads/hero_1640000000000_abc123def.jpg" alt="Description" />
```

## Best Practices

### Image Optimization
- Use WebP format when possible (better compression)
- Optimize images before uploading (use tools like TinyPNG)
- Follow recommended dimensions for each category
- Keep file sizes under 500KB for web optimization

### File Naming
- System auto-generates unique names
- Include category in the filename for organization
- Filenames include timestamp for version tracking

### Security Tips
1. **Don't share upload URLs publicly** - They contain timestamps and hashes
2. **Use unique passwords** - Change from default `LISS@2024` in production
3. **Logout after use** - Always logout from admin panel
4. **Verify uploads** - Check that images display correctly after upload
5. **Regular backups** - Keep backups of important images

## Scalability Notes

### Current Implementation
- Images stored in `/public/uploads/` directory
- Metadata stored in localStorage (up to 10MB)
- Supports up to ~2000 images before performance degrades

### Future Enhancements for Production
1. **Database Integration** - Use database for image metadata instead of localStorage
2. **Cloud Storage** - Use AWS S3, Google Cloud Storage, or similar
3. **CDN Integration** - Serve images through CDN for better performance
4. **Image Processing** - Automatic resizing and format conversion
5. **Advanced Permissions** - Role-based access control for multiple admins
6. **Audit Logging** - Track all image operations and admin actions

## Troubleshooting

### Upload Fails
- Check file size (max 5MB)
- Verify file format (JPEG, PNG, WebP, GIF only)
- Ensure you're logged in and session is valid
- Check browser console for detailed errors

### Image Not Displaying
- Verify URL is correct and copy button result
- Check image file in `/public/uploads/` directory
- Ensure path starts with `/uploads/`

### Session Expired
- Refresh the page
- Go back to `/admin/login`
- Re-enter credentials

## Environment Variables

For production deployment, consider adding:
```
ADMIN_EMAIL=your-admin@example.com
ADMIN_PASSWORD=your-secure-password
MAX_FILE_SIZE=5242880
UPLOAD_DIRECTORY=/var/uploads
```

## Support

For issues or questions:
1. Check the debug console (F12) for error messages
2. Verify admin credentials are correct
3. Ensure session hasn't expired (24-hour limit)
4. Clear browser cache and localStorage if needed
