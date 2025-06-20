# 피어리스 밴 트래커

## 📖 프로젝트 소개
“LoL 피어리스 트래커”는 **League of Legends** 챔피언 랜덤픽 결과를  
“소프트 모드(팀 분배)”와 “하드 모드(픽/밴 기록)”로 관리ㆍ기록할 수 있는  
간단한 SPA(클라이언트 사이드 웹앱)입니다.  
별도의 백엔드 없이 정적 파일만으로 동작하며, 로컬 스토리지에 데이터를 저장합니다.

---

## 📂 파일 구성
```
/
├─ index.html      — 메인 HTML 템플릿  
├─ style.css       — 전체 레이아웃 & 컴포넌트 스타일  
└─ main.js         — 챔피언 데이터 로드, UI 렌더링, 이벤트 처리 로직  
```

---

## ✨ 주요 기능
- **소프트 모드**  
  - 픽 시 1팀·2팀 순서로 배치  
  - 팀별 픽 목록을 사이드바에 표시  
  - 배지(1/2) 클릭으로 순서 변경 및 취소  
- **하드 모드**  
  - 클릭 시 픽을 “USED”로 표시(회색 처리)  
  - 사이드바에 선택된 픽 아이콘과 제거 버튼 표시  
- **검색 필터**  
  - 챔피언 이름(완전 매칭) 또는 초성 검색  
  - 길어야 300ms 디바운스 처리  
- **전체 / 사용 가능 토글**  
  - 전체 챔피언 보기 ↔ 사용 가능(미선택) 챔피언만 보기  
- **복사 & 리셋**  
  - 팀별(소프트) 또는 전체(하드) 픽 목록을 클립보드에 복사  
  - 로컬 스토리지 초기화 및 화면 리셋  

---

## 🚀 사용법

1. **로컬에서 실행**  
   ```bash
   # 방법 1: 브라우저로 index.html 직접 열기
   open index.html

   # 방법 2: Python 내장 서버 사용
   cd path/to/project
   python3 -m http.server 8000
   # → http://localhost:8000 접속
   ```
2. **GitHub Pages 배포**
   - 이 저장소를 GitHub에 Push
   - 리포지토리 Settings → Pages → Branch `main`/`master` 선택
   - `/ (root)` 경로로 배포

   > 배포된 URL: [https://hanbinseong.github.io/fearless-ban-tracker/](https://hanbinseong.github.io/fearless-ban-tracker/)

## 🧪 테스트

```bash
npm install
npm test
```
