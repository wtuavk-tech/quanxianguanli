
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Plus,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Search,
  RotateCcw,
  Download,
  ShieldAlert,
  BellRing,
  Settings,
  ListTodo,
  FileText,
  Megaphone,
  Link,
  Map,
  Lock,
  Smartphone,
  Users,
  FileOutput,
  UserCog,
  Bot,
  Flame,
  Flag
} from 'lucide-react';

// --- 类型定义 ---

type ActionType = "直派转未派" | "号码绑定" | "转派权限" | "线下师傅" | "项目管理" | "地域管理" | "派单权限" | "接单权限" | "订单权限" | "手机信息" | "手机分配" | "导出任务" | "个人配置" | "导出配置" | "机器人录单配置" | string;

interface OrderData {
  id: number;
  [key: string]: any;
}

// --- Mock Data Generators ---

const generateMockData = (type: ActionType, subTab?: string): OrderData[] => {
  const data: OrderData[] = [];
  for (let i = 1; i <= 20; i++) {
    switch(type) {
      case "机器人录单配置":
        if (subTab === "天润融通") {
          data.push({
            id: i,
            dept: ['其他组', '电话组', '美团组'][i % 3],
            phone400: `400${898542 + i * 132}`,
            source: ['渠道6', '渠道1', '美团', '渠道5', '线1', '急修预约单', '老兵'][i % 7],
            platform: i % 2 === 0 ? ['京东', '饿了么 (城匠益家)', '儿童观地方官', '66'][i % 4] : ''
          });
        } else {
          data.push({
            id: i,
            shopId: `16645474602295${i}`,
            shopName: ['利民巧匠家庭家电维修', '急修到家(五华店)', '利民巧匠家庭家电维修 营口', '利民巧匠家庭家电维修(滕州店)', '懂修侠 (无锡远东店)'][i % 5],
            source: ['美团', '扩2', '网2', '急修预约单'][i % 4],
            phoneNo: i % 3 === 0 ? `${i}` : ''
          });
        }
        break;
      case "个人配置":
        data.push({
          id: i,
          username: ['客服11', '主管', '廖林峰', '吴会东', '测试派单员', '陈清平', '管理员'][i % 7],
          configItem: ['订单来源数据权限', '派单员总单数预警', '异常提醒订单来源', '第三方订单查看权限', '录单时订单来源选项', '派单短信预警'][i % 6],
          configValue: i % 2 === 0 ? 'MT,PDD,MTYYD,MTLB' : '100',
          configDesc: i % 3 === 0 ? '录单时可选订单来源' : '123',
          remark: i % 4 === 0 ? '是副市长方不是德' : '345'
        });
        break;
      case "导出配置":
        data.push({
          id: i,
          creator: ['陈序麟', '管理员', '李琨'][i % 3],
          module: '订单导出',
          password: i % 2 === 0 ? '0021' : '123456',
          remark: i % 5 === 0 ? '3问3区' : '',
          roleId: 8 + i,
          roleName: ['财务', '管理员', '运营'][i % 3],
          status: '生效'
        });
        break;
      case "项目管理":
        data.push({
          id: i,
          pNo: `P${1000 + i}`,
          pName: ['数码回收', '热水器维修', '灯具安装', '空调清洗'][i % 4],
          timeout: 30 + (i * 5),
          urgency: ['紧急', '一般', '优先'][i % 3],
          sort: i,
          level: (i % 3) + 1,
          status: i % 2 === 0 ? '生效' : '失效',
          keywords: '维修,安装',
          image: '-',
          tip: '请准时上门',
          remark: ''
        });
        break;
      case "地域管理":
        data.push({
          id: i,
          code: 110100 + i,
          name: ['北京市', '东城区', '西城区', '朝阳区', '丰台区', '石景山区'][i % 6],
          fullName: '北京市' + (i % 6 === 0 ? '' : ['东城区', '西城区', '朝阳区', '丰台区', '石景山区'][i % 6 - 1]),
          status: '生效',
          level: (i % 2) + 1
        });
        break;
      case "派单权限":
        data.push({
          id: i,
          uNo: `U${2000 + i}`,
          username: ['张三', '李四', '王五', '赵六'][i % 4],
          projects: '热水器维修,空调清洗',
          regions: '北京市朝阳区,海淀区',
          source: '猫,威',
          period: '09:00-18:00',
        });
        break;
      case "接单权限":
        data.push({
          id: i,
          username: ['孙七', '陈陈陈', '吴倩珍', '高飞', '老王', '大王'][i % 6],
          phone: `13800138${100 + i}`,
          mUid: 140 + i,
          project: '家庭水电,打孔,灯具安装',
          region: '北京市东城区,西城区,江西省赣州市',
          status: i % 2 === 0 ? '是' : '否'
        });
        break;
      case "订单权限":
        data.push({
          id: i,
          source: ['线12', '线11', '老客户', '微信小程序'][i % 4]
        });
        break;
      case "手机信息":
        data.push({
          id: i,
          phoneId: 100 + i,
          phoneNo: i,
          phoneNumber: `17607078${100 + i}`,
          model: 'iPhone 13',
          score: (i % 5) + 2,
          status: '生效',
          image: '-',
          remark: ''
        });
        break;
      case "手机分配":
        data.push({
          id: i,
          batchNo: `20250${i}1533740`,
          peopleCount: (i % 5) + 1,
          phoneCount: 10 + i,
          creator: ['管理员', '李琨', '黄素娟', '宗佳燕'][i % 4],
          createTime: '2025-06-24 15:13:38'
        });
        break;
      case "导出任务":
        data.push({
          id: i,
          exportNo: `E${5000 + i}`,
          creator: '管理员',
          count: 100 * i,
          status: '完成',
          project: '数码回收',
          filename: `export_data_${i}.xlsx`,
          size: 1024,
          duration: 5,
          startTime: '2025-12-18 09:00:00',
          endTime: '2025-12-18 09:00:05'
        });
        break;
      case "号码绑定":
        data.push({
          id: i,
          createTime: `2025-03-26 21:00:11`,
          creator: i % 3 === 0 ? '陈炜' : '陈陈陈',
          status: '失效',
          city: i % 2 === 0 ? '黄冈' : '南昌',
          vNumber: '17087104531',
          ext: 972 - i,
          cPhone: '16606146669',
          mPhone: '15926721292',
          orderId: `2502051440${4242 + i}`,
          bindType: '上门服务绑定',
          pool: 'FC100000175950010',
          unbindTime: '',
          expireTime: '2025-03-27 21:00:11'
        });
        break;
      default:
        data.push({
          id: i,
          source: '猫',
          region: '北京市西城区',
          project: '热水器维修',
        });
    }
  }
  return data;
};

