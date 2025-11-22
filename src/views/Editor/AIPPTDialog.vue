<template>
  <div class="aippt-dialog">
    <div class="header">
      <span class="title">AIPPT</span>
      <span class="subtite" v-if="step === 'template'">Choose a suitable template from below to generatePPT，or<span class="local" v-tooltip="'upload.pptistFormat template file'" @click="uploadLocalTemplate()">Generate using local template</span></span>
      <span class="subtite" v-else-if="step === 'outline'">Confirm the content outline below（Click to edit content，Right click to add/Delete outline item），Start selecting a template</span>
      <span class="subtite" v-else>Enter yourPPTtheme，and add appropriate information，Such as industry、post、discipline、Purpose, etc.</span>
    </div>
    
    <template v-if="step === 'setup'">
      <Input class="input" 
        ref="inputRef"
        v-model:value="keyword" 
        :maxlength="50" 
        placeholder="Please enterPPTtheme，like：College student career planning" 
        @enter="createOutline()"
      >
        <template #suffix>
          <span class="count">{{ keyword.length }} / 50</span>
          <div class="submit" type="primary" @click="createOutline()"><IconSend class="icon" /> AI generate</div>
        </template>
      </Input>
      <div class="recommends">
        <div class="recommend" v-for="(item, index) in recommends" :key="index" @click="setKeyword(item)">{{ item }}</div>
      </div>
      <div class="configs">
        <div class="config-item">
          <div class="label">language：</div>
          <Select 
            class="config-content"
            style="width: 80px;"
            v-model:value="language"
            :options="[
              { label: 'English', value: 'English' },
            ]"
          />
        </div>
        <div class="config-item">
          <div class="label">style：</div>
          <Select 
            class="config-content"
            style="width: 80px;"
            v-model:value="style"
            :options="[
              { label: 'Universal', value: 'Universal' },
              { label: 'Academic style', value: 'Academic style' },
              { label: 'Workplace style', value: 'Workplace style' },
              { label: 'Education style', value: 'Education style' },
              { label: 'Marketing style', value: 'Marketing style' },
            ]"
          />
        </div>
        <div class="config-item">
          <div class="label">Model：</div>
          <Select 
            class="config-content"
            style="width: 190px;"
            v-model:value="model"
            :options="[
              { label: 'Grok-4.1', value: 'x-ai/grok-4.1-fast:free' },
              { label: 'Auto', value: 'openrouter/auto' },
			  { label: 'GLM-4.5-Air', value: 'z-ai/glm-4.5-air:free' },
              { label: 'Gemini-2-Flash', value: 'google/gemini-2.0-flash-exp:free' },
			  { label: 'Mistral-Small', value: 'mistralai/mistral-small-3.2-24b-instruct:free' },
			  { label: 'GPT-OSS', value: 'openai/gpt-oss-20b:free' },
			  { label: Kimi-K2', value: 'moonshotai/kimi-k2:free' },
			  { label: 'Deepseek-3.2', value: 'deepseek/deepseek-v3.2-exp' },
            ]"
          />
        </div>
        <div class="config-item">
          <div class="label">With pictures：</div>
          <Select 
            class="config-content"
            style="width: 100px;"
            v-model:value="img"
            :options="[
              { label: 'none', value: '' },
              { label: 'mock test', value: 'test' },
              { label: 'AISearch pictures', value: 'ai-search', disabled: true },
              { label: 'AIraw picture', value: 'ai-create', disabled: true },
            ]"
          />
        </div>
      </div>
      <div class="configs" v-if="!isEmptySlide">
        <div class="config-item">
          <Checkbox v-model:value="overwrite">Overwrite existing slides</Checkbox>
        </div>
      </div>
    </template>
    <div class="preview" v-if="step === 'outline'">
      <pre ref="outlineRef" v-if="outlineCreating">{{ outline }}</pre>
       <div class="outline-view" v-else>
         <OutlineEditor v-model:value="outline" />
       </div>
      <div class="btns" v-if="!outlineCreating">
        <Button class="btn" type="primary" @click="step = 'template'">Select template</Button>
        <Button class="btn" @click="outline = ''; step = 'setup'">Return to regenerate</Button>
      </div>
    </div>
    <div class="select-template" v-if="step === 'template'">
      <div class="templates">
        <div class="template" 
          :class="{ 'selected': selectedTemplate === template.id }" 
          v-for="template in templates" 
          :key="template.id" 
          @click="selectedTemplate = template.id"
        >
          <img :src="template.cover" :alt="template.name">
        </div>
      </div>
      <div class="btns">
        <Button class="btn" type="primary" @click="createPPT()">generate</Button>
        <Button class="btn" @click="step = 'outline'">Return to outline</Button>
      </div>
    </div>

    <FullscreenSpin :loading="loading" tip="AIGenerating，Please wait ..." />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import api from '@/services'
