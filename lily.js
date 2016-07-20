function(){
	
}



//调用返回id为此id的元素对象。
function $(id) {
	return document.getElementById(id);
}

//addClass:为指定的dom元素添加样式。
function hasClass(obj, cls) {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
//removeClass:删除指定dom元素的样式。
function addClass(obj, cls) {
	if (!this.hasClass(obj, cls)) {
		obj.className += " " + cls;
	}
}
//toggleClass:如果存在(不存在)，就删除(添加)一个样式。
function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(reg, ' ');
	}
}
//hasClass:判断样式是否存在。
function toggleClass(obj, cls) {
	if (hasClass(obj, cls)) {
		removeClass(obj, cls);
	} else {
		addClass(obj, cls);
	}
	
}

//cookie
function setCookie(name, value, iDay) {
	if (iDay !== false) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + iDay);
		document.cookie = name + '=' + value + ';expires=' + oDate + ';path=/';
	} else {
		document.cookie = name + '=' + value;
	}
}

function getCookie(name) {
	var arr = document.cookie.split('; ');
	var i = 0;
	for (i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if (arr2[0] == name) {
			return arr2[1];
		}
	}
	return '';
}

function removeCookie(name) {
	setCookie(name, 'a', -1);
}
//事件
function myAddEvent(obj, ev, fn) {
	obj.attachEvent ? obj.attachEvent('on' + ev, fn) : obj.addEventListener(ev, fn, false);
}

function myDelEvent(obj, ev, fn) {
	obj.detachEvent ? obj.detachEvent('on' + ev, fn) : obj.removeEventListener(ev, fn, false);
}

function getByClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b' + sClass + '\\b', 'i');
	var aResult = [];
	for (var i = 0; i < aEle.length; i++) {
		if (re.test(aEle[i].className)) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

function bindEvent(obj, ev, fn) {
	obj.addEventListener ? obj.addEventListener(ev, fn, false) : obj.attachEvent('on' + ev, fn);
}

function unbindEvent(obj, ev, fn) {
	obj.removeEventListener ? obj.removeEventListener(ev, fn, false) : obj.detachEvent('on' + ev, fn);
}
//生成随机数
function rnd(n, m) {
	return Math.random() * (m - n) + n;
}

function time2date(t) {
	function d(n) {
		return n < 10 ? '0' + n : '' + n;
	}
	var oDate = new Date(t * 1000);
	return oDate.getFullYear() + '-' + d(oDate.getMonth() + 1) + '-' + d(oDate.getDate()) + ' ' + d(oDate.getHours()) + ':' + d(oDate.getMinutes()) + ':' + d(oDate.getSeconds());
}

function time2day(t) {
	function d(n) {
		return n < 10 ? '0' + n : '' + n;
	}
	var oDate = new Date(t * 1000);
	return oDate.getFullYear() + '-' + d(oDate.getMonth() + 1) + '-' + d(oDate.getDate());
}
//拖拽
function drag(objEv, objMove, fnMoveCallBack) {
	var disX = 0,
		disY = 0;
	objEv.onmousedown = function(ev) {
		var oEvent = ev || event;
		disX = (document.documentElement.scrollLeft || document.body.scrollLeft) + oEvent.clientX - objMove.offsetLeft;
		disY = (document.documentElement.scrollTop || document.body.scrollTop) + oEvent.clientY - objMove.offsetTop;
		if (objEv.setCapture) {
			objEv.onmousemove = fnMove;
			objEv.onmouseup = fnUp;
			objEv.setCapture();
		} else {
			document.onmousemove = fnMove;
			document.onmouseup = fnUp;
			return false;
		}
	};

	function fnMove(ev) {
		var oEvent = ev || event;
		var l = (document.documentElement.scrollLeft || document.body.scrollLeft) + oEvent.clientX - disX;
		var t = (document.documentElement.scrollTop || document.body.scrollTop) + oEvent.clientY - disY;
		fnMoveCallBack(l, t);
	}

	function fnUp() {
		this.onmousemove = null;
		this.onmouseup = null;
		if (this.releaseCapture) this.releaseCapture();
	}
}

function mouseScroll(obj, fnCallBack) {
	bindEvent(obj, 'mousewheel', fnScroll);
	bindEvent(obj, 'DOMMouseScroll', fnScroll);

	function fnScroll(ev) {
		var oEvent = ev || event;
		var bDown;
		if (oEvent.wheelDelta) {
			bDown = oEvent.wheelDelta < 0;
		} else {
			bDown = oEvent.detail > 0;
		}
		fnCallBack(bDown);
		if (oEvent.preventDefault) oEvent.preventDefault();
		return false;
	}
}
////摆动运动
//	zns.site.fx.swing = function(obj, cur, target, fnDo, fnEnd, acc) {
//	if (zns.site.fx.browser_test.IE6) {
//		fnDo && fnDo.call(obj, target);
//		fnEnd && fnEnd.call(obj, target);
//		return;
//	}
//	if (!acc) acc = 0.1;
//	var now = {};
//	var x = 0; //0-100
//	if (!obj.__swing_v) obj.__swing_v = 0;
//	if (!obj.__last_timer) obj.__last_timer = 0;
//	var t = new Date().getTime();
//	if (t - obj.__last_timer > 20) {
//		fnMove();
//		obj.__last_timer = t;
//	}
//	clearInterval(obj.timer);
//	obj.timer = setInterval(fnMove, 20);
//
//	function fnMove() {
//		if (x < 50) {
//			obj.__swing_v += acc;
//		} else {
//			obj.__swing_v -= acc;
//		}
//		//if(Math.abs(obj.__flex_v)>MAX_SPEED)obj.__flex_v=obj.__flex_v>0?MAX_SPEED:-MAX_SPEED;
//		x += obj.__swing_v;
//		//alert(x+','+obj.__swing_v);
//		for (var i in cur) {
//			now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
//		}
//		if (fnDo) fnDo.call(obj, now);
//		if ( /*Math.abs(obj.__swing_v)<1 || */ Math.abs(100 - x) < 1) {
//			clearInterval(obj.timer);
//			if (fnEnd) fnEnd.call(obj, target);
//			obj.__swing_v = 0;
//		}
//	}
//};
////弹性运动
//zns.site.fx.flex = function(obj, cur, target, fnDo, fnEnd, fs, ms) {
//	if (zns.site.fx.browser_test.IE6) {
//		fnDo && fnDo.call(obj, target);
//		fnEnd && fnEnd.call(obj, target);
//		return;
//	}
//	var MAX_SPEED = 16;
//	if (!fs) fs = 6;
//	if (!ms) ms = 0.75;
//	var now = {};
//	var x = 0; //0-100
//	if (!obj.__flex_v) obj.__flex_v = 0;
//	if (!obj.__last_timer) obj.__last_timer = 0;
//	var t = new Date().getTime();
//	if (t - obj.__last_timer > 20) {
//		fnMove();
//		obj.__last_timer = t;
//	}
//	clearInterval(obj.timer);
//	obj.timer = setInterval(fnMove, 20);
//
//	function fnMove() {
//		obj.__flex_v += (100 - x) / fs;
//		obj.__flex_v *= ms;
//		if (Math.abs(obj.__flex_v) > MAX_SPEED) obj.__flex_v = obj.__flex_v > 0 ? MAX_SPEED : -MAX_SPEED;
//		x += obj.__flex_v;
//		for (var i in cur) {
//			now[i] = (target[i] - cur[i]) * x / 100 + cur[i];
//		}
//		if (fnDo) fnDo.call(obj, now);
//		if (Math.abs(obj.__flex_v) < 1 && Math.abs(100 - x) < 1) {
//			clearInterval(obj.timer);
//			if (fnEnd) fnEnd.call(obj, target);
//			obj.__flex_v = 0;
//		}
//	}
//};