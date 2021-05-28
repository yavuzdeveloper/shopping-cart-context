import { CartItem } from './types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BooksContext } from './App';


const Cart = () => { 
    const context = useContext(BooksContext)

    const totalPrice = context.state.cart.items.reduce((total, item) => 
        (total += (item.count)*(item.book.price)), 0 );
    
    return ( 
        <div style={{padding:"0 10px 0 10px"}}>
            <h3>
                <Link to="/">Products</Link> 
                <div style={{float:"right"}}>
                    <span>My Cart ({ context.state.cart.items.reduce((total, item) => (total += item.count), 0 )})</span>
                </div>    
            </h3>
            <div className="cart">
               { !context.state.cart.items.length && 
               <div className="empty">
                   <h3>Your Cart Empty</h3>
               </div>
               }
                {context.state.cart.items.filter(item => item.count>0).map((item:CartItem) => (
                <div className="book"  key={item.book.id}>
                    <img src={item.book.image} alt={item.book.name}  />
                    <div>
                        <h4>{item.book.name}</h4>
                        <p>Price: {item.book.price}£</p>
                        <p>Author: {item.book.author}</p>
                        <p>Count: {item.count}</p>
                        <p>Subtotal: {(item.book.price*item.count).toFixed(2)}£</p>
                        <button onClick={() => context.decrease(item.book)}>-</button>
                        <button onClick={() => context.remove(item.book)}>Remove</button>
                        <button onClick={() => context.increase(item.book)}>+</button>
                    </div>
                </div>
                ))}
            </div>
                <div style={{float:"right"}}>
                    <h3>Total Cart Price: £ {totalPrice.toFixed(2)}</h3>   
                </div> 
        </div>
    )
}



export default Cart;