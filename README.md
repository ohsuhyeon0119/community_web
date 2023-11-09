# REVIEW COMMUNITY PROJECT - Frontend ( 진행 중 )

---

react를 이용한 리뷰 커뮤니티 웹사이트입니다. 각 유저가 자유롭게 상품에 대한 리뷰 게시글을 올리고 댓글 등으로 소통합니다. 일반적인 커뮤니티 웹사이트의 전형적 기능들을 순차적으로 구현해나갈 예정입니다.
api 서버는 다른 레포에서 진행하고 있으며 기술 스택으로는 nodejs express + mongoDb를 이용합니다.
전체적인 기능 구현이 끝난 후 s3 + cloudfront로 배포 예정

---

## 주요 기술 스택 및 사용 라이브러리 (수정, 추가 중)

- React + Ts
- styled-Components (css in js)
- redux (client state 관리)
- tanstack/react-query (server state 관리 )
- mui/material (skeleton ui )
- react-intersection-observer (ui)

---

## 구현 목표

1. 기능적 측면

- 기본적인 CRUD
- pagination & infinite scroll
- 회원 기능 (token & local storage)
- 인증 및 인가 여부에 따른 component 렌더링 조절
- 동적 모달 (로그인 알림 모달, 삭제 모달 창 등)
- Data fetching 상태에서의
- react query와 redux 이용하여 server state & client state 적절히 분리
- Routing
- carousel(image slide)
- 검색 및 자동완성
- 다크 모드 (변수 전역 관리)

2. CSS 관련

- 모바일 반응형 : 반응형 디자인은 instagram, twitter, velog 등을 참고하여 제작

---

## 개발 기간

## 10/26 ~ 진행 중

## 진행 상황

편의 상 백엔드쪽 진행상황을 같이 적어놓겠습니다.

### 백엔드

- 기본 CRUD

게시글 관련 CRUD 완료. 댓글 기능 아직 미구현

댓글 기능은 관련 스키마 공부 후에 진행 예정

- 회원 기능

회원가입 및 로그인, 로그아웃 기능 구현 완료.

회원별로 작성한 게시글 ID 분류하는 기능 미구현.

회원별 본인 게시글 삭제 또는 수정 기능 미구현

### 프론트엔드

- Nav component의 반응형(instagram) 디자인 완료
- 기타 반응형은 페이지 별로 계속 완성 중
- intersection lib 이용하여 게시글에 동적 애니메이션 적용 완료 (hot reviews)
- 게시글 작성, 수정, 삭제 기능 완료
- 로그인 알림 및 삭제 모달창 완료
- 댓글 기능, 좋아요 및 하트 기능 미완료
- 로그인 여부에 따른 user page 미구현
- Skeleton ui : 게시판 별 게시글 목록에 한해 구현 완료. 디자인 변경 및 다른 페이지에서의 적용 필요
