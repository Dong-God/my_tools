import { Loading } from 'element-ui';

let loadingCount = 0;
let loading;

const startLoading = msg => {
	loading = Loading.service({
		lock: true,
		text: msg, //可以自定义文字
		spinner: 'jzb-icon-loading', //自定义加载图标类名
		background: 'rgba(0, 0, 0, 0.7)', //遮罩层背景色
	});
};

const endLoading = () => {
	loading.close();
};

export const showLoading = (msg = '拼命加载中...') => {
	if (loadingCount === 0) {
		startLoading(msg);
	}
	loadingCount += 1;
};

export const hideLoading = () => {
	if (loadingCount <= 0) {
		return;
	}
	loadingCount -= 1;
	if (loadingCount === 0) {
		endLoading();
	}
};

export const setLoadingText = text => {
	loading.setText(text);
};
