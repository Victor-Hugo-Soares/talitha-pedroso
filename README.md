# Talitha Pedroso — Clínica de Estética Premium

Landing page React moderna para a **Talitha Pedroso Clínica de Estética**, localizada em Franco da Rocha – SP.

## 🚀 Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Build para produção
npm run build

# 4. Preview do build
npm run preview
```

## 📁 Estrutura

```
talitha-pedroso/
├── public/
│   ├── favicon.svg
│   └── images/          ← Adicione as fotos reais aqui
│       ├── hero-recepcao.jpg
│       ├── balcao-onix.jpg
│       ├── talitha-perfil.jpg
│       ├── area-zen.jpg
│       ├── sala-tratamento.jpg
│       └── fachada.jpg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── ui/          ← Design system (átomos)
│   │   ├── layout/      ← Navbar, Footer
│   │   └── sections/    ← Hero, About, Services...
│   ├── hooks/
│   ├── data/
│   ├── styles/
│   └── utils/
└── index.html
```

## 🎨 Design System

| Token          | Valor          |
|----------------|----------------|
| `--color-wine` | `#6B1E3A`      |
| `--color-gold` | `#C9923A`      |
| Font serif     | Playfair Display |
| Font script    | Great Vibes    |
| Font sans      | Montserrat     |

## 📱 Funcionalidades

- **Hero cinematográfico** com partículas douradas canvas + parallax
- **Navbar** transparent → glassmorphism ao rolar, drawer animado no mobile
- **Seção About** com curtain reveal na foto e credenciais em stagger
- **Cards de serviços** com 3D tilt, aurora hover e modal de detalhes
- **Galeria** com Ken Burns, lazy loading e Lightbox nativo (React Portal)
- **Carrossel de depoimentos** Embla com autoplay e drag gesture
- **Contadores animados** com easing suave (easeOutExpo)
- **WhatsApp float** com ripple triplo, tooltip e chat bubble após 8s
- **Quiz de recomendação** (AIChatBot) com 3 passos → mensagem pré-preenchida
- **Splash screen** com monograma TP dourado
- **Cursor customizado** dourado com spring lag (desktop)
- **Scroll progress bar** dourada no topo

## 📸 Imagens

Adicione as fotos reais da clínica em `public/images/`:

| Arquivo               | Uso                    |
|-----------------------|------------------------|
| `hero-recepcao.jpg`   | Galeria / Hero         |
| `balcao-onix.jpg`     | Galeria                |
| `talitha-perfil.jpg`  | Seção About            |
| `area-zen.jpg`        | Galeria                |
| `sala-tratamento.jpg` | Galeria                |
| `fachada.jpg`         | Galeria                |

## 🔧 Variáveis de Ambiente

`.env`:
```
VITE_WA_NUMBER=5511910257931
VITE_WA_MESSAGE=Olá! Vim pelo site e gostaria de agendar minha avaliação gratuita.
VITE_INSTAGRAM=https://instagram.com/talithapedrosooficial_
```

## 📦 Dependências principais

| Pacote                      | Uso                          |
|-----------------------------|------------------------------|
| `framer-motion`             | Animações declarativas       |
| `embla-carousel-react`      | Carrossel de depoimentos     |
| `react-icons`               | Ícones (WhatsApp, Instagram) |
| `react-intersection-observer` | Animações ao scroll        |
| `clsx`                      | Classes condicionais         |
