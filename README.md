<div align="center">

# G.study

### 개발 공부와 프로젝트 진행 과정을 기록하는 저장소

문제를 발견하고, 직접 구축하고, 결과를 검증한 과정을 문서로 남깁니다.

![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=ubuntu&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white)
![C](https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black)
![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=cplusplus&logoColor=white)

</div>

---

## About This Repository

`G.study`는 수업 과제만 보관하는 저장소가 아니라, 공부한 내용을 실제 프로젝트에 적용하고 그 과정에서 발생한 문제와 해결 방법을 함께 기록하기 위한 공간입니다.

관심 분야는 다음과 같습니다.

- 게임 개발 및 게임 서버 운영
- Linux 서버와 네트워크
- Android 애플리케이션 개발
- AI·LLM 기반 자동화
- C/C++ 기초와 시스템 프로그래밍

---

## Featured Project

### Ubuntu 기반 홈 게임 서버 인프라 구축

개인 PC에서 실행하던 게임 서버를 전용 미니 PC로 분리하고, Ubuntu·Pterodactyl·Webmin·SSH를 활용해 Minecraft, Project Zomboid, Palworld 서버를 관리할 수 있도록 구축한 프로젝트입니다.

[![Pterodactyl에서 관리 중인 게임 서버](./portfolio/home-game-server/images/03-pterodactyl-servers.png)](./portfolio/home-game-server/README.md)

| 항목 | 내용 |
|---|---|
| 하드웨어 | SER8 / Ryzen 7 8745HS / RAM 16GB / SSD 512GB |
| 운영체제 | Ubuntu Desktop 24.04.4 LTS |
| 관리 도구 | SSH, Webmin, Pterodactyl, Docker |
| 운영 경험 | Minecraft 최대 7명 접속, 약 한 달 연속 운영 |
| 주요 결과 | TPS 20.0 확인, Discord 연동, 도메인·SRV 구성, 백업 생성 |

**프로젝트 문서**

- [프로젝트 메인 소개](./portfolio/home-game-server/README.md)
- [기술 구성 상세](./portfolio/home-game-server/technical-details.md)
- [문제 발생 및 해결 과정](./portfolio/home-game-server/troubleshooting.md)
- [구축 및 운영 증거 자료](./portfolio/home-game-server/evidence.md)
- [서버 보안 점검 기록](./portfolio/home-game-server/security-audit.md)
- [Notion 포트폴리오](https://app.notion.com/p/39ccb19a62b2815997ecf67c43a424b3)

---

## Projects in Progress

현재 진행하거나 포트폴리오 문서로 정리할 예정인 프로젝트입니다.

| 프로젝트 | 분야 | 상태 |
|---|---|---|
| Roblox 3D 로그라이크 | 게임 개발 / Luau | 개발 진행 중 |
| Android 애플리케이션 | Kotlin / Jetpack Compose | 학습 및 프로젝트 정리 예정 |
| 로컬 LLM·자동화 | AI / 홈 서버 | 기획 및 실험 예정 |

---

## Documentation Style

프로젝트를 정리할 때 다음 원칙을 지향합니다.

1. 무엇을 만들었는지보다 **왜 만들었는지**를 먼저 설명합니다.
2. 설치 목록보다 **직접 판단하고 해결한 과정**을 강조합니다.
3. 측정하지 않은 결과는 추측하지 않고 한계로 기록합니다.
4. 메인 문서는 짧게 유지하고 세부 기술 기록은 별도 문서로 분리합니다.
5. 화면 자료와 수치를 함께 남겨 실제 운영 여부를 검증할 수 있도록 합니다.

---

<div align="center">

### Build · Test · Document · Improve

</div>
