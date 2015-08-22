// Khoi dong enchantjs
enchant();

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
  }

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
    // * addChild(): them hinh anh nay vao khung canh
    hinhNen = new Sprite(320, 568);
    hinhNen.image = game.assets['res/bg.png'];
    this.addChild(hinhNen);
  }
});