import useAIPPT from '@/hooks/useAIPPT'
import useSlideHandler from '@/hooks/useSlideHandler'
import type { AIPPTSlide } from '@/types/AIPPT'
import type { Slide, SlideTheme } from '@/types/slides'
import message from '@/utils/message'
import { decrypt } from '@/utils/crypto'
import { useMainStore, useSlidesStore } from '@/store'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Select from '@/components/Select.vue'
import FullscreenSpin from '@/components/FullscreenSpin.vue'
import OutlineEditor from '@/components/OutlineEditor.vue'
import Checkbox from '@/components/Checkbox.vue'

const mainStore = useMainStore()
const slidesStore = useSlidesStore()
const { templates } = storeToRefs(slidesStore)

const { resetSlides, isEmptySlide } = useSlideHandler()
const { AIPPT, presetImgPool, getMdContent } = useAIPPT()

const language = ref('English')
const style = ref('Universal')
const img = ref('')
const keyword = ref('')
const outline = ref('')
const selectedTemplate = ref('template_1')
const loading = ref(false)
const outlineCreating = ref(false)
const overwrite = ref(true)
const step = ref<'setup' | 'outline' | 'template'>('setup')
const model = ref('Grok-4.1')
const outlineRef = useTemplateRef<HTMLElement>('outlineRef')
const inputRef = useTemplateRef<InstanceType<typeof Input>>('inputRef')

const recommends = ref([
  '2025Frontier trends in science and technology',
  'How big data is changing the world',
  'Catering market survey and research',
  'AIGCApplications in education',
  'Social media and brand marketing',
  '5GHow technology changes our lives',
  'Annual work summary and outlook',
  'Blockchain technology and its applications',
  'College student career planning',
  'Company annual meeting planning plan',
]) 

onMounted(() => {
  setTimeout(() => {
    inputRef.value!.focus()
  }, 500)
})

const setKeyword = (value: string) => {
  keyword.value = value
  inputRef.value!.focus()
}

const createOutline = async () => {
  if (!keyword.value) return message.error('Please enter firstPPTtheme')

  loading.value = true
  outlineCreating.value = true
  
  const stream = await api.AIPPT_Outline({
    content: keyword.value,
    language: language.value,
    model: model.value,
  })
  if (stream.status === 500) {
    message.error('AIService exception，Please try again with another model')
    loading.value = false
    return
  }

  loading.value = false
  step.value = 'outline'

  const reader: ReadableStreamDefaultReader = stream.body.getReader()
  const decoder = new TextDecoder('utf-8')
  
  const readStream = () => {
    reader.read().then(({ done, value }) => {
      if (done) {
        outline.value = getMdContent(outline.value)
        outline.value = outline.value.replace(/<!--[\s\S]*?-->/g, '').replace(/<think>[\s\S]*?<\/think>/g, '')
        outlineCreating.value = false
        return
      }
  
      const chunk = decoder.decode(value, { stream: true })
      outline.value += chunk

      if (outlineRef.value) {
        outlineRef.value.scrollTop = outlineRef.value.scrollHeight + 20
      }

      readStream()
    })
  }
  readStream()
}

