import Vue from "vue"
import Button from "./button"
import Icon from "./icon"
import ButtonGroup from "./button-group"

Vue.component("g-button", Button)
Vue.component("g-icon", Icon)
Vue.component("g-button-group", ButtonGroup)

new Vue({
    el: "#app",
    data: {
        loading1: false,
        loading2: true,
        loading3: false
    }
})

import chai from "chai"
import spies from "chai-spies"
chai.use(spies)
const expect = chai.expect

//单元测试  作用域隔离
{
    const Constuctor = Vue.extend(Button)
    const vm = new Constuctor({
        propsData: {
            icon: "settings"
        }
    })
    vm.$mount()
    let useElement = vm.$el.querySelector("use")
    let href = useElement.getAttribute("xlink:href")
    expect(href).to.eq("#i-settings")
    vm.$el.remove()
    vm.$destroy()
}
{
    const Constuctor = Vue.extend(Button)
    const vm = new Constuctor({
        propsData: {
            icon: "settings",
            loading: true
        }
    })
    vm.$mount()
    let useElement = vm.$el.querySelector("use")
    let href = useElement.getAttribute("xlink:href")
    expect(href).to.eq("#i-loading")
    vm.$el.remove()
    vm.$destroy()
}
{
    const div = document.createElement("div")
    document.body.appendChild(div)
    const Constuctor = Vue.extend(Button)
    const vm = new Constuctor({
        propsData: {
            icon: "settings"
        }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector("svg")
    let order = window.getComputedStyle(svg).order
    expect(order).to.eq("1")
    vm.$el.remove()
    vm.$destroy()
}
{
    const div = document.createElement("div")
    document.body.appendChild(div)
    const Constuctor = Vue.extend(Button)
    const vm = new Constuctor({
        propsData: {
            icon: "settings",
            iconPosition: "right"
        }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector("svg")
    let order = window.getComputedStyle(svg).order
    expect(order).to.eq("2")
    vm.$el.remove()
    vm.$destroy()
}
{
    const Constuctor = Vue.extend(Button)
    const vm = new Constuctor({
        propsData: {
            icon: "settings"
        }
    })
    vm.$mount()
    let spy = chai.spy(function() {})
    vm.$on("click", spy)
    let button = vm.$el
    button.click()
    expect(spy).to.have.been.called()
}
