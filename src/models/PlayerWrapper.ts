import Player from "@/models/Player";
export default class PlayerWrapper {
  player: Player;

  constructor(player: Player) {
    if (player != null) {
      this.player = player;
    } else {
      this.player = new Player();
    }
  }
}
