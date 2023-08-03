<template>
  <h3>{{ title }}</h3>
  <ul>
    <li v-for="item of items" :key="item">
      <label>
        <input
          type="radio"
          :value="item"
          :name="title"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        {{ item }}
      </label>
    </li>
  </ul>
</template>

<script>
import fieldMixin from '~/components/fields/mixin'

export default {
  mixins: [fieldMixin],
}
</script>
