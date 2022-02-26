import {FormEffectHooks, FormPath} from '@formily/antd';
import {message} from 'antd';
import {request} from '@/util/Request';
import {customerDetail} from '@/pages/Crm/customer/CustomerUrl';
import {contactsDetail} from '@/pages/Crm/contacts/contactsUrl';
import {templateGetLabel} from '@/pages/Crm/template/TemplateUrl';
import {invoiceDetail} from '@/pages/Crm/invoice/invoiceUrl';


export const customerAAction = (setFieldState) => {
  FormEffectHooks.onFieldValueChange$('buyerId').subscribe(async ({value}) => {
    if (value) {
      const customer = await request({...customerDetail, data: {customerId: value}});
      setFieldState('partyAAdressId', (state) => {
        state.props.customerId = value;
        state.props.options = customer.adressParams && customer.adressParams.map((item) => {
          return {
            label: item.detailLocation || item.location,
            value: item.adressId,
          };
        });
      });

      setFieldState('partyAContactsId', (state) => {
        state.props.customerId = value;
        state.props.options = customer.contactsParams && customer.contactsParams.map((item) => {
          return {
            label: item.contactsName,
            value: item.contactsId,
          };
        });
      });

      setFieldState('partyABankAccount', (state) => {
        state.props.customerId = value;
        state.props.options = customer.invoiceResults && customer.invoiceResults.map((item) => {
          return {
            label: item.bankAccount,
            value: item.invoiceId,
            bankId: item.bankId,
          };
        });
      });

      setFieldState('partyALegalPerson', (state) => {
        state.value = customer.legal;
      });
      setFieldState('partyACompanyPhone', (state) => {
        state.value = customer.telephone;
      });
      setFieldState('partyAFax', (state) => {
        state.value = customer.fax;
      });
      setFieldState('partyAZipCode', (state) => {
        state.value = customer.zipCode;
      });

      setFieldState('adressId', (state) => {
        state.props.customerId = value;
      });

    }
  });

  FormEffectHooks.onFieldValueChange$('partyABankId').subscribe(async ({value}) => {
    if (value) {
      setFieldState('partyABankAccount', (state) => {
        state.props.bankId = value;
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('partyABankAccount').subscribe(async ({value}) => {
    if (value) {
      const res = await request({...invoiceDetail, data: {invoiceId: value}});
      setFieldState('partyABankNo', (state) => {
        state.value = res.bankNo;
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('partyAContactsId').subscribe(async ({value}) => {
    if (value) {
      const res = await request({...contactsDetail, data: {contactsId: value}});
      setFieldState('partyAPhone', (state) => {
        state.props.contactsId = value;
        state.props.options = res.phoneParams && res.phoneParams.map((item) => {
          return {
            label: item.phone,
            value: item.phoneId,
          };
        });
      });
    }
  });
};

export const customerBAction = (setFieldState) => {
  FormEffectHooks.onFieldValueChange$('sellerId').subscribe(async ({value}) => {
    if (value) {
      const customer = await request({...customerDetail, data: {customerId: value}});
      setFieldState('partyBAdressId', (state) => {
        state.props.customerId = value;
        state.props.options = customer.adressParams && customer.adressParams.map((item) => {
          return {
            label: item.detailLocation || item.location,
            value: item.adressId,
          };
        });
      });

      setFieldState('partyBContactsId', (state) => {
        state.props.customerId = value;
        state.props.options = customer.contactsParams && customer.contactsParams.map((item) => {
          return {
            label: item.contactsName,
            value: item.contactsId,
          };
        });
      });

      setFieldState('partyBBankAccount', (state) => {
        state.props.customerId = value;
        state.props.options = customer.invoiceResults && customer.invoiceResults.map((item) => {
          return {
            label: item.bankAccount,
            value: item.invoiceId,
            bankId: item.bankId,
          };
        });
      });

      setFieldState('partyBLegalPerson', (state) => {
        state.value = customer.legal;
      });
      setFieldState('partyBCompanyPhone', (state) => {
        state.value = customer.telephone;
      });
      setFieldState('partyBFax', (state) => {
        state.value = customer.fax;
      });
      setFieldState('partyBZipCode', (state) => {
        state.value = customer.zipCode;
      });

      setFieldState('detailParams', (state) => {
        state.props.customerId = value;
      });

    }
  });

  FormEffectHooks.onFieldValueChange$('partyBContactsId').subscribe(async ({value}) => {
    if (value) {
      const res = await request({...contactsDetail, data: {contactsId: value}});
      setFieldState('partyBPhone', (state) => {
        state.props.contactsId = value;
        state.props.options = res.phoneParams && res.phoneParams.map((item) => {
          return {
            label: item.phone,
            value: item.phoneId,
          };
        });
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('partyBBankAccount').subscribe(async ({value}) => {
    if (value) {
      const res = await request({...invoiceDetail, data: {invoiceId: value}});
      setFieldState('partyBBankNo', (state) => {
        state.value = res.bankNo;
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('partyBBankId').subscribe(async ({value}) => {
    if (value) {
      setFieldState('partyBBankAccount', (state) => {
        state.props.bankId = value;
      });
    }
  });

};

const paymentAction = (setFieldState, getFieldState) => {
  FormEffectHooks.onFieldValueChange$('detailParams').subscribe(({value}) => {
    let money = 0;
    if (value) {
      value.map((item) => {
        if (item && item.totalPrice) {
          money += item.totalPrice;
        }
        return null;
      });
      setFieldState('money', (state) => {
        state.value = money;
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('money').subscribe(({value}) => {
    if (value) {
      setFieldState('paymentDetail', (state) => {
        state.value = [{}];
      });
    }
  });

  FormEffectHooks.onFieldValueChange$('paymentDetail.*.percentum').subscribe(({active, name, value}) => {
    const money = getFieldState('money');
    const paymentDetail = getFieldState('paymentDetail');
    if (!money || !money.value) {
      setFieldState(FormPath.transform(name, /\d/, ($1) => {
        return `paymentDetail.${$1}.percentum`;
      }), (state) => {
        state.value = null;
      });
      return active && message.warn('请输入采购总价！');
    }
    if (paymentDetail && paymentDetail.value) {
      let percentum = 0;
      paymentDetail.value.map((item) => {
        if (item) {
          return percentum += item.percentum;
        }
        return true;
      });
      if (percentum > 100) {
        setFieldState(FormPath.transform(name, /\d/, ($1) => {
          return `paymentDetail.${$1}.percentum`;
        }), (state) => {
          state.value = null;
        });
        return message.warn('总比例不能超过百分之百！');
      }
    }
    setFieldState(FormPath.transform(name, /\d/, ($1) => {
      return `paymentDetail.${$1}.money`;
    }), (state) => {
      state.value = money.value * (value / 100);
    });
  });

  FormEffectHooks.onFieldValueChange$('paymentDetail.*.money').subscribe(({active, name, value}) => {
    const money = getFieldState('money');
    const paymentDetail = getFieldState('paymentDetail');
    if (!money || !money.value) {
      setFieldState(FormPath.transform(name, /\d/, ($1) => {
        return `paymentDetail.${$1}.money`;
      }), (state) => {
        state.value = null;
      });
      return active && message.warn('请输入采购总价！');
    }
    if (paymentDetail && paymentDetail.value) {
      let number = 0;
      paymentDetail.value.map((item) => {
        if (item) {
          return number += item.money;
        }
        return true;
      });
      if (number > money.value) {
        setFieldState(FormPath.transform(name, /\d/, ($1) => {
          return `paymentDetail.${$1}.percentum`;
        }), (state) => {
          state.value = null;
        });
        return message.warn('不能超过总金额！');
      }
    }
    setFieldState(FormPath.transform(name, /\d/, ($1) => {
      return `paymentDetail.${$1}.percentum`;
    }), (state) => {
      state.value = (value / money.value) * 100;
    });
  });
};

const contractAction = (setFieldState) => {
  FormEffectHooks.onFieldValueChange$('generateContract').subscribe(({value}) => {
    setFieldState('templateId', (state) => {
      state.visible = value;
    });
    setFieldState('contractCoding', (state) => {
      state.visible = value;
    });
    setFieldState('allField', (state) => {
      state.visible = value;
    });
  });


  FormEffectHooks.onFieldValueChange$('templateId').subscribe(async ({value}) => {
    if (value) {
      const res = await request({...templateGetLabel, params: {id: value}});
      setFieldState('allField', (state) => {
        state.props.array = res;
      });
    }

  });


};

export const EffectsAction = (setFieldState, getFieldState) => {
  customerAAction(setFieldState);
  customerBAction(setFieldState);
  paymentAction(setFieldState, getFieldState);
  contractAction(setFieldState);
};