
// Model 模型

let model = {
    choosenCat: null,

    cats: [
        {
            name: 'Milk',
            img: 'img/cat.jpg',
            like: 0
        },
        {
            name: 'Coffe',
            img: 'img/cat2.jpg',
            like: 0
        },
        {
            name: 'Latte',
            img: 'img/cat3.jpg',
            like: 0
        },
        {
            name: 'Americano',
            img: 'img/cat4.jpg',
            like: 0
        },
        {
            name: 'Espresso',
            img: 'img/cat5.jpg',
            like: 0
        }
    ]

};


// Octopus 章鱼

let octopus = {
    init: function() {
        model.choosenCat = model.cats[0];
        $('#admin').hide();

        viewList.init();
        viewInfo.init();
        viewAdmin.init();
    },

    getCat: function() {
        return model.cats;
    },

    getChoosenCat: function() {
        return model.choosenCat;
    },

    showCat: function(cat) {
        model.choosenCat = cat;
    },

    addClick: function() {
        model.choosenCat.like++;
        viewInfo.render();
        viewAdmin.render();
    },

    updateName: function() {
        let choosenCat = this.getChoosenCat();
        choosenCat.name = document.getElementById('name-value').value;
        viewInfo.render();
        viewList.render();
        $('#admin').hide();
    }

};


// View 视图

let viewList = {

    init: function() {
        // 存储 DOM 以便稍后访问
        this.catList = document.getElementById('cat-list');
        //渲染视图（更新正确值）
        this.render();
    },

    render: function() {
        let cats = octopus.getCat();

        //清屏
        this.catList.innerHTML = '';

        for(let i = 0; i < cats.length; i++) {
            // 循环猫数组
            let cat = cats[i];
            // 创建猫列表
            let elem = document.createElement('li');
            elem.textContent = cat.name;

            elem.addEventListener('click', (function(catClick) {
                return function() {
                    octopus.showCat(catClick);
                    viewInfo.render();
                    viewAdmin.render();
                    $('#admin').hide();
                };
            })(cat));

            this.catList.appendChild(elem);
        }
    }
};

let viewInfo = {

    init: function() {
        // 存储 DOM 以便稍后访问
        this.cat = document.getElementById('cat-info');
        this.catName = document.getElementById('name');
        this.catLike = document.getElementById('like');
        this.catPic = document.getElementById('pic');

        this.catPic.addEventListener('click', function() {
            octopus.addClick();
        });

        //渲染视图（用正确的值更新 DOM 元素）
        this.render();
    },

    render: function() {
        // 用当前 cat 的值更新 DOM 元素
        let choosenCat = octopus.getChoosenCat();
        this.catName.textContent = choosenCat.name;
        this.catLike.textContent = choosenCat.like;
        this.catPic.src = choosenCat.img;
    }
};

let viewAdmin = {
    init: function() {

        this.button = document.getElementById('button');
        this.admin = document.getElementById('admin');

        this.nameValue = document.getElementById('name-value');
        this.likeValue = document.getElementById('like-value');
        this.imgValue = document.getElementById('img-value');

        this.cancle = document.getElementById('cancle');
        this.save = document.getElementById('save');

        //点击admin，显示admin区域
        this.button.addEventListener('click', function() {
            $('#admin').show();
        });

        //点击cancle，admin区域消失
        this.cancle.addEventListener('click', function() {
            $('#admin').hide();
        });

        //点击save,更新更改
        this.save.addEventListener('click', function() {
            octopus.updateName();
        });


        this.render();
    },

    render: function() {

        let choosenCat = octopus.getChoosenCat();
        this.nameValue.value = choosenCat.name;
        this.likeValue.value = choosenCat.like;
        this.imgValue.value = choosenCat.img;
    }
};
// Start 启动

octopus.init();




