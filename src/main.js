import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 450,
  backgroundColor: '#18216d',
  scene: {
    create() {
      this.add.text(400, 225, 'Phaser starter', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
    }
  }
};

new Phaser.Game(config);
