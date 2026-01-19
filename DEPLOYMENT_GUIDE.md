# 🚀 Deploy Tilbudsjakt til Vercel

## Hva får du?

✅ En live app på: `https://tilbudsjakt-DINID.vercel.app`  
✅ Gratis hosting for alltid  
✅ Automatisk deployment ved hver push til GitHub  
✅ HTTPS og CDN inkludert  
✅ Perfekt ytelse  

## 📦 Filene du trenger

Jeg har laget **alle** filene du trenger:

```
tilbudsjakt-app/
├── src/
│   ├── App.jsx           ← React-appen (HUSK: Endre GitHub-bruker!)
│   └── main.jsx          ← Entry point
├── index.html            ← HTML template
├── package.json          ← Dependencies
├── vite.config.js        ← Vite config
├── vercel.json           ← Vercel config
└── .gitignore            ← Ignorerte filer
```

## ⚠️ VIKTIG: Før du starter!

I `src/App.jsx`, linje 6, **ENDRE DETTE**:

```javascript
const GITHUB_USERNAME = "DIN-GITHUB-BRUKER"; // ← ENDRE TIL DITT BRUKERNAVN!
const REPO_NAME = "tilbudsjakt";
```

Eksempel:
```javascript
const GITHUB_USERNAME = "per123";  // Ditt GitHub-brukernavn
const REPO_NAME = "tilbudsjakt";   // Repository-navnet ditt
```

## 🎯 Deployment (Enkleste metoden)

### Steg 1: Lag nytt repository for frontend

1. Gå til GitHub.com
2. Lag nytt repository: `tilbudsjakt-app`
3. **Public** (viktig!)
4. **IKKE** huk av "Add README"

### Steg 2: Last opp alle filene

Du har **to måter**:

#### Metode A: Via GitHub Web (Enklest!)

1. I det nye repository, klikk "uploading an existing file"
2. Dra **ALLE** filene jeg ga deg til upload-boksen:
   - src/App.jsx
   - src/main.jsx  
   - index.html
   - package.json
   - vite.config.js
   - vercel.json
   - .gitignore
3. Skriv commit message: "Initial commit"
4. Klikk "Commit changes"

#### Metode B: Via Git (hvis du kan Git)

```bash
# Last ned alle filene til en lokal mappe
cd tilbudsjakt-app

# Initialiser git
git init
git add .
git commit -m "Initial commit"

# Koble til GitHub
git remote add origin https://github.com/DINBRUKER/tilbudsjakt-app.git
git branch -M main
git push -u origin main
```

### Steg 3: Deploy til Vercel

#### 3.1 Lag Vercel-konto
1. Gå til [vercel.com](https://vercel.com)
2. Klikk "Sign Up"
3. Velg "Continue with GitHub" (enklest!)
4. Autoriser Vercel til å se dine repositories

#### 3.2 Importer prosjekt
1. I Vercel dashboard, klikk "Add New..." → "Project"
2. Du ser alle dine GitHub repos
3. Finn `tilbudsjakt-app`
4. Klikk "Import"

#### 3.3 Konfigurer (ikke endre noe!)
Vercel ser automatisk at det er Vite, så:
- Framework Preset: **Vite** ✅ (auto-detected)
- Build Command: `npm run build` ✅ (auto)
- Output Directory: `dist` ✅ (auto)

**Klikk bare "Deploy"!**

#### 3.4 Vent...
⏱️ Tar ca 1-2 minutter første gang

#### 3.5 Ferdig! 🎉
Du får en URL: `https://tilbudsjakt-ABC123.vercel.app`

Klikk på URL-en og test appen!

## 🧪 Test at det fungerer

1. Åpne URL-en Vercel ga deg
2. Du skal se "Henter tilbud for uke 4..."
3. Etter noen sekunder skal tilbudene vises
4. Prøv søk: "kaffe"
5. Sorter etter "Høyest rabatt"

### ❌ Hvis du får feil:

**"Finner ikke data for uke X"**
→ Har du endret GitHub-brukernavnet i App.jsx?
→ Er `data/tilbud_uke_4.json` tilgjengelig i ditt `tilbudsjakt` repo?

**Åpne browser console (F12) for å se feil!**

## 🔄 Automatisk oppdatering

**Magien**: Hver gang du pusher til GitHub, deployer Vercel automatisk!

```bash
# Gjør endringer i koden
# Commit og push
git add .
git commit -m "Forbedret søk"
git push

# Vercel deployer automatisk! ✨
# Sjekk Vercel dashboard for status
```

## 🎨 Tilpass appen

### Endre farger
I `src/App.jsx`, finn `getStyles()` og endre:

```javascript
// Gradient bakgrunn
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// ↑ Endre disse fargekodene

// Logo farge
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
// ↑ Og disse
```

### Endre tittel
I `index.html`:
```html
<title>Min Tilbudsapp</title>
```

### Legg til egen logo
1. Lag `public/logo.svg`
2. Oppdater `index.html`:
```html
<link rel="icon" type="image/svg+xml" href="/logo.svg" />
```

## 📱 Legg til flere butikker

Når du har fått flere butikker i backend:

```javascript
// I App.jsx, endre fetchData funksjonen

const stores = ['kiwi', 'rema', 'coop'];
const allOffers = [];

for (const store of stores) {
  const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/data/${store}_uke_${week}.json`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    allOffers.push(...data.tilbud);
  }
}

setTilbud(allOffers);
```

## 🔗 Custom domain (valgfritt)

Vil du ha `tilbudsjakt.no` i stedet for `tilbudsjakt-ABC.vercel.app`?

1. Kjøp domene (Domeneshop.no, ~99 kr/år)
2. I Vercel: Settings → Domains
3. Legg til ditt domene
4. Følg DNS-instruksjonene

## 📊 Vercel Dashboard

Nyttige funksjoner:
- **Deployments**: Se alle deployments
- **Analytics**: Hvor mange besøker appen
- **Logs**: Se feilmeldinger
- **Preview**: Test endringer før de går live

## 🆘 Feilsøking

### Build feiler
```
Error: Cannot find module 'lucide-react'
```
→ Sjekk at `package.json` er riktig
→ Re-deploy fra Vercel dashboard

### App laster ikke data
1. Åpne browser console (F12)
2. Se etter rød feilmelding
3. Sjekk URL-en som blir fetched
4. Gå til den URL-en i nettleseren
5. Skal vise JSON - hvis 404, sjekk filsti

### App ser tom ut
→ Har du tilbud i JSON-filen?
→ Sjekk at `tilbud` er et array, ikke et objekt

## 🎯 Neste steg

1. ✅ Deploy og test
2. ✅ Del URL med venner for feedback
3. ➡️ Legg til flere butikker i backend
4. ➡️ Forbedre parsing
5. ➡️ Legg til prishistorikk
6. ➡️ Legg til varselfunksjon

## 💡 Pro tips

- **Preview deployments**: Hver branch får sin egen URL
- **Environment variables**: Lagre API-nøkler sikkert
- **Edge Functions**: Legg til backend-logikk
- **Analytics**: Følg med på trafikk

## ✅ Sjekkliste

- [ ] Endret GitHub-brukernavn i App.jsx
- [ ] Opprettet `tilbudsjakt-app` repository
- [ ] Lastet opp alle filer
- [ ] Registrert Vercel-konto
- [ ] Importert prosjekt
- [ ] Klikket "Deploy"
- [ ] Testet at appen fungerer
- [ ] Delt URL med noen for å teste

---

**Gratulerer! Din app er live! 🎉**

URL: `https://tilbudsjakt-DINID.vercel.app`
