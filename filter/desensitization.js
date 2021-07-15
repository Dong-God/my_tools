/**
 * 脱敏处理
 */
export const phone = str => {
	if (!str) return '';
	const pat = /(\d{3})\d*(\d{4})/;
	return str.replace(pat, '$1****$2');
};
export const email = str => {
	if (!str) return '';
	const pat = /(^\w)[^@]*(@.*$)/;
	return str.replace(pat, '$1****$2');
};
export const idcard = str => {
	if (!str) return '';
	const pat = /(\d{4})\d*(\d{4})/;
	return str.replace(pat, '$1***********$2');
};