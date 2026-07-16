# 아키텍처

## 현재 구조

### ReplicatedStorage / Modules

클라이언트와 서버가 함께 사용하는 데이터 기반 모듈입니다.

- `JobData`: 직업과 기본 스탯
- `AbilityData`: 직업별 Q/E/R
- `WeaponData`: 기본 공격 방식
- `ItemData`, `SkillData`, `EvolutionData`: 인게임 성장
- `GachaData`, `InventoryData`, `ShopData`: 로비 경제
- `SaveSchema`: 영구 데이터 기본 구조
- `EnemyData`, `SurvivalData`: 적과 웨이브 설정

### ServerScriptService

- `GameManager.server.lua`: 서버 진입점, RemoteEvent와 게임 상태 연결
- `DataManager.lua`: 플레이어 데이터 로드·저장
- `DamageHandler.lua`: 플레이어 공격, 스킬, 적 공격
- `EnemySpawner.lua`: 적 생성과 관리
- `ProjectileManager.lua`: 원거리 적 투사체
- `RewardManager.lua`: EXP, Gold, 레벨업, 진화
- `GachaManager.lua`: F~S 무기 가챠
- `InventoryManager.lua`: 장비와 판매
- `TradeManager.lua`: 플레이어 거래 프로토타입
- `RankingManager.lua`: OrderedDataStore 랭킹
- `MapBuilder.lua`: 로비와 생존맵 런타임 생성

### StarterPlayerScripts

- `ClientController.client.lua`: HUD, 입력, 메뉴, 이펙트
- `V270ClientAddon.client.lua`: 인벤토리·랭킹·거래 UI 보조

## 네트워크 원칙

클라이언트는 UI 입력과 요청을 보내고, 데이터 변경은 서버가 검증합니다.

```text
Client input
→ RemoteEvent
→ Server validation
→ State update
→ RemoteEvent feedback
→ Client UI refresh
```

## 현재 기술 부채

- `ClientController`에 UI·입력·이펙트가 집중됨
- `GameManager`가 많은 Manager를 직접 연결함
- 런타임 생성 맵이라 Studio 편집 화면에서 환경이 보이지 않음
- 저장·거래의 실패 복구와 세션 잠금이 부족함
- 서버 전체가 하나의 생존 세션을 공유하는 구조

## 목표 구조

```text
Studio
├─ Lobby / SurvivalMap / Terrain / Lighting
└─ StarterGui UI templates

Rojo source
├─ server/
│  ├─ services
│  ├─ managers
│  └─ calculators
├─ client/
│  ├─ controllers
│  └─ effects
└─ shared/
   ├─ data
   └─ utilities
```

향후 `ClientController`를 HUD, Input, LobbyMenu, LevelUp, Effect, RangeIndicator 단위로 분리할 계획입니다.
