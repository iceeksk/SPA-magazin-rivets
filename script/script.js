$(function () {
    $('.content-wrapper').jScrollPane();
});
$(function () {
    $('.category-wrapper-scroller').jScrollPane();
});


viewModel = {
    data: inputData, // это с ждейсона все даные
    goodsInCart: [],
    total: 0,
    heading: "Shopping Cart - Make Purchases Right Now!",
    startPage: true,
    categoryPage: false,
    cartPage: false,
    backButton: false,
    shoppingCart: true,

    goToCategoryPage: function (arg) {
        for (var i = 0; i < viewModel.data.length; i++) {
            if (viewModel.data[i].category == arg) {
                viewModel.thisCategory = viewModel.data[i].goods;
            }
        }
    },

    chooseCategory: function (event, arg) {
        var categoryName = viewModel.data[arg.index].category;
        viewModel.goToCategoryPage(categoryName);
        viewModel.heading = categoryName;
        viewModel.startPage = false;
        viewModel.categoryPage = true;
        viewModel.cartPage = false;
        viewModel.backButton = true;
        viewModel.shoppingCart = true;
    },

    backToStartPage: function () {
        viewModel.heading = "Shopping cart - make purchases Right Now!";
        viewModel.startPage = true;
        viewModel.categoryPage = false;
        viewModel.cartPage = false;
        viewModel.backButton = false;
        viewModel.shoppingCart = true;
    },

    goToCartPage: function () {
        viewModel.heading = "Your Cart";
        viewModel.startPage = false;
        viewModel.categoryPage = false;
        viewModel.cartPage = true;
        viewModel.backButton = true;
        viewModel.shoppingCart = false;
        viewModel.inCart();

    },

    addAmount: function (event, arg) {
        var categoryIndex;
        for (var i = 0; i < viewModel.data.length; i++) {
            if (viewModel.heading == viewModel.data[i].category) {
                categoryIndex = i;
                var currentGood = viewModel.data[categoryIndex].goods[arg.index].name;
                for (var y = 0; y < viewModel.data[categoryIndex].goods.length; y++) {
                    if (viewModel.data[categoryIndex].goods[y].name == currentGood) {
                        viewModel.data[i].goods[y].amount++;
                        viewModel.inCart();
                        viewModel.totalPrise();
                    }
                }
            }
        }
    },


    minusAmount: function (event, arg) {
        var categoryIndex;
        for (var i = 0; i < viewModel.data.length; i++) {
            if (viewModel.heading == viewModel.data[i].category) {
                categoryIndex = i;
                var currentGood = viewModel.data[categoryIndex].goods[arg.index].name;
                for (var y = 0; y < viewModel.data[categoryIndex].goods.length; y++) {
                    if (viewModel.data[categoryIndex].goods[y].name == currentGood) {
                        if (viewModel.data[categoryIndex].goods[y].amount > 0) {
                            viewModel.data[categoryIndex].goods[y].amount--;
                            viewModel.inCart();
                            viewModel.totalPrise();
                        }
                    }
                }
            }
        }
    },

    clearAmount: function () {
        for (var i = 0; i < viewModel.data.length; i++) {
            for (var y = 0; y < viewModel.data[i].goods.length; y++) {
                viewModel.data[i].goods[y].amount = 0;
                viewModel.inCart();
                viewModel.totalPrise();
            }
        }
    },

   inCart: function () {
       viewModel.goodsInCart = [];
       console.log(viewModel.data);
       for (var i = 0; i < viewModel.data.length; i++) {
           for (var y = 0; y < viewModel.data[i].goods.length; y++) {
               viewModel.data[i].goods[y].priceOfGoods = 0;
               if (viewModel.data[i].goods[y].amount > 0) {
                   viewModel.data[i].goods[y].priceOfGoods = viewModel.data[i].goods[y].price * viewModel.data[i].goods[y].amount;
                   viewModel.goodsInCart.push(viewModel.data[i].goods[y]);
               }
           }
       }
   },

    addAmountInCart: function (event, arg) {
        var currentGood = viewModel.goodsInCart[arg.index].name;
        for (var i = 0; i < viewModel.data.length; i++) {
            for (var y = 0; y < viewModel.data[i].goods.length; y++) {
                if (viewModel.data[i].goods[y].name == currentGood) {
                    viewModel.data[i].goods[y].amount++;
                    viewModel.inCart();
                    viewModel.totalPrise();
                }
            }
        }
    },

    minusAmountInCart: function (event, arg) {
        var currentGood = viewModel.goodsInCart[arg.index].name;
        for (var i = 0; i < viewModel.data.length; i++) {
            for (var y = 0; y < viewModel.data[i].goods.length; y++) {
                if (viewModel.data[i].goods[y].name == currentGood) {
                    if (viewModel.data[i].goods[y].amount > 0) {
                        viewModel.data[i].goods[y].amount--;
                        viewModel.inCart();
                        viewModel.totalPrise();
                    }
                }
            }
        }
    },

    totalPrise: function () {
        viewModel.total = 0;
        for (var i = 0; i < viewModel.goodsInCart.length; i++) {
            viewModel.total += viewModel.goodsInCart[i].price * viewModel.goodsInCart[i].amount;
        }
    },

    buy: function () {
        for (var i = 0; i < viewModel.goodsInCart.length; i++) {
            console.log('You buy ' + viewModel.goodsInCart[i].name + ' amount is ' + viewModel.goodsInCart[i].amount + ' total prise $' + viewModel.goodsInCart[i].price * viewModel.goodsInCart[i].amount);
        }
        console.log('Total price of all goods $ ' + viewModel.total);
        viewModel.clearAmount();
    },

    delGoodInTable: function (event, arg) {
        var currentGood = viewModel.goodsInCart[arg.index].name;
        for (var i = 0; i < viewModel.data.length; i++) {
            for (var y = 0; y < viewModel.data[i].goods.length; y++) {
                if (viewModel.data[i].goods[y].name == currentGood) {
                    viewModel.data[i].goods[y].amount = 0;
                    viewModel.inCart();
                    viewModel.totalPrise();
                }
            }
        }
    }
};

rivets.bind(viev, {"view": viewModel});