import Vue from 'vue'
import Button from './button';
import Icon from './icon';
import ButtonGroup from './button-group';

Vue.component('g-button',Button)
Vue.component('g-button-group',ButtonGroup)
Vue.component('g-icon',Icon)
new Vue({
    el:"#app",
    data(){
        return {
            loading:true
        }
    }
})

import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const expect = chai.expect

{
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData:{
            icon:'setting'
        }
    })
    button.$mount()
    let useElement = button.$el.querySelector('use')
    expect(useElement.getAttribute('xlink:href')).to.eq('#i-setting')

}

{
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData:{
            icon:'setting',
            loading:true
        }
    })
    const div = document.createElement('div')
    document.body.appendChild(div)
    button.$mount(div)
    let svg = button.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('1')
    button.$el.remove()
    button.$destroy()
    
}


{
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData:{
            icon:'setting',
            iconPosition:'right'
        }
    })
    const div = document.createElement('div')
    document.body.appendChild(div)
    button.$mount(div)
    let svg = button.$el.querySelector('svg')

    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('2')
    button.$el.remove()
    button.$destroy()
}

{
    const Constructor = Vue.extend(Button);
    const gButton = new Constructor({
        propsData:{
            icon:'setting'
        }
    })
    gButton.$mount()
    let spy = chai.spy(function(){
        console.log('spy~')
    })
    let button = gButton.$el;
    gButton.$on('click',spy)
    button.click();
    expect(spy).to.have.been.called();
}