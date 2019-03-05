
class SelectWithLabel{
  constructor(params = {}){
    if(!params.tgt_elm){
      return;
    }
    // 対象要素
    this.tgt_elm = params.tgt_elm;
    // 対象要素内のセレクト要素
    this.tgt_select = this.tgt_elm.querySelector(obj.select_exp || 'select');
    // 初期化時のコールバック関数
    this.initCallback = obj.initCallback || null;
    // 対象要素内のラベル要素
    this.tgt_select_p = obj.select_p_exp?this.tgt_elm.querySelector(obj.select_p_exp):this.tgt_select.previousElementSibling;
    // セレクト変更後のコールバック
    this.changeCallback = obj.changeCallback || null;
    // セレクト変更後のコールバックをinit時にも処理するか
    this.is_exec_change_callback_at_init = obj.is_exec_change_callback_at_init || false;
    // セレクトされている要素
    this.current_select = null;

    if(this.tgt_select.length){
      this.init();
    }

  }

  /**
   * 初期処理
   */
  init(){
    this.initCallback && this.initCallback(this);
    this.current_select = this.tgt_select.options[this.tgt_select.selectedIndex];
    this.setLabel();
    if(this.is_exec_change_callback_at_init){
      this.onChangeEvent();
    }
    // プルダウン変更時処理
    this.tgt_select.addEventListener('change', () => {
      this.current_select = this.tgt_select.options[this.tgt_select.selectedIndex];
      this.setLabel();
      this.onChangeEvent();
      return;
    });
  }
  setLabel(){
    this.tgt_select_p.textContent = this.current_select.textContent;
  }
  onChangeEvent(){
    if(this.changeCallback){
      if(typeof(this.changeCallback) == "function"){
        this.changeCallback(this.current_select);
      }else if(typeof(this.changeCallback.fn) == "function"){
        var parent = this.changeCallback.parent || this;
        var params = this.changeCallback.params || {};
        this.changeCallback.fn.call(parent,this.current_select,params);
      }
    }
  }

  reInit(){
    this.current_select = this.tgt_select.options[this.tgt_select.selectedIndex];
    this.setLabel();
  }
}

export default function(params = {}){
  if(!params.tgt_elm) return;

  const tgt_elms = _getHtmlElementAry(params.tgt_elm);

  tgt_elms.forEach(tgt_elm => {
    Object.assign(params, {tgt_elm});
    new SelectWithLabel(params);
  });

  function _getHtmlElementAry(tgt){
    var i=0;
    var ret_ary = [];
    var toString = Object.prototype.toString;
    if(toString.call(tgt) == '[object HTMLCollection]'){
      for(i = 0; i < tgt.length; i++){
        ret_ary.push(tgt[i]);
      }
    }else if(toString.call(tgt) == '[object NodeList]'){
      for(i = 0; i < tgt.length; i++){
        if(tgt[i].nodeType==1){
          ret_ary.push(tgt[i]);
        }
      }
    }else if(toString.call(tgt).match(/^\[object HTML/)){
      ret_ary.push(tgt);
    }else{
      console.log('HTMLエレメントが渡されていません');
    }
    return ret_ary;
  }
}