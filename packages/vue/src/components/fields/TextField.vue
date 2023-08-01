<template>
  <div>
    <h3>{{ title }}</h3>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
import fieldMixin from '~/components/fields/mixin'

export default {
  mixins: [fieldMixin],
}
</script>
