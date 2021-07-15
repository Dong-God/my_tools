//页面加水印
function addWaterMarker(text, parentNode, font, textColor) {
	// 水印文字，父元素，字体，文字颜色
	var can = document.createElement('canvas');
	parentNode.appendChild(can);
	can.width = 200;
	can.height = 150;
	can.style.display = 'none';
	var cans = can.getContext('2d');
	cans.rotate((-20 * Math.PI) / 180);
	cans.font = font || '16px Microsoft JhengHei';
	cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.4)';
	cans.textAlign = 'left';
	cans.textBaseline = 'Middle';
	cans.text = text || '计支宝版权所有';
	cans.fillText(cans.text, can.width / 10, can.height / 2);
	parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}

const waterMarker = {
	bind: function(el, binding) {
		addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
	},
};

export default waterMarker;
