import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 450,
  backgroundColor: '#203824',
  scene: {
    create() {
      this.add.rectangle(400, 225, 800, 450, 0x203824);

      // Simple fantasy starter scene: meadow, path, trees, and a tiny adventurer.
      this.add.rectangle(400, 335, 820, 90, 0x7a5c35).setAngle(-3);
      this.add.circle(130, 105, 34, 0x2f7d32);
      this.add.rectangle(130, 155, 18, 58, 0x6b3f22);
      this.add.circle(670, 115, 42, 0x2f7d32);
      this.add.rectangle(670, 175, 22, 72, 0x6b3f22);
      this.add.circle(710, 95, 30, 0x3fa044);

      this.add.rectangle(400, 210, 54, 70, 0x6f4bb5);
      this.add.circle(400, 162, 22, 0xf1c27d);
      this.add.triangle(400, 122, 370, 155, 430, 155, 0x5b2a86);
      this.add.rectangle(435, 205, 9, 78, 0xc9a24a).setAngle(-24);
      this.add.circle(452, 171, 9, 0xfff1a8);

      this.add.text(400, 42, 'Fantasy MMO starter', {
        fontSize: '34px',
        color: '#fff7d6',
        fontFamily: 'Georgia, serif'
      }).setOrigin(0.5);

      this.add.text(400, 394, 'First realm: a tiny meadow village waiting for quests', {
        fontSize: '18px',
        color: '#fff7d6'
      }).setOrigin(0.5);
    }
  }
};

new Phaser.Game(config);
