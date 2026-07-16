# GPT Roguelike

> Roblox에서 제작 중인 **3D 뱀파이어 서바이벌 스타일 로그라이트** 프로젝트입니다.  
> 반복 생존 전투와 하데스식 로비 성장, 직업·무기·아이템 빌드 시스템을 결합하는 것을 목표로 합니다.

## 프로젝트 개요

- **플랫폼:** Roblox
- **언어:** Luau
- **개발 도구:** Roblox Studio, VS Code, Rojo
- **장르:** 3D 생존 로그라이트 / RPG
- **최신 소스 스냅샷:** v2.7.2 Core State Fix
- **개발 상태:** Alpha

## 핵심 게임 루프

```text
로비에서 직업·장비 선택
→ 생존 필드 진입
→ 자동 공격과 직업별 Q/E/R 사용
→ EXP 획득 및 1/2/3 레벨업 선택
→ 무기·패시브 조합과 진화
→ 사망 또는 보스 처치
→ Soul·장비·기록을 저장하고 로비 성장
```

## 구현된 주요 기능

- 자동 공격 및 무기별 공격 방식
- 전사·궁수·마법사·암살자·수호자 직업
- 직업별 Q/E/R 스킬
- EXP 보석, Gold 코인, 자동 흡수
- 로그라이크 레벨업 선택과 빌드 UI
- 무기 및 패시브 아이템, 진화 시스템
- Soul 영구 성장과 DataStore 저장
- F~S 직업 무기 가챠, 확률표, 천장·조각 구조
- 인벤토리, 장착, 판매
- 원거리 적 투사체
- 랭킹 및 플레이어 거래 프로토타입
- PC 키보드 1/2/3 선택 UI

## 스크린샷

### 레벨업 UI 초기 버전

![레벨업 UI](docs/images/level-up-ui-prototype.png)

## 기술 구조

```text
src/
├─ ReplicatedStorage/Modules       # 설정·데이터·공유 모듈
├─ ServerScriptService             # 서버 게임 로직
└─ StarterPlayer/StarterPlayerScripts
                                  # 클라이언트 HUD·입력·이펙트
```

현재 맵은 `MapBuilder`가 런타임에 생성하는 프로토타입 구조입니다. 향후에는 **맵·UI는 Studio에서 제작하고 코드만 Rojo로 관리하는 하이브리드 구조**로 전환할 예정입니다.

자세한 내용:

- [아키텍처](docs/ARCHITECTURE.md)
- [개발 과정](docs/DEVELOPMENT_HISTORY.md)
- [테스트 기록](docs/TESTING.md)
- [향후 계획](docs/ROADMAP.md)
- [아트 방향](docs/ART_DIRECTION.md)

## 소스 코드 스냅샷

포트폴리오 작성 시점의 전체 Luau 소스는 GitHub 파일 크기와 구조 확인 편의를 위해 네 개의 ZIP으로 나누어 보관합니다.

- [공용 Modules](source/ReplicatedStorage_Modules.zip)
- [서버 핵심 코드](source/Server_Core.zip)
- [서버 기능 코드](source/Server_Features.zip)
- [클라이언트 코드](source/StarterPlayerScripts.zip)
- [압축 해제 및 Rojo 연결 안내](source/README.md)
- [전체 파일 목록](SOURCE_MANIFEST.md)

## Rojo 실행

1. 위의 네 소스 ZIP을 같은 폴더에 모두 압축 해제합니다.
2. Rojo 7과 Roblox Studio Rojo 플러그인을 설치합니다.
3. `default.project.json`이 있는 폴더에서 서버를 실행합니다.

```powershell
rojo serve
```

4. Roblox Studio에서 Rojo 플러그인을 열고 `localhost:34872`에 연결합니다.
5. Studio에서 게임을 실행해 테스트합니다.

> `Workspace`와 `StarterGui`는 현재 Studio 오브젝트를 보호하기 위해 `$ignoreUnknownInstances`를 사용합니다.

## 현재 검증이 필요한 항목

v2.7.2 패치는 아래 문제를 해결하기 위해 제작되었으며, 최신 소스 적용 후 재검증이 필요합니다.

- 직업 선택 즉시 HUD 갱신
- 직업 변경 즉시 무기 및 공격 방식 갱신
- 재접속 후 직업·장착 무기 복원
- 이동속도 및 사거리 아이템 실제 적용
- 진화 조건 달성 후 진화 카드 등장

## 포트폴리오에서 보여주는 역량

- Roblox 클라이언트/서버 구조 설계
- RemoteEvent 기반 네트워크 통신
- DataStore 기반 영구 데이터 설계
- 데이터 기반 직업·무기·아이템 시스템
- 반복적인 플레이테스트와 버그 수정
- 대형 단일 스크립트에서 Rojo 기반 구조로 전환하는 리팩터링 계획

## 주의

이 저장소는 개발 중인 알파 소스입니다. Roblox 에셋, Place 파일, Developer Product ID와 일부 Studio 배치 오브젝트는 저장소에 포함되지 않습니다.
