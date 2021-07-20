/**
 * 机床合同表编辑页
 *
 * @author
 * @Date 2021-07-20 13:34:41
 */

import React, {useRef} from 'react';
import {Input, InputNumber} from 'antd';
import Form from '@/components/Form';
import {contractMachineDetail, contractMachineAdd, contractMachineEdit} from '../contractMachineUrl';
import * as SysField from '../contractMachineField';
import ContractMachineList from '@/pages/DaoxinContrac/contractMachine/contractMachineList';
import {DatePicker2} from '@alifd/next';

const {FormItem} = Form;

const ApiConfig = {
  view: contractMachineDetail,
  add: contractMachineAdd,
  save: contractMachineEdit
};

const ContractMachineEdit = ({...props}) => {





  const formRef = useRef();

  return (
    <Form
      {...props}
      ref={formRef}
      api={ApiConfig}
      fieldKey="contractId"
    >
      <FormItem label='合同名称' name="contractName" component={SysField.name} required/>
      <FormItem label='创建时间' name="creationTime" component={SysField.time} required/>
      <FormItem label="备注" name="note" component={SysField.remake} required/>
      <div className='box'>

        <h1>机床设备销售合同</h1>

        <div>
          <p>购货单位:   <FormItem name="purchaseUnitId" component={SysField.PurchaseUnitId} required/>(以下简称甲方)</p>
          <p>供货单位:  <FormItem  name="supplyUnitId" component={SysField.SupplyUnitId} required/>(以下简称乙方)</p>
          <p>  签约地点:   <FormItem  name="signing_site" component={SysField.SupplyUnitId} required/></p>
          <p> 为保证甲乙双方的经济利益。依据《中华人民共和国合同法》规定及</p>
          <p>招投标文件之内容，甲乙双方经友好协商，就甲方向已方购买达成如下协议:</p>
          <p>一、合同标准:</p>
          <p>1.甲方同意向乙方购买，且乙方同意向甲方出售  <FormItem name="equipment" component={SysField.Equipment} required/>设备(以下简称合同设备)用于   <FormItem  name="projectName" component={SysField.ProjectName} required/>项目。由乙方提供的合同设备的内容详见合同附件一(附件中在列出设备名称的同时也请列出分项价格)。</p>
          <p>2.已方负责合同设备的安装、调试工作，由甲方提供必要配合。</p>
          <p>3.双方同意附件中各项条款为合同不可分隔的部分，若附件与合同正文有任何不一致，以合同正文为准</p>
          <p>二、合同金额</p>
          <p>合同总金额:  <FormItem name="contractAmount" component={SysField.ContractAmount} required/>	人民币元(大写:人民币万元整)</p>
          <p>三、付款时间及方式</p>
          <p>1.付款方式:<FormItem name="payment" component={SysField.Payment} required/>	</p>
          <p>2.具体执行规定:在合同生效后  <FormItem name="effectiveDate" component={SysField.EffectiveDate} required/>天内，甲方向乙方支付合同总额   <FormItem  name="amountOne" component={SysField.AmountOne} required/>%货款设备安装调试完毕，并初步验收后一周内，甲方向乙方支付合同总额   <FormItem name="amountTwo" component={SysField.AmountTwo} required/>%货款；	设备正常运行   <FormItem name="runDate" component={SysField.RunDate} required/>天经双方正式验收合格后一周内，甲方向乙方付合同总额   <FormItem name="amountThree" component={SysField.AmountThree} required/>%的货款；	质保期满后付清余款。</p>
          <p>3.在每期合同款项支付前10天乙方向甲方开具同等金额的增值税发票(或根据实际情况加以约定)。</p>
          <p>四、交货的相关规定</p>
          <p>1.交货时间:合同生效后7个工作日内交货。</p>
          <p>2.交货地点: <FormItem name="paceDelivery" component={SysField.PaceDelivery} required/></p>
          <p>3.收货人名称:    <FormItem name="delivererName" component={SysField.DelivererName} required/>(应为签约单位名称)地址: <FormItem name="deliveryAddress" component={SysField.DeliveryAddress} required/></p>
          <p>4.交货方式:乙方负责货物运输，采用 <FormItem  name="transportationMode" component={SysField.TransportationMode} required/>运输方式。</p>
          <p>5.乙方将合同设备运至 <FormItem name="installationLocation" component={SysField.InstallationLocation} required/>并经安装调试，投入使用并经过甲方验收合格后方为设备交货日期甲方在合同约定的交货地点提货，运输费及运输保险费均由乙方承担合同设备的毁损、灭失风险自乙方完成交货后转移给甲方。</p>
          <p>6.乙方应在合同设备发运后一个工作日内将发运情况(发运时间、件数等)通知甲方，甲方应在合同设备到达合同列明的地点后及时将乙方所托运合同设备提取完毕</p>
          <p>7.甲方提取合同设备时，应检查合同设备外箱包装情况。合同设备外箱包装无摄方可提货如合同设备外箱包装受损或发现合同设备包装箱件数不符，应在2个工作日内通知已方，以便已方办理合同设备遇险索赔手续</p>
          <p>8.甲方对乙方交付的合同设备，均应妥善接收并保管。对误发或多发的货物，甲方应负责妥善保管，并及时通知已方，由此发生的费用由已方承担。</p>
          <p>9.如甲方要求变更交货地点，应在合同规定的交货日期一十五天前通知乙方。由于变更发货地址增加的运保费由甲方承担。</p>
          <p>五、设备验收的相关规定</p>
          <p>1.验收时间，已方应于合同生效后 <FormItem  name="acceptanceTimeOne" component={SysField.AcceptanceTimeOne} required/>天内完成设备安装调试，安装调试完毕后，甲方应在 <FormItem  name="acceptanceTimeTwo" component={SysField.AcceptanceTimeTwo} required/>天内安排初步验收，设备与合同生效后  <FormItem  name="acceptanceTimeThree" component={SysField.AcceptanceTimeThree} required/>    天内通过双方的合格验收并由甲方出具验收合格书。</p>
          <p>2.验收地点:   <FormItem  name="receiveLocation" component={SysField.ReceiveLocation} required/></p>
          <p>3.验收标准:  <FormItem  name="chargeStandard" component={SysField.ChargeStandard} required/></p>
          <p>六、现场服务</p>
          <p>1.乙方现场人员遵守甲方厂规制度，如有违规由乙方负责。</p>
          <p>2.已方现场人员食宿自理</p>
          <p>3.甲方如需邀请已方开展非质量问题处理的技术服务，已方应予以协助。</p>
          <p>七、人员培训</p>
          <p>已方负责对甲方操作，维修人员和有关的工艺技术人员进行操作培训、维修培训、设备保养培训、使之完全掌握全部使用技术，以便使甲方人员正常的使用、维修保养。</p>
          <p>八、保修方式</p>
          <p>1.自设备经过双方验收合格之日起按已方规定的条款进行免费保修服务，免费保修服务期限为 <FormItem  name="warrantyPeriodOne" component={SysField.WarrantyPeriodOne} required/>年，保修期内已方必预在接到甲方保修通知后  <FormItem  name="warrantyPeriodTwo" component={SysField.WarrantyPeriodTwo} required/>天派人至甲方现维修。</p>
          <p>2.保修期内，如由于火灾、水灾、地震、磁电串入等不可抗拒原因及甲方人为破坏因素造成的损坏，乙方负责免费维修，设备材料成本费用由甲方承担。</p>
          <p>3.保修期后，乙方必须在接到甲方维修通知后 <FormItem  name="warrantyPeriodThree" component={SysField.WarrantyPeriodThree} required/>天内派人至甲方现场维修。设备的维修、更换，乙方酌情收取成本费和服务费，收费标准另行约定</p>
          <p>九、违约责任</p>
          <p>1.甲方无故中途退货，应支付给乙方合同总额5%违约金。</p>
          <p>2.甲方逾期付款，每逾期一天，应支付乙方合同总额2%的违约金，违约金累计总额不超过合同总额的 5%。</p>
          <p>3.乙方逾期交货，每逾期一天，应支付合同总额 1%的违约金，违约金累计总额不超过合同总额的 30%。逾期交货超过  <FormItem  name="warrantyPeriodFour" component={SysField.WarrantyPeriodFour} required/>天，视为交货不能，乙方应双倍返还甲方已付款项，甲方有权解除合同并要求乙方支付合同金额 30%的违约金。</p>
          <p>4.保修期内，乙方未能在合同约定的期限内履行保修义务，每迟延一天，乙方向甲方支付合同金额 1%的违约金并赔偿甲方其他经济损失，违约金累计总额不超过合同总额的 30%，乙方超过 30 天仍未履行保修义务，甲方有权解除合同并要求赔偿经济损失;乙方未能在接到甲方通知 30 天内将设备维修至正常使用的状态，甲方有权要求乙方换货或解除合同并要求乙方赔偿经济损失。保修期后，乙方未能在合同约定的期限内履行维修义务，每迟延一天，乙方向甲方支付合同金额 1%的违约金并赔偿甲方其他经济损失，违约金累计总额不超过合同总额的 30%。</p>
          <p>5.设备未按照合同之约定通过甲方验收合格，每迟延一天向甲方支付合同总额 1%的违约金:超过 <FormItem name="warrantyPeriodFive" component={SysField.WarrantyPeriodFive} required/>	天仍未验收合格，甲方有权解除合同，乙方应立即返还已收款项并赔偿甲方由此遭受的其他经济损失。</p>
          <p>十、不可抗力</p>
          <p>如发生不可抗力事件，受不可抗力事件影响的一方应取得公证机关的不能履行或不能全部履行合同的证明，并在事件发生后 15 个工作日内及时通知另一方。双方同意，可据此免除全部或部分责任。</p>
          <p>十一、合同变更</p>
          <p>未尽事宜，双方协商解决:合同的变更及修改须经双方同意，以书面形式变更。</p>
          <p>十二、争议解决方式</p>
          <p>双方如发生争议，应协商解决:如协商不成，任何一方向甲方所在地人民法院提出诉讼。</p>
          <p>十三，合同生效及终止</p>
          <p>合同自双方签字并盖章后生效,双方权利义务履行完毕后,合同终止。</p>
          <p>十四、合同一式四份，双方各执两份，具有同等法律效力。</p>
          <p>甲方(公章):	____________							<span className='span'>乙方(公章):  ____________</span></p>
          <p>法定代表人(签字):  <FormItem name="partyAName" component={SysField.PartyAName} required/>					<span className='span'>	法定代表人(签字):  <FormItem name="partyBName" component={SysField.PartyBName} required/></span></p>
          <p>日期：   <FormItem  name="partyATime" component={SysField.PartyATime} required/>						<span className='span'>日期： <FormItem name="partyBTime" component={SysField.PartyBTime} required/></span></p>
        </div>
      </div>



    </Form>
  );
};

export default ContractMachineEdit;
