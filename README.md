# Routes Rules

### Creating Route
Untuk membuat route, terdapat beberapa opsi diantaranya:

1. secara sederhana, dapat langsung membuat file dengan ekstensi `tsx` pada folder `routes`.
2. apabila route berada di dalam sebuah folder -- dalam kasus ini adalah nested routes -- namun bukan folder grouping compositions, maka filename harus sama dengan foldername diawali dengan prefix `_`.

### Standart Filenames

| Filenames     | Deskripsi                                                   |
|---------------|-------------------------------------------------------------|
| `_index.tsx`  | Direpresentasikan dalam bentuk `/` pada browser url         |
| `_layout.tsx` | Digunakan sebagai pembungkus beberapa halaman berupa layout |

### Nested Routes
Untuk membuat nested routes, buat folder dengan suffix `+`

Contoh:

```shell
app/routes
└── dashboard+
   ├── index.tsx
   └── settings+
      ├── _index.tsx
      ├── profile.tsx
      └── account.tsx
```

Url tersedia
- /dashboard
- /dashboard/settings
- /dashboard/profile
- /dashboard/account

### Nested Folders Composition
Untuk melakukan grouping terhadap routes namun tidak terefleksi terhadap `url`, tambahkan prefix `_` dan suffix `+`

Contoh:

| folder structures       | url      |
|-------------------------|----------|
| `_landing+ > index.tsx` | `/`      |
| `_landing+ > about.tsx` | `/about` |

### Colocation Components
Untuk memecah tampilan UI yang kompleks ke dalam beberapa component, serta  menjaga agar struktur folder tetap rapi, setiap routes dapat memiliki scope componentnya sendiri dengan membuat folder `components`