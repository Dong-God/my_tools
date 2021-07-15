/**
 * 修改日期：2020-06-03
 */

//1.* 常量
//1.1 表单校验
const regular = {
	// 空格
	space: /^(?=.*\S).+$/,
	// 密码
	pwd: /(?!^(\d+|[a-zA-Z]+|[~!@_#$%^&*()\-+=,.?]+)$)^[\w~!@_#$%^&*()\-+=,.?]{6,20}$/,
	// 邮箱
	email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
	// 手机号
	mobile: /^(1)\d{10}$/,
	// 验证自然数
	naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
	// 英文
	english: /^.[A-Za-z]+$/,
	// 座机
	telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
	// 传真
	fax: /^(\d{3,4}-)?\d{7,8}$/,
	// 银行卡号码
	bankCard: /^[1-9]\d{9,19}$/,
	// 证件号码
	IDNumber: /^[a-z0-9A-Z]{0,50}$/,
	// 身份证号码,包括15位和18位的
	IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
	// QQ号码
	qq: /^[1-9]\d{4,11}$/,
	// 网址, 仅支持http和https开头的
	url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
	// 0到20位的英文字符和数字
	enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
	// 6~18个字，必须由英文/字母/数字/下划线组成，不能以下划线开头或结尾
	enNum_6to18: /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,18}$/,
	// 2到100位的中英文字符和空格
	cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
	// 数字和换行符
	numLinefeed: /^[0-9\n*]+$/,
	// 255位以内的字符
	char0to255: /^.{0,255}$/,
	//非负数
	nonNegativeNum: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
};

// 2.* 通用方法
/**2.1 格式化金额
 * 示例：formatCurrency(99.312) =>99.31
 */
const formatCurrency = (val, floatType = 2) => {
	val = (val + '').replace(/\$|,/g, '');
	if (isNaN(val)) {
		val = '0';
	}
	let sign = val == (val = Math.abs(val));
	val = Math.floor(val * 100 + 0.50000000001);
	let cents = val % 100;
	val = Math.floor(val / 100).toString();
	if (cents < 10) {
		cents = '0' + cents;
	}
	for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
		val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
	}
	if (floatType == 2) val += '.' + cents;
	return (sign ? '' : '-') + val;
};

/**2.2 截取url参数
 * 示例：GetRequestParams().userid
 */
const GetRequestParams = () => {
	let url = location.search; // 获取url中"?"符后的字串
	let theRequest = new Object();
	if (url.indexOf('?') != -1) {
		let str = url.substr(1);
		let strs = str.split('&');
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
		}
	}
	return theRequest;
};
//2.3 替换url参数
const replaceUrlParams = (oUrl, paramName, replaceWith) => {
	var re = eval('/(' + paramName + '=)([^&]*)/gi');
	return oUrl.replace(re, paramName + '=' + replaceWith);
};
//2.4 uuid
const guid = () => {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};
//2.5 getFrameExtraHeight
const getFrameExtraHeight = () => {
	let frameHeader = document.getElementById('frame-header'),
		frameMenuTag = document.getElementById('frame-menu-tag'),
		frameHeaderHeight = frameHeader ? frameHeader.clientHeight : 0,
		frameMenuTagHeight = frameMenuTag ? frameMenuTag.clientHeight : 0;
	return frameHeaderHeight + frameMenuTagHeight;
}
// 3.* 树形数组方法
// 3.1 treeList- 批处理
const mapTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	let newList = lists.map(item => {
		let res = fn(item);
		if (item[childName] && item[childName].length > 0) {
			res[childName] = mapTreeList(item[childName], fn);
		}
		return res;
	});
	return newList;
};
// 3.2 treeList 遍历
const eachTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	lists.forEach(item => {
		fn(item);
		if (item[childName] && item[childName].length > 0) {
			eachTreeList(item[childName], fn);
		}
	});
};
//3.3 treeList-扁平过滤
const flatTreeList = (treeList, fn, childName = 'children') => {
	let newList = [];
	const lists = deepClone(treeList);
	eachTreeList(
		lists,
		item => {
			if (!fn || (fn && fn(item))) newList.push(item);
		},
		childName
	);
	return newList;
};
//3.4 treeList-过滤
const filterTreeList = (treeList, fn, childName = 'children') => {
	let newList = [];
	const lists = deepClone(treeList);
	lists.forEach(item => {
		if (fn && fn(item)) {
			if (item[childName]) item[childName] = filterTreeList(item[childName], fn, childName);
			newList.push(item);
		}
	});
	return newList;
};

//3.5 treeList-查找到某一项
const findItemTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	let res = null;
	eachTreeList(
		lists,
		item => {
			if (fn && fn(item)) res = item;
		},
		childName
	);
	return res;
};
//3.6 treeList-查找到某一项的children
const findChildTreeList = (treeList, fn, childName = 'children') => {
	const lists = deepClone(treeList);
	let res = [];
	eachTreeList(
		lists,
		item => {
			if (fn && fn(item)) res = item[childName];
		},
		childName
	);
	return res;
};

/**
 *
 * @param {*} tree 传入数组
 * @param {*} fn 过滤方法，传入当前节点，返回为ture的数据
 * @param {*} children 子节点字段
 * @returns
 */