const createPPT = async (template?: { slides: Slide[], theme: SlideTheme }) => {
  loading.value = true

  if (overwrite.value) resetSlides()

  const stream = await api.AIPPT({
    content: outline.value,
    language: language.value,
    style: style.value,
    model: model.value,
  })

  if (img.value === 'test') {
    const imgs = await api.getMockData('imgs')
    presetImgPool(imgs)
  }

  let templateData = template
  if (!templateData) templateData = await api.getMockData(selectedTemplate.value)
  const templateSlides: Slide[] = templateData!.slides
  const templateTheme: SlideTheme = templateData!.theme

  const reader: ReadableStreamDefaultReader = stream.body.getReader()
  const decoder = new TextDecoder('utf-8')
  
  const readStream = () => {
    reader.read().then(({ done, value }) => {
      if (done) {
        loading.value = false
        mainStore.setAIPPTDialogState(false)
        slidesStore.setTheme(templateTheme)
        return
      }
  
      const chunk = decoder.decode(value, { stream: true })
      try {
        const text = chunk.replace('```json', '').replace('```', '').trim()
        if (text) {
          const slide: AIPPTSlide = JSON.parse(chunk)
          AIPPT(templateSlides, [slide])
        }
      }
      catch (err) {
        // eslint-disable-next-line
        console.error(err)
      }

      readStream()
    })
  }
  readStream()
}

const uploadLocalTemplate = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.pptist'
  input.click()
  input.addEventListener('change', e => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        try {
          const { slides, theme } = JSON.parse(decrypt(reader.result as string))
          createPPT({ slides, theme })
        }
        catch {
          message.error('The uploaded template file data is abnormal.，Please re-upload or use a preset template')
        }
      })
      reader.readAsText(file)
    }
  })
}
</script>

<style lang="scss" scoped>
.aippt-dialog {
  margin: -20px;
  padding: 30px;
}
.header {
  margin-bottom: 12px;

  .title {
    font-weight: 700;
    font-size: 20px;
    margin-right: 8px;
    background: linear-gradient(270deg, #d897fd, #33bcfc);
    background-clip: text;
    color: transparent;
    vertical-align: text-bottom;
    line-height: 1.1;
  }
  .subtite {
    color: #888;
    font-size: 12px;

    .local {
      color: $themeColor;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.preview {
  pre {
    max-height: 450px;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #f1f1f1;
    overflow: auto;
  }
  .outline-view {
    max-height: 450px;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #f1f1f1;
    overflow: auto;
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 120px;
      margin: 0 5px;
    }
  }
}
.select-template {
  .templates {
    max-height: 450px;
    overflow: auto;
    display: flex;
    margin-bottom: 10px;
    padding-right: 5px;
    @include flex-grid-layout();
  
    .template {
      border: 2px solid $borderColor;
      border-radius: $borderRadius;
      @include flex-grid-layout-children(2, 49%);

      &.selected {
        border-color: $themeColor;
      }
  
      img {
        width: 100%;
        min-height: 180px;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 120px;
      margin: 0 5px;
    }
  }
}
.recommends {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  .recommend {
    font-size: 12px;
    background-color: #f1f1f1;
    border-radius: $borderRadius;
    padding: 3px 5px;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;

    &:hover {
      color: $themeColor;
    }
  }
}
.configs {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

  .config-item {
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
.count {
  font-size: 12px;
  color: #999;
  margin-right: 10px;
}
.submit {
  height: 20px;
  font-size: 12px;
  background-color: $themeColor;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 8px 0 6px;
  border-radius: $borderRadius;
  cursor: pointer;

  &:hover {
    background-color: $themeHoverColor;
  }

  .icon {
    font-size: 15px;
    margin-right: 3px;
  }
}

@media screen and (width <= 800px) {
  .configs {
    margin-top: 15px;
    display: flex;
    flex-direction: column;

    .config-item {
      margin-top: 8px;

      .label {
        flex-shrink: 0;
      }

      .config-content {
        width: 100% !important;
      }
    }
  }
  .select-template {
    .templates {
      padding-right: 0;
    }
  }
}
</style>
