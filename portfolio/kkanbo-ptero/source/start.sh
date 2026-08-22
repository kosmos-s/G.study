#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
if [ ! -f .env ]; then
  echo '.env 파일이 없습니다. .env.example을 복사해 .env를 설정하세요.'
  exit 1
fi
npm start
