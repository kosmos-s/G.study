# 서버 보안 점검 기록

## 네트워크 구조 확인

- 기본 게이트웨이: `192.168.0.1`
- 서버 내부 주소: `192.168.0.x/24` (공개 문서에서는 마지막 주소를 비공개 처리)
- 내부 네트워크 대역: `192.168.0.0/24`
- 유선 인터페이스: `enp2s0`
- Docker 네트워크: `172.17.0.0/16`
- Pterodactyl 네트워크: `172.18.0.0/16`

Ubuntu 출력에는 `proto dhcp`, `dynamic`이 표시되므로 운영체제 자체의 정적 IP 설정이 아니라 공유기의 DHCP 예약을 사용하는지 추가 확인이 필요하다.

## 확인된 서비스 포트

| 포트 | 프로세스 | 용도 | 상태 |
|---:|---|---|---|
| 22/TCP | SSH | 원격 명령어 관리 | 내부 전용으로 제한 예정 |
| 80/TCP | nginx | Pterodactyl 패널 | 내부 전용으로 제한 예정 |
| 10000/TCP·UDP | miniserv.pl | Webmin | 내부 전용으로 제한 예정 |
| 8080/TCP | Wings | Pterodactyl Wings API | 내부 전용으로 제한 예정 |
| 2022/TCP | Wings | Pterodactyl SFTP | 내부 전용으로 제한 예정 |
| 3389/TCP | GNOME Remote Desktop | 원격 데스크톱 | 미사용 시 종료 예정 |
| 3390/TCP | GNOME Remote Desktop | 추가 원격 데스크톱 | 미사용 시 종료 예정 |
| 25566/TCP·UDP | docker-proxy | Minecraft 서바이벌 서버 | 외부 게임 접속용 |
| 3306/TCP | MariaDB | 데이터베이스 | `127.0.0.1` 내부 전용 |
| 6379/TCP | Redis | 캐시·큐 | `127.0.0.1` 내부 전용 |

MariaDB와 Redis는 localhost에만 바인딩되어 외부 장비에서 직접 접근할 수 없는 상태다.

## UFW 점검 결과

현재 UFW에는 SSH, Webmin, Pterodactyl 및 원격 데스크톱 관련 포트가 `Anywhere`로 허용된 규칙이 포함되어 있다. 공유기에서 포트포워딩하지 않았다면 외부 IPv4 접근은 차단될 수 있지만, 최소 권한 원칙에 따라 관리 포트는 내부 네트워크 `192.168.0.0/24`로 제한할 예정이다.

### 유지 대상

- Minecraft: `25565`, `25566`
- Project Zomboid 서버에 실제로 사용하는 UDP 포트

### 내부 네트워크 제한 대상

- SSH: `22/TCP`
- Pterodactyl 패널: `80/TCP`
- Webmin: `10000/TCP`
- Wings API: `8080/TCP`
- Wings SFTP: `2022/TCP`

### 제거 검토 대상

- 중복된 SSH 규칙
- 사용하지 않는 `3389`, `3390` 원격 데스크톱 규칙
- 현재 서비스가 수신하지 않는 `443` 규칙
- 운영하지 않는 게임 서버 포트

## 보안 개선 순서

1. 메인 공유기에서 서버 MAC 주소의 DHCP 예약 여부 확인
2. LAN 전용 UFW 허용 규칙을 먼저 추가
3. 본체에서 SSH, Webmin, Pterodactyl 접속 확인
4. 기존 `Anywhere` 관리 규칙 삭제
5. GNOME 원격 데스크톱을 사용하지 않으면 서비스 중지
6. SSH 공개키 인증 적용
7. 키 인증 성공 후 비밀번호 인증 비활성화 검토
8. 외부 네트워크에서 관리 포트가 닫혀 있는지 확인
9. 백업을 별도 테스트 인스턴스에서 복구하여 검증

## 현재 보안 장점

- 관리 서비스는 공유기에서 외부 포트포워딩하지 않음
- root 계정 직접 로그인 제한
- 일반 사용자와 관리자 권한 분리
- MariaDB와 Redis localhost 바인딩
- UFW 방화벽 사용
- 게임 서버와 관리 서비스 역할 분리
- Pterodactyl 백업 생성
