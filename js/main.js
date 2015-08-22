// Khoi dong enchantjs
enchant();

var nguoiChoi;
// Doi page load thanh cong
window.onload = function() {
  // Khoi tao class game 320x568
  // Thiet lap thong so va tai nguyen game
  // * fps: toc do game
  // * scale: do zoom
  // * preload('link/toi/hinh/anh'): load hinh anh vao game
  // ***: tat ca moi thanh phan game se dua tren bien game nay
  var game = new Game(320, 568);
  game.preload('res/bg.png',
    'res/fish.png',
    'res/pipe.png',
    'res/floor.png');
  game.fps = 30;
  game.scale = 1;

  // Doi game load thanh cong
  // ***: Logic chinh cua game
  game.onload = function() {
    // Khoi tao khung hinh game
    // * pushScene(scene): dua khung hinh vao game
    var scene = new GameScene();
    game.pushScene(scene);
  };

  game.start();
};

// Dinh nghia khung canh cua game
var GameScene = Class.create(Scene, {
  initialize: function() {
    var game, hinhNen;

    // Bien game nay chinh la game vua khoi tao o tren
    game = Game.instance;
    Scene.apply(this);

    // Ve nhung hinh anh se xuat hien tren khung canh nay
    // * this: o ngu canh nay chi ve khung canh hien tai
    // * image: xac dinh dung hinh anh nao
    // * addChild(): them hinh anh nay vao khung canh
    hinhNen = new Sprite(320, 568);
    hinhNen.image = game.assets['res/bg.png'];
    this.addChild(hinhNen);

    nguoiChoi = new Fish();
    this.addChild(nguoiChoi);

    // Thiet lap logic dua tren su kien (javascript events)
    // * 'enterframe': su kien duoc kich hoat khi vua bat dau khung hinh moi
    // * 'touchstart': khi bam chuot trai tren may tinh
    //                 hoac touch tren smartphone
    var daNhayXong = true;
    var canVeOng = true;
    this.addEventListener('enterframe', function() {
      if (canVeOng) {
        canVeOng = false;
        this.veOng();
        // tl.delay(fr).then(fn): sau khoang thoi gian `fr` thi goi ham fn
        this.tl.delay(50).then(function(){
          canVeOng = true;
        });
      }
      if (daNhayXong) {
        nguoiChoi.y += 15;
      }
    });

    // * Sprite.tl.moveBy(x,y,fr).exec(fn): moveBy(x,y,fr) la ham di chuyen hinh
    //                                      anh,
    //                                      fr la toc do di chuyen ( o day la so
    //                                      frame de thuc hien xong hanh dong),
    //                                      x la di chuyen truc hoanh
    //                                      y la di chuyen truc tung
    //                                      exec(fn) se goi ham `fn` sau khi ket
    //                                      thuc chuyen dong
    this.addEventListener("touchstart", function() {
      if (daNhayXong == false && nguoiChoi.y > 0) {
        nguoiChoi.tl.moveBy(0, -75, 10).exec(function() {
          daNhayXong = true;
        });
      }
      else if (daNhayXong == true && nguoiChoi.y > 0) {
        // Dung bat cu chuyen dong nao dang dien ra cua nguoiChoi
        nguoiChoi.tl.clear();
        daNhayXong = false;
        nguoiChoi.tl.moveBy(0, -75, 10).exec(function() {
          daNhayXong = true;
        });
      }
    });
  },
  veOng: function(){
    var ongTren = new Pipe();
    var ongDuoi = new PipeBottom();
    // Thu vien Math: * floor(): lam tron xuong
    //                * random(): tra ve 1 so trong khoang tu -1 den 1
    var viTriOngTrucY = Math.floor(Math.random() * 150) + 100;

    this.addChild(ongTren);
    this.addChild(ongDuoi);

    // Thay doi vi tri ong
    ongTren.y = viTriOngTrucY - 375;
    ongDuoi.y = viTriOngTrucY + 150;

    // tl.moveX(x, fr): di chuyen lien tuc x pixels, voi toc do fr tren truc x
    ongTren.tl.moveX(-100, 80);
    ongDuoi.tl.moveX(-100, 80);
  }
});

// Dinh nghia con ca
var Fish = Class.create(Sprite, {
	initialize: function() {
		var game;

		game = Game.instance;
		Sprite.apply(this,[64,36]);

    // Thiet lap thong so hinh anh con ca
    // * x: dia diem tren truc x ( truc hoanh|ngang) (pixel)
    // * y: dia diem tren truc y ( truc tung|doc) (pixel)
    // *** LUU Y: diem xuat phat cua truc toa do o day
    // ***        la goc trai tren cua trang web
		this.image = game.assets['res/fish.png'];
		this.x = 50;
		this.y = 100;
	}
});

// Dinh nghia ong tren
var Pipe = Class.create(Sprite, {

  initialize: function() {
    var game;

    game = Game.instance;
    Sprite.apply(this, [88, 376]);
    this.image = game.assets['res/pipe.png'];
    this.x = 350;
    this.y = 0;

  }

});

// Dinh nghia ong duoi
var PipeBottom = Class.create(Sprite, {

  initialize: function() {
    var game;

    game = Game.instance;
    Sprite.apply(this, [88, 376]);
    this.image = game.assets['res/pipe.png'];
    this.x = 350;
    this.y = 0;
    this.scaleY = -1; // dao nguoc cai ong xuong
  }

});
