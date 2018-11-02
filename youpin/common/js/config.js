module.exports = {
  LOCALHOST: "http://221.228.109.114:8091", // 本地test
  // LOCALHOST: "https://wechat.fundog.cn", // https://wechat.fundog.cn
  HTTP: 'https://',
  API: {
    xcx_onlogin: "/connect/onlogin", //登录
    xcx_signin: "/connect/signin", //授权关联登录 
    home_banner: "/home/banner", //首页banner
    activity_special_goods: "/activity/special_goods", //特价产品
    goods_detail: "/goods/detail", //商品详情
    order_fast_create: "/order/fast_create", //检测订单
    shipping_get_shippings: "/shipping/get_shippings", //配送方式
    order: "/order", //订单列表
    address_add: "/address/add", //添加收货地址
    address_update: "/address/update", //编辑更新收货地址
    address_setdefault: "/address/setdefault", //设置默认收货地址
    address_delete: "/address/delete", //删除收货地址
    address: "/address", //地址列表
    region : "/region", //获取省市区信息
    order_fast_submit: "/order/fast_submit", //提交订单
    act_nomoney_buy: "/activity/nomoney_buy", //零元购
    act_direct_mail: "/activity/direct_mail", //香港直邮
    bind_idcard: "/address/bind_idcard", //身份证绑定
    orderpay_wxpay: "/orderpay/wxpay", //小程序支付
    Goodsactivity: "/Goodsactivity", //首页拼团商品列表
    list_goods_activity: "/Goodsactivity/list_goods_activity", //拼团列表
    group_activity_goods_info: "/Goodsactivity/group_activity_goods_info", //拼团详情
    group_dynamic_info_list: "/Goodsactivity/group_dynamic_info_list", //更多拼团信息
    groupbuy_create_order: "/Groupbuyorder/launch_groupbuy_activity_create_order", //一键开团
    submit_groupbuy_activity: "/Groupbuyorder/submit_groupbuy_activity", //团购提交
    Usergroupbuy: "/Usergroupbuy", //团购订单
    get_my_groupbuy_view: "/Usergroupbuy/get_my_groupbuy_view", //团购订单详情
    direct_groupbuy_create_order: "/Groupbuyorder/direct_groupbuy_activity_create_order", //单独购买
    join_groupbuy_create_order: "/Groupbuyorder/join_groupbuy_activity_create_order", //加入团购
    Usergroupbuy_refund: "/Usergroupbuy/refund", //拼团退款详情
    refunds_money: "/Refunds/refunds_money" //拼团退款提交
  },
  secretkey: '5A7C69EF22BE9BDF56F10EB268E80648',
  header: {
    method: 'POST',
    headers: {
      appver: '0.0.1',
      noncestr: '',
      platform: '2',
      uuid: '',
      sign: '',
    }
  }
}