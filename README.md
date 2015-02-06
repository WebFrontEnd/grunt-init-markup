# grunt-init-markup

Create a markup project boilerplate with grunt-init.

## installation

먼저 [grunt](http://gruntjs.com/)와 [grunt-init](https://github.com/gruntjs/grunt-init)을 설치한 후 탬플릿을 이용해 스케폴딩하십시요.

```
sudo npm install -g grunt-cli
sudo npm install -g grunt-init

git clone https://github.com/WebFrontEnd/grunt-init-markup.git ~/.grunt-init/markup

grunt-init markup
```

스케폴딩이 완료되면 의존 컴포넌트를 설치합니다.

```
gem install scss-lint
npm install
bower install
```

## Usage

작성 돼 있는 태스크는 총 5가지 입니다.

* **grunt css** : css와 관련된 빌드 진행
* **grunt html** : html과 관련된 빌드 진행
* **grunt devel** : css와 html 태스크를 동시에 진행, css를 압축하지 않고 소스-맵 파일을 생성
* **grunt build** : css와 html 태스크를 동시에 진행, css를 압축하고 소스-맵 파일을 생성하지 않는다.
* **grunt** : devel, build 태스크를 동시에 진행

## Tools
![build process of markup](https://raw.githubusercontent.com/WebFrontEnd/grunt-init-markup/master/build_process.png)

### spritesmith

[spritesmith](https://github.com/Ensighten/spritesmith)는 여러개의 이미지를 하나의 스프라이트 이미지로 합쳐주는 도구입니다.
현재 사용하고 있는 [compass](http://compass-style.org/)와 동일하다고 보면됩니다. compass는 Vendor prefix set, CSS3 mixin set, Sprite Images generator 등 많은 기능을 제공합니다.
하지만 단순히 스프라이트 이미지를 만들기 위해 compass를 사용하는 것은 리소스를 낭비하는 듯한 느낌을 받았기 때문에 사용하지 않았습니다.

### scsslint

[scsslint](https://github.com/causes/scss-lint)는 sass의 구문을 검사하는 도구입니다.

### csslint

[csslint](http://csslint.net/)는 css의 구문을 검사하는 도구입니다. sass로 컴파일 된 css를 한번 더 검증할 목적으로 사용합니다.
scsslint가 검출하지 못하는 문법적 오류나 안티 패턴 등을 csslint로 검출해 낼 수 있기 때문에 조금 더 고수준의 품질을 유지할 수 있도록합니다.
csslint에 관한 자세한 설명은 현철님이 번역한 [문서](https://github.com/hyunchulkwak/csslint/wiki/%EA%B7%9C%EC%B9%99)를 참고하세요.

### autoprefixer

csslint 검증 까지 무사히 성공하면 [autoprefixer](https://github.com/postcss/autoprefixer)를 사용해 스타일에 벤더사 프리픽스를 붙입니다.

### includereplace

[includereplace](https://github.com/alanshaw/grunt-include-replace)는 html에서 include 구문을 사용할 수 있도록 하는 도구입니다.
마크업시 공통 혹은 중복 되는 요소를 별도의 파일로 분리하고 include 하여 효율적으로 관리할 수 있도록 합니다.

### htmlhint

[htmlhint](http://htmlhint.com/)는 html 구문 검사 도구입니다.
닫는 태그가 누락됐거나, 값이 비어있는 속성 값 등이 검출되면 경고합니다.
html을 작성할 때 쉽게 할 수 있는 실수 들을 검출하고 방지할 수 있습니다.

### validation

[validation](https://github.com/praveenvijayan/grunt-html-validation)은 w3c의 [Markup Validation Service](http://validator.w3.org/)를 이용해 문서를 검사하는 도구입니다.
기본적으로 w3c 서버를 사용하도록 셋팅되어 있지만 응답 시간이 늦고, 대량의 파일을 요청 시 IP가 블락 당할 우려가 있으므로 사내 서버를 사용합니다.

## Others

## csscss

[csscss](http://zmoazeni.github.io/csscss/)는 [OOCSS](http://oocss.org/) 철학에 기초해 개발된 중복 속성 검증 도구입니다.
sass의 [mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) 기능을 사용하면 css 파일에 여러 속성이 중복돼 검증에 실패하므로 위 환경에 맞지 않아 사용하지 않았습니다.

## html-inspector

[html-inspector](https://github.com/philipwalton/html-inspector)는 구글의 엔지니어가 개발한 html 코드 품질 검증 도구입니다. 동적으로 렌더링한 컨텐츠를 검증할 수 있고 임의의 코딩 규칙을 추가할 수 도 있습니다.
하지만 현 마크업 개발은 정적인 코드만을 작성하므로 html-inspector로 얻을 수 있는 이점이 낮아 사용하지 않았습니다.
