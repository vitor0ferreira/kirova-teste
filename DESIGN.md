# DESIGN.md — Kairova Engenharia & Mobilidade Sustentável S.A.

## Phase 0: Brief

- **Subject**: **Kairova Engenharia & Mobilidade Sustentável S.A.** (Nome Fantasia: **Kairova**), fundada em 2021 em Uberaba, MG, por Henrique Bastos (Engenharia Elétrica), Camila Nogueira (Engenharia de Software e IoT) e Rafael Telles (Gestão de Cadeias Logísticas).
- **Scale**: 145 colaboradores diretos, faturamento anual projetado de R$ 48 milhões em 2026, atuação em 9 estados brasileiros e mais de 1.800 pontos de recarga inteligentes sob gestão (HaaS + SaaS + Engenharia Turnkey + NOC 24/7 com SLA presencial de 6 horas).
- **Audience**: Diretores de Logística e Gestores de Frota, Gerentes de Facilities e Sustentabilidade (ESG), Incorporadoras e Administradoras de Condomínios Logísticos (B2B e B2G).
- **Job**: Converter decisores C-Level e diretores operacionais para estudos de viabilidade elétrica e implantação turnkey de eletropostos corporativos, demonstrando engenharia nacional robusta e retorno auditável.
- **Language**: Português (`pt-BR`), tom técnico, acessível, direto, sem greenwashing e sem travessões ou clichês de IA (`/humanizer`).
- **Explicit Assumptions (marked `placeholder: true` in `src/data/site.ts`)**:
  - The 3 field case studies (`/cases/cooperativa-agroindustrial-triangulo`, `/cases/distribuicao-urbana-sp-mg`, `/cases/condominio-logistico-leed`) model realistic Brazilian B2B operations for the three ICP profiles and the 2023 agro-industrial cooperative milestone described in the dossier, using anonymized operational names (`Cooperativa Triângulo Verde`, `Malha Urbana Sudeste`, `Parque Logístico Bandeirantes`) and representative engineering telemetry for demonstration until replaced with signed client names.
  - The interactive load-balancing simulator and viability request form run client-side simulations and confirmations without submitting to an external CRM backend.

---

## Phase 1: Concepts & Selection

| Territory | Concept | Anchor | Signature | Emotion (3s) | Motion Verb | Screenshot Frame | O | F | Fe | P (lower=better) | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **A. Process & Material (Selected)** | **O Barramento de Carga Dinâmico**: o site opera como um barramento industrial que roteia capacidade da subestação até as baias de recarga conforme você percorre a página. | O controlador proprietário **Kairova GridGuard (DLM)** e a barra LED cinética visível a 50 m no chassi galvanizado `#0F2922`. | Driver único (`src/motion/driver.ts`) acoplando WebGL de campo trifásico + simulador de demanda no Hero + figura isométrica `/anatomy` do barramento GridGuard. | Autoridade industrial, precisão de subestação e controle imediato de energia. | **Engatar e estabilizar** (acionamento seco de contator seguido de amortecimento exponencial `expo.out`). | Hero dividido com foto de pátio ao amanhecer, barra LED `#32E875` ativa e simulador de carga do transformador em tempo real. | 5 | 5 | 5 | 1 | **14** |
| B. Name / Etymology | **A Janela Kairós (Tarifa Branca/Verde)**: toda a navegação segue o relógio de despacho fora de ponta, alterando custo/kWh e iluminação do pátio ao longo das 24 horas. | A origem do nome *Kairós* (momento certo) e o agendamento fora de ponta do Kairova OS. | Timeline de 24h acoplada ao scroll mudando o céu e a tarifa de energia. | Controle econômico e ritmo logístico noturno. | **Chavear janela** | Barra horária de tarifa verde/branca cruzando um pátio logístico. | 4 | 4 | 4 | 2 | 10 |
| C. Place / Material | **Chassi Galvanizado IP66**: cada seção é uma placa de aço microtexturizado aparafusada por pinos RFID, resistente a 40°C e chuva torrencial. | Proteção física IP66/IK10 e estética industrial do Triângulo Mineiro. | Camadas recortadas por dobras de chapa e parafusos de inspeção. | Solidez mecânica à prova de vandalismo e campo pesado. | **Travar com torque** | Grade metálica escura com indicadores LED verticais. | 4 | 5 | 4 | 2 | 11 |

