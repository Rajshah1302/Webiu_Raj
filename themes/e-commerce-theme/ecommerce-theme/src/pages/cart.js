import React, { useContext } from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { CartContext } from "../contexts"
import CartTile from "../component/cart/cartTile"
import OrderSummery from "../component/cart/orderSummery"
import Layout from "../ui/layout"
import { addToCart, removeFromCart } from "../contexts/actions/cart-actions"
import { useMediaQuery } from "@material-ui/core"

const Styles = makeStyles(theme => ({
  container: {
    width: "50%",
  },
  container2: {
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
    width: "25%",
  },
}))

const Cart = () => {
  const classes = Styles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("sm"))
  let items = 0
  let total = 0
  const { cart, dispatchCart } = useContext(CartContext)
  const subHandler = (id, img, qty, name, price) => {
    if (qty > 1) {
      dispatchCart(removeFromCart(id, img, 1, name, price))
    }
  }
  const addHandler = (id, img, qty, name, price, stock) => {
    if (qty < stock) {
      dispatchCart(addToCart(id, img, 1, name, price, stock))
    }
  }
  const cartList = cart.map((item, i) => (
    <CartTile
      key={i}
      image={item.img}
      name={item.name}
      price={item.price}
      qty={item.qty}
      subtractionHandler={() =>
        subHandler(item.id, item.img, item.qty, item.name, item.price)
      }
      additionHandler={() =>
        addHandler(
          item.id,
          item.img,
          item.qty,
          item.name,
          item.price,
          item.stock
        )
      }
      removeHandler={() =>
        dispatchCart(
          removeFromCart(item.id, item.img, item.qty, item.name, item.price)
        )
      }
    />
  ))
  cart.forEach(item => {
    items = items + item.qty
    total = total + item.qty * item.price
  })
  return (
    <Layout>
      <Grid
        container
        justifyContent={matchesMD ? "flex-start" : "space-around"}
      >
        <Grid item classes={{ root: classes.container }}>
          {cartList}
        </Grid>
        <Grid item classes={{ root: classes.container2 }}>
          <OrderSummery items={items} total={total} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Cart