// --- 子组件 ---

const NotificationBar = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-3 mb-4 flex items-center shadow-sm justify-between gap-4 shrink-0">
    <div className="flex items-center gap-4 flex-1 overflow-hidden">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm shrink-0 transition-colors">
          主要公告 <Bell size={14} className="ml-1" />
        </button>
        {/* Changed text-xs to text-sm here */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-700 overflow-hidden whitespace-nowrap">
          <span className="truncate cursor-pointer hover:text-blue-500 transition-colors">秋季职级晋升评审的通知: 点击下方详情以阅读完整公告内容。</span>
          <span className="flex items-center gap-2 truncate cursor-pointer hover:text-blue-500 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
            <Megaphone size={14} className="text-gray-400" />
            系统升级通知: 今晚 24:00 将进行系统维护。
          </span>
          <span className="flex items-center gap-2 truncate cursor-pointer hover:text-blue-500 transition-colors">
             <Flag size={14} className="text-rose-500" />
             <Flame size={14} className="text-amber-500" />
             10月业绩pk赛圆满结束，恭喜华东大区获得冠军!
          </span>
        </div>
    </div>
    <div className="bg-gray-50 text-gray-400 px-3 py-1 rounded-md text-xs font-mono shrink-0 border border-gray-100">
      2025-11-19
    </div>
  </div>
);