**Selected Concept**: **A (O Barramento de Carga Dinâmico)** — lowest portability (1/5: inextricably tied to GridGuard DLM, 500 kVA substation constraints, and HaaS/SaaS fleet charging), drives layout, global color transitions, WebGL field lines, the `/anatomy` isometric figure, loader voltage counter, 45° K-circuit transitions, and the 404 open-circuit state.

### Concept Card
```
Idea:        A corporate showcase behaving as a live industrial busbar that balances substation power across Kairova hardware, cloud telemetry, and turnkey field operations.
Metaphor:    An industrial load-dispatch bench and galvanized steel IP66 charger chassis pierced by a 50-meter kinetic lime status LED.
Signature:   Single busbar driver coupling a fullscreen oscillographic WebGL field, an interactive Hero substation demand toggle, and a 50+ part isometric /anatomy GridGuard load bench.
Emotion:     Grounded engineering authority, zero greenwashing, and measurable control over energy capacity.
Motion verb: Engatar e estabilizar (snap like a contactor relay, settle like damped voltage).
Screenshot:  The split Hero with dawn logistics yard photography, 380V telemetry bar, and the interactive GridGuard isometric test rig at rest.
```

---

## Phase 2: Art Direction System

### Palette (Strategic Kairova Tokens)
- `--c-bg`: `#F4F7F6` (Branco Gelo Técnico — reading chapters ground; switches to `#0F2922` when `html.is-dark` is active)
- `--c-fg`: `#0F2922` (Verde Grafite Profundo — primary ink on light; switches to `#F4F7F6` when `html.is-dark` is active)
- `--c-surface`: `#FFFFFF` (light) / `#16382E` (dark)
- `--c-titanium`: `#2C3539` (Cinza Titânio — dark mode software console & secondary technical panels)
- `--c-muted`: `#3D4F49` (light, 8.2:1 contrast on `#F4F7F6`) / `#A3B8B0` (dark, 7.2:1 contrast on `#0F2922`)
- `--c-line`: `rgb(15 41 34 / 0.14)` (light) / `rgb(244 247 246 / 0.16)` (dark)
- `--c-accent`: `#32E875` (Verde-Lima Cinético — LED status bar, active telemetry, primary fills on dark)
- `--c-accent-ink`: `#0F2922` (ink on `#32E875`, 9.2:1 contrast)
- `--c-amber`: `#F59E0B` (Âmbar Industrial — preventive maintenance & transformer peak warnings)
- `--c-curtain`: `#0F2922` (45° circuit wipe curtain)

### Typography
- **Display**: `Space Grotesk` (weights 600, 700) via `next/font/google`, `--f-display`. Negative tracking (`-0.04em` at mega/xl, `-0.025em` at l), leading `0.90` to `1.02`.
- **Body & UI**: `Plus Jakarta Sans` (weights 400, 500, 600) via `next/font/google`, `--f-body`. Body 16–18px (`var(--t-body)`), leading `1.55`, max measure `60ch`.
- **Numeric Telemetry & Station IDs**: `JetBrains Mono` (weights 400, 500) via `next/font/google`, `--f-mono` with `font-variant-numeric: tabular-nums`. Used strictly for electrical metrics (kW, kVA, V, SLA, station IDs).

