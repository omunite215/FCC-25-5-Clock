<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<div align="center">
  <h1>25 + 5 Clock</h1>
  <p><b>A modern Pomodoro timer for focused work — session and break countdowns wrapped in a glowing glass UI.</b></p>
  <p>
    <a href="https://255clockbyom.netlify.app/"><strong>View Demo »</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/omunite215/FCC-25-5-Clock/issues/new?labels=bug">Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/omunite215/FCC-25-5-Clock/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul><li><a href="#built-with">Built With</a></li></ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

<p align="center"><img src="public/screenshot.png" alt="25 + 5 Clock screenshot" width="800" /></p>

The 25 + 5 Clock is a Pomodoro-style timer that alternates between focus
sessions and short breaks. It was built for the freeCodeCamp Front End
Development Libraries certification and then rebuilt from the ground up on a
modern stack. Set your session and break lengths, press start, and it counts
down, switches phase automatically, and sounds an alarm at each boundary — so
you can keep your attention on the work instead of the clock.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![React][React-badge]][React-url]
[![TypeScript][TS-badge]][TS-url]
[![Vite][Vite-badge]][Vite-url]
[![Bun][Bun-badge]][Bun-url]
[![Vitest][Vitest-badge]][Vitest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- Session and break countdowns that alternate automatically and alarm at `00:00`.
- Adjustable lengths from 1 to 60 minutes via steppers.
- A custom-durations form to type exact minutes, validated with react-hook-form and Zod.
- A circular progress ring that depletes as time runs and recolours per phase (violet for session, teal for break).
- Live tab-title countdown so you can track time from another tab.
- Keyboard shortcuts: `Space` to start/pause, `R` to reset.
- A completed-Pomodoro counter.
- Accessible by default: AA contrast, visible focus states, and reduced-motion support.
- Passes the full freeCodeCamp 25 + 5 Clock test suite.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3 or newer (npm also works).

### Installation

```bash
git clone https://github.com/omunite215/FCC-25-5-Clock.git
cd FCC-25-5-Clock
bun install
bun run dev
```

The app runs at `http://localhost:5173`. Other scripts:

```bash
bun run build     # type-check and build for production (dist/)
bun run preview   # serve the production build
bun run test      # run the test suite
bun run lint      # lint the project
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

- Use the up/down steppers to set the **break** and **session** lengths, or open
  **Custom durations** to type exact minutes.
- Press **Start** (or `Space`) to begin the countdown; press again to pause.
- Press **Reset** (or `R`) to return everything to 25 / 5 and silence the alarm.
- When a countdown hits `00:00` the alarm plays and the timer flips to the other
  phase automatically.

To verify against the official freeCodeCamp suite, add the test bundle to
`index.html` and pick "25 + 5 Clock" from the test menu:

```html
<script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Architecture

A single `useTimer` hook owns all timer state. One interval runs inside an effect
keyed on the running flag, and a separate effect handles the phase boundary — it
beeps at `00:00`, then switches phase one tick later so the display truly reaches
zero. The rest of the components are pure and driven entirely by that hook.

<p align="center"><img src="public/architecture.drawio.png" alt="System architecture diagram" width="900" /></p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Desktop notification when a phase ends
- [ ] Selectable alarm sounds
- [ ] Optional light theme

See the [open issues](https://github.com/omunite215/FCC-25-5-Clock/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions make the open-source community a great place to learn and build. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Om Patel

[![GitHub][github-shield]][github-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Instagram][instagram-shield]][instagram-url]
[![Portfolio][portfolio-shield]][portfolio-url]
[![Email][email-shield]][email-url]

Project link: [https://github.com/omunite215/FCC-25-5-Clock](https://github.com/omunite215/FCC-25-5-Clock)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

- [freeCodeCamp](https://www.freecodecamp.org) — the 25 + 5 Clock project
- [Best README Template](https://github.com/othneildrew/Best-README-Template)
- [Shields.io](https://shields.io)
- [Simple Icons](https://simpleicons.org) for tech-stack logos

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center">
  <br />
  <img src="public/mylogo.png" alt="25 + 5 Clock logo" width="200" />
  <p><sub>Built by Om Patel</sub></p>
</div>

[contributors-shield]: https://img.shields.io/github/contributors/omunite215/FCC-25-5-Clock.svg?style=for-the-badge
[contributors-url]: https://github.com/omunite215/FCC-25-5-Clock/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/omunite215/FCC-25-5-Clock.svg?style=for-the-badge
[forks-url]: https://github.com/omunite215/FCC-25-5-Clock/network/members
[stars-shield]: https://img.shields.io/github/stars/omunite215/FCC-25-5-Clock.svg?style=for-the-badge
[stars-url]: https://github.com/omunite215/FCC-25-5-Clock/stargazers
[issues-shield]: https://img.shields.io/github/issues/omunite215/FCC-25-5-Clock.svg?style=for-the-badge
[issues-url]: https://github.com/omunite215/FCC-25-5-Clock/issues
[license-shield]: https://img.shields.io/github/license/omunite215/FCC-25-5-Clock.svg?style=for-the-badge
[license-url]: https://github.com/omunite215/FCC-25-5-Clock/blob/main/LICENSE

[github-shield]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/omunite215
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/om-patel-ai
[instagram-shield]: https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/_21omp/
[portfolio-shield]: https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white
[portfolio-url]: https://portfolio-jade-gamma-13.vercel.app
[email-shield]: https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white
[email-url]: mailto:omunite21@gmail.com

[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev
[TS-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org
[Vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev
[Bun-badge]: https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white
[Bun-url]: https://bun.sh
[Vitest-badge]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev
