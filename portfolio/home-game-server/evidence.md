# 구축 및 운영 증거 자료

> 공개용 포트폴리오에는 사용자 이름, 내부·공인 IP, 실제 도메인, Discord 사용자 정보를 가린 이미지만 사용합니다.

## 확인된 운영 결과

| 항목 | 확인 결과 |
|---|---|
| 운영체제 | Ubuntu Desktop 24.04.4 LTS |
| 서버 CPU | AMD Ryzen 7 8745HS |
| 시스템 RAM | 약 16GB |
| 저장장치 | 약 512GB SSD |
| 관리 도구 | SSH, Webmin, Pterodactyl |
| 게임 서버 | Minecraft, Project Zomboid 등 |
| Minecraft 서버 관리 | Pterodactyl 웹 패널 |
| Minecraft 서버 포트 | 기본 서버 25565, 메인 서바이벌 서버 25566 |
| 외부 접속 | 공유기 포트포워딩을 통한 Minecraft 접속 확인 |
| 도메인 | A 레코드와 SRV 레코드를 사용해 25566 포트 연결 |
| 최대 접속 경험 | 최대 7명 |
| 연속 운영 경험 | 약 한 달 |
| 백업 | Pterodactyl 백업 3개 생성 확인 |
| Discord 연동 | 서버 시작·종료, 접속·퇴장, 발전 과제 알림 확인 |

## 측정 결과

### Minecraft 서버 상태

- TPS 1분: `20.0`
- TPS 5분: `20.0`
- TPS 15분: `20.0`
- 측정 당시 접속자: 1명
- 게임 내 핑: 약 `9ms`
- 서버 시작 직후 CPU 사용량: 약 `5.91%`
- 서버 시작 직후 메모리 사용량: 약 `892MiB / 8GiB`
- 일반 대기 상태 CPU 그래프: 약 `3%` 전후

현재 측정은 접속자 1명 또는 대기 상태 기준이다. 3명 이상 일반 플레이와 다수 신규 청크 생성 상황은 추후 별도 측정한다.

## 준비한 화면 자료

1. Ubuntu 24.04.4 LTS 버전 확인
2. Webmin CPU·RAM·디스크 대시보드
3. Pterodactyl 게임 서버 목록
4. 실행 중인 Minecraft 서버 콘솔과 자원 사용량
5. 실제 Minecraft 서버 접속 화면
6. DiscordSRV 서버 시작·종료 및 접속·퇴장 알림
7. Pterodactyl 백업 목록
8. Minecraft 플러그인 목록
9. UFW 방화벽 규칙
10. 도메인 A·SRV 레코드 설정

## 공개 전 제거하는 정보

- Ubuntu 사용자 이름과 호스트 이름
- 내부 IP와 공인 IP
- 실제 도메인
- Pterodactyl 서버 식별 주소
- Discord 사용자 이름과 서버 멤버 정보
- MAC 주소, 토큰, 비밀번호, API 키
