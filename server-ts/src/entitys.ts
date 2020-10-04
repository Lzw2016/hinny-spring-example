export const cleverTemplate = {
    /** 订单表 */
    HybOrders: "hyb_orders",
    /** 订单明细表 */
    HybOrdersItems: "hyb_orders_items",
    /** 权限表 */
    Permission: "permission",
    /** 订单去重明细表 */
    TbOrderDetailDistinct: "tb_order_detail_distinct",
    /** 订单主表 */
    TbOrderMain: "tb_order_main",
    /**  */
    Test: "test",
}

/** 订单表 */
export interface HybOrders {
    /** 订单ID */
    orderId: JLong;
    /** 订单编号 */
    orderCode: JString;
    /** 订单状态(-3=待审核 / -2=待支付 / -1=待处理 / 0=已接单 / 1=已出库 / 2=已签收 / 3=已驳回 4=拒收 5=已取消) */
    status: JInt;
    /** 会员id */
    customId: JLong;
    /** 登录代理ID */
    userAgentId: JLong;
    /** 收货人姓名 */
    shipName: JString;
    /** 地址 */
    shipAddr: JString;
    /** 手机号 */
    shipMobile: JString;
    /** 收货地址经度 */
    shipLng: JBigDecimal;
    /** 收货地址纬度 */
    shipLat: JBigDecimal;
    /** 接单药店 */
    merchantId: JLong;
    /** 订单类型(1.O2O2.B2C) */
    orderType: JInt;
    /** 支付方式(-1.暂无,0.现金支付,1.微信支付,2.支付宝，3.三方平台线上支付, 4 小程序 5 保险支付 45 微信小程序+保险 6 pad微信支付) */
    payType: JInt;
    /** 支付状态 0 未支付  1 已支付 */
    payStatus: JInt;
    /** 支付时间 */
    payTime: JSqlTimestamp;
    /** 支付金额 */
    payAmount: JBigDecimal;
    /** 平台优惠金额 */
    platformAmount: JBigDecimal;
    /** 商家优惠金额 */
    businessAmount: JBigDecimal;
    /** 包装费 */
    packageAmount: JBigDecimal;
    /** 运费 */
    freightAmount: JBigDecimal;
    /** 订单总额 */
    orderAmount: JBigDecimal;
    /** 预计送达时间 */
    deliveryTime: JSqlTimestamp;
    /** 配送方式(1配送 2用户自提 3快递) */
    logisticsPlatype: JInt;
    /** 下单时间 */
    createTime: JSqlTimestamp;
    /**  */
    note: JString;
    /** 删除状态 0 未删除  1 已删除 */
    deleteFlag: JInt;
    /** 建立时间 */
    createAt: JSqlTimestamp;
    /** 更新日期 */
    updateAt: JSqlTimestamp;
    /** 满减金额 */
    fullPrice: JBigDecimal;
    /** 商家优惠券金额 */
    businessPrice: JBigDecimal;
    /** 折扣优惠金额 */
    discountPrice: JBigDecimal;
    /** 三方平台单号 */
    thirdplatformCode: JString;
    /** 订单来源（0-好药师APP,1-998微店,2-998小程序,3-998pad,10-其他,11-京东到家，12-饿了么，13-美团外卖，14-百度外卖,18-平安好医生,20-京东健康,37-百度医疗） */
    sourceType: JInt;
    /** 订单来源(0互药帮;1好药师;) */
    orderSource: JInt;
    /** 门店是否下账 0否 1是 */
    isAccount: JInt;
    /** 订单状态处理中(0否，1是) */
    orderHandel: JInt;
    /** 药店配送服务费 */
    merchantFreight: JBigDecimal;
    /** 平台佣金 */
    merchantCommission: JBigDecimal;
    /** 财务对账系统未匹配订单说明 */
    financeNotMatchEx: JString;
    /** 首单立减金额 */
    reduceAmount: JBigDecimal;
    /** 是否享受下单立减优惠(0不享受,1享受) */
    isFirstOrder: JInt;
    /** 处方笺(图片和pdf全路径','隔开,好药师同步过来) */
    prescription: JString;
    /** 用药人ID */
    customMedicineId: JLong;
    /** 自提单提货码 */
    extractCode: JString;
    /** openid */
    openId: JString;
    /** UnionID */
    unionId: JString;
    /** 药师姓名 */
    pharmacistName: JString;
    /** 资格证书号 */
    qualificationNumber: JString;
    /** 职业药师注册证 */
    pharmacistCredentials: JString;
    /** 身份证号码 */
    idno: JString;
    /** 配送类型(0 明天送 1立即送) */
    distributionType: JInt;
    /** 开启提醒：0未开启，1已开启 */
    isRemind: JInt;
    /** 主订单编号 */
    mainOrderId: JLong;
    /** 接单时间 */
    receiveTime: JSqlTimestamp;
    /** 运费减免金额 */
    freeFreightAmount: JBigDecimal;
    /** 退款状态：0未退款，1已退款, 2退款中(多笔订单，有一笔未退款成功或者退款失败) */
    refundStatus: JInt;
    /** 网点id */
    siteId: JLong;
    /** 物流单号（快递单号） */
    logisticsNo: JString;
    /** 快递公司名称 */
    expressName: JString;
    /** 发货时间 */
    shipTime: JSqlTimestamp;
}

