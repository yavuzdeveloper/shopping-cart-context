
import './App.css';
import Products from './Products';
import Cart from './Cart';
import { Route } from "react-router-dom";
import { createContext, useState } from 'react';
import { data } from './data';
import { Book,  CartModel, CartItem } from './types';



export interface State { 
    cart: CartModel, 
    books: Book[],
    //addToCart?: Function
}

// const addToCart = (book:Book) => { alert(addToCart);
//     //console.log("AA:", BooksContext);
//   }

export const INITIAL_STATE: State = {
    books: data,
    cart: {items: []},
    //addToCart: addToCart
}

export interface ContextType { 
  // state:{
  //   cart: CartModel, 
  //   books: Book[],
  // },
  state: State,
  addToCart: Function,
  increase: Function,
  decrease: Function,
  remove: Function
}

// export const BooksContext = createContext({} as State);
export const BooksContext = createContext({} as ContextType );


const App = () => {
//   const [books, setBooks] = useState((data) as Book[] );
//   const [cart, setCart] = useState(([]) as CartModel[]);

// const [state, setState] = useState({
//   books: data as Book[],
//   cart: []  as CartModel[]
// });
const [state, setState] = useState(INITIAL_STATE);

  // let state = INITIAL_STATE;
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
  // setState({
  //   ...state, 
  //     cart: {items: state.cart.items.filter(item => item.book.id === book.id)}
  // });
  
  
  
    let Items : CartItem[] = [];
    items.forEach(item => {
      if(item.book.id !== book.id){
        Items.push(item);
      }
      
    });
    console.log("ITEMS:",Items);
    
    setState({  
      ...state,
        cart: {items:Items}
    });


// ***************************  
//   let Index:number = items.findIndex(item => item.book.id === book.id);
//   console.log("İNdex:", Index);
//   console.log("İNdex22:", items.splice(Index,Index))

//     setState({  
//       ...state,
//         cart: {items:items.splice(Index,Index)}
//     });
//*****************************************    
//   items.map(item => item.book.id === book.id ? item.count = 0 : item );
// items=items.filter(item => item.count> 0 );
    
//     setState({   
//       ...state,
//         cart: {items}
//     });
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
          {/* <img
          src="https://avatars3.githubusercontent.com/u/60869810?v=4"
          alt="shopping cart with react"
          /> */}
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