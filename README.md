# 리뷰 커뮤니티 웹사이트 (진행 중)

React로 개발하는 리뷰 커뮤니티 웹사이트입니다. 각 유저가 자유롭게 상품에 대한 리뷰 게시글을 올리고 댓글 등으로 소통합니다. 일반적인 커뮤니티 웹사이트의 전형적 기능들을 순차적으로 구현해나갈 예정입니다. API 서버는 다른 레포에서 진행하고 있으며 기술 스택으로는 nodejs의 express와 mongodb를 이용합니다.
전체적인 기능 구현이 끝난 후 s3 + cloudfront로 배포 예정입니다.

## 주요 기술 스택 및 사용 라이브러리 (수정, 추가 중)

- React + Ts
- styled-components (css in js)
- redux (client state 관리)
- tanstack/react-query (server state 관리)
- mui/material (skeleton ui)
- react-intersection-observer (기타 ui)

## 구현 목표

### 1. 기능적 측면

- 기본적인 CRUD
- pagination & infinite scroll
- 회원 기능 (token & local storage)
- 인증 및 인가 여부에 따른 component 렌더링 조절
- 동적 모달 (로그인 알림 모달, 삭제 모달 창 등)
- Data fetching 상태에서의 Skeleton Ui
- react query 및 redux 이용하여 server state & client state 적절히 분리
- Routing
- 캐러셀(리뷰 게시글에서 여러개의 이미지를 올렸을 경우에서 image slide)
- 검색 및 자동완성
- 다크 모드 (변수 전역 관리)
- 소셜 로그인(아직 배워야 함)

### 2. CSS 관련

- 모바일 반응형 : 반응형 디자인은 instagram, twitter, velog 등 기존 사이트를 참고하여 제작

## 개발 기간

10/26 ~ 진행 중 (절반 정도 완료)

## 진행 상황

편의상 백엔드 쪽 진행상황과 함께 적는다.

### 백엔드

- 기본 CRUD

게시글 관련 CRUD 완료. 댓글 기능 아직 미구현

댓글 기능은 관련 스키마 공부 후에 진행 예정

- 회원 기능

회원가입 및 로그인, 로그아웃 기능 구현 완료.

회원별로 작성한 게시글 ID 분류하는 기능 미구현.

회원별 본인 게시글 삭제 또는 수정 기능 미구현

### 프론트엔드

- 엔드포인트 별로 기본 페이지 구성 완료
- Nav component의 반응형(instagram) 디자인 완료, createbutton 반응형 완료
- 기타 반응형 페이지 별로 구현 중
- intersection lib 이용하여 게시글에 동적 애니메이션 적용 완료 (Hot reviews)
- 게시글 작성, 수정, 삭제 기능 완료
- 로그인 알림 및 삭제 모달창 완료
- 페이지네이션 완료 / 무한 스크롤 미구현
- 댓글 기능, 좋아요 및 하트 기능 미완료
- 검색 기능 미구현
- 유저 페이지에서 내가 쓴 글, 댓글 단 글, 좋아요 한글 목록 불러오기 기능 미구현(백엔드 구현 필요)
- 로그인 여부에 따른 user page 미구현
- 이미지 업로드하여 db 저장 및 불러오기 기능 미구현
- Skeleton ui : 게시판 별 게시글 목록에 한해 구현 완료. 그러나 세부 디자인 변경 및 다른 페이지에서의 적용 필요 (\* material UI -> 직접 CSS 디자인으로 변경함)

## 빌드 배포 자동화 (미완성 및 작업 중)

# web page 배포용 사이트

[d11ayay5tmnj9l.cloudfront.net]

- 배포 방식 : apiUrl을 localhost에서 cloudtype에 배포해 놓은 배포 서버 url로 변경 -> develop branch에 push 한 후 main branch에 pr 및 merge -> build 및 s3에 deploy 자동화 -> cloudfront에서 배포되어 있는 상태
- 수정해야 할 것 : env 파일 등 환경 변수 관리 방법 공부 필요