/** 订单明细表 */
export interface HybOrdersItems {
    /** 订单明细id */
    orderItemId: JLong;
    /** 订单ID */
    orderId: JLong;
    /** 子订单编号 */
    sepOrderId: JLong;
    /** 商品Id */
    itemId: JLong;
    /** 商家商品Id */
    merchantItemId: JLong;
    /** 数量 */
    nums: JBigDecimal;
    /** 单价 */
    price: JBigDecimal;
    /** 总价 */
    amount: JBigDecimal;
    /** 市场价格 */
    mktPrice: JBigDecimal;
    /** 生成厂家 */
    manufacturer: JString;
    /** 规格 */
    spec: JString;
    /** 批准文号 */
    approvalNumber: JString;
    /** 计量单位 */
    unit: JString;
    /** 药店定价 */
    salesPrice: JBigDecimal;
    /** 药店成本价格 */
    costPrice: JBigDecimal;
    /** 建立时间 */
    createAt: JSqlTimestamp;
    /** 更新日期 */
    updateAt: JSqlTimestamp;
    /** 是否为赠品(0:非赠品 1是赠品) */
    isGift: JInt;
    /** 折扣 */
    discount: JBigDecimal;
    /** 折后单价 */
    discountPrice: JBigDecimal;
    /** 唯一索引(各平台主键) */
    uniqueId: JLong;
    /** 药店价格 */
    pharmPrice: JBigDecimal;
    /** 药店售出数量 */
    pharmNums: JBigDecimal;
    /** 药店拆零份数 */
    piecemealStore: JInt;
    /** 处方id */
    recipeId: JLong;
    /** 商品套餐类型 0 单品   1 套餐 */
    groupType: JInt;
    /** 缩略图路径（最小） */
    thumbnailPic: JString;
    /** 商品名称 */
    itemName: JString;
    /** 商品标示(0=暂无 / 1=外用药物 / 2=保健食品 / 3=处方药 / 4=OTC) */
    identification: JInt;
    /** 简介 */
    brief: JString;
    /** B2C商品编号 */
    bn: JString;
    /** 1:好药师商品  2：998商品 */
    channelId: JInt;
    /** 活动ID */
    activityId: JLong;
    /**  */
    clerkId: JLong;
    /** 1 有处方加购标识 */
    recipeFlag: JInt;
    /** 均摊单价（邮费，优惠券，红包比例扣除后的单价） */
    averagePrice: JBigDecimal;
    /** 均摊单价标识（0 不展示均摊单价 1 展示均摊单价） */
    averageFlag: JInt;
    /** 价格标识（0 卖价 1 会员价 2 折扣 3 特价） */
    priceFlag: JInt;
    /** 商家优惠券金额 */
    businessPrice: JBigDecimal;
    /** 商家优惠金额 */
    businessAmount: JBigDecimal;
    /** 平台优惠金额 */
    platformAmount: JBigDecimal;
    /** 首单优惠金额 */
    reduceAmount: JBigDecimal;
}

