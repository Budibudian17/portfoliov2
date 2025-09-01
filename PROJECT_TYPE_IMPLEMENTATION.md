# Project Type Implementation

## Overview
Fitur ini menambahkan kemampuan untuk membedakan project berdasarkan tipe: **Individual** dan **Contributions**.

## Fitur yang Ditambahkan

### 1. User View (Halaman Projects)
- **Filter Buttons**: Tombol filter untuk All, Individual, dan Contributions
- **Project Type Badge**: Badge yang menampilkan tipe project di setiap card
- **Filtered Display**: Hanya menampilkan project sesuai filter yang dipilih

### 2. Admin Dashboard
- **Project Type Field**: Dropdown untuk memilih tipe project saat add/edit
- **Project Type Display**: Badge tipe project di list admin
- **Project Statistics**: Komponen statistik yang menampilkan jumlah project per tipe

### 3. Project Detail Page
- **Project Type Badge**: Badge tipe project di halaman detail

## Struktur Data

### Interface Project
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  projectLink?: string;
  githubLink?: string;
  status?: "published" | "in-progress" | "planned";
  createdAt?: any;
  content?: string;
  pinned?: boolean;
  projectType?: "individual" | "collaboration"; // Field baru
}
```

### Project Type Values
- `"individual"`: Project yang dikerjakan sendiri
- `"collaboration"`: Project yang dikerjakan bersama tim/orang lain (Contributions)

## Multi-Language Support

### English
- All, Individual, Contributions
- Individual, Contributions

### Indonesian
- Semua, Individu, Kontribusi
- Individu, Kontribusi

### Japanese
- すべて, 個人, 貢献
- 個人, 貢献

## Komponen yang Dibuat/Diupdate

### 1. `app/projects/page.tsx`
- Menambahkan filter buttons
- Menambahkan project type badge
- Implementasi filtering logic

### 2. `app/admin-dashboard/projects/page.tsx`
- Menambahkan project type field di form
- Menampilkan project type badge di list
- Menambahkan ProjectStats component

### 3. `app/projects/[slug]/page.tsx`
- Menampilkan project type badge di detail page

### 4. `components/project-stats.tsx`
- Komponen baru untuk menampilkan statistik project

### 5. `contexts/language-context.tsx`
- Menambahkan translation keys untuk fitur baru

## Cara Penggunaan

### Untuk User
1. Buka halaman `/projects`
2. Gunakan filter buttons untuk melihat project berdasarkan tipe
3. Setiap project akan menampilkan badge tipe project

### Untuk Admin
1. Buka admin dashboard `/admin-dashboard/projects`
2. Saat add/edit project, pilih tipe project dari dropdown
3. Lihat statistik project di bagian atas dashboard

## Migration

### Update Project yang Sudah Ada
Gunakan script `scripts/update-project-types.js` untuk mengupdate project yang sudah ada:

```bash
node scripts/update-project-types.js
```

**Note**: Pastikan untuk mengisi konfigurasi Firebase di script terlebih dahulu.

### Mapping Default
- CiptaLife Healthcare Platform → Contributions
- ERP System → Contributions  
- Personal Portfolio → Individual

## Styling

### Color Scheme
- **Individual**: Purple (`bg-purple-600`)
- **Contributions**: Orange (`bg-orange-600`)
- **Status Badges**: Green (Published), Yellow (In Progress), Gray (Planned)

### Filter Buttons
- **Active**: Blue background dengan shadow
- **Inactive**: Gray dengan hover effect

## Future Enhancements

### 1. Advanced Filtering
- Filter berdasarkan multiple criteria
- Search functionality
- Sort by project type

### 2. Analytics
- Project type distribution charts
- Timeline view berdasarkan tipe
- Export functionality

### 3. Contribution Details
- Team member information
- Role dalam project
- Contribution metrics

## Testing

### Test Cases
1. **Filter Functionality**
   - Filter "All" menampilkan semua project
   - Filter "Individual" hanya menampilkan project individual
   - Filter "Contributions" hanya menampilkan project contributions

2. **Admin Functionality**
   - Add project dengan project type
   - Edit project type
   - Display project type di list

3. **Multi-language**
   - Semua bahasa menampilkan text yang sesuai
   - Filter buttons dalam bahasa yang benar

## Troubleshooting

### Common Issues
1. **Project Type tidak muncul**
   - Pastikan field `projectType` sudah diisi di database
   - Check apakah ada error di console

2. **Filter tidak berfungsi**
   - Pastikan project memiliki field `projectType` yang valid
   - Check apakah ada typo di nama field

3. **Translation tidak muncul**
   - Pastikan translation keys sudah ditambahkan di language context
   - Check apakah ada error di translation function

## Dependencies
- Firebase Firestore
- Next.js
- TypeScript
- Tailwind CSS
- Lucide React Icons
