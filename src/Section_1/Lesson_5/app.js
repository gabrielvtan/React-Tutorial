function Person(props){
    return (
     <div className="person">  
       <h1> {props.name}</h1>
       <p> Your age: {props.age}</p>
     </div>
    ); 
   }
   
   var app = (
     <div> 
       <Person name="Gabby" age="27"/>
       <Person name="2nd Person" age="100"/>
     </div>
   );
   
   ReactDOM.render(app, document.querySelector('#app'));