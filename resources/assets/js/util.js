/**
 * 改行コードを<br>に変換する
 * @param str
 * @returns {string}
 */
export function nl2br(str){
	return (str.replace(/\r\n/g, "<br />")).replace(/[\n\r]/g, "<br />");
}

/**
 * 文字列かどうか
 * @param check_tgt
 * @returns {boolean}
 */
export function isString(check_tgt){
	return typeof (obj) === "string" || obj instanceof String;
}