const QuickActions = ({ active, onSelect }: { active: string | null, onSelect: (v: string) => void }) => {
  const buttons = [
    { name: "直派转未派", icon: ShieldAlert, color: "red" },
    { name: "号码绑定", icon: Link, color: "amber" },
    { name: "转派权限", icon: UserCog, color: "blue" },
    { name: "线下师傅", icon: Users, color: "green" },
    { name: "项目管理", icon: ListTodo, color: "teal" },
    { name: "地域管理", icon: Map, color: "purple" },
    { name: "派单权限", icon: Lock, color: "red" },
    { name: "接单权限", icon: Smartphone, color: "amber" },
    { name: "订单权限", icon: FileText, color: "blue" },
    { name: "手机信息", icon: Smartphone, color: "green" },
    { name: "手机分配", icon: Users, color: "teal" },
    { name: "导出任务", icon: FileOutput, color: "purple" },
    { name: "个人配置", icon: UserCog, color: "red" },
    { name: "导出配置", icon: Settings, color: "amber" },
    { name: "机器人录单配置", icon: Bot, color: "blue" }
  ];

  const getColorClasses = (color: string) => {
    // 简化颜色映射逻辑，适应新的“只有边框色”需求
    const map: any = {
      red: { 
        border: 'border-red-500', 
        text: 'text-red-600', 
        iconBg: 'bg-red-500',
        hoverBorder: 'hover:border-red-300', 
        hoverText: 'hover:text-red-600' 
      },
      amber: { 
        border: 'border-amber-500', 
        text: 'text-amber-600', 
        iconBg: 'bg-amber-500',
        hoverBorder: 'hover:border-amber-300', 
        hoverText: 'hover:text-amber-600' 
      },
      blue: { 
        border: 'border-blue-500', 
        text: 'text-blue-600', 
        iconBg: 'bg-blue-500',
        hoverBorder: 'hover:border-blue-300', 
        hoverText: 'hover:text-blue-600' 
      },
      green: { 
        border: 'border-green-500', 
        text: 'text-green-600', 
        iconBg: 'bg-green-500',
        hoverBorder: 'hover:border-green-300', 
        hoverText: 'hover:text-green-600' 
      },
      teal: { 
        border: 'border-teal-500', 
        text: 'text-teal-600', 
        iconBg: 'bg-teal-500',
        hoverBorder: 'hover:border-teal-300', 
        hoverText: 'hover:text-teal-600' 
      },
      purple: { 
        border: 'border-purple-500', 
        text: 'text-purple-600', 
        iconBg: 'bg-purple-500',
        hoverBorder: 'hover:border-purple-300', 
        hoverText: 'hover:text-purple-600' 
      },
    };
    return map[color] || map.blue;
  };

  return (
    <div className="bg-white p-5 mb-4 border border-gray-200 shadow-sm rounded-2xl shrink-0">
      {/* 使用 grid-cols-8 实现两行布局 (15个元素) */}
      <div className="grid grid-cols-8 gap-3">
        {buttons.map((btn, index) => {
          const isActive = active === btn.name;
          const colors = getColorClasses(btn.color);
          const Icon = btn.icon;
          
          return (
            <button 
              key={index}
              onClick={() => onSelect(btn.name)}
              className={`h-11 w-full px-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border box-border ${
                isActive 
                  ? `bg-white ${colors.border} ${colors.text} shadow-md scale-105 border-2` // 选中：白底、有色边框、有色文字、放大、加粗边框
                  : `bg-white ${colors.border} text-gray-600 ${colors.hoverText} hover:shadow hover:-translate-y-0.5 border` // 未选中：白底、有色边框（与图标同色）、灰色文字
              }`}
            >
              {/* 图标背景保持彩色填充 */}
              <div className={`p-1 rounded-full shrink-0 ${colors.iconBg} flex items-center justify-center`}>
                 <Icon size={14} className="text-white" />
              </div>
              <span className="text-xs font-bold truncate">{btn.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SearchPanel = ({ action, activeTab, onTabChange }: { action: string | null, activeTab: string, onTabChange: (tab: string) => void }) => {
  const renderContent = () => {
    switch(action) {
      case "机器人录单配置":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-xs font-medium border-b border-gray-100 pb-2">
              {["快商通", "天润融通"].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => onTabChange(tab)}
                  className={`pb-1 px-2 ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === "天润融通" ? (
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">400号码</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">订单来源</span><select className="w-32 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
                <div className="flex items-center gap-2">
                  <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
                  <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
                  <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">店铺ID</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">店铺名称</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">订单来源</span><select className="w-32 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
                <div className="flex items-center gap-2">
                  <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
                  <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
                  <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
                  <button className="h-8 px-4 bg-emerald-500 text-white text-xs rounded-lg font-medium">导入</button>
                </div>
              </div>
            )}
          </div>
        );
      case "个人配置":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">用户名</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">配置项</span><select className="w-32 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
            </div>
          </div>
        );
      case "导出配置":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">角色名称</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">导出类型</span><select className="w-32 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
              <button className="h-8 px-4 bg-rose-500 text-white text-xs rounded-lg font-medium">批量删除</button>
            </div>
          </div>
        );
      case "项目管理":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">项目名称</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">状态</span><select className="w-24 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">提示语</span><select className="w-24 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">紧急程度</span><select className="w-24 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
              <button className="h-8 px-4 bg-blue-400 text-white text-xs rounded-lg font-medium">批量生效</button>
              <button className="h-8 px-4 bg-orange-400 text-white text-xs rounded-lg font-medium">批量失效</button>
            </div>
          </div>
        );
      case "地域管理":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">全称</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">是否生效</span><select className="w-28 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
            </div>
          </div>
        );
      case "派单权限":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">用户名</span><input type="text" placeholder="请输入内容" className="w-28 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">地域名</span><input type="text" placeholder="如：北京" className="w-28 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">项目名</span><input type="text" placeholder="如：修空调" className="w-28 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">订单来源</span><select className="w-24 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-3 bg-blue-500 text-white text-[10px] rounded-lg font-medium">新增</button>
              <button className="h-8 px-3 bg-blue-400 text-white text-[10px] rounded-lg font-medium">用户派单权限</button>
              <button className="h-8 px-3 bg-rose-400 text-white text-[10px] rounded-lg font-medium">批量删除</button>
              <button className="h-8 px-3 bg-rose-400 text-white text-[10px] rounded-lg font-medium">条件删除</button>
              <button className="h-8 px-3 bg-blue-400 text-white text-[10px] rounded-lg font-medium">权限移交</button>
              <button className="h-8 px-3 bg-orange-400 text-white text-[10px] rounded-lg font-medium">匹配派单员</button>
              <button className="h-8 px-3 bg-blue-400 text-white text-[10px] rounded-lg font-medium">离线任务</button>
              <button className="h-8 px-3 bg-rose-400 text-white text-[10px] rounded-lg font-medium">删除离线任务</button>
            </div>
          </div>
        );
      case "接单权限":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">用户名</span><input type="text" placeholder="请输入内容" className="w-28 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">师傅uid</span><input type="text" placeholder="请输入内容" className="w-28 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">地域名</span><input type="text" placeholder="如：北京" className="w-28 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">项目名</span><input type="text" placeholder="如：修空调" className="w-28 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">派单状态</span><select className="w-24 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
              <button className="h-8 px-4 bg-rose-500 text-white text-xs rounded-lg font-medium">批量删除</button>
            </div>
          </div>
        );
      case "订单权限":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">订单来源</span><select className="w-36 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
            </div>
          </div>
        );
      case "手机信息":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">手机编号</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">手机型号</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">手机号码</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
              <button className="h-8 px-4 bg-rose-500 text-white text-xs rounded-lg font-medium">批量删除</button>
            </div>
          </div>
        );
      case "手机分配":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">批次号</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">创建时间</span><div className="flex items-center border border-gray-200 rounded-lg px-2 h-8 bg-white"><Calendar size={12} className="text-gray-300" /><input type="text" placeholder="请选择" className="text-[10px] w-28 px-1 outline-none font-mono" /><span className="text-gray-300">至</span><input type="text" placeholder="请选择" className="text-[10px] w-28 px-1 outline-none font-mono" /></div></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
              <button className="h-8 px-4 bg-rose-500 text-white text-xs rounded-lg font-medium">批量删除</button>
            </div>
          </div>
        );
      case "导出任务":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">导出编号</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">项目</span><select className="w-28 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">导出时间</span><div className="flex items-center border border-gray-200 rounded-lg px-2 h-8 bg-white"><Calendar size={12} className="text-gray-300" /><input type="text" placeholder="请选择" className="text-[10px] w-28 px-1 outline-none font-mono" /></div></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">状态</span><select className="w-24 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-rose-500 text-white text-xs rounded-lg font-medium">批量删除</button>
            </div>
          </div>
        );
      case "直派转未派":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">订单来源</span><select className="w-32 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">地域名称</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">项目名称</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
              <button className="h-8 px-4 bg-rose-500 text-white text-xs rounded-lg font-medium">条件删除</button>
            </div>
          </div>
        );
      case "号码绑定":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">客户号码</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">订单号</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">绑定类型</span><select className="w-28 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">创建时间</span><div className="flex items-center border border-gray-200 rounded-lg px-2 h-8 bg-white"><Calendar size={12} className="text-gray-300" /><input type="text" placeholder="开始日期" className="text-[10px] w-20 px-1 outline-none font-mono" /><span className="text-gray-300">至</span><input type="text" placeholder="结束日期" className="text-[10px] w-20 px-1 outline-none font-mono" /></div></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
            </div>
          </div>
        );
      case "转派权限":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">创建时间</span><div className="flex items-center border border-gray-200 rounded-lg px-2 h-8 bg-white"><Calendar size={12} className="text-gray-300" /><input type="text" placeholder="开始日期" className="text-[10px] w-20 px-1 outline-none font-mono" /><span className="text-gray-300">至</span><input type="text" placeholder="结束日期" className="text-[10px] w-20 px-1 outline-none font-mono" /></div></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">转派人</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
              <button className="h-8 px-4 bg-rose-500 text-white text-xs rounded-lg font-medium">批量删除</button>
            </div>
          </div>
        );
      case "线下师傅":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">师傅</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">师傅电话</span><input type="text" placeholder="请输入内容" className="w-32 h-8 px-3 border border-gray-200 rounded-lg text-xs font-mono" /></div>
            <div className="flex items-center gap-2"><span className="text-xs text-gray-500 whitespace-nowrap">状态</span><select className="w-28 h-8 border border-gray-200 rounded-lg text-xs text-gray-400 appearance-none bg-white px-3"><option>请选择</option></select></div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-5 bg-blue-500 text-white text-xs rounded-lg font-medium">搜索</button>
              <button className="h-8 px-5 bg-white border border-gray-200 text-gray-500 text-xs rounded-lg font-medium">重置</button>
              <button className="h-8 px-4 bg-blue-500 text-white text-xs rounded-lg font-medium">新增</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white p-5 mb-4 border border-gray-200 shadow-sm rounded-2xl shrink-0">
      {renderContent()}
    </div>
  );
};

// --- 主应用 ---

const App = () => {
  const [selectedAction, setSelectedAction] = useState<ActionType>("直派转未派");
  const [robotSubTab, setRobotSubTab] = useState("快商通");
  const [pageSize, setPageSize] = useState(20); // 默认 20 条/页
  const [currentPage, setCurrentPage] = useState(1);

  const currentDataRaw = useMemo(() => generateMockData(selectedAction, robotSubTab), [selectedAction, robotSubTab]);
  const totalItems = currentDataRaw.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentData = currentDataRaw.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const renderTableHeader = () => {
    switch(selectedAction) {
      case "机器人录单配置":
        if (robotSubTab === "天润融通") {
          return (
            <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
              <th className="px-6 py-3 w-16">序号</th>
              <th className="px-6 py-3">部门</th>
              <th className="px-6 py-3">400号码</th>
              <th className="px-6 py-3">订单来源</th>
              <th className="px-6 py-3">平台</th>
              <th className="px-6 py-3 text-center">操作</th>
            </tr>
          );
        }
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-6 py-3 w-16">序号</th>
            <th className="px-6 py-3">店铺ID</th>
            <th className="px-6 py-3">店铺名称</th>
            <th className="px-6 py-3">订单来源</th>
            <th className="px-6 py-3">手机编号</th>
            <th className="px-6 py-3 text-center">操作</th>
          </tr>
        );
      case "个人配置":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-6 py-3 w-16">序号</th>
            <th className="px-6 py-3">用户名</th>
            <th className="px-6 py-3">配置项</th>
            <th className="px-6 py-3">配置值</th>
            <th className="px-6 py-3">配置说明</th>
            <th className="px-6 py-3">备注</th>
            <th className="px-6 py-3 text-center">操作</th>
          </tr>
        );
      case "导出配置":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-4 py-3 w-16 text-center">序号</th>
            <th className="px-4 py-3">创建人</th>
            <th className="px-4 py-3">导出模块</th>
            <th className="px-4 py-3">密码</th>
            <th className="px-4 py-3">备注</th>
            <th className="px-4 py-3">角色id</th>
            <th className="px-4 py-3">角色名</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-6 py-3 text-center">操作</th>
          </tr>
        );
      case "项目管理":
        return (
          <tr className="border-b border-[#cbd5e1] text-[10px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-2 py-3">项目编号 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">项目名称 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">超时 (单位: 分钟) <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">紧急程度 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">排序 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">层级 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">状态 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">关键字 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-2 py-3">项目图片</th>
            <th className="px-2 py-3">项目提示语</th>
            <th className="px-2 py-3">备注</th>
            <th className="px-4 py-3 text-center">操作</th>
          </tr>
        );
      case "地域管理":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-6 py-3">编号 <ChevronUp size={10} className="inline" /></th>
            <th className="px-6 py-3">代码 <ChevronUp size={10} className="inline" /></th>
            <th className="px-6 py-3">名称 <ChevronUp size={10} className="inline" /></th>
            <th className="px-6 py-3">全称 <ChevronUp size={10} className="inline" /></th>
            <th className="px-6 py-3">是否生效</th>
            <th className="px-6 py-3">层级 <ChevronUp size={10} className="inline" /></th>
            <th className="px-6 py-3 text-center">操作</th>
          </tr>
        );
      case "派单权限":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-4 py-3">序号</th>
            <th className="px-4 py-3">用户编号 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3">用户名 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3">负责项目</th>
            <th className="px-4 py-3">负责地域</th>
            <th className="px-4 py-3">订单来源</th>
            <th className="px-4 py-3">生效时段</th>
            <th className="px-4 py-3 text-center">操作</th>
          </tr>
        );
      case "接单权限":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-4 py-3">序号</th>
            <th className="px-4 py-3">用户名</th>
            <th className="px-4 py-3">手机号码</th>
            <th className="px-4 py-3">师傅uid</th>
            <th className="px-4 py-3">项目</th>
            <th className="px-6 py-3 w-[200px]">地域</th>
            <th className="px-4 py-3">派单状态</th>
            <th className="px-4 py-3 text-center">操作</th>
          </tr>
        );
      case "订单权限":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-6 py-3 w-16">序号</th>
            <th className="px-6 py-3">订单来源</th>
            <th className="px-6 py-3 text-center">操作</th>
          </tr>
        );
      case "手机信息":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-4 py-3">序号</th>
            <th className="px-4 py-3">手机ID</th>
            <th className="px-4 py-3">手机编号</th>
            <th className="px-4 py-3">手机号码</th>
            <th className="px-4 py-3">手机型号</th>
            <th className="px-4 py-3">分数</th>
            <th className="px-4 py-3">状态</th>
            <th className="px-4 py-3">图片</th>
            <th className="px-4 py-3">备注 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3 text-center">操作</th>
          </tr>
        );
      case "手机分配":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-4 py-3">序号</th>
            <th className="px-4 py-3">批次号 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3">人数 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3">手机数 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3">创建人 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3">创建时间 <ChevronUp size={10} className="inline" /></th>
            <th className="px-4 py-3 text-center">操作</th>
          </tr>
        );
      case "导出任务":
        return (
          <tr className="border-b border-[#cbd5e1] text-[11px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-4 py-3">序号</th>
            <th className="px-4 py-3">导出编号</th>
            <th className="px-4 py-3">创建者</th>
            <th className="px-4 py-3">数据条数</th>
            <th className="px-4 py-3">导出状态</th>
            <th className="px-4 py-3">项目</th>
            <th className="px-4 py-3">文件名称</th>
            <th className="px-4 py-3">文件大小 (KB)</th>
            <th className="px-4 py-3">耗时 (秒)</th>
            <th className="px-4 py-3">导出开始时间</th>
            <th className="px-4 py-3">导出结束时间</th>
            <th className="px-4 py-3 text-center">操作</th>
          </tr>
        );
      case "号码绑定":
        return (
          <tr className="border-b border-[#cbd5e1] text-[10px] text-gray-600 bg-slate-50/50">
            <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded" /></th>
            <th className="px-4 py-3">创建时间 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-4 py-3">创建者</th>
            <th className="px-4 py-3 text-center">状态</th>
            <th className="px-4 py-3">期待城市</th>
            <th className="px-4 py-3">虚拟号码</th>
            <th className="px-2 py-3 w-16">分机号</th>
            <th className="px-4 py-3">客户号码</th>
            <th className="px-4 py-3">本机号码</th>
            <th className="px-4 py-3">订单号</th>
            <th className="px-4 py-3">绑定类型</th>
            <th className="px-4 py-3">号码池</th>
            <th className="px-4 py-3">解绑时间</th>
            <th className="px-4 py-3">到期时间 <ChevronUp size={10} className="inline ml-1" /></th>
            <th className="px-4 py-3 text-center">操作</th>
          </tr>
        );
      default:
        return (
          <tr className="border-b border-[#cbd5e1] text-xs text-gray-600 bg-slate-50/50">
            <th className="px-6 py-3 w-20 text-center">序号</th>
            <th className="px-6 py-3">订单来源</th>
            <th className="px-6 py-3">地域</th>
            <th className="px-6 py-3">项目</th>
            <th className="px-6 py-3 text-center">操作</th>
          </tr>
        );
    }
  };

  const renderTableRow = (order: OrderData) => {
    // 隔行变色：加深约 30%，使用 even:bg-[#FFF0F0] (Light Red)
    // 每一行的分割线颜色为：#cbd5e1
    const rowClass = "text-gray-600 transition-colors hover:bg-red-50/80 even:bg-[#FFF0F0] border-b border-[#cbd5e1]";
    
    switch(selectedAction) {
      case "机器人录单配置":
        if (robotSubTab === "天润融通") {
          return (
            <tr key={order.id} className={`${rowClass} text-[11px] h-12`}>
              <td className="px-6 py-2 font-mono">{order.id}</td>
              <td className="px-6 py-2">{order.dept}</td>
              <td className="px-6 py-2 font-mono">{order.phone400}</td>
              <td className="px-6 py-2">{order.source}</td>
              <td className="px-6 py-2 text-gray-400">{order.platform}</td>
              <td className="px-6 py-2 text-center">
                <span className="text-rose-400 cursor-pointer hover:underline font-medium">删除</span>
              </td>
            </tr>
          );
        }
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-12`}>
            <td className="px-6 py-2 font-mono">{order.id}</td>
            <td className="px-6 py-2 font-mono">{order.shopId}</td>
            <td className="px-6 py-2">{order.shopName}</td>
            <td className="px-6 py-2">{order.source}</td>
            <td className="px-6 py-2 font-mono">{order.phoneNo}</td>
            <td className="px-6 py-2 text-center">
              <span className="text-rose-400 cursor-pointer hover:underline font-medium">删除</span>
            </td>
          </tr>
        );
      case "个人配置":
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-12`}>
            <td className="px-6 py-2 font-mono">{order.id}</td>
            <td className="px-6 py-2">{order.username}</td>
            <td className="px-6 py-2">{order.configItem}</td>
            <td className="px-6 py-2 text-gray-400 font-mono">{order.configValue}</td>
            <td className="px-6 py-2 text-gray-400">{order.configDesc}</td>
            <td className="px-6 py-2 text-gray-400">{order.remark}</td>
            <td className="px-6 py-2 text-center text-blue-400 space-x-2 font-medium">
              <span className="cursor-pointer hover:underline">修改</span>
              <span className="text-rose-400 cursor-pointer hover:underline">删除</span>
            </td>
          </tr>
        );
      case "导出配置":
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-12`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-4 py-2 text-center font-mono">{order.id}</td>
            <td className="px-4 py-2">{order.creator}</td>
            <td className="px-4 py-2">{order.module}</td>
            <td className="px-4 py-2 font-mono">{order.password}</td>
            <td className="px-4 py-2">{order.remark}</td>
            <td className="px-4 py-2 font-mono">{order.roleId}</td>
            <td className="px-4 py-2">{order.roleName}</td>
            <td className="px-4 py-2 text-emerald-500 font-medium">{order.status}</td>
            <td className="px-6 py-2 text-center text-blue-400 space-x-2 font-medium">
              <span className="cursor-pointer hover:underline">修改</span>
              <span className="cursor-pointer hover:underline">配置</span>
              <span className="text-rose-400 cursor-pointer hover:underline">删除</span>
            </td>
          </tr>
        );
      case "项目管理":
        return (
          <tr key={order.id} className={`${rowClass} text-[10px] h-10`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-2 py-2 font-mono">{order.pNo}</td>
            <td className="px-2 py-2">{order.pName}</td>
            <td className="px-2 py-2 font-mono">{order.timeout}</td>
            <td className="px-2 py-2">{order.urgency}</td>
            <td className="px-2 py-2 font-mono">{order.sort}</td>
            <td className="px-2 py-2 font-mono">{order.level}</td>
            <td className="px-2 py-2">{order.status}</td>
            <td className="px-2 py-2">{order.keywords}</td>
            <td className="px-2 py-2">{order.image}</td>
            <td className="px-2 py-2">{order.tip}</td>
            <td className="px-2 py-2">{order.remark}</td>
            <td className="px-4 py-2 text-center text-blue-400 cursor-pointer hover:underline">修改</td>
          </tr>
        );
      case "地域管理":
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-10`}>
            <td className="px-6 py-2 font-mono">{order.id}</td>
            <td className="px-6 py-2 font-mono">{order.code}</td>
            <td className="px-6 py-2">{order.name}</td>
            <td className="px-6 py-2">{order.fullName}</td>
            <td className="px-6 py-2 text-blue-500 font-medium">生效</td>
            <td className="px-6 py-2 font-mono">{order.level}</td>
            <td className="px-6 py-2 text-center text-blue-400 cursor-pointer hover:underline">修改</td>
          </tr>
        );
      case "派单权限":
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-10`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-4 py-2 font-mono">{order.id}</td>
            <td className="px-4 py-2 font-mono">{order.uNo}</td>
            <td className="px-4 py-2">{order.username}</td>
            <td className="px-4 py-2">{order.projects}</td>
            <td className="px-4 py-2">{order.regions}</td>
            <td className="px-4 py-2">{order.source}</td>
            <td className="px-4 py-2 font-mono">{order.period}</td>
            <td className="px-4 py-2 text-center text-blue-400 cursor-pointer hover:underline">修改</td>
          </tr>
        );
      case "接单权限":
        return (
          <tr key={order.id} className={`${rowClass} text-[10px] h-12`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-4 py-2 font-mono">{order.id}</td>
            <td className="px-4 py-2">{order.username}</td>
            <td className="px-4 py-2 font-mono">{order.phone}</td>
            <td className="px-4 py-2 font-mono">{order.mUid}</td>
            <td className="px-4 py-2 truncate max-w-[150px]">{order.project}</td>
            <td className="px-6 py-2 text-[9px] text-gray-400 leading-tight">{order.region}</td>
            <td className="px-4 py-2">{order.status}</td>
            <td className="px-4 py-2 text-center text-blue-400 space-x-2">
              <span className="cursor-pointer hover:underline">额外新增</span>
              <span className="cursor-pointer hover:underline">修改</span>
              <span className="text-rose-400 cursor-pointer hover:underline">删除</span>
            </td>
          </tr>
        );
      case "订单权限":
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-10`}>
            <td className="px-6 py-2 font-mono">{order.id}</td>
            <td className="px-6 py-2">{order.source}</td>
            <td className="px-6 py-2 text-center text-rose-400 cursor-pointer hover:underline">删除</td>
          </tr>
        );
      case "手机信息":
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-10`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-4 py-2 font-mono">{order.id}</td>
            <td className="px-4 py-2 font-mono">{order.phoneId}</td>
            <td className="px-4 py-2 font-mono">{order.phoneNo}</td>
            <td className="px-4 py-2 font-mono">{order.phoneNumber}</td>
            <td className="px-4 py-2">{order.model}</td>
            <td className="px-4 py-2 font-mono">{order.score}</td>
            <td className="px-4 py-2 text-blue-400 font-medium">生效</td>
            <td className="px-4 py-2">{order.image}</td>
            <td className="px-4 py-2">{order.remark}</td>
            <td className="px-4 py-2 text-center text-blue-400 space-x-2">
              <span className="cursor-pointer hover:underline">修改</span>
              <span className="text-rose-400 cursor-pointer hover:underline">删除</span>
            </td>
          </tr>
        );
      case "手机分配":
        return (
          <tr key={order.id} className={`${rowClass} text-[11px] h-10`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-4 py-2 font-mono">{order.id}</td>
            <td className="px-4 py-2 font-mono">{order.batchNo}</td>
            <td className="px-4 py-2 font-mono">{order.peopleCount}</td>
            <td className="px-4 py-2 font-mono">{order.phoneCount}</td>
            <td className="px-4 py-2">{order.creator}</td>
            <td className="px-4 py-2 font-mono">{order.createTime}</td>
            <td className="px-4 py-2 text-center text-blue-400 space-x-2 font-medium">
              <span className="cursor-pointer hover:underline">快速分配</span>
              <span className="cursor-pointer hover:underline">分配详情</span>
              <span className="text-rose-400 cursor-pointer hover:underline">删除</span>
            </td>
          </tr>
        );
      case "导出任务":
        return (
          <tr key={order.id} className={`${rowClass} text-[10px] h-10`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-4 py-2 font-mono">{order.id}</td>
            <td className="px-4 py-2 font-mono">{order.exportNo}</td>
            <td className="px-4 py-2">{order.creator}</td>
            <td className="px-4 py-2 font-mono">{order.count}</td>
            <td className="px-4 py-2 text-emerald-500 font-medium">{order.status}</td>
            <td className="px-4 py-2">{order.project}</td>
            <td className="px-4 py-2">{order.filename}</td>
            <td className="px-4 py-2 font-mono">{order.size}</td>
            <td className="px-4 py-2 font-mono">{order.duration}</td>
            <td className="px-4 py-2 font-mono">{order.startTime}</td>
            <td className="px-4 py-2 font-mono">{order.endTime}</td>
            <td className="px-4 py-2 text-center text-blue-400 cursor-pointer hover:underline font-medium">下载</td>
          </tr>
        );
      case "号码绑定":
        return (
          <tr key={order.id} className={`${rowClass} text-[10px] h-10`}>
            <td className="px-4 py-2 text-center"><input type="checkbox" className="rounded border-gray-200" /></td>
            <td className="px-4 py-2 whitespace-nowrap font-mono">{order.createTime}</td>
            <td className="px-4 py-2">{order.creator}</td>
            <td className="px-4 py-2 text-center">
              <span className="px-2 py-0.5 bg-rose-50 text-rose-300 border border-rose-100 rounded text-[9px]">{order.status}</span>
            </td>
            <td className="px-4 py-2">{order.city}</td>
            <td className="px-4 py-2 font-mono">{order.vNumber}</td>
            <td className="px-2 py-2 font-mono">{order.ext}</td>
            <td className="px-4 py-2 font-mono">{order.cPhone}</td>
            <td className="px-4 py-2 font-mono">{order.mPhone}</td>
            <td className="px-4 py-2 font-mono">{order.orderId}</td>
            <td className="px-4 py-2">{order.bindType}</td>
            <td className="px-4 py-2 truncate max-w-[80px] font-mono">{order.pool}</td>
            <td className="px-4 py-2 font-mono">{order.unbindTime}</td>
            <td className="px-4 py-2 whitespace-nowrap font-mono">{order.expireTime}</td>
            <td className="px-4 py-2 text-center text-blue-400 cursor-pointer hover:underline font-medium">通话记录</td>
          </tr>
        );
      default:
        return (
          <tr key={order.id} className={`${rowClass} text-xs h-10`}>
            <td className="px-6 py-2 text-center font-mono">{order.id}</td>
            <td className="px-6 py-2">{order.source}</td>
            <td className="px-6 py-2">{order.region}</td>
            <td className="px-6 py-2">{order.project}</td>
            <td className="px-6 py-2 text-center text-blue-400 space-x-3 font-medium">
              <span className="cursor-pointer hover:underline">修改</span>
              <span className="text-rose-400 cursor-pointer hover:underline">删除</span>
            </td>
          </tr>
        );
    }
  };

  return (
    <div className="h-screen bg-slate-50 p-6 flex flex-col font-sans overflow-hidden">
      <NotificationBar />
      <QuickActions active={selectedAction} onSelect={(val) => { setSelectedAction(val); setCurrentPage(1); }} />
      <SearchPanel 
        action={selectedAction} 
        activeTab={robotSubTab}
        onTabChange={(tab) => { setRobotSubTab(tab); setCurrentPage(1); }}
      />
      
      <div className="bg-white shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden rounded-2xl">
        <div className="overflow-auto flex-1 w-full">
          <table className="w-full text-left border-collapse table-fixed min-w-full">
            <thead className="sticky top-0 z-10">
              {renderTableHeader()}
            </thead>
            {/* Removed 'divide-y' from tbody to prevent double borders and conflicts with the row-specific border-b */}
            <tbody className="">
              {currentData.map((order) => renderTableRow(order))}
            </tbody>
          </table>
        </div>

        {/* 分页 - 样式优化 - 完美复刻 */}
        <div className="bg-white px-6 py-3 border-t border-gray-200 flex justify-center items-center text-[13px] text-[#606266] gap-3 shrink-0 select-none">
            {/* Total */}
            <span className="text-[#606266]">共 {totalItems} 条</span>
            
            {/* Page Size */}
            <div className="relative">
                <select 
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                    className="appearance-none border border-[#dcdfe6] rounded px-2 py-1 bg-white h-7 leading-none cursor-pointer pr-7 focus:outline-none focus:border-[#409eff] hover:border-[#c0c4cc] transition-colors text-[#606266]"
                >
                    <option value={10}>10条/页</option>
                    <option value={20}>20条/页</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-2 text-[#c0c4cc] pointer-events-none" />
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1 select-none mx-2">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1} 
                    className="w-7 h-7 flex items-center justify-center text-[#c0c4cc] hover:text-[#409eff] disabled:text-[#e4e7ed] disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft size={14} />
                </button>
                
                {Array.from({ length: Math.min(6, totalPages) }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = currentPage === pageNum;
                    return (
                        <button 
                            key={i} 
                            onClick={() => setCurrentPage(pageNum)} 
                            className={`min-w-[28px] h-7 flex items-center justify-center rounded font-normal transition-colors ${
                                isActive 
                                    ? 'text-[#409eff] font-bold cursor-default' 
                                    : 'text-[#606266] hover:text-[#409eff]'
                            }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages} 
                    className="w-7 h-7 flex items-center justify-center text-[#c0c4cc] hover:text-[#409eff] disabled:text-[#e4e7ed] disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Jump to */}
            <div className="flex items-center gap-2">
                <span>前往</span>
                <input 
                    type="number" 
                    min={1} 
                    max={totalPages} 
                    value={currentPage} 
                    onChange={(e) => { 
                        const val = parseInt(e.target.value); 
                        if (!isNaN(val) && val >= 1 && val <= totalPages) setCurrentPage(val); 
                    }} 
                    className="w-12 h-7 border border-[#dcdfe6] rounded text-center focus:outline-none focus:border-[#409eff] hover:border-[#c0c4cc] transition-colors font-mono text-[#606266]" 
                />
                <span>页</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) { const root = createRoot(container); root.render(<App />); }
