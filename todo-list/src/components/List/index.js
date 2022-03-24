import React, { Component } from 'react'
import moment from 'moment';
import { Input,Button ,Form,Tooltip,Modal,DatePicker } from 'antd';
import './index.css'
import {nanoid} from 'nanoid'
import PubSub from 'pubsub-js'
import {
    EllipsisOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
const { TextArea } = Input;
const { confirm } = Modal

export default class index extends Component {
    form = React.createRef()
    updateform = React.createRef()
    state = {
        isShowAddtoDoInp:false,
        todoTitle:'',
        todoContent:'',
        time:'2020-10-10',
        dataList:[],
        isModalVisible:false,
    }


   componentDidMount(){
    let todoList = sessionStorage.getItem('todo')? JSON.parse(sessionStorage.getItem('todo')):[]
    this.setState({
        dataList:todoList
    })
    PubSub.subscribe('dataListMsg',(_, data) => { 
        this.setState({
            dataList:data
        }) 
    })
   }
   
  render() {
    return (
      <div className='listContainer'>
          <div className='headerDate'>
                <div className='date'>
                <div>今天</div>
                <span>{`${moment().format("YYYY-MM-DD")} / 星期${moment().format("d")}`}</span>
                </div>
                <div className='score date'onClick={this.soreFun}>
                    <span>时间排序</span>
                </div>
         </div>
        {
            !this.state.isShowAddtoDoInp ? 
           ( <div  className='addbtn' onClick={()=>this.ShowAddTodo(true)}> 
                <span className='add'>+</span>
                <span className='btn'>添加一个任务</span>
            </div>) : 
             <Form  onFinish={this.onFinish} ref={this.form}>
                <div className='inpGropu'>
                    <Form.Item   rules={[{ required: true ,message:'请填写todoList标题'}]} name="todoTitle" >
                        <Input   placeholder="例如L：每天读书" bordered={false} className='input'  />
                    </Form.Item>
                    <Form.Item   rules={[{ required: true ,message:'请填写todoList描述'}]} name="todoContent" >
                        <TextArea placeholder="描述一下。。。" autoSize={false} showCount maxLength={100} bordered={false} style={{ height: 150 }}  />
                    </Form.Item>
                    <div className='footer'>
                        <div>
                           <DatePicker  placeholder="日程安排" className='calbtn' onChange={this.onDatePickerChange} />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className='comfirmBtn'>
                <Form.Item  >
                    <Button htmlType="submit"   danger type="primary" className='confirm' value="large" >确认</Button>
                    <Button  className='consel' value="large" onClick={()=>this.ShowAddTodo(false)}>取消</Button>
                 </Form.Item>
                </div>
             </Form>

        }
        {
           this.state.dataList.map(item=>(
            <div className='listItem' key={item.id}>
                <div className='ItemText'>
                    <div className='radioIcon' onClick={()=>this.isDoneTodo(item.id)} ></div>
                    <div className='radioText'>
                        <h3 >{item.todoTitle}</h3>
                        <div>{item.todoContent}</div>
                    </div>
                </div>
               <div>
               <span className='timecak'>{item.time}</span>
                 <Tooltip color='#fff' title={()=>
                     <>
                      <div>
                      <Button type='text' size='small' onClick={()=>this.updateTodo(item)}>修改</Button>
                      </div>
                      <Button type="text" size='small' onClick={()=>this.removeTodo(item.id)}>删除</Button>
                     </>
                 }>
                  <EllipsisOutlined />
                </Tooltip>
               </div>
            </div>
         ))
        }
         <>
            <Modal destroyOnClose={true} title="修改todo" closable={null}  footer={null} visible={this.state.isModalVisible}>
              <Form  onFinish={this.onupdateFinish} ref={this.updateform}>
                <div className='inpGropu'>
                    <Form.Item   rules={[{ required: true ,message:'请填写todoList标题'}]} name="todoTitle" >
                        <Input placeholder="例如L：每天读书" bordered={false} className='input'  />
                    </Form.Item>
                    <Form.Item   rules={[{ required: true ,message:'请填写todoList描述'}]} name="todoContent" >
                        <TextArea placeholder="描述一下。。。" autoSize={false} showCount maxLength={100} bordered={false} style={{ height: 150 }}  />
                    </Form.Item>
                    <div className='footer'>
                        <div>
                            <DatePicker  defaultValue={moment(this.state.time)}  placeholder="日程安排" className='calbtn' onChange={this.onDatePickerChange} />
                        </div>
                    </div>
                </div>

                <div className='comfirmBtn'>
                <Form.Item  >
                    <Button htmlType="submit"  danger type="primary" className='confirm' value="large" >确认</Button>
                    <Button  className='consel' value="large" onClick={()=>this.setState({isModalVisible:false})}>取消</Button>
                 </Form.Item>
                <Form.Item  name="id"  style={{dispaly:'none'}} ></Form.Item>

                </div>
             </Form>
          
            </Modal>
        </>
      </div>
    )
  }
  onDatePickerChange = (date, dateString)=>{
    this.setState({
        time:dateString
    })
  }
  removeTodo = id =>{
    Modal.destroyAll();
    confirm({
        icon: <ExclamationCircleOutlined />,
        content: '是否确定删除这条事项？',
        cancelText:"取消",
        okText:"确定删除",
        onOk :() => {
            let todoList = sessionStorage.getItem('todo')? JSON.parse(sessionStorage.getItem('todo')):[]
            let newData = todoList.filter(item=>item.id !== id )
            this.setState({
                dataList:newData
            })
            sessionStorage.setItem('todo',JSON.stringify([...newData]))
           
        },
        onCancel() {
          console.log('Cancel');
        },
        })
  }
  onFinish = (fromdata) => {
     if(!this.state.time) {
         this.setState({
           time: moment().format("YYYY-MM-DD")
         })
     }
      let obj =  {
          id:nanoid(),
          ...fromdata,
          isToDo:false,
          time:this.state.time
      }
    let todoList = sessionStorage.getItem('todo')? JSON.parse(sessionStorage.getItem('todo')):[]
    this.setState({
        dataList:[obj,...todoList]
    })
    sessionStorage.setItem('todo',JSON.stringify([obj,...todoList]))
    this.form.current.resetFields();
    this.setState({
        time:moment().format("YYYY-MM-DD")
    })
  }
  soreFun = () =>{
      let res = this.state.dataList.sort((a,b)=>{return a.time.split('-').join('')-b.time.split('-').join('')})
      this.setState({
          dataList:res
      })
  }
  onupdateFinish = (data) =>{
    const { dataList } = this.state
    let arr = dataList.reduce((res, item) => {
        if(item.id === data.id) {
            console.log(1);
            item.todoTitle = data.todoTitle
            item.todoContent = data.todoContent
            item.time = this.state.time
        }
        return [...res, item];
    }, []);
    this.setState({
        dataList:arr
    })
    sessionStorage.setItem('todo',JSON.stringify(arr))
    this.setState({
         time:moment().format("YYYY-MM-DD"),
         isModalVisible:false
    })
  }
  ShowAddTodo = status =>{
    this.setState({
        isShowAddtoDoInp:status
    })
  }
  isDoneTodo = (id) =>{

    Modal.destroyAll();
    confirm({
        icon: <ExclamationCircleOutlined />,
        content: '是否确定已完成这项工作？',
        cancelText:"取消",
        okText:"已完成",
        onOk :() => {
            const { dataList } = this.state
            let arr = dataList.reduce((res, item) => {
                if(item.id === id) {
                    item.isToDo = !item.isToDo
                }
                return [...res, item];
            }, []);
            // console.log(arr); //修改后的
            let newList = arr.filter(item=>item.isToDo !=true)

            this.setState({
                dataList:newList
            })
            sessionStorage.setItem('todo',JSON.stringify(newList))
        },
        onCancel() {
          console.log('Cancel');
        },
        })

   
  }
  updateTodo = (item) =>{
    this.setState({
        isModalVisible:true,
        time:item.time
    })
   setTimeout(() => {
       this.updateform.current.setFieldsValue({
          ...item
       }) 
   }, );
   
  }
}