/** 权限表 */
export interface Permission {
    /** 主键id */
    id: JLong;
    /** 系统(或服务)名称 */
    sysName: JString;
    /** 权限标题 */
    title: JString;
    /** 唯一权限标识字符串 */
    permissionStr: JString;
    /** 权限类型，1:web资源权限, 2:菜单权限，3:ui权限，...... */
    resourcesType: JInt;
    /** 权限说明 */
    description: JString;
    /** 创建时间 */
    createAt: JSqlTimestamp;
    /** 更新时间 */
    updateAt: JSqlTimestamp;
}

/** 订单去重明细表 */
export interface TbOrderDetailDistinct {
    /** 主键id */
    id: JLong;
    /** 店铺编号 */
    storeNo: JString;
    /** 订单编码(唯一) */
    orderCode: JString;
    /** 店铺商品编码 */
    storeProdNo: JString;
    /** ERP编码 */
    erpNo: JString;
    /** 商品名称 */
    prodName: JString;
    /** 规格 */
    prodSpecification: JString;
    /** 单位 */
    packageUnit: JString;
    /** 厂家 */
    manufacture: JString;
    /** 正面图片地址 */
    frontPic: JString;
    /** 购买数量 */
    merchandiseNumber: JBigDecimal;
    /** 出库数量 */
    outNumber: JBigDecimal;
    /** 不出库数量 */
    noOutNumber: JBigDecimal;
    /** （0-未出库，1-已出库，2-不出库，3-部分出库) */
    goodsStatus: JInt;
    /** 会员价(原价) */
    memberPrice: JBigDecimal;
    /** 均摊价 */
    averagePrice: JBigDecimal;
    /** 秒杀价格 */
    seckillPrice: JBigDecimal;
    /** 秒杀数量 */
    seckillNumber: JBigDecimal;
    /** 创建时间 */
    createAt: JSqlTimestamp;
    /** 更新时间 */
    updateAt: JSqlTimestamp;
    /** 已退款数量 */
    refundNumber: JBigDecimal;
    /** 退款申请中数量 */
    refundApplyNumber: JBigDecimal;
    /** 单个商品店铺优惠 */
    storeDiscount: JBigDecimal;
    /** 单个商品平台优惠 */
    platformDiscount: JBigDecimal;
}

