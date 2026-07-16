# 아키텍처

GPT Roguelike는 Roblox의 클라이언트·서버 구조를 기준으로 기능을 분리합니다. 현재는 빠른 프로토타이핑 과정에서 일부 대형 스크립트와 Manager 의존성이 커진 상태이며, 향후 Rojo 전환과 함께 역할을 더 세분화할 계획입니다.

## 전체 흐름

```text
플레이어 입력
→ ClientController
→ RemoteEvent 요청
→ GameManager 및 각 Manager의 서버 검증
→ DataStore 또는 런타임 상태 변경
→ RemoteEvent 결과 전달
→ 클라이언트 HUD·전투 상태 갱신
```

## 주요 구성 요소

### ClientController

- HUD와 로비 메뉴 표시
- 키보드 입력과 직업별 Q/E/R 요청
- 숫자키 1/2/3 레벨업 선택
- 직업·무기·아이템 상태 표시
- 공격 사거리 링과 전투 이펙트
- 서버가 전달한 상태를 화면에 반영

현재 UI, 입력, 메뉴, 이펙트가 한 스크립트에 집중돼 있어 작은 수정도 다른 기능에 영향을 줄 수 있습니다. 향후 HUD, Input, LobbyMenu, LevelUp, Effect, RangeIndicator 단위로 분리할 계획입니다.

### GameManager

- 서버 진입점
- 필요한 RemoteEvent와 Manager 초기화
- 플레이어 입장·퇴장 흐름 연결
- 로비와 생존 세션 상태 관리
- 각 시스템 사이의 이벤트 연결

`ProjectileManager`처럼 필수 Manager가 누락되면 초기화 흐름과 맵 생성이 중단될 수 있으므로 존재 여부와 생성 순서를 함께 검증합니다.

### DataManager

- 플레이어 데이터 로드와 저장
- 직업, 장착 무기, 인벤토리, Soul, 영구 강화 상태 관리
- SaveSchema를 기준으로 누락 필드 보완
- 재접속 복원과 저장 실패 처리

현재 재접속 복원과 실패 복구는 추가 검증이 필요합니다.

### RewardManager

- EXP와 Gold 지급
- 레벨업 후보 생성
- 아이템·무기 성장 반영
- 진화 조건 판정과 진화 후보 생성
- Soul 보상 계산과 결과 데이터 연결

진화 후보와 실제 공격 상태 갱신, Soul 계산은 향후 안정화 대상입니다.

### DamageHandler

- 자동 공격과 직업별 스킬의 피해 판정
- 무기별 공격 방식
- 적 공격과 플레이어 피해
- 공격속도와 실제 사거리 계산

표시용 사거리와 실제 피해 판정 거리가 같은 최종 스탯을 사용하도록 정리해야 합니다.

### ProjectileManager

- 원거리 몬스터 투사체 생성
- 이동과 충돌 판정
- 수명 종료와 오브젝트 정리
- 플레이어 피격 전달

### InventoryManager

- 보유 장비 목록 관리
- 장비 장착과 해제
- 판매 요청 검증
- 장착 무기와 직업 상태 연결

### GachaManager

- F~S 무기 등급 추첨
- 확률표와 천장 처리
- 중복 획득 시 조각 처리
- Robux 가챠 준비 UI와 서버 요청 구조

`ProductId = 0`은 준비용 값이며 실제 결제 기능은 연결하지 않은 상태입니다.

### RankingManager

- OrderedDataStore 기반 랭킹 데이터 처리
- 플레이어 기록 갱신
- 클라이언트 랭킹 UI에 결과 전달

### TradeManager

- 거래 요청과 수락·취소 흐름
- 거래 아이템 검증
- 양쪽 플레이어 상태 확인

현재 프로토타입이며 이탈, 중복 지급, 저장 실패와 악용 방지 처리가 추가로 필요합니다.

### MapBuilder

- 로비와 생존맵의 런타임 생성
- 포탈, 제단, SpawnPoint와 기본 환경 배치

초기 프로토타입 제작에는 빠르지만 Studio 편집 화면에서 실제 환경을 확인하기 어렵고 시각적 완성도를 높이기 힘듭니다. 앞으로 역할을 축소하고 로비·생존맵·Terrain·Lighting은 Roblox Studio에서 직접 제작할 계획입니다.

### RemoteEvents

- 클라이언트 요청과 서버 결과 전달
- 직업, 무기, 인벤토리, 가챠, 거래, 퀘스트, 전투 상태 동기화

```text
이벤트 생성
→ 서버 또는 클라이언트 송신
→ 반대쪽 수신 연결
→ 서버 검증 또는 UI 반영
```

송신 코드만 있고 `OnClientEvent` 또는 `OnServerEvent` 수신이 없으면 큐 경고나 상태 미반영 문제가 발생할 수 있습니다.

### DataStore

- Soul과 영구 강화
- 직업과 장착 무기
- 인벤토리와 플레이 기록
- 랭킹 데이터

Studio 테스트에서는 API Services 설정이 필요하며, 운영 데이터와 테스트 데이터가 섞이지 않도록 별도 키와 검증 기준이 필요합니다.

## 공용 데이터 모듈

ModuleScript를 이용해 데이터와 규칙을 분리합니다.

- 직업과 기본 스탯
- 직업별 Q/E/R
- 무기와 공격 방식
- 아이템과 진화 조건
- 적과 생존 웨이브
- 가챠, 인벤토리, 상점
- 저장 데이터 기본 구조

## 현재 기술 부채

- `ClientController`에 UI·입력·이펙트가 집중됨
- `GameManager`가 많은 Manager 초기화를 직접 담당함
- 상태가 서버 데이터, 클라이언트 표시, 실제 전투 계산에 나뉘어 있음
- 저장과 거래의 실패 복구가 부족함
- `MapBuilder` 중심 런타임 맵이라 Studio 편집성이 낮음
- 서버 전체가 하나의 생존 세션을 공유하는 구조

## Rojo 전환 계획

현재는 Roblox Studio 중심으로 개발하며, 이후 소스 코드를 로컬 또는 비공개 저장소의 Rojo 프로젝트로 전환합니다.

```text
Studio
├─ Lobby
├─ SurvivalMap
├─ Terrain / Lighting
└─ StarterGui templates

Private Rojo project
├─ server
│  ├─ services
│  ├─ managers
│  └─ calculators
├─ client
│  ├─ controllers
│  └─ effects
└─ shared
   ├─ data
   └─ utilities
```

이 포트폴리오 저장소에는 `src`와 전체 게임 소스를 공개하지 않습니다.
