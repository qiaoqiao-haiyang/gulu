<template>
  <button
    class="g-button"
    :class="{[`icon-${iconPosition}`]:true}"
    @click="$emit('click')"
  >
    <g-icon
      class="icon"
      v-if="icon && !loading"
      :name="icon"
    ></g-icon>
    <g-icon
      class="loading icon"
      name="loading"
      v-if="loading"
    ></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
import Icon from "./icon.vue"
export default {
    components: {
        "g-icon": Icon,
    },
    props: {
        icon: {},
        iconPosition: {
            type: String,
            default: "left",
            validator(value) {
                return value === "left" || value === "right"
            },
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
<style lang="scss">
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.g-button {
    font-size: var(--font-size);
    height: var(--button-height);
    padding: 0 1em;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--button-bg);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    &:hover {
        border-color: var(--border-color-hover);
    }
    &:active {
        background-color: var(--button-active-bg);
    }
    &:focus {
        outline: none;
    }
    > .content {
        order: 2;
    }
    > .icon {
        order: 1;
        margin-right: 0.1em;
    }
    &.icon-right {
        > .content {
            order: 1;
        }
        > .icon {
            order: 2;
            margin-right: 0;
            margin-left: 0.1em;
        }
    }
    .loading {
        animation: spin 1s infinite linear;
    }
}
</style>