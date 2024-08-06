<template>
  <div
    class="overview-panel wrapper"
  >
    <div
      class="title-panel">
      >
      <span>data warehouse</span>
    </div>
    <vue-finder
      id="my-vuefinder"
      :class="{'hide-action-buttons': hideVuefinderActionButtons}"
      :request="request"
      :max-file-size="maxFileSize"
      :features="['admin'].includes(roleKey) ? ALL_FEATURES : READ_FEATURES"
      max-height="100vh"
    >
    </vue-finder>
  </div>
</template>

<script setup lang="ts">
import {FEATURES, FEATURE_ALL_NAMES} from "../dist/features.js";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

const roleKey = ref('admin')

// 已弃用
let hideVuefinderActionButtons = computed(
  () => {
    return false;
    // return !['admin'].includes(roleKey.value)
  }
)

const ALL_FEATURES = [
  ...FEATURE_ALL_NAMES,
  // Or remove the line above, specify the features want to include
  // Like...
  //FEATURES.LANGUAGE,
  //FEATURES.UPLOAD
]

const READ_FEATURES = [
  ...Object.values(
    {
      PREVIEW: 'preview',
      SEARCH: 'search',
      FULL_SCREEN: 'fullscreen',
      DOWNLOAD: 'download',
      LANGUAGE: 'language',
    }
  )
]

const maxFileSize = ref("500MB")

// const request = 'http://vuefinder-php.test'

// Or ...
const request = {
  // ----- CHANGE ME! -----
  // [REQUIRED] Url for development server endpoint
  baseUrl: 'http://localhost:8005/',
  // ----- CHANGE ME! -----

  // Additional headers & params & body
  headers: {'X-ADDITIONAL-HEADER': 'yes'},
  params: {additionalParam1: 'yes'},
  body: {additionalBody1: ['yes']},

  // And/or transform request callback
  transformRequest: (req) => {
    if (req.method === 'get') {
      req.params.vf = '1'
    }
    return req
  },

  // XSRF Token header name
  xsrfHeaderName: 'X-CSRF-TOKEN'
}

</script>

<style scoped lang="scss">
.wrapper {
  max-width: 90%;
  margin: 40px auto;

  .title-panel {
    background: #041E45;
    box-shadow: 0px 4px 10px 0px #00122D;
    border-radius: 5px;
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    padding-left: 20px;

    span {
      align-self: center;
      color: #00CBFE;
    }
  }

  :deep(.vuefinder__explorer__container) {
    min-height: 600px;
  }

  :deep(.vuefinder :is(.vuefinder__explorer__selector-area)) {
    padding: .25rem;
    font-size: 1rem;
    line-height: 2rem;
  }

  :deep(.vuefinder :is(.vuefinder__explorer__header)) {
    font-size: 1rem;
    line-height: 2rem;
  }

  .hide-action-buttons :deep(.vuefinder__toolbar__actions) {
    border: 1px solid red;
    visibility: hidden;
  }
}
</style>
