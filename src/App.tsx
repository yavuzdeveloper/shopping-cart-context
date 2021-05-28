
import './App.css';
import Products from './Products';
import Cart from './Cart';
import { Route } from "react-router-dom";
import { createContext, useState } from 'react';
import { data } from './data';
import { Book, CartModel, CartItem } from './types';


export interface State { 
  cart: CartModel, 
  books: Book[],
}


export const INITIAL_STATE: State = {
  books: data,
  cart: {items: []},
}

export interface ContextType { 
  state: State,
  addToCart: Function,
  increase: Function,
  decrease: Function,
  remove: Function
}

export const BooksContext = createContext({} as ContextType );

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);
  let items = state.cart.items;

  const addToCart = (book:Book) => {
    const addBook = items.find(item => item.book.id === book.id) 
      if(addBook){
        addBook.count = addBook.count + 1; 
      }else{ 
        items.push({ count:1, book:book }); 
      }  
      setState({   
        ...state,
          cart: {items}
      });
  }

  const increase = (book:Book) => {
    items.map(item => item.book.id === book.id 
      ? item.count = item.count + 1 : item )
    
    setState({   
      ...state,
          cart: {items}
    });
  }

  const decrease = (book:Book) => {
    const decreaseBook = items.find(item => item.book.id === book.id)
      if(decreaseBook){ 
        if(decreaseBook.count > 1){
          decreaseBook.count = decreaseBook.count - 1 
        } else {
          decreaseBook.count = 1  
        }
      }  
    setState({   
      ...state,
        cart: {items}
    });
  }
  
  const remove = (book:Book) => {
    let itemToRemove: CartItem = items[0];
    items.forEach(item => {
      if(item.book.id === book.id){
        itemToRemove = item;
      }
    })
    let indexOf = items.indexOf(itemToRemove);
    items.splice(indexOf, 1);

      setState({   
      ...state,
        cart: {items}
      });

// ***************************  
  // let Index:number = items.findIndex(item => item.book.id === book.id);
  //   setState({  
  //     ...state,
  //       cart: {items:items.splice(Index,1)}
  //   });
//*****************************************    
 // let Items : CartItem[] = [];
    // items.filter(item => {
    //   if(item.book.id !== book.id)
    //   Items.push(item)
    // });                           
    // setState({  
    //   ...state,
    //     cart: {items:Items}
    // });
//*************************** */    
  // items.map(item => {
  //   if(item.book.id !== book.id ){  
  //     setState({
  //       ...state,
  //         cart: {items}
  //     });
  //   }
  // })

//*************************** */
// setState({
//   ...state,
//     cart: {items: items.filter(item => item.book.id !== book.id)}
// });
//***************************** */
}

  return (
    <BooksContext.Provider value={{state:INITIAL_STATE, addToCart, increase, decrease, remove}}>
    <div className="App">
      <header className="App-header">
        <h3>Shopping Cart with Context API
          <img
          src="https://sdtimes.com/wp-content/uploads/2018/09/1_JsyV8lXMuTbRVLQ2FPYWAg-490x490.png"
          alt="shopping cart typescript"
          />   
        </h3>
      </header>
        <Route exact path="/" component={Products} />
        <Route path="/cart" component={Cart} />
    </div>
    </BooksContext.Provider>
  );
}

export default App;