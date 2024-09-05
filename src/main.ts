import { ModCallback } from "isaac-typescript-definitions";
import { getNPCs, getPlayers, getRandomInt } from "isaacscript-common";

const MOD_NAME = "Gergelations";
const GREEN_CANDLE_COLLECTIBLE_TYPE = Isaac.GetItemIdByName("Green Candle");
const ANGELIC_BABY_COLLECTIBLE_TYPE = Isaac.GetItemIdByName("Angelic Baby");

export function main() {
  const mod = RegisterMod(MOD_NAME, 1);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);

  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function postUpdate() {
  checkApplyGreenCandleEffect();
}

function checkApplyGreenCandleEffect() {
  for (const player of getPlayers()) {
    if (player.HasCollectible(GREEN_CANDLE_COLLECTIBLE_TYPE)) {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer) {
  for (const npc of getNPCs()) {
    if (shouldApplyGreenCandleEffectToNPC(npc)) {
      // - The source is the player.
      // - The duration is 100 frames.
      // - The damage is equal to the player's damage stat.
      npc.AddPoison(EntityRef(player), 100, player.Damage);
    }
  }
}

function shouldApplyGreenCandleEffectToNPC(npc: EntityNPC) {
  return npc.IsVulnerableEnemy() && getRandomInt(1, 500, undefined) === 1;
}