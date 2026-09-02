# 변경 기록

GPT Roguelike의 버전별 개발 흐름을 기록합니다.

구현, 수정 시도, 테스트 결과를 구분하며 실제 플레이 테스트가 끝나지 않은 항목은 완료로 단정하지 않습니다.

## Unreleased

### 다음 패치

- `v2.7.3 Foundation Stability`
- 직업·무기·스탯 상태 동기화 재검증
- 재접속 저장 안정화
- Soul 보상 계산 점검
- 거래 검증과 실패 복구 점검
- Rojo 전환 준비

## v2.7.2 — Core State Fix

### 수정 시도

- 직업 변경 후 HUD를 즉시 갱신하도록 상태 전달 흐름 수정
- 직업 변경 후 장착 무기와 자동 공격 방식을 다시 구성하도록 수정
- 재접속 시 직업과 장착 무기 복원 로직 수정
- 이동속도 아이템의 `Humanoid.WalkSpeed` 반영 경로 수정
- 사거리 수치, 표시 링, 실제 공격 거리의 동기화 수정
- 진화 조건 판정과 진화 카드 후보 생성 흐름 수정

### 상태

- 코드 반영 후 전체 회귀 테스트 필요
- 성공 여부는 [`docs/TESTING.md`](docs/TESTING.md)에서 관리

## v2.7.1 — UX/Save/Job/Inventory Fix

### 수정

- 최초 직업 선택 흐름 보완
- 직업 변경 비용 처리
- 레벨업 선택에 숫자키 `1`, `2`, `3` 입력 추가
- 인벤토리 열기 문제 수정
- 사거리 표시 링이 지면 아래에 보이던 위치 문제 수정
- `ClientController`의 `Malformed string` 구문 오류 수정
- 직업·저장·인벤토리 관련 상태 흐름 점검

## v2.7.0 — Mega Systems Patch

### 추가

- 원거리 몬스터 투사체
- 인벤토리와 장비 장착
- 아이템 판매
- 랭킹
- 플레이어 거래 프로토타입
- 가챠 확률표
- Robux 가챠 준비 UI (`ProductId = 0`)

### 문제 대응

- `ProjectileManager` 누락으로 초기화와 맵 생성 흐름이 중단되던 문제 대응
- `RemoteEvents` 대기 오류와 객체 생성 순서 점검

## v2.6.0 — Mega RPG Economy

### 추가

- 전사·궁수·마법사·암살자·수호자 직업
- 직업별 Q/E/R 스킬
- 직업 변경 비용과 직업별 무기
- RPG 스탯과 하단 HUD
- 공격 사거리 표시
- 인게임 아이템 빌드와 진화 시스템
- 로비 상점
- F~S 무기 가챠
- 확률표, 천장, 중복 조각 구조

## v2.5.1 — Visual Rebuild

### 변경

- UI와 HUD 개선 시도
- 맵 조명과 환경 연출 실험
- 무기별 공격·피격 이펙트 확장
- 퀘스트와 업적 기반 추가

### 문제 대응

- `QuestEvent`의 `OnClientEvent` 수신 누락으로 발생한 RemoteEvent 큐 경고 수정

## v2.0.0 — Survival Roguelite

### Patch 1 / 1.1

- 로비와 넓은 생존맵
- 포탈 상호작용으로 생존 시작
- 시간 기반 몬스터 스폰과 추적
- 몬스터가 로비에 생성되던 위치 문제 수정

### Patch 2

- EXP 보석과 Gold 코인
- 자동 흡수
- 획득 피드백
- 사망·승리 Soul 보상

### Patch 3

- Soul 영구 성장
- MaxHP, Damage, StartGold 강화
- DataStore 저장 구조
- Studio API Services 설정 오류 대응

### Patch 4

- 무기 해금
- 시작 무기 선택
- 무기별 공격 방식 확장

### Patch 5

- 클릭 없이 동작하는 자동 공격

## v0.0.1 — Initial Publish

- Roblox 프로젝트 최초 게시
- 기본 공격, 적 추적, 피해 처리 프로토타입
- 방 기반 로그라이크 구조와 상점·무기·적 패턴 실험 시작
