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
    this.addEventListener('enterframe', function() {
      nguoiChoi.y += 15
    });
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
