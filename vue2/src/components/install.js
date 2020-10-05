import Vue from 'vue'
import myAvatar from './g-myAvatar'

let components = [
  myAvatar
]

while (components.length) {
  components[0].install(Vue)
  components.shift()
}
