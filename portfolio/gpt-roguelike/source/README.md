# Source Snapshot — v2.7.2

이 디렉터리는 포트폴리오 작성 시점의 Roblox/Luau 전체 소스 스냅샷을 네 개의 ZIP으로 나누어 보관합니다.

## 파일

- `ReplicatedStorage_Modules.zip`: 공용 데이터·설정 모듈과 `default.project.json`
- `Server_Core.zip`: 게임 진행·데이터·전투·맵·드랍·투사체·보상 핵심 서버 코드
- `Server_Features.zip`: 가챠·인벤토리·영구 성장·퀘스트·랭킹·상점·생존·거래 서버 코드
- `StarterPlayerScripts.zip`: 클라이언트 HUD·입력·이펙트 코드

## 사용 방법

1. 빈 폴더를 하나 만듭니다.
2. 네 ZIP을 모두 같은 폴더에 압축 해제합니다.
3. 최종 구조에 `default.project.json`과 `src/`가 함께 있는지 확인합니다.
4. 프로젝트 폴더에서 `rojo serve`를 실행합니다.
5. Roblox Studio의 Rojo 플러그인에서 `localhost:34872`에 연결합니다.

## 주의

- 이 스냅샷은 개발 중인 알파 코드입니다.
- Roblox Place 파일, Terrain, Studio에 직접 배치한 모델·UI·에셋은 포함되지 않습니다.
- `RobuxProductData`의 Product ID는 테스트용 `0`입니다.
- 실제 운영 전에 DataStore, 거래, Robux 영수증 처리, 멀티플레이 동시성 검증이 필요합니다.
