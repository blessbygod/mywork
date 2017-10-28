import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
  setDefaults() {
    return {
      bottomBarTexts: [],
      success() { }
    }
  },
  
  show(opts = {}) {
    // 将对象深度克隆
    const options = Object.assign({}, this.setDefaults(), opts)
    
    // 实例化组件
    const component = new Component({
      scope: `$wux.bottomBar`,
      data: options,
      methods: {
        redirectPage: function (e) {
          let page = this
          let dataset = e.currentTarget.dataset
          let url = dataset.page
          wx.redirectTo({
            url
          })
        }
      },
      /**
				 * 显示
			 */
      show() {
        this.setDefaults()
      },
    })
    component.show()
    return component
  }
}