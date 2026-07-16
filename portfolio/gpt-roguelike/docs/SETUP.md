# 개발 환경 설정

## 요구 사항

- Roblox Studio
- VS Code
- Rojo 7
- Roblox Studio Rojo 플러그인

## 실행

```powershell
rojo serve
```

Studio 플러그인에서 `localhost:34872`에 연결합니다.

## 파일 종류 규칙

- `*.server.lua` → Script
- `*.client.lua` → LocalScript
- `*.lua` → ModuleScript

## Studio 설정

DataStore 테스트가 필요한 경우:

```text
Game Settings
→ Security
→ Enable Studio Access to API Services
```

실제 운영 데이터와 테스트 데이터가 섞이지 않도록 주의합니다.