/** 订单主表 */
export interface TbOrderMain {
    /** 订单id */
    orderId: JLong;
    /** user_agent_id */
    userAgentId: JLong;
    /** 站点ID */
    siteId: JLong;
    /** 店铺ID */
    storeId: JLong;
    /** 店铺编号 */
    storeNo: JString;
    /** 客户id */
    custId: JLong;
    /** 订单编号 */
    orderCode: JString;
    /** 备注 */
    notes: JString;
    /** 订单总金额 */
    totalPrice: JBigDecimal;
    /** 联系人 */
    linkMan: JString;
    /** 联系人电话 */
    linkTel: JString;
    /** 实际收货地址 */
    linkAddress: JString;
    /** 是否在线支付:1-在线支付,0-线下结算 */
    isOnlinePay: JInt;
    /** 支付状态:0-待支付,1-已支付,2-已取消,3-退款中,4-已退款 5-已完成 */
    payStatus: JInt;
    /** 客户一次提交关联的订单编号，取第一个订单 */
    mainLinkOrder: JString;
    /** 订单状态0-已创建,1-待审核,2-待处理,3-已出库,4-已驳回,5-已拒收,6-已完成,7-已取消,8-待支付 9 部分出库，10 正在开票 11 正在出库 */
    orderStatus: JInt;
    /** 订单来源,401-pc,403-wap,406-iso,407-android 408-miniapp */
    orderSource: JString;
    /** 是否开发票(1-是,0否) */
    isInvoice: JString;
    /** 发票类型(0-无发票,1-普通发票,2-专用发票) */
    invoiceType: JString;
    /** 发票-公司名称 */
    invoiceCompany: JString;
    /** 发票-纳税人识别号 */
    invoiceNo: JString;
    /** 发票-开户银行 */
    invoiceBank: JString;
    /** 发票-开户银行号 */
    invoiceBankno: JString;
    /** 发票-注册地址 */
    invoiceAddress: JString;
    /** 发票-注册电话 */
    invoiceTel: JString;
    /** 支付方式(0-在线支付，1-余额支付+在线支付，2-余额支付), 3-线下结算 */
    payType: JString;
    /** 直接在线支付金额 */
    directPayPrice: JBigDecimal;
    /** 余额支付金额 */
    balancePayPrice: JBigDecimal;
    /** 余额抵扣率 */
    yedkl: JBigDecimal;
    /** 订单支付单号 */
    orderPayNo: JString;
    /**  */
    createAt: JSqlTimestamp;
    /**  */
    updateAt: JSqlTimestamp;
    /** 实付金额 */
    realPayPrice: JBigDecimal;
    /** 出库时间 */
    outstockAt: JSqlTimestamp;
    /** 商品金额 */
    goodsPrice: JBigDecimal;
    /** 订单渠道 */
    orderChannel: JString;
    /** 店铺优惠 */
    storeDiscount: JBigDecimal;
    /** 平台优惠 */
    platformDiscount: JBigDecimal;
    /** 支付渠道(1-直连支付宝支付，2-直连微信支付 3-中金接入银联 4-中金支付宝 5-中金微信 6-招行微信 7-招行支付宝) */
    payChannel: JString;
    /** 满减优惠总额 */
    rebateSumPrice: JBigDecimal;
    /** 优惠券总金额(店铺券) */
    couponSumPrice: JBigDecimal;
    /** 订单配送费 */
    postage: JBigDecimal;
    /** 订单配送费(优惠价) */
    preferentialPostage: JBigDecimal;
    /** 是否需要下发ERP，0：不需要 1：需要 */
    needErpSyn: JInt;
    /** 下发状态(0-未下发，1-等待重试，2-下发中，3-下发成功) */
    erpSynStatus: JInt;
    /** 下发次数(重试策略算时间用) */
    erpSynCount: JInt;
    /** 商铺客户ID(下发必要条件) */
    orderStoreCustNo: JString;
    /** 最后一次下发时间 */
    lastErpSynTime: JSqlTimestamp;
    /** 已退款总金额 */
    refundSumPrice: JBigDecimal;
    /** 退款状态（0-无退款及申请，1-全部退款，2-部分退款，3-退款失败） */
    refundStatus: JInt;
    /** 子订单流水号(用于招行支付系统) */
    subOrderPayNo: JString;
    /** 退款进程状态 0:无退款或全部退款成功;1:有未完成的退款); */
    refundProcessStatus: JString;
    /** 退款总金额（申请退款总金额，申请失败需要从此金额扣减） */
    refundSum: JBigDecimal;
    /** 订单主单编号 */
    orderMainCode: JLong;
    /** 订单原始总价，不包含任何优惠的价格 */
    originalTotalPrice: JBigDecimal;
    /** 套餐组合优惠 */
    groupSumPrice: JBigDecimal;
    /** 秒杀优惠 */
    seckillSumPrice: JBigDecimal;
    /** 平台优惠券金额 */
    platformCouponAmount: JBigDecimal;
    /** 发票url */
    invoiceUrl: JString;
    /** 邀请有礼活动是否发券 0:否 1:是 */
    inviteSend: JBoolean;
}

/**  */
export interface Test {
    /**  */
    id: JLong;
    /**  */
    name: JString;
    /**  */
    age: JInt;
    /**  */
    sqlTime: JSqlTime;
    /**  */
    date: JSqlDate;
    /**  */
    year: JSqlDate;
}