# 🏕️ Przenocuj.eu

**Mapa dzikich noclegów, stref "Zanocuj w lesie", glampingów i miejsc camper-friendly w Europie.**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-06B6D4?style=flat-square&logo=tailwindcss)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hsr88/przenocuj)

## 🌍 O projekcie

Przenocuj.eu to **open-source'owa** mapa dla:
- 🚐 Vanliferów
- 🚴 Rowerzystów (bikepacking)
- ⛺ Miłośników dzikich noclegów
- 🏕️ Fanów glampingu

### Funkcjonalności

- 🗺️ **Interaktywna mapa** (Leaflet + OpenStreetMap)
- 📍 **150+ startowych miejsc** w całej Europie
- 🔄 **Dynamiczne pobieranie** z OSM (tysiące miejsc!)
- 💚 **Strefy "Zanocuj w lesie"** (Polska)
- ⚠️ **Ostrzeżenia o zakazach** (kary, mandaty)
- ⭐ **System opinii** (crowdsourced)
- 💾 **Zapisywanie ulubionych** (localStorage)
- 🗺️ **Tworzenie tras**
- 📱 **PWA** (instalacja jako aplikacja)

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Język:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Mapa:** [Leaflet](https://leafletjs.com/) + OpenStreetMap
- **Backend:** [Supabase](https://supabase.com/) (PostgreSQL + Realtime)
- **Ikony:** [Lucide React](https://lucide.dev/)

## 🛠️ Instalacja lokalna

```bash
# 1. Klonuj repozytorium
git clone https://github.com/hsr88/przenocuj.git
cd przenocuj

# 2. Zainstaluj zależności
npm install

# 3. Skonfiguruj zmienne środowiskowe
# Utwórz plik .env.local:
echo "NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=twój-klucz" >> .env.local

# 4. Uruchom serwer deweloperski
npm run dev

# 5. Otwórz http://localhost:3000
```

## 📦 Deployment

### Vercel (zalecane)

1. **Importuj projekt:**
   ```bash
   npm i -g vercel
   vercel
   ```
   
2. **Lub przez UI:**
   - Wejdź na [vercel.com](https://vercel.com)
   - "Add New Project"
   - Importuj z GitHub
   - Dodaj zmienne środowiskowe (Supabase)

3. **Zmienne środowiskowe w Vercel:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

### Inne opcje

- **Netlify:** `netlify deploy --prod --dir dist`
- **Cloudflare Pages:** Build output: `dist`

## 🗄️ Supabase Setup

1. Załóż darmowe konto na [supabase.com](https://supabase.com)
2. Utwórz nowy projekt
3. Wykonaj SQL w SQL Editor:

```sql
-- Tabela miejsc
create table places (
  id bigint generated always as identity primary key,
  name text not null,
  type text not null,
  lat double precision not null,
  lng double precision not null,
  description text,
  rating int default 0,
  reviews int default 0,
  features text[] default '{}',
  image text,
  regulation_link text,
  price text,
  isLegal boolean default true,
  isFree boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Tabela opinii
create table reviews (
  id bigint generated always as identity primary key,
  place_id bigint not null references places(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text,
  author text not null,
  helpful integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Polityki RLS
alter table places enable row level security;
alter table reviews enable row level security;

create policy "Places are viewable by everyone" on places for select using (true);
create policy "Authenticated users can add places" on places for insert to authenticated with check (true);

create policy "Reviews are viewable by everyone" on reviews for select using (true);
create policy "Authenticated users can add reviews" on reviews for insert to authenticated with check (true);
```

## 📁 Struktura projektu

```
przenocuj/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Główna strona
│   └── globals.css        # Globalne style
├── components/            # Komponenty React
│   ├── ui/               # UI primitives
│   ├── map/              # Mapa Leaflet
│   ├── panels/           # Panele boczne
│   └── modals/           # Modale
├── hooks/                # Custom React hooks
├── lib/                  # Utils + dane
├── types/                # TypeScript types
├── public/               # Statyczne pliki
└── scripts/              # Skrypty (OSM fetch)
```

## 🗺️ Źródła danych

- **OpenStreetMap** (OSM) - główne źródło
- **Zanocuj w lesie** - Lasy Państwowe (Polska)
- **Crowdsource** - użytkownicy dodają przez formularz

## 🤝 Współtworzenie

1. Fork repozytorium
2. Stwórz branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Otwórz Pull Request

## 📜 Licencja

MIT © [hsr88](https://github.com/hsr88)

---

<p align="center">
  Made with ❤️ for outdoor enthusiasts
</p>
