<div align="center">

<img src="assets/banner/rafeeq-banner.svg" width="100%" alt="رَفيِقْ — Rafeeq Banner"/>

<br/>

<img src="assets/banner/rafeeq-logo.svg" width="320" alt="رَفيِقْ Logo"/>

<br/>

# رَفيِقْ | Rafeeq

### *Your Premium Islamic Companion*

<br/>

[![Flutter](https://img.shields.io/badge/Flutter-3.29-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.12-0175C2?style=for-the-badge&logo=dart&logoColor=white)](https://dart.dev)
[![Android](https://img.shields.io/badge/Android-21%2B-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com)
[![License](https://img.shields.io/badge/License-MIT-C9A84C?style=for-the-badge)](LICENSE)
[![PRs](https://img.shields.io/badge/PRs-Welcome-2ECC71?style=for-the-badge)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/Daily-Islamic-Widget/rafeeq?style=for-the-badge&color=F0D078)](https://github.com/Daily-Islamic-Widget/rafeeq/stargazers)
[![Forks](https://img.shields.io/github/forks/Daily-Islamic-Widget/rafeeq?style=for-the-badge&color=C9A84C)](https://github.com/Daily-Islamic-Widget/rafeeq/network/members)

<br/>

[![Build](https://img.shields.io/github/actions/workflow/status/Daily-Islamic-Widget/rafeeq/build.yml?branch=master&style=flat-square&label=BUILD&logo=github-actions&logoColor=white)](https://github.com/Daily-Islamic-Widget/rafeeq/actions)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/Daily-Islamic-Widget/rafeeq/codeql.yml?branch=master&style=flat-square&label=CODEQL&logo=github-security&logoColor=white)](https://github.com/Daily-Islamic-Widget/rafeeq/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/Daily-Islamic-Widget/rafeeq?style=flat-square&color=2ECC71&label=LATEST)](https://github.com/Daily-Islamic-Widget/rafeeq/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/Daily-Islamic-Widget/rafeeq/total?style=flat-square&color=F0D078&label=DOWNLOADS)](https://github.com/Daily-Islamic-Widget/rafeeq/releases)
[![Issues](https://img.shields.io/github/issues/Daily-Islamic-Widget/rafeeq?style=flat-square&color=E74C3C)](https://github.com/Daily-Islamic-Widget/rafeeq/issues)
[![Size](https://img.shields.io/github/repo-size/Daily-Islamic-Widget/rafeeq?style=flat-square&color=3498DB)](https://github.com/Daily-Islamic-Widget/rafeeq)

<br/>

**Rafeeq** is a premium Islamic companion application built with Flutter, featuring daily widgets, Quran (SVG Mushaf + Audio), Hadith collections, prayer times, Qibla compass, Tasbih counter, Adhkar, Ziyarat, Fatwa search, and much more — all designed with a luxury navy + gold aesthetic and full RTL Arabic support.

<br/>

[📱 Download APK](https://github.com/Daily-Islamic-Widget/rafeeq/releases/latest) · [🌐 Live Demo](#) · [📖 Documentation](#) · [🐛 Report Bug](https://github.com/Daily-Islamic-Widget/rafeeq/issues/new?template=bug_report.yml) · [✨ Request Feature](https://github.com/Daily-Islamic-Widget/rafeeq/issues/new?template=feature_request.yml)

<br/>

</div>

---

## 🌟 Animated Typing Headline

<div align="center">

```
> Your daily Islamic companion that goes beyond expectations.
> Quran · Hadith · Prayer Times · Qibla · Tasbih · Widgets
> Built with ❤️ and Flutter.
```

</div>

---

## 🏛️ Architecture Overview

<div align="center">

```mermaid
graph TB
    subgraph Presentation["🎨 Presentation Layer"]
        UI["Screens & Widgets"]
        State["Riverpod Providers"]
        Theme["App Theme System"]
    end

    subgraph Domain["🧠 Domain Layer"]
        Entities["Entities"]
        Repos["Repository Interfaces"]
        Usecases["Use Cases"]
    end

    subgraph Data["💾 Data Layer"]
        DS["Data Sources"]
        Models["Models"]
        ReposImpl["Repository Implementations"]
    end

    subgraph Services["⚙️ Services Layer"]
        Prayer["Prayer Service"]
        Notif["Notification Service"]
        Adhan["Adhan Scheduler"]
        HomeW["Home Widget Service"]
        Loc["Location Service"]
        Storage["Storage Service"]
    end

    subgraph Platform["📱 Platform Layer"]
        Android["Android Native"]
        iOS["iOS Native"]
        Web["Web"]
    end

    UI --> State
    State --> Repos
    Repos --> DS
    DS --> Models
    Repos --> ReposImpl
    ReposImpl --> DS
    ReposImpl --> Repos

    State --> Prayer
    State --> Notif
    State --> Adhan
    State --> HomeW
    State --> Loc
    State --> Storage

    Prayer --> Platform
    Notif --> Platform
    Adhan --> Platform
    HomeW --> Platform

    classDef presentation fill:#1A2744,stroke:#C9A84C,color:#E8E8E8
    classDef domain fill:#0D1F3C,stroke:#F0D078,color:#E8E8E8
    classDef data fill:#162A47,stroke:#54C5F8,color:#E8E8E8
    classDef services fill:#1A3352,stroke:#2ECC71,color:#E8E8E8
    classDef platform fill:#0A1628,stroke:#E74C3C,color:#E8E8E8

    class UI,State,Theme presentation
    class Entities,Repos,Usecases domain
    class DS,Models,ReposImpl data
    class Prayer,Notif,Adhan,HomeW,Loc,Storage services
    class Android,iOS,Web platform
```

</div>

---

## 📱 Download & Quick Links

<div align="center">

[![Download APK](https://img.shields.io/badge/⬇️_Download_APK-07111F?style=for-the-badge&labelColor=07111F&color=C9A84C)](https://github.com/Daily-Islamic-Widget/rafeeq/releases/latest/download/rafeeq-universal.apk)
[![Download APK (arm64)](https://img.shields.io/badge/📱_ARM64-07111F?style=for-the-badge&labelColor=07111F&color=2ECC71)](https://github.com/Daily-Islamic-Widget/rafeeq/releases/latest/download/rafeeq-arm64-v8a.apk)
[![GitHub Release](https://img.shields.io/github/v/release/Daily-Islamic-Widget/rafeeq?style=for-the-badge&label=Latest+Release&color=F0D078)](https://github.com/Daily-Islamic-Widget/rafeeq/releases/latest)
[![GitHub Stars](https://img.shields.io/github/stars/Daily-Islamic-Widget/rafeeq?style=for-the-badge&label=Star+on+GitHub&color=F0D078)](https://github.com/Daily-Islamic-Widget/rafeeq/stargazers)

</div>

---

## 🖼️ Screenshots

<div align="center">

<table>
<tr>
<td align="center"><img src="assets/images/Splash Screen.png" width="240" alt="Splash Screen" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Splash Screen</b></sub></td>
<td align="center"><img src="assets/images/logo.png" width="240" alt="Logo" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>App Logo</b></sub></td>
<td align="center"><img src="assets/images/whitebg.PNG" width="240" alt="Home Light" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Home — Light</b></sub></td>
</tr>
<tr>
<td align="center"><img src="assets/images/TIMEERBG.PNG" width="240" alt="Prayer Times" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Prayer Times</b></sub></td>
<td align="center"><img src="assets/images/ziaratbg.png" width="240" alt="Ziyarat" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Ziyarat</b></sub></td>
<td align="center"><img src="assets/images/mfatihbg.jpg" width="240" alt="Mafatih" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Mafatih</b></sub></td>
</tr>
<tr>
<td align="center"><img src="assets/images/adyabg.png" width="240" alt="Adkar" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Adhkar</b></sub></td>
<td align="center"><img src="assets/images/sahifasjadiabg.png" width="240" alt="Sahifa Sajjadiyya" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Sahifa Sajjadiyya</b></sub></td>
<td align="center"><img src="assets/images/munasabatbg.png" width="240" alt="Munasabat" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/><br/><sub><b>Munasabat</b></sub></td>
</tr>
</table>

</div>

---

## ✨ Features

<div align="center">

<table>
<tr>
<td>

### 📖 Quran
- Full **SVG Mushaf** (722 pages)
- **604-page** JPG fallback
- **Audio recitation** streaming
- Multiple reciters
- Page-by-page reading
- Bookmark & progress tracking
- **Khatmah** (completion tracker)
- Verse search
- Share verses as images

</td>
<td>

### 📜 Hadith
- **Sunni** collections (Bukhari, Muslim)
- **Shia** collections via ShiaAPI
- **Aqwal** (sayings of Ahl al-Bayt)
- **12 Imam Quotes** system
- Full-text search
- Daily hadith widget
- Category browsing
- Detailed attribution

</td>
<td>

### 🕌 Prayer Times
- **Accurate** prayer time calculation
- **Adhan** audio playback
- **Foreground service** scheduling
- **Boot receiver** for persistence
- Next prayer **countdown**
- Location-based calculation
- Custom notification settings
- **4 Android home widgets**

</td>
</tr>
<tr>
<td>

### 🧭 Qibla
- **Real-time compass**
- Smooth animations
- Calibration UI
- **Compass face painter**
- Kaaba direction indicator
- GPS-based accuracy
- Degree display

</td>
<td>

### 📿 Tasbih
- **1922-line** feature module
- Multiple dhikr types
- Custom dhikr builder
- **Tasbih al-Zahra**
- Haptic feedback
- Visual progress
- Statistics tracking
- History log

</td>
<td>

### 🤲 Adhkar
- Morning & Evening adhkar
- Categorized content
- Progress tracking
- Custom categories
- Arabic text display
- Count-based completion

</td>
</tr>
<tr>
<td>

### 🏛️ Ziyarat
- Full Ziyarat collection
- **Sahifa Sajjadiyya**
- **Mafatih al-Jinan**
- Occasion-based browsing
- Bookmarking system
- Audio playback controls
- Reading mode toggle

</td>
<td>

### ⚖️ Fatwa
- **Arabic NLP** search engine
- Offline fatwa database
- Category filtering
- Clean architecture
- Full-text search

</td>
<td>

### 📱 Home Widgets
- **Prayer Times** (4×2 & 2×2)
- **Quran** widget (2×3)
- **Tasbih** counter (2×2)
- **Dashboard** (4×4)
- Interactive buttons
- Dark/Light themes

</td>
</tr>
</table>

</div>

---

## ⚡ Technology Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| <img src="https://img.shields.io/badge/Flutter-02569B?style=flat-square&logo=flutter" height="24"/> | **Flutter 3.29** | UI Framework |
| <img src="https://img.shields.io/badge/Dart-0175C2?style=flat-square&logo=dart" height="24"/> | **Dart 3.12** | Programming Language |
| <img src="https://img.shields.io/badge/Riverpod-3DDC84?style=flat-square" height="24"/> | **Riverpod 2.6** | State Management |
| <img src="https://img.shields.io/badge/GoRouter-02569B?style=flat-square" height="24"/> | **GoRouter 14.8** | Navigation |
| <img src="https://img.shields.io/badge/Hive-2ECC71?style=flat-square" height="24"/> | **Hive 2.2** | Local Database |
| <img src="https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin" height="24"/> | **Kotlin 2.1** | Android Native |
| <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square" height="24"/> | **Hive + SharedPrefs** | Storage |
| <img src="https://img.shields.io/badge/adhan_dart-2ECC71?style=flat-square" height="24"/> | **adhan_dart** | Prayer Calculations |
| <img src="https://img.shields.io/badge/Home_Widget-E74C3C?style=flat-square" height="24"/> | **home_widget** | Android Widgets |
| <img src="https://img.shields.io/badge/Just_Audio-9B59B6?style=flat-square" height="24"/> | **just_audio** | Audio Playback |

</div>

---

## 📁 Project Structure

<details>
<summary><b>📂 Click to expand full project structure</b></summary>

```
daily_islamic_widget/
│
├── lib/
│   ├── main.dart                          # App entry point
│   ├── app.dart                           # MaterialApp.router root
│   │
│   ├── core/                              # Core utilities
│   │   ├── arabic_strings.dart
│   │   ├── constants.dart
│   │   ├── navigation_guard.dart
│   │   ├── api/api_client.dart
│   │   ├── cache/
│   │   │   ├── cache_manager.dart
│   │   │   └── hive_cache_manager.dart
│   │   ├── constants/
│   │   │   ├── api_constants.dart
│   │   │   └── app_constants.dart
│   │   ├── errors/
│   │   │   ├── exceptions.dart
│   │   │   └── failures.dart
│   │   ├── network/
│   │   │   ├── network_info.dart
│   │   │   └── shia_api_client.dart
│   │   └── utils/
│   │       ├── arabic_search.dart
│   │       └── hijri_date.dart
│   │
│   ├── models/                            # Data models
│   │   ├── adhkar_model.dart
│   │   ├── api_models.dart
│   │   ├── favorite_model.dart
│   │   ├── hadith_model.dart
│   │   ├── khatmah_model.dart
│   │   ├── prayer_times.dart
│   │   ├── settings_model.dart
│   │   ├── tasbeeh_model.dart
│   │   └── verse_model.dart
│   │
│   ├── providers/                         # Riverpod providers
│   │   ├── adhkar_provider.dart
│   │   ├── daily_provider.dart
│   │   ├── favorites_provider.dart
│   │   ├── khatmah_provider.dart
│   │   ├── prayer_provider.dart
│   │   ├── prayer_time_providers.dart
│   │   ├── qibla_provider.dart
│   │   ├── settings_provider.dart
│   │   ├── tasbeeh_*.dart
│   │   └── tasbih_al_zahra_provider.dart
│   │
│   ├── routes/
│   │   └── app_router.dart               # GoRouter (40+ routes)
│   │
│   ├── services/                          # Platform services
│   │   ├── adhan_scheduler.dart
│   │   ├── api_service.dart
│   │   ├── data_service.dart
│   │   ├── home_widget_service.dart       # Android home widgets
│   │   ├── location_service.dart
│   │   ├── notification_helper.dart
│   │   ├── notification_service.dart
│   │   ├── permission_service.dart
│   │   ├── prayer_notification_service.dart
│   │   ├── prayer_scheduler.dart
│   │   ├── prayer_service.dart
│   │   ├── prayer_time_service.dart
│   │   └── storage_service.dart
│   │
│   ├── theme/
│   │   ├── app_theme.dart                 # Dark + Light themes
│   │   └── ds_components.dart            # Design system
│   │
│   ├── widgets/                           # Shared widgets
│   │   ├── azkar_progress_section.dart
│   │   ├── floating_dock_nav.dart
│   │   ├── hadith_card.dart
│   │   ├── hero_illustration.dart
│   │   ├── islamic_art.dart
│   │   ├── prayer_times_cards.dart
│   │   ├── premium_navbar.dart
│   │   ├── star_background.dart
│   │   ├── tasbih_hero_card.dart
│   │   └── verse_card.dart
│   │
│   └── features/                          # 21 Feature modules
│       ├── adhkar/                        # Morning & Evening Adhkar
│       ├── bookmarks/                     # Cross-feature bookmarks
│       ├── fatwa/                         # Fatwa search (Clean Arch)
│       ├── favorites/                     # Favorites management
│       ├── hadith/                        # Sunni Hadith collections
│       ├── hadith_shia/                   # Shia Hadith (Clean Arch)
│       ├── home/                          # Main dashboard
│       ├── khatmah/                       # Quran completion tracker
│       ├── more/                          # Additional features
│       ├── onboarding/                    # First-time experience
│       ├── prayer_times/                  # Prayer times (Clean Arch)
│       ├── premium/                       # Premium feature screens
│       ├── qibla/                         # Qibla compass (Clean Arch)
│       ├── quran/                         # Quran SVG Mushaf
│       ├── quran_audio/                   # Quran audio streaming
│       ├── search/                        # Universal search
│       ├── settings/                      # App settings
│       ├── splash/                        # Animated splash screen
│       ├── tasbeeh/                       # Tasbih counter
│       ├── widget_settings/               # Widget customization
│       └── ziyarat/                       # Ziyarat & Duas (Clean Arch)
│
├── assets/
│   ├── audio/                             # Adhan audio
│   ├── decorations/                       # Islamic SVG decorations
│   ├── fonts/                             # Custom Arabic fonts
│   ├── icons/                             # App icons & SVGs
│   ├── images/                            # Background images
│   ├── data/                              # 42+ JSON data files
│   │   ├── hadiths.json
│   │   ├── verses.json
│   │   ├── aqwal/                         # Aqwal data
│   │   ├── duas/                          # Duas collection
│   │   ├── fatwa/                         # Fatwa database
│   │   ├── hadith/                        # Bukhari & Muslim
│   │   ├── imams/                         # 12 Imam quotes system
│   │   ├── mafatih/                       # Mafatih al-Jinan
│   │   ├── occasions/                     # Islamic occasions
│   │   ├── quran/                         # Quran metadata
│   │   ├── sahifa/                        # Sahifa Sajjadiyya
│   │   ├── ziyarat/                       # Ziyarat collection
│   │   └── other/                         # Adhkar, Names of Allah
│   ├── quran-svg/                         # SVG Mushaf
│   │   ├── svg/                           # 722 SVG files
│   │   └── json/                          # 724 metadata files
│   └── quran/
│       └── ImagesOfQuranPages/            # 604 JPG pages
│
├── android/
│   └── app/src/main/
│       ├── AndroidManifest.xml            # 14 permissions, 4 widgets
│       └── kotlin/.../
│           ├── MainActivity.kt
│           ├── AdhanAlarmReceiver.kt      # Exact alarm receiver
│           ├── AdhanBootReceiver.kt       # Boot persistence
│           ├── AdhanForegroundService.kt  # Adhan audio service
│           ├── AdhanPlugin.kt             # Platform channel
│           ├── DashboardWidgetProvider.kt # 4×4 widget
│           ├── PrayerTimesWidgetProvider.kt
│           ├── QuranWidgetProvider.kt
│           ├── TasbihWidgetProvider.kt
│           └── WidgetActionReceiver.kt
│
├── ios/                                   # iOS runner
├── web/                                   # Web support
├── linux/                                 # Linux desktop
├── macos/                                 # macOS desktop
└── windows/                               # Windows desktop
```

</details>

---

## 🎯 Feature Architecture

<div align="center">

```mermaid
graph LR
    subgraph Features["21 Feature Modules"]
        direction TB
        F1["📖 Quran<br/>SVG Mushaf"]
        F2["📜 Hadith<br/>Sunni + Shia"]
        F3["🕌 Prayer Times<br/>+ Adhan"]
        F4["🧭 Qibla<br/>Compass"]
        F5["📿 Tasbih<br/>Counter"]
        F6["🤲 Adhkar<br/>M/E"]
        F7["🏛️ Ziyarat<br/>Duas"]
        F8["⚖️ Fatwa<br/>Search"]
        F9["📱 Widgets<br/>4 Types"]
        F10["🎵 Quran Audio<br/>Streaming"]
    end

    subgraph DataSources["Data Sources"]
        DS1["📱 Local JSON"]
        DS2["🌐 ShiaAPI"]
        DS3["🌐 AlAdhan API"]
        DS4["💾 Hive Cache"]
    end

    subgraph Output["User Experience"]
        UX1["🎨 Dark Theme"]
        UX2["☀️ Light Theme"]
        UX3["📱 Home Widgets"]
        UX4["🔔 Notifications"]
    end

    Features --> DataSources
    DataSources --> Output
```

</div>

---

## 🎨 Design System

<div align="center">

### Color Palette

| Swatch | Name | Hex | Usage |
|:---:|:---:|:---:|:---|
| 🟫 | **Navy Deep** | `#07111F` | Primary background |
| 🔵 | **Navy Mid** | `#0D1F3C` | Card backgrounds |
| 🟦 | **Navy Light** | `#1A3A5C` | Elevated surfaces |
| 🟡 | **Gold Primary** | `#C9A84C` | Primary accent |
| 🟡 | **Gold Light** | `#F0D078` | Highlight accent |
| 🟢 | **Success** | `#2ECC71` | Success states |
| 🔵 | **Info** | `#54C5F8` | Info states |
| 🔴 | **Error** | `#E74C3C` | Error states |
| ⬜ | **Text Primary** | `#E8E8E8` | Primary text |
| 🩶 | **Text Muted** | `#8A9BB5` | Secondary text |

### Typography

| Font | Family | Usage |
|:---:|:---:|:---|
| <img src="https://img.shields.io/badge/DecoType_Thuluth-C9A84C?style=flat-square" height="20"/> | `DecoTypeThuluth` | Arabic headings, decorative text |
| <img src="https://img.shields.io/badge/Noto_Naskh_Arabic-FFFFFF?style=flat-square&color=333" height="20"/> | `NotoNaskhArabic` | Arabic body text, Quran verses |
| <img src="https://img.shields.io/badge/Google_Fonts-54C5F8?style=flat-square" height="20"/> | `Google Fonts` | UI text, Latin characters |

</div>

---

## 📱 Android Home Widgets

<div align="center">

| Widget | Size | Description |
|:---:|:---:|:---|
| 🕌 | **4×2** | **Prayer Times** — Shows next prayer, time remaining, and daily schedule |
| 📖 | **2×3** | **Quran** — Quick access to last read page with bookmark |
| 📿 | **2×2** | **Tasbih** — Interactive counter with haptic feedback |
| 📊 | **4×4** | **Dashboard** — Full widget with prayer times, Quran verse, and tasbih |

</div>

---

## 🔄 Workflow

<div align="center">

```mermaid
graph TD
    A[🧑‍💻 Developer Push] --> B{GitHub Actions}
    B --> C[🔍 Lint & Analyze]
    B --> D[🧪 Run Tests]
    C --> E[🤖 Build APK]
    D --> E
    E --> F[📦 Upload Artifact]
    F --> G{Tag Release?}
    G -->|Yes| H[🚀 Create Release]
    G -->|No| I[✅ Done]
    H --> J[📱 Split APKs]
    J --> K[🌐 Deploy Web]
    K --> L[📝 Generate Changelog]
    L --> M[🎉 Published]

    style A fill:#1A3A5C,stroke:#C9A84C,color:#E8E8E8
    style B fill:#0D1F3C,stroke:#F0D078,color:#E8E8E8
    style C fill:#162A47,stroke:#54C5F8,color:#E8E8E8
    style D fill:#162A47,stroke:#54C5F8,color:#E8E8E8
    style E fill:#1A3352,stroke:#2ECC71,color:#E8E8E8
    style F fill:#1A3352,stroke:#2ECC71,color:#E8E8E8
    style H fill:#07111F,stroke:#C9A84C,color:#F0D078
    style M fill:#07111F,stroke:#2ECC71,color:#2ECC71
```

</div>

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Check |
|:---:|:---:|:---|
| Flutter | ≥ 3.29 | `flutter --version` |
| Dart | ≥ 3.12 | `dart --version` |
| Android SDK | API 21+ | `sdkmanager --list` |
| Java/JDK | 21+ | `java -version` |

### Installation

```bash
# Clone the repository
git clone https://github.com/Daily-Islamic-Widget/rafeeq.git
cd rafeeq

# Install dependencies
flutter pub get

# Run the app
flutter run
```

### Build Commands

<details>
<summary><b>🤖 Android</b></summary>

```bash
# Debug APK
flutter build apk --debug

# Release APK (universal)
flutter build apk --release

# Release APK (split per ABI — smaller)
flutter build apk --release --split-per-abi

# App Bundle (for Play Store)
flutter build appbundle --release
```
</details>

<details>
<summary><b>🌐 Web</b></summary>

```bash
# Build web
flutter build web --release --web-renderer canvaskit

# Serve locally
flutter run -d chrome
```
</details>

<details>
<summary><b>🖥️ Desktop</b></summary>

```bash
# Windows
flutter build windows --release

# macOS
flutter build macos --release

# Linux
flutter build linux --release
```
</details>

---

## 📊 Repository Stats

<div align="center">

<table>
<tr>
<td>

![Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=Daily-Islamic-Widget&repo=rafeeq&layout=compact&theme=radical&hide_border=true&bg_color=07111F&title_color=F0D078&text_color=E8E8E8&langs_count=8)

</td>
<td>

![Stats](https://github-readme-stats.vercel.app/api?username=Daily-Islamic-Widget&repo=rafeeq&show_icons=true&theme=radical&hide_border=true&bg_color=07111F&title_color=F0D078&text_color=E8E8E8&icon_color=C9A84C)

</td>
</tr>
</table>

![Streak](https://github-readme-streak-stats.herokuapp.com/?user=Daily-Islamic-Widget&repo=rafeeq&theme=radical&hide_border=true&background=07111F&stroke=C9A84C&ring=F0D078&fire=F0D078&currStreakLabel=C9A84C&sideLabels=E8E8E8)

</div>

---

## 🏆 GitHub Profile Stats

<div align="center">

<table>
<tr>
<td><img src="https://github-readme-stats.vercel.app/api?username=Daily-Islamic-Widget&show_icons=true&theme=tokyonight&hide_border=true&bg_color=07111F&title_color=F0D078&text_color=E8E8E8" width="400"/></td>
<td><img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Daily-Islamic-Widget&layout=compact&theme=tokyonight&hide_border=true&bg_color=07111F&title_color=F0D078&text_color=E8E8E8" width="400"/></td>
</tr>
</table>

<img src="https://github-profile-trophy.vercel.app/?username=Daily-Islamic-Widget&theme=radical&no-frame=true&no-bg=true&column=7&margin-w=10" width="100%"/>

</div>

---

## 📈 Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=Daily-Islamic-Widget/rafeeq&type=Date&background=07111F&line=C9A84C&area=C9A84C30&point=F0D078)](https://star-history.com/#Daily-Islamic-Widget/rafeeq&Date)

</div>

---

## 🤖 GitHub Actions

<div align="center">

| Workflow | Status | Description |
|:---:|:---:|:---|
| <img src="https://img.shields.io/badge/Build_%26_Test-07111F?style=for-the-badge&logo=github-actions&labelColor=07111F&color=2ECC71" height="24"/> | ![Build](https://github.com/Daily-Islamic-Widget/rafeeq/actions/workflows/build.yml/badge.svg) | Lint, test, and build APK |
| <img src="https://img.shields.io/badge/Release-07111F?style=for-the-badge&logo=github&labelColor=07111F&color=F0D078" height="24"/> | ![Release](https://github.com/Daily-Islamic-Widget/rafeeq/actions/workflows/release.yml/badge.svg) | Automated release pipeline |
| <img src="https://img.shields.io/badge/CodeQL-07111F?style=for-the-badge&logo=github-security&labelColor=07111F&color=E74C3C" height="24"/> | ![CodeQL](https://github.com/Daily-Islamic-Widget/rafeeq/actions/workflows/codeql.yml/badge.svg) | Security analysis |

</div>

---

## 🛡️ Security

<div align="center">

| Metric | Status |
|:---:|:---:|
| **CodeQL Analysis** | ![CodeQL](https://img.shields.io/badge/Passing-2ECC71?style=flat-square) |
| **Dependency Review** | ![Dependabot](https://img.shields.io/badge/Enabled-2ECC71?style=flat-square) |
| **Secret Scanning** | ![Secrets](https://img.shields.io/badge/Protected-2ECC71?style=flat-square) |

</div>

---

## ⚡ Performance

<div align="center">

| Metric | Target | Status |
|:---:|:---:|:---:|
| Cold Start | < 2s | ✅ |
| Widget Load | < 1s | ✅ |
| Prayer Time Calc | < 100ms | ✅ |
| SVG Render | < 50ms | ✅ |
| Memory Usage | < 150MB | ✅ |
| APK Size | < 30MB | ✅ |

</div>

---

## 🌍 Localization

<div align="center">

| Language | Status | RTL Support |
|:---:|:---:|:---:|
| 🇸🇦 Arabic | ✅ Primary | ✅ Full RTL |
| 🇬🇧 English | ✅ Supported | ✅ LTR |

</div>

---

## 🗺️ Roadmap

```mermaid
timeline
    title رَفيِقْ Development Roadmap
    section v1.0
        Core Features : Quran SVG Mushaf
                      : Hadith Collections
                      : Prayer Times
                      : Qibla Compass
                      : Tasbih Counter
                      : Home Widgets
    section v1.1
        Enhancements : Audio Quran Streaming
                     : Fatwa Search
                     : Ziyarat Collection
                     : Adhkar System
                     : Khatmah Tracker
    section v1.2
        Premium : Cloud Sync
                : iOS Widgets
                : Apple Watch
                : WearOS
    section v2.0
        Community : Multi-language Support
                  : Community Content
                  : AI-powered Suggestions
                  : Social Features
```

---

## 📋 Changelog

<details>
<summary><b>📦 v1.0.0 — Initial Release</b></summary>

### Added
- Full SVG Mushaf with 722 pages
- 604-page JPG fallback for Quran
- Sunni Hadith collections (Bukhari, Muslim)
- Shia Hadith via ShiaAPI integration
- 12 Imam Quotes system
- Aqwal (Sayings of Ahl al-Bayt)
- Prayer time calculation with Adhan audio
- Qibla compass with real-time animation
- Tasbih counter with multiple dhikr types
- Tasbih al-Zahra
- Morning & Evening Adhkar
- Ziyarat collection
- Sahifa Sajjadiyya
- Mafatih al-Jinan
- Fatwa search with Arabic NLP
- 4 Android home screen widgets
- Quran audio streaming
- Khatmah (completion) tracker
- Bookmark system
- Search functionality
- Settings with theme support
- Dark mode with luxury navy + gold theme
- Light mode support
- Arabic RTL support
- English locale support
- Onboarding flow
- Animated splash screen
- Custom Arabic fonts (DecoType Thuluth, Noto Naskh Arabic)
- Boot receiver for prayer time persistence
- Foreground service for Adhan audio
- Permission handling system
- Hive-based caching
- GoRouter with 40+ routes
- Riverpod state management
- Feature-first clean architecture

</details>

---

## 🤝 Contributing

<div align="center">

**We welcome contributions!**

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

[![Contributors](https://contrib.rocks/image?repo=Daily-Islamic-Widget/rafeeq)](https://github.com/Daily-Islamic-Widget/rafeeq/graphs/contributors)

</div>

---

## ❓ FAQ

<details>
<summary><b>Is this app free?</b></summary>

**Yes.** Rafeeq is completely free and open-source under the MIT License.

</details>

<details>
<summary><b>Does it work offline?</b></summary>

**Yes.** Quran pages, Hadith collections, Adhkar, Duas, Ziyarat, and more are bundled as local JSON data. Prayer times are calculated locally. Only audio streaming and ShiaAPI features require internet.

</details>

<details>
<summary><b>What Android versions are supported?</b></summary>

**Android 5.0 (API 21) and above.** This covers 99%+ of active Android devices.

</details>

<details>
<summary><b>How accurate are prayer times?</b></summary>

Prayer times use the `adhan_dart` library which supports multiple calculation methods (MWL, ISNA, Egypt, Makkah, Karachi, Tehran, etc.) with GPS-based location accuracy.

</details>

<details>
<summary><b>Can I contribute Hadith translations?</b></summary>

Yes! Check our [Contributing Guide](CONTRIBUTING.md) for details on adding content.

</details>

<details>
<summary><b>Why is the app called Rafeeq?</b></summary>

رَفيِقْ (Rafeeq) means "companion" in Arabic — a faithful friend who walks with you on your spiritual journey.

</details>

---

## ⚠️ Known Limitations

| Issue | Status | Workaround |
|:---|:---:|:---|
| iOS home widgets not yet implemented | 🔄 Planned | Use Android or in-app widgets |
| Audio requires internet for streaming | ℹ️ By design | Quran pages work fully offline |
| Web build uses CanvasKit (larger) | 🔄 Optimizing | Use auto renderer for smaller bundle |
| Desktop support is experimental | 🔄 In progress | Mobile is the primary target |

---

## 📄 License

<div align="center">

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 🙏 Acknowledgements

<div align="center">

- [Flutter](https://flutter.dev) — Beautiful native apps in record time
- [Riverpod](https://riverpod.dev) — Robust state management
- [Hive](https://hive.io) — Fast, lightweight local database
- [adhan_dart](https://pub.dev/packages/adhan_dart) — Prayer time calculations
- [ShiaAPI](https://shiaapi.com) — Shia hadith data
- [AlAdhan API](https://aladhan.com/prayer-times-api) — Prayer time API
- [Noto Naskh Arabic](https://fonts.google.com/noto/specimen/Noto+Naskh+Arabic) — Arabic typeface
- [DecoType Thuluth](https://www.decotype.com) — Decorative Arabic font
- Every contributor and user who makes this project better
- **جزاكم الله خيراً** — May Allah reward you all

</div>

---

## ☕ Support the Project

<div align="center">

If Rafeeq has been beneficial to you, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/)
[![Sponsor](https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/Daily-Islamic-Widget)

Your support helps maintain and improve this Islamic companion app.

</div>

---

## 👨‍💻 Author

<div align="center">

<img src="https://github-readme-cards.vercel.app/api/username?username=Daily-Islamic-Widget&theme=radical&hide_border=true&bg_color=07111F&title_color=F0D078&text_color=E8E8E8&border_color=C9A84C&icon_color=C9A84C" width="400"/>

---

**Built with ❤️ and Flutter for the Ummah**

<div align="center">

![Visitors](https://api.visitorbadge.io/api/visitors?path=Daily-Islamic-Widget%2Frafeeq&countColor=%23C9A84C&labelColor=%2307111F&style=for-the-badge&label=VISITORS&textColor=%23E8E8E8&rightColor=%232ECC71)

</div>

---

<div align="center">

**بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ**

---

*May this app be a means of closeness to Allah SWT*

**رَفيِقْ** — *Your Premium Islamic Companion*

</div>

</div>

---

<div align="center">

<a href="https://github.com/Daily-Islamic-Widget/rafeeq">
<img src="assets/banner/rafeeq-logo.svg" width="200" alt="رَفيِقْ"/>
</a>

**[⬆ Back to Top](#-رفيق--rafeeq)**

</div>
