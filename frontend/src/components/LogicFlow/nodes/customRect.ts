
import { RectNode, RectNodeModel } from '@logicflow/core';

class CustomRectNode extends RectNode {}

class CustomRectModel extends RectNodeModel {
  setAttributes() {
    this.width = 100;
    this.height = 40;
    this.radius = 0;
  }
  getTextStyle() {
    const { refX = 0, refY = 0 } = this.properties ;
    const style = super.getTextStyle();

    // 通过 transform 重新设置 text 的位置
    return {
      ...style,
    };
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    return style;
  }
}

export default {
  type: 'custom-rect',
  view: CustomRectNode,
  model: CustomRectModel,
};