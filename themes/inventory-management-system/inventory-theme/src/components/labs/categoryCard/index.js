import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Styles from "./styles"

const CategoryCard = ({ imgUrl, categoryName, btnHandler }) => {
  const classes = Styles()
  return (
    <Grid container direction="column" classes={{ root: classes.container }}>
      <Grid item>
        <img src={imgUrl} className={classes.imgContainer} />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.wrapper }}
      >
        <Grid item classes={{ root: classes.space }}>
          <Typography align="center" variant="h3">
            {categoryName}
          </Typography>
        </Grid>
        <Grid item classes={{ root: classes.space }}>
          <Button classes={{ root: classes.btnStyle }} onClick={btnHandler}>
            View Items
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CategoryCard
