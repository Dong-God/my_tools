import dialogDrag from './v-dialogDrag';
import clickOutside from './v-clickOutside';
// 自定义指令
const directives = {
	dialogDrag,
	clickOutside,
};
// 批量注册指令
export default {
	install(Vue) {
		Object.keys(directives).forEach(key => {
			Vue.directive(key, directives[key]);
		});
	},
};
