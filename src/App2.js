import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ListItem from './ListItem';
import loadingGif from './simple-loader.gif';

class App2 extends React.Component{

    constructor(){
        super();
        this.state = {
          newTodo : "",
          editing: false,
          editingIndex: null,
          notification: null,
          "todo": [],
          loading: true
        };

        this.apiUrl = 'https://5eed93a94cbc3400163311a6.mockapi.io/todo'

        this.handleChange = this.handleChange.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.generateNewTodoId = this.generateNewTodoId.bind(this);
        this.alert = this.alert.bind(this);

        
    }

    async componentDidMount(){
      const response = await axios.get(`${this.apiUrl}/todos`);
      setTimeout(() => 
        this.setState({
        todo : response.data,
        loading: false
      
      }), 2000);

    }

    handleChange(event){
      this.setState({
        newTodo : event.target.value
      });
    }

    async addNewTodo() {
      
      const response = await axios.post(`${this.apiUrl}/todos`,{
        name : this.state.newTodo
      })
      const todoClone = this.state.todo;
      todoClone.push(response.data);
      this.setState({
        todo : todoClone, newTodo: ''
      });

      this.alert('Todo added successfully');
    }

    async deleteTodo(index){
      const allTodo = this.state.todo;
      const selectedTodo = allTodo[index];

      await axios.delete(`${this.apiUrl}/todos/${selectedTodo.id}`)
      delete allTodo[index];
      this.setState({
        allTodo
      });

      this.alert('Todo deleted successfully');
    }

    editTodo(index) {
      const selectedTodo = this.state.todo[index];
      this.setState({
        editing:true,
        newTodo : selectedTodo.name,
        editingIndex: index

      })

    }

    async updateTodo(){
      const selectedTodo = this.state.todo[this.state.editingIndex];
      selectedTodo.name = this.state.newTodo;
      const allTodo = this.state.todo;

      const response = await axios.put(`${this.apiUrl}/todos/${selectedTodo.id}`,{
        name : this.state.newTodo
      })

      allTodo[this.state.editingIndex] = response.data;

    

      this.setState({
        allTodo, editing:false, editingIndex: null, newTodo: ''
      });

      this.alert('Todo updated successfully');

    }

    generateNewTodoId(){
      const lastTodoItem = this.state.todo[this.state.todo.length - 1];
      if(lastTodoItem){
        return lastTodoItem.id + 1;
      }

      return 1;

    }

    alert(notification){
      this.setState({
        notification:notification
      });

      setTimeout(() => {
        this.setState({
          notification: null
        })

      }, 2000)
    }

   

    render(){
        return(
            <div className="App2">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                 CRUD react
                </p>
               <div className="container">
                 <h2 className="text-center p-4">Todos App</h2>
                 {
                   this.state.notification && 
                   <div className="alert mt-4 alert-success">
                    <p className="text-center">{this.state.notification}</p>
                  </div>
                 }
                 
                 <input type="text"  className="my-4 form-control"  onChange = {this.handleChange} value= {this.state.newTodo} placeholder='Add New Todo'/>
                 <button className="mb-4 btn-success form-control" onClick = {this.state.editing ? this.updateTodo : this.addNewTodo} disabled = {this.state.newTodo.length < 5}>
                   {this.state.editing ? "Update Todo" : "Add Todo"}
                 </button>
                 {this.state.loading && 
                <img src={loadingGif} className="App-gif" alt="logo" />
                }


                 {(!this.state.editing || !this.loading) && 
                 <ul className="list-group">
                 {this.state.todo.map((item, index) => {
                   
                 return <ListItem 
                 key={item.id}
                 item={item}
                 editTodo={() => this.editTodo(index)}
                 deleteTodo={() => this.deleteTodo(index)}
                 />;

                 }

                 )}
               </ul>
                 
                 }
               </div>
              </header>
            </div>
          );
    }
}

export default App2;
