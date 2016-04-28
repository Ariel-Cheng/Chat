# 用户模块
1. 用户注册

    url: `/signup`
    
    method: `POST`
    
    参数: `username=xxx&password=xxx&nickname=xxx`
    
    响应: 成功返回`{status:1}`，错误返回`{status:0, errInfo: '错误信息'}`
   
2. 用户登录

    url: `/login`
    
    method: `POST`
    
    参数: `username=xxx&password=xxx`
    
    响应: 成功返回`{status:1}`，错误返回`{status:0, errInfo: '错误信息'}`


# 消息模块

1. 发送消息

    url: `/send`
    
    method: `POST`
    
    参数: `to=接受人用户名&msg=发送的消息`
    
    响应: 成功返回`{status:1}`，错误返回`{status:0, errInfo: '错误信息'}`
   
2. 接收消息

    url: `/get`
    
    method: `POST`
    
    参数: `to=接收对方消息的用户名`
    
    响应: 成功返回`{msg:[{"msg":"xxxxx", time:"xxx"},{"msg":"xxxxx", time:"xxx"}]}`，错误返回`{status:0, errInfo: '错误信息'}`
 
 3. 获取好友列表
 
    url: `/getFriendList`
    
    method: `POST`
    
    参数: ``
    
    响应: 成功返回`{"friends":[{"nickname":"小草","username":"xiaocao"}]}`，错误返回`{status:0, errInfo: '错误信息'}`
    
  4. 添加好友
 
    url: `/addFriend`
    
    method: `POST`
    
    参数: `friend=xxxx`
    
    响应: 成功返回`{status:1}`，错误返回`{status:0, errInfo: '错误信息'}`