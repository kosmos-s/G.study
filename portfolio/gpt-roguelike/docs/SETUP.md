# 개발 환경 설정

## 현재 개발 방식

현재 GPT Roguelike는 **Roblox Studio 중심**으로 개발하고 테스트합니다.

- 맵과 오브젝트 배치
- StarterGui UI 편집
- Script, LocalScript, ModuleScript 관리
- Play 테스트
- Output 로그 확인
- DataStore 테스트

VS Code는 문서 작성과 코드 검토에 보조적으로 사용합니다.

## 현재 요구 사항

- Roblox Studio
- Roblox 계정과 프로젝트 접근 권한
- DataStore 테스트 시 Studio API Services 설정

## DataStore 테스트 설정

```text
Game Settings
→ Security
→ Enable Studio Access to API Services
```

주의 사항:

- 공개 게임의 실제 데이터가 Studio 테스트로 변경될 수 있으므로 테스트 키와 운영 키 분리를 권장합니다.
- 저장 테스트 전후로 Output 오류를 확인합니다.
- 재접속 테스트에서는 직업, 장착 무기, 인벤토리, Soul, 영구 강화 값을 비교합니다.

## Rojo 전환 계획

Rojo는 아직 포트폴리오 기준의 현재 개발 필수 환경이 아니라 **향후 도입 예정**입니다.

전환 목적:

- VS Code에서 Luau 파일 관리
- 서버, 클라이언트, 공용 모듈 구조 분리
- 대형 `ClientController` 역할 분리
- Git을 이용한 변경 기록과 버전 관리
- Roblox Studio 맵·UI와 코드의 하이브리드 관리

예상 로컬 구조:

```text
private-gpt-roguelike
├─ default.project.json
└─ src
   ├─ server
   ├─ client
   └─ shared
```

예상 실행 방식:

```powershell
rojo serve
```

Roblox Studio의 Rojo 플러그인에서 로컬 서버에 연결합니다.

## Studio와 Rojo 역할 분리 계획

| 영역 | 관리 위치 |
|---|---|
| 로비·생존맵 | Roblox Studio |
| Terrain·Lighting | Roblox Studio |
| StarterGui 템플릿 | Roblox Studio |
| 서버 로직 | 비공개 Rojo 프로젝트 |
| 클라이언트 로직 | 비공개 Rojo 프로젝트 |
| 공용 데이터 모듈 | 비공개 Rojo 프로젝트 |
| 포트폴리오 문서 | `kosmos-s/G.study` |

## 공개 범위

이 포트폴리오 저장소에는 다음 자료만 공개합니다.

- README와 버전 기록
- 개발 과정
- 아키텍처 설명
- 테스트와 문제 해결 기록
- 공개 가능한 스크린샷과 영상 링크

다음 자료는 공개하지 않습니다.

- `src` 폴더
- 전체 Luau 게임 소스
- Roblox Place 파일
- 비공개 에셋
- 실제 결제 Product ID
- DataStore 키와 내부 설정

실제 게임 소스는 로컬 프로젝트 또는 비공개 GitHub 저장소에서 관리합니다.