const deepFilterTreeList = (tree, fn, children = 'children') => {
	const deepfilter = (tree, fn) => {
		const nodes = deepClone(tree);
		// 如果数组不存在，返回空
		if (!(nodes && nodes.length)) {
			return [];
		}
		const newChildren = [];
		for (let node of nodes) {
			// 递归过滤
			let subs = deepfilter(node[children], fn);
			if (fn(node)) {
				// 父节过滤成功，添加到数组
				newChildren.push(node);
			} else if (subs && subs.length) {
				// 将所有过滤成功的子节点，和父节点添加到数组
				node[children] = subs;
				newChildren.push(node);
			}
		}
		return newChildren.length ? newChildren : [];
	};
	return deepfilter(tree, fn);
};

//4.* 对象
//4.1 深拷贝
const deepClone = aObject => {
	if (!aObject) {
		return aObject;
	}
	var bObject, v, k;
	bObject = Array.isArray(aObject) ? [] : {};
	for (k in aObject) {
		v = aObject[k];
		bObject[k] = typeof v === 'object' ? deepClone(v) : v;
	}
	return bObject;
};

/**
 * 本地缓存
 */
// 项目
const PROJECT_KEY = 'JZBPROJECT';
// 合同
const CONTRACT_KEY = 'JZBCONTRACT';
// 设备
const DEVICE_KEY = 'JZBDEVICEID';
const cacheSelect = {
	setProjectId: (projValue = '', key = PROJECT_KEY) => {
		localStorage.setItem(key, projValue);
		return true;
	},
	getProjectId: (key = PROJECT_KEY) => {
		return localStorage.getItem(key);
	},
	getProject: (list, projIdKey = 'projId') => {
		if (!list || list.length === 0) return {};
		// 获取本地保存的id
		const _localProjId = localStorage.getItem(PROJECT_KEY);
		// 如果本地存储的项目id不存在，返回第一个数据
		if (!_localProjId) return list[0];
	
		// 获取本地存储的项目id对应的项目，如果不存在，选中第一个项目
		const _project = list.find(item => item[projIdKey] == _localProjId);
		if (!_project) return list[0];
		// 如果存在返回
		return _project;
	},
	setContractId: (contValue = '', key = CONTRACT_KEY) => {
		localStorage.setItem(key, contValue);
		return true;
	},
	getContractId: (key = CONTRACT_KEY) => {
		return localStorage.getItem(key);
	},
	getContract: (list, contIdKey = 'contId') => {
		if (!list || list.length === 0) return {};
		// 获取本地保存的id
		const _localContId = localStorage.getItem(CONTRACT_KEY);
		// 如果本地存储的合同id不存在，返回第一个数据
		if (!_localContId) return list[0];
	
		// 获取本地存储的合同id对应的合同，如果不存在，选中第一个合同
		const _cont = list.find(item => item[contIdKey] == _localContId);
		if (!_cont) return list[0];
		// 如果存在返回
		return _cont;
	},
	getDeviceId: (key = DEVICE_KEY) => {
		return localStorage.getItem(key);
	},
	setDeviceId: (_deviceId = '', key = DEVICE_KEY) => {
		localStorage.setItem(key, _deviceId);
		return true;
	},
	/**
	 * 检查传入值是否存在改数组中
	 * @param {string} fieldName 字段名称
	 * @param {string} objVal  检索值
	 * @param {Array} mDataList 检索数组
	 * return true or false
	 */
	checkIsFormData: (fieldName = '', objVal = '', mDataList = []) => {
		if (!fieldName || !objVal || !Array.isArray(mDataList) || mDataList.length === 0) {
			return false;
		}
		for (let item of mDataList) {
			if (item[fieldName].toLowerCase() === objVal.toLowerCase()) {
				return true;
			}
		}
		return false;
	},
};

/**
 * 6.1 本地存储
 */
const storage = {
	setLocalStorage: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	},
	getLocalStorage: key => {
		const res = localStorage.getItem(key);
		try {
			const ret = JSON.parse(res);
			return ret;
		} catch (error) {
			return res;
		}
	},
	setSessionStorage: (key, value) => {
		sessionStorage.setItem(key, JSON.stringify(value));
	},
	getSessionStorage: key => {
		const res = sessionStorage.getItem(key);
		try {
			const ret = JSON.parse(res);
			return ret;
		} catch (error) {
			return res;
		}
	},
};

export {
	regular, //1.1 表单校验正则
	formatCurrency, //2.1 格式化金额
	GetRequestParams, //2.2 截取字符串url参数
	replaceUrlParams, //2.3 替换url参数
	guid, //2.4 生成guid
	getFrameExtraHeight, // 获取框架额外高度
	mapTreeList, //3.1 treeList- map遍历，返回新数组
	eachTreeList, //3.2 treeList-遍历
	flatTreeList, //3.3 treeList-扁平后
	filterTreeList, //3.4 treeList-过滤
	findItemTreeList, //3.5 treeList-查找到某一项
	findChildTreeList, //3.6 treeList-查找到某一项的children
	deepFilterTreeList, //3.7 treeList-深度过滤
	deepClone, // 4.1 对象深拷贝
	cacheSelect, //5.1 本地项目，合同，设备存储
	storage, // 6.1 本地存储
};
