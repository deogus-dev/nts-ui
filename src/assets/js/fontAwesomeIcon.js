import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// 설치했던 fontawesome-svg-core와 vue-fontawesome

import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// 이렇게하면 모든 아이콘들을 불러올 수 있다.
library.add(fas);
// 불러온 아이콘을 라이브러리에 담습니다.

Vue.component("font-awesome-icon", FontAwesomeIcon);
// fontawesome아이콘을 Vue탬플릿에 사용할 수 있게 등록해 줍니다.
