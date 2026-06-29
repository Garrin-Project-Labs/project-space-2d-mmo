import Phaser from 'phaser';

const PLAYER_SPEED = 180;
const PLAYER_RADIUS = 36;
const WORLD_WIDTH = 800;
const WORLD_HEIGHT = 450;

function createAdventurer(scene, x, y) {
  const player = scene.add.container(x, y);

  // Body parts are grouped so movement can update one player object.
  player.add(scene.add.rectangle(0, 18, 54, 70, 0x6f4bb5));
  player.add(scene.add.circle(0, -30, 22, 0xf1c27d));
  player.add(scene.add.triangle(0, -70, -30, -37, 30, -37, 0x5b2a86));
  player.add(scene.add.rectangle(35, 13, 9, 78, 0xc9a24a).setAngle(-24));
  player.add(scene.add.circle(52, -21, 9, 0xfff1a8));

  return player;
}

function getKeyboardVector(scene) {
  const left = scene.cursors.left.isDown || scene.wasd.left.isDown;
  const right = scene.cursors.right.isDown || scene.wasd.right.isDown;
  const up = scene.cursors.up.isDown || scene.wasd.up.isDown;
  const down = scene.cursors.down.isDown || scene.wasd.down.isDown;

  return new Phaser.Math.Vector2(
    Number(right) - Number(left),
    Number(down) - Number(up)
  );
}

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: WORLD_WIDTH,
  height: WORLD_HEIGHT,
  backgroundColor: '#203824',
  scene: {
    create() {
      this.add.rectangle(400, 225, WORLD_WIDTH, WORLD_HEIGHT, 0x203824);

      // Simple fantasy starter scene: meadow, path, trees, and a tiny adventurer.
      this.add.rectangle(400, 335, 820, 90, 0x7a5c35).setAngle(-3);
      this.add.circle(130, 105, 34, 0x2f7d32);
      this.add.rectangle(130, 155, 18, 58, 0x6b3f22);
      this.add.circle(670, 115, 42, 0x2f7d32);
      this.add.rectangle(670, 175, 22, 72, 0x6b3f22);
      this.add.circle(710, 95, 30, 0x3fa044);

      this.player = createAdventurer(this, 400, 210);
      this.moveTarget = null;

      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });

      this.input.on('pointerdown', (pointer) => {
        this.moveTarget = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
      });

      this.add.text(400, 42, 'Fantasy MMO starter', {
        fontSize: '34px',
        color: '#fff7d6',
        fontFamily: 'Georgia, serif'
      }).setOrigin(0.5);

      this.add.text(400, 394, 'Move with WASD / arrow keys, or click / tap a spot', {
        fontSize: '18px',
        color: '#fff7d6'
      }).setOrigin(0.5);
    },

    update(_time, delta) {
      const keyboardVector = getKeyboardVector(this);
      const hasKeyboardInput = keyboardVector.lengthSq() > 0;
      let movement = keyboardVector;

      if (hasKeyboardInput) {
        this.moveTarget = null;
        movement.normalize();
      } else if (this.moveTarget) {
        const distanceToTarget = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          this.moveTarget.x,
          this.moveTarget.y
        );

        if (distanceToTarget < 4) {
          this.moveTarget = null;
          movement = new Phaser.Math.Vector2(0, 0);
        } else {
          movement = new Phaser.Math.Vector2(
            this.moveTarget.x - this.player.x,
            this.moveTarget.y - this.player.y
          ).normalize();
        }
      }

      if (movement.lengthSq() === 0) {
        return;
      }

      const step = PLAYER_SPEED * (delta / 1000);
      this.player.x = Phaser.Math.Clamp(
        this.player.x + movement.x * step,
        PLAYER_RADIUS,
        WORLD_WIDTH - PLAYER_RADIUS
      );
      this.player.y = Phaser.Math.Clamp(
        this.player.y + movement.y * step,
        PLAYER_RADIUS + 40,
        WORLD_HEIGHT - PLAYER_RADIUS
      );
    }
  }
};

new Phaser.Game(config);
