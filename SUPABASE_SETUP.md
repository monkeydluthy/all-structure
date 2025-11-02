# Supabase Database Setup Instructions

## Step 1: Create Tables

1. Go to your Supabase dashboard: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase_setup.sql` into the editor
5. Click **Run** or press `Ctrl/Cmd + Enter`

This will create:
- `projects` table - stores project information
- `project_images` table - stores images for each project
- Proper indexes for performance
- RLS (Row Level Security) policies

## Step 2: Set Up Storage Bucket

1. Navigate to **Storage** in the left sidebar
2. Click **New Bucket**
3. Name it: `project-images`
4. Make it **Public** (so images can be displayed on the website)
5. Click **Create Bucket**

## Step 3: Set Up Storage Policies

1. After creating the bucket, click on it
2. Go to **Policies** tab
3. Click **New Policy**

**For Upload (Insert):**
- Policy name: `Allow authenticated uploads`
- Allowed operation: `INSERT`
- Policy definition:
```sql
(role() = 'authenticated')
```

**For Read (Select):**
- Policy name: `Allow public reads`
- Allowed operation: `SELECT`
- Policy definition:
```sql
(true)
```

**For Delete:**
- Policy name: `Allow authenticated deletes`
- Allowed operation: `DELETE`
- Policy definition:
```sql
(role() = 'authenticated')
```

## Step 4: Test the Setup

Once these tables and storage are set up, you can:
1. Upload images through the admin panel at `/admin`
2. Images will be stored in Supabase Storage
3. Image URLs will be saved in the `project_images` table
4. Images will display on the `/portfolio` page

## Database Schema

### Projects Table
- `id` - UUID (auto-generated)
- `title` - Project title
- `description` - Project description
- `service` - Service type (Remodeling, Restoration, etc.)
- `location` - Location (e.g., "Meriden, CT")
- `is_before_after` - Boolean to indicate if this is a before/after project
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Project Images Table
- `id` - UUID (auto-generated)
- `project_id` - Foreign key to projects table
- `image_url` - URL to the image in Supabase Storage
- `image_type` - Type: 'before', 'after', 'gallery', or 'main'
- `display_order` - Order for displaying images
- `created_at` - Timestamp

## Notes

- Public users can only READ (view) projects and images
- Only authenticated users can INSERT, UPDATE, or DELETE
- Images are stored in Supabase Storage and served via CDN
- All images are automatically publicly accessible once uploaded to the public bucket

