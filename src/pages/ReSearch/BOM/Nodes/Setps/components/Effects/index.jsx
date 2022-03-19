import {FormEffectHooks, FormPath} from '@formily/antd';
import {request} from '@/util/Request';
import {shipSetpDetail} from '@/pages/ReSearch/shipSetp/shipSetpUrl';
import {skuDetail} from '@/pages/Erp/sku/skuUrl';


const Effects = (setFieldState, defaultValue) => {

  FormEffectHooks.onFieldValueChange$('type').subscribe(({value}) => {
    const item = ['setp', 'ship'];
    for (let i = 0; i < item.length; i++) {
      const field = item[i];
      setFieldState(field, state => {
        state.visible = value === field;
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('productionType').subscribe(() => {
    setFieldState('setpSetDetails', state => {
      state.visible = true;
      state.value = defaultValue ? defaultValue.setpSetDetails : [{}];
    });
    setFieldState('skuShow', state => {
      state.props.skus = '';
    });
  });

  FormEffectHooks.onFieldValueChange$('setpSetDetails').subscribe(({value}) => {
    const skuIds = [];
    value && value.map((item) => {
      if (item && item.skuId) {
        skuIds.push(item.skuId);
      }
      return null;
    });

    setFieldState('setpSetDetails.*.skuId', state => {
      state.props.params = {noSkuIds: skuIds};
    });

    setFieldState('skuShow', state => {
      state.props.skus = value;
    });
  });

  FormEffectHooks.onFieldValueChange$('setpSetDetails.*.skuId').subscribe(async ({value, name}) => {
    let res = null;
    if (value) {
      res = await request({...skuDetail, data: {skuId: value}});
    }
    setFieldState(
      FormPath.transform(name, /\d/, ($1) => {
        return `setpSetDetails.${$1}.partsId`;
      }), (state) => {
        if (res) {
          state.value = res.partsId;
        }
        state.visible = value;
        state.props.skuId = value;
      }
    );

  });

  FormEffectHooks.onFieldValueChange$('shipSetpId').subscribe(async ({value}) => {
    if (value) {

      const res = await request({
        ...shipSetpDetail,
        data: {
          shipSetpId: value
        }
      });

      setFieldState('tool', state => {
        state.value = res.binds;
      });

      setFieldState('sop', state => {
        state.value = res.sopResult;
        state.props.sopId = res.sopId;
      });

      setFieldState('shipNote', state => {
        state.value = res.remark;
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('skuId').subscribe(async ({value}) => {
    let res = {};
    if (value) {
      res = await request({...skuDetail, data: {skuId: value}});
    }
    setFieldState('processId', state => {
      state.props.skuId = value;
      state.visible = value;
      state.value = res && res.processResult && res.processResult.processId;
    });
  });
};

export default Effects;