### Grid, Shape & Motion
- **Grid**: 12 columns on desktop (`--gutter: clamp(1rem, 0.6rem + 1.6vw, 2.5rem)`), 4 columns on mobile (`390px`), strong vertical anchor lines at col 1, col 5, and col 9.
- **Shape**: `--radius: 2px` industrial chamfered rule across cards, plates, and buttons (status indicator pills use `999px` only for LED status chips).
- **Motion Language**: Shared GSAP eases (`expo.out` 1.1s reveals, `expo.inOut` 0.85s 45° diagonal circuit wipe, `power3.out` 0.4s contactor snap hovers). Micro-interactions: `.roll` inner label roll on nav links, directional `[data-fill]` pointer-entry flood on primary CTAs, `.link` rising highlight band on inline links, and `indexPreview` cursor-following preview on the case index list.
- **Idle State**: Fullscreen WebGL oscillographic field (`uTime` + `uMouse`) + `src/motion/idle.ts` gentle 60Hz phase drift on the Hero LED status indicator and `/anatomy` GridGuard idle sine load tour (paused offscreen and under `prefers-reduced-motion`).

### Composition Plan (Home `/` — 8 Distinct Layout Families)
```
1. SPLIT-FRAME HERO (dark #0F2922 ground, 100svh+):
   [H1: Energia no tempo certo. Movimento sem pausas.] | [Hero yard photo (data-gl-instant)]
   [Interactive Substation Load Simulator (85%/55%/20%)]| [Live kW & tariff readout bar]

2. TABULAR DATA STRIP (light #F4F7F6 ground):
   [1.800+ pontos] | [9 estados] | [99,94% uptime] | [6 h SLA presencial] | [R$ 48 mi proj. 2026]

3. ANATOMY ISOMETRIC EXPLAINER FIGURE (light ground, col 1..12):
   [Section heading + engineering prose]
   [Fig 01: Malha de Balanceamento Dinâmico GridGuard (interactive 55-part SVG test bench)]

4. STICKY NARRATIVE HARDWARE CHAPTERS (light ground):
   [Sticky hardware lineup visual / active spec readout] | [01 Wallbox Pro 22kW]
                                                          | [02 FastHub 120kW DC]
                                                          | [03 GridGuard DLM]

5. ASYMMETRIC CONSOLE & TURNKEY SERVICES (Cinza Titânio #2C3539 dark inset + light cols):
   [Kairova OS & Pay & Roaming Dark Console Card]         | [3 Specialized Services: Viabilidade, Turnkey NR-10/35, NOC 24/7]

6. INDEX LIST WITH CURSOR PREVIEW (light ground):
   [Case 01: Cooperativa Triângulo Verde  | Agroindústria · MG   | 480 kW] -> floating photo preview on desktop,
   [Case 02: Malha Urbana Sudeste         | Frota Leve · SP/MG   | 720 kW]    inline thumbnails on mobile
   [Case 03: Parque Logístico Bandeirantes| Condomínio LEED · SP | 360 kW]

7. STATEMENT / MANIFESTO & 4 PILLARS (dark #0F2922 transition):
   [Large statement across 9 cols]
   [4 asymmetrical engineering pillar rows + link to /sobre]

8. FOOTER AS FINALE & VIABILITY REQUEST (dark #0F2922 ground):
   [Interactive Technical Viability Estimator Form] | [Uberaba HQ Address, Phone, WhatsApp, Email]
   [Giant KAIROVA wordmark]
```

### Genericness Test
- *Question*: "If I gave a similar prompt to a generic model, would it land here?"
- *Changes made to fail genericness*:
  1. Replaced generic dark-neon SaaS cards with **alternating Branco Gelo Técnico (`#F4F7F6`) and Verde Grafite Profundo (`#0F2922`) engineering chapters** tied to a single global scroll/load driver.
  2. Replaced decorative feature boxes with a **real 500 kVA Transformer + GridGuard DLM interactive simulator in the Hero** and a **55+ solid-part isometric `/anatomy` machine** running on the same GSAP ticker clock.
  3. Replaced stock city/EV illustrations with **bespoke industrial photography in Brazilian logistics yards and labs** featuring `#0F2922` galvanized steel hardware and `#32E875` LED bars.
